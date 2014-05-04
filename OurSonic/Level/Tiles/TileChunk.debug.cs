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

        public void DrawAnimationDebug(CanvasRenderingContext2D canvas, Point position, ChunkLayer layer, TileChunkDebugDrawOptions debugDrawOptions )
        {
            if (debugDrawOptions == null) return;
            canvas.Save();
            canvas.FillStyle = "White";
            canvas.TextBaseline = TextBaseline.Top;
            {
                int yOffset = layer == ChunkLayer.Low ? 0 : 64;
                if (debugDrawOptions.ShowBaseData)
                {
                    canvas.FillText("Base", position.X + 0, position.Y + yOffset);
                }

                if (debugDrawOptions.ShowPaletteAnimationData)
                {
                    if (HasPixelAnimations())
                    {
                        var paletteAnimationCanvases = PaletteAnimationCanvasesCache[layer];
                        foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
                        {
                            var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
                            if (paletteAnimationCanvasFrames == null) continue;

                            var currentFrame = SonicManager.Instance.TilePaletteAnimationManager.GetCurrentFrame(paletteAnimationIndex);

                            canvas.FillText("Palette " + paletteAnimationIndex + "-" + currentFrame.FrameIndex, position.X + 25, position.Y + yOffset + (paletteAnimationIndex*13));
                        }
                    }
                }
                if (debugDrawOptions.ShowTileAnimationData)
                {
                    if (HasTileAnimations())
                    {
                        var tileAnimationCanvases = TileAnimationCanvasesCache[layer];
                        foreach (var tileAnimationIndex in GetAllTileAnimationIndexes())
                        {
                            var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex];
                            if (tileAnimationCanvasFrames == null) continue;

                            var currentFrame = SonicManager.Instance.TileAnimationManager.GetCurrentFrame(tileAnimationIndex);
                            canvas.FillText("Tile " + tileAnimationIndex + "-" + currentFrame.FrameIndex, position.X + 75, position.Y + yOffset + (tileAnimationIndex*13));
                        }
                    }
                }
            }
            if (debugDrawOptions.OutlineChunk)
            {
                canvas.StrokeStyle = "black";
                canvas.StrokeRect(position.X, position.Y, 128, 128);
            }

            if (debugDrawOptions.OutlineTiles)
            {
                canvas.StrokeStyle = "green";
                for (int x = 0; x < TileSideLength; x++)
                {
                    for (int y = 0; y < TileSideLength; y++)
                    {
                        canvas.StrokeRect(position.X + (x * TileSquareSize), position.Y + (y * TileSquareSize), TileSquareSize, TileSquareSize);
                    }
                }
            }
            if (debugDrawOptions.OutlineTilePieces)
            {
                canvas.StrokeStyle = "purple";
                for (int x = 0; x < TilePieceSideLength; x++)
                {
                    for (int y = 0; y < TilePieceSideLength; y++)
                    {
                        canvas.StrokeRect(position.X + (x * TilePiecesSquareSize), position.Y + (y * TilePiecesSquareSize), TilePiecesSquareSize, TilePiecesSquareSize);
                    }
                }
            }
            if (debugDrawOptions.OutlineTile != null)
            {
                /*
                                canvas.StrokeStyle = "yellow";
                                for (int x = 0; x < TileSideLength; x++)
                                {
                                    for (int y = 0; y < TileSideLength; y++)
                                    {
                                        var tilePieceInfo = this.GetTilePiece(x, y);
                                        if (tilePieceInfo == null) continue;
                                        var tilePiece = tilePieceInfo.GetTilePiece();
                                        if (tilePiece == null) continue;

                        

                                        if (tilePiece == debugDrawOptions.OutlineTilePiece)
                                        {
                                            canvas.StrokeRect(position.X + (x * TileSquareSize), position.Y + (y * TileSquareSize), TileSquareSize, TileSquareSize);
                                        }
                                    }
                                }
                */
            }
            
            if (debugDrawOptions.OutlineTilePiece != null)
            {
                canvas.StrokeStyle = "yellow";
                for (int x = 0; x < TilePieceSideLength; x++)
                {
                    for (int y = 0; y < TilePieceSideLength; y++)
                    {
                        var tilePieceInfo = this.GetTilePieceInfo(x, y,false);
                        if (tilePieceInfo == null) continue;
                        var tilePiece = tilePieceInfo.GetTilePiece();
                        if (tilePiece == null) continue;
                        if (tilePiece.Index == debugDrawOptions.OutlineTilePiece.Block)
                        {
                            canvas.StrokeRect(position.X + (x * TilePiecesSquareSize), position.Y + (y * TilePiecesSquareSize), TilePiecesSquareSize, TilePiecesSquareSize);
                        }
                    }
                }
            }
            canvas.Restore();
        }


        public CanvasInformation Debug_DrawCache()
        {
            double numWide = 10;
            int numOfChunks = 0;
            for (int i = 0; i < 2; i++)
            {
                var chunkLayer = (ChunkLayer) i;

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
            var canvas = CanvasInformation.Create((int) (numWide*128), (int) Math.Ceiling(numOfChunks/numWide)*128, false);
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

                    var x = (int) ((numOfChunks%numWide)*128);
                    var y = (int) Math.Floor(numOfChunks/numWide)*128;

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

                        var x = (int) ((numOfChunks%numWide)*128);
                        var y = (int) Math.Floor(numOfChunks/numWide)*128;

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

                        var x = (int) ((numOfChunks%numWide)*128);
                        var y = (int) Math.Floor(numOfChunks/numWide)*128;

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
    }

    [Serializable]
    public class TileChunkDebugDrawOptions
    {
        public bool ShowBaseData { get; set; }
        public bool ShowTileAnimationData { get; set; }
        public bool ShowPaletteAnimationData { get; set; }
        public bool OutlineChunk { get; set; }
        public bool OutlineTilePieces { get; set; }
        public bool OutlineTiles { get; set; }
        public TilePieceInfo OutlineTilePiece { get; set; }
        public TileInfo OutlineTile { get; set; }
    }
}

