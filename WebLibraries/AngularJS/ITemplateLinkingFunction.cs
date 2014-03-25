using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface ITemplateLinkingFunction
    {
#if TODO
    // Let's hint but not force cloneAttachFn's signature
        (scope: IScope, cloneAttachFn?: (clonedElement?: IJQLiteOrBetter, scope?: IScope) => any): IJQLiteOrBetter;
#endif
    }
}