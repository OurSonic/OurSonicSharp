using System;
using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$rootScope.Scope
    /// </summary>
    [Imported]
    public interface IScope
    {
        [ScriptName("$watch")]
        Function Watch(string watchExpression); 
        
        [AlternateSignature]
        Function Watch(string watchExpression, Action listener);
        [AlternateSignature]
        Function Watch(string watchExpression, Action<object> listener);
        [AlternateSignature]
        Function Watch(string watchExpression, Action<object, object> listener);
        [AlternateSignature]
        Function Watch(string watchExpression, Action<object, object, IScope> listener);
        [AlternateSignature]
        Function Watch(string watchExpression, Action listener, bool objectEquality);
        [AlternateSignature]
        Function Watch(string watchExpression, Action<object> listener, bool objectEquality);
        [AlternateSignature]
        Function Watch(string watchExpression, Action<object, object> listener, bool objectEquality);
        [AlternateSignature]
        Function Watch(string watchExpression, Action<object, object, IScope> listener, bool objectEquality);
        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action listener)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action<object> listener)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action<object, object> listener)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action<object, object, IScope> listener)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action listener, bool objectEquality)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action<object> listener, bool objectEquality)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action<object, object> listener, bool objectEquality)where T:IScope;

        [AlternateSignature]
        Function Watch<T>(Func<T, object> watchExpression, Action<object, object, IScope> listener, bool objectEquality)where T:IScope;


        /*
        Function Watch(string watchExpression, Func<object, object> listener);
        Function Watch(string watchExpression, Func<object, object, object> listener);
        Function Watch(string watchExpression, Func<object, object, IScope, object> listener);
        Function Watch(string watchExpression, Func<object, object> listener, bool objectEquality);
        Function Watch(string watchExpression, Func<object, object, object> listener, bool objectEquality);
        Function Watch(string watchExpression, Func<object, object, IScope, object> listener, bool objectEquality);
         */

        [ScriptName("$apply")]
        void Apply(Func<IScope, object> exp);
        [AlternateSignature]
        void Apply(string exp);
        [AlternateSignature]
        void Apply();
        [ScriptName("$digest")]
        void Digest();  
        [ScriptName("$new")]
        T New<T>();

        [ScriptName("$new")]
        IScope New();

        [ScriptName("$broadcast")]
        void Broadcast<T>(string channel, T value);

        [ScriptName("$on")]
        void On<T>(string channel, Action<T> callback);

        [AlternateSignature]
        void Broadcast(string channel);

        [AlternateSignature]
        void On(string channel, Action callback);


        [ScriptName("$destroy")]
        void Destroy();
        
#if TODO
    // Documentation says exp is optional, but actual implementaton counts on it
        
        $broadcast(name: string, ...args: any[]): IAngularEvent;
        $destroy(): void;
        $digest(): void;
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