using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface ILocationProvider : IServiceProvider
    {
#if TODO
        hashPrefix(): string;
        hashPrefix(prefix: string): ILocationProvider;
        html5Mode(): bool;

        // Documentation states that parameter is string, but
        // implementation tests it as boolean, which makes more sense
        // since this is a toggler
        html5Mode(active: bool): ILocationProvider;
#endif
    }
}