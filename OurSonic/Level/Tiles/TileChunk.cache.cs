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

        public void ClearCache()
        {
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


           
    }
     


}

