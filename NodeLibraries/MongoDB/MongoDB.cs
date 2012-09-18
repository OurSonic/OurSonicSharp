using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using NodeJSLibrary;

namespace MongoDB
{

    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("mongo")]
    public class MongoModule : NodeModule
    {
        [ScriptName("Connection")]
        public MongoConnection Connection;
        [ScriptName("Db")]
        public MongoDB DB;
        [ScriptName("Server")]
        public MongoServer Server;
    }
}
