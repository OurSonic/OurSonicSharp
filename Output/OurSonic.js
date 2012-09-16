
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Animation
OurSonic.Animation = function(name, data) {
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
	this.context = context;
	this.domCanvas = domCanvas;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.ClickState
OurSonic.ClickState = function() {
};
OurSonic.ClickState.prototype = { dragging: 0, placeChunk: 1, placeRing: 2, placeObject: 3 };
OurSonic.ClickState.registerEnum('OurSonic.ClickState', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Constants
OurSonic.Constants = function() {
};
OurSonic.Constants.defaultWindowLocation = function(state, uiCanvas, scale) {
	//
	//            switch (state)
	//
	//            {
	//
	//            case 0:
	//
	//            //   return { x= 0, y= 0, width= canvas.canvas.width / scale.x, height= canvas.canvas.height / scale.y, intersects= _H.intersects };
	//
	//            return new IntersectingRectangle { X = 0,Y = 0,Width = 320, Height = 224, Intersects = _H.intersects };
	//
	//            case 1:
	//
	//            var x = 0;
	//
	//            var y = 0;
	//
	//            if (sonicManager.SonicLevel && sonicManager.SonicLevel.StartPositions &&
	//
	//            sonicManager.SonicLevel.StartPositions[0])
	//
	//            {
	//
	//            x = sonicManager.SonicLevel.StartPositions[0].X - 128*2;
	//
	//            y = sonicManager.SonicLevel.StartPositions[0].Y - 128*2;
	//
	//            }
	//
	//            
	//
	//            return
	//
	//            new
	//
	//            IntersectingRectangle
	//
	//            {
	//
	//            X = x,
	//
	//            Y = y,
	//
	//            Width = canvas.canvas.width,
	//
	//            Height = canvas.canvas.height,
	//
	//            Intersects = _H.intersects
	//
	//            };
	//
	//            }
	return null;
};
OurSonic.Constants.intersects = function(arg) {
	//            return this.x < p.x && this.x + this.width > p.x && this.y < p.y && this.y + this.height > p.y;
	return false;
};
Type.registerNamespace('OurSonic.Drawing');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.Tile
OurSonic.Drawing.Tile = function(colors) {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileChunk
OurSonic.Drawing.TileChunk = function(tilePieces) {
};
OurSonic.Drawing.TileChunk.prototype = {
	getBlock: function(x, y) {
		return null;
	},
	getTilePiece: function(x, y) {
		return null;
	},
	animatedTick: function() {
	},
	isEmpty: function() {
		return false;
	},
	draw: function(canvas, position, scale, state, bounds) {
	},
	onlyBackground: function() {
		return false;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileItem
OurSonic.Drawing.TileItem = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TilePiece
OurSonic.Drawing.TilePiece = function(heightMask, tiles) {
};
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.GameState
OurSonic.GameState = function() {
};
OurSonic.GameState.prototype = { editing: 0, playing: 1 };
OurSonic.GameState.registerEnum('OurSonic.GameState', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Help
OurSonic.Help = function() {
};
OurSonic.Help.toPx = function(number) {
	return number + 'px';
};
OurSonic.Help.mod = function(j, n) {
	return (j % n + n) % n;
};
OurSonic.Help.scaleSprite = function(image, scale, complete) {
	//     var data = _H.getImageData(sprite);
	//     var colors = [];
	//     for (var f = 0; f < data.length; f += 4) {
	//     colors.push(_H.colorObjectFromData(data, f));
	//     }
	//     var d = this.defaultCanvas().context.createImageData(sprite.width * scale.x, sprite.height * scale.y);
	//     _H.setDataFromColors(d.data, colors, scale, sprite.width, { r: 0, g: 0, b: 0 });
	//     return _H.loadSprite(_H.getBase64Image(d), complete);
	return null;
};
OurSonic.Help.scaleCSImage = function(image, scale, complete) {
	// var df = image.bytes;
	// var colors = [];
	// for (var f = 0; f < df.length; f += 1) {
	// colors.push(image.palette[df[f]]);
	// }
	// var dc = this.defaultCanvas();
	// var d = dc.context.createImageData(image.width * scale.x, image.height * scale.y);
	// _H.setDataFromColorsNew(d.data, colors, scale, image.width, { r: 0, g: 0, b: 0 });
	// 
	// return _H.loadSprite(_H.getBase64Image(d), complete);
	return null;
};
OurSonic.Help.loadSprite = function(spriteLocation, action) {
	//   var sprite1 = new Image();
	//   
	//   sprite1.onload = function () {
	//   sprite1.loaded = true;
	//   if (complete) complete(sprite1);
	//   };
	//   sprite1.src = src;
	//   return sprite1;
	return null;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.IntersectingRectangle
OurSonic.IntersectingRectangle = function() {
};
OurSonic.IntersectingRectangle.$ctor = function(x, y, width, height, intersects) {
	var $this = OurSonic.Rectangle.$ctor(x, y, width, height);
	$this.intersects = null;
	$this.intersects = intersects;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.LoadSpriteImage
OurSonic.LoadSpriteImage = function() {
	this.$1$TagField = 0;
};
OurSonic.LoadSpriteImage.prototype = {
	get_tag: function() {
		return this.$1$TagField;
	},
	set_tag: function(value) {
		this.$1$TagField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.ObjectManager
OurSonic.ObjectManager = function(sonicManager) {
};
OurSonic.ObjectManager.prototype = {
	init: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Page
OurSonic.Page = function() {
	var stats = new xStats();
	document.body.appendChild(stats.element);
	new OurSonic.SonicEngine();
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Point
OurSonic.Point = function() {
};
OurSonic.Point.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Rectangle
OurSonic.Rectangle = function() {
};
OurSonic.Rectangle.$ctor = function(x, y, width, height) {
	var $this = OurSonic.Point.$ctor(x, y);
	$this.width = 0;
	$this.height = 0;
	$this.width = width;
	$this.height = height;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Ring
OurSonic.Ring = function(active) {
	this.$1$TickCountField = 0;
	this.$1$XField = 0;
	this.$1$YField = 0;
};
OurSonic.Ring.prototype = {
	get_tickCount: function() {
		return this.$1$TickCountField;
	},
	set_tickCount: function(value) {
		this.$1$TickCountField = value;
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
	draw: function(canvas, point, scale) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Sonic
OurSonic.Sonic = function() {
	this.$1$TickingField = false;
	this.$1$XField = 0;
	this.$1$YField = 0;
};
OurSonic.Sonic.prototype = {
	get_ticking: function() {
		return this.$1$TickingField;
	},
	set_ticking: function(value) {
		this.$1$TickingField = value;
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
	tick: function(sonicLevel, scale) {
	},
	draw: function(canvas, scale) {
	},
	drawUI: function(canvas, point, scale) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicBackground
OurSonic.SonicBackground = function() {
	this.$1$WidthField = 0;
	this.$1$HeightField = 0;
};
OurSonic.SonicBackground.prototype = {
	get_width: function() {
		return this.$1$WidthField;
	},
	set_width: function(value) {
		this.$1$WidthField = value;
	},
	get_height: function() {
		return this.$1$HeightField;
	},
	set_height: function(value) {
		this.$1$HeightField = value;
	},
	draw: function(canvas, point, scale, wOffset) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicEngine
OurSonic.SonicEngine = function() {
	this.$lastMouseMove = null;
	this.$gameCanvasName = 'gameLayer';
	this.$uiCanvasName = 'uiLayer';
	this.$gameCanvas = null;
	this.$uiCanvas = null;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.$sonicManager = null;
	this.$fullscreenMode = false;
	var gameCanvasItem = $(String.format('#{0}', this.$gameCanvasName));
	this.$gameCanvas = new OurSonic.CanvasInformation(gameCanvasItem[0].getContext('2d'), gameCanvasItem);
	var uiCanvasItem = $(String.format('#{0}', this.$uiCanvasName));
	this.$uiCanvas = new OurSonic.CanvasInformation(uiCanvasItem[0].getContext('2d'), uiCanvasItem);
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	var element = this.$uiCanvas.domCanvas[0];
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
		if (ss.isNullOrUndefined(this.$sonicManager.get_sonicToon())) {
			this.$sonicManager.get_uiManager().onKeyDown(e1);
		}
	}));
	//
	//    KeyboardJS.bind.key("o", function () {
	//
	//    
	//
	//    
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.inHaltMode = !sonicManager.inHaltMode;
	//
	//    }, function () { });
	//
	//    
	//
	//    KeyboardJS.bind.key("2", function () {
	//
	//    sonicManager.indexedPalette++;
	//
	//    for (var block in sonicManager.SonicLevel.Blocks) {
	//
	//    sonicManager.SonicLevel.Blocks[block].image = [];
	//
	//    }
	//
	//    
	//
	//    }, function () { });
	//
	//    
	//
	//    
	//
	//    KeyboardJS.bind.key("p", function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    if (sonicManager.inHaltMode) {
	//
	//    sonicManager.waitingForTickContinue = false;
	//
	//    }
	//
	//    }, function () { });
	//
	//    
	//
	//    
	//
	//    KeyboardJS.bind.key("h", function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.hit(sonicManager.sonicToon.x, sonicManager.sonicToon.y);
	//
	//    }, function () { });
	//
	//    
	//
	//    
	//
	//    
	//
	//    KeyboardJS.bind.key("c", function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.debug();
	//
	//    }, function () { });
	//
	//    
	//
	//    KeyboardJS.bind.key("e", function () {
	//
	//    sonicManager.SonicLevel.curHeightMap = !sonicManager.SonicLevel.curHeightMap;
	//
	//    }, function () { });
	//
	//    
	//
	//    KeyboardJS.bind.key("f", function () {
	//
	//    sonicManager.showHeightMap = !sonicManager.showHeightMap;
	//
	//    }, function () { });
	//
	//    
	//
	//    KeyboardJS.bind.key("up", function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.pressUp();
	//
	//    else {
	//
	//    sonicManager.windowLocation.y -= 128;
	//
	//    sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;
	//
	//    
	//
	//    }
	//
	//    
	//
	//    }, function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.releaseUp();
	//
	//    });
	//
	//    
	//
	//    KeyboardJS.bind.key("down", function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.pressCrouch();
	//
	//    else {
	//
	//    sonicManager.windowLocation.y += 128;
	//
	//    sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;
	//
	//    
	//
	//    }
	//
	//    }, function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.releaseCrouch();
	//
	//    });
	//
	//    
	//
	//    KeyboardJS.bind.key("left", function () {
	//
	//    if (sonicManager.sonicToon) {
	//
	//    sonicManager.sonicToon.pressLeft();
	//
	//    } else {
	//
	//    sonicManager.windowLocation.x -= 128;
	//
	//    sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;
	//
	//    
	//
	//    }
	//
	//    }, function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.releaseLeft();
	//
	//    });
	//
	//    
	//
	//    KeyboardJS.bind.key("right", function () {
	//
	//    
	//
	//    if (sonicManager.sonicToon) {
	//
	//    sonicManager.sonicToon.pressRight();
	//
	//    } else {
	//
	//    sonicManager.windowLocation.x += 128;
	//
	//    sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;
	//
	//    
	//
	//    }
	//
	//    }, function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.releaseRight();
	//
	//    });
	//
	//    
	//
	//    KeyboardJS.bind.key("space", function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.pressJump();
	//
	//    }, function () {
	//
	//    if (sonicManager.sonicToon)
	//
	//    sonicManager.sonicToon.releaseJump();
	//
	//    });
	this.$fullscreenMode = true;
	window.addEventListener('onresize', Function.mkdel(this, function(e2) {
		this.resizeCanvas();
	}));
	$(document).resize(Function.mkdel(this, function(e3) {
		this.resizeCanvas();
	}));
	this.$sonicManager = new OurSonic.SonicManager(this, this.$gameCanvas, Function.mkdel(this, this.resizeCanvas));
	this.$sonicManager.set_indexedPalette(0);
	window.setInterval(Function.mkdel(this, this.gameDraw), 16);
	window.setInterval(Function.mkdel(this, this.uiDraw), 50);
	this.resizeCanvas();
};
OurSonic.SonicEngine.prototype = {
	$handleScroll: function(jQueryEvent) {
		jQueryEvent.preventDefault();
		this.$sonicManager.get_uiManager().onMouseScroll(jQueryEvent);
	},
	$canvasMouseMove: function(queryEvent) {
		queryEvent.preventDefault();
		document.body.style.cursor = 'default';
		this.$lastMouseMove = queryEvent;
		if (this.$sonicManager.get_uiManager().onMouseMove(queryEvent)) {
			return;
		}
		return;
	},
	$canvasOnClick: function(queryEvent) {
		queryEvent.preventDefault();
		if (this.$sonicManager.get_uiManager().onClick(queryEvent)) {
			return;
		}
		if (this.$sonicManager.onClick(queryEvent)) {
			return;
		}
		this.$sonicManager.get_uiManager().get_dragger().click();
	},
	$canvasMouseUp: function(queryEvent) {
		queryEvent.preventDefault();
		this.$sonicManager.get_uiManager().onMouseUp(this.$lastMouseMove);
	},
	resizeCanvas: function() {
		this.canvasWidth = $(window).width();
		this.canvasHeight = $(window).height();
		this.$sonicManager.set_windowLocation(OurSonic.Constants.defaultWindowLocation((ss.isNullOrUndefined(this.$sonicManager.get_sonicToon()) ? 1 : 0), this.$uiCanvas, this.$sonicManager.get_scale()));
		this.$sonicManager.set_realScale((!this.$fullscreenMode ? OurSonic.Point.$ctor(1, 1) : OurSonic.Point.$ctor(ss.Int32.div(ss.Int32.div(this.canvasWidth, 320), this.$sonicManager.get_scale().x), ss.Int32.div(ss.Int32.div(this.canvasHeight, 224), this.$sonicManager.get_scale().y))));
		this.$gameCanvas.domCanvas.attr('width', OurSonic.Help.toPx(this.$sonicManager.get_windowLocation().width * (ss.isValue(this.$sonicManager.get_sonicToon()) ? (this.$sonicManager.get_scale().x * this.$sonicManager.get_realScale().x) : 1)));
		this.$gameCanvas.domCanvas.attr('height', OurSonic.Help.toPx(this.$sonicManager.get_windowLocation().height * (ss.isValue(this.$sonicManager.get_sonicToon()) ? (this.$sonicManager.get_scale().y * this.$sonicManager.get_realScale().y) : 1)));
		this.$uiCanvas.domCanvas.attr('width', OurSonic.Help.toPx(this.canvasWidth));
		this.$uiCanvas.domCanvas.attr('height', OurSonic.Help.toPx(this.canvasHeight));
		//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
		//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));
		var screenOffset = (ss.isValue(this.$sonicManager.get_sonicToon()) ? OurSonic.Point.$ctor(ss.Int32.div(this.canvasWidth, 2) - ss.Int32.div(this.$sonicManager.get_windowLocation().width * this.$sonicManager.get_scale().x * this.$sonicManager.get_realScale().x, 2), ss.Int32.div(this.canvasHeight, 2) - ss.Int32.div(this.$sonicManager.get_windowLocation().height * this.$sonicManager.get_scale().y * this.$sonicManager.get_realScale().y, 2)) : OurSonic.Point.$ctor(0, 0));
		this.$gameCanvas.domCanvas.css('left', OurSonic.Help.toPx(screenOffset.x));
		this.$gameCanvas.domCanvas.css('top', OurSonic.Help.toPx(screenOffset.y));
	},
	clear: function() {
		this.$gameCanvas.domCanvas.width(this.$gameCanvas.domCanvas.width());
	},
	gameDraw: function() {
		if (!this.$sonicManager.get_inHaltMode()) {
			this.clear();
		}
		this.$sonicManager.draw(this.$gameCanvas.context);
	},
	uiDraw: function() {
		if (!this.$sonicManager.get_inHaltMode()) {
			this.clear();
		}
		this.$sonicManager.get_uiManager().draw(this.$uiCanvas.context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicLevel
OurSonic.SonicLevel = function() {
	this.$1$ChunkMapField = null;
	this.$1$RingsField = null;
	this.$1$CurHeightMapField = false;
	this.$1$LevelWidthField = 0;
	this.$1$LevelHeightField = 0;
	this.$1$ChunksField = null;
	this.$1$TilesField = null;
	this.$1$BlocksField = null;
	this.$1$ObjectsField = null;
	this.$1$PaletteItemsField = null;
	this.$1$PaletteField = null;
	this.$1$palAnField = null;
	this.set_tiles([]);
	this.set_blocks([]);
	this.set_chunks([]);
	this.set_chunkMap([]);
	this.set_rings({});
	this.set_curHeightMap(true);
	this.set_levelWidth(0);
	this.set_levelHeight(0);
};
OurSonic.SonicLevel.prototype = {
	get_chunkMap: function() {
		return this.$1$ChunkMapField;
	},
	set_chunkMap: function(value) {
		this.$1$ChunkMapField = value;
	},
	get_rings: function() {
		return this.$1$RingsField;
	},
	set_rings: function(value) {
		this.$1$RingsField = value;
	},
	get_curHeightMap: function() {
		return this.$1$CurHeightMapField;
	},
	set_curHeightMap: function(value) {
		this.$1$CurHeightMapField = value;
	},
	get_levelWidth: function() {
		return this.$1$LevelWidthField;
	},
	set_levelWidth: function(value) {
		this.$1$LevelWidthField = value;
	},
	get_levelHeight: function() {
		return this.$1$LevelHeightField;
	},
	set_levelHeight: function(value) {
		this.$1$LevelHeightField = value;
	},
	get_chunks: function() {
		return this.$1$ChunksField;
	},
	set_chunks: function(value) {
		this.$1$ChunksField = value;
	},
	get_tiles: function() {
		return this.$1$TilesField;
	},
	set_tiles: function(value) {
		this.$1$TilesField = value;
	},
	get_blocks: function() {
		return this.$1$BlocksField;
	},
	set_blocks: function(value) {
		this.$1$BlocksField = value;
	},
	get_objects: function() {
		return this.$1$ObjectsField;
	},
	set_objects: function(value) {
		this.$1$ObjectsField = value;
	},
	get_paletteItems: function() {
		return this.$1$PaletteItemsField;
	},
	set_paletteItems: function(value) {
		this.$1$PaletteItemsField = value;
	},
	get_palette: function() {
		return this.$1$PaletteField;
	},
	set_palette: function(value) {
		this.$1$PaletteField = value;
	},
	get_palAn: function() {
		return this.$1$palAnField;
	},
	set_palAn: function(value) {
		this.$1$palAnField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicManager
OurSonic.SonicManager = function(engine, gameCanvas, resize) {
	this.$mainCanvas = null;
	this.$myEngine = null;
	this.$objectManager = null;
	this.$drawTickCount = 0;
	this.$sonicSprites = null;
	this.$tickCount = 0;
	this.$waitingForDrawContinue = false;
	this.$waitingForTickContinue = false;
	this.$imageLength = 0;
	this.$1$CurrentGameStateField = 0;
	this.$1$BigWindowLocationField = null;
	this.$1$UIManagerField = null;
	this.$1$SonicToonField = null;
	this.$1$ScaleField = null;
	this.$1$WindowLocationField = null;
	this.$1$RealScaleField = null;
	this.$1$InHaltModeField = false;
	this.$1$IndexedPaletteField = 0;
	this.$1$AnimationsField = null;
	this.$1$AnimationInstancesField = null;
	this.$1$GoodRingField = null;
	this.$1$ShowHeightMapField = false;
	this.$1$ScreenOffsetField = null;
	this.$1$ActiveRingsField = null;
	this.$1$ForceResizeField = null;
	this.$1$BackgroundField = null;
	this.$1$ClickStateField = 0;
	this.$1$SonicLevelField = null;
	this.$1$InFocusObjectsField = null;
	this.$1$LoadingField = false;
	this.$1$SpriteCacheField = null;
	this.$1$SpriteLoaderField = null;
	this.$myEngine = engine;
	this.$myEngine.canvasWidth = $(window).width();
	this.$myEngine.canvasHeight = $(window).height();
	$.getJSON('Content/sprites/sonic.js', Function.mkdel(this, function(data) {
		this.$sonicSprites = data;
	}));
	this.$objectManager = new OurSonic.ObjectManager(this);
	this.$objectManager.init();
	var scl = 2;
	this.set_scale(OurSonic.Point.$ctor(scl, scl));
	this.set_realScale(OurSonic.Point.$ctor(1, 1));
	this.$mainCanvas = gameCanvas;
	this.set_windowLocation(OurSonic.Constants.defaultWindowLocation(1, this.$mainCanvas, this.get_scale()));
	this.set_bigWindowLocation(OurSonic.Constants.defaultWindowLocation(1, this.$mainCanvas, this.get_scale()));
	this.get_bigWindowLocation().width = ss.Int32.trunc(this.get_bigWindowLocation().width * 1.8);
	this.get_bigWindowLocation().height = ss.Int32.trunc(this.get_bigWindowLocation().height * 1.8);
	this.set_animations([]);
	this.set_animationInstances([]);
	$.getJSON('Content/sprites/explosion.js', Function.mkdel(this, function(data1) {
		this.get_animations().add(new OurSonic.Animation('explosion', data1));
	}));
	this.set_showHeightMap(false);
	this.set_goodRing(new OurSonic.Ring(false));
	this.set_activeRings([]);
	this.set_forceResize(resize);
	this.set_background(null);
	this.set_screenOffset(OurSonic.Point.$ctor(ss.Int32.div(this.$mainCanvas.domCanvas.width(), 2) - ss.Int32.div(this.get_windowLocation().width * this.get_scale().x, 2), ss.Int32.div(this.$mainCanvas.domCanvas.height(), 2) - ss.Int32.div(this.get_windowLocation().height * this.get_scale().y, 2)));
	this.set_uiManager(new OurSonic.UIManager(this, this.$mainCanvas, this.get_scale()));
	//UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));
	this.set_clickState(0);
	this.$tickCount = 0;
	this.$drawTickCount = 0;
	this.set_inHaltMode(false);
	this.$waitingForTickContinue = false;
	this.$waitingForDrawContinue = false;
	this.set_sonicLevel(new OurSonic.SonicLevel());
};
OurSonic.SonicManager.prototype = {
	get_currentGameState: function() {
		return this.$1$CurrentGameStateField;
	},
	set_currentGameState: function(value) {
		this.$1$CurrentGameStateField = value;
	},
	get_bigWindowLocation: function() {
		return this.$1$BigWindowLocationField;
	},
	set_bigWindowLocation: function(value) {
		this.$1$BigWindowLocationField = value;
	},
	get_uiManager: function() {
		return this.$1$UIManagerField;
	},
	set_uiManager: function(value) {
		this.$1$UIManagerField = value;
	},
	get_sonicToon: function() {
		return this.$1$SonicToonField;
	},
	set_sonicToon: function(value) {
		this.$1$SonicToonField = value;
	},
	get_scale: function() {
		return this.$1$ScaleField;
	},
	set_scale: function(value) {
		this.$1$ScaleField = value;
	},
	get_windowLocation: function() {
		return this.$1$WindowLocationField;
	},
	set_windowLocation: function(value) {
		this.$1$WindowLocationField = value;
	},
	get_realScale: function() {
		return this.$1$RealScaleField;
	},
	set_realScale: function(value) {
		this.$1$RealScaleField = value;
	},
	get_inHaltMode: function() {
		return this.$1$InHaltModeField;
	},
	set_inHaltMode: function(value) {
		this.$1$InHaltModeField = value;
	},
	get_indexedPalette: function() {
		return this.$1$IndexedPaletteField;
	},
	set_indexedPalette: function(value) {
		this.$1$IndexedPaletteField = value;
	},
	get_animations: function() {
		return this.$1$AnimationsField;
	},
	set_animations: function(value) {
		this.$1$AnimationsField = value;
	},
	get_animationInstances: function() {
		return this.$1$AnimationInstancesField;
	},
	set_animationInstances: function(value) {
		this.$1$AnimationInstancesField = value;
	},
	get_goodRing: function() {
		return this.$1$GoodRingField;
	},
	set_goodRing: function(value) {
		this.$1$GoodRingField = value;
	},
	get_showHeightMap: function() {
		return this.$1$ShowHeightMapField;
	},
	set_showHeightMap: function(value) {
		this.$1$ShowHeightMapField = value;
	},
	get_screenOffset: function() {
		return this.$1$ScreenOffsetField;
	},
	set_screenOffset: function(value) {
		this.$1$ScreenOffsetField = value;
	},
	get_activeRings: function() {
		return this.$1$ActiveRingsField;
	},
	set_activeRings: function(value) {
		this.$1$ActiveRingsField = value;
	},
	get_forceResize: function() {
		return this.$1$ForceResizeField;
	},
	set_forceResize: function(value) {
		this.$1$ForceResizeField = value;
	},
	get_background: function() {
		return this.$1$BackgroundField;
	},
	set_background: function(value) {
		this.$1$BackgroundField = value;
	},
	get_clickState: function() {
		return this.$1$ClickStateField;
	},
	set_clickState: function(value) {
		this.$1$ClickStateField = value;
	},
	get_sonicLevel: function() {
		return this.$1$SonicLevelField;
	},
	set_sonicLevel: function(value) {
		this.$1$SonicLevelField = value;
	},
	get_inFocusObjects: function() {
		return this.$1$InFocusObjectsField;
	},
	set_inFocusObjects: function(value) {
		this.$1$InFocusObjectsField = value;
	},
	get_loading: function() {
		return this.$1$LoadingField;
	},
	set_loading: function(value) {
		this.$1$LoadingField = value;
	},
	get_spriteCache: function() {
		return this.$1$SpriteCacheField;
	},
	set_spriteCache: function(value) {
		this.$1$SpriteCacheField = value;
	},
	get_spriteLoader: function() {
		return this.$1$SpriteLoaderField;
	},
	set_spriteLoader: function(value) {
		this.$1$SpriteLoaderField = value;
	},
	onClick: function(elementEvent) {
		var e = OurSonic.Point.$ctor(ss.Int32.div(ss.Int32.div(ss.Int32.div(elementEvent.clientX, this.get_scale().x), this.get_realScale().x), this.get_windowLocation().x), ss.Int32.div(ss.Int32.div(elementEvent.clientY, this.get_scale().y), this.get_realScale().y) + this.get_windowLocation().y);
		if (elementEvent.button === 0) {
			var ey;
			var ex;
			switch (this.get_clickState()) {
				case 0: {
					return false;
					break;
				}
				case 1: {
					ex = ss.Int32.div(e.x, 128);
					ey = ss.Int32.div(e.y, 128);
					var ch = this.get_sonicLevel().get_chunks()[this.get_sonicLevel().get_chunkMap()[ex][ey]];
					var tp = ch.getBlock(e.x - ex * 128, e.y - ey * 128);
					if (ss.isValue(tp)) {
						var tpc = ch.getTilePiece(e.x - ex * 128, e.y - ey * 128);
						this.get_uiManager().get_data().get_indexes().set_tpIndex(this.get_sonicLevel().get_blocks().indexOf(tp));
						this.get_uiManager().get_data().get_modifyTilePieceArea().TilePiece = tp;
						this.get_uiManager().get_data().get_solidTileArea().Visible = true;
						this.get_uiManager().get_data().get_modifyTilePieceArea().tpc = tpc;
					}
					return true;
				}
				case 2: {
					ex = e.x;
					ey = e.y;
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
		this.set_inFocusObjects([]);
		var $t1 = this.get_sonicLevel().get_objects().getEnumerator();
		try {
			while ($t1.moveNext()) {
				var obj = $t1.get_current();
				if (this.get_bigWindowLocation().intersects(OurSonic.Point.$ctor(obj.get_x(), obj.get_y()))) {
					this.get_inFocusObjects().add(obj);
					obj.tick(obj, this.get_sonicLevel(), this.get_sonicToon());
				}
			}
		}
		finally {
			$t1.dispose();
		}
		//sonicManager.uiManager.liveObjectsArea.populate(sonicManager.inFocusObjects);TODO:::
		var $t2 = this.get_animationInstances().getEnumerator();
		try {
			while ($t2.moveNext()) {
				var animationInstance = $t2.get_current();
				animationInstance.tick();
			}
		}
		finally {
			$t2.dispose();
		}
	},
	tick: function() {
		if (this.get_loading()) {
			return;
		}
		if (this.get_currentGameState() === 1) {
			if (this.get_inHaltMode()) {
				if (this.$waitingForTickContinue) {
					return;
				}
			}
			this.$tickCount++;
			this.$tickObjects();
			this.get_sonicToon().set_ticking(true);
			try {
				this.get_sonicToon().tick(this.get_sonicLevel(), this.get_scale());
			}
			catch ($t1) {
				var exc = ss.Exception.wrap($t1);
				var txt = 'There was an error on this page.\n\n';
				txt += 'Error description: ' + exc.get_message() + '\n\n';
				txt += 'Stack: ' + exc.get_innerException() + '\n\n';
				//todo::callstack
				txt += 'Click OK to continue.\n\n';
				window.alert(txt);
				throw exc;
			}
			finally {
				this.get_sonicToon().set_ticking(false);
			}
			if (this.get_inHaltMode()) {
				if (this.$waitingForTickContinue) {
					return;
				}
				this.$waitingForTickContinue = true;
				this.$waitingForDrawContinue = false;
			}
			if (this.get_sonicToon().get_x() > 128 * this.get_sonicLevel().get_levelWidth()) {
				this.get_sonicToon().set_x(0);
			}
		}
	},
	preloadSprites: function(scale, completed, update) {
		this.set_spriteCache(new OurSonic.SpriteCache());
		var ci = this.get_spriteCache().get_rings();
		var inj = 0;
		var spriteLocations = [];
		for (var j = 0; j < 4; j++) {
			spriteLocations.add(String.format('assets/Sprites/ring{0}.png', j));
			this.$imageLength++;
		}
		var md = 0;
		var ind_ = this.get_spriteCache().get_indexes();
		this.set_spriteLoader(new OurSonic.SpriteLoader(completed, update));
		var spriteStep = this.get_spriteLoader().addStep('Sprites', function(i, done) {
			var sp = i * 200;
			ci[sp] = OurSonic.Help.loadSprite(spriteLocations[i], function(jd) {
				ci[jd.get_tag() * 200 + scale.x * 100 + scale.y] = OurSonic.Help.scaleSprite(jd, scale, function(jc) {
					done();
				});
			});
		});
		//
		//
		//
		//                    var sm = this.spriteLoader = new SpriteLoader(completed, update);
		//
		//
		//
		//                    var spriteStep = sm.addStep("Sprites", function (i, done) {
		//
		//
		//
		//                    var sp = i * 200;
		//
		//
		//
		//                    ci[sp] = _H.loadSprite(spriteLocations[i], function (jd) {
		//
		//
		//
		//                    ci[jd.tag * 200 + scale.x * 100 + scale.y] = _H.scaleSprite(jd, scale, function (jc) {
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    });
		//
		//
		//
		//                    });
		//
		//
		//
		//                    ci[sp].tag = i;
		//
		//
		//
		//                    }, function () {
		//
		//
		//
		//                    ind_.sprites = ind_.sprites + 1;
		//
		//
		//
		//                    if (ind_.sprites == 4) {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    }, false);
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
		//                    for (var i = 0; i < spriteLocations.length; i++) {
		//
		//
		//
		//                    sm.addIterationToStep(spriteStep, i);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    
		//
		//
		//
		//                    var that = this;
		//
		//
		//
		//                    var tileStep = sm.addStep("Tiles", function (k, done) {
		//
		//
		//
		//                    var canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
		//
		//
		//
		//                    var ctx = canv.context;
		//
		//
		//
		//                    canv.width = canv.width;
		//
		//
		//
		//                    md = that.SonicLevel.Blocks[k];
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, false);
		//
		//
		//
		//                    that.SpriteCache.tilepieces[false + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
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
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    canv.width = canv.width;
		//
		//
		//
		//                    
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, true);
		//
		//
		//
		//                    that.SpriteCache.tilepieces[true + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    
		//
		//
		//
		//                    }, function () {
		//
		//
		//
		//                    ind_.tps++;
		//
		//
		//
		//                    if (ind_.tps == that.SonicLevel.Blocks.length * 2) {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    }, true);
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
		//
		//                    for (var k = 0; k < this.SonicLevel.Blocks.length; k++) {
		//
		//
		//
		//                    sm.addIterationToStep(tileStep, k);
		//
		//
		//
		//                    }
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
		//                    var speed = 1;
		//
		//
		//
		//                    /*
		//
		//
		//
		//                    var pixelStep = sm.addStep("Pixels", function (k, done) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    var ca = _H.defaultCanvas(1, 1);
		//
		//
		//
		//                    ca.fillStyle = "#" + sonicManager.SonicLevel.Palette[k.x][k.y];
		//
		//
		//
		//                    ca.context.fillRect(0, 0, 1, 1);
		//
		//
		//
		//                    sonicManager.SonicLevel.Palette[k.x][k.y] = _H.loadSprite(ca.canvas.toDataURL("image/png"), done);
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
		//                    }, function () {
		//
		//
		//
		//                    ind_.px++;
		//
		//
		//
		//                    if (ind_.px >= 16*4) {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    });
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (var qc = 0; qc < sonicManager.SonicLevel.Palette.length; qc++) {
		//
		//
		//
		//                    for (var qcc = 0; qcc < sonicManager.SonicLevel.Palette[qc].length; qcc++) {
		//
		//
		//
		//                    sm.addIterationToStep(pixelStep, { x: qc, y: qcc });
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    #1#
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
		//                    /*        var heightStep = sm.addStep("Height Maps", function (k, done) {
		//
		//
		//
		//                    var canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
		//
		//
		//
		//                    var ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    md = that.SonicLevel.HeightMaps[k];
		//
		//
		//
		//                    md.index = k;
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, -1, false, false, 0);
		//
		//
		//
		//                    var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.heightMaps[md.index] = _H.loadSprite(fc, done);
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
		//                    }, function () {
		//
		//
		//
		//                    ind_.hms++;
		//
		//
		//
		//                    if (ind_.hms >= that.SonicLevel.HeightMaps.length / speed) {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    });
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
		//                    for (var k = 0; k < this.SonicLevel.HeightMaps.length; k++) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    sm.addIterationToStep(heightStep, k);
		//
		//
		//
		//                    }#1#
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
		//                    /*
		//
		//
		//
		//                    var tileStep = sm.addStep("Tile Maps", function (k, done) {
		//
		//
		//
		//                    var canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
		//
		//
		//
		//                    var ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    md = that.SonicLevel.Tiles[k];
		//
		//
		//
		//                    md.index = k;
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale,  false, false, 0);
		//
		//
		//
		//                    var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.tiles[md.index] = _H.loadSprite(fc, done);
		//
		//
		//
		//                    
		//
		//
		//
		//                    }, function () {
		//
		//
		//
		//                    ind_.tls++;
		//
		//
		//
		//                    if (ind_.tls >= that.SonicLevel.Tiles.length  / speed) {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    });
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
		//                    for (var k = 0; k < this.SonicLevel.Tiles.length; k++) {
		//
		//
		//
		//                    sm.addIterationToStep(tileStep, k);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    #1#
		//
		//
		//
		//                    
		//
		//
		//
		//                    var numOfAnimations = 0;
		//
		//
		//
		//                    
		//
		//
		//
		//                    /* var aTileStep = sm.addStep("Animated Tile Maps", function (k, done) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (var m = 0; m < 4; m++) {
		//
		//
		//
		//                    var canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
		//
		//
		//
		//                    var ctx = canv.context;
		//
		//
		//
		//                    k.draw(ctx, { x: 0, y: 0 }, scale, false, false, m);
		//
		//
		//
		//                    sonicManager.SpriteCache.tiles[k.index + " " + false + " " + false + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);
		//
		//
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    k.draw(ctx, { x: 0, y: 0 }, scale, true, false, m);
		//
		//
		//
		//                    sonicManager.SpriteCache.tiles[k.index + " " + true + " " + false + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);
		//
		//
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    k.draw(ctx, { x: 0, y: 0 }, scale, false, true, m);
		//
		//
		//
		//                    sonicManager.SpriteCache.tiles[k.index + " " + false + " " + true + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);
		//
		//
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    k.draw(ctx, { x: 0, y: 0 }, scale, true, true, m);
		//
		//
		//
		//                    sonicManager.SpriteCache.tiles[k.index + " " + true + " " + true + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);
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
		//
		//                    }
		//
		//
		//
		//                    
		//
		//
		//
		//                    }, function () {
		//
		//
		//
		//                    ind_.aes++;
		//
		//
		//
		//                    if (ind_.aes >= numOfAnimations * 4 * 4) {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    }, true);
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (jc = 0; jc < sonicManager.SonicLevel.AnimatedFiles.length; jc++) {
		//
		//
		//
		//                    var fcc = sonicManager.SonicLevel.AnimatedFiles[jc];
		//
		//
		//
		//                    for (j = 0; j < fcc.length; j++) {
		//
		//
		//
		//                    sm.addIterationToStep(aTileStep, fcc[j]);
		//
		//
		//
		//                    numOfAnimations++;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }#1#
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
		//                    var chunkStep = sm.addStep("Chunk Maps", function (k, done) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    var canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
		//
		//
		//
		//                    var ctx = canv.context;
		//
		//
		//
		//                    canv.width = canv.width;
		//
		//
		//
		//                    md = that.SonicLevel.Chunks[k];
		//
		//
		//
		//                    /*
		//
		//
		//
		//                    
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, false);
		//
		//
		//
		//                    //var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    
		//
		//
		//
		//                    that.SpriteCache.tileChunks[false + " " + md.index + " " + scale.y + " " + scale.x + " -"] = canv.canvas;
		//
		//
		//
		//                    ind_.tcs++;
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
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
		//                    if (!md.onlyBackground()) {
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, true);
		//
		//
		//
		//                    //  var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.tileChunks[true + " " + md.index + " " + scale.y + " " + scale.x + " -"] = canv.canvas;
		//
		//
		//
		//                    ind_.tcs++;
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    } else {
		//
		//
		//
		//                    that.SpriteCache.tileChunks[true + " " + md.index + " " + scale.y + " " + scale.x + " -"] = 1;
		//
		//
		//
		//                    ind_.tcs++;
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    }
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
		//                    if (md.animated) {
		//
		//
		//
		//                    sonicManager.drawTickCount = 0;
		//
		//
		//
		//                    sonicManager.CACHING = false;
		//
		//
		//
		//                    for (var c = 0; c < md.animated.Frames.length; c++) {
		//
		//
		//
		//                    var frame = md.animated.Frames[c];
		//
		//
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, true, c);
		//
		//
		//
		//                    //   var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.tileChunks[true + " " + md.index + " " + scale.y + " " + scale.x + " " + c] = canv.canvas;
		//
		//
		//
		//                    canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    
		//
		//
		//
		//                    md.draw(ctx, { x: 0, y: 0 }, scale, false, c);
		//
		//
		//
		//                    // var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.tileChunks[false + " " + md.index + " " + scale.y + " " + scale.x + " " + c] = canv.canvas;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    sonicManager.CACHING = true;
		//
		//
		//
		//                    }#1#
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
		//                    var posj = { x: 0, y: 0 };
		//
		//
		//
		//                    canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    for (var _y = 0; _y < 8; _y++) {
		//
		//
		//
		//                    for (var _x = 0; _x < 8; _x++) {
		//
		//
		//
		//                    var tp = md.tilePieces[_x][_y];
		//
		//
		//
		//                    var hd = sonicManager.SonicLevel.HeightMaps[sonicManager.SonicLevel.CollisionIndexes1[tp.Block]];
		//
		//
		//
		//                    var __x = _x;
		//
		//
		//
		//                    var __y = _y;
		//
		//
		//
		//                    var vangle;
		//
		//
		//
		//                    var posm = { x: posj.x + (__x * 16) * scale.x, y: posj.y + (__y * 16) * scale.y };
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
		//
		//                    if (hd == undefined) continue;
		//
		//
		//
		//                    if (hd == 0) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    } else if (hd == 1) {
		//
		//
		//
		//                    if (tp.Solid1 > 0) {
		//
		//
		//
		//                    ctx.fillStyle = HeightMask.colors[tp.Solid1];
		//
		//
		//
		//                    ctx.fillRect(posj.x + (__x * 16) * scale.x, posj.y + (__y * 16) * scale.y, scale.x * 16, scale.y * 16);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    else {
		//
		//
		//
		//                    vangle = sonicManager.SonicLevel.Angles[sonicManager.SonicLevel.CollisionIndexes1[tp.Block]];
		//
		//
		//
		//                    
		//
		//
		//
		//                    hd.draw(ctx, posm, scale, -1, tp.XFlip, tp.YFlip, tp.Solid1, vangle);
		//
		//
		//
		//                    /*   posm.x += 16 * scale.x / 2;
		//
		//
		//
		//                    posm.y += 16 * scale.y / 2;
		//
		//
		//
		//                    ctx.strokeStyle = "#DDD";
		//
		//
		//
		//                    ctx.font = "18pt courier ";
		//
		//
		//
		//                    ctx.shadowColor = "";
		//
		//
		//
		//                    ctx.shadowBlur = 0;
		//
		//
		//
		//                    ctx.lineWidth = 1;
		//
		//
		//
		//                    ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);#1#
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    //  var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.heightMapChunks[1 + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
		//
		//
		//
		//                    ind_.hmc++; done();
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
		//
		//                    
		//
		//
		//
		//                    canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
		//
		//
		//
		//                    ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    for (var _y = 0; _y < 8; _y++) {
		//
		//
		//
		//                    for (var _x = 0; _x < 8; _x++) {
		//
		//
		//
		//                    var tp = md.tilePieces[_x][_y];
		//
		//
		//
		//                    var hd = sonicManager.SonicLevel.HeightMaps[sonicManager.SonicLevel.CollisionIndexes2[tp.Block]];
		//
		//
		//
		//                    var __x = _x;
		//
		//
		//
		//                    var __y = _y;
		//
		//
		//
		//                    var vangle;
		//
		//
		//
		//                    var posm = { x: posj.x + (__x * 16) * scale.x, y: posj.y + (__y * 16) * scale.y };
		//
		//
		//
		//                    if (hd == undefined) continue;
		//
		//
		//
		//                    
		//
		//
		//
		//                    if (hd == 0) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    } else if (hd == 1) {
		//
		//
		//
		//                    if (tp.Solid2 > 0) {
		//
		//
		//
		//                    ctx.fillStyle = HeightMask.colors[tp.Solid2];
		//
		//
		//
		//                    ctx.fillRect(posj.x + (__x * 16) * scale.x, posj.y + (__y * 16) * scale.y, scale.x * 16, scale.y * 16);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    else {
		//
		//
		//
		//                    vangle = sonicManager.SonicLevel.Angles[sonicManager.SonicLevel.CollisionIndexes2[tp.Block]];
		//
		//
		//
		//                    
		//
		//
		//
		//                    hd.draw(ctx, posm, scale, -1, tp.XFlip, tp.YFlip, tp.Solid2, vangle);
		//
		//
		//
		//                    /*   posm.x += 16 * scale.x / 2;
		//
		//
		//
		//                    posm.y += 16 * scale.y / 2;
		//
		//
		//
		//                    ctx.strokeStyle = "#DDD";
		//
		//
		//
		//                    ctx.font = "18pt courier ";
		//
		//
		//
		//                    ctx.shadowColor = "";
		//
		//
		//
		//                    ctx.shadowBlur = 0;
		//
		//
		//
		//                    ctx.lineWidth = 1;
		//
		//
		//
		//                    ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);#1#
		//
		//
		//
		//                    
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    //  var fc = canv.canvas.toDataURL("image/png");
		//
		//
		//
		//                    that.SpriteCache.heightMapChunks[2 + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
		//
		//
		//
		//                    ind_.hmc++; done();
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
		//                    }, function () {
		//
		//
		//
		//                    if (/*ind_.tcs >= that.SonicLevel.Chunks.length * 2 / speed && #1#ind_.hmc >= that.SonicLevel.Chunks.length * 2 / speed) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }
		//
		//
		//
		//                    return false;
		//
		//
		//
		//                    }, true);
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (var k = 0; k < this.SonicLevel.Chunks.length; k++) {
		//
		//
		//
		//                    sm.addIterationToStep(chunkStep, k);
		//
		//
		//
		//                    }
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
		//
		//                    var sonicStep = sm.addStep("Sonic Sprites", function (sp, done) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    var cci = that.SpriteCache.sonicSprites;
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (var spritec in $sonicSprites) {
		//
		//
		//
		//                    cci[spritec + scale.x + scale.y] = _H.scaleCSImage($sonicSprites[spritec], scale);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    
		//
		//
		//
		//                    var cji = that.SpriteCache.animationSprites = [];
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (var anni in sonicManager.animations) {
		//
		//
		//
		//                    var imd = 0;
		//
		//
		//
		//                    for (var image in sonicManager.animations[anni].images) {
		//
		//
		//
		//                    cji[(imd++) + " " + sonicManager.animations[anni].name + scale.x + scale.y] = _H.scaleCSImage(sonicManager.animations[anni].images[image], scale);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    
		//
		//
		//
		//                    done();
		//
		//
		//
		//                    }, function () {
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    }, false);
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
		//
		//                    that.spriteLocations = [];
		//
		//
		//
		//                    sm.addIterationToStep(sonicStep, true);
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
		//
		//                    var bgStep = sm.addStep("Background data", function (sp, done) {
		//
		//
		//
		//                    
		//
		//
		//
		//                    var canv = _H.defaultCanvas(that.SonicLevel.BackgroundWidth * 128 * scale.x, that.SonicLevel.BackgroundHeight * 128 * scale.y);
		//
		//
		//
		//                    var ctx = canv.context;
		//
		//
		//
		//                    ctx.clearRect(0, 0, canv.width, canv.height);
		//
		//
		//
		//                    
		//
		//
		//
		//                    for (var x = 0; x < that.SonicLevel.BackgroundWidth; x++) {
		//
		//
		//
		//                    for (var y = 0; y < that.SonicLevel.BackgroundHeight; y++) {
		//
		//
		//
		//                    var ck = sonicManager.SonicLevel.Chunks[that.SonicLevel.BGChunkMap[x][y]];
		//
		//
		//
		//                    if (ck) {
		//
		//
		//
		//                    ck.draw(ctx, { x: x * 128 * scale.x, y: y * 128 * scale.y }, scale, 0);
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    }
		//
		//
		//
		//                    
		//
		//
		//
		//                    that.SpriteCache.bgImage = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);
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
		//                    }, function () {
		//
		//
		//
		//                    that.background = new ParallaxBG(that.SpriteCache.bgImage, { x: 1, y: 1 });
		//
		//
		//
		//                    return true;
		//
		//
		//
		//                    
		//
		//
		//
		//                    }, true);
		//
		//
		//
		//                    sm.addIterationToStep(bgStep, 0);
	},
	draw: function(canvas) {
		if (this.get_inHaltMode()) {
			canvas.fillStyle = 'white';
			canvas.font = '21pt arial bold';
			canvas.fillText('HALT MODE\r\n Press: P to step\r\n        O to resume', 10, 120);
			if (this.$waitingForDrawContinue) {
				return;
			}
			else {
				this.$waitingForDrawContinue = true;
			}
		}
		canvas.save();
		this.$drawTickCount++;
		if (ss.isValue(this.get_spriteLoader()) && !this.get_spriteLoader().tick() || this.get_loading()) {
			canvas.fillStyle = 'white';
			canvas.fillText('Loading...   ', 95, 95);
			canvas.restore();
			return;
		}
		this.set_screenOffset(OurSonic.Point.$ctor(0, 0));
		if (this.get_currentGameState() === 1) {
			canvas.scale(this.get_realScale().x, this.get_realScale().y);
			if (this.get_sonicToon().get_ticking()) {
				while (true) {
					if (this.get_sonicToon().get_ticking()) {
						break;
					}
				}
			}
			canvas.translate(this.get_screenOffset().x, this.get_screenOffset().y);
			canvas.fillStyle = '#000000';
			canvas.fillRect(0, 0, this.get_windowLocation().width * this.get_scale().x, this.get_windowLocation().height * this.get_scale().y);
			this.get_windowLocation().x = ss.Int32.div(this.get_sonicToon().get_x() * this.get_windowLocation().width, 2);
			this.get_windowLocation().y = ss.Int32.div(this.get_sonicToon().get_y() * this.get_windowLocation().height, 2);
			this.get_bigWindowLocation().x = ss.Int32.div(this.get_sonicToon().get_x() * this.get_bigWindowLocation().width, 2);
			this.get_bigWindowLocation().y = ss.Int32.div(this.get_sonicToon().get_y() * this.get_bigWindowLocation().height, 2);
			if (ss.isValue(this.get_background())) {
				var wOffset = this.get_windowLocation().x;
				var bw = ss.Int32.div(this.get_background().get_width(), this.get_scale().x);
				var movex = ss.Int32.div(wOffset, bw) * bw;
				this.get_background().draw(canvas, OurSonic.Point.$ctor(-this.get_windowLocation().x * this.get_scale().x + movex, ss.Int32.div(-this.get_windowLocation().y, 4) * this.get_scale().y), this.get_scale(), wOffset);
				this.get_background().draw(canvas, OurSonic.Point.$ctor(-this.get_windowLocation().x * this.get_scale().x + movex + this.get_background().get_width(), ss.Int32.div(-this.get_windowLocation().y, 4) * this.get_scale().y), this.get_scale(), wOffset);
			}
		}
		if (this.get_windowLocation().x < 0) {
			this.get_windowLocation().x = 0;
		}
		if (this.get_windowLocation().x > 128 * this.get_sonicLevel().get_levelWidth() - this.get_windowLocation().width) {
			this.get_windowLocation().x = 128 * this.get_sonicLevel().get_levelWidth() - this.get_windowLocation().width;
		}
		var offs = [];
		var w1 = ss.Int32.div(this.get_windowLocation().width, 128);
		var h1 = ss.Int32.div(this.get_windowLocation().height, 128);
		for (var i = -1; i < w1; i++) {
			for (var j = -1; j < h1; j++) {
				offs.add(OurSonic.Point.$ctor(i, j));
			}
		}
		var bounds = OurSonic.IntersectingRectangle.$ctor(-32, -32, this.get_windowLocation().width * this.get_scale().x + 32, this.get_windowLocation().height * this.get_scale().y + 32, OurSonic.Constants.intersects);
		if (ss.isValue(this.get_sonicLevel().get_chunks()) && this.get_sonicLevel().get_chunks().length > 0) {
			if (!!this.get_sonicLevel().get_paletteItems()[0]) {
				for (var k = 0; !!(k < this.get_sonicLevel().get_paletteItems()[0].length); k++) {
					var pal = this.get_sonicLevel().get_paletteItems()[0][k];
					for (var j1 = 0; !!(j1 < pal.TotalLength); j1 += pal.SkipIndex) {
						if (!!ss.referenceEquals(this.$drawTickCount % (pal.TotalLength + pal.SkipIndex), j1)) {
							this.get_sonicLevel().get_palAn()[k] = j1 / pal.SkipIndex;
						}
					}
					for (var m = 0; !!(m < pal.Pieces.length); m++) {
						var mj = pal.Pieces[m];
						this.get_sonicLevel().get_palette()[mj.PaletteIndex][mj.PaletteOffset / 2] = pal.Palette[this.get_sonicLevel().get_palAn()[k] * (pal.Pieces.length * 2) + 0 + mj.PaletteMultiply];
						this.get_sonicLevel().get_palette()[mj.PaletteIndex][mj.PaletteOffset / 2 + 1] = pal.Palette[this.get_sonicLevel().get_palAn()[k] * (pal.Pieces.length * 2) + 1 + mj.PaletteMultiply];
					}
				}
			}
			var fxP = ss.Int32.div(this.get_windowLocation().x + 128, 128);
			var fyP = ss.Int32.div(this.get_windowLocation().y + 128, 128);
			var $t1 = offs.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var off = $t1.get_current();
					var _xP = fxP + off.x;
					var _yP = fyP + off.y;
					var _yPreal = fyP + off.y;
					if (_xP < 0 || _xP >= this.get_sonicLevel().get_levelWidth()) {
						continue;
					}
					_yP = OurSonic.Help.mod(_yP, this.get_sonicLevel().get_levelHeight());
					var ind = this.get_sonicLevel().get_chunkMap()[_xP][_yP];
					var chunk = this.get_sonicLevel().get_chunks()[ind];
					var anni = this.get_sonicLevel().get_chunks()[ind];
					if (ss.isValue(anni)) {
						anni.animatedTick();
					}
					if (ss.isNullOrUndefined(chunk)) {
						continue;
					}
					var pos = OurSonic.Point.$ctor(_xP * 128 * this.get_scale().x, _yPreal * 128 * this.get_scale().y);
					var posj = OurSonic.Point.$ctor(pos.x - this.get_windowLocation().x * this.get_scale().x, pos.y - this.get_windowLocation().y * this.get_scale().y);
					if (!chunk.isEmpty()) {
						chunk.draw(canvas, posj, this.get_scale(), 0, bounds);
					}
					if (false && this.get_currentGameState() === 0) {
						canvas.strokeStyle = '#DD0033';
						canvas.lineWidth = 3;
						canvas.strokeRect(posj.x, posj.y, 128 * this.get_scale().x, 128 * this.get_scale().y);
					}
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = Object.getObjectEnumerator(this.get_sonicLevel().get_rings());
			try {
				while ($t2.moveNext()) {
					var r = $t2.get_current();
					//
					//                     for (var ring in this.SonicLevel.Rings) {
					//
					//                     var r = this.SonicLevel.Rings[ring];
					//
					//                     if (this.sonicToon) {
					//
					//                     if (!this.sonicToon.obtainedRing[ring])
					//
					//                     if (this.bigWindowLocation.intersects(r))
					//
					//                     this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, true);
					//
					//                     } else {
					//
					//                     if (this.bigWindowLocation.intersects(r))
					//
					//                     this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, false);
					//
					//                     }
					//
					//                     }
				}
			}
			finally {
				$t2.dispose();
			}
			var $t3 = this.get_sonicLevel().get_objects().getEnumerator();
			try {
				while ($t3.moveNext()) {
					var o = $t3.get_current();
					if (o.get_dead() || this.get_bigWindowLocation().intersects(OurSonic.Point.$ctor(o.get_x(), o.get_y()))) {
						o.draw(canvas, (o.get_x() - this.get_windowLocation().x) * this.get_scale().x, (o.get_y() - this.get_windowLocation().y) * this.get_scale().y, this.get_scale(), this.get_showHeightMap());
					}
				}
			}
			finally {
				$t3.dispose();
			}
			var $t4 = this.get_animationInstances().getEnumerator();
			try {
				while ($t4.moveNext()) {
					var ano = $t4.get_current();
					ano.draw(canvas, -this.get_windowLocation().x, -this.get_windowLocation().y, this.get_scale());
				}
			}
			finally {
				$t4.dispose();
			}
			for (var i1 = this.get_activeRings().length - 1; i1 >= 0; i1--) {
				var ac = this.get_activeRings()[i1];
				ac.draw(canvas, OurSonic.Point.$ctor(ac.get_x() - this.get_windowLocation().x, ac.get_y() - this.get_windowLocation().y), this.get_scale());
				if (ac.get_tickCount() > 256) {
					this.get_activeRings().remove(ac);
				}
			}
			if (this.get_currentGameState() === 1) {
				this.get_sonicToon().draw(canvas, this.get_scale());
				if (this.get_windowLocation().x < 0) {
					this.get_windowLocation().x = 0;
				}
				if (this.get_windowLocation().y < 0) {
					this.get_windowLocation().y = 0;
				}
				if (this.get_windowLocation().x > 128 * this.get_sonicLevel().get_levelWidth() - this.get_windowLocation().width) {
					this.get_windowLocation().x = 128 * this.get_sonicLevel().get_levelWidth() - this.get_windowLocation().width;
				}
				//if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
				//    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
			}
			var $t5 = offs.getEnumerator();
			try {
				while ($t5.moveNext()) {
					var off1 = $t5.get_current();
					var _xP1 = fxP + off1.x;
					var _yP1 = fyP + off1.y;
					var _yPreal1 = fyP + off1.y;
					if (_xP1 < 0 || _xP1 >= this.get_sonicLevel().get_levelWidth()) {
						continue;
					}
					_yP1 = OurSonic.Help.mod(_yP1, this.get_sonicLevel().get_levelHeight());
					var chunk1 = this.get_sonicLevel().get_chunks()[this.get_sonicLevel().get_chunkMap()[_xP1][_yP1]];
					if (ss.isNullOrUndefined(chunk1)) {
						continue;
					}
					var pos1 = OurSonic.Point.$ctor(_xP1 * 128 * this.get_scale().x, _yPreal1 * 128 * this.get_scale().y);
					var posj1 = OurSonic.Point.$ctor(pos1.x - this.get_windowLocation().x * this.get_scale().x, pos1.y - this.get_windowLocation().y * this.get_scale().y);
					if (!chunk1.isEmpty() && !chunk1.onlyBackground()) {
						chunk1.draw(canvas, posj1, this.get_scale(), 1, bounds);
					}
					if (false && this.get_currentGameState() === 0) {
						canvas.strokeStyle = '#DD0033';
						canvas.lineWidth = 3;
						canvas.strokeRect(posj1.x, posj1.y, 128 * this.get_scale().x, 128 * this.get_scale().y);
					}
					if (this.get_showHeightMap()) {
						//
						//                            var fd = sonicManager.SpriteCache.heightMapChunks[(this.SonicLevel.curHeightMap ? 1 : 2) + " " + chunk.index + " " + scale.y + " " + scale.x];
						//
						//                            if (!fd) {
						//
						//                            var md = chunk;
						//
						//                            var posj1 = { x: 0, y: 0 };
						//
						//                            var canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
						//
						//                            var ctx = canv.context;
						//
						//                            canv.width = canv.width;
						//
						//                            for (var _y = 0; _y < 8; _y++) {
						//
						//                            for (var _x = 0; _x < 8; _x++) {
						//
						//                            var tp = md.tilePieces[_x][_y];
						//
						//                            
						//
						//                            var hd = sonicManager.SonicLevel.HeightMaps[(this.SonicLevel.curHeightMap ? sonicManager.SonicLevel.CollisionIndexes1[tp.Block] : sonicManager.SonicLevel.CollisionIndexes2[tp.Block])];
						//
						//                            
						//
						//                            var __x = _x;
						//
						//                            var __y = _y;
						//
						//                            var vangle;
						//
						//                            var posm = { x: posj1.x + (__x * 16) * scale.x, y: posj1.y + (__y * 16) * scale.y };
						//
						//                            
						//
						//                            
						//
						//                            
						//
						//                            if (hd == undefined) continue;
						//
						//                            if (hd == 0) {
						//
						//                            
						//
						//                            } else if (hd == 1) {
						//
						//                            if ((this.SonicLevel.curHeightMap ? tp.Solid1 : tp.Solid2) > 0) {
						//
						//                            ctx.fillStyle = HeightMask.colors[this.SonicLevel.curHeightMap ? tp.Solid1 : tp.Solid2];
						//
						//                            ctx.fillRect(posj1.x + (__x * 16) * scale.x, posj1.y + (__y * 16) * scale.y, scale.x * 16, scale.y * 16);
						//
						//                            }
						//
						//                            }
						//
						//                            else {
						//
						//                            vangle = sonicManager.SonicLevel.Angles[(this.SonicLevel.curHeightMap ? sonicManager.SonicLevel.CollisionIndexes1[tp.Block] : sonicManager.SonicLevel.CollisionIndexes2[tp.Block])];
						//
						//                            
						//
						//                            hd.draw(ctx, posm, scale, -1, tp.XFlip, tp.YFlip, this.SonicLevel.curHeightMap ? tp.Solid1 : tp.Solid2, vangle);
						//
						//                            /*   posm.x += 16 * scale.x / 2;
						//
						//                            posm.y += 16 * scale.y / 2;
						//
						//                            ctx.strokeStyle = "#DDD";
						//
						//                            ctx.font = "18pt courier ";
						//
						//                            ctx.shadowColor = "";
						//
						//                            ctx.shadowBlur = 0;
						//
						//                            ctx.lineWidth = 1;
						//
						//                            ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);#1#
						//
						//                            }
						//
						//                            }
						//
						//                            }
						//
						//                            //  var fc = canv.canvas.toDataURL("image/png");
						//
						//                            fd = that.SpriteCache.heightMapChunks[(this.SonicLevel.curHeightMap ? 1 : 2) + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
						//
						//                            }
						//
						//                            canvas.drawImage(fd, posj.x, posj.y);
					}
					if (this.get_currentGameState() === 0) {
						canvas.strokeStyle = '#DD0033';
						canvas.lineWidth = 3;
						canvas.strokeRect(posj1.x, posj1.y, 128 * this.get_scale().x, 128 * this.get_scale().y);
					}
				}
			}
			finally {
				$t5.dispose();
			}
		}
		canvas.restore();
		if (this.get_currentGameState() === 1) {
			this.get_sonicToon().drawUI(canvas, OurSonic.Point.$ctor(this.get_screenOffset().x, this.get_screenOffset().y), this.get_scale());
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicObject
OurSonic.SonicObject = function() {
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$DeadField = false;
};
OurSonic.SonicObject.prototype = {
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
	get_dead: function() {
		return this.$1$DeadField;
	},
	set_dead: function(value) {
		this.$1$DeadField = value;
	},
	tick: function(sonicObject, sonicLevel, sonicToon) {
	},
	draw: function(canvas, x, y, scale, showHeightMap) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteCache
OurSonic.SpriteCache = function() {
	this.$1$RingsField = null;
	this.$1$TileChunksField = null;
	this.$1$TilepiecesField = null;
	this.$1$TilesField = null;
	this.$1$SonicSpritesField = null;
	this.$1$HeightMapsField = null;
	this.$1$HeightMapChunksField = null;
	this.$1$IndexesField = null;
};
OurSonic.SpriteCache.prototype = {
	get_rings: function() {
		return this.$1$RingsField;
	},
	set_rings: function(value) {
		this.$1$RingsField = value;
	},
	get_tileChunks: function() {
		return this.$1$TileChunksField;
	},
	set_tileChunks: function(value) {
		this.$1$TileChunksField = value;
	},
	get_tilepieces: function() {
		return this.$1$TilepiecesField;
	},
	set_tilepieces: function(value) {
		this.$1$TilepiecesField = value;
	},
	get_tiles: function() {
		return this.$1$TilesField;
	},
	set_tiles: function(value) {
		this.$1$TilesField = value;
	},
	get_sonicSprites: function() {
		return this.$1$SonicSpritesField;
	},
	set_sonicSprites: function(value) {
		this.$1$SonicSpritesField = value;
	},
	get_heightMaps: function() {
		return this.$1$HeightMapsField;
	},
	set_heightMaps: function(value) {
		this.$1$HeightMapsField = value;
	},
	get_heightMapChunks: function() {
		return this.$1$HeightMapChunksField;
	},
	set_heightMapChunks: function(value) {
		this.$1$HeightMapChunksField = value;
	},
	get_indexes: function() {
		return this.$1$IndexesField;
	},
	set_indexes: function(value) {
		this.$1$IndexesField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteCacheIndexes
OurSonic.SpriteCacheIndexes = function() {
	this.$1$SpritesField = 0;
	this.$1$TpsField = 0;
	this.$1$TcsField = 0;
	this.$1$SsField = 0;
	this.$1$HmsField = 0;
	this.$1$HmcField = 0;
	this.$1$TlsField = 0;
	this.$1$PxField = 0;
	this.$1$AesField = 0;
};
OurSonic.SpriteCacheIndexes.prototype = {
	get_sprites: function() {
		return this.$1$SpritesField;
	},
	set_sprites: function(value) {
		this.$1$SpritesField = value;
	},
	get_tps: function() {
		return this.$1$TpsField;
	},
	set_tps: function(value) {
		this.$1$TpsField = value;
	},
	get_tcs: function() {
		return this.$1$TcsField;
	},
	set_tcs: function(value) {
		this.$1$TcsField = value;
	},
	get_ss: function() {
		return this.$1$SsField;
	},
	set_ss: function(value) {
		this.$1$SsField = value;
	},
	get_hms: function() {
		return this.$1$HmsField;
	},
	set_hms: function(value) {
		this.$1$HmsField = value;
	},
	get_hmc: function() {
		return this.$1$HmcField;
	},
	set_hmc: function(value) {
		this.$1$HmcField = value;
	},
	get_tls: function() {
		return this.$1$TlsField;
	},
	set_tls: function(value) {
		this.$1$TlsField = value;
	},
	get_px: function() {
		return this.$1$PxField;
	},
	set_px: function(value) {
		this.$1$PxField = value;
	},
	get_aes: function() {
		return this.$1$AesField;
	},
	set_aes: function(value) {
		this.$1$AesField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteLoader
OurSonic.SpriteLoader = function(completed, update) {
	//
	//   var that = this;
	//
	//   this.stepIndex = 0;
	//
	//   this.steps = [];
	//
	//   this.done = false;
	//
	//   this.tickIndex = 0;
	//
	//   this.tick = function () {
	//
	//   //this.stepIndex = this.steps.length;
	//
	//   
	//
	//   if (this.stepIndex == this.steps.length) {
	//
	//   if (!this.done) {
	//
	//   this.done = true;
	//
	//   completed();
	//
	//   }
	//
	//   return true;
	//
	//   }
	//
	//   var stp = this.steps[this.stepIndex];
	//
	//   if (!stp) return true;
	//
	//   
	//
	//   if (that.tickIndex % _H.floor(stp.iterations.length / 12) == 0)
	//
	//   update("Caching: " + stp.title + " " + Math.floor(((that.tickIndex / stp.iterations.length) * 100)) + "%");
	//
	//   
	//
	//   if (stp.iterations.length > this.tickIndex) {
	//
	//   stp.method(stp.iterations[this.tickIndex++], function () {
	//
	//   if (stp.finish()) {
	//
	//   that.stepIndex++;
	//
	//   that.tickIndex = 0;
	//
	//   }
	//
	//   });
	//
	//   }
	//
	//   return false;
	//
	//   };
	//
	//   this.addStep = function (title, method, onFinish, disable) {
	//
	//   if (disable)
	//
	//   return -1;
	//
	//   this.steps.push({ title: title, method: method, finish: onFinish, iterations: [] });
	//
	//   return this.steps.length - 1;
	//
	//   };
	//
	//   this.addIterationToStep = function (stepIndex, index) {
	//
	//   if (stepIndex == -1) return;
	//
	//   this.steps[stepIndex].iterations.push(index);
	//
	//   };
};
OurSonic.SpriteLoader.prototype = {
	tick: function() {
		return false;
	},
	addStep: function(sprites, action) {
		return null;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteLoaderStep
OurSonic.SpriteLoaderStep = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager
OurSonic.UIManager = function(sonicManager, mainCanvas, scale) {
	this.$1$draggerField = null;
	this.$1$DataField = null;
};
OurSonic.UIManager.prototype = {
	onClick: function(elementEvent) {
		return false;
	},
	get_dragger: function() {
		return this.$1$draggerField;
	},
	set_dragger: function(value) {
		this.$1$draggerField = value;
	},
	get_data: function() {
		return this.$1$DataField;
	},
	set_data: function(value) {
		this.$1$DataField = value;
	},
	onMouseMove: function(elementEvent) {
		return false;
	},
	onMouseUp: function(lastMouseMove) {
	},
	onMouseScroll: function(elementEvent) {
		return false;
	},
	onKeyDown: function(jQueryEvent) {
	},
	draw: function(gameCanvas) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManagerData
OurSonic.UIManagerData = function() {
	this.$1$IndexesField = null;
	this.$1$SolidTileAreaField = null;
	this.$1$ModifyTilePieceAreaField = null;
};
OurSonic.UIManagerData.prototype = {
	get_indexes: function() {
		return this.$1$IndexesField;
	},
	set_indexes: function(value) {
		this.$1$IndexesField = value;
	},
	get_solidTileArea: function() {
		return this.$1$SolidTileAreaField;
	},
	set_solidTileArea: function(value) {
		this.$1$SolidTileAreaField = value;
	},
	get_modifyTilePieceArea: function() {
		return this.$1$ModifyTilePieceAreaField;
	},
	set_modifyTilePieceArea: function(value) {
		this.$1$ModifyTilePieceAreaField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManagerDataIndexes
OurSonic.UIManagerDataIndexes = function() {
	this.$1$TPIndexField = 0;
};
OurSonic.UIManagerDataIndexes.prototype = {
	get_tpIndex: function() {
		return this.$1$TPIndexField;
	},
	set_tpIndex: function(value) {
		this.$1$TPIndexField = value;
	}
};
OurSonic.Animation.registerClass('OurSonic.Animation', Object);
OurSonic.AnimationInstance.registerClass('OurSonic.AnimationInstance', Object);
OurSonic.CanvasInformation.registerClass('OurSonic.CanvasInformation', Object);
OurSonic.Constants.registerClass('OurSonic.Constants', Object);
OurSonic.Drawing.Tile.registerClass('OurSonic.Drawing.Tile', Object);
OurSonic.Drawing.TileChunk.registerClass('OurSonic.Drawing.TileChunk', Object);
OurSonic.Drawing.TileItem.registerClass('OurSonic.Drawing.TileItem', Object);
OurSonic.Drawing.TilePiece.registerClass('OurSonic.Drawing.TilePiece', Object);
OurSonic.Help.registerClass('OurSonic.Help', Object);
OurSonic.LoadSpriteImage.registerClass('OurSonic.LoadSpriteImage', Object);
OurSonic.ObjectManager.registerClass('OurSonic.ObjectManager', Object);
OurSonic.Page.registerClass('OurSonic.Page', Object);
OurSonic.Point.registerClass('OurSonic.Point', Object);
OurSonic.Rectangle.registerClass('OurSonic.Rectangle');
OurSonic.Ring.registerClass('OurSonic.Ring', Object);
OurSonic.Sonic.registerClass('OurSonic.Sonic', Object);
OurSonic.SonicBackground.registerClass('OurSonic.SonicBackground', Object);
OurSonic.SonicEngine.registerClass('OurSonic.SonicEngine', Object);
OurSonic.SonicLevel.registerClass('OurSonic.SonicLevel', Object);
OurSonic.SonicManager.registerClass('OurSonic.SonicManager', Object);
OurSonic.SonicObject.registerClass('OurSonic.SonicObject', Object);
OurSonic.SpriteCache.registerClass('OurSonic.SpriteCache', Object);
OurSonic.SpriteCacheIndexes.registerClass('OurSonic.SpriteCacheIndexes', Object);
OurSonic.SpriteLoader.registerClass('OurSonic.SpriteLoader', Object);
OurSonic.SpriteLoaderStep.registerClass('OurSonic.SpriteLoaderStep', Object);
OurSonic.UIManager.registerClass('OurSonic.UIManager', Object);
OurSonic.UIManagerData.registerClass('OurSonic.UIManagerData', Object);
OurSonic.UIManagerDataIndexes.registerClass('OurSonic.UIManagerDataIndexes', Object);
OurSonic.IntersectingRectangle.registerClass('OurSonic.IntersectingRectangle');
$(function(){new OurSonic.Page();});
