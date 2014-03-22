using System.Runtime.CompilerServices;
namespace MongoDB
{
    [IgnoreNamespace]
    [Imported()]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo) {}
    }
}