using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$log
    /// </summary>
    [Imported]
    public interface ILogService
    {
        void error(params object[] args);
        void info(params object[] args);
        void log(params object[] args);
        void warn(params object[] args);
    }
}