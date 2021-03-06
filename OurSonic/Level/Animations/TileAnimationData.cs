using System.Runtime.CompilerServices;
using OurSonic.Level.Tiles;
namespace OurSonic.Level.Animations
{
    public class TileAnimationData
    {
        /*   function Animation(name, images) {
    this.images = images;
    this.name = name;
    this.draw = function (canvas, x, y, scale, animationIndex) {
        canvas.save(); 
        var jv = (function (ind, imgs) {
            var dj = 0;
            for (var vm in imgs) {
                if (dj == ind)
                    return vm;
                dj++;

            }
            return null;
        })(animationIndex, this.images);
        
        canvas.drawImage(sonicManager.SpriteCache.animationSprites[animationIndex + " " + name + scale.x + scale.y],
            (x - this.images[jv].width / 2) * scale.x, (y - this.images[jv].height / 2) * scale.y);
        canvas.restore();
    };
}*/
        [IntrinsicProperty]
        public int AnimationTileFile { get; set; }
        [IntrinsicProperty]
        public int NumberOfTiles { get; set; }
        [IntrinsicProperty]
        public int LastAnimatedIndex { get; set; }
        [IntrinsicProperty]
        public int? LastAnimatedFrame { get; set; }
        [IntrinsicProperty]
        public int AnimationTileIndex { get; set; }
        [IntrinsicProperty]
        public TileAnimationDataFrame[] DataFrames { get; set; }
        [IntrinsicProperty]
        public int AutomatedTiming { get; set; }
        public TileAnimationData() {}

        public Tile[] GetAnimationFile()
        {
            return SonicManager.Instance.SonicLevel.AnimatedTileFiles[AnimationTileFile];
        }
    }
    public class TileAnimationDataFrame
    {
        [IntrinsicProperty]
        public int Ticks { get; set; }
        [IntrinsicProperty]
        public int StartingTileIndex { get; set; }
    }
}