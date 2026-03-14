//=============================================================================
// Smart Pathfinding
// by Shaz
// Last Updated: 2015.10.21
// Modified: 2025.04.08 - Added event obstacle detection and improved pathfinding
//=============================================================================

/*:
 * @plugindesc 智能寻路事件追逐 (增强版：避开事件障碍 + 允许绕路)
 * @author Shaz (modified by assistant)
 *
 * @help
===============================================================================
  介绍
===============================================================================

  允许事件或玩家进行智能寻路，增强版在计算路径时会检查目标格子是否有不可通行的事件，
  并允许怪物在无法直接靠近目标时，选择“暂时远离”的方向以绕过障碍。

===============================================================================
  插件命令
===============================================================================

SmartPath eventId1 eventId2      # 让事件1寻找前往事件2的路径
SmartPath eventId x y            # 让事件寻找前往坐标(X,Y)的路径
SmartPath eventId cancel         # 取消该事件的寻路
 *
 *  event = 数字     //指定特定事件
 *  event = 0        //表示"当前"事件
 *  event = -1       //表示玩家
 *  event = $gameVariables.value(x)  //从变量x中获取事件ID
 *
 *  x, y = 可以是具体坐标，或使用 $gameVariables.value(变量编号)从变量获取坐标
 
示例：SmartPath 1 3      //从事件1到事件3 
示例：SmartPath 0 10 8   //让当前事件前往坐标
 
假设变量5存储X坐标，变量6存储Y坐标，添加插件命令：
SmartPath -1 $gameVariables.value(5) $gameVariables.value(6)

-1代表玩家，执行后玩家会自动前往变量 5 和 6 所指定的坐标位置


若要让事件 2 停止当前的寻路行为，添加插件命令：
SmartPath 2 cancel
执行后，事件 2 会停止移动，不再继续寻路

 */
/*:ja
 * @plugindesc イベントもしくはプレイヤーに、高度な経路探索を提供します。（イベント障害物回避+迂回機能）
 * @author Shaz (modified by assistant)
 *
 * @help
 *
 * Plugin Command:
 *  SmartPath eventId1 eventId2      # 
 * 	イベント1に、イベント2までの経路を探索させます。
 *  SmartPath eventId x y            # 
 * 	イベントに、(x, y)までの経路を探索させます。
 *  SmartPath eventId cancel         # 
 * 	イベントの経路探索を中止させます。
 *
 *  event = 0 →このイベント
 *  event = -1 →プレイヤー
 *  event = $gameVariables.value(x) →xからイベントIDを取得
 *
 *  x, y = coordinates or $gameVariables.value(#) →好きな座標を指定
 *
 */

(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'SMARTPATH') {
      subject = this.character(eval(args[0]));
      if (args[1].toUpperCase() === 'CANCEL') {
        subject.clearTarget();
      } else if (args.length > 2) {
        subject.setTarget(null, eval(args[1]), eval(args[2]));
      } else {
        subject.setTarget(this.character(eval(args[1])));
      }
    }
  };

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._target = null;
    this._targetX = null;
    this._targetY = null;
  };

  Game_CharacterBase.prototype.setTarget = function(target, targetX, targetY) {
    this._target = target;
    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    } else {
      this._targetX = targetX;
      this._targetY = targetY;
    }
  };

  Game_CharacterBase.prototype.clearTarget = function() {
    this._target = null;
    this._targetX = null;
    this._targetY = null;
  };

  var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
  Game_CharacterBase.prototype.updateStop = function() {
    _Game_CharacterBase_updateStop.call(this);

    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    }

    if (this._targetX != null) {
      direction = this.findDirectionTo(this._targetX, this._targetY);
      if (direction > 0)
      {
        this.moveStraight(direction);
      }
    }
  };

  //=============================================================================
  // 增强的 findDirectionTo：允许暂时远离目标以绕过障碍
  //=============================================================================
  /**
   * 寻找朝向目标坐标的最佳移动方向（避开不可通行的事件，并允许绕路）
   * @param {number} x 目标x坐标
   * @param {number} y 目标y坐标
   * @returns {number} 方向（2,4,6,8），若无可行方向则返回0
   */
  Game_CharacterBase.prototype.findDirectionTo = function(x, y) {
    var sx = this.deltaXFrom(x);
    var sy = this.deltaYFrom(y);
    var currentDist = Math.abs(sx) + Math.abs(sy);
    if (currentDist === 0) return 0;

    // 四个方向：下、左、右、上
    var directions = [2, 4, 6, 8];
    var validDirections = []; // 存储可行方向及移动后的距离

    for (var i = 0; i < directions.length; i++) {
      var d = directions[i];
      var dx = (d === 6 ? 1 : (d === 4 ? -1 : 0));
      var dy = (d === 2 ? 1 : (d === 8 ? -1 : 0));

      // 检查地形是否可通行（原方法）
      if (!$gameMap.isPassable(this.x, this.y, d)) continue;

      // 检查目标位置是否有不可通行的事件
      var targetX = this.x + dx;
      var targetY = this.y + dy;
      var events = $gameMap.eventsXy(targetX, targetY);
      var blocked = events.some(function(event) {
        // 事件存在且未勾选“通过”（即不可通行）
        return event && !event.isThrough();
      });
      if (blocked) continue;

      // 计算移动后的剩余距离（曼哈顿距离）
      var newSx = sx - dx;
      var newSy = sy - dy;
      var newDist = Math.abs(newSx) + Math.abs(newSy);
      validDirections.push({ dir: d, dist: newDist });
    }

    if (validDirections.length === 0) return 0;

    // 首先寻找能减少距离的方向
    var betterDirs = validDirections.filter(function(item) {
      return item.dist < currentDist;
    });

    if (betterDirs.length > 0) {
      // 选择减少距离最多的方向（即距离最小的）
      betterDirs.sort(function(a, b) { return a.dist - b.dist; });
      return betterDirs[0].dir;
    } else {
      // 无法减少距离，则选择增加距离最少的方向（允许绕路）
      validDirections.sort(function(a, b) { return a.dist - b.dist; });
      return validDirections[0].dir;
    }
  };
})();