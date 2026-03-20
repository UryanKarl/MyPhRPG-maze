/*:
 * @plugindesc 随机加载图
 * @author （缺失（B站某up主
 * @help 
 * 
 * ----特色----
 * -> 在需要的地方插入加载图，
 * -> 图像文件从img/picture文件夹中读取。（或者在下方代码中更改
 * -> 根据下方代码里加入的图片随机出现。
 * 
 * ----如何使用----
 * 插入脚本：SceneManager.push(Scene_GoodFortune);
 * 
 * --使用条款--
 * 缺失
 * 
 */
 
////=============================================================================
 (function() {
    // Constants
    var FADE_IN_DURATION = 40;
    var FADE_OUT_DURATION = 40;
    var FADE_IN_FPS = 30;
    var FADE_OUT_FPS = 30;
    var DISPLAY_DURATION = 110;

    // Scene class
    function Scene_GoodFortune() {
        this.initialize.apply(this, arguments);
    }

    Scene_GoodFortune.prototype = Object.create(Scene_Base.prototype);
    Scene_GoodFortune.prototype.constructor = Scene_GoodFortune;

    Scene_GoodFortune.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_GoodFortune.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this.createSprite();
        this._fadeInCounter = FADE_IN_DURATION * FADE_IN_FPS / 60;
        this._displayCounter = DISPLAY_DURATION;
        this._fadeOutCounter = FADE_OUT_DURATION * FADE_OUT_FPS / 60;
        this._fadeInOpacityRate = 255.0 / (this._fadeInCounter + 1);
        this._fadeOutOpacityRate = 255.0 / (this._fadeOutCounter + 1);
        this._sprite.opacity = 0;
        this._phase = 'fade_in';
    };

    Scene_GoodFortune.prototype.update = function() {
        Scene_Base.prototype.update.call(this);

        switch (this._phase) {
            case 'fade_in':
                this.updateFadeIn();
                break;
            case 'display':
                this.updateDisplay();
                break;
            case 'fade_out':
                this.updateFadeOut();
                break;
        }
    };

    Scene_GoodFortune.prototype.updateFadeIn = function() {
        this._sprite.opacity += Math.ceil(this._fadeInOpacityRate);
        this._fadeInCounter--;

        if (this._fadeInCounter <= 0) {
            this._phase = 'display';
        }
    };

    Scene_GoodFortune.prototype.updateDisplay = function() {
        this._displayCounter--;

        if (this._displayCounter <= 0) {
            this._phase = 'fade_out';
        }
    };

    Scene_GoodFortune.prototype.updateFadeOut = function() {
        this._sprite.opacity -= Math.ceil(this._fadeOutOpacityRate);
        this._fadeOutCounter--;

        if (this._fadeOutCounter <= 0) {
            this.disposeSprite();
            SceneManager.pop();
        }
    };

    Scene_GoodFortune.prototype.createSprite = function() {
        this._sprite = new Sprite();
        this._bitmap = this.randomBitmap();
        this._sprite.bitmap = this._bitmap;
        this.centerSprite(this._sprite);
        this.addChild(this._sprite);
    };

    Scene_GoodFortune.prototype.disposeSprite = function() {
        this._sprite.bitmap = null;
        this.removeChild(this._sprite);
    };

    Scene_GoodFortune.prototype.randomBitmap = function() {
        var bitmaps = [
            ImageManager.loadPicture('tips1'),
            ImageManager.loadPicture('tips2'),
            ImageManager.loadPicture('tips3'),
            ImageManager.loadPicture('tips4')
        ];

        return bitmaps[Math.floor(Math.random() * bitmaps.length)];
    };

    Scene_GoodFortune.prototype.centerSprite = function(sprite) {
        sprite.x = 0;
        sprite.y = 0;
        //sprite.x = (Graphics.width - sprite.width) / 2;
        //sprite.y = (Graphics.height - sprite.height) / 2;
    };

    window.Scene_GoodFortune = Scene_GoodFortune;
})();
