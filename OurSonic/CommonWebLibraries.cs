using System;
using System.Html;
using System.Runtime.CompilerServices;
namespace CommonWebLibraries
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
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
    [Imported(IsRealType = true)]
    [ScriptName("xStats")]
    public class XStats
    {
        [IntrinsicProperty]
        public Element Element { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("FunctionWorker")]
    public class FunctionWorker
    {
        public FunctionWorker(string scriptName) {}

        [IgnoreGenericArguments]
        public void ThreadedFunction<T, T2>(Action<FunctionWorkerEvent<T>> func, Action<FunctionWorkerData<T2>> onComplete, Action<FunctionWorkerData<T2>> callback, T data) {}

        [ScriptAlias("self.importScripts")]
        public static void ImportScripts(string url) {}
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [IgnoreGenericArguments]
    public class FunctionWorkerEvent<T> : FunctionWorkerData<T>
    {
        [IntrinsicProperty]
        public Action<T> Callback { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [IgnoreGenericArguments]
    public class FunctionWorkerData<T>
    {
        [IntrinsicProperty]
        public T Data { get; set; }
    }
}