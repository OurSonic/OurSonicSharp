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
        [IntrinsicProperty]
        protected int[] CurPaletteIndexes { get; set; }
        [IntrinsicProperty]
        protected int[][] Colors { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public bool IsTileAnimated { get; set; }
        [IntrinsicProperty]
        public List<int> AnimatedPaletteIndexes { get; set; }
        [IntrinsicProperty]
        public List<int> AnimatedTileIndexes { get; set; }

        [IntrinsicProperty]
        public JsDictionary<int, List<int>> PaletteIndexesToBeAnimated { get; set; }

        public Tile(int[][] colors)
        {
            Colors = colors;
            CurPaletteIndexes = null;
        }

        public void DrawBase(CanvasContext2D canvas,
                         Point pos,
                         bool xflip,
                         bool yflip,
                         int palette, bool isAnimatedTile = false)
        {

            //we dont predraw animated tiles
            if (AnimatedTileIndexes != null && (!isAnimatedTile && AnimatedTileIndexes.Count > 0)) return;
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


        public void DrawAnimatedPalette(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int palette, int animatedPaletteIndex, bool isAnimatedTile = false)
        {
            //we dont predraw animated tiles
            if (AnimatedTileIndexes != null && (!isAnimatedTile && AnimatedTileIndexes.Count > 0)) return;

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
                    if (PaletteIndexesToBeAnimated[animatedPaletteIndex].IndexOfFast(colorIndex) == -1) continue;

                    j.Context.DrawImage(palette_[colorPaletteIndex][colorIndex], x + _x, y + _y);
                }
            }

            canvas.DrawImage(j.Canvas, pos.X, pos.Y);


        }
        public void DrawAnimatedTile(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int palette, int animatedTileIndex)
        {
            if (AnimatedTileIndexes.IndexOfFast(animatedTileIndex) == -1) return;
            var tileAnimationFrame = SonicManager.Instance.TileAnimationManager.GetCurrentFrame(animatedTileIndex);
            var tileAnimation = tileAnimationFrame.Animation;
            var tileAnimationData = tileAnimation.AnimatedTileData;
            var animationIndex = tileAnimationData.AnimationTileIndex;

            var frame = tileAnimationFrame.FrameData();
            if (frame.Falsey())
            {
                frame = tileAnimation.AnimatedTileData.DataFrames[0];
                //todo throw
            }

            var file = tileAnimationData.GetAnimationFile();
            var va = file[frame.StartingTileIndex + (Index - animationIndex)];
            if (va != null)
            {
                va.DrawBase(canvas, pos, xflip, yflip, palette, true);
            }
            else
            {
                //todo throw
            }
        } 

        public bool ShouldTileAnimate()
        {
            return IsTileAnimated && canAnimate;
        }


        public int[] GetAllPaletteIndexes()
        {
            if (CurPaletteIndexes == null)
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