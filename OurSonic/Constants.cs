using System;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    public class Constants
    {
        public static IntersectingRectangle DefaultWindowLocation(GameState state, CanvasInformation canvas, Point scale)
        {
            switch (state) {
                case GameState.Playing:
                    return new IntersectingRectangle(0, 0, 320, 224);
                case GameState.Editing:
                    var x = 0;
                    var y = 0;
                    if (SonicManager.Instance.SonicLevel.Truthy() && SonicManager.Instance.SonicLevel.StartPositions.Truthy() &&
                        SonicManager.Instance.SonicLevel.StartPositions[0].Truthy()) {
                        x = SonicManager.Instance.SonicLevel.StartPositions[0].X - 128 * scale.X;
                        y = SonicManager.Instance.SonicLevel.StartPositions[0].Y - 128 * scale.Y;
                    }
                    return new IntersectingRectangle(x, y, canvas.DomCanvas.GetWidth(), canvas.DomCanvas.GetHeight());
            }
            return null;
        }
    }
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
    [Serializable]
    public class Rectangle : Point
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public Rectangle() : base(0, 0) {}

        public Rectangle(int x, int y, int width, int height) : base(x, y)
        {
            Width = width;
            Height = height;
        }
    }
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
    }

    [Serializable]
    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }

        public Point(Point pos)
        {
            X = pos.X;
            Y = pos.Y;
        }

        public Point Offset(Point windowLocation)
        {
            return new Point(X + windowLocation.X, Y + windowLocation.Y);
        }

        public Point Negate(Point windowLocation)
        {
            return new Point(X - windowLocation.X, Y - windowLocation.Y);
        }

        public Point Negate(int x, int y)
        {
            return new Point(X - x, Y - y);
        }

        public void Set(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}