using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using OurSonic.Level.Animations;
using OurSonic.Level.Objects;
using OurSonic.Level.Tiles;
using OurSonic.Utility;
namespace OurSonic.Level
{
    public class SonicLevel
    {
        [IntrinsicProperty]
        public List<TileAnimation> TileAnimations { get; set; }
        [IntrinsicProperty]
        public Tile[][] AnimatedTileFiles { get; set; }
        [IntrinsicProperty]
        public int[][] ChunkMap { get; set; }
        [IntrinsicProperty]
        public List<Ring> Rings { get; set; }
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
        public List<TilePiece> TilePieces { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectInfo> Objects { get; set; }
        [IntrinsicProperty]
        public List<PaletteItem> AnimatedPalettes { get; set; }
        [IntrinsicProperty]
        public CanvasElement[][] Palette { get; set; }
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
        public List<HeightMap> HeightMaps { get; set; }
        [IntrinsicProperty]
        public List<TileChunk> AnimatedChunks { get; set; }
        [IntrinsicProperty]
        public int[][] BGChunkMap { get; set; }

        public SonicLevel()
        {
            Tiles = new List<Tile>();
            TilePieces = new List<TilePiece>();
            Chunks = new List<TileChunk>();
            ChunkMap = new int[0][];
            Rings = new List<Ring>();
            Objects = new List<LevelObjectInfo>();
            HeightMaps = new List<HeightMap>();
            Tiles = new List<Tile>();
            CurHeightMap = true;
            CurPaletteIndex = 0;

            LevelWidth = 0;
            LevelHeight = 0;
        }

        public TileChunk GetChunkAt(int x, int y)
        {
            return Chunks[ChunkMap[x][y]];
        }

        public void ClearCache()
        {
            foreach (var tile in Tiles.Array()) {
                tile.ClearCache();
            } 
            foreach (var chunk in Chunks.Array()) {
                chunk.ClearCache();
            }
        }

        public Tile GetTile(int tile)
        {
            return Tiles[tile];
        }

        public TilePiece GetTilePiece(int block)
        {
            return TilePieces[block];
        }

        public void SetChunkAt(int x, int y, TileChunk tileChunk)
        {
            ChunkMap[x][y] = tileChunk.Index;
        }
    }
    public class PaletteItem
    {
        [IntrinsicProperty]
        public CanvasElement[] Palette { get; set; }
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