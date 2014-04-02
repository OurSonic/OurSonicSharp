using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UI.Services;

namespace OurSonic.UI.Scope.Directive
{
    public class CanvasPieceScope : ManagedScope
    {

        [IntrinsicProperty]
        public LevelObjectAsset Asset { get; set; }
        [IntrinsicProperty]
        public bool Inline { get; set; }

        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
    }
}