namespace OurSonic.Utility
{
    public class SizeNumber
    {
        private string Value;

        private SizeNumber(string s)
        {
            Value = s;
        }

        private SizeNumber(double s)
        {
            Value = s.ToString();
        }

        public static implicit operator SizeNumber(string d)
        {
            return new SizeNumber(d);
        }

        public static implicit operator SizeNumber(double d)
        {
            return new SizeNumber(d);
        }

        public static implicit operator string(SizeNumber d)
        {
            return d.Value;
        }

        public static implicit operator double(SizeNumber d)
        {
            return double.Parse(d.Value.Replace("%", ""));
        }
    }
}