using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.Level
{
    public class LevelObjectAssetFrame
    {
        [IntrinsicProperty]
        public int OffsetX { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public int OffsetY { get; set; }
        [IntrinsicProperty]
        public int[][] HurtSonicMap { get; set; }
        [IntrinsicProperty]
        public int[][] CollisionMap { get; set; }
        [IntrinsicProperty]
        public int[][] ColorMap { get; set; }
        [IntrinsicProperty]
        public string[] Palette { get; set; }
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, CanvasInformation> Image { get; set; }

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

        public CanvasInformation GetCache(Point size, bool xflip, bool yflip, bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            //            return this.image[((xflip + 2) * 13) ^ (size.width * 47) ^ ((yflip + 2) * 71) ^ ((showOutline + 2) * 7) ^ ((showCollideMap + 2) * 89) ^ ((showHurtMap + 2) * 79)];
            return null;
        }

        public void ClearCache()
        {
            //                 this.image = [];
        }

        public void SetCache(CanvasInformation image, Point size, bool xflip, bool yflip, bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            //            this.image[((xflip + 2) * 13) ^ (size.width * 47) ^ ((yflip + 2) * 71) ^ ((showOutline + 2) * 7) ^ ((showCollideMap + 2) * 89) ^ ((showHurtMap + 2) * 79)] = image;
        }

        public void DrawUI(CanvasContext2D _canvas,
                           Point pos,
                           Point size,
                           bool showOutline,
                           bool showCollideMap,
                           bool showHurtMap,
                           bool showOffset,
                           bool xflip,
                           bool yflip)
        {
            var fd = GetCache(size, xflip, yflip, showOutline, showCollideMap, showHurtMap);

            if (fd.Falsey()) {
                var mj = Help.DefaultCanvas(size.X, size.Y);
                var canvas = mj.Context;

                canvas.Save();

                canvas.StrokeStyle = "#000000";
                canvas.LineWidth = 1;

                if (xflip) {
                    if (yflip) {
                        canvas.Translate(size.X, size.Y);
                        canvas.Scale(-1, -1);
                    } else {
                        canvas.Translate(size.X, 0);
                        canvas.Scale(-1, 1);
                    }
                } else {
                    if (yflip) {
                        canvas.Translate(0, size.Y);
                        canvas.Scale(1, -1);
                    } else {}
                }

                var transparent = -200; //this.colorMap[0][0]

                canvas.Scale(size.X / Width, size.Y / Height);
                for (var x = 0; x < Width; x++) {
                    for (var y = 0; y < Height; y++) {
                        var ex = x;
                        var ey = y;
                        var d = ColorMap[ex][ey];
                        if (transparent == d) {
                            if (canvas.FillStyle != "rgba(0,0,0,0)")
                                canvas.FillStyle = "rgba(0,0,0,0)";
                        } else {
                            var color = Palette[d];
                            //  var negative = _H.negateColor(color);
                            if (canvas.FillStyle != "#" + color)
                                canvas.FillStyle = "#" + color;
                        }
                        //if (canvas.strokeStyle != "#" + negative)
                        //    canvas.strokeStyle = "#" + negative; 

                        canvas.FillRect(ex, ey, 1, 1);
                        //  if (showOutline)
                        //    canvas.strokeRect(ex, ey, 1, 1);

                        if (showCollideMap) {
                            if (CollisionMap[ex][ey] > 0) {
                                canvas.FillStyle = "rgba(30,34,255,0.6)";
                                canvas.FillRect(ex, ey, 1, 1);
                            }
                        }

                        if (showHurtMap) {
                            if (HurtSonicMap[ex][ey] > 0) {
                                canvas.FillStyle = "rgba(211,12,55,0.6)";
                                canvas.FillRect(ex, ey, 1, 1);
                            }
                        }
                    }
                }
                if (showOffset) {
                    canvas.BeginPath();
                    canvas.MoveTo(OffsetX, 0);
                    canvas.LineTo(OffsetX, Height);
                    canvas.LineWidth = 1;
                    canvas.StrokeStyle = "#000000";
                    canvas.Stroke();

                    canvas.BeginPath();
                    canvas.MoveTo(0, OffsetY);
                    canvas.LineTo(Width, OffsetY);
                    canvas.LineWidth = 1;
                    canvas.StrokeStyle = "#000000";
                    canvas.Stroke();
                }
                canvas.Restore();
                fd = mj;
                SetCache(mj, size, xflip, yflip, showOutline, showCollideMap, showHurtMap);
            }

            _canvas.DrawImage(fd.Canvas, pos.X, pos.Y);
        }
    }
}