using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace OurSonic.Level
{
    public class LevelObjectAsset
    {
        [IntrinsicProperty]
        public List<LevelObjectAssetFrame> Frames { get; set; }
        [IntrinsicProperty]
        public string Name { get; set; }

        public LevelObjectAsset(string name)
        {
            Name = name;
        }
    }
}