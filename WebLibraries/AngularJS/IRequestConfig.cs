using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// This is just for hinting.    
    /// Some opetions might not be available depending on the request. 
    /// http://docs.angularjs.org/api/ng.$http#Usage for options explanations
    /// </summary>
    [Imported]
    public interface IRequestConfig
    {
#if TODO
        method: string;
        url: string;
        params?: any;
        
        // XXX it has it's own structure...  perhaps we should define it in the future
        headers?: any;
        
        cache?: any;
        timeout?: number;
        withCredentials?: bool;

        // These accept multiple types, so let's defile them as any
        data?: any;
        transformRequest?: any;
        transformResponse?: any;
#endif
    }
}