using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Text;

namespace OurSonic
{
    public class SonicManager
    {
        public SonicManager(CanvasContext2D gameCanvas, Action resizeCanvas)
        {
        }

        public UIManager UIManager { get; set; }

        public Sonic SonicToon { get; set; }

        public Point Scale { get; set; }

        public IntersectingRectangle WindowLocation { get; set; }

        public Point RealScale { get; set; }

        public bool InHaltMode { get; set; }

        public int IndexedPalette { get; set; }

        public bool OnClick(ElementEvent elementEvent)
        {
            return false;
        }

        public void Draw(CanvasContext2D gameCanvas)
        { 
        }
    }
}
