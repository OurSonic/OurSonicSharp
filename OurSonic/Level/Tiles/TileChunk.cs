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
using OurSonicModels.Common;

namespace OurSonic.Level.Tiles
{
    public class TileChunk
    {
        private const int numOfPiecesWide = 8;
        private const int numOfPiecesLong = 8;
        const int piecesSquareSize = 16;

        #region UI

        public void DrawUI(CanvasContext2D canvas, Point position, DoublePoint scale, int layer)
        {
            using (new CanvasHandler(canvas))
            {
                canvas.Translate(position.X, position.Y);
                canvas.Scale(scale.X, scale.Y);

                var pieceWidth = piecesSquareSize * 1;
                var pieceHeight = piecesSquareSize * 1;

                bool isBack = layer == 0;

                //for building no aniamtion cache
                //                drawTilePieces(canvas, new Point(0, 0), layer, pieceWidth, pieceHeight, isBack, false, null, null);
            }
        }

        #endregion

        private Point myLocalPoint = new Point(0, 0);
        [IntrinsicProperty]
        public bool? IsOnlyBackground { get; set; }
        [IntrinsicProperty]
        public bool? IsOnlyForeground { get; set; }
        [IntrinsicProperty]
        private bool? Empty { get; set; }
        [IntrinsicProperty]
        public TilePieceInfo[][] TilePieces { get; set; }
        [IntrinsicProperty]
        //todo remove
        public JsDictionary<int, TileAnimationData> TileAnimations { get; set; }
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

        private List<int> tileAnimationIndexes;
        private List<int> paletteAnimationIndexes;

        public TileChunk( /*TilePiece[][] tilePieces*/)
        {
            IsOnlyBackground = null;
        }

        public void ClearCache()
        {
        }

        public TilePiece GetBlockAt(int x, int y)
        {
            return TilePieces[x / piecesSquareSize][y / piecesSquareSize].GetTilePiece();
        }

        public void SetBlockAt(int x, int y, TilePiece tp)
        {
            if (GetTilePiece(x, y).SetTilePiece(tp))
                ClearCache();
        }

        public TilePieceInfo GetTilePiece(int x, int y)
        {
            return TilePieces[x / piecesSquareSize][y / piecesSquareSize];
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

        private bool HasPixelAnimations()
        {
            return GetAllPaletteAnimationIndexes().Count > 0;
        }

        private bool HasTileAnimations()
        {
            return GetAllTileAnimationIndexes().Count > 0;
        }


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
                            if (paletteAnimationIndexes.IndexOfFast(animatedPaletteIndex) == -1)
                            {
                                paletteAnimationIndexes.Add(animatedPaletteIndex);
                            }
                        }
                    }
                }
            }
            return paletteAnimationIndexes;

        }


        private List<int> GetAllTileAnimationIndexes()
        {
            if (tileAnimationIndexes == null)
            {
                tileAnimationIndexes = new List<int>();
                const int tilePieceSize = 8;

                for (int i = 0; i < tilePieceSize; i++)
                {
                    for (int j = 0; j < tilePieceSize; j++)
                    {
                        var piece = TilePieces[i][j].GetTilePiece();
                        if (piece == null) continue;
                        foreach (var tileInfo in piece.Tiles)
                        {
                            var tile = tileInfo.GetTile();
                            if (tile == null) continue;
                            foreach (var animatedTileIndex in tile.AnimatedTileIndexes)
                            {
                                if (tileAnimationIndexes.IndexOfFast(animatedTileIndex) == -1)
                                {
                                    tileAnimationIndexes.Add(animatedTileIndex);
                                }
                            }
                        }
                    }
                }
            }
            return tileAnimationIndexes;

        }

        public bool NeverAnimates()
        {
            return !HasTileAnimations() || !HasPixelAnimations();
        }


        private ChunkLayer<CanvasInformation> BaseCanvasCache;
        private ChunkLayer<JsDictionary<int, PaletteAnimationCanvasFrames>> PaletteAnimationCanvasesCache;
        private ChunkLayer<JsDictionary<int, TileAnimationCanvasFrames>> TileAnimationCanvasesCache;


        public void InitCache()
        {
            BaseCanvasCache = new ChunkLayer<CanvasInformation>();
            PaletteAnimationCanvasesCache = new ChunkLayer<JsDictionary<int, PaletteAnimationCanvasFrames>>();
            TileAnimationCanvasesCache = new ChunkLayer<JsDictionary<int, TileAnimationCanvasFrames>>();


            TileAnimationCanvasesCache[ChunkLayer.Low] = new JsDictionary<int, TileAnimationCanvasFrames>();
            TileAnimationCanvasesCache[ChunkLayer.High] = new JsDictionary<int, TileAnimationCanvasFrames>();

            PaletteAnimationCanvasesCache[ChunkLayer.Low] = new JsDictionary<int, PaletteAnimationCanvasFrames>();
            PaletteAnimationCanvasesCache[ChunkLayer.High] = new JsDictionary<int, PaletteAnimationCanvasFrames>();
        }
        public void WarmCache()
        {
            CacheBase(ChunkLayer.Low);
            CacheBase(ChunkLayer.High);

            CachePaletteAnimation(ChunkLayer.Low);
            CachePaletteAnimation(ChunkLayer.High);

            CacheTileAnimation(ChunkLayer.Low);
            CacheTileAnimation(ChunkLayer.High);
        }
        public void CachePaletteAnimation(ChunkLayer layer)
        {
            var paletteAnimationCanvases = PaletteAnimationCanvasesCache[layer];
            foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
            {
                var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex] = new PaletteAnimationCanvasFrames(paletteAnimationIndex);

                foreach (var currentFrame in SonicManager.Instance.TilePaletteAnimationManager.Animations[paletteAnimationIndex].Frames)
                {
                    var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.Frames[currentFrame.FrameIndex] = new PaletteAnimationCanvasFrame();
                    currentFrame.SetPalette();
                    var tilePaletteCanvas = CanvasInformation.Create(numOfPiecesWide * piecesSquareSize, numOfPiecesLong * piecesSquareSize);

                    paletteAnimationCanvasFrame.Canvas = tilePaletteCanvas;

                    drawTilePiecesAnimatedPalette(tilePaletteCanvas.Context, layer, piecesSquareSize, paletteAnimationIndex);
                    currentFrame.ClearPalette();
                }
            }
        }

        public void CacheTileAnimation(ChunkLayer layer)
        {
            var tileAnimationCanvases = TileAnimationCanvasesCache[layer];
            foreach (var tileAnimationIndex in GetAllTileAnimationIndexes())
            {
                var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex] = new TileAnimationCanvasFrames(tileAnimationIndex);

                TileAnimation tileAnimation = SonicManager.Instance.TileAnimationManager.Animations[tileAnimationIndex];
                foreach (var currentFrame in tileAnimation.Frames)
                {
                    var tileAnimationCanvasFrame = tileAnimationCanvasFrames.Frames[currentFrame.FrameIndex] = new TileAnimationCanvasFrame();
                    var tileTileCanvas = CanvasInformation.Create(numOfPiecesWide * piecesSquareSize, numOfPiecesLong * piecesSquareSize);
                    tileAnimationCanvasFrame.Canvas = tileTileCanvas;
                    tileAnimation.CurrentFrame = currentFrame.FrameIndex;
                    drawTilePiecesAnimatedTile(tileTileCanvas.Context, layer, piecesSquareSize, tileAnimationIndex);
                }
                tileAnimation.CurrentFrame = 0;
            }
        }
        public void CacheBase(ChunkLayer layer)
        {
            BaseCanvasCache[layer] = CanvasInformation.Create(numOfPiecesWide * piecesSquareSize, numOfPiecesLong * piecesSquareSize);

            drawTilePiecesBase(BaseCanvasCache[layer].Context, layer, piecesSquareSize);
        }


        public void Draw(CanvasContext2D canvas, Point position, ChunkLayer layer)
        {

            using (new CanvasHandler(canvas))
            {
                canvas.DrawImage(BaseCanvasCache[layer].Canvas, position.X, position.Y);


                if (HasPixelAnimations())
                {

                    var paletteAnimationCanvases = PaletteAnimationCanvasesCache[layer];
                    foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
                    {
                        var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
                        var currentFrame = SonicManager.Instance.TilePaletteAnimationManager.GetCurrentFrame(paletteAnimationIndex);
                        var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.Frames[currentFrame.FrameIndex];
                        var canvasLayerToDraw = paletteAnimationCanvasFrame.Canvas.Canvas;
                        canvas.DrawImage(canvasLayerToDraw, position.X, position.Y);
                    }
                }

                if (HasTileAnimations())
                {
                    var tileAnimationCanvases = TileAnimationCanvasesCache[layer];
                    foreach (var tileAnimationIndex in GetAllTileAnimationIndexes())
                    {
                        var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex];
                        var currentFrame = SonicManager.Instance.TileAnimationManager.GetCurrentFrame(tileAnimationIndex);
                        var tileAnimationCanvasFrame = tileAnimationCanvasFrames.Frames[currentFrame.FrameIndex];
                        var canvasLayerToDraw = tileAnimationCanvasFrame.Canvas.Canvas;
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
                    var pieceInfo = TilePieces[pieceX][pieceY];
                    var piece = pieceInfo.GetTilePiece();
                    if (piece.AnimatedPaletteIndexes.IndexOfFast(animatedPaletteIndex) == -1) continue;

                    if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) continue;


                    myLocalPoint.X = pieceX * piecesSquareSize;
                    myLocalPoint.Y = pieceY * piecesSquareSize;
                    piece.DrawAnimatedPalette(canvas, myLocalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip, animatedPaletteIndex);
                }
            }
        }

        private void drawTilePiecesAnimatedTile(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize, int animatedTileIndex)
        {
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++)
            {
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++)
                {


                    var pieceInfo = TilePieces[pieceX][pieceY];

                    var piece = pieceInfo.GetTilePiece();
                    if (piece.AnimatedTileIndexes.IndexOfFast(animatedTileIndex) == -1) continue;

                    if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) continue;


                    myLocalPoint.X = pieceX * piecesSquareSize;
                    myLocalPoint.Y = pieceY * piecesSquareSize;
                    piece.DrawAnimatedTile(canvas, myLocalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip, animatedTileIndex);

                }
            }
        }
        private void drawTilePiecesBase(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize)
        {
            for (int pieceY = 0; pieceY < numOfPiecesLong; pieceY++)
            {
                for (int pieceX = 0; pieceX < numOfPiecesWide; pieceX++)
                {
                    var pieceInfo = TilePieces[pieceX][pieceY];


                    var piece = pieceInfo.GetTilePiece();

                    if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) continue;

                    myLocalPoint.X = pieceX * piecesSquareSize;
                    myLocalPoint.Y = pieceY * piecesSquareSize;
                    piece.DrawBase(canvas, myLocalPoint, layer, pieceInfo.XFlip, pieceInfo.YFlip);
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


    public class TileAnimationCanvasFrames
    {
        public TileAnimationCanvasFrames(int tileAnimationIndex)
        {
            TileAnimationIndex = tileAnimationIndex;
            Frames = new JsDictionary<int, TileAnimationCanvasFrame>();
        }
        [IntrinsicProperty]
        public int TileAnimationIndex { get; set; }
        [IntrinsicProperty]
        public JsDictionary<int, TileAnimationCanvasFrame> Frames { get; set; }
    }
    public class TileAnimationCanvasFrame
    {
        [IntrinsicProperty]
        public CanvasInformation Canvas { get; set; }
    }


}

