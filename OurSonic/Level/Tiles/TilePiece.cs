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
        public List<TileItem> Tiles { get; set; }
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

        public bool Draw(CanvasContext2D canvas,
                         Point position,
                         ChunkLayer layer,
                         bool xFlip,
                         bool yFlip,
                         int animatedIndex)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

            int tilePieceLength = 8;

            var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2);
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileItem tileItem in Tiles.Array())
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
                        tile.DrawAnimatedPalette(ac.Context, localPoint, _xf, _yf, tileItem.Palette, animatedIndex);
                    }
                }
                i++;
            }

            DrawIt(canvas, ac.Canvas, position);
            return true;
        }



        public bool DrawBase(CanvasContext2D canvas,
                 Point position,
                 ChunkLayer layer,
                 bool xFlip,
                 bool yFlip)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

            int tilePieceLength = 8;

            var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2);
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileItem tileItem in Tiles.Array())
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

            DrawIt(canvas, ac.Canvas, position);
            return true;
        }
        public bool DrawAnimatedPalette(CanvasContext2D canvas, Point position, ChunkLayer layer, bool xFlip, bool yFlip, int animatedPaletteIndex)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

            int tilePieceLength = 8;

            var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2);
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileItem tileItem in Tiles.Array())
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
                        tile.DrawAnimatedPalette(ac.Context, localPoint, _xf, _yf, tileItem.Palette,animatedPaletteIndex);
                    }
                }
                i++;
            }

            DrawIt(canvas, ac.Canvas, position);
            return true;
        }
        public bool DrawAnimatedTile(CanvasContext2D canvas, Point position, ChunkLayer layer, bool xFlip, bool yFlip, int animatedTileIndex)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);

            int tilePieceLength = 8;

            var ac = CanvasInformation.Create(tilePieceLength * 2, tilePieceLength * 2);
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileItem tileItem in Tiles.Array())
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

            DrawIt(canvas, ac.Canvas, position);
            return true;
        }





        public bool ShouldAnimate()
        {
            if (shouldAnimate == null)
            {
                foreach (TileItem t in Tiles)
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


        private void DrawIt(CanvasContext2D canvas, CanvasElement fd, Point position)
        {
            canvas.DrawImage(fd, position.X, position.Y);

            UIManagerAreas areas = SonicManager.Instance.UIManager.UIManagerAreas;
            if (areas.TilePieceArea != null && areas.TilePieceArea.Data != null && areas.TilePieceArea.Data.Index == Index)
            {
                canvas.Save();
                canvas.StrokeStyle = "light green";
                canvas.LineWidth = 2;
                canvas.StrokeRect(position.X, position.Y, fd.Width, fd.Height);
                canvas.Restore();
            }
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