using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// see http://docs.angularjs.org/api/ng.$httpBackend 
    /// You should never need to use this service directly.
    /// </summary>
    [Imported]
    public interface IHttpBackendService
    {
#if TODO
    // XXX Perhaps define callback signature in the future
        (method: string, url: string, post?: any, callback?: Function, headers?: any, timeout?: number, withCredentials?: bool); void;
#endif
    }
}