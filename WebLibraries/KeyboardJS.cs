using System;
using System.Runtime.CompilerServices;
namespace WebLibraries
{
    [Imported]
    public class KeyboardJS
    {
        [InlineCode("KeyboardJS")]
        public static KeyboardJS Instance()
        {
            return null;
        }

        [IntrinsicProperty]
        public KeyboardJSBind Bind { get; set; }
    }
    public delegate void KeyboardJSBindKey(string key, Action down, Action up);
    [Imported]
    public class KeyboardJSBind
    {
        [IntrinsicProperty]
        public KeyboardJSBindKey Key { get; set; }
    }

}