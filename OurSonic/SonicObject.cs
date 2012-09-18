using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonicModels;
namespace OurSonic
{
    public class SonicObject
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public bool Dead { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        public SonicObject(SLDataObjectEntry entry) {}
        public void Tick(SonicObject sonicObject, SonicLevel sonicLevel, Sonic sonicToon) {}
        public void Draw(CanvasContext2D canvas, int x, int y, Point scale, bool showHeightMap) {}
    }
}