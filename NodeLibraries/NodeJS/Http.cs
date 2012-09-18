using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class Http : NodeModule
    {
        [ScriptName("createServer")]
        public HttpServer CreateServer(Action<HttpRequest, HttpResponse> callback)
        {
            return null;
        }
    }
}