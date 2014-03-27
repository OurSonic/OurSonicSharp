using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using ng;

namespace OurSonic.UI.Scope
{

    public class _KeepBaseScopeAlive
    {
    }

    [Imported]
    public abstract class BaseScope : IScope
    {
        public const string Name = "$scope";
        /*
            Function Watch(string watchExpression, Func<object, object> listener);
            Function Watch(string watchExpression, Func<object, object, object> listener);
            Function Watch(string watchExpression, Func<object, object, IScope, object> listener);
            Function Watch(string watchExpression, Func<object, object> listener, bool objectEquality);
            Function Watch(string watchExpression, Func<object, object, object> listener, bool objectEquality);
            Function Watch(string watchExpression, Func<object, object, IScope, object> listener, bool objectEquality);
             */

        public Function Watch(string watchExpression)
        {
            return null;
        }
        [ScriptName("$parent")]
        [IntrinsicProperty]
        public BaseScope Parent { get; set; }


        public Function Watch(string watchExpression, Action listener)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action<object> listener)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action<object, object> listener)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action<object, object, IScope> listener)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action listener, bool objectEquality)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action<object> listener, bool objectEquality)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action<object, object> listener, bool objectEquality)
        {
            return null;
        }

        public Function Watch(string watchExpression, Action<object, object, IScope> listener, bool objectEquality)
        {
            return null;
        }


        public Function Watch<T>(Func<T, object> watchExpression) where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action listener) where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action<object> listener) where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action<object, object> listener) where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action<object, object, IScope> listener)
            where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action listener, bool objectEquality) where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action<object> listener, bool objectEquality)
            where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action<object, object> listener, bool objectEquality)
            where T : IScope
        {
            return null;
        }

        public Function Watch<T>(Func<T, object> watchExpression, Action<object, object, IScope> listener,
            bool objectEquality) where T : IScope
        {
            return null;
        }


        public void Apply(Func<IScope, object> exp)
        {
        }

        public void Apply()
        {
        }
        public void Digest()
        {
        }

        [IntrinsicProperty]
        [ScriptName("$$phase")]
        public string Phase { get; set; }


        [IntrinsicProperty]
        [ScriptName("$root")]
        public BaseScope Root { get; set; }
        public void Destroy()
        {
        }

        public void Apply(string exp)
        {
        }

        public T New<T>()
        {
            return default(T);
        }

        public IScope New()
        {
            return default(IScope);
        }

        public void Broadcast<T>(string channel, T value)
        {
        }

        public void Broadcast(string channel)
        {
        }

        public void On<T>(string channel, Action<T> callback)
        {
        }

        public void On(string channel, Action callback)
        {
        }


#if TODO
    // Documentation says exp is optional, but actual implementaton counts on it
        
        $broadcast(name: string, ...args: any[]): IAngularEvent;
        $emit(name: string, ...args: any[]): IAngularEvent;
        
        // Documentation says exp is optional, but actual implementaton counts on it
        $eval(expression: string): any;
        $eval(expression: (scope: IScope) => any): any;

        // Documentation says exp is optional, but actual implementaton counts on it
        $evalAsync(expression: string): void;
        $evalAsync(expression: (scope: IScope) => any): void;

        // Defaults to false by the implementation checking strategy
        $new(isolate?: bool): IScope;

        $on(name: string, listener: (event: IAngularEvent, ...args: any[]) => any): Function;

        $Watch(watchExpression: string, listener?: (newValue: any, oldValue: any, scope: IScope) => any, objectEquality?: bool): Function;
        
        /*
        $Watch(watchExpression: string, listener?: string, objectEquality?: bool): Function;
        $Watch(watchExpression: string, listener?: (newValue: any, oldValue: any, scope: IScope) => any, objectEquality?: bool): Function;
        $Watch(watchExpression: (scope: IScope) => Function, listener?: string, objectEquality?: bool): Function;
        $Watch(watchExpression: (scope: IScope) => Function, listener?: (newValue: any, oldValue: any, scope: IScope) => any, objectEquality?: bool): Function;
*/
        
        $id: number;
#endif
    }
}
