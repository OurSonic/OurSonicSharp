using System.Html;
using System.Runtime.CompilerServices;
namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("CodeMirror")]
    public class CodeMirror
    {
        public Element ScrollerElement
        {
            [ScriptName("getScrollerElement")]
            get { return null; }
        }

        [ScriptName("fromTextArea")]
        public static CodeMirror FromTextArea(Element element, CodeMirrorOptions options)
        {
            return null;
        }

        [ScriptName("refresh")]
        public void Refresh() {}

        [ScriptName("setMarker")]
        public void SetMarker(int lineIndex, string style) {}

        [ScriptName("setValue")]
        public void SetValue(string data) {}

        [ScriptName("clearMarker")]
        public void ClearMarker(int lineNumber) {}

        [ScriptName("setCursor")]
        public void SetCursor(int lineNumber, int colNumber) {}

        [ScriptName("getValue")]
        public string GetValue()
        {
            return null;
        }

        [ScriptName("getCursor")]
        public CodeEditorCursor GetCursor()
        {
            return null;
        }

        [ScriptName("setLineClass")]
        public CodeMirrorLine SetLineClass(CodeMirrorLine line, string style)
        {
            return null;
        }

        [ScriptName("setLineClass")]
        public CodeMirrorLine SetLineClass(int lineIndex, string style)
        {
            return null;
        }

        [ScriptName("setOption")]
        public void SetOption(string key, object value) {}

        [ScriptName("lineCount")]
        public int LineCount()
        {
            return 0;
        }

        public CodeMirrorLine LineInfo(int lineIndex)
        {
            return null;
        }

        public Element GetScrollerElement()
        {
            return null;
        }

        public TextAreaElement GetInputField()
        {
            return null;
        }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class CodeMirrorLine
    {
        [IntrinsicProperty]
        [ScriptName("markerText")]
        public bool MarkerText { get; set; }
    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class CodeEditorCursor
    {
        [IntrinsicProperty]
        [ScriptName("line")]
        public CodeMirrorLine Line { get; set; }
    }
}