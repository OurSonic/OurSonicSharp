using System;
using System.Collections.Generic;
using System.Html;
using System.Text;
using jQueryApi;
using OurSonic.UI.Scope.Directive;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class FloatingWindowDirective
    {
        public const string Name = "floatingWindow";
        private static Dictionary<jQueryObject, FloatingWindowScope> items = new Dictionary<jQueryObject, FloatingWindowScope>();

//        private readonly UIManagerService myUIManagerService;
        public Action<FloatingWindowScope, jQueryObject, dynamic> link;
        private jQueryObject myElement;
        private FloatingWindowScope myScope;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string templateUrl;
        public bool transclude;

        public FloatingWindowDirective(/*UIManagerService uiManagerService*/)
        {
//            myUIManagerService = uiManagerService;
            restrict = "EA";
            templateUrl = string.Format("{0}partials/floatingWindow.html", Constants.ContentAddress);
            replace = true;
            transclude = true;
            scope = new
            {
                width = "=",
                height = "=",
                left = "=",
                top = "=",
                windowTitle = "=",
                visible = "=",
                onclose = "&",
            };
            link = LinkFn;
        }

        private void LinkFn(FloatingWindowScope scope, jQueryObject element, dynamic attr)
        {
            myElement = element;
            myScope = scope;
            items.Add(element, scope);

            element.Click((elem, @event) => Focus());

            scope.Parent.SwingAway = (a, b, c) => { SwingAway(a, b, element, c); };
            scope.Parent.SwingBack = (c) => { SwingBack(scope, element, c); };
            scope.Parent.Minimize = () =>
            {
                scope.Parent.Minimized = true;
                scope.Minimize();
            };
            scope.Parent.DestroyWindow = () =>
            {
                scope.Destroy();
                element.Remove();
            };


            scope.PositionStyles = new FloatingWindowPosition() { Left = scope.Left, Top = scope.Top, Display = "block" };
            scope.PositionStyles.ZIndex = 10000;

            if (scope.Left.IndexOf("%") != -1)
            {
                scope.PositionStyles.MarginLeft = (-(int.Parse(scope.Width.Replace("px", "")) / 2)) + "px";
            }
            if (scope.Top.IndexOf("%") != -1)
            {
                scope.PositionStyles.MarginTop = (-(int.Parse(scope.Height.Replace("px", "")) / 2)) + "px";
            }


            scope.SizeStyle = new Size() { Width = scope.Width, Height = scope.Height, };
            scope.Maximize = () =>
            {
                if (!scope.IsMaximized)
                {
                    scope.LastPositionStyles = scope.PositionStyles;
                    scope.LastSizeStyle = scope.SizeStyle;
                    scope.PositionStyles = new FloatingWindowPosition()
                    {
                        Left = "0",
                        Top = "0",
                        Display = "block"
                    };
                    scope.SizeStyle = new Size() { Width = "100%", Height = "100%", };
                }
                else
                {
                    scope.PositionStyles = scope.LastPositionStyles;
                    scope.SizeStyle = scope.LastSizeStyle;
                    scope.LastPositionStyles = null;
                    scope.LastSizeStyle = null;
                }

                scope.IsMaximized = !scope.IsMaximized;
            };
            scope.Close = () =>
            {
                if (scope.OnClose != null)
                {
                    scope.OnClose();
                }
                if (scope.Parent.OnClose != null)
                {
                    scope.Parent.OnClose();
                }
                //todo destroy
                scope.PositionStyles.Display = "none";
            };
            scope.Minimize = () =>
            {
//                myUIManagerService.OnMinimize(scope);
                scope.Parent.SwingAway(SwingDirection.Bottom,
                    false,
                    () => { scope.PositionStyles.Display = "none"; });
            };
            scope.Restore = () =>
            {
                scope.Parent.SwingBack(null);
                scope.PositionStyles.Display = "block";
            };
            Focus();

            if (scope.Parent.OnReady != null)
                scope.Parent.OnReady();
        }

        private void Focus()
        {
            foreach (var floatingWindowScope in items)
            {
                floatingWindowScope.Value.PositionStyles.ZIndex = 10000;
            }
            if (items.ContainsKey(myElement))
            {
                items[myElement].PositionStyles.ZIndex = 10001;
                if (myScope.Root.Phase == null)
                    myScope.Apply();
            }
        }

        public void SwingBack(FloatingWindowScope scope, jQueryObject element, Action callback)
        {
            Window.SetTimeout(() =>
            {
                var js = new JsDictionary<string, object>();

                js["left"] = scope.Left;
                js["top"] = scope.Top;
                element.CSS("display", "block");

                element.Animate(js, EffectDuration.Fast, EffectEasing.Swing, callback);

            }, 1);
        }

        public void SwingAway(SwingDirection direction, bool simulate, jQueryObject element, Action callback)
        {
            var js = new JsDictionary<string, object>();

            string distance = "3000";

            switch (direction)
            {
                case SwingDirection.TopLeft:
                    js["left"] = "-" + distance + "px";
                    js["top"] = "-" + distance + "px";
                    break;
                case SwingDirection.Top:
                    js["top"] = "-" + distance + "px";
                    break;
                case SwingDirection.TopRight:
                    js["left"] = distance + "px";
                    js["top"] = "-" + distance + "px";
                    break;
                case SwingDirection.Right:
                    js["left"] = distance + "px";
                    break;
                case SwingDirection.BottomRight:
                    js["left"] = distance + "px";
                    js["top"] = distance + "px";
                    break;
                case SwingDirection.Bottom:
                    js["top"] = distance + "px";
                    break;
                case SwingDirection.BottomLeft:
                    js["left"] = "-" + distance + "px";
                    js["top"] = distance + "px";
                    break;
                case SwingDirection.Left:
                    js["left"] = distance + "px";
                    break;
            }

            if (simulate)
            {
                element.CSS(js);
                element.CSS("display", "none");
                if (callback != null)
                {
                    callback();
                }
            }
            else element.Animate(js, EffectDuration.Slow, EffectEasing.Swing, () =>
            {
                element.CSS("display", "none");
                if (callback != null)
                {
                    callback();
                }
            });
        }
    }
}
