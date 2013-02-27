using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.Level.Objects
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
        private JsDictionary<int, CanvasInformation> Image { get; set; }
        [IntrinsicProperty]
        public string TransparentColor { get; set; }

        public LevelObjectAssetFrame(string name)
        {
            Image = new JsDictionary<int, CanvasInformation>();

            Name = name;
            CollisionMap = new int[100][];
            HurtSonicMap = new int[100][];

            for (var i = 0; i < 100; i++) {
                CollisionMap[i] = new int[100];
                HurtSonicMap[i] = new int[100];
            }
        }

        public void SetWidth(int w)
        {
            Width = w;
            CollisionMap = CollisionMap.Slice(0, w);
            ClearCache();
        }

        public void SetHeight(int h)
        {
            Height = h;
            for (var j = 0; j < Width; j++) {
                CollisionMap[j] = CollisionMap[j].Slice(0, h);
            }
            ClearCache();
        }

        public void SetOffset(int ex, int ey)
        {
            OffsetX = ex;
            OffsetY = ey;

            ClearCache();
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

        public void DrawSimple(CanvasContext2D mainCanvas, Point pos, int width, int height, bool xflip, bool yflip )
        {
            var c = GetCache(new Point(width, height) ,false,false,false);

            mainCanvas.Save();
            mainCanvas.Translate(pos.X, pos.Y);
            mainCanvas.Scale(((double)width / Width), ((double)height / Height));

            mainCanvas.DrawImage(c.Canvas, 0, 0);
            mainCanvas.Restore();
        }

 
        public CanvasInformation GetCache(Point size,   bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            var m=
                    Image[
                              ( size.X * 47 ) ^   
                            ( ( ( showOutline ? 1 : 0 ) + 2 ) * 7 ) ^ ( ( ( showCollideMap ? 1 : 0 ) + 2 ) * 89 ) ^
                            ( ( ( showHurtMap ? 1 : 0 ) + 2 ) * 79 )];


            if (m == null) { 
                    var mj = CanvasInformation.Create(size.X, size.Y);
                    var canvas = mj.Context;

                    canvas.Save();

                    canvas.StrokeStyle = "#000000";
                    canvas.LineWidth = 1;
                 
                 

                    for (var x = 0; x < Width; x++)
                    {
                        for (var y = 0; y < Height; y++)
                        {
                            var ex = x;
                            var ey = y;
                            var d = ColorMap[ex][ey];

                            var color = Palette[d];
                            if (color == TransparentColor)
                            {
                                if (canvas.FillStyle != "rgba(0,0,0,0)")
                                    canvas.FillStyle = "rgba(0,0,0,0)";
                            }
                            else
                            {
                                //  var negative = _H.negateColor(color);
                                if (canvas.FillStyle != "#" + color)
                                    canvas.FillStyle = "#" + color;
                            }

                            
                            //if (canvas.strokeStyle != "#" + negative)
                            //    canvas.strokeStyle = "#" + negative; 

                            canvas.FillRect(ex, ey, 1, 1);
                            //  if (showOutline)
                            //    canvas.strokeRect(ex, ey, 1, 1);

                            if (showCollideMap)
                            {
                                if (CollisionMap[ex][ey] > 0)
                                {
                                    canvas.FillStyle = "rgba(30,34,255,0.6)";
                                    canvas.FillRect(ex, ey, 1, 1);
                                }
                            }

                            if (showHurtMap)
                            {
                                if (HurtSonicMap[ex][ey] > 0)
                                {
                                    canvas.FillStyle = "rgba(211,12,55,0.6)";
                                    canvas.FillRect(ex, ey, 1, 1);
                                }
                            }
                        }
                    }
                  
                    canvas.Restore();
                    m  = mj;
                    SetCache(mj, size,   showOutline, showCollideMap, showHurtMap);
                } 

            return m;
        }

        public void ClearCache()
        {
            Image = new JsDictionary<int, CanvasInformation>();
        }

        public void SetCache(CanvasInformation image, Point size,  bool showOutline, bool showCollideMap, bool showHurtMap)
        {
            Image[
                       ( size.X * 47 ) ^   
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
            var fd = GetCache(size,   showOutline, showCollideMap, showHurtMap);



            _canvas.Save();

            _canvas.Translate(pos.X, pos.Y);

            _canvas.Scale((double)size.X / Width, (double)size.Y / Height);
            if (xflip)
            {
                if (yflip)
                {
                    _canvas.Translate(fd.Canvas.Width / 2d, fd.Canvas.Height / 2d);
                    _canvas.Rotate(-90 * Math.PI / 180);
                    _canvas.Translate(-fd.Canvas.Width / 2d, -fd.Canvas.Height / 2d);

                    _canvas.Translate(0, size.Y);
                    _canvas.Scale(1, -1);
                }
                else
                {
                    _canvas.Translate(fd.Canvas.Width / 2d, fd.Canvas.Height / 2d);
                    _canvas.Rotate(-90 * Math.PI / 180);
                    _canvas.Translate(-fd.Canvas.Width / 2d, -fd.Canvas.Height / 2d);
                }
            }
            else
            {
                if (yflip)
                {
                    _canvas.Translate(0, size.Y);
                    _canvas.Scale(1, -1);
                }
                else { }
            }
_canvas.DrawImage(fd.Canvas, 0, 0);
if (showOffset)
{
    _canvas.BeginPath();
    _canvas.MoveTo(OffsetX, 0);
    _canvas.LineTo(OffsetX, Height);
    _canvas.LineWidth = 1;
    _canvas.StrokeStyle = "#000000";
    _canvas.Stroke();
    
    _canvas.BeginPath();
    _canvas.MoveTo(0, OffsetY);
    _canvas.LineTo(Width, OffsetY);
    _canvas.LineWidth = 1;
    _canvas.StrokeStyle = "#000000";
    _canvas.Stroke();
}
           
            _canvas.Restore();
        }
    }
}