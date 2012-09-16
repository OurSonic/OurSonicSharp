using System.Collections.Generic;

namespace OurSonic
{
    public class SpriteCache
    {
        public List<string> Rings { get; set; }
        public List<string> TileChunks { get; set; }
        public List<string> Tilepieces { get; set; }
        public List<string> Tiles { get; set; }
        public List<string> SonicSprites { get; set; }
        public List<string> HeightMaps { get; set; }
        public List<string> HeightMapChunks { get; set; }

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