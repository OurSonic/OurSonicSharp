using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using OurSonic.Sonic;
using OurSonic.Utility;
namespace OurSonic.Level.Objects
{
    public class LevelObject
    {
        private JsDictionary<string, Func<LevelObjectInfo, SonicLevel, Sonic.Sonic, SensorM, LevelObjectPiece, bool>> cacheCompiled =
                new JsDictionary<string, Func<LevelObjectInfo, SonicLevel, Sonic.Sonic, SensorM, LevelObjectPiece, bool>>();
        private JsDictionary<string, string> cacheLast = new JsDictionary<string, string>();
        public string oldKey;
        [IntrinsicProperty]
        public string Key { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectAsset> Assets { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectPiece> Pieces { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectPieceLayout> PieceLayouts { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectProjectile> Projectiles { get; set; }
        [IntrinsicProperty]
        public string InitScript { get; set; }
        [IntrinsicProperty]
        public string TickScript { get; set; }
        [IntrinsicProperty]
        public string CollideScript { get; set; }
        [IntrinsicProperty]
        public string HurtScript { get; set; }
        [IntrinsicProperty]
        public string Description { get; set; }

        public LevelObject(string key)
        {
            Key = key;
            InitScript = "this.state = {\r\n\txsp: 0.0,\r\n\tysp: 0.0,\r\n\tfacing: false,\r\n};";
            Pieces = new List<LevelObjectPiece>();
            PieceLayouts = new List<LevelObjectPieceLayout>();
            Projectiles = new List<LevelObjectProjectile>();
            Assets = new List<LevelObjectAsset>();
        }

        public void Init(LevelObjectInfo @object, SonicLevel level, Sonic.Sonic sonic)
        {
            @object.Reset();
            evalMe("initScript").Me().apply(@object, new object[] {@object, level, sonic});
        }

        public bool OnCollide(LevelObjectInfo @object, SonicLevel level, Sonic.Sonic sonic, string sensor, dynamic piece)
        {
            return Script.Reinterpret<bool>(evalMe("collideScript").Me().apply(@object, new object[] {@object, level, sonic, sensor, piece}));
        }

        public bool OnHurtSonic(LevelObjectInfo @object, SonicLevel level, Sonic.Sonic sonic, string sensor, dynamic piece)
        {
            return Script.Reinterpret<bool>(evalMe("hurtScript").Me().apply(@object, new object[] {@object, level, sonic, sensor, piece}));
        }

        public bool Tick(LevelObjectInfo @object, SonicLevel level, Sonic.Sonic sonic)
        {
            if (@object.lastDrawTick != SonicManager.Instance.tickCount - 1)
                Init(@object, level, sonic);

            @object.lastDrawTick = SonicManager.Instance.tickCount;

            evalMe("tickScript").Me().apply(@object, new object[] {@object, level, sonic});

            if (@object.State.Truthy()) {
                @object.Xsp = @object.State.Xsp;
                @object.Ysp = @object.State.Ysp;
            }
            @object.X += @object.Xsp;
            @object.Y += @object.Ysp;
            return true;
        }

        public void Die()
        {
            //alert('todo death');
        }

        private Func<LevelObjectInfo, SonicLevel, Sonic.Sonic, SensorM, LevelObjectPiece, bool> evalMe(string js)
        {
            if (cacheLast[js] == null)
                cacheLast[js] = null;
            if (cacheLast[js] != this.Me<JsDictionary<string, string>>()[js])
                cacheCompiled[js] = null;

            cacheLast[js] = this.Me<JsDictionary<string, string>>()[js];

            if (cacheCompiled[js] == null) {
                cacheCompiled[js] =
                        Script.Reinterpret<Func<LevelObjectInfo, SonicLevel, Sonic.Sonic, SensorM, LevelObjectPiece, bool>>(
                                Script.Eval("(function(object,level,sonic,sensor,piece){" + this.Me<JsDictionary<string, string>>()[js] + "});"));
            }
            return cacheCompiled[js];
        }
    }
}