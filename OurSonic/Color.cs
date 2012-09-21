using System;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    [Serializable]
    public class Color
    {
        public int R { get; set; }
        public int G { get; set; }
        public int B { get; set; }

        [ObjectLiteral]
        public Color(int r, int g, int b)
        {
            R = r;
            G = g;
            B = b;
        }
    }
}