using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIOLibrary
{
    [IgnoreNamespace]
    [Imported()]
    [ModuleName("socket.io")]
    [GlobalMethods]
    public static class SocketIO
    {
        public static SocketIOClient Listen(HttpServer app)
        {
            return null;
        }
    }
}