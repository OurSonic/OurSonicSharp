using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IDeferred
    {
#if TODO
        resolve(value?: any): void;
        reject(reason?: string): void;
        promise: IPromise;
#endif
    }
}