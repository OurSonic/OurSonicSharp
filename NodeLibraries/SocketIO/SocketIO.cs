using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIONodeLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class SocketIOModule : NodeModule
    {
        public SocketIOClient Listen(HttpServer app)
        {
            return null;
        }
    }
}