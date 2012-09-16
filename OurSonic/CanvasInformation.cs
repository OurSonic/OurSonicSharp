using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using jQueryApi;

namespace OurSonic
{
    public class CanvasInformation
    {
        public CanvasInformation( CanvasContext2D context, jQueryObject domCanvas)
        {
            Context = context;
            DomCanvas = domCanvas;
        }

  
        [IntrinsicProperty]
        public CanvasContext2D Context { get; set; }

        [IntrinsicProperty]
        public jQueryObject DomCanvas { get; set; }
    }
}