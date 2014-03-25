namespace ng.auto
{
    /// <summary>
    /// http://docs.angularjs.org/api/AUTO.$provide
    /// </summary>
    public interface IProvideService
    {
#if TODO
    // Documentation says it returns the registered instance, but actual
    // implementation does not return anything.
    // constant(name: string, value: any): any;
            constant(name: string, value: any): void;

            decorator(name: string, decorator: Function): void;
            factory(name: string, serviceFactoryFunction: Function): ng.IServiceProvider;
            provider(name: string, provider: ng.IServiceProvider): ng.IServiceProvider;
            provider(name: string, serviceProviderConstructor: Function): ng.IServiceProvider;
            service(name: string, constructor: Function): ng.IServiceProvider;
            value(name: string, value: any): ng.IServiceProvider;
#endif
    }
}