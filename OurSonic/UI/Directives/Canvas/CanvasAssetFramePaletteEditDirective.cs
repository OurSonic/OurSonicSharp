using System;
using System.Html;
using System.Html.Media.Graphics;
using jQueryApi;
using OurSonic.UI.Scope.Directive;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class CanvasAssetFramePaletteEditDirective
    {
        public const string Name = "canvasAssetFramePaletteEdit";
        public Action<CanvasAssetFramePaletteEditScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasAssetFramePaletteEditDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas>";
            replace = true;
            transclude = true;
            scope = new
                    {
                        frame = "=",
                        selectedPaletteIndex = "=",
                        showCurrent = "=",
                        width = "=",
                        edit = "=",
                        height = "=",
                        wide = "=",
                    };
            link = LinkFn;
        }

        private void LinkFn(CanvasAssetFramePaletteEditScope scope, jQueryObject element, dynamic attr)
        {
            var paletteCanvas = ((CanvasElement)element[0]);
            paletteCanvas.Width = scope.Width;
            paletteCanvas.Height = scope.Height;

            element.MouseDown((e) =>
                              {
                                  if (scope.Edit)
                                  {
                                      var f = (int)Math.Ceiling(scope.Frame.Palette.Length / 2.0);


                                      var x = e.OffsetX;
                                      var y = e.OffsetY;


                                      if (scope.Wide)
                                      {

                                          var _x = (int)(x / (scope.Width / (double)(f + (scope.ShowCurrent ? 2 : 0))));
                                          var _y = (int)(y / (scope.Height / (double)2));
                                          if (scope.Frame.Palette[_y * f + _x] != null)
                                          {
                                              scope.SelectedPaletteIndex = _y * f + _x;
                                          }
                                      }
                                      else
                                      {

                                          var _x = (int)(x / (scope.Width / (double)2));
                                          var _y = (int)(y / (scope.Height / (double)(f + (scope.ShowCurrent ? 2 : 0))));
                                          if (scope.Frame.Palette[_y * 2 + _x] != null)
                                          {
                                              scope.SelectedPaletteIndex = _y * 2 + _x;
                                          }
                                      }
                                  }
                              });

            var paletteContext = (CanvasRenderingContext2D)paletteCanvas.GetContext(CanvasContextId.Render2D);
            if (scope.ShowCurrent)
            {
                scope.SelectedPaletteIndex = 0;

            }


            Action updateFrame = () =>
                                 {
                                     paletteContext.Canvas.Width = paletteContext.Canvas.Width;
                                     paletteContext.Me().webkitImageSmoothingEnabled = false;
                                     paletteContext.Me().mozImageSmoothingEnabled = false;
                                     paletteContext.Me().imageSmoothingEnabled = false;


                                     var palette = scope.Frame.Palette;


                                     var canv = paletteContext;


                                     canv.Save();
                                     var f = (int)Math.Ceiling(palette.Length / 2.0);

                                     if (scope.Wide)
                                     {
                                         canv.Scale(scope.Width / (double)(f + (scope.ShowCurrent ? 2 : 0)), scope.Height / (double)2);

                                         for (var h = 0; h < 2; h++)
                                         {
                                             for (var w = 0; w < f; w++)
                                             {
                                                 if (palette[w + h * f] != null)
                                                 {
                                                     canv.FillStyle = palette[w + h * f];
                                                     canv.FillRect(w, h, 1, 1);
                                                 }
                                             }
                                         }
                                         if (scope.ShowCurrent)
                                         {
                                             canv.FillStyle = palette[scope.SelectedPaletteIndex];
                                             canv.FillRect(f, 0, 1 * 2, 1 * 2);
                                         }
                                     }
                                     else
                                     {
                                         canv.Scale(scope.Width / (double)2, scope.Height / (double)(f + (scope.ShowCurrent ? 2 : 0)));

                                         for (var h = 0; h < f; h++)
                                         {
                                             for (var w = 0; w < 2; w++)
                                             {
                                                 if (palette[w + h * 2] != null)
                                                 {
                                                     canv.FillStyle = palette[w + h * 2];
                                                     canv.FillRect(w, h, 1, 1);
                                                 }
                                             }
                                         }
                                         if (scope.ShowCurrent)
                                         {
                                             canv.FillStyle = palette[scope.SelectedPaletteIndex];
                                             canv.FillRect(0, f, 1 * 2, 1 * 2);
                                         }
                                     }

                                     canv.Restore();
                                 };
            scope.Watch("frame", updateFrame);
            scope.Watch("frame.palette", updateFrame);
            scope.Watch("selectedPaletteIndex", updateFrame);
        }
    }
}