using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.Drawing
{
    public class Tile
    {
        private string index;
        private Animation willAnimate;
        [IntrinsicProperty]
        public int _Tile { get; set; }
        [IntrinsicProperty]
        public bool Priority { get; set; }
        [IntrinsicProperty]
        public bool XFlip { get; set; }
        [IntrinsicProperty]
        public bool YFlip { get; set; }
        [IntrinsicProperty]
        public int Palette { get; set; }
        [IntrinsicProperty]
        protected int[] CurPaletteIndexes { get; set; }
        [IntrinsicProperty]
        protected List<int> Sprites { get; set; }
        [IntrinsicProperty]
        protected int[][] Colors { get; set; }
        [IntrinsicProperty]
        protected bool ShowOutline { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }

        public Tile(int[][] colors)
        {
            Colors = colors;
            Sprites = new List<int>();
            CurPaletteIndexes = null;
        }

        public void Draw(CanvasContext2D canvas,
                         Point pos,
                         Point scale,
                         bool xflip,
                         bool yflip,
                         int palette,
                         int layer,
                         int animationFrame)
        {
            if (CheckGood(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame))
                return;
            var cx = Colors.Length * scale.X;
            var cy = Colors.Length * scale.Y;
            var j = Help.DefaultCanvas(cx, cy);

            if (pos.X < 0 || pos.Y < 0)
                return;
            var oPos = new Point(0, 0);
            if (xflip) {
                oPos.X = -Colors.Length * scale.X;
                j.Context.Scale(-1, 1);
            }
            if (yflip) {
                oPos.Y = -Colors.Length * scale.Y;
                j.Context.Scale(1, -1);
            }
            var palette_ = SonicManager.Instance.SonicLevel.Palette;
            int indexed = SonicManager.Instance.IndexedPalette;

            for (int i = 0; i < Colors.Length; i++) {
                for (int jf = 0; jf < Colors[i].Length; jf++) {
                    var gj = Colors[i][jf];
                    var m =
                            palette_[
                                    ( palette + indexed ) %
                                    palette_.Length][gj];
                    if (j.Context.FillStyle != "#" + m)
                        j.Context.FillStyle = "#" + m;

                    j.Context.FillRect(oPos.X + ( i * scale.X ), oPos.Y + jf * scale.Y, scale.X, scale.Y);
                }
            }
            var fd = j.DomCanvas;
            canvas.DrawImage((CanvasElement) fd[0], pos.X, pos.Y);

            if (ShowOutline) {
                canvas.StrokeStyle = "#DD0033";
                canvas.LineWidth = 3;
                canvas.StrokeRect(pos.X, pos.Y, 8 * scale.X, 8 * scale.Y);
            }
        }

        private bool CheckGood(CanvasContext2D canvas,
                               Point pos,
                               Point scale,
                               bool xflip,
                               bool yflip,
                               int palette,
                               int layer,
                               int animationFrame)
        {
            dynamic index_ = index;

            if (index_ && index_[0] != "A") {
                if (willAnimate == null) return false;
                var an = willAnimate;
                var anin = an.AnimationTileIndex;
                var ind = animationFrame;
                var frame = an.Frames[ind];
                if (frame == null) frame = an.Frames[0];
                var file = SonicManager.Instance.SonicLevel.AnimatedFiles[an.AnimationFile];
                var va = file[frame.StartingTileIndex + ( index_ - anin )];
                if (va != null) {
                    if (canvas.FillStyle != "rbga(255,255,255,255)")
                        canvas.FillStyle = "rbga(255,255,255,255)";
                    //   va.Draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                    return true;
                }
                return false;
            }
            for (int i = 0; i < SonicManager.Instance.SonicLevel.Animations.Count; i++) {
                var an = SonicManager.Instance.SonicLevel.Animations[i];
                var anin = an.AnimationTileIndex;
                var num = an.NumberOfTiles;
                if (index_ > anin && index_ < anin + num) {
                    willAnimate = an;
                    var ind = animationFrame;
                    var frame = an.Frames[ind];
                    if (frame == null) frame = an.Frames[0];
                    var file = SonicManager.Instance.SonicLevel.AnimatedFiles[an.AnimationFile];
                    var va = file[frame.StartingTileIndex + ( index_ - anin )];
                    if (va != null) {
                        if (canvas.FillStyle != "rbga(255,255,255,255)")
                            canvas.FillStyle = "rbga(255,255,255,255)";
                        // va.Draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                        return true;
                    }
                }
            }
            willAnimate = null;
            return false;

            /* 

                                                }
                                            }
                                            this.willAnimate = false;
                                        }
                                        return false;#1#
            */
        }

        private void ChangeColor(int x, int y, int color)
        {
            Colors[x][y] = color;
            Sprites = new List<int>();
        }

        /* 
         
            this.getAllPaletteIndexes = function () {

                if (!this.curPaletteIndexes) {

                    var d = [];
                    var dEnumerable = JSLINQ(d);

                    for (var i = 0; i < this.colors.length; i++) {
                        for (var jf = 0; jf < this.colors[i].length; jf++) {
                            var gj = this.colors[i][jf];
                            if (gj == 0) continue;

                            if (!dEnumerable.Any(function (D) {
                                return D == gj;
                            })) {
                                d.push(gj);
                            }
                        }
                    }


                    this.curPaletteIndexes = d;
                }
                return this.curPaletteIndexes;

            };
            this.clearCache = function() {
                this.curPaletteIndexes = undefined;

            };

         
            this.drawUI = function (canvas, pos, scale, xflip, yflip, palette) {


                for (var i = 0; i < this.colors.length; i++) {
                    for (var j = 0; j < this.colors[i].length; j++) {
                        var gj = this.colors[i][j];
                        if (gj == 0) continue;

                        //canvas.drawImage(sonicManager.SonicLevel.Palette[palette][gj], pos.x + ((i)) * scale.x, pos.y + (j) * scale.y, scale.x, scale.y);

                        var m = sonicManager.SonicLevel.Palette[palette][gj];
                        if (canvas.fillStyle != "#" + m)
                            canvas.fillStyle = "#" + m;

                        if (xflip) {
                            if (yflip) {
                                canvas.fillRect(pos.x + (7 - (i)) * scale.x, pos.y + (7 - j) * scale.y, scale.x, scale.y);
                            } else {
                                canvas.fillRect(pos.x + (7 - (i)) * scale.x, pos.y + (j) * scale.y, scale.x, scale.y);

                            }
                        } else {
                            if (yflip) {
                                canvas.fillRect(pos.x + ((i)) * scale.x, pos.y + (7 - j) * scale.y, scale.x, scale.y);
                            } else {
                                canvas.fillRect(pos.x + ((i)) * scale.x, pos.y + (j) * scale.y, scale.x, scale.y);
                            }
                        }


                    }
                }

                /*  if (showOutline) {
                canvas.strokeStyle = "#DD0033";
                canvas.lineWidth = 3;
                canvas.strokeRect(pos.x, pos.y, 8 * scale.x, 8 * scale.y);
                }#1#


            };
     
            };*/
    }
}