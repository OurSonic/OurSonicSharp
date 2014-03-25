using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$route
    /// http://docs.angularjs.org/api/ng.$routeProvider
    /// </summary>
    [Imported]
    public interface IRouteService
    {
#if TODO
        reload(): void;
        routes: any;

        // May not always be available. For instance, current will not be available
        // to a controller that was not initialized as a result of a route maching.
        current?: ICurrentRoute;
#endif
    }
}