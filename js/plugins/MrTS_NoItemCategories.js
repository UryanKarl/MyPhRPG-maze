//=============================================================================
// MrTS_NoItemCategories.js
//=============================================================================

/*:
* @plugindesc MrTS移除物品分类栏[v1.1]
* @author Mr. Trivel
*
* @param Hide Menu
* @text 隐藏菜单分类
* @desc 是否隐藏物品菜单中的分类栏？
* @type boolean
* @default true
*
* @param Hide Shop
* @text 隐藏商店分类
* @desc 是否隐藏商店场景中的分类栏？
* @type boolean
* @default true
* 
* @help 
* --------------------------------------------------------------------------------
* 使用条款
* --------------------------------------------------------------------------------
* 请勿移除插件头部注释，或声称该插件由你编写。
* 如果你在项目中使用本插件，请注明作者为 Mr. Trivel。
* 可免费用于商业和非商业项目。
* --------------------------------------------------------------------------------
* 版本 1.1
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* 版本历史
* --------------------------------------------------------------------------------
* 1.1 - 移除了商店场景的物品分类栏
* 1.0 - 首次发布
*/

(function() {
	var parameters = PluginManager.parameters('MrTS_NoItemCategories');
	var paramHideMenu = (parameters['Hide Menu'] || "True").toLowerCase() === "true";
	var paramHideShop = (parameters['Hide Shop'] || "True").toLowerCase() === "true";

	// Categories
	var _Window_ItemList_includes = Window_ItemList.prototype.includes;
	Window_ItemList.prototype.includes = function(item) {
		if (this._category == 'all')
			return true;
		else
			return _Window_ItemList_includes.call(this, item);
	};

	// Scene_Item
	if (paramHideMenu)
	{
		
		Scene_Item.prototype.createCategoryWindow = function() {
		};

		Scene_Item.prototype.createItemWindow = function() {
		    var wy = this._helpWindow.height;
		    var wh = Graphics.boxHeight - wy;
		    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
		    this._itemWindow.setHelpWindow(this._helpWindow);
		    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
		    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
		    this._itemWindow.setCategory('all');
		    this.addWindow(this._itemWindow);
		    this._itemWindow.activate();
		    this._itemWindow.select(0);
		};
	}

	// Scene_Shop
	if (paramHideShop)
	{
		var _Scene_Shop_createCategoryWindow = Scene_Shop.prototype.createCategoryWindow;
		Scene_Shop.prototype.createCategoryWindow = function() {
			_Scene_Shop_createCategoryWindow.call(this);
			this._categoryWindow.y = -1000;
		};

		Scene_Shop.prototype.createSellWindow = function() {
		    var wy = this._dummyWindow.y;
		    var wh = Graphics.boxHeight - wy;
		    this._sellWindow = new Window_ShopSell(0, wy, Graphics.boxWidth, wh);
		    this._sellWindow.setHelpWindow(this._helpWindow);
		    this._sellWindow.hide();
		    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
		    this._sellWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
		    this._sellWindow.setCategory('all');
		    this.addWindow(this._sellWindow);
		};

		var _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
		Scene_Shop.prototype.commandSell = function() {
			_Scene_Shop_commandSell.call(this);
			this._categoryWindow.deactivate();
		    this._sellWindow.activate();
		    this._sellWindow.select(0);
		};
	}

})();
