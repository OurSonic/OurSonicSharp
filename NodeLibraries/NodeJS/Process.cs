using System;
using System.Runtime.CompilerServices;

namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("process")]
    public class Process : EventEmitter
    {
        [ScriptName("stdin")]
        [IntrinsicProperty]
        public STDIn STDIn { get; set; }

        [ScriptName("stdout")]
        [IntrinsicProperty]
        public STDOut STDOut { get; set; }

        [ScriptName("stderr")]
        [IntrinsicProperty]
        public STDError STDError { get; set; }

        [ScriptName("exit")]
        public void Exit()
        {
        }
    }

    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class STDIn : EventEmitter
    {
        [ScriptName("resume")]
        public void Resume()
        {
        }

        [ScriptName("once")]
        public void Once(string data, Action<string> function)
        {
        }
    }

    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class STDOut : EventEmitter
    {
        [ScriptName("write")]
        public void Write(string question)
        {
        }
    }

    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("STDErr")]
    public class STDError : EventEmitter
    {
        [ScriptName("write")]
        public void Write(string question)
        {
        }
    }
}