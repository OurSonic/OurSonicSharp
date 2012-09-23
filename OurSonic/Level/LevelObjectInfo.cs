namespace OurSonic.Level
{
    public class LevelObjectInfo
    {
        /*  this.o = o;
            this.x = o.X;
            this.y = o.Y;
            this.xsp = 0;
            this.ysp = 0;
            this.xflip = o.XFlip;
            this.yflip = o.YFlip;
            this.subdata = o.SubType;
            this.key = o.ID;
            this.ObjectData = null;
            this.upperNibble = this.subdata >> 4;
            this.lowerNibble = this.subdata & 0xf;
            this.pieceIndex = 0;
            this.pieces = [];
            this.dead = false;
            this.debug = { lines: [] };
    this._rect = { x: 0, y: 0, width: 0, height: 0 };
         */
        public LevelObjectInfo(dynamic o) {}

        public void Log(string txt, int level)
        {
            /*    if (level === undefined) level = 100;

        if (level == 0) {
            this.debug.lines.push(" -- " + txt + " -- ");
        } else {
            this.debug.lines.push(txt);
        }

        if (this.consoleLog) {
            this.consoleLog(this.debug);
        }*/
        }

        public void SetPieceLayoutIndex(int ind)
        {
            /* this.pieceIndex = ind;
        var pcs = this.ObjectData.pieceLayouts[this.pieceIndex].pieces;

        this.pieces = [];
        for (var i = 0; i < pcs.length; i++) {
            this.pieces.push(_H.clone(pcs[i]));
        }
*/
        }

        public void SetObjectData(dynamic obj)
        {
            /*      this.ObjectData = obj;

        if (this.ObjectData.pieceLayouts.length > this.pieceIndex &&
            this.ObjectData.pieceLayouts[this.pieceIndex].pieces.length > 0) {
            this.setPieceLayoutIndex(this.pieceIndex);
        }
*/
        }

        public void Tick(dynamic @object, dynamic level, Sonic sonic)
        {
            /*
        if (this.dead || !this.ObjectData) return false;

        try {
            return this.ObjectData.tick(object, level, sonic);
        } catch (EJ) {
            this.log(EJ.name + " " + EJ.message, 0);

            return false;
        }*/
        }

        public LevelObjectPieceLayout MainPieceLayout()
        {
            //return this.ObjectData.pieceLayouts[this.pieceIndex];

            return null;
        }

        public Rectangle GetRect(Point scale)
        {
            /*
                    if (this.ObjectData.pieceLayouts.length == 0) {
                        this._rect.x = this.x;
                        this._rect.y = this.y;
                        this._rect.width = broken.width;
                        this._rect.height = broken.height;
                        return this._rect;
                    }

                    var pcs = this.pieces;

                    this._rect.x = 0;
                    this._rect.y = 0;
                    this._rect.width = 0;
                    this._rect.height = 0;

                    for (var pieceIndex = 0; pieceIndex < pcs.length; pieceIndex++) {
                        var j = pcs[pieceIndex];
                        var piece = this.ObjectData.pieces[j.pieceIndex];
                        var asset = this.ObjectData.assets[piece.assetIndex];
                        if (asset.frames.length > 0) {
                            var frm = asset.frames[j.frameIndex];
                            _H.mergeRect(this._rect, { x: frm.offsetX + j.x, y: frm.offsetY + j.y, width: frm.width * scale.x, height: frm.height * scale.y });
                        }
                    }
                    this._rect.x = this._rect.x * scale.x;
                    this._rect.y = this._rect.y * scale.y;
                    this._rect.width -= this._rect.x;
                    this._rect.height -= this._rect.y;

                    this._rect.x += this.x;
                    this._rect.y += this.y;
                    return this._rect;*/
            return null;
        }

        public void Draw(CanvasInformation canvas, int x, int y, Point scale, bool showHeightMap)
        {
            /*        if (this.dead || !this.ObjectData) return;

        if (this.ObjectData.pieceLayouts.length == 0) {
            canvas.drawImage(broken, _H.floor((x - broken.width / 2)), _H.floor((y - broken.height / 2)), broken.width * scale.x, broken.height * scale.y);
            return;
        }

        this.mainPieceLayout().draw(canvas, x, y, scale, this.ObjectData, this, showHeightMap);
        if (this.consoleLog) {

            var gr = this.getRect(scale);
            canvas.save();
            canvas.fillStyle = "rgba(228,228,12,0.4)";
            var wd = 1;
            canvas.fillRect(gr.x - this.x + x - (gr.width / 2) - wd, gr.y - this.y + y - (gr.height / 2) - wd, gr.width - (gr.x - this.x) + wd * 2, gr.height - (gr.y - this.y) + wd * 2);
            canvas.restore();

        }*/
        }

        public void Reset()
        {
            /*
        this.x = this.o.X;
        this.y = this.o.Y;
        this.xsp = 0;
        this.ysp = 0;
        this.state = undefined;
        this.xflip = this.o.XFlip;
        this.yflip = this.o.YFlip;
        this.dead = false;
        this.pieceIndex = 0; //maybe
        this.subdata = this.o.SubType;
        this.upperNibble = this.subdata >> 4;
        this.lowerNibble = this.subdata & 0xf;
        if (this.ObjectData.pieceLayouts.length > this.pieceIndex &&
            this.ObjectData.pieceLayouts[this.pieceIndex].pieces.length > 0) {
            this.setPieceLayoutIndex(this.pieceIndex);
        }
*/
        }

        public bool Collides(Sonic sonic)
        {
//            return this.collision(sonic, false);
            return false;
        }

        public void Kill()
        {
            //this.dead=true;
        }

        public void Collision(Sonic sonic, bool isHurtMap)
        {
            /*
                    if (this.dead || !this.ObjectData || this.ObjectData.pieceLayouts.length == 0) return false;
                    var pcs = this.pieces;
                    for (var pieceIndex = 0; pieceIndex < pcs.length; pieceIndex++) {
                        var j = pcs[pieceIndex];
                        var piece = this.ObjectData.pieces[j.pieceIndex];
                        var asset = this.ObjectData.assets[piece.assetIndex];
                        if (asset.frames.length > 0) {
                            var frm = asset.frames[j.frameIndex];
                            var map = isHurtMap ? frm.hurtSonicMap : frm.collisionMap;
                            if (twoDArray(map, (sonic.x - this.x + frm.offsetX + j.x), (sonic.y - this.y + frm.offsetY + j.y)) == true) {
                                return j;
                            }
                        }
                    }

                    return false;*/
        }

        public dynamic twoDArray(dynamic map, int x, int y)
        {
            /*
        if (!map || x < 0 || y < 0 || x > map.length)
            return false;
        var d = map[x];
        if (!d || y > d.length)
            return false;
        return d[y];*/
            return null;
        }

        public void Collide(Sonic sonic, SensorM sensor, dynamic piece)
        {
            /* try {
                        return this.ObjectData.onCollide(this, sonicManager.SonicLevel, sonicManager.sonicToon, sensor, piece);
                    } catch (EJ) {
                        this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
                        return false;
                    }*/
        }

        public void HurtSonic(Sonic sonic, SensorM sensor, dynamic piece)
        {
            /*    try {
    return this.ObjectData.onHurtSonic(this, sonicManager.SonicLevel, sonicManager.sonicToon, sensor, piece);
} catch (EJ) {
    this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);

    return false;
}*/
        }
    }
}