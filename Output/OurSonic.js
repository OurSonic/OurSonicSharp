
Type.registerNamespace('OurSonic');
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
Type.registerNamespace('OurSonic.Drawing');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.Tile
OurSonic.Drawing.Tile = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileChunk
OurSonic.Drawing.TileChunk = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileItem
OurSonic.Drawing.TileItem = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TilePiece
OurSonic.Drawing.TilePiece = function() {
};
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Help
OurSonic.Help = function() {
};
OurSonic.Help.toPx = function(number) {
	return number + 'px';
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.IntersectingRectangle
OurSonic.IntersectingRectangle = function(x, y, width, height, intersects) {
	this.$3$IntersectsField = null;
	OurSonic.Rectangle.call(this, x, y, width, height);
	this.set_intersects(intersects);
};
OurSonic.IntersectingRectangle.prototype = {
	get_intersects: function() {
		return this.$3$IntersectsField;
	},
	set_intersects: function(value) {
		this.$3$IntersectsField = value;
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
OurSonic.Point = function(x, y) {
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.set_x(x);
	this.set_y(y);
};
OurSonic.Point.prototype = {
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
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Rectangle
OurSonic.Rectangle = function(x, y, width, height) {
	this.$2$WidthField = 0;
	this.$2$HeightField = 0;
	OurSonic.Point.call(this, x, y);
	this.set_width(width);
	this.set_height(height);
};
OurSonic.Rectangle.prototype = {
	get_width: function() {
		return this.$2$WidthField;
	},
	set_width: function(value) {
		this.$2$WidthField = value;
	},
	get_height: function() {
		return this.$2$HeightField;
	},
	set_height: function(value) {
		this.$2$HeightField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Sonic
OurSonic.Sonic = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicEngine
OurSonic.SonicEngine = function() {
	this.$lastMouseMove = null;
	this.$gameCanvasName = 'gameLayer';
	this.$uiCanvasName = 'uiLayer';
	this.$gameCanvasItem = null;
	this.$gameCanvas = null;
	this.$uiCanvasItem = null;
	this.$uiCanvas = null;
	this.$canvasWidth = 0;
	this.$canvasHeight = 0;
	this.$sonicManager = null;
	this.$fullscreenMode = false;
	this.$gameCanvasItem = $(String.format('#{0}', this.$gameCanvasName));
	this.$gameCanvas = this.$gameCanvasItem[0].getContext('2d');
	this.$uiCanvasItem = $(String.format('#{0}', this.$uiCanvasName));
	this.$uiCanvas = this.$uiCanvasItem[0].getContext('2d');
	this.$canvasWidth = 0;
	this.$canvasHeight = 0;
	var element = this.$uiCanvasItem[0];
	element.addEventListener('DOMMouseScroll', Function.mkdel(this, this.$handleScroll), false);
	element.addEventListener('mousewheel', Function.mkdel(this, this.$handleScroll), false);
	element.addEventListener('touchmove', Function.mkdel(this, this.$canvasMouseMove), false);
	element.addEventListener('touchstart', Function.mkdel(this, this.$canvasOnClick), false);
	element.addEventListener('touchend', Function.mkdel(this, this.$canvasMouseUp), false);
	element.addEventListener('mousemove', Function.mkdel(this, this.$canvasMouseMove), false);
	element.addEventListener('mousedown', Function.mkdel(this, this.$canvasOnClick), false);
	element.addEventListener('mouseup', Function.mkdel(this, this.$canvasMouseUp), false);
	element.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	}, false);
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
};
OurSonic.SonicEngine.prototype = {
	$handleScroll: function(elementEvent) {
		elementEvent.preventDefault();
		this.$sonicManager.get_uiManager().onMouseScroll(elementEvent);
	},
	$canvasMouseMove: function(elementEvent) {
		elementEvent.preventDefault();
		document.body.style.cursor = 'default';
		this.$lastMouseMove = elementEvent;
		if (this.$sonicManager.get_uiManager().onMouseMove(elementEvent)) {
			return;
		}
		return;
	},
	$canvasOnClick: function(elementEvent) {
		elementEvent.preventDefault();
		if (this.$sonicManager.get_uiManager().onClick(elementEvent)) {
			return;
		}
		if (this.$sonicManager.onClick(elementEvent)) {
			return;
		}
		this.$sonicManager.get_uiManager().get_dragger().click();
	},
	$canvasMouseUp: function(elementEvent) {
		elementEvent.preventDefault();
		this.$sonicManager.get_uiManager().onMouseUp(this.$lastMouseMove);
	},
	resizeCanvas: function() {
		this.$canvasWidth = $(window).width();
		this.$canvasHeight = $(window).height();
		this.$sonicManager.set_windowLocation(OurSonic.Constants.defaultWindowLocation((ss.isNullOrUndefined(this.$sonicManager.get_sonicToon()) ? 1 : 0), this.$uiCanvas, this.$sonicManager.get_scale()));
		this.$sonicManager.set_realScale((!this.$fullscreenMode ? new OurSonic.Point(1, 1) : new OurSonic.Point(ss.Int32.div(ss.Int32.div(this.$canvasWidth, 320), this.$sonicManager.get_scale().get_x()), ss.Int32.div(ss.Int32.div(this.$canvasHeight, 224), this.$sonicManager.get_scale().get_y()))));
		this.$gameCanvasItem.attr('width', OurSonic.Help.toPx(this.$sonicManager.get_windowLocation().get_width() * (ss.isValue(this.$sonicManager.get_sonicToon()) ? (this.$sonicManager.get_scale().get_x() * this.$sonicManager.get_realScale().get_x()) : 1)));
		this.$gameCanvasItem.attr('height', OurSonic.Help.toPx(this.$sonicManager.get_windowLocation().get_height() * (ss.isValue(this.$sonicManager.get_sonicToon()) ? (this.$sonicManager.get_scale().get_y() * this.$sonicManager.get_realScale().get_y()) : 1)));
		this.$uiCanvasItem.attr('width', OurSonic.Help.toPx(this.$canvasWidth));
		this.$uiCanvasItem.attr('height', OurSonic.Help.toPx(this.$canvasHeight));
		//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
		//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));
		var screenOffset = (ss.isValue(this.$sonicManager.get_sonicToon()) ? new OurSonic.Point(ss.Int32.div(this.$canvasWidth, 2) - ss.Int32.div(this.$sonicManager.get_windowLocation().get_width() * this.$sonicManager.get_scale().get_x() * this.$sonicManager.get_realScale().get_x(), 2), ss.Int32.div(this.$canvasHeight, 2) - ss.Int32.div(this.$sonicManager.get_windowLocation().get_height() * this.$sonicManager.get_scale().get_y() * this.$sonicManager.get_realScale().get_y(), 2)) : new OurSonic.Point(0, 0));
		this.$gameCanvasItem.css('left', OurSonic.Help.toPx(screenOffset.get_x()));
		this.$gameCanvasItem.css('top', OurSonic.Help.toPx(screenOffset.get_y()));
		window.addEventListener('onresize', Function.mkdel(this, function(e) {
			this.resizeCanvas();
		}));
		$(document).resize(Function.mkdel(this, function(e1) {
			this.resizeCanvas();
		}));
		this.$sonicManager = new OurSonic.SonicManager(this.$gameCanvas, Function.mkdel(this, this.resizeCanvas));
		this.$sonicManager.set_indexedPalette(0);
		window.setInterval(Function.mkdel(this, function() {
			this.gameDraw();
		}), 16);
		window.setInterval(Function.mkdel(this, function() {
			this.uiDraw();
		}), 50);
		this.resizeCanvas();
	},
	clear: function() {
		this.$gameCanvasItem.width(this.$gameCanvasItem.width());
	},
	gameDraw: function() {
		if (!this.$sonicManager.get_inHaltMode()) {
			this.clear();
		}
		this.$sonicManager.draw(this.$gameCanvas);
	},
	uiDraw: function() {
		if (!this.$sonicManager.get_inHaltMode()) {
			this.clear();
		}
		this.$sonicManager.get_uiManager().draw(this.$gameCanvas);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicManager
OurSonic.SonicManager = function(gameCanvas, resizeCanvas) {
	this.$1$UIManagerField = null;
	this.$1$SonicToonField = null;
	this.$1$ScaleField = null;
	this.$1$WindowLocationField = null;
	this.$1$RealScaleField = null;
	this.$1$InHaltModeField = false;
	this.$1$IndexedPaletteField = 0;
};
OurSonic.SonicManager.prototype = {
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
	onClick: function(elementEvent) {
		return false;
	},
	draw: function(gameCanvas) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager
OurSonic.UIManager = function() {
	this.$1$draggerField = null;
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
OurSonic.Constants.registerClass('OurSonic.Constants', Object);
OurSonic.Drawing.Tile.registerClass('OurSonic.Drawing.Tile', Object);
OurSonic.Drawing.TileChunk.registerClass('OurSonic.Drawing.TileChunk', Object);
OurSonic.Drawing.TileItem.registerClass('OurSonic.Drawing.TileItem', Object);
OurSonic.Drawing.TilePiece.registerClass('OurSonic.Drawing.TilePiece', Object);
OurSonic.Help.registerClass('OurSonic.Help', Object);
OurSonic.Page.registerClass('OurSonic.Page', Object);
OurSonic.Point.registerClass('OurSonic.Point', Object);
OurSonic.Rectangle.registerClass('OurSonic.Rectangle', OurSonic.Point);
OurSonic.Sonic.registerClass('OurSonic.Sonic', Object);
OurSonic.SonicEngine.registerClass('OurSonic.SonicEngine', Object);
OurSonic.SonicManager.registerClass('OurSonic.SonicManager', Object);
OurSonic.UIManager.registerClass('OurSonic.UIManager', Object);
OurSonic.IntersectingRectangle.registerClass('OurSonic.IntersectingRectangle', OurSonic.Rectangle);
new OurSonic.Page();
