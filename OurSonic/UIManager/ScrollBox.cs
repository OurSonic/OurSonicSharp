using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class ScrollBox : Element
    {
        [IntrinsicProperty]
        public int ItemWidth { get; set; }
        [IntrinsicProperty]
        public int ScrollWidth { get; set; }
        [IntrinsicProperty]
        public int JHeight { get; set; }
        [IntrinsicProperty]
        public int VisibleItems { get; set; }
        [IntrinsicProperty]
        public int ItemHeight { get; set; }
        [IntrinsicProperty]
        public string BackColor { get; set; }
        [IntrinsicProperty]
        public int ScrollIndex { get; set; }
        [IntrinsicProperty]
        public int ScrollPosition { get; set; }
        [IntrinsicProperty]
        public bool Dragging { get; set; }
        [IntrinsicProperty]
        public List<Element> Controls { get; set; }
        [IntrinsicProperty]
        protected bool Scrolling { get; set; }

        public ScrollBox(int x, int y, int itemHeight, int visibleItems, int itemWidth)
                : base(x, y)
        {
            ItemWidth = itemWidth;
            ScrollWidth = 14;
            VisibleItems = visibleItems;
            ItemHeight = itemHeight;
            BackColor = "";
            JHeight = 5;
            Controls = new List<Element>();
        }

        public override void Construct()
        {
            Height = VisibleItems * ( ItemHeight + JHeight );
            Width = ItemWidth + ScrollWidth;
            Scrolling = false;
        }

        public T AddControl<T>(T control) where T : Element
        {
            control.Parent = this;
            control.Construct();
            Controls.Add(control);
            return control;
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible) return false;
            for (var ij = ScrollIndex; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X + 2 <= e.X && control.X + control.Width + 2 > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnClick(e);
                    return true;
                }
            }

            if (e.X > ItemWidth && e.X < ItemWidth + ScrollWidth) {
                var height = VisibleItems * ( ItemHeight + JHeight ) - 2;
                ScrollIndex = ( e.Y / height ) * ( Controls.Count - VisibleItems );

                ScrollIndex = Math.Min(Math.Max(ScrollIndex, 0), Controls.Count);
            }
            Dragging = true;
            return base.OnClick(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;
            Dragging = false;

            for (var ij = ScrollIndex; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X + 2 && control.X + control.Width + 2 > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnMouseUp(e);
                    return true;
                }
            }

            if (MouseUp != null) MouseUp(new Point(e.X, e.Y));
            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (!Visible) return false;
            foreach (var control in Controls) {
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X + 2 <= e.X && control.X + control.Width + 2 > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnMouseOver(e);
                    break;
                }
            }
            if (Dragging && e.X > ItemWidth && e.X < ItemWidth + ScrollWidth) {
                var height = VisibleItems * ( ItemHeight + JHeight ) - 2;
                ScrollIndex = (int) ( ( (double) e.Y / height ) * ( Controls.Count - VisibleItems ) );

                ScrollIndex = Math.Min(Math.Max(ScrollIndex, 0), Controls.Count);
            }
            if (MouseOver != null) MouseOver(new Point(e.X, e.Y));
            return base.OnMouseOver(e);
        }

        public override bool OnScroll(Pointer e)
        {
            if (!Visible) return false;

            if (e.Delta > 0) {
                if (ScrollIndex > 0)
                    ScrollIndex--;
            } else {
                if (ScrollIndex < Controls.Count - VisibleItems)
                    ScrollIndex++;
            }
            foreach (var control in Controls.Array()) {
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X && control.X + control.Width > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    return true;
                }
            }
            //if (this.scroll) this.scroll();
            return true;
        }

        public override void Draw(CanvasRenderingContext2D canv)
        {
            if (!Visible) return;

            canv.Save();

            canv.FillStyle = BackColor;

            var height = VisibleItems * ( ItemHeight + JHeight ) - 2;

            canv.FillStyle = BackColor;
            canv.LineWidth = 1;
            canv.StrokeStyle = "#333";
            Help.RoundRect(canv, TotalX, TotalY, ItemWidth + ScrollWidth + 6, VisibleItems * ( ItemHeight + JHeight ), 3, true, true);

            canv.FillStyle = "grey";
            canv.LineWidth = 1;
            canv.StrokeStyle = "#444";
            canv.FillRect(TotalX + ItemWidth + 2 + 2, TotalY + 2, ScrollWidth, Height);

            canv.FillStyle = "FFDDFF";
            canv.LineWidth = 1;
            canv.StrokeStyle = "#FFDDFF";
            ScrollPosition = height * ScrollIndex / ( Controls.Count - VisibleItems );

            canv.FillRect(TotalX + ItemWidth + 2 + 2 + 2, TotalY + 2 + ( ScrollPosition ), ScrollWidth - 2, 5);

            var curY = 3;
            for (var i = ScrollIndex; i < Math.Min(Controls.Count, ScrollIndex + VisibleItems); i++) {
                Controls[i].Parent = this;
                Controls[i].X = 2;
                Controls[i].Y = curY;
                Controls[i].Height = ItemHeight;
                Controls[i].Width = ItemWidth;

                curY += ItemHeight + JHeight;
                Controls[i].Draw(canv);
            }
            canv.Restore();

            base.Draw(canv);
        }

        public void ClearControls()
        {
            Controls = new List<Element>();
        }
    }
}