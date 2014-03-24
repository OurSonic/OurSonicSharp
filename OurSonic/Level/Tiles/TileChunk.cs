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

        public TileChunk( /*TilePiece[][] tilePieces*/)
        {
            IsOnlyBackground = null;
        }

        public void ClearCache()
        {
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
        
        private bool? hasTileAnimations;

        private bool HasTileAnimations()
        {
            if (!hasTileAnimations.HasValue)
            {
                if (TileAnimations == null)
                {
                    hasTileAnimations = false;
                    return false;
                }

                const int tilePieceSize = 8;
                for (int i = 0; i < tilePieceSize; i++)
                {
                    for (int j = 0; j < tilePieceSize; j++)
                    {
                        var pm = TilePieces[i][j].GetTilePiece();
                        if (pm == null) continue;
                        if (TileAnimations[j * tilePieceSize + i]!=null)
                        {
                            hasTileAnimations = true;
                            return true;
                        }
                    }
                } 

                hasTileAnimations = false;

            }
            return hasTileAnimations.Value;
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
        private List<int> tileAnimationIndexes;


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
                            var tile=tileInfo.GetTile();

                            foreach (var animatedTileIndex in tile.AnimatedTileIndexes)
                            {
                                if (tileAnimationIndexes.IndexOf(animatedTileIndex) == -1)
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


        private ChunkLayer<CanvasInformation> Base = new ChunkLayer<CanvasInformation>();
        private ChunkLayer<JsDictionary<int, PaletteAnimationCanvasFrames>> PaletteAnimationCanvases = new ChunkLayer<JsDictionary<int, PaletteAnimationCanvasFrames>>();
        private ChunkLayer<JsDictionary<int, TileAnimationCanvasFrames>> TileAnimationCanvases = new ChunkLayer<JsDictionary<int, TileAnimationCanvasFrames>>();

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

                if (HasTileAnimations())
                {
                    if (TileAnimationCanvases[layer] == null)
                    {
                        TileAnimationCanvases[layer] = new JsDictionary<int, TileAnimationCanvasFrames>();
                    }
                    var tileAnimationCanvases = TileAnimationCanvases[layer];
                    foreach (var tileAnimationIndex in GetAllTileAnimationIndexes())
                    {
                        var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex];
                        if (tileAnimationCanvasFrames == null)
                        {
                            tileAnimationCanvases[tileAnimationIndex] = tileAnimationCanvasFrames = new TileAnimationCanvasFrames(tileAnimationIndex);
                        }

                        var currentFrame = SonicManager.Instance.TileAnimationManager.GetCurrentFrame(tileAnimationIndex);
                        var tileAnimationCanvasFrame = tileAnimationCanvasFrames.Frames[currentFrame.FrameIndex];
                        if (tileAnimationCanvasFrame == null)
                        {
                            tileAnimationCanvasFrames.Frames[currentFrame.FrameIndex] = tileAnimationCanvasFrame = new TileAnimationCanvasFrame();
                            var tileTileCanvas = CanvasInformation.Create(numOfPiecesWide * piecesSquareSize, numOfPiecesLong * piecesSquareSize);
                            tileAnimationCanvasFrame.Canvas = tileTileCanvas;
                            drawTilePiecesAnimatedTile(tileTileCanvas.Context, layer, piecesSquareSize, tileAnimationIndex);
                        }
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
                    if (piece.AnimatedPaletteIndexes.IndexOf(animatedPaletteIndex) == -1) continue;

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
                    if (piece.AnimatedTileIndexes.IndexOf(animatedTileIndex) == -1) continue;

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

