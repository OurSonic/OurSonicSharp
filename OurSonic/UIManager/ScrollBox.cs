using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
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
        public int ScrollOffset { get; set; }
        [IntrinsicProperty]
        public int ScrollPosition { get; set; }
        [IntrinsicProperty]
        public bool Dragging { get; set; }
        [IntrinsicProperty]
        public List<Element> Controls { get; set; }
        [IntrinsicProperty]
        protected bool Scrolling { get; set; }

        public ScrollBox(int x, int y)
                : base(x, y)
        {
            ItemWidth = 10;
            ScrollWidth = 14;
            VisibleItems = 3;
            ItemHeight = 10;
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
            Controls.Add(control);
            return control;
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible) return false;
            for (var ij = ScrollOffset; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X + 2 <= e.X && control.X + control.Width + 2 > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnClick(e);
                    return false;
                }
            }

            if (e.X > ItemWidth && e.X < ItemWidth + ScrollWidth) {
                var height = VisibleItems * ( ItemHeight + JHeight ) - 2;
                ScrollOffset = ( e.Y / height ) * ( Controls.Count - VisibleItems );

                ScrollOffset = Math.Min(Math.Max(ScrollOffset, 0), Controls.Count);
            }
            Dragging = true;

            return false;
            return base.OnClick(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;
            Dragging = false;

            for (var ij = ScrollOffset; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X + 2 && control.X + control.Width + 2 > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnMouseUp(e);
                    return false;
                }
            }

            if (MouseUp != null) MouseUp();
            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (!Visible) return false;
            for (var ij = 0; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X + 2 <= e.X && control.X + control.Width + 2 > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnMouseOver(e);
                    break;
                }
            }
            if (Dragging && e.X > ItemWidth && e.X < ItemWidth + ScrollWidth) {
                var height = VisibleItems * ( ItemHeight + JHeight ) - 2;
                ScrollOffset = (int) ( ( (double) e.Y / height ) * ( Controls.Count - VisibleItems ) );

                ScrollOffset = Math.Min(Math.Max(ScrollOffset, 0), Controls.Count);
            }
            if (MouseOver != null) MouseOver();
            return base.OnMouseOver(e);
        }

        public override bool OnScroll(Pointer e)
        {
            if (!Visible) return false;

            if (e.Delta > 0) {
                if (ScrollOffset > 0)
                    ScrollOffset--;
            } else {
                if (ScrollOffset < Controls.Count - VisibleItems)
                    ScrollOffset++;
            }
            for (var ij = 0; ij < Controls.Count; ij++) {
                var control = Controls[ij];
                if (control.Y <= e.Y && control.Y + control.Height > e.Y && control.X <= e.X && control.X + control.Width > e.X) {
                    e.X -= control.X;
                    e.Y -= control.Y;
                    control.OnScroll(e);
                    return false;
                }
            }
            //if (this.scroll) this.scroll();
            return base.OnScroll(e);
        }

        public override void Draw(CanvasContext2D canv)
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
            ScrollPosition = height * ScrollOffset / ( Controls.Count - VisibleItems );

            canv.FillRect(TotalX + ItemWidth + 2 + 2 + 2, TotalY + 2 + ( ScrollPosition ), ScrollWidth - 2, 5);

            var curY = 3;
            for (var i = ScrollOffset; i < Math.Min(Controls.Count, ScrollOffset + VisibleItems); i++) {
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