using System;
namespace OurSonic.Level.Objects
{
    [Serializable]
    public class LevelObjectPiece
    {
        public int AssetIndex { get; set; }
        public int FrameIndex { get; set; }
        public int PieceIndex { get; set; }/*
        public int X { get; set; }
        public int Y { get; set; }*/
        public bool Collided { get; set; }
        public bool Xflip { get; set; }
        public bool Yflip { get; set; }
        public bool Visible { get; set; }
        public string Name { get; set; }

        public LevelObjectPiece(string name)
        {
            Name = name;
        }
    }
}