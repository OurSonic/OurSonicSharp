using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using System.Serialization;
using System.Text.RegularExpressions;
using OurSonic.Level;
using OurSonic.UIManager;
using jQueryApi;
namespace OurSonic.Utility
{
    public class CanvasHandler : IDisposable
    {
        private readonly CanvasContext2D myCanvas;

        public CanvasHandler(CanvasContext2D canvas)
        {
            myCanvas = canvas;
            canvas.Save();
        }

        #region IDisposable Members

        public void Dispose()
        {
            myCanvas.Restore();
        }

        #endregion
    }
    public static class Help
    {
        private static double[] cos_table = new[] {
                                                         1.00000, 0.99970, 0.99880, 0.99729, 0.99518, 0.99248, 0.98918, 0.98528,
                                                         0.98079, 0.97570, 0.97003, 0.96378, 0.95694, 0.94953, 0.94154, 0.93299,
                                                         0.92388, 0.91421, 0.90399, 0.89322, 0.88192, 0.87009, 0.85773, 0.84485,
                                                         0.83147, 0.81758, 0.80321, 0.78835, 0.77301, 0.75721, 0.74095, 0.72425,
                                                         0.70711, 0.68954, 0.67156, 0.65317, 0.63439, 0.61523, 0.59570, 0.57581,
                                                         0.55557, 0.53500, 0.51410, 0.49290, 0.47140, 0.44961, 0.42755, 0.40524,
                                                         0.38268, 0.35990, 0.33689, 0.31368, 0.29028, 0.26671, 0.24298, 0.21910,
                                                         0.19509, 0.17096, 0.14673, 0.12241, 0.09802, 0.07356, 0.04907, 0.02454,
                                                         0.00000, -0.02454, -0.04907, -0.07356, -0.09802, -0.12241, -0.14673, -0.17096,
                                                         -0.19509, -0.21910, -0.24298, -0.26671, -0.29028, -0.31368, -0.33689, -0.35990,
                                                         -0.38268, -0.40524, -0.42755, -0.44961, -0.47140, -0.49290, -0.51410, -0.53500,
                                                         -0.55557, -0.57581, -0.59570, -0.61523, -0.63439, -0.65317, -0.67156, -0.68954,
                                                         -0.70711, -0.72425, -0.74095, -0.75721, -0.77301, -0.78835, -0.80321, -0.81758,
                                                         -0.83147, -0.84485, -0.85773, -0.87009, -0.88192, -0.89322, -0.90399, -0.91421,
                                                         -0.92388, -0.93299, -0.94154, -0.94953, -0.95694, -0.96378, -0.97003, -0.97570,
                                                         -0.98079, -0.98528, -0.98918, -0.99248, -0.99518, -0.99729, -0.99880, -0.99970,
                                                         -1.00000, -0.99970, -0.99880, -0.99729, -0.99518, -0.99248, -0.98918, -0.98528,
                                                         -0.98079, -0.97570, -0.97003, -0.96378, -0.95694, -0.94953, -0.94154, -0.93299,
                                                         -0.92388, -0.91421, -0.90399, -0.89322, -0.88192, -0.87009, -0.85773, -0.84485,
                                                         -0.83147, -0.81758, -0.80321, -0.78835, -0.77301, -0.75721, -0.74095, -0.72425,
                                                         -0.70711, -0.68954, -0.67156, -0.65317, -0.63439, -0.61523, -0.59570, -0.57581,
                                                         -0.55557, -0.53500, -0.51410, -0.49290, -0.47140, -0.44961, -0.42756, -0.40524,
                                                         -0.38268, -0.35990, -0.33689, -0.31368, -0.29028, -0.26671, -0.24298, -0.21910,
                                                         -0.19509, -0.17096, -0.14673, -0.12241, -0.09802, -0.07356, -0.04907, -0.02454,
                                                         -0.00000, 0.02454, 0.04907, 0.07356, 0.09802, 0.12241, 0.14673, 0.17096,
                                                         0.19509, 0.21910, 0.24298, 0.26671, 0.29028, 0.31368, 0.33689, 0.35990,
                                                         0.38268, 0.40524, 0.42756, 0.44961, 0.47140, 0.49290, 0.51410, 0.53500,
                                                         0.55557, 0.57581, 0.59570, 0.61523, 0.63439, 0.65317, 0.67156, 0.68954,
                                                         0.70711, 0.72425, 0.74095, 0.75721, 0.77301, 0.78835, 0.80321, 0.81758,
                                                         0.83147, 0.84485, 0.85773, 0.87009, 0.88192, 0.89322, 0.90399, 0.91421,
                                                         0.92388, 0.93299, 0.94154, 0.94953, 0.95694, 0.96378, 0.97003, 0.97570,
                                                         0.98079, 0.98528, 0.98918, 0.99248, 0.99518, 0.99729, 0.99880, 0.99970
                                                 };

        public static string ToPx(this int number)
        {
            return number + "px";
        }

        public static string ToPx(this double number)
        {
            return number + "px";
        }

        public static double Sin(int f)
        {
            return cos_table[( f + 0x40 ) & 0xFF];
        }

        public static double Cos(int f)
        {
            return cos_table[( f ) & 0xFF];
        }

        public static int Mod(int j, int n)
        { 
            

            return ( ( j % n ) + n ) % n;
        }

        public static CanvasInformation ScaleSprite(ImageElement image, Point scale)
        {
            var canv = CanvasInformation.Create(image.Width * scale.X, image.Height * scale.Y);

            canv.Context.Save();
            canv.Context.Scale(scale.X, scale.Y);
            canv.Context.DrawImage(image, 0, 0);
            canv.Context.Restore();

            return canv;
        }

        public static ImageData ScalePixelData(Point scale, ImageData data)
        {
            PixelArray pixelArray = data.Data;

            var colors = new Color[pixelArray.Length / 4];
            for (int f = 0; f < pixelArray.Length; f += 4) {
                colors[f / 4] = ( ColorObjectFromData(pixelArray, f) );
            }
            var d = CanvasInformation.Create(1, 1).Context.CreateImageData(data.Width * scale.X, data.Height * scale.Y);
            SetDataFromColors(d.Data, colors, scale, data.Width, colors[0]);
            return d;
        }

        private static void SetDataFromColors(PixelArray data, Color[] colors, Point scale, int width, Color transparent)
        {
            for (int i = 0; i < colors.Length; i++) {
                var curX = i % width;
                var curY = i / width;
                var g = colors[i];
                var isTrans = false;
                if (transparent.Truthy()) {
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
            var a = (int) data[c + 3];

            return new Color(r, g, b, a);
        }

        public static ImageData GetImageData(ImageElement image)
        {
            var canvas = (CanvasElement) Document.CreateElement("canvas");
            canvas.Width = image.Width;
            canvas.Height = image.Height;
            CanvasContext2D ctx = (CanvasContext2D) canvas.GetContext("2d");
            ctx.DrawImage(image, 0, 0);
            var data = ctx.GetImageData(0, 0, image.Width, image.Height);
            return data;
        }

        public static ImageElement ScaleCsImage(SonicImage image, Point scale, Action<ImageElement> complete)
        {
            var df = image.Bytes;
            var colors = new Color[df.Length];

            for (int f = 0; f < df.Length; f++) {
                var c = image.Palette[df[f]];
                colors[f] = new Color(c[0], c[1], c[2], c[3]);
            }

            var dc = CanvasInformation.Create(1, 1);
            var d = dc.Context.CreateImageData(image.Width * scale.X, image.Height * scale.Y);
            SetDataFromColors(d.Data, colors, scale, image.Width, colors[0]);
            return LoadSprite(GetBase64Image(d), complete);
        }

        public static bool Loaded(this ImageElement element)
        {
            return element.GetAttribute("loaded") == "true";
        }

        public static void Loaded(this ImageElement element, bool set)
        {
            element.SetAttribute("loaded", set ? "true" : "false");
        }

        public static ImageElement LoadSprite(string src, Action<ImageElement> complete)
        {
            var sprite1 = new ImageElement();
            sprite1.AddEventListener("load",
                                     e => {
                                         sprite1.Loaded(true);
                                         if (complete.Truthy()) complete(sprite1);
                                     },
                                     false);
            sprite1.Src = src;
            return sprite1;
        }

        public static string DecodeString(string lvl)
        {
            return new Compressor().DecompressText(lvl);
        }

        public static void DecodeString<T>(string lvl, Action<T> complete)
        {
            if (FunctionWorker.HasWebWorker()) {
                new FunctionWorker("lib/FunctionWorker.js").ThreadedFunction<string, string>
                        ((e) => {
                             FunctionWorker.ImportScripts("RawDeflate.js");

                             e.Data = new Compressor().DecompressText(e.Data);

                             e.Callback(e.Data);
                         },
                         (e) => complete(Json.Parse<T>(e.Data)),
                         (e) => { },
                         lvl);
            } else complete(Json.Parse<T>(new Compressor().DecompressText(lvl)));
        }

        [InlineCode("debugger")]
        public static void Debugger() {}

        [InlineCode("{o}")]
        public static bool Truthy(this object o)
        {
            return o != null;
        }

        [InlineCode("!{o}")]
        public static bool Falsey(this object o)
        {
            return o == null;
        }

        public static double FixAngle(int angle)
        {
            var fixedAng = (int) Math.Floor(( 256 - angle ) * 1.4062) % 360;
            var flop = 360 - fixedAng;
            return DegToRad(flop);
        }

        public static double DegToRad(int angle)
        {
            return angle * Math.PI / 180;
        }

        public static int Sign(double m)
        {
            return m == 0 ? 0 : ( m < 0 ? -1 : 1 );
        }

        public static int Floor(double spinDashSpeed)
        {
            if (spinDashSpeed > 0)
                return ~~spinDashSpeed.Me();
            return (int) Math.Floor(spinDashSpeed);
        }

        public static double Max(double f1, double f2)
        {
            return f1 < f2 ? f2 : f1;
        }

        public static double Min(double f1, double f2)
        {
            return f1 > f2 ? f2 : f1;
        }

        
        public static T Clone<T>(T o)
        {
            return default( T );
        }

        /*
                public static T Extend<T>(JsDictionary<string, dynamic> p0, JsDictionary<string, dynamic> p1)
                {
                    foreach (var p in p0)
                    {
                        p1[p.Key] = p.Value;
                    }
                    return p0.Me()
                }
        */
        /*
                public static T Extend<T>(T p0, dynamic p1)
                {
                    return Extend<T>(p0.Me(), Extensions.Me(p1));
                }
        */

        public static void MergeRect(Rectangle main, Rectangle small)
        {
            main.X = Math.Min(small.X, main.X);
            main.Width = Math.Max(( ( small.X + small.Width ) + main.X ), main.Width);
            main.Y = Math.Min(small.Y, main.Y);
            main.Height = Math.Max(( ( small.Y + small.Height ) + main.Y ), main.Height);
        }

        public static void RoundRect(CanvasContext2D ctx, int x, int y, int width, int height, int radius = 5, bool fill = true, bool stroke = false)
        {
            ctx.Save();
            ctx.LineWidth = 3;
            ctx.BeginPath();
            ctx.MoveTo(x + radius, y);
            ctx.LineTo(x + width, y);
            //ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.LineTo(x + width, y + height);
            // ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.LineTo(x, y + height);
            // ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.LineTo(x, y + radius);
            ctx.QuadraticCurveTo(x, y, x + radius, y);
            ctx.ClosePath();
            if (stroke)
                ctx.Stroke();
            if (fill)
                ctx.Fill();
            ctx.Restore();
        }

        public static Pointer GetCursorPosition(jQueryEvent ev)
        {
            if (ev.Me().originalEvent && ev.Me().originalEvent.targetTouches && ev.Me().originalEvent.targetTouches.length > 0) ev = ev.Me().originalEvent.targetTouches[0];

            if (ev.PageX.Me() != null && ev.PageY.Me() != null)
                return new Pointer(ev.PageX, ev.PageY, 0, ev.Which == 3);
            //if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
            return new Pointer(ev.ClientX, ev.ClientY, 0, ev.Which == 3);
        }

        public static string Stringify(object obj)
        {
            return Json.Stringify(obj,
                                  (key, value) => {
                                      if (key == "image") return null;
                                      if (key == "imageData") return null;
                                      if (key == "oldScale") return null;
                                      if (key == "sprite") return null;
                                      if (key == "sprites") return null;
                                      if (key == "index") return null;
                                      if (key == "_style") return null;

                                      else return value;
                                  }); //.replaceAll("false", "0").replaceAll("true", "1");
        }

        public static CanvasInformation SafeResize(CanvasInformation block, int width, int height)
        {
            var m = CanvasInformation.Create(width, height);
            /*var img=block.Context.GetImageData(0, 0, block.Canvas.Width, block.Canvas.Height);
            m.Context.PutImageData(img, 0, 0);*/
            m.Context.DrawImage(block.Canvas, 0, 0);
            return m;
        }

        public static JsDictionary<string, string> GetQueryString()
        {
            var result = new JsDictionary<string, string>();
            string queryString = Window.Location.Search.Substring(1);
            var re = new Regex("/([^&=]+)=([^&]*)/g");
            RegexMatch m;
            while (( m = re.Exec(queryString) ) != null) {
                result[Window.Instance.Me().decodeURIComponent(m[1])] = Window.Instance.Me().decodeURIComponent(m[2]);
            }

            return result;
        }
    }
}