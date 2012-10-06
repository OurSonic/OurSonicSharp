using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class UIArea<T> : UIArea
    {
        public T Data { get; set; }

        public UIArea(T data, int x, int y, int width, int height) : base(x, y, width, height)
        {
            Data = data;
        }
    }
    public class UIArea : Panel
    {
        private bool myClosable;
        [IntrinsicProperty]
        public Point Dragging { get; set; }
        [IntrinsicProperty]
        public bool Closable { get; set; }

        public UIArea(int x, int y, int width, int height)
                : base(x, y, width, height)
        {
            Closable = true;
            Outline = false;
        }

        public override T AddControl<T>(T element)
        {
            var fm = base.AddControl(element);

            fm.Construct();

            return fm;
        }

        public override void Construct()
        {
            if (Closable) {
                AddControl(new Button(Width - 30, 4, 26, 23, "X") {
                                                                          Font = UIManager.ButtonFont,
                                                                          Color = "Green",
                                                                          Click = (p) => {
                                                                                      LoseFocus();
                                                                                      Visible = false;
                                                                                  }
                                                                  });
            }

            base.Construct();
        }

        public override bool OnClick(Pointer e)
        {
            var @base = base.OnClick(e);

            if (!@base && !IsEditMode())
                Dragging = new Point(e.X, e.Y);
            return @base;
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;
            canv.Save();

            if (CachedDrawing.Falsey()) {
                var cg = Help.DefaultCanvas(Width + 20, Height + 20);
                var cv = cg.Context;
                cv.Translate(10, 10);

                var lingrad = cv.CreateLinearGradient(0, 0, 0, Height);
                lingrad.AddColorStop(0, "rgba(220,220,220,0.85)");
                lingrad.AddColorStop(1, "rgba(142,142,142,0.85)");

                cv.FillStyle = lingrad;
                cv.StrokeStyle = "#333";
                var xy = new Point(X, Y);

                X = 0;
                Y = 0;

                var rad = 30;
                Help.RoundRect(cv, X, Y, Width, Height, rad, true, true);

                cv.BeginPath();
                cv.MoveTo(X, Y + rad);
                cv.LineTo(X + Width, Y + rad);
                cv.LineWidth = 2;
                cv.StrokeStyle = "#000000";
                cv.Stroke();

                foreach (Element t1 in Controls) {
                    var good = t1.ForceDrawing();
                    if (good.Redraw)
                        t1.Draw(cv);
                }

                X = xy.X;
                Y = xy.Y;

                CachedDrawing = cg;
            }

            drawCache(canv);

            if (CachedDrawing.Canvas.Width != Width + 20 || CachedDrawing.Canvas.Height != Height + 20)
                CachedDrawing = null;

            for (int index = 0; index < Controls.Count; index++) {
                Element t = Controls[index];
                var good = t.ForceDrawing();
                if (!good.Redraw)
                    t.Draw(canv);
                if (good.ClearCache)
                    CachedDrawing = null;
            }
            canv.Restore();

            base.Draw(canv);
        }

        private void drawCache(CanvasContext2D canv)
        {
            canv.DrawImage(CachedDrawing.Canvas, X - 10, Y - 10);
        }
    }
}