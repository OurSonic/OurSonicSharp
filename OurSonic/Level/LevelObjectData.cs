using System;
using System.Collections.Generic;
namespace OurSonic.Level
{
    [Serializable]
    public class LevelObjectData
    {
        public string Key { get; set; }
        public List<LevelObjectAsset> Assets { get; set; }
        public List<LevelObjectPiece> Pieces { get; set; }
        public List<LevelObjectPieceLayout> PieceLayouts { get; set; }
        public List<LevelObjectProjectile> Projectiles { get; set; }
        public string InitScript { get; set; }
        public string TickScript { get; set; }
        public string CollideScript { get; set; }
        public string HurtScript { get; set; }
    }
}