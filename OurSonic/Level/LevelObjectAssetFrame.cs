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
        public JsDictionary<int, CanvasInformation> Image { get; set; }

        public LevelObjectAssetFrame(string name)
        {
            Image = new JsDictionary<int, CanvasInformation>();

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

        public void DrawSimple(CanvasContext2D canvas, Point pos, int width, int height, bool xflip, bool yflip)
        {
            canvas.Save();
            canvas.Translate(pos.X, pos.Y);

            if (xflip) {
                if (yflip) {
                    canvas.Translate(width, height);
                    canvas.Scale(-1, -1);
                } else {
                    canvas.Translate(width, 0);
                    canvas.Scale(-1, 1);
                }
            } else {
                if (yflip) {
                    canvas.Translate(0, height);
                    canvas.Scale(1, -1);
                } else {}
            }

            canvas.Scale(( width / Width ), ( height / Height ));

            for (var x = 0; x < Width; x++) {
                for (var y = 0; y < Height; y++) {
                    var ex = x;
                    var ey = y;
                    var color = Palette[ColorMap[ex][ey]];
                    if (canvas.FillStyle != "#" + color)
                        canvas.FillStyle = "#" + color;

                    canvas.FillRect(ex, ey, 1, 1);
                }
            }
            canvas.Restore();
        }

        public CanvasInformation GetCache(Point size, bool xflip, bool yflip, bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            return
                    Image[
                            ( ( ( xflip ? 1 : 0 ) + 2 ) * 13 ) ^ ( size.X * 47 ) ^ ( ( ( yflip ? 1 : 0 ) + 2 ) * 71 ) ^
                            ( ( ( showOutline ? 1 : 0 ) + 2 ) * 7 ) ^ ( ( ( showCollideMap ? 1 : 0 ) + 2 ) * 89 ) ^
                            ( ( ( showHurtMap ? 1 : 0 ) + 2 ) * 79 )];
            return null;
        }

        public void ClearCache()
        {
            Image = new JsDictionary<int, CanvasInformation>();
        }

        public void SetCache(CanvasInformation image, Point size, bool xflip, bool yflip, bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            Image[
                    ( ( ( xflip ? 1 : 0 ) + 2 ) * 13 ) ^ ( size.X * 47 ) ^ ( ( ( yflip ? 1 : 0 ) + 2 ) * 71 ) ^
                    ( ( ( showOutline ? 1 : 0 ) + 2 ) * 7 ) ^ ( ( ( showCollideMap ? 1 : 0 ) + 2 ) * 89 ) ^
                    ( ( ( showHurtMap ? 1 : 0 ) + 2 ) * 79 )] = image;
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