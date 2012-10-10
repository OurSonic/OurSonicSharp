using System.Runtime.CompilerServices;
namespace SocketIOLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class SocketIOClient
    {
        [IntrinsicProperty]
        public Socket Sockets { get; set; }

        [ScriptName("set")]
        public void Set(string option, int value) {}
    }
}