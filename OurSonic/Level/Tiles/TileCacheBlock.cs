using System;
using OurSonic.Utility;
namespace OurSonic.Level.Tiles
{
    [Serializable]
    public class TileCacheBlock
    {
        public int AnimatedKey { get; set; }
        public TileCacheBlockType Type { get; set; }
        public TilePieceInfo TilePieceInfo { get; set; }
        public CanvasInformation Block { get; set; }
        public string Color { get; set; }
        public int XPos { get; set; }
        public int YPos { get; set; }

        public TileCacheBlock(TileCacheBlockType type)
        {
            Type = type;
        }
    }
    public enum TileCacheBlockType
    {
        Block,
        TilePiece
    }
}