using System;
namespace OurSonic.Utility
{
    [Serializable]
    public class DoublePoint
    {
        public double X { get; set; }
        public double Y { get; set; }

        public DoublePoint(double x, double y)
        {
            X = x;
            Y = y;
        }

        public DoublePoint(DoublePoint pos)
        {
            X = pos.X;
            Y = pos.Y;
        }

        public DoublePoint Offset(DoublePoint windowLocation)
        {
            return new DoublePoint(X + windowLocation.X, Y + windowLocation.Y);
        }

        public DoublePoint Negate(DoublePoint windowLocation)
        {
            return new DoublePoint(X - windowLocation.X, Y - windowLocation.Y);
        }

        public DoublePoint Negate(int x, int y)
        {
            return new DoublePoint(X - x, Y - y);
        }

        public string String()
        {
            return string.Format("{{X:{0}, Y:{1}}}", X, Y);
        }
    }
}