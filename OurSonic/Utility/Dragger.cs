using System;
using OurSonic.UIManager;
namespace OurSonic.Utility
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

        public void Click(Pointer cell)
        {
            lastPos = new Point(cell.X, cell.Y);
        }

        public bool IsDragging(Pointer cell)
        {
            return lastPos.Truthy();
        }

        public void MouseUp(Pointer cell)
        {
            lastPos = null;
        }

        public void MouseMove(Pointer cell)
        {
            if (lastPos.Falsey())
                return;

            xsp += ( lastPos.X - cell.X ) * 2.7f;
            ysp += ( lastPos.Y - cell.Y ) * 2.7f;
            xsp = ( ( xsp > 0 ? 1 : -1 ) * Math.Min(Math.Abs(xsp), 60) );
            ysp = ( ( ysp > 0 ? 1 : -1 ) * Math.Min(Math.Abs(ysp), 60) );
            lastPos = new Point(cell.X, cell.Y);
        }

        public void Tick()
        {
            if (xsp == 0d && ysp == 0d) return;
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