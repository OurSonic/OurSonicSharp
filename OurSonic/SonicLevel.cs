using System.Collections.Generic;
using System.Runtime.CompilerServices;
using OurSonic.Drawing;
namespace OurSonic
{
    public class SonicLevel
    {
        [PreserveCase]
        public List<Animation> Animations { get; set; }
        [IntrinsicProperty]
        public Tile[][] AnimatedFiles { get; set; }
        [IntrinsicProperty]
        public int[][] ChunkMap { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, Ring> Rings { get; set; }
        [IntrinsicProperty]
        public bool CurHeightMap { get; set; }
        [IntrinsicProperty]
        public int LevelWidth { get; set; }
        [IntrinsicProperty]
        public int LevelHeight { get; set; }
        [IntrinsicProperty]
        public List<TileChunk> Chunks { get; set; }
        [IntrinsicProperty]
        public List<Tile> Tiles { get; set; }
        [IntrinsicProperty]
        public List<TilePiece> Blocks { get; set; }
        [IntrinsicProperty]
        public List<SonicObject> Objects { get; set; }
        [IntrinsicProperty]
        public List<List<PaletteItem>> PaletteItems { get; set; }
        [IntrinsicProperty]
        public string[][] Palette { get; set; }
        [IntrinsicProperty]
        public List<int> palAn { get; set; }
        [IntrinsicProperty]
        public Point[] StartPositions { get; set; }
        [IntrinsicProperty]
        public int CurPaletteIndex { get; set; }
        [IntrinsicProperty]
        public int[] Angles { get; set; }
        [IntrinsicProperty]
        public int[] CollisionIndexes1 { get; set; }
        [IntrinsicProperty]
        public int[] CollisionIndexes2 { get; set; }
        [IntrinsicProperty]
        public List<HeightMask> HeightMaps { get; set; }
        [IntrinsicProperty]
        public List<TileChunk> AnimatedChunks { get; set; }
        [IntrinsicProperty]
        public int[][] BGChunkMap { get; set; }

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
    public class PaletteItem
    {
        [IntrinsicProperty]
        public string[] Palette { get; set; }
        [IntrinsicProperty]
        public int SkipIndex { get; set; }
        [IntrinsicProperty]
        public int TotalLength { get; set; }
        [IntrinsicProperty]
        public List<PaletteItemPieces> Pieces { get; set; }
    }
    public class PaletteItemPieces
    {
        [IntrinsicProperty]
        public int PaletteIndex { get; set; }
        [IntrinsicProperty]
        public int PaletteMultiply { get; set; }
        [IntrinsicProperty]
        public int PaletteOffset { get; set; }
    }
}