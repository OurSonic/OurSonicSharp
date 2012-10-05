using System;
using System.Collections.Generic;
using System.Text;

namespace OurSonic.Tiles
{
    [Serializable]
  public  class TileCacheBlock
    {
      public TileCacheBlock(TileCacheBlockType type)
      {
          Type = type;
      }

      public TileCacheBlockType Type { get; set; }
      public TilePiece TilePiece { get; set; }
      public CanvasInformation Block { get; set; }
      public string Color { get; set; }
      public int X { get; set; }
      public int Y { get; set; }
      public TilePiece PieceM { get; set; }
    }
    public enum TileCacheBlockType
    {
        Block,TilePiece
    }
}



