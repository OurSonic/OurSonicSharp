using System.Runtime.CompilerServices;
namespace OurSonicModels.Common
{  
    public class DataObject<T>
    {
        public DataObject(T data)
        {
            Data = data;
        }

        [IntrinsicProperty]
        [PreserveCase]
        public T Data { get; set; }
    }
}