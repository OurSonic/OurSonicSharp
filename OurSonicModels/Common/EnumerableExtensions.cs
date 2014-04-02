using System;
using System.Collections.Generic;
using System.Linq;

namespace OurSonicModels.Common
{
    public static class EnumerableExtensions
    {
        public static int IndexOfFast(this List<int> items, int ind)
        {
            for (int index = 0; index < items.Count; index++)
            {
                var item = items[index];
                if (item == ind) return index;
            }
            return -1;
        }
        public static int IndexOfFast(this int[] items, int ind)
        {
            for (int index = 0; index < items.Length; index++)
            {
                var item = items[index];
                if (item == ind) return index;
            }
            return -1;
        }

        public static T[] Where<T>(this T[] items, Func<T, bool> clause)
        {
            List<T> items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2.ToArray();
        }

        public static T First<T>(this T[] items, Func<T, bool> clause)
        {

            foreach (var item in items)
            {
                if (clause(item))
                {
                    return item;
                }
            }
            return default(T);
        }
        public static bool All<T>(this T[] items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (!clause(item))
                {
                    return false;
                }
            }
            return true;
        }
        public static T First<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {

            foreach (var item in items)
            {
                if (clause(item))
                {
                    return item;
                }
            }
            return default(T);
        }
        public static bool All<T>(this List<T> items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (!clause(item))
                {
                    return false;
                }
            }
            return true;
        }
        public static bool Any<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (clause(item))
                {
                    return true;
                }
            }
            return false;
        }
        public static bool Any<T>(this T[] items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (clause(item))
                {
                    return true;
                }
            }
            return false;
        }
        public static T[] OrderBy<T>(this T[] items, Func<T, int> clause)
        {
            var j = items.Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }
        public static T[] OrderBy<T>(this List<T> items, Func<T, int> clause)
        {
            var j = items.ToArray().Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }
        public static T[] OrderBy<T>(this T[] items, Func<T, string> clause)
        {
            var j = items.Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }
        public static T[] OrderBy<T>(this List<T> items, Func<T, string> clause)
        {
            var j = items.ToArray().Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }
        public static T[] OrderBy<T>(this T[] items, Func<T, double> clause)
        {
            var j = items.Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }
        public static T[] OrderBy<T>(this List<T> items, Func<T, double> clause)
        {
            var j = items.ToArray().Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }


        public static T2[] Select<T, T2>(this T[] items, Func<T, T2> clause)
        {
            List<T2> items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.Add(clause(item));
            }
            return items2.ToArray();
        }



        public static T[] Where<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {
            List<T> items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2.ToArray();
        }

        public static T2[] Select<T, T2>(this List<T> items, Func<T, T2> clause)
        {
            List<T2> items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.Add(clause(item));
            }
            return items2.ToArray();
        }
    }
}