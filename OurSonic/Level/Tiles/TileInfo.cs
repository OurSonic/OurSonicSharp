using System.Runtime.CompilerServices;
namespace OurSonic.Level.Tiles
{
    public class TileInfo
    {
        [IntrinsicProperty]
        public int _Tile { get; set; }
        [IntrinsicProperty]
        public bool Priority { get; set; }
        [IntrinsicProperty]
        public bool XFlip { get; set; }
        [IntrinsicProperty]
        public bool YFlip { get; set; }
        [IntrinsicProperty]
        public int Palette { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }

        public Tile GetTile()
        {
            return SonicManager.Instance.SonicLevel.GetTile(_Tile);
        }
    }
}