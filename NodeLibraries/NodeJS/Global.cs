using System;
using System.Runtime.CompilerServices;

namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [IgnoreGenericArguments]
    public static class Global
    {
        [IntrinsicProperty]
        [ScriptAlias("process")]
        public static Process Process { get; set; }

        [IgnoreGenericArguments]
        [ScriptAlias("require")]
        public static TModule Require<TModule>(string name) where TModule : NodeModule
        {
            return null;
        }

        [ScriptAlias("require")]
        public static void Require(string name)
        {
        }

        [ScriptAlias("setInterval")]
        public static void SetInterval(Action pollGateways, int poll)
        {
        }

        [ScriptAlias("setTimeout")]
        public static void SetTimeout(Action pollGateways, int poll)
        {
        }

        [ScriptAlias("console")]
        [IntrinsicProperty]
        public static Console Console { get; set; }
    }
    
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [IgnoreGenericArguments]
    public class Console
    {
        public void Log(string log)
        {
            
        }
    }
}