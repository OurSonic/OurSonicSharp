using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using jQueryApi;
namespace OurSonic
{
    public class UIManager
    {
        private readonly CanvasInformation mainCanvas;
        private readonly Point scale;
        private readonly SonicManager sonicManager;
        [IntrinsicProperty]
        public Dragger dragger { get; set; }
        [IntrinsicProperty]
        public UIManagerData Data { get; set; }

        public UIManager(SonicManager sonicManager, CanvasInformation mainCanvas, Point scale)
        {
            this.sonicManager = sonicManager;
            this.mainCanvas = mainCanvas;
            this.scale = scale;
            dragger = new Dragger((xsp, ysp) => {
                                      sonicManager.WindowLocation.X += (int) xsp;
                                      sonicManager.WindowLocation.Y += (int) ysp;

                                      sonicManager.BigWindowLocation.X = sonicManager.WindowLocation.X;
                                      sonicManager.BigWindowLocation.Y = sonicManager.WindowLocation.Y;
                                  });
        }

        public bool OnClick(jQueryEvent e)
        {
            sonicManager.UIManager.dragger.Click(e);
            return false;
        }

        public bool OnMouseMove(jQueryEvent e)
        {
            if (dragger.IsDragging(e)) {
                dragger.MouseMove(e);
                return false;
            }
            dragger.MouseMove(e);

            return false;
        }

        public void OnMouseUp(jQueryEvent e)
        {
            dragger.MouseUp(e);
        }

        public bool OnMouseScroll(jQueryEvent e)
        {
            return false;
        }

        public void OnKeyDown(jQueryEvent jQueryEvent) {}

        public void Draw(CanvasContext2D gameCanvas)
        {
            dragger.Tick();
        }

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