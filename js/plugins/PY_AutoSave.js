//===============================================================
//PY_AutoSave.js
//===============================================================
/*:
 * @plugindesc [v1.5]自动存档
 * @author 破夜沙狼
 * @help 
 使用说明：
本插件可以利用插件指令进行自动存档，可以设置存档的位置（1-20号）。
也可以设置存档的音效和图片，当自动存档后会播放提示音效和显示图片。
图片使用说明：
位置：img/pictures/
默认图片名称：Save
img/pictures/下要存放Save名的png图片，如果没有会提示报错，或者你
可以自己在参数中选择一张。
PS:自动存档位置无法手动存档。

插件指令：自动存档

插件指令：删除存档 存档ID
例如：删除存档 2     //删除2号ID对应的存档

使用条款：本插件可免费用于非商业及商业用途。
请在游戏结尾名单中署名：破夜沙狼
=============================================================================
更新日志：
v1.5
对光标位置进行了调整，可以设置是否调整光标位置
v1.4
1.禁止了自动存档位置的手动存档功能
2.可自行更改自动存档位置的文本了
3.加入删除存档指令，可删除指定的存档
v1.3
“自动存档”文本提示加入颜色的提示，修改其他存档的ID编号
v1.2
自动存档文件前加入“自动存档”文本提示
v1.1 
1.完善音效的提示，可自定义音效的音量
2.加入提示的图片，可自定义提示图片的各项参数
v1.0 
完成初始插件
 
 *   
 * @param 存档位置
 * @desc 可以自定义自动存档的位置，默认1号位置（可最多设置1-20号）
 * @type number
 * @min 1
 * @max 20
 * @default 1

 * @param 调整光标位置
 * @desc 可以调整默认的光标位置，调整后光标初始显示在自动存档下方存档位置
 * @type boolean
 * @on 调整
 * @off 不调整
 * @default false

 * @param 存档文本
 * @desc 可以设定自动存档对应的文本
 * @type string
 * @default 自动存档

 * @param 自动存档文本颜色
 * @desc 可以更改自动存档文本的颜色
 * @type number
 * @min 0
 * @max 31
 * @default 18

 * @param 存档音效
 * @desc 自动存档指令触发后自动播放该音效
 * @type file
 * @dir audio/se/
 * @default Save
 
 * @param 音效音量
 * @desc 可以更改提示音效的音量大小
 * @type number
 * @min 1
 * @max 100
 * @default 50
 
 * @param 提示图片
 * @type file
 * @dir img\pictures
 * @default Save
 
 * @param 提示图片ID
 * @desc 可以设置显示图片的ID
 * @type number
 * @min 1
 * @max 100
 * @default 1
 
 * @param 提示图片x坐标
 * @desc 可以设置显示图片的x坐标
 * @type number
 * @min 1
 * @max 3000
 * @default 10

 * @param 提示图片y坐标
 * @desc 可以设置显示图片的y坐标
 * @type number
 * @min 1
 * @max 3000
 * @default 10
 
 * @param 提示图片透明度
 * @desc 可以设置显示图片的透明度（1~255）
 * @type number
 * @min 1
 * @max 255
 * @default 150
 
 * @param 提示图片提示时间
 * @desc 可以设置显示图片提示的时间,单位：秒
 * @type number
 * @min 1
 * @max 1000
 * @default 1
*/
(function() {
//自动存档及存档位置	
	var parameters = PluginManager.parameters('PY_AutoSave');
	
	var PY_Save = Number(parameters['存档位置']);
	var PY_SaveName = String(parameters['存档文本']);
	var PY_SaveColor = Number(parameters['自动存档文本颜色']);
	var PY_Se = String(parameters['存档音效']);
	var PY_SeVolume = Number(parameters['音效音量']);
	var PY_SavePic = String(parameters['提示图片']);
	var PY_SavePicID = Number(parameters['提示图片ID']);
	var PY_SavePic_x = Number(parameters['提示图片x坐标']);
	var PY_SavePic_y = Number(parameters['提示图片y坐标']);
	var PY_SavePicOpacity = Number(parameters['提示图片透明度']);
	var PY_SavePicTime = Number(parameters['提示图片提示时间']);
	var PY_SelectCursor = String(parameters['调整光标位置']);

	
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === '自动存档') {
			var args = PY_Save;
			//存档
			$gameSystem.onBeforeSave();
            $gameSystem._saveCount--;//存储次数减1
            DataManager.saveGame(args);//自动存档在参数传入的值
                //播放音效
				   var sound = {
                       name:PY_Se,
                       volume: PY_SeVolume,
                       pitch:  100,
                       pan:    0
                    };
            AudioManager.playSe(sound);
			//显示图片提醒
			$gameScreen.showPicture(PY_SavePicID, PY_SavePic, 0,PY_SavePic_x, PY_SavePic_y,100, 100, PY_SavePicOpacity, 0);
			// console.log("执行了");
			setTimeout(function(){
				$gameScreen.erasePicture(PY_SavePicID); 
				}, PY_SavePicTime*1000);

        }
		if (command === '删除存档') {
			let saveid = parseInt(args[0]);
			StorageManager.remove(saveid || 1);
		}
    }; 
	//文本及ID数字更改
	_Window_SavefileList_drawFileId = Window_SavefileList.prototype.drawFileId;
	Window_SavefileList.prototype.drawFileId = function(id, x, y) {
        //this.drawText(TextManager.file + ' ' + id, x, y, 180);
		_Window_SavefileList_drawFileId.call(this);
        if (id === PY_Save){
			this.changeTextColor(this.textColor(PY_SaveColor));
            this.drawText(PY_SaveName, x, y, 180);
			this.resetTextColor();
        }else{
			this.drawText(TextManager.file + ' ' + Number(id-1) , x, y, 180);
		}
    };
	//禁止在设定的自动存档位置手动存档
	_Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk; 
	Scene_Save.prototype.onSavefileOk = function() {
		if (this.savefileId() == PY_Save) {
			this.onSaveFailure();
			return;
		}
		_Scene_Save_onSavefileOk.call(this);
	};
	/*
	//光标位置调整
	_Scene_File_createListWindow = Scene_File.prototype.createListWindow;
	Scene_File.prototype.createListWindow = function() {
		_Scene_File_createListWindow.call(this);
		if(PY_SelectCursor === "true"){
			this._listWindow.select(parseInt(PY_Save)-2);
		}else{
			this._listWindow.select(parseInt(PY_Save)-1);
		}
		
	};
    */
	
})();