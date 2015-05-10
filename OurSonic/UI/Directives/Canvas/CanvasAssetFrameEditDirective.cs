using System;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using jQueryApi;
using OurSonic.UI.Scope.Directive;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class CanvasAssetFrameEditDirective
    {
        public const string Name = "canvasAssetFrameEdit";
        public Action<CanvasAssetFrameEditScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasAssetFrameEditDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas> ";
            replace = true;
            transclude = true;
            scope = new
            {
                frame = "=",
                width = "=",
                height = "=",
                edit = "=",
                editColor = "=",
                lineWidth = "=",
                editType = "=",
                editPaletteIndex = "=",
            };
            link = LinkFn;
        }

        private void LinkFn(CanvasAssetFrameEditScope scope, jQueryObject element, dynamic attr)
        {
            var frameCanvas = ((CanvasElement)element[0]);
            frameCanvas.Width = scope.Width;
            frameCanvas.Height = scope.Height;

            var mousedown = false;
            element.MouseDown((e) =>
            {
                mousedown = true;
            });
            element.MouseUp((e) =>
            {
                mousedown = false;
            });

            element.MouseMove((e) =>
                              {
                                  scope.Apply(() =>
                                              {
                                                  if (!mousedown) return;
                                                  if (scope.Edit)
                                                  {
                                                      var x = e.OffsetX;
                                                      var y = e.OffsetY;

                                                      var _x = (int)(x / ((double)scope.Width / scope.Frame.Width));
                                                      var _y = (int)(y / ((double)scope.Height / scope.Frame.Height));



                                                      var halfwidth = (scope.LineWidth / 2);
                                                      int[][] map;
                                                      int setValue;
                                                      switch (scope.EditType)
                                                      {
                                                          case AssetFrameEditType.ColorMap:
                                                              setValue = scope.EditPaletteIndex;
                                                              map = scope.Frame.ColorMap;
                                                              break;
                                                          case AssetFrameEditType.HurtMap:
                                                              setValue = scope.EditPaletteIndex;
                                                              map = scope.Frame.HurtSonicMap;
                                                              break;
                                                          case AssetFrameEditType.CollisionMap:
                                                              setValue = scope.EditPaletteIndex;
                                                              map = scope.Frame.CollisionMap;
                                                              break;
                                                          case AssetFrameEditType.Offset:
                                                              scope.Frame.OffsetX = _x;
                                                              scope.Frame.OffsetY = _y;
                                                              //special
                                                              return;
                                                          default:
                                                              throw new ArgumentOutOfRangeException();
                                                      }


                                                      if (scope.LineWidth == 1)
                                                      {

                                                          map[_x][_y] = setValue;
                                                      }
                                                      else
                                                      {
                                                          for (var k = -halfwidth; k < halfwidth; k++)
                                                          {
                                                              for (var c = -halfwidth; c < halfwidth; c++)
                                                              {
                                                                  map[Math.Min(Math.Max(0, _x + k), scope.Frame.Width)][Math.Min(Math.Max(0, _y + c), scope.Frame.Height)] = setValue;
                                                              }
                                                          }
                                                      }

                                                      scope.Frame.ClearCache();


                                                  }
 
                                              });
                              });



            var frameContext = (CanvasRenderingContext2D)frameCanvas.GetContext(CanvasContextId.Render2D);


            Action updateFrame = () =>
            {
                frameContext.Canvas.Width = frameContext.Canvas.Width;
                frameContext.Me().webkitImageSmoothingEnabled = false;
                frameContext.Me().mozImageSmoothingEnabled = false;
                frameContext.Me().imageSmoothingEnabled = false;
                frameContext.Scale((double)scope.Width / scope.Frame.Width, (double)scope.Height / scope.Frame.Height);

                scope.Frame.DrawUI(frameContext, new Point(0, 0), false, scope.EditType == AssetFrameEditType.CollisionMap, scope.EditType == AssetFrameEditType.HurtMap, scope.EditType == AssetFrameEditType.Offset, false, false);
            };
            scope.Watch("frame", updateFrame);
            scope.Watch("editType", updateFrame);
            scope.Watch("frame.width", updateFrame);
            scope.Watch("frame.height", updateFrame);
            scope.Watch("frame.offsetX", updateFrame);
            scope.Watch("frame.offsetY", updateFrame);

            scope.Watch("frame.hurtSonicMap", updateFrame, true);
            scope.Watch("frame.collisionMap", updateFrame, true);
            scope.Watch("frame.colorMap", updateFrame, true);
            scope.Watch("frame.palette", updateFrame, true);

            scope.Watch("editType", updateFrame);
        }
    }
    [NamedValues]
    public enum AssetFrameEditType
    {
        HurtMap,
        ColorMap,
        CollisionMap,
        Offset,
    }

}
