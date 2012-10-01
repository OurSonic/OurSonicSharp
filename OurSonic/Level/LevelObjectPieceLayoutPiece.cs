using System;
namespace OurSonic.Level
{
    [Serializable]
    public class LevelObjectPieceLayoutPiece
    {
        public int PieceIndex { get; set; }
        public int AssetIndex { get; set; }
        public int FrameIndex { get; set; }
        public bool Priority { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public bool Visible { get; set; }

        public LevelObjectPieceLayoutPiece(int pieceIndex)
        {
            PieceIndex = pieceIndex;
        }
    }
}