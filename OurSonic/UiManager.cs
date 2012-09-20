using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using jQueryApi;
namespace OurSonic
{
    public class UIManager
    {
        private readonly SonicManager sonicManager;
        private readonly CanvasInformation mainCanvas;
        private readonly Point scale;
        [IntrinsicProperty]
        public Dragger dragger { get; set; }
        [IntrinsicProperty]
        public UIManagerData Data { get; set; }
        public UIManager(SonicManager sonicManager, CanvasInformation mainCanvas, Point scale)
        {
            this.sonicManager = sonicManager;
            this.mainCanvas = mainCanvas;
            this.scale = scale;
            dragger = new Dragger((xsp, ysp) =>
            {
                sonicManager.WindowLocation.X += (int)xsp;
                sonicManager.WindowLocation.Y += (int)ysp;

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
            if (dragger.IsDragging(e))
            {
                dragger.MouseMove(e);
                return false;
            }
            dragger.MouseMove(e);

            return false;
        }

        public void OnMouseUp(jQueryEvent e)
        {


            this.dragger.MouseUp(e);
        }

        public bool OnMouseScroll(jQueryEvent e)
        {
            return false;
        }

        public void OnKeyDown(jQueryEvent jQueryEvent) { }
        public void Draw(CanvasContext2D gameCanvas)
        {
            this.dragger.Tick();

            
        }
        public void UpdateTitle(string decoding) { }
    }
    public class Dragger
    {
        private readonly Action<float, float> myOnFling;
        private Point lastPos;
        private float xsp;
        private float ysp;
        private float lag = 0.925f;
        public Dragger(Action<float, float> onFling)
        {
            myOnFling = onFling;
        }

        public void Click(jQueryEvent e)
        {
            lastPos = new Point(e.ClientX, e.ClientY);
        }
        public bool IsDragging(jQueryEvent e)
        {
            return lastPos != null;
        }
        public void MouseUp(jQueryEvent e)
        {
            lastPos = null;
        }
        public void MouseMove(jQueryEvent e)
        {
            if (this.lastPos == null)
            {
                return;
            }

            xsp += (lastPos.X - e.ClientX) * 2.7f;
            ysp += (lastPos.Y - e.ClientY) * 2.7f;
            xsp = (float)((xsp > 0 ? 1 : -1) * Math.Min(Math.Abs(xsp), 60));
            ysp = (float)((ysp > 0 ? 1 : -1) * Math.Min(Math.Abs(ysp), 60));
            lastPos = new Point(e.ClientX, e.ClientY);
        }
        public void Tick()
        {
            myOnFling(xsp, ysp);
            if (xsp > 0)
                xsp *= lag;
            else
                xsp *= lag;

            if (ysp > 0)
                ysp *= lag;
            else
                ysp *= lag;

            if (Math.Abs(xsp) <= 2)
                xsp = 0;
            if (Math.Abs(ysp) <= 2)
                ysp = 0;
        }
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