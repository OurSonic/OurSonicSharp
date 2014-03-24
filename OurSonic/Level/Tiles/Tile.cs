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
        private TileAnimation TileAnimation;
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
        public JsDictionary<int, List<int>> PaletteIndexesToBeAnimated { get; set; }

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
            /*Workflow:
             * Tile animations are made up of actual tiles. In the event that it is noticed
             * this tile is part of a tile animation, it draws the appropriate animated 
             * tile instead of the normal one. 
             */
            if (DrawTileAnimations(canvas, pos, xflip, yflip, palette, animationFrame))
                return;

            DrawBase(canvas, pos, xflip, yflip, palette);

        }
        public void DrawBase(CanvasContext2D canvas,
                         Point pos,
                         bool xflip,
                         bool yflip,
                         int palette)
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


        public void DrawAnimatedPalette(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int palette, int animatedPaletteIndex)
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
                    if (PaletteIndexesToBeAnimated[animatedPaletteIndex].IndexOf(colorIndex) == -1) continue;

                    j.Context.DrawImage(palette_[colorPaletteIndex][colorIndex], x + _x, y + _y);
                }
            }

            canvas.DrawImage(j.Canvas, pos.X, pos.Y);


        }




        public bool ShouldTileAnimate()
        {
            return IsTileAnimated && canAnimate;
        }

        private bool DrawTileAnimations(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int palette, int animationFrame)
        {
            if (!IsTileAnimated)
            {
                if (!canAnimate) return false;

                if (TileAnimation == null)
                {
                    foreach (var acn in SonicManager.Instance.SonicLevel.TileAnimations)
                    {
                        var anin = acn.AnimationTileIndex;
                        var num = acn.NumberOfTiles;
                        if (Index >= anin && Index < anin + num)
                        {
                            TileAnimation = acn;
                        }
                    }
                }


                if (TileAnimation != null)
                {
                    var anin = TileAnimation.AnimationTileIndex;
                    var ind = animationFrame;
                    var frame = TileAnimation.Frames[ind];
                    if (frame.Falsey())
                        frame = TileAnimation.Frames[0];
                    var file = TileAnimation.GetAnimationFile();
                    var va = file[frame.StartingTileIndex + (Index - anin)];
                    if (va != null)
                    {
                        va.Draw(canvas, pos, xflip, yflip, palette, animationFrame);
                        return true;
                    }
                    return false;
                }

            }
            canAnimate = false;//really shouldnt hit here, means theres a bug in the data i think

            return false;
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