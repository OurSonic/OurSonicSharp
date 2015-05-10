using System.Runtime.CompilerServices;
using OurSonic.Level.Tiles;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services;

namespace OurSonic.UI.Scope.Directive
{
    public class CanvasTileChunkScope : ManagedScope
    {

        [IntrinsicProperty]
        public TileChunk TileChunk { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public bool Edit { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public bool ShouldAnimate { get; set; }
        [IntrinsicProperty]
        public TileChunkDebugDrawOptions DebugDrawOptions { get; set; }
        [IntrinsicProperty]
        public TileChunkDrawOptions DrawOptions { get; set; }

    }
    public class CanvasTilePieceScope : ManagedScope
    {

        [IntrinsicProperty]
        public TilePieceInfo TilePiece { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public bool Edit { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public bool ShouldAnimate { get; set; }
    }
}