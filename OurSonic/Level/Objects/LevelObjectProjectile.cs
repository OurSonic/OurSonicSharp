using System;
namespace OurSonic.Level.Objects
{
    [Serializable]
    public class LevelObjectProjectile
    {
        public int X { get; set; }
        public int Y { get; set; }
        public double Xsp { get; set; }
        public double Ysp { get; set; }
        public bool Xflip { get; set; }
        public bool Yflip { get; set; }
        public int AssetIndex { get; set; }
        public int FrameIndex { get; set; }
        public string Name { get; set; }

        public LevelObjectProjectile(string name)
        {
            Name = name;
        }

        /*
            this.init = function (level, sonic) {
            };
            this.tick = function (level, sonic) {
            };
            this.onCollide = function (level, sonic) {
            };
            this.onHurtSonic = function (level, sonic, sensor) {
            };*/
    }
}