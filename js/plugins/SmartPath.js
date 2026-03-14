//=============================================================================
// Smart Pathfinding
// by Shaz
// Last Updated: 2015.10.21
//=============================================================================

/*:
 * @plugindesc 智能寻路事件追逐
 * @author Shaz
 *
 * @help
===============================================================================
  介绍
===============================================================================

  允许事件或玩家进行智能寻路

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
 *
 
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
 * @plugindesc イベントもしくはプレイヤーに、高度な経路探索を提供します。
 * @author Shaz
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
})();
