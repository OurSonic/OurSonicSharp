using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using jQueryApi;
namespace OurSonic
{
    public class UIManager
    {
        [IntrinsicProperty]
        public jQueryObject dragger { get; set; }
        [IntrinsicProperty]
        public UIManagerData Data { get; set; }
        public UIManager(SonicManager sonicManager, CanvasInformation mainCanvas, Point scale) {}

        public bool OnClick(jQueryEvent elementEvent)
        {
            return false;
        }

        public bool OnMouseMove(jQueryEvent elementEvent)
        {
            return false;
        }

        public void OnMouseUp(jQueryEvent lastMouseMove) {}

        public bool OnMouseScroll(jQueryEvent elementEvent)
        {
            return false;
        }

        public void OnKeyDown(jQueryEvent jQueryEvent) {}
        public void Draw(CanvasContext2D gameCanvas) {}
        public void UpdateTitle(string decoding) {}
    }
    public class UIManagerData
    {
        [IntrinsicProperty]
        public UIManagerDataIndexes Indexes { get; set; }
        [IntrinsicProperty]
        public dynamic SolidTileArea { get; set; } //todo:: to SolidTileArea obejct
        [IntrinsicProperty]
        public dynamic ModifyTilePieceArea { get; set; } //todo:: to ModifyTilePieceArea obejct
    }
    public class UIManagerDataIndexes
    {
        [IntrinsicProperty]
        public int TPIndex { get; set; }
    }
}