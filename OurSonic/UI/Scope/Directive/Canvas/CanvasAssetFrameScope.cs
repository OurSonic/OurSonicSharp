using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using OurSonic.Level.Objects;
using OurSonic.UI.Services;

namespace OurSonic.UI.Scope.Directive
{

    public class CanvasAssetFrameScope : ManagedScope
    {

        [IntrinsicProperty]
        public LevelObjectAssetFrame Frame { get; set; }

        [IntrinsicProperty]
        public bool Inline { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }

    }
}
