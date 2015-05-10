using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface ICompileProvider : IServiceProvider
    {
#if TODO
        directive(name: string, directiveFactory: Function): ICompileProvider;

        // Undocumented, but it is there...
        directive(directivesMap: any): ICompileProvider;
#endif
    }
}