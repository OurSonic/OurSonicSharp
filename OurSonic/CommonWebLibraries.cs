﻿using System;
using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Text;
using System.Runtime.CompilerServices;


namespace CommonWebLibraries
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("Compressor")]
    public class Compressor
    {
        [ScriptName("CompressText")]
        public string CompressText(string txt)
        {
            return null;
        }
        [ScriptName("DecompressText")]
        public string DecompressText(string txt)
        {
            return null;
        }

    }
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("xStats")]
    public class XStats
    {
        [IntrinsicProperty]
        public Element Element { get; set; }
    }
}