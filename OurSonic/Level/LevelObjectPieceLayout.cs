using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
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
            foreach (LevelObjectInfo t in SonicManager.Instance.SonicLevel.Objects)
            {
                t.Reset();
            }
        }

        public void DrawUI(CanvasInformation canvas,
                           Point pos,
                           Point scale,
                           bool showOutline,
                           bool showImages,
                           int selectedPieceIndex,
                           Point zeroPosition)
        {
            /* canvas.save();
        canvas.strokeStyle = "#000000";
        canvas.lineWidth = 2;

        canvas.fillStyle = "#FFFFFF";
        canvas.fillRect(pos.x, pos.y, this.width, this.height);

        canvas.beginPath();
        canvas.rect(pos.x, pos.y, this.width, this.height);
        canvas.clip();
        canvas.closePath();

        canvas.translate(zeroPosition.x, zeroPosition.y);
        //        canvas.scale(3, 3);

        canvas.beginPath();
        canvas.moveTo(pos.x + -250, pos.y + 0);
        canvas.lineTo(pos.x + 250, pos.y + 0);
        canvas.closePath();
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(pos.x + 0, pos.y + -250);
        canvas.lineTo(pos.x + 0, pos.y + 250);
        canvas.closePath();
        canvas.stroke();


        for (var i = 1; i < this.pieces.length; i++) {
            var j = this.pieces[i];

            canvas.beginPath();
            canvas.moveTo(pos.x + j.x, pos.y + j.y);
            canvas.lineTo(pos.x + this.pieces[i - 1].x, pos.y + this.pieces[i - 1].y);
            canvas.stroke();

        }


        var drawRadial;
        for (var i = 0; i < this.pieces.length; i++) {
            var j = this.pieces[i];
            if (showImages) {
                var piece = sonicManager.uiManager.objectFrameworkArea.objectFramework.pieces[j.pieceIndex];
                var asset = sonicManager.uiManager.objectFrameworkArea.objectFramework.assets[piece.assetIndex];
                if (asset.frames.length > 0) {
                    var frm = asset.frames[j.frameIndex];
                    drawRadial = sonicManager.mainCanvas.createRadialGradient(0, 0, 0, 10, 10, 50);
                    drawRadial.addColorStop(0, 'white');
                    if (selectedPieceIndex == i) {
                        drawRadial.addColorStop(1, 'yellow');
                    } else {
                        drawRadial.addColorStop(1, 'red');
                    }
                    var borderSize = 3;
                    canvas.fillStyle = drawRadial;
                    //   canvas.fillRect(pos.x + j.x - frm.offsetX - borderSize, pos.y + j.y - frm.offsetY - borderSize, frm.width + borderSize * 2, frm.height + borderSize*2);
                    frm.drawUI(canvas, { x: pos.x + j.x - frm.offsetX, y: pos.y + j.y - frm.offsetY }, { width: frm.width, height: frm.height }, false, true, true, false, piece.xflip, piece.yflip);
                }
            } else {
                drawRadial = sonicManager.mainCanvas.createRadialGradient(0, 0, 0, 10, 10, 50);
                drawRadial.addColorStop(0, 'white');
                if (selectedPieceIndex == i) {
                    drawRadial.addColorStop(1, 'yellow');
                } else {
                    drawRadial.addColorStop(1, 'red');
                }

                canvas.fillStyle = drawRadial;
                canvas.beginPath();
                canvas.arc(pos.x + j.x, pos.y + j.y, 10, 0, Math.PI * 2, true);
                canvas.closePath();
                canvas.fill();

            }
        }
        canvas.restore();*/
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
//                  frm.DrawUI(canvas, new Point((x + j.X * scale.X) - (frm.OffsetX * scale.X), (y + j.Y * scale.Y) - (frm.OffsetY * scale.Y)), new Point(frm.Width * scale.X, frm.Height * scale.Y), false, showHeightMap, showHeightMap, false, piece.Xflip, piece.Yflip);
                }
            }
        }
    }
}