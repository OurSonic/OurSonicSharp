using System.Runtime.CompilerServices;
namespace MongoDB
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo) {}
    }
}