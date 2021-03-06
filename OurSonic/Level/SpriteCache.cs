using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.Level
{
    public class SpriteCache
    {
        [IntrinsicProperty]
        public List<CanvasInformation> Rings { get; set; }
        [IntrinsicProperty]
        public List<CanvasInformation> TileChunks { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, CanvasInformation> Tilepieces { get; set; }
        [IntrinsicProperty]
        public List<CanvasInformation> HeightMaps { get; set; }
        [IntrinsicProperty]
        public List<ImageElement> Tiles { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, ImageElement> SonicSprites { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, CanvasInformation> HeightMapChunks { get; set; }
        [IntrinsicProperty]
        public SpriteCacheIndexes Indexes { get; set; }
        public JsDictionary<string, CanvasInformation> AnimationSprites { get; set; }

        public SpriteCache()
        {
            Rings = new List<CanvasInformation>();
            TileChunks = new List<CanvasInformation>();
            Tilepieces = new JsDictionary<string, CanvasInformation>();
            Tiles = new List<ImageElement>();
            SonicSprites = new JsDictionary<string, ImageElement>();
            HeightMaps = new List<CanvasInformation>();
            HeightMapChunks = new JsDictionary<string, CanvasInformation>();
            Indexes = new SpriteCacheIndexes();
        }

        public void ClearCache()
        {
            HeightMaps = new List<CanvasInformation>();
            HeightMapChunks = new JsDictionary<string, CanvasInformation>();
        }
    }
    public class SpriteCacheIndexes
    {
        [IntrinsicProperty]
        public int Sprites { get; set; }
        [IntrinsicProperty]
        public int Tps { get; set; }
        [IntrinsicProperty]
        public int Tcs { get; set; }
        [IntrinsicProperty]
        public int Ss { get; set; }
        [IntrinsicProperty]
        public int Hms { get; set; }
        [IntrinsicProperty]
        public int Hmc { get; set; }
        [IntrinsicProperty]
        public int Tls { get; set; }
        [IntrinsicProperty]
        public int Px { get; set; }
        [IntrinsicProperty]
        public int Aes { get; set; }
    }
}