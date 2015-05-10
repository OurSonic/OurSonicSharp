using System;
using System.Collections.Generic;
using OurSonic.Level.Tiles;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services; 

namespace OurSonic.UI.Controllers
{
    internal class TileEditorController : IController
    {
        public const string Name = "TileEditorController";
        public const string View = "TileEditor";
        private readonly TileEditorScope scope;
        private readonly CreateUIService createUIService;

        public TileEditorController(TileEditorScope scope, CreateUIService createUIService)
        {
            this.scope = scope;
            this.scope.Visible = true;
            this.createUIService = createUIService;
            scope.Model.TileChunkInfo = new TileChunkInfoScopeModel();
            scope.Model.TileChunkInfo.DebugDrawOptions = new TileChunkDebugDrawOptions()
            {
                OutlineTilePieces = true
            };
            scope.Model.TileChunkInfo.DrawOptions = new TileChunkDrawOptions()
                                                    {
                                                        ShowLowLayer=true,
                                                        ShowHighLayer=true
                                                    };
            scope.Watch("model.tileChunkInfo.debugDrawOptions.outlineTilePiece", () =>
                                                                                 {
                                                                                     scope.Model.TileChunkInfo.SelectedTilePiece = scope.Model.TileChunkInfo.DebugDrawOptions.OutlineTilePiece;
                                                                                 });
        }
          
    }
}