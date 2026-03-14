//
/*:
 * @plugindesc 语言切换.
 * @author 杨志（yang1zhi）落泪
 * @help  yangzhi40#hotmail.com
 * 在游戏中切换语言
 * 版本：1.4
 * yangzhi40@hotmail.com
 * 修正了更改名字后用更改后的名字
 */

YUYAN_QIEHUAN = {}
ConfigManager.yuyan_diaoyong = 1

    YUYAN_QIEHUAN_FUNCTION = {}

//切换语言
YUYAN_QIEHUAN_FUNCTION.qiehuan_yuyan = function () {
    YUYAN_QIEHUAN_FUNCTION.qiehuan_shujuku_yuyan()
    YUYAN_QIEHUAN_FUNCTION.qiehuan_youxizhong_yuyan()
}

//切换角色名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_actor_name = function () {
    for (var i = 1; i < $dataActors.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_name[i]) {
            $dataActors[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_name[i]
        }
    }
}

WENZIDIAOYONG_GAME_ACTOR_SETNAME = Game_Actor.prototype.setName
Game_Actor.prototype.setName = function(name) {
	this._setname_kg = true
    WENZIDIAOYONG_GAME_ACTOR_SETNAME.call(this,name);
};

WENZIDIAOYONG_GAME_ACTOR_NAME = Game_Actor.prototype.name
Game_Actor.prototype.name = function() {
	if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_name[this._actorId] && !this._setname_kg) {
		return YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_name[this._actorId]
	}
	return WENZIDIAOYONG_GAME_ACTOR_NAME.call(this);
};

//切换角色昵称
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_actor_nickname = function () {
    for (var i = 1; i < $dataActors.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_nickname && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_nickname[i]) {
            $dataActors[i].nickname = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_nickname[i]
        }
    }
}

WENZIDIAOYONG_GAME_ACTOR_NICKNAME = Game_Actor.prototype.nickname
Game_Actor.prototype.nickname = function() {
    if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_nickname && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_nickname[this._actorId]) {
            return YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_nickname[this._actorId]
        }
	WENZIDIAOYONG_GAME_ACTOR_NICKNAME.call(this);
};


//切换角色简介
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_actor_profile = function () {
    for (var i = 1; i < $dataActors.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_profile && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_profile[i]) {
            $dataActors[i].profile = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.actor_profile[i]
        }
    }
}
//切换职业名称
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_classs_name = function () {
    for (var i = 1; i < $dataClasses.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.classs_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.classs_name[i]) {
            $dataClasses[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.classs_name[i]
        }
    }
}

//切换技能名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_SKILL_name = function () {
    for (var i = 1; i < $dataSkills.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_name[i]) {
            $dataSkills[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_name[i]
        }
    }
}

//切换技能描述
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_SKILL_miaoshu = function () {
    for (var i = 1; i < $dataSkills.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_description && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_description[i]) {
            $dataSkills[i].description = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_description[i]
        }
    }
}
//切换技能信息1
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_skill_message1 = function () {
    for (var i = 1; i < $dataSkills.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_message1 && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_message1[i]) {
            $dataSkills[i].message1 = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_message1[i]
        }
    }
}
//切换技能信息2
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_skill_message2 = function () {
    for (var i = 1; i < $dataSkills.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_message2 && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_message2[i]) {
            $dataSkills[i].message2 = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.skill_message2[i]
        }
    }
}

//切换物品名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_item_name = function () {
    for (var i = 1; i < $dataItems.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.item_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.item_name[i]) {
            $dataItems[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.item_name[i]
        }
    }
}

//切换物品描述
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_item_miaoshu = function () {
    for (var i = 1; i < $dataItems.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.item_description && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.item_description[i]) {
            $dataItems[i].description = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.item_description[i]
        }
    }
}

//切换武器名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_WUQI_name = function () {
    for (var i = 1; i < $dataWeapons.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.weapon_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.weapon_name[i]) {
            $dataWeapons[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.weapon_name[i]
        }
    }
}

//切换武器描述
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_WUQI_miaoshu = function () {
    for (var i = 1; i < $dataWeapons.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.weapon_description && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.weapon_description[i]) {
            $dataWeapons[i].description = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.weapon_description[i]
        }
    }
}

//切换护甲名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_hujia_name = function () {
    for (var i = 1; i < $dataArmors.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.armors_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.armors_name[i]) {
            $dataArmors[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.armors_name[i]
        }
    }
}

//切换护甲描述
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_hujia_miaoshu = function () {
    for (var i = 1; i < $dataArmors.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.armors_description && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.armors_description[i]) {
            $dataArmors[i].description = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.armors_description[i]
        }
    }
}

//切换敌人名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_diren_name = function () {
    for (var i = 1; i < $dataEnemies.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.enemie_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.enemie_name[i]) {
            $dataEnemies[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.enemie_name[i]
        }
    }
}

//切换敌群名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_diqun_name = function () {
    for (var i = 1; i < $dataTroops.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.troop_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.troop_name[i]) {
            $dataTroops[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.troop_name[i]
        }
    }
}

//切换状态名称
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_name = function () {
    for (var i = 1; i < $dataStates.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_name[i]) {
            $dataStates[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_name[i]
        }
    }
}
//切换状态信息1
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message1 = function () {
    for (var i = 1; i < $dataStates.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message1 && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message1[i]) {
            $dataStates[i].message1 = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message1[i]
        }
    }
}
//切换状态信息2
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message2 = function () {
    for (var i = 1; i < $dataStates.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message2 && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message2[i]) {
            $dataStates[i].message2 = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message2[i]
        }
    }
}
//切换状态信息3
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message3 = function () {
    for (var i = 1; i < $dataStates.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message3 && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message3[i]) {
            $dataStates[i].message3 = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message3[i]
        }
    }
}
//切换状态信息4
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message4 = function () {
    for (var i = 1; i < $dataStates.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message4 && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message4[i]) {
            $dataStates[i].message4 = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.state_message4[i]
        }
    }
}
//切换动画名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_animation_name = function () {
    for (var i = 1; i < $dataAnimations.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.animation_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.animation_name[i]) {
            $dataAnimations[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.animation_name[i]
        }
    }
}
//切换图块名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_Tileset_name = function () {
    for (var i = 1; i < $dataTilesets.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Tileset_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Tileset_name[i]) {
            $dataTilesets[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Tileset_name[i]
        }
    }
}
//切换公共事件名字
YUYAN_QIEHUAN_FUNCTION.qiehuan_data_CommonEvent_name = function () {
    for (var i = 1; i < $dataCommonEvents.length; i++) {
        if (YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_name && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_name[i]) {
            $dataCommonEvents[i].name = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_name[i]
        }
    }
}

//地图名字显示
Game_Map.prototype.displayName = function () {
    var displayName = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_map[$gameMap.mapId()]
        return displayName;
};
//切换事件对话
Game_Interpreter.prototype.setupChild = function (list, eventId, commonEvent_id) {
    this._childInterpreter = new Game_Interpreter(this._depth + 1, commonEvent_id);
    this._childInterpreter.setup(list, eventId);
};
// Common Event
Game_Interpreter.prototype.command117 = function () {
    var commonEvent = $dataCommonEvents[this._params[0]];
    if (commonEvent) {
        var eventId = this.isOnCurrentMap() ? this._eventId : 0;
        this.setupChild(commonEvent.list, eventId, this._params[0]);
    }
    return true;
};

Game_Interpreter.prototype.initialize = function (depth, commonEvent_id) {
    this._commonEvent_id = commonEvent_id;
    this._depth = depth || 0;
    this.checkOverflow();
    this.clear();
    this._branch = {};
    this._params = [];
    this._indent = 0;
    this._frameCount = 0;
    this._freezeChecker = 0;
};

// Show Text
Game_Interpreter.prototype.command101 = function () {
    if (!$gameMessage.isBusy()) {
        $gameMessage.setFaceImage(this._params[0], this._params[1]);
        $gameMessage.setBackground(this._params[2]);
        $gameMessage.setPositionType(this._params[3]);
        while (this.nextEventCode() === 401) { // Text data
            this._index++;
            var message = this.currentCommand().parameters[0]
			if (this._commonEvent_id) {
                    if (ConfigManager.yuyan_diaoyong && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT[this._commonEvent_id] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT[this._commonEvent_id][this._index]) {
                        var message = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT[this._commonEvent_id][this._index]
                    }
                } else {
                    if (ConfigManager.yuyan_diaoyong && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Event_txt && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Event_txt[$gameMap.mapId()] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Event_txt[$gameMap.mapId()][this._eventId] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Event_txt[$gameMap.mapId()][this._eventId][$gameMap._events[this._eventId]._pageIndex] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Event_txt[$gameMap.mapId()][this._eventId][$gameMap._events[this._eventId]._pageIndex][this._index]) {
                        var message = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.Event_txt[$gameMap.mapId()][this._eventId][$gameMap._events[this._eventId]._pageIndex][this._index]
                    }
                }
                $gameMessage.add(message)
        }
        switch (this.nextEventCode()) {
        case 102: // Show Choices
            this._index++;
            var message = this.currentCommand().parameters
                if (this._commonEvent_id) {
                    if (ConfigManager.yuyan_diaoyong && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT_Choices && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT_Choices[this._commonEvent_id] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT_Choices[this._commonEvent_id][this._index]) {
                        message[0] = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.CommonEvent_TXT_Choices[this._commonEvent_id][this._index]
                    }
                } else {
                    if (ConfigManager.yuyan_diaoyong && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.event_txt_Choices && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.event_txt_Choices[$gameMap.mapId()] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.event_txt_Choices[$gameMap.mapId()][this._eventId] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.event_txt_Choices[$gameMap.mapId()][this._eventId][$gameMap._events[this._eventId]._pageIndex] && YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.event_txt_Choices[$gameMap.mapId()][this._eventId][$gameMap._events[this._eventId]._pageIndex][this._index]) {
                        message[0] = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.event_txt_Choices[$gameMap.mapId()][this._eventId][$gameMap._events[this._eventId]._pageIndex][this._index]
                    }
                }

                this.setupChoices(message)
                break;
        case 103: // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104: // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
        }
        this._index++;
        this.setWaitMode('message');
    }
    return false;
};

//切换数据库语言
YUYAN_QIEHUAN_FUNCTION.qiehuan_shujuku_yuyan = function () {
    if (!YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong]) {
        return
    }
    //切换角色名称
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_actor_name()
    //切换角色昵称
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_actor_nickname()
    //切换角色简介
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_actor_profile()
    //切换职业名称
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_classs_name()
    //切换技能名称
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_SKILL_name()
    //切换技能描述
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_SKILL_miaoshu()
    //切换技能信息1
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_skill_message1()
    //切换技能信息2
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_skill_message2()
    //切换物品名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_item_name()
    //切换物品描述
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_item_miaoshu()
    //切换武器名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_WUQI_name()
    //切换武器描述
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_WUQI_miaoshu()
    //切换护甲名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_hujia_name()
    //切换护甲描述
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_hujia_miaoshu()
    //切换敌人名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_diren_name()
    //切换敌群名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_diqun_name()
    //切换状态名称
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_name()
    //切换状态信息1
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message1()
    //切换状态信息2
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message2()
    //切换状态信息3
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message3()
    //切换状态信息4
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_zhuangtai_message4()
    //切换动画名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_animation_name()
    //切换图块名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_Tileset_name()
    //切换公共事件名字
    YUYAN_QIEHUAN_FUNCTION.qiehuan_data_CommonEvent_name()
    //切换游戏标题
    $dataSystem.gameTitle = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_gameTitle
        //切换货币单位
        $dataSystem.currencyUnit = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_currencyUnit
        //切换属性
        $dataSystem.elements = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_elements
        //切换技能类型
        $dataSystem.skillTypes = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_skillTypes
        //切换武器类型
        $dataSystem.weaponTypes = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_weaponTypes
        //切换护甲类型
        $dataSystem.armorTypes = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_armorTypes
        //切换装备类型
        $dataSystem.equipTypes = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_equipTypes
        //切换用语-基本状态
        $dataSystem.terms.basic = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_basic
        //切换用语-能力值
        $dataSystem.terms.params = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_params
        //切换用语-指令
        $dataSystem.terms.commands = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_commands
        //切换用语-信息
        $dataSystem.terms.messages = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].SHUJUKU_YONGYU.System_messages
}

//切换游戏中用语
YUYAN_QIEHUAN_FUNCTION.qiehuan_youxizhong_yuyan = function () {
    WENZI_DIAOYONG = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.WENZI_DIAOYONG
        ELEMENT_NAME = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.ELEMENT_NAME
        ZHEN_JUQING_DUIHUA = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.ZHEN_JUQING_DUIHUA
        JUQING_WENZI = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.JUQING_WENZI
        MINGCI_DIAOYONG = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.MINGCI_DIAOYONG
        PINGSHI_DUIHUA = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.PINGSHI_DUIHUA
        WENDA = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.WENDA
        SUOYOU_RENWU_LB = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.SUOYOU_RENWU_LB
        DITU_GUAIWU_QUYU = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].YOUXI_WENBEN.DITU_GUAIWU_QUYU

}

WENZIDIAOYONG_SCENE_TITLE_INITIALIZE = Scene_Title.prototype.initialize
    Scene_Title.prototype.initialize = function () {
    WENZIDIAOYONG_SCENE_TITLE_INITIALIZE.call(this);
    YUYAN_QIEHUAN_FUNCTION.qiehuan_yuyan()
};


WENZIDIAOYONG_WINDOW_OPTIONS_MAKECOMMANDLIST = Window_Options.prototype.makeCommandList
Window_Options.prototype.makeCommandList = function() {
	WENZIDIAOYONG_WINDOW_OPTIONS_MAKECOMMANDLIST.call(this);
	this.addCommand(YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].ZHONGYAO.language, 'Language');
};



// 存储1号插件的drawItem方法
var WENZIDIAOYONG_WINDOW_OPTIONS_DRAWITEM = Window_Options.prototype.drawItem;
// 存储原始的drawItem方法
var originalDrawItem = function() {};

// 检查是否存在Yanfly对象和Yanfly.Options对象
if (typeof Yanfly !== 'undefined' && Yanfly.Options) {
  originalDrawItem = Yanfly.Options.Window_Options_drawItem;
} else {
	originalDrawItem = Window_Options.prototype.drawItem;
}

// 执行自定义的drawItem方法
Window_Options.prototype.drawItem = function(index) {
  var symbol = this.commandSymbol(index);

  if (symbol === 'Language') {
    if (originalDrawItem) {
      // 执行1号插件的drawItem方法
      originalDrawItem.call(this, index);
    } else {
      // 执行默认的drawItem方法
      WENZIDIAOYONG_WINDOW_OPTIONS_DRAWITEM.call(this, index);
    }
  } else {
    // 执行1号插件的drawItem方法
    WENZIDIAOYONG_WINDOW_OPTIONS_DRAWITEM.call(this, index);
  }
};

var WENZIDIAOYONG_WINDOW_OPTIONS_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var symbol = this.commandSymbol(this.index());

  if (symbol === 'Language') {
	ConfigManager.yuyan_diaoyong += 1;
        var keys = Object.keys(YUYAN_QIEHUAN)
            if (ConfigManager.yuyan_diaoyong > keys.length) {
                ConfigManager.yuyan_diaoyong = 1
            }
            SoundManager.playCursor();
        this.redrawItem(this.findSymbol(symbol));
        YUYAN_QIEHUAN_FUNCTION.qiehuan_yuyan()
        SceneManager.goto(Scene_Options);
        return
  } else {
    WENZIDIAOYONG_WINDOW_OPTIONS_processOk.call(this);
  }
};


WENZIDIAOYONG_WINDOW_OPTIONS_STATUSTEXT = Window_Options.prototype.statusText
Window_Options.prototype.statusText = function (index) {
	var symbol = this.commandSymbol(index);
	if (symbol === "Language") {
        var txt = YUYAN_QIEHUAN[ConfigManager.yuyan_diaoyong].ZHONGYAO.guojia + "." + ConfigManager.yuyan_diaoyong
            return txt
    }
	return WENZIDIAOYONG_WINDOW_OPTIONS_STATUSTEXT.call(this,index);
};



WENZIDIAOYONG_CONFIGMANAGER_MAKEDATA = ConfigManager.makeData
ConfigManager.makeData = function () {
	var config = WENZIDIAOYONG_CONFIGMANAGER_MAKEDATA.call(this);
    config.yuyan_diaoyong = this.yuyan_diaoyong;
    return config;
};

WENZIDIAOYONG_CONFIGMANAGER_APPLYDATA = ConfigManager.applyData
ConfigManager.applyData = function (config) {
	WENZIDIAOYONG_CONFIGMANAGER_APPLYDATA.call(this,config);
    this.yuyan_diaoyong = this.readyuyan_diaoyong(config, 'yuyan_diaoyong');
};

ConfigManager.readyuyan_diaoyong = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
        return Number(value).clamp(0, 100);
    } else {
        return 1;
    }
};
