using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using OurSonic.Level.Tiles;
using OurSonic.UI.Scope.Directive;

namespace OurSonic.UI.Scope.Controller
{
    public class TileEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public TileEditorScopeModel Model { get; set; }
        [IntrinsicProperty]
        public TileEditorScopeCallback Callback { get; set; }
    }


    [Serializable]
    public class TileEditorScopeCallback
    {
      
    }

    [Serializable]
    public class TileEditorScopeModel
    {
        public List<TileChunk> TileChunks { get; set; }
        public List<TilePieceInfo> TilePieces { get; set; }
        public TileChunkInfoScopeModel TileChunkInfo { get; set; }
    }

    [Serializable]
    public class TileChunkInfoScopeModel
    {
        public TilePieceInfo SelectedTilePiece { get; set; }
        public TileChunkDebugDrawOptions DebugDrawOptions { get; set; }
        public TileChunkDrawOptions DrawOptions { get; set; }
    }

    [Serializable]
    public class TileChunkDrawOptions
    {
        public bool ShowLowLayer { get; set; }
        public bool ShowHighLayer { get; set; }
    }
}