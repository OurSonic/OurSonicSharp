using System.Html;
using System.Html.Media.Graphics;
using jQueryApi;

namespace OurSonic
{
    public class UIManager
    {
        public bool OnClick(ElementEvent elementEvent)
        {

            return false;
        }

        public jQueryApi.jQueryObject dragger { get; set; }

        public bool OnMouseMove(ElementEvent elementEvent)
        {
            return false;
        }

        public void OnMouseUp(ElementEvent lastMouseMove)
        {
        }

        public bool OnMouseScroll(ElementEvent elementEvent)
        {
            return false;
        }

        public void OnKeyDown(jQueryEvent jQueryEvent)
        {
        }

        public void Draw(CanvasContext2D gameCanvas)
        {

        }
    }
}