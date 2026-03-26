/*:
 * @plugindesc 全局加载图（过场图覆盖）
 * @author 基于原插件修改
 * @help 
 * 
 * 用法：
 * 在事件中插入脚本：showLoadingOverlay();
 * 然后执行场所移动或其他场景切换命令。
 * 过场图会一直显示，直到新场景完全显示后自动消失。
 * 
 * 也可以手动隐藏：hideLoadingOverlay();
 */
 
(function() {
    // 配置参数
    var FADE_IN_DURATION = 40;   // 淡入帧数
    var FADE_OUT_DURATION = 40;  // 淡出帧数
    var FPS = 60;                // 假设游戏帧率

    // 随机图片列表（请替换为您的图片文件名）
    var bitmaps = [
        ImageManager.loadPicture('tips1'),
        ImageManager.loadPicture('tips2'),
        ImageManager.loadPicture('tips3'),
        ImageManager.loadPicture('tips4')
    ];

    // 全局变量
    var _overlaySprite = null;   // 当前覆盖层精灵
    var _phase = null;           // 当前状态：'fade_in', 'idle', 'fade_out'
    var _fadeInCounter = 0;
    var _fadeOutCounter = 0;
    var _fadeInOpacityRate = 0;
    var _fadeOutOpacityRate = 0;
    var _retryTimer = null;      // 重试定时器

    // 获取根舞台（兼容多种情况）
    function getRootStage() {
        // 优先使用 Graphics._stage（MV/MZ 标准）
        if (Graphics._stage) return Graphics._stage;
        // 备选：如果 SceneManager._scene 存在，取其父容器（通常是舞台）
        if (SceneManager._scene && SceneManager._scene.parent) return SceneManager._scene.parent;
        // 都没有则返回 null
        return null;
    }

    // 立即移除覆盖层（无动画）
    function removeOverlayImmediately() {
        if (_retryTimer) {
            clearTimeout(_retryTimer);
            _retryTimer = null;
        }
        if (_overlaySprite) {
            if (_overlaySprite.parent) {
                _overlaySprite.parent.removeChild(_overlaySprite);
            }
            _overlaySprite.bitmap = null;
            _overlaySprite = null;
        }
        _phase = null;
    }

    // 开始淡入（在覆盖层已添加到舞台后调用）
    function startFadeIn() {
        _fadeInCounter = Math.floor(FADE_IN_DURATION * FPS / 60);
        _fadeInOpacityRate = 255.0 / (_fadeInCounter + 1);
        _phase = 'fade_in';
    }

    // 开始淡出
    function startFadeOut() {
        if (_phase === 'fade_out') return; // 已在淡出中
        _fadeOutCounter = Math.floor(FADE_OUT_DURATION * FPS / 60);
        _fadeOutOpacityRate = 255.0 / (_fadeOutCounter + 1);
        _phase = 'fade_out';
    }

    // 创建覆盖层（支持延迟重试）
    function createOverlay() {
        // 如果已有覆盖层，先移除
        if (_overlaySprite) {
            removeOverlayImmediately();
        }

        var stage = getRootStage();
        if (!stage) {
            // 舞台尚未准备好，延迟重试
            if (_retryTimer) return;
            _retryTimer = setTimeout(function() {
                _retryTimer = null;
                createOverlay();
            }, 16); // 约一帧后重试
            return;
        }

        // 创建精灵
        _overlaySprite = new Sprite();
        var randomBitmap = bitmaps[Math.floor(Math.random() * bitmaps.length)];
        _overlaySprite.bitmap = randomBitmap;
        _overlaySprite.x = 0;
        _overlaySprite.y = 0;
        _overlaySprite.opacity = 0;
        stage.addChild(_overlaySprite);
        startFadeIn();
    }

    // 每帧更新覆盖层（淡入/淡出）
    function updateOverlay() {
        if (!_overlaySprite) return;
        switch (_phase) {
            case 'fade_in':
                _overlaySprite.opacity += Math.ceil(_fadeInOpacityRate);
                _fadeInCounter--;
                if (_fadeInCounter <= 0) {
                    _overlaySprite.opacity = 255;
                    _phase = 'idle';  // 淡入完成，保持显示
                }
                break;
            case 'fade_out':
                _overlaySprite.opacity -= Math.ceil(_fadeOutOpacityRate);
                _fadeOutCounter--;
                if (_fadeOutCounter <= 0) {
                    removeOverlayImmediately(); // 淡出完成，彻底移除
                }
                break;
            case 'idle':
                // 保持显示，不做任何更新
                break;
        }
    }

    // 公开函数：显示加载覆盖层
    window.showLoadingOverlay = function() {
        createOverlay();
        // 确保更新钩子存在（将 updateOverlay 注入 SceneManager 的更新循环）
        if (!window._loadingOverlayUpdaterAdded) {
            var originalUpdate = SceneManager.update;
            SceneManager.update = function() {
                originalUpdate.apply(this, arguments);
                updateOverlay();
            };
            window._loadingOverlayUpdaterAdded = true;
        }
    };

    // 公开函数：手动隐藏覆盖层（淡出）
    window.hideLoadingOverlay = function() {
        if (_overlaySprite) {
            startFadeOut();
        }
    };

    // 自动隐藏：新场景启动时自动开始淡出覆盖层
    var _Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        _Scene_Base_start.call(this);
        if (_overlaySprite) {
            startFadeOut();
        }
    };
})();