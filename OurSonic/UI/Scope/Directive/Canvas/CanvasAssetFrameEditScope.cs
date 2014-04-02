using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using OurSonic.Level.Objects;
using OurSonic.UI.Directives;
using OurSonic.UI.Services;

namespace OurSonic.UI.Scope.Directive
{

    public class CanvasAssetFrameEditScope : ManagedScope
    {

        [IntrinsicProperty]
        public LevelObjectAssetFrame Frame { get; set; }

        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public int LineWidth { get; set; }
        [IntrinsicProperty]
        public int EditPaletteIndex { get; set; }
        
        [IntrinsicProperty]
        public bool Edit { get; set; }
        
        [IntrinsicProperty]
        public AssetFrameEditType EditType { get; set; }
    }

}
