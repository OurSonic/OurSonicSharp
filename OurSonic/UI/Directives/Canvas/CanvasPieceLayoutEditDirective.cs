using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using jQueryApi;
using ng;
using OurSonic.Level.Objects;
using OurSonic.UI.Scope.Directive;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class CanvasPieceLayoutEditDirective
    {
        public const string Name = "canvasPieceLayoutEdit";
        public Action<CanvasPieceLayoutEditScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasPieceLayoutEditDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas>";
            replace = true;
            transclude = true;
            scope = new
            {
                pieceLayout = "=",
                objectData = "=",
                selectedPieceLayoutPiece = "=",
                showImages = "=",
                width = "=",
                scale = "=",
                height = "=",
            };
            link = LinkFn;
        }

        private void LinkFn(CanvasPieceLayoutEditScope scope, jQueryObject element, dynamic attr)
        {
            element.Width(scope.Width);
            element.Height(scope.Height);

            var mouseDown = false;
            var lastPosition = new FloatPoint(scope.Width / 2f, scope.Height / 2f);
            LevelObjectPieceLayoutPiece movingPiece = null;


            element.MouseDown((e) =>
                              {
                                  lastPosition.X = e.OffsetX;
                                  lastPosition.Y = e.OffsetY;
                                  mouseDown = true;



                                  var posX = (e.OffsetX - scope.ZeroPosition.X) / scope.Scale;
                                  var posY = (e.OffsetY - scope.ZeroPosition.Y) / scope.Scale;


                                  foreach (var levelObjectPieceLayoutPiece in scope.PieceLayout.Pieces)
                                  {

                                      LevelObjectPiece piece = scope.ObjectData.Pieces[levelObjectPieceLayoutPiece.PieceIndex];
                                      var asset = scope.ObjectData.Assets[piece.AssetIndex];
                                      if (asset.Frames.Count > 0)
                                      {
                                          var frm = asset.Frames[0];

                                          if (pointInArea(levelObjectPieceLayoutPiece.X - frm.OffsetX, levelObjectPieceLayoutPiece.Y - frm.OffsetY, 30, posX, posY))
                                          {
                                              movingPiece = levelObjectPieceLayoutPiece;
                                              scope.SelectedPieceLayoutPiece = movingPiece;


                                              lastPosition.X = posX;
                                              lastPosition.Y = posY;
                                              return;

                                          }
                                      }
                                  }


                              });

            element.MouseUp((e) =>
                            {

                                mouseDown = false;
                                movingPiece = null;
                            });

            element.MouseMove((e) => scope.Apply(() =>
                                                 {
                                                     if (!mouseDown) return;

                                                     var x = e.OffsetX;
                                                     var y = e.OffsetY;



                                                     if (movingPiece != null)
                                                     {

                                                         float posX = (e.OffsetX - scope.ZeroPosition.X) / scope.Scale;
                                                         float posY = (e.OffsetY - scope.ZeroPosition.Y) / scope.Scale;

                                                         if (Math.Abs((int)(posX - lastPosition.X)) > 0)
                                                         {
                                                             movingPiece.X += (int)(posX - lastPosition.X);
                                                             lastPosition.X = posX;
                                                         }
                                                         if (Math.Abs((int)(posY - lastPosition.Y)) > 0)
                                                         {
                                                             movingPiece.Y += (int)(posY - lastPosition.Y);
                                                             lastPosition.Y = posY;
                                                         }
                                                     }
                                                     else
                                                     {
                                                         scope.ZeroPosition.X += (int)(x - lastPosition.X);
                                                         scope.ZeroPosition.Y += (int)(y - lastPosition.Y);

                                                         lastPosition.X = e.OffsetX;
                                                         lastPosition.Y = e.OffsetY;
                                                     }
                                                 }));



            element[0].Style.Display = "inline-block";
            var context = (CanvasRenderingContext2D)((CanvasElement)element[0]).GetContext(CanvasContextId.Render2D);
            scope.Scale = 1;
            scope.ZeroPosition = new Point(0, 0);

            Action updatePieceLayout = () =>
            {
                context.Canvas.Width = context.Canvas.Width;

                context.Me().webkitImageSmoothingEnabled = false;
                context.Me().mozImageSmoothingEnabled = false;
                context.Me().imageSmoothingEnabled = false;

                context.FillStyle = "#FFFFFF";
                context.FillRect(0, 0, scope.Width, scope.Height);

                context.BeginPath();
                context.Rect(0, 0, scope.Width, scope.Height);
                context.Clip();
                context.ClosePath();

                context.Translate(scope.ZeroPosition.X, scope.ZeroPosition.Y);
                context.Scale(scope.Scale, scope.Scale);
                scope.PieceLayout.DrawUI(context, scope.ShowImages, scope.PieceLayout.Pieces.IndexOf(scope.SelectedPieceLayoutPiece), scope.ObjectData);
            };

            scope.Watch("pieceLayout", updatePieceLayout);
            scope.Watch("pieceLayout.pieces", updatePieceLayout, true);
            scope.Watch("scale", updatePieceLayout);
            scope.Watch("showImages", updatePieceLayout);
            scope.Watch("zeroPosition", updatePieceLayout, true);
            scope.Watch("selectedPieceLayoutPiece", updatePieceLayout);

        }

        private bool pointInArea(int x, int y, int rad, float posX, float posY)
        {
            return posX > x - rad && posY > y - rad && posX < x + rad && posY < y + rad;
        }
    }
}
