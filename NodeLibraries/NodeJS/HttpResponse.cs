using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported()]
    public class HttpResponse
    {
        [ScriptName("end")]
        public void End() {}

        [ScriptName("writeHead")]
        public void WriteHead(int code, object httpResponseHeader) {}

        [ScriptName("end")]
        public void End(string s) {}
    }
}