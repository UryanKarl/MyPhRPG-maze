/*:
 * Yami Engine Delta - Word Wrap
 *
 * @plugindesc YED文本自动换行功能（智能换行 + 中英文不同字号）
 * @author Yami Engine Delta [Dr.Yami] (modified)
 *
 * @param Break Word
 * @text 允许拆分单词或数字（已弃用，改为智能判断）
 * @desc 参数已不再使用，插件根据字符类型自动选择换行策略：中文/日文等强制拆分，英文/数字保持完整。
 * @default true
 *
 * @param Chinese Font Size
 * @text 中文字号
 * @desc 中文、日文等CJK字符的字体大小
 * @type number
 * @default 24
 *
 * @param English Font Size
 * @text 英文字号
 * @desc 英文、数字等非CJK字符的字体大小
 * @type number
 * @default 20
 *
 * @help
 
 * 该插件提供自动换行功能
 能将长文本适当拆分为多行
 *
 * 自动换行功能默认处于禁用状态
 要在任何文本（例如消息中）启用自动换行，必须在文本中插入以下代码：
 * ------------
<wrap>
 * ------------
 *
 * 自动换行功能会忽略编辑器中的换行
 因此必须在文本中使用以下代码手动换行：
 * ------------
<br>
 * ------------
 *
 * 智能换行规则：
 * - 对于中文、日文、韩文等CJK字符，采用强制拆分策略（长单词/连续字符可拆分）
 * - 对于英文、数字等非CJK字符，采用单词完整换行策略（保持单词不被分割）
 *
 * 智能字号功能：
 * - 中文/日文等CJK字符使用"中文字号"参数设置的大小（默认24）
 * - 英文/数字等非CJK字符使用"英文字号"参数设置的大小（默认20）
 * 
 * 示例：
 假设在游戏消息中输入以下文本：
<wrap>这是一段非常长的文本内容，还有verylongenglishwordwithoutspaces
没有手动换行，当启用自动换行功能后，插件会根据窗口宽度自动将文本拆分成多行显示。
英文长词会尽量保持完整，中文部分可以在任何位置换行，且中文和英文会以不同字号显示。
 *
 * MIT 协议
 * 
 * ============================================================================
 */

/*:ja
 * Yami Engine Delta - Word Wrap
 *
 * @plugindesc 文章の改行機能を提供します。長文を適切な位置で改行します。（スマート改行＋日中英で異なるフォントサイズ）
 * @author Yami Engine Delta [Dr.Yami] (modified)
 *
 * @param Break Word
 * @desc 改行不可の文章を、改行することができます。（本パラメータは廃止されました。文字種に応じて自動判断します）
 * @default false
 *
 * @param Chinese Font Size
 * @text 日本語/中国語フォントサイズ
 * @desc 日本語・中国語・韓国語などのCJK文字のフォントサイズ
 * @type number
 * @default 24
 *
 * @param English Font Size
 * @text 英数字フォントサイズ
 * @desc 英数字など非CJK文字のフォントサイズ
 * @type number
 * @default 20
 *
 * @help
 * 改行機能はデフォルトでは無効になっています。
 * テキスト内に下記のコードを挿入することで、改行機能を有効にしてください。
 *
 * ------------
 *   <wrap>
 * ------------
 *
 * テキスト内に手動で下記のコードを挿入することで、改行を行います。
 *
 * ------------
 *   <br>
 * ------------
 *
 * スマート改行ルール：
 * - 日本語・中国語・韓国語などのCJK文字は、強制分割（単語内でも分割可能）
 * - 英数字など非CJK文字は、単語を分割せず、スペース単位で改行
 *
 * スマートフォントサイズ機能：
 * - CJK文字は「日本語/中国語フォントサイズ」パラメータで設定したサイズ（デフォルト24）
 * - 英数字は「英数字フォントサイズ」パラメータで設定したサイズ（デフォルト20）
 *
 * ============================================================================
 */

var YED = YED || {};

// init WordWrap module
YED.WordWrap = {};

// 获取插件参数
var parameters = PluginManager.parameters('YED_WordWrap');
YED.WordWrap.BreakWord = parameters['Break Word']; // 保留但不再使用
YED.WordWrap.ChineseFontSize = Number(parameters['Chinese Font Size'] || 24);
YED.WordWrap.EnglishFontSize = Number(parameters['English Font Size'] || 20);

(function($WordWrap) {
    var _Window_Base_processNormalCharacter
        = Window_Base.prototype.processNormalCharacter;
    var _Window_Base_convertEscapeCharacters
        = Window_Base.prototype.convertEscapeCharacters;
    var _Window_Base_resetFontSettings
        = Window_Base.prototype.resetFontSettings;

    // 保存原始字号以便恢复
    var _baseFontSize = 28; // 默认字号

    /**
     * 判断字符是否为CJK（中日韩）文字或全角符号
     * @param {string} char - 单个字符
     * @returns {boolean}
     */
    Window_Base.prototype.isCJKChar = function(char) {
        if (!char || char.length === 0) return false;
        var code = char.charCodeAt(0);
        // 常用CJK字符范围（可根据需要扩充）
        return (code >= 0x4E00 && code <= 0x9FFF) ||   // 中日韩统一表意文字
               (code >= 0x3400 && code <= 0x4DBF) ||   // 扩展A
               (code >= 0x3040 && code <= 0x309F) ||   // 平假名
               (code >= 0x30A0 && code <= 0x30FF) ||   // 片假名
               (code >= 0xAC00 && code <= 0xD7AF) ||   // 韩文音节
               (code >= 0xFF00 && code <= 0xFFEF);     // 全角ASCII、全角标点（可选）
    };

    Window_Base.prototype.textAreaWidth = function() {
        return this.contentsWidth();
    };

    Window_Base.prototype.needWrap = function(textState) {
        var c = textState.text[textState.index],
            w = this.textWidth(c),
            nextSpaceIndex = 0,
            nextWord = "",
            nextWidth = 0,
            text = textState.text;

        // 未启用自动换行时不处理
        if (!this._wordWrap) {
            return false;
        }

        // 根据字符类型选择换行逻辑
        if (this.isCJKChar(c)) {
            // 中文/日文等：强制拆分（类似原 breakWord = true）
            // 如果当前字符位置 + 两个字符宽度将超出边界，则换行
            if (textState.x + w * 2 >= this.textAreaWidth()) {
                textState.index--; // 回退索引，让下一行重新处理当前字符
                return true;
            }
        } else {
            // 英文/数字等：保持单词完整（类似原 breakWord = false）
            // 仅在遇到空格时检查后续整个单词是否会超出边界
            if (c === " ") {
                nextSpaceIndex = text.indexOf(" ", textState.index + 1);
                if (nextSpaceIndex < 0) {
                    nextSpaceIndex = text.length + 1;
                }
                nextWord = text.substring(textState.index, nextSpaceIndex);
                nextWidth = this.textWidth(nextWord);
                if (textState.x + nextWidth >= this.textAreaWidth()) {
                    return true; // 需要换行，当前空格不显示
                }
            }
        }

        return false;
    };

    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        text = this.convertWordWrapEscapeCharacters(text);
        return text;
    };

    Window_Base.prototype.convertWordWrapEscapeCharacters = function(text) {
        text = this.enableWordWrap(text);
        
        if (!!this._wordWrap) {
            text = text.replace(/[\n\r]+/g, '');
            text = text.replace(/\<br\>/gi, '\n');
        }

        return text;
    };

    Window.prototype.enableWordWrap = function(text) {
        this._wordWrap = false;

        if (!!text.match(/\<wrap\>/i)) {
            this._wordWrap = true;
        }

        text = text.replace(/\<wrap\>/gi, '');

        return text;
    };

    /**
     * 重写字符处理方法，根据字符类型动态切换字号
     */
    Window_Base.prototype.processNormalCharacter = function(textState) {
        // 检查是否需要换行
        if (this.needWrap(textState)) {
            return this.processNewLine(textState);
        }

        var c = textState.text[textState.index];
        var isCJK = this.isCJKChar(c);
        var originalFontSize = this.contents.fontSize;
        
        // 根据字符类型临时切换字号
        if (isCJK) {
            this.contents.fontSize = $WordWrap.ChineseFontSize;
        } else {
            this.contents.fontSize = $WordWrap.EnglishFontSize;
        }

        // 调用原始方法绘制字符
        _Window_Base_processNormalCharacter.call(this, textState);

        // 恢复原始字号，避免影响后续字符
        this.contents.fontSize = originalFontSize;
    };

    /**
     * 重写resetFontSettings，确保每次重置字体时保存基础字号
     */
    Window_Base.prototype.resetFontSettings = function() {
        _Window_Base_resetFontSettings.call(this);
        _baseFontSize = this.contents.fontSize;
    };

}(YED.WordWrap));