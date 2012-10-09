using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level.Animations;
using OurSonic.Utility;
using OurSonicModels;
namespace OurSonic.Level.Tiles
{
    public class TileChunk
    {
        private const int numOfPiecesWide = 8;
        private const int numOfPiecesLong = 8;

        #region UI

        public void DrawUI(CanvasContext2D canvas, Point position, DoublePoint scale, int layer)
        {
            using (new CanvasHandler(canvas)) {
                canvas.Translate(position.X, position.Y);
                canvas.Scale(scale.X, scale.Y);

                var pieceWidth = 16 * 1;
                var pieceHeight = 16 * 1;

                bool isBack = layer == 0;

                //for building no aniamtion cache
                drawOld(canvas, new Point(0,0), layer, pieceWidth, pieceHeight, isBack, false, null, null);
            }
        }

        #endregion

        private List<TileCacheBlock>[] layerCacheBlocks;
        private Point myLocalPoint = new Point(0, 0);
        private bool? myNeverAnimate;
        private CanvasInformation[] neverAnimateCache;
        [IntrinsicProperty]
        private bool? IsOnlyBackground { get; set; }
        [IntrinsicProperty]
        private bool? IsOnlyForeground { get; set; }
        [IntrinsicProperty]
        private bool? Empty { get; set; }
        [IntrinsicProperty]
        private List<string> Sprites { get; set; }
        [IntrinsicProperty]
        public TilePieceInfo[][] TilePieces { get; set; }
        [IntrinsicProperty]
        public JsDictionary<int, Animation> Animated { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public Solidity[][] HeightBlocks1 { get; set; }
        [IntrinsicProperty]
        public Solidity[][] HeightBlocks2 { get; set; }
        [IntrinsicProperty]
        public int[][] AngleMap1 { get; set; }
        [IntrinsicProperty]
        public int[][] AngleMap2 { get; set; }

        public TileChunk( /*TilePiece[][] tilePieces*/)
        {
            Sprites = new List<string>();
            IsOnlyBackground = null;
            neverAnimateCache = new CanvasInformation[2];
            layerCacheBlocks = new List<TileCacheBlock>[2];
        }

        public void ClearCache()
        {
            layerCacheBlocks = new List<TileCacheBlock>[2];
            neverAnimateCache = new CanvasInformation[2];
        }

        public TilePiece GetBlockAt(int x, int y)
        {
            return TilePieces[x / 16][y / 16].GetTilePiece();
        }

        public TilePieceInfo GetTilePiece(int x, int y)
        {
            return TilePieces[x / 16][y / 16];
        }

        public bool OnlyBackground()
        {
            if (IsOnlyBackground.HasValue) return IsOnlyBackground.Value;

            var tpl = TilePieces.Length;
            var tph = TilePieces[0].Length;
            for (int i = 0; i < tpl; i++) {
                for (int j = 0; j < tph; j++) {
                    var r = TilePieces[i][j].GetTilePiece();
                    if (!r.OnlyBackground())
                        return ( IsOnlyBackground = false ).Value;
                }
            }
            IsOnlyBackground = true;
            return IsOnlyBackground.Value;
        }

        public bool OnlyForeground()
        {
            if (IsOnlyForeground.HasValue) return IsOnlyForeground.Value;

            var tpl = TilePieces.Length;
            var tph = TilePieces[0].Length;
            for (int i = 0; i < tpl; i++) {
                for (int j = 0; j < tph; j++) {
                    if (!TilePieces[i][j].GetTilePiece().OnlyForeground())
                        return ( IsOnlyForeground = false ).Value;
                }
            }
            IsOnlyForeground = true;
            return IsOnlyForeground.Value;
        }

        public bool IsEmpty()
        {
            if (Empty.Falsey()) {
                var tpl = TilePieces.Length;
                var tph = TilePieces[0].Length;
                for (int i = 0; i < tpl; i++) {
                    for (int j = 0; j < tph; j++) {
                        var r = TilePieces[i][j];
                        if (r.Block != 0)
                            return ( Empty = false ).Value;
                    }
                }
                Empty = true;
            }
            return Empty.Value;
        }

        public bool NeverAnimates()
        {
            if (myNeverAnimate == null) {
                var len1 = TilePieces.Length;
                var len2 = TilePieces[0].Length;

                bool nothing = true;
                for (int i = 0; i < len1; i++) {
                    for (int j = 0; j < len2; j++) {
                        var pm = TilePieces[i][j].GetTilePiece();
                        if (( Animated.Truthy() && ( Animated[j * len1 + i].Truthy() ) ) || pm.AnimatedFrames.Length > 0) {
                            nothing = false;
                            goto done;
                        }
                    }
                }
                done:
                myNeverAnimate = nothing;
            }
            return myNeverAnimate.Value;
        }

        public void Draw(CanvasContext2D canvas, Point position, int layer, IntersectingRectangle bounds)
        {
            bool neverAnimates = NeverAnimates();

            if (layerCacheBlocks[layer] == null)
                layerCacheBlocks[layer] = BuildCacheBlock(layer, bounds);

            using (new CanvasHandler(canvas)) {
                if (neverAnimateCache[layer] != null) {
                    drawFullChunk(canvas, position, layer);

                    return;
                }

                CanvasContext2D oldCanvas = null;
                Point oldPoint = null;

                var pieceWidth = 16;
                var pieceHeight = 16;

                bool isBack = layer == 0;
                if (neverAnimates) {
                    oldCanvas = canvas;

                    neverAnimateCache[layer] = CanvasInformation.Create(numOfPiecesWide * pieceWidth, numOfPiecesLong * pieceHeight);
                    canvas = neverAnimateCache[layer].Context;
                    oldPoint = new Point(position);
                    position.Set(0, 0);
                    //for building no aniamtion cache
                    drawOld(canvas, position, layer, pieceWidth, pieceHeight, isBack, neverAnimates, oldPoint, oldCanvas);

                    return;
                }
                foreach (var tileCacheBlock in layerCacheBlocks[layer]) {
                    switch (tileCacheBlock.Type) {
                        case TileCacheBlockType.Block:

                            drawBlock(canvas, position, tileCacheBlock);

                            break;
                        case TileCacheBlockType.TilePiece:

                            drawTilePiece(canvas, position, layer, tileCacheBlock, isBack);

                            break;
                    }
                }
            }
        }

        private void drawOld(CanvasContext2D canvas, Point position, int layer, int pieceWidth, int pieceHeight, bool isBack, bool neverAnimates, Point oldPoint, CanvasContext2D oldCanvas)
        {
            int posX = position.X;
            int posY = position.Y;

            int curKey = 0; //pieceY * numOfPiecesWide + pieceX              VV
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++) {
                curKey = pieceY * numOfPiecesWide;
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++) {
                    curKey += pieceX;
                    drawIt(canvas, layer, TilePieces[pieceX][pieceY], isBack, curKey, posX + pieceX * pieceWidth, posY + pieceY * pieceHeight);
                }
            }

            if (neverAnimates) {
                position = oldPoint;
                canvas = oldCanvas;

                canvas.DrawImage(neverAnimateCache[layer].Canvas, position.X, position.Y);
            }
        }

        private void drawTilePiece(CanvasContext2D canvas, Point position, int layer, TileCacheBlock tileCacheBlock, bool isBack)
        {
            drawIt(canvas, layer, tileCacheBlock.TilePieceInfo, isBack, tileCacheBlock.AnimatedKey, position.X + tileCacheBlock.XPos, position.Y + tileCacheBlock.YPos);

            /*
                        canvas.Save();
                        canvas.StrokeStyle = "green";
                        canvas.StrokeRect(position.X * scale.X * pieceWidth, position.Y * scale.Y * pieceHeight, 16 * scale.X, 16 * scale.Y);
                        canvas.Restore();
            */
        }

        private static void drawBlock(CanvasContext2D canvas, Point position, TileCacheBlock tileCacheBlock)
        {
            canvas.DrawImage(tileCacheBlock.Block.Canvas, position.X /*tileCacheBlock.X * pieceWidth*/, position.Y /*tileCacheBlock.Y * pieceHeight*/);
        }

        private void drawFullChunk(CanvasContext2D canvas, Point position, int layer)
        {
            canvas.DrawImage(neverAnimateCache[layer].Canvas, position.X, position.Y);

            /*
                        canvas.Save();
                        canvas.StrokeStyle = "red";
                        canvas.StrokeRect(position.X, position.Y, 128 , 128);
                        canvas.Restore();
            */
        }

        private void drawIt(CanvasContext2D canvas,
                            int layer,
                            TilePieceInfo pieceInfo,
                            bool isBack,
                            int animatedKey,
                            int pointx,
                            int pointy)
        {
            var piece = pieceInfo.GetTilePiece();

            if (isBack ? ( piece.OnlyForeground() ) : ( piece.OnlyBackground() )) return;

            int animatedIndex = 0;
            Animation animation = Animated[animatedKey];

            if (Animated.Truthy() && ( animation.Truthy() ))
                animatedIndex = animation.LastAnimatedIndex;

            myLocalPoint.X = pointx;
            myLocalPoint.Y = pointy;
            piece.Draw(canvas, myLocalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip, animatedIndex);

            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
        }

        public List<TileCacheBlock> BuildCacheBlock(int layer, IntersectingRectangle bounds)
        {
            List<TileCacheBlock> tilePieces = new List<TileCacheBlock>();
            TileCacheBlock block = null;

            if (neverAnimateCache[layer] != null)
                return new List<TileCacheBlock>();

            var pieceWidth = 16;
            var pieceHeight = 16;

            if (NeverAnimates())
                return new List<TileCacheBlock>();

            bool isBack = layer == 0;

            for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++) {
                for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++) {
                    var cacheBlock = buildCacheBlock(layer, pieceWidth, pieceHeight, TilePieces[pieceX][pieceY], isBack, pieceX, pieceY, block);
                    switch (cacheBlock.Type) {
                        case TileCacheBlockType.Block:
                            block = cacheBlock;
                            break;
                        case TileCacheBlockType.TilePiece:
                            tilePieces.Add(cacheBlock);
                            break;
                    }
                }
            }

            List<TileCacheBlock> tileCacheBlocks = new List<TileCacheBlock>(tilePieces);
            if (block != null)
                tileCacheBlocks.Add(block);
            return tileCacheBlocks;
        }

        private TileCacheBlock buildCacheBlock(
                int layer,
                int pieceWidth,
                int pieceHeight,
                TilePieceInfo pieceInfo,
                bool isBack,
                int pieceX,
                int pieceY,
                TileCacheBlock oldCacheBlock)
        {
            //if (isBack ? (piece.onlyForeground) : (piece.onlyBackground)) return null;

            var piece = pieceInfo.GetTilePiece();
            int animatedIndex = 0;
            Animation animation = Animated[pieceY * numOfPiecesWide + pieceX];

            bool cacheBlockNeeded = false;
            bool shouldAnimate = piece.ShouldAnimate();

            if (Animated.Truthy() && ( animation.Truthy() ))
                animatedIndex = animation.LastAnimatedIndex;
            else {
                if (piece.AnimatedFrames.Length == 0 && ( !shouldAnimate || myNeverAnimate.Value ))
                    cacheBlockNeeded = true;
            }

            if (cacheBlockNeeded) {
                Point internalPoint = new Point(pieceX * pieceWidth, pieceY * pieceHeight);

                if (oldCacheBlock == null) {
                    oldCacheBlock = new TileCacheBlock(TileCacheBlockType.Block);
                    oldCacheBlock.Block = CanvasInformation.Create(pieceWidth * 8, pieceHeight * 8);
                    oldCacheBlock.Color = string.Format("rgba({0},{1},{2},0.2);", (int) ( Math.Random() * 150 ), (int) ( Math.Random() * 255 ), (int) ( Math.Random() * 255 ));
                }

                oldCacheBlock.Block.Context.Save();
                piece.Draw(oldCacheBlock.Block.Context, internalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip, animatedIndex);

                //                oldCacheBlock.Block.Context.FillStyle = oldCacheBlock.Color;
                //                oldCacheBlock.Block.Context.FillRect(internalPoint.X, internalPoint.Y, 16 * scale.X, 16 * scale.Y);
                oldCacheBlock.Block.Context.Restore();
                return oldCacheBlock;
            } else
                return new TileCacheBlock(TileCacheBlockType.TilePiece) {TilePieceInfo = pieceInfo, XPos = pieceX * pieceWidth, YPos = pieceY * pieceHeight, AnimatedKey = pieceY * numOfPiecesWide + pieceX};
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