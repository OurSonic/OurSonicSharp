﻿using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace MongoDB
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("mongo")]
    public class MongoModule : NodeModule
    {
        [ScriptName("Connection")] public MongoConnection Connection;
        [ScriptName("Db")] public MongoDB DB;
        [ScriptName("Server")] public MongoServer Server;
    }
}