using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;

namespace OurSonic
{
    public class Constants
    {
        public static IntersectingRectangle DefaultWindowLocation(int state, CanvasContext uiCanvas, Point scale)
        {
/*
            switch (state)
            {
                case 0:
                    //   return { x= 0, y= 0, width= canvas.canvas.width / scale.x, height= canvas.canvas.height / scale.y, intersects= _H.intersects };
                    return new IntersectingRectangle { X = 0,Y = 0,Width = 320, Height = 224, Intersects = _H.intersects };
                case 1:
                    var x = 0;
                    var y = 0;
                    if (sonicManager.SonicLevel && sonicManager.SonicLevel.StartPositions &&
                        sonicManager.SonicLevel.StartPositions[0])
                    {
                        x = sonicManager.SonicLevel.StartPositions[0].X - 128*2;
                        y = sonicManager.SonicLevel.StartPositions[0].Y - 128*2;
                    }

                    return
                        new
                           IntersectingRectangle
                           {
                                X = x,
                                Y = y,
                                Width = canvas.canvas.width,
                                Height = canvas.canvas.height,
                                Intersects = _H.intersects
                            };
            }
*/
            return null;
        }
    }
    [Serializable]
    public class IntersectingRectangle : Rectangle
    {
        public IntersectingRectangle(int x, int y, int width, int height, Func<Point, bool> intersects)
            : base(x, y, width, height)
        {
            Intersects = intersects;
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