﻿using System;
using System.Runtime.CompilerServices;
using NodeJSLibrary;
namespace Redis
{
    public class RedisClient : EventEmitter
    {
        [ScriptName("publish")]
        public void Publish(string channel, object content) {}

        [ScriptName("subscribe")]
        public void Subscribe(string channel) {}

        [ScriptName("rpush")]
        public void RPush(string channel, object value) {}

        [ScriptName("blpop")]
        public void BLPop(object[] objectsAndTimeout, Action<string, object> action) {}
    }
}