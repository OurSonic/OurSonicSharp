using System;
using jQueryApi;
namespace OurSonic
{
    public class Dragger
    {
        private readonly Action<double, double> myOnFling;
        private double lag = 0.925f;
        private Point lastPos;
        private double xsp;
        private double ysp;

        public Dragger(Action<double, double> onFling)
        {
            myOnFling = onFling;
        }

        public void Click(jQueryEvent e)
        {
            lastPos = new Point(e.ClientX, e.ClientY);
        }

        public bool IsDragging(jQueryEvent e)
        {
            return lastPos.Truthy();
        }

        public void MouseUp(jQueryEvent e)
        {
            lastPos = null;
        }

        public void MouseMove(jQueryEvent e)
        {
            if (lastPos.Falsey())
                return;

            xsp += ( lastPos.X - e.ClientX ) * 2.7f;
            ysp += ( lastPos.Y - e.ClientY ) * 2.7f;
            xsp = (double) ( ( xsp > 0 ? 1 : -1 ) * Math.Min(Math.Abs(xsp), 60) );
            ysp = (double) ( ( ysp > 0 ? 1 : -1 ) * Math.Min(Math.Abs(ysp), 60) );
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