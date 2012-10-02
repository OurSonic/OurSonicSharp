using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonicModels;
namespace OurSonic.Tiles
{
    public class TileChunk
    {
        private Point myLocalPoint = new Point(0, 0);
        [IntrinsicProperty]
        protected bool? isOnlyBackground { get; set; }
        [IntrinsicProperty]
        protected bool? isOnlyForeground { get; set; }
        [IntrinsicProperty]
        protected bool? empty { get; set; }
        [IntrinsicProperty]
        protected List<string> Sprites { get; set; }
        [IntrinsicProperty]
        protected bool[][] HLayers { get; set; }
        [IntrinsicProperty]
        public TilePiece[][] TilePieces { get; set; }
        [IntrinsicProperty]
        public JsDictionary<int, Animation> Animated { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        public Solidity[][] HeightBlocks1 { get; set; }
        public Solidity[][] HeightBlocks2 { get; set; } 
        public int[][] AngleMap1 { get; set; }
        public int[][] AngleMap2 { get; set; }

        public TileChunk( /*TilePiece[][] tilePieces*/)
        {
            HLayers = new bool[0][];
            Sprites = new List<string>();
            isOnlyBackground = null;

         
        }

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
            if (isOnlyBackground.HasValue) return isOnlyBackground.Value;

            var blocks = SonicManager.Instance.SonicLevel.Blocks;

            var tpl = TilePieces.Length;
            var tph = TilePieces[0].Length;
            for (int i = 0; i < tpl; i++) {
                for (int j = 0; j < tph; j++) {
                    var r = TilePieces[i][j];
                    var pm = blocks[r.Block];
                    if (pm.Truthy()) {
                        if (!pm.OnlyBackground())
                            return ( isOnlyBackground = false ).Value;
                    }
                }
            }
            isOnlyBackground = true;
            return isOnlyBackground.Value;
        }

        public bool OnlyForeground()
        {
            if (isOnlyForeground.HasValue) return isOnlyForeground.Value;

            var blocks = SonicManager.Instance.SonicLevel.Blocks;

            var tpl = TilePieces.Length;
            var tph = TilePieces[0].Length;
            for (int i = 0; i < tpl; i++) {
                for (int j = 0; j < tph; j++) {
                    var r = TilePieces[i][j];
                    var pm = blocks[r.Block];
                    if (pm.Truthy()) {
                        if (!pm.OnlyForeground())
                            return ( isOnlyForeground = false ).Value;
                    }
                }
            }
            isOnlyForeground = true;
            return isOnlyForeground.Value;
        }

        public bool IsEmpty()
        {
            if (empty.Falsey()) {
                var tpl = TilePieces.Length;
                var tph = TilePieces[0].Length;
                for (int i = 0; i < tpl; i++) {
                    for (int j = 0; j < tph; j++) {
                        var r = TilePieces[i][j];
                        if (r.Block != 0)
                            return ( empty = false ).Value;
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

            bool isBack = layer == 0;

            var blocks = SonicManager.Instance.SonicLevel.Blocks;
            for (int i = 0; i < len1; i++) {
                for (int j = 0; j < len2; j++) {
                    var r = TilePieces[i][j];
                    var pm = blocks[r.Block];
                    if (pm.Truthy()) if (drawIt(canvas, position, scale, layer, lX, lY, r, j, pm, isBack, i, len1)) continue;
                }
            }

            canvas.Restore();
        }

        private bool drawIt(CanvasContext2D canvas,
                            Point position,
                            Point scale,
                            int layer,
                            int lX,
                            int lY,
                            TilePiece r,
                            int j,
                            TilePiece pm,
                            bool isBack,
                            int i,
                            int len1)
        {
            if (isBack ? ( pm.onlyForeground ) : ( pm.onlyBackground )) return true;

            int animatedIndex = 0;
            if (Animated.Truthy() && ( Animated[j * len1 + i].Truthy() ))
                animatedIndex = Animated[j * len1 + i].LastAnimatedIndex;

            myLocalPoint.X = position.X + i * lX;
            myLocalPoint.Y = position.Y + j * lY;
            pm.Draw(canvas, myLocalPoint, scale, layer, r.XFlip, r.YFlip, animatedIndex);
            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + i * 16 * scale.X, position.Y + j * 16 * scale.Y, scale.X * 16, scale.Y * 16);
            return false;
        }

        public void AnimatedTick()
        {
            foreach (var an in Animated) {
                var anni = an.Value;
                if (anni.LastAnimatedFrame.Falsey()) {
                    anni.LastAnimatedFrame = 0;
                    anni.LastAnimatedIndex = 0;
                }
                if (anni.Frames[anni.LastAnimatedIndex].Ticks == 0 ||
                    ( SonicManager.Instance.DrawTickCount - anni.LastAnimatedFrame ) >=
                    ( ( anni.AutomatedTiming > 0 ) ? anni.AutomatedTiming : anni.Frames[anni.LastAnimatedIndex].Ticks )) {
                    anni.LastAnimatedFrame = SonicManager.Instance.DrawTickCount;
                    anni.LastAnimatedIndex = ( anni.LastAnimatedIndex + 1 ) % anni.Frames.Length;
                }
            }
        }
    }
}