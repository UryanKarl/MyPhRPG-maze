//=============================================================================
// MOG_CharacterShadow.js
//=============================================================================
/*:
 * @plugindesc MOG角色阴影显示[v1.0]
 * @author Moghunter
 *
 * @param X-Axis
 * @text X轴偏移
 * @desc X轴的调整值
 * @default 0
 *
 * @param Y-Axis
 * @text Y轴偏移
 * @desc Y轴的调整值
 * @default -2
 *
 * @param Shadow File Name
 * @text 阴影文件名
 * @desc 阴影文件的名称
 * @default Shadow1
 *   
 * @param Auto Shadow (Events)
 * @text 自动显示阴影（事件）
 * @desc 为所有事件自动显示阴影
 * @default true
 * @type boolean
 * @on 显示阴影
 * @off 隐藏阴影
 *
 * @help  
 * =============================================================================
 * ♦♦♦ MOG Character Shadow ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2025/10/24
 * https://mogplugins.com
 * =============================================================================
 * 在角色下方显示一个简单的阴影
 *
 * 所需文件（/img/system/目录下）
 *
 * Shadow1.png
 *
 * =============================================================================
 * 事件注释
 * =============================================================================
 * 要为事件启用阴影，请添加以下注释：
 * 
shadow
 * 
 * 要为事件禁用阴影，请添加以下注释：
 *
disable_shadow
 *
 * =============================================================================
 * 插件命令（事件中使用）
 * =============================================================================
 * 要在游戏中激活或禁用阴影，请使用以下命令：
 * 
shadow_event_id : ID : true
shadow_player_id : ID : true
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_CharacterShadow = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_CharacterShadow');  
   Moghunter.charshadow_X = Number(Moghunter.parameters['X-Axis'] || 0);
   Moghunter.charshadow_Y = Number(Moghunter.parameters['Y-Axis'] || -2);
   Moghunter.charshadow_FileName = String(Moghunter.parameters['Shadow File Name'] || 'Shadow1');
   Moghunter.charshadow_autoShadow = String(Moghunter.parameters['Auto Shadow (Events)'] || 'true');	
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_chaShadow_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_chaShadow_pluginCommand.call(this,command, args)
    this.checkCharShadowCommand(command, args);
	return true;
};

//==============================
// * checkCharShadowCommand
//==============================
Game_Interpreter.prototype.checkCharShadowCommand = function(command, args) {
	if (command === "shadow_event_id")  {
    	var id = Number(args[1]);
		var visible = String(args[3]) == "true" ? true : false;
		$gameMap.charShadowEvent(id,visible);
	} else if (command === "shadow_player_id")  {
    	var id = Number(args[1]);
		var visible = String(args[3]) == "true" ? true : false;	
		$gameMap.charShadowPlayer(id,visible);	
	};
};
	
//=============================================================================
// ** Game Map
//=============================================================================	

//==============================
// * char Shadow Player
//==============================
Game_Map.prototype.charShadowPlayer = function(char_id,visible) {	 
    var char = this.getPlayerChar(char_id,visible)
	if (char) {char._charShadow.visible = visible};
};
	
//==============================
// * get Player Char
//==============================
Game_Map.prototype.getPlayerChar = function(id) {	 
     var char = null;
	 var actor = $gameParty.members()[id];
	 if (actor) {
		 if (id == 0) {char = $gamePlayer
		 } else {char = $gamePlayer.followers().follower(id - 1);
		 };
	 };
	 return char;
};		
	
//==============================
// * char Shadow Event
//==============================
Game_Map.prototype.charShadowEvent = function(char_id,visible) {	 
    var char = this.getEventChar(char_id,visible)
	if (char) {char._charShadow.visible = visible};
};	
	
//==============================
// * get Event Char
//==============================
Game_Map.prototype.getEventChar = function(event_id) {	 
     var ev = null;
	 $gameMap.events().forEach(function(event) { 
	 if (event.eventId() == event_id) {ev = event};
	 }, this);
	 return ev;
};	
	
//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * InitMembers
//==============================
var _mog_charShadow_gcharbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _mog_charShadow_gcharbase_initMembers.call(this);
    this._charShadow = {};
	this._charShadow.visible = false;
	this._charShadow.x = Number(Moghunter.charshadow_X)
	this._charShadow.y = Number(Moghunter.charshadow_Y)
	this._charShadow.autoShadow = String(Moghunter.charshadow_autoShadow) == "true" ? true : false;
};

//=============================================================================
// ** Game Player
//=============================================================================

//==============================
// * Refresh
//==============================
var _mog_charShadow_gplayer_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
	_mog_charShadow_gplayer_refresh.call(this);
	this._charShadow.visible = true;
};

//=============================================================================
// ** Game Follower
//=============================================================================

//==============================
// * Refresh
//==============================
var _mog_charShadow_gfollower_refresh = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function() {
	_mog_charShadow_gfollower_refresh.call(this);
    this._charShadow.visible = true;
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _mog_charShadow_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_mog_charShadow_gevent_setupPage.call(this);
    this.checkcharShadow();
};

//==============================
// * checkcharShadow
//==============================
Game_Event.prototype.checkcharShadow = function() {
	if (this._charShadow.autoShadow) {this._charShadow.visible = true};
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {
			   var comment = l.parameters[0]
			   if (comment.toLowerCase() == "shadow"){
				    this._charShadow.visible = true;
			   } else if (comment.toLowerCase() == "disable_shadow"){
					this._charShadow.visible = false;
			   };
			};
	}, this);};
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * create Characters
//==============================
var _mog_chashadow_sprmap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	_mog_chashadow_sprmap_createCharacters.call(this);
	this.createCharShadowSprites();
};

//==============================
// * create Char Shadow Sprites
//==============================
Spriteset_Map.prototype.createCharShadowSprites = function() {
	this._charShadowSprites = [];
	for (var i = 0; i < this._characterSprites.length; i++) {
	     this._charShadowSprites[i] = new CharShadowSprite(this._characterSprites[i],i);
	     this._tilemap.addChild(this._charShadowSprites[i]);
	};
};

//=============================================================================
// ** CharShadowSprite
//=============================================================================
function CharShadowSprite() {
    this.initialize.apply(this, arguments);
};
CharShadowSprite.prototype = Object.create(Sprite.prototype);
CharShadowSprite.prototype.constructor = CharShadowSprite;

//==============================
// * Initialize
//==============================
CharShadowSprite.prototype.initialize = function(sprite,id) {
    Sprite.prototype.initialize.call(this);
	this._id = id;
	this._spriteCharacter = sprite;
	this._spriteCharacterLoaded = false;
	this._spriteWH = [Number(Moghunter.charshadow_X),Number(Moghunter.charshadow_Y)];
	this._charShatter = Imported.MOG_CharShatterEffect ? true : false;
    this.createSpriteShadow();
};

//==============================
// * spr
//==============================
CharShadowSprite.prototype.spr = function() {
   return this._spriteCharacter;
}

//==============================
// * Char
//==============================
CharShadowSprite.prototype.char = function() {
    return this.spr()._character;
};

//==============================
// * createSpriteShadow
//==============================
CharShadowSprite.prototype.createSpriteShadow = function() {
	 var fileName = String(Moghunter.charshadow_FileName);
     this._spriteShadow = new Sprite(ImageManager.loadSystem(fileName));
	 this._spriteShadow.anchor.x = 0.5;
	 this._spriteShadow.anchor.y = 0.8;
	 this.z = 0;
	 this.addChild(this._spriteShadow);
};

//==============================
// * pos X
//==============================
CharShadowSprite.prototype.posX = function() {
	return this.char().screenX() + this.char()._charShadow.x;
};

//==============================
// * pos Y
//==============================
CharShadowSprite.prototype.posY = function() {
	return this.char().screenY() + this.char()._charShadow.y + this.char().jumpHeight();
};

//==============================
// * updatePosition
//==============================
CharShadowSprite.prototype.updatePosition = function() {
     this._spriteShadow.x = this.posX();
	 this._spriteShadow.y = this.posY();
	 this.z = this.spr().z - 1;
	 this.visible = true;
};

//==============================
// * refresh Sprite Shadow
//==============================
CharShadowSprite.prototype.refreshSpriteShadow = function() {
     this._spriteCharacterLoaded = true;
     this._spriteShadow.scale.x = this.spr().width / this._spriteShadow.width;
};

//==============================
// * update Shadow Sprite
//==============================
CharShadowSprite.prototype.updateShadowSprite = function() {
  	 this.visible = true;
     this.updatePosition();
};

//==============================
// * isVisible
//==============================
CharShadowSprite.prototype.isVisible = function() {
    if (!this.char()) {return false};
	if (!this.char()._charShadow.visible) {return false};
	if (!this.spr().visible) {return false};
	if (this.char()._opacity === 0) {return false};
	if (this.char()._transparent) {return false};
	if (this.char()._visible === false) {return false};
	if (this.char()._characterName === '') {return false};	
	if (this.char()._type != null) {return false};	
	if (!this._spriteCharacterLoaded) {return false};
	if (this._charShatter) {
        if (this.char()._shatter[0]) {return false};
	};
	return true;
};

//==============================
// * needRefresh
//==============================
CharShadowSprite.prototype.needRefresh = function() {
    if (!this.char()) {return false};
	if (this.spr().width == 0) {return false};	
	if (this._spriteShadow.width == 0) {return false};
	if (!this._spriteCharacterLoaded && this.spr().width != 0) {
	    return true
	};	
    if (this._spriteCharacterLoaded) {return false};
	return true;
};

//==============================
// * Update
//==============================
CharShadowSprite.prototype.update = function() {
	if (this.needRefresh()) {this.refreshSpriteShadow()};
    Sprite.prototype.update.call(this);
	if (this.isVisible()) {
		this.updateShadowSprite()
	} else {
		this.visible = false;
	};	
};