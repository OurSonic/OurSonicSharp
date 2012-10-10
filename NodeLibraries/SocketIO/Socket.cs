using System.Runtime.CompilerServices;
using NodeJS.EventsModule;
namespace SocketIOLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class Socket : EventEmitter {}
}