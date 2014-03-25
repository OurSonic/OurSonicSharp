using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$compile
    /// http://docs.angularjs.org/api/ng.$compileProvider
    /// </summary>
    [Imported]
    public interface ICompileService
    {
#if TODO
        (element: string, transclude?: ITemplateLinkingFunction, maxPriority?: number): ITemplateLinkingFunction;
        (element: Element, transclude?: ITemplateLinkingFunction, maxPriority?: number): ITemplateLinkingFunction;
        (element: IJQLiteOrBetter, transclude?: ITemplateLinkingFunction, maxPriority?: number): ITemplateLinkingFunction;
#endif
    }
}