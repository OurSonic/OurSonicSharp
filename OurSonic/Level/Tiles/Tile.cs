using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
using OurSonic.Level.Animations;
using OurSonic.Utility;
using OurSonicModels.Common;

namespace OurSonic.Level.Tiles
{
    public class Tile
    {
        private bool canAnimate = true;
        private Animation TileAnimation;
        [IntrinsicProperty]
        protected int[] CurPaletteIndexes { get; set; }
        [IntrinsicProperty]
        protected int[][] Colors { get; set; }
        [IntrinsicProperty]
        protected bool ShowOutline { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public bool IsAnimated { get; set; }
        [IntrinsicProperty]
        public List<int> AnimatedPaletteIndexes { get; set; }

        public Tile(int[][] colors)
        {
            Colors = colors;
            CurPaletteIndexes = null;
        }

        public void Draw(CanvasContext2D canvas,
                         Point pos,
                         bool xflip,
                         bool yflip,
                         int palette,
                         int animationFrame)
        {
            if (DrawAnimations(canvas, pos, xflip, yflip, palette, animationFrame))
                return;

              drawRegular(canvas, pos, xflip, yflip, palette);

            if (ShowOutline)
            {
                canvas.StrokeStyle = "#DD0033";
                canvas.LineWidth = 3;
                canvas.StrokeRect(pos.X, pos.Y, 8 * 1, 8 * 1);
            }
        }

        private void drawRegular(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int palette)
        {
            var squareSize = Colors.Length;
            CanvasInformation j;
            j = CanvasInformation.Create(squareSize, squareSize);

            if (pos.X < 0 || pos.Y < 0)
                return;
            var oPos = new Point(0, 0);
            if (xflip)
            {
                oPos.X = -squareSize;
                j.Context.Scale(-1, 1);
            }
            if (yflip)
            {
                oPos.Y = -squareSize;
                j.Context.Scale(1, -1);
            }
            var palette_ = SonicManager.Instance.SonicLevel.Palette;

            int colorPaletteIndex = (palette + SonicManager.Instance.IndexedPalette) % palette_.Length;
            var x = oPos.X;
            var y = oPos.Y;

            for (int _x = 0; _x < squareSize; _x++)
            {
                for (int _y = 0; _y < squareSize; _y++)
                {
                    var colorIndex = Colors[_x][_y];
                    if (colorIndex == 0) continue;

                    j.Context.DrawImage(palette_[colorPaletteIndex][colorIndex], x + _x, y + _y);
                }
            }

            canvas.DrawImage(j.Canvas, pos.X, pos.Y);
        }

        public bool ShouldAnimate()
        {
            return IsAnimated && canAnimate;
        }

        private bool DrawAnimations(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int palette, int animationFrame)
        {
            if (!IsAnimated)
            {
                if (!canAnimate) return false;
                var an = TileAnimation;
                if (TileAnimation != null)
                {
                    var anin = an.AnimationTileIndex;
                    var ind = animationFrame;
                    var frame = an.Frames[ind];
                    if (frame.Falsey())
                        frame = an.Frames[0];
                    var file = SonicManager.Instance.SonicLevel.AnimatedFiles[an.AnimationFile];
                    var va = file[frame.StartingTileIndex + (Index - anin)];
                    if (va != null)
                    {
                        va.Draw(canvas, pos, xflip, yflip, palette, animationFrame);
                        return true;
                    }
                    return false;
                }
                foreach (var acn in SonicManager.Instance.SonicLevel.Animations)
                {
                    var anin = acn.AnimationTileIndex;
                    var num = acn.NumberOfTiles;
                    if (Index >= anin && Index < anin + num)
                    {
                        TileAnimation = acn;
                        var ind = animationFrame;
                        var frame = acn.Frames[ind];
                        if (frame.Falsey())
                            frame = acn.Frames[0];
                        var file = acn.GetAnimationFile();

                        var va = file[frame.StartingTileIndex + (Index - anin)];
                        if (va.Truthy())
                        {

                            va.Draw(canvas, pos, xflip, yflip, palette, animationFrame);
                            return true;
                        }
                    }
                }

            }
            canAnimate = false;

            return false;
        }


        public int[] GetAllPaletteIndexes()
        {
            if (CurPaletteIndexes.Falsey())
            {
                var d = new List<int>();
                for (int _x = 0; _x < Colors.Length; _x++)
                {
                    var color = Colors[_x];
                    for (int _y = 0; _y < color.Length; _y++)
                    {
                        var col = color[_y];
                        if (col == 0) continue;
                        if (d.All(a => a != col))
                            d.Add(col);
                    }
                }
                CurPaletteIndexes = (int[])d.Slice(0);
            }
            return CurPaletteIndexes;
        }

        public void ClearCache()
        {
            CurPaletteIndexes = null;
        }
    }
}