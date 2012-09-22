
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
			return OurSonic.IntersectingRectangle.$ctor(0, 0, 320, 224);
		}
		case 1: {
			var x = 0;
			var y = 0;
			if (OurSonic.SonicManager.instance.sonicLevel && OurSonic.SonicManager.instance.sonicLevel.startPositions && OurSonic.SonicManager.instance.sonicLevel.startPositions[0]) {
				x = OurSonic.SonicManager.instance.sonicLevel.startPositions[0].x - 128 * scale.x;
				y = OurSonic.SonicManager.instance.sonicLevel.startPositions[0].y - 128 * scale.y;
			}
			return OurSonic.IntersectingRectangle.$ctor(x, y, canvas.domCanvas.width(), canvas.domCanvas.height());
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
// OurSonic.Drawing.TileChunk
OurSonic.Drawing.TileChunk = function() {
	this.isOnlyBackground = null;
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
OurSonic.Drawing.TileChunk.prototype = {
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
		if (ss.Nullable.eq(this.isOnlyBackground, null)) {
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
		}
		return ss.Nullable.unbox(this.isOnlyBackground);
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
		var localPoint = OurSonic.Point.$ctor1(0, 0);
		var check = false;
		//var RectB = new Rectangle(position.X, position.Y, len1 * lX, len2 * lY);
		//var RectA = bounds;
		//if (RectA.X < RectB.X+RectB.Width && RectA.X+RectA.Width > RectB.X+RectB.Width &&
		//RectA.Y < RectB.Y + RectB.Height && RectA.Y + RectA.Height > RectB.Y + RectB.Height) {
		//check = true;
		//}
		//
		//
		//       localPoint.X = position.X;
		//
		//
		//       localPoint.Y = position.Y;
		//
		//
		//       if (bounds.Intersects(localPoint)) {
		//
		//
		//       localPoint.X = position.X+len1*lX;
		//
		//
		//       localPoint.Y = position.Y;
		//
		//
		//       if (bounds.Intersects(localPoint))
		//
		//
		//       {
		//
		//
		//       localPoint.X = position.X;
		//
		//
		//       localPoint.Y = position.Y + len2 * lY;
		//
		//
		//       if (bounds.Intersects(localPoint))
		//
		//
		//       {
		//
		//
		//       localPoint.X = position.X + len1 * lX;
		//
		//
		//       localPoint.Y = position.Y + len2 * lY;
		//
		//
		//       if (bounds.Intersects(localPoint)) {
		//
		//
		//       check = false;
		//
		//
		//       }
		//
		//
		//       }
		//
		//
		//       }
		//
		//
		//       }
		var blocks = OurSonic.SonicManager.instance.sonicLevel.blocks;
		for (var i = 0; i < len1; i++) {
			for (var j = 0; j < len2; j++) {
				var r = this.tilePieces[i][j];
				var pm = blocks[r.block];
				if (pm) {
					var animatedIndex = 0;
					if (this.animated && this.animated[j * len1 + i]) {
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
	this.$drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
	this.$drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
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
OurSonic.Drawing.TilePiece.prototype = {
	clearCache: function() {
		this.image = {};
	},
	onlyBackground: function() {
		var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
		var $t1 = this.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var mj = $t1.get_current();
				if (tiles[mj._Tile]) {
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
		var fd = this.$getCache(layer, scale, drawOrderIndex, animatedIndex, OurSonic.SonicManager.instance.sonicLevel.palAn);
		if (!fd) {
			var ac = OurSonic.Help.defaultCanvas(8 * OurSonic.SonicManager.instance.scale.x * 2, 8 * OurSonic.SonicManager.instance.scale.y * 2);
			var sX = 8 * scale.x;
			var sY = 8 * scale.y;
			var i = 0;
			var localPoint = OurSonic.Point.$ctor1(0, 0);
			var tiles = OurSonic.SonicManager.instance.sonicLevel.tiles;
			var $t1 = this.tiles.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var mj = $t1.get_current();
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
			}
			finally {
				$t1.dispose();
			}
			fd = ac.canvas;
			this.$setCache(layer, scale, drawOrderIndex, animatedIndex, OurSonic.SonicManager.instance.sonicLevel.palAn, fd);
		}
		this.$drawIt(canvas, fd, position);
		return true;
	},
	$setCache: function(layer, scale, drawOrder, animationFrame, palAn, image) {
		var val = drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000;
		if (!!this.animatedFrames) {
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
		var val = drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000;
		if (this.animatedFrames) {
			for (var $t1 = 0; $t1 < this.animatedFrames.length; $t1++) {
				var animatedFrame = this.animatedFrames[$t1];
				val += palAn[animatedFrame] + ' ';
			}
		}
		if (!!!this.image[val]) {
			return null;
		}
		return Type.cast(this.image[val], Element);
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
	this.width = 0;
	this.height = 0;
	this.items = null;
	this.integer = 0;
	this.index = 0;
	this.items = heightMap;
	this.width = 16;
	this.height = 16;
	this.integer = -1000;
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
		var fd = OurSonic.SonicManager.instance.spriteCache.heightMaps[this.index];
		if (fd) {
			if (OurSonic.Help.loaded(fd)) {
				canvas.drawImage(fd, pos.x, pos.y);
			}
		}
		else if (solid > 0) {
			for (var x = 0; x < 16; x++) {
				for (var y = 0; y < 16; y++) {
					var jx = 0;
					var jy = 0;
					if (OurSonic.HeightMask.itemsGood(this.items, x, y)) {
						jx = x;
						jy = y;
						var _x = pos.x + jx * scale.x;
						var _y = pos.y + jy * scale.y;
						canvas.lineWidth = 1;
						canvas.fillStyle = OurSonic.HeightMask.colors[solid];
						canvas.fillRect(_x, _y, scale.x, scale.y);
						if (angle !== 255) {
							canvas.beginPath();
							canvas.lineWidth = 3;
							canvas.strokeStyle = 'rgba(163,241,255,0.8)';
							canvas.moveTo(pos.x + ss.Int32.div(scale.x * 16, 2), pos.y + ss.Int32.div(scale.y * 16, 2));
							canvas.lineTo(pos.x + ss.Int32.div(scale.x * 16, 2) - OurSonic.Help.sin(angle) * scale.x * 8, pos.y + ss.Int32.div(scale.y * 16, 2) - OurSonic.Help.cos(angle) * scale.x * 8);
							canvas.stroke();
							canvas.beginPath();
							canvas.fillStyle = 'rgba(163,241,255,0.8)';
							canvas.arc(pos.x + ss.Int32.div(scale.x * 16, 2) - OurSonic.Help.sin(angle) * scale.x * 8, pos.y + ss.Int32.div(scale.y * 16, 2) - OurSonic.Help.cos(angle) * scale.x * 8, 5, 0, 2 * Math.PI, true);
							canvas.fill();
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
		canvas.restore();
		pos.x = oPos.x;
		pos.y = oPos.y;
	}
};
OurSonic.HeightMask.op_Implicit$1 = function(d) {
	var m = ((d === 0) ? 0 : 16);
	return new OurSonic.HeightMask([m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m]);
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
////////////////////////////////////////////////////////////////////////////////
// OurSonic.IntersectingRectangle
OurSonic.IntersectingRectangle = function() {
};
OurSonic.IntersectingRectangle.intersects = function($this, p) {
	return $this.x < p.x && $this.x + $this.width > p.x && $this.y < p.y && $this.y + $this.height > p.y;
};
OurSonic.IntersectingRectangle.$ctor = function(x, y, width, height) {
	var $this = OurSonic.Rectangle.$ctor();
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
OurSonic.Point.offset = function($this, windowLocation) {
	return OurSonic.Point.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
};
OurSonic.Point.negate = function($this, windowLocation) {
	return OurSonic.Point.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
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
// OurSonic.Ring
OurSonic.Ring = function() {
};
OurSonic.Ring.draw = function($this, canvas, pos, scale) {
	if ($this.active) {
		//
		//                 
		//  if (active) {
		//
		//                 
		//  this.ysp += 0.09375;
		//
		//                 
		//  this.x += this.xsp;
		//
		//                 
		//  this.y += this.ysp;
		//
		//                 
		//  
		//
		//                 
		//  if (this.x < sonicManager.windowLocation.x || this.y < sonicManager.windowLocation.y || this.x > sonicManager.windowLocation.x + sonicManager.windowLocation.width || this.y > sonicManager.windowLocation.y + sonicManager.windowLocation.height) {
		//
		//                 
		//  this.tickCount = 0xffffffff;
		//
		//                 
		//  return false;
		//
		//                 
		//  }
		//
		//                 
		//  /*            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) + 8, _H.floor(this.y) + 8, 16, 1) != -1) {
		//
		//                 
		//  this.ysp *= -0.75;
		//
		//                 
		//  }
		//
		//                 
		//  
		//
		//                 
		//  if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) - 8, _H.floor(this.y) + 8, 26, 0) != -1) {
		//
		//                 
		//  this.xsp *= -0.75;
		//
		//                 
		//  }#1#
		//
		//                 
		//  
		//
		//                 
		//  if (sonicManager.drawTickCount > sonicManager.sonicToon.sonicLastHitTick + 64 &&
		//
		//                 
		//  _H.intersectRect(sonicManager.sonicToon.myRec, { x: this.x - 8 * scale.x, width:  8 *2* scale.x, y: this.y - 8 * scale.y, height: 2* 8 * scale.y })) {
		//
		//                 
		//  this.tickCount = 0xffffffff;
		//
		//                 
		//  sonicManager.sonicToon.rings++;
		//
		//                 
		//  return false;
		//
		//                 
		//  }
		//
		//                 
		//  
		//
		//                 
		//  this.tickCount++;
		//
		//                 
		//  }
	}
	if (true || OurSonic.SonicManager.instance.currentGameState === 0) {
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
OurSonic.Ring.$ctor = function(active) {
	var $this = OurSonic.Point.$ctor1(0, 0);
	$this.active = false;
	$this.animationIndex = 0;
	$this.tickCount = 0;
	$this.ysp = 0;
	$this.xsp = 0;
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
	this.$myRec = null;
	this.$oldSign = 0;
	this.$physicsVariables = null;
	this.$runningTick = 0;
	this.$sensorManager = null;
	this.$sonicLastHitTick = 0;
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
	this.rings = 100;
	this.$sensorManager.createVerticalSensor('a', -9, 0, 36, '#F202F2', false);
	this.$sensorManager.createVerticalSensor('b', 9, 0, 36, '#02C2F2', false);
	this.$sensorManager.createVerticalSensor('c', -9, 0, -20, '#2D2C21', false);
	this.$sensorManager.createVerticalSensor('d', 9, 0, -20, '#C24222', false);
	this.$sensorManager.createHorizontalSensor('m1', 4, 0, -12, '#212C2E', false);
	this.$sensorManager.createHorizontalSensor('m2', 4, 0, 12, '#22Ffc1', false);
	this.spriteState = 'normal';
};
OurSonic.Sonic.prototype = {
	updateMode: function() {
		if (this.angle <= 34 || this.angle >= 222) {
			this.mode = 134;
		}
		else if (this.angle > 34 && this.angle < 86) {
			this.mode = 44;
		}
		else if (this.angle >= 86 && this.angle < 161) {
			this.mode = 314;
		}
		else if (this.angle > 161 && this.angle < 222) {
			this.mode = 224;
		}
		//        x = _H.floor(x);
		//        y = _H.floor(y);
		this.$myRec = OurSonic.Rectangle.$ctor1(ss.Int32.trunc(this.x - 5), ss.Int32.trunc(this.y - 20), 10, 40);
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
					this.x = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? 12 : -12));
					this.gsp = 0;
					if (this.inAir) {
						this.xsp = 0;
					}
					break;
				}
				case 224: {
					this.y = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? 12 : -12));
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
								if (sensorC.angle > 72 && sensorC.angle < 88) {
									this.angle = sensorC.angle;
									this.gsp = -this.ysp;
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
							if (sensorD.angle > 72 && sensorD.angle < 88) {
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
							if (sensorC.angle > 72 && sensorC.angle < 88) {
								this.angle = sensorC.angle;
								this.gsp = -this.ysp;
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
							if (sensorD.angle > 72 && sensorD.angle < 88) {
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
		var mc = OurSonic.SonicManager.instance.drawTickCount - this.$sonicLastHitTick;
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
			this.x += offset.x;
			this.y += offset.y;
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
		this.$checkCollisionWithRing();
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
				this.gsp = 0;
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
	$checkCollisionWithRing: function() {
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
		if (OurSonic.SonicManager.instance.drawTickCount - this.$sonicLastHitTick < 120) {
			return;
		}
		this.justHit = true;
		this.ysp = -4;
		this.xsp = 2 * ((this.x - x < 0) ? -1 : 1);
		this.$sonicLastHitTick = OurSonic.SonicManager.instance.drawTickCount;
		var t = 0;
		var angle = 101.25;
		var n = false;
		var speed = 4;
		while (t < this.rings) {
			var ring = OurSonic.Ring.$ctor(true);
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
		return false;
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
		if (this.$sonicManager.currentGameState === 1) {
			this.$sonicManager.uiManager.onKeyDown(e1);
		}
	}));
	KeyboardJS.bind.key('f', Function.mkdel(this, function() {
		this.$sonicManager.showHeightMap = !this.$sonicManager.showHeightMap;
	}), function() {
	});
	KeyboardJS.bind.key('o', Function.mkdel(this, function() {
		if (this.$sonicManager.currentGameState === 0) {
			this.$sonicManager.inHaltMode = !this.$sonicManager.inHaltMode;
		}
	}), function() {
	});
	var levelIndex = 0;
	var client = io.connect('50.116.22.241:8998');
	client.on('SonicLevel', Function.mkdel(this, function(data) {
		this.$sonicManager.load(Type.cast(data.Data, String));
		this.$sonicManager.windowLocation.x = 0;
		this.$sonicManager.windowLocation.y = 0;
		this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.x;
		this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
	}));
	KeyboardJS.bind.key('2', function() {
		client.emit('GetSonicLevel', '0');
	}, function() {
	});
	client.emit('GetSonicLevel', '0');
	KeyboardJS.bind.key('1', Function.mkdel(this, function() {
		this.$sonicManager.indexedPalette++;
		var $t1 = this.$sonicManager.sonicLevel.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var tile = $t1.get_current();
				tile.clearCache();
			}
		}
		finally {
			$t1.dispose();
		}
		var $t2 = this.$sonicManager.sonicLevel.blocks.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var tilePiece = $t2.get_current();
				tilePiece.clearCache();
			}
		}
		finally {
			$t2.dispose();
		}
	}), function() {
	});
	KeyboardJS.bind.key('q', Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.currentGameState = 1;
				this.$sonicManager.windowLocation = OurSonic.Constants.defaultWindowLocation(this.$sonicManager.currentGameState, this.$gameCanvas, this.$sonicManager.scale);
				this.$sonicManager.sonicToon = null;
				break;
			}
			case 1: {
				this.$sonicManager.currentGameState = 0;
				this.$sonicManager.windowLocation = OurSonic.Constants.defaultWindowLocation(this.$sonicManager.currentGameState, this.$gameCanvas, this.$sonicManager.scale);
				this.$sonicManager.sonicToon = new OurSonic.Sonic();
				break;
			}
		}
	}), function() {
	});
	KeyboardJS.bind.key('p', Function.mkdel(this, function() {
		if (this.$sonicManager.currentGameState === 0) {
			if (this.$sonicManager.inHaltMode) {
				this.$sonicManager.waitingForTickContinue = false;
			}
		}
	}), function() {
	});
	KeyboardJS.bind.key('h', Function.mkdel(this, function() {
		if (this.$sonicManager.currentGameState === 0) {
			this.$sonicManager.sonicToon.hit(this.$sonicManager.sonicToon.x, this.$sonicManager.sonicToon.y);
		}
	}), function() {
	});
	KeyboardJS.bind.key('c', Function.mkdel(this, function() {
		if (this.$sonicManager.currentGameState === 0) {
			this.$sonicManager.sonicToon.debug();
		}
	}), function() {
	});
	KeyboardJS.bind.key('up', Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.pressUp();
				break;
			}
			case 1: {
				this.$sonicManager.windowLocation.y -= 128;
				this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.releaseUp();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('down', Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.pressCrouch();
				break;
			}
			case 1: {
				this.$sonicManager.windowLocation.y += 128;
				this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.releaseCrouch();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('left', Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.pressLeft();
				break;
			}
			case 1: {
				this.$sonicManager.windowLocation.x -= 128;
				this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.x;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.releaseLeft();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('right', Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.pressRight();
				break;
			}
			case 1: {
				this.$sonicManager.windowLocation.x += 128;
				this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.x;
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.releaseRight();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('space', Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.pressJump();
				break;
			}
			case 1: {
				break;
			}
		}
	}), Function.mkdel(this, function() {
		switch (this.$sonicManager.currentGameState) {
			case 0: {
				this.$sonicManager.sonicToon.releaseJump();
				break;
			}
			case 1: {
				break;
			}
		}
	}));
	KeyboardJS.bind.key('e', Function.mkdel(this, function() {
		this.$sonicManager.sonicLevel.curHeightMap = !this.$sonicManager.sonicLevel.curHeightMap;
	}), function() {
	});
	this.$fullscreenMode = true;
	window.addEventListener('resize', Function.mkdel(this, function(e2) {
		this.resizeCanvas();
	}));
	$(document).resize(Function.mkdel(this, function(e3) {
		this.resizeCanvas();
	}));
	this.$sonicManager = new OurSonic.SonicManager(this, this.$gameCanvas, Function.mkdel(this, this.resizeCanvas));
	this.$sonicManager.indexedPalette = 0;
	window.setInterval(Function.mkdel(this.$sonicManager, this.$sonicManager.tick), 16);
	window.setInterval(Function.mkdel(this, this.gameDraw), 16);
	window.setInterval(Function.mkdel(this, this.uiDraw), 50);
	this.resizeCanvas();
};
OurSonic.SonicEngine.prototype = {
	$handleScroll: function(jQueryEvent) {
		jQueryEvent.preventDefault();
		var j = ss.Nullable.unbox(Type.cast((!!jQueryEvent.detail ? (jQueryEvent.detail * -120) : jQueryEvent.wheelDelta), ss.Int32));
		var rate = ((j < 0) ? -1 : 1);
		this.$sonicManager.scale.x += rate;
		this.$sonicManager.scale.y += rate;
		var $t1 = this.$sonicManager.sonicLevel.tiles.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var tile = $t1.get_current();
				tile.clearCache();
			}
		}
		finally {
			$t1.dispose();
		}
		var $t2 = this.$sonicManager.sonicLevel.blocks.getEnumerator();
		try {
			while ($t2.moveNext()) {
				var block = $t2.get_current();
				block.clearCache();
			}
		}
		finally {
			$t2.dispose();
		}
		this.$sonicManager.preloadSprites(this.$sonicManager.scale, function() {
		}, function(a) {
		});
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
		this.$sonicManager.realScale = (!this.$fullscreenMode ? OurSonic.Point.$ctor1(1, 1) : OurSonic.Point.$ctor1(ss.Int32.div(ss.Int32.div(this.canvasWidth, 320), this.$sonicManager.scale.x), ss.Int32.div(ss.Int32.div(this.canvasHeight, 224), this.$sonicManager.scale.y)));
		this.$gameCanvas.domCanvas.attr('width', (this.$sonicManager.windowLocation.width * ((this.$sonicManager.currentGameState === 0) ? (this.$sonicManager.scale.x * this.$sonicManager.realScale.x) : 1)).toString());
		this.$gameCanvas.domCanvas.attr('height', (this.$sonicManager.windowLocation.height * ((this.$sonicManager.currentGameState === 0) ? (this.$sonicManager.scale.y * this.$sonicManager.realScale.y) : 1)).toString());
		//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
		//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));
		var screenOffset = ((this.$sonicManager.currentGameState === 0) ? OurSonic.Point.$ctor1(ss.Int32.div(this.canvasWidth, 2) - ss.Int32.div(this.$sonicManager.windowLocation.width * this.$sonicManager.scale.x * this.$sonicManager.realScale.x, 2), ss.Int32.div(this.canvasHeight, 2) - ss.Int32.div(this.$sonicManager.windowLocation.height * this.$sonicManager.scale.y * this.$sonicManager.realScale.y, 2)) : OurSonic.Point.$ctor1(0, 0));
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
	this.$mainCanvas = null;
	this.$myEngine = null;
	this.$objectManager = null;
	this.drawTickCount = 0;
	this.$imageLength = 0;
	this.$myStatus = null;
	this.$sonicSprites = null;
	this.$tickCount = 0;
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
	this.$objectManager = new OurSonic.ObjectManager(this);
	this.$objectManager.init();
	var scl = 2;
	this.scale = OurSonic.Point.$ctor1(scl, scl);
	this.realScale = OurSonic.Point.$ctor1(1, 1);
	this.$mainCanvas = gameCanvas;
	this.windowLocation = OurSonic.Constants.defaultWindowLocation(1, this.$mainCanvas, this.scale);
	this.bigWindowLocation = OurSonic.Constants.defaultWindowLocation(1, this.$mainCanvas, this.scale);
	this.bigWindowLocation.width = ss.Int32.trunc(this.bigWindowLocation.width * 1.8);
	this.bigWindowLocation.height = ss.Int32.trunc(this.bigWindowLocation.height * 1.8);
	this.animations = [];
	this.animationInstances = [];
	//jQuery.GetJson("Content/sprites/explosion.js", data => Animations.Add(new Animation("explosion", data)));
	this.showHeightMap = false;
	this.goodRing = OurSonic.Ring.$ctor(false);
	this.activeRings = [];
	this.forceResize = resize;
	this.background = null;
	this.currentGameState = 1;
	this.screenOffset = OurSonic.Point.$ctor1(ss.Int32.div(this.$mainCanvas.domCanvas.width(), 2) - ss.Int32.div(this.windowLocation.width * this.scale.x, 2), ss.Int32.div(this.$mainCanvas.domCanvas.height(), 2) - ss.Int32.div(this.windowLocation.height * this.scale.y, 2));
	this.uiManager = new OurSonic.UIManager(this, this.$mainCanvas, this.scale);
	//UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));
	this.clickState = 0;
	this.$tickCount = 0;
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
		this.uiManager.updateTitle(value);
		this.$myStatus = value;
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
					var $t1 = OurSonic.Ring.$ctor(true);
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
				if (this.waitingForTickContinue) {
					return;
				}
			}
			this.$tickCount++;
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
		var sl = this.spriteLoader = new OurSonic.SpriteLoader(completed, update);
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
		var numOfAnimations = 0;
		var sonicStep = this.spriteLoader.addStep('Sonic Sprites', Function.mkdel(this, function(sp1, done1) {
			var cci = this.spriteCache.sonicSprites;
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
		var localPoint = OurSonic.Point.$ctor1(0, 0);
		this.drawTickCount++;
		if (this.spriteLoader && !this.spriteLoader.tick() || this.loading) {
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
			this.windowLocation.x = ss.Int32.trunc(this.sonicToon.x) - ss.Int32.div(this.windowLocation.width, 2);
			this.windowLocation.y = ss.Int32.trunc(this.sonicToon.y) - ss.Int32.div(this.windowLocation.height, 2);
			this.bigWindowLocation.x = ss.Int32.trunc(this.sonicToon.x) - ss.Int32.div(this.bigWindowLocation.width, 2);
			this.bigWindowLocation.y = ss.Int32.trunc(this.sonicToon.y) - ss.Int32.div(this.bigWindowLocation.height, 2);
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
		}
		if (this.windowLocation.x < 0) {
			this.windowLocation.x = 0;
		}
		if (this.windowLocation.x > 128 * this.sonicLevel.levelWidth - this.windowLocation.width) {
			this.windowLocation.x = 128 * this.sonicLevel.levelWidth - this.windowLocation.width;
		}
		var offs = [];
		var w1 = ss.Int32.div(this.windowLocation.width, 128) + 2;
		var h1 = ss.Int32.div(this.windowLocation.height, 128) + 2;
		//cleaner with 2 padding on the widthheight
		for (var i = -1; i < w1; i++) {
			for (var j = -1; j < h1; j++) {
				offs.add(OurSonic.Point.$ctor1(i, j));
			}
		}
		var bounds = OurSonic.IntersectingRectangle.$ctor(-32, -32, this.windowLocation.width * this.scale.x + 32, this.windowLocation.height * this.scale.y + 32);
		if (this.sonicLevel.chunks && this.sonicLevel.chunks.length > 0) {
			if (this.sonicLevel.paletteItems[0]) {
				for (var k = 0; k < this.sonicLevel.paletteItems[0].length; k++) {
					var pal = this.sonicLevel.paletteItems[0][k];
					for (var j1 = 0; j1 <= pal.totalLength; j1 += pal.skipIndex) {
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
			var fxP = ss.Int32.trunc(this.windowLocation.x / 128);
			var fyP = ss.Int32.trunc(this.windowLocation.y / 128);
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
					if (anni) {
						anni.animatedTick();
					}
					if (!chunk) {
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
			var $t2 = this.sonicLevel.objects.getEnumerator();
			try {
				while ($t2.moveNext()) {
					var o = $t2.get_current();
					localPoint.x = o.x;
					localPoint.y = o.y;
					if (o.dead || OurSonic.IntersectingRectangle.intersects(this.bigWindowLocation, localPoint)) {
						o.draw(canvas, (o.x - this.windowLocation.x) * this.scale.x, (o.y - this.windowLocation.y) * this.scale.y, this.scale, this.showHeightMap);
					}
				}
			}
			finally {
				$t2.dispose();
			}
			var $t3 = this.animationInstances.getEnumerator();
			try {
				while ($t3.moveNext()) {
					var ano = $t3.get_current();
					ano.draw(canvas, -this.windowLocation.x, -this.windowLocation.y, this.scale);
				}
			}
			finally {
				$t3.dispose();
			}
			for (var i1 = this.activeRings.length - 1; i1 >= 0; i1--) {
				var ac = this.activeRings[i1];
				localPoint.x = ac.x - this.windowLocation.x;
				localPoint.y = ac.y - this.windowLocation.y;
				OurSonic.Ring.draw(ac, canvas, localPoint, this.scale);
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
			var $t4 = offs.getEnumerator();
			try {
				while ($t4.moveNext()) {
					var off1 = $t4.get_current();
					var _xP1 = fxP + off1.x;
					var _yP1 = fyP + off1.y;
					var _yPreal1 = fyP + off1.y;
					if (_xP1 < 0 || _xP1 >= this.sonicLevel.levelWidth) {
						continue;
					}
					_yP1 = OurSonic.Help.mod(_yP1, this.sonicLevel.levelHeight);
					var chunk1 = this.sonicLevel.chunks[this.sonicLevel.chunkMap[_xP1][_yP1]];
					if (!chunk1) {
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
						var fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + chunk1.index + ' ' + this.scale.y + ' ' + this.scale.x];
						if (!fd) {
							var md = chunk1;
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
			}
			finally {
				$t4.dispose();
			}
		}
		var $t5 = this.sonicLevel.rings.getEnumerator();
		try {
			while ($t5.moveNext()) {
				var r = $t5.get_current();
				switch (this.currentGameState) {
					case 0: {
						break;
					}
					case 1: {
						if (OurSonic.IntersectingRectangle.intersects(this.bigWindowLocation, r)) {
							OurSonic.Ring.draw(this.goodRing, canvas, OurSonic.Point.negate(r, this.windowLocation), this.scale);
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
		}
		finally {
			$t5.dispose();
		}
		canvas.restore();
		if (this.currentGameState === 0) {
			this.sonicToon.drawUI(canvas, OurSonic.Point.$ctor1(this.screenOffset.x, this.screenOffset.y), this.scale);
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
			this.sonicLevel.rings[n] = OurSonic.Ring.$ctor(true);
			this.sonicLevel.rings[n].x = sonicLevel.Rings[n].X;
			this.sonicLevel.rings[n].y = sonicLevel.Rings[n].Y;
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
			for (var n1 = 0; n1 < mj.length; n1++) {
				mfc[n1 % 8][ss.Int32.div(n1, 8)] = mj[n1];
			}
			this.sonicLevel.tiles[j] = new OurSonic.Drawing.Tile(mfc);
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
					for (var l1 = 0; l1 < tiles1.length; l1++) {
						var value1 = fcc[j1][l1];
						mjc.add(value1 >> 4);
						mjc.add(value1 & 15);
					}
					var mfc1 = new Array(8);
					for (var o1 = 0; o1 < 8; o1++) {
						mfc1[o1] = new Array(8);
					}
					for (var n2 = 0; n2 < mjc.length; n2++) {
						mfc1[n2 % 8][ss.Int32.div(n2, 8)] = mjc[n2];
					}
					var tile = new OurSonic.Drawing.Tile(mfc1);
					tile.isAnimated = true;
					tile.index = j1 * 10000 + jc;
					this.sonicLevel.animatedFiles[jc][j1] = tile;
				}
			}
		}
		this.sonicLevel.blocks = [];
		for (var j2 = 0; j2 < sonicLevel.Blocks.length; j2++) {
			var fc1 = sonicLevel.Blocks[j2];
			var mj1 = new OurSonic.Drawing.TilePiece();
			mj1.index = j2;
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
				this.sonicLevel.heightMaps[i1] = new OurSonic.HeightMask(sonicLevel.HeightMaps[i1]);
			}
		}
		this.sonicLevel.chunks = [];
		for (var j3 = 0; j3 < sonicLevel.Chunks.length; j3++) {
			var fc2 = sonicLevel.Chunks[j3];
			var mj2 = new OurSonic.Drawing.TileChunk();
			mj2.index = j3;
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
				$t5.solid1 = fc2[p1].Solid1;
				$t5.solid2 = fc2[p1].Solid2;
				$t5.xFlip = fc2[p1].XFlip;
				$t5.yFlip = fc2[p1].YFlip;
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
////////////////////////////////////////////////////////////////////////////////
// OurSonic.UIManager
OurSonic.UIManager = function(sonicManager, mainCanvas, scale) {
	this.$mainCanvas = null;
	this.$scale = null;
	this.$sonicManager = null;
	this.dragger = null;
	this.data = null;
	this.$sonicManager = sonicManager;
	this.$mainCanvas = mainCanvas;
	this.$scale = scale;
	this.dragger = new OurSonic.Dragger(function(xsp, ysp) {
		sonicManager.windowLocation.x += ss.Int32.trunc(xsp);
		sonicManager.windowLocation.y += ss.Int32.trunc(ysp);
		sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;
		sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;
	});
};
OurSonic.UIManager.prototype = {
	onClick: function(e) {
		this.$sonicManager.uiManager.dragger.click(e);
		return false;
	},
	onMouseMove: function(e) {
		if (this.dragger.isDragging(e)) {
			this.dragger.mouseMove(e);
			return false;
		}
		this.dragger.mouseMove(e);
		return false;
	},
	onMouseUp: function(e) {
		this.dragger.mouseUp(e);
	},
	onMouseScroll: function(e) {
		return false;
	},
	onKeyDown: function(jQueryEvent) {
	},
	draw: function(gameCanvas) {
		this.dragger.tick();
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
OurSonic.Drawing.Tile.registerClass('OurSonic.Drawing.Tile', Object);
OurSonic.Drawing.TileChunk.registerClass('OurSonic.Drawing.TileChunk', Object);
OurSonic.Drawing.TileItem.registerClass('OurSonic.Drawing.TileItem', Object);
OurSonic.Drawing.TilePiece.registerClass('OurSonic.Drawing.TilePiece', Object);
OurSonic.Extensions.registerClass('OurSonic.Extensions', Object);
OurSonic.HeightMask.registerClass('OurSonic.HeightMask', Object);
OurSonic.Help.registerClass('OurSonic.Help', Object);
OurSonic.ObjectManager.registerClass('OurSonic.ObjectManager', Object);
OurSonic.Page.registerClass('OurSonic.Page', Object);
OurSonic.PaletteItem.registerClass('OurSonic.PaletteItem', Object);
OurSonic.PaletteItemPieces.registerClass('OurSonic.PaletteItemPieces', Object);
OurSonic.Point.registerClass('OurSonic.Point', Object);
OurSonic.Rectangle.registerClass('OurSonic.Rectangle');
OurSonic.Ring.registerClass('OurSonic.Ring');
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
OurSonic.SonicObject.registerClass('OurSonic.SonicObject', Object);
OurSonic.SpriteCache.registerClass('OurSonic.SpriteCache', Object);
OurSonic.SpriteCacheIndexes.registerClass('OurSonic.SpriteCacheIndexes', Object);
OurSonic.SpriteLoader.registerClass('OurSonic.SpriteLoader', Object);
OurSonic.SpriteLoaderStep.registerClass('OurSonic.SpriteLoaderStep', Object);
OurSonic.UIManager.registerClass('OurSonic.UIManager', Object);
OurSonic.UIManagerData.registerClass('OurSonic.UIManagerData', Object);
OurSonic.UIManagerDataIndexes.registerClass('OurSonic.UIManagerDataIndexes', Object);
OurSonic.Watcher.registerClass('OurSonic.Watcher', Object);
OurSonic.IntersectingRectangle.registerClass('OurSonic.IntersectingRectangle');
OurSonic.HeightMask.colors = ['', 'rgba(255,98,235,0.6)', 'rgba(24,218,235,0.6)', 'rgba(24,98,235,0.6)'];
OurSonic.Help.cos_table = [1, 0.9997, 0.9988, 0.99729, 0.99518, 0.99248, 0.98918, 0.98528, 0.98079, 0.9757, 0.97003, 0.96378, 0.95694, 0.94953, 0.94154, 0.93299, 0.92388, 0.91421, 0.90399, 0.89322, 0.88192, 0.87009, 0.85773, 0.84485, 0.83147, 0.81758, 0.80321, 0.78835, 0.77301, 0.75721, 0.74095, 0.72425, 0.70711, 0.68954, 0.67156, 0.65317, 0.63439, 0.61523, 0.5957, 0.57581, 0.55557, 0.535, 0.5141, 0.4929, 0.4714, 0.44961, 0.42755, 0.40524, 0.38268, 0.3599, 0.33689, 0.31368, 0.29028, 0.26671, 0.24298, 0.2191, 0.19509, 0.17096, 0.14673, 0.12241, 0.09802, 0.07356, 0.04907, 0.02454, 0, -0.02454, -0.04907, -0.07356, -0.09802, -0.12241, -0.14673, -0.17096, -0.19509, -0.2191, -0.24298, -0.26671, -0.29028, -0.31368, -0.33689, -0.3599, -0.38268, -0.40524, -0.42755, -0.44961, -0.4714, -0.4929, -0.5141, -0.535, -0.55557, -0.57581, -0.5957, -0.61523, -0.63439, -0.65317, -0.67156, -0.68954, -0.70711, -0.72425, -0.74095, -0.75721, -0.77301, -0.78835, -0.80321, -0.81758, -0.83147, -0.84485, -0.85773, -0.87009, -0.88192, -0.89322, -0.90399, -0.91421, -0.92388, -0.93299, -0.94154, -0.94953, -0.95694, -0.96378, -0.97003, -0.9757, -0.98079, -0.98528, -0.98918, -0.99248, -0.99518, -0.99729, -0.9988, -0.9997, -1, -0.9997, -0.9988, -0.99729, -0.99518, -0.99248, -0.98918, -0.98528, -0.98079, -0.9757, -0.97003, -0.96378, -0.95694, -0.94953, -0.94154, -0.93299, -0.92388, -0.91421, -0.90399, -0.89322, -0.88192, -0.87009, -0.85773, -0.84485, -0.83147, -0.81758, -0.80321, -0.78835, -0.77301, -0.75721, -0.74095, -0.72425, -0.70711, -0.68954, -0.67156, -0.65317, -0.63439, -0.61523, -0.5957, -0.57581, -0.55557, -0.535, -0.5141, -0.4929, -0.4714, -0.44961, -0.42756, -0.40524, -0.38268, -0.3599, -0.33689, -0.31368, -0.29028, -0.26671, -0.24298, -0.2191, -0.19509, -0.17096, -0.14673, -0.12241, -0.09802, -0.07356, -0.04907, -0.02454, 0, 0.02454, 0.04907, 0.07356, 0.09802, 0.12241, 0.14673, 0.17096, 0.19509, 0.2191, 0.24298, 0.26671, 0.29028, 0.31368, 0.33689, 0.3599, 0.38268, 0.40524, 0.42756, 0.44961, 0.4714, 0.4929, 0.5141, 0.535, 0.55557, 0.57581, 0.5957, 0.61523, 0.63439, 0.65317, 0.67156, 0.68954, 0.70711, 0.72425, 0.74095, 0.75721, 0.77301, 0.78835, 0.80321, 0.81758, 0.83147, 0.84485, 0.85773, 0.87009, 0.88192, 0.89322, 0.90399, 0.91421, 0.92388, 0.93299, 0.94154, 0.94953, 0.95694, 0.96378, 0.97003, 0.9757, 0.98079, 0.98528, 0.98918, 0.99248, 0.99518, 0.99729, 0.9988, 0.9997];
OurSonic.SonicManager.instance = null;
OurSonic.SonicManager.$base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
OurSonic.SonicManager.$base64Inv = null;
OurSonic.SonicManager.$base64Inv = {};
for (var i = 0; i < OurSonic.SonicManager.$base64chars.length; i++) {
	OurSonic.SonicManager.$base64Inv[OurSonic.SonicManager.$base64chars[i]] = i;
}
$(function(){new OurSonic.Page();});
