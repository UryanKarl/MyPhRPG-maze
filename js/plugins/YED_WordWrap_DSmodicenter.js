/*:
 * Yami Engine Delta - Word Wrap
 *
 * @plugindesc YED文本自动换行功能（智能换行 + 中英文不同字号 + 居中 + 头像兼容）
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
 * 
 * 该插件提供自动换行功能
 * 能将长文本适当拆分为多行
 *
 * 自动换行功能默认处于禁用状态
 * 要在任何文本（例如消息中）启用自动换行，必须在文本中插入以下代码：
 * ------------
 * <wrap>
 * ------------
 *
 * 自动换行功能会忽略编辑器中的换行
 * 因此必须在文本中使用以下代码手动换行：
 * ------------
 * <br>
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
 * 文字居中功能：
 * - 使用 <center> 和 </center> 标签包裹需要居中的文本段落
 * - 支持多行居中，与 <wrap>、<br> 完全兼容
 * - 示例：
 *   <wrap><center>这段文字将会居中显示\n并且自动换行也会正常生效</center>
 * 
 * 头像对话框兼容：
 * - 自动识别头像占用的左侧区域，文本换行和居中均会避开头像区域
 *
 * MIT 协议
 * 
 * ============================================================================
 */

var YED = YED || {};

YED.WordWrap = {};

var parameters = PluginManager.parameters('YED_WordWrap');
YED.WordWrap.BreakWord = parameters['Break Word'];
YED.WordWrap.ChineseFontSize = Number(parameters['Chinese Font Size'] || 24);
YED.WordWrap.EnglishFontSize = Number(parameters['English Font Size'] || 20);

(function($WordWrap) {
    // 保存原始方法
    var _Window_Base_processNormalCharacter = Window_Base.prototype.processNormalCharacter;
    var _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    var _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
    var _Window_Base_processNewLine = Window_Base.prototype.processNewLine;

    // =========================================================================
    // 兼容性：获取文本起始 X 坐标（头像右侧）
    // =========================================================================
    Window_Base.prototype.getTextStartX = function() {
        // 优先使用引擎原生方法
        if (typeof this.newLineX === 'function') {
            return this.newLineX();
        }
        // 降级方案：手动计算
        var padding = this.standardPadding();
        var faceWidth = 0;
        if (this._face) {
            faceWidth = this._faceWidth || 144; // 默认头像宽度
        }
        return padding + faceWidth;
    };

    // =========================================================================
    // 基础功能：启用/禁用自动换行
    // =========================================================================
    Window_Base.prototype.enableWordWrap = function(text) {
        this._wordWrap = false;
        if (!!text.match(/\<wrap\>/i)) {
            this._wordWrap = true;
        }
        text = text.replace(/\<wrap\>/gi, '');
        return text;
    };

    // =========================================================================
    // 智能换行核心逻辑（修正：考虑头像偏移，计算可用宽度）
    // =========================================================================
    Window_Base.prototype.isCJKChar = function(char) {
        if (!char || char.length === 0) return false;
        var code = char.charCodeAt(0);
        return (code >= 0x4E00 && code <= 0x9FFF) ||   // 中日韩统一表意文字
               (code >= 0x3400 && code <= 0x4DBF) ||   // 扩展A
               (code >= 0x3040 && code <= 0x309F) ||   // 平假名
               (code >= 0x30A0 && code <= 0x30FF) ||   // 片假名
               (code >= 0xAC00 && code <= 0xD7AF) ||   // 韩文音节
               (code >= 0xFF00 && code <= 0xFFEF);     // 全角ASCII、全角标点
    };

    // 可用文本宽度 = 整个内容区宽度 - 文本起始X（头像偏移）
    Window_Base.prototype.textAreaWidth = function() {
        return this.contentsWidth() - this.getTextStartX();
    };

    Window_Base.prototype.needWrap = function(textState) {
        if (!this._wordWrap) return false;

        var c = textState.text[textState.index];
        var w = this.textWidth(c);
        var text = textState.text;

        // 当前行已绘制的宽度（相对于行首）
        var currentX = textState.x - this.getTextStartX();

        if (this.isCJKChar(c)) {
            // 中文等：强制拆分，若当前宽度+2个字符宽度超出可用区域则换行
            if (currentX + w * 2 >= this.textAreaWidth()) {
                textState.index--;
                return true;
            }
        } else if (c === " ") {
            // 英文单词：检查后续整个单词是否会超出
            var nextSpaceIndex = text.indexOf(" ", textState.index + 1);
            if (nextSpaceIndex < 0) nextSpaceIndex = text.length + 1;
            var nextWord = text.substring(textState.index, nextSpaceIndex);
            var nextWidth = this.textWidth(nextWord);
            if (currentX + nextWidth >= this.textAreaWidth()) {
                return true;
            }
        }
        return false;
    };

    // =========================================================================
    // 居中功能：处理 <center> 和 </center> 标签
    // =========================================================================
    Window_Base.prototype.processCenterTags = function(text) {
        // 将标签替换为不可见控制字符（\x01 开启居中，\x02 关闭居中）
        text = text.replace(/\<center\>/gi, '\x01');
        text = text.replace(/\<\/center\>/gi, '\x02');
        return text;
    };

    // 获取当前行（从 textState.index 到下一个换行符）的总宽度（忽略控制字符和转义序列）
    Window_Base.prototype.getCurrentLineWidth = function(textState) {
        var start = textState.index;
        var text = textState.text;
        var len = text.length;
        var total = 0;
        var originalFontSize = this.contents.fontSize;
        var i = start;
        var inEscape = false;

        while (i < len) {
            var ch = text[i];
            if (ch === '\n') break;
            if (ch === '\x01' || ch === '\x02') {
                i++;
                continue;
            }
            if (ch === '\\') {
                inEscape = true;
                i++;
                continue;
            }
            if (inEscape) {
                // 跳过转义序列（如 \c[0]），不占宽度
                while (i < len && text[i] !== ']' && text[i] !== ' ' && text[i] !== '\n') i++;
                if (i < len && text[i] === ']') i++;
                inEscape = false;
                continue;
            }
            // 正常字符，测量宽度
            var isCJK = this.isCJKChar(ch);
            this.contents.fontSize = isCJK ? $WordWrap.ChineseFontSize : $WordWrap.EnglishFontSize;
            total += this.textWidth(ch);
            i++;
        }
        this.contents.fontSize = originalFontSize;
        return total;
    };

    // 根据居中开关调整当前行的起始 X 坐标（考虑头像偏移）
    Window_Base.prototype.adjustLineXForCenter = function(textState) {
        // 向前扫描确定当前是否处于居中模式
        var text = textState.text;
        var idx = textState.index;
        var centerActive = false;
        for (var i = 0; i < idx; i++) {
            if (text[i] === '\x01') centerActive = true;
            else if (text[i] === '\x02') centerActive = false;
        }
        
        var baseX = this.getTextStartX();  // 头像右侧的起始X
        if (!centerActive) {
            textState.x = baseX;
            return;
        }
        
        var lineWidth = this.getCurrentLineWidth(textState);
        var areaWidth = this.contentsWidth();       // 整个内容区宽度
        if (lineWidth >= areaWidth - baseX) {
            // 行宽超过可用区域，无法居中，退化为左对齐
            textState.x = baseX;
        } else {
            // 居中偏移 = (整个宽度 - 行宽) / 2，但起始不能小于 baseX
            var centerX = (areaWidth - lineWidth) / 2;
            if (centerX < baseX) centerX = baseX;
            textState.x = Math.floor(centerX);
        }
    };

    // =========================================================================
    // 重写字符处理、换行处理、转义处理
    // =========================================================================
    Window_Base.prototype.processNormalCharacter = function(textState) {
        // 新行第一次绘制前调整居中偏移（使用标志避免重复调整）
        if (!textState._lineStarted) {
            this.adjustLineXForCenter(textState);
            textState._lineStarted = true;
        }

        if (this.needWrap(textState)) {
            return this.processNewLine(textState);
        }

        var c = textState.text[textState.index];
        // 处理居中控制字符
        if (c === '\x01') {
            textState.index++;
            // 开启居中后，当前行重新调整偏移（建议标签放在行首）
            if (!textState._lineStarted) {
                this.adjustLineXForCenter(textState);
                textState._lineStarted = true;
            }
            return;
        } else if (c === '\x02') {
            textState.index++;
            if (!textState._lineStarted) {
                this.adjustLineXForCenter(textState);
                textState._lineStarted = true;
            }
            return;
        }

        // 动态切换字号
        var isCJK = this.isCJKChar(c);
        var originalFontSize = this.contents.fontSize;
        this.contents.fontSize = isCJK ? $WordWrap.ChineseFontSize : $WordWrap.EnglishFontSize;

        _Window_Base_processNormalCharacter.call(this, textState);

        this.contents.fontSize = originalFontSize;
    };

    Window_Base.prototype.processNewLine = function(textState) {
        _Window_Base_processNewLine.call(this, textState);
        // 重置行首标志，下一行需要重新调整居中
        textState._lineStarted = false;
        // 注意：原始 processNewLine 已经将 textState.x 设为 this.newLineX()（若存在）
        // 但为了确保兼容，我们重新调整为正确的起始X（考虑居中）
        this.adjustLineXForCenter(textState);
        textState._lineStarted = true;
    };

    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        // 先处理 <wrap> 和 <br>
        text = this.enableWordWrap(text);
        if (this._wordWrap) {
            text = text.replace(/[\n\r]+/g, '');
            text = text.replace(/\<br\>/gi, '\n');
        }
        // 再处理居中标签
        text = this.processCenterTags(text);
        return text;
    };

    Window_Base.prototype.resetFontSettings = function() {
        _Window_Base_resetFontSettings.call(this);
    };

}(YED.WordWrap));