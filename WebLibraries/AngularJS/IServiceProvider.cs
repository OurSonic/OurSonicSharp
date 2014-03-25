using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// All service providers extend this interface
    /// </summary>
    [Imported]
    public interface IServiceProvider
    {
#if TODO
        [ScriptAlias("$.fx.interval")]
#endif
        object get();
    }
}