using System;
using System.Html;
using System.Runtime.CompilerServices;
namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [Serializable]
    public sealed class CodeMirrorOptions
    {
        [ScriptName("lineNumbers")]
        [IntrinsicProperty]
        public bool LineNumbers { get; set; }
        [ScriptName("lineWrapping")]
        [IntrinsicProperty]
        public bool LineWrapping { get; set; }
        [ScriptName("matchBrackets")]
        [IntrinsicProperty]
        public bool MatchBrackets { get; set; }
        [ScriptName("onGutterClick")]
        [IntrinsicProperty]
        public Action<CodeMirror, int, ElementEvent> OnGutterClick { get; set; }
        [ScriptName("onCursorActivity")]
        [IntrinsicProperty]
        public Action<ElementEvent> OnCursorActivity { get; set; }
        [ScriptName("onFocus")]
        [IntrinsicProperty]
        public Action<ElementEvent> OnFocus { get; set; }
        [ScriptName("onBlur")]
        [IntrinsicProperty]
        public Action<ElementEvent> OnBlur { get; set; }
    }
}