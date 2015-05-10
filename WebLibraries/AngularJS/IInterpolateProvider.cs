using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IInterpolateProvider : IServiceProvider
    {
#if TODO
        startSymbol(): string;
        startSymbol(value: string): IInterpolateProvider;
        endSymbol(): string;
        endSymbol(value: string): IInterpolateProvider;
#endif
    }
}