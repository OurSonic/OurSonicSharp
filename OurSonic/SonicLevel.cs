using System.Collections;
using System.Collections.Generic;
using OurSonic.Drawing;

namespace OurSonic
{
    public class SonicLevel
    {
        public int[][] ChunkMap { get; set; }
        public JsDictionary<string, Ring> Rings { get; set; }
        public bool CurHeightMap { get; set; }
        public int LevelWidth { get; set; }
        public int LevelHeight { get; set; }
        public List<TileChunk> Chunks { get; set; }
        public List<Tile> Tiles { get; set; }
        public List<TilePiece> Blocks { get; set; }
        public List<SonicObject> Objects { get; set; }
        public dynamic PaletteItems { get; set; }//todo::: no idea
        public dynamic Palette { get; set; }//todo::: no idea
        public dynamic palAn { get; set; }//todo:: no ides

        public SonicLevel()
        {
            Tiles = new List<Tile>();
            Blocks = new List<TilePiece>();
            Chunks = new List<TileChunk>();
            ChunkMap = new int[0][];
            Rings = new JsDictionary<string, Ring>();
            CurHeightMap = true;
            LevelWidth = 0;
            LevelHeight = 0;
        }
    }
}