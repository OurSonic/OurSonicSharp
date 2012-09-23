namespace OurSonic.Level
{
    public class LevelObject
    {
        public LevelObject(string key)
        {
            /*    this.assets = [];
    this.key = key ? key : "";
    this.pieces = [];
    this.pieceLayouts = [];
    this.projectiles = [];
    this.initScript = "this.state = {\r\n\txsp: 0.0,\r\n\tysp: 0.0,\r\n\tfacing: false,\r\n};";
    this.tickScript = "";
    this.collideScript = "";
    this.hurtScript = "";
*/
        }

        public void Init(dynamic @object, dynamic level, Sonic sonic)
        {
            /*
 
                    object.reset();

                    this.evalMe("initScript").apply(object, [object, level, sonic]);*/
        }

        public dynamic OnCollide(dynamic @object, dynamic level, Sonic sonic, SensorM sensor, dynamic piece)
        {
            //return this.evalMe("collideScript").apply(object, [object, level, sonic, sensor, piece]);
            return null;
        }

        public dynamic OnHurtSonic(dynamic @object, dynamic level, Sonic sonic, SensorM sensor, dynamic piece)
        {
            //return this.evalMe("hurtScript").apply(object, [object, level, sonic, sensor, piece]);
            return null;
        }

        public void Tick(dynamic @object, dynamic level, Sonic sonic)
        {
            /*
   if (object.lastDrawTick != sonicManager.tickCount - 1)
            this.init(object, level, sonic);

        object.lastDrawTick = sonicManager.tickCount;

        this.evalMe("tickScript").apply(object, [object, level, sonic]);

        if (object.state) {
            object.xsp = object.state.xsp;
            object.ysp = object.state.ysp;
        }
        object.x += object.xsp;
        object.y += object.ysp;*/
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