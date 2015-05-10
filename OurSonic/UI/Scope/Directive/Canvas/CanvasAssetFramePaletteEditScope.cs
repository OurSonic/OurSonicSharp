using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UI.Services;

namespace OurSonic.UI.Scope.Directive
{
    public class CanvasAssetFramePaletteEditScope : ManagedScope
    {

        [IntrinsicProperty]
        public LevelObjectAssetFrame Frame { get; set; }

        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public int SelectedPaletteIndex { get; set; }
        [IntrinsicProperty]
        public bool ShowCurrent { get; set; }
        
        [IntrinsicProperty]
        public bool Wide { get; set; }
        [IntrinsicProperty]

        public bool Edit { get; set; }
    }
}