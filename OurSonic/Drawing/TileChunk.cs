using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Linq;
using System.Text;

namespace OurSonic.Drawing
{
    public class TileChunk
    {
        public TileChunk(/*TilePiece[][] tilePieces*/)
        { 
            HLayers = new bool[0][];
            Sprites = new List<string>();
            isOnlyBackground = null;
        }

        protected bool? isOnlyBackground { get; set; }
        protected bool? empty { get; set; }

        protected List<string> Sprites { get; set; }

        protected bool[][] HLayers { get; set; }

        public TilePiece[][] TilePieces { get; set; }

        public TilePiece GetBlock(int x, int y)
        {
            return SonicManager.Instance.SonicLevel.Blocks[TilePieces[x / 16][y / 16].Block];
        }

        public TilePiece GetTilePiece(int x, int y)
        {
            return TilePieces[x / 16][y / 16];
        }


        public bool OnlyBackground()
        {
            if (isOnlyBackground == null)
            {
                for (int i = 0; i < TilePieces.Length; i++)
                {
                    for (int j = 0; j < TilePieces[i].Length; j++)
                    {
                        var r = TilePieces[i][j];
                        var pm = SonicManager.Instance.SonicLevel.Blocks[r.Block];
                        if (pm != null)
                        {
                            if (!pm.OnlyBackground())
                            {
                                return (isOnlyBackground = false).Value;
                            }
                        }
                    }
                }
                isOnlyBackground = true;
            }
            return isOnlyBackground.Value;

        }

        public bool IsEmpty()
        {
            if (empty == null)
            {
                for (int i = 0; i < TilePieces.Length; i++)
                {
                    for (int j = 0; j < TilePieces[i].Length; j++)
                    {
                        var r = TilePieces[i][j];
                        if (r.Block != 0)
                        {
                            return (empty = false).Value;
                        }
                    }
                }
                empty = true;
            }
            return empty.Value;
        }

        public void Draw(CanvasContext2D canvas, Point position, Point scale, int layer, IntersectingRectangle bounds)
        {

            canvas.Save();

            var len1 = TilePieces.Length;
            var len2 = TilePieces[0].Length;

            var lX = 16 * scale.X;
            var lY = 16 * scale.Y;
            for (int i = 0; i < len1; i++)
            {
                for (int j = 0; j < len2; j++)
                {
                    var r = TilePieces[i][j];
                    var pm = SonicManager.Instance.SonicLevel.Blocks[r.Block];
                    if (pm != null)
                    {
                        int animatedIndex=0;
                        if (Animated!=null && Animated[j * len1 + i] != null)
                        {
                            animatedIndex = Animated[j*len1 + i].LastAnimatedIndex;
                        }
                        pm.Draw(canvas, new Point(position.X + i*lX,position.Y+j*lY),scale,layer,r.XFlip,r.YFlip,animatedIndex,bounds);
                        //canvas.StrokeStyle = "#FFF";
                        //canvas.StrokeRect(position.X + i * 16 * scale.X, position.Y + j * 16 * scale.Y, scale.X * 16, scale.Y * 16);
                    }
                }
            }

            canvas.Restore();
        }

        public void AnimatedTick()
        {
            foreach (var anni in Animated)
            {
                if (anni.LastAnimatedFrame == null)
                {
                    anni.LastAnimatedFrame = 0;
                    anni.LastAnimatedIndex = 0;
                    if (anni.Frames[anni.LastAnimatedIndex].Ticks == 0 || (SonicManager.Instance.DrawTickCount - anni.LastAnimatedFrame) >= ((anni.AutomatedTiming > 0) ? anni.AutomatedTiming : anni.Frames[anni.LastAnimatedIndex].Ticks))
                    {
                        anni.LastAnimatedFrame = SonicManager.Instance.DrawTickCount;
                        anni.LastAnimatedIndex = (anni.LastAnimatedIndex + 1)%anni.Frames.Length;
                    }
                }
            }
        }

        public List<Animation> Animated { get; set; }

        public int Index { get; set; }
    }
}
