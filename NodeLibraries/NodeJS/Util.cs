using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("util")]
    public class Util : NodeModule
    {
        [ScriptName("print")]
        public void Print(string s) {}
    }
}