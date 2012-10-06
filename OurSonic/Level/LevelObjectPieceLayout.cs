using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.Level
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
            foreach (LevelObjectInfo t in SonicManager.Instance.SonicLevel.Objects) {
                t.Reset();
            }
        }

        public void DrawUI(CanvasContext2D canvas,
                           Point pos,
                           Point scale,
                           bool showOutline,
                           bool showImages,
                           int selectedPieceIndex,
                           Point zeroPosition,
                           double largeScale)
        {
            canvas.Save();

            canvas.StrokeStyle = "#000000";
            canvas.LineWidth = 2;

            canvas.FillStyle = "#FFFFFF";
            canvas.FillRect(pos.X, pos.Y, Width, Height);

            canvas.BeginPath();
            canvas.Rect(pos.X, pos.Y, Width, Height);
            canvas.Clip();
            canvas.ClosePath();

            canvas.Translate(zeroPosition.X, zeroPosition.Y);
            canvas.Scale(largeScale, largeScale);

            canvas.BeginPath();
            canvas.MoveTo(pos.X + -250, pos.Y + 0);
            canvas.LineTo(pos.X + 250, pos.Y + 0);
            canvas.ClosePath();
            canvas.Stroke();

            canvas.BeginPath();
            canvas.MoveTo(pos.X + 0, pos.Y + -250);
            canvas.LineTo(pos.X + 0, pos.Y + 250);
            canvas.ClosePath();
            canvas.Stroke();

            for (var i = 1; i < Pieces.Count; i++) {
                var j = Pieces[i];

                canvas.BeginPath();
                canvas.MoveTo(pos.X + j.X, pos.Y + j.Y);
                canvas.LineTo(pos.X + Pieces[i - 1].X, pos.Y + Pieces[i - 1].Y);
                canvas.Stroke();
            }

            Gradient drawRadial;
            for (var i = 0; i < Pieces.Count; i++) {
                var j = Pieces[i];
                if (showImages) {
                    LevelObjectPiece piece = SonicManager.Instance.UIManager.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Pieces[j.PieceIndex];
                    var asset = SonicManager.Instance.UIManager.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Assets[piece.AssetIndex];
                    if (asset.Frames.Count > 0) {
                        LevelObjectAssetFrame frm = asset.Frames[j.FrameIndex];
                        drawRadial = SonicManager.Instance.mainCanvas.Context.CreateRadialGradient(0, 0, 0, 10, 10, 50);
                        drawRadial.AddColorStop(0, "white");
                        if (selectedPieceIndex == i)
                            drawRadial.AddColorStop(1, "yellow");
                        else
                            drawRadial.AddColorStop(1, "red");
                        var borderSize = 3;
                        canvas.FillStyle = drawRadial;
                        //   canvas.fillRect(pos.x + j.x - frm.offsetX - borderSize, pos.y + j.y - frm.offsetY - borderSize, frm.width + borderSize * 2, frm.height + borderSize*2);
                        frm.DrawUI(canvas,
                                   new Point(pos.X + j.X - frm.OffsetX, pos.Y + j.Y - frm.OffsetY),
                                   new Point(frm.Width, frm.Height),
                                   false,
                                   true,
                                   true,
                                   false,
                                   piece.Xflip,
                                   piece.Yflip);
                    }
                } else {
                    drawRadial = SonicManager.Instance.mainCanvas.Context.CreateRadialGradient(0, 0, 0, 10, 10, 50);
                    drawRadial.AddColorStop(0, "white");
                    if (selectedPieceIndex == i)
                        drawRadial.AddColorStop(1, "yellow");
                    else
                        drawRadial.AddColorStop(1, "red");

                    canvas.FillStyle = drawRadial;
                    canvas.BeginPath();
                    canvas.Arc(pos.X + j.X, pos.Y + j.Y, 10, 0, Math.PI * 2, true);
                    canvas.ClosePath();
                    canvas.Fill();
                }
            }
            canvas.Restore();
        }

        public void Draw(CanvasContext2D canvas, int x, int y, Point scale, LevelObject framework, LevelObjectInfo instance, bool showHeightMap)
        {
            for (var i = 0; i < instance.Pieces.Count; i++) {
                var j = instance.Pieces[i];
                if (!j.Visible) continue;
                var piece = framework.Pieces[j.PieceIndex];
                var asset = framework.Assets[piece.AssetIndex];
                if (asset.Frames.Count > 0) {
                    var frm = asset.Frames[j.FrameIndex];
                    frm.DrawUI(canvas,
                               new Point(( x + j.X * scale.X ) - ( frm.OffsetX * scale.X ), ( y + j.Y * scale.Y ) - ( frm.OffsetY * scale.Y )),
                               new Point(frm.Width * scale.X, frm.Height * scale.Y),
                               false,
                               showHeightMap,
                               showHeightMap,
                               false,
                               instance.Xflip ^ piece.Xflip,
                               instance.Yflip ^ piece.Yflip);
                }
            }
        }
    }
}