using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$controller
    /// http://docs.angularjs.org/api/ng.$controllerProvider
    /// </summary>
    [Imported]
    public interface IControllerService
    {
#if TODO
    // Although the documentation doesn't state this, locals are optional
        (controllerConstructor: Function, locals?: any): any;
        (controllerName: string, locals?: any): any;
#endif
    }
}