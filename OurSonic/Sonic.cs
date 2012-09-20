using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    public class Sonic
    {
        [IntrinsicProperty]
        public bool Ticking { get; set; }
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        public void Tick(SonicLevel sonicLevel, Point scale) {}
        public void Draw(CanvasContext2D canvas, Point scale) {}
        public void DrawUI(CanvasContext2D canvas, Point point, Point scale) {}
        public void Hit(int x, int y) {}
        public void Debug() {}
    }
}