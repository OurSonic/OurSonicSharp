using System;
using System.Html;
using System.Runtime.CompilerServices;
namespace OurSonic.Utility
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("Compressor")]
    public class Compressor
    {
        [ScriptName("CompressText")]
        public string CompressText(string txt)
        {
            return null;
        }

        [ScriptName("DecompressText")]
        public string DecompressText(string txt)
        {
            return null;
        }
    }
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("xStats")]
    public class XStats
    {
        [IntrinsicProperty]
        public Element Element { get; set; }
    }
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("FunctionWorker")]
    public class FunctionWorker
    {
        public FunctionWorker(string scriptName) {}

        
        public void ThreadedFunction<T, T2>(Action<ExtraEvent<T, T2>> func, Action<ExtraData<T, T2>> onComplete, Action<ExtraData<T, T2>> callback, T data) {}

        [ScriptAlias("self.importScripts")]
        public static void ImportScripts(string url) {}

        [ScriptAlias("hasWebWorker")]
        public static bool HasWebWorker()
        {
            return false;
        }
    }
    [IgnoreNamespace]
    [Imported()]
    
    public class ExtraEvent<T, T2> : ExtraData<T, T2>
    {
        [IntrinsicProperty]
        public Action<T> Callback { get; set; }
        public ExtraEvent(T item, T2 data) : base(item, data) {}
    }
}