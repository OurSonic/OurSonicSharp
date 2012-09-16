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
        public List<List<PaletteItem>> PaletteItems { get; set; }
        public dynamic[] Palette { get; set; }//todo::: no idea
        public List<int> palAn { get; set; }

        public Point[] StartPositions { get; set; }

        public int CurPaletteIndex { get; set; }

        public int[] Angles { get; set; }

        public int[] CollisionIndexes1 { get; set; }
        public int[] CollisionIndexes2{ get; set; }

        public List<HeightMask> HeightMaps { get; set; }

        public List<TileChunk> AnimatedChunks { get; set; }


//todo:: no ides

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

    public class SonicLevelData
    {
        public List<List<int>> BGChunkMap { get; set; }
        public List<string> Chunks { get; set; }
        public List<string> Tiles { get; set; }
        public List<List<Tile>> Blocks { get; set; }

        public int ForegroundWidth { get; set; }
        public int ForegroundHeight { get; set; }

        public string Foreground { get; set; }

        public List<List<int>> ChunkMap { get; set; }

        public int BackgroundWidth{ get; set; }
        public int BackgroundHeight { get; set; }

        public string[] Objects { get; set; }

        public string Angles { get; set; }

        public string CollisionIndexes1 { get; set; }
        public string CollisionIndexes2 { get; set; }

        public List<List<int>> HeightMaps { get; set; }

        public List<List<PaletteItem>> PaletteItems { get; set; }

        public SonicLevel Translate()
        {
            return null;
        }
    }

    public class PaletteItem
    {
        public List<string> Palette { get; set; }
        public int SkipIndex { get; set; }
        public int TotalLength { get; set; }
        public List<PaletteItemPieces> Pieces { get; set; }
    }

    public class PaletteItemPieces
    {
        public int PaletteIndex { get; set; }
        public int PaletteMultiply{ get; set; }
        public int PaletteOffset { get; set; }
    }
}