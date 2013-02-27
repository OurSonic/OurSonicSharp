using System.Runtime.CompilerServices;
namespace Redis
{
    [Imported()]
    [IgnoreNamespace]
    [ModuleName("redis")]
    public class RedisModule
    {
        [ScriptName("debug_mode")] public bool DebugMode;

        public RedisClient CreateClient(int port, string ip)
        {
            return null;
        }
    }
}