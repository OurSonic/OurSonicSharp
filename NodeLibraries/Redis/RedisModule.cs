using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace Redis
{
    [Imported(IsRealType = true)]
    [IgnoreNamespace]
    public class RedisModule : NodeModule
    {
        [ScriptName("debug_mode")] public bool DebugMode;

        public RedisClient CreateClient(int port, string ip)
        {
            return null;
        }
    }
}