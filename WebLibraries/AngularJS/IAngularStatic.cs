using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using jQueryApi;
using ng;
using ng.auto;
public delegate Func<object,AngularElement> CompileService(jQueryObject content);


[Imported()]
public static class angular
{
    public static ng.IAngularStatic _;

    public static ng.IModule Module(string name)
    {
        return null;
    }
    public static ng.IModule Module(string name, string[] requires)
    {
        return null;
    }

    public static void Bootstrap(DocumentInstance document, params string[] parms) { }

    public static AngularElement Element(DocumentInstance document)
    {
        return null;
    }
    public static AngularElement Element(string document)
    {
        return null;
    }
    public static AngularElement Element(Element document)
    {
        return null;
    }
    public static AngularElement Element(jQueryObject document)
    {
        return null;
    }
    public static void ForEach<T>(List<T> items, Action<T> item)
    {
    }
    public static void ForEach(JsDictionary items, Action<string,object> item)
    {
    }
}
[Imported()]
public class AngularElement : jQueryObject
{
    public T Scope<T>() where T : IScope
    {
        return default(T);
    }
    public IInjectorService Injector()
    {
        return null;
    }
    
}
namespace ng
{

    /// <summary>
    /// see http://docs.angularjs.org/api
    /// </summary>
    [Imported]
    public interface IAngularStatic
    {
        Function bind(object context, Function fn, params object[] args);
        IModule module(string name);
        IModule module(string name , string[] requires);
        IModule module(string name , string[] requires, Function configFunction);
#if TODO
        bootstrap(element: string, modules?: any[]): auto.IInjectorService;
        bootstrap(element: IJQLiteOrBetter, modules?: any[]): auto.IInjectorService;
        bootstrap(element: Element, modules?: any[]): auto.IInjectorService;
        copy(source: any, destination?: any): any;
        element: IJQLiteOrBetter;
        equals(value1: any, value2: any): bool;
        extend(destination: any, ...sources: any[]): any;
        forEach(obj: any, iterator: (value, key) => any, context?: any): any;
        fromJson(json: string): any;
        identity(arg?: any): any;
        injector(modules?: any[]): auto.IInjectorService;
        isArray(value: any): bool;
        isDate(value: any): bool;
        isDefined(value: any): bool;
        isElement(value: any): bool;
        isFunction(value: any): bool;
        isNumber(value: any): bool;
        isObject(value: any): bool;
        isString(value: any): bool;
        isUndefined(value: any): bool;
        lowercase(str: string): string;        
        noop(...args: any[]): void;
        toJson(obj: any, pretty?: bool): string;
        uppercase(str: string): string;
        version: {
            full: string;
            major: number;
            minor: number;
            dot: number;
            codename: string;
        };
#endif
    }
}