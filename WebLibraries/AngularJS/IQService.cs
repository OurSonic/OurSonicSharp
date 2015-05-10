using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$q
    /// </summary>
    [Imported]
    public interface IQService
    {
#if TODO
        all(promises: IPromise[]): IPromise;
        defer(): IDeferred;
        reject(reason?: any): IPromise;
        when(value: any): IPromise;
#endif
    }
}