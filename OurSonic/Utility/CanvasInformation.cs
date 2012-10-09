using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using jQueryApi;
namespace OurSonic.Utility
{
    public class CanvasInformation
    {
        [IntrinsicProperty]
        public CanvasContext2D Context { get; set; }
        [IntrinsicProperty]
        public jQueryObject DomCanvas { get; set; }
        [IntrinsicProperty]
        public CanvasElement Canvas { get; set; }

        public CanvasInformation(CanvasContext2D context, jQueryObject domCanvas)
        {
            Context = context;
            DomCanvas = domCanvas;
            Canvas = (CanvasElement) domCanvas[0];
        }

        public static CanvasInformation Create(int w, int h)
        {
            var canvas = (CanvasElement) Document.CreateElement("canvas");
            return Create(canvas, w, h);
        }

        public static CanvasInformation Create(CanvasElement canvas, int w, int h)
        {
            if (w == 0) w = 1;
            if (h == 0) h = 1;
            canvas.Width = w;
            canvas.Height = h;

            var ctx = (CanvasContext2D) canvas.GetContext("2d");
            ctx.Me().webkitImageSmoothingEnabled = false;
            ctx.Me().mozImageSmoothingEnabled = false;
            ctx.Me().imageSmoothingEnabled = false;
            return new CanvasInformation(ctx, jQuery.FromElement(canvas));
        }
    }
}