using System;
using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$timeout
    /// </summary>
    [Imported]
    public class ITimeoutService
    {
        #if TODO
        unnamed delegate instead of callback ?
        #endif


        [InlineCode("{this}({func})")]
        public IPromise callback(Action func)
        {
            return null;
        }

        [InlineCode("{this}({func},{delay})")]
        public IPromise callback(Action func, int delay)
        {
            return null;
        }

        [InlineCode("{this}({func},{delay},{invokeApply})")]
        public IPromise callback(Action func, int delay, bool invokeApply)
        {
            return null;
        }


        public bool cancel(IPromise promise)
        {
            return false;
        }

    }
}