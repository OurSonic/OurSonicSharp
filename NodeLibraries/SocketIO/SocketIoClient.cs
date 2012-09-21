using System.Runtime.CompilerServices;
namespace SocketIONodeLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class SocketIOClient
    {
        [ScriptName("sockets")] public SocketNamespace Sockets;
        private SocketNamespace sockets;

        [ScriptName("set")]
        public void Set(string option, int value) {}
    }
}