using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IControlerProvider : IServiceProvider
    {
#if TODO

        register(name: string, controllerConstructor: Function): void;
        register(name: string, dependencyAnnotadedConstructor: any[]): void;
#endif
    }
}