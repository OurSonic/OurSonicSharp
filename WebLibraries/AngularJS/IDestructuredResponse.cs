using System;
using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IDestructuredResponse
    {
        object Data { get; set; }
        int Status { get; set; }
        Func<string, string> Headers { get; set; }
        IRequestConfig Config { get; set; }

    }
}