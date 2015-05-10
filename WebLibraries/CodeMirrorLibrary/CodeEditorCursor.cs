using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace CodeMirrorLibrary
{
    [IgnoreNamespace]
    [Imported]
    [Serializable]
    public class CodeEditorCursor
    {
        public int Line { get; set; }
        [ScriptName("ch")]
        public int Character { get; set; }
    }
    [IgnoreNamespace]
    [Imported]
    [Serializable]
    public class CodeMirrorLine
    {
        [ScriptName("markerText")]
        public bool MarkerText { get; set; }
        public string Markers { get; set; }
        public JsDictionary<string,string> GutterMarkers { get; set; }
    }

}