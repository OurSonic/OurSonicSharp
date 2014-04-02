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
    public partial class TileChunk
    {
        const int piecesSquareSize = 16;
        const int tilePieceSize = 8;

        #region UI

        public void DrawUI(CanvasRenderingContext2D canvas, Point position, DoublePoint scale, int layer)
        {
            canvas.Save();
            {
                canvas.Translate(position.X, position.Y);
                canvas.Scale(scale.X, scale.Y);

                var pieceWidth = piecesSquareSize * 1;
                var pieceHeight = piecesSquareSize * 1;

                bool isBack = layer == 0;

                //for building no aniamtion cache
                //                drawTilePieces(canvas, new Point(0, 0), layer, pieceWidth, pieceHeight, isBack, false, null, null);
            }
            canvas.Restore();
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
                foreach (var tilePiece in EachPiece())
                {
                    if (!tilePiece.OnlyBackground())
                        return (IsOnlyBackground = false).Value;
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
                foreach (var tilePiece in EachPiece())
                {
                    if (!tilePiece.OnlyForeground())
                    {
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
                foreach (var tilePiece in EachPiece())
                {
                    if (tilePiece.Index != 0)
                    {
                        return (Empty = false).Value;
                    }
                }
                Empty = true;
            }
            return Empty.Value;
        }

        private IEnumerable<TilePiece> EachPiece()
        {
            for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
            {
                for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                {
                    TilePiece tilePiece = TilePieces[pieceX][pieceY].GetTilePiece();
                    if (tilePiece != null)
                    {
                        yield return tilePiece;
                    }
                }
            }
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
                foreach (var tilePiece in EachPiece())
                {
                    if (tilePiece.AnimatedPaletteIndexes == null) continue;

                    foreach (var animatedPaletteIndex in tilePiece.AnimatedPaletteIndexes)
                    {
                        if (paletteAnimationIndexes.IndexOfFast(animatedPaletteIndex) == -1)
                        {
                            paletteAnimationIndexes.Add(animatedPaletteIndex);
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

                foreach (var tilePiece in EachPiece())
                {

                    foreach (var tileInfo in tilePiece.Tiles)
                    {
                        var tile = tileInfo.GetTile();
                        if (tile == null) continue;
                        if (tile.AnimatedTileIndexes == null) continue;
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
            return tileAnimationIndexes;

        }

        public bool NeverAnimates()
        {
            return !HasTileAnimations() || !HasPixelAnimations();
        }
          

        public void Draw(CanvasRenderingContext2D canvas, Point position, ChunkLayer layer)
        {

            canvas.Save();
            {
                canvas.DrawImage(BaseCanvasCache[layer].Canvas, position.X, position.Y);


                if (HasPixelAnimations())
                {

                    var paletteAnimationCanvases = PaletteAnimationCanvasesCache[layer];
                    foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
                    {
                        var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
                        if (paletteAnimationCanvasFrames == null) continue;

                        var currentFrame = SonicManager.Instance.TilePaletteAnimationManager.GetCurrentFrame(paletteAnimationIndex);
                        var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.Frames[currentFrame.FrameIndex];
                        var canvasLayerToDraw = paletteAnimationCanvasFrame.Canvas.Canvas;
                        canvas.DrawImage(canvasLayerToDraw, position.X + paletteAnimationCanvasFrames.Position.X, position.Y + paletteAnimationCanvasFrames.Position.Y);


                    }
                }

                if (HasTileAnimations())
                {
                    var tileAnimationCanvases = TileAnimationCanvasesCache[layer];
                    foreach (var tileAnimationIndex in GetAllTileAnimationIndexes())
                    {
                        var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex];
                        if (tileAnimationCanvasFrames == null) continue;

                        var currentFrame = SonicManager.Instance.TileAnimationManager.GetCurrentFrame(tileAnimationIndex);
                        var tileAnimationCanvasFrame = tileAnimationCanvasFrames.Frames[currentFrame.FrameIndex];
                        var canvasLayerToDraw = tileAnimationCanvasFrame.Canvas.Canvas;
                        canvas.DrawImage(canvasLayerToDraw, position.X + tileAnimationCanvasFrames.Position.X, position.Y + tileAnimationCanvasFrames.Position.Y);
                    }
                }
            }
            canvas.Restore();


            DrawAnimationDebug(canvas, position, layer);
        }


        private void drawTilePiecesAnimatedPalette(CanvasRenderingContext2D canvas, ChunkLayer layer, int piecesSquareSize, int animatedPaletteIndex)
        {
            for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
            {
                for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
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

        private void drawTilePiecesAnimatedTile(CanvasRenderingContext2D canvas, ChunkLayer layer, int piecesSquareSize, int animatedTileIndex)
        {
            for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
            {
                for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
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
        private void drawTilePiecesBase(CanvasRenderingContext2D canvas, ChunkLayer layer, int piecesSquareSize)
        {
            for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
            {
                for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
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
        public Point Position { get; set; }
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
        public Point Position { get; set; }
        [IntrinsicProperty]
        public JsDictionary<int, TileAnimationCanvasFrame> Frames { get; set; }
    }
    public class TileAnimationCanvasFrame
    {
        [IntrinsicProperty]
        public CanvasInformation Canvas { get; set; }
    }


}

