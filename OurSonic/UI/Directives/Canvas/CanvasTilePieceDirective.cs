using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using jQueryApi;
using ng;
using OurSonic.Level.Objects;
using OurSonic.Level.Tiles;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Scope.Directive;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class CanvasTilePieceDirective
    {
        public const string Name = "canvasTilePiece";
        public Action<CanvasTilePieceScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasTilePieceDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas>";
            replace = true;
            transclude = true;
            scope = new
            {
                tilePiece= "=",
                width = "=",
                shouldAnimate = "=",
                height = "=",
                edit = "="
            };
            link = LinkFn;
        }

        private void LinkFn(CanvasTilePieceScope scope, jQueryObject element, dynamic attr)
        {
            element.Width(scope.Width);
            element.Height(scope.Height);
            if (scope.Edit)
            {
                element.Click(ev =>
                              {
                                  TilePieceInfo tilePieceInfo = scope.TilePiece;

                                  if (tilePieceInfo == null) return;
                                  var x = ev.OffsetX;
                                  var y = ev.OffsetY;


                                  var _x = (int)(x / ((double)scope.Width / TileChunk.Size));
                                  var _y = (int)(y / ((double)scope.Height / TileChunk.Size));

                                  //                                  scope.DebugDrawOptions.OutlineTilePiece = scope.TileChunk.GetTilePieceInfo(_x, _y, true);

                              });
            }
            var zero = new Point(0, 0);

            var context = (CanvasRenderingContext2D)((CanvasElement)element[0]).GetContext(CanvasContextId.Render2D);
            Action updateTilePiece = () =>
                                 {

                                     if (scope.TilePiece == null) return;
                                     var tilePiece = scope.TilePiece.GetTilePiece();

                                     context.Canvas.Width = context.Canvas.Width;

                                     context.Me().webkitImageSmoothingEnabled = false;
                                     context.Me().mozImageSmoothingEnabled = false;
                                     context.Me().imageSmoothingEnabled = false;

                                     context.Scale(scope.Width / ((double)TileChunk.TileSideLength), scope.Height / ((double)TileChunk.TileSideLength));
                                     tilePiece.DrawBase(context, zero, ChunkLayer.Low, false, false);
                                     tilePiece.DrawBase(context, zero, ChunkLayer.High, false, false);

                                     for (int index = 0; index < tilePiece.AnimatedPaletteIndexes.Count; index++)
                                     {
                                         var animatedPaletteIndex = tilePiece.AnimatedPaletteIndexes[index];
                                         tilePiece.DrawAnimatedPalette(context, zero, ChunkLayer.Low, false, false, animatedPaletteIndex);
                                         tilePiece.DrawAnimatedPalette(context, zero, ChunkLayer.High, false, false, animatedPaletteIndex);
                                     }


                                     for (int index = 0; index < tilePiece.AnimatedTileIndexes.Count; index++)
                                     {
                                         var animatedTileIndex = tilePiece.AnimatedTileIndexes[index];
                                         tilePiece.DrawAnimatedTile(context, zero, ChunkLayer.Low, false, false, animatedTileIndex);
                                         tilePiece.DrawAnimatedTile(context, zero, ChunkLayer.High, false, false, animatedTileIndex);
                                     }
                                 
                                      

                                 };

            scope.Watch("tilePiece", updateTilePiece);

            Window.SetInterval(() =>
                               {
/*
                                   if (tilePieceInfo == null) return;
                                   if (!tilePieceInfo.ShouldAnimate())
                                   {
                                       if (scope.ShouldAnimate)
                                       {
                                           updateTilePiece();
                                       }
                                       else
                                           scope.Digest();
                                   }
*/
                               }, 1000 / 60);
        }

    }
}