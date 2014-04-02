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
    public class CanvasPieceLayoutDirective
    {
        public const string Name = "canvasPieceLayout";
        public Action<CanvasPieceLayoutScope, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public CanvasPieceLayoutDirective()
        {
            restrict = "EA";
            template = "<canvas></canvas>";
            replace = true;
            transclude = true;
            scope = new
            {
                pieceLayout = "=",
                objectData = "=",
                width = "=",
                height = "=",
            };
            link = LinkFn;
        }

        private void LinkFn(CanvasPieceLayoutScope scope, jQueryObject element, dynamic attr)
        {
            element.Width(scope.Width);
            element.Height(scope.Height);
  
            element[0].Style.Display = "inline-block";
            var context = (CanvasRenderingContext2D)((CanvasElement)element[0]).GetContext(CanvasContextId.Render2D);
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
                if (scope.PieceLayout == null) return;

                var rect = scope.PieceLayout.GetRectangle(scope.ObjectData);

                context.Scale(scope.Width / ((double)rect.Width), scope.Height / ((double)rect.Height));
                context.Translate(-rect.X, -rect.Y);
                scope.PieceLayout.DrawUI(context, true, -1, scope.ObjectData);
            };

            scope.Watch("pieceLayout", updatePieceLayout);
            scope.Watch("pieceLayout.pieces", updatePieceLayout, true);
        }

        private bool pointInArea(int x, int y, int rad, float posX, float posY)
        {
            return posX > x - rad && posY > y - rad && posX < x + rad && posY < y + rad;
        }
    }
}
