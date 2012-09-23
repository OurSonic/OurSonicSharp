using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.Level
{
    public class LevelObjectAssetFrame
    {
        /*
    this.offsetX = 0;
    this.width = 0;
    this.height = 0;
    this.offsetY = 0;
    this.hurtSonicMap = [];
    this.collisionMap = [];
         


    this.colorMap = [];
    this.palette = [];
    this.name = name ? name : "";
    this.image = [];
         */
        [IntrinsicProperty]
        public string Name { get; set; }

        public LevelObjectAssetFrame(string name)
        {
            Name = name;

            /*  for (var i = 0; i < 100; i++) {
                    this.collisionMap[i] = [];
                    this.hurtSonicMap[i] = [];

                }*/
        }

        public void SetWidth(int w)
        {
            /*  this.width = w;
                        this.collisionMap = this.collisionMap.slice(0, w);
                        this.clearCache();*/
        }

        public void SetHeight(int h)
        {
            /*      this.height = h;
        for (var j = 0; j < this.width; j++) {
            this.collisionMap[j] = this.collisionMap[j].slice(0, h);
        }
        this.clearCache();*/
        }

        public void SetOffset(int ex, int ey)
        {
            /*         this.offsetX = ex;
        this.offsetY = ey;

        this.clearCache();*/
        }

        /* this.uploadImage = function (sprite) {
        this.width = sprite.width;
        this.height = sprite.height;
        this.offsetX = _H.floor(sprite.width / 2);
        this.offsetY = _H.floor(sprite.height / 2);

        var ca = _H.defaultCanvas(this.width, this.height);

        ca.context.drawImage(sprite, 0, 0);
        var imgd = ca.context.getImageData(0, 0, this.width, this.height);
        var pix = imgd.data;

        var palette = {};
        var paletteLength = 0;

        for (var x = 0; x < this.width; x++) {
            this.colorMap[x] = [];
            for (var y = 0; y < this.height; y++) {
                var pl = _H.colorFromData(pix, (x * 4) + y * this.width * 4);
                var ind = 0;
                if (palette[pl] != undefined) {
                    ind = palette[pl];
                } else {
                    ind = paletteLength;
                    palette[pl] = paletteLength;
                    paletteLength++;
                }
                this.colorMap[x][y] = ind;
            }
        }
        this.palette = [];
        var ind = 0;
        for (var p in palette) {
            this.palette[ind++] = p.replace("#", "");
        }

    };*/

        public void DrawSimple(CanvasInformation canvas, Point pos, int width, int height, bool xflip, bool yflip)
        {
            /*
        canvas.save();
        canvas.translate(pos.x, pos.y);


        if (xflip) {
            if (yflip) {
                canvas.translate(width, height);
                canvas.scale(-1, -1);
            } else {
                canvas.translate(width, 0);
                canvas.scale(-1, 1);
            }
        } else {
            if (yflip) {
                canvas.translate(0, height);
                canvas.scale(1, -1);
            } else {

            }
        }

        canvas.scale((width / this.width), (height / this.height));


        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var ex = x;
                var ey = y;
                var color = this.palette[this.colorMap[ex][ey]];
                if (canvas.fillStyle != "#" + color)
                    canvas.fillStyle = "#" + color;

                canvas.fillRect(ex, ey, 1, 1);

            }
        }
        canvas.restore();*/
        }

        public CanvasContext2D GetCache(Point size, bool xflip, bool yflip, bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            //            return this.image[((xflip + 2) * 13) ^ (size.width * 47) ^ ((yflip + 2) * 71) ^ ((showOutline + 2) * 7) ^ ((showCollideMap + 2) * 89) ^ ((showHurtMap + 2) * 79)];
            return null;
        }

        public void ClearCache()
        {
            //                 this.image = [];
        }

        public void SetCache(dynamic image, Point size, bool xflip, bool yflip, bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            //            this.image[((xflip + 2) * 13) ^ (size.width * 47) ^ ((yflip + 2) * 71) ^ ((showOutline + 2) * 7) ^ ((showCollideMap + 2) * 89) ^ ((showHurtMap + 2) * 79)] = image;
        }

        public void DrawUI(CanvasInformation _canvas, Point pos, int width, int height, bool xflip, bool yflip)
        {
            /*

        var fd = this.getCache(size, xflip, yflip, showOutline, showCollideMap, showHurtMap);

        if (!fd) {


            var mj = _H.defaultCanvas(size.width, size.height);
            var canvas = mj.context;

            canvas.save();

            canvas.strokeStyle = "#000000";
            canvas.lineWidth = 1;


            if (xflip) {
                if (yflip) {
                    canvas.translate(size.width, size.height);
                    canvas.scale(-1, -1);
                } else {
                    canvas.translate(size.width, 0);
                    canvas.scale(-1, 1);
                }
            } else {
                if (yflip) {
                    canvas.translate(0, size.height);
                    canvas.scale(1, -1);
                } else {

                }
            }

            var transparent = -200; //this.colorMap[0][0]

            canvas.scale(size.width / this.width, size.height / this.height);
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    var ex = x;
                    var ey = y;
                    var d = this.colorMap[ex][ey];
                    if (transparent == d) {
                        if (canvas.fillStyle != "rgba(0,0,0,0)")
                            canvas.fillStyle = "rgba(0,0,0,0)";
                    } else {
                        var color = this.palette[d];
                        //  var negative = _H.negateColor(color);
                        if (canvas.fillStyle != "#" + color)
                            canvas.fillStyle = "#" + color;

                    }
                    //if (canvas.strokeStyle != "#" + negative)
                    //    canvas.strokeStyle = "#" + negative; 


                    canvas.fillRect(ex, ey, 1, 1);
                    //  if (showOutline)
                    //    canvas.strokeRect(ex, ey, 1, 1);

                    if (showCollideMap) {
                        if (this.collisionMap[ex][ey]) {
                            canvas.fillStyle = "rgba(30,34,255,0.6)";
                            canvas.fillRect(ex, ey, 1, 1);
                        }
                    }

                    if (showHurtMap) {
                        if (this.hurtSonicMap[ex][ey]) {
                            canvas.fillStyle = "rgba(211,12,55,0.6)";
                            canvas.fillRect(ex, ey, 1, 1);
                        }

                    }
                }
            }
            if (showOffset) {

                canvas.beginPath();
                canvas.moveTo(this.offsetX, 0);
                canvas.lineTo(this.offsetX, this.height);
                canvas.lineWidth = 1;
                canvas.strokeStyle = "#000000";
                canvas.stroke();

                canvas.beginPath();
                canvas.moveTo(0, this.offsetY);
                canvas.lineTo(this.width, this.offsetY);
                canvas.lineWidth = 1;
                canvas.strokeStyle = "#000000";
                canvas.stroke();
            }
            canvas.restore();
            fd = mj.canvas;
            this.setCache(mj.canvas, size, xflip, yflip, showOutline, showCollideMap, showHurtMap);
        }

        _canvas.drawImage(fd, pos.x, pos.y);
         */
        }
    }
}