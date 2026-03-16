})();
//=============================================================================
// Smart Pathfinding
// by Shaz
// Last Updated: 2015.10.21
// Modified: 2025.04.09 - Added stuck detection + re-route, fixed player obstacle switch
// Modified: 2025.04.14 - Fixed player obstacle switch (now truly passable) & stuck retry limit
//=============================================================================

/*:
 * @plugindesc 智能寻路事件追逐 (增强版：卡死自动重寻 + 玩家障碍开关 + 重试限制)
 * @author Shaz (modified by assistant)
 *
 * @param playerObstacleSwitchId
 * @text 玩家障碍开关ID
 * @desc 输入开关ID，当此开关为ON时，玩家不被视为障碍物；OFF或0时，玩家视为障碍。
 * @type number
 * @default 0
 *
 * @param stuckFrames
 * @text 卡死判定帧数
 * @desc 怪物停止移动多少帧后判定为卡死（60帧≈1秒），默认180帧≈3秒。
 * @type number
 * @default 180
 *
 * @param maxStuckRetries
 * @text 最大卡死重试次数
 * @desc 连续卡死重新寻路超过此次数后自动放弃目标，防止无限循环。默认3次。
 * @type number
 * @default 3
 *
 * @help
===============================================================================
  介绍
===============================================================================

  允许事件或玩家进行智能寻路。增强版功能：
  - 动态避开不可通行的事件（如箱子）
  - 允许绕路：无法直接靠近目标时选择暂时远离
  - 玩家障碍开关：可控制是否将玩家视为障碍（现在真正生效，事件可移动到玩家所在格）
  - 卡死检测：若怪物3秒未移动且未到达目标，自动重新寻路；连续多次卡死则放弃目标

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
 * @plugindesc イベントもしくはプレイヤーに、高度な経路探索を提供します。（スタック検出＋経路再計算＋プレイヤー障害スイッチ＋リトライ制限）
 * @author Shaz (modified by assistant)
 *
 * @param playerObstacleSwitchId
 * @text プレイヤー障害スイッチID
 * @desc スイッチIDを入力。このスイッチがONの時、プレイヤーは障害物と見なされません。OFFまたは0の時は障害物と見なされます。
 * @type number
 * @default 0
 *
 * @param stuckFrames
 * @text スタック判定フレーム数
 * @desc 停止してから再計算するまでのフレーム数（60フレーム≈1秒）。デフォルト180≈3秒。
 * @type number
 * @default 180
 *
 * @param maxStuckRetries
 * @text 最大スタック再試行回数
 * @desc 連続スタック再計算がこの回数を超えると目標を放棄します。デフォルト3。
 * @type number
 * @default 3
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
  // 获取插件参数
  var parameters = PluginManager.parameters('SmartPath');
  var playerObstacleSwitchId = Number(parameters['playerObstacleSwitchId'] || 0);
  var stuckFrames = Number(parameters['stuckFrames'] || 180);
  var maxStuckRetries = Number(parameters['maxStuckRetries'] || 3);

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'SMARTPATH') {
      var subject = this.character(eval(args[0]));
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
    // 新增：卡死检测变量
    this._lastPosX = this.x;
    this._lastPosY = this.y;
    this._stuckCounter = 0;
    // 新增：连续卡死重试计数
    this._stuckRetryCount = 0;
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
    // 重置卡死计数器（因为目标可能改变）
    this._stuckCounter = 0;
    this._lastPosX = this.x;
    this._lastPosY = this.y;
    // 注意：不重置_stuckRetryCount，由updateStop管理
  };

  Game_CharacterBase.prototype.clearTarget = function() {
    this._target = null;
    this._targetX = null;
    this._targetY = null;
    this._stuckCounter = 0;
    this._stuckRetryCount = 0; // 清空目标时也重置重试计数
  };

  var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
  Game_CharacterBase.prototype.updateStop = function() {
    _Game_CharacterBase_updateStop.call(this);

    // 如果有目标，更新目标坐标（如果目标是事件）
    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    }

    // 如果没有目标，无需寻路
    if (this._targetX == null) return;

    // 判断是否到达目标点（曼哈顿距离为0）
    var dx = Math.abs(this.x - this._targetX);
    var dy = Math.abs(this.y - this._targetY);
    if (dx === 0 && dy === 0) {
      // 已到达目标，清除目标（停止移动）
      this.clearTarget();
      return;
    }

    // 卡死检测：检查位置是否变化
    if (this.x === this._lastPosX && this.y === this._lastPosY) {
      this._stuckCounter++;
      if (this._stuckCounter >= stuckFrames) {
        this._stuckCounter = 0; // 重置计数器（重新寻路前）
        this._stuckRetryCount++;
        if (this._stuckRetryCount > maxStuckRetries) {
          // 超过最大重试次数，放弃目标
          this.clearTarget();
          return;
        }
        // 重新设置目标以触发重新寻路
        if (this._target) {
          this.setTarget(this._target);
        } else {
          this.setTarget(null, this._targetX, this._targetY);
        }
      }
    } else {
      // 位置变化，重置计数器
      this._stuckCounter = 0;
      this._lastPosX = this.x;
      this._lastPosY = this.y;
      this._stuckRetryCount = 0; // 能移动，重置重试计数
    }

    // 正常寻路移动
    var direction = this.findDirectionTo(this._targetX, this._targetY);
    if (direction > 0) {
      this.moveStraight(direction);
    }
  };

  //=============================================================================
  // 增强的 findDirectionTo：允许暂时远离目标以绕过障碍，并考虑玩家障碍开关
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

      // 检查目标位置是否有不可通行的障碍（事件或玩家）
      var targetX = this.x + dx;
      var targetY = this.y + dy;

      var blocked = false;

      // 检查玩家是否位于目标格子
      if ($gamePlayer.x === targetX && $gamePlayer.y === targetY) {
        // 如果玩家障碍开关开启（开关为ON），则忽略玩家，不视为障碍
        if (!(playerObstacleSwitchId > 0 && $gameSwitches.value(playerObstacleSwitchId))) {
          blocked = true; // 玩家视为障碍
        }
      }

      // 检查事件（如果尚未被玩家阻塞）
      if (!blocked) {
        var events = $gameMap.eventsXy(targetX, targetY);
        blocked = events.some(function(event) {
          // 事件存在且未勾选“通过”（即不可通行）
          return event && !event.isThrough();
        });
      }

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

  //=============================================================================
  // 修复玩家障碍开关：让事件能实际移动到玩家所在格子
  // 重写 canPass，当目标格子有玩家且开关开启时，忽略玩家碰撞
  //=============================================================================
  var _Game_Character_canPass = Game_Character.prototype.canPass;
  Game_Character.prototype.canPass = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (!$gameMap.isValid(x2, y2)) return false;
    if (this.isThrough() || this.isDebugThrough()) return true;
    if (!this.isMapPassable(x, y, d)) return false;

    // 如果目标格子有玩家且玩家障碍开关开启，则忽略玩家，只检查其他事件
    var playerOnTarget = ($gamePlayer.x === x2 && $gamePlayer.y === y2);
    if (playerOnTarget && playerObstacleSwitchId > 0 && $gameSwitches.value(playerObstacleSwitchId)) {
      // 检查其他事件是否阻塞
      var events = $gameMap.eventsXy(x2, y2).filter(function(e) { return e !== $gamePlayer; });
      var collision = events.some(function(event) {
        return event && !event.isThrough();
      });
      return !collision;
    } else {
      // 正常碰撞检测
      if (this.isCollidedWithCharacters(x2, y2)) return false;
    }
    return true;
  };
})();