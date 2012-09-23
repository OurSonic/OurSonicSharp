using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace OurSonic.Level
{
    public class LevelObject
    {
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

        public LevelObject(string key)
        {
            Key = key;
            InitScript = "this.state = {\r\n\txsp: 0.0,\r\n\tysp: 0.0,\r\n\tfacing: false,\r\n};";
            Pieces = new List<LevelObjectPiece>();
            PieceLayouts = new List<LevelObjectPieceLayout>();
            Projectiles = new List<LevelObjectProjectile>();
            Assets = new List<LevelObjectAsset>();
        }

        public void Init(LevelObjectInfo @object, SonicLevel level, Sonic sonic)
        {

            @object.Reset();
            this.evalMe("initScript").Me().apply(@object, new object[] { @object, level, sonic });
        }

        public dynamic OnCollide(LevelObjectInfo @object, SonicLevel level, Sonic sonic, SensorM sensor, dynamic piece)
        {
            return this.evalMe("collideScript").Me().apply(@object, new object[] { @object, level, sonic, sensor, piece });
        }

        public dynamic OnHurtSonic(LevelObjectInfo @object, SonicLevel level, Sonic sonic, SensorM sensor, dynamic piece)
        {
            return this.evalMe("hurtScript").Me().apply(@object, new object[] { @object, level, sonic, sensor, piece });
        }

        public bool Tick(LevelObjectInfo @object, SonicLevel level, Sonic sonic)
        {
            if (@object.lastDrawTick != SonicManager.Instance.tickCount - 1)
                Init(@object, level, sonic);

            @object.lastDrawTick = SonicManager.Instance.tickCount;

            evalMe("tickScript").Me().apply(@object, new object[] { @object, level, sonic });

            if (@object.State.Truthy())
            {
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

        private JsDictionary<string, Func<LevelObjectInfo, SonicLevel, Sonic, SensorM, LevelObjectPiece, bool>> cache = new JsDictionary<string, Func<LevelObjectInfo, SonicLevel, Sonic, SensorM, LevelObjectPiece, bool>>();

        private Func<LevelObjectInfo, SonicLevel, Sonic, SensorM, LevelObjectPiece, bool> evalMe(string js)
        {
            if (Help.Falsey(cache[js + "_last"]))
            {
                cache[js + "_last"] = null;
            }
            if (cache[js + "_last"] != cache[js])
            {
                cache[js + "Compiled"] = null;
            }

            cache[js + "_last"] = cache[js];


            if (cache[js + "Compiled"].Falsey()) {
                cache[js + "Compiled"] =
                        Script.Reinterpret<Func<LevelObjectInfo, SonicLevel, Sonic, SensorM, LevelObjectPiece, bool>>(
                                Script.Eval("(function(object,level,sonic,sensor,piece){" + cache[js] + "});"));

            }
            return cache[js + "Compiled"];
        }
    }
}