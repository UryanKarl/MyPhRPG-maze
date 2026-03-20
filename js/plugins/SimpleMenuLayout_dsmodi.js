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
 * @plugindesc 简单菜单屏幕系统 (支持角色变量切换背景 + 参数强制生效)
 * @author Tsumio 汉化：硕明云书 | 修改：根据变量动态切换 + 窗口尺寸修复 + 参数强制覆盖
 *
 * @param ----Basic Settings----
 * @text ----基本设置----
 * @desc 
 * @default 
 * 
 * @param MenuWidth
 * @text 菜单宽度
 * @type number
 * @desc 菜单窗口的宽度（请输入整数，例如120）。
 * @default 120
 * 
 * @param MenuCols
 * @text 菜单列数
 * @type number
 * @desc 菜单窗口的列数（默认1）。
 * @default 1
 * 
 * @param MenuXPosition
 * @text 菜单X位置
 * @type struct<XPos>
 * @desc 设置菜单窗口的X位置。格式：{"basis":"left","correction":"50"} (basis可选left/center/right)
 * @default {"basis":"left","correction":"50"}
 * 
 * @param MenuYPosition
 * @text 菜单Y位置
 * @type struct<YPos>
 * @desc 设置菜单窗口的Y位置。格式：{"basis":"top","correction":"0"} (basis可选top/center/bottom)
 * @default {"basis":"top","correction":"50"}
 * 
 * @help 
 * 
 * ----特色----
 * -> 重塑菜单场景。
 * -> 根据菜单场景中的第一个角色显示图片。
 * -> 支持根据变量动态切换图片文件名（格式：原文件名_变量值）。
 * 
 * ----如何使用----
 * 插件的引入将改变菜单场景的设计。
 * 
 * 要根据第一个角色显示图片，请在角色的备注字段中写下以下内容：
 * <stand_sml:["fileName","X","Y"]>
 * 如果需要根据变量切换，添加第四个参数（变量ID）：
 * <stand_sml:["fileName","X","Y", 变量ID]>
 * 
 * 实例:
 * <stand_sml:["001","350","50"]>          // 不使用变量，固定显示001图片
 * <stand_sml:["001","350","50",101]>      // 使用101号变量，显示001_变量值.png
 * 
 * 图像文件从img/tsumio文件夹中读取。
 * 
 * --使用条款--
 * 该插件免费用于商业和非商业用途。
 * 您可以编辑源代码以满足您的需要，
 * 只要不声称源代码属于您。
 * 
 */
/*:ja
 * @plugindesc シンプルなメニュー画面を実装します。(変数による画像切替対応)
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param メニュー幅
 * @text 菜单宽度
 * @type number
 * @desc メニューウィンドウの幅を指定します。
 * @default 240
 * 
 * @param メニュー列数
 * @text 菜单列数
 * @type number
 * @desc メニューウィンドウの列数を指定します。
 * @default 1
 * 
 * @param メニューX座標
 * @text 菜单X位置
 * @type struct<XPos>
 * @desc メニューウィンドウのX座標を指定します。形式：{"basis":"center","correction":"0"} (basisはleft/center/right)
 * @default {"basis":"center","correction":"0"}
 * 
 * @param メニューY座標
 * @text 菜单Y位置
 * @type struct<YPos>
 * @desc メニューウィンドウのY座標を指定します。形式：{"basis":"center","correction":"0"} (basisはtop/center/bottom)
 * @default {"basis":"center","correction":"0"}
 * 
 * @help シンプルなメニュー画面を実装します。
 * 
 * 【特徴】
 * ・メニュー画面のデザインを変更します。
 * ・先頭のキャラクターに合わせて一枚絵を表示できます。
 * ・変数の値に応じて画像ファイル名を動的に変更できます（元のファイル名_変数値）。
 * 
 * 【使用方法】
 * プラグインを導入するとメニュー画面のデザインが変更されます。
 * 
 * 先頭のキャラクターに合わせて一枚絵を表示するには、アクターのメモ欄に以下のような記述をします。
 * <stand_sml:["ファイル名","X座標","Y座標"]>
 * 変数による切替を行いたい場合は、第4引数に変数IDを追加します。
 * <stand_sml:["ファイル名","X座標","Y座標", 変数ID]>
 * 
 * 例：<stand_sml:["Package1_2","400","50"]>
 * 例：<stand_sml:["Package1_2","400","50", 101]>
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

    // 调试开关（设为true可在控制台查看窗口信息）
    var DEBUG = true;

////=============================================================================
//// Local function
////=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    var getParamNumber = function(paramNames, defaultValue) {
        var value = getParamString(paramNames);
        var num = parseInt(value);
        if (isNaN(num)) return defaultValue;
        return num;
    };

    // 安全解析JSON，无效返回null且不打印错误
    var safeParse = function(str) {
        if (!str || typeof str !== 'string') return null;
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    };

////=============================================================================
//// Get and set plugin parameters.
////=============================================================================
    var param = {};

    // 读取菜单宽度和列数，并设置默认值
    param.menuWidth = getParamNumber(['MenuWidth', 'メニュー幅'], 110);
    param.menuCols  = getParamNumber(['MenuCols', 'メニュー列数'], 1);

    // 确保列数至少为1
    if (param.menuCols < 1) param.menuCols = 1;

    // 读取位置参数
    var xPosStr = getParamString(['MenuXPosition', 'メニューX座標']);
    var yPosStr = getParamString(['MenuYPosition', 'メニューY座標']);

    param.menuXPos = safeParse(xPosStr);
    param.menuYPos = safeParse(yPosStr);

    // 若解析失败或无效，使用默认值
    if (!param.menuXPos || typeof param.menuXPos !== 'object') {
        param.menuXPos = { basis: 'left', correction: 70 };
        if (DEBUG) console.log('MenuXPosition使用默认值: left, 50');
    }
    if (!param.menuYPos || typeof param.menuYPos !== 'object') {
        param.menuYPos = { basis: 'top', correction: 70 };
        if (DEBUG) console.log('MenuYPosition使用默认值: top, 50');
    }

    // 强制将补正转为数字
    param.menuXPos.correction = Number(param.menuXPos.correction) || 0;
    param.menuYPos.correction = Number(param.menuYPos.correction) || 0;

    // 输出最终使用的参数，方便用户核对
    if (DEBUG) {
        console.log('========== SimpleMenuLayout 参数 ==========');
        console.log('菜单宽度:', param.menuWidth);
        console.log('菜单列数:', param.menuCols);
        console.log('菜单X位置:', JSON.stringify(param.menuXPos));
        console.log('菜单Y位置:', JSON.stringify(param.menuYPos));
        console.log('===========================================');
    }

////==============================
//// Add tsumio folder to ImageManager.
////==============================
    ImageManager.loadTsumio = function(filename) {
        return this.loadBitmap('img/tsumio/', filename, 0, true);
    };

////=============================================================================
//// SceneManager
////=============================================================================
    const _SceneManager_snapForBackground = SceneManager.snapForBackground;
    SceneManager.snapForBackground = function() {
        _SceneManager_snapForBackground.call(this);
        if (SceneManager.isNextScene(Scene_Menu)) {
            this._backgroundBitmap = this.snap();
        }
    };

////=============================================================================
//// Scene_Menu
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
        _Scene_Menu_create.call(this); // 创建基础窗口（含命令窗口）

        const actor = $gameParty.members()[0];
        this.setMetaData(actor);
        this.createStandPicture();

        // 确保命令窗口可见并置于顶层
        if (this._commandWindow) {
            // 移除并重新添加，保证在图片之上
            this.removeChild(this._commandWindow);
            this.addChild(this._commandWindow);
            
            // 强制窗口不透明且可见
            this._commandWindow.show();
            this._commandWindow.opacity = 255;
            this._commandWindow.visible = true;

            if (DEBUG) console.log('命令窗口已提升至顶层');
        }

        // 调试：输出窗口信息
        if (DEBUG && this._commandWindow) {
            console.log('命令窗口可见性:', this._commandWindow.visible);
            console.log('窗口位置:', this._commandWindow.x, this._commandWindow.y);
            console.log('窗口尺寸:', this._commandWindow.width, this._commandWindow.height);
        }
    };

    Scene_Menu.prototype.createStandPicture = function() {
        var meta = this.getMetaData();
        var fileName = meta[0];
        var x = Number(meta[1]);
        var y = Number(meta[2]);

        if (!fileName) return;

        var picture = new Sprite(ImageManager.loadTsumio(fileName));
        picture.x = x;
        picture.y = y;
        this.addChild(picture);
        if (DEBUG) console.log('添加图片:', fileName, '位置:', x, y);
    };

    const _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        _Scene_Menu_commandPersonal.call(this);
        this.onPersonalOk(); // Skip selecting character in status window.
    };

    Scene_Menu.prototype.hideUnnecessaryWindows = function() {
        this._statusWindow.hide();
        this._goldWindow.hide();
    };

    Scene_Menu.prototype.resetMenuWindowPos = function() {
        if (!this._commandWindow) return;
        var width = this._commandWindow.width;
        var height = this._commandWindow.height;

        // 防止窗口高度为Infinity（正常情况下不应发生，但为保险起见）
        if (!isFinite(height) || height <= 0) {
            height = this._commandWindow.fittingHeight(1); // 至少一行的高度
        }

        this._commandWindow.x = MenuPosition.x(width);
        this._commandWindow.y = MenuPosition.y(height);
        if (DEBUG) {
            console.log('重置窗口位置: x=' + this._commandWindow.x + ', y=' + this._commandWindow.y);
        }
    };

    Scene_Menu.prototype.setMetaData = function(actor) {
        var actorId = actor.actorId();
        var metaArray = null;
        if ($dataActors[actorId].meta['stand_sml']) {
            metaArray = JSON.parse($dataActors[actorId].meta['stand_sml']);
        } else {
            metaArray = [null, 0, 0];
        }

        // 检查是否存在第四参数（变量ID）
        if (metaArray && metaArray.length >= 4) {
            var varId = Number(metaArray[3]);
            if (!isNaN(varId) && varId > 0) {
                var value = $gameVariables.value(varId);
                var baseName = String(metaArray[0]);
                metaArray[0] = baseName + "_" + value;
                if (DEBUG) console.log('变量切换文件名:', metaArray[0]);
            }
        }

        // 确保数组至少有3个元素
        while (metaArray.length < 3) {
            metaArray.push(0);
        }

        this._metaData = metaArray;
    };

    Scene_Menu.prototype.getMetaData = function() {
        return this._metaData;
    };

////=============================================================================
//// Window_MenuCommand
////=============================================================================
    Window_MenuCommand.prototype.windowWidth = function() {
        return param.menuWidth;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return param.menuCols;
    };

    Window_MenuCommand.prototype.windowHeight = function() {
        // 防止高度无限
        var rows = this.numVisibleRows();
        if (rows <= 0) rows = 1;
        return this.fittingHeight(rows);
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        var items = this.maxItems();
        var cols = this.maxCols();
        if (cols <= 0) cols = 1; // 额外保护
        return Math.ceil(items / cols);
    };

////=============================================================================
//// MenuPosition
////=============================================================================
    var MenuPosition = {
        basisX: function(width) {
            var xPos = param.menuXPos || { basis: 'center', correction: 0 };
            switch (xPos.basis) {
                case 'right':  return Graphics.boxWidth - width;
                case 'left':   return 0;
                case 'center': return Graphics.boxWidth / 2 - width / 2;
                default:       return 0;
            }
        },
        correctX: function() {
            var xPos = param.menuXPos || { basis: 'center', correction: 0 };
            return Number(xPos.correction) || 0;
        },
        x: function(width) {
            return this.basisX(width) + this.correctX();
        },
        basisY: function(height) {
            var yPos = param.menuYPos || { basis: 'center', correction: 0 };
            switch (yPos.basis) {
                case 'top':    return 0;
                case 'bottom': return Graphics.boxHeight - height;
                case 'center': return Graphics.boxHeight / 2 - height / 2;
                default:       return 0;
            }
        },
        correctY: function() {
            var yPos = param.menuYPos || { basis: 'center', correction: 0 };
            return Number(yPos.correction) || 0;
        },
        y: function(height) {
            return this.basisY(height) + this.correctY();
        }
    };

})();