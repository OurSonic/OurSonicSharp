using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
using OurSonic.Level.Animations;
using OurSonic.Utility;
namespace OurSonic.Level.Tiles
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
                         bool xflip,
                         bool yflip,
                         int palette,
                         int layer,
                         int animationFrame)
        {
            if (CheckGood(canvas, pos, xflip, yflip, palette, layer, animationFrame))
                return;
            var cx = (int) ( Colors.Length );
            var cy = (int) ( Colors.Length );
            var j = CanvasInformation.Create(cx, cy);

            if (pos.X < 0 || pos.Y < 0)
                return;
            var oPos = new Point(0, 0);
            if (xflip) {
                oPos.X = -Colors.Length;
                j.Context.Scale(-1, 1);
            }
            if (yflip) {
                oPos.Y = -Colors.Length;
                j.Context.Scale(1, -1);
            }
            var palette_ = SonicManager.Instance.SonicLevel.Palette;
            int indexed = SonicManager.Instance.IndexedPalette;

            var mx = Colors.Length;
            var my = Colors[0].Length;

            j.Context.Save();

            int index0 = ( palette + indexed ) % palette_.Length;
            var x = oPos.X;
            var y = oPos.Y;

            for (int i = 0; i < mx; i++) {
                for (int jf = 0; jf < my; jf++) {
                    var gj = Colors[i][jf];
                    if (gj == 0) continue;
                    var m = palette_[index0][gj];
                    var col = "#" + m;
                    if (j.Context.FillStyle != col)
                        j.Context.FillStyle = col;

                    j.Context.FillRect(x + ( i ), y + jf, 1, 1);
                }
            }

            //            j.Context.StrokeStyle = "#7CF1FF";
            //            j.Context.LineWidth = 4;
            //            j.Context.StrokeRect(0, 0, cx, cy);

            j.Context.Restore();

            canvas.DrawImage(j.Canvas, pos.X, pos.Y);

            if (ShowOutline) {
                canvas.StrokeStyle = "#DD0033";
                canvas.LineWidth = 3;
                canvas.StrokeRect(pos.X, pos.Y, 8 * 1, 8 * 1);
            }
        }

        public bool ShouldAnimate()
        {
            return IsAnimated && canAnimate;
        }

        private bool CheckGood(CanvasContext2D canvas,
                               Point pos,
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
                        va.Draw(canvas, pos, xflip, yflip, palette, layer, animationFrame);
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
                        var file = acn.GetAnimationFile();

                        var va = file[frame.StartingTileIndex + ( Index - anin )];
                        if (va.Truthy()) {
                            if (canvas.FillStyle != "rbga(255,255,255,255)")
                                canvas.FillStyle = "rbga(255,255,255,255)";
                            va.Draw(canvas, pos, xflip, yflip, palette, layer, animationFrame);
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
    }
}