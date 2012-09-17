using System.Collections.Generic;

namespace OurSonicModels
{
    public class SLData
    {
        public List<SLDataStartPositionEntry> StartPositions { get; set; }
        public int[][][] AnimatedFiles { get; set; }
        public List<SLDataAnimation> Animations { get; set; }
        public int[][] Tiles { get; set; }
        public SLDataPatternIndex[][] Blocks { get; set; }
        public SLDataChunkBlock[][] Chunks { get; set; }
        public int[][] Foreground { get; set; }
        public int ForegroundWidth { get; set; }
        public int ForegroundHeight { get; set; }
        public int[][] Background { get; set; }
        public int BackgroundWidth { get; set; }
        public int BackgroundHeight { get; set; }
        public string[][] Palette { get; set; }
        public SLDataObjectEntry[] Objects { get; set; }
        public string ObjectFormat { get; set; }
        public SLDataRingEntry[] Rings { get; set; }
        public string RingFormat { get; set; }
        public SLDataCNZBumperEntry[] CNZBumpers { get; set; }
        public int[] CollisionIndexes1 { get; set; }
        public int[] CollisionIndexes2 { get; set; }
        public int[][] HeightMaps { get; set; }
        public int[][] RotatedHeightMaps { get; set; }
        public int[] Angles { get; set; }
    }
    public class SLDataRingEntry
    {
        public int X { get; set; }
        public int Y { get; set; }
    } 
    public class SLDataCNZBumperEntry
    {
        public int ID { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }

    public enum Solidity
    {
        NotSolid = 0,
        TopSolid = 1,
        LRBSolid = 2,
        AllSolid = 3
    }

    public abstract class SLDataChunkBlock
    {
        public Solidity Solid1 { get; set; }
        public bool XFlip { get; set; }
        public bool YFlip { get; set; }
        public short Block { get; set; }
    }

    public abstract class SLDataObjectEntry
    {

        public int X { get; set; }
        public int Y { get; set; }
        public bool YFlip { get; set; }
        public bool XFlip { get; set; }
        public byte ID { get; set; }
        public byte SubType { get; set; }
    }

    public class SLDataStartPositionEntry
    {
        public int X { get; set; }
        public int Y { get; set; }
        public string Type { get; set; }
    }

    public class SLDataAnimation
    {
        public int AnimationFile { get; set; }
        public int AnimationTileIndex { get; set; }
        public int NumberOfTiles { get; set; }
        public List<SLDataAnimationFrame> Frames { get; set; }
    }
    public class SLDataAnimationFrame
    {
        public int StartingTileIndex { get; set; }
        public int Ticks { get; set; }
    }

    public class SLDataPatternIndex
    {
        public bool Priority { get; set; }
        public byte Palette { get; set; }
        public bool XFlip { get; set; }
        public bool YFlip { get; set; }
        public int Tile { get; set; }
    }

}