using System.Html;
using System.Html.Media.Graphics;
using jQueryApi;

namespace OurSonic
{
    public class UIManager
    {
        public UIManager(SonicManager sonicManager, CanvasInformation mainCanvas, Point scale)
        {
        }

        public bool OnClick(jQueryEvent elementEvent)
        {

            return false;
        }

        public jQueryApi.jQueryObject dragger { get; set; }

        public UIManagerData Data { get; set; }

        public bool OnMouseMove(jQueryEvent elementEvent)
        {
            return false;
        }

        public void OnMouseUp(jQueryEvent lastMouseMove)
        {
        }

        public bool OnMouseScroll(jQueryEvent elementEvent)
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

    public class UIManagerData
    {
        public UIManagerDataIndexes Indexes { get; set; }

        public dynamic SolidTileArea { get; set; }//todo:: to SolidTileArea obejct
        public dynamic ModifyTilePieceArea { get; set; }//todo:: to ModifyTilePieceArea obejct
    }

    public class UIManagerDataIndexes
    {
        public int TPIndex { get; set; }
    }
}