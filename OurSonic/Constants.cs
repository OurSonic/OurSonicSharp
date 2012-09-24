using System;
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
        public int X { get; set; }
        public int Y { get; set; }

        public int Width { get; set; }
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
    }
}