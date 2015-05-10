using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IHttpProvider : IServiceProvider
    {        
#if TODO
        defaults: IRequestConfig;
#endif
    }
}