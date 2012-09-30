using System;
namespace OurSonic.UIManager
{
    [Serializable]
    public class Pointer
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Delta { get; set; }

        public Pointer(int x, int y, int delta = 0)
        {
            X = x;
            Y = y;
            Delta = delta;
        }
    }
}