using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Linq;
using System.Text;

namespace OurSonic
{
    public class Sonic
    {
        public bool Ticking { get; set; }

        public int X { get; set; }
        public int Y { get; set; }

        public void Tick(SonicLevel sonicLevel, Point scale)
        {
        }

        public void Draw(CanvasContext2D canvas, Point scale)
        {
        }

        public void DrawUI(CanvasContext2D canvas, Point point, Point scale)
        {
        }
    }
}
