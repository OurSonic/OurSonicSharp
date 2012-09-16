using System.Collections.Generic;
using System.Html;

namespace OurSonic
{
    public class SpriteCache
    {
        public List<ImageElement> Rings { get; set; }
        public List<ImageElement> TileChunks { get; set; }
        public List<ImageElement> Tilepieces { get; set; }
        public List<ImageElement> Tiles { get; set; }
        public List<ImageElement> SonicSprites { get; set; }
        public List<ImageElement> HeightMaps { get; set; }
        public List<ImageElement> HeightMapChunks { get; set; }

        public SpriteCacheIndexes Indexes { get; set; }
    }

    public class SpriteCacheIndexes
    {
        public int Sprites { get; set; }
        public int Tps { get; set; }
        public int Tcs { get; set; }
        public int Ss { get; set; }
        public int Hms { get; set; }
        public int Hmc { get; set; }
        public int Tls { get; set; }
        public int Px { get; set; }
        public int Aes { get; set; }
    }
}