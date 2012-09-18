
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
// OurSonic.Color
OurSonic.Color = function(r, g, b) {
	this.$1$RField = 0;
	this.$1$GField = 0;
	this.$1$BField = 0;
	this.set_r(r);
	this.set_g(g);
	this.set_b(b);
};
OurSonic.Color.prototype = {
	get_r: function() {
		return this.$1$RField;
	},
	set_r: function(value) {
		this.$1$RField = value;
	},
	get_g: function() {
		return this.$1$GField;
	},
	set_g: function(value) {
		this.$1$GField = value;
	},
	get_b: function() {
		return this.$1$BField;
	},
	set_b: function(value) {
		this.$1$BField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Constants
OurSonic.Constants = function() {
};
OurSonic.Constants.defaultWindowLocation = function(state, canvas, scale) {
	switch (state) {
		case 0: {
			return OurSonic.IntersectingRectangle.$ctor(0, 0, 320, 224);
		}
		case 1: {
			var x = 0;
			var y = 0;
			if (ss.isValue(OurSonic.SonicManager.instance.sonicLevel) && ss.isValue(OurSonic.SonicManager.instance.sonicLevel.startPositions) && ss.isValue(OurSonic.SonicManager.instance.sonicLevel.startPositions[0])) {
				x = OurSonic.SonicManager.instance.sonicLevel.startPositions[0].x - 256;
				y = OurSonic.SonicManager.instance.sonicLevel.startPositions[0].y - 256;
			}
			return OurSonic.IntersectingRectangle.$ctor(x, y, canvas.domCanvas.width(), canvas.domCanvas.height());
		}
	}
	return null;
};
Type.registerNamespace('OurSonic.Drawing');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.RotationMode
OurSonic.Drawing.RotationMode = function() {
};
OurSonic.Drawing.RotationMode.prototype = { floor: 134, rightWall: 224, ceiling: 314, leftWall: 44 };
OurSonic.Drawing.RotationMode.registerEnum('OurSonic.Drawing.RotationMode', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.Tile
OurSonic.Drawing.Tile = function(colors) {
	this.$index = null;
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
	this.colors = colors;
	this.sprites = [];
	this.curPaletteIndexes = null;
};
OurSonic.Drawing.Tile.prototype = {
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
		var oPos = { x: 0, y: 0 };
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
				var m = palette_[(palette + indexed) % palette_.length][gj];
				if (!ss.referenceEquals(j.context.fillStyle, '#' + m)) {
					j.context.fillStyle = '#' + m;
				}
				j.context.fillRect(oPos.x + i * scale.x, oPos.y + jf * scale.y, scale.x, scale.y);
			}
		}
		var fd = j.domCanvas;
		canvas.drawImage(fd[0], pos.x, pos.y);
		if (this.showOutline) {
			canvas.strokeStyle = '#DD0033';
			canvas.lineWidth = 3;
			canvas.strokeRect(pos.x, pos.y, 8 * scale.x, 8 * scale.y);
		}
	},
	$checkGood: function(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame) {
		var index_ = this.$index;
		if (!!(index_ && index_[0] !== 'A')) {
			if (ss.isNullOrUndefined(this.$willAnimate)) {
				return false;
			}
			var an = this.$willAnimate;
			var anin = an.animationTileIndex;
			var ind = animationFrame;
			var frame = an.frames[ind];
			if (ss.isNullOrUndefined(frame)) {
				frame = an.frames[0];
			}
			var file = OurSonic.SonicManager.instance.sonicLevel.animatedFiles[an.animationFile];
			var va = file[ss.Nullable.unbox(Type.cast(frame.startingTileIndex + (index_ - anin), ss.Int32))];
			if (ss.isValue(va)) {
				if (canvas.fillStyle !== 'rbga(255,255,255,255)') {
					canvas.fillStyle = 'rbga(255,255,255,255)';
				}
				//   va.Draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
				return true;
			}
			return false;
		}
		for (var i = 0; i < OurSonic.SonicManager.instance.sonicLevel.get_Animations().length; i++) {
			var an1 = OurSonic.SonicManager.instance.sonicLevel.get_Animations()[i];
			var anin1 = an1.animationTileIndex;
			var num = an1.numberOfTiles;
			if (!!(index_ > anin1 && index_ < anin1 + num)) {
				this.$willAnimate = an1;
				var ind1 = animationFrame;
				var frame1 = an1.frames[ind1];
				if (ss.isNullOrUndefined(frame1)) {
					frame1 = an1.frames[0];
				}
				var file1 = OurSonic.SonicManager.instance.sonicLevel.animatedFiles[an1.animationFile];
				var va1 = file1[ss.Nullable.unbox(Type.cast(frame1.startingTileIndex + (index_ - anin1), ss.Int32))];
				if (ss.isValue(va1)) {
					if (canvas.fillStyle !== 'rbga(255,255,255,255)') {
						canvas.fillStyle = 'rbga(255,255,255,255)';
					}
					// va.Draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
					return true;
				}
			}
		}
		this.$willAnimate = null;
		return false;
		// 
		//
		//                                                }
		// 
		//
		//                                                }
		// 
		//
		//                                                this.willAnimate = false;
		// 
		//
		//                                                }
		// 
		//
		//                                                return false;#1#
	},
	$changeColor: function(x, y, color) {
		this.colors[x][y] = color;
		this.sprites = [];
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileChunk
OurSonic.Drawing.TileChunk = function() {
	this.isOnlyBackground = null;
	this.empty = null;
	this.sprites = null;
	this.hLayers = null;
	this.tilePieces = null;
	this.animated = null;
	this.index = 0;
	this.hLayers = [];
	this.sprites = [];
	this.isOnlyBackground = null;
};
OurSonic.Drawing.TileChunk.prototype = {
	getBlock: function(x, y) {
		return OurSonic.SonicManager.instance.sonicLevel.blocks[this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)].block];
	},
	getTilePiece: function(x, y) {
		return this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)];
	},
	onlyBackground: function() {
		if (ss.Nullable.eq(this.isOnlyBackground, null)) {
			var blocks = OurSonic.SonicManager.instance.sonicLevel.blocks;
			var tpl = this.tilePieces.length;
			var tph = this.tilePieces[0].length;
			for (var i = 0; i < tpl; i++) {
				for (var j = 0; j < tph; j++) {
					var r = this.tilePieces[i][j];
					var pm = blocks[r.block];
					if (ss.isValue(pm)) {
						if (!pm.onlyBackground()) {
							return ss.Nullable.unbox(this.isOnlyBackground = false);
						}
					}
				}
			}
			this.isOnlyBackground = true;
		}
		return ss.Nullable.unbox(this.isOnlyBackground);
	},
	isEmpty: function() {
		if (ss.Nullable.eq(this.empty, null)) {
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
		var localPoint = { x: 0, y: 0 };
		var check = false;
		//var RectB = new Rectangle(position.X, position.Y, len1 * lX, len2 * lY);
		//var RectA = bounds;
		//if (RectA.X < RectB.X+RectB.Width && RectA.X+RectA.Width > RectB.X+RectB.Width &&
		//RectA.Y < RectB.Y + RectB.Height && RectA.Y + RectA.Height > RectB.Y + RectB.Height) {
		//check = true;
		//}
		//
		//
		//        localPoint.X = position.X;
		//
		//
		//        localPoint.Y = position.Y;
		//
		//
		//        if (bounds.Intersects(localPoint)) {
		//
		//
		//        localPoint.X = position.X+len1*lX;
		//
		//
		//        localPoint.Y = position.Y;
		//
		//
		//        if (bounds.Intersects(localPoint))
		//
		//
		//        {
		//
		//
		//        localPoint.X = position.X;
		//
		//
		//        localPoint.Y = position.Y + len2 * lY;
		//
		//
		//        if (bounds.Intersects(localPoint))
		//
		//
		//        {
		//
		//
		//        localPoint.X = position.X + len1 * lX;
		//
		//
		//        localPoint.Y = position.Y + len2 * lY;
		//
		//
		//        if (bounds.Intersects(localPoint)) {
		//
		//
		//        check = false;
		//
		//
		//        }
		//
		//
		//        }
		//
		//
		//        }
		//
		//
		//        }
		var blocks = OurSonic.SonicManager.instance.sonicLevel.blocks;
		for (var i = 0; i < len1; i++) {
			for (var j = 0; j < len2; j++) {
				var r = this.tilePieces[i][j];
				var pm = blocks[r.block];
				if (!!pm) {
					var animatedIndex = 0;
					if (!!(this.animated && this.animated[j * len1 + i])) {
						animatedIndex = this.animated[j * len1 + i].lastAnimatedIndex;
					}
					localPoint.x = position.x + i * lX;
					localPoint.y = position.y + j * lY;
					if (check && !OurSonic.IntersectingRectangle.intersects(bounds, localPoint)) {
						continue;
					}
					pm.draw(canvas, localPoint, scale, layer, r.xFlip, r.yFlip, animatedIndex);
					//canvas.StrokeStyle = "#FFF";
					//canvas.StrokeRect(position.X + i * 16 * scale.X, position.Y + j * 16 * scale.Y, scale.X * 16, scale.Y * 16);
				}
			}
		}
		canvas.restore();
	},
	animatedTick: function() {
		var $t1 = this.animated.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var anni = $t1.get_current();
				if (ss.Nullable.eq(anni.lastAnimatedFrame, null)) {
					anni.lastAnimatedFrame = 0;
					anni.lastAnimatedIndex = 0;
					if (anni.frames[anni.lastAnimatedIndex].ticks === 0 || ss.Nullable.ge(ss.Nullable.sub(OurSonic.SonicManager.instance.drawTickCount, anni.lastAnimatedFrame), ((anni.automatedTiming > 0) ? anni.automatedTiming : anni.frames[anni.lastAnimatedIndex].ticks))) {
						anni.lastAnimatedFrame = OurSonic.SonicManager.instance.drawTickCount;
						anni.lastAnimatedIndex = (anni.lastAnimatedIndex + 1) % anni.frames.length;
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileItem
OurSonic.Drawing.TileItem = function() {
	this._Tile = 0;
	this.priority = false;
	this.xFlip = false;
	this.yFlip = false;
	this.palette = 0;
	this.index = 0;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TilePiece
OurSonic.Drawing.TilePiece = function() {
	this.$cx = 0;
	this.$cy = 0;
	this.$drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
	this.$drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
	this.image = null;
	this.heightMask = null;
	this.tiles = null;
	this.block = 0;
	this.xFlip = false;
	this.yFlip = false;
	this.animatedFrames = null;
	this.animationFrame = 0;
	this.index = 0;
	this.$cx = 8 * OurSonic.SonicManager.instance.scale.x * 2;
	this.$cy = 8 * OurSonic.SonicManager.instance.scale.y * 2;
	this.image = {};
};
OurSonic.Drawing.TilePiece.prototype = {
	onlyBackground: function() {
		var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
		var $t1 = this.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var mj = $t1.get_current();
				if (ss.isValue(tiles[mj._Tile])) {
					if (mj.priority) {
						return false;
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return true;
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
		var fd = this.$getCache(layer, scale, drawOrderIndex, this.animationFrame, OurSonic.SonicManager.instance.sonicLevel.palAn);
		if (ss.isNullOrUndefined(fd)) {
			var ac = OurSonic.Help.defaultCanvas(this.$cx, this.$cy);
			var sX = 8 * scale.x;
			var sY = 8 * scale.y;
			var i = 0;
			var localPoint = { x: 0, y: 0 };
			var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
			var $t1 = this.tiles.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var mj = $t1.get_current();
					if (ss.isValue(tiles[mj._Tile])) {
						if (mj.priority === (layer === 1)) {
							var _xf = xFlip ^ mj.xFlip;
							var _yf = yFlip ^ mj.yFlip;
							var df = this.$drawInfo[this.$drawOrder[drawOrderIndex][i]];
							localPoint.x = df[0] * sX;
							localPoint.y = df[1] * sY;
							tiles[mj._Tile].draw(ac.context, localPoint, scale, _xf, _yf, mj.palette, layer, this.animationFrame);
						}
					}
					i++;
				}
			}
			finally {
				$t1.dispose();
			}
			fd = ac.domCanvas[0];
			this.$setCache(layer, scale, drawOrderIndex, this.animationFrame, OurSonic.SonicManager.instance.sonicLevel.palAn, fd);
		}
		this.$drawIt(canvas, fd, position);
		return true;
	},
	$setCache: function(layer, scale, drawOrder, animationFrame, palAn, image) {
		var val = drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000;
		if (!!this.animatedFrames) {
			var $t1 = this.animatedFrames.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var animatedFrame = $t1.get_current();
					val += palAn[animatedFrame] + ' ';
				}
			}
			finally {
				$t1.dispose();
			}
		}
		this.image[val] = image;
	},
	$drawIt: function(canvas, fd, position) {
		canvas.drawImage(fd, position.x, position.y);
	},
	$getCache: function(layer, scale, drawOrder, animationFrame, palAn) {
		var val = drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000;
		if (!!this.animatedFrames) {
			var $t1 = this.animatedFrames.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var animatedFrame = $t1.get_current();
					val += palAn[animatedFrame] + ' ';
				}
			}
			finally {
				$t1.dispose();
			}
		}
		if (!!!this.image[val]) {
			return null;
		}
		return this.image[val];
	}
};
Type.registerNamespace('OurSonic');
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
OurSonic.HeightMask = function(heightMap) {
};
OurSonic.HeightMask.op_Implicit = function(d) {
	var m = ((d === 0) ? 0 : 16);
	return new OurSonic.HeightMask([m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m]);
	//16 m's
};
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
	var data = OurSonic.Help.getImageData(image);
	var colors = [];
	for (var f = 0; f < data.length; f++) {
		colors.add(OurSonic.Help.$colorObjectFromData(data, f));
	}
	var d = OurSonic.Help.defaultCanvas(0, 0).context.createImageData(image.width * scale.x, image.height * scale.y);
	OurSonic.Help.$setDataFromColors(d.data, colors, scale, image.width, new OurSonic.Color(0, 0, 0));
	return OurSonic.Help.loadSprite(OurSonic.Help.$getBase64Image(d), complete);
};
OurSonic.Help.$setDataFromColors = function(data, colors, scale, width, transparent) {
	for (var i = 0; i < colors.length; i++) {
		var curX = i % width;
		var curY = ss.Int32.div(i, width);
		var g = colors[i];
		var isTrans = false;
		if (ss.isValue(transparent)) {
			if (g.get_r() === transparent.get_r() && g.get_g() === transparent.get_g() && g.get_b() === transparent.get_b()) {
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
				data[c] = g.get_r();
				data[c + 1] = g.get_g();
				data[c + 2] = g.get_b();
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
	return new OurSonic.Color(r, g, b);
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
OurSonic.Help.scaleCsSImage = function(image, scale, complete) {
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
OurSonic.Help.loadSprite = function(src, complete) {
	var sprite1 = new Image();
	sprite1.addEventListener('onload', function(e) {
		sprite1.loaded = true;
		if (ss.isValue(complete)) {
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
////////////////////////////////////////////////////////////////////////////////
// OurSonic.IntersectingRectangle
OurSonic.IntersectingRectangle = function() {
};
OurSonic.IntersectingRectangle.intersects = function($this, p) {
	return $this.x < p.x && $this.x + $this.width > p.x && $this.y < p.y && $this.y + $this.height > p.y;
};
OurSonic.IntersectingRectangle.$ctor = function(x, y, width, height) {
	var $this = {};
	$this.width = 0;
	$this.height = 0;
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	$this.width = width;
	$this.height = height;
	return $this;
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
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Rectangle
OurSonic.Rectangle = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Ring
OurSonic.Ring = function(active) {
	this.tickCount = 0;
	this.x = 0;
	this.y = 0;
};
OurSonic.Ring.prototype = {
	draw: function(canvas, point, scale) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Sonic
OurSonic.Sonic = function() {
	this.ticking = false;
	this.x = 0;
	this.y = 0;
};
OurSonic.Sonic.prototype = {
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
	this.width = 0;
	this.height = 0;
};
OurSonic.SonicBackground.prototype = {
	draw: function(canvas, point, scale, wOffset) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicEngine
OurSonic.SonicEngine = function() {
	this.canvasHeight = 0;
	this.canvasWidth = 0;
	this.$fullscreenMode = false;
	this.$gameCanvas = null;
	this.$gameCanvasName = 'gameLayer';
	this.$lastMouseMove = null;
	this.$sonicManager = null;
	this.$uiCanvas = null;
	this.$uiCanvasName = 'uiLayer';
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
		if (ss.isNullOrUndefined(this.$sonicManager.sonicToon)) {
			this.$sonicManager.uiManager.onKeyDown(e1);
		}
	}));
	$(document).keydown(Function.mkdel(this, function(a) {
		if (!!ss.referenceEquals(a.keyCode, 37)) {
			this.$sonicManager.windowLocation.x -= 128;
			this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.y;
		}
		if (!!ss.referenceEquals(a.keyCode, 38)) {
			this.$sonicManager.windowLocation.y -= 128;
			this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
		}
		if (!!ss.referenceEquals(a.keyCode, 39)) {
			this.$sonicManager.windowLocation.x += 128;
			this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.y;
		}
		if (!!ss.referenceEquals(a.keyCode, 40)) {
			this.$sonicManager.windowLocation.y += 128;
			this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
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
	this.$sonicManager.indexedPalette = 0;
	window.setInterval(Function.mkdel(this, this.gameDraw), 16);
	window.setInterval(Function.mkdel(this, this.uiDraw), 50);
	this.resizeCanvas();
};
OurSonic.SonicEngine.prototype = {
	$handleScroll: function(jQueryEvent) {
		jQueryEvent.preventDefault();
		this.$sonicManager.uiManager.onMouseScroll(jQueryEvent);
	},
	$canvasMouseMove: function(queryEvent) {
		queryEvent.preventDefault();
		document.body.style.cursor = 'default';
		this.$lastMouseMove = queryEvent;
		if (this.$sonicManager.uiManager.onMouseMove(queryEvent)) {
			return;
		}
		return;
	},
	$canvasOnClick: function(queryEvent) {
		queryEvent.preventDefault();
		if (this.$sonicManager.uiManager.onClick(queryEvent)) {
			return;
		}
		if (this.$sonicManager.onClick(queryEvent)) {
			return;
		}
		this.$sonicManager.uiManager.dragger.click();
	},
	$canvasMouseUp: function(queryEvent) {
		queryEvent.preventDefault();
		this.$sonicManager.uiManager.onMouseUp(this.$lastMouseMove);
	},
	resizeCanvas: function() {
		this.canvasWidth = $(window).width();
		this.canvasHeight = $(window).height();
		this.$uiCanvas.domCanvas.attr('width', this.canvasWidth.toString());
		this.$uiCanvas.domCanvas.attr('height', this.canvasHeight.toString());
		this.$sonicManager.windowLocation = OurSonic.Constants.defaultWindowLocation(this.$sonicManager.currentGameState, this.$uiCanvas, this.$sonicManager.scale);
		this.$sonicManager.realScale = (!this.$fullscreenMode ? { x: 1, y: 1 } : { x: ss.Int32.div(ss.Int32.div(this.canvasWidth, 320), this.$sonicManager.scale.x), y: ss.Int32.div(ss.Int32.div(this.canvasHeight, 224), this.$sonicManager.scale.y) });
		this.$gameCanvas.domCanvas.attr('width', (this.$sonicManager.windowLocation.width * (ss.isValue(this.$sonicManager.sonicToon) ? (this.$sonicManager.scale.x * this.$sonicManager.realScale.x) : 1)).toString());
		this.$gameCanvas.domCanvas.attr('height', (this.$sonicManager.windowLocation.height * (ss.isValue(this.$sonicManager.sonicToon) ? (this.$sonicManager.scale.y * this.$sonicManager.realScale.y) : 1)).toString());
		//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
		//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));
		var screenOffset = (ss.isValue(this.$sonicManager.sonicToon) ? { x: ss.Int32.div(this.canvasWidth, 2) - ss.Int32.div(this.$sonicManager.windowLocation.width * this.$sonicManager.scale.x * this.$sonicManager.realScale.x, 2), y: ss.Int32.div(this.canvasHeight, 2) - ss.Int32.div(this.$sonicManager.windowLocation.height * this.$sonicManager.scale.y * this.$sonicManager.realScale.y, 2) } : { x: 0, y: 0 });
		this.$gameCanvas.domCanvas.css('left', OurSonic.Help.toPx(screenOffset.x));
		this.$gameCanvas.domCanvas.css('top', OurSonic.Help.toPx(screenOffset.y));
	},
	clear: function(canv) {
		canv.domCanvas[0].width = this.$gameCanvas.domCanvas.width();
	},
	gameDraw: function() {
		if (!this.$sonicManager.inHaltMode) {
			this.clear(this.$gameCanvas);
		}
		this.$sonicManager.draw(this.$gameCanvas.context);
	},
	uiDraw: function() {
		if (!this.$sonicManager.inHaltMode) {
			this.clear(this.$uiCanvas);
		}
		this.$sonicManager.uiManager.draw(this.$uiCanvas.context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicLevel
OurSonic.SonicLevel = function() {
	this.$1$AnimationsField = null;
	this.animatedFiles = null;
	this.chunkMap = null;
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
	this.rings = {};
	this.curHeightMap = true;
	this.levelWidth = 0;
	this.levelHeight = 0;
};
OurSonic.SonicLevel.prototype = {
	get_Animations: function() {
		return this.$1$AnimationsField;
	},
	set_Animations: function(value) {
		this.$1$AnimationsField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicManager
OurSonic.SonicManager = function(engine, gameCanvas, resize) {
	this.$mainCanvas = null;
	this.$myEngine = null;
	this.$objectManager = null;
	this.drawTickCount = 0;
	this.$imageLength = 0;
	this.$myStatus = null;
	this.$sonicSprites = null;
	this.$tickCount = 0;
	this.$waitingForDrawContinue = false;
	this.$waitingForTickContinue = false;
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
	OurSonic.SonicManager.instance = this;
	this.$myEngine = engine;
	this.$myEngine.canvasWidth = $(window).width();
	this.$myEngine.canvasHeight = $(window).height();
	gameCanvas.domCanvas[0].setAttribute('width', this.$myEngine.canvasWidth);
	gameCanvas.domCanvas[0].setAttribute('height', this.$myEngine.canvasHeight);
	$.getJSON('Content/sprites/sonic.js', Function.mkdel(this, function(data) {
		this.$sonicSprites = data;
	}));
	this.$objectManager = new OurSonic.ObjectManager(this);
	this.$objectManager.init();
	var scl = 2;
	this.scale = { x: scl, y: scl };
	this.realScale = { x: 1, y: 1 };
	this.$mainCanvas = gameCanvas;
	this.windowLocation = OurSonic.Constants.defaultWindowLocation(1, this.$mainCanvas, this.scale);
	this.bigWindowLocation = OurSonic.Constants.defaultWindowLocation(1, this.$mainCanvas, this.scale);
	this.bigWindowLocation.width = ss.Int32.trunc(this.bigWindowLocation.width * 1.8);
	this.bigWindowLocation.height = ss.Int32.trunc(this.bigWindowLocation.height * 1.8);
	this.animations = [];
	this.animationInstances = [];
	//jQuery.GetJson("Content/sprites/explosion.js", data => Animations.Add(new Animation("explosion", data)));
	this.showHeightMap = false;
	this.goodRing = new OurSonic.Ring(false);
	this.activeRings = [];
	this.forceResize = resize;
	this.background = null;
	this.currentGameState = 1;
	this.screenOffset = { x: ss.Int32.div(this.$mainCanvas.domCanvas.width(), 2) - ss.Int32.div(this.windowLocation.width * this.scale.x, 2), y: ss.Int32.div(this.$mainCanvas.domCanvas.height(), 2) - ss.Int32.div(this.windowLocation.height * this.scale.y, 2) };
	this.uiManager = new OurSonic.UIManager(this, this.$mainCanvas, this.scale);
	//UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));
	this.clickState = 0;
	this.$tickCount = 0;
	this.drawTickCount = 0;
	this.inHaltMode = false;
	this.$waitingForTickContinue = false;
	this.$waitingForDrawContinue = false;
	this.sonicLevel = new OurSonic.SonicLevel();
};
OurSonic.SonicManager.prototype = {
	get_status: function() {
		return this.$myStatus;
	},
	set_status: function(value) {
		this.uiManager.updateTitle(value);
		this.$myStatus = value;
	},
	onClick: function(elementEvent) {
		var e = { x: ss.Int32.div(ss.Int32.div(ss.Int32.div(elementEvent.clientX, this.scale.x), this.realScale.x), this.windowLocation.x), y: ss.Int32.div(ss.Int32.div(elementEvent.clientY, this.scale.y), this.realScale.y) + this.windowLocation.y };
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
					if (ss.isValue(tp)) {
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
		var localPoint = { x: 0, y: 0 };
		this.inFocusObjects = [];
		var $t1 = this.sonicLevel.objects.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var obj = $t1.get_current();
				localPoint.x = obj.x;
				localPoint.y = obj.y;
				if (OurSonic.IntersectingRectangle.intersects(this.bigWindowLocation, localPoint)) {
					this.inFocusObjects.add(obj);
					obj.tick(obj, this.sonicLevel, this.sonicToon);
				}
			}
		}
		finally {
			$t1.dispose();
		}
		//sonicManager.uiManager.liveObjectsArea.populate(sonicManager.inFocusObjects);TODO:::
		var $t2 = this.animationInstances.getEnumerator();
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
		if (this.loading) {
			return;
		}
		if (this.currentGameState === 0) {
			if (this.inHaltMode) {
				if (this.$waitingForTickContinue) {
					return;
				}
			}
			this.$tickCount++;
			this.$tickObjects();
			this.sonicToon.ticking = true;
			try {
				this.sonicToon.tick(this.sonicLevel, this.scale);
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
				this.sonicToon.ticking = false;
			}
			if (this.inHaltMode) {
				if (this.$waitingForTickContinue) {
					return;
				}
				this.$waitingForTickContinue = true;
				this.$waitingForDrawContinue = false;
			}
			if (this.sonicToon.x > 128 * this.sonicLevel.levelWidth) {
				this.sonicToon.x = 0;
			}
		}
	},
	preloadSprites: function(scale, completed, update) {
		this.spriteCache = new OurSonic.SpriteCache();
		var ci = this.spriteCache.rings;
		var inj = 0;
		var spriteLocations = [];
		for (var j = 0; j < 4; j++) {
			spriteLocations.add(String.format('assets/Sprites/ring{0}.png', j));
			this.$imageLength++;
		}
		var md = 0;
		var ind_ = this.spriteCache.indexes;
		this.spriteLoader = new OurSonic.SpriteLoader(completed, update);
		var spriteStep = this.spriteLoader.addStep('Sprites', function(i, done) {
			var sp = i * 200;
			ci[sp] = OurSonic.Help.loadSprite(spriteLocations[i], function(jd) {
				ci[ss.Nullable.unbox(Type.cast(jd.Tag * 200 + scale.x * 100 + scale.y, ss.Int32))] = OurSonic.Help.scaleSprite(jd, scale, function(jc) {
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
		//                    sonicManager.DrawTickCount = 0;
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
		if (this.inHaltMode) {
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
		var localPoint = { x: 0, y: 0 };
		this.drawTickCount++;
		if (false && (ss.isValue(this.spriteLoader) && !this.spriteLoader.tick() || this.loading)) {
			canvas.fillStyle = 'white';
			canvas.fillText('Loading...   ', 95, 95);
			canvas.restore();
			return;
		}
		this.screenOffset.x = 0;
		this.screenOffset.y = 0;
		if (this.currentGameState === 0) {
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
			this.windowLocation.x = ss.Int32.div(this.sonicToon.x * this.windowLocation.width, 2);
			this.windowLocation.y = ss.Int32.div(this.sonicToon.y * this.windowLocation.height, 2);
			this.bigWindowLocation.x = ss.Int32.div(this.sonicToon.x * this.bigWindowLocation.width, 2);
			this.bigWindowLocation.y = ss.Int32.div(this.sonicToon.y * this.bigWindowLocation.height, 2);
			if (ss.isValue(this.background)) {
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
		}
		if (this.windowLocation.x < 0) {
			this.windowLocation.x = 0;
		}
		if (this.windowLocation.x > 128 * this.sonicLevel.levelWidth - this.windowLocation.width) {
			this.windowLocation.x = 128 * this.sonicLevel.levelWidth - this.windowLocation.width;
		}
		var offs = [];
		var w1 = ss.Int32.div(this.windowLocation.width, 128);
		var h1 = ss.Int32.div(this.windowLocation.height, 128);
		for (var i = -1; i < w1; i++) {
			for (var j = -1; j < h1; j++) {
				offs.add({ x: i, y: j });
			}
		}
		var bounds = OurSonic.IntersectingRectangle.$ctor(-32, -32, this.windowLocation.width * this.scale.x + 32, this.windowLocation.height * this.scale.y + 32);
		if (ss.isValue(this.sonicLevel.chunks) && this.sonicLevel.chunks.length > 0) {
			if (ss.isValue(this.sonicLevel.paletteItems[0])) {
				for (var k = 0; k < this.sonicLevel.paletteItems[0].length; k++) {
					var pal = this.sonicLevel.paletteItems[0][k];
					for (var j1 = 0; j1 < pal.totalLength; j1 += pal.skipIndex) {
						if (this.drawTickCount % (pal.totalLength + pal.skipIndex) === j1) {
							this.sonicLevel.palAn[k] = ss.Int32.div(j1, pal.skipIndex);
						}
					}
					for (var m = 0; m < pal.pieces.length; m++) {
						var mj = pal.pieces[m];
						this.sonicLevel.palette[mj.paletteIndex][ss.Int32.div(mj.paletteOffset, 2)] = pal.palette[this.sonicLevel.palAn[k] * (pal.pieces.length * 2) + 0 + mj.paletteMultiply];
						this.sonicLevel.palette[mj.paletteIndex][ss.Int32.div(mj.paletteOffset, 2) + 1] = pal.palette[this.sonicLevel.palAn[k] * (pal.pieces.length * 2) + 1 + mj.paletteMultiply];
					}
				}
			}
			var fxP = ss.Int32.div(this.windowLocation.x + 128, 128);
			var fyP = ss.Int32.div(this.windowLocation.y + 128, 128);
			var $t1 = offs.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var off = $t1.get_current();
					var _xP = fxP + off.x;
					var _yP = fyP + off.y;
					var _yPreal = fyP + off.y;
					if (_xP < 0 || _xP >= this.sonicLevel.levelWidth) {
						continue;
					}
					_yP = OurSonic.Help.mod(_yP, this.sonicLevel.levelHeight);
					var ind = this.sonicLevel.chunkMap[_xP][_yP];
					var chunk = this.sonicLevel.chunks[ind];
					var anni = this.sonicLevel.chunks[ind];
					if (false && ss.isValue(anni)) {
						anni.animatedTick();
					}
					if (ss.isNullOrUndefined(chunk)) {
						continue;
					}
					localPoint.x = _xP * 128 * this.scale.x - this.windowLocation.x * this.scale.x;
					localPoint.y = _yPreal * 128 * this.scale.y - this.windowLocation.y * this.scale.y;
					if (!chunk.isEmpty()) {
						chunk.draw(canvas, localPoint, this.scale, 0, bounds);
					}
					if (false && this.currentGameState === 1) {
						canvas.strokeStyle = '#DD0033';
						canvas.lineWidth = 3;
						canvas.strokeRect(localPoint.x, localPoint.y, 128 * this.scale.x, 128 * this.scale.y);
					}
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = Object.getObjectEnumerator(this.sonicLevel.rings);
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
			var $t3 = this.sonicLevel.objects.getEnumerator();
			try {
				while ($t3.moveNext()) {
					var o = $t3.get_current();
					localPoint.x = o.x;
					localPoint.y = o.y;
					if (o.dead || OurSonic.IntersectingRectangle.intersects(this.bigWindowLocation, localPoint)) {
						o.draw(canvas, (o.x - this.windowLocation.x) * this.scale.x, (o.y - this.windowLocation.y) * this.scale.y, this.scale, this.showHeightMap);
					}
				}
			}
			finally {
				$t3.dispose();
			}
			var $t4 = this.animationInstances.getEnumerator();
			try {
				while ($t4.moveNext()) {
					var ano = $t4.get_current();
					ano.draw(canvas, -this.windowLocation.x, -this.windowLocation.y, this.scale);
				}
			}
			finally {
				$t4.dispose();
			}
			for (var i1 = this.activeRings.length - 1; i1 >= 0; i1--) {
				var ac = this.activeRings[i1];
				localPoint.x = ac.x - this.windowLocation.x;
				localPoint.y = ac.y - this.windowLocation.y;
				ac.draw(canvas, localPoint, this.scale);
				if (ac.tickCount > 256) {
					this.activeRings.remove(ac);
				}
			}
			if (this.currentGameState === 0) {
				this.sonicToon.draw(canvas, this.scale);
				if (this.windowLocation.x < 0) {
					this.windowLocation.x = 0;
				}
				if (this.windowLocation.y < 0) {
					this.windowLocation.y = 0;
				}
				if (this.windowLocation.x > 128 * this.sonicLevel.levelWidth - this.windowLocation.width) {
					this.windowLocation.x = 128 * this.sonicLevel.levelWidth - this.windowLocation.width;
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
					if (_xP1 < 0 || _xP1 >= this.sonicLevel.levelWidth) {
						continue;
					}
					_yP1 = OurSonic.Help.mod(_yP1, this.sonicLevel.levelHeight);
					var chunk1 = this.sonicLevel.chunks[this.sonicLevel.chunkMap[_xP1][_yP1]];
					if (ss.isNullOrUndefined(chunk1)) {
						continue;
					}
					localPoint.x = _xP1 * 128 * this.scale.x - this.windowLocation.x * this.scale.x;
					localPoint.y = _yPreal1 * 128 * this.scale.y - this.windowLocation.y * this.scale.y;
					if (!chunk1.isEmpty() && !chunk1.onlyBackground()) {
						chunk1.draw(canvas, localPoint, this.scale, 1, bounds);
					}
					if (false && this.currentGameState === 1) {
						canvas.strokeStyle = '#DD0033';
						canvas.lineWidth = 3;
						canvas.strokeRect(localPoint.x, localPoint.y, 128 * this.scale.x, 128 * this.scale.y);
					}
					if (this.showHeightMap) {
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
					if (this.currentGameState === 1) {
						canvas.strokeStyle = '#DD0033';
						canvas.lineWidth = 3;
						canvas.strokeRect(localPoint.x, localPoint.y, 128 * this.scale.x, 128 * this.scale.y);
					}
				}
			}
			finally {
				$t5.dispose();
			}
		}
		canvas.restore();
		if (this.currentGameState === 0) {
			this.sonicToon.drawUI(canvas, { x: this.screenOffset.x, y: this.screenOffset.y }, this.scale);
		}
	},
	$containsAnimatedTile: function(tile, sonLevel) {
		for (var index = 0; index < sonLevel.Animations.length; index++) {
			var an = sonLevel.Animations[index];
			var anin = an.AnimationTileIndex;
			var num = an.NumberOfTiles;
			if (index >= anin && index < anin + num) {
				var $t1 = new OurSonic.Animation();
				$t1.animationFile = an.AnimationFile;
				$t1.automatedTiming = an.AutomatedTiming;
				return $t1;
			}
		}
		return null;
		//
		//             
		//        for (var i = 0; i < sonicManager.SonicLevel.Animations.length; i++) {
		//
		//             
		//        var an = sonicManager.SonicLevel.Animations[i];
		//
		//             
		//        var anin = an.AnimationTileIndex;
		//
		//             
		//        var num = an.NumberOfTiles;
		//
		//             
		//        if (index >= anin && index < anin + num) {
		//
		//             
		//        return an;
		//
		//             
		//        }
		//
		//             
		//        }
		//
		//             
		//        return undefined;
		return null;
	},
	$decodeNumeric: function(s) {
		s = s.replace(new RegExp('[^' + OurSonic.SonicManager.$base64chars.join('') + '=]', 'g'), '');
		var p = ((s.charAt(s.length - 1) === '=') ? ((s.charAt(s.length - 2) === '=') ? 'AA' : 'A') : '');
		var r = [];
		s = s.substr(0, s.length - p.length) + p;
		for (var c = 0; c < s.length; c += 4) {
			var n = (OurSonic.SonicManager.$base64Inv[s.charAt(c)] << 18) + (OurSonic.SonicManager.$base64Inv[s.charAt(c + 1)] << 12) + (OurSonic.SonicManager.$base64Inv[s.charAt(c + 2)] << 6) + OurSonic.SonicManager.$base64Inv[s.charAt(c + 3)];
			r.add(n >> 16 & 255);
			r.add(n >> 8 & 255);
			r.add(n & 255);
		}
		return Type.cast(r.slice(0, r.length - 1), Array);
	},
	load: function(lvl, mainCanvas) {
		this.loading = true;
		this.set_status('Decoding');
		var sonicLevel = $.parseJSON(OurSonic.Help.decodeString(lvl));
		this.set_status('Determining Level Information');
		if (ss.isNullOrUndefined(this.sonicLevel.chunks)) {
			this.sonicLevel.chunks = [];
		}
		if (ss.isNullOrUndefined(this.sonicLevel.blocks)) {
			this.sonicLevel.blocks = [];
		}
		if (ss.isNullOrUndefined(this.sonicLevel.tiles)) {
			this.sonicLevel.tiles = [];
		}
		if (ss.isNullOrUndefined(this.sonicLevel.rings)) {
			this.sonicLevel.rings = {};
		}
		this.sonicLevel.levelWidth = sonicLevel.ForegroundWidth;
		this.sonicLevel.levelHeight = sonicLevel.ForegroundHeight;
		this.sonicLevel.chunkMap = sonicLevel.Foreground;
		this.sonicLevel.bgChunkMap = sonicLevel.Background;
		//
		//        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
		//
		//        o = sonicManager.SonicLevel.Objects[l];
		//
		//        _H.ObjectParse(o, (function (r) {
		//
		//        return function (rq) {
		//
		//        sonicManager.SonicLevel.Objects[r] = rq;
		//
		//        };
		//
		//        })(l));
		//
		//        }
		this.sonicLevel.objects = [];
		for (var l = 0; l < sonicLevel.Objects.length; l++) {
			this.sonicLevel.objects[l] = new OurSonic.SonicObject(sonicLevel.Objects[l]);
			this.sonicLevel.objects[l].index = l;
		}
		var objectKeys = {};
		//
		//        var objectKeys = [];
		//
		//        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
		//
		//        o = sonicManager.SonicLevel.Objects[l].key;
		//
		//        
		//
		//        if (JSLINQ(objectKeys).Count(function (p) { return p == o; }) == 0) {
		//
		//        objectKeys.push(o);
		//
		//        }
		//
		//        }
		//
		//        
		//
		//        
		//
		//        
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
		//    var jm = [];
		//    jm[0] = [];
		//    jm[1] = [];
		//    jm[2] = [];
		//    jm[3] = [];
		//    for (var qc = 0; qc < sonicManager.SonicLevel.Palette.length;qc++ ) {
		//    jm[_H.floor(qc / 16)][qc % 16] = sonicManager.SonicLevel.Palette[qc];
		//    }
		//    sonicManager.SonicLevel.Palette=jm;
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
			for (var o = 0; o < 8; o++) {
				mfc[o] = new Array(8);
			}
			for (var n = 0; n < mj.length; n++) {
				mfc[n % 8][ss.Int32.div(n, 8)] = mj[n];
			}
			this.sonicLevel.tiles[j] = new OurSonic.Drawing.Tile(mfc);
			this.sonicLevel.tiles[j].index = j;
		}
		var acs = this.sonicLevel.animatedChunks = [];
		//
		//                    
		//                    if (sonicManager.SonicLevel.AnimatedFiles) {
		//
		//                    
		//                    for (jc = 0; jc < sonicManager.SonicLevel.AnimatedFiles.length; jc++) {
		//
		//                    
		//                    var fcc = sonicManager.SonicLevel.AnimatedFiles[jc];
		//
		//                    
		//                    for (j = 0; j < fcc.length; j++) {
		//
		//                    
		//                    fc = fcc[j];
		//
		//                    
		//                    fcc[j] = decodeNumeric(fc);
		//
		//                    
		//                    
		//
		//                    
		//                    mj = [];
		//
		//                    
		//                    for (l = 0; l < fcc[j].length; l++) {
		//
		//                    
		//                    value = fcc[j][l];
		//
		//                    
		//                    mj.push(value >> 4);
		//
		//                    
		//                    mj.push(value & 0xF);
		//
		//                    
		//                    }
		//
		//                    
		//                    fcc[j] = { colors: mj };
		//
		//                    
		//                    td = fcc[j];
		//
		//                    
		//                    mf = [];
		//
		//                    
		//                    for (o = 0; o < 8; o++) {
		//
		//                    
		//                    mf[o] = [];
		//
		//                    
		//                    }
		//
		//                    
		//                    for (n = 0; n < td.colors.length; n++) {
		//
		//                    
		//                    mf[n % 8][_H.floor(n / 8)] = td.colors[n];
		//
		//                    
		//                    }
		//
		//                    
		//                    td.colors = mf;
		//
		//                    
		//                    td.index = "A" + j + "_" + jc;
		//
		//                    
		//                    fcc[j] = _H.extend(new Tile(), td);
		//
		//                    
		//                    
		//
		//                    
		//                    }
		//
		//                    
		//                    }
		//
		//                    
		//                    }
		this.sonicLevel.blocks = [];
		for (var j1 = 0; j1 < sonicLevel.Blocks.length; j1++) {
			var fc1 = sonicLevel.Blocks[j1];
			var mj1 = new OurSonic.Drawing.TilePiece();
			mj1.index = j1;
			mj1.tiles = [];
			for (var p = 0; p < fc1.length; p++) {
				var $t2 = mj1.tiles;
				var $t1 = new OurSonic.Drawing.TileItem();
				$t1._Tile = fc1[p].Tile;
				$t1.index = p;
				$t1.palette = fc1[p].Palette;
				$t1.priority = fc1[p].Priority;
				$t1.xFlip = fc1[p].XFlip;
				$t1.yFlip = fc1[p].YFlip;
				$t2.add($t1);
			}
			this.sonicLevel.blocks[j1] = mj1;
		}
		this.sonicLevel.angles = sonicLevel.Angles;
		this.sonicLevel.animatedFiles = sonicLevel.AnimatedFiles;
		this.sonicLevel.set_Animations(sonicLevel.Animations.map(function(a) {
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
		}).clone());
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
				this.sonicLevel.heightMaps[i1] = OurSonic.HeightMask.op_Implicit(0);
			}
			else if (b2) {
				this.sonicLevel.heightMaps[i1] = OurSonic.HeightMask.op_Implicit(1);
			}
			else {
				this.sonicLevel.heightMaps[i1] = new OurSonic.HeightMask(sonicLevel.HeightMaps[i1]);
			}
		}
		this.sonicLevel.chunks = [];
		for (var j2 = 0; j2 < sonicLevel.Chunks.length; j2++) {
			var fc2 = sonicLevel.Chunks[j2];
			var mj2 = new OurSonic.Drawing.TileChunk();
			mj2.index = j2;
			mj2.tilePieces = new Array(8);
			for (var i2 = 0; i2 < 8; i2++) {
				mj2.tilePieces[i2] = new Array(8);
			}
			for (var p1 = 0; p1 < fc2.length; p1++) {
				var $t6 = mj2.tilePieces[p1 % 8];
				var $t7 = ss.Int32.div(p1, 8);
				var $t5 = new OurSonic.Drawing.TilePiece();
				$t5.index = p1;
				$t5.block = fc2[p1].Block;
				$t5.xFlip = fc2[p1].XFlip;
				$t5.yFlip = fc2[p1].YFlip;
				$t6[$t7] = $t5;
			}
			this.sonicLevel.chunks[j2] = mj2;
			mj2.animated = [];
			for (var ic = 0; ic < mj2.tilePieces.length; ic++) {
				for (var jc = 0; jc < mj2.tilePieces[ic].length; jc++) {
					var r = mj2.tilePieces[ic][jc];
					var pm = this.sonicLevel.blocks[r.block];
					if (ss.isValue(pm)) {
						for (var ci = 0; ci < pm.tiles.length; ci++) {
							var mjc = pm.tiles[ci];
							if (ss.isValue(this.sonicLevel.tiles[mjc._Tile])) {
								var fa = this.$containsAnimatedTile(mjc._Tile, sonicLevel);
								if (ss.isValue(fa)) {
									mj2.animated[jc * 8 + ic] = fa;
									acs[j2] = mj2;
								}
							}
						}
					}
				}
			}
			//for (je = 0; je < fc.angleMap1.length; je++) {
			//for (jc = 0; jc < fc.angleMap1[je].length; jc++) {
			//fc.angleMap1[je][jc] = parseInt(fc.angleMap1[je][jc], 16);
			//}
			//}
			//for (je = 0; je < fc.angleMap2.length; je++) {
			//for (jc = 0; jc < fc.angleMap2[je].length; jc++) {
			//fc.angleMap2[je][jc] = parseInt(fc.angleMap2[je][jc], 16);
			//}
			//}
			//
			//
			//for (je = 0; je < fc.heightMap1.length; je++) {
			//for (jc = 0; jc < fc.heightMap1[je].length; jc++) {
			//fc.heightMap1[je][jc] = sonicManager.SonicLevel.HeightMaps[fc.heightMap1[je][jc]];
			//}
			//}
			//
			//for (je = 0; je < fc.heightMap2.length; je++) {
			//for (jc = 0; jc < fc.heightMap2[je].length; jc++) {
			//fc.heightMap2[je][jc] = sonicManager.SonicLevel.HeightMaps[fc.heightMap2[je][jc]];
			//}
			//}
		}
		this.sonicLevel.palette = sonicLevel.Palette;
		this.sonicLevel.paletteItems = [];
		if (ss.isValue(sonicLevel.PaletteItems[0])) {
			this.sonicLevel.paletteItems[0] = [];
			for (var k = 0; k < sonicLevel.PaletteItems[0].length; k++) {
				var pal = sonicLevel.PaletteItems[0][k];
				var $t10 = this.sonicLevel.paletteItems[0];
				var $t8 = new OurSonic.PaletteItem();
				$t8.palette = Type.cast(eval(pal.Palette), Array);
				$t8.skipIndex = pal.SkipIndex;
				$t8.totalLength = pal.TotalLength;
				$t8.pieces = pal.Pieces.map(function(a1) {
					var $t9 = new OurSonic.PaletteItemPieces();
					$t9.paletteIndex = a1.PaletteIndex;
					$t9.paletteMultiply = a1.PaletteMultiply;
					$t9.paletteOffset = a1.PaletteOffset;
					return $t9;
				});
				$t10[k] = $t8;
			}
		}
		//
		//            if (SonicLevel.PaletteItems[0] != null)
		//
		//            {
		//
		//            for (var k = 0; k < sonicLevel.PaletteItems[0].Count; k++)
		//
		//            {
		//
		//            var pal = sonicLevel.PaletteItems[0][k];
		//
		//            SonicLevel.PaletteItems[0][k] = pal;
		//
		//            pal.Palette = (List<string>)Script.Eval(pal.Palette.Me());
		//
		//            
		//
		//            //below this is bad
		//
		//            if (pal.TotalLength == 0)
		//
		//            pal.TotalLength = pal.Palette.Count;
		//
		//            if (pal.SkipIndex == 0)
		//
		//            pal.SkipIndex = pal.Palette.Count / 8;
		//
		//            //^
		//
		//            }
		//
		//            }
		//
		//                          for (var kd = 0; kd < sonicLevel.Blocks.Count; kd++) {
		//
		//                          var dj = sonicLevel.Blocks[kd];
		//
		//                          dj.animatedFrames = [];
		//
		//                          
		//
		//                          for (var i = 0; i < dj.tiles.length; i++) {
		//
		//                          var mj = dj.tiles[i];
		//
		//                          if (sonicManager.SonicLevel.Tiles[mj.Tile]) {
		//
		//                          
		//
		//                          var pl = JSLINQ(sonicManager.SonicLevel.Tiles[mj.Tile].getAllPaletteIndexes());
		//
		//                          
		//
		//                          
		//
		//                          if (sonicManager.SonicLevel.PaletteItems[0]) {
		//
		//                          for (var k = 0; k < sonicManager.SonicLevel.PaletteItems[0].length; k++) {
		//
		//                          var pal = sonicManager.SonicLevel.PaletteItems[0][k];
		//
		//                          
		//
		//                          
		//
		//                          for (var m = 0; m < pal.Pieces.length; m++) {
		//
		//                          var mje = pal.Pieces[m];
		//
		//                          
		//
		//                          if (mj.Palette == mje.PaletteIndex) {
		//
		//                          if (pl.Any(function (J) {
		//
		//                          return J == mje.PaletteOffset / 2 || J == mje.PaletteOffset / 2 + 1;
		//
		//                          })) {
		//
		//                          dj.animatedFrames.push(k);
		//
		//                          }
		//
		//                          }
		//
		//                          }
		//
		//                          
		//
		//                          }
		//
		//                          
		//
		//                          }
		//
		//                          }
		//
		//                          
		//
		//                          }
		//
		//                          }
		//  SonicLevel = sonicLevel.Translate();
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
		//        /*
		// 
		//
		//               
		//
		//        var scal = scale;
		// 
		//
		//               
		//
		//        for (j = 0; j < sonicManager.SonicLevel.Tiles.length; j++) {
		// 
		//
		//               
		//
		//        fc = sonicManager.SonicLevel.Tiles[j];
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, function (j) {
		// 
		//
		//               
		//
		//        inds.t++;
		// 
		//
		//               
		//
		//        var done1 = function (c) {
		// 
		//
		//               
		//
		//        inds.tp++;
		// 
		//
		//               
		//
		//        if (inds.tp == sonicManager.SonicLevel.Blocks.length * 5) {
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        var done2 = function (c2) {
		// 
		//
		//               
		//
		//        inds.tc++;
		// 
		//
		//               
		//
		//        
		// 
		//
		//               
		//
		//        finished();
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
		//        for (j = 0; j < sonicManager.SonicLevel.Chunks.length; j++) {
		// 
		//
		//               
		//
		//        fc = sonicManager.SonicLevel.Chunks[j];
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 1, done2);
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 2, done2);
		// 
		//
		//               
		//
		//        }
		// 
		//
		//               
		//
		//        }
		// 
		//
		//               
		//
		//        };
		// 
		//
		//               
		//
		//        if (inds.t == sonicManager.SonicLevel.Tiles.length) {
		// 
		//
		//               
		//
		//        for (j = 0; j < sonicManager.SonicLevel.Blocks.length; j++) {
		// 
		//
		//               
		//
		//        fc = sonicManager.SonicLevel.Blocks[j];
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 0, done1);
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 1, done1);
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 2, done1);
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 3, done1);
		// 
		//
		//               
		//
		//        fc.cacheImage(mainCanvas, scal, 4, done1);
		// 
		//
		//               
		//
		//        }
		// 
		//
		//               
		//
		//        }
		// 
		//
		//               
		//
		//        });
		// 
		//
		//               
		//
		//        }#1#
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicObject
OurSonic.SonicObject = function(entry) {
	this.x = 0;
	this.y = 0;
	this.dead = false;
	this.index = 0;
};
OurSonic.SonicObject.prototype = {
	tick: function(sonicObject, sonicLevel, sonicToon) {
	},
	draw: function(canvas, x, y, scale, showHeightMap) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteCache
OurSonic.SpriteCache = function() {
	this.rings = null;
	this.tileChunks = null;
	this.tilepieces = null;
	this.tiles = null;
	this.sonicSprites = null;
	this.heightMaps = null;
	this.heightMapChunks = null;
	this.indexes = null;
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
	this.dragger = null;
	this.data = null;
};
OurSonic.UIManager.prototype = {
	onClick: function(elementEvent) {
		return false;
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
	},
	updateTitle: function(decoding) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManagerData
OurSonic.UIManagerData = function() {
	this.indexes = null;
	this.solidTileArea = null;
	this.modifyTilePieceArea = null;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManagerDataIndexes
OurSonic.UIManagerDataIndexes = function() {
	this.tpIndex = 0;
};
OurSonic.Animation.registerClass('OurSonic.Animation', Object);
OurSonic.AnimationFrame.registerClass('OurSonic.AnimationFrame', Object);
OurSonic.AnimationInstance.registerClass('OurSonic.AnimationInstance', Object);
OurSonic.CanvasInformation.registerClass('OurSonic.CanvasInformation', Object);
OurSonic.Color.registerClass('OurSonic.Color', Object);
OurSonic.Constants.registerClass('OurSonic.Constants', Object);
OurSonic.Drawing.Tile.registerClass('OurSonic.Drawing.Tile', Object);
OurSonic.Drawing.TileChunk.registerClass('OurSonic.Drawing.TileChunk', Object);
OurSonic.Drawing.TileItem.registerClass('OurSonic.Drawing.TileItem', Object);
OurSonic.Drawing.TilePiece.registerClass('OurSonic.Drawing.TilePiece', Object);
OurSonic.Extensions.registerClass('OurSonic.Extensions', Object);
OurSonic.HeightMask.registerClass('OurSonic.HeightMask', Object);
OurSonic.Help.registerClass('OurSonic.Help', Object);
OurSonic.IntersectingRectangle.registerClass('OurSonic.IntersectingRectangle', Object);
OurSonic.ObjectManager.registerClass('OurSonic.ObjectManager', Object);
OurSonic.Page.registerClass('OurSonic.Page', Object);
OurSonic.PaletteItem.registerClass('OurSonic.PaletteItem', Object);
OurSonic.PaletteItemPieces.registerClass('OurSonic.PaletteItemPieces', Object);
OurSonic.Point.registerClass('OurSonic.Point', Object);
OurSonic.Rectangle.registerClass('OurSonic.Rectangle', Object);
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
OurSonic.SonicManager.instance = null;
OurSonic.SonicManager.$base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
OurSonic.SonicManager.$base64Inv = null;
OurSonic.SonicManager.$base64Inv = {};
for (var i = 0; i < OurSonic.SonicManager.$base64chars.length; i++) {
	OurSonic.SonicManager.$base64Inv[OurSonic.SonicManager.$base64chars[i]] = i;
}
$(function(){new OurSonic.Page();});
