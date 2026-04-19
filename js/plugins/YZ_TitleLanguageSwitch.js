/*:
 * @plugindesc v1.0 根据当前语言动态切换标题画面图片
 * @author 你的名字
 * @help 
 * 此插件需要配合 YZ_yuyan_qiehuan.js 使用。
 * 当游戏语言切换后，返回标题界面时会自动显示对应的标题图片。
 * 
 * 请在下方参数中设置中英文标题图片的文件名（无需扩展名，图片放在 img/titles1 目录下）。
 * 
 * @param chineseTitleImage
 * @desc 中文标题图片文件名（不含扩展名）
 * @default Title_CN
 * 
 * @param englishTitleImage
 * @desc 英文标题图片文件名（不含扩展名）
 * @default Title_EN
 */

(function() {
    // 获取插件参数
    var parameters = PluginManager.parameters('YZ_TitleLanguageSwitch');
    var chineseImg = parameters['chineseTitleImage'] || 'Title_CN';
    var englishImg = parameters['englishTitleImage'] || 'Title_EN';

    // 保存原始方法
    var _Scene_Title_createBackground = Scene_Title.prototype.createBackground;

    // 重写 createBackground
    Scene_Title.prototype.createBackground = function() {
        var lang = ConfigManager.yuyan_diaoyong;   // 1=中文, 2=英文
        var originalTitle1 = $dataSystem.title1Name;

        // 根据语言设置标题图片名
        if (lang === 1) {
            $dataSystem.title1Name = chineseImg;
        } else if (lang === 2) {
            $dataSystem.title1Name = englishImg;
        } else {
            // 默认使用中文图片
            $dataSystem.title1Name = chineseImg;
        }

        // 调用原始方法，此时会使用上面设置的图片
        _Scene_Title_createBackground.call(this);

        // 恢复原始图片名，避免影响数据库（背景已生成，恢复无影响）
        $dataSystem.title1Name = originalTitle1;
    };
})();