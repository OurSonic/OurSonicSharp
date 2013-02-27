using System;
using System.Runtime.CompilerServices;
namespace FibersLibrary
{
    [Imported()]
    [ModuleName("Fiber")]
    
    [Imported]
    public class FiberModule<T>
    {
        public FiberModule(Func<T, bool> action) {}

        [ScriptAlias("yield")]
        public static T Yield(object obj = null)
        {
            return default( T );
        }

        
        public T2 Run<T2>(object obj)
        {
            return default( T2 );
        }

        
        public T2 Run<T2>()
        {
            return default( T2 );
        }
    }
}