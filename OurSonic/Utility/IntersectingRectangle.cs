using System.Runtime.CompilerServices;
namespace OurSonic.Utility
{
    public class IntersectingRectangle
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }

        public IntersectingRectangle(int x, int y, int width, int height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }

        public bool Intersects(Point p)
        {
            return X < p.X && X + Width > p.X && Y < p.Y && Y + Height > p.Y;
        }

        public static bool IntersectsRect(Rectangle r, Point p)
        {
            return r.X < p.X && r.X + r.Width > p.X && r.Y < p.Y && r.Y + r.Height > p.Y;
        }

        public static bool IntersectRect(Rectangle r1, Rectangle r2)
        {
            return !( r2.X > r1.X + r1.Width ||
                      r2.X + 0 < r1.X ||
                      r2.Y > r1.Y + r1.Height ||
                      r2.Y + 0 < r1.Y );
        }
    }
}