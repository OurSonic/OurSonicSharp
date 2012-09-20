
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
	this.index = null;
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
		if (ss.isValue(this.index) && this.index.charAt(0) !== 'A') {
			if (!this.$canAnimate) {
				return false;
			}
			var an = this.$willAnimate;
			if (ss.isValue(this.$willAnimate)) {
				var anin = an.animationTileIndex;
				var ind = animationFrame;
				var frame = an.frames[ind];
				if (ss.isNullOrUndefined(frame)) {
					frame = an.frames[0];
				}
				var file = OurSonic.SonicManager.instance.sonicLevel.animatedFiles[an.animationFile];
				var va = file[frame.startingTileIndex + (parseInt(this.index) - anin)];
				if (ss.isValue(va)) {
					if (canvas.fillStyle !== 'rbga(255,255,255,255)') {
						canvas.fillStyle = 'rbga(255,255,255,255)';
					}
					va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
					return true;
				}
				return false;
			}
			for (var i = 0; i < OurSonic.SonicManager.instance.sonicLevel.get_Animations().length; i++) {
				var acn = OurSonic.SonicManager.instance.sonicLevel.get_Animations()[i];
				var anin1 = acn.animationTileIndex;
				var num = acn.numberOfTiles;
				if (parseInt(this.index) >= anin1 && parseInt(this.index) < anin1 + num) {
					this.$willAnimate = acn;
					var ind1 = animationFrame;
					var frame1 = acn.frames[ind1];
					if (ss.isNullOrUndefined(frame1)) {
						frame1 = acn.frames[0];
					}
					var file1 = OurSonic.SonicManager.instance.sonicLevel.animatedFiles[acn.animationFile];
					var va1 = file1[frame1.startingTileIndex + (parseInt(this.index) - anin1)];
					if (ss.isValue(va1)) {
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
		if (ss.isNullOrUndefined(this.curPaletteIndexes)) {
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
				if (ss.isValue(pm)) {
					var animatedIndex = 0;
					if (ss.isValue(this.animated) && ss.isValue(this.animated[j * len1 + i])) {
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
				if (ss.Nullable.eq(anni.lastAnimatedFrame, null)) {
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
	this.index = 0;
	this.$1$Solid1Field = 0;
	this.$1$Solid2Field = 0;
	this.$cx = 8 * OurSonic.SonicManager.instance.scale.x * 2;
	this.$cy = 8 * OurSonic.SonicManager.instance.scale.y * 2;
	this.image = {};
};
OurSonic.Drawing.TilePiece.prototype = {
	get_solid1: function() {
		return this.$1$Solid1Field;
	},
	set_solid1: function(value) {
		this.$1$Solid1Field = value;
	},
	get_solid2: function() {
		return this.$1$Solid2Field;
	},
	set_solid2: function(value) {
		this.$1$Solid2Field = value;
	},
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
		var fd = this.$getCache(layer, scale, drawOrderIndex, animatedIndex, OurSonic.SonicManager.instance.sonicLevel.palAn);
		if (ss.isNullOrUndefined(fd)) {
			var ac = OurSonic.Help.defaultCanvas(this.$cx, this.$cy);
			var sX = 8 * scale.x;
			var sY = 8 * scale.y;
			var i = 0;
			var localPoint = OurSonic.Point.$ctor1(0, 0);
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
		var val = (drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000).toString();
		if (ss.isValue(this.animatedFrames)) {
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
		var val = (drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000).toString();
		if (ss.isValue(this.animatedFrames)) {
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
		if (ss.isNullOrUndefined(this.image[val])) {
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
	this.$1$WidthField = 0;
	this.$1$HeightField = 0;
	this.$1$ItemsField = null;
	this.$1$IntegerField = 0;
	this.$1$IndexField = 0;
	this.set_items(heightMap);
	this.set_width(16);
	this.set_height(16);
	this.set_integer(-1000);
};
OurSonic.HeightMask.prototype = {
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
	get_items: function() {
		return this.$1$ItemsField;
	},
	set_items: function(value) {
		this.$1$ItemsField = value;
	},
	get_integer: function() {
		return this.$1$IntegerField;
	},
	set_integer: function(value) {
		this.$1$IntegerField = value;
	},
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
		this.get_items()[jx] = 16 - jy;
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
		var fd = OurSonic.SonicManager.instance.spriteCache.heightMaps[this.get_index()];
		if (ss.isValue(fd)) {
			if (OurSonic.Help.loaded(fd)) {
				canvas.drawImage(fd, pos.x, pos.y);
			}
		}
		else if (solid > 0) {
			for (var x = 0; x < 16; x++) {
				for (var y = 0; y < 16; y++) {
					var jx = 0;
					var jy = 0;
					if (this.$itemsGood(x, y)) {
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
	},
	$itemsGood: function(x, y) {
		if (this.get_items()[x] < 0) {
			return Math.abs(this.get_items()[x]) >= y;
		}
		return this.get_items()[x] >= 16 - y;
	},
	get_index: function() {
		return this.$1$IndexField;
	},
	set_index: function(value) {
		this.$1$IndexField = value;
	}
};
OurSonic.HeightMask.op_Implicit$1 = function(d) {
	var m = ((d === 0) ? 0 : 16);
	return new OurSonic.HeightMask([m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m]);
	//16 m's
};
OurSonic.HeightMask.op_Implicit = function(d) {
	if (d.get_integer() !== -1000) {
		return d.get_integer();
	}
	var good = d.get_items()[0];
	for (var i = 0; i < d.get_items().length; i++) {
		if (d.get_items()[i] !== good) {
			good = -999;
			break;
		}
	}
	d.set_integer(good);
	return good;
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
	var colors = [];
	for (var f = 0; f < data.length; f += 4) {
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
	if (ss.isValue(OurSonic.SonicManager.instance.spriteCache.rings)) {
		sprites = OurSonic.SonicManager.instance.spriteCache.rings;
	}
	else {
		throw new ss.Exception('bad ring animation');
	}
	var sps = sprites[$this.animationIndex * 200 + scale.y * 100 + scale.x];
	if (ss.isNullOrUndefined(sps)) {
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
	return $this;
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
	},
	hit: function(x, y) {
	},
	debug: function() {
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
		var keycode = ss.Nullable.unbox(Type.cast(a.keyCode, ss.Int32));
		for (var i = 49; i < 59; i++) {
			if (keycode === i) {
				this.$sonicManager.load(Type.cast(window.levelData[i - 49], String));
				this.$sonicManager.windowLocation.x = 0;
				this.$sonicManager.windowLocation.y = 0;
				this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.x;
				this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
				return;
			}
		}
		var sca = 2;
		if (keycode === 37) {
			this.$sonicManager.windowLocation.x -= ss.Int32.div(128, sca);
			this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.x;
		}
		else if (keycode === 38) {
			this.$sonicManager.windowLocation.y -= ss.Int32.div(128, sca);
			this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
		}
		else if (keycode === 39) {
			this.$sonicManager.windowLocation.x += ss.Int32.div(128, sca);
			this.$sonicManager.bigWindowLocation.x = this.$sonicManager.windowLocation.x;
		}
		else if (keycode === 40) {
			this.$sonicManager.windowLocation.y += ss.Int32.div(128, sca);
			this.$sonicManager.bigWindowLocation.y = this.$sonicManager.windowLocation.y;
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
	KeyboardJS.bind.key('2', Function.mkdel(this, function() {
		this.$sonicManager.indexedPalette++;
		var $t1 = this.$sonicManager.sonicLevel.blocks.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var tilePiece = $t1.get_current();
				tilePiece.image = {};
			}
		}
		finally {
			$t1.dispose();
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
	KeyboardJS.bind.key('e', Function.mkdel(this, function() {
		this.$sonicManager.sonicLevel.curHeightMap = !this.$sonicManager.sonicLevel.curHeightMap;
	}), function() {
	});
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
		this.$sonicManager.realScale = (!this.$fullscreenMode ? OurSonic.Point.$ctor1(1, 1) : OurSonic.Point.$ctor1(ss.Int32.div(ss.Int32.div(this.canvasWidth, 320), this.$sonicManager.scale.x), ss.Int32.div(ss.Int32.div(this.canvasHeight, 224), this.$sonicManager.scale.y)));
		this.$gameCanvas.domCanvas.attr('width', (this.$sonicManager.windowLocation.width * (ss.isValue(this.$sonicManager.sonicToon) ? (this.$sonicManager.scale.x * this.$sonicManager.realScale.x) : 1)).toString());
		this.$gameCanvas.domCanvas.attr('height', (this.$sonicManager.windowLocation.height * (ss.isValue(this.$sonicManager.sonicToon) ? (this.$sonicManager.scale.y * this.$sonicManager.realScale.y) : 1)).toString());
		//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
		//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));
		var screenOffset = (ss.isValue(this.$sonicManager.sonicToon) ? OurSonic.Point.$ctor1(ss.Int32.div(this.canvasWidth, 2) - ss.Int32.div(this.$sonicManager.windowLocation.width * this.$sonicManager.scale.x * this.$sonicManager.realScale.x, 2), ss.Int32.div(this.canvasHeight, 2) - ss.Int32.div(this.$sonicManager.windowLocation.height * this.$sonicManager.scale.y * this.$sonicManager.realScale.y, 2)) : OurSonic.Point.$ctor1(0, 0));
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
		var localPoint = OurSonic.Point.$ctor1(0, 0);
		this.drawTickCount++;
		if (ss.isValue(this.spriteLoader) && !this.spriteLoader.tick() || this.loading) {
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
				offs.add(OurSonic.Point.$ctor1(i, j));
			}
		}
		var bounds = OurSonic.IntersectingRectangle.$ctor(-32, -32, this.windowLocation.width * this.scale.x + 32, this.windowLocation.height * this.scale.y + 32);
		if (ss.isValue(this.sonicLevel.chunks) && this.sonicLevel.chunks.length > 0) {
			if (ss.isValue(this.sonicLevel.paletteItems[0])) {
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
					if (ss.isValue(anni)) {
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
						var fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + chunk1.index + ' ' + this.scale.y + ' ' + this.scale.x];
						if (ss.isNullOrUndefined(fd)) {
							var md = chunk1;
							var posj1 = OurSonic.Point.$ctor1(0, 0);
							var canv = OurSonic.Help.defaultCanvas(128 * this.scale.x, 128 * this.scale.y);
							var ctx = canv.context;
							this.$myEngine.clear(canv);
							for (var _y = 0; _y < 8; _y++) {
								for (var _x = 0; _x < 8; _x++) {
									var tp = md.tilePieces[_x][_y];
									var solid = (this.sonicLevel.curHeightMap ? tp.get_solid1() : tp.get_solid2());
									var hd = this.sonicLevel.heightMaps[(this.sonicLevel.curHeightMap ? this.sonicLevel.collisionIndexes1[tp.block] : this.sonicLevel.collisionIndexes2[tp.block])];
									var __x = _x;
									var __y = _y;
									var vangle = 0;
									var posm = OurSonic.Point.$ctor1(posj1.x + __x * 16 * this.scale.x, posj1.y + __y * 16 * this.scale.y);
									if (ss.isNullOrUndefined(hd)) {
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
		for (var i = 0; i < sonLevel.get_Animations().length; i++) {
			var an = sonLevel.get_Animations()[i];
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
			this.sonicLevel.tiles[j].index = j.toString();
		}
		var acs = this.sonicLevel.animatedChunks = [];
		if (ss.isValue(sonicLevel.AnimatedFiles)) {
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
					tile.index = 'A' + j1 + '_' + jc;
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
				$t5.set_solid1(fc2[p1].Solid1);
				$t5.set_solid2(fc2[p1].Solid2);
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
					if (ss.isValue(pm)) {
						for (var ci = 0; ci < pm.tiles.length; ci++) {
							var mjc1 = pm.tiles[ci];
							if (ss.isValue(this.sonicLevel.tiles[mjc1._Tile])) {
								var fa = this.$containsAnimatedTile(mjc1._Tile, this.sonicLevel);
								if (ss.isValue(fa)) {
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
		for (var kd = 0; kd < this.sonicLevel.blocks.length; kd++) {
			var dj = this.sonicLevel.blocks[kd];
			dj.animatedFrames = [];
			for (var index = 0; index < dj.tiles.length; index++) {
				var mj3 = dj.tiles[index];
				if (ss.isValue(this.sonicLevel.tiles[mj3._Tile])) {
					var pl = this.sonicLevel.tiles[mj3._Tile].getAllPaletteIndexes();
					if (ss.isValue(this.sonicLevel.paletteItems[0])) {
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
											dj.animatedFrames.add(k1);
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
	this.rings = [];
	this.tileChunks = [];
	this.tilepieces = {};
	this.tiles = [];
	this.sonicSprites = [];
	this.heightMaps = [];
	this.heightMapChunks = {};
	this.indexes = new OurSonic.SpriteCacheIndexes();
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
	this.$stepIndex = 0;
	this.$steps = [];
	this.$done = false;
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
		if (ss.isNullOrUndefined(stp)) {
			return true;
		}
		if (ss.Int32.div(this.$tickIndex % stp.get_iterations().length, 12) === 0) {
			this.$myUpdate('Caching: ' + stp.get_title() + ' ' + ss.Int32.div(this.$tickIndex, stp.get_iterations().length) * 100 + '%');
		}
		if (stp.get_iterations().length > this.$tickIndex) {
			stp.get_method()(stp.get_iterations()[this.$tickIndex++], Function.mkdel(this, function() {
				if (stp.get_onFinish()()) {
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
		this.$steps[this.$stepIndex].get_iterations().add(i);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SpriteLoaderStep
OurSonic.SpriteLoaderStep = function(title, method, onFinish) {
	this.$1$TitleField = null;
	this.$1$MethodField = null;
	this.$1$OnFinishField = null;
	this.$1$IterationsField = null;
	this.set_title(title);
	this.set_method(method);
	this.set_onFinish(onFinish);
	this.set_iterations([]);
};
OurSonic.SpriteLoaderStep.prototype = {
	get_title: function() {
		return this.$1$TitleField;
	},
	set_title: function(value) {
		this.$1$TitleField = value;
	},
	get_method: function() {
		return this.$1$MethodField;
	},
	set_method: function(value) {
		this.$1$MethodField = value;
	},
	get_onFinish: function() {
		return this.$1$OnFinishField;
	},
	set_onFinish: function(value) {
		this.$1$OnFinishField = value;
	},
	get_iterations: function() {
		return this.$1$IterationsField;
	},
	set_iterations: function(value) {
		this.$1$IterationsField = value;
	}
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
OurSonic.ObjectManager.registerClass('OurSonic.ObjectManager', Object);
OurSonic.Page.registerClass('OurSonic.Page', Object);
OurSonic.PaletteItem.registerClass('OurSonic.PaletteItem', Object);
OurSonic.PaletteItemPieces.registerClass('OurSonic.PaletteItemPieces', Object);
OurSonic.Point.registerClass('OurSonic.Point', Object);
OurSonic.Rectangle.registerClass('OurSonic.Rectangle');
OurSonic.Ring.registerClass('OurSonic.Ring');
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
