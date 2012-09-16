using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;

namespace OurSonic.Drawing
{
    public class TilePiece
    {
        private int cx;
        private int cy;
        protected JsDictionary<string, CanvasElement> Image { get; set; }
        protected object HeightMask { get; set; }
        public List<Tile> Tiles { get; set; }

        private int[][] drawInfo = new[] { new[] { 0, 0 }, new[] { 1, 0 }, new[] { 0, 1 }, new[] { 1, 1 } };

        private int[][] drawOrder = new[] { new[] { 3, 2, 1, 0 }, new[] { 1, 0, 3, 2 }, new[] { 2, 3, 0, 1 }, new[] { 0, 1, 2, 3 } };

        public TilePiece()
        {
            cx = 8 * SonicManager.Instance.Scale.X * 2;
            cy = 8 * SonicManager.Instance.Scale.Y * 2;
            Image = new JsDictionary<string, CanvasElement>();
       }


        public int Block { get; set; }

        public bool XFlip { get; set; }
        public bool YFlip { get; set; }

        public bool OnlyBackground()
        {
            foreach (var mj in Tiles)
            {
                if (SonicManager.Instance.SonicLevel.Tiles[mj._Tile] != null)
                {
                    if (mj.Priority)
                    {
                        return false;
                    }
                }
                
            }
            return true;
        }

        public void DrawUI(CanvasContext2D canvas, Point position, Point scale, bool xflip,bool yflip)
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

        public bool Draw(CanvasContext2D canvas, Point position, Point scale, int layer, bool xFlip, bool yFlip, int animatedIndex, IntersectingRectangle bounds)
        {
            if (! bounds.Intersects(position))
            {
                return true;
            }
            var drawOrderIndex = 0;


            drawOrderIndex = xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3);
            var fd = GetCache(layer, scale, drawOrderIndex, AnimationFrame, SonicManager.Instance.SonicLevel.palAn);
            if (fd == null)
            {
                var ac = Help.DefaultCanvas(cx, cy);
                var sX = 8 * scale.X;
                var sY = 8*scale.Y;
                var i = 0;

                foreach (var mj in Tiles)
                {
                    if (SonicManager.Instance.SonicLevel.Tiles[mj._Tile] != null)
                    {
                        if (mj.Priority == (layer==1))
                        {
                            var _xf = xFlip ^ mj.XFlip;
                            var _yf = yFlip ^ mj.YFlip;
                            var df = drawInfo[drawOrder[drawOrderIndex][i]];
                            SonicManager.Instance.SonicLevel.Tiles[mj._Tile].Draw(ac.Context, new Point(df[0] * sX, df[1] * sY),scale,_xf,_yf,mj.Palette,layer,AnimationFrame);
                        }
                    }
                    i++;
                }
                fd = (CanvasElement) ac.DomCanvas[0];
                SetCache(layer, scale, drawOrderIndex, AnimationFrame, SonicManager.Instance.SonicLevel.palAn, fd);

            }
            DrawIt(canvas, fd, position);
            return true; 
        }

        private void SetCache(int layer, Point scale, int drawOrder, int animationFrame, List<int> palAn, CanvasElement image)
        {

            string val = ((drawOrder + 1) + (scale.X * 10) + (animationFrame * 1000) + ((layer + 1) * 10000)).ToString();
            foreach (var animatedFrame in AnimatedFrames)
            {
                val += palAn[animatedFrame] + " ";
            }
            Image[val] = image; 
        }

        protected List<int> AnimatedFrames { get; set; }

        private void DrawIt(CanvasContext2D canvas, CanvasElement fd, Point position)
        {
            canvas.DrawImage(fd, position.X, position.Y);
        }

        private CanvasElement GetCache(int layer, Point scale, int drawOrder, int animationFrame, List<int> palAn)
        {
            string val = ((drawOrder + 1) + (scale.X * 10) + (animationFrame * 1000) + ((layer + 1) * 10000)).ToString();
            foreach (var animatedFrame in AnimatedFrames)
            {
                val += palAn[animatedFrame] + " ";
            }



            if (Image[val]==null) return null;
            return Image[val];
             
        } 

        protected int AnimationFrame { get; set; }

        public int Index { get; set; }
    }

    public enum RotationMode
    {
        Floor = 134,
        RightWall = 224,
        Ceiling = 314,
        LeftWall = 44
    }
}
