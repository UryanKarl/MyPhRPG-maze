//
/*:
 * @plugindesc 工程文本导出.
 * @author 杨志（yang1zhi）落泪
 * @help  yangzhi40#hotmail.com
 * 语言插件的辅助工具
 * 可以讲游戏工程里需要翻译的文本导出来.TXT
 * 之后把导出的文本放到语言插件里就可以了
 *
 * 版本：1.0
 * yangzhi40@hotmail.com
 */

//选择导出的内容(要输出的内容写true,不输出的写false)
GONGCHENG_WENBEN_DAOCHU_XUANZE = {
    //角色名字
    actor_name: true,
    //角色昵称
    actor_nickname: true,
    //角色简介
    actor_profile: true,
    //职业名称
    classs_name: true,
    //技能名称
    skill_name: true,
    //技能说明
    skill_description: true,
    //技能信息1
    skill_message1: true,
    //技能信息2
    skill_message2: true,
    //物品名字
    item_name: true,
    //物品说明
    item_description: true,
    //武器名字
    weapon_name: true,
    //武器说明
    weapon_description: true,
    //护甲名字
    armors_name: true,
    //护甲说明
    armors_description: true,
    //敌人名字
    enemie_name: true,
    //敌群名字
    troop_name: true,
    //状态名字
    state_name: true,
    //状态信息1
    state_message1: true,
    //状态信息2
    state_message2: true,
    //状态信息3
    state_message3: true,
    //状态信息4
    state_message4: true,
    //动画名字
    animation_name: true,
    //图块名字
    Tileset_name: true,
    //公共事件名字
    CommonEvent_name: true,
    //公共事件对话
    CommonEvent_TXT: true,
    //游戏标题
    System_gameTitle: true,
    //货币单位
    System_currencyUnit: true,
    //属性
    System_elements: true,
    //技能类型
    System_skillTypes: true,
    //武器类型
    System_weaponTypes: true,
    //护甲类型
    System_armorTypes: true,
    //装备类型
    System_equipTypes: true,
    //用语-基本状态
    System_basic: true,
    //用语-能力值
    System_params: true,
    //用语-指令
    System_commands: true,
    //用语-信息
    System_messages: true,
    //显示地图名称
    System_map: true,
    //事件对话
    Event_txt: true,
}

EXPORT_SCENE_TITLE_INITIALIZE = Scene_Title.prototype.initialize
    Scene_Title.prototype.initialize = function () {
    EXPORT_SCENE_TITLE_INITIALIZE.call(this);
    this.exportt()
};

Scene_Title.prototype.exportt = function () {
    const fs = require('fs');
    const path = require('path');
    var output = {
        actor: {},
        classs: {},
        skill: {},
        item: {},
        weapon: {},
        armors: {},
        enemie: {},
        troop: {},
        state: {},
        animation: {},
        Tileset: {},
        CommonEvent: {},
        System: {},
        map: {},
        Event: {},
    }
    var output_txt = "SHUJUKU_YONGYU : {\n"
        //角色名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.actor_name) {
            output.actor.name = ["actor_name : {\n", "1-角色名字"];
            for (var i = 1; i < $dataActors.length; i++) {
                var name = $dataActors[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.actor.name[0] += `${i}:"${name}",\n`;
            }
            output.actor.name[0] += "},\n"
        }

        //角色昵称
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.actor_nickname) {
            output.actor.nickname = ["actor_nickname : {\n", "2-角色昵称"];
            for (var i = 1; i < $dataActors.length; i++) {
                var name = $dataActors[i].nickname
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.actor.nickname[0] += `${i}:"${name}",\n`;
            }
            output.actor.nickname[0] += "},\n"
        }

        //角色简介
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.actor_profile) {
            output.actor.profile = ["actor_profile : {\n", "3-角色简介"];
            for (var i = 1; i < $dataActors.length; i++) {
                var name = $dataActors[i].profile
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.actor.profile[0] += `${i}:"${name}",\n`;
            }
            output.actor.profile[0] += "},\n"
        }

        //职业名称
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.classs_name) {
            output.classs.name = ["classs_name : {\n", "4-职业名称"];
            for (var i = 1; i < $dataClasses.length; i++) {
                var name = $dataClasses[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.classs.name[0] += `${i}:"${name}",\n`;
            }
            output.classs.name[0] += "},\n"
        }

        //技能名称
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.skill_name) {
            output.skill.name = ["skill_name : {\n", "5-技能名称"];
            for (var i = 1; i < $dataSkills.length; i++) {
                var name = $dataSkills[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.skill.name[0] += `${i}:"${name}",\n`;
            }
            output.skill.name[0] += "},\n"
        }

        //技能说明
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.skill_description) {
            output.skill.description = ["skill_description : {\n", "6-技能说明"];
            for (var i = 1; i < $dataSkills.length; i++) {
                var name = $dataSkills[i].description
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.skill.description[0] += `${i}:"${name}",\n`;
            }
            output.skill.description[0] += "},\n"
        }

        //技能信息1
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.skill_message1) {
            output.skill.message1 = ["skill_message1 : {\n", "7-技能信息1"];
            for (var i = 1; i < $dataSkills.length; i++) {
                var name = $dataSkills[i].message1
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.skill.message1[0] += `${i}:"${name}",\n`;
            }
            output.skill.message1[0] += "},\n"
        }

        //技能信息2
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.skill_message2) {
            output.skill.message2 = ["skill_message2 : {\n", "8-技能信息2"];
            for (var i = 1; i < $dataSkills.length; i++) {
                var name = $dataSkills[i].message2
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.skill.message2[0] += `${i}:"${name}",\n`;
            }
            output.skill.message2[0] += "},\n"
        }

        //物品名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.item_name) {
            output.item.name = ["item_name : {\n", "9-物品名字"];
            for (var i = 1; i < $dataItems.length; i++) {
                var name = $dataItems[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.item.name[0] += `${i}:"${name}",\n`;
            }
            output.item.name[0] += "},\n"
        }

        //物品说明
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.item_description) {
            output.item.description = ["item_description : {\n", "10-物品说明"];
            for (var i = 1; i < $dataItems.length; i++) {
                var name = $dataItems[i].description
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.item.description[0] += `${i}:"${name}",\n`;
            }
            output.item.description[0] += "},\n"
        }

        //武器名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.weapon_name) {
            output.weapon.name = ["weapon_name : {\n", "11-武器名字"];
            for (var i = 1; i < $dataWeapons.length; i++) {
                var name = $dataWeapons[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.weapon.name[0] += `${i}:"${name}",\n`;
            }
            output.weapon.name[0] += "},\n"
        }

        //武器说明
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.weapon_description) {
            output.weapon.description = ["weapon_description : {\n", "12-武器说明"];
            for (var i = 1; i < $dataWeapons.length; i++) {
                var name = $dataWeapons[i].description
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.weapon.description[0] += `${i}:"${name}",\n`;
            }
            output.weapon.description[0] += "},\n"
        }

        //护甲名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.armors_name) {
            output.armors.name = ["armors_name : {\n", "13-护甲名字"];
            for (var i = 1; i < $dataArmors.length; i++) {
                var name = $dataArmors[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.armors.name[0] += `${i}:"${name}",\n`;
            }
            output.armors.name[0] += "},\n"
        }

        //护甲说明
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.armors_description) {
            output.armors.description = ["armors_description : {\n", "14-护甲说明"];
            for (var i = 1; i < $dataArmors.length; i++) {
                var name = $dataArmors[i].description
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.armors.description[0] += `${i}:"${name}",\n`;
            }
            output.armors.description[0] += "},\n"
        }

        //敌人名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.enemie_name) {
            output.enemie.name = ["enemie_name : {\n", "15-敌人名字"];
            for (var i = 1; i < $dataEnemies.length; i++) {
                var name = $dataEnemies[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.enemie.name[0] += `${i}:"${name}",\n`;
            }
            output.enemie.name[0] += "},\n"
        }

        //敌群名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.troop_name) {
            output.troop.name = ["troop_name : {\n", "16-敌群名字"];
            for (var i = 1; i < $dataTroops.length; i++) {
                var name = $dataTroops[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.troop.name[0] += `${i}:"${name}",\n`;
            }
            output.troop.name[0] += "},\n"
        }

        //状态名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.state_name) {
            output.state.name = ["state_name : {\n", "17-状态名字"];
            for (var i = 1; i < $dataStates.length; i++) {
                var name = $dataStates[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.state.name[0] += `${i}:"${name}",\n`;
            }
            output.state.name[0] += "},\n"
        }

        //状态信息1
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.state_message1) {
            output.state.message1 = ["state_message1 : {\n", "18-状态信息1"];
            for (var i = 1; i < $dataStates.length; i++) {
                var name = $dataStates[i].message1
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.state.message1[0] += `${i}:"${name}",\n`;
            }
            output.state.message1[0] += "},\n"
        }

        //状态信息2
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.state_message2) {
            output.state.message2 = ["state_message2 : {\n", "19-状态信息2"];
            for (var i = 1; i < $dataStates.length; i++) {
                var name = $dataStates[i].message2
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.state.message2[0] += `${i}:"${name}",\n`;
            }
            output.state.message2[0] += "},\n"
        }

        //状态信息3
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.state_message3) {
            output.state.message3 = ["state_message3 : {\n", "20-状态信息3"];
            for (var i = 1; i < $dataStates.length; i++) {
                var name = $dataStates[i].message3
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.state.message3[0] += `${i}:"${name}",\n`;
            }
            output.state.message3[0] += "},\n"
        }

        //状态信息4
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.state_message4) {
            output.state.message4 = ["state_message4 : {\n", "21-状态信息4"];
            for (var i = 1; i < $dataStates.length; i++) {
                var name = $dataStates[i].message4
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.state.message4[0] += `${i}:"${name}",\n`;
            }
            output.state.message4[0] += "},\n"
        }

        //动画名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.animation_name) {
            output.animation.name = ["animation_name : {\n", "22-动画名字"];
            for (var i = 1; i < $dataAnimations.length; i++) {
                var name = $dataAnimations[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.animation.name[0] += `${i}:"${name}",\n`;
            }
            output.animation.name[0] += "},\n"
        }

        //图块名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.Tileset_name) {
            output.Tileset.name = ["Tileset_name : {\n", "23-图块名字"];
            for (var i = 1; i < $dataTilesets.length; i++) {
                var name = $dataTilesets[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.Tileset.name[0] += `${i}:"${name}",\n`;
            }
            output.Tileset.name[0] += "},\n"
        }

        //公共事件名字
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.CommonEvent_name) {
            output.CommonEvent.name = ["CommonEvent_name : {\n", "24-公共事件名字"];
            for (var i = 1; i < $dataCommonEvents.length; i++) {
                var name = $dataCommonEvents[i].name
                    if (!name) {
                        continue
                    }
                    //转换原文的换行符
                    var name = name.replace(/\n/g, "\\n");
                output.CommonEvent.name[0] += `${i}:"${name}",\n`;
            }
            output.CommonEvent.name[0] += "},\n"
        }
		//公共事件对话
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.CommonEvent_TXT) {
            output.CommonEvent.TXT = ["CommonEvent_TXT : {\n", "24-公共事件对话"];
            for (var i = 1; i < $dataCommonEvents.length; i++) {
                var CommonEvent = $dataCommonEvents[i]
                    if (!CommonEvent) { continue }
					var id = CommonEvent.id
					var list = CommonEvent.list
					var CommonEvent_TXT = `${id}:{ \n`;
					var shu = 0
					for (var l = 0; l < list.length; l++) {
						var lis = list[l]
						var code = lis.code
						if (code != 401) {
							continue
						}
						var txt = lis.parameters[0]
						//转换原文的换行符
                        var txt = txt.replace(/\\/g, "\\\\");
						if (!txt) {
							continue
						}
						CommonEvent_TXT += `${l}:"${txt}",\n`;
						shu++
						
					}
                    CommonEvent_TXT += "},\n"
					if (shu > 0) {
						output.CommonEvent.TXT[0] += CommonEvent_TXT
					}
                
            }
            output.CommonEvent.TXT[0] += "},\n"
			//选项
			output.CommonEvent.TXT[0] += "CommonEvent_TXT_Choices : {\n";
			for (var i = 1; i < $dataCommonEvents.length; i++) {
                var CommonEvent = $dataCommonEvents[i]
                    if (!CommonEvent) { continue }
					var id = CommonEvent.id
					var list = CommonEvent.list
					var CommonEvent_TXT_Choices1 = `${id}:{ \n`;
					var shu1 = 0
					for (var l = 0; l < list.length; l++) {
						var lis = list[l]
						var code = lis.code
						if (code != 102) {
							continue
						}
						var txts = lis.parameters[0]
						var CommonEvent_TXT_Choices2 = `${l}:[`;
					    var shu2 = 0
						for (var t=0;t<txts.length;t++) {
							var txt = txts[t]
							//转换原文的换行符
							if (txt) {
								var txt = txt.replace(/\\/g, "\\\\");
								}
							CommonEvent_TXT_Choices2 += `"${txt}",`;
							shu2++
							
                            
						}
						CommonEvent_TXT_Choices2 += "],\n"
						if (shu2) {
							CommonEvent_TXT_Choices1 += CommonEvent_TXT_Choices2
							shu1++
						}
						
						
					}
					CommonEvent_TXT_Choices1 += "},\n"
					if (shu1) {
							output.CommonEvent.TXT[0] += CommonEvent_TXT_Choices1
						}
                
            }
            output.CommonEvent.TXT[0] += "},\n"
        }

        //游戏标题
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_gameTitle) {
            output.System.gameTitle = ["System_gameTitle : ", "25-游戏标题"];
            var name = $dataSystem.gameTitle
                output.System.gameTitle[0] += `"${name}",\n`;
				
        }

        //货币单位
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_currencyUnit) {
            output.System.currencyUnit = ["System_currencyUnit : ", "26-货币单位"];
            var name = $dataSystem.currencyUnit
                output.System.currencyUnit[0] += `"${name}",\n`;
        }

        //属性
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_elements) {
            output.System.elements = ["System_elements : [", "27-属性"];
            for (var i = 0; i < $dataSystem.elements.length; i++) {
                var name = $dataSystem.elements[i]
                    output.System.elements[0] += `"${name}",`;
            }
            output.System.elements[0] += "],\n"
        }

        //技能类型
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_skillTypes) {
            output.System.skillTypes = ["System_skillTypes : [", "28-技能类型"];
            for (var i = 0; i < $dataSystem.skillTypes.length; i++) {
                var name = $dataSystem.skillTypes[i]
                    output.System.skillTypes[0] += `"${name}",`;
            }
            output.System.skillTypes[0] += "],\n"
        }

        //武器类型
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_weaponTypes) {
            output.System.weaponTypes = ["System_weaponTypes : [", "29-武器类型"];
            for (var i = 0; i < $dataSystem.weaponTypes.length; i++) {
                var name = $dataSystem.weaponTypes[i]
                    output.System.weaponTypes[0] += `"${name}",`;
            }
            output.System.weaponTypes[0] += "],\n"
        }

        //护甲类型
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_armorTypes) {
            output.System.armorTypes = ["System_armorTypes : [", "30-护甲类型"];
            for (var i = 0; i < $dataSystem.armorTypes.length; i++) {
                var name = $dataSystem.armorTypes[i]
                    output.System.armorTypes[0] += `"${name}",`;
            }
            output.System.armorTypes[0] += "],\n"
        }

        //装备类型
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_equipTypes) {
            output.System.equipTypes = ["System_equipTypes : [", "31-装备类型"];
            for (var i = 0; i < $dataSystem.equipTypes.length; i++) {
                var name = $dataSystem.equipTypes[i]
                    output.System.equipTypes[0] += `"${name}",`;
            }
            output.System.equipTypes[0] += "],\n"
        }

        //用语-基本状态
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_basic) {
            output.System.basic = ["System_basic : [", "32-用语-基本状态"];
            for (var i = 0; i < $dataSystem.terms.basic.length; i++) {
                var name = $dataSystem.terms.basic[i]
                    output.System.basic[0] += `"${name}",`;
            }
            output.System.basic[0] += "],\n"
        }

        //用语-能力值
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_params) {
            output.System.params = ["System_params : [", "33-用语-能力值"];
            for (var i = 0; i < $dataSystem.terms.params.length; i++) {
                var name = $dataSystem.terms.params[i]
                    output.System.params[0] += `"${name}",`;
            }
            output.System.params[0] += "],\n"
        }

        //用语-指令
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_commands) {
            output.System.commands = ["System_commands : [", "34-用语-指令"];
            for (var i = 0; i < $dataSystem.terms.commands.length; i++) {
                var name = $dataSystem.terms.commands[i]
                    output.System.commands[0] += `"${name}",`;
            }
            output.System.commands[0] += "],\n"
        }

        //用语-信息
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_messages) {
            output.System.messages = ["System_messages : {\n", "35-用语-信息"];
            var keys = Object.keys($dataSystem.terms.messages)
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k]
                        var name = $dataSystem.terms.messages[key]
                        //转换原文的换行符
                        var name = name.replace(/\n/g, "\\n");
                    output.System.messages[0] += `${key}:"${name}",\n`;
                }
                output.System.messages[0] += "},\n"
        }

        //显示地图名称
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_map) {
            output.System.map = ["System_map : {\n", "36-显示地图名称"];
        }
        //事件对话
        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.Event_txt) {
            output.Event = ["Event_txt : {\n", "36-事件对话"];
        }

        var out = path.dirname(process.mainModule.filename);
    if (!fs.existsSync(out)) {
        fs.mkdirSync(out, {
            recursive: true
        });
    }
    var keys = Object.keys(output)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
                var mubiaos = output[key]
                var keys2 = Object.keys(mubiaos)
                for (var k = 0; k < keys2.length; k++) {
                    var key2 = keys2[k]
                        var mubiao = mubiaos[key2]
                        var outtxt = mubiao[0]
                        //内容集合
                        if (key2 != "map" && key != "Event" && outtxt) {
                            output_txt += outtxt
                        }

                }
				MAPOK = null
				EVENTOK = null
                if (key == "map") {
                    LINSHI_MAP_DATA = null;
                    var resultPromise = getMapDisplayNames();
                    // 使用 Promise.all() 函数将 Promise 对象转换为一个生成后处理返回的 Promise 对象 resultPromise
                    Promise.all([resultPromise]).then((result) => {
                        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.System_map) {
                            output.System.map[0] += result[0]
							
                                output.System.map[0] += "},\n"
                        }

                        if (output.System.map) {
                            output_txt += output.System.map[0]
                        }
						MAPOK = true
}).catch((error) => {
                        console.error(error);
                    });
					
					// 等待数据导出操作完成后再执行下面的代码
function continueProcess1() {
	  if (MAPOK) {
		  LINSHI_MAP_DATA = null;
                    var resultPromise = getMapevent_txts();
                    Promise.all([resultPromise]).then((result) => {
                        if (GONGCHENG_WENBEN_DAOCHU_XUANZE.Event_txt) {
                            output.Event[0] += result[0];
                            
                        }
                        if (output.Event) {
                            output_txt += output.Event[0]
                        }
						EVENTOK = true
                    }).catch((error) => {
                        console.error(error);
                    });
					
				function continueProcess2() {
					if (EVENTOK) {
						output_txt += "},\n"
                    var outputPath = out + "\\" + "数据导出.txt";

                    fs.writeFile(outputPath, output_txt, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log("角色名称已导出！2");
                        
                    });
					} else {
						setTimeout(continueProcess2, 1000);
					}
				}	
		  continueProcess2()
	  } else {
		  setTimeout(continueProcess1, 1000);
	  }
}
continueProcess1()
						
					
						
						
					

                    
                    
					
					
                    
                }

        }

}

DataManager.onLoad_getMapDisplayNames = function (object) {
    LINSHI_MAP_DATA = object;
};

async function getMapDisplayNames() {
    var displayName = ""
        for (var i = 0; i < $dataMapInfos.length; i++) {
            var mapInfo = $dataMapInfos[i];

            if (mapInfo) {
                var mapId = mapInfo.id;
                DataManager.loadMapData_getMapDisplayNames(mapId);
                //使用while 循环等待 mapData 加载完成
                while (!LINSHI_MAP_DATA) {

                    //等待100毫秒，继续检查
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                //地图的显示名称
                var name = LINSHI_MAP_DATA.displayName;
                if (name) {
                    displayName += `${mapId}:"${name}",\n`;
                }
                //清空 LINSHI_MAP_DATA 的数据，以便下一次使用
                LINSHI_MAP_DATA = null;
            }
        }
        var output = displayName
        return output
}
async function getMapevent_txts() {
    var event_txt = ""
    var event_txt_Choices = "event_txt_Choices : {\n";
        for (var i = 0; i < $dataMapInfos.length; i++) {
            var mapInfo = $dataMapInfos[i];

            if (mapInfo) {
                var mapId = mapInfo.id;
                DataManager.loadMapData_getMapDisplayNames(mapId);
                //使用while 循环等待 mapData 加载完成
                while (!LINSHI_MAP_DATA) {

                    //等待100毫秒，继续检查
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                //地图的事件对话
                var events = LINSHI_MAP_DATA.events
                    //event_txt += `${mapId}:{ \n`;
                    //event_txt_Choices += `${mapId}:{ \n`;
					var event_txt_1 = `${mapId}:{ \n`;
					var event_txt_Choices_1 = `${mapId}:{ \n`;
					var shu1 = 0
					var shu_Choices1 = 0
                for (var e = 1; e < events.length; e++) {
                    var event = events[e]
                        if (!event) {
                            continue
                        }
                        var event_id = event.id
                        var pages = event.pages
                        //event_txt += `${event_id}:{ \n`;
                        //event_txt_Choices += `${event_id}:{ \n`;
						var event_txt_2 = `${event_id}:{ \n`;
					var event_txt_Choices_2 = `${event_id}:{ \n`;
					var shu2 = 0
					var shu_Choices2 = 0
                    for (var p = 0; p < pages.length; p++) {
                        var page = pages[p]
                            if (!page) {
                                continue
                            }
                            var list = page.list
                            //event_txt += `${p}:{ \n`;
                            //event_txt_Choices += `${p}:{ \n`;
							var event_txt_3 = `${p}:{ \n`;
					var event_txt_Choices_3 = `${p}:{ \n`;
					var shu3 = 0
					var shu_Choices3 = 0
                        for (var l = 0; l < list.length; l++) {
                            var lis = list[l]
                                if (!lis) {
                                    continue
                                }
                                var code = lis.code
                                if (code === 401) {
                                    var txt = lis.parameters[0]
									if (txt) {
										//转换原文的换行符
                                    var txt = txt.replace(/\\/g, "\\\\");
                                            event_txt_3 += `${l}:"${txt}",\n`;
											shu3++
											
                                    
                                }
								}	
								if (code === 102) {
                                    var txts = lis.parameters[0]
									var event_txt_Choices_4 = `${l}:[`;
									var shu_Choices4 = 0
						for (var t=0;t<txts.length;t++) {
							var txt = txts[t]
							//转换原文的换行符
							if (txt) {
								var txt = txt.replace(/\\/g, "\\\\");
								}
								event_txt_Choices_4 += `"${txt}",`;
								shu_Choices4++
								
						}
						event_txt_Choices_4 += "],\n"
                               if (shu_Choices4) {
							event_txt_Choices_3 += event_txt_Choices_4
							shu_Choices3++
						}     
								}	
                                
                        }
                        event_txt_3 += "},\n"
                        event_txt_Choices_3 += "},\n"
						if (shu3) {
							event_txt_2 += event_txt_3
							shu2++
						}
						if (shu_Choices3) {
							event_txt_Choices_2 += event_txt_Choices_3
							shu_Choices2++
						}
                    }
                    event_txt_2 += "},\n"
                    event_txt_Choices_2 += "},\n"
					if (shu2) {
							event_txt_1 += event_txt_2
							shu1++
						}
						if (shu_Choices2) {
							event_txt_Choices_1 += event_txt_Choices_2
							shu_Choices1++
						}
                }
                event_txt_1 += "},\n"
                event_txt_Choices_1 += "},\n"
				if (shu1) {
							event_txt += event_txt_1
						}
						if (shu_Choices1) {
							event_txt_Choices += event_txt_Choices_1
						}
                //清空 LINSHI_MAP_DATA 的数据，以便下一次使用
                LINSHI_MAP_DATA = null;
            }
        }
		event_txt += "},\n"
		event_txt_Choices += "},\n"
		event_txt += event_txt_Choices
		//事件选项
		
        var output = event_txt
        return output
}

DataManager.loadMapData_getMapDisplayNames = function (mapId) {
    if (mapId > 0) {
        var filename = 'Map%1.json'.format(mapId.padZero(3));
        this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile_getMapDisplayNames.bind(this, '$dataMap', filename));
        this.loadDataFile_getMapDisplayNames('$dataMap', filename);
    } else {
        this.makeEmptyMap();
    }
};

DataManager.loadDataFile_getMapDisplayNames = function (name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function () {
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            DataManager.onLoad_getMapDisplayNames(window[name]);
        }
    };
    xhr.onerror = this._mapLoader || function () {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    window[name] = null;
    xhr.send();

};




