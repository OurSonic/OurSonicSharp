using System.Runtime.CompilerServices;
using OurSonicModels;
namespace OurSonic.Level.Tiles
{
    public class TilePieceInfo
    {
        private TilePiece block;
        [IntrinsicProperty]
        public int Block { get; set; }
        [IntrinsicProperty]
        public bool XFlip { get; set; }
        [IntrinsicProperty]
        public bool YFlip { get; set; }
        [IntrinsicProperty]
        public Solidity Solid1 { get; set; }
        [IntrinsicProperty]
        public Solidity Solid2 { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }

        public TilePiece GetTilePiece()
        {
            if (block == null)
                block = SonicManager.Instance.SonicLevel.GetTilePiece(Block);
            return block;
        }

        public bool SetTilePiece(TilePiece tp)
        {
            if (Block == tp.Index) return false;

            Block = tp.Index;
            block = null;
            return true;
        }

        public int GetLayer1Angles()
        {
            return SonicManager.Instance.SonicLevel.Angles[SonicManager.Instance.SonicLevel.CollisionIndexes1[Block]];
        }

        public int GetLayer2Angles()
        {
            return SonicManager.Instance.SonicLevel.Angles[SonicManager.Instance.SonicLevel.CollisionIndexes2[Block]];
        }

        public HeightMap GetLayer1HeightMaps()
        {
            return SonicManager.Instance.SonicLevel.HeightMaps[SonicManager.Instance.SonicLevel.CollisionIndexes1[Block]];
        }

        public HeightMap GetLayer2HeightMaps()
        {
            return SonicManager.Instance.SonicLevel.HeightMaps[SonicManager.Instance.SonicLevel.CollisionIndexes2[Block]];
        }
    }
}