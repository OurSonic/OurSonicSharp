using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace SocketIOWebLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
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