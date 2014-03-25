using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$http
    /// </summary>
    [Imported]
    public interface IHttpService
    {

        IHttpPromise Get(string url, object requestConfig);

#if TODO

    // At least moethod and url must be provided...
        (config: IRequestConfig): IHttpPromise;
        get(url: string, RequestConfig?: any): IHttpPromise;
        delete(url: string, RequestConfig?: any): IHttpPromise;
        head(url: string, RequestConfig?: any): IHttpPromise;
        jsonp(url: string, RequestConfig?: any): IHttpPromise;
        post(url: string, data: any, RequestConfig?: any): IHttpPromise;
        put(url: string, data: any, RequestConfig?: any): IHttpPromise;
        defaults: IRequestConfig;

        // For debugging, BUT it is documented as public, so...
        pendingRequests: any[];
#endif
    }
}