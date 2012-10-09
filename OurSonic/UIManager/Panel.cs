using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class Panel<T> : Panel
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public Panel(T data, int x, int y, int width, int height)
                : base(x, y, width, height)
        {
            Data = data;
        }
    }
    public class Panel : Element
    {
        [IntrinsicProperty]
        public List<Element> Controls { get; set; }
        [IntrinsicProperty]
        public bool Outline { get; set; }

        public Panel(int x, int y, int width, int height)
                : base(x, y)
        {
            Outline = true;
            Width = width;
            Height = height;
            Controls = new List<Element>();
        }

        public void Clear()
        {
            Controls.Clear();
        }

        public bool ChildrenAreEditing()
        {
            var ch = Controls;
            for (int index = 0; index < ch.Count; index++) {
                Element t = ch[index];
                if (t.EditorEngine.Dragging.Truthy() || t.EditorEngine.Editing)
                    return true;
                if (t is Panel && ( (Panel) t ).ChildrenAreEditing())
                    return true;
            }
            return false;
        }

        public override void Focus(Pointer e)
        {
            var e2 = new Pointer(0, 0);
            var ch = Controls;
            for (int index = 0; index < ch.Count; index++) {
                Element t = ch[index];
                if (t.Visible && t.Y <= e.Y && t.Y + t.Height > e.Y && t.X <= e.X && t.X + t.Width > e.X) {
                    e2.X = e.X - t.X;
                    e2.Y = e.Y - t.Y;
                    t.Focus(e2);
                }
            }
            base.Focus(e);
        }

        public override void LoseFocus()
        {
            var ch = Controls;
            for (int index = 0; index < ch.Count; index++) {
                Element t = ch[index];
                t.LoseFocus();
            }
            base.LoseFocus();
        }

        public override void Construct()
        {
            base.Construct();
            for (int index = 0; index < Controls.Count; index++) {
                var element = Controls[index];
                element.Construct();
            }
        }

        public override bool OnKeyDown(ElementEvent e)
        {
            base.OnKeyDown(e);
            if (!Visible) return false;

            var ch = Controls;
            for (int index = 0; index < ch.Count; index++) {
                Element t = ch[index];
                if (t.OnKeyDown(e)) return true;
            }
            return false;
        }

        public override bool OnClick(Pointer e)
        {
            var e2 = new Pointer(0, 0);

            if (!Visible) return false;
            var clicked = false;

            var ch = Controls;
            for (int index = 0; index < ch.Count; index++) {
                Element control = ch[index];
                if (control.Visible && control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X && control.X + control.Width > e.X) {
                    e2.X = e.X - control.X;
                    e2.Y = e.Y - control.Y;
                    control.Focus(e2);
                    control.OnClick(e2);
                    clicked = true;
                } else
                    control.LoseFocus();
            }

            if (!clicked && !IsEditMode() && this is UIArea)
                ( (UIArea) this ).Dragging = new Point(e.X, e.Y);
            return clicked;
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (!Visible) return false;
            Point dragging = null;
            var uiArea = this as UIArea;
            if (uiArea != null)
                dragging = uiArea.Dragging;

            if (dragging == null) {
                for (int index = 0; index < Controls.Count; index++) {
                    var control = Controls[index];
                    if (control.Visible &&
                        ( ( control.EditorEngine.Editing ) ||
                          ( control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X && control.X + control.Width > e.X ) )) {
                        e.X -= control.X;
                        e.Y -= control.Y;
                        control.OnMouseOver(e);
                        return true;
                    }
                }

                return true;
            }

            X += e.X - dragging.X;
            Y += e.Y - dragging.Y;
            //this.onMove(); 

            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;

            for (var ij = 0; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                control.OnMouseUp(new Pointer(e.X - control.X, e.Y - control.Y));
            }
            var uiArea = this as UIArea;
            if (uiArea != null)
                uiArea.Dragging = null;

            return base.OnMouseUp(e);
        }

        public override bool OnScroll(Pointer e)
        {
            if (!Visible) return false;
            for (int index = 0; index < Controls.Count; index++) {
                var control = Controls[index];
                if (control.Visible &&
                    ( ( control.EditorEngine.Editing ) ||
                      ( control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X && control.X + control.Width > e.X ) )) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    return control.OnScroll(e);
                }
            }
            return base.OnScroll(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;
            var _x = X;
            var _y = Y;
            canv.Save();

            if (Outline) {
                var lingrad = canv.CreateLinearGradient(0, 0, 0, Height);
                lingrad.AddColorStop(0, "rgba(220,220,220,0.85)");
                lingrad.AddColorStop(1, "rgba(142,142,142,0.85)");

                canv.FillStyle = lingrad;
                canv.StrokeStyle = "#333";

                var rad = 5;
                Help.RoundRect(canv, TotalX, TotalY, Width, Height, rad, true, true);
            }

            for (int index = 0; index < Controls.Count; index++) {
                var t = Controls[index];
                t.Draw(canv);
            }
            X = _x;
            Y = _y;
            canv.Restore();

            base.Draw(canv);
        }

        public virtual T AddControl<T>(T element) where T : Element
        {
            element.Parent = this;

            element.Construct();

            Controls.Add(element);
            return element;
        }
    }
}