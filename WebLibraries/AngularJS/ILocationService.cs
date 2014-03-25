using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    ///     http://docs.angularjs.org/api/ng.$location
    ///     http://docs.angularjs.org/api/ng.$locationProvider
    ///     http://docs.angularjs.org/guide/dev_guide.services.$location
    /// </summary>
    [Imported]
    public interface ILocationService
    {
        string absUrl();
        string hash();
        ILocationService hash(string newHash);
        string host();

        [AlternateSignature]
        string path();
        ILocationService path(string newPath);
        int port();
        string protocol();
        ILocationService replace();
        string search();
        ILocationService search(object parametersMap);
        ILocationService search(string parameter, object parameterValue);
        string url();
        ILocationService url(string url);
    }
}