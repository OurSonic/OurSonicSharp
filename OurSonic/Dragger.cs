using System;
using jQueryApi;
namespace OurSonic
{
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
            return lastPos .Truthy();
        }
        public void MouseUp(jQueryEvent e)
        {
            lastPos = null;
        }
        public void MouseMove(jQueryEvent e)
        {
            if (this.lastPos .Falsey())
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
}