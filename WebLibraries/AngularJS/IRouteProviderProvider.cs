using System;
using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IRouteProviderProvider : IServiceProvider
    {
        IRouteProviderProvider When(string path, Route route);
        IRouteProviderProvider Otherwise(OtherwiseRoute otherwise);
#if TODO
        otherwise(params: any): IRouteProviderProvider;
        when(path: string, route: IRoute): IRouteProviderProvider;
#endif
    }
    [Imported]
    [Serializable]
    public class OtherwiseRoute
    {
 

        public string RedirectTo { get; set; }
    }
}