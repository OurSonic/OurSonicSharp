using System;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.UIManager
{
    public class EditorEngine
    {
        private EditorEnginePoint[] points;
        [IntrinsicProperty]
        public bool Editing { get; set; }
        [IntrinsicProperty]
        public Element Element { get; set; }
        [IntrinsicProperty]
        public bool Dragging { get; set; }
        [IntrinsicProperty]
        private Point StartDragging { get; set; }
        [IntrinsicProperty]
        private Point dragg { get; set; }

        public EditorEngine(Element el)
        {
            Element = el;
            points = new EditorEnginePoint[] {
                                                     new EditorEnginePoint(0, 0, 10, "nw-resize", (dv) => {
                                                                                                      var x = dv.X;
                                                                                                      var y = dv.Y;
                                                                                                      Element.Width += x;
                                                                                                      Element.Height += y;
                                                                                                      Element.X -= x;
                                                                                                      Element.Y -= y;
                                                                                                      Element.ClearCache();
                                                                                                  }),
                                                     new EditorEnginePoint(100, 0, 10, "ne-resize", (dv) => {
                                                                                                        var x = dv.X;
                                                                                                        var y = dv.Y;
                                                                                                        Element.Width -= x;
                                                                                                        Element.Height += y;
                                                                                                        Element.Y -= y;
                                                                                                        Element.ClearCache();
                                                                                                        dv.X = 0;
                                                                                                    }),
                                                     new EditorEnginePoint(100, 100, 10, "se-resize", (dv) => {
                                                                                                          var x = dv.X;
                                                                                                          var y = dv.Y;
                                                                                                          Element.Width -= x;
                                                                                                          Element.Height -= y;
                                                                                                          Element.ClearCache();
                                                                                                          dv.X = dv.Y = 0;
                                                                                                      }),
                                                     new EditorEnginePoint(0, 100, 10, "sw-resize", (dv) => {
                                                                                                        var x = dv.X;
                                                                                                        var y = dv.Y;
                                                                                                        Element.Width += x;
                                                                                                        Element.Height -= y;
                                                                                                        Element.X -= x;
                                                                                                        Element.ClearCache();
                                                                                                        dv.Y = 0;
                                                                                                    }),
                                                     new EditorEnginePoint(50, 0, 5, "n-resize", (dv) => {
                                                                                                     var x = dv.X;
                                                                                                     var y = dv.Y;
                                                                                                     Element.Height += y;
                                                                                                     Element.Y -= x;
                                                                                                     Element.ClearCache();
                                                                                                 }),
                                                     new EditorEnginePoint(100, 50, 5, "e-resize", (dv) => {
                                                                                                       var x = dv.X;
                                                                                                       var y = dv.Y;
                                                                                                       Element.Width -= y;
                                                                                                       Element.ClearCache();
                                                                                                       dv.X = dv.Y = 0;
                                                                                                   }),
                                                     new EditorEnginePoint(50, 100, 5, "n-resize", (dv) => {
                                                                                                       var x = dv.X;
                                                                                                       var y = dv.Y;
                                                                                                       Element.Height -= y;
                                                                                                       Element.ClearCache();
                                                                                                       dv.X = dv.Y = 0;
                                                                                                   }),
                                                     new EditorEnginePoint(0, 50, 5, "e-resize", (dv) => {
                                                                                                     var x = dv.X;
                                                                                                     var y = dv.Y;
                                                                                                     Element.Width += x;
                                                                                                     Element.X -= x;
                                                                                                     Element.ClearCache();
                                                                                                 }),
                                             };
        }

        public bool Click(Pointer e)
        {
            var x = 0;
            var y = 0;
            var w = Element.Width;
            var h = Element.Height;

            //uiManager.propertyList.populate(this.Element);

            for (var i = 0; i < points.Length; i++) {
                var j = points[i];
                j.Editing = false;
            }

            for (var i = 0; i < points.Length; i++) {
                var j = points[i];
                var sz = j.Size * 5;

                var rect = new Rectangle(x + ( w * j.X / 100 ) - sz / 2, y + ( h * j.Y / 100 ) - sz / 2, sz, sz);

                if (e.X > rect.X && e.X < rect.X + rect.Width && e.Y > rect.Y && e.Y < rect.Y + rect.Height) {
                    Document.Body.Style.Cursor = j.Cursor;
                    StartDragging = new Point(e.X, e.Y);
                    Editing = true;
                    j.Editing = true;
                    return true;
                }
            }

            if (e.X > x && e.X < x + w && e.Y > y && e.Y < y + h) {
                dragg = new Point(e.X, e.Y);
                Document.Body.Style.Cursor = "move";
                Dragging = true;
                return false;
            } else
                Document.Body.Style.Cursor = "default";
            return false;
        }

        public bool MouseUp(Pointer e)
        {
            for (var i = 0; i < points.Length; i++) {
                var j = points[i];
                j.Editing = false;
            }
            Editing = false;
            Dragging = false;
            StartDragging = null;
            dragg = null;
            return false;
        }

        public bool MouseOver(Pointer e)
        {
            var x = 0;
            var y = 0;
            var w = Element.Width;
            var h = Element.Height;

            Document.Body.Style.Cursor = "move";
            if (Dragging) {
/*
                if (this.Element.ChildrenAreEditing())
                {
                    return false;
                }
*/
                var jx = e.X - dragg.X;
                var jy = e.Y - dragg.Y;
                Element.X += jx;
                Element.Y += jy;

                /*   window.DEBUGLABELS[0] = "E: " + e.X + " " + e.Y;
                   window.DEBUGLABELS[1] = "Dragg: " + this.dragg.X + " " + this.dragg.Y;
                   window.DEBUGLABELS[2] = "Element: " + this.Element.X + " " + this.Element.Y;
                   window.DEBUGLABELS[3] = "Offset: " + jx + " " + jy;*/
                //this.dragg.x += jx;
                //this.dragg.y += jy;

                return false;
            }
            for (var i = 0; i < points.Length; i++) {
                var j = points[i];
                var sz = j.Size * 5;

                if (j.Editing) {
                    Document.Body.Style.Cursor = j.Cursor;
                    var dv = new Point(StartDragging.X - e.X, StartDragging.Y - e.Y);

                    j.Click(dv);
                    StartDragging = new Point(e.X + dv.X, e.Y + dv.Y);
                    return true;
                }

                var rect = new Rectangle(x + ( w * j.X / 100 ) - sz / 2, y + ( h * j.Y / 100 ) - sz / 2, sz, sz);

                if (e.X > rect.X && e.X < rect.X + rect.Width && e.Y > rect.Y && e.Y < rect.Y + rect.Height) {
                    Document.Body.Style.Cursor = j.Cursor;

                    if (j.Editing) {
                        var dv = new Point(StartDragging.X - e.X, StartDragging.Y - e.Y);

                        j.Click(dv);
                        StartDragging = new Point(e.X + dv.X, e.Y + dv.Y);
                    }
                    return true;
                }
            }

            StartDragging = new Point(e.X, e.Y);
            return Editing;
            return false;
        }

        public void Draw(CanvasContext2D canv)
        {
            canv.Save();
            var size = 0;
            canv.StrokeStyle = canv.FillStyle = "white";
            canv.LineWidth = 3;

            canv.Me().dashedRect(Element.TotalX - size, Element.TotalY - size, Element.Width + size * 2, Element.Height + size * 2,
                                 new int[] {2, 2});

            //canv.strokeRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2);

            var x = Element.TotalX;
            var y = Element.TotalY;
            var w = Element.Width;
            var h = Element.Height;

            for (var i = 0; i < points.Length; i++) {
                var j = points[i];
                canv.FillRect(x + ( w * j.X / 100 ) - j.Size / 2, y + ( h * j.Y / 100 ) - j.Size / 2, j.Size, j.Size);
            }

            canv.Restore();
        }

        public int MaxSize()
        {
            return 10;
        }
    }
    [Serializable]
    public class EditorEnginePoint
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Size { get; set; }
        public string Cursor { get; set; }
        public Action<Point> Click { get; set; }
        public bool Editing { get; set; }

        public EditorEnginePoint(int x, int y, int size, string cursor, Action<Point> click)
        {
            X = x;
            Y = y;
            Size = size;
            Cursor = cursor;
            Click = click;
        }
    }
}