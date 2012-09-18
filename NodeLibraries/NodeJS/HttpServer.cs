using System.Runtime.CompilerServices;

namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class HttpServer
    {
        [ScriptName("listen")]
        public object Listen(int port)
        {
            return null;
        }
    }
}