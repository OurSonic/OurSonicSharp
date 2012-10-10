using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace OurSonicModels
{
    [Serializable]
    public class SaveObjectModel
    {
        public string Key { get; set; }
        public string OldKey { get; set; }
        public string Data { get; set; }
    }
    [Serializable]
    public class SLData
    {
        [PreserveCase]
        public AnimatedPaletteItem[][] PaletteItems { get; set; }
        [PreserveCase]
        public List<SLDataStartPositionEntry> StartPositions { get; set; }
        [PreserveCase]
        public int[][][] AnimatedFiles { get; set; }
        [PreserveCase]
        public List<SLDataAnimation> Animations { get; set; }
        [PreserveCase]
        public int[][] Tiles { get; set; }
        [PreserveCase]
        public SLDataPatternIndex[][] Blocks { get; set; }
        [PreserveCase]
        public SLDataChunkBlock[][] Chunks { get; set; }
        [PreserveCase]
        public int[][] Foreground { get; set; }
        [PreserveCase]
        public int ForegroundWidth { get; set; }
        [PreserveCase]
        public int ForegroundHeight { get; set; }
        [PreserveCase]
        public int[][] Background { get; set; }
        [PreserveCase]
        public int BackgroundWidth { get; set; }
        [PreserveCase]
        public int BackgroundHeight { get; set; }
        [PreserveCase]
        public string[][] Palette { get; set; }
        [PreserveCase]
        public SLDataObjectEntry[] Objects { get; set; }
        [PreserveCase]
        public string ObjectFormat { get; set; }
        [PreserveCase]
        public SLDataRingEntry[] Rings { get; set; }
        [PreserveCase]
        public string RingFormat { get; set; }
        [PreserveCase]
        public SLDataCNZBumperEntry[] CNZBumpers { get; set; }
        [PreserveCase]
        public int[] CollisionIndexes1 { get; set; }
        [PreserveCase]
        public int[] CollisionIndexes2 { get; set; }
        [PreserveCase]
        public int[][] HeightMaps { get; set; }
        [PreserveCase]
        public int[][] RotatedHeightMaps { get; set; }
        [PreserveCase]
        public int[] Angles { get; set; }

        [ObjectLiteral]
        public SLData() {}
    }
    [Serializable]
    public class AnimatedPaletteItem
    {
        [PreserveCase]
        public int SkipIndex { get; set; }
        [PreserveCase]
        public int TotalLength { get; set; }
        [PreserveCase]
        public string Palette { get; set; }
        [PreserveCase]
        public List<AnimatedPalettePiece> Pieces { get; set; }

        [ObjectLiteral]
        public AnimatedPaletteItem() {}
    }
    [Serializable]
    public class AnimatedPalettePiece
    {
        [PreserveCase]
        public int PaletteMultiply { get; set; }
        [PreserveCase]
        public int PaletteOffset { get; set; }
        [PreserveCase]
        public int PaletteIndex { get; set; }

        [ObjectLiteral]
        public AnimatedPalettePiece() {}
    }
    [Serializable]
    public class SLDataRingEntry
    {
        [PreserveCase]
        public int X { get; set; }
        [PreserveCase]
        public int Y { get; set; }

        [ObjectLiteral]
        public SLDataRingEntry() {}
    }
    [Serializable]
    public class SLDataCNZBumperEntry
    {
        [PreserveCase]
        public int ID { get; set; }
        [PreserveCase]
        public int X { get; set; }
        [PreserveCase]
        public int Y { get; set; }

        [ObjectLiteral]
        public SLDataCNZBumperEntry() {}
    }
    public enum Solidity : int
    {
        [PreserveCase] NotSolid = 0,
        [PreserveCase] TopSolid = 1,
        [PreserveCase] LRBSolid = 2,
        [PreserveCase] AllSolid = 3
    }
    [Serializable]
    public class SLDataChunkBlock
    {
        [PreserveCase]
        public Solidity Solid1 { get; set; }
        [PreserveCase]
        public Solidity Solid2 { get; set; }
        [PreserveCase]
        public bool XFlip { get; set; }
        [PreserveCase]
        public bool YFlip { get; set; }
        [PreserveCase]
        public short Block { get; set; }

        [ObjectLiteral]
        public SLDataChunkBlock() {}
    }
    [Serializable]
    public class SLDataObjectEntry
    {
        [PreserveCase]
        public int X { get; set; }
        [PreserveCase]
        public int Y { get; set; }
        [PreserveCase]
        public bool YFlip { get; set; }
        [PreserveCase]
        public bool XFlip { get; set; }
        [PreserveCase]
        public byte ID { get; set; }
        [PreserveCase]
        public byte SubType { get; set; }

        [ObjectLiteral]
        public SLDataObjectEntry() {}
    }
    [Serializable]
    public class SLDataStartPositionEntry
    {
        [PreserveCase]
        public int X { get; set; }
        [PreserveCase]
        public int Y { get; set; }
        [PreserveCase]
        public string Type { get; set; }

        [ObjectLiteral]
        public SLDataStartPositionEntry() {}
    }
    [Serializable]
    public class SLDataAnimation
    {
        [PreserveCase]
        public int AutomatedTiming { get; set; }
        [PreserveCase]
        public int AnimationFile { get; set; }
        [PreserveCase]
        public int AnimationTileIndex { get; set; }
        [PreserveCase]
        public int NumberOfTiles { get; set; }
        [PreserveCase]
        public List<SLDataAnimationFrame> Frames { get; set; }

        [ObjectLiteral]
        public SLDataAnimation() {}
    }
    [Serializable]
    public class SLDataAnimationFrame
    {
        [PreserveCase]
        public int StartingTileIndex { get; set; }
        [PreserveCase]
        public int Ticks { get; set; }

        [ObjectLiteral]
        public SLDataAnimationFrame() {}
    }
    [Serializable]
    public class SLDataPatternIndex
    {
        [PreserveCase]
        public bool Priority { get; set; }
        [PreserveCase]
        public byte Palette { get; set; }
        [PreserveCase]
        public bool XFlip { get; set; }
        [PreserveCase]
        public bool YFlip { get; set; }
        [PreserveCase]
        public int Tile { get; set; }

        [ObjectLiteral]
        public SLDataPatternIndex() {}
    }
}