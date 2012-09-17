using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OurSonic.Drawing
{
    public class TileItem
    {

        public int _Tile { get; set; }
        public bool Priority { get; set; }

        public bool XFlip { get; set; }
        public bool YFlip { get; set; }

        public int Palette { get; set; }

        public int Index { get; set; }
    }
}
