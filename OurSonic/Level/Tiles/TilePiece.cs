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
        private static readonly int[][] DrawInfo = new[] {new[] {0, 0}, new[] {1, 0}, new[] {0, 1}, new[] {1, 1}};
        private static readonly int[][] DrawOrder = new[] {new[] {3, 2, 1, 0}, new[] {1, 0, 3, 2}, new[] {2, 3, 0, 1}, new[] {0, 1, 2, 3}};
        private bool onlyBackground;
        private bool onlyBackgroundSet;
        private bool onlyForeground;
        private bool onlyForegroundSet;
        private bool? shouldAnimate;
        [IntrinsicProperty]
        private JsDictionary<string, CanvasElement> Image { get; set; }
        [IntrinsicProperty]
        public List<TileItem> Tiles { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        public List<int> AnimatedFrames { get; set; }

        public TilePiece()
        {
            Image = new JsDictionary<string, CanvasElement>();
        }

        public void Init()
        {
            OnlyBackground();
            OnlyForeground();
        }

        public void ClearCache()
        {
            Image = new JsDictionary<string, CanvasElement>();
        }

        public bool OnlyBackground()
        {
            if (onlyBackgroundSet) return onlyBackground;

            foreach (var mj in Tiles) {
                if (mj.Truthy()) {
                    if (mj.Priority) {
                        onlyBackgroundSet = true;
                        return ( onlyBackground = false );
                    }
                }
            }
            onlyBackgroundSet = true;
            return ( onlyBackground = true );
        }

        public bool OnlyForeground()
        {
            if (onlyForegroundSet) return onlyForeground;

            foreach (var mj in Tiles) {
                if (mj.Truthy()) {
                    if (!mj.Priority) {
                        onlyForegroundSet = true;
                        return ( onlyForeground = false );
                    }
                }
            }
            onlyForegroundSet = true;
            return ( onlyForeground = true );
        }

        public bool Draw(CanvasContext2D canvas,
                         Point position,
                         int layer,
                         bool xFlip,
                         bool yFlip,
                         int animatedIndex)
        {
            var drawOrderIndex = 0;
            drawOrderIndex = xFlip ? ( yFlip ? 0 : 1 ) : ( yFlip ? 2 : 3 );

            /*



            var i = 0;

            var localPoint=new Point(0,0);


            foreach (TileItem t in Tiles.Array())
            {
                var mj = t;
                var tile = t.GetTile();
                if (tile.Truthy())
                {
                    if (mj.Priority == (layer == 1))
                    {
                        var _xf = xFlip ^ mj.XFlip;
                        var _yf = yFlip ^ mj.YFlip;
                        var df = DrawInfo[DrawOrder[drawOrderIndex][i]];
                        localPoint.X = position.X+ df[0] * 8;
                        localPoint.Y = position.Y + df[1] * 8;
                        tile.Draw(canvas, localPoint, _xf, _yf, mj.Palette,  animatedIndex);
                    }
                }
                i++;
            }




*/

            var fd = GetCache(layer, drawOrderIndex, animatedIndex);
            if (fd.Falsey())

                fd = buildCache(layer, xFlip, yFlip, animatedIndex, drawOrderIndex);
            DrawIt(canvas, fd, position);
            return true;
        }

        public bool ShouldAnimate()
        {
            if (shouldAnimate == null) {
                foreach (TileItem t in Tiles) {
                    var mj = t.GetTile();
                    if (mj.Truthy()) {
                        if (mj.ShouldAnimate())
                            return ( shouldAnimate = true ).Value;
                    }
                }
                shouldAnimate = false;
            }
            return ( shouldAnimate ).Value;
        }

        private CanvasElement buildCache(int layer, bool xFlip, bool yFlip, int animatedIndex, int drawOrderIndex)
        {
            CanvasElement fd;
            var ac = CanvasInformation.Create(8 * 2, 8 * 2);
            var sX = 8;
            var sY = 8;
            var i = 0;

            var localPoint = new Point(0, 0);
            foreach (TileItem t in Tiles.Array()) {
                var mj = t;
                var tile = t.GetTile();
                if (tile.Truthy()) {
                    if (mj.Priority == ( layer == 1 )) {
                        var _xf = xFlip ^ mj.XFlip;
                        var _yf = yFlip ^ mj.YFlip;
                        var df = DrawInfo[DrawOrder[drawOrderIndex][i]];
                        localPoint.X = df[0] * sX;
                        localPoint.Y = df[1] * sY;
                        tile.Draw(ac.Context, localPoint, _xf, _yf, mj.Palette, animatedIndex);
                    }
                }
                i++;
            }
            //            ac.Context.StrokeStyle = "#FF593F";
            //            ac.Context.LineWidth = 1;
            //            ac.Context.StrokeRect(0, 0, 2*8 * SonicManager.Instance.Scale.X, 2*8 * SonicManager.Instance.Scale.Y);

            fd = ac.Canvas;
            SetCache(layer, drawOrderIndex, animatedIndex, fd);
            return fd;
        }

        private void SetCache(int layer,
                              int drawOrder,
                              int animationFrame,
                              
                              CanvasElement image)
        {
            List<int> palAn = SonicManager.Instance.SonicLevel.PaletteAnimationIndexes;
            dynamic val = ( ( drawOrder << 8 ) + ( animationFrame << 20 ) + ( ( layer + 1 ) << 24 ) ); //okay
            if (AnimatedFrames.Count > 0) {
                for (int index = 0; index < AnimatedFrames.Count; index++) {
                    var animatedFrame = AnimatedFrames[index];
                    val += palAn[animatedFrame] + " ";
                }
            }
            Image.Me()[val] = image;
        }

        private CanvasElement GetCache(int layer, int drawOrder, int animationFrame)
        {
            List<int> palAn = SonicManager.Instance.SonicLevel.PaletteAnimationIndexes;
            dynamic val = ( ( drawOrder << 8 ) + ( animationFrame << 20 ) + ( ( layer + 1 ) << 24 ) ); //okay
            if (AnimatedFrames.Count > 0) {
                foreach (var animatedFrame in AnimatedFrames) {
                    val += palAn[animatedFrame] + " ";
                }
            }

            return Script.Reinterpret<CanvasElement>(Image.Me()[val]);
        }

        private void DrawIt(CanvasContext2D canvas, CanvasElement fd, Point position)
        {
            canvas.DrawImage(fd, position.X, position.Y);

            UIManagerAreas areas = SonicManager.Instance.UIManager.UIManagerAreas;
            if (areas.TilePieceArea != null && areas.TilePieceArea.Data != null && areas.TilePieceArea.Data.Index == Index) {
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