using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using CommonWebLibraries;
using jQueryApi;
namespace OurSonic
{
    public static class Help
    {
        public static string ToPx(this int number)
        {
            return number + "px";
        }

        public static int Mod(int j, int n)
        {
            return ( ( j % n ) + n ) % n;
        }

        public static ImageElement ScaleSprite(ImageElement image, Point scale, Action<ImageElement> complete)
        {
            var data = GetImageData(image);
            var colors = new List<Color>();
            for (int f = 0; f < data.Length; f++) {
                colors.Add(ColorObjectFromData(data, f));
            }
            var d = DefaultCanvas(0, 0).Context.CreateImageData(image.Width * scale.X, image.Height * scale.Y);
            SetDataFromColors(d.Data, colors, scale, image.Width, new Color(0, 0, 0));
            return LoadSprite(GetBase64Image(d), complete);
        }

        private static void SetDataFromColors(PixelArray data, List<Color> colors, Point scale, int width, Color transparent)
        {
            for (int i = 0; i < colors.Count; i++) {
                var curX = i % width;
                var curY = i / width;
                var g = colors[i];
                var isTrans = false;
                if (transparent != null) {
                    if (g.R == transparent.R && g.G == transparent.G && g.B == transparent.B)
                        isTrans = true;
                }

                for (int j = 0; j < scale.X; j++) {
                    for (int k = 0; k < scale.Y; k++) {
                        var x = ( curX * scale.X + j );
                        var y = ( curY * scale.Y + k );
                        var c = ( x + y * ( scale.X * width ) ) * 4;
                        if (isTrans) {
                            data[c + 0] = 0;
                            data[c + 1] = 0;
                            data[c + 2] = 0;
                            data[c + 3] = 0;
                            continue;
                        }

                        data[c] = g.R;
                        data[c + 1] = g.G;
                        data[c + 2] = g.B;
                        data[c + 3] = 255;
                    }
                }
            }
        }

        private static string GetBase64Image(ImageData data)
        {
            // Create an empty canvas element
            var canvas = (CanvasElement) Document.CreateElement("canvas");
            canvas.Width = data.Width;
            canvas.Height = data.Height;

            // Copy the image contents to the canvas
            var ctx = (CanvasContext2D) canvas.GetContext("2d");
            ctx.PutImageData(data, 0, 0);
            var dataURL = canvas.Me().toDataURL("image/png");
            return dataURL;
        }

        private static Color ColorObjectFromData(PixelArray data, int c)
        {
            var r = (int) data[c];
            var g = (int) data[c + 1];
            var b = (int) data[c + 2];

            return new Color(r, g, b);
        }

        public static PixelArray GetImageData(ImageElement image)
        {
            var canvas = (CanvasElement) Document.CreateElement("canvas");
            canvas.Width = image.Width;
            canvas.Height = image.Height;
            CanvasContext2D ctx = (CanvasContext2D) canvas.GetContext("2d");
            ctx.DrawImage(image, 0, 0);
            var data = ctx.GetImageData(0, 0, image.Width, image.Height);
            return data.Data;
        }

        public static string ScaleCsSImage(ImageElement image, Point scale, Action<object> complete)
        {
            /* var df = image.bytes;
                    var colors = [];
                    for (var f = 0; f < df.length; f += 1) {
                        colors.push(image.palette[df[f]]);
                    }
                    var dc = this.defaultCanvas();
                    var d = dc.context.createImageData(image.width * scale.x, image.height * scale.y);
                    _H.setDataFromColorsNew(d.data, colors, scale, image.width, { r: 0, g: 0, b: 0 });

                    return _H.loadSprite(_H.getBase64Image(d), complete);*/
            return null;
        }

        public static ImageElement LoadSprite(string src, Action<ImageElement> complete)
        {
            var sprite1 = new ImageElement();
            sprite1.AddEventListener("onload", e => {
                                                   sprite1.Me().loaded = true;
                                                   if (complete != null) complete(sprite1);
                                               }, false);
            sprite1.Src = src;
            return sprite1;
        }

        public static CanvasInformation DefaultCanvas(int w, int h)
        {
            var canvas = (CanvasElement) Document.CreateElement("canvas");

            canvas.Width = w;
            canvas.Height = h;

            var ctx = (CanvasContext2D) canvas.GetContext("2d");
            return new CanvasInformation(ctx, jQuery.FromElement(canvas));
        }

        public static string DecodeString(string lvl)
        {
            return new Compressor().DecompressText(lvl);
        }


        [InlineCode("debugger")]
        public static void Debugger()
        {
        }
    }
}