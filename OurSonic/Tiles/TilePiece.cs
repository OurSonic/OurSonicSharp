using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonicModels;
namespace OurSonic.Tiles
{
    public class TilePiece
    {
        private int[][] drawInfo = new[] { new[] { 0, 0 }, new[] { 1, 0 }, new[] { 0, 1 }, new[] { 1, 1 } };
        private int[][] drawOrder = new[] { new[] { 3, 2, 1, 0 }, new[] { 1, 0, 3, 2 }, new[] { 2, 3, 0, 1 }, new[] { 0, 1, 2, 3 } };
        [IntrinsicProperty]
        private JsDictionary<string, CanvasElement> Image { get; set; }
        [IntrinsicProperty]
        protected object HeightMask { get; set; }
        [IntrinsicProperty]
        public List<TileItem> Tiles { get; set; }
        [IntrinsicProperty]
        public int Block { get; set; }
        [IntrinsicProperty]
        public bool XFlip { get; set; }
        [IntrinsicProperty]
        public bool YFlip { get; set; }
        [IntrinsicProperty]
        public int[] AnimatedFrames { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public Solidity Solid1 { get; set; }
        [IntrinsicProperty]
        public Solidity Solid2 { get; set; }

        public TilePiece()
        {
            Image = new JsDictionary<string, CanvasElement>();
        }

        public void ClearCache()
        {
            Image = new JsDictionary<string, CanvasElement>();
        }

        private bool? onlyBackground;
        public bool OnlyBackground()
        {
            if (onlyBackground.HasValue) return onlyBackground.Value;

            var tiles = SonicManager.Instance.SonicLevel.Tiles;
            foreach (var mj in Tiles)
            {
                if (tiles[mj._Tile].Truthy())
                {
                    if (mj.Priority)
                        return (onlyBackground = false).Value;
                }
            }
            return (onlyBackground = true).Value;
        } 
        
        private bool? onlyForeground;
        public bool OnlyForeground()
        {
            if (onlyForeground.HasValue) return onlyForeground.Value;

            var tiles = SonicManager.Instance.SonicLevel.Tiles;
            foreach (var mj in Tiles)
            {
                if (tiles[mj._Tile].Truthy())
                {
                    if (!mj.Priority)
                        return (onlyForeground = false).Value;
                }
            }
            return (onlyForeground = true).Value;
        }

        public void DrawUI(CanvasContext2D canvas, Point position, Point scale, bool xflip, bool yflip)
        {
            /*                var drawOrderIndex = 0;
                            if (xflip) {
                                if (yflip) {
                                    drawOrderIndex = 0;
                                } else {
                                    drawOrderIndex = 1;
                                }
                            } else {
                                if (yflip) {
                                    drawOrderIndex = 2;

                                } else {
                                    drawOrderIndex = 3;
                                }
                            }
                            for (var i = 0; i < this.tiles.length; i++) {
                                var mj = sonicManager.SonicLevel.Tiles[this.tiles[i].Tile];
                                if (mj) {
                                    var df = drawInfo[drawOrder[drawOrderIndex][i]];
                                    TilePiece.__position.x = position.x + df[0] * 8 * scale.x;
                                    TilePiece.__position.y = position.y + df[1] * 8 * scale.y;
                                    mj.drawUI(canvas, TilePiece.__position, scale, (xflip^ mj.XFlip), (yflip^mj.YFlip), mj.Palette);


                                }
                                /* canvas.lineWidth = 2;
                                canvas.strokeStyle = "#D142AA";
                                canvas.strokeRect(position.x, position.y, 16 * scale.x, 16 * scale.y);#1#
                            }


                            //canvas.fillStyle = "#FFFFFF";
                            //canvas.fillText(sonicManager.SonicLevel.Blocks.indexOf(this), position.x + 8 * scale.x, position.y + 8 * scale.y);


                            return true;
            */
        }

        public bool Draw(CanvasContext2D canvas,
                         Point position,
                         Point scale,
                         int layer,
                         bool xFlip,
                         bool yFlip,
                         int animatedIndex)
        {
            var drawOrderIndex = 0;

            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);
            var fd = GetCache(layer, scale, drawOrderIndex, animatedIndex, SonicManager.Instance.SonicLevel.palAn);
            if (fd.Falsey()) fd = buildCache(scale, layer, xFlip, yFlip, animatedIndex, drawOrderIndex);
            DrawIt(canvas, fd, position);
            return true;
        }

        private CanvasElement buildCache(Point scale, int layer, bool xFlip, bool yFlip, int animatedIndex, int drawOrderIndex)
        {
            CanvasElement fd;
            var ac = Help.DefaultCanvas(8 * SonicManager.Instance.Scale.X * 2, 8 * SonicManager.Instance.Scale.Y * 2);
            var sX = 8 * scale.X;
            var sY = 8 * scale.Y;
            var i = 0;

            var localPoint = new Point(0, 0);
            var tiles = SonicManager.Instance.SonicLevel.Tiles;
            for (int index = 0; index < Tiles.Count; index++)
            {
                var mj = Tiles[index];
                if (tiles[mj._Tile].Truthy())
                {
                    if (mj.Priority == (layer == 1))
                    {
                        var _xf = xFlip ^ mj.XFlip;
                        var _yf = yFlip ^ mj.YFlip;
                        var df = drawInfo[drawOrder[drawOrderIndex][i]];
                        localPoint.X = df[0] * sX;
                        localPoint.Y = df[1] * sY;
                        tiles[mj._Tile].Draw(ac.Context, localPoint, scale, _xf, _yf, mj.Palette, layer, animatedIndex);
                    }
                }
                i++;
            }
            fd = ac.Canvas;
            SetCache(layer, scale, drawOrderIndex, animatedIndex, SonicManager.Instance.SonicLevel.palAn, fd);
            return fd;
        }

        private void SetCache(int layer,
                              Point scale,
                              int drawOrder,
                              int animationFrame,
                              List<int> palAn,
                              CanvasElement image)
        {
            dynamic val = ((drawOrder << 8) + (scale.X << 16) + (animationFrame << 20) + ((layer + 1) << 24));
            if (AnimatedFrames.Length > 0)
            {
                for (int index = 0; index < AnimatedFrames.Length; index++)
                {
                    var animatedFrame = AnimatedFrames[index];
                    val += palAn[animatedFrame] + " ";
                }
            }
            Image.Me()[val] = image;
        }

        private void DrawIt(CanvasContext2D canvas, CanvasElement fd, Point position)
        {
            canvas.DrawImage(fd, position.X, position.Y);
        }

        private CanvasElement GetCache(int layer, Point scale, int drawOrder, int animationFrame, List<int> palAn)
        {
            dynamic val = ((drawOrder<<8) + (scale.X << 16) + (animationFrame << 20) + ((layer + 1) << 24));
            if (AnimatedFrames.Length > 0){
                foreach (var animatedFrame in AnimatedFrames) {
                    val += palAn[animatedFrame] + " ";
                }
            }

           return Script.Reinterpret<CanvasElement>(Image.Me()[val]);
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