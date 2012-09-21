using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    public class SpriteCache
    {
        [IntrinsicProperty]
        public List<ImageElement> Rings { get; set; }
        [IntrinsicProperty]
        public List<ImageElement> TileChunks { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, CanvasInformation> Tilepieces { get; set; }
        [IntrinsicProperty]
        public List<ImageElement> HeightMaps { get; set; }
        [IntrinsicProperty]
        public List<ImageElement> Tiles { get; set; }
        [IntrinsicProperty]
        public List<ImageElement> SonicSprites { get; set; }
        [IntrinsicProperty]
        public JsDictionary<string, CanvasInformation> HeightMapChunks { get; set; }
        [IntrinsicProperty]
        public SpriteCacheIndexes Indexes { get; set; }
        public JsDictionary<string, CanvasInformation> AnimationSprites { get; set; }

        public SpriteCache()
        {
            Rings = new List<ImageElement>();
            TileChunks = new List<ImageElement>();
            Tilepieces = new JsDictionary<string, CanvasInformation>();
            Tiles = new List<ImageElement>();
            SonicSprites = new List<ImageElement>();
            HeightMaps = new List<ImageElement>();
            HeightMapChunks = new JsDictionary<string, CanvasInformation>();
            Indexes = new SpriteCacheIndexes();
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