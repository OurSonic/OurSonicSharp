using System.Runtime.CompilerServices;
using NodeJS.HttpModule;
namespace SocketIOLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ModuleName("socket.io")]
    [GlobalMethods]
    public static class SocketIO
    {
        public static SocketIOClient Listen(Server app)
        {
            return null;
        }
    }
}