namespace OurSonic.Level
{
    public class LevelObjectPieceLayout
    {
        /* this.width = 350;
    this.height = 280;
    this.pieces = [];

    this.name = name ? name : "";
*/
        public LevelObjectPieceLayout(string name) {}

        public void Update()
        {
            /*    for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
            sonicManager.SonicLevel.Objects[l].reset();
        }*/
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

        public void Draw(CanvasInformation canvas, int x, int y, Point scale, dynamic framework, dynamic instance, bool showHeightMap)
        {
            /*   for (var i = 0; i < instance.pieces.length; i++) {
            var j = instance.pieces[i];
            if (!j.visible) continue;
            var piece = framework.pieces[j.pieceIndex];
            var asset = framework.assets[piece.assetIndex];
            if (asset.frames.length > 0) {
                var frm = asset.frames[j.frameIndex];
                frm.drawUI(canvas, { x: (x + j.x * scale.x) - (frm.offsetX * scale.x), y: (y + j.y * scale.y) - (frm.offsetY * scale.y) }, { width: frm.width * scale.x, height: frm.height * scale.y }, false, showHeightMap, showHeightMap, false, piece.xflip, piece.yflip);
            }

        }*/
        }
    }
}