



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
    public class CanvasPieceAssetDirective
    {
        public const string Name = "canvasPieceAsset";
        public Action<CanvasPieceScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasPieceAssetDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas>";
            replace = true;
            transclude = true;
            scope = new
            {
                asset = "=",
                width = "=",
                height = "=",
                inline = "=",
            };
            link = LinkFn;
        }

        private void LinkFn(CanvasPieceScope scope, jQueryObject element, dynamic attr)
        {
            element.Width(scope.Width);
            element.Height(scope.Height);
            element[0].Style.Display = scope.Inline ? "inline-block" : "block";
            var context = (CanvasRenderingContext2D)((CanvasElement)element[0]).GetContext(CanvasContextId.Render2D);

            Action updateAsset = () =>
                                 {
                                     context.Canvas.Width = context.Canvas.Width;

                                     context.Me().webkitImageSmoothingEnabled = false;
                                     context.Me().mozImageSmoothingEnabled = false;
                                     context.Me().imageSmoothingEnabled = false;

                                     var levelObjectAssetFrames = scope.Asset.Frames;
                                     if (levelObjectAssetFrames.Count == 0) return;
                                     levelObjectAssetFrames[0].DrawSimple(context, new Point(0, 0), scope.Width, scope.Height, false, false);
                                 };

            scope.Watch("asset", updateAsset);
            scope.Watch("asset.frames", updateAsset);
            scope.Watch("asset.width", updateAsset);
            scope.Watch("asset.height", updateAsset);

        }
    }
}
