using System.Runtime.CompilerServices;
using OurSonic.Level.Tiles;
using OurSonic.UIManager;
namespace OurSonic.Areas
{
    public class UIManagerAreas
    {
        [IntrinsicProperty]
        public UIArea<TileChunk> TileChunkArea { get; set; }
        [IntrinsicProperty]
        public UIArea LevelManagerArea { get; set; }
        [IntrinsicProperty]
        public UIArea<TilePiece> TilePieceArea { get; set; }
        [IntrinsicProperty]
        public UIArea<ColorEditorAreaData> ColorEditorArea { get; set; }
        [IntrinsicProperty]
        public ObjectFrameworkArea ObjectFrameworkArea { get; set; }
        [IntrinsicProperty]
        public UIArea ObjectFrameworkListArea { get; set; }
        [IntrinsicProperty]
        public UIArea<LiveObjectsAreaData> LiveObjectsArea { get; set; }
        public UIManagerAreas() {}
    }
}