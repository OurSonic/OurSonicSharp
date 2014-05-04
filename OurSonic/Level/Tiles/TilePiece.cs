using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Areas;
using OurSonic.UIManager;
using OurSonic.Utility;
namespace OurSonic.Level.Tiles
{
    public class TilePiece
    {
        private static readonly int[][] DrawInfo = { new[] { 0, 0 }, new[] { 1, 0 }, new[] { 0, 1 }, new[] { 1, 1 } };
        private static readonly int[][] DrawOrder = { new[] { 3, 2, 1, 0 }, new[] { 1, 0, 3, 2 }, new[] { 2, 3, 0, 1 }, new[] { 0, 1, 2, 3 } };

        private bool onlyBackground;
        private bool onlyBackgroundSet;
        private bool onlyForeground;
        private bool onlyForegroundSet;
        private bool? shouldAnimate;
        [IntrinsicProperty]
        public List<TileInfo> Tiles { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public List<int> AnimatedPaletteIndexes { get; set; }

        public List<int> AnimatedTileIndexes { get; set; }

        public void Init()
        {
            OnlyBackground();
            OnlyForeground();
        }


        public bool OnlyBackground()
        {
            if (onlyBackgroundSet) return onlyBackground;

            foreach (var mj in Tiles)
            {
                if (mj.Truthy())
                {
                    if (mj.Priority)
                    {
                        onlyBackgroundSet = true;
                        return (onlyBackground = false);
                    }
                }
            }
            onlyBackgroundSet = true;
            return (onlyBackground = true);
        }

        public bool OnlyForeground()
        {
            if (onlyForegroundSet) return onlyForeground;

            foreach (var mj in Tiles)
            {
                if (mj.Truthy())
                {
                    if (!mj.Priority)
                    {
                        onlyForegroundSet = true;
                        return (onlyForeground = false);
                    }
                }
            }
            onlyForegroundSet = true;
            return (onlyForeground = true);
        }




        public void DrawBase(CanvasRenderingContext2D canvas,
                 Point position,
                 ChunkLayer layer,
                 bool xFlip,
                 bool yFlip)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

            int tilePieceLength = 8;

            var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2, false);
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileInfo tileItem in Tiles.Array())
            {
                var tile = tileItem.GetTile();
                if (tile.Truthy())
                {
                    if (tileItem.Priority == ((int)layer == 1))
                    {
                        var _xf = xFlip ^ tileItem.XFlip;
                        var _yf = yFlip ^ tileItem.YFlip;
                        var df = DrawInfo[DrawOrder[drawOrderIndex][i]];
                        localPoint.X = df[0] * tilePieceLength;
                        localPoint.Y = df[1] * tilePieceLength;
                        tile.DrawBase(ac.Context, localPoint, _xf, _yf, tileItem.Palette);
                    }
                }
                i++;
            }
            canvas.DrawImage(ac.Canvas, position.X, position.Y);
              
        }

        private int getAnimatedPaletteCacheIndex(bool xflip, bool yflip, int animatedPaletteIndex, int frameIndex)
        {
            return (frameIndex << 8) + (animatedPaletteIndex << 7) + ((xflip ? 1 : 0) << 5) + ((yflip ? 1 : 0) << 4);
        }



        private JsDictionary<int, CanvasInformation> animatedPaletteCaches = new JsDictionary<int, CanvasInformation>();



        public void DrawAnimatedPalette(CanvasRenderingContext2D canvas, Point position, ChunkLayer layer, bool xFlip, bool yFlip, int animatedPaletteIndex)
        {


            var animatedPaletteCacheIndex = getAnimatedPaletteCacheIndex(xFlip, yFlip, animatedPaletteIndex, SonicManager.Instance.TilePaletteAnimationManager.GetPaletteAnimation(animatedPaletteIndex).CurrentFrame);


            CanvasInformation animatedPaletteCache = animatedPaletteCaches[animatedPaletteCacheIndex];
            if (animatedPaletteCache == null)
            {

                var drawOrderIndex = 0;
                drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

                int tilePieceLength = 8;

                var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2, false);
                var i = 0;

                var localPoint = new Point(0, 0);
                foreach (TileInfo tileItem in Tiles.Array())
                {
                    var tile = tileItem.GetTile();
                    if (tile.Truthy())
                    {
                        if (tileItem.Priority == ((int)layer == 1))
                        {
                            var _xf = xFlip ^ tileItem.XFlip;
                            var _yf = yFlip ^ tileItem.YFlip;
                            var df = DrawInfo[DrawOrder[drawOrderIndex][i]];
                            localPoint.X = df[0] * tilePieceLength;
                            localPoint.Y = df[1] * tilePieceLength;
                            tile.DrawAnimatedPalette(ac.Context, localPoint, _xf, _yf, tileItem.Palette, animatedPaletteIndex);
                        }
                    }
                    i++;
                }
                animatedPaletteCaches[animatedPaletteCacheIndex] = animatedPaletteCache=ac;
            }

            canvas.DrawImage(animatedPaletteCache.Canvas, position.X, position.Y);
        }
        public void DrawAnimatedTile(CanvasRenderingContext2D canvas, Point position, ChunkLayer layer, bool xFlip, bool yFlip, int animatedTileIndex)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

            int tilePieceLength = 8;

            var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2, false);
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileInfo tileItem in Tiles.Array())
            {
                var tile = tileItem.GetTile();
                if (tile.Truthy())
                {
                    if (tileItem.Priority == ((int)layer == 1))
                    {
                        var _xf = xFlip ^ tileItem.XFlip;
                        var _yf = yFlip ^ tileItem.YFlip;
                        var df = DrawInfo[DrawOrder[drawOrderIndex][i]];
                        localPoint.X = df[0] * tilePieceLength;
                        localPoint.Y = df[1] * tilePieceLength;
                        tile.DrawAnimatedTile(ac.Context, localPoint, _xf, _yf, tileItem.Palette, animatedTileIndex);
                    }
                }
                i++;
            }
            canvas.DrawImage(ac.Canvas, position.X, position.Y);
        }





        public bool ShouldAnimate()
        {
            if (shouldAnimate == null)
            {
                foreach (TileInfo t in Tiles)
                {
                    var tile = t.GetTile();
                    if (tile.Truthy())
                    {
                        if (tile.ShouldTileAnimate())
                            return (shouldAnimate = true).Value;
                    }
                }
                shouldAnimate = false;
            }
            return (shouldAnimate).Value;
        }


 
        public int GetLayer1Angles()
        {
            return SonicManager.Instance.SonicLevel.Angles[SonicManager.Instance.SonicLevel.CollisionIndexes1[Index]];
        }

        public int GetLayer2Angles()
        {
            return SonicManager.Instance.SonicLevel.Angles[SonicManager.Instance.SonicLevel.CollisionIndexes2[Index]];
        }

        public HeightMap GetLayer1HeightMaps()
        {
            return SonicManager.Instance.SonicLevel.HeightMaps[SonicManager.Instance.SonicLevel.CollisionIndexes1[Index]];
        }

        public HeightMap GetLayer2HeightMaps()
        {
            return SonicManager.Instance.SonicLevel.HeightMaps[SonicManager.Instance.SonicLevel.CollisionIndexes2[Index]];
        }
    }
    public enum RotationMode
    {
        Floor = 134,
        RightWall = 224,
        Ceiling = 314,
        LeftWall = 44
    }
}