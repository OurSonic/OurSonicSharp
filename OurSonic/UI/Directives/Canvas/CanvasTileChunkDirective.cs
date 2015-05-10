



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
    public class CanvasTileChunkDirective
    {
        public const string Name = "canvasTileChunk";
        public Action<CanvasTileChunkScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasTileChunkDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas>";
            replace = true;
            transclude = true;
            scope = new
            {
                tileChunk = "=",
                width = "=",
                shouldAnimate = "=",
                height = "=",
                debugDrawOptions = "=",
                drawOptions = "=",
                edit = "="
            };
            link = LinkFn;
        }

        private void LinkFn(CanvasTileChunkScope scope, jQueryObject element, dynamic attr)
        {
            element.Width(scope.Width);
            element.Height(scope.Height);
            if (scope.Edit)
            {
                element.Click(ev =>
                              {
                                  if (scope.TileChunk == null) return;
                                  var x = ev.OffsetX;
                                  var y = ev.OffsetY;


                                  var _x = (int)(x / ((double)scope.Width / TileChunk.Size));
                                  var _y = (int)(y / ((double)scope.Height / TileChunk.Size));

                                  scope.DebugDrawOptions.OutlineTilePiece = scope.TileChunk.GetTilePieceInfo(_x, _y, true);

                              });
            }
            var context = (CanvasRenderingContext2D)((CanvasElement)element[0]).GetContext(CanvasContextId.Render2D);
            Action updateTileChunk = () =>
                                 {
                                     if (scope.TileChunk == null) return;
                                     var drawOptions = scope.DrawOptions ?? DefaultDrawOptions;

                                     context.Canvas.Width = context.Canvas.Width;

                                     context.Me().webkitImageSmoothingEnabled = false;
                                     context.Me().mozImageSmoothingEnabled = false;
                                     context.Me().imageSmoothingEnabled = false;

                                     context.Scale(scope.Width / ((double)TileChunk.Size), scope.Height / ((double)TileChunk.Size));
                                     if (drawOptions.ShowLowLayer && !scope.TileChunk.OnlyForeground())
                                         scope.TileChunk.Draw(context, new Point(0, 0), ChunkLayer.Low);
                                     if (drawOptions.ShowHighLayer && !scope.TileChunk.OnlyBackground())
                                         scope.TileChunk.Draw(context, new Point(0, 0), ChunkLayer.High);

                                     if (scope.DebugDrawOptions != null)
                                     {
                                         if (drawOptions.ShowLowLayer && !scope.TileChunk.OnlyForeground())
                                             scope.TileChunk.DrawAnimationDebug(context, new Point(0, 0), ChunkLayer.Low, scope.DebugDrawOptions);
                                         if (drawOptions.ShowHighLayer && !scope.TileChunk.OnlyBackground())
                                             scope.TileChunk.DrawAnimationDebug(context, new Point(0, 0), ChunkLayer.High, scope.DebugDrawOptions);
                                     }
                                 };

            scope.Watch("tileChunk", updateTileChunk);
            scope.Watch("drawOptions", updateTileChunk, true);
            scope.Watch("debugDrawOptions", updateTileChunk, true);
            scope.Watch("tileChunk.currentTileAnimationFrameIndexCache", updateTileChunk, true);
            scope.Watch("tileChunk.currentPaletteAnimationFrameIndexCache", updateTileChunk, true);

            Window.SetInterval(() =>
                               {
                                   if (scope.TileChunk == null) return;
                                   if (!scope.TileChunk.NeverAnimates())
                                   {
                                       if (scope.ShouldAnimate)
                                       {
                                           updateTileChunk();
                                       }
                                       else
                                           scope.Digest();
                                   }
                               }, 1000 / 60);
        }

        public static TileChunkDrawOptions DefaultDrawOptions = new TileChunkDrawOptions() { ShowHighLayer = true, ShowLowLayer = true };
    }
}


//https://www.youtube.com/watch?v=NLy4cvRx7Vc

