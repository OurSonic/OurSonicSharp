using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Areas;
using OurSonic.Level.Animations;
using OurSonic.UIManager;
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
            using (new CanvasHandler(canvas))
            {
                canvas.Translate(position.X, position.Y);
                canvas.Scale(scale.X, scale.Y);

                var pieceWidth = 16 * 1;
                var pieceHeight = 16 * 1;

                bool isBack = layer == 0;

                //for building no aniamtion cache
                //                drawTilePieces(canvas, new Point(0, 0), layer, pieceWidth, pieceHeight, isBack, false, null, null);
            }
        }

        #endregion

        private List<TileCacheBlock>[] layerCacheBlocks;
        private Point myLocalPoint = new Point(0, 0);
        private bool? myNeverAnimate;
        [IntrinsicProperty]
        public bool? IsOnlyBackground { get; set; }
        [IntrinsicProperty]
        public bool? IsOnlyForeground { get; set; }
        [IntrinsicProperty]
        private bool? Empty { get; set; }
        [IntrinsicProperty]
        public TilePieceInfo[][] TilePieces { get; set; }
        [IntrinsicProperty]
        public JsDictionary<int, TileAnimation> Animated { get; set; }
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
            IsOnlyBackground = null;
            layerCacheBlocks = new List<TileCacheBlock>[2];
        }

        public void ClearCache()
        {
            layerCacheBlocks = new List<TileCacheBlock>[2];
        }

        public TilePiece GetBlockAt(int x, int y)
        {
            return TilePieces[x / 16][y / 16].GetTilePiece();
        }

        public void SetBlockAt(int x, int y, TilePiece tp)
        {
            if (GetTilePiece(x, y).SetTilePiece(tp))
                ClearCache();
        }

        public TilePieceInfo GetTilePiece(int x, int y)
        {
            return TilePieces[x / 16][y / 16];
        }

        public bool OnlyBackground()
        {
            if (!IsOnlyBackground.HasValue)
            {
                var tpl = TilePieces.Length;
                var tph = TilePieces[0].Length;
                for (int i = 0; i < tpl; i++)
                {
                    for (int j = 0; j < tph; j++)
                    {
                        TilePiece tilePiece = TilePieces[i][j].GetTilePiece();
                        if (tilePiece != null && !tilePiece.OnlyBackground())
                            return (IsOnlyBackground = false).Value;
                    }
                }
                IsOnlyBackground = true;
                return IsOnlyBackground.Value;
            }
            return IsOnlyBackground.Value;
        }

        public bool OnlyForeground()
        {
            if (!IsOnlyForeground.HasValue)
            {
                var tpl = TilePieces.Length;
                var tph = TilePieces[0].Length;
                for (int i = 0; i < tpl; i++)
                {
                    for (int j = 0; j < tph; j++)
                    {
                        TilePiece tilePiece = TilePieces[i][j].GetTilePiece();
                        if (tilePiece != null && !tilePiece.OnlyForeground())
                            return (IsOnlyForeground = false).Value;
                    }
                }
                IsOnlyForeground = true;
                return IsOnlyForeground.Value;
            }

            return IsOnlyForeground.Value;
        }

        public bool IsEmpty()
        {
            if (!Empty.HasValue)
            {
                var tpl = TilePieces.Length;
                var tph = TilePieces[0].Length;
                for (int i = 0; i < tpl; i++)
                {
                    for (int j = 0; j < tph; j++)
                    {
                        var r = TilePieces[i][j];
                        if (r != null && r.Block != 0)
                            return (Empty = false).Value;
                    }
                }
                Empty = true;
            }
            return Empty.Value;
        }

        private bool? hasPixelAnimations;

        private bool HasPixelAnimations()
        {
            if (!hasPixelAnimations.HasValue)
            {
                const int tilePieceSize = 8;

                for (int i = 0; i < tilePieceSize; i++)
                {
                    for (int j = 0; j < tilePieceSize; j++)
                    {
                        var pm = TilePieces[i][j].GetTilePiece();
                        if (pm == null) continue;
                        if (pm.AnimatedPaletteIndexes.Count > 0)
                        {
                            hasPixelAnimations = true;
                            return true;
                        }
                    }
                }

                hasPixelAnimations = false;

            }
            return hasPixelAnimations.Value;
        }

        private List<int> paletteAnimationIndexes;

        private List<int> GetAllPaletteAnimationIndexes()
        {
            if (paletteAnimationIndexes == null)
            {
                paletteAnimationIndexes = new List<int>();
                const int tilePieceSize = 8;

                for (int i = 0; i < tilePieceSize; i++)
                {
                    for (int j = 0; j < tilePieceSize; j++)
                    {
                        var piece = TilePieces[i][j].GetTilePiece();
                        if (piece == null) continue;
                        foreach (var animatedPaletteIndex in piece.AnimatedPaletteIndexes)
                        {
                            if (paletteAnimationIndexes.IndexOf(animatedPaletteIndex) == -1)
                            {
                                paletteAnimationIndexes.Add(animatedPaletteIndex);
                            }
                        }
                    }
                }
            }
            return paletteAnimationIndexes;

        }



        public bool NeverAnimates()
        {
            if (!myNeverAnimate.HasValue)
            {
                var tilePieceSize = 8;

                bool nothing = true;
                for (int i = 0; i < tilePieceSize; i++)
                {
                    for (int j = 0; j < tilePieceSize; j++)
                    {
                        var pm = TilePieces[i][j].GetTilePiece();
                        if (pm == null) continue;
                        if ((Animated != null && (Animated[j * tilePieceSize + i].Truthy())) || pm.AnimatedPaletteIndexes.Count > 0)
                        {
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


        private ChunkLayer<CanvasInformation> Base = new ChunkLayer<CanvasInformation>();
        private ChunkLayer<JsDictionary<int, PaletteAnimationCanvasFrames>> PaletteAnimationCanvases = new ChunkLayer<JsDictionary<int, PaletteAnimationCanvasFrames>>();

        public class PaletteAnimationCanvasFrames
        {
            public PaletteAnimationCanvasFrames(int paletteAnimationIndex)
            {
                PaletteAnimationIndex = paletteAnimationIndex;
                Frames = new JsDictionary<int, PaletteAnimationCanvasFrame>();
            }
            [IntrinsicProperty]
            public int PaletteAnimationIndex { get; set; }
            [IntrinsicProperty]
            public JsDictionary<int, PaletteAnimationCanvasFrame> Frames { get; set; }
        }
        public class PaletteAnimationCanvasFrame
        {
            [IntrinsicProperty]
            public CanvasInformation Canvas { get; set; }
        }

        public void Draw(CanvasContext2D canvas, Point position, ChunkLayer layer)
        {

            const int piecesSquareSize = 16;

            using (new CanvasHandler(canvas))
            {

                if (Base[layer] == null)
                {
                    Base[layer] = CanvasInformation.Create(numOfPiecesWide * piecesSquareSize, numOfPiecesLong * piecesSquareSize);

                    drawTilePiecesBase(Base[layer].Context, layer, piecesSquareSize);
                }


                canvas.DrawImage(Base[layer].Canvas, position.X, position.Y);


                if (HasPixelAnimations())
                {
                    if (PaletteAnimationCanvases[layer] == null)
                    {
                        PaletteAnimationCanvases[layer] = new JsDictionary<int, PaletteAnimationCanvasFrames>();
                    }

                    var paletteAnimationCanvases = PaletteAnimationCanvases[layer];
                    foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
                    {
                        var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
                        if (paletteAnimationCanvasFrames == null)
                        {
                            paletteAnimationCanvases[paletteAnimationIndex] = paletteAnimationCanvasFrames = new PaletteAnimationCanvasFrames(paletteAnimationIndex);
                        }

                        var currentFrame = SonicManager.Instance.TilePaletteAnimationManager.GetCurrentFrame(paletteAnimationIndex);
                        var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.Frames[currentFrame.FrameIndex];
                        if (paletteAnimationCanvasFrame == null)
                        {
                            paletteAnimationCanvasFrames.Frames[currentFrame.FrameIndex] = paletteAnimationCanvasFrame = new PaletteAnimationCanvasFrame();
                            currentFrame.SetPalette();
                            var tilePaletteCanvas = CanvasInformation.Create(numOfPiecesWide * piecesSquareSize, numOfPiecesLong * piecesSquareSize);

                            paletteAnimationCanvasFrame.Canvas = tilePaletteCanvas;

                            drawTilePiecesAnimatedPalette(tilePaletteCanvas.Context, layer, piecesSquareSize, paletteAnimationIndex);
                            currentFrame.ClearPalette();

                        }
                        var canvasLayerToDraw = paletteAnimationCanvasFrame.Canvas.Canvas;
                        canvas.DrawImage(canvasLayerToDraw, position.X, position.Y);
                    }
                }
            }
        }



        private void drawTilePiecesAnimatedPalette(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize, int animatedPaletteIndex)
        {
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++)
            {
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++)
                {
                    drawTilePieceAnimatedPalette(canvas, layer, TilePieces[pieceX][pieceY], pieceX * piecesSquareSize, pieceY * piecesSquareSize, animatedPaletteIndex);
                }
            }
        }
        private void drawTilePiecesBase(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize)
        {
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++)
            {
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++)
                {
                    drawTilePieceBase(canvas, layer, TilePieces[pieceX][pieceY], pieceX * piecesSquareSize, pieceY * piecesSquareSize);
                }
            }
        }





        private void drawTilePieces(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize)
        {
            int curKey = 0; //pieceY * numOfPiecesWide + pieceX              VV
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++)
            {
                curKey = pieceY * numOfPiecesWide;
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++)
                {
                    curKey += pieceX;
                    drawTilePiece(canvas, layer, TilePieces[pieceX][pieceY], curKey, pieceX * piecesSquareSize, pieceY * piecesSquareSize);
                }
            }
        }

        private void drawTilePiece(CanvasContext2D canvas, ChunkLayer layer, TilePieceInfo pieceInfo, int animatedKey, int pointx, int pointy)
        {
            var piece = pieceInfo.GetTilePiece();

            if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) return;

            int animatedIndex = 0;
            TileAnimation tileAnimation = Animated[animatedKey];

            if (Animated.Truthy() && (tileAnimation.Truthy()))
                animatedIndex = tileAnimation.LastAnimatedIndex;

            myLocalPoint.X = pointx;
            myLocalPoint.Y = pointy;
            piece.Draw(canvas, myLocalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip, animatedIndex);

            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
        }



        private void drawTilePieceAnimatedPalette(CanvasContext2D canvas, ChunkLayer layer, TilePieceInfo pieceInfo, int pointx, int pointy, int animatedPaletteIndex)
        {
            var piece = pieceInfo.GetTilePiece();
            if (piece.AnimatedPaletteIndexes.IndexOf(animatedPaletteIndex) == -1) return;

            if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) return;


            piece.DrawAnimatedPalette(canvas, new Point(pointx,pointy), layer, pieceInfo.XFlip, pieceInfo.YFlip, animatedPaletteIndex);

            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
        }

        private void drawTilePieceBase(CanvasContext2D canvas, ChunkLayer layer, TilePieceInfo pieceInfo, int pointx, int pointy)
        {
            var piece = pieceInfo.GetTilePiece();

            if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) return;


            myLocalPoint.X = pointx;
            myLocalPoint.Y = pointy;
            piece.DrawBase(canvas, myLocalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip);

            //canvas.StrokeStyle = "#FFF";
            //canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
        }



        public void TileAnimatedTick()
        {

            foreach (var an in Animated)
            {
                var anni = an.Value;
                if (anni.LastAnimatedFrame == null)
                {
                    anni.LastAnimatedFrame = 0;
                    anni.LastAnimatedIndex = 0;
                }
                if (anni.Frames[anni.LastAnimatedIndex].Ticks == 0 ||
                    (SonicManager.Instance.DrawTickCount - anni.LastAnimatedFrame) >=
                    ((anni.AutomatedTiming > 0) ? anni.AutomatedTiming : anni.Frames[anni.LastAnimatedIndex].Ticks))
                {
                    anni.LastAnimatedFrame = SonicManager.Instance.DrawTickCount;
                    anni.LastAnimatedIndex = (anni.LastAnimatedIndex + 1) % anni.Frames.Length;
                }
            }
        }
    }

    public enum ChunkLayer
    {
        Low = 0,
        High = 1
    }

    public class ChunkLayer<T>
    {
        [IntrinsicProperty]
        public T Low { get; set; }
        [IntrinsicProperty]
        public T High { get; set; }

        public T this[ChunkLayer layer]
        {
            get
            {
                switch (layer)
                {
                    case ChunkLayer.Low:
                        return Low;
                    case ChunkLayer.High:
                        return High;
                    default:
                        return default(T);
                }
            }
            set
            {
                switch (layer)
                {
                    case ChunkLayer.Low:
                        Low = value;
                        break;
                    case ChunkLayer.High:
                        High = value;
                        break;
                }
            }
        }
    }
}

