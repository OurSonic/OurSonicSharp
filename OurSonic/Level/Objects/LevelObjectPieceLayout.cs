using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.Level.Objects
{
    public class LevelObjectPieceLayout
    {
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectPieceLayoutPiece> Pieces { get; set; }
        [IntrinsicProperty]
        public string Name { get; set; }

        public LevelObjectPieceLayout(string name)
        {
            Name = name;
            Width = 350;
            Height = 280;
            Pieces = new List<LevelObjectPieceLayoutPiece>();
        }

        public void Update()
        {
            foreach (LevelObjectInfo t in SonicManager.Instance.SonicLevel.Objects)
            {
                t.Reset();
            }
        }

        public void DrawUI(CanvasRenderingContext2D canvas, bool showImages, int selectedPieceIndex, LevelObject levelObject)
        {
            canvas.Save();

            if (!showImages)
            {
                canvas.StrokeStyle = "#000000";
                canvas.LineWidth = 2;


                canvas.BeginPath();
                canvas.MoveTo(-1000, 0);
                canvas.LineTo(1000, 0);
                canvas.ClosePath();
                canvas.Stroke();

                canvas.BeginPath();
                canvas.MoveTo(0, -1000);
                canvas.LineTo(0, 1000);
                canvas.ClosePath();
                canvas.Stroke();
                for (var i = 1; i < Pieces.Count; i++)
                {
                    var j = Pieces[i];

                    canvas.BeginPath();
                    canvas.MoveTo(j.X, j.Y);
                    canvas.LineTo(Pieces[i - 1].X, Pieces[i - 1].Y);
                    canvas.Stroke();
                }
            }

            foreach (var levelObjectPieceLayoutPiece in Pieces)
            {
                if (showImages)
                {
                    LevelObjectPiece piece = levelObject.Pieces[levelObjectPieceLayoutPiece.PieceIndex];
                    var asset = levelObject.Assets[piece.AssetIndex];
                    if (asset.Frames.Count > 0)
                    {
                        var frm = asset.Frames[0];
                        frm.DrawUI(canvas,
                                   new Point(levelObjectPieceLayoutPiece.X - frm.OffsetX, levelObjectPieceLayoutPiece.Y - frm.OffsetY),
                                   false,
                                   false,
                                   false,
                                   false,
                                   piece.Xflip,
                                   piece.Yflip);
                    }
                }
                else
                {
                    CanvasGradient drawRadial;

                    drawRadial = SonicManager.Instance.mainCanvas.Context.CreateRadialGradient(0, 0, 0, 10, 10, 50);
                    drawRadial.AddColorStop(0, "white");
                    if (selectedPieceIndex == levelObjectPieceLayoutPiece.PieceIndex)
                        drawRadial.AddColorStop(1, "yellow");
                    else
                        drawRadial.AddColorStop(1, "red");

                    canvas.FillStyle = drawRadial;
                    canvas.BeginPath();
                    canvas.Arc(levelObjectPieceLayoutPiece.X, levelObjectPieceLayoutPiece.Y, 10, 0, Math.PI * 2, true);
                    canvas.ClosePath();
                    canvas.Fill();
                }

            }
            canvas.Restore();
        }

        public void Draw(CanvasRenderingContext2D canvas, int x, int y, LevelObject framework, LevelObjectInfo instance, bool showHeightMap)
        {
            foreach (var j in instance.Pieces)
            {
                if (!j.Visible) continue;
                var piece = framework.Pieces[j.PieceIndex];
                var asset = framework.Assets[piece.AssetIndex];
                if (asset.Frames.Count > 0)
                {
                    var frm = asset.Frames[j.FrameIndex];
                    frm.DrawUI(canvas,
                               new Point((x /*+ j.X*/) - (frm.OffsetX), (y /*+ j.Y*/) - (frm.OffsetY)),
                        //                               new Point(frm.Width, frm.Height),
                               false,
                               showHeightMap,
                               showHeightMap,
                               false,
                               instance.Xflip ^ piece.Xflip,
                               instance.Yflip ^ piece.Yflip);
                }
            }
        }

        public Rectangle GetRectangle(LevelObject levelObject)
        {
            int left = int.MaxValue;
            int top = int.MaxValue;
            int right = int.MinValue;
            int bottom = int.MinValue;


            foreach (var levelObjectPieceLayoutPiece in Pieces)
            {
                var piece = levelObject.Pieces[levelObjectPieceLayoutPiece.PieceIndex];
                var asset = levelObject.Assets[piece.AssetIndex];
                var frame = asset.Frames[piece.FrameIndex];
                
                var pieceX = levelObjectPieceLayoutPiece.X -  frame.OffsetX;
                var pieceY = levelObjectPieceLayoutPiece.Y -  frame.OffsetY;
                var pieceWidth = frame.Width;
                var pieceHeight = frame.Height;

                if (pieceX < left)
                {
                    left = pieceX;
                }
                if (pieceY < top)
                {
                    top = pieceY;
                }
                if (pieceX + pieceWidth > right)
                {
                    right = pieceX + pieceWidth;
                }
                if (pieceY + pieceHeight > bottom)
                {
                    bottom = pieceY + pieceHeight;
                }
            }
            return new Rectangle(left, top, right - left, bottom - top);
        }
    }
}