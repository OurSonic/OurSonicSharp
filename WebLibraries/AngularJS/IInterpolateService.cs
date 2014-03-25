using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$interpolate
    /// http://docs.angularjs.org/api/ng.$interpolateProvider
    /// </summary>
    [Imported]
    public interface IInterpolateService
    {
#if TODO
        (text: string, mustHaveExpression?: bool): IInterpolationFunction;
        endSymbol(): string;
        startSymbol(): string;
#endif
    }
}