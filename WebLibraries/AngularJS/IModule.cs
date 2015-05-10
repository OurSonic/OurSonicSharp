using System;
using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    ///     see http://docs.angularjs.org/api/angular.Module
    /// </summary>
    [Imported]
    public interface IModule
    {
        IModule Value(string name, object value);

        IModule Controller(string name, object[] injectionArgs);
        
        [AlternateSignature]
        IModule Controller<TR>(string name, Func<TR> controllerConstructor);

        [AlternateSignature]

        IModule Controller<T1, TR>(string name, Func<T1, TR> directiveFactory);

        [AlternateSignature]

        IModule Controller<T1, T2, TR>(string name, Func<T1, T2, TR> directiveFactory);

        [AlternateSignature]

        IModule Controller<T1, T2, T3, TR>(string name, Func<T1, T2, T3, TR> directiveFactory);

        [AlternateSignature]

        IModule Controller<T1, T2, T3, T4, TR>(string name, Func<T1, T2, T3, T4, TR> directiveFactory);

        [AlternateSignature]

        IModule Controller<T1, T2, T3, T4, T5, TR>(string name, Func<T1, T2, T3, T4, T5, TR> directiveFactory);


        IModule Config( object[] injectionArgs);


        [AlternateSignature]
        IModule Config( Action controllerConstructor);

        [AlternateSignature]

        IModule Config<T1>(  Action<T1> directiveFactory);

        [AlternateSignature]

        IModule Config<T1, T2>( Action<T1, T2> directiveFactory);

        [AlternateSignature]

        IModule Config<T1, T2, T3>( Action<T1, T2, T3> directiveFactory);

        [AlternateSignature]

        IModule Config<T1, T2, T3, T4>(Action<T1, T2, T3, T4> directiveFactory);

        [AlternateSignature]

        IModule Config<T1, T2, T3, T4, T5>( Action<T1, T2, T3, T4, T5> directiveFactory);





        IModule Directive(string name, object[] injectionArgs);

        [AlternateSignature]
        
        IModule Directive<TR>(string name, Func<TR> directiveFactory);
        
        [AlternateSignature]
        
        IModule Directive<T1, TR>(string name, Func<T1, TR> directiveFactory);
        
        [AlternateSignature]
        
        IModule Directive<T1, T2, TR>(string name, Func<T1, T2, TR> directiveFactory);

        
        IModule Service<TR>(string name, Func<TR> serviceConstructor);
        [AlternateSignature]
        IModule Service(string name, object[] injectionArgs);


#if TODO
        config(configFn: Function): IModule;
        config(dependencies: any[]): IModule;
        constant(name: string, value: any): IModule;
        controller(name: string, controllerConstructor: Function): IModule;
        controller(name: string, inlineAnnotadedConstructor: any[]): IModule;
        directive(name: string, dependencies: any[]): IModule;
        factory(name: string, serviceFactoryFunction: Function): IModule;
        filter(name: string, filterFactoryFunction: Function): IModule;
        filter(name: string, dependencies: any[]): IModule;
        provider(name: string, serviceProviderConstructor: Function): IModule;
        run(initializationFunction: Function): IModule;
        value(name: string, value: any): IModule;

        // Properties
        name: string;
        requires: string[];
#endif
        IModule Filter(string name, object[] injectionArgs);
        IModule Run(object[] injectionArgs);
    }
}