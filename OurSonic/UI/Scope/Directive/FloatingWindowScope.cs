using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace OurSonic.UI.Scope.Directive
{
    public class FloatingWindowScope : BaseScope
    {
        [ScriptName("$parent")]
        [IntrinsicProperty]
        public FloatingWindowBaseScope Parent { get; set; }

        [IntrinsicProperty]
        public bool Visible { get; set; }

        [IntrinsicProperty]
        public string Width { get; set; }

        [IntrinsicProperty]
        public string Height { get; set; }

        [IntrinsicProperty]
        public string Left { get; set; }

        [IntrinsicProperty]
        public string Top { get; set; }

        [IntrinsicProperty]
        public Size SizeStyle { get; set; }

        [IntrinsicProperty]
        public Size LastSizeStyle { get; set; }

        [IntrinsicProperty]
        public FloatingWindowPosition PositionStyles { get; set; }

        [IntrinsicProperty]
        public FloatingWindowPosition LastPositionStyles { get; set; }

        [IntrinsicProperty]
        public string WindowTitle { get; set; }

        [ScriptName("onclose")]
        [IntrinsicProperty]
        public Action OnClose { get; set; }

        [IntrinsicProperty]
        public Action Close { get; set; }

        [IntrinsicProperty]
        public Action Minimize { get; set; }

        [IntrinsicProperty]
        public Action Maximize { get; set; }

        [IntrinsicProperty]
        public Action Restore { get; set; }

        [IntrinsicProperty]
        public bool IsMaximized { get; set; }
    }
    
    [Serializable]
    public class Size
    {
        public string Width { get; set; }
        public string Height { get; set; }
    }
}
