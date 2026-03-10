//=============================================================================
// KMS_SaveWithSnap.js (Fixed for encrypted deployment)
//   Last update: 2015/12/04 (Modified 2025)
//=============================================================================

/*:
 * @plugindesc
 * [v0.1.1] Add captured image on save/load scene. (Fixed for encrypted deployment)
 * 
 * @author TOMY (Kamesoft) / modified by ...
 *
 * @param Image scale
 * @default 0.15
 * @desc Scale for snap images.
 *
 * @param Enable JPEG
 * @default 1
 * @desc Uses JPEG format if JPEG size is smaller than PNG size.
 *
 * @help This plugin does not provide plugin commands.
 */

var KMS = KMS || {};

(function() {

KMS.imported = KMS.imported || {};
KMS.imported['SaveWithSnap'] = true;

var pluginParams = PluginManager.parameters('KMS_SaveWithSnap');
var Params = {};
Params.savefileBitmapScale = Number(pluginParams['Image scale'] || 0.15);
Params.enableJpeg = Number(pluginParams['Enable JPEG'] || 1);

// 截图缓存
KMS.snapBitmaps = KMS.snapBitmaps || {};

//-----------------------------------------------------------------------------
// Bitmap

if (!Bitmap.prototype.save)
{
    Bitmap.prototype.toDataURL = function()
    {
        if (Params.enableJpeg)
        {
            var png = this._canvas.toDataURL('image/png');
            var jpeg = this._canvas.toDataURL('image/jpeg');
            return (png.length < jpeg.length) ? png : jpeg;
        }
        else
        {
            return this._canvas.toDataURL('image/png');
        }
    };
}

//-----------------------------------------------------------------------------
// DataManager

var _KMS_SaveWithSnap_DataManager_loadSavefileImages = DataManager.loadSavefileImages;
DataManager.loadSavefileImages = function(info)
{
    _KMS_SaveWithSnap_DataManager_loadSavefileImages.call(this, info);

    if (info.snapUrl)
    {
        // 使用 Bitmap.load 代替 ImageManager，避免加密干扰
        if (!KMS.snapBitmaps[info.snapUrl]) {
            var bitmap = Bitmap.load(info.snapUrl);
            KMS.snapBitmaps[info.snapUrl] = bitmap;
            bitmap.addLoadListener(function() {
                var scene = SceneManager._scene;
                // 刷新存档窗口（场景中默认的存档列表窗口为 _listWindow）
                if (scene && (scene instanceof Scene_Save || scene instanceof Scene_Load)) {
                    if (scene._listWindow) scene._listWindow.refresh();
                }
            });
        }
    }
};

var _KMS_SaveWithSnap_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function()
{
    var info = _KMS_SaveWithSnap_DataManager_makeSavefileInfo.call(this);

    var bitmap = this.makeSavefileBitmap();
    if (bitmap)
    {
        info.snapUrl = bitmap.toDataURL();
    }

    return info;
};

DataManager.makeSavefileBitmap = function()
{
    var bitmap = $gameTemp.getSavefileBitmap();
    if (!bitmap) return null;

    var scale = Params.savefileBitmapScale;
    var newBitmap = new Bitmap(bitmap.width * scale, bitmap.height * scale);
    newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newBitmap.width, newBitmap.height);

    return newBitmap;
};

//-----------------------------------------------------------------------------
// Game_Temp

var _KMS_SaveWithSnap_Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function()
{
    _KMS_SaveWithSnap_Game_Temp_initialize.call(this);
    this._savefileBitmap = null;
};

Game_Temp.prototype.setSavefileBitmap = function(bitmap)
{
    this._savefileBitmap = bitmap;
};

Game_Temp.prototype.getSavefileBitmap = function()
{
    if (this._savefileBitmap)
    {
        return this._savefileBitmap;
    }
    else
    {
        return SceneManager._backgroundBitmap;
    }
};

//-----------------------------------------------------------------------------
// Window_SavefileList

var _KMS_SaveWithSnap_Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
Window_SavefileList.prototype.drawItem = function(index)
{
    var id = index + 1;
    var info = DataManager.loadSavefileInfo(id);
    if (info)
    {
        var valid = DataManager.isThisGameFile(id);
        var rect = this.itemRectForText(index);
        this.drawSnappedImage(info, rect, valid);
    }

    _KMS_SaveWithSnap_Window_SavefileList_drawItem.call(this, index);
};

Window_SavefileList.prototype.drawSnappedImage = function(info, rect, valid)
{
    if (!(valid && info.snapUrl)) return;

    var bitmap = KMS.snapBitmaps[info.snapUrl];
    // 图片未加载完成时不绘制，等待加载完成后的刷新
    if (!bitmap || !bitmap.isReady()) return;

    var dh = this.itemHeight() - 8;
    var dw = bitmap.width * dh / bitmap.height;
    var dx = rect.x + Math.max(rect.width - dw - 120, 0);
    var dy = rect.y + 4;

    this.changePaintOpacity(true);
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
};

})();