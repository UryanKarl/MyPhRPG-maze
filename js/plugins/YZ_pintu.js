
//
/*:
 * @plugindesc 拼图系统.
 * @author 杨志（yang1zhi）落泪
 * @help  yangzhi40#hotmail.com
 * 拼图系统
 *
 * $gameParty.PinTu_START(0,2)
 * 在事件的脚本里输入这条代码，打开拼图界面
 * （拼图图片的号码，拼图的分割数）
 * 使用前需要先在IMG文件夹里新建一个文件夹，pintu
 * 把图片以606X606的大小放入这个文件夹里
 * 图片名字以"pintu_0,pintu_1,"这样的格式命名，后面的数字就是前面代码用到的ID号码
 * 还需要一张底图，命名"pintu_di"
 * 
 * 拼图胜利后会打开，拼图胜利开关ID
 *
 * 版本：1.0
 * yangzhi40@hotmail.com
 *
 * @param 拼图胜利开关ID
 * @desc 拼图胜利开关ID
 * 默认: 14
 * @default 14
 *
 * @param 胜利播放动画ID
 * @desc 胜利播放动画ID
 * 默认: 62
 * @default 62
 *
 */
 
var Liquidize = Liquidize || {};
Liquidize.YZ_pintu = {};
Liquidize.YZ_pintu.Parameters = PluginManager.parameters('YZ_pintu');
 //拼图胜利开关ID
Liquidize.YZ_pintu.win_switche_id = Number(Liquidize.YZ_pintu.Parameters["拼图胜利开关ID"]) || 14;
 //胜利播放动画ID
Liquidize.YZ_pintu.win_animation_id = Number(Liquidize.YZ_pintu.Parameters["胜利播放动画ID"]) || 62;

Game_Party.prototype.PinTu_START = function(id,shu) {
    var name = 'pintu_' + id
    SceneManager.push(Scene_pintu);
    SceneManager.prepareNextScene(name, shu);
}

function Scene_pintu() {
    this.initialize.apply(this, arguments);
}

Scene_pintu.prototype = Object.create(Scene_Base.prototype);
Scene_pintu.prototype.constructor = Scene_pintu;

Scene_pintu.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	$gameSwitches.setValue(Liquidize.YZ_pintu.win_switche_id, false);
};

Scene_pintu.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	//计算初始值
	this.jisuan_chushizhi()
	//建立窗口
    this.createWindow();
	//建立正确精灵
	this.createZhengQueSP();
	//建立选框精灵
	this.createXuanKuangSP();	
};

Scene_pintu.prototype.prepare = function(name, ge) {
	this._pintu_name = name
	this._yipai_jige = ge
};

//计算初始值
Scene_pintu.prototype.jisuan_chushizhi = function() {
	//得出拼图总数
	this._pintu_zongshu = this._yipai_jige * this._yipai_jige
	//所有拼图ID随机排列
	this._pintu_ids = []
	var ids = []
	for (var i=0;i<this._pintu_zongshu;i++) {
		ids.push(i)
	}
	while (ids.length > 0) {
		var weizhi = Math.randomInt(ids.length)
		var i = ids[weizhi]
		ids.splice(weizhi,1)
		this._pintu_ids.push(i)
	}
}

Scene_pintu.prototype.update = function() {
    Scene_Base.prototype.update.call(this);	
	//胜利
	if (SceneManager._scene._shengli) {
		SceneManager._scene._shengli -= 1
		if (SceneManager._scene._shengli <= 0) {
			this.popScene()
			return
		}
	}
};


Scene_pintu.prototype.createWindow = function() {
	//建立底盘窗口
    this._dipanWindow = new Window_dipan();
    this.addChild(this._dipanWindow);
};

//建立正确精灵
Scene_pintu.prototype.createZhengQueSP = function() {
	this._zhengque_jingling_s = []
	var xunhuan = SceneManager._scene._yipai_jige - 1
	var jj = (this._dipanWindow.height - 36) / (xunhuan + 1) / 2
	var x = jj + 18
	var y = jj + 18
	var ii = 1
	for (var i=0;i<this._pintu_zongshu;i++) {
		var SP = new Sprite_ZhengQue(i,x,y);
        this.addChild(SP);
		this._zhengque_jingling_s.push(SP)
		x += jj * 2
		if (ii >= this._yipai_jige) {
			var ii = 1
			var x = jj + 18
			y += jj * 2
		} else {
			ii += 1
		}
		
	}
    
};

//建立选框精灵
Scene_pintu.prototype.createXuanKuangSP = function() {
	
	this._xuankuang_jingling_s = []
	var x = this._dipanWindow.height + (this._dipanWindow.height / 3 / 2)
	var yy = this._dipanWindow.height / this._yipai_jige / 2
	var y = this._dipanWindow.height / this._yipai_jige / 2
	for (var i=0;i<this._yipai_jige;i++) {
		var id = this._pintu_ids[0]
		this._pintu_ids.splice(0,1)
		var SP = new Sprite_XuanKuang(id,x,y);
        this.addChild(SP);
		this._xuankuang_jingling_s.push(SP)
		y += yy * 2
	}
    
};




//底盘窗口-------------------------------------------------------------------------
function Window_dipan() {
    this.initialize.apply(this, arguments);
}

Window_dipan.prototype = Object.create(Window_Base.prototype);
Window_dipan.prototype.constructor = Window_dipan;

Window_dipan.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 610, 610);
	this.refresh()
};

Window_dipan.prototype.refresh = function() {
    this.contents.clear();
	//坐标X，坐标Y，填充X，填充Y
	var xunhuan = SceneManager._scene._yipai_jige - 1
	var juli = (this.width - 36) / (xunhuan + 1)
	var x = juli - 1
	for (var i=0;i<xunhuan;i++) {
		this.contents.fillRect(x, 0, 2, this.height, this.normalColor());
		x += juli
	}
	var y = juli - 1
	for (var i=0;i<xunhuan;i++) {
	    this.contents.fillRect(0, y, this.width, 2, this.normalColor());
		y += juli
	}
	
	
};

ImageManager.loadPinTu = function(filename, hue) {
    return this.loadBitmap('img/pintu/', filename, hue, true);
};



//选框精灵--------------------------------------------------------------------------------------------------
function Sprite_XuanKuang() {
    this.initialize.apply(this, arguments);
}

Sprite_XuanKuang.prototype = Object.create(Sprite_Base.prototype);
Sprite_XuanKuang.prototype.constructor = Sprite_XuanKuang;

Sprite_XuanKuang.prototype.initialize = function(id,x,y) {
    Sprite_Base.prototype.initialize.call(this);
	this._pintu_name = SceneManager._scene._pintu_name
	this.move(x,y)
	this._ox = x
	this._oy = y
	this.shuaxin(id)
	this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

//刷新
Sprite_XuanKuang.prototype.shuaxin = function(id,no_suo) {
	//拼图ID
	this._pintu_id = id
	var xunhuan = SceneManager._scene._yipai_jige - 1
	var juli = (SceneManager._scene._dipanWindow.height - 36) / (xunhuan + 1)
	this.bitmap = ImageManager.loadPinTu(this._pintu_name);
	//解决图片不用预读问题
    this.bitmap.addLoadListener(function() {
    var tu_juli = this.bitmap.width / (xunhuan + 1)
	//坐标X，坐标Y，图片宽，图片高，取值X，取值Y
	var chushu = Math.floor(this._pintu_id / SceneManager._scene._yipai_jige)
	var x = (this._pintu_id % SceneManager._scene._yipai_jige) * tu_juli
	var y = chushu * tu_juli
    this.setFrame(x, y, tu_juli, tu_juli);
	//缩放大小
	if (!no_suo) {
	var ww = tu_juli;
	var hh = tu_juli;
	var zx = juli / ww
	var zy = juli / hh
	if (zx > zy) {
		var suo = zy
	} else {var suo = zx}
	this.scale.x = suo
	this.scale.y = suo
	}
    }.bind(this));
	//适当旋转
	var zhuan = Math.randomInt(4)
	this.rotation = this.rotation_shuaxin(zhuan)
}

//刷新旋转
Sprite_XuanKuang.prototype.rotation_shuaxin = function(fx) {
	this._fangxiang = fx
	if (this._fangxiang === 0) {
		var end = {x:this.x + 1, y:this.y - 1}
	} else if (this._fangxiang === 1) {
		var end = {x:this.x + 1, y:this.y + 1}
	} else if (this._fangxiang === 2) {
		var end = {x:this.x - 1, y:this.y + 1}
	} else if (this._fangxiang === 3) {
		var end = {x:this.x - 1 , y:this.y - 1}
		}
	var start = {x:this.x , y:this.y}
    var jiaodu = getAngle(start.x, start.y ,end.x, end.y)
    jiaodu -= 135
    if (jiaodu <= 0) {jiaodu += 360}
    var rotation = Math.PI * jiaodu / 180; 
	return rotation
}

//交换拼图
Sprite_XuanKuang.prototype.jiaohuan_pintu = function(sp1, sp2) {
	var pintu_name = sp1._pintu_name
	var pintu_id = sp1._pintu_id
	var fangxiang = sp1._fangxiang
	sp1.shuaxin(sp2._pintu_name, sp2._pintu_id, sp2._fangxiang)
	
	var bei_id = sp2._pintu_id
	sp2.shuaxin(pintu_id, true)
	sp2.rotation = sp2.rotation_shuaxin(fangxiang)
}

//放入格子--判断
Sprite_XuanKuang.prototype.fangru_gezi_panduan = function() {
	for (var i=0;i<SceneManager._scene._zhengque_jingling_s.length;i++) {
		var jingling = SceneManager._scene._zhengque_jingling_s[i]
		if (jingling.containsPoint({x: this.x, y: this.y})) {
			//这里已经有拼图了
			if (jingling._pintu_ok) {
				this.jiaohuan_pintu(jingling, this)
			} else {
				jingling.fangru_pintu(this)
			    var time = 20
			    var scale_jiange = this.scale.x / time
			    this._huijia = [time,time,scale_jiange]
				
			}
			//判断胜利
			if (SceneManager._scene.panduan_shengli()) {
				var x = SceneManager._scene._dipanWindow.width / 2
				var y = SceneManager._scene._dipanWindow.height / 2
				//胜利动画
				SceneManager._scene.shengli_animaton()
				SceneManager._scene._shengli = 120
				$gameSwitches.setValue(Liquidize.YZ_pintu.win_switche_id, true);
				var dui = true
				break
			}
		}
		
	}
	if (!dui) {
		this.move(this._ox,this._oy)
		delete SceneManager._scene._tuodong_ing
	}
}

//胜利动画
Scene_pintu.prototype.shengli_animaton = function() {
	var sp = new Sprite_Base();
	SceneManager._scene.addChild(sp)
	//设动画坐标
	sp.move(Graphics.boxWidth/2,Graphics.boxHeight/2);
	//设动画ID
	var animation = $dataAnimations[Liquidize.YZ_pintu.win_animation_id];
	//开始动画
	sp.startAnimation(animation, false, 0);
}

//判断胜利
Scene_pintu.prototype.panduan_shengli = function() {
	for (var i=0;i<SceneManager._scene._zhengque_jingling_s.length;i++) {
		var jingling = SceneManager._scene._zhengque_jingling_s[i]
		if (jingling._pintu_ok && jingling._id === jingling._pintu_id && jingling._fangxiang === 0) {} else {
			return false
		}
		
	}
	return true
}

Sprite_XuanKuang.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	//回家检测
	if (this._huijia) {
		if (this._huijia[0]) {
			this._huijia[0] -= 1
			this.scale.x -= this._huijia[2]
			this.scale.y -= this._huijia[2]
			if (this._huijia[0] === 0) {
				this.move(this._ox,this._oy)
			}
		} else if (this._huijia[1]) {
			if (this._huijia[1] === 20) {
				var id = SceneManager._scene._pintu_ids[0]
				SceneManager._scene._pintu_ids.splice(0,1)
				this.shuaxin(id,true)
			}
			this._huijia[1] -= 1
			this.scale.x += this._huijia[2]
			this.scale.y += this._huijia[2]
			
		} else {
			delete this._huijia
			delete SceneManager._scene._tuodong_ing
		}
		return
	}
	//胜利
	if (SceneManager._scene._shengli) {
		return
	}
	//填补
	if (SceneManager._scene._pintu_ids.length && this._pintu_id !== 0 && !this._pintu_id) {
		var id = SceneManager._scene._pintu_ids[0]
		SceneManager._scene._pintu_ids.splice(0,1)
		this.shuaxin(id,true)
	}
	//左键拖动检测
	if (TouchInput.isPressed() && (SceneManager._scene._tuodong_ing === this || !SceneManager._scene._tuodong_ing) && !this._zhuandong_ing && (this._isPressed_time <= 0 ||  this.containsPoint({x: TouchInput.x, y: TouchInput.y}))) {
		this._isPressed_time -= 1
		if (this._isPressed_time < 0) {
			this._isPressed_time = 0
			if (!SceneManager._scene._tuodong_ing) {
				var scene = this.parent
				this.parent.removeChild(this)
				scene.addChild(this)
			}
			SceneManager._scene._tuodong_ing = this
			this.x = TouchInput.x
		    this.y = TouchInput.y
			return
		}
		
	} else {
		if (this._isPressed_time !== 8 && this._isPressed_time > 0 && this.containsPoint({x: TouchInput.x, y: TouchInput.y})) {
			//播放音效
		    SoundManager.playOk();
		    this._zhuandong_ing = true
		    this._fangxiang += 1
		    if (this._fangxiang > 3) {this._fangxiang = 0}
			this._isPressed_time = 8
		} else if (this._isPressed_time !== 8) {
			this._isPressed_time = 8
			this.fangru_gezi_panduan()
		}
		
	}
	
	//按住左键时图片跟着移动，松开后判断鼠标位置在底盘格子内
	//放入对应格子
	//本精灵缩小回到原位置，刷新
	//对应格子出现放置的精灵
	//旋转刷新
	if (this._zhuandong_ing) {
		this.rotation += 0.1
		if ((this._fangxiang === 0 && this.rotation > 6.2) || 
		(this._fangxiang === 1 && this.rotation > 1.5) || 
		(this._fangxiang === 2 && this.rotation > 3.1) || 
		(this._fangxiang === 3 && this.rotation > 4.7)) {
			this.rotation = this.rotation_shuaxin(this._fangxiang)
			if (this._fangxiang === 0) {this.rotation = 0}
			this._zhuandong_ing = false
		} 
	}
};




//正确精灵--------------------------------------------------------------------------------------------------
function Sprite_ZhengQue() {
    this.initialize.apply(this, arguments);
}

Sprite_ZhengQue.prototype = Object.create(Sprite_Base.prototype);
Sprite_ZhengQue.prototype.constructor = Sprite_ZhengQue;

Sprite_ZhengQue.prototype.initialize = function(id,x,y) {
    Sprite_Base.prototype.initialize.call(this);
	this._id = id
	this._pintu_di_name = 'pintu_di'
	this.move(x,y)
	this._ox = x
	this._oy = y
	this.shuaxin(this._pintu_di_name)
	this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

//刷新
Sprite_ZhengQue.prototype.shuaxin = function(name,pintu_id,fangxiang) {
	this._pintu_name = name
	//拼图ID
	this._pintu_id = pintu_id ? pintu_id : 0
	var xunhuan = SceneManager._scene._yipai_jige - 1
	var juli = (SceneManager._scene._dipanWindow.height - 36) / (xunhuan + 1)
	this.bitmap = ImageManager.loadPinTu(name);
	//解决图片不用预读问题
    this.bitmap.addLoadListener(function() {
    var tu_juli = this.bitmap.width / (xunhuan + 1)
	//坐标X，坐标Y，图片宽，图片高，取值X，取值Y
	var chushu = Math.floor(this._pintu_id / SceneManager._scene._yipai_jige)
	var x = (this._pintu_id % SceneManager._scene._yipai_jige) * tu_juli
	var y = chushu * tu_juli
    this.setFrame(x, y, tu_juli, tu_juli);
	//缩放大小
	var ww = tu_juli;
	var hh = tu_juli;
	var zx = juli / ww
	var zy = juli / hh
	if (zx > zy) {
		var suo = zy
	} else {var suo = zx}
	this.scale.x = suo
	this.scale.y = suo
    }.bind(this));
	//适当旋转
	if (fangxiang) {
		this.rotation_shuaxin(fangxiang)
	} else {
		this.rotation_shuaxin(0)
	}
}


//放入拼图
Sprite_ZhengQue.prototype.fangru_pintu = function(pintu_sp) {
    this.shuaxin(pintu_sp._pintu_name,pintu_sp._pintu_id,pintu_sp._fangxiang)
    this._pintu_ok = true	
}


//刷新旋转
Sprite_ZhengQue.prototype.rotation_shuaxin = function(fx) {
	this._fangxiang = fx
	if (this._fangxiang === 0) {
		var end = {x:this.x + 1, y:this.y - 1}
	} else if (this._fangxiang === 1) {
		var end = {x:this.x + 1, y:this.y + 1}
	} else if (this._fangxiang === 2) {
		var end = {x:this.x - 1, y:this.y + 1}
	} else if (this._fangxiang === 3) {
		var end = {x:this.x - 1 , y:this.y - 1}
		}
	var start = {x:this.x , y:this.y}
    var jiaodu = getAngle(start.x, start.y ,end.x, end.y)
    jiaodu -= 135
    if (jiaodu <= 0) {jiaodu += 360}
    this.rotation = Math.PI * jiaodu / 180; 
}

Sprite_ZhengQue.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	//胜利
	if (SceneManager._scene._shengli) {
		return
	}
    //左键检测
	if (this._pintu_ok && TouchInput.isPressed() && (SceneManager._scene._tuodong_ing === this || !SceneManager._scene._tuodong_ing) && !this._zhuandong_ing && (this._isPressed_time <= 0 ||  this.containsPoint({x: TouchInput.x, y: TouchInput.y}))) {
	    this._isPressed_time -= 1
		if (this._isPressed_time < 0) {
			this._isPressed_time = 0
			if (!SceneManager._scene._tuodong_ing) {
				var scene = this.parent
				this.parent.removeChild(this)
				scene.addChild(this)
			}
			SceneManager._scene._tuodong_ing = this
			this.x = TouchInput.x
		    this.y = TouchInput.y
			return
		}
	} else {
		if (this._isPressed_time !== 8 && this._isPressed_time > 0 && this.containsPoint({x: TouchInput.x, y: TouchInput.y})) {
			//播放音效
		    SoundManager.playOk();
		    this._zhuandong_ing = true
		    this._fangxiang += 1
		    if (this._fangxiang > 3) {this._fangxiang = 0}
            this._isPressed_time = 8
		} else if (this._isPressed_time !== 8) {
			this._isPressed_time = 8
			if (SceneManager._scene._tuodong_ing === this) {this.fangru_gezi_panduan()}
			
		}
	}

	//旋转刷新
	if (this._zhuandong_ing) {
		this.rotation += 0.1
		if ((this._fangxiang === 0 && this.rotation > 6.2) || 
		(this._fangxiang === 1 && this.rotation > 1.5) || 
		(this._fangxiang === 2 && this.rotation > 3.1) || 
		(this._fangxiang === 3 && this.rotation > 4.7)) {
		this.rotation_shuaxin(this._fangxiang)
			if (this._fangxiang === 0) {this.rotation = 0}
			this._zhuandong_ing = false
			//判断胜利
			if (SceneManager._scene.panduan_shengli()) {
				var x = SceneManager._scene._dipanWindow.width / 2
				var y = SceneManager._scene._dipanWindow.height / 2
				//胜利动画
				SceneManager._scene.shengli_animaton()
				SceneManager._scene._shengli = 120
				$gameSwitches.setValue(Liquidize.YZ_pintu.win_switche_id, true);
			}
		} 
	}
};

//放入格子--判断
Sprite_ZhengQue.prototype.fangru_gezi_panduan = function() {
	for (var i=0;i<SceneManager._scene._zhengque_jingling_s.length;i++) {
		var jingling = SceneManager._scene._zhengque_jingling_s[i]
		if (jingling.containsPoint({x: this.x, y: this.y})) {
			this.jiaohuan_pintu(jingling, this)
			//判断胜利
			if (SceneManager._scene.panduan_shengli()) {
				var x = SceneManager._scene._dipanWindow.width / 2
				var y = SceneManager._scene._dipanWindow.height / 2
				//胜利动画
				SceneManager._scene.shengli_animaton()
				SceneManager._scene._shengli = 120
				$gameSwitches.setValue(Liquidize.YZ_pintu.win_switche_id, true);
				var dui = true
				break
			}
		}
		
	}
	if (!dui) {
		this.move(this._ox,this._oy)
		delete SceneManager._scene._tuodong_ing
	}
}

//交换拼图
Sprite_ZhengQue.prototype.jiaohuan_pintu = function(sp1, sp2) {
	var pintu_name = sp1._pintu_name
	var pintu_id = sp1._pintu_id
	var fangxiang = sp1._fangxiang
	var pintu_ok = sp1._pintu_ok
	sp1.shuaxin(sp2._pintu_name, sp2._pintu_id, sp2._fangxiang)
	sp1._pintu_ok = sp2._pintu_ok
	sp2.shuaxin(pintu_name, pintu_id, fangxiang)
	sp2._pintu_ok = pintu_ok
}


function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px-mx);
        var y = Math.abs(py-my);
        var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var cos = y/z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if(mx>px&&my>py){//鼠标在第四象限
            angle = 180 - angle;
        }

        if(mx==px&&my>py){//鼠标在y轴负方向上
            angle = 180;
        }

        if(mx>px&&my==py){//鼠标在x轴正方向上
            angle = 90;
        }

        if(mx<px&&my>py){//鼠标在第三象限
            angle = 180+angle;
        }

        if(mx<px&&my==py){//鼠标在x轴负方向
            angle = 270;
        }

        if(mx<px&&my<py){//鼠标在第二象限
            angle = 360 - angle;
        }
        angle += 90

            return angle;
    }
	
	

