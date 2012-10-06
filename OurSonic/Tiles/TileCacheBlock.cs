﻿using System;
namespace OurSonic.Tiles
{
    [Serializable]
    public class TileCacheBlock
    {
        public int AnimatedKey { get; set; }
        public TileCacheBlockType Type { get; set; }
        public TilePiece TilePiece { get; set; }
        public CanvasInformation Block { get; set; }
        public string Color { get; set; }
        public int XPos { get; set; }
        public int YPos { get; set; }
        public TilePiece PieceM { get; set; }

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