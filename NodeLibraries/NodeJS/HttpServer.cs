using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported()]
    public class HttpServer
    {
        [ScriptName("listen")]
        public object Listen(int port)
        {
            return null;
        }
    }
}