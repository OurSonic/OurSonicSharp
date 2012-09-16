using System.Html.Media.Graphics;

namespace OurSonic
{
    public class Ring
    {
        public Ring(bool active)
        {
        }

        public int TickCount { get; set; }

        public int X { get; set; }
        public int Y { get; set; }

        public void Draw(CanvasContext2D canvas, Point point, Point scale)
        {
        }
    }
}