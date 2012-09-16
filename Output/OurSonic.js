
Type.registerNamespace('OurSonic');
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Animation
OurSonic.Animation = function(name, data) {
	this.$1$LastAnimatedIndexField = 0;
	this.$1$LastAnimatedFrameField = null;
	this.$1$FramesField = null;
	this.$1$AutomatedTimingField = 0;
};
OurSonic.Animation.prototype = {
	get_lastAnimatedIndex: function() {
		return this.$1$LastAnimatedIndexField;
	},
	set_lastAnimatedIndex: function(value) {
		this.$1$LastAnimatedIndexField = value;
	},
	get_lastAnimatedFrame: function() {
		return this.$1$LastAnimatedFrameField;
	},
	set_lastAnimatedFrame: function(value) {
		this.$1$LastAnimatedFrameField = value;
	},
	get_frames: function() {
		return this.$1$FramesField;
	},
	set_frames: function(value) {
		this.$1$FramesField = value;
	},
	get_automatedTiming: function() {
		return this.$1$AutomatedTimingField;
	},
	set_automatedTiming: function(value) {
		this.$1$AutomatedTimingField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.AnimationFrame
OurSonic.AnimationFrame = function() {
	this.$1$TicksField = 0;
};
OurSonic.AnimationFrame.prototype = {
	get_ticks: function() {
		return this.$1$TicksField;
	},
	set_ticks: function(value) {
		this.$1$TicksField = value;
	}
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
			return OurSonic.IntersectingRectangle.$ctor(0, 0, 320, 224, OurSonic.Constants.intersects);
		}
		case 1: {
			var x = 0;
			var y = 0;
			if (ss.isValue(OurSonic.SonicManager.instance.get_sonicLevel()) && ss.isValue(OurSonic.SonicManager.instance.get_sonicLevel().get_startPositions()) && ss.isValue(OurSonic.SonicManager.instance.get_sonicLevel().get_startPositions()[0])) {
				x = OurSonic.SonicManager.instance.get_sonicLevel().get_startPositions()[0].x - 256;
				y = OurSonic.SonicManager.instance.get_sonicLevel().get_startPositions()[0].y - 256;
			}
			return OurSonic.IntersectingRectangle.$ctor(x, y, canvas.domCanvas.width(), canvas.domCanvas.height(), OurSonic.Constants.intersects);
		}
	}
	return null;
};
OurSonic.Constants.intersects = function(rect, p) {
	return rect.x < p.x && rect.x + rect.width > p.x && rect.y < p.y && rect.y + rect.height > p.y;
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
	this.$1$_TileField = 0;
	this.$1$PriorityField = false;
	this.$1$XFlipField = false;
	this.$1$YFlipField = false;
	this.$1$PaletteField = 0;
	this.$1$CurPaletteIndexesField = null;
	this.$1$SpritesField = null;
	this.$1$ColorsField = null;
	this.$1$ShowOutlineField = false;
	this.$1$IndexField = 0;
	var fm = new Array(colors.length);
	for (var i = 0; i < colors.length; i++) {
		for (var j = 0; j < colors[i].length; j++) {
			fm[i][j] = colors[i][j];
		}
	}
	this.set_colors(fm);
	this.set_sprites([]);
	this.set_curPaletteIndexes(null);
};
OurSonic.Drawing.Tile.prototype = {
	get__Tile: function() {
		return this.$1$_TileField;
	},
	set__Tile: function(value) {
		this.$1$_TileField = value;
	},
	get_priority: function() {
		return this.$1$PriorityField;
	},
	set_priority: function(value) {
		this.$1$PriorityField = value;
	},
	get_xFlip: function() {
		return this.$1$XFlipField;
	},
	set_xFlip: function(value) {
		this.$1$XFlipField = value;
	},
	get_yFlip: function() {
		return this.$1$YFlipField;
	},
	set_yFlip: function(value) {
		this.$1$YFlipField = value;
	},
	get_palette: function() {
		return this.$1$PaletteField;
	},
	set_palette: function(value) {
		this.$1$PaletteField = value;
	},
	get_curPaletteIndexes: function() {
		return this.$1$CurPaletteIndexesField;
	},
	set_curPaletteIndexes: function(value) {
		this.$1$CurPaletteIndexesField = value;
	},
	get_sprites: function() {
		return this.$1$SpritesField;
	},
	set_sprites: function(value) {
		this.$1$SpritesField = value;
	},
	get_colors: function() {
		return this.$1$ColorsField;
	},
	set_colors: function(value) {
		this.$1$ColorsField = value;
	},
	get_showOutline: function() {
		return this.$1$ShowOutlineField;
	},
	set_showOutline: function(value) {
		this.$1$ShowOutlineField = value;
	},
	get_index: function() {
		return this.$1$IndexField;
	},
	set_index: function(value) {
		this.$1$IndexField = value;
	},
	draw: function(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame) {
		if (this.$checkGood(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame)) {
			return;
		}
		var cx = this.get_colors().length * scale.x;
		var cy = this.get_colors().length * scale.y;
		var j = OurSonic.Help.defaultCanvas(cx, cy);
		if (pos.x < 0 || pos.y < 0) {
			return;
		}
		var oPos = OurSonic.Point.$ctor(0, 0);
		if (xflip) {
			oPos.x = -this.get_colors().length * scale.x;
			j.context.scale(-1, 1);
		}
		if (yflip) {
			oPos.y = -this.get_colors().length * scale.y;
			j.context.scale(1, -1);
		}
		for (var i = 0; i < this.get_colors().length; i++) {
			for (var jf = 0; jf < this.get_colors()[i].length; jf++) {
				var gj = this.get_colors()[i][jf];
				if (ss.Nullable.eq(gj, null)) {
					continue;
				}
				var m = OurSonic.SonicManager.instance.get_sonicLevel().get_palette()[(palette + OurSonic.SonicManager.instance.get_indexedPalette()) % OurSonic.SonicManager.instance.get_sonicLevel().get_palette().length][gj];
				if (!!!ss.referenceEquals(j.context.fillStyle, '#' + m)) {
					j.context.fillStyle = '#' + m;
				}
				j.context.fillRect(oPos.x + i * scale.x, oPos.y + jf * scale.y, scale.x, scale.y);
			}
		}
		var fd = j.domCanvas;
		canvas.drawImage(fd[0], pos.x, pos.y);
		if (this.get_showOutline()) {
			canvas.strokeStyle = '#DD0033';
			canvas.lineWidth = 3;
			canvas.strokeRect(pos.x, pos.y, 8 * scale.x, 8 * scale.y);
		}
	},
	$checkGood: function(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame) {
		if (this.$index[0] !== 65) {
			if (ss.isNullOrUndefined(this.$willAnimate)) {
				return false;
			}
			var an = this.$willAnimate;
		}
		return false;
		//
		//                            if (this.index[0] != 'A') {
		//
		//                            if (this.willAnimate === false) return false;
		//
		//                            
		//
		//                            if (this.willAnimate != undefined) {
		//
		//                            var an = this.willAnimate;
		//
		//                            var anin = an.AnimationTileIndex;
		//
		//                            
		//
		//                            if (sonicManager.CACHING) return true;
		//
		//                            
		//
		//                            var ind = animationFrame;
		//
		//                            
		//
		//                            var frame = an.Frames[ind];
		//
		//                            if (!frame) frame = an.Frames[0];
		//
		//                            var file = sonicManager.SonicLevel.AnimatedFiles[an.AnimationFile];
		//
		//                            var va = file[frame.StartingTileIndex + (this.index - anin)];
		//
		//                            if (va) {
		//
		//                            if (canvas.fillStyle != "rbga(255,255,255,255)")
		//
		//                            canvas.fillStyle = "rbga(255,255,255,255)";
		//
		//                            va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
		//
		//                            return true;
		//
		//                            }
		//
		//                            return false;
		//
		//                            }
		//
		//                            for (var i = 0; i < sonicManager.SonicLevel.Animations.length; i++) {
		//
		//                            var an = sonicManager.SonicLevel.Animations[i];
		//
		//                            var anin = an.AnimationTileIndex;
		//
		//                            var num = an.NumberOfTiles;
		//
		//                            if (this.index >= anin && this.index < anin + num) {
		//
		//                            if (sonicManager.CACHING) return true;
		//
		//                            this.willAnimate = an;
		//
		//                            var ind = animationFrame;
		//
		//                            var frame = an.Frames[ind];
		//
		//                            if (!frame) frame = an.Frames[0];
		//
		//                            var file = sonicManager.SonicLevel.AnimatedFiles[an.AnimationFile];
		//
		//                            var va = file[frame.StartingTileIndex + (this.index - anin)];
		//
		//                            if (va) {
		//
		//                            if (canvas.fillStyle != "rbga(255,255,255,255)")
		//
		//                            canvas.fillStyle = "rbga(255,255,255,255)";
		//
		//                            va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
		//
		//                            return true;
		//
		//                            }
		//
		//                            
		//
		//                            }
		//
		//                            }
		//
		//                            this.willAnimate = false;
		//
		//                            }
		//
		//                            return false;
	},
	$changeColor: function(x, y, color) {
		this.get_colors()[x][y] = color;
		this.set_sprites([]);
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileChunk
OurSonic.Drawing.TileChunk = function() {
	this.$1$isOnlyBackgroundField = null;
	this.$1$emptyField = null;
	this.$1$SpritesField = null;
	this.$1$HLayersField = null;
	this.$1$TilePiecesField = null;
	this.$1$AnimatedField = null;
	this.$1$IndexField = 0;
	this.set_hLayers([]);
	this.set_sprites([]);
	this.set_isOnlyBackground(null);
};
OurSonic.Drawing.TileChunk.prototype = {
	get_isOnlyBackground: function() {
		return this.$1$isOnlyBackgroundField;
	},
	set_isOnlyBackground: function(value) {
		this.$1$isOnlyBackgroundField = value;
	},
	get_empty: function() {
		return this.$1$emptyField;
	},
	set_empty: function(value) {
		this.$1$emptyField = value;
	},
	get_sprites: function() {
		return this.$1$SpritesField;
	},
	set_sprites: function(value) {
		this.$1$SpritesField = value;
	},
	get_hLayers: function() {
		return this.$1$HLayersField;
	},
	set_hLayers: function(value) {
		this.$1$HLayersField = value;
	},
	get_tilePieces: function() {
		return this.$1$TilePiecesField;
	},
	set_tilePieces: function(value) {
		this.$1$TilePiecesField = value;
	},
	getBlock: function(x, y) {
		return OurSonic.SonicManager.instance.get_sonicLevel().get_blocks()[this.get_tilePieces()[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)].get_block()];
	},
	getTilePiece: function(x, y) {
		return this.get_tilePieces()[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)];
	},
	onlyBackground: function() {
		if (ss.Nullable.eq(this.get_isOnlyBackground(), null)) {
			for (var i = 0; i < this.get_tilePieces().length; i++) {
				for (var j = 0; j < this.get_tilePieces()[i].length; j++) {
					var r = this.get_tilePieces()[i][j];
					var pm = OurSonic.SonicManager.instance.get_sonicLevel().get_blocks()[r.get_block()];
					if (ss.isValue(pm)) {
						if (!pm.onlyBackground()) {
							this.set_isOnlyBackground(false);
							return ss.Nullable.unbox(false);
						}
					}
				}
			}
			this.set_isOnlyBackground(true);
		}
		return ss.Nullable.unbox(this.get_isOnlyBackground());
	},
	isEmpty: function() {
		if (ss.Nullable.eq(this.get_empty(), null)) {
			for (var i = 0; i < this.get_tilePieces().length; i++) {
				for (var j = 0; j < this.get_tilePieces()[i].length; j++) {
					var r = this.get_tilePieces()[i][j];
					if (r.get_block() !== 0) {
						this.set_empty(false);
						return ss.Nullable.unbox(false);
					}
				}
			}
			this.set_empty(true);
		}
		return ss.Nullable.unbox(this.get_empty());
	},
	draw: function(canvas, position, scale, layer, bounds) {
		canvas.save();
		var len1 = this.get_tilePieces().length;
		var len2 = this.get_tilePieces()[0].length;
		var lX = 16 * scale.x;
		var lY = 16 * scale.y;
		for (var i = 0; i < len1; i++) {
			for (var j = 0; j < len2; j++) {
				var r = this.get_tilePieces()[i][j];
				var pm = OurSonic.SonicManager.instance.get_sonicLevel().get_blocks()[r.get_block()];
				if (ss.isValue(pm)) {
					var animatedIndex = 0;
					if (ss.isValue(this.get_animated()) && ss.isValue(this.get_animated()[j * len1 + i])) {
						animatedIndex = this.get_animated()[j * len1 + i].get_lastAnimatedIndex();
					}
					pm.draw(canvas, OurSonic.Point.$ctor(position.x + i * lX, position.y + j * lY), scale, layer, r.get_xFlip(), r.get_yFlip(), animatedIndex, bounds);
					//canvas.StrokeStyle = "#FFF";
					//canvas.StrokeRect(position.X + i * 16 * scale.X, position.Y + j * 16 * scale.Y, scale.X * 16, scale.Y * 16);
				}
			}
		}
		canvas.restore();
	},
	animatedTick: function() {
		var $t1 = this.get_animated().getEnumerator();
		try {
			while ($t1.moveNext()) {
				var anni = $t1.get_current();
				if (ss.Nullable.eq(anni.get_lastAnimatedFrame(), null)) {
					anni.set_lastAnimatedFrame(0);
					anni.set_lastAnimatedIndex(0);
					if (anni.get_frames()[anni.get_lastAnimatedIndex()].get_ticks() === 0 || ss.Nullable.ge(ss.Nullable.sub(OurSonic.SonicManager.instance.drawTickCount, anni.get_lastAnimatedFrame()), ((anni.get_automatedTiming() > 0) ? anni.get_automatedTiming() : anni.get_frames()[anni.get_lastAnimatedIndex()].get_ticks()))) {
						anni.set_lastAnimatedFrame(OurSonic.SonicManager.instance.drawTickCount);
						anni.set_lastAnimatedIndex((anni.get_lastAnimatedIndex() + 1) % anni.get_frames().length);
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
	},
	get_animated: function() {
		return this.$1$AnimatedField;
	},
	set_animated: function(value) {
		this.$1$AnimatedField = value;
	},
	get_index: function() {
		return this.$1$IndexField;
	},
	set_index: function(value) {
		this.$1$IndexField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TileItem
OurSonic.Drawing.TileItem = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.Drawing.TilePiece
OurSonic.Drawing.TilePiece = function() {
	this.$cx = 0;
	this.$cy = 0;
	this.$1$ImageField = null;
	this.$1$HeightMaskField = null;
	this.$1$TilesField = null;
	this.$drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
	this.$drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
	this.$1$BlockField = 0;
	this.$1$XFlipField = false;
	this.$1$YFlipField = false;
	this.$1$AnimatedFramesField = null;
	this.$1$AnimationFrameField = 0;
	this.$1$IndexField = 0;
	this.$cx = 8 * OurSonic.SonicManager.instance.get_scale().x * 2;
	this.$cy = 8 * OurSonic.SonicManager.instance.get_scale().y * 2;
	this.set_image({});
};
OurSonic.Drawing.TilePiece.prototype = {
	get_image: function() {
		return this.$1$ImageField;
	},
	set_image: function(value) {
		this.$1$ImageField = value;
	},
	get_heightMask: function() {
		return this.$1$HeightMaskField;
	},
	set_heightMask: function(value) {
		this.$1$HeightMaskField = value;
	},
	get_tiles: function() {
		return this.$1$TilesField;
	},
	set_tiles: function(value) {
		this.$1$TilesField = value;
	},
	get_block: function() {
		return this.$1$BlockField;
	},
	set_block: function(value) {
		this.$1$BlockField = value;
	},
	get_xFlip: function() {
		return this.$1$XFlipField;
	},
	set_xFlip: function(value) {
		this.$1$XFlipField = value;
	},
	get_yFlip: function() {
		return this.$1$YFlipField;
	},
	set_yFlip: function(value) {
		this.$1$YFlipField = value;
	},
	onlyBackground: function() {
		var $t1 = this.get_tiles().getEnumerator();
		try {
			while ($t1.moveNext()) {
				var mj = $t1.get_current();
				if (ss.isValue(OurSonic.SonicManager.instance.get_sonicLevel().get_tiles()[mj.get__Tile()])) {
					if (mj.get_priority()) {
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
	draw: function(canvas, position, scale, layer, xFlip, yFlip, animatedIndex, bounds) {
		if (!bounds.intersects(position)) {
			return true;
		}
		var drawOrderIndex = 0;
		drawOrderIndex = (xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3));
		var fd = this.$getCache(layer, scale, drawOrderIndex, this.get_animationFrame(), OurSonic.SonicManager.instance.get_sonicLevel().get_palAn());
		if (ss.isNullOrUndefined(fd)) {
			var ac = OurSonic.Help.defaultCanvas(this.$cx, this.$cy);
			var sX = 8 * scale.x;
			var sY = 8 * scale.y;
			var i = 0;
			var $t1 = this.get_tiles().getEnumerator();
			try {
				while ($t1.moveNext()) {
					var mj = $t1.get_current();
					if (ss.isValue(OurSonic.SonicManager.instance.get_sonicLevel().get_tiles()[mj.get__Tile()])) {
						if (mj.get_priority() === (layer === 1)) {
							var _xf = xFlip ^ mj.get_xFlip();
							var _yf = yFlip ^ mj.get_yFlip();
							var df = this.$drawInfo[this.$drawOrder[drawOrderIndex][i]];
							OurSonic.SonicManager.instance.get_sonicLevel().get_tiles()[mj.get__Tile()].draw(ac.context, OurSonic.Point.$ctor(df[0] * sX, df[1] * sY), scale, _xf, _yf, mj.get_palette(), layer, this.get_animationFrame());
						}
					}
					i++;
				}
			}
			finally {
				$t1.dispose();
			}
			fd = ac.domCanvas[0];
			this.$setCache(layer, scale, drawOrderIndex, this.get_animationFrame(), OurSonic.SonicManager.instance.get_sonicLevel().get_palAn(), fd);
		}
		this.$drawIt(canvas, fd, position);
		return true;
	},
	$setCache: function(layer, scale, drawOrder, animationFrame, palAn, image) {
		var val = (drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000).toString();
		var $t1 = this.get_animatedFrames().getEnumerator();
		try {
			while ($t1.moveNext()) {
				var animatedFrame = $t1.get_current();
				val += palAn[animatedFrame] + ' ';
			}
		}
		finally {
			$t1.dispose();
		}
		this.get_image()[val] = image;
	},
	get_animatedFrames: function() {
		return this.$1$AnimatedFramesField;
	},
	set_animatedFrames: function(value) {
		this.$1$AnimatedFramesField = value;
	},
	$drawIt: function(canvas, fd, position) {
		canvas.drawImage(fd, position.x, position.y);
	},
	$getCache: function(layer, scale, drawOrder, animationFrame, palAn) {
		var val = (drawOrder + 1 + scale.x * 10 + animationFrame * 1000 + (layer + 1) * 10000).toString();
		var $t1 = this.get_animatedFrames().getEnumerator();
		try {
			while ($t1.moveNext()) {
				var animatedFrame = $t1.get_current();
				val += palAn[animatedFrame] + ' ';
			}
		}
		finally {
			$t1.dispose();
		}
		if (ss.isNullOrUndefined(this.get_image()[val])) {
			return null;
		}
		return this.get_image()[val];
	},
	get_animationFrame: function() {
		return this.$1$AnimationFrameField;
	},
	set_animationFrame: function(value) {
		this.$1$AnimationFrameField = value;
	},
	get_index: function() {
		return this.$1$IndexField;
	},
	set_index: function(value) {
		this.$1$IndexField = value;
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
OurSonic.GameState.prototype = { editing: 0, playing: 1 };
OurSonic.GameState.registerEnum('OurSonic.GameState', false);
////////////////////////////////////////////////////////////////////////////////
// OurSonic.HeightMask
OurSonic.HeightMask = function(heightMap) {
};
OurSonic.HeightMask.op_Implicit = function(d) {
	var m = ((d === 0) ? 0 : 16);
	var $t1 = [];
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	$t1.add(m);
	return new OurSonic.HeightMask($t1);
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
	return null;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.IntersectingRectangle
OurSonic.IntersectingRectangle = function() {
};
OurSonic.IntersectingRectangle.$ctor = function(x, y, width, height, intersects) {
	var $this = OurSonic.Rectangle.$ctor(x, y, width, height);
	$this.intersects = null;
	$this.intersects = function(a) {
		return intersects($this, a);
	};
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
	this.$1$PaletteField = null;
	this.$1$SkipIndexField = 0;
	this.$1$TotalLengthField = 0;
	this.$1$PiecesField = null;
};
OurSonic.PaletteItem.prototype = {
	get_palette: function() {
		return this.$1$PaletteField;
	},
	set_palette: function(value) {
		this.$1$PaletteField = value;
	},
	get_skipIndex: function() {
		return this.$1$SkipIndexField;
	},
	set_skipIndex: function(value) {
		this.$1$SkipIndexField = value;
	},
	get_totalLength: function() {
		return this.$1$TotalLengthField;
	},
	set_totalLength: function(value) {
		this.$1$TotalLengthField = value;
	},
	get_pieces: function() {
		return this.$1$PiecesField;
	},
	set_pieces: function(value) {
		this.$1$PiecesField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.PaletteItemPieces
OurSonic.PaletteItemPieces = function() {
	this.$1$PaletteIndexField = 0;
	this.$1$PaletteMultiplyField = 0;
	this.$1$PaletteOffsetField = 0;
};
OurSonic.PaletteItemPieces.prototype = {
	get_paletteIndex: function() {
		return this.$1$PaletteIndexField;
	},
	set_paletteIndex: function(value) {
		this.$1$PaletteIndexField = value;
	},
	get_paletteMultiply: function() {
		return this.$1$PaletteMultiplyField;
	},
	set_paletteMultiply: function(value) {
		this.$1$PaletteMultiplyField = value;
	},
	get_paletteOffset: function() {
		return this.$1$PaletteOffsetField;
	},
	set_paletteOffset: function(value) {
		this.$1$PaletteOffsetField = value;
	}
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
	this.canvasHeight = 0;
	this.canvasWidth = 0;
	this.$fullscreenMode = false;
	this.$gameCanvas = null;
	this.$gameCanvasName = 'gameLayer';
	this.$lastMouseMove = null;
	this.$sonicManager = null;
	this.$uiCanvas = null;
	this.$uiCanvasName = 'uiLayer';
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
	this.$1$StartPositionsField = null;
	this.$1$CurPaletteIndexField = 0;
	this.$1$AnglesField = null;
	this.$1$CollisionIndexes1Field = null;
	this.$1$CollisionIndexes2Field = null;
	this.$1$HeightMapsField = null;
	this.$1$AnimatedChunksField = null;
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
	},
	get_startPositions: function() {
		return this.$1$StartPositionsField;
	},
	set_startPositions: function(value) {
		this.$1$StartPositionsField = value;
	},
	get_curPaletteIndex: function() {
		return this.$1$CurPaletteIndexField;
	},
	set_curPaletteIndex: function(value) {
		this.$1$CurPaletteIndexField = value;
	},
	get_angles: function() {
		return this.$1$AnglesField;
	},
	set_angles: function(value) {
		this.$1$AnglesField = value;
	},
	get_collisionIndexes1: function() {
		return this.$1$CollisionIndexes1Field;
	},
	set_collisionIndexes1: function(value) {
		this.$1$CollisionIndexes1Field = value;
	},
	get_collisionIndexes2: function() {
		return this.$1$CollisionIndexes2Field;
	},
	set_collisionIndexes2: function(value) {
		this.$1$CollisionIndexes2Field = value;
	},
	get_heightMaps: function() {
		return this.$1$HeightMapsField;
	},
	set_heightMaps: function(value) {
		this.$1$HeightMapsField = value;
	},
	get_animatedChunks: function() {
		return this.$1$AnimatedChunksField;
	},
	set_animatedChunks: function(value) {
		this.$1$AnimatedChunksField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicLevelData
OurSonic.SonicLevelData = function() {
	this.$1$BGChunkMapField = null;
	this.$1$ChunksField = null;
	this.$1$TilesField = null;
	this.$1$BlocksField = null;
	this.$1$ForegroundWidthField = 0;
	this.$1$ForegroundHeightField = 0;
	this.$1$ForegroundField = null;
	this.$1$ChunkMapField = null;
	this.$1$BackgroundWidthField = 0;
	this.$1$BackgroundHeightField = 0;
	this.$1$ObjectsField = null;
	this.$1$AnglesField = null;
	this.$1$CollisionIndexes1Field = null;
	this.$1$CollisionIndexes2Field = null;
	this.$1$HeightMapsField = null;
	this.$1$PaletteItemsField = null;
};
OurSonic.SonicLevelData.prototype = {
	get_bgChunkMap: function() {
		return this.$1$BGChunkMapField;
	},
	set_bgChunkMap: function(value) {
		this.$1$BGChunkMapField = value;
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
	get_foregroundWidth: function() {
		return this.$1$ForegroundWidthField;
	},
	set_foregroundWidth: function(value) {
		this.$1$ForegroundWidthField = value;
	},
	get_foregroundHeight: function() {
		return this.$1$ForegroundHeightField;
	},
	set_foregroundHeight: function(value) {
		this.$1$ForegroundHeightField = value;
	},
	get_foreground: function() {
		return this.$1$ForegroundField;
	},
	set_foreground: function(value) {
		this.$1$ForegroundField = value;
	},
	get_chunkMap: function() {
		return this.$1$ChunkMapField;
	},
	set_chunkMap: function(value) {
		this.$1$ChunkMapField = value;
	},
	get_backgroundWidth: function() {
		return this.$1$BackgroundWidthField;
	},
	set_backgroundWidth: function(value) {
		this.$1$BackgroundWidthField = value;
	},
	get_backgroundHeight: function() {
		return this.$1$BackgroundHeightField;
	},
	set_backgroundHeight: function(value) {
		this.$1$BackgroundHeightField = value;
	},
	get_objects: function() {
		return this.$1$ObjectsField;
	},
	set_objects: function(value) {
		this.$1$ObjectsField = value;
	},
	get_angles: function() {
		return this.$1$AnglesField;
	},
	set_angles: function(value) {
		this.$1$AnglesField = value;
	},
	get_collisionIndexes1: function() {
		return this.$1$CollisionIndexes1Field;
	},
	set_collisionIndexes1: function(value) {
		this.$1$CollisionIndexes1Field = value;
	},
	get_collisionIndexes2: function() {
		return this.$1$CollisionIndexes2Field;
	},
	set_collisionIndexes2: function(value) {
		this.$1$CollisionIndexes2Field = value;
	},
	get_heightMaps: function() {
		return this.$1$HeightMapsField;
	},
	set_heightMaps: function(value) {
		this.$1$HeightMapsField = value;
	},
	get_paletteItems: function() {
		return this.$1$PaletteItemsField;
	},
	set_paletteItems: function(value) {
		this.$1$PaletteItemsField = value;
	},
	translate: function() {
		return null;
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
	this.$sonicSprites = null;
	this.$tickCount = 0;
	this.$waitingForDrawContinue = false;
	this.$waitingForTickContinue = false;
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
	this.$myStatus = null;
	OurSonic.SonicManager.instance = this;
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
	this.drawTickCount = 0;
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
		this.drawTickCount++;
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
			if (ss.isValue(this.get_sonicLevel().get_paletteItems()[0])) {
				for (var k = 0; k < this.get_sonicLevel().get_paletteItems()[0].length; k++) {
					var pal = this.get_sonicLevel().get_paletteItems()[0][k];
					for (var j1 = 0; j1 < pal.get_totalLength(); j1 += pal.get_skipIndex()) {
						if (this.drawTickCount % (pal.get_totalLength() + pal.get_skipIndex()) === j1) {
							this.get_sonicLevel().get_palAn()[k] = ss.Int32.div(j1, pal.get_skipIndex());
						}
					}
					for (var m = 0; m < pal.get_pieces().length; m++) {
						var mj = pal.get_pieces()[m];
						this.get_sonicLevel().get_palette()[mj.get_paletteIndex()][ss.Int32.div(mj.get_paletteOffset(), 2)] = pal.get_palette()[this.get_sonicLevel().get_palAn()[k] * (pal.get_pieces().length * 2) + 0 + mj.get_paletteMultiply()];
						this.get_sonicLevel().get_palette()[mj.get_paletteIndex()][ss.Int32.div(mj.get_paletteOffset(), 2) + 1] = pal.get_palette()[this.get_sonicLevel().get_palAn()[k] * (pal.get_pieces().length * 2) + 1 + mj.get_paletteMultiply()];
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
	},
	load: function(lvl, mainCanvas) {
		this.set_loading(true);
		this.set_status('Decoding');
		var sonicLevel = $.parseJSON(OurSonic.Help.decodeString(lvl));
		this.set_status('Determining Level Information');
		if (ss.isNullOrUndefined(this.get_sonicLevel().get_chunks())) {
			this.get_sonicLevel().set_chunks([]);
		}
		if (ss.isNullOrUndefined(this.get_sonicLevel().get_blocks())) {
			this.get_sonicLevel().set_blocks([]);
		}
		if (ss.isNullOrUndefined(this.get_sonicLevel().get_tiles())) {
			this.get_sonicLevel().set_tiles([]);
		}
		if (ss.isNullOrUndefined(this.get_sonicLevel().get_rings())) {
			this.get_sonicLevel().set_rings({});
		}
		this.get_sonicLevel().set_levelWidth(sonicLevel.get_foregroundWidth());
		this.get_sonicLevel().set_levelHeight(sonicLevel.get_foregroundHeight());
		var mf = this.$decodeNumeric(sonicLevel.get_foreground());
		sonicLevel.set_chunkMap([]);
		for (var q = 0; q < sonicLevel.get_foregroundWidth(); q++) {
			sonicLevel.get_chunkMap()[q] = [];
			for (var r = 0; r < sonicLevel.get_foregroundHeight(); r++) {
				sonicLevel.get_chunkMap()[q][r] = mf[q + r * sonicLevel.get_foregroundWidth()];
			}
		}
		sonicLevel.set_bgChunkMap([]);
		for (var q1 = 0; q1 < sonicLevel.get_backgroundWidth(); q1++) {
			sonicLevel.get_bgChunkMap()[q1] = [];
			for (var r1 = 0; r1 < sonicLevel.get_backgroundHeight(); r1++) {
				sonicLevel.get_bgChunkMap()[q1][r1] = mf[q1 + r1 * sonicLevel.get_backgroundWidth()];
			}
		}
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
		for (var l = 0; l < sonicLevel.get_objects().length; l++) {
			this.get_sonicLevel().get_objects()[l] = new OurSonic.SonicObject(sonicLevel.get_objects()[l]);
			this.get_sonicLevel().get_objects()[l].set_index(l);
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
		this.get_sonicLevel().set_curPaletteIndex(0);
		this.get_sonicLevel().set_palAn([]);
		this.get_sonicLevel().set_curHeightMap(true);
		for (var j = 0; j < sonicLevel.get_tiles().length; j++) {
			var fc = sonicLevel.get_tiles()[j];
			var tiles = this.$decodeNumeric(fc);
			var mj = [];
			for (var i = 0; i < tiles.length; i++) {
				// var value = sonicLevel.Tiles[j][i];
				// mj.Add(value >> 4);
				//  mj.Add(value & 0xF);
			}
			var mfc = [];
			for (var o = 0; o < 8; o++) {
				mfc[o] = [];
			}
			for (var n = 0; n < mf.length; n++) {
				mfc[n % 8][ss.Int32.div(n, 8)] = mf[n];
			}
			this.get_sonicLevel().get_tiles()[j] = new OurSonic.Drawing.Tile(mfc);
			this.get_sonicLevel().get_tiles()[j].set_index(j);
		}
		var $t1 = [];
		this.get_sonicLevel().set_animatedChunks($t1);
		var acs = $t1;
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
		for (var j1 = 0; j1 < sonicLevel.get_blocks().length; j1++) {
			var fc1 = sonicLevel.get_blocks()[j1];
			var mj1 = new OurSonic.Drawing.TilePiece();
			mj1.set_index(j1);
			mj1.set_tiles([]);
			for (var p = 0; p < fc1.length; p++) {
				mj1.get_tiles().add(fc1[p]);
			}
			this.get_sonicLevel().get_blocks()[j1] = mj1;
		}
		this.get_sonicLevel().set_angles(this.$decodeNumeric(sonicLevel.get_angles()));
		this.get_sonicLevel().set_collisionIndexes1(this.$decodeNumeric(sonicLevel.get_collisionIndexes1()));
		this.get_sonicLevel().set_collisionIndexes2(this.$decodeNumeric(sonicLevel.get_collisionIndexes2()));
		for (var i1 = 0; i1 < sonicLevel.get_heightMaps().length; i1++) {
			var b1 = true;
			var b2 = true;
			for (var m = 0; m < sonicLevel.get_heightMaps()[i1].length; m++) {
				if (b1 && sonicLevel.get_heightMaps()[i1][m] !== 0) {
					b1 = false;
				}
				if (b2 && sonicLevel.get_heightMaps()[i1][m] !== 16) {
					b2 = false;
				}
			}
			if (b1) {
				this.get_sonicLevel().get_heightMaps()[i1] = OurSonic.HeightMask.op_Implicit(0);
			}
			else if (b2) {
				this.get_sonicLevel().get_heightMaps()[i1] = OurSonic.HeightMask.op_Implicit(1);
			}
			else {
				this.get_sonicLevel().get_heightMaps()[i1] = new OurSonic.HeightMask(sonicLevel.get_heightMaps()[i1]);
			}
		}
		for (var j2 = 0; j2 < sonicLevel.get_chunks().length; j2++) {
			var fc2 = sonicLevel.get_chunks()[j2];
			var mj2 = new OurSonic.Drawing.TileChunk();
			mj2.set_index(j2);
			mj2.set_tilePieces(new Array(8));
			for (var i2 = 0; i2 < 8; i2++) {
				mj2.get_tilePieces()[i2] = new Array(8);
			}
			for (var p1 = 0; p1 < fc2.length; p1++) {
				mj2.get_tilePieces()[p1 % 8][ss.Int32.div(p1, 8)] = Type.cast(fc2[p1], OurSonic.Drawing.TilePiece);
			}
			this.get_sonicLevel().get_chunks()[j2] = mj2;
			mj2.set_animated([]);
			for (var ic = 0; ic < mj2.get_tilePieces().length; ic++) {
				for (var jc = 0; jc < mj2.get_tilePieces()[ic].length; jc++) {
					var r2 = mj2.get_tilePieces()[ic][jc];
					var pm = this.get_sonicLevel().get_blocks()[r2.get_block()];
					if (ss.isValue(pm)) {
						for (var ci = 0; ci < pm.get_tiles().length; ci++) {
							var mjc = pm.get_tiles()[ci];
							if (ss.isValue(this.get_sonicLevel().get_tiles()[mjc.get__Tile()])) {
								var fa = this.$containsAnimatedTile(mjc.get__Tile());
								if (ss.isValue(fa)) {
									mj2.get_animated()[jc * 8 + ic] = fa;
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
		if (ss.isValue(this.get_sonicLevel().get_paletteItems()[0])) {
			for (var k = 0; k < sonicLevel.get_paletteItems()[0].length; k++) {
				var pal = sonicLevel.get_paletteItems()[0][k];
				this.get_sonicLevel().get_paletteItems()[0][k] = pal;
				pal.set_palette(Type.cast(eval(Type.cast(pal.get_palette(), String)), Array));
				//below this is bad
				if (pal.get_totalLength() === 0) {
					pal.set_totalLength(pal.get_palette().length);
				}
				if (pal.get_skipIndex() === 0) {
					pal.set_skipIndex(ss.Int32.div(pal.get_palette().length, 8));
				}
				//^
			}
		}
		//
		//              for (var kd = 0; kd < sonicLevel.Blocks.Count; kd++) {
		//
		//              var dj = sonicLevel.Blocks[kd];
		//
		//              dj.animatedFrames = [];
		//
		//              
		//
		//              for (var i = 0; i < dj.tiles.length; i++) {
		//
		//              var mj = dj.tiles[i];
		//
		//              if (sonicManager.SonicLevel.Tiles[mj.Tile]) {
		//
		//              
		//
		//              var pl = JSLINQ(sonicManager.SonicLevel.Tiles[mj.Tile].getAllPaletteIndexes());
		//
		//              
		//
		//              
		//
		//              if (sonicManager.SonicLevel.PaletteItems[0]) {
		//
		//              for (var k = 0; k < sonicManager.SonicLevel.PaletteItems[0].length; k++) {
		//
		//              var pal = sonicManager.SonicLevel.PaletteItems[0][k];
		//
		//              
		//
		//              
		//
		//              for (var m = 0; m < pal.Pieces.length; m++) {
		//
		//              var mje = pal.Pieces[m];
		//
		//              
		//
		//              if (mj.Palette == mje.PaletteIndex) {
		//
		//              if (pl.Any(function (J) {
		//
		//              return J == mje.PaletteOffset / 2 || J == mje.PaletteOffset / 2 + 1;
		//
		//              })) {
		//
		//              dj.animatedFrames.push(k);
		//
		//              }
		//
		//              }
		//
		//              }
		//
		//              
		//
		//              }
		//
		//              
		//
		//              }
		//
		//              }
		//
		//              
		//
		//              }
		//
		//              }
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
	},
	$containsAnimatedTile: function(tile) {
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
	get_status: function() {
		return this.$myStatus;
	},
	set_status: function(value) {
		this.get_uiManager().updateTitle(value);
		this.$myStatus = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// OurSonic.SonicObject
OurSonic.SonicObject = function(s) {
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
	get_index: function() {
		return 0;
	},
	set_index: function(value) {
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
	},
	updateTitle: function(decoding) {
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
OurSonic.Ring.registerClass('OurSonic.Ring', Object);
OurSonic.Sonic.registerClass('OurSonic.Sonic', Object);
OurSonic.SonicBackground.registerClass('OurSonic.SonicBackground', Object);
OurSonic.SonicEngine.registerClass('OurSonic.SonicEngine', Object);
OurSonic.SonicLevel.registerClass('OurSonic.SonicLevel', Object);
OurSonic.SonicLevelData.registerClass('OurSonic.SonicLevelData', Object);
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
OurSonic.SonicManager.instance = null;
OurSonic.SonicManager.$base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
OurSonic.SonicManager.$base64Inv = null;
OurSonic.SonicManager.$base64Inv = {};
for (var i = 0; i < OurSonic.SonicManager.$base64chars.length; i++) {
	OurSonic.SonicManager.$base64Inv[OurSonic.SonicManager.$base64chars[i]] = i;
}
$(function(){new OurSonic.Page();});
