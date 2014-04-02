using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UI.Services;
using OurSonic.Utility;

namespace OurSonic.UI.Scope.Directive
{
    public class CanvasPieceLayoutEditScope : ManagedScope
    {
        [IntrinsicProperty]
        public LevelObjectPieceLayout PieceLayout { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public bool ShowImages { get; set; }
        [IntrinsicProperty]
        public LevelObjectPieceLayoutPiece SelectedPieceLayoutPiece { get; set; }
        [IntrinsicProperty]
        public float Scale { get; set; }
        [IntrinsicProperty]
        public Point ZeroPosition { get; set; }

        [IntrinsicProperty]
        public LevelObject ObjectData { get; set; }
    }
    public class CanvasPieceLayoutScope : ManagedScope
    {
        [IntrinsicProperty]
        public LevelObjectPieceLayout PieceLayout { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public LevelObject ObjectData { get; set; }
    }
}