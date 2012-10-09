using System.Runtime.CompilerServices;
namespace OurSonic.Utility
{
    public class ExtraData<T, T2>
    {
        [IntrinsicProperty]
        public T Item { get; set; }
        [IntrinsicProperty]
        public T2 Data { get; set; }

        public ExtraData(T item, T2 data)
        {
            Data = data;
            Item = item;
        }

        public static implicit operator T(ExtraData<T, T2> d)
        {
            return d.Item;
        }

        public static implicit operator T2(ExtraData<T, T2> d)
        {
            return d.Data;
        }
    }
}