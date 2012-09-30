
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Animation
OurSonic.Animation = function() {
	this.animationFile = 0;
	this.numberOfTiles = 0;
	this.lastAnimatedIndex = 0;
	this.lastAnimatedFrame = null;
	this.animationTileIndex = 0;
	this.frames = null;
	this.automatedTiming = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.AnimationFrame
OurSonic.AnimationFrame = function() {
	this.ticks = 0;
	this.startingTileIndex = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.AnimationInstance
OurSonic.AnimationInstance = function() {
};
OurSonic.AnimationInstance.prototype = {
	tick: function() {
	},
	draw: function(canvas, i, i1, scale) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.CanvasInformation
OurSonic.CanvasInformation = function(context, domCanvas) {
	this.context = null;
	this.domCanvas = null;
	this.canvas = null;
	this.context = context;
	this.domCanvas = domCanvas;
	this.canvas = domCanvas[0];
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.ClickState
OurSonic.ClickState = function() {
};
OurSonic.ClickState.prototype = { dragging: 0, placeChunk: 1, placeRing: 2, placeObject: 3 };
OurSonic.ClickState.registerEnum('OurSonic.ClickState', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Color
OurSonic.Color = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Constants
OurSonic.Constants = function() {
};
OurSonic.Constants.defaultWindowLocation = function(state, canvas, scale) {
	switch (state) {
		case 0: {
			return new OurSonic.IntersectingRectangle(0, 0, 320, 224);
		}
		case 1: {
			var x = 0;
			var y = 0;
			if (OurSonic.SonicManager.instance.sonicLevel && OurSonic.SonicManager.instance.sonicLevel.startPositions && OurSonic.SonicManager.instance.sonicLevel.startPositions[0]) {
				x = OurSonic.SonicManager.instance.sonicLevel.startPositions[0].x - 128 * scale.x;
				y = OurSonic.SonicManager.instance.sonicLevel.startPositions[0].y - 128 * scale.y;
			}
			return new OurSonic.IntersectingRectangle(x, y, canvas.domCanvas.width(), canvas.domCanvas.height());
		}
	}
	return null;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Dragger
OurSonic.Dragger = function(onFling) {
	this.$myOnFling = null;
	this.$lag = 0.925000011920929;
	this.$lastPos = null;
	this.$xsp = 0;
	this.$ysp = 0;
	this.$myOnFling = onFling;
};
OurSonic.Dragger.prototype = {
	click: function(e) {
		this.$lastPos = OurSonic.Point.$ctor1(e.clientX, e.clientY);
	},
	isDragging: function(e) {
		return this.$lastPos;
	},
	mouseUp: function(e) {
		this.$lastPos = null;
	},
	mouseMove: function(e) {
		if (!this.$lastPos) {
			return;
		}
		this.$xsp += (this.$lastPos.x - e.clientX) * 2.70000004768372;
		this.$ysp += (this.$lastPos.y - e.clientY) * 2.70000004768372;
		this.$xsp = ((this.$xsp > 0) ? 1 : -1) * Math.min(Math.abs(this.$xsp), 60);
		this.$ysp = ((this.$ysp > 0) ? 1 : -1) * Math.min(Math.abs(this.$ysp), 60);
		this.$lastPos = OurSonic.Point.$ctor1(e.clientX, e.clientY);
	},
	tick: function() {
		this.$myOnFling(this.$xsp, this.$ysp);
		if (this.$xsp > 0) {
			this.$xsp *= this.$lag;
		}
		else {
			this.$xsp *= this.$lag;
		}
		if (this.$ysp > 0) {
			this.$ysp *= this.$lag;
		}
		else {
			this.$ysp *= this.$lag;
		}
		if (Math.abs(this.$xsp) <= 2) {
			this.$xsp = 0;
		}
		if (Math.abs(this.$ysp) <= 2) {
			this.$ysp = 0;
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Extensions
OurSonic.Extensions = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.GameState
OurSonic.GameState = function() {
};
OurSonic.GameState.prototype = { playing: 0, editing: 1 };
OurSonic.GameState.registerEnum('OurSonic.GameState', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.HeightMask
OurSonic.HeightMask = function(heightMap, i) {
	this.width = 0;
	this.height = 0;
	this.items = null;
	this.integer = 0;
	this.index = 0;
	this.items = heightMap;
	this.width = 16;
	this.height = 16;
	this.integer = -1000;
	this.index = i;
};
OurSonic.HeightMask.prototype = {
	setItem: function(x, y, rotationMode) {
		var jx = 0;
		var jy = 0;
		switch (rotationMode) {
			case 134: {
				jx = x;
				jy = y;
				break;
			}
			case 44: {
				jx = y;
				jy = 15 - x;
				break;
			}
			case 314: {
				jx = x;
				jy = 15 - y;
				break;
			}
			case 224: {
				jx = y;
				jy = x;
				break;
			}
		}
		this.items[jx] = 16 - jy;
	},
	draw: function(canvas, pos, scale, state, xflip, yflip, solid, angle) {
		canvas.save();
		var oPos = OurSonic.Point.$ctor(pos);
		if (xflip) {
			pos.x = -pos.x - 16 * scale.x;
			canvas.scale(-1, 1);
		}
		if (yflip) {
			pos.y = -pos.y - 16 * scale.y;
			canvas.scale(1, -1);
		}
		var fd = OurSonic.SonicManager.instance.spriteCache.heightMaps[this.index + (solid << 20)];
		if (this.index !== -1 && fd) {
			canvas.drawImage(fd.canvas, pos.x, pos.y);
		}
		else {
			var ntcanvas = OurSonic.Help.defaultCanvas(16 * scale.x, 16 * scale.y);
			var ncanvas = ntcanvas.context;
			if (solid > 0) {
				for (var x = 0; x < 16; x++) {
					for (var y = 0; y < 16; y++) {
						var jx = 0;
						var jy = 0;
						if (OurSonic.HeightMask.itemsGood(this.items, x, y)) {
							jx = x;
							jy = y;
							var _x = jx * scale.x;
							var _y = jy * scale.y;
							ncanvas.lineWidth = 1;
							ncanvas.fillStyle = OurSonic.HeightMask.colors[solid];
							ncanvas.fillRect(_x, _y, scale.x, scale.y);
							if (angle !== 255) {
								ncanvas.beginPath();
								ncanvas.lineWidth = 3;
								ncanvas.strokeStyle = 'rgba(163,241,255,0.8)';
								ncanvas.moveTo(ss.Int32.div(scale.x * 16, 2), ss.Int32.div(scale.y * 16, 2));
								ncanvas.lineTo(ss.Int32.div(scale.x * 16, 2) - OurSonic.Help.sin(angle) * scale.x * 8, ss.Int32.div(scale.y * 16, 2) - OurSonic.Help.cos(angle) * scale.x * 8);
								ncanvas.stroke();
								ncanvas.beginPath();
								ncanvas.fillStyle = 'rgba(163,241,255,0.8)';
								ncanvas.arc(ss.Int32.div(scale.x * 16, 2) - OurSonic.Help.sin(angle) * scale.x * 8, ss.Int32.div(scale.y * 16, 2) - OurSonic.Help.cos(angle) * scale.x * 8, 5, 0, 2 * Math.PI, true);
								ncanvas.fill();
							}
							//
							//                                canvas.LineWidth = 1;
							//
							//                                canvas.StrokeStyle = "#000000";
							//
							//                                canvas.StrokeRect(pos.X, pos.Y, scale.X * 16, scale.Y * 16);
						}
					}
				}
			}
			OurSonic.SonicManager.instance.spriteCache.heightMaps[this.index + (solid << 20)] = ntcanvas;
			canvas.drawImage(ntcanvas.canvas, pos.x, pos.y);
		}
		canvas.restore();
		pos.x = oPos.x;
		pos.y = oPos.y;
	}
};
OurSonic.HeightMask.op_Implicit$1 = function(d) {
	var m = ((d === 0) ? 0 : 16);
	return new OurSonic.HeightMask([m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m], -1);
	//16 m's
};
OurSonic.HeightMask.op_Implicit = function(d) {
	if (d.integer !== -1000) {
		return d.integer;
	}
	var good = d.items[0];
	for (var i = 0; i < d.items.length; i++) {
		if (d.items[i] !== good) {
			good = -999;
			break;
		}
	}
	d.integer = good;
	return good;
};
OurSonic.HeightMask.itemsGood = function(items, x, y) {
	if (items[x] < 0) {
		return Math.abs(items[x]) >= y;
	}
	return items[x] >= 16 - y;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Help
OurSonic.Help = function() {
};
OurSonic.Help.toPx = function(number) {
	return number + 'px';
};
OurSonic.Help.sin = function(f) {
	return OurSonic.Help.cos_table[f + 64 & 255];
};
OurSonic.Help.cos = function(f) {
	return OurSonic.Help.cos_table[f & 255];
};
OurSonic.Help.mod = function(j, n) {
	return (j % n + n) % n;
};
OurSonic.Help.scaleSprite = function(image, scale, complete) {
	var data = OurSonic.Help.getImageData(image);
	var colors = new Array(ss.Int32.div(data.length, 4));
	for (var f = 0; f < data.length; f += 4) {
		colors[ss.Int32.div(f, 4)] = OurSonic.Help.$colorObjectFromData(data, f);
	}
	var d = OurSonic.Help.defaultCanvas(0, 0).context.createImageData(image.width * scale.x, image.height * scale.y);
	OurSonic.Help.$setDataFromColors(d.data, colors, scale, image.width, colors[0]);
	return OurSonic.Help.loadSprite(OurSonic.Help.$getBase64Image(d), complete);
};
OurSonic.Help.$setDataFromColors = function(data, colors, scale, width, transparent) {
	for (var i = 0; i < colors.length; i++) {
		var curX = i % width;
		var curY = ss.Int32.div(i, width);
		var g = colors[i];
		var isTrans = false;
		if (transparent) {
			if (g.r === transparent.r && g.g === transparent.g && g.b === transparent.b) {
				isTrans = true;
			}
		}
		for (var j = 0; j < scale.x; j++) {
			for (var k = 0; k < scale.y; k++) {
				var x = curX * scale.x + j;
				var y = curY * scale.y + k;
				var c = (x + y * (scale.x * width)) * 4;
				if (isTrans) {
					data[c + 0] = 0;
					data[c + 1] = 0;
					data[c + 2] = 0;
					data[c + 3] = 0;
					continue;
				}
				data[c] = g.r;
				data[c + 1] = g.g;
				data[c + 2] = g.b;
				data[c + 3] = 255;
			}
		}
	}
};
OurSonic.Help.$getBase64Image = function(data) {
	// Create an empty canvas element
	var canvas = document.createElement('canvas');
	canvas.width = data.width;
	canvas.height = data.height;
	// Copy the image contents to the canvas
	var ctx = canvas.getContext('2d');
	ctx.putImageData(data, 0, 0);
	var dataURL = canvas.toDataURL('image/png');
	return Type.cast(dataURL, String);
};
OurSonic.Help.$colorObjectFromData = function(data, c) {
	var r = ss.Nullable.unbox(Type.cast(data[c], ss.Int32));
	var g = ss.Nullable.unbox(Type.cast(data[c + 1], ss.Int32));
	var b = ss.Nullable.unbox(Type.cast(data[c + 2], ss.Int32));
	var a = ss.Nullable.unbox(Type.cast(data[c + 3], ss.Int32));
	return { r: r, g: g, b: b, a: a };
};
OurSonic.Help.getImageData = function(image) {
	var canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	var data = ctx.getImageData(0, 0, image.width, image.height);
	return data.data;
};
OurSonic.Help.scaleCsImage = function(image, scale, complete) {
	var df = image.bytes;
	var colors = new Array(df.length);
	for (var f = 0; f < df.length; f++) {
		var c = image.palette[df[f]];
		colors[f] = { r: c[0], g: c[1], b: c[2], a: c[3] };
	}
	var dc = OurSonic.Help.defaultCanvas(0, 0);
	var d = dc.context.createImageData(image.width * scale.x, image.height * scale.y);
	OurSonic.Help.$setDataFromColors(d.data, colors, scale, image.width, colors[0]);
	return OurSonic.Help.loadSprite(OurSonic.Help.$getBase64Image(d), complete);
};
OurSonic.Help.loaded = function(element) {
	return element.getAttribute('loaded') === 'true';
};
OurSonic.Help.loaded$1 = function(element, set) {
	element.setAttribute('loaded', (set ? 'true' : 'false'));
};
OurSonic.Help.loadSprite = function(src, complete) {
	var sprite1 = new Image();
	sprite1.addEventListener('load', function(e) {
		OurSonic.Help.loaded$1(sprite1, true);
		if (complete) {
			complete(sprite1);
		}
	}, false);
	sprite1.src = src;
	return sprite1;
};
OurSonic.Help.defaultCanvas = function(w, h) {
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	return new OurSonic.CanvasInformation(ctx, $(canvas));
};
OurSonic.Help.decodeString = function(lvl) {
	return (new Compressor()).DecompressText(lvl);
};
OurSonic.Help.fixAngle = function(angle) {
	var fixedAng = ss.Int32.trunc(Math.floor((256 - angle) * 1.4062)) % 360;
	var flop = 360 - fixedAng;
	return OurSonic.Help.degToRad(flop);
};
OurSonic.Help.degToRad = function(angle) {
	return angle * Math.PI / 180;
};
OurSonic.Help.sign = function(m) {
	return ((m === 0) ? 0 : ((m < 0) ? -1 : 1));
};
OurSonic.Help.floor = function(spinDashSpeed) {
	if (spinDashSpeed > 0) {
		return ss.Nullable.unbox(Type.cast(~~spinDashSpeed, ss.Int32));
	}
	return ss.Int32.trunc(Math.floor(spinDashSpeed));
};
OurSonic.Help.max = function(f1, f2) {
	return ((f1 < f2) ? f2 : f1);
};
OurSonic.Help.min = function(f1, f2) {
	return ((f1 > f2) ? f2 : f1);
};
OurSonic.Help.clone = function(o) {
	return T.getDefaultValue();
};
OurSonic.Help.mergeRect = function(main, small) {
	main.x = Math.min(small.x, main.x);
	main.width = Math.max(small.x + small.width + main.x, main.width);
	main.y = Math.min(small.y, main.y);
	main.height = Math.max(small.y + small.height + main.y, main.height);
};
OurSonic.Help.roundRect = function(ctx, x, y, width, height, radius, fill, stroke) {
	ctx.save();
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width, y);
	//ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height);
	// ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x, y + height);
	// ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	if (stroke) {
		ctx.stroke();
	}
	if (fill) {
		ctx.fill();
	}
	ctx.restore();
};
OurSonic.Help.getCursorPosition = function(ev, b) {
	if (!!(ev.targetTouches && ev.targetTouches.length > 0)) {
		ev = ev.targetTouches[0];
	}
	if (!!(ss.isValue(ev.pageX) && ss.isValue(ev.pageY))) {
		return OurSonic.UIManager.Pointer.$ctor(ev.pageX, ev.pageY, 0);
	}
	//if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
	return OurSonic.UIManager.Pointer.$ctor(ev.clientX, ev.clientY, 0);
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.IntersectingRectangle
OurSonic.IntersectingRectangle = function(x, y, width, height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
OurSonic.IntersectingRectangle.prototype = {
	intersects: function(p) {
		return this.x < p.x && this.x + this.width > p.x && this.y < p.y && this.y + this.height > p.y;
	}
};
OurSonic.IntersectingRectangle.intersectsRect = function(r, p) {
	return r.x < p.x && r.x + r.width > p.x && r.y < p.y && r.y + r.height > p.y;
};
OurSonic.IntersectingRectangle.intersectRect = function(r1, r2) {
	return !(r2.x > r1.x + r1.width || r2.x + 0 < r1.x || r2.y > r1.y + r1.height || r2.y + 0 < r1.y);
};
Type.registerNamespace('OurSonic.Level');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelEvent
OurSonic.Level.LevelEvent = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObject
OurSonic.Level.LevelObject = function(key) {
	this.$cacheCompiled = {};
	this.$cacheLast = {};
	this.key = null;
	this.assets = null;
	this.pieces = null;
	this.pieceLayouts = null;
	this.projectiles = null;
	this.initScript = null;
	this.tickScript = null;
	this.collideScript = null;
	this.hurtScript = null;
	this.$1$DescriptionField = null;
	this.key = key;
	this.initScript = 'this.state = {\r\n\txsp: 0.0,\r\n\tysp: 0.0,\r\n\tfacing: false,\r\n};';
	this.pieces = [];
	this.pieceLayouts = [];
	this.projectiles = [];
	this.assets = [];
};
OurSonic.Level.LevelObject.prototype = {
	get_description: function() {
		return this.$1$DescriptionField;
	},
	set_description: function(value) {
		this.$1$DescriptionField = value;
	},
	init: function(object, level, sonic) {
		object.reset();
		this.$evalMe('initScript').apply(object, [object, level, sonic]);
	},
	onCollide: function(object, level, sonic, sensor, piece) {
		return this.$evalMe('collideScript').apply(object, [object, level, sonic, sensor, piece]);
	},
	onHurtSonic: function(object, level, sonic, sensor, piece) {
		return this.$evalMe('hurtScript').apply(object, [object, level, sonic, sensor, piece]);
	},
	tick: function(object, level, sonic) {
		if (object.lastDrawTick !== OurSonic.SonicManager.instance.tickCount - 1) {
			this.init(object, level, sonic);
		}
		object.lastDrawTick = OurSonic.SonicManager.instance.tickCount;
		this.$evalMe('tickScript').apply(object, [object, level, sonic]);
		if (object.state) {
			object.xsp = object.state.xsp;
			object.ysp = object.state.ysp;
		}
		object.x += object.xsp;
		object.y += object.ysp;
		return true;
	},
	die: function() {
		//alert('todo death');
	},
	$evalMe: function(js) {
		if (ss.isNullOrUndefined(this.$cacheLast[js])) {
			this.$cacheLast[js] = null;
		}
		if (!ss.referenceEquals(this.$cacheLast[js], this[js])) {
			this.$cacheCompiled[js] = null;
		}
		this.$cacheLast[js] = this[js];
		if (ss.isNullOrUndefined(this.$cacheCompiled[js])) {
			this.$cacheCompiled[js] = eval('(function(object,level,sonic,sensor,piece){' + this[js] + '});');
		}
		return this.$cacheCompiled[js];
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectAsset
OurSonic.Level.LevelObjectAsset = function(name) {
	this.frames = null;
	this.name = null;
	this.frames = [];
	this.name = name;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectAssetFrame
OurSonic.Level.LevelObjectAssetFrame = function(name) {
	this.offsetX = 0;
	this.width = 0;
	this.height = 0;
	this.offsetY = 0;
	this.hurtSonicMap = null;
	this.collisionMap = null;
	this.colorMap = null;
	this.palette = null;
	this.name = null;
	this.image = null;
	this.image = {};
	this.name = name;
	//  for (var i = 0; i < 100; i++) {
	//  this.collisionMap[i] = [];
	//  this.hurtSonicMap[i] = [];
	//  
	//  }
};
OurSonic.Level.LevelObjectAssetFrame.prototype = {
	setWidth: function(w) {
		//  this.width = w;
		//  this.collisionMap = this.collisionMap.slice(0, w);
		//  this.clearCache();
	},
	setHeight: function(h) {
		//      this.height = h;
		//      for (var j = 0; j < this.width; j++) {
		//      this.collisionMap[j] = this.collisionMap[j].slice(0, h);
		//      }
		//      this.clearCache();
	},
	setOffset: function(ex, ey) {
		//         this.offsetX = ex;
		//         this.offsetY = ey;
		//         
		//         this.clearCache();
	},
	drawSimple: function(canvas, pos, width, height, xflip, yflip) {
		canvas.save();
		canvas.translate(pos.x, pos.y);
		if (xflip) {
			if (yflip) {
				canvas.translate(width, height);
				canvas.scale(-1, -1);
			}
			else {
				canvas.translate(width, 0);
				canvas.scale(-1, 1);
			}
		}
		else if (yflip) {
			canvas.translate(0, height);
			canvas.scale(1, -1);
		}
		else {
		}
		canvas.scale(ss.Int32.div(width, this.width), ss.Int32.div(height, this.height));
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				var ex = x;
				var ey = y;
				var color = this.palette[this.colorMap[ex][ey]];
				if (!ss.referenceEquals(canvas.fillStyle, '#' + color)) {
					canvas.fillStyle = '#' + color;
				}
				canvas.fillRect(ex, ey, 1, 1);
			}
		}
		canvas.restore();
	},
	getCache: function(size, xflip, yflip, showOutline, showCollideMap, showHurtMap) {
		return this.image[((xflip ? 1 : 0) + 2) * 13 ^ size.x * 47 ^ ((yflip ? 1 : 0) + 2) * 71 ^ ((showOutline ? 1 : 0) + 2) * 7 ^ ((showCollideMap ? 1 : 0) + 2) * 89 ^ ((showHurtMap ? 1 : 0) + 2) * 79];
		return null;
	},
	clearCache: function() {
		this.image = {};
	},
	setCache: function(image, size, xflip, yflip, showOutline, showCollideMap, showHurtMap) {
		this.image[((xflip ? 1 : 0) + 2) * 13 ^ size.x * 47 ^ ((yflip ? 1 : 0) + 2) * 71 ^ ((showOutline ? 1 : 0) + 2) * 7 ^ ((showCollideMap ? 1 : 0) + 2) * 89 ^ ((showHurtMap ? 1 : 0) + 2) * 79] = image;
	},
	drawUI: function(_canvas, pos, size, showOutline, showCollideMap, showHurtMap, showOffset, xflip, yflip) {
		var fd = this.getCache(size, xflip, yflip, showOutline, showCollideMap, showHurtMap);
		if (!fd) {
			var mj = OurSonic.Help.defaultCanvas(size.x, size.y);
			var canvas = mj.context;
			canvas.save();
			canvas.strokeStyle = '#000000';
			canvas.lineWidth = 1;
			if (xflip) {
				if (yflip) {
					canvas.translate(size.x, size.y);
					canvas.scale(-1, -1);
				}
				else {
					canvas.translate(size.x, 0);
					canvas.scale(-1, 1);
				}
			}
			else if (yflip) {
				canvas.translate(0, size.y);
				canvas.scale(1, -1);
			}
			else {
			}
			var transparent = -200;
			//this.colorMap[0][0]
			canvas.scale(ss.Int32.div(size.x, this.width), ss.Int32.div(size.y, this.height));
			for (var x = 0; x < this.width; x++) {
				for (var y = 0; y < this.height; y++) {
					var ex = x;
					var ey = y;
					var d = this.colorMap[ex][ey];
					if (transparent === d) {
						if (canvas.fillStyle !== 'rgba(0,0,0,0)') {
							canvas.fillStyle = 'rgba(0,0,0,0)';
						}
					}
					else {
						var color = this.palette[d];
						//  var negative = _H.negateColor(color);
						if (!ss.referenceEquals(canvas.fillStyle, '#' + color)) {
							canvas.fillStyle = '#' + color;
						}
					}
					//if (canvas.strokeStyle != "#" + negative)
					//    canvas.strokeStyle = "#" + negative; 
					canvas.fillRect(ex, ey, 1, 1);
					//  if (showOutline)
					//    canvas.strokeRect(ex, ey, 1, 1);
					if (showCollideMap) {
						if (this.collisionMap[ex][ey] > 0) {
							canvas.fillStyle = 'rgba(30,34,255,0.6)';
							canvas.fillRect(ex, ey, 1, 1);
						}
					}
					if (showHurtMap) {
						if (this.hurtSonicMap[ex][ey] > 0) {
							canvas.fillStyle = 'rgba(211,12,55,0.6)';
							canvas.fillRect(ex, ey, 1, 1);
						}
					}
				}
			}
			if (showOffset) {
				canvas.beginPath();
				canvas.moveTo(this.offsetX, 0);
				canvas.lineTo(this.offsetX, this.height);
				canvas.lineWidth = 1;
				canvas.strokeStyle = '#000000';
				canvas.stroke();
				canvas.beginPath();
				canvas.moveTo(0, this.offsetY);
				canvas.lineTo(this.width, this.offsetY);
				canvas.lineWidth = 1;
				canvas.strokeStyle = '#000000';
				canvas.stroke();
			}
			canvas.restore();
			fd = mj;
			this.setCache(mj, size, xflip, yflip, showOutline, showCollideMap, showHurtMap);
		}
		_canvas.drawImage(fd.canvas, pos.x, pos.y);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectData
OurSonic.Level.LevelObjectData = function() {
};
OurSonic.Level.LevelObjectData.$ctor = function() {
	var $this = {};
	$this.key = null;
	$this.description = null;
	$this.assets = null;
	$this.pieces = null;
	$this.pieceLayouts = null;
	$this.projectiles = null;
	$this.initScript = null;
	$this.tickScript = null;
	$this.collideScript = null;
	$this.hurtScript = null;
	$this.assets = [];
	$this.pieces = [];
	$this.projectiles = [];
	$this.pieceLayouts = [];
	$this.key = '';
	$this.description = '';
	$this.initScript = '';
	$this.tickScript = '';
	$this.collideScript = '';
	$this.hurtScript = '';
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectInfo
OurSonic.Level.LevelObjectInfo = function(o) {
	this.$_rect = OurSonic.Rectangle.$ctor1(0, 0, 0, 0);
	this.lastDrawTick = 0;
	this.o = null;
	this.x = 0;
	this.y = 0;
	this.xsp = 0;
	this.ysp = 0;
	this.xflip = false;
	this.yflip = false;
	this.subdata = 0;
	this.key = null;
	this.objectData = null;
	this.upperNibble = 0;
	this.lowerNibble = 0;
	this.pieceIndex = 0;
	this.pieces = null;
	this.dead = false;
	this.state = null;
	this.index = 0;
	this.debug = null;
	this.consoleLog = null;
	this.o = o;
	this.x = o.X;
	this.y = o.Y;
	this.xflip = o.XFlip;
	this.yflip = o.YFlip;
	this.subdata = o.SubType;
	this.key = o.ID.toString();
	this.upperNibble = this.subdata >> 4;
	this.lowerNibble = this.subdata & 15;
};
OurSonic.Level.LevelObjectInfo.prototype = {
	log: function(txt, level) {
		if (!this.debug) {
			this.debug = [];
		}
		if (level === 0) {
			this.debug.add(' -- ' + txt + ' -- ');
		}
		else {
			this.debug.add(txt);
		}
		if (this.consoleLog) {
			this.consoleLog(this.debug);
		}
	},
	setPieceLayoutIndex: function(ind) {
		this.pieceIndex = ind;
		var pcs = this.objectData.pieceLayouts[this.pieceIndex].pieces;
		this.pieces = [];
		for (var i = 0; i < pcs.length; i++) {
			this.pieces.add(pcs[i]);
		}
	},
	setObjectData: function(obj) {
		this.objectData = obj;
		if (this.objectData.pieceLayouts.length > this.pieceIndex && this.objectData.pieceLayouts[this.pieceIndex].pieces.length > 0) {
			this.setPieceLayoutIndex(this.pieceIndex);
		}
	},
	tick: function(object, level, sonic) {
		if (this.dead || !this.objectData) {
			return false;
		}
		try {
			return this.objectData.tick(object, level, sonic);
		}
		catch ($t1) {
			var EJ = ss.Exception.wrap($t1);
			//this.Log(EJ.name + " " + EJ.message, 0);
			return false;
		}
	},
	mainPieceLayout: function() {
		return this.objectData.pieceLayouts[this.pieceIndex];
	},
	getRect: function(scale) {
		if (this.objectData.pieceLayouts.length === 0) {
			this.$_rect.x = ss.Int32.trunc(this.x);
			this.$_rect.y = ss.Int32.trunc(this.y);
			this.$_rect.width = OurSonic.Level.ObjectManager.broken.width;
			this.$_rect.height = OurSonic.Level.ObjectManager.broken.height;
			return this.$_rect;
		}
		var pcs = this.pieces;
		this.$_rect.y = 0;
		this.$_rect.y = 0;
		this.$_rect.width = 0;
		this.$_rect.height = 0;
		for (var pieceIndex = 0; pieceIndex < pcs.length; pieceIndex++) {
			var j = pcs[pieceIndex];
			var piece = this.objectData.pieces[j.pieceIndex];
			var asset = this.objectData.assets[piece.assetIndex];
			if (asset.frames.length > 0) {
				var frm = asset.frames[j.frameIndex];
				OurSonic.Help.mergeRect(this.$_rect, OurSonic.Rectangle.$ctor1(frm.offsetX + j.y, frm.offsetY + j.y, frm.width * scale.y, frm.height * scale.y));
			}
		}
		this.$_rect.x = this.$_rect.x * scale.x;
		this.$_rect.y = this.$_rect.y * scale.y;
		this.$_rect.width -= this.$_rect.x;
		this.$_rect.height -= this.$_rect.y;
		this.$_rect.x += ss.Int32.trunc(this.x);
		this.$_rect.y += ss.Int32.trunc(this.y);
		return this.$_rect;
	},
	draw: function(canvas, x, y, scale, showHeightMap) {
		if (this.dead || !this.objectData) {
			return;
		}
		if (this.objectData.pieceLayouts.length === 0) {
			canvas.drawImage(OurSonic.Level.ObjectManager.broken, x - ss.Int32.div(OurSonic.Level.ObjectManager.broken.width, 2), y - ss.Int32.div(OurSonic.Level.ObjectManager.broken.height, 2), OurSonic.Level.ObjectManager.broken.width * scale.x, OurSonic.Level.ObjectManager.broken.height * scale.y);
			return;
		}
		this.mainPieceLayout().draw(canvas, x, y, scale, this.objectData, this, showHeightMap);
		if (false) {
			var gr = this.getRect(scale);
			canvas.save();
			canvas.fillStyle = 'rgba(228,228,12,0.4)';
			var wd = 1;
			canvas.fillRect(gr.x - this.x + x - ss.Int32.div(gr.width, 2) - wd, gr.y - this.y + y - ss.Int32.div(gr.height, 2) - wd, gr.width - (gr.x - this.x) + wd * 2, gr.height - (gr.y - this.y) + wd * 2);
			canvas.restore();
		}
	},
	reset: function() {
		this.x = this.o.X;
		this.y = this.o.Y;
		this.xsp = 0;
		this.ysp = 0;
		this.state = null;
		this.xflip = this.o.XFlip;
		this.yflip = this.o.YFlip;
		this.dead = false;
		this.pieceIndex = 0;
		//maybe
		this.subdata = this.o.SubType;
		this.upperNibble = this.subdata >> 4;
		this.lowerNibble = this.subdata & 15;
		if (this.objectData.pieceLayouts.length > this.pieceIndex && this.objectData.pieceLayouts[this.pieceIndex].pieces.length > 0) {
			this.setPieceLayoutIndex(this.pieceIndex);
		}
	},
	collides: function(sonic) {
		return this.collision(sonic, false);
	},
	hurtsSonic: function(sonic) {
		return this.collision(sonic, true);
	},
	kill: function() {
		this.dead = true;
	},
	collision: function(sonic, isHurtMap) {
		if (this.dead || !this.objectData || this.objectData.pieceLayouts.length === 0) {
			return null;
		}
		var pcs = this.pieces;
		var mX = ss.Int32.trunc(sonic.x - this.x);
		var mY = ss.Int32.trunc(sonic.y - this.y);
		for (var pieceIndex = 0; pieceIndex < pcs.length; pieceIndex++) {
			var j = pcs[pieceIndex];
			var piece = this.objectData.pieces[j.pieceIndex];
			var asset = this.objectData.assets[piece.assetIndex];
			if (asset.frames.length > 0) {
				var frm = asset.frames[j.frameIndex];
				var map = (isHurtMap ? frm.hurtSonicMap : frm.collisionMap);
				if (this.twoDArray(map, mX + frm.offsetX + j.x, mY + frm.offsetY + j.y) === true) {
					return j;
				}
			}
		}
		return null;
	},
	twoDArray: function(map, x, y) {
		if (!map || x < 0 || y < 0 || x > map.length) {
			return false;
		}
		var d = map[x];
		if (!d || y > d.length) {
			return false;
		}
		return d[y] > 0;
	},
	collide: function(sonic, sensor, piece) {
		try {
			return this.objectData.onCollide(this, OurSonic.SonicManager.instance.sonicLevel, sonic, sensor, piece);
		}
		catch ($t1) {
			var EJ = ss.Exception.wrap($t1);
			//this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
			return false;
		}
	},
	hurtSonic: function(sonic, sensor, piece) {
		try {
			return this.objectData.onHurtSonic(this, OurSonic.SonicManager.instance.sonicLevel, sonic, sensor, piece);
		}
		catch ($t1) {
			var EJ = ss.Exception.wrap($t1);
			//this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
			return false;
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectPiece
OurSonic.Level.LevelObjectPiece = function() {
};
OurSonic.Level.LevelObjectPiece.$ctor = function(name) {
	var $this = {};
	$this.assetIndex = 0;
	$this.frameIndex = 0;
	$this.pieceIndex = 0;
	$this.x = 0;
	$this.y = 0;
	$this.collided = false;
	$this.xflip = false;
	$this.yflip = false;
	$this.visible = false;
	$this.name = null;
	$this.name = name;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectPieceLayout
OurSonic.Level.LevelObjectPieceLayout = function(name) {
	this.width = 0;
	this.height = 0;
	this.pieces = null;
	this.name = null;
	this.name = name;
	this.width = 350;
	this.height = 280;
	this.pieces = [];
};
OurSonic.Level.LevelObjectPieceLayout.prototype = {
	update: function() {
		var $t1 = OurSonic.SonicManager.instance.sonicLevel.objects.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				t.reset();
			}
		}
		finally {
			$t1.dispose();
		}
	},
	drawUI: function(canvas, pos, scale, showOutline, showImages, selectedPieceIndex, zeroPosition) {
		canvas.save();
		canvas.strokeStyle = '#000000';
		canvas.lineWidth = 2;
		canvas.fillStyle = '#FFFFFF';
		canvas.fillRect(pos.x, pos.y, this.width, this.height);
		canvas.beginPath();
		canvas.rect(pos.x, pos.y, this.width, this.height);
		canvas.clip();
		canvas.closePath();
		canvas.translate(zeroPosition.x, zeroPosition.y);
		//        canvas.scale(3, 3);
		canvas.beginPath();
		canvas.moveTo(pos.x + -250, pos.y + 0);
		canvas.lineTo(pos.x + 250, pos.y + 0);
		canvas.closePath();
		canvas.stroke();
		canvas.beginPath();
		canvas.moveTo(pos.x + 0, pos.y + -250);
		canvas.lineTo(pos.x + 0, pos.y + 250);
		canvas.closePath();
		canvas.stroke();
		for (var i = 1; i < this.pieces.length; i++) {
			var j = this.pieces[i];
			canvas.beginPath();
			canvas.moveTo(pos.x + j.get_x(), pos.y + j.get_y());
			canvas.lineTo(pos.x + this.pieces[i - 1].get_x(), pos.y + this.pieces[i - 1].get_y());
			canvas.stroke();
		}
		var drawRadial;
		for (var i1 = 0; i1 < this.pieces.length; i1++) {
			var j1 = this.pieces[i1];
			if (showImages) {
				//
				//                    LevelObjectPiece piece = sonicManager.uiManager.objectFrameworkArea.objectFramework.pieces[j.PieceIndex];
				//
				//                    var asset = sonicManager.uiManager.objectFrameworkArea.objectFramework.assets[piece.AssetIndex];
				//
				//                    if (asset.Frames.length > 0)
				//
				//                    {
				//
				//                    LevelObjectAssetFrame frm = asset.Frames[j.FrameIndex];
				//
				//                    drawRadial = SonicManager.Instance.mainCanvas.Context.CreateRadialGradient(0, 0, 0, 10, 10, 50);
				//
				//                    drawRadial.AddColorStop(0, "white");
				//
				//                    if (selectedPieceIndex == i)
				//
				//                    {
				//
				//                    drawRadial.AddColorStop(1, "yellow");
				//
				//                    }
				//
				//                    else
				//
				//                    {
				//
				//                    drawRadial.AddColorStop(1, "red");
				//
				//                    }
				//
				//                    var borderSize = 3;
				//
				//                    canvas.FillStyle = drawRadial;
				//
				//                    //   canvas.fillRect(pos.x + j.x - frm.offsetX - borderSize, pos.y + j.y - frm.offsetY - borderSize, frm.width + borderSize * 2, frm.height + borderSize*2);
				//
				//                    frm.DrawUI(canvas, new Point(pos.X + j.X - frm.OffsetX, pos.Y + j.Y - frm.OffsetY), new Point(frm.Width, frm.Height),
				//
				//                    false, true, true, false, piece.Xflip, piece.Yflip);
				//
				//                    }
			}
			else {
				drawRadial = OurSonic.SonicManager.instance.mainCanvas.context.createRadialGradient(0, 0, 0, 10, 10, 50);
				drawRadial.addColorStop(0, 'white');
				if (selectedPieceIndex === i1) {
					drawRadial.addColorStop(1, 'yellow');
				}
				else {
					drawRadial.addColorStop(1, 'red');
				}
				canvas.fillStyle = drawRadial;
				canvas.beginPath();
				canvas.arc(pos.x + j1.get_x(), pos.y + j1.get_y(), 10, 0, Math.PI * 2, true);
				canvas.closePath();
				canvas.fill();
			}
		}
		canvas.restore();
	},
	draw: function(canvas, x, y, scale, framework, instance, showHeightMap) {
		for (var i = 0; i < instance.pieces.length; i++) {
			var j = instance.pieces[i];
			if (!j.visible) {
				continue;
			}
			var piece = framework.pieces[j.pieceIndex];
			var asset = framework.assets[piece.assetIndex];
			if (asset.frames.length > 0) {
				var frm = asset.frames[j.frameIndex];
				frm.drawUI(canvas, OurSonic.Point.$ctor1(x + j.x * scale.x - frm.offsetX * scale.x, y + j.y * scale.y - frm.offsetY * scale.y), OurSonic.Point.$ctor1(frm.width * scale.x, frm.height * scale.y), false, showHeightMap, showHeightMap, false, piece.xflip, piece.yflip);
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectPieceLayoutPiece
OurSonic.Level.LevelObjectPieceLayoutPiece = function(pieceIndex) {
	this.$1$PieceIndexField = 0;
	this.$1$AssetIndexField = 0;
	this.$1$FrameIndexField = 0;
	this.$1$PriorityField = false;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$VisibleField = false;
	this.set_pieceIndex(pieceIndex);
};
OurSonic.Level.LevelObjectPieceLayoutPiece.prototype = {
	get_pieceIndex: function() {
		return this.$1$PieceIndexField;
	},
	set_pieceIndex: function(value) {
		this.$1$PieceIndexField = value;
	},
	get_assetIndex: function() {
		return this.$1$AssetIndexField;
	},
	set_assetIndex: function(value) {
		this.$1$AssetIndexField = value;
	},
	get_frameIndex: function() {
		return this.$1$FrameIndexField;
	},
	set_frameIndex: function(value) {
		this.$1$FrameIndexField = value;
	},
	get_priority: function() {
		return this.$1$PriorityField;
	},
	set_priority: function(value) {
		this.$1$PriorityField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	get_visible: function() {
		return this.$1$VisibleField;
	},
	set_visible: function(value) {
		this.$1$VisibleField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.LevelObjectProjectile
OurSonic.Level.LevelObjectProjectile = function() {
};
OurSonic.Level.LevelObjectProjectile.$ctor = function(name) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.xsp = 0;
	$this.ysp = 0;
	$this.xflip = false;
	$this.yflip = false;
	$this.assetIndex = 0;
	$this.frameIndex = 0;
	$this.name = null;
	$this.name = name;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.ObjectManager
OurSonic.Level.ObjectManager = function(sonicManager) {
	this.$sonicManager = null;
	this.$sonicManager = sonicManager;
	window.objectManager = this;
};
OurSonic.Level.ObjectManager.prototype = {
	init: function() {
	}
};
OurSonic.Level.ObjectManager.extendObject = function(d) {
	var $t1 = new OurSonic.Level.LevelObject(d.key);
	$t1.collideScript = d.collideScript;
	$t1.hurtScript = d.hurtScript;
	$t1.initScript = d.initScript;
	$t1.tickScript = d.tickScript;
	var obj = $t1;
	//d.oldKey = name;
	obj.assets = [];
	for (var i = 0; i < d.assets.length; i++) {
		var asset = d.assets[i];
		var $t2 = new OurSonic.Level.LevelObjectAsset('');
		$t2.name = asset.name;
		var levelObjectAsset = $t2;
		levelObjectAsset.frames = [];
		for (var index = 0; index < asset.frames.length; index++) {
			var fr = asset.frames[index];
			var $t4 = levelObjectAsset.frames;
			var $t3 = new OurSonic.Level.LevelObjectAssetFrame('');
			$t3.offsetX = fr.offsetX;
			$t3.width = fr.width;
			$t3.height = fr.height;
			$t3.offsetY = fr.offsetY;
			$t3.hurtSonicMap = fr.hurtSonicMap;
			$t3.collisionMap = fr.collisionMap;
			$t3.colorMap = fr.colorMap;
			$t3.palette = fr.palette;
			$t4[index] = $t3;
		}
		obj.assets[i] = levelObjectAsset;
	}
	obj.pieces = [];
	for (var index1 = 0; index1 < d.pieces.length; index1++) {
		var piece = d.pieces[index1];
		obj.pieces[index1] = piece;
	}
	obj.pieceLayouts = [];
	for (var index2 = 0; index2 < d.pieceLayouts.length; index2++) {
		var pl = d.pieceLayouts[index2];
		var $t6 = obj.pieceLayouts;
		var $t5 = new OurSonic.Level.LevelObjectPieceLayout(pl.name);
		$t5.height = pl.height;
		$t5.width = pl.width;
		$t6[index2] = $t5;
		obj.pieceLayouts[index2].pieces = [];
		for (var i1 = 0; i1 < d.pieceLayouts[index2].pieces.length; i1++) {
			obj.pieceLayouts[index2].pieces[i1] = d.pieceLayouts[index2].pieces[i1];
		}
	}
	obj.projectiles = [];
	for (var index3 = 0; index3 < d.projectiles.length; index3++) {
		var proj = d.projectiles[index3];
		var $t7 = OurSonic.Level.LevelObjectProjectile.$ctor(proj.name);
		$t7.x = proj.x;
		$t7.y = proj.y;
		$t7.xsp = proj.xsp;
		$t7.ysp = proj.ysp;
		$t7.xflip = proj.xflip;
		$t7.yflip = proj.yflip;
		$t7.assetIndex = proj.assetIndex;
		$t7.frameIndex = proj.frameIndex;
		proj = $t7;
		obj.projectiles[index3] = proj;
	}
	return obj;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Level.Ring
OurSonic.Level.Ring = function() {
};
OurSonic.Level.Ring.draw = function($this, canvas, pos, scale) {
	if ($this.active) {
		$this.ysp += 0.09375;
		$this.x += ss.Int32.trunc($this.xsp);
		$this.y += ss.Int32.trunc($this.ysp);
		var wl = OurSonic.SonicManager.instance.windowLocation;
		if ($this.x < wl.x || $this.y < wl.y || $this.x > wl.x + wl.width || $this.y > wl.y + wl.height) {
			$this.tickCount = 268435455;
			return;
		}
		//            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) + 8, _H.floor(this.y) + 8, 16, 1) != -1) {
		//            this.ysp *= -0.75;
		//            }
		//            
		//            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) - 8, _H.floor(this.y) + 8, 26, 0) != -1) {
		//            this.xsp *= -0.75;
		//            }
		if (OurSonic.SonicManager.instance.drawTickCount > OurSonic.SonicManager.instance.sonicToon.sonicLastHitTick + 64 && OurSonic.IntersectingRectangle.intersectsRect(OurSonic.SonicManager.instance.sonicToon.myRec, OurSonic.Rectangle.$ctor1($this.x - 8 * scale.x, $this.y - 8 * scale.y, 16 * scale.x, 16 * scale.y))) {
			$this.tickCount = 268435455;
			OurSonic.SonicManager.instance.sonicToon.rings++;
			return;
		}
		$this.tickCount++;
	}
	if (OurSonic.SonicManager.instance.currentGameState === 0) {
		$this.animationIndex = ss.Int32.div(OurSonic.SonicManager.instance.drawTickCount % (($this.active ? 4 : 8) * 4), ($this.active ? 4 : 8));
	}
	else {
		$this.animationIndex = 0;
	}
	var sprites = null;
	if (OurSonic.SonicManager.instance.spriteCache.rings) {
		sprites = OurSonic.SonicManager.instance.spriteCache.rings;
	}
	else {
		throw new ss.Exception('bad ring animation');
	}
	var sps = sprites[$this.animationIndex * 200 + scale.y * 100 + scale.x];
	if (!sps) {
		throw new ss.Exception('bad ring animation');
	}
	if (OurSonic.Help.loaded(sps)) {
		canvas.drawImage(sps, (pos.x - 8) * scale.x, (pos.y - 8) * scale.y);
	}
};
OurSonic.Level.Ring.$ctor = function(active) {
	var $this = OurSonic.Point.$ctor1(0, 0);
	$this.active = false;
	$this.animationIndex = 0;
	$this.tickCount = 0;
	$this.ysp = 0;
	$this.xsp = 0;
	$this.active = active;
	return $this;
};
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Page
OurSonic.Page = function() {
	var stats = new xStats();
	document.body.appendChild(stats.element);
	new OurSonic.SonicEngine();
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.PaletteItem
OurSonic.PaletteItem = function() {
	this.palette = null;
	this.skipIndex = 0;
	this.totalLength = 0;
	this.pieces = null;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.PaletteItemPieces
OurSonic.PaletteItemPieces = function() {
	this.paletteIndex = 0;
	this.paletteMultiply = 0;
	this.paletteOffset = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Point
OurSonic.Point = function() {
};
OurSonic.Point.offset = function($this, windowLocation) {
	return OurSonic.Point.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
};
OurSonic.Point.negate = function($this, windowLocation) {
	return OurSonic.Point.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
};
OurSonic.Point.negate$1 = function($this, x, y) {
	return OurSonic.Point.$ctor1($this.x - x, $this.y - y);
};
OurSonic.Point.$ctor1 = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
OurSonic.Point.$ctor = function(pos) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = pos.x;
	$this.y = pos.y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Rectangle
OurSonic.Rectangle = function() {
};
OurSonic.Rectangle.$ctor = function() {
	var $this = OurSonic.Point.$ctor1(0, 0);
	$this.width = 0;
	$this.height = 0;
	return $this;
};
OurSonic.Rectangle.$ctor1 = function(x, y, width, height) {
	var $this = OurSonic.Point.$ctor1(x, y);
	$this.width = 0;
	$this.height = 0;
	$this.width = width;
	$this.height = height;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Sensor
OurSonic.Sensor = function(x1, x2, y1, y2, manager, color, ignoreSolid, letter) {
	this.$__currentM = { value: 0, angle: 0 };
	this.value = 0;
	this.angle = 0;
	this.letter = null;
	this.chosen = false;
	this.ignoreSolid = false;
	this.color = null;
	this.manager = null;
	this.x1 = 0;
	this.x2 = 0;
	this.y1 = 0;
	this.y2 = 0;
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.manager = manager;
	this.color = color;
	this.ignoreSolid = ignoreSolid;
	this.letter = letter;
};
OurSonic.Sensor.prototype = {
	$checkCollisionLineWrap: function(x1, x2, y1, y2, ignoreSolid) {
		var _x = ss.Int32.div(x1, 128);
		var _y = OurSonic.Help.mod(ss.Int32.div(y1, 128), OurSonic.SonicManager.instance.sonicLevel.levelHeight);
		var tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x][_y]];
		this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
		var curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
		var cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
		var __x = x1 - _x * 128;
		var __y = y1 - _y * 128;
		var i = 0;
		var length = 0;
		if (y1 === y2) {
			if (Math.max(x1, x2) > OurSonic.SonicManager.instance.sonicLevel.levelWidth * 128) {
				this.$__currentM.value = OurSonic.SonicManager.instance.sonicLevel.levelWidth * 128 - 20;
				this.$__currentM.angle = 255;
				return this.$__currentM;
			}
			if (x1 < x2) {
				length = x2 - x1;
				if (curh[__x][__y] >= 2) {
					for (i = 0; i < 256; i++) {
						while (true) {
							if (__x - i < 0) {
								if (_x - 1 < 0) {
									this.$__currentM.value = 0;
									this.$__currentM.angle = 255;
									return this.$__currentM;
								}
								tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x - 1][_y]];
								this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
								curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
								cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
								__x += 128;
							}
							else {
								break;
							}
						}
						if (curh[__x - i][__y] >= 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 - i, y1, this.letter)) {
							//            if (!( ( curh[( __x - i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//            continue;
							this.$__currentM.value = x1 - i;
							this.$__currentM.angle = cura[ss.Int32.div(__x - i, 16)][ss.Int32.div(__y, 16)];
							return this.$__currentM;
						}
					}
				}
				for (i = 0; i < length; i++) {
					while (true) {
						if (__x + i >= 128) {
							//
							//                                if (_x + 1 >= SonicManager.Instance.SonicLevel.LevelWidth)
							//
							//                                {
							//
							//                                this.__currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128;
							//
							//                                this.__currentM.Angle = 0xFF;
							//
							//                                return this.__currentM;
							//
							//                                }
							tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x + 1][_y]];
							this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
							curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
							cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
							__x -= 128;
						}
						else {
							break;
						}
					}
					if (curh[__x + i][__y] >= 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 + i, y1, this.letter)) {
						//if (!( ( curh[( __x + i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
						//continue;
						this.$__currentM.value = x1 + i;
						this.$__currentM.angle = cura[ss.Int32.div(__x + i, 16)][ss.Int32.div(__y, 16)];
						return this.$__currentM;
					}
				}
			}
			else {
				length = x1 - x2;
				if (curh[__x][__y] >= 2) {
					for (i = 0; i < 256; i++) {
						while (true) {
							if (__x + i >= 128) {
								//
								//                                    if (_x + 1 >= SonicManager.Instance.SonicLevel.LevelWidth)
								//
								//                                    {
								//
								//                                    this.__currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128;
								//
								//                                    this.__currentM.Angle = 0xFF;
								//
								//                                    return this.__currentM;
								//
								//                                    }
								tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x + 1][_y]];
								this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
								curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
								cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
								__x -= 128;
							}
							else {
								break;
							}
						}
						if (curh[__x + i][__y] >= 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 + i, y1, this.letter)) {
							//    if (!( ( curh[( __x + i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//    continue;
							this.$__currentM.value = x1 + i;
							this.$__currentM.angle = cura[ss.Int32.div(__x + i, 16)][ss.Int32.div(__y, 16)];
							return this.$__currentM;
						}
					}
				}
				for (i = 0; i < length; i++) {
					while (true) {
						if (__x - i < 0) {
							if (_x - 1 < 0) {
								this.$__currentM.value = 0;
								this.$__currentM.angle = 255;
								return this.$__currentM;
							}
							tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x - 1][_y]];
							this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
							curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
							cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
							__x += 128;
						}
						else {
							break;
						}
					}
					if (curh[__x - i][__y] >= 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 - i, y1, this.letter)) {
						//          if (!( ( curh[( __x - i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
						//          continue;
						this.$__currentM.value = x1 - i;
						this.$__currentM.angle = cura[ss.Int32.div(__x - i, 16)][ss.Int32.div(__y, 16)];
						return this.$__currentM;
					}
				}
			}
		}
		else {
			//top to bottom 
			if (y1 < y2) {
				length = y2 - y1;
				if (curh[__x][__y] >= 2) {
					for (i = 0; i < 256; i++) {
						while (true) {
							if (__y - i < 0) {
								tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x][OurSonic.Help.mod(_y - 1, OurSonic.SonicManager.instance.sonicLevel.levelHeight)]];
								this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
								curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
								cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
								__y += 128;
							}
							else {
								break;
							}
						}
						if (curh[__x][__y - i] > 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 - i, this.letter)) {
							//
							//                                if (!( ( curh[__x][__y - i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) )) {
							//
							//                                Help.Debugger();
							//
							//                                continue;
							//
							//                                }
							this.$__currentM.value = y1 - i;
							this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y - i, 16)];
							return this.$__currentM;
						}
					}
				}
				for (i = 0; i < length; i++) {
					while (true) {
						if (__y + i >= 128) {
							tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x][(_y + 1) % OurSonic.SonicManager.instance.sonicLevel.levelHeight]];
							this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
							curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
							cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
							__y -= 128;
						}
						else {
							break;
						}
					}
					if (curh[__x][__y + i] >= 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 + i, this.letter)) {
						if (curh[__x][__y + i] === 1 && OurSonic.SonicManager.instance.sonicToon.inAir && OurSonic.SonicManager.instance.sonicToon.ysp < 0) {
							continue;
						}
						//
						//                            if (!( ( curh[__x][__y + i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
						//
						//                            {
						//
						//                            Help.Debugger();
						//
						//                            continue;
						//
						//                            }
						this.$__currentM.value = y1 + i;
						this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y + i, 16)];
						return this.$__currentM;
					}
				}
			}
			else {
				length = y1 - y2;
				if (curh[__x][__y] >= 2) {
					for (i = 0; i < 256; i++) {
						while (true) {
							if (__y + i >= 128) {
								tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x][(_y + 1) % OurSonic.SonicManager.instance.sonicLevel.levelHeight]];
								this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
								curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
								cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
								__y -= 128;
							}
							else {
								break;
							}
						}
						if (curh[__x][__y + i] >= 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 + i, this.letter)) {
							//
							//                                if (!( ( curh[__x][__y + i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//
							//                                {
							//
							//                                Help.Debugger();
							//
							//                                continue;
							//
							//                                }
							this.$__currentM.value = y1 + i;
							this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y + i, 16)];
							return this.$__currentM;
						}
					}
				}
				for (i = 0; i < length; i++) {
					while (true) {
						if (__y - i < 0) {
							tc = OurSonic.SonicManager.instance.sonicLevel.chunks[OurSonic.SonicManager.instance.sonicLevel.chunkMap[_x][OurSonic.Help.mod(_y - 1, OurSonic.SonicManager.instance.sonicLevel.levelHeight)]];
							this.$buildChunk(tc, OurSonic.SonicManager.instance.sonicLevel.curHeightMap);
							curh = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_heightBlocks1() : tc.get_heightBlocks2());
							cura = (OurSonic.SonicManager.instance.sonicLevel.curHeightMap ? tc.get_angleMap1() : tc.get_angleMap2());
							__y += 128;
						}
						else {
							break;
						}
					}
					if (curh[__x][__y - i] > 1 || OurSonic.SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 + i, this.letter)) {
						//                            if (!( ( curh[__x][__y - i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
						//                            {
						//                            Help.Debugger();
						//                            continue;
						//                            }
						this.$__currentM.value = y1 - i;
						this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y - i, 16)];
						return this.$__currentM;
					}
				}
			}
		}
		return null;
	},
	$buildChunk: function(chunk, isLayerOne) {
		if (isLayerOne) {
			if (chunk.get_heightBlocks1()) {
				return;
			}
			var $t1 = new Array(128);
			chunk.set_heightBlocks1($t1);
			var hb1 = $t1;
			var $t2 = new Array(8);
			chunk.set_angleMap1($t2);
			var ab1 = $t2;
			for (var _1 = 0; _1 < 128; _1++) {
				hb1[_1] = new Array(128);
			}
			for (var _11 = 0; _11 < 8; _11++) {
				ab1[_11] = new Array(8);
			}
			for (var _y = 0; _y < 8; _y++) {
				for (var _x = 0; _x < 8; _x++) {
					var tp = chunk.tilePieces[_x][_y];
					ab1[_x][_y] = OurSonic.SonicManager.instance.sonicLevel.angles[OurSonic.SonicManager.instance.sonicLevel.collisionIndexes1[tp.block]];
					if (!(ab1[_x][_y] === 0 || ab1[_x][_y] === 255 || ab1[_x][_y] === 1)) {
						if (tp.xFlip) {
							if (tp.yFlip) {
								ab1[_x][_y] = 192 - ab1[_x][_y] + 192;
								ab1[_x][_y] = 128 - ab1[_x][_y] + 128;
							}
							else {
								ab1[_x][_y] = 128 - ab1[_x][_y] + 128;
							}
						}
						else if (tp.yFlip) {
							ab1[_x][_y] = 192 - ab1[_x][_y] + 192;
						}
						else {
							ab1[_x][_y] = ab1[_x][_y];
						}
					}
					var __x = 0;
					var __y = 0;
					var heightMask = OurSonic.SonicManager.instance.sonicLevel.heightMaps[OurSonic.SonicManager.instance.sonicLevel.collisionIndexes1[tp.block]];
					var heightMaskItems = null;
					if (ss.isNullOrUndefined(heightMask)) {
						continue;
					}
					var mj;
					if (OurSonic.HeightMask.op_Implicit(heightMask) === 0 || OurSonic.HeightMask.op_Implicit(heightMask) === 1) {
						mj = ((OurSonic.HeightMask.op_Implicit(heightMask) === 0) ? 0 : tp.solid1);
						for (__y = 0; __y < 16; __y++) {
							for (__x = 0; __x < 16; __x++) {
								hb1[_x * 16 + __x][_y * 16 + __y] = mj;
							}
						}
					}
					else {
						heightMaskItems = heightMask.items;
					}
					for (__y = 0; __y < 16; __y++) {
						for (__x = 0; __x < 16; __x++) {
							var jx = 0;
							var jy = 0;
							if (tp.xFlip) {
								if (tp.yFlip) {
									jx = 15 - __x;
									jy = 15 - __y;
								}
								else {
									jx = 15 - __x;
									jy = __y;
								}
							}
							else if (tp.yFlip) {
								jx = __x;
								jy = 15 - __y;
							}
							else {
								jx = __x;
								jy = __y;
							}
							if (!(OurSonic.HeightMask.op_Implicit(heightMask) === 0 || OurSonic.HeightMask.op_Implicit(heightMask) === 1)) {
								switch (tp.solid1) {
									case 0: {
										hb1[_x * 16 + jx][_y * 16 + jy] = 0;
										break;
									}
									case 1:
									case 2:
									case 3: {
										hb1[_x * 16 + jx][_y * 16 + jy] = (OurSonic.HeightMask.itemsGood(heightMaskItems, __x, __y) ? tp.solid1 : 0);
										break;
									}
								}
							}
						}
					}
				}
			}
		}
		else {
			if (chunk.get_heightBlocks2()) {
				return;
			}
			var $t3 = new Array(128);
			chunk.set_heightBlocks2($t3);
			var hb2 = $t3;
			var $t4 = new Array(8);
			chunk.set_angleMap2($t4);
			var ab2 = $t4;
			for (var _12 = 0; _12 < 128; _12++) {
				hb2[_12] = new Array(128);
			}
			for (var _13 = 0; _13 < 8; _13++) {
				ab2[_13] = new Array(8);
			}
			for (var _y1 = 0; _y1 < 8; _y1++) {
				for (var _x1 = 0; _x1 < 8; _x1++) {
					var tp1 = chunk.tilePieces[_x1][_y1];
					ab2[_x1][_y1] = OurSonic.SonicManager.instance.sonicLevel.angles[OurSonic.SonicManager.instance.sonicLevel.collisionIndexes2[tp1.block]];
					if (!(ab2[_x1][_y1] === 0 || ab2[_x1][_y1] === 255 || ab2[_x1][_y1] === 1)) {
						if (tp1.xFlip) {
							if (tp1.yFlip) {
								ab2[_x1][_y1] = 192 - ab2[_x1][_y1] + 192;
								ab2[_x1][_y1] = 128 - ab2[_x1][_y1] + 128;
							}
							else {
								ab2[_x1][_y1] = 128 - ab2[_x1][_y1] + 128;
							}
						}
						else if (tp1.yFlip) {
							ab2[_x1][_y1] = 192 - ab2[_x1][_y1] + 192;
						}
						else {
							ab2[_x1][_y1] = ab2[_x1][_y1];
						}
					}
					var __x1;
					var __y1;
					var hd2 = OurSonic.SonicManager.instance.sonicLevel.heightMaps[OurSonic.SonicManager.instance.sonicLevel.collisionIndexes2[tp1.block]];
					if (ss.isNullOrUndefined(hd2)) {
						continue;
					}
					var mj1;
					var hd2Items = null;
					if (OurSonic.HeightMask.op_Implicit(hd2) === 0 || OurSonic.HeightMask.op_Implicit(hd2) === 1) {
						mj1 = ((OurSonic.HeightMask.op_Implicit(hd2) === 0) ? 0 : tp1.solid2);
						for (__y1 = 0; __y1 < 16; __y1++) {
							for (__x1 = 0; __x1 < 16; __x1++) {
								hb2[_x1 * 16 + __x1][_y1 * 16 + __y1] = mj1;
							}
						}
					}
					else {
						hd2Items = hd2.items;
					}
					for (__y1 = 0; __y1 < 16; __y1++) {
						for (__x1 = 0; __x1 < 16; __x1++) {
							var jx1 = 0;
							var jy1 = 0;
							if (tp1.xFlip) {
								if (tp1.yFlip) {
									jx1 = 15 - __x1;
									jy1 = 15 - __y1;
								}
								else {
									jx1 = 15 - __x1;
									jy1 = __y1;
								}
							}
							else if (tp1.yFlip) {
								jx1 = __x1;
								jy1 = 15 - __y1;
							}
							else {
								jx1 = __x1;
								jy1 = __y1;
							}
							if (!(OurSonic.HeightMask.op_Implicit(hd2) === 0 || OurSonic.HeightMask.op_Implicit(hd2) === 1)) {
								switch (tp1.solid2) {
									case 0: {
										hb2[_x1 * 16 + jx1][_y1 * 16 + jy1] = 0;
										break;
									}
									case 1:
									case 2:
									case 3: {
										hb2[_x1 * 16 + jx1][_y1 * 16 + jy1] = (OurSonic.HeightMask.itemsGood(hd2Items, __x1, __y1) ? tp1.solid2 : 0);
										break;
									}
								}
							}
							//imap[(x * 128 + _x * 16 + __x) + (y * 128 + _y * 16 + __y) * (SonicManager.Instance.SonicLevel.LevelWidth)] = tp.heightMask.angle;
						}
					}
				}
			}
		}
	},
	draw: function(canvas, scale, character, sensorResult) {
		var x = OurSonic.Help.floor(character.x) - OurSonic.SonicManager.instance.windowLocation.x;
		var y = OurSonic.Help.floor(character.y) - OurSonic.SonicManager.instance.windowLocation.y;
		canvas.beginPath();
		if (sensorResult && sensorResult.chosen) {
			canvas.strokeStyle = '#FFF76D';
			canvas.lineWidth = 4;
		}
		else {
			canvas.strokeStyle = this.color;
			canvas.lineWidth = 2;
		}
		switch (character.mode) {
			case 134: {
				canvas.moveTo((x + this.x1) * scale.x, (y + this.y1) * scale.y);
				canvas.lineTo((x + this.x2) * scale.x, (y + this.y2) * scale.y);
				break;
			}
			case 44: {
				canvas.moveTo((x - this.y1) * scale.x, (y + this.x1) * scale.y);
				canvas.lineTo((x - this.y2) * scale.x, (y + this.x2) * scale.y);
				break;
			}
			case 314: {
				canvas.moveTo((x - this.x1) * scale.x, (y - this.y1) * scale.y);
				canvas.lineTo((x - this.x2) * scale.x, (y - this.y2) * scale.y);
				break;
			}
			case 224: {
				canvas.moveTo((x + this.y1) * scale.x, (y - this.x1) * scale.y);
				canvas.lineTo((x + this.y2) * scale.x, (y - this.x2) * scale.y);
				break;
			}
		}
		canvas.closePath();
		canvas.stroke();
	},
	check: function(character) {
		var _y2 = (character.inAir ? this.y2 : this.y2);
		var m = null;
		var x = OurSonic.Help.floor(character.x);
		var y = OurSonic.Help.floor(character.y);
		switch (character.mode) {
			case 134: {
				m = this.$checkCollisionLineWrap(x + this.x1, x + this.x2, y + this.y1, y + _y2, this.ignoreSolid);
				break;
			}
			case 44: {
				m = this.$checkCollisionLineWrap(x - this.y1, x - _y2, y + this.x1, y + this.x2, this.ignoreSolid);
				break;
			}
			case 314: {
				m = this.$checkCollisionLineWrap(x - this.x1, x - this.x2, y - this.y1, y - _y2, this.ignoreSolid);
				break;
			}
			case 224: {
				m = this.$checkCollisionLineWrap(x + this.y1, x + _y2, y - this.x1, y - this.x2, this.ignoreSolid);
				break;
			}
		}
		if (ss.isValue(m)) {
			m.letter = this.letter;
			if (m.angle === 255 || m.angle === 0 || m.angle === 1) {
				if (character.mode === 134) {
					m.angle = 255;
				}
				if (character.mode === 44) {
					m.angle = 64;
				}
				if (character.mode === 314) {
					m.angle = 128;
				}
				if (character.mode === 224) {
					m.angle = 192;
				}
			}
		}
		return m;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SensorM
OurSonic.SensorM = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SensorManager
OurSonic.SensorManager = function() {
	this.sensors = null;
	this.sensorResults = null;
	this.sensors = {};
	this.sensorResults = {};
};
OurSonic.SensorManager.prototype = {
	addSensor: function(letter, sensor) {
		this.sensors[letter] = sensor;
		this.sensorResults[letter] = null;
		return sensor;
	},
	createVerticalSensor: function(letter, x, y1, y2, color, ignoreSolid) {
		return this.addSensor(letter, new OurSonic.Sensor(x, x, y1, y2, this, color, ignoreSolid, letter));
	},
	createHorizontalSensor: function(letter, y, x1, x2, color, ignoreSolid) {
		return this.addSensor(letter, new OurSonic.Sensor(x1, x2, y, y, this, color, ignoreSolid, letter));
	},
	check: function(character) {
		var none = false;
		var $t1 = Object.getObjectEnumerator(this.sensors);
		try {
			while ($t1.moveNext()) {
				var i = $t1.get_current();
				this.sensorResults[i.key] = i.value.check(character);
				none = none || ss.isValue(this.sensorResults[i.key]);
			}
		}
		finally {
			$t1.dispose();
		}
		return none;
	},
	getResult: function(mn) {
		return this.sensorResults[mn];
	},
	draw: function(canvas, scale, sonic) {
		var $t1 = Object.getObjectEnumerator(this.sensors);
		try {
			while ($t1.moveNext()) {
				var sensor = $t1.get_current();
				sensor.value.draw(canvas, scale, sonic, this.sensorResults[sensor.key]);
			}
		}
		finally {
			$t1.dispose();
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Sonic
OurSonic.Sonic = function() {
	this.myRec = null;
	this.obtainedRing = {};
	this.$oldSign = 0;
	this.$physicsVariables = null;
	this.$runningTick = 0;
	this.$sensorManager = null;
	this.sonicLastHitTick = 0;
	this.$sonicLevel = null;
	this.$ticking = 0;
	this.watcher = null;
	this.ticking = false;
	this.x = 0;
	this.y = 0;
	this.rings = 0;
	this.debugging = false;
	this.jumping = false;
	this.crouching = false;
	this.holdingLeft = false;
	this.holdingRight = false;
	this.holdingUp = false;
	this.xsp = 0;
	this.ysp = 0;
	this.gsp = 0;
	this.rolling = false;
	this.inAir = false;
	this.wasInAir = false;
	this.holdingJump = false;
	this.justHit = false;
	this.hLock = 0;
	this.mode = 0;
	this.facing = false;
	this.breaking = 0;
	this.ducking = false;
	this.spinDash = false;
	this.spinDashSpeed = 0;
	this.angle = 0;
	this.currentlyBall = false;
	this.spriteState = null;
	this.haltSmoke = null;
	this.wasJumping = false;
	this.watcher = new OurSonic.Watcher();
	this.$physicsVariables = OurSonic.SonicConstants.sonic();
	var sonicManager = OurSonic.SonicManager.instance;
	this.$sonicLevel = sonicManager.sonicLevel;
	this.x = this.$sonicLevel.startPositions[0].x;
	this.y = this.$sonicLevel.startPositions[0].y;
	this.$sensorManager = new OurSonic.SensorManager();
	this.haltSmoke = [];
	this.rings = 7;
	this.$sensorManager.createVerticalSensor('a', -9, 0, 36, '#F202F2', false);
	this.$sensorManager.createVerticalSensor('b', 9, 0, 36, '#02C2F2', false);
	this.$sensorManager.createVerticalSensor('c', -9, 0, -20, '#2D2C21', false);
	this.$sensorManager.createVerticalSensor('d', 9, 0, -20, '#C24222', false);
	this.$sensorManager.createHorizontalSensor('m1', 4, 0, -12, '#212C2E', false);
	this.$sensorManager.createHorizontalSensor('m2', 4, 0, 13, '#22Ffc1', false);
	this.spriteState = 'normal';
};
OurSonic.Sonic.prototype = {
	updateMode: function() {
		if (this.angle <= 34 || this.angle >= 222) {
			this.mode = 134;
		}
		else if (this.angle > 34 && this.angle < 89) {
			this.mode = 44;
		}
		else if (this.angle >= 89 && this.angle < 161) {
			this.mode = 314;
		}
		else if (this.angle > 161 && this.angle < 222) {
			this.mode = 224;
		}
		//        x = _H.floor(x);
		//        y = _H.floor(y);
		this.myRec = OurSonic.Rectangle.$ctor1(ss.Int32.trunc(this.x - 5), ss.Int32.trunc(this.y - 20), 10, 40);
		if (this.inAir) {
			this.mode = 134;
		}
	},
	tick: function(sonicLevel, scale) {
		if (this.debugging) {
			var debugSpeed = this.watcher.multiply(15);
			if (this.holdingRight) {
				this.x += debugSpeed;
			}
			if (this.holdingLeft) {
				this.x -= debugSpeed;
			}
			if (this.crouching) {
				this.y += debugSpeed;
			}
			if (this.holdingUp) {
				this.y -= debugSpeed;
			}
			var offset = OurSonic.Point.$ctor1(0, 0);
			// getOffsetFromImage();
			this.x = (sonicLevel.levelWidth * 128 + this.x) % (sonicLevel.levelWidth * 128) + offset.x;
			this.y = (sonicLevel.levelHeight * 128 + this.y) % (sonicLevel.levelHeight * 128) + offset.y;
			return;
		}
		this.updateMode();
		if (this.hLock > 0) {
			this.hLock--;
			this.holdingRight = false;
			this.holdingLeft = false;
		}
		if (this.inAir) {
			if (this.angle !== 255) {
				this.angle = (255 + (this.angle + ((this.angle > 127) ? 2 : -2))) % 255;
				if (this.angle >= 253 || this.angle <= 1) {
					this.angle = 255;
				}
			}
		}
		this.$effectPhysics();
		this.checkCollisionWithRings();
		this.$updateSprite();
		this.$sensorManager.check(this);
		var sensorM1 = this.$sensorManager.getResult('m1');
		var sensorM2 = this.$sensorManager.getResult('m2');
		var best = this.$getBestSensor(sensorM1, sensorM2, this.mode);
		if (ss.isValue(best)) {
			switch (this.mode) {
				case 134: {
					this.x = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? 12 : -12));
					this.gsp = 0;
					if (this.inAir) {
						this.xsp = 0;
					}
					break;
				}
				case 44: {
					this.y = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? 12 : -12));
					if (this.inAir) {
						this.xsp = 0;
					}
					break;
				}
				case 314: {
					this.x = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? -12 : 12));
					this.gsp = 0;
					if (this.inAir) {
						this.xsp = 0;
					}
					break;
				}
				case 224: {
					this.y = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? -12 : 12));
					this.gsp = 0;
					if (this.inAir) {
						this.xsp = 0;
					}
					break;
				}
			}
		}
		this.$sensorManager.check(this);
		var sensorA = this.$sensorManager.getResult('a');
		var sensorB = this.$sensorManager.getResult('b');
		var fy;
		var fx;
		var hSize = this.$getHalfImageSize();
		if (!this.inAir) {
			best = this.$getBestSensor(sensorA, sensorB, this.mode);
			if (ss.isNullOrUndefined(best)) {
				this.inAir = true;
			}
			else {
				this.justHit = false;
				switch (this.mode) {
					case 134: {
						best.chosen = true;
						this.angle = best.angle;
						this.y = fy = best.value - hSize.y;
						break;
					}
					case 44: {
						best.chosen = true;
						this.angle = best.angle;
						this.x = fx = best.value + hSize.x;
						break;
					}
					case 314: {
						best.chosen = true;
						this.angle = best.angle;
						this.y = fy = best.value + hSize.y;
						break;
					}
					case 224: {
						best.chosen = true;
						this.angle = best.angle;
						this.x = fx = best.value - hSize.x;
						break;
					}
				}
			}
			this.updateMode();
		}
		else {
			if (ss.isNullOrUndefined(sensorA) && ss.isNullOrUndefined(sensorB)) {
				this.inAir = true;
			}
			else if (ss.isValue(sensorA) && sensorA.value >= 0 && (ss.isValue(sensorB) && sensorB.value >= 0)) {
				if (sensorA.value < sensorB.value) {
					if (this.y + 20 >= sensorA.value) {
						this.angle = sensorA.angle;
						this.y = fy = sensorA.value - hSize.y;
						this.rolling = this.currentlyBall = false;
						this.inAir = false;
					}
				}
				else if (sensorB.value > -1) {
					if (this.y + 20 >= sensorB.value) {
						this.angle = sensorB.angle;
						this.y = fy = sensorB.value - hSize.y;
						this.rolling = this.currentlyBall = false;
						this.inAir = false;
					}
				}
			}
			else if (ss.isValue(sensorA) && sensorA.value > -1) {
				if (this.y + 20 >= sensorA.value) {
					this.angle = sensorA.angle;
					this.y = fy = sensorA.value - hSize.y;
					this.rolling = this.currentlyBall = false;
					this.inAir = false;
				}
			}
			else if (ss.isValue(sensorB) && sensorB.value > -1) {
				if (this.y + 20 >= sensorB.value) {
					this.angle = sensorB.angle;
					this.y = fy = sensorB.value - hSize.y;
					this.rolling = this.currentlyBall = false;
					this.inAir = false;
				}
			}
			this.updateMode();
			var cur = OurSonic.SonicManager.instance.spriteCache.sonicSprites[this.spriteState + scale.x + scale.y];
			var __h = ss.Int32.div(ss.Int32.div(cur.height, scale.y), 2);
			this.$sensorManager.check(this);
			var sensorC = this.$sensorManager.getResult('c');
			var sensorD = this.$sensorManager.getResult('d');
			if (ss.isNullOrUndefined(sensorC) && ss.isNullOrUndefined(sensorD)) {
			}
			else {
				if (ss.isValue(sensorD) && ss.isValue(sensorC) && (sensorC.value >= 0 && sensorD.value >= 0)) {
					if (sensorC.value < sensorD.value) {
						if (this.y + __h >= sensorC.value) {
							if (this.ysp < 0) {
								if (sensorC.angle > 64 && sensorC.angle < 192) {
									this.angle = sensorC.angle;
									this.gsp = this.ysp;
									this.inAir = false;
									this.wasInAir = false;
								}
								else {
									this.ysp = 0;
								}
								this.y = fy = sensorC.value + __h;
							}
						}
					}
					else if (this.y + __h >= sensorD.value) {
						if (this.ysp < 0) {
							if (sensorD.angle > 64 && sensorD.angle < 192) {
								this.angle = sensorD.angle;
								this.gsp = -this.ysp;
								this.inAir = false;
								this.wasInAir = false;
							}
							else {
								this.ysp = 0;
							}
							this.y = fy = sensorD.value + __h;
						}
					}
				}
				else if (ss.isValue(sensorC) && sensorC.value > -1) {
					if (this.y + __h >= sensorC.value) {
						if (this.ysp < 0) {
							if (sensorC.angle > 64 && sensorC.angle < 192) {
								this.angle = sensorC.angle;
								this.gsp = this.ysp;
								this.inAir = false;
								this.wasInAir = false;
							}
							else {
								this.ysp = 0;
							}
							this.y = fy = sensorC.value + __h;
						}
					}
				}
				else if (ss.isValue(sensorD) && sensorD.value > -1) {
					if (this.y + __h >= sensorD.value) {
						if (this.ysp < 0) {
							if (sensorD.angle > 64 && sensorD.angle < 192) {
								this.angle = sensorD.angle;
								this.gsp = -this.ysp;
								this.inAir = false;
								this.wasInAir = false;
							}
							else {
								this.ysp = 0;
							}
							this.y = fy = sensorD.value + __h;
						}
					}
				}
				this.updateMode();
			}
		}
	},
	$getBestSensor: function(sensor1, sensor2, mode) {
		if (ss.isNullOrUndefined(sensor1) && ss.isNullOrUndefined(sensor2)) {
			return null;
		}
		if (ss.isNullOrUndefined(sensor1)) {
			return sensor2;
		}
		if (ss.isNullOrUndefined(sensor2)) {
			return sensor1;
		}
		switch (mode) {
			case 134: {
				return ((sensor1.value < sensor2.value) ? sensor1 : sensor2);
			}
			case 44: {
				return ((sensor1.value > sensor2.value) ? sensor1 : sensor2);
			}
			case 314: {
				return ((sensor1.value > sensor2.value) ? sensor1 : sensor2);
			}
			case 224: {
				return ((sensor1.value < sensor2.value) ? sensor1 : sensor2);
			}
		}
		return null;
	},
	invulnerable: function() {
		var mc = OurSonic.SonicManager.instance.drawTickCount - this.sonicLastHitTick;
		if (mc < 120) {
			if (mc % 8 < 4) {
				return true;
			}
		}
		return false;
	},
	$getHalfImageSize: function() {
		return OurSonic.Point.$ctor1(20, 20);
		var scale = OurSonic.SonicManager.instance.scale;
		var cur = OurSonic.SonicManager.instance.spriteCache.sonicSprites[this.spriteState + scale.x + scale.y];
		var xSize = 0;
		var ySize = 0;
		switch (this.mode) {
			case 134: {
				ySize = ss.Int32.div(ss.Int32.div(cur.height, scale.y), 2);
				break;
			}
			case 44: {
				xSize = ss.Int32.div(ss.Int32.div(cur.width, scale.x), 2);
				break;
			}
			case 314: {
				ySize = ss.Int32.div(ss.Int32.div(cur.height, scale.y), 2);
				break;
			}
			case 224: {
				xSize = ss.Int32.div(ss.Int32.div(cur.width, scale.x), 2);
				break;
			}
		}
		return OurSonic.Point.$ctor1(xSize, ySize);
	},
	$getOffsetFromImage: function() {
		var scale = OurSonic.SonicManager.instance.scale;
		var cur = OurSonic.SonicManager.instance.spriteCache.sonicSprites[this.spriteState + scale.x + scale.y];
		var xOffset = 0;
		var yOffset = 0;
		if (cur.height !== 40 * scale.x) {
			var n;
			switch (this.mode) {
				case 134: {
					n = 0;
					yOffset = ss.Int32.div(40 - ss.Int32.div(cur.height + n, scale.y), 2);
					break;
				}
				case 44: {
					n = 15;
					xOffset = ss.Int32.div(-(40 - ss.Int32.div(cur.height + n, scale.x)), 2);
					break;
				}
				case 314: {
					n = 8;
					yOffset = ss.Int32.div(-(40 - ss.Int32.div(cur.height + n, scale.y)), 2);
					break;
				}
				case 224: {
					n = 9;
					xOffset = ss.Int32.div(40 - ss.Int32.div(cur.height + n, scale.x), 2);
					break;
				}
			}
		}
		return OurSonic.Point.$ctor1(xOffset, yOffset);
	},
	$updateSprite: function() {
		var absgsp = Math.abs(this.gsp);
		var word = this.spriteState.substring(0, this.spriteState.length - 1);
		var j = parseInt(this.spriteState.substring(this.spriteState.length - 1, this.spriteState.length));
		if (this.breaking > 0) {
			if (this.gsp > 0 || this.gsp === 0 || this.spriteState === 'breaking3') {
				this.facing = false;
				this.breaking = 0;
			}
		}
		else if (this.breaking < 0) {
			if (this.gsp < 0 || this.gsp === 0 || this.spriteState === 'breaking3') {
				this.breaking = 0;
				this.facing = true;
			}
		}
		var epsilon = 1E-05;
		if (this.justHit) {
			if (word !== 'hit') {
				this.spriteState = 'hit0';
				this.$runningTick = 1;
			}
			else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0) {
				this.spriteState = 'hit1';
			}
		}
		else if (this.spinDash) {
			if (word !== 'spindash') {
				this.spriteState = 'spindash0';
				this.$runningTick = 1;
			}
			else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(2 - absgsp)) === 0) {
				this.spriteState = 'spindash' + (j + 1) % 6;
			}
		}
		else if (Math.abs(absgsp - 0) < epsilon && this.inAir === false) {
			if (this.ducking) {
				if (word !== 'duck') {
					this.spriteState = 'duck0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(4 - absgsp)) === 0) {
					this.spriteState = 'duck1';
				}
			}
			else if (this.holdingUp) {
				if (word !== 'lookingup') {
					this.spriteState = 'lookingup0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(4 - absgsp)) === 0) {
					this.spriteState = 'lookingup1';
				}
			}
			else {
				this.spriteState = 'normal';
				this.currentlyBall = false;
				this.rolling = false;
				this.$runningTick = 0;
			}
		}
		else if (this.breaking !== 0) {
			if (word !== 'breaking') {
				this.spriteState = 'breaking0';
				this.$runningTick = 1;
			}
			else if (this.$runningTick++ % 7 === 0) {
				this.spriteState = 'breaking' + (j + 1) % 4;
				if (j === 0) {
					this.haltSmoke.add(OurSonic.Point.$ctor1(ss.Int32.trunc(this.x), ss.Int32.trunc(this.y)));
				}
			}
		}
		else if (this.currentlyBall) {
			if (word !== 'balls') {
				this.spriteState = 'balls0';
				this.$runningTick = 1;
			}
			else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0 || 8 - absgsp < 1) {
				this.spriteState = 'balls' + (j + 1) % 5;
			}
		}
		else if (absgsp < 6) {
			if (word !== 'running') {
				this.spriteState = 'running0';
				this.$runningTick = 1;
			}
			else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0 || 8 - absgsp < 1) {
				this.spriteState = 'running' + (j + 1) % 8;
			}
		}
		else if (absgsp >= 6) {
			if (word !== 'fastrunning') {
				this.spriteState = 'fastrunning0';
				this.$runningTick = 1;
			}
			else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0 || 8 - absgsp < 1) {
				this.spriteState = 'fastrunning' + (j + 1) % 4;
			}
		}
	},
	$effectPhysics: function() {
		//watcher.tick();
		var physics = this.$physicsVariables;
		var max = physics.topSpeed;
		if (!this.jumping) {
			if (!this.inAir && this.wasJumping) {
				this.wasJumping = false;
			}
		}
		if (this.inAir && !this.wasInAir) {
			this.wasInAir = true;
			var offset = this.$getOffsetFromImage();
			//  X += offset.X;
			//  Y += offset.Y;
			//if ((angle >= 0x70 && angle <= 0x90)) {
			//xsp = (gsp);
			//}
		}
		if (!this.inAir && this.wasInAir) {
			this.wasInAir = false;
			if (this.angle >= 240 || this.angle <= 15) {
				this.gsp = this.xsp;
			}
			else if (this.angle > 226 && this.angle <= 239 || this.angle >= 16 && this.angle <= 31) {
				this.gsp = this.ysp;
			}
			else if (this.angle >= 192 && this.angle <= 226) {
				this.gsp = -this.ysp;
			}
			else if (this.angle >= 32 && this.angle <= 63) {
				this.gsp = this.ysp;
			}
			this.xsp = 0;
			this.ysp = 0;
		}
		if (!this.inAir && !this.rolling) {
			if (!this.holdingLeft && !this.holdingRight && !this.justHit) {
				//friction
				this.gsp -= Math.min(Math.abs(this.gsp), this.watcher.multiply(physics.frc)) * ((this.gsp > 0) ? 1 : -1);
			}
			this.$oldSign = OurSonic.Help.sign(this.gsp);
			//slope
			this.gsp += this.watcher.multiply(physics.slp) * -OurSonic.Help.sin(this.angle);
			if (this.$oldSign !== OurSonic.Help.sign(this.gsp) && this.$oldSign !== 0) {
				this.hLock = 30;
			}
			if (this.holdingRight && !this.holdingLeft && !this.justHit) {
				this.facing = true;
				if (this.gsp >= 0) {
					//accelerate 
					this.gsp += this.watcher.multiply(physics.acc);
					if (this.gsp > max) {
						this.gsp = max;
					}
				}
				else {
					//decelerate 
					this.gsp += this.watcher.multiply(physics.dec);
					if (Math.abs(this.gsp) > 4.5) {
						this.facing = false;
						this.breaking = 1;
						this.$runningTick = 0;
					}
				}
			}
			if (this.holdingLeft && !this.holdingRight && !this.justHit) {
				this.facing = false;
				if (this.gsp <= 0) {
					//accelerate 
					this.gsp -= this.watcher.multiply(physics.acc);
					if (this.gsp < -max) {
						this.gsp = -max;
					}
				}
				else {
					//decelerate 
					this.gsp -= this.watcher.multiply(physics.dec);
					if (Math.abs(this.gsp) > 4.5) {
						this.facing = true;
						this.breaking = -1;
						this.$runningTick = 0;
					}
				}
			}
		}
		this.ducking = false;
		if (this.crouching) {
			if (Math.abs(this.gsp) > 1.03125) {
				this.rolling = true;
				this.currentlyBall = true;
			}
			else {
				this.ducking = true;
			}
		}
		else if (this.spinDash) {
			this.gsp = (8 + ss.Int32.div(OurSonic.Help.floor(this.spinDashSpeed), 2)) * (this.facing ? 1 : -1);
			this.spinDash = false;
			this.rolling = true;
			this.currentlyBall = true;
		}
		if (!this.inAir && this.rolling) {
			//dec  
			if (this.holdingLeft && !this.justHit) {
				if (this.gsp > 0) {
					if (this.rolling) {
						this.gsp = OurSonic.Help.max(0, this.gsp - this.watcher.multiply(physics.rdec));
					}
				}
			}
			if (this.holdingRight && !this.justHit) {
				if (this.gsp < 0) {
					if (this.rolling) {
						this.gsp = OurSonic.Help.min(0, this.gsp + this.watcher.multiply(physics.rdec));
					}
				}
			}
			//friction
			this.gsp -= Math.min(Math.abs(this.gsp), this.watcher.multiply(physics.rfrc)) * ((this.gsp > 0) ? 1 : -1);
			this.$oldSign = OurSonic.Help.sign(this.gsp);
			//slope
			var ang = OurSonic.Help.sin(this.angle);
			if (ang > 0 === this.gsp > 0) {
				this.gsp += this.watcher.multiply(-physics.slpRollingUp) * ang;
			}
			else {
				this.gsp += this.watcher.multiply(-physics.slpRollingDown) * ang;
			}
			if (this.gsp > max * 2.5) {
				this.gsp = max * 2.5;
			}
			if (this.gsp < -max * 2.5) {
				this.gsp = -max * 2.5;
			}
			if (this.$oldSign !== OurSonic.Help.sign(this.gsp) && this.$oldSign !== 0) {
				this.hLock = 30;
			}
			if (Math.abs(this.gsp) < 0.53125) {
				this.rolling = false;
				this.currentlyBall = false;
			}
		}
		this.checkCollisionWithRings();
		if (this.inAir) {
			if (this.holdingRight && !this.holdingLeft && !this.justHit) {
				this.facing = true;
				if (this.xsp >= 0) {
					//accelerate 
					this.xsp += this.watcher.multiply(physics.air);
					if (this.xsp > max) {
						this.xsp = max;
					}
				}
				else {
					//decelerate 
					this.xsp += this.watcher.multiply(physics.air);
				}
			}
			if (this.holdingLeft && !this.holdingRight && !this.justHit) {
				this.facing = false;
				if (this.xsp <= 0) {
					//accelerate 
					this.xsp -= this.watcher.multiply(physics.air);
					if (this.xsp < -max) {
						this.xsp = -max;
					}
				}
				else {
					//decelerate 
					this.xsp -= this.watcher.multiply(physics.air);
				}
			}
			if (this.wasInAir) {
				if (this.jumping) {
				}
				else {
				}
			}
			//gravity
			this.ysp += (this.justHit ? 0.1875 : physics.grv);
			//drag
			if (this.ysp < 0 && this.ysp > -4) {
				if (Math.abs(this.xsp) > 0.125) {
					this.xsp *= 0.96875;
				}
			}
			if (this.ysp > 16) {
				this.ysp = 16;
			}
		}
		if (this.wasInAir && this.jumping) {
		}
		else if (this.jumping && !this.wasJumping) {
			this.wasJumping = true;
			if (this.ducking) {
				this.spinDash = true;
				this.spinDashSpeed += 2;
				if (this.spinDashSpeed > 8) {
					this.spinDashSpeed = 8;
				}
				this.spriteState = 'spindash0';
			}
			else {
				this.inAir = true;
				this.currentlyBall = true;
				this.xsp = physics.jmp * OurSonic.Help.sin(this.angle) + this.gsp * OurSonic.Help.cos(this.angle);
				this.ysp = physics.jmp * OurSonic.Help.cos(this.angle);
				if (Math.abs(this.xsp) < 0.17) {
					this.xsp = 0;
				}
			}
		}
		if (!this.inAir) {
			if (this.spinDash) {
				this.gsp = 0;
			}
			this.xsp = this.gsp * OurSonic.Help.cos(this.angle);
			this.ysp = this.gsp * -OurSonic.Help.sin(this.angle);
			if (Math.abs(this.gsp) < 2.5 && this.mode !== 134) {
				if (this.mode === 224) {
					this.x += 0;
				}
				else if (this.mode === 44) {
					this.x += 0;
				}
				else if (this.mode === 314) {
					this.y += 0;
				}
				var oldMode = this.mode;
				this.updateMode();
				//Gsp = 0;NO
				this.mode = 134;
				this.hLock = 30;
				this.inAir = true;
			}
		}
		if (this.xsp > 0 && this.xsp < 0.008) {
			this.gsp = 0;
			this.xsp = 0;
		}
		if (this.xsp < 0 && this.xsp > -0.008) {
			this.gsp = 0;
			this.xsp = 0;
		}
		this.x = (this.$sonicLevel.levelWidth * 128 + (this.x + this.xsp)) % (this.$sonicLevel.levelWidth * 128);
		this.y = (this.$sonicLevel.levelHeight * 128 + (this.y + this.ysp)) % (this.$sonicLevel.levelHeight * 128);
	},
	draw: function(canvas, scale) {
		var fx = this.x;
		var fy = this.y;
		if (this.invulnerable()) {
			return;
		}
		var cur = OurSonic.SonicManager.instance.spriteCache.sonicSprites[this.spriteState + scale.x + scale.y];
		if (ss.isNullOrUndefined(cur)) {
		}
		if (OurSonic.Help.loaded(cur)) {
			canvas.save();
			var offset = this.$getOffsetFromImage();
			canvas.translate((fx - OurSonic.SonicManager.instance.windowLocation.x + offset.x) * scale.x, (fy - OurSonic.SonicManager.instance.windowLocation.y + offset.y) * scale.y);
			if (true || OurSonic.SonicManager.instance.showHeightMap) {
				canvas.save();
				var mul = 6;
				var xj = this.xsp * scale.x * mul;
				var yj = this.ysp * scale.y * mul;
				canvas.beginPath();
				canvas.moveTo(0, 0);
				canvas.lineTo(xj, yj);
				canvas.fillStyle = 'rgba(163,241,255,0.8)';
				canvas.arc(xj, yj, 5, 0, 2 * Math.PI, true);
				canvas.closePath();
				canvas.lineWidth = 6;
				canvas.strokeStyle = 'white';
				//6C6CFC
				canvas.stroke();
				canvas.lineWidth = 3;
				canvas.strokeStyle = '#2448D8';
				//6C6CFC
				canvas.fill();
				canvas.stroke();
				canvas.restore();
			}
			if (!this.facing) {
				//canvas.translate(cur.width, 0);
				canvas.scale(-1, 1);
				if (!this.currentlyBall && !this.spinDash) {
					canvas.rotate(-OurSonic.Help.fixAngle(this.angle));
				}
				canvas.drawImage(cur, ss.Int32.div(-cur.width, 2), ss.Int32.div(-cur.height, 2));
				if (this.spinDash) {
					canvas.drawImage(OurSonic.SonicManager.instance.spriteCache.sonicSprites['spinsmoke' + ss.Int32.div(OurSonic.SonicManager.instance.drawTickCount % 14, 2) + scale.x + scale.y], ss.Int32.div(-cur.width, 2) - 25 * scale.x, ss.Int32.div(-cur.height, 2) + offset.y * scale.y - 14, cur.width, cur.height);
				}
			}
			else {
				if (!this.currentlyBall && !this.spinDash) {
					canvas.rotate(OurSonic.Help.fixAngle(this.angle));
				}
				canvas.drawImage(cur, ss.Int32.div(-cur.width, 2), ss.Int32.div(-cur.height, 2));
				if (this.spinDash) {
					canvas.drawImage(OurSonic.SonicManager.instance.spriteCache.sonicSprites['spinsmoke' + ss.Int32.div(OurSonic.SonicManager.instance.drawTickCount % 14, 2) + scale.x + scale.y], ss.Int32.div(-cur.width, 2) - 25 * scale.x, ss.Int32.div(-cur.height, 2) + offset.y * scale.y - 14, cur.width, cur.height);
				}
			}
			//
			//               canvas.moveTo(-10 * scale.x, 4 * scale.y);
			//
			//               canvas.lineTo(10 * scale.x, 4 * scale.y);
			//
			//               canvas.lineWidth = 3;
			//
			//               canvas.strokeStyle = "#FFF";
			//
			//               canvas.stroke();
			//
			//               
			//
			//               canvas.moveTo(-9 * scale.x, 0 * scale.y);
			//
			//               canvas.lineTo(-9 * scale.x, 20 * scale.y);
			//
			//               canvas.lineWidth = 3;
			//
			//               canvas.strokeStyle = "#FFF";
			//
			//               canvas.stroke();
			//
			//               
			//
			//               canvas.moveTo(9 * scale.x, 0 * scale.y);
			//
			//               canvas.lineTo(9 * scale.x, 20 * scale.y);
			//
			//               canvas.lineWidth = 3;
			//
			//               canvas.strokeStyle = "#FFF";
			//
			//               canvas.stroke();
			//
			//                canvas.strokeStyle = "#FFF";
			//
			//                canvas.lineWidth = 4;
			//
			//                canvas.strokeRect(-cur.width / 2, -cur.height / 2, cur.width, cur.height);
			canvas.restore();
			if (OurSonic.SonicManager.instance.showHeightMap) {
				this.$sensorManager.draw(canvas, scale, this);
			}
			for (var i = 0; i < this.haltSmoke.length; i++) {
				var lo = this.haltSmoke[i];
				canvas.drawImage(OurSonic.SonicManager.instance.spriteCache.sonicSprites['haltsmoke' + ss.Int32.div(OurSonic.SonicManager.instance.drawTickCount % 24, 6) + scale.x + scale.y], (lo.x - OurSonic.SonicManager.instance.windowLocation.x - 25) * scale.x, (lo.y + 12 - OurSonic.SonicManager.instance.windowLocation.y + offset.y) * scale.y);
				if (ss.Int32.div((OurSonic.SonicManager.instance.drawTickCount + 6) % 24, 6) === 0) {
					this.haltSmoke = this.haltSmoke.extract(i, 1);
				}
			}
		}
	},
	drawUI: function(canvas, pos, scale) {
		if (canvas.font !== '13pt Arial bold') {
			canvas.font = '13pt Arial bold';
		}
		canvas.fillStyle = 'White';
		canvas.fillText('Rings: ' + this.rings, pos.x + 90, pos.y + 45);
		canvas.fillText('Angle: ' + this.angle.toString(16), pos.x + 90, pos.y + 75);
		canvas.fillText('Position: ' + this.x + ', ' + this.y, pos.x + 90, pos.y + 105);
		canvas.fillText('Speed: g: ' + this.gsp.toFixed(3) + ' x:' + this.xsp.toFixed(3) + ' y:' + this.ysp.toFixed(3), pos.x + 90, pos.y + 135);
		canvas.fillText('Mode: ' + this.mode.toString(), pos.x + 90, pos.y + 165);
		if (this.inAir) {
			canvas.fillText('Air ', pos.x + 220, pos.y + 45);
		}
		if (this.hLock > 0) {
			canvas.fillText('HLock: ' + this.hLock, pos.x + 90, pos.y + 195);
		}
	},
	hit: function(x, y) {
		if (OurSonic.SonicManager.instance.drawTickCount - this.sonicLastHitTick < 120) {
			return;
		}
		this.justHit = true;
		this.ysp = -4;
		this.xsp = 2 * ((this.x - x < 0) ? -1 : 1);
		this.sonicLastHitTick = OurSonic.SonicManager.instance.drawTickCount;
		var t = 0;
		var angle = 101.25;
		var n = false;
		var speed = 4;
		while (t < this.rings) {
			var ring = OurSonic.Level.Ring.$ctor(true);
			OurSonic.SonicManager.instance.activeRings.add(ring);
			ring.x = ss.Int32.trunc(this.x);
			ring.y = ss.Int32.trunc(this.y) - 10;
			ring.ysp = -Math.sin(angle) * speed;
			ring.xsp = Math.cos(angle) * speed;
			if (n) {
				ring.ysp *= -1;
				angle += 22.5;
			}
			n = !n;
			t++;
			if (t === 16) {
				speed = 2;
				angle = 101.25;
			}
		}
		this.rings = 0;
	},
	debug: function() {
		this.debugging = !this.debugging;
		this.xsp = 0;
		this.gsp = 0;
		this.ysp = 0;
		this.spriteState = 'normal';
	},
	pressUp: function() {
		this.holdingUp = true;
	},
	releaseUp: function() {
		this.holdingUp = false;
	},
	pressCrouch: function() {
		this.crouching = true;
	},
	releaseCrouch: function() {
		this.crouching = false;
	},
	pressLeft: function() {
		this.holdingLeft = true;
	},
	releaseLeft: function() {
		this.holdingLeft = false;
	},
	pressRight: function() {
		this.holdingRight = true;
	},
	releaseRight: function() {
		this.holdingRight = false;
	},
	pressJump: function() {
		this.jumping = true;
	},
	releaseJump: function() {
		this.jumping = false;
	},
	checkCollisionWithObjects: function(x, y, letter) {
		var me = OurSonic.Point.$ctor1(x, y);
		var levelObjectInfos = OurSonic.SonicManager.instance.inFocusObjects;
		for (var index = 0; index < levelObjectInfos.length; index++) {
			var ob = levelObjectInfos[index];
			var dj = ob.collides(me);
			var dj2 = ob.hurtsSonic(me);
			if (dj) {
				return ob.collide(this, letter, dj);
			}
			if (dj2) {
				return ob.hurtSonic(this, letter, dj2);
			}
		}
		return false;
	},
	checkCollisionWithRings: function() {
		var me = this.myRec;
		var rectangle = OurSonic.Rectangle.$ctor1(0, 0, 16, 16);
		var rings = OurSonic.SonicManager.instance.sonicLevel.rings;
		for (var index = 0; index < rings.length; index++) {
			var ring = rings[index];
			var pos = ring;
			if (this.obtainedRing[index]) {
				continue;
			}
			rectangle.x = pos.x - 8;
			rectangle.y = pos.y - 8;
			if (OurSonic.IntersectingRectangle.intersectRect(me, rectangle)) {
				this.rings++;
				this.obtainedRing[index] = true;
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicBackground
OurSonic.SonicBackground = function() {
	this.width = 0;
	this.height = 0;
};
OurSonic.SonicBackground.prototype = {
	draw: function(canvas, point, scale, wOffset) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicConstants
OurSonic.SonicConstants = function() {
	this.acc = 0;
	this.air = 0;
	this.dec = 0;
	this.frc = 0;
	this.grv = 0;
	this.jmp = 0;
	this.rdec = 0;
	this.rfrc = 0;
	this.slp = 0;
	this.slpRollingDown = 0;
	this.slpRollingUp = 0;
	this.topSpeed = 0;
};
OurSonic.SonicConstants.sonic = function() {
	var $t1 = new OurSonic.SonicConstants();
	$t1.acc = 0.046875;
	$t1.dec = 0.5;
	$t1.slp = 0.125;
	$t1.frc = 0.046875;
	$t1.rdec = 0.125;
	$t1.rfrc = 0.0234375;
	$t1.slpRollingUp = 0.078125;
	$t1.slpRollingDown = 0.3125;
	$t1.jmp = -6.5;
	$t1.grv = 0.21875;
	$t1.air = 0.09375;
	$t1.topSpeed = 6;
	var sc = $t1;
	return sc;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicEngine
OurSonic.SonicEngine = function() {
	this.canvasHeight = 0;
	this.canvasWidth = 0;
	this.client = null;
	this.$fullscreenMode = false;
	this.$gameCanvas = null;
	this.$gameCanvasName = 'gameLayer';
	this.$lastMouseMove = null;
	this.sonicManager = null;
	this.$uiCanvas = null;
	this.$uiCanvasName = 'uiLayer';
	OurSonic.SonicEngine.instance = this;
	//var pl = @"";
	//Window.Instance.Me().console.log(new Compressor().CompressText(pl));
	var gameCanvasItem = $(String.format('#{0}', this.$gameCanvasName));
	this.$gameCanvas = new OurSonic.CanvasInformation(gameCanvasItem[0].getContext('2d'), gameCanvasItem);
	var uiCanvasItem = $(String.format('#{0}', this.$uiCanvasName));
	this.$uiCanvas = new OurSonic.CanvasInformation(uiCanvasItem[0].getContext('2d'), uiCanvasItem);
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.$uiCanvas.domCanvas.mousedown(Function.mkdel(this, this.$canvasOnClick));
	this.$uiCanvas.domCanvas.mouseup(Function.mkdel(this, this.$canvasMouseUp));
	this.$uiCanvas.domCanvas.mousemove(Function.mkdel(this, this.$canvasMouseMove));
	this.$uiCanvas.domCanvas.bind('touchstart', Function.mkdel(this, this.$canvasOnClick));
	this.$uiCanvas.domCanvas.bind('touchend', Function.mkdel(this, this.$canvasMouseUp));
	this.$uiCanvas.domCanvas.bind('touchmove', Function.mkdel(this, this.$canvasMouseMove));
	this.$uiCanvas.domCanvas.bind('DOMMouseScroll', Function.mkdel(this, this.$handleScroll));
	this.$uiCanvas.domCanvas.bind('mousewheel', Function.mkdel(this, this.$handleScroll));
	this.$uiCanvas.domCanvas.bind('contextmenu', function(e) {
		e.preventDefault();
	});
	$(document).keydown(Function.mkdel(this, function(e1) {
		if (this.sonicManager.currentGameState === 1) {
			this.sonicManager.uiManager.onKeyDown(e1);
		}
	}));
	KeyboardJS.bind.key('f', Function.mkdel(this, function() {
		this.sonicManager.showHeightMap = !this.sonicManager.showHeightMap;
	}), function() {
	});
	KeyboardJS.bind.key('o', Function.mkdel(this, function() {
		if (this.sonicManager.currentGameState === 0) {
			this.sonicManager.inHaltMode = !this.sonicManager.inHaltMode;
		}
	}), function() {
	});
	var levelIndex = 0;
	this.client = io.connect('50.116.22.241:8998');
	this.client.on('SonicLevel', Function.mkdel(this, function(data) {
		this.sonicManager.load(data.Data);
		this.sonicManager.windowLocation.x = 0;
		this.sonicManager.windowLocation.y = 0;
		this.sonicManager.bigWindowLocation.x = ss.Int32.trunc(this.sonicManager.windowLocation.x - this.sonicManager.windowLocation.width * 0.2);
		this.sonicManager.bigWindowLocation.y = ss.Int32.trunc(this.sonicManager.windowLocation.y - this.sonicManager.windowLocation.height * 0.2);
		this.sonicManager.bigWindowLocation.width = ss.Int32.trunc(this.sonicManager.windowLocation.width * 1.8);
		this.sonicManager.bigWindowLocation.height = ss.Int32.trunc(this.sonicManager.windowLocation.height * 1.8);
		this.sonicManager.clearCache();
		if (this.sonicManager.currentGameState === 0) {
			this.$runGame();
		}
		this.$runGame();
	}));
	this.client.on('GetObjects.Response', Function.mkdel(this, function(data1) {
		this.sonicManager.loadObjects(data1.Data);
	}));
	KeyboardJS.bind.key('2', Function.mkdel(this, function() {
		this.client.emit('GetSonicLevel', '0');
	}), function() {
	});
	this.client.emit('GetSonicLevel', '0');
	KeyboardJS.bind.key('1', Function.mkdel(this, function() {
		this.sonicManager.indexedPalette++;
		this.sonicManager.clearCache();
	}), function() {
	});
	KeyboardJS.bind.key('q', Function.mkdel(this, function() {
		this.$runGame();
	}), function() {
	});
	KeyboardJS.bind.key('p', Function.mkdel(this, function() {
		if (this.sonicManager.currentGameState === 0) {
			if (this.sonicManager.inHaltMode) {
				this.sonicManager.waitingForTickContinue = false;
			}
		}
	}), function() {
	});
	KeyboardJS.bind.key('h', Function.mkdel(this, function() {
		if (this.sonicManager.currentGameState === 0) {
			this.sonicManager.sonicToon.hit(this.sonicManager.sonicToon.x, this.sonicManager.sonicToon.y);
		}
	}), function() {
	});
	KeyboardJS.bind.key('c', Function.mkdel(this, function() {
		if (this.sonicManager.currentGameState === 0) {
			this.sonicManager.sonicToon.debug();
		}
	}), function() {
	});
	KeyboardJS.bind.key('up', Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.pressUp();
				break;
			}
			case 1: {
				this.sonicManager.windowLocation.y -= 128;
				this.sonicManager.bigWindowLocation.y -= 128;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.releaseUp();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('down', Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.pressCrouch();
				break;
			}
			case 1: {
				this.sonicManager.windowLocation.y += 128;
				this.sonicManager.bigWindowLocation.y += 128;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.releaseCrouch();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('left', Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.pressLeft();
				break;
			}
			case 1: {
				this.sonicManager.windowLocation.x -= 128;
				this.sonicManager.bigWindowLocation.x -= 128;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.releaseLeft();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('right', Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.pressRight();
				break;
			}
			case 1: {
				this.sonicManager.windowLocation.x += 128;
				this.sonicManager.bigWindowLocation.x += 128;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.releaseRight();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('space', Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.pressJump();
				break;
			}
			case 1: {
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.sonicToon.releaseJump();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('e', Function.mkdel(this, function() {
		this.sonicManager.sonicLevel.curHeightMap = !this.sonicManager.sonicLevel.curHeightMap;
	}), function() {
	});
	this.$fullscreenMode = true;
	window.addEventListener('resize', Function.mkdel(this, function(e2) {
		this.resizeCanvas();
	}));
	$(document).resize(Function.mkdel(this, function(e3) {
		this.resizeCanvas();
	}));
	this.sonicManager = new OurSonic.SonicManager(this, this.$gameCanvas, Function.mkdel(this, this.resizeCanvas));
	this.sonicManager.indexedPalette = 0;
	window.setInterval(Function.mkdel(this.sonicManager, this.sonicManager.tick), 16);
	window.setInterval(Function.mkdel(this, this.gameDraw), 16);
	window.setInterval(Function.mkdel(this, this.uiDraw), 50);
	this.resizeCanvas();
};
OurSonic.SonicEngine.prototype = {
	$runGame: function() {
		switch (this.sonicManager.currentGameState) {
			case 0: {
				this.sonicManager.currentGameState = 1;
				this.sonicManager.windowLocation = OurSonic.Constants.defaultWindowLocation(this.sonicManager.currentGameState, this.$gameCanvas, this.sonicManager.scale);
				this.sonicManager.sonicToon = null;
				break;
			}
			case 1: {
				this.sonicManager.currentGameState = 0;
				this.sonicManager.windowLocation = OurSonic.Constants.defaultWindowLocation(this.sonicManager.currentGameState, this.$gameCanvas, this.sonicManager.scale);
				this.sonicManager.sonicToon = new OurSonic.Sonic();
				break;
			}
		}
	},
	$handleScroll: function(jQueryEvent) {
		jQueryEvent.preventDefault();
		var j = ss.Nullable.unbox(Type.cast((!!jQueryEvent.detail ? (jQueryEvent.detail * -120) : jQueryEvent.wheelDelta), ss.Int32));
		var rate = ((j < 0) ? -1 : 1);
		this.sonicManager.scale.x += rate;
		this.sonicManager.scale.y += rate;
		this.sonicManager.clearCache();
		this.sonicManager.preloadSprites(this.sonicManager.scale, function() {
		}, function(a) {
		});
		this.sonicManager.uiManager.onMouseScroll(jQueryEvent);
	},
	$canvasMouseMove: function(queryEvent) {
		queryEvent.preventDefault();
		document.body.style.cursor = 'default';
		this.$lastMouseMove = queryEvent;
		if (this.sonicManager.uiManager.onMouseMove(queryEvent)) {
			return;
		}
		return;
	},
	$canvasOnClick: function(queryEvent) {
		queryEvent.preventDefault();
		if (this.sonicManager.uiManager.onClick(queryEvent)) {
			return;
		}
		if (this.sonicManager.onClick(queryEvent)) {
			return;
		}
	},
	$canvasMouseUp: function(queryEvent) {
		queryEvent.preventDefault();
		this.sonicManager.uiManager.onMouseUp(this.$lastMouseMove);
	},
	resizeCanvas: function() {
		this.canvasWidth = $(window).width();
		this.canvasHeight = $(window).height();
		this.$uiCanvas.domCanvas.attr('width', this.canvasWidth.toString());
		this.$uiCanvas.domCanvas.attr('height', this.canvasHeight.toString());
		this.sonicManager.windowLocation = OurSonic.Constants.defaultWindowLocation(this.sonicManager.currentGameState, this.$uiCanvas, this.sonicManager.scale);
		this.sonicManager.realScale = (!this.$fullscreenMode ? OurSonic.Point.$ctor1(1, 1) : OurSonic.Point.$ctor1(ss.Int32.div(ss.Int32.div(this.canvasWidth, 320), this.sonicManager.scale.x), ss.Int32.div(ss.Int32.div(this.canvasHeight, 224), this.sonicManager.scale.y)));
		this.$gameCanvas.domCanvas.attr('width', (this.sonicManager.windowLocation.width * ((this.sonicManager.currentGameState === 0) ? (this.sonicManager.scale.x * this.sonicManager.realScale.x) : 1)).toString());
		this.$gameCanvas.domCanvas.attr('height', (this.sonicManager.windowLocation.height * ((this.sonicManager.currentGameState === 0) ? (this.sonicManager.scale.y * this.sonicManager.realScale.y) : 1)).toString());
		var screenOffset = ((this.sonicManager.currentGameState === 0) ? OurSonic.Point.$ctor1(ss.Int32.div(this.canvasWidth, 2) - ss.Int32.div(this.sonicManager.windowLocation.width * this.sonicManager.scale.x * this.sonicManager.realScale.x, 2), ss.Int32.div(this.canvasHeight, 2) - ss.Int32.div(this.sonicManager.windowLocation.height * this.sonicManager.scale.y * this.sonicManager.realScale.y, 2)) : OurSonic.Point.$ctor1(0, 0));
		this.$gameCanvas.domCanvas.css('left', OurSonic.Help.toPx(screenOffset.x));
		this.$gameCanvas.domCanvas.css('top', OurSonic.Help.toPx(screenOffset.y));
	},
	clear: function(canv) {
		canv.domCanvas[0].width = this.$gameCanvas.domCanvas.width();
	},
	gameDraw: function() {
		if (!this.sonicManager.inHaltMode) {
			this.clear(this.$gameCanvas);
		}
		this.sonicManager.draw(this.$gameCanvas.context);
	},
	uiDraw: function() {
		if (!this.sonicManager.inHaltMode) {
			this.clear(this.$uiCanvas);
		}
		this.sonicManager.uiManager.draw(this.$uiCanvas.context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicImage
OurSonic.SonicImage = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicLevel
OurSonic.SonicLevel = function() {
	this.animations = null;
	this.animatedFiles = null;
	this.chunkMap = null;
	this.activeRings = null;
	this.rings = null;
	this.curHeightMap = false;
	this.levelWidth = 0;
	this.levelHeight = 0;
	this.chunks = null;
	this.tiles = null;
	this.blocks = null;
	this.objects = null;
	this.paletteItems = null;
	this.palette = null;
	this.palAn = null;
	this.startPositions = null;
	this.curPaletteIndex = 0;
	this.angles = null;
	this.collisionIndexes1 = null;
	this.collisionIndexes2 = null;
	this.heightMaps = null;
	this.animatedChunks = null;
	this.bgChunkMap = null;
	this.tiles = [];
	this.blocks = [];
	this.chunks = [];
	this.chunkMap = [];
	this.rings = [];
	this.curHeightMap = true;
	this.levelWidth = 0;
	this.levelHeight = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicManager
OurSonic.SonicManager = function(engine, gameCanvas, resize) {
	this.mainCanvas = null;
	this.$myEngine = null;
	this.$objectManager = null;
	this.drawTickCount = 0;
	this.$imageLength = 0;
	this.$myStatus = null;
	this.$sonicSprites = null;
	this.tickCount = 0;
	this.$waitingForDrawContinue = false;
	this.waitingForTickContinue = false;
	this.currentGameState = 0;
	this.bigWindowLocation = null;
	this.uiManager = null;
	this.sonicToon = null;
	this.scale = null;
	this.windowLocation = null;
	this.realScale = null;
	this.inHaltMode = false;
	this.indexedPalette = 0;
	this.animations = null;
	this.animationInstances = null;
	this.goodRing = null;
	this.showHeightMap = false;
	this.screenOffset = null;
	this.activeRings = null;
	this.forceResize = null;
	this.background = null;
	this.clickState = 0;
	this.sonicLevel = null;
	this.inFocusObjects = null;
	this.loading = false;
	this.spriteCache = null;
	this.spriteLoader = null;
	this.$1$TypingInEditorField = false;
	OurSonic.SonicManager.instance = this;
	//            SonicToon = new Sonic();
	this.clickState = 2;
	this.$myEngine = engine;
	this.$myEngine.canvasWidth = $(window).width();
	this.$myEngine.canvasHeight = $(window).height();
	gameCanvas.domCanvas[0].setAttribute('width', this.$myEngine.canvasWidth);
	gameCanvas.domCanvas[0].setAttribute('height', this.$myEngine.canvasHeight);
	$.getJSON('Content/sprites/sonic.js', Function.mkdel(this, function(data) {
		this.$sonicSprites = data;
	}));
	this.$objectManager = new OurSonic.Level.ObjectManager(this);
	this.$objectManager.init();
	var scl = 2;
	this.scale = OurSonic.Point.$ctor1(scl, scl);
	this.realScale = OurSonic.Point.$ctor1(1, 1);
	this.mainCanvas = gameCanvas;
	this.windowLocation = OurSonic.Constants.defaultWindowLocation(1, this.mainCanvas, this.scale);
	this.bigWindowLocation = OurSonic.Constants.defaultWindowLocation(1, this.mainCanvas, this.scale);
	this.bigWindowLocation.width = ss.Int32.trunc(this.bigWindowLocation.width * 1.8);
	this.bigWindowLocation.height = ss.Int32.trunc(this.bigWindowLocation.height * 1.8);
	this.animations = [];
	this.animationInstances = [];
	//jQuery.GetJson("Content/sprites/explosion.js", data => Animations.Add(new Animation("explosion", data)));
	this.showHeightMap = false;
	this.goodRing = OurSonic.Level.Ring.$ctor(false);
	this.activeRings = [];
	this.forceResize = resize;
	this.background = null;
	this.currentGameState = 1;
	this.screenOffset = OurSonic.Point.$ctor1(ss.Int32.div(this.mainCanvas.domCanvas.width(), 2) - ss.Int32.div(this.windowLocation.width * this.scale.x, 2), ss.Int32.div(this.mainCanvas.domCanvas.height(), 2) - ss.Int32.div(this.windowLocation.height * this.scale.y, 2));
	this.uiManager = new OurSonic.UIManager.UIManager(this, this.mainCanvas.context, this.scale);
	//UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));
	this.clickState = 0;
	this.tickCount = 0;
	this.drawTickCount = 0;
	this.inHaltMode = false;
	this.waitingForTickContinue = false;
	this.$waitingForDrawContinue = false;
	this.sonicLevel = new OurSonic.SonicLevel();
};
OurSonic.SonicManager.prototype = {
	get_status: function() {
		return this.$myStatus;
	},
	set_status: function(value) {
		OurSonic.UIManager.UIManager.updateTitle(value);
		this.$myStatus = value;
	},
	get_typingInEditor: function() {
		return this.$1$TypingInEditorField;
	},
	set_typingInEditor: function(value) {
		this.$1$TypingInEditorField = value;
	},
	onClick: function(elementEvent) {
		var e = OurSonic.Point.$ctor1(ss.Int32.div(ss.Int32.div(ss.Int32.div(elementEvent.clientX, this.scale.x), this.realScale.x), this.windowLocation.x), ss.Int32.div(ss.Int32.div(elementEvent.clientY, this.scale.y), this.realScale.y) + this.windowLocation.y);
		if (elementEvent.button === 0) {
			var ey;
			var ex;
			switch (this.clickState) {
				case 0: {
					return false;
					break;
				}
				case 1: {
					ex = ss.Int32.div(e.x, 128);
					ey = ss.Int32.div(e.y, 128);
					var ch = this.sonicLevel.chunks[this.sonicLevel.chunkMap[ex][ey]];
					var tp = ch.getBlock(e.x - ex * 128, e.y - ey * 128);
					if (tp) {
						var tpc = ch.getTilePiece(e.x - ex * 128, e.y - ey * 128);
						this.uiManager.data.indexes.tpIndex = this.sonicLevel.blocks.indexOf(tp);
						this.uiManager.data.modifyTilePieceArea.TilePiece = tp;
						this.uiManager.data.solidTileArea.Visible = true;
						this.uiManager.data.modifyTilePieceArea.tpc = tpc;
					}
					return true;
				}
				case 2: {
					ex = e.x;
					ey = e.y;
					var $t2 = this.sonicLevel.rings;
					var $t1 = OurSonic.Level.Ring.$ctor(true);
					$t1.x = ex;
					$t1.y = ey;
					$t2.add($t1);
					return true;
				}
				case 3: {
					break;
				}
			}
		}
		return false;
		// 
		//                case ClickState.PlaceObject:
		// 
		//                var ex = _H.floor((e.x));
		// 
		//                var ey = _H.floor((e.y));
		// 
		//                
		// 
		//                for (var l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
		// 
		//                var o = sonicManager.SonicLevel.Objects[l];
		// 
		//                
		// 
		//                if (_H.intersects2(o.getRect(scale), { X: ex, Y: ey })) {
		// 
		//                alert("Object Data: " + _H.stringify(o));
		// 
		//                }
		// 
		//                }
		// 
		//                
		// 
		//                return true;
		// 
		//                
		// 
		//                break;
		return false;
	},
	$tickObjects: function() {
		var localPoint = OurSonic.Point.$ctor1(0, 0);
		this.inFocusObjects = [];
		var levelObjectInfos = this.sonicLevel.objects;
		for (var index = 0; index < levelObjectInfos.length; index++) {
			var obj = levelObjectInfos[index];
			localPoint.x = ss.Int32.trunc(obj.x);
			localPoint.y = ss.Int32.trunc(obj.y);
			if (this.bigWindowLocation.intersects(localPoint)) {
				this.inFocusObjects.add(obj);
				obj.tick(obj, this.sonicLevel, this.sonicToon);
			}
		}
		//sonicManager.uiManager.liveObjectsArea.populate(sonicManager.inFocusObjects);TODO:::
		var $t1 = this.animationInstances.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var animationInstance = $t1.get_current();
				animationInstance.tick();
			}
		}
		finally {
			$t1.dispose();
		}
	},
	tick: function() {
		if (this.loading) {
			return;
		}
		if (this.currentGameState === 0) {
			if (this.inHaltMode) {
				if (this.waitingForTickContinue) {
					return;
				}
			}
			this.tickCount++;
			this.$tickObjects();
			this.sonicToon.ticking = true;
			try {
				this.sonicToon.tick(this.sonicLevel, this.scale);
			}
			finally {
				this.sonicToon.ticking = false;
			}
			if (this.inHaltMode) {
				if (this.waitingForTickContinue) {
					return;
				}
				this.waitingForTickContinue = true;
				this.$waitingForDrawContinue = false;
			}
			if (this.sonicToon.x > 128 * this.sonicLevel.levelWidth) {
				this.sonicToon.x = 0;
			}
		}
	},
	preloadSprites: function(scale, completed, update) {
		this.spriteCache = this.spriteCache || new OurSonic.SpriteCache();
		var ci = this.spriteCache.rings;
		var inj = 0;
		var spriteLocations = [];
		for (var j = 0; j < 4; j++) {
			spriteLocations.add(String.format('assets/Sprites/ring{0}.png', j));
			this.$imageLength++;
		}
		var md = 0;
		var ind_ = this.spriteCache.indexes;
		var sl = this.spriteLoader = new OurSonic.SpriteLoader(completed, update);
		if (ci.length === 0) {
			var spriteStep = this.spriteLoader.addStep('Sprites', function(i, done) {
				var sp = i * 200;
				ci[sp] = OurSonic.Help.loadSprite(spriteLocations[i], function(jd) {
					ci[ss.Nullable.unbox(Type.cast(jd.Tag * 200 + scale.x * 100 + scale.y, ss.Int32))] = OurSonic.Help.scaleSprite(jd, scale, function(jc) {
						done();
					});
				});
				ci[sp].Tag = i;
			}, function() {
				ind_.sprites++;
				if (ind_.sprites === 4) {
					return true;
				}
				return false;
			}, false);
			for (var i1 = 0; i1 < spriteLocations.length; i1++) {
				this.spriteLoader.addIterationToStep(spriteStep, i1);
			}
		}
		var numOfAnimations = 0;
		var cci = this.spriteCache.sonicSprites;
		if (Object.getKeyCount(cci) === 0) {
			var sonicStep = this.spriteLoader.addStep('Sonic Sprites', Function.mkdel(this, function(sp1, done1) {
				var $t1 = Object.getObjectEnumerator(this.$sonicSprites);
				try {
					while ($t1.moveNext()) {
						var sonicSprite = $t1.get_current();
						cci[sonicSprite.key + scale.x + scale.y] = OurSonic.Help.scaleCsImage(sonicSprite.value, scale, function(ec) {
						});
					}
				}
				finally {
					$t1.dispose();
				}
				//var cji = SpriteCache.AnimationSprites = new JsDictionary<string, CanvasInformation>();
				//
				//foreach (var anni in Animations)
				//{
				//var imd = 0;
				//foreach (var image in anni.Images)
				//{
				//cji[(imd++) + " " + anni.Name + scale.x + scale.y] = _H.scaleCSImage(sonicManager.animations[anni].images[image], scale);
				//}
				//}
				done1();
			}), function() {
				return true;
			}, false);
			this.spriteLoader.addIterationToStep(sonicStep, 0);
		}
	},
	draw: function(canvas) {
		if (this.inHaltMode) {
			if (this.$drawHaltMode(canvas)) {
				return;
			}
		}
		canvas.save();
		var localPoint = OurSonic.Point.$ctor1(0, 0);
		this.drawTickCount++;
		if (this.spriteLoader && !this.spriteLoader.tick() || this.loading) {
			OurSonic.SonicManager.$drawLoading(canvas);
			return;
		}
		this.$updatePositions(canvas, localPoint);
		var w1 = ss.Int32.div(this.windowLocation.width, 128) + 2;
		var h1 = ss.Int32.div(this.windowLocation.height, 128) + 2;
		//cleaner with 2 padding on the widthheight
		var offs = OurSonic.SonicManager.$getOffs(h1, w1);
		var bounds = new OurSonic.IntersectingRectangle(-32, -32, this.windowLocation.width * this.scale.x + 32, this.windowLocation.height * this.scale.y + 32);
		if (this.sonicLevel.chunks && this.sonicLevel.chunks.length > 0) {
			this.$updatePalettes();
			var fxP = ss.Int32.trunc(this.windowLocation.x / 128);
			var fyP = ss.Int32.trunc(this.windowLocation.y / 128);
			this.$drawLowChunks(canvas, bounds, localPoint, offs, fyP, fxP);
			this.$drawObjects(canvas, localPoint);
			this.$drawAnimations(canvas);
			this.$drawRings(canvas, localPoint);
			this.$drawSonic(canvas);
			this.$drawHighChunks(canvas, fxP, fyP, offs, bounds, localPoint);
		}
		//drawRings(canvas, localPoint);
		//editing^
		canvas.restore();
		if (this.currentGameState === 0) {
			this.sonicToon.drawUI(canvas, OurSonic.Point.$ctor1(this.screenOffset.x, this.screenOffset.y), this.scale);
		}
	},
	$updatePositions: function(canvas, localPoint) {
		this.screenOffset.x = 0;
		this.screenOffset.y = 0;
		if (this.currentGameState === 0) {
			this.$updatePositionsForPlaying(canvas, localPoint);
		}
		if (this.windowLocation.x < 0) {
			this.windowLocation.x = 0;
		}
		if (this.windowLocation.x > 128 * this.sonicLevel.levelWidth - this.windowLocation.width) {
			this.windowLocation.x = 128 * this.sonicLevel.levelWidth - this.windowLocation.width;
		}
	},
	$updatePositionsForPlaying: function(canvas, localPoint) {
		canvas.scale(this.realScale.x, this.realScale.y);
		if (this.sonicToon.ticking) {
			while (true) {
				if (this.sonicToon.ticking) {
					break;
				}
			}
		}
		canvas.translate(this.screenOffset.x, this.screenOffset.y);
		canvas.fillStyle = '#000000';
		canvas.fillRect(0, 0, this.windowLocation.width * this.scale.x, this.windowLocation.height * this.scale.y);
		this.windowLocation.x = ss.Int32.trunc(this.sonicToon.x) - ss.Int32.div(this.windowLocation.width, 2);
		this.windowLocation.y = ss.Int32.trunc(this.sonicToon.y) - ss.Int32.div(this.windowLocation.height, 2);
		this.bigWindowLocation.x = ss.Int32.trunc(this.sonicToon.x) - ss.Int32.div(this.bigWindowLocation.width, 2);
		this.bigWindowLocation.y = ss.Int32.trunc(this.sonicToon.y) - ss.Int32.div(this.bigWindowLocation.height, 2);
		this.bigWindowLocation.x = ss.Int32.trunc(this.bigWindowLocation.x - this.windowLocation.width * 0.2);
		this.bigWindowLocation.y = ss.Int32.trunc(this.bigWindowLocation.y - this.windowLocation.height * 0.2);
		this.bigWindowLocation.width = ss.Int32.trunc(this.windowLocation.width * 1.8);
		this.bigWindowLocation.height = ss.Int32.trunc(this.windowLocation.height * 1.8);
		if (this.background) {
			var wOffset = this.windowLocation.x;
			var bw = ss.Int32.div(this.background.width, this.scale.x);
			var movex = ss.Int32.div(wOffset, bw) * bw;
			localPoint.x = -this.windowLocation.x * this.scale.x + movex;
			localPoint.y = ss.Int32.div(-this.windowLocation.y, 4) * this.scale.y;
			this.background.draw(canvas, localPoint, this.scale, wOffset);
			localPoint.x = -this.windowLocation.x * this.scale.x + movex + this.background.width;
			localPoint.y = ss.Int32.div(-this.windowLocation.y, 4) * this.scale.y;
			this.background.draw(canvas, localPoint, this.scale, wOffset);
		}
	},
	$drawHaltMode: function(canvas) {
		canvas.fillStyle = 'white';
		canvas.font = '21pt arial bold';
		canvas.fillText('HALT MODE\r\n Press: P to step\r\n        O to resume', 10, 120);
		if (this.$waitingForDrawContinue) {
			return true;
		}
		else {
			this.$waitingForDrawContinue = true;
		}
		return false;
	},
	$updatePalettes: function() {
		if (this.sonicLevel.paletteItems[0]) {
			for (var k = 0; k < this.sonicLevel.paletteItems[0].length; k++) {
				var pal = this.sonicLevel.paletteItems[0][k];
				for (var j = 0; j <= pal.totalLength; j += pal.skipIndex) {
					if (this.drawTickCount % (pal.totalLength + pal.skipIndex) === j) {
						this.sonicLevel.palAn[k] = ss.Int32.div(j, pal.skipIndex);
					}
				}
				for (var m = 0; m < pal.pieces.length; m++) {
					var mj = pal.pieces[m];
					this.sonicLevel.palette[mj.paletteIndex][ss.Int32.div(mj.paletteOffset, 2)] = pal.palette[this.sonicLevel.palAn[k] * (pal.pieces.length * 2) + 0 + mj.paletteMultiply];
					this.sonicLevel.palette[mj.paletteIndex][ss.Int32.div(mj.paletteOffset, 2) + 1] = pal.palette[this.sonicLevel.palAn[k] * (pal.pieces.length * 2) + 1 + mj.paletteMultiply];
				}
			}
		}
	},
	$drawLowChunks: function(canvas, bounds, localPoint, offs, fyP, fxP) {
		for (var $t1 = 0; $t1 < offs.length; $t1++) {
			var off = offs[$t1];
			var _xP = fxP + off.x;
			var _yP = fyP + off.y;
			var _yPreal = fyP + off.y;
			if (_xP < 0 || _xP >= this.sonicLevel.levelWidth) {
				continue;
			}
			_yP = OurSonic.Help.mod(_yP, this.sonicLevel.levelHeight);
			var chunk = this.sonicLevel.chunks[this.sonicLevel.chunkMap[_xP][_yP]];
			var anni = this.sonicLevel.chunks[this.sonicLevel.chunkMap[_xP][_yP]];
			if (anni) {
				anni.animatedTick();
			}
			localPoint.x = _xP * 128 * this.scale.x - this.windowLocation.x * this.scale.x;
			localPoint.y = _yPreal * 128 * this.scale.y - this.windowLocation.y * this.scale.y;
			if (!chunk.isEmpty() && !chunk.onlyForeground()) {
				chunk.draw(canvas, localPoint, this.scale, 0, bounds);
			}
			if (false && this.currentGameState === 1) {
				canvas.strokeStyle = '#DD0033';
				canvas.lineWidth = 3;
				canvas.strokeRect(localPoint.x, localPoint.y, 128 * this.scale.x, 128 * this.scale.y);
			}
		}
	},
	$drawHighChunks: function(canvas, fxP, fyP, offs, bounds, localPoint) {
		for (var $t1 = 0; $t1 < offs.length; $t1++) {
			var off = offs[$t1];
			var _xP = fxP + off.x;
			var _yP = fyP + off.y;
			var _yPreal = fyP + off.y;
			if (_xP < 0 || _xP >= this.sonicLevel.levelWidth) {
				continue;
			}
			_yP = OurSonic.Help.mod(_yP, this.sonicLevel.levelHeight);
			var chunk = this.sonicLevel.chunks[this.sonicLevel.chunkMap[_xP][_yP]];
			localPoint.x = _xP * 128 * this.scale.x - this.windowLocation.x * this.scale.x;
			localPoint.y = _yPreal * 128 * this.scale.y - this.windowLocation.y * this.scale.y;
			if (!chunk.isEmpty() && !chunk.onlyBackground()) {
				chunk.draw(canvas, localPoint, this.scale, 1, bounds);
			}
			if (false && this.currentGameState === 1) {
				canvas.strokeStyle = '#DD0033';
				canvas.lineWidth = 3;
				canvas.strokeRect(localPoint.x, localPoint.y, 128 * this.scale.x, 128 * this.scale.y);
			}
			if (this.showHeightMap) {
				var fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + chunk.index + ' ' + this.scale.y + ' ' + this.scale.x];
				if (!fd) {
					var md = chunk;
					var posj1 = OurSonic.Point.$ctor1(0, 0);
					var canv = OurSonic.Help.defaultCanvas(128 * this.scale.x, 128 * this.scale.y);
					var ctx = canv.context;
					this.$myEngine.clear(canv);
					for (var _y = 0; _y < 8; _y++) {
						for (var _x = 0; _x < 8; _x++) {
							var tp = md.tilePieces[_x][_y];
							var solid = (this.sonicLevel.curHeightMap ? tp.solid1 : tp.solid2);
							var hd = this.sonicLevel.heightMaps[(this.sonicLevel.curHeightMap ? this.sonicLevel.collisionIndexes1[tp.block] : this.sonicLevel.collisionIndexes2[tp.block])];
							var __x = _x;
							var __y = _y;
							var vangle = 0;
							var posm = OurSonic.Point.$ctor1(posj1.x + __x * 16 * this.scale.x, posj1.y + __y * 16 * this.scale.y);
							if (!hd) {
								continue;
							}
							if (OurSonic.HeightMask.op_Implicit(hd) === 0) {
							}
							else if (OurSonic.HeightMask.op_Implicit(hd) === 1) {
								if (solid > 0) {
									ctx.fillStyle = OurSonic.HeightMask.colors[solid];
									ctx.fillRect(posj1.x + __x * 16 * this.scale.x, posj1.y + __y * 16 * this.scale.y, this.scale.x * 16, this.scale.y * 16);
								}
							}
							else {
								vangle = this.sonicLevel.angles[(this.sonicLevel.curHeightMap ? this.sonicLevel.collisionIndexes1[tp.block] : this.sonicLevel.collisionIndexes2[tp.block])];
								hd.draw(ctx, posm, this.scale, -1, tp.xFlip, tp.yFlip, solid, vangle);
								//   posm.x += 16 * scale.x / 2;
								//   posm.y += 16 * scale.y / 2;
								//   ctx.strokeStyle = "#DDD";
								//   ctx.font = "18pt courier ";
								//   ctx.shadowColor = "";
								//   ctx.shadowBlur = 0;
								//   ctx.lineWidth = 1;
								//   ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);
							}
						}
					}
					fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + md.index + ' ' + this.scale.y + ' ' + this.scale.x] = canv;
				}
				canvas.drawImage(fd.canvas, localPoint.x, localPoint.y);
			}
			if (this.currentGameState === 1) {
				canvas.strokeStyle = '#DD0033';
				canvas.lineWidth = 3;
				canvas.strokeRect(localPoint.x, localPoint.y, 128 * this.scale.x, 128 * this.scale.y);
			}
		}
	},
	$drawSonic: function(canvas) {
		if (this.currentGameState === 0) {
			this.sonicToon.draw(canvas, this.scale);
			if (this.windowLocation.x < 0) {
				this.windowLocation.x = 0;
			}
			if (this.windowLocation.x > 128 * this.sonicLevel.levelWidth - this.windowLocation.width) {
				this.windowLocation.x = 128 * this.sonicLevel.levelWidth - this.windowLocation.width;
			}
			//if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
			//    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
		}
	},
	$drawRings: function(canvas, localPoint) {
		for (var index = 0; index < this.sonicLevel.rings.length; index++) {
			var r = this.sonicLevel.rings[index];
			switch (this.currentGameState) {
				case 0: {
					if (!this.sonicToon.obtainedRing[index]) {
						if (this.bigWindowLocation.intersects(r)) {
							OurSonic.Level.Ring.draw(this.goodRing, canvas, OurSonic.Point.negate$1(r, this.windowLocation.x, this.windowLocation.y), this.scale);
						}
					}
					break;
				}
				case 1: {
					if (this.bigWindowLocation.intersects(r)) {
						OurSonic.Level.Ring.draw(this.goodRing, canvas, OurSonic.Point.negate$1(r, this.windowLocation.x, this.windowLocation.y), this.scale);
					}
					break;
				}
			}
			//
			//                 for (var ring in this.SonicLevel.Rings) {
			//
			//                 var r = this.SonicLevel.Rings[ring];
			//
			//                 if (this.sonicToon) {
			//
			//                 if (!this.sonicToon.obtainedRing[ring])
			//
			//                 if (this.bigWindowLocation.intersects(r))
			//
			//                 this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, true);
			//
			//                 } else {
			//
			//                 if (this.bigWindowLocation.intersects(r))
			//
			//                 this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, false);
			//
			//                 }
			//
			//                 }
		}
		switch (this.currentGameState) {
			case 0: {
				for (var i = this.activeRings.length - 1; i >= 0; i--) {
					var ac = this.activeRings[i];
					localPoint.x = ac.x - this.windowLocation.x;
					localPoint.y = ac.y - this.windowLocation.y;
					OurSonic.Level.Ring.draw(ac, canvas, localPoint, this.scale);
					if (ac.tickCount > 256) {
						this.activeRings.remove(ac);
					}
				}
				break;
			}
			case 1: {
				break;
			}
		}
	},
	$drawAnimations: function(canvas) {
		for (var index = 0; index < this.animationInstances.length; index++) {
			var ano = this.animationInstances[index];
			ano.draw(canvas, -this.windowLocation.x, -this.windowLocation.y, this.scale);
		}
	},
	$drawObjects: function(canvas, localPoint) {
		var levelObjectInfos = this.sonicLevel.objects;
		for (var index = 0; index < levelObjectInfos.length; index++) {
			var o = levelObjectInfos[index];
			localPoint.x = o.x;
			localPoint.y = o.y;
			if (o.dead || this.bigWindowLocation.intersects(localPoint)) {
				o.draw(canvas, (localPoint.x - this.windowLocation.x) * this.scale.x, (localPoint.y - this.windowLocation.y) * this.scale.y, this.scale, this.showHeightMap);
			}
		}
	},
	$containsAnimatedTile: function(tile, sonLevel) {
		for (var i = 0; i < sonLevel.animations.length; i++) {
			var an = sonLevel.animations[i];
			var anin = an.animationTileIndex;
			var num = an.numberOfTiles;
			if (tile >= anin && tile < anin + num) {
				return an;
			}
		}
		return null;
	},
	clearCache: function() {
		var $t1 = this.sonicLevel.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var tile = $t1.get_current();
				tile.clearCache();
			}
		}
		finally {
			$t1.dispose();
		}
		var $t2 = this.sonicLevel.blocks.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var tilePiece = $t2.get_current();
				tilePiece.clearCache();
			}
		}
		finally {
			$t2.dispose();
		}
		OurSonic.SonicManager.instance.spriteCache.heightMaps = [];
		OurSonic.SonicManager.instance.spriteCache.heightMapChunks = {};
	},
	loadObjects: function(objects) {
		var cachedObjects = {};
		for (var l = 0; l < this.sonicLevel.objects.length; l++) {
			var o = { $: this.sonicLevel.objects[l].key };
			if (Object.keyExists(cachedObjects, o.$)) {
				this.sonicLevel.objects[l].setObjectData(cachedObjects[o.$]);
				continue;
			}
			var d = Enumerable.from(objects).first(Function.mkdel({ o: o }, function(p) {
				return ss.referenceEquals(p.key, this.o.$);
			}));
			if (!d) {
				this.sonicLevel.objects[l].setObjectData(new OurSonic.Level.LevelObject(o.$));
				continue;
			}
			var dat;
			if (d.value.length === 0) {
				dat = OurSonic.Level.LevelObjectData.$ctor();
			}
			else {
				dat = JSON.parse(d.value);
			}
			var dr = OurSonic.Level.ObjectManager.extendObject(dat);
			cachedObjects[o.$] = dr;
			this.sonicLevel.objects[l].setObjectData(dr);
		}
		// 
		//        OurSonic.SonicLevels.getObjects(objectKeys, function (objects) {
		// 
		//        window.CachedObjects = [];
		// 
		//        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
		// 
		//        o = sonicManager.SonicLevel.Objects[l].key;
		// 
		//        if (window.CachedObjects[o]) {
		// 
		//        sonicManager.SonicLevel.Objects[l].setObjectData(window.CachedObjects[o]);
		// 
		//        continue;
		// 
		//        }
		// 
		//        var d = JSLINQ(objects).First(function (p) { return p.key == o; });
		// 
		//        if (!d) {
		// 
		//        sonicManager.SonicLevel.Objects[l].setObjectData(new LevelObject(o));
		// 
		//        continue;
		// 
		//        }
		// 
		//        
		// 
		//        var dr = _H.extend(new LevelObject(""), jQuery.parseJSON(d.value));
		// 
		//        dr = sonicManager.objectManager.extendObject(dr);
		// 
		//        
		// 
		//        for (var n = 0; n < dr.assets.length; n++) {
		// 
		//        for (var s = 0; s < dr.assets[n].frames.length; s++) {
		// 
		//        dr.assets[n].frames[s].hurtSonicMap.length = dr.assets[n].frames[s].width;
		// 
		//        dr.assets[n].frames[s].collisionMap.length = dr.assets[n].frames[s].width;
		// 
		//        for (var t = 0; t < dr.assets[n].frames[s].hurtSonicMap.length; t++) {
		// 
		//        dr.assets[n].frames[s].hurtSonicMap[t].length = dr.assets[n].frames[s].height;
		// 
		//        dr.assets[n].frames[s].collisionMap[t].length = dr.assets[n].frames[s].height;
		// 
		//        
		// 
		//        }
		// 
		//        }
		// 
		//        }
		// 
		//        
		// 
		//        window.CachedObjects[o] = dr;
		// 
		//        sonicManager.SonicLevel.Objects[l].setObjectData(dr);
		// 
		//        
		// 
		//        }
		// 
		//        
		// 
		//        });
	},
	loadObjects$1: function(objects) {
		OurSonic.SonicEngine.instance.client.emit('GetObjects', objects);
	},
	load: function(lvl) {
		this.loading = true;
		this.set_status('Decoding');
		var sonicLevel = $.parseJSON(OurSonic.Help.decodeString(lvl));
		this.set_status('Determining Level Information');
		if (!this.sonicLevel.chunks) {
			this.sonicLevel.chunks = [];
		}
		if (!this.sonicLevel.blocks) {
			this.sonicLevel.blocks = [];
		}
		if (!this.sonicLevel.tiles) {
			this.sonicLevel.tiles = [];
		}
		if (!this.sonicLevel.rings) {
			this.sonicLevel.rings = [];
		}
		for (var n = 0; n < sonicLevel.Rings.length; n++) {
			this.sonicLevel.rings[n] = OurSonic.Level.Ring.$ctor(true);
			this.sonicLevel.rings[n].x = sonicLevel.Rings[n].X;
			this.sonicLevel.rings[n].y = sonicLevel.Rings[n].Y;
		}
		this.sonicLevel.levelWidth = sonicLevel.ForegroundWidth;
		this.sonicLevel.levelHeight = sonicLevel.ForegroundHeight;
		this.sonicLevel.chunkMap = sonicLevel.Foreground;
		this.sonicLevel.bgChunkMap = sonicLevel.Background;
		this.sonicLevel.objects = [];
		for (var l = 0; l < sonicLevel.Objects.length; l++) {
			this.sonicLevel.objects[l] = new OurSonic.Level.LevelObjectInfo(sonicLevel.Objects[l]);
			this.sonicLevel.objects[l].index = l;
		}
		var objectKeys = [];
		for (var l1 = 0; l1 < this.sonicLevel.objects.length; l1++) {
			var o = { $: this.sonicLevel.objects[l1].key };
			if (Enumerable.from(objectKeys).all(Function.mkdel({ o: o }, function(p) {
				return !ss.referenceEquals(p, this.o.$);
			}))) {
				objectKeys.add(o.$);
			}
		}
		this.loadObjects$1(objectKeys);
		this.sonicLevel.curPaletteIndex = 0;
		this.sonicLevel.palAn = [];
		this.sonicLevel.curHeightMap = true;
		this.sonicLevel.tiles = [];
		for (var j = 0; j < sonicLevel.Tiles.length; j++) {
			var fc = sonicLevel.Tiles[j];
			var tiles = fc;
			var mj = [];
			for (var i = 0; i < tiles.length; i++) {
				var value = sonicLevel.Tiles[j][i];
				mj.add(value >> 4);
				mj.add(value & 15);
			}
			var mfc = new Array(8);
			for (var o1 = 0; o1 < 8; o1++) {
				mfc[o1] = new Array(8);
			}
			for (var n1 = 0; n1 < mj.length; n1++) {
				mfc[n1 % 8][ss.Int32.div(n1, 8)] = mj[n1];
			}
			this.sonicLevel.tiles[j] = new OurSonic.Tiles.Tile(mfc);
			this.sonicLevel.tiles[j].index = j;
		}
		var acs = this.sonicLevel.animatedChunks = [];
		if (sonicLevel.AnimatedFiles) {
			this.sonicLevel.animatedFiles = new Array(sonicLevel.AnimatedFiles.length);
			for (var jc = 0; jc < sonicLevel.AnimatedFiles.length; jc++) {
				var fcc = sonicLevel.AnimatedFiles[jc];
				this.sonicLevel.animatedFiles[jc] = new Array(fcc.length);
				for (var j1 = 0; j1 < fcc.length; j1++) {
					var c = fcc[j1];
					var tiles1 = c;
					var mjc = [];
					for (var l2 = 0; l2 < tiles1.length; l2++) {
						var value1 = fcc[j1][l2];
						mjc.add(value1 >> 4);
						mjc.add(value1 & 15);
					}
					var mfc1 = new Array(8);
					for (var o2 = 0; o2 < 8; o2++) {
						mfc1[o2] = new Array(8);
					}
					for (var n2 = 0; n2 < mjc.length; n2++) {
						mfc1[n2 % 8][ss.Int32.div(n2, 8)] = mjc[n2];
					}
					var tile = new OurSonic.Tiles.Tile(mfc1);
					tile.isAnimated = true;
					tile.index = j1 * 10000 + jc;
					this.sonicLevel.animatedFiles[jc][j1] = tile;
				}
			}
		}
		this.sonicLevel.blocks = [];
		for (var j2 = 0; j2 < sonicLevel.Blocks.length; j2++) {
			var fc1 = sonicLevel.Blocks[j2];
			var mj1 = new OurSonic.Tiles.TilePiece();
			mj1.index = j2;
			mj1.tiles = [];
			for (var p1 = 0; p1 < fc1.length; p1++) {
				var $t2 = mj1.tiles;
				var $t1 = new OurSonic.Tiles.TileItem();
				$t1._Tile = fc1[p1].Tile;
				$t1.index = p1;
				$t1.palette = fc1[p1].Palette;
				$t1.priority = fc1[p1].Priority;
				$t1.xFlip = fc1[p1].XFlip;
				$t1.yFlip = fc1[p1].YFlip;
				$t2.add($t1);
			}
			mj1.init();
			this.sonicLevel.blocks[j2] = mj1;
		}
		this.sonicLevel.angles = sonicLevel.Angles;
		this.sonicLevel.animations = sonicLevel.Animations.map(function(a) {
			var $t3 = new OurSonic.Animation();
			$t3.animationFile = a.AnimationFile;
			$t3.animationTileIndex = a.AnimationTileIndex;
			$t3.automatedTiming = a.AutomatedTiming;
			$t3.numberOfTiles = a.NumberOfTiles;
			$t3.frames = Type.cast(a.Frames.map(function(b) {
				var $t4 = new OurSonic.AnimationFrame();
				$t4.ticks = b.Ticks;
				$t4.startingTileIndex = b.StartingTileIndex;
				return $t4;
			}).slice(0), Array);
			return $t3;
		}).clone();
		this.sonicLevel.collisionIndexes1 = sonicLevel.CollisionIndexes1;
		this.sonicLevel.collisionIndexes2 = sonicLevel.CollisionIndexes2;
		this.sonicLevel.heightMaps = [];
		for (var i1 = 0; i1 < sonicLevel.HeightMaps.length; i1++) {
			var b1 = true;
			var b2 = true;
			for (var m = 0; m < sonicLevel.HeightMaps[i1].length; m++) {
				if (b1 && sonicLevel.HeightMaps[i1][m] !== 0) {
					b1 = false;
				}
				if (b2 && sonicLevel.HeightMaps[i1][m] !== 16) {
					b2 = false;
				}
			}
			if (b1) {
				this.sonicLevel.heightMaps[i1] = OurSonic.HeightMask.op_Implicit$1(0);
			}
			else if (b2) {
				this.sonicLevel.heightMaps[i1] = OurSonic.HeightMask.op_Implicit$1(1);
			}
			else {
				this.sonicLevel.heightMaps[i1] = new OurSonic.HeightMask(sonicLevel.HeightMaps[i1], i1);
			}
		}
		this.sonicLevel.chunks = [];
		for (var j3 = 0; j3 < sonicLevel.Chunks.length; j3++) {
			var fc2 = sonicLevel.Chunks[j3];
			var mj2 = new OurSonic.Tiles.TileChunk();
			mj2.index = j3;
			mj2.tilePieces = new Array(8);
			for (var i2 = 0; i2 < 8; i2++) {
				mj2.tilePieces[i2] = new Array(8);
			}
			for (var p2 = 0; p2 < fc2.length; p2++) {
				var $t6 = mj2.tilePieces[p2 % 8];
				var $t7 = ss.Int32.div(p2, 8);
				var $t5 = new OurSonic.Tiles.TilePiece();
				$t5.index = p2;
				$t5.block = fc2[p2].Block;
				$t5.solid1 = fc2[p2].Solid1;
				$t5.solid2 = fc2[p2].Solid2;
				$t5.xFlip = fc2[p2].XFlip;
				$t5.yFlip = fc2[p2].YFlip;
				$t6[$t7] = $t5;
			}
			this.sonicLevel.chunks[j3] = mj2;
			mj2.animated = {};
			//Help.Debugger();
			for (var tpX = 0; tpX < mj2.tilePieces.length; tpX++) {
				for (var tpY = 0; tpY < mj2.tilePieces[tpX].length; tpY++) {
					var r = mj2.tilePieces[tpX][tpY];
					var pm = this.sonicLevel.blocks[r.block];
					if (pm) {
						for (var ci = 0; ci < pm.tiles.length; ci++) {
							var mjc1 = pm.tiles[ci];
							if (this.sonicLevel.tiles[mjc1._Tile]) {
								var fa = this.$containsAnimatedTile(mjc1._Tile, this.sonicLevel);
								if (fa) {
									mj2.animated[tpY * 8 + tpX] = fa;
									acs[j3] = mj2;
								}
							}
						}
					}
				}
			}
		}
		this.sonicLevel.palette = sonicLevel.Palette;
		this.sonicLevel.startPositions = sonicLevel.StartPositions.map(function(a1) {
			return OurSonic.Point.$ctor1(a1.X, a1.Y);
		});
		this.sonicLevel.paletteItems = [];
		if (sonicLevel.PaletteItems[0]) {
			this.sonicLevel.paletteItems[0] = [];
			for (var k = 0; k < sonicLevel.PaletteItems[0].length; k++) {
				var pal = sonicLevel.PaletteItems[0][k];
				var $t10 = this.sonicLevel.paletteItems[0];
				var $t8 = new OurSonic.PaletteItem();
				$t8.palette = Type.cast(eval(pal.Palette), Array);
				$t8.skipIndex = pal.SkipIndex;
				$t8.totalLength = pal.TotalLength;
				$t8.pieces = pal.Pieces.map(function(a2) {
					var $t9 = new OurSonic.PaletteItemPieces();
					$t9.paletteIndex = a2.PaletteIndex;
					$t9.paletteMultiply = a2.PaletteMultiply;
					$t9.paletteOffset = a2.PaletteOffset;
					return $t9;
				});
				$t10[k] = $t8;
			}
		}
		for (var kd = 0; kd < this.sonicLevel.blocks.length; kd++) {
			var dj = this.sonicLevel.blocks[kd];
			dj.animatedFrames = [];
			for (var index = 0; index < dj.tiles.length; index++) {
				var mj3 = dj.tiles[index];
				if (this.sonicLevel.tiles[mj3._Tile]) {
					var pl = this.sonicLevel.tiles[mj3._Tile].getAllPaletteIndexes();
					if (this.sonicLevel.paletteItems[0]) {
						for (var k1 = 0; k1 < this.sonicLevel.paletteItems[0].length; k1++) {
							var pal1 = this.sonicLevel.paletteItems[0][k1];
							var $t11 = pal1.pieces.getEnumerator();
							try {
								while ($t11.moveNext()) {
									var mjce = $t11.get_current();
									var mje1 = { $: mjce };
									if (mj3.palette === mje1.$.paletteIndex) {
										if (Enumerable.from(pl).any(Function.mkdel({ mje1: mje1 }, function(j4) {
											return j4 === ss.Int32.div(this.mje1.$.paletteOffset, 2) || j4 === ss.Int32.div(this.mje1.$.paletteOffset, 2) + 1;
										}))) {
											dj.animatedFrames[dj.animatedFrames.length] = k1;
										}
									}
								}
							}
							finally {
								$t11.dispose();
							}
						}
					}
				}
			}
		}
		var finished = Function.mkdel(this, function() {
			this.loading = false;
		});
		this.preloadSprites(this.scale, Function.mkdel(this, function() {
			finished();
			this.forceResize();
		}), function(s) {
			console.log('ff ' + s);
		});
		this.forceResize();
		// 
		//
		//               
		//
		//        var finished = function () {
		// 
		//
		//               
		//
		//        sonicManager.uiManager.levelManagerArea.visible = true;
		// 
		//
		//               
		//
		//        sonicManager.loading = false;
		// 
		//
		//               
		//
		//        sonicManager.uiManager.modifyTC.tileChunk = sonicManager.SonicLevel.Chunks[0];
		// 
		//
		//               
		//
		//        sonicManager.uiManager.modifyTilePieceArea.tilePiece = sonicManager.uiManager.modifyTP.tilePiece = sonicManager.SonicLevel.Blocks[0];
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        };
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        //        var inds = sonicManager.inds = { r:0,t: 0, tp: 0, tc: 0, total: (sonicManager.SonicLevel.Chunks.length * 2 + sonicManager.SonicLevel.Blocks.length * 5 + sonicManager.SonicLevel.Tiles.length), done: false };
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        sonicManager.CACHING = true;
		// 
		//
		//               
		//
		//        sonicManager.preLoadSprites(scale, function () {
		// 
		//
		//               
		//
		//        //          inds.r = 1;
		// 
		//
		//               
		//
		//        sonicManager.CACHING = false;
		// 
		//
		//               
		//
		//        finished();
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        sonicManager.uiManager.updateTitle("Level Loaded");
		// 
		//
		//               
		//
		//        sonicManager.forceResize();
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        var dl = _H.getQueryString();
		// 
		//
		//               
		//
		//        if (dl["run"]) {
		// 
		//
		//               
		//
		//        setTimeout(sonicManager.uiManager.runSonic, 1000);
		// 
		//
		//               
		//
		//        }
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        }, sonicManager.uiManager.updateTitle);
	}
};
OurSonic.SonicManager.$getOffs = function(h1, w1) {
	var hash = (h1 + 1) * (w1 + 1);
	if (Object.keyExists(OurSonic.SonicManager.$_cachedOffs, hash)) {
		return OurSonic.SonicManager.$_cachedOffs[hash];
	}
	var offs = [];
	var ca = 0;
	for (var i = -1; i < w1; i++) {
		for (var j = -1; j < h1; j++) {
			offs[ca++] = OurSonic.Point.$ctor1(i, j);
		}
	}
	return OurSonic.SonicManager.$_cachedOffs[hash] = offs;
};
OurSonic.SonicManager.$drawLoading = function(canvas) {
	canvas.fillStyle = 'white';
	canvas.fillText('Loading...   ', 95, 95);
	canvas.restore();
	return;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteCache
OurSonic.SpriteCache = function() {
	this.rings = null;
	this.tileChunks = null;
	this.tilepieces = null;
	this.heightMaps = null;
	this.tiles = null;
	this.sonicSprites = null;
	this.heightMapChunks = null;
	this.indexes = null;
	this.$1$AnimationSpritesField = null;
	this.rings = [];
	this.tileChunks = [];
	this.tilepieces = {};
	this.tiles = [];
	this.sonicSprites = {};
	this.heightMaps = [];
	this.heightMapChunks = {};
	this.indexes = new OurSonic.SpriteCacheIndexes();
};
OurSonic.SpriteCache.prototype = {
	get_animationSprites: function() {
		return this.$1$AnimationSpritesField;
	},
	set_animationSprites: function(value) {
		this.$1$AnimationSpritesField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteCacheIndexes
OurSonic.SpriteCacheIndexes = function() {
	this.sprites = 0;
	this.tps = 0;
	this.tcs = 0;
	this.ss = 0;
	this.hms = 0;
	this.hmc = 0;
	this.tls = 0;
	this.px = 0;
	this.aes = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteLoader
OurSonic.SpriteLoader = function(completed, update) {
	this.$myCompleted = null;
	this.$myUpdate = null;
	this.$done = false;
	this.$stepIndex = 0;
	this.$steps = [];
	this.$tickIndex = 0;
	this.$myCompleted = completed;
	this.$myUpdate = update;
};
OurSonic.SpriteLoader.prototype = {
	tick: function() {
		if (this.$stepIndex === this.$steps.length) {
			if (!this.$done) {
				this.$done = true;
				this.$myCompleted();
			}
			return true;
		}
		var stp = this.$steps[this.$stepIndex];
		if (!stp) {
			return true;
		}
		if (ss.Int32.div(this.$tickIndex % stp.iterations.length, 12) === 0) {
			this.$myUpdate('Caching: ' + stp.title + ' ' + ss.Int32.div(this.$tickIndex, stp.iterations.length) * 100 + '%');
		}
		if (stp.iterations.length > this.$tickIndex) {
			stp.method(stp.iterations[this.$tickIndex++], Function.mkdel(this, function() {
				if (stp.onFinish()) {
					this.$stepIndex++;
					this.$tickIndex = 0;
				}
			}));
		}
		return false;
	},
	addStep: function(title, method, onFinish, disable) {
		if (disable) {
			return -1;
		}
		this.$steps.add(new OurSonic.SpriteLoaderStep(title, method, onFinish));
		return this.$steps.length - 1;
	},
	addIterationToStep: function(spriteStep, i) {
		if (spriteStep === -1) {
			return;
		}
		this.$steps[spriteStep].iterations.add(i);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteLoaderStep
OurSonic.SpriteLoaderStep = function(title, method, onFinish) {
	this.title = null;
	this.method = null;
	this.onFinish = null;
	this.iterations = null;
	this.title = title;
	this.method = method;
	this.onFinish = onFinish;
	this.iterations = [];
};
Type.registerNamespace('OurSonic.Tiles');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Tiles.RotationMode
OurSonic.Tiles.RotationMode = function() {
};
OurSonic.Tiles.RotationMode.prototype = { floor: 134, rightWall: 224, ceiling: 314, leftWall: 44 };
OurSonic.Tiles.RotationMode.registerEnum('OurSonic.Tiles.RotationMode', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Tiles.Tile
OurSonic.Tiles.Tile = function(colors) {
	this.$canAnimate = true;
	this.$willAnimate = null;
	this._Tile = 0;
	this.priority = false;
	this.xFlip = false;
	this.yFlip = false;
	this.palette = 0;
	this.curPaletteIndexes = null;
	this.sprites = null;
	this.colors = null;
	this.showOutline = false;
	this.index = 0;
	this.isAnimated = false;
	this.colors = colors;
	this.sprites = [];
	this.curPaletteIndexes = null;
};
OurSonic.Tiles.Tile.prototype = {
	draw: function(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame) {
		if (this.$checkGood(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame)) {
			return;
		}
		var cx = this.colors.length * scale.x;
		var cy = this.colors.length * scale.y;
		var j = OurSonic.Help.defaultCanvas(cx, cy);
		if (pos.x < 0 || pos.y < 0) {
			return;
		}
		var oPos = OurSonic.Point.$ctor1(0, 0);
		if (xflip) {
			oPos.x = -this.colors.length * scale.x;
			j.context.scale(-1, 1);
		}
		if (yflip) {
			oPos.y = -this.colors.length * scale.y;
			j.context.scale(1, -1);
		}
		var palette_ = OurSonic.SonicManager.instance.sonicLevel.palette;
		var indexed = OurSonic.SonicManager.instance.indexedPalette;
		for (var i = 0; i < this.colors.length; i++) {
			for (var jf = 0; jf < this.colors[i].length; jf++) {
				var gj = this.colors[i][jf];
				if (gj === 0) {
					continue;
				}
				var m = palette_[(palette + indexed) % palette_.length][gj];
				if (!ss.referenceEquals(j.context.fillStyle, '#' + m)) {
					j.context.fillStyle = '#' + m;
				}
				j.context.fillRect(oPos.x + i * scale.x, oPos.y + jf * scale.y, scale.x, scale.y);
			}
		}
		canvas.drawImage(j.canvas, pos.x, pos.y);
		if (this.showOutline) {
			canvas.strokeStyle = '#DD0033';
			canvas.lineWidth = 3;
			canvas.strokeRect(pos.x, pos.y, 8 * scale.x, 8 * scale.y);
		}
	},
	$checkGood: function(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame) {
		if (!this.isAnimated) {
			if (!this.$canAnimate) {
				return false;
			}
			var an = this.$willAnimate;
			if (this.$willAnimate) {
				var anin = an.animationTileIndex;
				var ind = animationFrame;
				var frame = an.frames[ind];
				if (!frame) {
					frame = an.frames[0];
				}
				var file = OurSonic.SonicManager.instance.sonicLevel.animatedFiles[an.animationFile];
				var va = file[frame.startingTileIndex + (this.index - anin)];
				if (va) {
					if (canvas.fillStyle !== 'rbga(255,255,255,255)') {
						canvas.fillStyle = 'rbga(255,255,255,255)';
					}
					va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
					return true;
				}
				return false;
			}
			for (var i = 0; i < OurSonic.SonicManager.instance.sonicLevel.animations.length; i++) {
				var acn = OurSonic.SonicManager.instance.sonicLevel.animations[i];
				var anin1 = acn.animationTileIndex;
				var num = acn.numberOfTiles;
				if (this.index >= anin1 && this.index < anin1 + num) {
					this.$willAnimate = acn;
					var ind1 = animationFrame;
					var frame1 = acn.frames[ind1];
					if (!frame1) {
						frame1 = acn.frames[0];
					}
					var file1 = OurSonic.SonicManager.instance.sonicLevel.animatedFiles[acn.animationFile];
					var va1 = file1[frame1.startingTileIndex + (this.index - anin1)];
					if (va1) {
						if (canvas.fillStyle !== 'rbga(255,255,255,255)') {
							canvas.fillStyle = 'rbga(255,255,255,255)';
						}
						va1.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
						return true;
					}
				}
			}
			//
			//                    this.willAnimate = an;
			//
			//                    var ind = animationFrame;
			//
			//                    var frame = an.Frames[ind];
			//
			//                    if (!frame) frame = an.Frames[0];
			//
			//                    var file = sonicManager.SonicLevel.AnimatedFiles[an.AnimationFile];
			//
			//                    var va = file[frame.StartingTileIndex + (this.index - anin)];
			//
			//                    if (va) {
			//
			//                    if (canvas.fillStyle != "rbga(255,255,255,255)")
			//
			//                    canvas.fillStyle = "rbga(255,255,255,255)";
			//
			//                    va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
			//
			//                    return true;
			//
			//                    }
			//
			//                    
			//
			//                    }
			//
			//                    }
		}
		this.$canAnimate = false;
		return false;
	},
	$changeColor: function(x, y, color) {
		this.colors[x][y] = color;
		this.sprites = [];
	},
	getAllPaletteIndexes: function() {
		if (!this.curPaletteIndexes) {
			var d = [];
			for (var i = 0; i < this.colors.length; i++) {
				var color = this.colors[i];
				for (var jf = 0; jf < color.length; jf++) {
					var gj = { $: color[jf] };
					if (gj.$ === 0) {
						continue;
					}
					if (!Enumerable.from(d).any(Function.mkdel({ gj: gj }, function(D) {
						return D === this.gj.$;
					}))) {
						d.add(gj.$);
					}
				}
			}
			this.curPaletteIndexes = Type.cast(d.slice(0), Array);
		}
		return this.curPaletteIndexes;
	},
	clearCache: function() {
		this.curPaletteIndexes = null;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Tiles.TileChunk
OurSonic.Tiles.TileChunk = function() {
	this.$myLocalPoint = OurSonic.Point.$ctor1(0, 0);
	this.isOnlyBackground = null;
	this.isOnlyForeground = null;
	this.empty = null;
	this.sprites = null;
	this.hLayers = null;
	this.tilePieces = null;
	this.animated = null;
	this.index = 0;
	this.$1$HeightBlocks1Field = null;
	this.$1$HeightBlocks2Field = null;
	this.$1$AngleMap1Field = null;
	this.$1$AngleMap2Field = null;
	this.hLayers = [];
	this.sprites = [];
	this.isOnlyBackground = null;
};
OurSonic.Tiles.TileChunk.prototype = {
	get_heightBlocks1: function() {
		return this.$1$HeightBlocks1Field;
	},
	set_heightBlocks1: function(value) {
		this.$1$HeightBlocks1Field = value;
	},
	get_heightBlocks2: function() {
		return this.$1$HeightBlocks2Field;
	},
	set_heightBlocks2: function(value) {
		this.$1$HeightBlocks2Field = value;
	},
	get_angleMap1: function() {
		return this.$1$AngleMap1Field;
	},
	set_angleMap1: function(value) {
		this.$1$AngleMap1Field = value;
	},
	get_angleMap2: function() {
		return this.$1$AngleMap2Field;
	},
	set_angleMap2: function(value) {
		this.$1$AngleMap2Field = value;
	},
	getBlock: function(x, y) {
		return OurSonic.SonicManager.instance.sonicLevel.blocks[this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)].block];
	},
	getTilePiece: function(x, y) {
		return this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)];
	},
	onlyBackground: function() {
		if (ss.isValue(this.isOnlyBackground)) {
			return ss.Nullable.unbox(this.isOnlyBackground);
		}
		var blocks = OurSonic.SonicManager.instance.sonicLevel.blocks;
		var tpl = this.tilePieces.length;
		var tph = this.tilePieces[0].length;
		for (var i = 0; i < tpl; i++) {
			for (var j = 0; j < tph; j++) {
				var r = this.tilePieces[i][j];
				var pm = blocks[r.block];
				if (pm) {
					if (!pm.onlyBackground()) {
						return ss.Nullable.unbox(this.isOnlyBackground = false);
					}
				}
			}
		}
		this.isOnlyBackground = true;
		return ss.Nullable.unbox(this.isOnlyBackground);
	},
	onlyForeground: function() {
		if (ss.isValue(this.isOnlyForeground)) {
			return ss.Nullable.unbox(this.isOnlyForeground);
		}
		var blocks = OurSonic.SonicManager.instance.sonicLevel.blocks;
		var tpl = this.tilePieces.length;
		var tph = this.tilePieces[0].length;
		for (var i = 0; i < tpl; i++) {
			for (var j = 0; j < tph; j++) {
				var r = this.tilePieces[i][j];
				var pm = blocks[r.block];
				if (pm) {
					if (!pm.onlyForeground()) {
						return ss.Nullable.unbox(this.isOnlyForeground = false);
					}
				}
			}
		}
		this.isOnlyForeground = true;
		return ss.Nullable.unbox(this.isOnlyForeground);
	},
	isEmpty: function() {
		if (!this.empty) {
			var tpl = this.tilePieces.length;
			var tph = this.tilePieces[0].length;
			for (var i = 0; i < tpl; i++) {
				for (var j = 0; j < tph; j++) {
					var r = this.tilePieces[i][j];
					if (r.block !== 0) {
						return ss.Nullable.unbox(this.empty = false);
					}
				}
			}
			this.empty = true;
		}
		return ss.Nullable.unbox(this.empty);
	},
	draw: function(canvas, position, scale, layer, bounds) {
		canvas.save();
		var len1 = this.tilePieces.length;
		var len2 = this.tilePieces[0].length;
		var lX = 16 * scale.x;
		var lY = 16 * scale.y;
		var isBack = layer === 0;
		var blocks = OurSonic.SonicManager.instance.sonicLevel.blocks;
		for (var i = 0; i < len1; i++) {
			for (var j = 0; j < len2; j++) {
				var r = this.tilePieces[i][j];
				var pm = blocks[r.block];
				if (pm) {
					if (this.$drawIt(canvas, position, scale, layer, lX, lY, r, j, pm, isBack, i, len1)) {
						continue;
					}
				}
			}
		}
		canvas.restore();
	},
	$drawIt: function(canvas, position, scale, layer, lX, lY, r, j, pm, isBack, i, len1) {
		if ((isBack ? pm.onlyForeground$1 : pm.onlyBackground$1)) {
			return true;
		}
		var animatedIndex = 0;
		if (this.animated && this.animated[j * len1 + i]) {
			animatedIndex = this.animated[j * len1 + i].lastAnimatedIndex;
		}
		this.$myLocalPoint.x = position.x + i * lX;
		this.$myLocalPoint.y = position.y + j * lY;
		pm.draw(canvas, this.$myLocalPoint, scale, layer, r.xFlip, r.yFlip, animatedIndex);
		//canvas.StrokeStyle = "#FFF";
		//canvas.StrokeRect(position.X + i * 16 * scale.X, position.Y + j * 16 * scale.Y, scale.X * 16, scale.Y * 16);
		return false;
	},
	animatedTick: function() {
		var $t1 = Object.getObjectEnumerator(this.animated);
		try {
			while ($t1.moveNext()) {
				var an = $t1.get_current();
				var anni = an.value;
				if (!anni.lastAnimatedFrame) {
					anni.lastAnimatedFrame = 0;
					anni.lastAnimatedIndex = 0;
				}
				if (anni.frames[anni.lastAnimatedIndex].ticks === 0 || ss.Nullable.ge(ss.Nullable.sub(OurSonic.SonicManager.instance.drawTickCount, anni.lastAnimatedFrame), ((anni.automatedTiming > 0) ? anni.automatedTiming : anni.frames[anni.lastAnimatedIndex].ticks))) {
					anni.lastAnimatedFrame = OurSonic.SonicManager.instance.drawTickCount;
					anni.lastAnimatedIndex = (anni.lastAnimatedIndex + 1) % anni.frames.length;
				}
			}
		}
		finally {
			$t1.dispose();
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Tiles.TileItem
OurSonic.Tiles.TileItem = function() {
	this._Tile = 0;
	this.priority = false;
	this.xFlip = false;
	this.yFlip = false;
	this.palette = 0;
	this.index = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Tiles.TilePiece
OurSonic.Tiles.TilePiece = function() {
	this.$drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
	this.$drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
	this.onlyBackground$1 = false;
	this.$onlyBackgroundSet = false;
	this.onlyForeground$1 = false;
	this.$onlyForegroundSet = false;
	this.image = null;
	this.heightMask = null;
	this.tiles = null;
	this.block = 0;
	this.xFlip = false;
	this.yFlip = false;
	this.animatedFrames = null;
	this.index = 0;
	this.solid1 = 0;
	this.solid2 = 0;
	this.image = {};
};
OurSonic.Tiles.TilePiece.prototype = {
	clearCache: function() {
		this.image = {};
	},
	onlyBackground: function() {
		if (this.$onlyBackgroundSet) {
			return this.onlyBackground$1;
		}
		var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
		var $t1 = this.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var mj = $t1.get_current();
				if (tiles[mj._Tile]) {
					if (mj.priority) {
						this.$onlyBackgroundSet = true;
						return this.onlyBackground$1 = false;
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
		this.$onlyBackgroundSet = true;
		return this.onlyBackground$1 = true;
	},
	onlyForeground: function() {
		if (this.$onlyForegroundSet) {
			return this.onlyForeground$1;
		}
		var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
		var $t1 = this.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var mj = $t1.get_current();
				if (tiles[mj._Tile]) {
					if (!mj.priority) {
						this.$onlyForegroundSet = true;
						return this.onlyForeground$1 = false;
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
		this.$onlyForegroundSet = true;
		return this.onlyForeground$1 = true;
	},
	drawUI: function(canvas, position, scale, xflip, yflip) {
		//                var drawOrderIndex = 0;
		//                if (xflip) {
		//                if (yflip) {
		//                drawOrderIndex = 0;
		//                } else {
		//                drawOrderIndex = 1;
		//                }
		//                } else {
		//                if (yflip) {
		//                drawOrderIndex = 2;
		//                
		//                } else {
		//                drawOrderIndex = 3;
		//                }
		//                }
		//                for (var i = 0; i < this.tiles.length; i++) {
		//                var mj = sonicManager.SonicLevel.Tiles[this.tiles[i].Tile];
		//                if (mj) {
		//                var df = drawInfo[drawOrder[drawOrderIndex][i]];
		//                TilePiece.__position.x = position.x + df[0] * 8 * scale.x;
		//                TilePiece.__position.y = position.y + df[1] * 8 * scale.y;
		//                mj.drawUI(canvas, TilePiece.__position, scale, (xflip^ mj.XFlip), (yflip^mj.YFlip), mj.Palette);
		//                
		//                
		//                }
		//                /* canvas.lineWidth = 2;
		//                canvas.strokeStyle = "#D142AA";
		//                canvas.strokeRect(position.x, position.y, 16 * scale.x, 16 * scale.y);#1#
		//                }
		//                
		//                
		//                //canvas.fillStyle = "#FFFFFF";
		//                //canvas.fillText(sonicManager.SonicLevel.Blocks.indexOf(this), position.x + 8 * scale.x, position.y + 8 * scale.y);
		//                
		//                
		//                return true;
	},
	draw: function(canvas, position, scale, layer, xFlip, yFlip, animatedIndex) {
		var drawOrderIndex = 0;
		drawOrderIndex = (xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3));
		var fd = this.$getCache(layer, scale, drawOrderIndex, animatedIndex, OurSonic.SonicManager.instance.sonicLevel.palAn);
		if (!fd) {
			fd = this.$buildCache(scale, layer, xFlip, yFlip, animatedIndex, drawOrderIndex);
		}
		this.$drawIt(canvas, fd, position);
		return true;
	},
	$buildCache: function(scale, layer, xFlip, yFlip, animatedIndex, drawOrderIndex) {
		var fd;
		var ac = OurSonic.Help.defaultCanvas(8 * OurSonic.SonicManager.instance.scale.x * 2, 8 * OurSonic.SonicManager.instance.scale.y * 2);
		var sX = 8 * scale.x;
		var sY = 8 * scale.y;
		var i = 0;
		var localPoint = OurSonic.Point.$ctor1(0, 0);
		var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
		for (var index = 0; index < this.tiles.length; index++) {
			var mj = this.tiles[index];
			if (tiles[mj._Tile]) {
				if (mj.priority === (layer === 1)) {
					var _xf = xFlip ^ mj.xFlip;
					var _yf = yFlip ^ mj.yFlip;
					var df = this.$drawInfo[this.$drawOrder[drawOrderIndex][i]];
					localPoint.x = df[0] * sX;
					localPoint.y = df[1] * sY;
					tiles[mj._Tile].draw(ac.context, localPoint, scale, _xf, _yf, mj.palette, layer, animatedIndex);
				}
			}
			i++;
		}
		fd = ac.canvas;
		this.$setCache(layer, scale, drawOrderIndex, animatedIndex, OurSonic.SonicManager.instance.sonicLevel.palAn, fd);
		return fd;
	},
	$setCache: function(layer, scale, drawOrder, animationFrame, palAn, image) {
		var val = (drawOrder << 8) + (scale.x << 16) + (animationFrame << 20) + (layer + 1 << 24);
		//okay
		if (this.animatedFrames.length > 0) {
			for (var index = 0; index < this.animatedFrames.length; index++) {
				var animatedFrame = this.animatedFrames[index];
				val += palAn[animatedFrame] + ' ';
			}
		}
		this.image[val] = image;
	},
	$drawIt: function(canvas, fd, position) {
		canvas.drawImage(fd, position.x, position.y);
	},
	$getCache: function(layer, scale, drawOrder, animationFrame, palAn) {
		var val = (drawOrder << 8) + (scale.x << 16) + (animationFrame << 20) + (layer + 1 << 24);
		//okay
		if (this.animatedFrames.length > 0) {
			for (var $t1 = 0; $t1 < this.animatedFrames.length; $t1++) {
				var animatedFrame = this.animatedFrames[$t1];
				val += palAn[animatedFrame] + ' ';
			}
		}
		return this.image[val];
	},
	init: function() {
		this.onlyBackground();
		this.onlyForeground();
	}
};
Type.registerNamespace('OurSonic.UIManager.Areas');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Areas.LevelInformationArea
OurSonic.UIManager.Areas.LevelInformationArea = function(manager) {
	var levelInformation = new OurSonic.UIManager.UIArea(70, 70, 460, 420);
	manager.addArea(levelInformation);
	var $t1 = new OurSonic.UIManager.TextArea(30, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Level Selector'));
	$t1.font = OurSonic.UIManager.UIManager.textFont;
	$t1.color = 'blue';
	levelInformation.addControl(OurSonic.UIManager.TextArea).call(levelInformation, $t1);
	var $t2 = new OurSonic.UIManager.TextArea(30, 52, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(function() {
		return OurSonic.UIManager.UIManager.get_curLevelName();
	}));
	$t2.font = OurSonic.UIManager.UIManager.textFont;
	$t2.color = 'black';
	levelInformation.addControl(OurSonic.UIManager.TextArea).call(levelInformation, $t2);
	var $t3 = new OurSonic.UIManager.Button(320, 70, 100, 22, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Save Level'));
	$t3.font = OurSonic.UIManager.UIManager.buttonFont;
	$t3.color = 'rgb(50,150,50)';
	levelInformation.addControl(OurSonic.UIManager.Button).call(levelInformation, $t3);
	var $t4 = new OurSonic.UIManager.Button(320, 105, 160, 22, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Load Empty Level'));
	$t4.font = OurSonic.UIManager.UIManager.buttonFont;
	$t4.color = 'rgb(50,150,50)';
	$t4.click = function() {
		//  levelManagerArea.visible = true;
		//  loadingText.visible = true;
		//  var index = 0;
		//  var tim = function () {
		//  var max = 188;
		//  if (index == max) {
		//  setTimeout(function () {
		//  alert(_H.stringify(sonicManager.SonicLevel));
		//  sonicManager.uiManager.loadGame(_H.stringify(sonicManager.SonicLevel), sonicManager.mainCanvas);
		//  loadingText.visible = false;
		//  }, 500);
		//  return;
		//  }
		//  setTimeout(tim, 100);
		//  
		//  _H.loadSprite("assets/Chunks/Tile" + index++ + ".png", function (image) {
		//  loadingText.text = "Loading " + index + "/" + max;
		//  sonicManager.importChunkFromImage(image);
		//  if (index == max) {
		//  sonicManager.inds = { done: true };
		//  }
		//  });
		//  
		//  };
		//  setTimeout(tim, 100);
	};
	levelInformation.addControl(OurSonic.UIManager.Button).call(levelInformation, $t4);
	var $t5 = new OurSonic.UIManager.ScrollBox(30, 70);
	$t5.itemHeight = 25;
	$t5.visibleItems = 11;
	$t5.itemWidth = 250;
	$t5.backColor = 'rgb(50, 60, 127)';
	var ctls = levelInformation.addControl(OurSonic.UIManager.ScrollBox).call(levelInformation, $t5);
	var loadLevel = function(name) {
		OurSonic.UIManager.UIManager.updateTitle('Downloading ' + name);
		OurSonic.SonicEngine.instance.client.emit('LoadLevel.Request', new (Type.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(name));
		OurSonic.SonicEngine.instance.client.on('LoadLevel.Response', function(data) {
			var lvl = data.Data;
			OurSonic.UIManager.UIManager.updateTitle('Loading: ' + name);
			manager.sonicManager.load(lvl);
		});
	};
	OurSonic.SonicEngine.instance.client.on('GetLevels.Response', function(data1) {
		for (var $t6 = 0; $t6 < data1.Data.length; $t6++) {
			var uiArea = data1.Data[$t6];
			var area = { $: uiArea };
			var $t7 = new OurSonic.UIManager.Button(0, 0, 0, 0, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2(uiArea));
			$t7.color = 'rgb(50,190,90)';
			$t7.click = Function.mkdel({ area: area }, function() {
				loadLevel(this.area.$);
			});
			ctls.addControl(OurSonic.UIManager.Button).call(ctls, $t7);
		}
	});
	OurSonic.SonicEngine.instance.client.emit('GetLevels.Request', null);
	OurSonic.UIManager.UIManager.set_curLevelName('Level Not Loaded');
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Areas.MainPanelData
OurSonic.UIManager.Areas.MainPanelData = function() {
	this.$1$AssetPopulateField = null;
	this.$1$FrameAreaField = null;
	this.$1$LoadFrameField = null;
};
OurSonic.UIManager.Areas.MainPanelData.prototype = {
	get_assetPopulate: function() {
		return this.$1$AssetPopulateField;
	},
	set_assetPopulate: function(value) {
		this.$1$AssetPopulateField = value;
	},
	get_frameArea: function() {
		return this.$1$FrameAreaField;
	},
	set_frameArea: function(value) {
		this.$1$FrameAreaField = value;
	},
	get_loadFrame: function() {
		return this.$1$LoadFrameField;
	},
	set_loadFrame: function(value) {
		this.$1$LoadFrameField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Areas.ObjectFrameworkArea
OurSonic.UIManager.Areas.ObjectFrameworkArea = function(manager) {
	this.data = null;
	this.data = OurSonic.UIManager.Areas.ObjectFrameworkData.$ctor();
	this.data.objectFramework = new OurSonic.Level.LevelObject('Foo');
	var size = 160;
	var $t1 = new OurSonic.UIManager.UIArea(540, 75, 850, 690);
	$t1.closable = true;
	var objectFrameworkArea = $t1;
	manager.addArea(objectFrameworkArea);
	var $t2 = new OurSonic.UIManager.TextArea(30, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Object Framework'));
	$t2.color = 'blue';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t2);
	var $t3 = new OurSonic.UIManager.TextArea(16, 60, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Assets'));
	$t3.color = 'black';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t3);
	var $t4 = new OurSonic.UIManager.Button(160, 38, 140, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Add Asset'));
	$t4.color = 'rgb(50,150,50)';
	$t4.click = Function.mkdel(this, function() {
		this.data.objectFramework.assets.add(new OurSonic.Level.LevelObjectAsset('Asset ' + (this.data.objectFramework.assets.length + 1)));
		this.$populate(this.data.objectFramework);
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t4);
	var $t6 = this.data;
	var $t5 = new OurSonic.UIManager.ScrollBox(30, 70);
	$t5.itemHeight = 25;
	$t5.visibleItems = 4;
	$t5.itemWidth = 250;
	$t5.backColor = 'rgb(50, 60, 127)';
	objectFrameworkArea.addControl(OurSonic.UIManager.ScrollBox).call(objectFrameworkArea, $t6.assets = $t5);
	var $t7 = new OurSonic.UIManager.TextArea(16, 60 + size * 1, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Pieces'));
	$t7.color = 'black';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t7);
	var $t8 = new OurSonic.UIManager.Button(160, 38 + size * 1, 140, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Add Piece'));
	$t8.color = 'rgb(50,150,50)';
	$t8.click = Function.mkdel(this, function() {
		this.data.objectFramework.pieces.add(OurSonic.Level.LevelObjectPiece.$ctor('Piece ' + (this.data.objectFramework.pieces.length + 1)));
		this.$populate(this.data.objectFramework);
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t8);
	var $t10 = this.data;
	var $t9 = new OurSonic.UIManager.ScrollBox(30, 70 + size * 1);
	$t9.itemHeight = 25;
	$t9.visibleItems = 4;
	$t9.itemWidth = 250;
	$t9.backColor = 'rgb(50, 60, 127)';
	objectFrameworkArea.addControl(OurSonic.UIManager.ScrollBox).call(objectFrameworkArea, $t10.pieces = $t9);
	var $t11 = new OurSonic.UIManager.TextArea(16, 60 + size * 2, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Piece Layouts'));
	$t11.color = 'black';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t11);
	var $t12 = new OurSonic.UIManager.Button(160, 38 + size * 2, 140, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Add Piece Layout'));
	$t12.color = 'rgb(50,150,50)';
	$t12.click = Function.mkdel(this, function() {
		this.data.objectFramework.pieceLayouts.add(new OurSonic.Level.LevelObjectPieceLayout('Piece Layout ' + (this.data.objectFramework.pieceLayouts.length + 1)));
		this.$populate(this.data.objectFramework);
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t12);
	var $t14 = this.data;
	var $t13 = new OurSonic.UIManager.ScrollBox(30, 70 + size * 2);
	$t13.itemHeight = 25;
	$t13.visibleItems = 4;
	$t13.itemWidth = 250;
	$t13.backColor = 'rgb(50, 60, 127)';
	objectFrameworkArea.addControl(OurSonic.UIManager.ScrollBox).call(objectFrameworkArea, $t14.pieceLayouts = $t13);
	var $t15 = new OurSonic.UIManager.TextArea(16, 60 + size * 3, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Projectiles'));
	$t15.color = 'black';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t15);
	var $t16 = new OurSonic.UIManager.Button(160, 38 + size * 3, 140, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Add Projectile'));
	$t16.color = 'rgb(50,150,50)';
	$t16.click = Function.mkdel(this, function() {
		this.data.objectFramework.projectiles.add(OurSonic.Level.LevelObjectProjectile.$ctor('Piece Projectile ' + (this.data.objectFramework.projectiles.length + 1)));
		this.$populate(this.data.objectFramework);
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t16);
	var $t18 = this.data;
	var $t17 = new OurSonic.UIManager.ScrollBox(30, 70 + size * 3);
	$t17.itemHeight = 25;
	$t17.visibleItems = 4;
	$t17.itemWidth = 250;
	$t17.backColor = 'rgb(50, 60, 127)';
	objectFrameworkArea.addControl(OurSonic.UIManager.ScrollBox).call(objectFrameworkArea, $t18.projectiles = $t17);
	var $t19 = new OurSonic.UIManager.TextArea(320, 60, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Key: '));
	$t19.font = OurSonic.UIManager.UIManager.smallTextFont;
	$t19.color = 'black';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t19);
	var $t21 = this.data;
	var $t20 = new OurSonic.UIManager.TextBox(370, 40, 150, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2(''));
	$t20.color = 'rgb(50,150,50)';
	$t20.click = Function.mkdel(this, function() {
		this.data.objectFramework.key = this.data.key.text;
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.TextBox).call(objectFrameworkArea, $t21.key = $t20);
	var $t22 = new OurSonic.UIManager.TextArea(525, 56, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Description: '));
	$t22.font = OurSonic.UIManager.UIManager.smallTextFont;
	$t22.color = 'black';
	objectFrameworkArea.addControl(OurSonic.UIManager.TextArea).call(objectFrameworkArea, $t22);
	var $t24 = this.data;
	var $t23 = new OurSonic.UIManager.TextBox(610, 40, 220, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2(''));
	$t23.color = 'rgb(50,150,50)';
	$t23.click = Function.mkdel(this, function() {
		this.data.objectFramework.set_description(this.data.description.text);
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.TextBox).call(objectFrameworkArea, $t24.description = $t23);
	var $t26 = this.data;
	var $t25 = new OurSonic.UIManager.Button(320, 75, 250, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('onInit'));
	$t25.color = 'rgb(50,150,50)';
	$t25.click = Function.mkdel(this, function() {
		this.data.b2.toggled = false;
		this.data.b3.toggled = false;
		this.data.b4.toggled = false;
		if (this.data.b1.toggled) {
			this.$addCodeWindow(this.data.objectFramework.initScript, Function.mkdel(this, function() {
				this.data.objectFramework.initScript = this.data.editor.getValue();
			}));
		}
		else {
			this.clearMainArea();
		}
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t26.b1 = $t25);
	this.data.b1.toggle = true;
	var $t28 = this.data;
	var $t27 = new OurSonic.UIManager.Button(580, 75, 250, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('onTick'));
	$t27.color = 'rgb(50,150,50)';
	$t27.click = Function.mkdel(this, function() {
		this.data.b1.toggled = false;
		this.data.b3.toggled = false;
		this.data.b4.toggled = false;
		if (this.data.b2.toggled) {
			this.$addCodeWindow(this.data.objectFramework.tickScript, Function.mkdel(this, function() {
				this.data.objectFramework.tickScript = this.data.editor.getValue();
			}));
		}
		else {
			this.clearMainArea();
		}
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t28.b2 = $t27);
	this.data.b2.toggle = true;
	var $t30 = this.data;
	var $t29 = new OurSonic.UIManager.Button(320, 110, 250, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('onCollide'));
	$t29.color = 'rgb(50,150,50)';
	$t29.click = Function.mkdel(this, function() {
		this.data.b1.toggled = false;
		this.data.b2.toggled = false;
		this.data.b4.toggled = false;
		if (this.data.b3.toggled) {
			this.$addCodeWindow(this.data.objectFramework.collideScript, Function.mkdel(this, function() {
				this.data.objectFramework.collideScript = this.data.editor.getValue();
			}));
		}
		else {
			this.clearMainArea();
		}
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t30.b3 = $t29);
	this.data.b3.toggle = true;
	var $t32 = this.data;
	var $t31 = new OurSonic.UIManager.Button(580, 110, 250, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('onHurtSonic'));
	$t31.color = 'rgb(50,150,50)';
	$t31.click = Function.mkdel(this, function() {
		this.data.b1.toggled = false;
		this.data.b2.toggled = false;
		this.data.b3.toggled = false;
		if (this.data.b4.toggled) {
			this.$addCodeWindow(this.data.objectFramework.hurtScript, Function.mkdel(this, function() {
				this.data.objectFramework.hurtScript = this.data.editor.getValue();
			}));
		}
		else {
			this.clearMainArea();
		}
	});
	objectFrameworkArea.addControl(OurSonic.UIManager.Button).call(objectFrameworkArea, $t32.b4 = $t31);
	this.data.b4.toggle = true;
	objectFrameworkArea.addControl(Type.makeGenericType(OurSonic.UIManager.Panel$1, [OurSonic.UIManager.Areas.MainPanelData])).call(objectFrameworkArea, this.data.mainPanel = new (Type.makeGenericType(OurSonic.UIManager.Panel$1, [OurSonic.UIManager.Areas.MainPanelData]))(new OurSonic.UIManager.Areas.MainPanelData(), 320, 150, 510, 510));
	//    setTimeout("        var sc = document.getElementById("picFieldUploader");sc.style.visibility = "hidden";sc.style.position="absolute";", 300);
};
OurSonic.UIManager.Areas.ObjectFrameworkArea.prototype = {
	$addCodeWindow: function(value, change) {
		this.clearMainArea();
		var $t2 = this.data.mainPanel;
		var $t1 = new OurSonic.UIManager.HtmlBox(15, -35);
		$t1.width = 485;
		$t1.height = 485;
		$t1.set_init(Function.mkdel(this, function() {
			$(document).append('<textarea id="code" name="code" style="position:absolute;width:485px;height:485px;"></textarea>');
			this.data.codeMirror = document.getElementById('code');
			this.data.codeMirror.value = value;
			var hlLine = null;
			var codeMirrorOptions = {
				lineNumbers: true,
				matchBrackets: true,
				onChange: change,
				onCursorActivity: Function.mkdel(this, function(e) {
					this.data.editor.setLineClass(hlLine, null);
					hlLine = this.data.editor.setLineClass(this.data.editor.getCursor().line, 'activeline');
				}),
				onFocus: function(editor) {
					OurSonic.SonicManager.instance.set_typingInEditor(true);
				},
				onBlur: function(editor1) {
					OurSonic.SonicManager.instance.set_typingInEditor(false);
				}
			};
			this.data.editor = CodeMirror.fromTextArea(this.data.codeMirror, codeMirrorOptions);
			this.data.editor.setOption('theme', 'night');
			hlLine = this.data.editor.setLineClass(0, 'activeline');
			var scroller = this.data.editor.getScrollerElement();
			scroller.style.height = '485px';
			scroller.style.width = '485px';
			this.data.editor.refresh();
		}));
		$t1.set_updatePosition(Function.mkdel(this, function(x, y) {
			var scroller1 = this.data.editor.getScrollerElement();
			if (ss.referenceEquals(scroller1.style.left, x + 'px') && ss.referenceEquals(scroller1.style.top, y + 'px')) {
				return;
			}
			scroller1.style.left = x + 'px';
			scroller1.style.top = y + 'px';
			this.data.editor.refresh();
		}));
		$t1.set__Focus(Function.mkdel(this, function() {
			var sc = this.data.editor.getScrollerElement();
			if (ss.isValue(sc)) {
				sc.style.visibility = 'visible';
			}
		}));
		$t1.set__Hide(Function.mkdel(this, function() {
			var sc1 = this.data.editor.getScrollerElement();
			this.data.editor.getInputField().blur();
			//            Engine.uiCanvasItem.focus();
			//            document.body.focus();
			//            editor.onBlur();
			if (ss.isValue(sc1)) {
				sc1.style.left = '-100px';
				sc1.style.top = '-100px';
				sc1.style.visibility = 'hidden';
			}
		}));
		$t2.addControl(OurSonic.UIManager.HtmlBox).call($t2, $t1);
	},
	clearMainArea: function() {
		this.data.mainPanel.controls = [];
		this.data.codeMirror = document.getElementById('code');
		$('.CodeMirror').remove();
		if (this.data.codeMirror) {
			this.data.codeMirror.parentNode.removeChild(this.data.codeMirror);
		}
		var sc = document.getElementById('picFieldUploader');
		if (ss.isValue(sc)) {
			sc.style.visibility = 'hidden';
		}
	},
	$populate: function(objectFramework) {
		this.clearMainArea();
		this.data.objectFramework = objectFramework;
		this.data.key.text = objectFramework.key;
		this.data.description.text = ss.coalesce(objectFramework.get_description(), '');
		this.data.assets.clearControls();
		var $t1 = objectFramework.assets.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				var b = { $: null };
				b.$ = new (Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectAsset]))(null, 0, 0, 0, 0, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel({ b: b }, function() {
					return this.b.$.data.name;
				})));
				b.$.color = 'rgb(50,190,90)';
				b.$.click = Function.mkdel({ b: b, $this: this }, function() {
					this.$this.data.b1.toggled = false;
					this.$this.data.b2.toggled = false;
					this.$this.data.b3.toggled = false;
					this.$this.data.b4.toggled = false;
					this.$this.$loadAsset(this.b.$.data);
				});
				b.$.data = t;
				this.data.assets.addControl(Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectAsset])).call(this.data.assets, b.$);
			}
		}
		finally {
			$t1.dispose();
		}
		this.data.pieces.clearControls();
		var $t2 = objectFramework.pieces.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var t1 = $t2.get_current();
				var b1 = { $: null };
				b1.$ = new (Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectPiece]))(null, 0, 0, 0, 0, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel({ b1: b1 }, function() {
					return this.b1.$.data.name;
				})));
				b1.$.color = 'rgb(50,190,90)';
				b1.$.click = Function.mkdel({ b1: b1, $this: this }, function() {
					this.$this.data.b1.toggled = false;
					this.$this.data.b2.toggled = false;
					this.$this.data.b3.toggled = false;
					this.$this.data.b4.toggled = false;
					this.$this.$loadPiece(this.b1.$.data);
				});
				this.data.pieces.addControl(Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectPiece])).call(this.data.pieces, b1.$);
				b1.$.data = t1;
			}
		}
		finally {
			$t2.dispose();
		}
		this.data.pieceLayouts.clearControls();
		var $t3 = objectFramework.pieceLayouts.getEnumerator();
		try {
			while ($t3.moveNext()) {
				var t2 = $t3.get_current();
				var b2 = { $: null };
				b2.$ = new (Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectPieceLayout]))(null, 0, 0, 0, 0, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel({ b2: b2 }, function() {
					return this.b2.$.data.name;
				})));
				b2.$.color = 'rgb(50,190,90)';
				b2.$.click = Function.mkdel({ b2: b2, $this: this }, function() {
					this.$this.data.b1.toggled = false;
					this.$this.data.b2.toggled = false;
					this.$this.data.b3.toggled = false;
					this.$this.data.b4.toggled = false;
					this.$this.$loadPieceLayout(this.b2.$.data);
				});
				this.data.pieceLayouts.addControl(Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectPieceLayout])).call(this.data.pieceLayouts, b2.$);
				b2.$.data = t2;
			}
		}
		finally {
			$t3.dispose();
		}
		this.data.projectiles.clearControls();
		var $t4 = objectFramework.projectiles.getEnumerator();
		try {
			while ($t4.moveNext()) {
				var t3 = $t4.get_current();
				var b3 = { $: null };
				b3.$ = new (Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectProjectile]))(null, 0, 0, 0, 0, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel({ b3: b3 }, function() {
					return this.b3.$.data.name;
				})));
				b3.$.color = 'rgb(50,190,90)';
				b3.$.click = Function.mkdel({ b3: b3, $this: this }, function() {
					this.$this.data.b1.toggled = false;
					this.$this.data.b2.toggled = false;
					this.$this.data.b3.toggled = false;
					this.$this.data.b4.toggled = false;
					this.$this.$loadProjectile(this.b3.$.data);
				});
				this.data.projectiles.addControl(Type.makeGenericType(OurSonic.UIManager.Button$1, [OurSonic.Level.LevelObjectProjectile])).call(this.data.projectiles, b3.$);
				b3.$.data = t3;
			}
		}
		finally {
			$t4.dispose();
		}
	},
	$loadProjectile: function(data) {
		//
		//                    objectFrameworkArea.clearMainArea();
		//
		//                    
		//
		//                    
		//
		//                    objectFrameworkArea.mainPanel.addControl(new TextArea(25, 25, "Name: ", sonicManager.uiManager.textFont, "black"));
		//
		//                    objectFrameworkArea.mainPanel.addControl(new TextBox(100, 5, 290, 25, projectile.name, sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () { projectile.name = this.text; }));
		//
		//                    var b;
		//
		//                    objectFrameworkArea.mainPanel.addControl(b = new Button(40, 160, 70, 25, "XFlip", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
		//
		//                    projectile.xflip = b.toggled;
		//
		//                    }));
		//
		//                    b.toggle = true;
		//
		//                    b.toggled = projectile.xflip;
		//
		//                    
		//
		//                    var c;
		//
		//                    objectFrameworkArea.mainPanel.addControl(c = new Button(115, 160, 70, 25, "YFlip", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
		//
		//                    projectile.yflip = c.toggled;
		//
		//                    }));
		//
		//                    c.toggle = true;
		//
		//                    c.toggled = projectile.yflip;
		//
		//                    
		//
		//                    
		//
		//                    var jd;
		//
		//                    objectFrameworkArea.mainPanel.addControl(jd = new HScrollBox(20, 35, 70, 4, 112, "rgb(50,60,127)"));
		//
		//                    var bd;
		//
		//                    jd.controls = [];
		//
		//                    for (var i = 0; i < objectFrameworkArea.objectFramework.assets.length; i++) {
		//
		//                    jd.addControl(bd = new ImageButton(0, 0, 0, 0, function () { return this.state.name; }, "10pt Arial", function (canvas, x, y) {
		//
		//                    if (this.state.frames.length == 0) return;
		//
		//                    this.state.frames[0].drawSimple(canvas, { x: x, y: y }, this.width, this.height - 15, projectile.xflip, projectile.yflip);
		//
		//                    }, function () {
		//
		//                    
		//
		//                    
		//
		//                    for (var j = 0; j < jd.controls.length; j++) {
		//
		//                    if (jd.controls[j] == this) {
		//
		//                    if (projectile.assetIndex == j)
		//
		//                    this.toggled = true;
		//
		//                    
		//
		//                    projectile.assetIndex = j;
		//
		//                    continue;
		//
		//                    }
		//
		//                    jd.controls[j].toggled = false;
		//
		//                    }
		//
		//                    
		//
		//                    }));
		//
		//                    bd.toggle = true;
		//
		//                    bd.state = objectFrameworkArea.objectFramework.assets[i];
		//
		//                    if (projectile.assetIndex == i) {
		//
		//                    bd.toggled = true;
		//
		//                    }
		//
		//                    }
	},
	$loadPieceLayout: function(data) {
		//
		//        objectFrameworkArea.clearMainArea();
		//
		//        
		//
		//        
		//
		//        objectFrameworkArea.mainPanel.addControl(new TextArea(25, 25, "Name: ", sonicManager.uiManager.textFont, "black"));
		//
		//        objectFrameworkArea.mainPanel.addControl(new TextBox(100, 5, 390, 25, pieceLayout.name, sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () { pieceLayout.name = this.text; }));
		//
		//        
		//
		//        
		//
		//        objectFrameworkArea.mainPanel.addControl(pe = new PieceLayoutEditor(145, 105, { width: 350, height: 280 }));
		//
		//        pe.init(pieceLayout);
		//
		//        
		//
		//        var listOfPieces;
		//
		//        objectFrameworkArea.mainPanel.addControl(listOfPieces = new ScrollBox(10, 105, 70, 5, 112, "rgb(50,60,127)"));
		//
		//        
		//
		//        
		//
		//        var selectPieceScroll;
		//
		//        objectFrameworkArea.mainPanel.addControl(objectFrameworkArea.mainPanel.selectPieceScroll = selectPieceScroll = new HScrollBox(145, 390, 70, 3, 112, "rgb(50,60,127)"));
		//
		//        var bdc;
		//
		//        selectPieceScroll.controls = [];
		//
		//        
		//
		//        
		//
		//        objectFrameworkArea.mainPanel.addControl(objectFrameworkArea.mainPanel.priorityDrawing = new Button(148, 38, 140, 25, "Foreground", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
		//
		//        pe.pieceLayoutMaker.setPriority(this.toggled);
		//
		//        }));
		//
		//        objectFrameworkArea.mainPanel.priorityDrawing.toggle = true;
		//
		//        
		//
		//        
		//
		//        for (var i = 0; i < objectFrameworkArea.objectFramework.pieces.length; i++) {
		//
		//        
		//
		//        selectPieceScroll.addControl(bdc = new ImageButton(0, 0, 0, 0,
		//
		//        function () {
		//
		//        return objectFrameworkArea.objectFramework.pieces[this.state.index].name;
		//
		//        }, "10pt Arial",
		//
		//        function (canvas, x, y) {
		//
		//        var d = objectFrameworkArea.objectFramework.pieces[this.state.index];
		//
		//        var ast = objectFrameworkArea.objectFramework.assets[d.assetIndex];
		//
		//        if (ast.frames.length == 0) return;
		//
		//        ast.frames[0].drawSimple(canvas, { x: x, y: y }, this.width, this.height - 15, d.xflip, d.yflip);
		//
		//        }, function () {
		//
		//        listOfPieces.controls[pe.pieceLayoutMaker.selectedPieceIndex].state.pieceIndex = this.state.index;
		//
		//        
		//
		//        for (var i = 0; i < selectPieceScroll.controls.length; i++) {
		//
		//        if (selectPieceScroll.controls[i] == this)
		//
		//        selectPieceScroll.controls[i].toggled = true;
		//
		//        else
		//
		//        selectPieceScroll.controls[i].toggled = false;
		//
		//        }
		//
		//        }));
		//
		//        
		//
		//        bdc.state = {
		//
		//        piece: pieceLayout.pieces[0],
		//
		//        index: i
		//
		//        };
		//
		//        bdc.toggle = true;
		//
		//        if (pieceLayout.pieces[0])
		//
		//        bdc.toggled = pieceLayout.pieces[0].pieceIndex == i;
		//
		//        }
		//
		//        
		//
		//        var pe;
		//
		//        var showB;
		//
		//        objectFrameworkArea.mainPanel.addControl(showB = new Button(348, 38, 140, 25, "Show Images", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
		//
		//        pe.pieceLayoutMaker.showImages = this.toggled;
		//
		//        }));
		//
		//        showB.toggle = true;
		//
		//        
		//
		//        objectFrameworkArea.mainPanel.addControl(new Button(348, 68, 140, 25, "Add Branch", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
		//
		//        var pc;
		//
		//        pe.pieceLayoutMaker.pieceLayout.pieces.push(pc = new LevelObjectPieceLayoutPiece(_H.floor(objectFrameworkArea.objectFramework.pieces.length * Math.random())));
		//
		//        pc.x = _H.floor(Math.random() * pe.pieceLayoutMaker.pieceLayout.width);
		//
		//        pc.y = _H.floor(Math.random() * pe.pieceLayoutMaker.pieceLayout.height);
		//
		//        
		//
		//        pe.pieceLayoutMaker.selectedPieceIndex = pe.pieceLayoutMaker.pieceLayout.pieces.length - 1;
		//
		//        
		//
		//        buildleftScroll();
		//
		//        }));
		//
		//        
		//
		//        function buildleftScroll() {
		//
		//        var bd;
		//
		//        
		//
		//        listOfPieces.controls = [];
		//
		//        for (var i = 0; i < pieceLayout.pieces.length; i++) {
		//
		//        
		//
		//        listOfPieces.addControl(bd = new ImageButton(0, 0, 0, 0, function () {
		//
		//        return objectFrameworkArea.objectFramework.pieces[this.state.pieceIndex].name;
		//
		//        }, "10pt Arial", function (canvas, x, y) {
		//
		//        var pc = objectFrameworkArea.objectFramework.pieces[this.state.pieceIndex];
		//
		//        var ast = objectFrameworkArea.objectFramework.assets[pc.assetIndex];
		//
		//        if (ast.frames.length == 0) return;
		//
		//        ast.frames[0].drawSimple(canvas, { x: x, y: y }, this.width, this.height - 15, pc.xflip, pc.yflip);
		//
		//        }, function () {
		//
		//        
		//
		//        for (var j = 0; j < listOfPieces.controls.length; j++) {
		//
		//        if (this == listOfPieces.controls[j]) {
		//
		//        listOfPieces.controls[j].toggled = true;
		//
		//        pe.pieceLayoutMaker.selectedPieceIndex = j;
		//
		//        } else {
		//
		//        listOfPieces.controls[j].toggled = false;
		//
		//        }
		//
		//        }
		//
		//        
		//
		//        for (var j = 0; j < selectPieceScroll.controls.length; j++) {
		//
		//        
		//
		//        selectPieceScroll.controls[j].state.piece = this.state;
		//
		//        selectPieceScroll.controls[j].toggled = (j == pieceLayout.pieces[pe.pieceLayoutMaker.selectedPieceIndex].pieceIndex);
		//
		//        
		//
		//        }
		//
		//        
		//
		//        }));
		//
		//        bd.toggle = true;
		//
		//        bd.state = pieceLayout.pieces[i];
		//
		//        if (i == pe.pieceLayoutMaker.selectedPieceIndex) bd.toggled = true;
		//
		//        }
		//
		//        }
		//
		//        
		//
		//        buildleftScroll();
		//
		//        
		//
		//        objectFrameworkArea.mainPanel.updatePieces = function () {
		//
		//        var df;
		//
		//        for (var j = 0; j < listOfPieces.controls.length; j++) {
		//
		//        if (j == pe.pieceLayoutMaker.selectedPieceIndex) {
		//
		//        listOfPieces.controls[j].toggled = true;
		//
		//        df = listOfPieces.controls[j];
		//
		//        }
		//
		//        else {
		//
		//        listOfPieces.controls[j].toggled = false;
		//
		//        }
		//
		//        }
		//
		//        
		//
		//        for (var j = 0; j < objectFrameworkArea.mainPanel.selectPieceScroll.controls.length; j++) {
		//
		//        df.piece = this;
		//
		//        if (df.piece.pieceIndex == j)
		//
		//        objectFrameworkArea.mainPanel.selectPieceScroll.controls[j].toggled = true;
		//
		//        else
		//
		//        objectFrameworkArea.mainPanel.selectPieceScroll.controls[j].toggled = false;
		//
		//        }
		//
		//        
		//
		//        
		//
		//        };
	},
	$loadPiece: function(piece) {
		this.clearMainArea();
		var $t2 = this.data.mainPanel;
		var $t1 = new OurSonic.UIManager.TextArea(25, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Name: '));
		$t1.color = 'black';
		$t2.addControl(OurSonic.UIManager.TextArea).call($t2, $t1);
		var textBox = null;
		var $t4 = this.data.mainPanel;
		var $t3 = new OurSonic.UIManager.TextBox(100, 5, 290, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2(piece.name));
		$t3.color = 'rgb(50,150,50)';
		$t3.click = function() {
			piece.name = textBox.text;
		};
		$t4.addControl(OurSonic.UIManager.TextBox).call($t4, textBox = $t3);
		var b = null;
		var $t6 = this.data.mainPanel;
		var $t5 = new OurSonic.UIManager.Button(40, 160, 70, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('XFlip'));
		$t5.color = 'rgb(50,150,50)';
		$t5.click = function() {
			piece.xflip = b.toggled;
		};
		$t6.addControl(OurSonic.UIManager.Button).call($t6, b = $t5);
		b.toggle = true;
		b.toggled = piece.xflip;
		var c = null;
		var $t8 = this.data.mainPanel;
		var $t7 = new OurSonic.UIManager.Button(115, 160, 70, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('YFlip'));
		$t7.color = 'rgb(50,150,50)';
		$t7.click = function() {
			piece.yflip = c.toggled;
		};
		$t8.addControl(OurSonic.UIManager.Button).call($t8, c = $t7);
		c.toggle = true;
		c.toggled = piece.yflip;
		var jd;
		var $t10 = this.data.mainPanel;
		var $t9 = new OurSonic.UIManager.HScrollBox(20, 35, 70, 4, 112);
		$t9.backColor = 'rgb(50,60,127)';
		$t10.addControl(OurSonic.UIManager.HScrollBox).call($t10, jd = $t9);
		var bd = null;
		jd.controls = [];
		for (var i = 0; i < this.data.objectFramework.assets.length; i++) {
			var $t11 = new (Type.makeGenericType(OurSonic.UIManager.ImageButton$1, [OurSonic.Level.LevelObjectAsset]))(null, 0, 0, 0, 0);
			$t11.text = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(function() {
				return bd.data.name;
			});
			$t11.image = function(canvas, x, y) {
				if (bd.data.frames.length === 0) {
					return;
				}
				bd.data.frames[0].drawSimple(canvas, OurSonic.Point.$ctor1(x, y), bd.width, bd.height - 15, piece.xflip, piece.yflip);
			};
			$t11.click = function() {
				for (var j = 0; j < jd.controls.length; j++) {
					if (ss.referenceEquals(jd.controls[j], bd)) {
						if (piece.assetIndex === j) {
							bd.toggled = true;
						}
						piece.assetIndex = j;
						continue;
					}
					Type.cast(jd.controls[j], OurSonic.UIManager.ImageButton).toggled = false;
				}
			};
			jd.addControl(bd = $t11);
			bd.toggle = true;
			bd.data = this.data.objectFramework.assets[i];
			if (piece.assetIndex === i) {
				bd.toggled = true;
			}
		}
	},
	$loadAsset: function(asset) {
		this.clearMainArea();
		var $t2 = this.data.mainPanel;
		var $t1 = new OurSonic.UIManager.TextArea(25, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Name: '));
		$t1.color = 'black';
		$t2.addControl(OurSonic.UIManager.TextArea).call($t2, $t1);
		var tb = null;
		var $t4 = this.data.mainPanel;
		var $t3 = new OurSonic.UIManager.TextBox(100, 5, 290, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2(asset.name));
		$t3.color = 'rgb(50,150,50)';
		$t3.click = function() {
			asset.name = tb.text;
		};
		$t4.addControl(OurSonic.UIManager.TextBox).call($t4, tb = $t3);
		var $t6 = this.data.mainPanel;
		var $t5 = new OurSonic.UIManager.Button(400, 5, 100, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Add Frame'));
		$t5.color = 'rgb(50,150,50)';
		$t5.click = function() {
			var vs;
			asset.frames.add(vs = new OurSonic.Level.LevelObjectAssetFrame('Frame ' + (asset.frames.length + 1)));
			vs.palette = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'];
			vs.width = ss.Int32.trunc(Math.floor(Math.random() * 40) + 20);
			vs.height = ss.Int32.trunc(Math.floor(Math.random() * 40) + 20);
			vs.colorMap = new Array(vs.width);
			for (var i = 0; i < vs.width; i++) {
				vs.colorMap[i] = new Array(vs.height);
				for (var j = 0; j < vs.height; j++) {
					vs.colorMap[i][j] = ss.Int32.trunc(Math.floor(Math.random() * vs.palette.length));
				}
			}
			//Data.MainPanel.populate(asset);
		};
		$t6.addControl(OurSonic.UIManager.Button).call($t6, $t5);
		var jd;
		var $t8 = this.data.mainPanel;
		var $t7 = new OurSonic.UIManager.HScrollBox(20, 35, 70, 4, 112);
		$t7.backColor = 'rgb(50,60,127)';
		$t8.addControl(OurSonic.UIManager.HScrollBox).call($t8, jd = $t7);
		this.data.mainPanel.data.set_assetPopulate(Function.mkdel(this, function(ast) {
			var bd = null;
			jd.controls = [];
			for (var i1 = 0; i1 < ast.frames.length; i1++) {
				var $t9 = new (Type.makeGenericType(OurSonic.UIManager.ImageButton$1, [OurSonic.Level.LevelObjectAssetFrame]))(null, 0, 0, 0, 0);
				$t9.text = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(function() {
					return ast.name;
				});
				$t9.image = function(canvas, x, y) {
					bd.data.drawSimple(canvas, OurSonic.Point.$ctor1(x, y), bd.width, bd.height - 15, false, false);
				};
				$t9.click = Function.mkdel(this, function() {
					this.data.mainPanel.data.get_loadFrame()(bd.data);
				});
				jd.addControl(bd = $t9);
				bd.data = ast.frames[i1];
			}
		}));
		this.data.mainPanel.data.get_assetPopulate()(asset);
		var $t12 = this.data.mainPanel;
		var $t10 = this.data.mainPanel.data;
		var $t11 = new OurSonic.UIManager.Panel(7, 155, 480, 350);
		$t10.set_frameArea($t11);
		$t12.addControl(OurSonic.UIManager.Panel).call($t12, $t11);
		this.data.mainPanel.data.get_frameArea().outline = false;
		this.data.mainPanel.data.set_loadFrame(Function.mkdel(this, function(frame) {
			this.data.mainPanel.data.get_frameArea().controls = [];
			//Data.MainPanel.Data.FrameArea.currentFrame = frame;
			//var ce;
			var $t13 = this.data.mainPanel.data.get_frameArea();
			var $t14 = new OurSonic.UIManager.TextArea(15, 21, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Name: '));
			$t14.color = 'black';
			$t13.addControl(OurSonic.UIManager.TextArea).call($t13, $t14);
			var textBox = null;
			var $t15 = this.data.mainPanel.data.get_frameArea();
			var $t16 = new OurSonic.UIManager.TextBox(90, 0, 395, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2(frame.name));
			$t16.color = 'rgb(50,150,50)';
			$t16.click = function() {
				frame.name = textBox.text;
			};
			$t15.addControl(OurSonic.UIManager.TextBox).call($t15, $t16);
			var $t17 = this.data.mainPanel.data.get_frameArea();
			var $t18 = new OurSonic.UIManager.TextArea(0, 275, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(function() {
				return 'Width:  ' + frame.width;
			}));
			$t18.color = 'Black';
			$t17.addControl(OurSonic.UIManager.TextArea).call($t17, $t18);
			var $t19 = this.data.mainPanel.data.get_frameArea();
			var $t20 = new OurSonic.UIManager.Button(75, 250, 14, 17, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('^'));
			$t20.color = 'rgb(50,150,50)';
			$t20.click = function() {
				frame.setWidth(frame.width + 1);
			};
			$t19.addControl(OurSonic.UIManager.Button).call($t19, $t20);
			var $t21 = this.data.mainPanel.data.get_frameArea();
			var $t22 = new OurSonic.UIManager.Button(75, 270, 14, 20, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('v'));
			$t22.color = 'rgb(50,150,50)';
			$t22.click = function() {
				frame.setWidth(frame.width - 1);
			};
			$t21.addControl(OurSonic.UIManager.Button).call($t21, $t22);
			var $t23 = this.data.mainPanel.data.get_frameArea();
			var $t24 = new OurSonic.UIManager.TextArea(0, 320, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$1(function() {
				return 'Height: ' + frame.height;
			}));
			$t24.color = 'Black';
			$t23.addControl(OurSonic.UIManager.TextArea).call($t23, $t24);
			var $t25 = this.data.mainPanel.data.get_frameArea();
			var $t26 = new OurSonic.UIManager.Button(75, 295, 14, 17, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('^'));
			$t26.color = 'rgb(50,150,50)';
			$t26.click = function() {
				frame.setHeight(frame.height + 1);
			};
			$t25.addControl(OurSonic.UIManager.Button).call($t25, $t26);
			var $t27 = this.data.mainPanel.data.get_frameArea();
			var $t28 = new OurSonic.UIManager.Button(75, 315, 14, 20, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('v'));
			$t28.color = 'rgb(50,150,50)';
			$t28.click = function() {
				frame.setHeight(frame.height - 1);
			};
			$t27.addControl(OurSonic.UIManager.Button).call($t27, $t28);
			var bt;
			var $t29 = this.data.mainPanel.data.get_frameArea();
			var $t30 = new OurSonic.UIManager.Button(175, 35, 150, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Collide Map'));
			$t30.color = 'rgb(50,150,50)';
			$t30.click = function() {
				//    ce.showCollideMap = this.toggled;
			};
			$t29.addControl(OurSonic.UIManager.Button).call($t29, bt = $t30);
			bt.toggle = true;
			var $t31 = this.data.mainPanel.data.get_frameArea();
			var $t32 = new OurSonic.UIManager.Button(335, 35, 150, 25, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('Hurt Map'));
			$t32.color = 'rgb(50,150,50)';
			$t32.click = function() {
				//    ce.showHurtMap = this.toggled;
			};
			$t31.addControl(OurSonic.UIManager.Button).call($t31, bt = $t32);
			bt.toggle = true;
			//          Data.MainPanel.Data.FrameArea.AddControl(Data.MainPanel.Data.FrameArea.colorEditor = new ColorEditingArea(230 - 55, 65, new Point(310, 225), true));
			//          var ce = Data.MainPanel.Data.FrameArea.colorEditor;
			//          ce.init(frame);
			//          ce.editor.showOutline = false;
			//          ce.editable = false;
			//          ce.click = (e) =>
			//          {
			//          frame.setOffset(e.x, e.y);
			//          
			//          };
			//
			//                Data.MainPanel.Data.FrameArea.AddControl(new HtmlBox(19, 64, 120, 31, () =>
			//
			//                {
			//
			//                var sc = document.getElementById("picFieldUploader");
			//
			//                
			//
			//                sc.style.left = (objectFrameworkArea.x + 320 + 7 + 19) + "px";
			//
			//                sc.style.top = (objectFrameworkArea.y + 150 + 155 + 64) + "px";
			//
			//                sc.style.position = "absolute";
			//
			//                sc.style.visibility = "visible";
			//
			//                }, (x, y) =>
			//
			//                {
			//
			//                var sc = document.getElementById("picFieldUploader");
			//
			//                if (sc)
			//
			//                {
			//
			//                if (sc.style.left == x + "px" && sc.style.top == y + "px")
			//
			//                return;
			//
			//                sc.style.left = x + "px";
			//
			//                sc.style.top = y + "px";
			//
			//                }
			//
			//                }, () =>
			//
			//                {
			//
			//                var sc = document.getElementById("picFieldUploader");
			//
			//                if (sc)
			//
			//                {
			//
			//                sc.style.visibility = "visible";
			//
			//                }
			//
			//                }, () =>
			//
			//                {
			//
			//                var sc = document.getElementById("picFieldUploader");
			//
			//                if (sc)
			//
			//                {
			//
			//                sc.style.left = "-100px";
			//
			//                sc.style.top = "-100px";
			//
			//                sc.style.visibility = "hidden";
			//
			//                }
			//
			//                }));
			//   var pa;
			//   Data.MainPanel.Data.FrameArea.AddControl(Data.MainPanel.Data.FrameArea.palatteArea = new PaletteArea(230 - 55, 300, new Point(39, 11), false));
			//   Data.MainPanel.Data.FrameArea.palatteArea.init(frame.palette, true);
			//   
			//   Data.MainPanel.Data.FrameArea.AddControl(new Button(230 - 55, 305 + 11 * 2, 310, 25, "Edit Map"){Color="rgb(50,150,50)", Click=() =>
			//   {
			//   sonicManager.uiManager.colorEditorArea.init(frame);
			//   sonicManager.uiManager.colorEditorArea.visible = true;
			//   sonicManager.uiManager.colorEditorArea.depth = objectFrameworkArea.depth + 1;
			//   objectFrameworkArea.loseFocus();
			//   
			//   }});
		}));
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Areas.ObjectFrameworkData
OurSonic.UIManager.Areas.ObjectFrameworkData = function() {
};
OurSonic.UIManager.Areas.ObjectFrameworkData.$ctor = function() {
	var $this = {};
	$this.b1 = null;
	$this.b2 = null;
	$this.b3 = null;
	$this.b4 = null;
	$this.pieces = null;
	$this.assets = null;
	$this.pieceLayouts = null;
	$this.projectiles = null;
	$this.objectFramework = null;
	$this.key = null;
	$this.description = null;
	$this.editor = null;
	$this.mainPanel = null;
	$this.codeMirror = null;
	return $this;
};
Type.registerNamespace('OurSonic.UIManager');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Button
OurSonic.UIManager.Button = function(x, y, width, height, text) {
	this.$oldText = null;
	this.font = null;
	this.toggle = false;
	this.toggled = false;
	this.clicking = false;
	this.button2Grad = null;
	this.button1Grad = null;
	this.$2$createdField = false;
	this.buttonBorderGrad = null;
	this.text = null;
	this.color = null;
	OurSonic.UIManager.Element.call(this, x, y);
	this.text = text;
	this.toggle = false;
	this.toggled = false;
	this.font = OurSonic.UIManager.UIManager.buttonFont;
	this.clicking = false;
	this.set_$created(false);
	this.button1Grad = null;
	this.button2Grad = null;
	this.buttonBorderGrad = null;
	this.width = width;
	this.height = height;
};
OurSonic.UIManager.Button.prototype = {
	get_$created: function() {
		return this.$2$createdField;
	},
	set_$created: function(value) {
		this.$2$createdField = value;
	},
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		this.clicking = true;
		if (this.toggle) {
			this.toggled = !this.toggled;
		}
		return OurSonic.UIManager.Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		if (this.clicking) {
			if (ss.isValue(this.click)) {
				this.click();
			}
		}
		this.clicking = false;
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp();
		}
		return OurSonic.UIManager.Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver();
		}
		return OurSonic.UIManager.Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		if (!this.get_$created()) {
			this.set_$created(true);
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button2Grad.addColorStop(0, '#A5A5A5');
			this.button2Grad.addColorStop(1, '#FFFFFF');
			this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
		}
		canv.strokeStyle = this.buttonBorderGrad;
		if (this.toggle) {
			canv.fillStyle = (this.toggled ? this.button1Grad : this.button2Grad);
		}
		else {
			canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
		}
		canv.lineWidth = 2;
		OurSonic.Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		canv.fillStyle = '#000000';
		var txt = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit(this.text);
		canv.fillText(txt, this.get_totalX() + (ss.Int32.div(this.width, 2) - canv.measureText(txt).width / 2), this.get_totalY() + ss.Int32.div(this.height, 3) * 2);
		canv.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Button
OurSonic.UIManager.Button$1 = function(T) {
	var $type = function(data, x, y, width, height, text) {
		this.data = T.getDefaultValue();
		OurSonic.UIManager.Button.call(this, x, y, width, height, text);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, OurSonic.UIManager.Button$1, [T], function() {
		return OurSonic.UIManager.Button;
	}, function() {
		return [];
	});
	return $type;
};
OurSonic.UIManager.Button$1.registerGenericClass('OurSonic.UIManager.Button$1', 1);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.DelegateOrValue
OurSonic.UIManager.DelegateOrValue$1 = function(T) {
	var $type = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$method = d;
		this.isValue = false;
	};
	$type.prototype = {
		$evaluate: function() {
			if (this.isValue === true) {
				return this.$value;
			}
			else if (this.isValue === false) {
				return this.$method();
			}
			return T.getDefaultValue();
		}
	};
	$type.$ctor1 = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$value = d;
		this.isValue = true;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.op_Implicit$2 = function(d) {
		return new (Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [T]).$ctor1)(d);
	};
	$type.op_Implicit$1 = function(d) {
		return new (Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [T]))(d);
	};
	$type.op_Implicit = function(d) {
		return d.$evaluate();
	};
	$type.registerGenericClassInstance($type, OurSonic.UIManager.DelegateOrValue$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
OurSonic.UIManager.DelegateOrValue$1.registerGenericClass('OurSonic.UIManager.DelegateOrValue$1', 1);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.EditorEngine
OurSonic.UIManager.EditorEngine = function(el) {
	this.$points = null;
	this.editing = false;
	this.element = null;
	this.dragging = false;
	this.startDragging = null;
	this.dragg = null;
	this.element = el;
	this.$points = [OurSonic.UIManager.EditorEnginePoint.$ctor(0, 0, 10, 'nw-resize', Function.mkdel(this, function(dv) {
		var x = dv.x;
		var y = dv.y;
		this.element.width += x;
		this.element.height += y;
		this.element.x -= x;
		this.element.y -= y;
		this.element.clearCache();
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(100, 0, 10, 'ne-resize', Function.mkdel(this, function(dv1) {
		var x1 = dv1.x;
		var y1 = dv1.y;
		this.element.width -= x1;
		this.element.height += y1;
		this.element.y -= y1;
		this.element.clearCache();
		dv1.x = 0;
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(100, 100, 10, 'se-resize', Function.mkdel(this, function(dv2) {
		var x2 = dv2.x;
		var y2 = dv2.y;
		this.element.width -= x2;
		this.element.height -= y2;
		this.element.clearCache();
		dv2.x = dv2.y = 0;
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(0, 100, 10, 'sw-resize', Function.mkdel(this, function(dv3) {
		var x3 = dv3.x;
		var y3 = dv3.y;
		this.element.width += x3;
		this.element.height -= y3;
		this.element.x -= x3;
		this.element.clearCache();
		dv3.y = 0;
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(50, 0, 5, 'n-resize', Function.mkdel(this, function(dv4) {
		var x4 = dv4.x;
		var y4 = dv4.y;
		this.element.height += y4;
		this.element.y -= x4;
		this.element.clearCache();
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(100, 50, 5, 'e-resize', Function.mkdel(this, function(dv5) {
		var x5 = dv5.x;
		var y5 = dv5.y;
		this.element.width -= y5;
		this.element.clearCache();
		dv5.x = dv5.y = 0;
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(50, 100, 5, 'n-resize', Function.mkdel(this, function(dv6) {
		var x6 = dv6.x;
		var y6 = dv6.y;
		this.element.height -= y6;
		this.element.clearCache();
		dv6.x = dv6.y = 0;
	})), OurSonic.UIManager.EditorEnginePoint.$ctor(0, 50, 5, 'e-resize', Function.mkdel(this, function(dv7) {
		var x7 = dv7.x;
		var y7 = dv7.y;
		this.element.width += x7;
		this.element.x -= x7;
		this.element.clearCache();
	}))];
};
OurSonic.UIManager.EditorEngine.prototype = {
	click: function(e) {
		var x = 0;
		var y = 0;
		var w = this.element.width;
		var h = this.element.height;
		//uiManager.propertyList.populate(this.Element);
		for (var i = 0; i < this.$points.length; i++) {
			var j = this.$points[i];
			j.editing = false;
		}
		for (var i1 = 0; i1 < this.$points.length; i1++) {
			var j1 = this.$points[i1];
			var sz = j1.size * 5;
			var rect = OurSonic.Rectangle.$ctor1(x + ss.Int32.div(w * j1.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j1.y, 100) - ss.Int32.div(sz, 2), sz, sz);
			if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
				document.body.style.cursor = j1.cursor;
				this.startDragging = OurSonic.Point.$ctor1(e.x, e.y);
				this.editing = true;
				j1.editing = true;
				return true;
			}
		}
		if (e.x > x && e.x < x + w && e.y > y && e.y < y + h) {
			this.dragg = OurSonic.Point.$ctor1(e.x, e.y);
			document.body.style.cursor = 'move';
			this.dragging = true;
			return false;
		}
		else {
			document.body.style.cursor = 'default';
		}
		return false;
	},
	mouseUp: function(e) {
		for (var i = 0; i < this.$points.length; i++) {
			var j = this.$points[i];
			j.editing = false;
		}
		this.editing = false;
		this.dragging = false;
		this.startDragging = null;
		this.dragg = null;
		return false;
	},
	mouseOver: function(e) {
		var x = 0;
		var y = 0;
		var w = this.element.width;
		var h = this.element.height;
		document.body.style.cursor = 'move';
		if (this.dragging) {
			//
			//                if (this.Element.ChildrenAreEditing())
			//
			//                {
			//
			//                return false;
			//
			//                }
			var jx = e.x - this.dragg.x;
			var jy = e.y - this.dragg.y;
			this.element.x += jx;
			this.element.y += jy;
			//   window.DEBUGLABELS[0] = "E: " + e.X + " " + e.Y;
			//   window.DEBUGLABELS[1] = "Dragg: " + this.dragg.X + " " + this.dragg.Y;
			//   window.DEBUGLABELS[2] = "Element: " + this.Element.X + " " + this.Element.Y;
			//   window.DEBUGLABELS[3] = "Offset: " + jx + " " + jy;
			//this.dragg.x += jx;
			//this.dragg.y += jy;
			return false;
		}
		for (var i = 0; i < this.$points.length; i++) {
			var j = this.$points[i];
			var sz = j.size * 5;
			if (j.editing) {
				document.body.style.cursor = j.cursor;
				var dv = OurSonic.Point.$ctor1(this.startDragging.x - e.x, this.startDragging.y - e.y);
				j.click(dv);
				this.startDragging = OurSonic.Point.$ctor1(e.x + dv.x, e.y + dv.y);
				return true;
			}
			var rect = OurSonic.Rectangle.$ctor1(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(sz, 2), sz, sz);
			if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
				document.body.style.cursor = j.cursor;
				if (j.editing) {
					var dv1 = OurSonic.Point.$ctor1(this.startDragging.x - e.x, this.startDragging.y - e.y);
					j.click(dv1);
					this.startDragging = OurSonic.Point.$ctor1(e.x + dv1.x, e.y + dv1.y);
				}
				return true;
			}
		}
		this.startDragging = OurSonic.Point.$ctor1(e.x, e.y);
		return this.editing;
		return false;
	},
	draw: function(canv) {
		canv.save();
		var size = 0;
		canv.strokeStyle = canv.fillStyle = 'white';
		canv.lineWidth = 3;
		canv.dashedRect(this.element.get_totalX() - size, this.element.get_totalY() - size, this.element.width + size * 2, this.element.height + size * 2, [2, 2]);
		//canv.strokeRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2);
		var x = this.element.get_totalX();
		var y = this.element.get_totalY();
		var w = this.element.width;
		var h = this.element.height;
		for (var i = 0; i < this.$points.length; i++) {
			var j = this.$points[i];
			canv.fillRect(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(j.size, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(j.size, 2), j.size, j.size);
		}
		canv.restore();
	},
	maxSize: function() {
		return 10;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.EditorEnginePoint
OurSonic.UIManager.EditorEnginePoint = function() {
};
OurSonic.UIManager.EditorEnginePoint.$ctor = function(x, y, size, cursor, click) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.size = 0;
	$this.cursor = null;
	$this.click = null;
	$this.editing = false;
	$this.x = x;
	$this.y = y;
	$this.size = size;
	$this.cursor = cursor;
	$this.click = click;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Element
OurSonic.UIManager.Element = function(x, y) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.depth = 0;
	this.visible = false;
	this.cachedDrawing = null;
	this.click = null;
	this.mouseUp = null;
	this.mouseOver = null;
	this.editMode = false;
	this.editorEngine = null;
	this.parent = null;
	this.focused = false;
	this.x = x;
	this.y = y;
	this.editorEngine = new OurSonic.UIManager.EditorEngine(this);
	this.visible = true;
	//
	//                        if (this.Construct) {
	//
	//                        this.Construct();
	//
	//                        }
};
OurSonic.UIManager.Element.prototype = {
	get_totalX: function() {
		return this.x + (ss.isValue(this.parent) ? this.parent.get_totalX() : 0);
	},
	get_totalY: function() {
		return this.y + (ss.isValue(this.parent) ? this.parent.get_totalY() : 0);
	},
	construct: function() {
	},
	isEditMode: function() {
		return this.editMode || ss.isValue(this.parent) && this.parent.isEditMode();
	},
	forceDrawing: function() {
		var $t1 = OurSonic.UIManager.Element$ForceRedrawing.$ctor();
		$t1.redraw = false;
		$t1.clearCache = false;
		return $t1;
	},
	onKeyDown: function(e) {
	},
	focus: function(e) {
		this.focused = true;
	},
	loseFocus: function() {
		this.focused = false;
	},
	onClick: function(e) {
		if (this.isEditMode()) {
			if (this.editorEngine.click(e)) {
				return true;
			}
		}
		return false;
	},
	onMouseUp: function(e) {
		if (this.isEditMode()) {
			if (this.editorEngine.mouseUp(e)) {
				return true;
			}
		}
		return false;
	},
	onMouseOver: function(e) {
		if (this.isEditMode()) {
			if (this.editorEngine.mouseOver(e)) {
				return true;
			}
		}
		return false;
	},
	draw: function(canv) {
		if (this.isEditMode()) {
			this.editorEngine.draw(canv);
		}
	},
	clearCache: function() {
		this.cachedDrawing = null;
	},
	onScroll: function(e) {
		return false;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Element.ForceRedrawing
OurSonic.UIManager.Element$ForceRedrawing = function() {
};
OurSonic.UIManager.Element$ForceRedrawing.$ctor = function() {
	var $this = {};
	$this.redraw = false;
	$this.clearCache = false;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.HScrollBox
OurSonic.UIManager.HScrollBox = function(x, y, itemHeight, visibleItems, itemWidth) {
	this.itemWidth = 0;
	this.scrollWidth = 0;
	this.jWidth = 0;
	this.visibleItems = 0;
	this.itemHeight = 0;
	this.backColor = null;
	this.scrollOffset = 0;
	this.scrollPosition = 0;
	this.dragging = false;
	this.controls = null;
	this.scrolling = false;
	OurSonic.UIManager.Element.call(this, x, y);
	this.itemWidth = itemWidth;
	this.scrollWidth = 14;
	this.jWidth = 5;
	this.visibleItems = visibleItems;
	this.itemHeight = itemHeight;
};
OurSonic.UIManager.HScrollBox.prototype = {
	construct: function() {
		this.width = this.visibleItems * (this.itemWidth + this.jWidth);
		this.height = this.itemHeight + this.scrollWidth;
		this.scrolling = false;
		this.scrolling = false;
		this.scrolling = false;
	},
	addControl: function(control) {
		control.parent = this;
		this.controls.add(control);
		return control;
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onClick(e);
				return false;
			}
		}
		if (e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
			var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
			this.scrollOffset = ss.Int32.div(e.x, width) * (this.controls.length - this.visibleItems);
			this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
		}
		this.dragging = true;
		return false;
		return OurSonic.UIManager.Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		this.dragging = false;
		for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseUp(e);
				return false;
			}
		}
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp();
		}
		return OurSonic.UIManager.Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = 0; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseOver(e);
				break;
			}
		}
		if (this.dragging && e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
			var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
			this.scrollOffset = ss.Int32.trunc(e.x / width * (this.controls.length - this.visibleItems));
			this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver();
		}
		return OurSonic.UIManager.Element.prototype.onMouseOver.call(this, e);
	},
	onScroll: function(e) {
		if (!this.visible) {
			return false;
		}
		if (e.delta > 0) {
			if (this.scrollOffset > 0) {
				this.scrollOffset--;
			}
		}
		else if (this.scrollOffset < this.controls.length - this.visibleItems) {
			this.scrollOffset++;
		}
		for (var ij = 0; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onScroll(e);
				return false;
			}
		}
		//if (this.scroll) this.scroll();
		return OurSonic.UIManager.Element.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.fillStyle = this.backColor;
		var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
		canv.fillStyle = this.backColor;
		canv.lineWidth = 1;
		canv.strokeStyle = '#333';
		OurSonic.Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.visibleItems * (this.itemWidth + this.jWidth) + 2, this.itemHeight + this.scrollWidth + 6, 3, true, true);
		canv.fillStyle = 'grey';
		canv.lineWidth = 1;
		canv.strokeStyle = '#444';
		canv.fillRect(this.get_totalX() + 2, this.get_totalY() + this.itemHeight + 6, this.visibleItems * (this.itemWidth + this.jWidth), this.scrollWidth);
		canv.fillStyle = 'FFDDFF';
		canv.lineWidth = 1;
		canv.strokeStyle = '#FFDDFF';
		this.scrollPosition = ss.Int32.div(width * this.scrollOffset, this.controls.length - this.visibleItems);
		canv.fillRect(this.get_totalX() + this.scrollPosition + 2, this.get_totalY() + this.itemHeight + 6, 5, this.scrollWidth - 2);
		var curX = 3;
		for (var i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
			this.controls[i].parent = this;
			this.controls[i].x = curX;
			this.controls[i].y = 2;
			this.controls[i].height = this.itemHeight;
			this.controls[i].width = this.itemWidth;
			curX += this.itemWidth + this.jWidth;
			this.controls[i].draw(canv);
		}
		canv.restore();
		OurSonic.UIManager.Element.prototype.draw.call(this, canv);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.HtmlBox
OurSonic.UIManager.HtmlBox = function(x, y) {
	this.$2$InitField = null;
	this.$2$UpdatePositionField = null;
	this.$2$_FocusField = null;
	this.$2$_HideField = null;
	OurSonic.UIManager.Element.call(this, x, y);
};
OurSonic.UIManager.HtmlBox.prototype = {
	get_init: function() {
		return this.$2$InitField;
	},
	set_init: function(value) {
		this.$2$InitField = value;
	},
	get_updatePosition: function() {
		return this.$2$UpdatePositionField;
	},
	set_updatePosition: function(value) {
		this.$2$UpdatePositionField = value;
	},
	get__Focus: function() {
		return this.$2$_FocusField;
	},
	set__Focus: function(value) {
		this.$2$_FocusField = value;
	},
	get__Hide: function() {
		return this.$2$_HideField;
	},
	set__Hide: function(value) {
		this.$2$_HideField = value;
	},
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.ImageButton
OurSonic.UIManager.ImageButton = function(x, y, width, height) {
	this.$oldText = null;
	this.font = null;
	this.toggle = false;
	this.toggled = false;
	this.clicking = false;
	this.button2Grad = null;
	this.image = null;
	this.button1Grad = null;
	this.$2$createdField = false;
	this.buttonBorderGrad = null;
	this.text = null;
	this.color = null;
	OurSonic.UIManager.Element.call(this, x, y);
	this.text = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('');
	this.toggle = false;
	this.toggled = false;
	this.font = '';
	this.clicking = false;
	this.image = null;
	this.set_$created(false);
	this.button1Grad = null;
	this.button2Grad = null;
	this.buttonBorderGrad = null;
	this.width = width;
	this.height = height;
};
OurSonic.UIManager.ImageButton.prototype = {
	get_$created: function() {
		return this.$2$createdField;
	},
	set_$created: function(value) {
		this.$2$createdField = value;
	},
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		this.clicking = true;
		if (this.toggle) {
			this.toggled = !this.toggled;
		}
		return OurSonic.UIManager.Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		if (this.clicking) {
			if (ss.isValue(this.click)) {
				this.click();
			}
		}
		this.clicking = false;
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp();
		}
		return OurSonic.UIManager.Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver();
		}
		return OurSonic.UIManager.Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		if (!this.get_$created()) {
			this.set_$created(true);
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button2Grad.addColorStop(0, '#A5A5A5');
			this.button2Grad.addColorStop(1, '#FFFFFF');
			this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
		}
		canv.strokeStyle = this.buttonBorderGrad;
		if (this.toggle) {
			canv.fillStyle = (this.toggled ? this.button1Grad : this.button2Grad);
		}
		else {
			canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
		}
		canv.lineWidth = 2;
		OurSonic.Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		canv.fillStyle = '#000000';
		var txt = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit(this.text);
		canv.save();
		this.image(canv, this.get_totalX(), this.get_totalY());
		canv.restore();
		canv.fillText(txt, this.get_totalX() + (ss.Int32.div(this.width, 2) - canv.measureText(txt).width / 2), this.get_totalY() + this.height - 3);
		canv.restore();
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.ImageButton
OurSonic.UIManager.ImageButton$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		OurSonic.UIManager.ImageButton.call(this, x, y, width, height);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, OurSonic.UIManager.ImageButton$1, [T], function() {
		return OurSonic.UIManager.ImageButton;
	}, function() {
		return [];
	});
	return $type;
};
OurSonic.UIManager.ImageButton$1.registerGenericClass('OurSonic.UIManager.ImageButton$1', 1);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.PaletteArea
OurSonic.UIManager.PaletteArea = function(x, y) {
	OurSonic.UIManager.Element.call(this, x, y);
};
OurSonic.UIManager.PaletteArea.prototype = {
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Panel
OurSonic.UIManager.Panel = function(x, y, width, height) {
	this.controls = null;
	this.outline = false;
	this.area = null;
	this.cachedDrawing = null;
	OurSonic.UIManager.Element.call(this, x, y);
	this.width = width;
	this.height = height;
	this.controls = [];
};
OurSonic.UIManager.Panel.prototype = {
	childrenAreEditing: function() {
		var ch = this.controls;
		var $t1 = ch.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				if (t.editorEngine.dragging || t.editorEngine.editing) {
					return true;
				}
				if (Type.isInstanceOfType(t, OurSonic.UIManager.Panel) && Type.cast(t, OurSonic.UIManager.Panel).childrenAreEditing()) {
					return true;
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return false;
	},
	focus: function(e) {
		var e2 = OurSonic.UIManager.Pointer.$ctor(0, 0, 0);
		var ch = this.controls;
		var $t1 = ch.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				if (t.visible && t.y <= e.y && t.y + t.height > e.y && t.x <= e.x && t.x + t.width > e.x) {
					e2.x = e.x - t.x;
					e2.y = e.y - t.y;
					t.focus(e2);
				}
			}
		}
		finally {
			$t1.dispose();
		}
		OurSonic.UIManager.Element.prototype.focus.call(this, e);
	},
	loseFocus: function() {
		var ch = this.controls;
		var $t1 = ch.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				t.loseFocus();
			}
		}
		finally {
			$t1.dispose();
		}
		OurSonic.UIManager.Element.prototype.loseFocus.call(this);
	},
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
		var $t1 = this.controls.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var element = $t1.get_current();
				element.construct();
			}
		}
		finally {
			$t1.dispose();
		}
	},
	onKeyDown: function(e) {
		OurSonic.UIManager.Element.prototype.onKeyDown.call(this, e);
		if (!this.visible) {
			return;
		}
		var ch = this.controls;
		var $t1 = ch.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				t.onKeyDown(e);
			}
		}
		finally {
			$t1.dispose();
		}
	},
	onClick: function(e) {
		var e2 = OurSonic.UIManager.Pointer.$ctor(0, 0, 0);
		if (!this.visible) {
			return false;
		}
		var clicked = false;
		var ch = this.controls;
		var $t1 = ch.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var control = $t1.get_current();
				if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
					e2.x = e.x - control.x;
					e2.y = e.y - control.y;
					control.focus(e2);
					control.onClick(e2);
					clicked = true;
				}
				else {
					control.loseFocus();
				}
			}
		}
		finally {
			$t1.dispose();
		}
		if (!clicked && !this.isEditMode() && Type.isInstanceOfType(this, OurSonic.UIManager.UIArea)) {
			Type.cast(this, OurSonic.UIManager.UIArea).dragging = OurSonic.Point.$ctor1(e.x, e.y);
		}
		return clicked;
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		var dragging = null;
		var uiArea = Type.safeCast(this, OurSonic.UIManager.UIArea);
		if (ss.isValue(uiArea)) {
			dragging = uiArea.dragging;
		}
		if (ss.isNullOrUndefined(dragging)) {
			var $t1 = this.controls.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var control = $t1.get_current();
					if (control.visible && (control.editorEngine.editing || control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x)) {
						e.x -= control.x;
						e.y -= control.y;
						control.onMouseOver(e);
						return true;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return true;
		}
		this.x += e.x - dragging.x;
		this.y += e.y - dragging.y;
		//this.onMove(); 
		return OurSonic.UIManager.Element.prototype.onMouseOver.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = 0; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			control.onMouseUp(OurSonic.UIManager.Pointer.$ctor(e.x - control.x, e.y - control.y, 0));
		}
		var uiArea = Type.safeCast(this, OurSonic.UIManager.UIArea);
		if (ss.isValue(uiArea)) {
			uiArea.dragging = null;
		}
		return OurSonic.UIManager.Element.prototype.onMouseUp.call(this, e);
	},
	onScroll: function(e) {
		if (!this.visible) {
			return false;
		}
		var $t1 = this.controls.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var control = $t1.get_current();
				if (control.visible && (control.editorEngine.editing || control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x)) {
					e.x -= control.x;
					e.y -= control.y;
					control.onScroll(e);
					return false;
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return OurSonic.UIManager.Element.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		var _x = this.x;
		var _y = this.y;
		canv.save();
		if (this.outline) {
			var lingrad = canv.createLinearGradient(0, 0, 0, this.height);
			lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
			lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');
			canv.fillStyle = lingrad;
			canv.strokeStyle = '#333';
			var rad = 5;
			OurSonic.Help.roundRect(canv, this.x, this.y, this.width, this.height, rad, true, true);
		}
		var $t1 = this.controls.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var t = $t1.get_current();
				t.draw(canv);
			}
		}
		finally {
			$t1.dispose();
		}
		this.x = _x;
		this.y = _y;
		canv.restore();
		OurSonic.UIManager.Element.prototype.draw.call(this, canv);
	},
	addControl: function(T) {
		return function(element) {
			element.parent = this;
			element.construct();
			this.controls.add(element);
			return element;
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Panel
OurSonic.UIManager.Panel$1 = function(T) {
	var $type = function(data, x, y, width, height) {
		this.data = T.getDefaultValue();
		OurSonic.UIManager.Panel.call(this, x, y, width, height);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, OurSonic.UIManager.Panel$1, [T], function() {
		return OurSonic.UIManager.Panel;
	}, function() {
		return [];
	});
	return $type;
};
OurSonic.UIManager.Panel$1.registerGenericClass('OurSonic.UIManager.Panel$1', 1);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.Pointer
OurSonic.UIManager.Pointer = function() {
};
OurSonic.UIManager.Pointer.$ctor = function(x, y, delta) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.delta = 0;
	$this.x = x;
	$this.y = y;
	$this.delta = delta;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.PropertyButton
OurSonic.UIManager.PropertyButton = function(x, y) {
	OurSonic.UIManager.Element.call(this, x, y);
};
OurSonic.UIManager.PropertyButton.prototype = {
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.ScrollBox
OurSonic.UIManager.ScrollBox = function(x, y) {
	this.itemWidth = 0;
	this.scrollWidth = 0;
	this.jHeight = 0;
	this.visibleItems = 0;
	this.itemHeight = 0;
	this.backColor = null;
	this.scrollOffset = 0;
	this.scrollPosition = 0;
	this.dragging = false;
	this.controls = null;
	this.scrolling = false;
	OurSonic.UIManager.Element.call(this, x, y);
	this.itemWidth = 10;
	this.scrollWidth = 14;
	this.visibleItems = 3;
	this.itemHeight = 10;
	this.backColor = '';
	this.jHeight = 5;
	this.controls = [];
};
OurSonic.UIManager.ScrollBox.prototype = {
	construct: function() {
		this.height = this.visibleItems * (this.itemHeight + this.jHeight);
		this.width = this.itemWidth + this.scrollWidth;
		this.scrolling = false;
	},
	addControl: function(T) {
		return function(control) {
			control.parent = this;
			this.controls.add(control);
			return control;
		};
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onClick(e);
				return false;
			}
		}
		if (e.x > this.itemWidth && e.x < this.itemWidth + this.scrollWidth) {
			var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
			this.scrollOffset = ss.Int32.div(e.y, height) * (this.controls.length - this.visibleItems);
			this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
		}
		this.dragging = true;
		return false;
		return OurSonic.UIManager.Element.prototype.onClick.call(this, e);
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		this.dragging = false;
		for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseUp(e);
				return false;
			}
		}
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp();
		}
		return OurSonic.UIManager.Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		for (var ij = 0; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onMouseOver(e);
				break;
			}
		}
		if (this.dragging && e.x > this.itemWidth && e.x < this.itemWidth + this.scrollWidth) {
			var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
			this.scrollOffset = ss.Int32.trunc(e.y / height * (this.controls.length - this.visibleItems));
			this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver();
		}
		return OurSonic.UIManager.Element.prototype.onMouseOver.call(this, e);
	},
	onScroll: function(e) {
		if (!this.visible) {
			return false;
		}
		if (e.delta > 0) {
			if (this.scrollOffset > 0) {
				this.scrollOffset--;
			}
		}
		else if (this.scrollOffset < this.controls.length - this.visibleItems) {
			this.scrollOffset++;
		}
		for (var ij = 0; ij < this.controls.length; ij++) {
			var control = this.controls[ij];
			if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
				e.x -= control.x;
				e.y -= control.y;
				control.onScroll(e);
				return false;
			}
		}
		//if (this.scroll) this.scroll();
		return OurSonic.UIManager.Element.prototype.onScroll.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		canv.fillStyle = this.backColor;
		var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
		canv.fillStyle = this.backColor;
		canv.lineWidth = 1;
		canv.strokeStyle = '#333';
		OurSonic.Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.itemWidth + this.scrollWidth + 6, this.visibleItems * (this.itemHeight + this.jHeight), 3, true, true);
		canv.fillStyle = 'grey';
		canv.lineWidth = 1;
		canv.strokeStyle = '#444';
		canv.fillRect(this.get_totalX() + this.itemWidth + 2 + 2, this.get_totalY() + 2, this.scrollWidth, this.height);
		canv.fillStyle = 'FFDDFF';
		canv.lineWidth = 1;
		canv.strokeStyle = '#FFDDFF';
		this.scrollPosition = ss.Int32.div(height * this.scrollOffset, this.controls.length - this.visibleItems);
		canv.fillRect(this.get_totalX() + this.itemWidth + 2 + 2 + 2, this.get_totalY() + 2 + this.scrollPosition, this.scrollWidth - 2, 5);
		var curY = 3;
		for (var i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
			this.controls[i].parent = this;
			this.controls[i].x = 2;
			this.controls[i].y = curY;
			this.controls[i].height = this.itemHeight;
			this.controls[i].width = this.itemWidth;
			curY += this.itemHeight + this.jHeight;
			this.controls[i].draw(canv);
		}
		canv.restore();
		OurSonic.UIManager.Element.prototype.draw.call(this, canv);
	},
	clearControls: function() {
		this.controls = [];
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.TextArea
OurSonic.UIManager.TextArea = function(x, y, text) {
	this.$oldText = null;
	this.text = null;
	this.font = null;
	this.color = null;
	OurSonic.UIManager.Element.call(this, x, y);
	this.text = text;
	this.font = OurSonic.UIManager.UIManager.textFont;
	this.color = 'black';
	this.$oldText = '';
};
OurSonic.UIManager.TextArea.prototype = {
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		var txt = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit(this.text);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		var w = canv.measureText(txt).width;
		var h = parseInt(canv.font.split('pt')[0]);
		//   canv.fillStyle = "rgba(255,255,255,0.78)";
		var pad = 3;
		//     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));
		canv.fillStyle = this.color;
		canv.fillText(txt, this.get_totalX(), this.get_totalY());
	},
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	},
	forceDrawing: function() {
		var txt = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit(this.text);
		if (ss.referenceEquals(txt, this.$oldText)) {
			var $t1 = OurSonic.UIManager.Element$ForceRedrawing.$ctor();
			$t1.redraw = true;
			$t1.clearCache = false;
			return $t1;
		}
		this.$oldText = txt;
		var $t2 = OurSonic.UIManager.Element$ForceRedrawing.$ctor();
		$t2.redraw = true;
		$t2.clearCache = true;
		return $t2;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.TextBox
OurSonic.UIManager.TextBox = function(x, y, width, height, text) {
	this.$blinkTick = 0;
	this.$blinked = false;
	this.$can = null;
	this.textChanged = null;
	this.text = null;
	this.font = null;
	this.clicking = false;
	this.color = null;
	this.cursorPosition = 0;
	this.dragPosition = 0;
	this.drawTicks = 0;
	this.lastClickTick = 0;
	this.created = false;
	this.blinked = false;
	this.blinkTick = 0;
	this.button1Grad = null;
	this.button2Grad = null;
	this.buttonBorderGrad = null;
	this.can = false;
	OurSonic.UIManager.Element.call(this, x, y);
	this.text = Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit(text);
	this.width = width;
	this.height = height;
	this.font = OurSonic.UIManager.UIManager.textFont;
	this.dragPosition = -1;
};
OurSonic.UIManager.TextBox.prototype = {
	construct: function() {
		OurSonic.UIManager.Element.prototype.construct.call(this);
	},
	onKeyDown: function(e2) {
		var e = e2;
		if (!!e.altKey) {
			return;
		}
		if (this.focused) {
			if (!!e.ctrlKey) {
				if (!!ss.referenceEquals(e.keyCode, 65)) {
					this.dragPosition = 0;
					this.cursorPosition = this.text.length;
				}
				else if (!!ss.referenceEquals(e.keyCode, 67)) {
					// _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
				}
				else if (!!ss.referenceEquals(e.keyCode, 88)) {
					//  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
					this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
					this.dragPosition = -1;
				}
			}
			else if (!!ss.referenceEquals(e.keyCode, 37)) {
				if (!!e.shiftKey) {
					if (this.dragPosition === -1) {
						this.dragPosition = this.cursorPosition;
					}
					this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
				}
				else {
					this.dragPosition = -1;
					this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
				}
			}
			else if (!!ss.referenceEquals(e.keyCode, 39)) {
				if (!!e.shiftKey) {
					if (this.dragPosition === -1) {
						this.dragPosition = this.cursorPosition;
					}
					this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
				}
				else {
					this.dragPosition = -1;
					this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
				}
			}
			else {
				if (!!ss.referenceEquals(e.keyCode, 8)) {
					if (this.dragPosition === -1) {
						this.text = this.text.substring(0, this.cursorPosition - 1) + this.text.substring(this.cursorPosition, this.text.length);
					}
					else {
						this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					}
					if (this.dragPosition === -1) {
						if (this.cursorPosition > 0) {
							this.cursorPosition--;
						}
					}
					else {
						this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
					}
				}
				else if (!!ss.referenceEquals(e.keyCode, 46)) {
					if (this.dragPosition === -1) {
						this.text = this.text.substring(0, this.cursorPosition) + this.text.substring(Math.min(this.cursorPosition + 1, this.text.length), this.text.length);
					}
					else {
						this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					}
					if (this.dragPosition === -1) {
					}
					else {
						this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
					}
				}
				else {
					var m = ss.Nullable.unbox(Type.cast(e.keyCode, ss.Int32));
					var t = String.fromCharCode(m);
					if (this.dragPosition === -1) {
						this.text = this.text.substring(0, this.cursorPosition) + t + this.text.substring(this.cursorPosition, this.text.length);
					}
					else {
						this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + t + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
					}
					if (this.dragPosition === -1) {
						this.cursorPosition++;
					}
					else {
						this.cursorPosition = Math.max(this.cursorPosition, this.dragPosition);
					}
				}
				this.dragPosition = -1;
			}
			if (ss.isValue(this.textChanged)) {
				this.textChanged();
			}
			e.preventDefault();
		}
	},
	onClick: function(e) {
		if (!this.visible) {
			return false;
		}
		this.clicking = true;
		this.$can.save();
		if (!ss.referenceEquals(this.$can.font, this.font)) {
			this.$can.font = this.font;
		}
		for (var i = 0; i < this.text.length; i++) {
			this.dragPosition = -1;
			var w = this.$can.measureText(this.text.substring(0, i)).width;
			if (w > e.x - 14) {
				this.cursorPosition = i;
				if (this.drawTicks - this.lastClickTick < 15) {
					this.$selectWord();
				}
				this.lastClickTick = this.drawTicks;
				return false;
			}
		}
		this.cursorPosition = this.text.length;
		if (this.drawTicks - this.lastClickTick < 20) {
			this.$selectWord();
		}
		this.lastClickTick = this.drawTicks;
		this.$can.restore();
		return OurSonic.UIManager.Element.prototype.onClick.call(this, e);
	},
	$selectWord: function() {
		var j = this.text.split(' ');
		var pos = 0;
		for (var i = 0; i < j.length; i++) {
			if (this.cursorPosition < j[i].length + pos) {
				this.dragPosition = pos;
				this.cursorPosition = j[i].length + pos;
				return;
			}
			else {
				pos += j[i].length + 1;
			}
		}
		this.dragPosition = pos - j[j.length - 1].length;
		this.cursorPosition = this.text.length;
	},
	onMouseUp: function(e) {
		if (!this.visible) {
			return false;
		}
		if (this.clicking) {
		}
		this.clicking = false;
		if (ss.isValue(this.mouseUp)) {
			this.mouseUp();
		}
		return OurSonic.UIManager.Element.prototype.onMouseUp.call(this, e);
	},
	onMouseOver: function(e) {
		if (!this.visible) {
			return false;
		}
		document.body.style.cursor = 'text';
		if (this.clicking) {
			if (this.dragPosition === -1) {
				this.dragPosition = this.cursorPosition;
			}
			this.$can.save();
			if (!ss.referenceEquals(this.$can.font, this.font)) {
				this.$can.font = this.font;
			}
			for (var i = 0; i < this.text.length; i++) {
				var w = this.$can.measureText(this.text.substring(0, i)).width;
				if (w > e.x - 14) {
					this.cursorPosition = i;
					return false;
				}
			}
			this.$can.restore();
			this.cursorPosition = this.text.length;
		}
		if (ss.isValue(this.mouseOver)) {
			this.mouseOver();
		}
		return OurSonic.UIManager.Element.prototype.onMouseOver.call(this, e);
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		if (!this.focused) {
			this.cursorPosition = -1;
			this.dragPosition = -1;
		}
		this.drawTicks++;
		this.$can = canv;
		if (!this.created) {
			this.created = true;
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button2Grad.addColorStop(0, '#A5A5A5');
			this.button2Grad.addColorStop(1, '#FFFFFF');
			this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
		}
		canv.strokeStyle = this.buttonBorderGrad;
		canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
		canv.lineWidth = 2;
		OurSonic.Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
		if (!ss.referenceEquals(canv.font, this.font)) {
			canv.font = this.font;
		}
		if (this.dragPosition !== -1) {
			canv.fillStyle = '#598AFF';
			var w1 = canv.measureText(this.text.substring(0, Math.min(this.dragPosition, this.cursorPosition))).width;
			var w2 = canv.measureText(this.text.substring(0, Math.max(this.dragPosition, this.cursorPosition))).width;
			canv.fillRect(this.get_totalX() + 8 + w1, this.get_totalY() + 3, w2 - w1, this.height - 7);
		}
		canv.fillStyle = '#000000';
		var hc;
		if (canv.font.indexOf('pt') !== -1) {
			hc = parseInt(canv.font.substr(0, canv.font.indexOf('pt')));
		}
		else {
			hc = parseInt(canv.font.substr(0, canv.font.indexOf('px')));
		}
		canv.fillText(this.text, this.get_totalX() + 8, this.get_totalY() + ss.Int32.div(this.height - hc, 2) + ss.Int32.div(this.height, 2));
		if (this.focused && this.$blinkTick++ % 35 === 0) {
			this.$blinked = !this.$blinked;
		}
		if (this.focused && this.$blinked) {
			canv.strokeStyle = '#000000';
			var w = canv.measureText(this.text.substring(0, this.cursorPosition)).width;
			canv.beginPath();
			canv.moveTo(this.get_totalX() + 8 + w, this.get_totalY() + 3);
			canv.lineTo(this.get_totalX() + 8 + w, this.get_totalY() + (this.height - 7));
			canv.lineWidth = 2;
			canv.stroke();
		}
		canv.restore();
		OurSonic.UIManager.Element.prototype.draw.call(this, canv);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.UIArea
OurSonic.UIManager.UIArea = function(x, y, width, height) {
	this.$myClosable = false;
	this.dragging = null;
	this.closable = false;
	OurSonic.UIManager.Panel.call(this, x, y, width, height);
	this.closable = true;
};
OurSonic.UIManager.UIArea.prototype = {
	addControl: function(T) {
		return function(element) {
			var fm = OurSonic.UIManager.Panel.prototype.addControl(T).call(this, element);
			fm.construct();
			return fm;
		};
	},
	construct: function() {
		if (this.closable) {
			var $t1 = new OurSonic.UIManager.Button(this.width - 30, 4, 26, 23, Type.makeGenericType(OurSonic.UIManager.DelegateOrValue$1, [String]).op_Implicit$2('X'));
			$t1.font = OurSonic.UIManager.UIManager.buttonFont;
			$t1.color = 'Green';
			$t1.click = Function.mkdel(this, function() {
				this.loseFocus();
				this.visible = false;
			});
			this.addControl(OurSonic.UIManager.Button).call(this, $t1);
		}
		OurSonic.UIManager.Panel.prototype.construct.call(this);
	},
	onClick: function(e) {
		var base = OurSonic.UIManager.Panel.prototype.onClick.call(this, e);
		if (!base && !this.isEditMode()) {
			this.dragging = OurSonic.Point.$ctor1(e.x, e.y);
		}
		return base;
	},
	draw: function(canv) {
		if (!this.visible) {
			return;
		}
		canv.save();
		if (!this.cachedDrawing) {
			var cg = OurSonic.Help.defaultCanvas(this.width, this.height);
			var cv = cg.context;
			var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
			lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
			lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');
			cv.fillStyle = lingrad;
			cv.strokeStyle = '#333';
			var xy = OurSonic.Point.$ctor1(this.x, this.y);
			this.x = 0;
			this.y = 0;
			var rad = 30;
			OurSonic.Help.roundRect(cv, this.x, this.y, this.width, this.height, rad, true, true);
			cv.beginPath();
			cv.moveTo(this.x, this.y + rad);
			cv.lineTo(this.x + this.width, this.y + rad);
			cv.lineWidth = 2;
			cv.strokeStyle = '#000000';
			cv.stroke();
			var $t1 = this.controls.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var t1 = $t1.get_current();
					var good = t1.forceDrawing();
					if (good.redraw) {
						t1.draw(cv);
					}
				}
			}
			finally {
				$t1.dispose();
			}
			this.x = xy.x;
			this.y = xy.y;
			this.cachedDrawing = cg;
		}
		canv.drawImage(this.cachedDrawing.canvas, this.x, this.y);
		if (this.cachedDrawing.canvas.width !== this.width || this.cachedDrawing.canvas.height !== this.height) {
			this.cachedDrawing = null;
		}
		var $t2 = this.controls.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var t = $t2.get_current();
				var good1 = t.forceDrawing();
				if (!good1.redraw) {
					t.draw(canv);
				}
				if (good1.clearCache) {
					this.cachedDrawing = null;
				}
			}
		}
		finally {
			$t2.dispose();
		}
		canv.restore();
		OurSonic.UIManager.Panel.prototype.draw.call(this, canv);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.UIManager
OurSonic.UIManager.UIManager = function(sonicManager, mainCanvas, scale) {
	this.$mainCanvas = null;
	this.$scale = null;
	this.sonicManager = null;
	this.$messages = [];
	this.uiAreas = null;
	this.dragger = null;
	this.data = null;
	mainCanvas.font = OurSonic.UIManager.UIManager.textFont;
	this.uiAreas = [];
	this.sonicManager = sonicManager;
	this.$mainCanvas = mainCanvas;
	this.$scale = scale;
	this.dragger = new OurSonic.Dragger(function(xsp, ysp) {
		sonicManager.windowLocation.x += ss.Int32.trunc(xsp);
		sonicManager.windowLocation.y += ss.Int32.trunc(ysp);
		sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;
		sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;
	});
	new OurSonic.UIManager.Areas.LevelInformationArea(this);
	new OurSonic.UIManager.Areas.ObjectFrameworkArea(this);
};
OurSonic.UIManager.UIManager.prototype = {
	onClick: function(e) {
		var cell = OurSonic.Help.getCursorPosition(e, false);
		var goodArea = null;
		var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
			return -f.depth;
		}).toArray();
		for (var ij = 0; ij < cl.length; ij++) {
			var are = cl[ij];
			if (are.visible && (are.isEditMode() ? (are.y - are.editorEngine.maxSize() <= cell.y && are.y + are.editorEngine.maxSize() + are.height > cell.y && are.x - are.editorEngine.maxSize() <= cell.x && are.x + are.editorEngine.maxSize() + are.width > cell.x) : (are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x))) {
				goodArea = are;
				var ec = OurSonic.UIManager.Pointer.$ctor(cell.x - are.x, cell.y - are.y, 0);
				are.onClick(ec);
				break;
			}
		}
		if (goodArea) {
			var $t1 = this.uiAreas.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var are1 = $t1.get_current();
					if (ss.referenceEquals(goodArea, are1)) {
						are1.depth = 1;
						are1.focus(cell);
					}
					else if (are1.visible) {
						are1.depth = 0;
						are1.loseFocus();
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return true;
		}
		else {
			var $t2 = this.uiAreas.getEnumerator();
			try {
				while ($t2.moveNext()) {
					var are2 = $t2.get_current();
					if (are2.visible) {
						are2.depth = 0;
						are2.loseFocus();
					}
				}
			}
			finally {
				$t2.dispose();
			}
		}
		this.sonicManager.uiManager.dragger.click(e);
		return false;
	},
	onMouseMove: function(e) {
		var cell = OurSonic.Help.getCursorPosition(e, false);
		var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
			return -f.depth;
		}).toArray();
		for (var ij = 0; ij < cl.length; ij++) {
			var are = cl[ij];
			if (are.dragging || are.isEditMode() || are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
				var cell2 = OurSonic.UIManager.Pointer.$ctor(cell.x - are.x, cell.y - are.y, 0);
				return are.onMouseOver(cell2);
			}
		}
		if (this.dragger.isDragging(e)) {
			this.dragger.mouseMove(e);
			return false;
		}
		this.dragger.mouseMove(e);
		return false;
	},
	onMouseUp: function(e) {
		var cell = OurSonic.Help.getCursorPosition(e, true);
		var $t1 = this.uiAreas.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var are = $t1.get_current();
				var ec = OurSonic.UIManager.Pointer.$ctor(cell.x - are.x, cell.y - are.y, 0);
				are.onMouseUp(ec);
			}
		}
		finally {
			$t1.dispose();
		}
		this.dragger.mouseUp(e);
	},
	onMouseScroll: function(e) {
		var delta = ss.Nullable.unbox(Type.cast((!!e.wheelDelta ? (e.wheelDelta / 40) : (!!e.detail ? -e.detail : 0)), ss.Int32));
		var cell = OurSonic.Help.getCursorPosition(e, true);
		var $t1 = this.uiAreas.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var are = $t1.get_current();
				if (are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
					var cell2 = OurSonic.UIManager.Pointer.$ctor(cell.x - are.x, cell.y - are.y, delta);
					return are.onScroll(cell2);
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return false;
	},
	onKeyDown: function(jQueryEvent) {
		var $t1 = this.uiAreas.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var are = $t1.get_current();
				are.onKeyDown(jQueryEvent);
			}
		}
		finally {
			$t1.dispose();
		}
	},
	addArea: function(uiArea) {
		uiArea.construct();
		this.uiAreas.add(uiArea);
	},
	draw: function(canvas) {
		this.dragger.tick();
		canvas.save();
		var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
			return f.depth;
		}).toArray();
		for (var $t1 = 0; $t1 < cl.length; $t1++) {
			var are = cl[$t1];
			are.draw(canvas);
		}
		if (true) {
			for (var i = 0; i < this.$messages.length; i++) {
				canvas.fillText(this.$messages[i], 10, 25 + i * 30);
			}
		}
		canvas.restore();
	}
};
OurSonic.UIManager.UIManager.get_curLevelName = function() {
	return OurSonic.UIManager.UIManager.$_curLevelName;
};
OurSonic.UIManager.UIManager.set_curLevelName = function(value) {
	OurSonic.UIManager.UIManager.updateTitle('- Our Sonic - ' + value);
	OurSonic.UIManager.UIManager.$_curLevelName = value;
};
OurSonic.UIManager.UIManager.updateTitle = function(title) {
	document.title = title;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.UIManagerData
OurSonic.UIManager.UIManagerData = function() {
	this.indexes = null;
	this.solidTileArea = null;
	this.modifyTilePieceArea = null;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager.UIManagerDataIndexes
OurSonic.UIManager.UIManagerDataIndexes = function() {
	this.tpIndex = 0;
};
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Watcher
OurSonic.Watcher = function() {
};
OurSonic.Watcher.prototype = {
	tick: function() {
	},
	multiply: function(v) {
		return v;
	}
};
OurSonic.Animation.registerClass('OurSonic.Animation', Object);
OurSonic.AnimationFrame.registerClass('OurSonic.AnimationFrame', Object);
OurSonic.AnimationInstance.registerClass('OurSonic.AnimationInstance', Object);
OurSonic.CanvasInformation.registerClass('OurSonic.CanvasInformation', Object);
OurSonic.Color.registerClass('OurSonic.Color', Object);
OurSonic.Constants.registerClass('OurSonic.Constants', Object);
OurSonic.Dragger.registerClass('OurSonic.Dragger', Object);
OurSonic.Extensions.registerClass('OurSonic.Extensions', Object);
OurSonic.HeightMask.registerClass('OurSonic.HeightMask', Object);
OurSonic.Help.registerClass('OurSonic.Help', Object);
OurSonic.IntersectingRectangle.registerClass('OurSonic.IntersectingRectangle', Object);
OurSonic.Level.LevelEvent.registerClass('OurSonic.Level.LevelEvent', Object);
OurSonic.Level.LevelObject.registerClass('OurSonic.Level.LevelObject', Object);
OurSonic.Level.LevelObjectAsset.registerClass('OurSonic.Level.LevelObjectAsset', Object);
OurSonic.Level.LevelObjectAssetFrame.registerClass('OurSonic.Level.LevelObjectAssetFrame', Object);
OurSonic.Level.LevelObjectData.registerClass('OurSonic.Level.LevelObjectData', Object);
OurSonic.Level.LevelObjectInfo.registerClass('OurSonic.Level.LevelObjectInfo', Object);
OurSonic.Level.LevelObjectPiece.registerClass('OurSonic.Level.LevelObjectPiece', Object);
OurSonic.Level.LevelObjectPieceLayout.registerClass('OurSonic.Level.LevelObjectPieceLayout', Object);
OurSonic.Level.LevelObjectPieceLayoutPiece.registerClass('OurSonic.Level.LevelObjectPieceLayoutPiece', Object);
OurSonic.Level.LevelObjectProjectile.registerClass('OurSonic.Level.LevelObjectProjectile', Object);
OurSonic.Level.ObjectManager.registerClass('OurSonic.Level.ObjectManager', Object);
OurSonic.Page.registerClass('OurSonic.Page', Object);
OurSonic.PaletteItem.registerClass('OurSonic.PaletteItem', Object);
OurSonic.PaletteItemPieces.registerClass('OurSonic.PaletteItemPieces', Object);
OurSonic.Point.registerClass('OurSonic.Point', Object);
OurSonic.Rectangle.registerClass('OurSonic.Rectangle');
OurSonic.Sensor.registerClass('OurSonic.Sensor', Object);
OurSonic.SensorM.registerClass('OurSonic.SensorM', Object);
OurSonic.SensorManager.registerClass('OurSonic.SensorManager', Object);
OurSonic.Sonic.registerClass('OurSonic.Sonic', Object);
OurSonic.SonicBackground.registerClass('OurSonic.SonicBackground', Object);
OurSonic.SonicConstants.registerClass('OurSonic.SonicConstants', Object);
OurSonic.SonicEngine.registerClass('OurSonic.SonicEngine', Object);
OurSonic.SonicImage.registerClass('OurSonic.SonicImage', Object);
OurSonic.SonicLevel.registerClass('OurSonic.SonicLevel', Object);
OurSonic.SonicManager.registerClass('OurSonic.SonicManager', Object);
OurSonic.SpriteCache.registerClass('OurSonic.SpriteCache', Object);
OurSonic.SpriteCacheIndexes.registerClass('OurSonic.SpriteCacheIndexes', Object);
OurSonic.SpriteLoader.registerClass('OurSonic.SpriteLoader', Object);
OurSonic.SpriteLoaderStep.registerClass('OurSonic.SpriteLoaderStep', Object);
OurSonic.Tiles.Tile.registerClass('OurSonic.Tiles.Tile', Object);
OurSonic.Tiles.TileChunk.registerClass('OurSonic.Tiles.TileChunk', Object);
OurSonic.Tiles.TileItem.registerClass('OurSonic.Tiles.TileItem', Object);
OurSonic.Tiles.TilePiece.registerClass('OurSonic.Tiles.TilePiece', Object);
OurSonic.UIManager.Areas.LevelInformationArea.registerClass('OurSonic.UIManager.Areas.LevelInformationArea', Object);
OurSonic.UIManager.Areas.MainPanelData.registerClass('OurSonic.UIManager.Areas.MainPanelData', Object);
OurSonic.UIManager.Areas.ObjectFrameworkArea.registerClass('OurSonic.UIManager.Areas.ObjectFrameworkArea', Object);
OurSonic.UIManager.Areas.ObjectFrameworkData.registerClass('OurSonic.UIManager.Areas.ObjectFrameworkData', Object);
OurSonic.UIManager.EditorEngine.registerClass('OurSonic.UIManager.EditorEngine', Object);
OurSonic.UIManager.EditorEnginePoint.registerClass('OurSonic.UIManager.EditorEnginePoint', Object);
OurSonic.UIManager.Element.registerClass('OurSonic.UIManager.Element', Object);
OurSonic.UIManager.Element$ForceRedrawing.registerClass('OurSonic.UIManager.Element$ForceRedrawing', Object);
OurSonic.UIManager.HScrollBox.registerClass('OurSonic.UIManager.HScrollBox', OurSonic.UIManager.Element);
OurSonic.UIManager.HtmlBox.registerClass('OurSonic.UIManager.HtmlBox', OurSonic.UIManager.Element);
OurSonic.UIManager.ImageButton.registerClass('OurSonic.UIManager.ImageButton', OurSonic.UIManager.Element);
OurSonic.UIManager.PaletteArea.registerClass('OurSonic.UIManager.PaletteArea', OurSonic.UIManager.Element);
OurSonic.UIManager.Panel.registerClass('OurSonic.UIManager.Panel', OurSonic.UIManager.Element);
OurSonic.UIManager.Pointer.registerClass('OurSonic.UIManager.Pointer', Object);
OurSonic.UIManager.PropertyButton.registerClass('OurSonic.UIManager.PropertyButton', OurSonic.UIManager.Element);
OurSonic.UIManager.ScrollBox.registerClass('OurSonic.UIManager.ScrollBox', OurSonic.UIManager.Element);
OurSonic.UIManager.TextArea.registerClass('OurSonic.UIManager.TextArea', OurSonic.UIManager.Element);
OurSonic.UIManager.TextBox.registerClass('OurSonic.UIManager.TextBox', OurSonic.UIManager.Element);
OurSonic.UIManager.UIArea.registerClass('OurSonic.UIManager.UIArea', OurSonic.UIManager.Panel);
OurSonic.UIManager.UIManager.registerClass('OurSonic.UIManager.UIManager', Object);
OurSonic.UIManager.UIManagerData.registerClass('OurSonic.UIManager.UIManagerData', Object);
OurSonic.UIManager.UIManagerDataIndexes.registerClass('OurSonic.UIManager.UIManagerDataIndexes', Object);
OurSonic.Watcher.registerClass('OurSonic.Watcher', Object);
OurSonic.Level.Ring.registerClass('OurSonic.Level.Ring');
OurSonic.UIManager.Button.registerClass('OurSonic.UIManager.Button', OurSonic.UIManager.Element);
OurSonic.HeightMask.colors = ['', 'rgba(255,98,235,0.6)', 'rgba(24,218,235,0.6)', 'rgba(24,98,235,0.6)'];
OurSonic.Help.cos_table = [1, 0.9997, 0.9988, 0.99729, 0.99518, 0.99248, 0.98918, 0.98528, 0.98079, 0.9757, 0.97003, 0.96378, 0.95694, 0.94953, 0.94154, 0.93299, 0.92388, 0.91421, 0.90399, 0.89322, 0.88192, 0.87009, 0.85773, 0.84485, 0.83147, 0.81758, 0.80321, 0.78835, 0.77301, 0.75721, 0.74095, 0.72425, 0.70711, 0.68954, 0.67156, 0.65317, 0.63439, 0.61523, 0.5957, 0.57581, 0.55557, 0.535, 0.5141, 0.4929, 0.4714, 0.44961, 0.42755, 0.40524, 0.38268, 0.3599, 0.33689, 0.31368, 0.29028, 0.26671, 0.24298, 0.2191, 0.19509, 0.17096, 0.14673, 0.12241, 0.09802, 0.07356, 0.04907, 0.02454, 0, -0.02454, -0.04907, -0.07356, -0.09802, -0.12241, -0.14673, -0.17096, -0.19509, -0.2191, -0.24298, -0.26671, -0.29028, -0.31368, -0.33689, -0.3599, -0.38268, -0.40524, -0.42755, -0.44961, -0.4714, -0.4929, -0.5141, -0.535, -0.55557, -0.57581, -0.5957, -0.61523, -0.63439, -0.65317, -0.67156, -0.68954, -0.70711, -0.72425, -0.74095, -0.75721, -0.77301, -0.78835, -0.80321, -0.81758, -0.83147, -0.84485, -0.85773, -0.87009, -0.88192, -0.89322, -0.90399, -0.91421, -0.92388, -0.93299, -0.94154, -0.94953, -0.95694, -0.96378, -0.97003, -0.9757, -0.98079, -0.98528, -0.98918, -0.99248, -0.99518, -0.99729, -0.9988, -0.9997, -1, -0.9997, -0.9988, -0.99729, -0.99518, -0.99248, -0.98918, -0.98528, -0.98079, -0.9757, -0.97003, -0.96378, -0.95694, -0.94953, -0.94154, -0.93299, -0.92388, -0.91421, -0.90399, -0.89322, -0.88192, -0.87009, -0.85773, -0.84485, -0.83147, -0.81758, -0.80321, -0.78835, -0.77301, -0.75721, -0.74095, -0.72425, -0.70711, -0.68954, -0.67156, -0.65317, -0.63439, -0.61523, -0.5957, -0.57581, -0.55557, -0.535, -0.5141, -0.4929, -0.4714, -0.44961, -0.42756, -0.40524, -0.38268, -0.3599, -0.33689, -0.31368, -0.29028, -0.26671, -0.24298, -0.2191, -0.19509, -0.17096, -0.14673, -0.12241, -0.09802, -0.07356, -0.04907, -0.02454, 0, 0.02454, 0.04907, 0.07356, 0.09802, 0.12241, 0.14673, 0.17096, 0.19509, 0.2191, 0.24298, 0.26671, 0.29028, 0.31368, 0.33689, 0.3599, 0.38268, 0.40524, 0.42756, 0.44961, 0.4714, 0.4929, 0.5141, 0.535, 0.55557, 0.57581, 0.5957, 0.61523, 0.63439, 0.65317, 0.67156, 0.68954, 0.70711, 0.72425, 0.74095, 0.75721, 0.77301, 0.78835, 0.80321, 0.81758, 0.83147, 0.84485, 0.85773, 0.87009, 0.88192, 0.89322, 0.90399, 0.91421, 0.92388, 0.93299, 0.94154, 0.94953, 0.95694, 0.96378, 0.97003, 0.9757, 0.98079, 0.98528, 0.98918, 0.99248, 0.99518, 0.99729, 0.9988, 0.9997];
OurSonic.Level.ObjectManager.broken = OurSonic.Help.loadSprite('assets/Sprites/broken.png', function(e) {
});
OurSonic.SonicEngine.instance = null;
OurSonic.SonicManager.instance = null;
OurSonic.SonicManager.$base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
OurSonic.SonicManager.$base64Inv = null;
OurSonic.SonicManager.$_cachedOffs = {};
OurSonic.SonicManager.$base64Inv = {};
for (var i = 0; i < OurSonic.SonicManager.$base64chars.length; i++) {
	OurSonic.SonicManager.$base64Inv[OurSonic.SonicManager.$base64chars[i]] = i;
}
OurSonic.UIManager.UIManager.smallTextFont = '8pt Calibri ';
OurSonic.UIManager.UIManager.buttonFont = '12pt Calibri ';
OurSonic.UIManager.UIManager.smallButtonFont = '13pt Arial bold ';
OurSonic.UIManager.UIManager.textFont = '11pt Arial bold ';
OurSonic.UIManager.UIManager.$_curLevelName = null;
$(function(){new OurSonic.Page();});
