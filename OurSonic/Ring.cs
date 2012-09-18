using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    public class Ring
    {
        [IntrinsicProperty]
        public int TickCount { get; set; }
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        public Ring(bool active) {}
        public void Draw(CanvasContext2D canvas, Point point, Point scale) {}
    }
}