using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$cacheFactory
    /// </summary>
    [Imported]
    public interface ICacheFactoryService
    {
#if TODO
    // Lets not foce the optionsMap to have the capacity member. Even though
    // it's the ONLY option considered by the implementation today, a consumer
    // might find it useful to associate some other options to the cache object.
    //(cacheId: string, optionsMap?: { capacity: number; }): CacheObject;
        (cacheId: string, optionsMap?: { capacity: number; }): ICacheObject;

        // Methods bellow are not documented
        info(): any;
        get(cacheId: string): ICacheObject;
#endif
    }
}