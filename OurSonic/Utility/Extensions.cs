using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace OurSonic.Utility
{
    public static class Extensions
    {
        [InlineCode("{o}")]
        public static dynamic Me(this object o)
        {
            return o;
        }

        [InlineCode("{o}")]
        [IgnoreGenericArguments]
        public static T Me<T>(this object o)
        {
            return default( T );
        }

        [InlineCode("{o}")]
        [IgnoreGenericArguments]
        public static T[] Array<T>(this List<T> o)
        {
            return new T[0];
        }

        public static ExtraData<T, T2> WithData<T, T2>(this T item, T2 data)
        {
            return new ExtraData<T, T2>(item, data);
        }

        public static string Percent(this int num)
        {
            return num + "%";
        }

        public static string Percent(this double num)
        {
            return num + "%";
        }
    }
}