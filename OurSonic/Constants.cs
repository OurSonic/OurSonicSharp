using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;

namespace OurSonic
{
    public class Constants
    {
        public static IntersectingRectangle DefaultWindowLocation(int state, CanvasInformation canvas, Point scale)
        {
            switch (state)
            {
                case 0:
                    return new IntersectingRectangle(0, 0, 320, 224, Intersects);
                case 1:
                    var x = 0;
                    var y = 0;
                    if(SonicManager.Instance.SonicLevel!=null && SonicManager.Instance.SonicLevel.StartPositions!=null && SonicManager.Instance.SonicLevel.StartPositions[0]!=null)
                    {
                        x = SonicManager.Instance.SonicLevel.StartPositions[0].X - 128 * 2;
                        y = SonicManager.Instance.SonicLevel.StartPositions[0].Y - 128 * 2;
                    }
                    return new IntersectingRectangle(x, y, canvas.DomCanvas.GetWidth(), canvas.DomCanvas.GetHeight(),Intersects);
            }
            return null;
        }

        public static bool Intersects(IntersectingRectangle rect,Point p)
        { 
            return rect.X < p.X && rect.X + rect.Width > p.X && rect.Y < p.Y && rect.Y + rect.Height > p.Y;
        }
    }
    [Serializable]
    public class IntersectingRectangle : Rectangle
    {
        public IntersectingRectangle(int x, int y, int width, int height, Func<IntersectingRectangle, Point, bool> intersects)
            : base(x, y, width, height)
        {
            Intersects = (a) => intersects(this,a);
        }

        public Func<Point, bool> Intersects { get; set; }
    }
    [Serializable]
    public class Rectangle : Point
    {
        public Rectangle(int x, int y, int width, int height)
            : base(x, y)
        {
            Width = width;
            Height = height;
        }

        public int Width { get; set; }
        public int Height { get; set; }
    }
    [Serializable]
    public class Point
    {
        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int X { get; set; }
        public int Y { get; set; }
    }
}