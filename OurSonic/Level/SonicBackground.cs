using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.Level
{
    public class SonicBackground
    {
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        public void Draw(CanvasContext2D canvas, Point point, Point scale, int wOffset) {}
    }
}