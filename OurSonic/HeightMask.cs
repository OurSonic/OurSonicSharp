using System.Collections.Generic;

namespace OurSonic
{
    public class HeightMask
    {
        public HeightMask(List<int> heightMap)
        {
        }
        public static implicit operator HeightMask(int d)
        {
            var m = d == 0 ? 0 : 16;
            return new HeightMask(new List<int>() { m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m });//16 m's
        }
/*
        public static implicit operator int(HeightMask d)
        {
            
        }
*/
    }
}