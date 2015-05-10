using System;
using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IHttpPromise : IPromise
    {
        IHttpPromise Success(Func<string, object> callback);
        IHttpPromise Error(Func<string, object> callback);

        IHttpPromise Success(Action<string> callback);
        IHttpPromise Error(Action<string> callback);

    }
}