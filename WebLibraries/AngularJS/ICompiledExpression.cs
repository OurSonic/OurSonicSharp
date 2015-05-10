using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface ICompiledExpression
    {
#if TODO
        (context: any, locals?: any): any;

        // If value is not provided, undefined is gonna be used since the implementation
        // does not check the parameter. Let's force a value for consistency. If consumer
        // whants to undefine it, pass the undefined value explicitly.
        assign(context: any, value: any): any;
#endif
    }
}