using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface ICacheObject
    {
        void Put(string key, object value);
        object Get(string key);
#if TODO
        info(): {
            id: string;
            size: number;

            // Not garanteed to have, since it's a non-mandatory option
            //capacity: number;
        };
        put(key: string, value?: any): void;
        get(key: string): any;
        remove(key: string): void;
        removeAll(): void;
        destroy(): void;
#endif
    }
}