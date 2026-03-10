//=============================================================================
// SimpleMenuLayout.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/10/28 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc 简单菜单屏幕系统
 * @author Tsumio 汉化：硕明云书
 *
 * @param ----Basic Settings----
 * @text ----基本设置----
 * @desc 
 * @default 
 * 
 * @param MenuWidth
 * @text 菜单宽度
 * @type number
 * @desc Set the width of the menu window.
 * @default 240
 * 
 * @param MenuCols
 * @text 菜单列
 * @type number
 * @desc Set the cols of the menu window.
 * @default 1
 * 
 * @param MenuXPosition
 * @text 菜单X位置
 * @type struct<XPos>
 * @desc 设置菜单窗口的X位置。
 * @default {"basis":"center","correction":"0"}
 * 
 * @param MenuYPosition
 * @text 菜单Y位置
 * @type struct<YPos>
 * @desc Set the Y position of the menu window.
 * @default {"basis":"center","correction":"0"}
 * 
 * @help 
 * 
 * ----特色----
 * -> 重塑菜单场景。
 * -> 根据菜单场景中的第一个字符显示图片。
 * 
 * ----如何使用----
 * 插件的引入将改变菜单场景的设计。
 * 
 * 要根据第一个字符显示图片，请在角色的备注字段中写下以下内容。
 * <stand_sml:["fileName","X","Y"]>
 * 
 * 实例:
 * <stand_sml:["001","350","50"]>  透明图
 * <stand_sml:["002","0","0"]>
 * 图像文件从img/tsumio文件夹中读取。
 * 
 * --使用条款--
 * 该插件免费用于商业和非商业用途。
 * 您可以编辑源代码以满足您的需要，
 * 只要你不声称源代码属于你。
 * 
 */
/*:ja
 * @plugindesc シンプルなメニュー画面を実装します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param メニュー幅

 * @type number
 * @desc メニューウィンドウの幅を指定します。
 * @default 240
 * 
 * @param メニュー列数
 * @type number
 * @desc メニューウィンドウの列数を指定します。
 * @default 1
 * 
 * @param メニューX座標
 * @type struct<XPos>
 * @desc メニューウィンドウのX座標を指定します。
 * @default {"basis":"center","correction":"0"}
 * 
 * @param メニューY座標
 * @type struct<YPos>
 * @desc メニューウィンドウのY座標を指定します。
 * @default {"basis":"center","correction":"0"}
 * 
 * @help シンプルなメニュー画面を実装します。
 * 
 * 【特徴】
 * ・メニュー画面のデザインを変更します。
 * ・先頭のキャラクターに合わせて一枚絵を表示できます。
 * 
 * 【使用方法】
 * プラグインを導入するとメニュー画面のデザインが変更されます。
 * 
 * 先頭のキャラクターに合わせて一枚絵を表示するには、アクターのメモ欄に以下のような記述をします。
 * <stand_sml:["ファイル名","X座標","Y座標"]>
 * 
 * 例：<stand_sml:["Package1_2","400","50"]>
 * 
 * なお、画像ファイルはimg/tsumioフォルダから読み込まれます。
 * 
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2017/10/28 公開。
 * 
 * 【備考】
 * 当プラグインを利用したことによるいかなる損害に対しても、制作者は一切の責任を負わないこととします。
 * 
 * 【利用規約】
 * ソースコードの著作権者が自分であると主張しない限り、
 * 作者に無断で改変、再配布が可能です。
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 自由に使用してください。
 * 
 */
/*~struct~XPos:
 *
 * @param basis
 * @text 横向对齐位置
 * @type select
 * @option right
 * @option left
 * @option center
 * @desc left=左 right=右 center=中心
 * 
 * @param correction
 * @text 补正
 * @type number
 * @min -3000
 * @max 3000
 * @desc 补正值
 */
/*~struct~YPos:
 *
 * @param basis
 * @text 竖向对齐位置
 * @type select
 * @option top
 * @option bottom
 * @option center
 * @desc top=上 bottom=下 center=中心
 * 
 * @param correction
 * @text 补正
 * @type number
 * @min -3000
 * @max 3000
 * @desc 补正值
 */

(function() {
    'use strict';
    var pluginName = 'SimpleMenuLayout';


////=============================================================================
//// Local function
////  These functions checks & formats pluguin's command parameters.
////  I borrowed these functions from Triacontane.Thanks!
////=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    //This function is not written by Triacontane.Tsumio wrote this function !
    var convertParam = function(param) {
        if(param !== undefined){
            try {
                return JSON.parse(param);
            }catch(e){
                console.group();
                console.error('%cParameter is invalid ! You should check the following parameter !','background-color: #5174FF');
                console.error('Parameter:' + eval(param));
                console.error('Error message :' + e);
                console.groupEnd();
            }
        }
    };

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic Stteings
    param.menuWidth         = getParamNumber(['MenuWidth', 'メニュー幅']);
    param.menuCols          = getParamNumber(['MenuCols', 'メニュー列数']);
    param.menuXPos          = getParamString(['MenuXPosition', 'メニューX座標']);
    param.menuYPos          = getParamString(['MenuYPosition', 'メニューY座標']);

////==============================
//// Convert parameters.
////==============================
    param.menuXPos    = convertParam(param.menuXPos);
    param.menuYPos    = convertParam(param.menuYPos);

////==============================
//// Convert to Number.
////==============================
    //None

////==============================
//// Add tsumio folder to ImageManager.
////==============================
    ImageManager.loadTsumio = function(filename) {
        return this.loadBitmap('img/tsumio/', filename, 0, true);
    };

////=============================================================================
//// SceneManager
////  Snap clear background.
////=============================================================================
    const _SceneManager_snapForBackground = SceneManager.snapForBackground;
    SceneManager.snapForBackground = function() {
        _SceneManager_snapForBackground.call(this);
        
        if(SceneManager.isNextScene(Scene_Menu)){
            this._backgroundBitmap = this.snap();
        }
    };

////=============================================================================
//// Scene_Menu
////  New simple menu scene!
////=============================================================================
    const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
    Scene_Menu.prototype.initialize = function() {
        _Scene_Menu_initialize.call(this);

        this._metaData = null;
    };

    const _Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function() {
        _Scene_Menu_start.call(this);
        this.hideUnnecessaryWindows();
        this.resetMenuWindowPos();
    };

    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);

        const actor = $gameParty.members()[0];
        this.setMetaData(actor);
        this.createStandPicture();
    };

    Scene_Menu.prototype.createStandPicture = function() {
        const fileName = this.getMetaData()[0];
        const x        = Number(this.getMetaData()[1]);
        const y        = Number(this.getMetaData()[2]);

        if(!fileName){
            return;
        }
        //Create and addChild.
        const picture = new Sprite(ImageManager.loadTsumio(fileName));
        picture.x = x;
        picture.y = y;
        this.addChild(picture);
    };

    const _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        _Scene_Menu_commandPersonal.call(this);
        this.onPersonalOk();//Skip selecting character in status window. 
    };

    Scene_Menu.prototype.hideUnnecessaryWindows = function() {
        this._statusWindow.hide();
        this._goldWindow.hide();
    };

    Scene_Menu.prototype.resetMenuWindowPos = function() {
        const width  = this._commandWindow.width;
        const height = this._commandWindow.height;
        this._commandWindow.x = MenuPosition.x(width);
        this._commandWindow.y = MenuPosition.y(height);
    };

    Scene_Menu.prototype.setMetaData = function(actor) {
        const actorId = actor.actorId();
        if($dataActors[actorId].meta['stand_sml']){
            this._metaData = JSON.parse($dataActors[actorId].meta['stand_sml']);
        }else{
            //Assign blank data.
            this._metaData = [null, 0, 0];
        }
    };

    Scene_Menu.prototype.getMetaData = function() {
        return this._metaData;
    };


////=============================================================================
//// Scene_Menu
////  New simple menu window!
////=============================================================================
    Window_MenuCommand.prototype.windowWidth = function() {
        return param.menuWidth;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return param.menuCols;
    };

    Window_MenuCommand.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    
    Window_MenuCommand.prototype.numVisibleRows = function() {
        return Math.ceil(this.maxItems() / this.maxCols());
    };

////=============================================================================
//// MenuPosition
////  This static class is for calculate Window position.
////=============================================================================
    class MenuPosition {
        static basisX(width){
            switch(param.menuXPos.basis){
                case 'right' :
                    return Graphics.boxWidth - width;
                    break;
                case 'left' :
                    return 0;
                    break;
                case 'center' :
                    return Graphics.boxWidth/2 - width/2;
                    break;
                default :
                    return 0;
                    break;
            }
        }

        static get correctX(){
            return Number(param.menuXPos.correction);
        }

        static x(width){
            return this.basisX(width) + this.correctX;
        }

        static basisY(height){
            switch(param.menuYPos.basis){
                case 'top' :
                    return 0;
                    break;
                case 'bottom' :
                    return Graphics.boxHeight - height;
                    break;
                case 'center' :
                    return Graphics.boxHeight/2 - height/2;
                    break;
                default :
                    return 0;
                    break;
            }
        }

        static get correctY(){
            return Number(param.menuYPos.correction);
        }

        static y(height){
            return this.basisY(height) + this.correctY;
        }
    }


////=============================================================================
//// Debug
////  This static class is for simple debugging.I/O.
////=============================================================================
    class Debug {
        /**
         * Instead of constructor.
         * At debugging, this method should be executed on loaded.
         */
        static on() {
            this._debugMode = true;
            this._stack     = [];
            console.warn(`${this.FILENAME} : Debug mode turned ON.`);
        }

        /**
         * Instead of constructor.
         * At release, this method should be executed on loaded.
         */
        static off() {
            this._debugMode = false;
            this._stack     = [];
            console.warn(`${this.FILENAME} : Debug mode turned OFF.`);
        }

        static get FILENAME(){
            return 'SimpleMenuLayout';
        }

        static get isDebugMode() {
            return this._debugMode;
        }

        static outputStack() {
            if(!this.isDebugMode){
                return;
            }

            if(this._stack.length > 0){
                this._stack.forEach(function(element) {
                    console.log(element);
                }, this);
                return `Stack length is ${this._stack.length}.`;
            }
            return 'Stack length is 0.';
        }

        static clearStack() {
            if(!this.isDebugMode){
                return;
            }

            this._stack = [];
        }

        static push(arg) {
            if(!this.isDebugMode){
                return;
            }

            this._stack.push(arg);
        }

        /**
         * Private method.
         * @param {Function} func
         * @param {Array} args
         */
        static _output(func, args) {
            if(!this.isDebugMode){
                return;
            }

            args = Array.prototype.slice.call(args);//ES6: Array.from(args);
            for(var arg of args) {
                console[func](arg);
                this.push(args);
            }
        }

        static log(args) {
            this._output('log', arguments);
        }

        static dir(args) {
            this._output('dir', arguments);
        }

        static info(args) {
            this._output('info', arguments);
        }

        static warn(args) {
            this._output('warn', arguments);
        }

        static error(args) {
            this._output('error', arguments);
        }

        static assert(test, message, optionalParam) {
            if(!this.isDebugMode){
                return;
            }

            console.assert(test, message, optionalParam);
        }

        static modify() {
            this._debugMode = !this._debugMode;
            var status      = this._debugMode ? 'ON' : 'OFF';
            console.warn(`Debug mode turned ${status}.`);
        }
    }

    //Debug.on();
    Debug.off();

})();