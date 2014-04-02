using System;

namespace OurSonic.Utility
{
    [Serializable]
    public class FloatPoint
    {
        public float X { get; set; }
        public float Y { get; set; }

        public FloatPoint(float x, float y)
        {
            X = x;
            Y = y;
        }

        public FloatPoint(FloatPoint pos)
        {
            X = pos.X;
            Y = pos.Y;
        }

        public FloatPoint Offset(FloatPoint windowLocation)
        {
            return new FloatPoint(X + windowLocation.X, Y + windowLocation.Y);
        }

        public FloatPoint Negate(FloatPoint windowLocation)
        {
            return new FloatPoint(X - windowLocation.X, Y - windowLocation.Y);
        }

        public FloatPoint Negate(int x, int y)
        {
            return new FloatPoint(X - x, Y - y);
        }

        public static implicit operator FloatPoint(Point p)
        {
            return new FloatPoint(p.X, p.Y);
        }

        public string String()
        {
            return string.Format("{{X:{0}, Y:{1}}}", X, Y);
        }
    }
}