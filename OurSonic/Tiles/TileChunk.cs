using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
using OurSonicModels;
namespace OurSonic.Tiles
{
    public class TileChunk
    {
        private List<TileCacheBlock>[] layerCacheBlocks = new List<TileCacheBlock>[2];
        private Point myLocalPoint = new Point(0, 0);
        private bool? neverAnimate;
        private CanvasInformation[] neverAnimateCache;
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
            neverAnimateCache = new CanvasInformation[2];
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

        public bool NeverAnimates()
        {
            if (neverAnimate == null) {
                var len1 = TilePieces.Length;
                var len2 = TilePieces[0].Length;

                var blocks = SonicManager.Instance.SonicLevel.Blocks;
                bool nothing = true;
                for (int i = 0; i < len1; i++) {
                    for (int j = 0; j < len2; j++) {
                        var r = TilePieces[i][j];
                        var pm = blocks[r.Block];
                        if (pm.Truthy()) {
                            if (( Animated.Truthy() && ( Animated[j * len1 + i].Truthy() ) ) || pm.AnimatedFrames.Length > 0) {
                                nothing = false;
                                goto done;
                            }
                        }
                    }
                }
                done:
                neverAnimate = nothing;
            }
            return neverAnimate.Value;
        }

        public void Draw(CanvasContext2D canvas, Point position, Point scale, int layer, IntersectingRectangle bounds)
        {
            bool neverAnimates = NeverAnimates();

            if (layerCacheBlocks[layer] == null)
                layerCacheBlocks[layer] = BuildCacheBlock(scale, layer, bounds);

            using (new CanvasHandler(canvas)) {
                if (neverAnimateCache[layer] != null) {
                    drawFullChunk(canvas, position, scale, layer);

                    return;
                }

                var numOfPiecesWide = TilePieces.Length;
                var numOfPiecesLong = TilePieces[0].Length;

                CanvasContext2D oldCanvas = null;
                Point oldPoint = null;

                var pieceWidth = 16 * scale.X;
                var pieceHeight = 16 * scale.Y;

                bool isBack = layer == 0;
                var blocks = SonicManager.Instance.SonicLevel.Blocks;

                if (neverAnimates) {
                    oldCanvas = canvas;

                    neverAnimateCache[layer] = Help.DefaultCanvas(numOfPiecesWide * pieceWidth, numOfPiecesLong * pieceHeight);
                    canvas = neverAnimateCache[layer].Context;
                    oldPoint = new Point(position);
                    position.Set(0, 0);
                    //for building no aniamtion cache
                    drawOld(canvas, position, scale, layer, numOfPiecesWide, numOfPiecesLong, blocks, pieceWidth, pieceHeight, isBack, neverAnimates, oldPoint, oldCanvas);

                    return;
                }
                foreach (var tileCacheBlock in layerCacheBlocks[layer]) {
                    switch (tileCacheBlock.Type) {
                        case TileCacheBlockType.Block:

                            drawBlock(canvas, position, tileCacheBlock);

                            break;
                        case TileCacheBlockType.TilePiece:

                            drawTilePiece(canvas, position, scale, layer, tileCacheBlock, isBack);

                            break;
                    }
                }
            }
        }

        private void drawOld(CanvasContext2D canvas, Point position, Point scale, int layer, int numOfPiecesWide, int numOfPiecesLong, List<TilePiece> blocks, int pieceWidth, int pieceHeight, bool isBack, bool neverAnimates, Point oldPoint, CanvasContext2D oldCanvas)
        {
            int posX = position.X;
            int posY = position.Y;

            int curKey = 0; //pieceY * numOfPiecesWide + pieceX              VV
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++) {
                curKey = pieceY * numOfPiecesWide;
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++) {
                    curKey += pieceX;

                    var piece = TilePieces[pieceX][pieceY];

                    var pm = blocks[piece.Block];
                    if (piece.Truthy()) drawIt(canvas, scale, layer, piece, pm, isBack, curKey, posX + pieceX * pieceWidth, posY + pieceY * pieceHeight);
                }
            }

            if (neverAnimates) {
                position = oldPoint;
                canvas = oldCanvas;

                canvas.DrawImage(neverAnimateCache[layer].Canvas, position.X, position.Y);
            }
        }

        private void drawTilePiece(CanvasContext2D canvas, Point position, Point scale, int layer, TileCacheBlock tileCacheBlock, bool isBack)
        {
            drawIt(canvas, scale, layer, tileCacheBlock.TilePiece, tileCacheBlock.PieceM, isBack, tileCacheBlock.AnimatedKey, position.X + tileCacheBlock.XPos, position.Y + tileCacheBlock.YPos);

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

        private void drawFullChunk(CanvasContext2D canvas, Point position, Point scale, int layer)
        {
            canvas.DrawImage(neverAnimateCache[layer].Canvas, position.X, position.Y);

/*
            canvas.Save();
            canvas.StrokeStyle = "red";
            canvas.StrokeRect(position.X, position.Y, 128 * scale.X, 128 * scale.Y);
            canvas.Restore();
*/
        }

        private void drawIt(CanvasContext2D canvas,
                            Point scale,
                            int layer,
                            TilePiece piece,
                            TilePiece pm,
                            bool isBack,
                            int animatedKey,
                            int pointx,
                            int pointy
                )
        {
            if (isBack ? ( pm.onlyForeground ) : ( pm.onlyBackground )) return;

            int animatedIndex = 0;
            Animation animation = Animated[animatedKey];

            bool hover = false;
            bool shouldAnimate = pm.ShouldAnimate();

            if (Animated.Truthy() && ( animation.Truthy() ))
                animatedIndex = animation.LastAnimatedIndex;
            else {
                if (!shouldAnimate || neverAnimate.Value)
                    hover = true;
            }
            myLocalPoint.X = pointx;
            myLocalPoint.Y = pointy;
            pm.Draw(canvas, myLocalPoint, scale, layer, piece.XFlip, piece.YFlip, animatedIndex);

            if (false && hover) {
                canvas.Save();

                switch (layer) {
                    case 1:
                        canvas.FillStyle = "rgba(190,0,0,0.5)";
                        break;
                    case 0:
                        canvas.FillStyle = "rgba(244,0,130,0.5)";
                        break;
                }
                if (!shouldAnimate && !neverAnimate.Value)
                    canvas.FillStyle = "rgba(255,45,255,0.75)";

                canvas.FillRect(myLocalPoint.X, myLocalPoint.Y, 16 * scale.X, 16 * scale.Y);
                canvas.Restore();
            }

            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
        }

        public List<TileCacheBlock> BuildCacheBlock(Point scale, int layer, IntersectingRectangle bounds)
        {
            List<TileCacheBlock> tilePieces = new List<TileCacheBlock>();
            TileCacheBlock block = null;

            if (neverAnimateCache[layer] != null)
                return new List<TileCacheBlock>();

            var numOfPiecesWide = TilePieces.Length;
            var numOfPiecesLong = TilePieces[0].Length;

            var pieceWidth = 16 * scale.X;
            var pieceHeight = 16 * scale.Y;

            if (NeverAnimates())
                return new List<TileCacheBlock>();

            var blocks = SonicManager.Instance.SonicLevel.Blocks;

            bool isBack = layer == 0;

            for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++) {
                for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++) {
                    var piece = TilePieces[pieceX][pieceY];
                    var pm = blocks[piece.Block];
                    if (pm.Truthy()) {
                        var cacheBlock = buildCacheBlock(scale, layer, pieceWidth, pieceHeight, piece, pm, isBack, pieceX, pieceY, numOfPiecesWide, block);
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
            }

            List<TileCacheBlock> tileCacheBlocks = new List<TileCacheBlock>(tilePieces);
            if (block != null)
                tileCacheBlocks.Add(block);
            return tileCacheBlocks;
        }

        private TileCacheBlock buildCacheBlock(
                Point scale,
                int layer,
                int pieceWidth,
                int pieceHeight,
                TilePiece piece,
                TilePiece pm,
                bool isBack,
                int pieceX,
                int pieceY,
                int numOfPiecesWide,
                TileCacheBlock oldCacheBlock)
        {
            //if (isBack ? (piece.onlyForeground) : (piece.onlyBackground)) return null;

            int animatedIndex = 0;
            Animation animation = Animated[pieceY * numOfPiecesWide + pieceX];

            bool cacheBlockNeeded = false;
            bool shouldAnimate = pm.ShouldAnimate();

            if (Animated.Truthy() && ( animation.Truthy() ))
                animatedIndex = animation.LastAnimatedIndex;
            else {
                if (pm.AnimatedFrames.Length == 0 && ( !shouldAnimate || neverAnimate.Value ))
                    cacheBlockNeeded = true;
            }

            if (cacheBlockNeeded) {
                Point internalPoint = new Point(pieceX * pieceWidth, pieceY * pieceHeight);

                if (oldCacheBlock == null) {
                    oldCacheBlock = new TileCacheBlock(TileCacheBlockType.Block);
                    oldCacheBlock.Block = Help.DefaultCanvas(pieceWidth * 8 * scale.X, pieceHeight * 8 * scale.Y);
                    oldCacheBlock.Color = string.Format("rgba({0},{1},{2},0.2);", (int) ( Math.Random() * 150 ), (int) ( Math.Random() * 255 ), (int) ( Math.Random() * 255 ));
                }

                oldCacheBlock.Block.Context.Save();
                pm.Draw(oldCacheBlock.Block.Context, internalPoint, scale, layer, piece.XFlip, piece.YFlip, animatedIndex);

//                oldCacheBlock.Block.Context.FillStyle = oldCacheBlock.Color;
//                oldCacheBlock.Block.Context.FillRect(internalPoint.X, internalPoint.Y, 16 * scale.X, 16 * scale.Y);
                oldCacheBlock.Block.Context.Restore();
                return oldCacheBlock;
            } else
                return new TileCacheBlock(TileCacheBlockType.TilePiece) {TilePiece = piece, XPos = pieceX * pieceWidth, YPos = pieceY * pieceHeight, PieceM = pm, AnimatedKey = pieceY * numOfPiecesWide + pieceX};
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
    /*
        public void Draw(CanvasContext2D canvas, Point position, Point scale, int layer, IntersectingRectangle bounds)
        {
            using (new CanvasHandler(canvas))
            {

                if (neverAnimateCache[layer] != null)
                {
                    canvas.DrawImage(neverAnimateCache[layer].Canvas, position.X, position.Y);
                    return;
                }

                var numOfPiecesWide = TilePieces.Length;
                var numOfPiecesLong = TilePieces[0].Length;


                CanvasContext2D oldCanvas = null;
                Point oldPoint = null;

                var pieceWidth = 16 * scale.X;
                var pieceHeight = 16 * scale.Y;


                if (NeverAnimates())
                {
                    oldCanvas = canvas;

                    neverAnimateCache[layer] = Help.DefaultCanvas(numOfPiecesWide * pieceWidth, numOfPiecesLong * pieceHeight);
                    canvas = neverAnimateCache[layer].Context;
                    oldPoint = new Point(position);
                    position.Set(0, 0);
                }



                bool isBack = layer == 0;

                var blocks = SonicManager.Instance.SonicLevel.Blocks;
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++)
                {
                    for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++)
                    {
                        var piece = TilePieces[pieceX][pieceY];
                        if (piece.Truthy())
                        {
                            drawIt(canvas, position, scale, layer, pieceWidth, pieceHeight, piece, isBack, pieceX, pieceY, numOfPiecesWide);
                        }
                    }
                }

                if (NeverAnimates())
                {

                    position = oldPoint;
                    canvas = oldCanvas;

                    canvas.DrawImage(neverAnimateCache[layer].Canvas, position.X, position.Y);

                }


            }
        }







        private void drawIt(CanvasContext2D canvas,
                            Point position,
                            Point scale,
                            int layer,
                            int pieceWidth,
                            int pieceHeight,
                            TilePiece piece,
                            bool isBack,
                            int pieceX,
                            int pieceY,
                            int numOfPiecesWide)
        {
            if (isBack ? (piece.onlyForeground) : (piece.onlyBackground)) return  ;

            int animatedIndex = 0;
            Animation animation = Animated[pieceY * numOfPiecesWide + pieceX];

            bool hover = false;
            bool shouldAnimate = piece.ShouldAnimate();

            if (Animated.Truthy() && (animation.Truthy()))
                animatedIndex = animation.LastAnimatedIndex;
            else
            {
                if (shouldAnimate || neverAnimate.Value)
                    hover = true;
            }
            myLocalPoint.X = position.X + pieceX * pieceWidth;
            myLocalPoint.Y = position.Y + pieceY * pieceHeight;
            piece.Draw(canvas, myLocalPoint, scale, layer, piece.XFlip, piece.YFlip, animatedIndex);


            if (hover)
            {
                canvas.Save();

                switch (layer)
                {
                    case 1:
                        canvas.FillStyle = "rgba(190,0,0,0.5)";
                        break;
                    case 0:
                        canvas.FillStyle = "rgba(244,0,130,0.5)";
                        break;
                }
                if (shouldAnimate && !neverAnimate.Value)
                {
                    canvas.FillStyle = "rgba(255,45,255,0.75)";

                }

                canvas.FillRect(myLocalPoint.X, myLocalPoint.Y, 16 * scale.X, 16 * scale.Y);
                canvas.Restore();

            }

            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
        }*/
}