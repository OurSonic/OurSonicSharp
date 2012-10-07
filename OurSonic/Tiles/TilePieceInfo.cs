using OurSonicModels;
namespace OurSonic.Tiles
{
    public class TilePieceInfo
    {
        private TilePiece block;
        public int Block { get; set; }
        public bool XFlip { get; set; }
        public bool YFlip { get; set; }
        public Solidity Solid1 { get; set; }
        public Solidity Solid2 { get; set; }
        public int Index { get; set; }

        public TilePiece GetTilePiece()
        {
            if (block == null)
                block = SonicManager.Instance.SonicLevel.GetTilePiece(Block);
            return block;
        }

        public void SetTilePiece(int tp)
        {
            Block = tp;
            block = null;
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