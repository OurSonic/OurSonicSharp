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
        const int piecesSquareSize = 16;
        const int tilePieceSize = 8;

        #region UI

        public void DrawUI(CanvasContext2D canvas, Point position, DoublePoint scale, int layer)
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
                for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
                {
                    for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                    {
                        TilePiece tilePiece = TilePieces[pieceX][pieceY].GetTilePiece();
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
                for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
                {
                    for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                    {
                        TilePiece tilePiece = TilePieces[pieceX][pieceY].GetTilePiece();
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
                for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
                {
                    for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                    {
                        var r = TilePieces[pieceX][pieceY];
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

                for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
                {
                    for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                    {
                        var piece = TilePieces[pieceX][pieceY].GetTilePiece();
                        if (piece == null) continue;
                        if (piece.AnimatedPaletteIndexes == null) continue;

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

                for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
                {
                    for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                    {
                        var piece = TilePieces[pieceX][pieceY].GetTilePiece();
                        if (piece == null) continue;
                        foreach (var tileInfo in piece.Tiles)
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

            if (HasPixelAnimations())
            {
                CachePaletteAnimation(ChunkLayer.Low);
                CachePaletteAnimation(ChunkLayer.High);
            }
            if (HasTileAnimations())
            {
                CacheTileAnimation(ChunkLayer.Low);
                CacheTileAnimation(ChunkLayer.High);
            }
        }

        public CanvasInformation Debug_DrawCache()
        {
            double numWide = 10;
            int numOfChunks = 0;
            for (int i = 0; i < 2; i++)
            {
                var chunkLayer = (ChunkLayer)i;

                if (BaseCanvasCache[chunkLayer] != null) numOfChunks++;

                foreach (var paletteAnimationCanvasCache in PaletteAnimationCanvasesCache[chunkLayer])
                {
                    foreach (var frame in paletteAnimationCanvasCache.Value.Frames)
                    {
                        numOfChunks++;
                    }
                }
                foreach (var tileAnimationCanvasCache in TileAnimationCanvasesCache[chunkLayer])
                {
                    foreach (var frame in tileAnimationCanvasCache.Value.Frames)
                    {
                        numOfChunks++;
                    }
                }
            }
            var canvas = CanvasInformation.Create((int)(numWide * 128), (int)Math.Ceiling(numOfChunks / numWide) * 128);
            canvas.Context.FillStyle = "#111111";
            canvas.Context.FillRect(0, 0, canvas.Canvas.Width, canvas.Canvas.Height);
            numOfChunks = 0;
            canvas.Context.StrokeStyle = "#FFFFFF";
            canvas.Context.LineWidth = 4;

            for (int i = 0; i < 2; i++)
            {
                var chunkLayer = (ChunkLayer) i;


                canvas.Context.StrokeStyle = chunkLayer == ChunkLayer.Low ? "Green" : "Yellow";

                if (BaseCanvasCache[chunkLayer] != null)
                {

                    var context = canvas.Context;
                    context.Save();

                    var x = (int)((numOfChunks % numWide) * 128);
                    var y = (int)Math.Floor(numOfChunks / numWide) * 128;

                    context.Translate(x, y);
                    canvas.Context.FillStyle = chunkLayer == ChunkLayer.Low ? "#333333" : "#777777";
                    context.FillRect(0, 0, 128, 128);
                    context.DrawImage(BaseCanvasCache[chunkLayer].Canvas, 0, 0);
                    context.StrokeRect(0, 0, 128, 128);
                    context.Restore();
                    numOfChunks++;

                }

                canvas.Context.StrokeStyle = chunkLayer == ChunkLayer.Low ? "pink" : "purple";


                foreach (var paletteAnimationCanvasCache in PaletteAnimationCanvasesCache[chunkLayer])
                {
                    foreach (var frame in paletteAnimationCanvasCache.Value.Frames)
                    {
                        var context = canvas.Context;
                        context.Save();

                        var x = (int)((numOfChunks % numWide) * 128);
                        var y = (int)Math.Floor(numOfChunks / numWide) * 128;

                        context.Translate(x, y);
                        canvas.Context.FillStyle = chunkLayer == ChunkLayer.Low ? "#333333" : "#777777";
                        context.FillRect(0, 0, 128, 128);

                        context.DrawImage(frame.Value.Canvas.Canvas, paletteAnimationCanvasCache.Value.Position.X, paletteAnimationCanvasCache.Value.Position.Y);
                        context.StrokeRect(0, 0, 128, 128);
                        context.Restore();
                        numOfChunks++;

                    }
                }
                canvas.Context.StrokeStyle = chunkLayer == ChunkLayer.Low ? "red" : "orange";

                foreach (var tileAnimationCanvasCache in TileAnimationCanvasesCache[chunkLayer])
                {
                    foreach (var frame in tileAnimationCanvasCache.Value.Frames)
                    {
                        var context = canvas.Context;
                        context.Save();

                        var x = (int)((numOfChunks % numWide) * 128);
                        var y = (int)Math.Floor(numOfChunks / numWide) * 128;

                        context.Translate(x, y);
                        canvas.Context.FillStyle = chunkLayer == ChunkLayer.Low ? "#333333" : "#777777";
                        context.FillRect(0, 0, 128, 128);

                        context.DrawImage(frame.Value.Canvas.Canvas, tileAnimationCanvasCache.Value.Position.Y, tileAnimationCanvasCache.Value.Position.Y);
                        context.StrokeRect(0, 0, 128, 128);
                        context.Restore();
                        numOfChunks++;

                    }
                }
            }
            canvas.Context.StrokeStyle = "blue";
            canvas.Context.StrokeRect(0, 0, canvas.Canvas.Width, canvas.Canvas.Height);
            canvas.Context.FillStyle = "white";
            canvas.Context.Font = "20px bold";
            canvas.Context.FillText("Number Of Chunks: " + numOfChunks, 50, 50);
            return canvas;
        }


        public void CacheBase(ChunkLayer layer)
        {
            if (layer == ChunkLayer.Low ? (OnlyForeground()) : (OnlyBackground())) return;

            BaseCanvasCache[layer] = CanvasInformation.Create(tilePieceSize * piecesSquareSize, tilePieceSize * piecesSquareSize);

            drawTilePiecesBase(BaseCanvasCache[layer].Context, layer, piecesSquareSize);
        }

        public void CachePaletteAnimation(ChunkLayer layer)
        {
            var paletteAnimationCanvases = PaletteAnimationCanvasesCache[layer];
            foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
            {
                var rect = getAnimationPaletteSurfaceInformation(paletteAnimationIndex, layer);

                if (rect == null)
                {
                    continue;
                }
                var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex] = new PaletteAnimationCanvasFrames(paletteAnimationIndex);

                TilePaletteAnimation tilePaletteAnimation = SonicManager.Instance.TilePaletteAnimationManager.Animations[paletteAnimationIndex];

                paletteAnimationCanvasFrames.Position = new Point(rect.X * piecesSquareSize, rect.Y * piecesSquareSize);



                foreach (var currentFrame in tilePaletteAnimation.Frames)
                {
                    tilePaletteAnimation.CurrentFrame = currentFrame.FrameIndex;

                    var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.Frames[currentFrame.FrameIndex] = new PaletteAnimationCanvasFrame();
                    currentFrame.SetPalette();
                    var tilePaletteCanvas = CanvasInformation.Create(rect.Width * piecesSquareSize, rect.Height * piecesSquareSize);

                    paletteAnimationCanvasFrame.Canvas = tilePaletteCanvas;



                    paletteAnimationCanvasFrame.Canvas.Context.Save();
                    paletteAnimationCanvasFrame.Canvas.Context.Translate(-rect.X * piecesSquareSize, -rect.Y * piecesSquareSize);
                    drawTilePiecesAnimatedPalette(tilePaletteCanvas.Context, layer, piecesSquareSize, paletteAnimationIndex);
                    paletteAnimationCanvasFrame.Canvas.Context.Restore();


                    currentFrame.ClearPalette();
                }
                tilePaletteAnimation.CurrentFrame = 0;
            }
        }

        public void CacheTileAnimation(ChunkLayer layer)
        {
            var tileAnimationCanvases = TileAnimationCanvasesCache[layer];
            foreach (var tileAnimationIndex in GetAllTileAnimationIndexes())
            {

                var rect = getAnimationTileSurfaceInformation(tileAnimationIndex, layer);
                if (rect == null)
                {
                    continue;
                }

                var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex] = new TileAnimationCanvasFrames(tileAnimationIndex);

                TileAnimation tileAnimation = SonicManager.Instance.TileAnimationManager.Animations[tileAnimationIndex];

                tileAnimationCanvasFrames.Position = new Point(rect.X * piecesSquareSize, rect.Y * piecesSquareSize);

                foreach (var currentFrame in tileAnimation.Frames)
                {
                    var tileAnimationCanvasFrame = tileAnimationCanvasFrames.Frames[currentFrame.FrameIndex] = new TileAnimationCanvasFrame();

                    var tileTileCanvas = CanvasInformation.Create(rect.Width * piecesSquareSize, rect.Height * piecesSquareSize);
                    tileAnimationCanvasFrame.Canvas = tileTileCanvas;
                    tileAnimation.CurrentFrame = currentFrame.FrameIndex;

                    tileAnimationCanvasFrame.Canvas.Context.Save();
                    tileAnimationCanvasFrame.Canvas.Context.Translate(-rect.X * piecesSquareSize, -rect.Y * piecesSquareSize);
                    drawTilePiecesAnimatedTile(tileTileCanvas.Context, layer, piecesSquareSize, tileAnimationIndex);
                    tileAnimationCanvasFrame.Canvas.Context.Restore();

                }
                tileAnimation.CurrentFrame = 0;
            }
        }

        private Rectangle getAnimationTileSurfaceInformation(int tileAnimationIndex, ChunkLayer layer)
        {

            int lowestX = int.MaxValue;
            int highestX = int.MinValue;
            int lowestY = int.MaxValue;
            int highestY = int.MinValue;


            for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
            {
                for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                {
                    var pieceInfo = TilePieces[pieceX][pieceY];
                    var piece = pieceInfo.GetTilePiece();
                    if (piece == null) continue;

                    if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) continue;
                    if (piece.AnimatedTileIndexes.IndexOfFast(tileAnimationIndex) == -1) continue;

                    if (pieceX < lowestX)
                        lowestX = pieceX;
                    if (pieceX > highestX)
                        highestX = pieceX;

                    if (pieceY < lowestY)
                        lowestY = pieceY;
                    if (pieceY > highestY)
                        highestY = pieceY;
                }
            }
            if (lowestX == int.MaxValue) return null;


            return new Rectangle(lowestX, lowestY, highestX - lowestX + 1, highestY - lowestY + 1);
        }


        private Rectangle getAnimationPaletteSurfaceInformation(int paletteAnimationIndex, ChunkLayer layer)
        {

            int lowestX = int.MaxValue;
            int highestX = int.MinValue;
            int lowestY = int.MaxValue;
            int highestY = int.MinValue;



            for (int pieceY = 0; pieceY < tilePieceSize; pieceY++)
            {
                for (int pieceX = 0; pieceX < tilePieceSize; pieceX++)
                {
                    var piece = TilePieces[pieceX][pieceY].GetTilePiece();
                    if (piece == null) continue;
                    if (layer == ChunkLayer.Low ? (piece.OnlyForeground()) : (piece.OnlyBackground())) continue;

                    if (piece.AnimatedPaletteIndexes.IndexOfFast(paletteAnimationIndex) == -1) continue;
                     
                    if (pieceX < lowestX)
                        lowestX = pieceX;
                    if (pieceX > highestX)
                        highestX = pieceX;

                    if (pieceY < lowestY)
                        lowestY = pieceY;
                    if (pieceY > highestY)
                        highestY = pieceY;
                }
            }
            if (lowestX == int.MaxValue) return null;

            return new Rectangle(lowestX, lowestY, highestX - lowestX + 1, highestY - lowestY + 1);
        }



        public void Draw(CanvasContext2D canvas, Point position, ChunkLayer layer)
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

        }

        private void drawTilePiecesAnimatedPalette(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize, int animatedPaletteIndex)
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

        private void drawTilePiecesAnimatedTile(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize, int animatedTileIndex)
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
        private void drawTilePiecesBase(CanvasContext2D canvas, ChunkLayer layer, int piecesSquareSize)
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

