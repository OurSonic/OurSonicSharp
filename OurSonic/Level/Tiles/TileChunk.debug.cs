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
        public static bool DebugAnimations { get; set; }

        public void DrawAnimationDebug(CanvasRenderingContext2D canvas, Point position, ChunkLayer layer)
        {
            if (!DebugAnimations) return;
            canvas.Save();
            {
                int yOffset = layer == ChunkLayer.Low ? 0 : 64;
                canvas.FillStyle = "White";
                canvas.FillText("Base", position.X + 0, position.Y + yOffset);

                if (HasPixelAnimations())
                {
                    var paletteAnimationCanvases = PaletteAnimationCanvasesCache[layer];
                    foreach (var paletteAnimationIndex in GetAllPaletteAnimationIndexes())
                    {
                        var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
                        if (paletteAnimationCanvasFrames == null) continue;

                        var currentFrame = SonicManager.Instance.TilePaletteAnimationManager.GetCurrentFrame(paletteAnimationIndex);

                        canvas.FillText("Palette " + paletteAnimationIndex + "-" + currentFrame.FrameIndex, position.X + 25, position.Y + yOffset + (paletteAnimationIndex * 13));
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
                        canvas.FillText("Tile " + tileAnimationIndex + "-" + currentFrame.FrameIndex, position.X + 75, position.Y + yOffset + (tileAnimationIndex * 13));
                    }
                }
            }
            canvas.StrokeStyle = "black";
            canvas.StrokeRect(position.X, position.Y, 128, 128);
            canvas.Restore();
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
                var chunkLayer = (ChunkLayer)i;


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

           
    }
     

}

