using System.Html.Media.Graphics;

namespace OurSonic
{
    public class SonicObject
    {
        public SonicObject(string s)
        {
        }

        public int X { get; set; }
        public int Y { get; set; }

        public bool Dead { get; set; }

        public int Index
        {
            get { return 0; }
            set { }
        }

        public void Tick(SonicObject sonicObject, SonicLevel sonicLevel, Sonic sonicToon)
        {
        }

        public void Draw(CanvasContext2D canvas, int x, int y, Point scale, bool showHeightMap)
        {
        }
    }
}