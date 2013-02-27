using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIOWebLibrary
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("io")]
    public class SocketIOClient : EventEmitter
    {
        [ScriptName("connect")]
        public static SocketIOClient Connect(string server)
        {
            return null;
        }
    }
}