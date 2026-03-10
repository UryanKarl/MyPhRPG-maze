/*:
 * @plugindesc v1.02 LiuYue_GainItemTips 获取道具显示
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================ *
 *
 * 
 *
 * 这款插件提供了在游戏中获取或丢失新的道具会在地图界面显示
 * 
 *
 *
 *---------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 *
 *---------------------------------------------------------
 *
 * 
 *
 * 如果装有YEP_ItemCore YEP独立物品核心 这款插件时,请将本插件位于这款插件之下,已获取更好的兼容性
 * 
 *
 *
 *以下是一些插件用到的脚本函数
 *---------------------Script--------------------
 *
 *  Zzy.GIT.IsEnable(enable)                                 //这会 开启/禁用 插件的功能
 *  Zzy.GIT.ClearList()                                      //清理所有的消息表
 *  Zzy.GIT.SurplusCount()                                   //获取未显示的剩余消息数量
 *
 *
 *
 *以下是一些插件指令的信息
 *---------------------Plugin Command--------------------
 *
 * ZzyGIT IsEnable x(true/false)                          //这会 开启/禁用 插件的功能
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 *以下是一些插件用到的备注信息
 *
 *---------------------Data Note--------------------
 * 请将此备注信息写在 数据库 - 物品/武器/防具 下
 *
 * <ZzyGIT TextColor: x>                           //这会使得获得的道具具备颜色信息,x可替换为颜色代码 范围#000000 ~ #ffffff
 *
 *
 * 例:<ZzyGIT TextColor: #ffffff>     获取这个道具时,其名称会显示为白色 
 *    <ZzyGIT TextColor: #ff6666>     获取这个道具时,其名称会显示为淡红色
 *
 *
 * <ZzyGIT SE: x1 x2 x3 x4>                        //这会使获取到的道具播放自定义的音效,优先级大于插件参数中的设置  
 * x1:填写audio/se 文件夹中的音效名称,不包含后缀名,必填参数
 * x2:填写音量,范围0~100之间,这是一个选填参数,不填写时值为100
 * x3:填写音调,范围0~100之间,这是一个选填参数,不填写时值为0
 * x4:填写声道,范围0~100之间,这是一个选填参数,不填写时值为0
 *
 * 例:<ZzyGIT se: Attack1>          当显示获取这个道具时,优先播放Attack1音效,而不是插件参数中的声音配置
 * 
 *
 * <ZzyGIT SERank: x>               //这会设置SE的优先级，代表如果同时显示多个特殊SE道具时,将会播放优先级最高的SE声音,x需要填写一个正整数,所有SE默认优先级为0
 * 
 * 例:<ZzyGIT SERank: 3>           设置这个SE的优先级为3级,当同时显示的道具中优先级全部低于3时,将会播放本道具设置的SE声音
 *
 * 
 * <ZzyGIT ListRank: x>             //设置排列的优先级，代表再同时显示的道具信息界面中，优先级越高的道具信息将会越向上显示,x可以填写一个正负整数,默认优先级为0
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 *
 *
 * 我叫坂本：v1.02 修复单独插件测试报错,修复拆卸装备出现信息的逻辑问题,添加排序显示优先级
 * 我叫坂本：v1.01 增加了与YEP_ItemCore物品核心的兼容问题,修复了图标重叠问题,添加了金币显示以及图标相关功能
 * 我叫坂本：v1.00 完成插件功能
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 *
 * @param ---插件---
 * @default
 *
 *
 *
 * @param IsPluginEnable
 * @text 插件是否启用
 * @parent ---插件---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 这会使获取道具出现窗口功能是否有效
 * YES - true     NO - false
 * @default true
 *
 *
 *
 * @param ---窗口---
 * @default
 *
 *
 * @param BasePos
 * @text 窗口位置基准点
 * @parent ---按键---
 * @type combo
 * @option center
 * @option left-top
 * @option top
 * @option right-top
 * @option left
 * @option right
 * @option left-bottom
 * @option bottom
 * @option right-bottom
 * @desc 窗口位置将会被固定在九个方向,center代表中心,left代表左,right代表右,top代表上,bottom代表下
 * @default center
 *
 *
 * @param WindowOfx
 * @text 窗口偏移位置X
 * @parent ---窗口---
 * @type text
 * @desc 窗口的偏移位置X
 * @default 0
 *
 * @param WindowOfy
 * @text 窗口偏移位置Y
 * @parent ---窗口---
 * @desc 窗口的偏移位置Y
 * @default 0
 *
 * @param WindowW
 * @text 窗口宽度
 * @parent ---窗口---
 * @type text
 * @desc 窗口显示的宽度,这可以输入一个表达式,也可以是一个准确数值
 * @default 440
 *
 * @param LineNum
 * @text 窗口显示行数
 * @parent ---窗口---
 * @type number
 * @desc 窗口显示的行数,对应的是高度值,默认值为1
 * @default 1
 *
 *
 * @param WindowShowFrame
 * @text 消息显示时长
 * @parent ---窗口---
 * @type number
 * @desc 窗口弹出消息会显示的时长,单位为帧数
 * @default 60
 *
 * @param WindowOpacity
 * @text 窗口透明度
 * @parent ---窗口---
 * @type number
 * @min 0
 * @max 255
 * @desc 这是默认窗口的透明度,范围0~255,默认值为255
 * @default 255
 *
 *
 * @param WindowFontSize
 * @text 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口弹出消息的文本大小,这必须是一个正整数,默认值是28
 * @default 28
 *
 * @param WindowOpenSpeed
 * @text 窗口打开速度
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口从无到完全打开的速度,同时也决定了图标和文字出现的时间,这个值越大速度越快,默认值是32
 * @default 32
 *
 * @param WindowBkPic
 * @text 窗口背景图片
 * @parent ---窗口---
 * @type file
 * @dir img/pictures
 * @desc 窗口的背景图片,图片将在窗口之下,图片需存放在img/pictures/文件夹内
 * @default 
 *
 * @param BkOpFollowOpenSpeed
 * @text 图片透明度等同打开速度
 * @parent ---窗口---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 这会让窗口的图片的透明度跟随窗口打开的速度一同变化
 * YES - true     NO - false
 * @default true
 *
 *
 * @param ---金币---
 * @default
 *
 *
 * @param IsGoldShow
 * @text 是否获取失去金币显示
 * @parent ---金币---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 这会让金币相关内容也添加到显示队列中,默认值为true
 * YES - true     NO - false
 * @default true
 *
 * @param AddGFormat
 * @text 获取金币文本格式
 * @parent ---金币---
 * @type text
 * @desc 显示获取的文本
 * @default 获得金币
 *
 * @param SubGFormat
 * @text 失去金币文本格式
 * @parent ---金币---
 * @type text
 * @desc 显示失去的文本
 * @default 失去金币
 *
 * @param GTextColor
 * @text 金币颜色文本
 * @parent ---金币---
 * @type text
 * @desc 这是获取金币颜色的文本颜色
 * @default #ffffff
 *
 * @param GIconID
 * @text 金币图标
 * @parent ---金币---
 * @type text
 * @desc 这是显示金币的图标ID值
 * @default 0
 *
 * @param GSERank
 * @text 金币SE优先级
 * @parent ---金币---
 * @type text
 * @desc 这会设置同屏出现的所有提示中,将播放优先级最高的道具音效,这可以是一个正整数
 * @default 0
 *
 * @param GLRank
 * @text 金币列表优先级
 * @parent ---金币---
 * @type text
 * @desc 这会设置同屏出现的所有提示中,将排列优先级最高的道具为最上方,这可以是一个正负整数
 * @default 0
 *
 * @param ---图标---
 * @default
 *
 * @param IconScale
 * @text 图标比例
 * @parent ---图标---
 * @type text
 * @desc 这会设置出现的默认图标的比例大小,默认值为1将会跟随文字一般大小
 * @default 1
 *
 * @param IsIconFlash
 * @text 是否图标出现时闪烁
 * @parent ---图标---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 图标出现后,将会进行闪白
 * YES - true     NO - false
 * @default true
 *
 * @param IconFlashFrame
 * @text 图标闪烁时长
 * @parent ---图标---
 * @type number
 * @min 1
 * @desc 图标进入到闪白的状态持续的帧数
 * @default 10
 *
 *
 *
 *
 * @param ---文本---
 * @default
 *
 * @param AddFormat
 * @text 获取文本格式
 * @parent ---文本---
 * @type text
 * @desc 显示获取的文本格式,%1会被替换为道具名称
 * @default 获得 ["%1"]
 *
 * @param SubFormat
 * @text 失去文本格式
 * @parent ---文本---
 * @type text
 * @desc 显示失去的文本格式,%1会被替换为道具名称
 * @default 失去 ["%1"]
 *
 * @param NumberFormat
 * @text 获取文本格式
 * @parent ---文本---
 * @type text
 * @desc 显示数量的文本格式,%1会被替换为道具数量
 * @default x %1
 *
 * @param ---音效---
 * @default
 *
 * @param EarnSound
 * @text 获取道具名称
 * @parent ---音效---
 * @type file
 * @dir audio/se
 * @desc 执行获取道具时,会播放的获取道具,BGM应放在audio/bgm文件夹中,不填写会使用默认的播放音效
 * @default Sound1
 *
 * @param EarnVolume
 * @text 获取道具音量
 * @parent ---音效---
 * @type Number
 * @desc 音量大小,默认100
 * @default 100
 
 * @param EarnPitch
 * @text 获取道具声调
 * @parent ---音效---
 * @type Number
 * @desc 声调,默认100
 * @default 100
 
 * @param EarnBGSPan
 * @text 获取道具声道
 * @parent ---音效---
 * @type Number
 * @desc 声道,默认0
 * @default 0
 *
 *
 * @param GSound
 * @text 金币道具名称
 * @parent ---音效---
 * @type file
 * @dir audio/se
 * @desc 执行获取道具时,会播放的获取道具,BGM应放在audio/bgm文件夹中,不填写会使用默认的播放音效
 * @default Coin
 *
 * @param GVolume
 * @text 金币道具音量
 * @parent ---音效---
 * @type Number
 * @desc 音量大小,默认100
 * @default 100
 
 * @param GPitch
 * @text 金币道具声调
 * @parent ---音效---
 * @type Number
 * @desc 声调,默认100
 * @default 100
 
 * @param GBGSPan
 * @text 金币道具声道
 * @parent ---音效---
 * @type Number
 * @desc 声道,默认0
 * @default 0
 *
 *
 *
 */



var LiuYue = LiuYue || {};
LiuYue.LiuYue_GainItemTips = true;//插件启动
 
var Zzy = Zzy || {};
Zzy.GIT = Zzy.GIT || {};
Zzy.GIT.version = 1.02;
Zzy.Parameters = PluginManager.parameters('LiuYue_GainItemTips');
Zzy.Param = Zzy.Param || {}; 

Zzy.GIT.BasePosToID = function(str)
{
	switch(str)
	{
		case 'left-top':return 1;
		case 'top':return 2;
		case 'right-top':return 3;
		case 'left':return 4;
		case 'center':return 5;	
		case 'right':return 6;
		case 'left-bottom':return 7;
		case 'bottom':return 8;
		case 'right-bottom':return 9;
	}
	
	console.log('一个错误:来自LiuYue_GainItemTips(获取道具提示):检查输入窗口位置基准点参数是否正确');
	return 5;

}

Zzy.Param.GITIsPluginEnable = eval(String(Zzy.Parameters['IsPluginEnable']));//插件开启状态
Zzy.Param.GITBasePos = Zzy.GIT.BasePosToID(String(Zzy.Parameters['BasePos']));//窗口基准点

Zzy.Param.GITWindowOfx = Number(Zzy.Parameters['WindowOfx']);//位置偏移X
Zzy.Param.GITWindowOfy = Number(Zzy.Parameters['WindowOfy']);//位置偏移Y
Zzy.Param.GITWindowW = String(Zzy.Parameters['WindowW']);//强化窗口W
Zzy.Param.GITLineNum = parseInt(Zzy.Parameters['LineNum']);//强化窗口H

Zzy.Param.GITWindowShowFrame = parseInt(Zzy.Parameters['WindowShowFrame']);//消息显示时长
Zzy.Param.GITWindowFontSize = parseInt(Zzy.Parameters['WindowFontSize']);//窗口字体大小
Zzy.Param.GITWindowOpacity = parseInt(Zzy.Parameters['WindowOpacity']);//窗口透明度
Zzy.Param.GITWindowOpenSpeed = parseInt(Zzy.Parameters['WindowOpenSpeed']);//窗口速度
Zzy.Param.GITWindowBkPic = String(Zzy.Parameters['WindowBkPic']);//窗口图片
Zzy.Param.GITBkOpFollowOpenSpeed = eval(Zzy.Parameters['BkOpFollowOpenSpeed']);//透明度跟随打开速度



Zzy.Param.GITAddFormat = String(Zzy.Parameters['AddFormat']);//显示文本格式
Zzy.Param.GITSubFormat = String(Zzy.Parameters['SubFormat']);//显示文本格式
Zzy.Param.GITNumberFormat = String(Zzy.Parameters['NumberFormat']);//显示文本格式

Zzy.Param.GITIsGoldShow = eval(Zzy.Parameters['IsGoldShow']);//是否获取失去金币显示
Zzy.Param.GITAddGFormat = String(Zzy.Parameters['AddGFormat']);//获取金币文本格式
Zzy.Param.GITSubGFormat = String(Zzy.Parameters['SubGFormat']);//失去金币文本格式
Zzy.Param.GITGTextColor = String(Zzy.Parameters['GTextColor']);
Zzy.Param.GITGIconID = parseInt(Zzy.Parameters['GIconID']);
Zzy.Param.GITGSERank = parseInt(Zzy.Parameters['GSERank']);
Zzy.Param.GITGLRank = parseInt(Zzy.Parameters['GLRank']);


Zzy.Param.GITIconScale = Number(Zzy.Parameters['IconScale']);//图标大小
Zzy.Param.GITIsIconFlash = eval(Zzy.Parameters['IsIconFlash']);
Zzy.Param.GITIconFlashFrame = parseInt(Zzy.Parameters['IconFlashFrame']);


//--------------------------------------声音-------------------------------------
Zzy.Param.GITMakeSE = function(seName,seVolume,sePitch,sePan)
{
	if(!seName)return undefined;
	var se = {
		name:seName,
		volume:(seVolume ? seVolume : 100),
		pitch:(sePitch ? sePitch : 100),
		pan:(sePan ? sePan : 0)
	};
	return se;
}

Zzy.Param.GITEarnSound = String(Zzy.Parameters['EarnSound']);//背景BGM名称
Zzy.Param.GITEarnVolume = parseInt(Zzy.Parameters['EarnVolume']);//背景BGM音量
Zzy.Param.GITEarnPitch = parseInt(Zzy.Parameters['EarnPitch']);//背景BGM声调
Zzy.Param.GITEarnBGSPan = parseInt(Zzy.Parameters['EarnPan']);//背景BGM声道
Zzy.Param.GITEarnSE = Zzy.Param.GITMakeSE(Zzy.Param.GITEarnSound,Zzy.Param.GITEarnVolume,Zzy.Param.GITEarnPitch,Zzy.Param.GITEarnBGSPan);

Zzy.Param.GITGSound = String(Zzy.Parameters['GSound']);//金币BGM名称
Zzy.Param.GITGVolume = parseInt(Zzy.Parameters['GVolume']);//金币BGM音量
Zzy.Param.GITGPitch = parseInt(Zzy.Parameters['GPitch']);//金币BGM声调
Zzy.Param.GITGBGSPan = parseInt(Zzy.Parameters['GPan']);//金币BGM声道
Zzy.Param.GITGSE = Zzy.Param.GITMakeSE(Zzy.Param.GITGSound,Zzy.Param.GITGVolume,Zzy.Param.GITGPitch,Zzy.Param.GITGBGSPan);


Zzy.Param.GITAllSE = [];
Zzy.Param.GITAllSE = [undefined,
		Zzy.Param.GITEarnSE,//获取文本
		Zzy.Param.GITGSE//金币文本
		];
		

Zzy.GIT.ChangeEquipFlag = false;//改变装备标记


Zzy.GIT.YEPItemCoreConstraints = false;   //插件兼容-限制
Zzy.GIT.YEPItemCoreConstraints2 = false;   //插件兼容-限制


var Imported = Imported || {};

//=================================================================
//DataManager
//=================================================================
Zzy.GIT.DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) //旧存档兼容
{
	var result = Zzy.GIT.DataManager_loadGame.call(this,savefileId);
	
	this.ZzyGITInitData();

	return result;
}

DataManager.ZzyGITInitData = function()//初始化参数
{
	if(!$gameSystem.GetIsZzyGITLoaded())
	{
		//初始化
		$gameSystem.ZzyGITInitData();//初始化数据
		$gameSystem.SetIsZzyGITLoaded(true);
	}	
}

//=============================================================================
//Game_System
//=============================================================================

Zzy.GIT.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.GIT.Game_System_initialize.call(this);
	this.ZzyGITInitData();//初始化数据
	this._IsZzyGITLoaded = true;//是否载入完成
	
};
	
Game_System.prototype.GetIsZzyGITLoaded = function()
{
	if(this._IsZzyGITLoaded === undefined)
	{this._IsZzyGITLoaded = false;}
	return this._IsZzyGITLoaded;
}

Game_System.prototype.SetIsZzyGITLoaded = function(enable)
{
	this._IsZzyGITLoaded = enable;
}

Game_System.prototype.ZzyGITInitData = function()//清除链表
{
	this._zzyGITList = [];//显示列表
	this._zzyGITIndex = 0;//显示下标
	
	this._zzyGITPluginEnable = Zzy.Param.GITIsPluginEnable;
}


Game_System.prototype.ClearZzyGITList = function()//清除链表
{
	this._zzyGITList = [];//显示列表
	this._zzyGITIndex = 0;//显示下标	
}

Game_System.prototype.ZzyGITSurplusCount = function()
{
	if(!this._zzyGITList.length)return 0;
	var len = this._zzyGITList.length;
	return this._zzyGITIndex - len;
}

Game_System.prototype.PushZzyGITList = function(info)
{
	this._zzyGITList.push(info);
}


Game_System.prototype.SetZzyGITPluginEnable = function(isEnable)
{
	this._zzyGITPluginEnable = isEnable;
	
}

Game_System.prototype.GetZzyGITPluginEnable = function()
{
	if(this._zzyGITPluginEnable === undefined)
	{
		this._zzyGITPluginEnable = Zzy.Param.GITIsPluginEnable;
	}
	
	return this._zzyGITPluginEnable;
}

//================================================================
//Game_Interpreter
//================================================================

Zzy.GIT.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)//插件命令
{
	Zzy.GIT.Game_Interpreter_pluginCommand.call(this,command,args);

	if(command === 'ZzyGIT')
	{
		this.ZzyGITCommand(args);
	}
	

}

Game_Interpreter.prototype.ZzyGITCommand = function(args)
{
	var command = String(args[0]);

	switch(command)
	{
		case 'IsEnable':
			var isEnable = eval(args[1]);
			Zzy.GIT.IsEnable(isEnable);
		break;
	}
}

//================================================================
//DataManager
//================================================================
Zzy.GIT.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
	if (!Zzy.GIT.DataManager_isDatabaseLoaded.call(this)) return false;

	this.ZzyGITLoadNoteCase1($dataItems);//道具
	this.ZzyGITLoadNoteCase1($dataWeapons);//武器	
	this.ZzyGITLoadNoteCase1($dataArmors);//护甲

	return true;
}

DataManager.ZzyGITLoadNoteCase1 = function(objArr)
{
  for (var i = 1; i < objArr.length; i++) 
  {
    var obj = objArr[i];
    var noteData = obj.note.split(/[\r\n]+/);
	
	obj.zzyGIT = {};

	for(var j=0;j<noteData.length;j++)
	{
		var lineStr = noteData[j];
		if(lineStr.match(/<ZZYGIT TEXTCOLOR:[ ](.*)>/i))
		{
			var color = String(RegExp.$1);		
			obj.zzyGIT.textColor = color;
		}
		else if(lineStr.match(/<ZZYGIT SE:[ ](.*)>/i))
		{
			var seStr = String(RegExp.$1);
			var seArr = seStr.split(' ');

			var name = String(seArr[0]);
			var volume = parseInt(seArr[1]);
			var pitch = parseInt(seArr[2]);
			var pan = parseInt(seArr[3]);
			
			var se = {
			name:name,
			volume:(volume ? volume : 100),
			pitch:(pitch ? pitch : 100),
			pan:(pan ? pan : 0)
			}
			
			obj.zzyGIT.se = se;
		}
		else if(lineStr.match(/<ZZYGIT SERANK:[ ](.*)>/i))
		{
			var seRank = parseInt(RegExp.$1);
			obj.zzyGIT.seRank = seRank;//设置等级
		}
		else if(lineStr.match(/<ZZYGIT LISTRANK:[ ](.*)>/i))
		{
			var lRank = parseInt(RegExp.$1);
			obj.zzyGIT.lRank = lRank;//设置排列等级
		}		
		
	}
  }
}

//=======================================================================
//Game_Party
//=======================================================================
//初始化时,如果有YEP装备核心将暂时关闭添加显示功能
Zzy.GIT.Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() 
{
	if(Imported && Imported.YEP_ItemCore){Zzy.GIT.YEPItemCoreConstraints2 = true;}
	Zzy.GIT.Game_Party_setupStartingMembers.call(this);
	Zzy.GIT.YEPItemCoreConstraints2 = false;
};




//=======================================================================
//Game_Actor
//=======================================================================
Zzy.GIT.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId)
{
	if(Imported && Imported.YEP_ItemCore){Zzy.GIT.YEPItemCoreConstraints = true;}
	Zzy.GIT.Game_Actor_setup.call(this,actorId);
	Zzy.GIT.YEPItemCoreConstraints = false;
};

Zzy.GIT.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) 
{
	Zzy.GIT.ChangeEquipFlag = true;
	Zzy.GIT.Game_Actor_changeEquip.call(this,slotId,item);
	Zzy.GIT.ChangeEquipFlag = false;
};

Zzy.GIT.Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) 
{
	Zzy.GIT.ChangeEquipFlag = true;
	Zzy.GIT.Game_Actor_forceChangeEquip.call(this,slotId,item)
	Zzy.GIT.ChangeEquipFlag = false;
};



//=======================================================================
//Scene_Map
//=======================================================================
Zzy.GIT.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() 
{
	Zzy.GIT.Scene_Map_start.call(this);
	this.CreateZzyGITTipsWindow();

};

Scene_Map.prototype.CreateZzyGITTipsWindow = function()
{
	this._zzyGITWindow = new Window_ZzyGITTips();
	this.addChild(this._zzyGITWindow);
}

//=======================================================================
//Window_ZzyGITTips
//=======================================================================

function Window_ZzyGITTips() {
    this.initialize.apply(this, arguments);
}
Window_ZzyGITTips.prototype = Object.create(Window_Base.prototype);
Window_ZzyGITTips.prototype.constructor = Window_ZzyGITTips;

Window_ZzyGITTips.prototype.initialize = function() 
{
	
	var w = this.DefaultWidth();
	var h = this.DefaultHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, w, h);
	
	this.iconSprArr = [];//图标池子
	this.opacity = Zzy.Param.GITWindowOpacity;
	
	this.AutoInitPos();
	this.InitData();
	
	this.hide();//进行隐藏
	this.openness = 0;
	
	this.CreaterBkSpr();//创造背景
	
	this.opennessRate = 0;//比率
};

Window_ZzyGITTips.prototype.CreaterBkSpr = function()
{
	var picName = Zzy.Param.GITWindowBkPic;
	
	if(picName)//存在背景图片
	{
		this._zzyGITBackSpr = new Sprite_ZzyGITBkPic(this,picName);//添加背景
		this.addChildToBack(this._zzyGITBackSpr);			
	}
}

Window_ZzyGITTips.prototype.AutoInitPos = function()
{
	var pos = this.SetWindowPos();
	this.x = pos.x;
	this.y = pos.y;
}

Window_ZzyGITTips.prototype.InitData = function()
{
	this.showFrame = Zzy.Param.GITWindowShowFrame;
	this.cShowFrame = 0;//计数
	this._list = [];//列表
	this.isCanGet = true;
}

Window_ZzyGITTips.prototype.ResetInfo = function()
{
	this.showFrame = Zzy.Param.GITWindowShowFrame;
	this.cShowFrame = 0;//计数
	this._list = [];//列表
	this.isCanGet = true;
}

Window_ZzyGITTips.prototype.update = function()
{
	Window_Base.prototype.update.call(this);
	
	if(!this.isWindowReady())return;//不满足判断

	this.updateGetList();//获取队列
	this.updateShowFrame();//更新显示帧数

	this.updateOpennessRate();
}

Window_ZzyGITTips.prototype.updateOpennessRate = function()
{
	this.opennessRate = Math.max(1,Math.min(0,this.openness/255));
}

Window_ZzyGITTips.prototype.isWindowReady = function()
{
	if(this.isClosing())return false;
	if(this.isOpening())return false;
	return true;
}

Window_ZzyGITTips.prototype.updateGetList = function()
{
	if(!$gameSystem._zzyGITList.length)return false;
	
	if(this.isCanGet)
	{
		this.isCanGet = false;
		this.cShowFrame = 0;
		this._list = this.GetNextList();//获取下一层队列
		
		if(this._list === undefined)//不存在下层对象
		{
			$gameSystem.ClearZzyGITList();//清理存储
		}
		else
		{
			this.DisVisibleAllSpr();//隐藏图标
			this.Refresh();//刷新显示
			this.open();//执行开启
			
			this.AutoPlaySE();
		}
	}
	
}

Window_ZzyGITTips.prototype.AutoPlaySE = function()
{
	var len = this._list.length;
	var mRankIndex = -1;
	
	for(var i=len-1;i>=0;i--)//播放最后一个压入且优先级最高的特殊音效
	{
		var seRank = this.GetSERankInfo(this._list[i]);
		
	
		if(mRankIndex<0){mRankIndex = i;}
		else
		{
			var prSeRank = this.GetSERankInfo(this._list[mRankIndex]);
			
			if(seRank > prSeRank)
			{
				mRankIndex = i;//目前SE的下标
			}
		}
	}

	var se = undefined;
	
	if(mRankIndex>=0)
	{
		se = this.GetSEInfo(this._list[mRankIndex]);	
	}
	
	if(!se)
	{
		for(var i=len-1;i>=0;i--)//播放最后一个压入且优先级最高的特殊音效
		{
			se = this.GetSEInfo(this._list[i]);
			if(se){break;}
		}			
	}

	if(se){AudioManager.playSe(se);return;}//播放选中的SE
	
	//播放默认音效		
	Zzy.GIT.PlaySE(1);
}

Window_ZzyGITTips.prototype.GetListRankInfo = function(info)//获取排列等级
{
	if(info.type === 0)
	{
		var item = info.item;
		if(item.zzyGIT)
		{
			return item.zzyGIT.lRank ? item.zzyGIT.lRank : 0;	
		}			
	}
	else if(info.type === 1)
	{
		return Zzy.Param.GITGLRank;
	}
	return 0;
	
}



Window_ZzyGITTips.prototype.GetSERankInfo = function(info)//获取SE优先级
{
	if(info.type === 0)
	{
		var item = info.item;
		if(item.zzyGIT)
		{
			return item.zzyGIT.seRank ? item.zzyGIT.seRank : 0;	
		}			
	}
	else if(info.type === 1)
	{
		return Zzy.Param.GITGSERank;
	}
	return 0;
}

Window_ZzyGITTips.prototype.GetSEInfo = function(info)
{
	if(info.type === 0)
	{
		var item = info.item;
		if(item.zzyGIT)
		{
			return item.zzyGIT.se ? item.zzyGIT.se : undefined;	
		}		
	}
	else if(info.type === 1)
	{
		return Zzy.Param.GITAllSE[2];
	}
	return undefined;	
}

Window_ZzyGITTips.prototype.updateShowFrame = function()
{
	if(this.cShowFrame < this.showFrame)
	{this.cShowFrame++;}
	else
	{
		this.isCanGet = true;
		this.cShowFrame = 0;
		if(this._list === undefined && this.visible)
		{
			this.close();//关闭
		}
	}
}

Window_ZzyGITTips.prototype.GetNextList = function()
{
	if($gameSystem._zzyGITIndex >= $gameSystem._zzyGITList.length)return undefined;
	
	var list = [];
	var maxLen = $gameSystem._zzyGITList.length;
	var maxNum = Zzy.Param.GITLineNum;//显示最大数量
	var curIndex = $gameSystem._zzyGITIndex;
	var limitIndex = $gameSystem._zzyGITIndex + maxNum;//限制级坐标
	limitIndex = limitIndex > maxLen ? maxLen : limitIndex;
	
	for(var i=curIndex;i<limitIndex;i++)
	{
		list.push($gameSystem._zzyGITList[i]);
	}
	
	list = this.SortList(list);//排列顺序
	
	
	//修改位置
	$gameSystem._zzyGITIndex = limitIndex;
	return list;
}


Window_ZzyGITTips.prototype.SortList = function(list)//通过选择排序调整位置
{
	var rList = [];

	var len = list.length;
	for(var i=0;i<len;i++)
	{
		var info = list[i];
		rList[i] = this.GetListRankInfo(info);//获取等级存放到数组中
	}
	
	for(var i=0;i<len-1;i++)
	{
		var sRank = rList[i];//目前等级
		
		//选择排序算法
		for(var j=i+1;j<len;j++)
		{	
			var tRank = rList[j];
			if(sRank < tRank)
			{
				//进行交换
				var rt = rList[i];
				rList[i] = rList[j];
				rList[j] = rt;
				
				var rObj = list[i];
				list[i] = list[j];
				list[j] = rObj;
			}
		}
		
	}
	return list;
}


Window_ZzyGITTips.prototype.Refresh = function()
{
	//重新绘制内容
	this.contents.clear();

	
	this.DrawList();//绘制道具内容以及数量
}

Window_ZzyGITTips.prototype.DrawList = function()
{
	if(!this._list || !this._list.length)return;
	var len = this._list.length;
	for(var i=0;i<len;i++)
	{
		var info = this._list[i];
		this.DrawItem(i,info);
	}
}

Window_ZzyGITTips.prototype.DrawItem = function(index,info)
{
	var drY = index*this.lineHeight();
	var nameText = this.showNameText(info);
	var numText = this.showNumberText(info);

	var iconS = 32*Zzy.Param.GITIconScale;
	var mw = this.width-this.standardPadding()*2

	var iconID = 0;
	
	
	if(this.IsGoldInfo(info))
	{
		iconID = Zzy.Param.GITGIconID;
	}
	else if(this.IsItemInfo(info))
	{
		iconID = info.item.iconIndex;
	}

	this.drawIcon(iconID, 2, drY+2);//绘制图标
	

	this.drawTextEx(nameText,iconS+4,drY);
	this.drawText(numText,iconS+4,drY,mw-(iconS+4)-2,'right');
}

Window_ZzyGITTips.prototype.drawIcon = function(ID,x,y)
{
	var spr = this.RequestIconSprite();//请求图标
	
	var info = this.makeItemInfo();
	
	spr.ResetInfo(ID,x,y,info);
	
}

Window_ZzyGITTips.prototype.makeItemInfo = function()//制作道具信息
{
	var info = {};
	info.fontSize = this.standardFontSize();
	
	return info;
}

Window_ZzyGITTips.prototype.RequestIconSprite = function()//请求位图
{
	var len = this.iconSprArr.length;
	
	for(var i=0;i<len;i++)
	{
		if(this.iconSprArr[i].free)
		{
			var spr = this.iconSprArr[i];
			spr.free = false;
			return spr;
		}
	}
	
	var newSpr = new Sprite_ZzyGITIcon(this);
	this.addChild(newSpr);
	this.iconSprArr.push(newSpr);
	return newSpr;
}

Window_ZzyGITTips.prototype.DisVisibleAllSpr = function()
{
	var len = this.iconSprArr.length;
	
	for(var i=0;i<len;i++)
	{
		var spr = this.iconSprArr[i];
		spr.free = true;
	}	
}

Zzy.GIT.Window_ZzyGITTips_processEscapeCharacter = Window_ZzyGITTips.prototype.processEscapeCharacter;
Window_ZzyGITTips.prototype.processEscapeCharacter = function(code, textState) 
{
	Zzy.GIT.Window_ZzyGITTips_processEscapeCharacter.call(this,code, textState);
	
	if(code === 'ZTC')
	{
		var colorCode = this.obtainEscapeParam2(textState);
		this.contents.textColor = colorCode;
	}
	
};

Window_ZzyGITTips.prototype.obtainEscapeParam2 = function(textState) 
{
    var arr = /^\<(.*?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[1];
    } else {
        return '';
    }
};

Window_ZzyGITTips.prototype.showNameText = function(info)//制作文本
{
	var formatStr = undefined;

	
	if(this.IsItemInfo(info))//代表道具
	{
		//显示格式
		if(info.isGain){formatStr = Zzy.Param.GITAddFormat;}
		else{formatStr = Zzy.Param.GITSubFormat;}
		
		var nameStr = info.item.name;
		nameStr = nameStr + '\\C[0]';
		
		if(info.item.zzyGIT && info.item.zzyGIT.textColor)//存在特殊颜色
		{
			var colorCode = info.item.zzyGIT.textColor;
			nameStr = '\\ZTC<' + colorCode + '>' + nameStr;
		}
		var str = formatStr.format(nameStr);
		return str;			
		
	}
	else if(this.IsGoldInfo(info))//代表金币
	{
		//显示格式		
		if(info.isGain){formatStr = Zzy.Param.GITAddGFormat;}
		else{formatStr = Zzy.Param.GITSubGFormat;}

		var str = '\\ZTC<' + Zzy.Param.GITGTextColor + '>' + formatStr;
		
		return str;
	}

	return '';
}

Window_ZzyGITTips.prototype.IsItemInfo = function(info)
{
	return info.type === 0;
}

Window_ZzyGITTips.prototype.IsGoldInfo = function(info)
{
	return info.type === 1;
}

Window_ZzyGITTips.prototype.showNumberText = function(info)
{
	var formatStr = Zzy.Param.GITNumberFormat;
	var num = info.num;
	var str = formatStr.format(num);
	return str;
}

Window_ZzyGITTips.prototype.SetWindowPos = function()
{
	var pos = {};
	pos.x = 0;
	pos.y = 0;
	
	var ax = Graphics.boxWidth;
	var ay = Graphics.boxHeight;
	var cx = Graphics.boxWidth/2;
	var cy = Graphics.boxHeight/2;
	

	//计算位置  1~9
	
	var line = Math.floor((Zzy.Param.GITBasePos-1)/3);
	var list = (Zzy.Param.GITBasePos-1) % 3;

	//计算每个位置的数值
	pos.x = list * cx - (list)*this.width/2;
	pos.y = line * cy - (line)*this.height/2;
	pos.x += Zzy.Param.GITWindowOfx;
	pos.y += Zzy.Param.GITWindowOfy
	
	return pos;
}


Window_ZzyGITTips.prototype.DefaultWidth = function()
{
	return eval(Zzy.Param.GITWindowW);
}

Window_ZzyGITTips.prototype.DefaultHeight = function()
{
	return this.fittingHeight(Zzy.Param.GITLineNum);
}

Window_ZzyGITTips.prototype.updateOpen = function() 
{
    if (this._opening) {
        this.openness += Zzy.Param.GITWindowOpenSpeed;
        if (this.isOpen()) {
            this._opening = false;
        }
    }
};

Window_ZzyGITTips.prototype.updateClose = function() {
    if (this._closing) {
        this.openness -= Zzy.Param.GITWindowOpenSpeed;
        if (this.isClosed()) {
            this._closing = false;
			this.visible = false;
        }
    }
};

Window_ZzyGITTips.prototype.open = function() {
    if (!this.isOpen()) {
        this._opening = true;
    }
    this._closing = false;
	this.visible = true;
};

Window_ZzyGITTips.prototype.close = function() {
    if (!this.isClosed()) {
        this._closing = true;
    }
    this._opening = false;
};

Window_ZzyGITTips.prototype.isOpening = function() {
    return this._opening;
};

Window_ZzyGITTips.prototype.isClosing = function() {
    return this._closing;
};

Window_ZzyGITTips.prototype.setup = function()
{
	this.open();//启动
}

Window_ZzyGITTips.prototype.standardFontSize = function() //改变字体大小
{
    return Zzy.Param.GITWindowFontSize;
};

Window_ZzyGITTips.prototype.lineHeight = function() 
{
    return this.standardFontSize()+8;
};

//=======================================================================
//Game_Party
//=======================================================================
Zzy.GIT.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) 
{
	var result = Zzy.GIT.Game_Party_gainItem.call(this,item, amount, includeEquip);

	if(Zzy.GIT.IsCanVisible() && Zzy.GIT.IsCompatibleComp())
	{
		if($gameSystem.GetZzyGITPluginEnable())//插件开启
		{
			if(item && amount)
			{
				var info = {};
				info.isGain = amount >= 0 ? true : false;
				info.item = item;
				info.num = Math.abs(amount);
				info.type = 0;//代表道具
				$gameSystem.PushZzyGITList(info);//压入信息			
			}			
		}		
	}

	return result;
};




Zzy.GIT.Game_Party_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount)
{
	Zzy.GIT.Game_Party_gainGold.call(this,amount);
	
	if($gameSystem.GetZzyGITPluginEnable())//插件开启
	{
		if(Zzy.Param.GITIsGoldShow && amount)
		{
			var info = {};
			info.isGain = amount >= 0 ? true : false;
			info.item = undefined;
			info.num = Math.abs(amount);
			info.type = 1;//代表金币
			$gameSystem.PushZzyGITList(info);//压入信息	
		}
		
	}
	
	
}

//=======================================================================
//Sprite_ZzyGITIcon
//=======================================================================

function Sprite_ZzyGITIcon() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGITIcon.prototype = Object.create(Sprite.prototype);
Sprite_ZzyGITIcon.prototype.constructor = Sprite_ZzyGITIcon;


Sprite_ZzyGITIcon.iconWidth = 32;
Sprite_ZzyGITIcon.iconHeight = 32;
Sprite_ZzyGITIcon.StandFontSize = 28;//标准字体大小


Sprite_ZzyGITIcon.prototype.initialize = function(pointer) 
{
    Sprite.prototype.initialize.call(this);
	this.myParent = pointer;
	this.free = false;//自由属性
	this.iconId = 0;
	this.rx = 0;
	this.ry = 0;
	this.visible = false;//防止闪烁	
	
	
	this.cFlashFrame = 0;//闪烁
	this.eFlashFrame = 0;//闪烁结束长度
	this.isFlashing = false;//闪烁中
	
	this.NewEmptyBitmap();
};

Sprite_ZzyGITIcon.prototype.NewEmptyBitmap = function()
{
	var nw = Sprite_ZzyGITIcon.iconWidth;
	var nh = Sprite_ZzyGITIcon.iconHeight;
	this.bitmap = new Bitmap(nw,nh);
}


Sprite_ZzyGITIcon.prototype.ResetInfo = function(ID,x,y,info)//重新设置
{
	this.iconId = ID;
	
	this.bltMyIcon();//绘制图标
	this.ResetPos(x,y);
	this.ResetScale(info.fontSize);//缩放倍率
	
	this.startFlash();//进行闪烁
}

Sprite_ZzyGITIcon.prototype.stopFlash = function()//停止闪烁
{
	this.cFlashFrame = 0;
	this.eFlashFrame = 0;
	this.isFlashing = false;
	
	this.setColorTone([0,0,0,0]);
}


Sprite_ZzyGITIcon.prototype.startFlash = function()//开始
{
	if(Zzy.Param.GITIsIconFlash)//可以闪烁
	{
		this.cFlashFrame = 0;
		this.eFlashFrame = Zzy.Param.GITIconFlashFrame;
		this.isFlashing = true;		
	}
}


Sprite_ZzyGITIcon.prototype.ResetPos = function(x,y)//更新位置
{
	this.rx = x;
	this.ry = y;	
	this.x = this.RealX();
	this.y = this.RealY();	
}

Sprite_ZzyGITIcon.prototype.ResetScale = function(fSize)
{
	var ds = fSize - Sprite_ZzyGITIcon.StandFontSize;
	
	var isw = Sprite_ZzyGITIcon.iconWidth + ds;
	var ish = Sprite_ZzyGITIcon.iconHeight + ds;
	
	this.scale.x = isw * Zzy.Param.GITIconScale / Sprite_ZzyGITIcon.iconWidth;
	this.scale.y = ish * Zzy.Param.GITIconScale / Sprite_ZzyGITIcon.iconHeight;
		
}

Sprite_ZzyGITIcon.prototype.bltMyIcon = function()
{

	this.bitmap.clear();//清理

	var bp = ImageManager.loadSystem('IconSet');
	var pw = Sprite_ZzyGITIcon.iconWidth;
	var ph = Sprite_ZzyGITIcon.iconHeight;
	var sx = this.iconId % 16 * pw;
	var sy = Math.floor(this.iconId / 16) * ph;
	this.bitmap.blt(bp, sx, sy, pw, ph, 0, 0);	
	
}


Sprite_ZzyGITIcon.prototype.standardPadding = function() //标准距离
{
    return this.myParent.standardPadding();
};


Sprite_ZzyGITIcon.prototype.RealX = function()//应该出现的位置X
{
	var posX = this.rx + this.standardPadding();
	
	return posX;
}

Sprite_ZzyGITIcon.prototype.RealY = function()//应该出现的位置Y
{
	var posY = this.ry + this.standardPadding();
	
	return posY;
}


Sprite_ZzyGITIcon.prototype.update = function()
{
	Sprite.prototype.update.call(this);
	
	//判断自由属性
	if(this.free){this.visible = false;return;}

	this.updateFlash();//更新闪烁
	this.updateOpenVisible();	
}

Sprite_ZzyGITIcon.prototype.updateFlash = function()
{
	if(!this.visible)return;//不显示则不刷新
	if(this.isFlashing)
	{
		if(this.cFlashFrame > this.eFlashFrame)
		{
			this.stopFlash();
		}
		else
		{
			this.cFlashFrame++;
		}
		var rate = this.cFlashFrame / this.eFlashFrame;//比率
		
		var vtone = Math.round(255 - 255*rate);
		this.setColorTone([vtone,vtone,vtone,0]);
	}
}


Sprite_ZzyGITIcon.prototype.updateOpenVisible = function()//更新显示情况
{
	this.visible = !!this.myParent.isOpen();//完全打开时显示
}

//=======================================================================
//Sprite_ZzyGITBkPic
//=======================================================================

function Sprite_ZzyGITBkPic() 
{
    this.initialize.apply(this, arguments);
}

Sprite_ZzyGITBkPic.prototype = Object.create(Sprite.prototype);
Sprite_ZzyGITBkPic.prototype.constructor = Sprite_ZzyGITBkPic;

Sprite_ZzyGITBkPic.prototype.initialize = function(pointer,name) 
{
    Sprite.prototype.initialize.call(this);
	this.myParent = pointer;
	this.picName = name;
	this.picBitmap = undefined;//缓存
	this.isNeedAutoScale = true;
	
	this.CreaterBitmap();//创建背景图片
};

Sprite_ZzyGITBkPic.prototype.CreaterBitmap = function()
{
	this.picBitmap = ImageManager.loadPicture(this.picName);
}


Sprite_ZzyGITBkPic.prototype.update = function()
{
	Sprite.prototype.update.call(this);
	this.updateOpacity();
	this.AutoSetScale();
}


Sprite_ZzyGITBkPic.prototype.updateOpacity = function()//更新透明度
{
	if(Zzy.Param.GITBkOpFollowOpenSpeed)
	{
		this.opacity = this.myParent._openness;
	}
}

Sprite_ZzyGITBkPic.prototype.AutoSetScale = function()
{
	if(!this.isNeedAutoScale)return;//不用刷新长款比例
	if(this.IsReady())
	{
		this.bitmap = this.picBitmap;
		
		var bw = this.bitmap.width;
		var bh = this.bitmap.height;
		var pw = this.myParent.width;
		var ph = this.myParent.height;
		
		this.scale.x =  pw / bw;
		this.scale.y = ph / bh;
		
		this.isNeedAutoScale = false;
	}	
}

Sprite_ZzyGITBkPic.prototype.IsReady = function()
{
	if(this.picBitmap && this.picBitmap.width && this.picBitmap.height)
	{return true;}
	return false;
}

//-----------------------------Zzy.GIT.Function----------------------------

Zzy.GIT.PlaySE = function(soundID)//播放声音
{
	var se = Zzy.Param.GITAllSE[soundID];
	if(se && se.name)
	{
		AudioManager.playSe(se);
	}
}

Zzy.GIT.ClearList = function()//清理所有的消息表
{
	$gameSystem.ClearZzyGITList();
}

Zzy.GIT.SurplusCount = function()//获取未显示的剩余消息
{
	return $gameSystem.ZzyGITSurplusCount();//剩余消息数量
}

Zzy.GIT.IsEnable = function(isEnable)
{
	$gameSystem.SetZzyGITPluginEnable(isEnable);
	
}

Zzy.GIT.IsCompatibleComp = function()//其他插件的兼容限制完成
{	
	if(Zzy.GIT.YEPItemCoreConstraints)return false;//YEP独立物品核心
	if(Zzy.GIT.YEPItemCoreConstraints2)return false;//YEP独立物品核心
	
	return true;
}

Zzy.GIT.IsCanVisible = function()
{
	if(Zzy.GIT.ChangeEquipFlag)return false;
	
	return true;
}

