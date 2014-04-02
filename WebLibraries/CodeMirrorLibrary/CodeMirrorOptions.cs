using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;

namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported]
    [Serializable]
    public sealed class CodeMirrorOptions
    {
        public string Value { get; set; }
        public string Mode { get; set; }
        public string Theme { get; set; }
        public int IndentUnit { get; set; }
        public bool SmartIndent { get; set; }
        public int TabSize { get; set; }
        public bool IndentWithTabs { get; set; }
        public bool LineNumbers { get; set; }
        public bool ElectricChars { get; set; }
        [ScriptName("rtlMoveVisually")]
        public bool RTLMoveVisually { get; set; }
        public CodeMirrorKeyMap KeyMap { get; set; }
        public JsDictionary<string,string> ExtraKeys { get; set; }
        public int FirstLineNumber { get; set; }
        public bool LineWrapping { get; set; }
        public bool MatchBrackets { get; set; }
        public Action<CodeMirror, int,string, Event> OnGutterClick { get; set; }
        public Action<Event> OnCursorActivity { get; set; }
        public Action<Event> OnFocus { get; set; }
        public Action<Event> OnBlur { get; set; }
        public string[] Gutters  { get; set; }
        public Action<CodeMirror> OnLoad { get; set; }
    }
}