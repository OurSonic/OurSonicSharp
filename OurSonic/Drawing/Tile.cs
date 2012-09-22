using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
namespace OurSonic.Drawing
{
    public class Tile
    {
        private bool canAnimate = true;
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
        [IntrinsicProperty]
        public bool IsAnimated { get; set; }

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
                    if (gj == 0) continue;
                    var m =
                            palette_[
                                    ( palette + indexed ) %
                                    palette_.Length][gj];
                    if (j.Context.FillStyle != "#" + m)
                        j.Context.FillStyle = "#" + m;

                    j.Context.FillRect(oPos.X + ( i * scale.X ), oPos.Y + jf * scale.Y, scale.X, scale.Y);
                }
            }
            canvas.DrawImage(j.Canvas, pos.X, pos.Y);

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
            if (!IsAnimated) {
                if (!canAnimate) return false;
                var an = willAnimate;
                if (willAnimate.Truthy()) {
                    var anin = an.AnimationTileIndex;
                    var ind = animationFrame;
                    var frame = an.Frames[ind];
                    if (frame.Falsey())
                        frame = an.Frames[0];
                    var file = SonicManager.Instance.SonicLevel.AnimatedFiles[an.AnimationFile];
                    var va = file[frame.StartingTileIndex + ( Index - anin )];
                    if (va.Truthy()) {
                        if (canvas.FillStyle != "rbga(255,255,255,255)")
                            canvas.FillStyle = "rbga(255,255,255,255)";
                        va.Draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                        return true;
                    }
                    return false;
                }
                for (int i = 0; i < SonicManager.Instance.SonicLevel.Animations.Count; i++) {
                    var acn = SonicManager.Instance.SonicLevel.Animations[i];
                    var anin = acn.AnimationTileIndex;
                    var num = acn.NumberOfTiles;
                    if (Index >= anin && Index < anin + num) {
                        willAnimate = acn;
                        var ind = animationFrame;
                        var frame = acn.Frames[ind];
                        if (frame.Falsey())
                            frame = acn.Frames[0];
                        var file = SonicManager.Instance.SonicLevel.AnimatedFiles[acn.AnimationFile];
                        var va = file[frame.StartingTileIndex + ( Index - anin )];
                        if (va.Truthy()) {
                            if (canvas.FillStyle != "rbga(255,255,255,255)")
                                canvas.FillStyle = "rbga(255,255,255,255)";
                            va.Draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                            return true;
                        }
                    }
                }
                /*
                    this.willAnimate = an;
                    var ind = animationFrame;
                    var frame = an.Frames[ind];
                    if (!frame) frame = an.Frames[0];
                    var file = sonicManager.SonicLevel.AnimatedFiles[an.AnimationFile];
                    var va = file[frame.StartingTileIndex + (this.index - anin)];
                    if (va) {
                        if (canvas.fillStyle != "rbga(255,255,255,255)")
                            canvas.fillStyle = "rbga(255,255,255,255)";
                        va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                        return true;
                    }

                }
            }
*/
            }
            canAnimate = false;

            return false;
        }

        private void ChangeColor(int x, int y, int color)
        {
            Colors[x][y] = color;
            Sprites = new List<int>();
        }

        public int[] GetAllPaletteIndexes()
        {
            if (CurPaletteIndexes.Falsey()) {
                var d = new List<int>();
                for (int i = 0; i < Colors.Length; i++) {
                    var color = Colors[i];
                    for (int jf = 0; jf < color.Length; jf++) {
                        var gj = color[jf];
                        if (gj == 0) continue;
                        if (!d.Any(D => D == gj))
                            d.Add(gj);
                    }
                }
                CurPaletteIndexes = (int[]) d.Slice(0);
            }
            return CurPaletteIndexes;
        }

        public void ClearCache()
        {
            CurPaletteIndexes = null;
        }

        /*   
         
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