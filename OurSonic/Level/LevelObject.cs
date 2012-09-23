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
            /*
 
                    object.reset();

                    this.evalMe("initScript").apply(object, [object, level, sonic]);*/
        }

        public dynamic OnCollide(LevelObjectInfo @object, SonicLevel level, Sonic sonic, SensorM sensor, dynamic piece)
        {
            //return this.evalMe("collideScript").apply(object, [object, level, sonic, sensor, piece]);
            return null;
        }

        public dynamic OnHurtSonic(LevelObjectInfo @object, SonicLevel level, Sonic sonic, SensorM sensor, dynamic piece)
        {
            //return this.evalMe("hurtScript").apply(object, [object, level, sonic, sensor, piece]);
            return null;
        }

        public bool Tick(LevelObjectInfo @object, SonicLevel level, Sonic sonic)
        {
            if (@object.lastDrawTick != SonicManager.Instance.tickCount - 1)
                Init(@object, level, sonic);

            @object.lastDrawTick = SonicManager.Instance.tickCount;

            evalMe("tickScript").apply(@object, new dynamic[] {@object, level, sonic});

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

        private dynamic evalMe(string js)
        {
            /*
        if (!this[js + "_last"]) {
            this[js + "_last"] = "";
        }
        if (this[js + "_last"] != this[js]) {
            this[js + "Compiled"] = undefined;
        }

        this[js + "_last"] = this[js];


        if (!this[js + "Compiled"]) {
            this[js + "Compiled"] = eval("(function(object,level,sonic,sensor,piece){" + this[js] + "});");

        }
        return this[js + "Compiled"];
             */
            return null;
        }
    }
}