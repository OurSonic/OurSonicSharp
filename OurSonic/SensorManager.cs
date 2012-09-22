using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic
{
    public class SensorManager
    {
        [IntrinsicProperty]
        protected JsDictionary<string, Sensor> Sensors { get; set; }
        [IntrinsicProperty]
        protected JsDictionary<string, bool> SensorResults { get; set; }

        public SensorManager(SonicManager instance)
        {
            Sensors = new JsDictionary<string, Sensor>();
            SensorResults = new JsDictionary<string, bool>();
        }

        public Sensor AddSensor(string letter, Sensor sensor)
        {
            Sensors[letter] = ( sensor );
            SensorResults[letter] = false;
            return sensor;
        }

        public Sensor CreateVerticalSensor(string letter, int x, int y1, int y2, string color, bool ignoreSolid = false)
        {
            return AddSensor(letter, new Sensor(x, x, y1, y2, this, color, ignoreSolid, letter));
        }

        public Sensor CreateHorizontalSensor(string letter, int x1, int x2, int y, string color, bool ignoreSolid = false)
        {
            return AddSensor(letter, new Sensor(x1, x2, y, y, this, color, ignoreSolid, letter));
        }

        public void Check(Sonic sonic) {}

        public Sensor GetResult(string mn)
        {
            return null;
        }

        public void Draw(CanvasContext2D canvas, Point scale, Sonic sonic) {}
    }
    public class Sensor
    {
        [IntrinsicProperty]
        public int Value { get; set; }
        [IntrinsicProperty]
        public int Angle { get; set; }
        [IntrinsicProperty]
        public string Letter { get; set; }
        [IntrinsicProperty]
        public bool Chosen { get; set; }
        public Sensor(int x1, int x2, int y1, int y2, SensorManager manager, string color, bool ignoreSolid, string letter) {}
    }
}