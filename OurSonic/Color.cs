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
        public int A { get; set; }

        [ObjectLiteral]
        public Color(int r, int g, int b, int a)
        {
            R = r;
            G = g;
            B = b;
            A = a;
        }

        [ObjectLiteral]
        public Color(int r, int g, int b)
        {
            R = r;
            G = g;
            B = b;
        }
    }
}