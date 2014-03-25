using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// For the sake of simplicity, let's assume jQuery is always preferred
    /// </summary>
    [Imported]
    public interface IJQLiteOrBetter 
#if TODO
        : JQuery 
#endif
    { }
}