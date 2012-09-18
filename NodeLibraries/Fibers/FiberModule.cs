using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace FibersLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("Fiber")]
    [IgnoreGenericArguments]
    public class FiberModule<T> : NodeModule
    {
        public FiberModule(Func<T, bool> action) {}

        [ScriptAlias("yield")]
        public static T Yield(object obj = null)
        {
            return default( T );
        }

        [IgnoreGenericArguments]
        public T2 Run<T2>(object obj)
        {
            return default( T2 );
        }

        [IgnoreGenericArguments]
        public T2 Run<T2>()
        {
            return default( T2 );
        }
    }
}