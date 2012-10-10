using System;
using System.Runtime.CompilerServices;
namespace FibersLibrary
{
    [Imported(IsRealType = true)]
    [ModuleName("Fiber")]
    [IgnoreGenericArguments]
    [Imported]
    public class FiberModule<T>
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