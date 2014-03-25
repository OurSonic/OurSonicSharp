using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IPromise
    {
#if TODO
        then(successCallback: Function, errorCallback?: Function): IPromise;
#endif
    }
}