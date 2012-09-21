using System;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    [Serializable]
    public class SonicImage
    {
        [IntrinsicProperty]
        public byte[] Bytes { get; set; }
        [IntrinsicProperty]
        public int[][] Palette { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }

        [ObjectLiteral]
        public SonicImage(byte[] bytes, int[][] palette, int width, int height)
        {
            Bytes = bytes;
            Palette = palette;
            Width = width;
            Height = height;
        }
    }
}