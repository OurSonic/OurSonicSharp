using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// We define this as separete interface so we can reopen it later for the ngMock module.
    /// </summary>
    [Imported]
    public interface ILogCall
    {
#if TODO
        (...args: any[]): void;
#endif
    }
}