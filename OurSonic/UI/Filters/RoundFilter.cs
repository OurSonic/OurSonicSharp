namespace OurSonic.Filters
{
    public class RoundFilter
    {
        public const string Name = "round";


        public object Filter(object input)
        {
            return int.Parse(input.ToString());
        }
    }
    public class SwitchFilter
    {
        public const string Name = "switch";


        public object Filter(bool val,object on, object off)
        {
            return val ? on : off;
        }
    }
}