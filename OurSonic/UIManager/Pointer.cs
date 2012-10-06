using System;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    [Serializable]
    public class Pointer : Point
    {
        public int Delta { get; set; }
        public bool Right { get; set; }

        public Pointer(int x, int y, int delta = 0, bool right = false) : base(x, y)
        {
            Delta = delta;
            Right = right;
        }
    }
}