using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class HScrollBox : Element
    {
        [IntrinsicProperty]
        public int ItemWidth { get; set; }
        [IntrinsicProperty]
        public int ScrollWidth { get; set; }
        [IntrinsicProperty]
        public int JWidth { get; set; }
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

        public HScrollBox(int x, int y, int itemHeight, int visibleItems, int itemWidth)
                : base(x, y)
        {
            ItemWidth = itemWidth;
            ScrollWidth = 14;
            JWidth = 5;
            VisibleItems = visibleItems;
            ItemHeight = itemHeight;
            Controls = new List<Element>();
        }

        public override void Construct()
        {
            Width = VisibleItems * ( ItemWidth + JWidth );
            Height = ItemHeight + ScrollWidth;
            Scrolling = false;
        }

        public Element AddControl(Element control)
        {
            control.Parent = this;
            control.Construct();

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
                    return true;
                }
            }

            if (e.Y > ItemHeight && e.Y < ItemHeight + ScrollWidth) {
                var width = VisibleItems * ( ItemWidth + JWidth ) - 2;
                ScrollOffset = ( e.X / width ) * ( Controls.Count - VisibleItems );

                ScrollOffset = Math.Min(Math.Max(ScrollOffset, 0), Controls.Count);
            }
            Dragging = true;

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
                    return true;
                }
            }

            if (MouseUp != null) MouseUp(new Point(e.X, e.Y));
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
            if (Dragging && e.Y > ItemHeight && e.Y < ItemHeight + ScrollWidth) {
                var width = VisibleItems * ( ItemWidth + JWidth ) - 2;
                ScrollOffset = (int) ( ( (double) e.X / width ) * ( Controls.Count - VisibleItems ) );

                ScrollOffset = Math.Min(Math.Max(ScrollOffset, 0), Controls.Count);
            }
            if (MouseOver != null) MouseOver(new Point(e.X, e.Y));
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
                    return true;
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

            var width = VisibleItems * ( ItemWidth + JWidth ) - 2;

            canv.FillStyle = BackColor;
            canv.LineWidth = 1;
            canv.StrokeStyle = "#333";
            Help.RoundRect(canv, TotalX, TotalY, VisibleItems * ( ItemWidth + JWidth ) + 2, ItemHeight + ScrollWidth + 6, 3, true, true);

            canv.FillStyle = "grey";
            canv.LineWidth = 1;
            canv.StrokeStyle = "#444";
            canv.FillRect(TotalX + 2, TotalY + ItemHeight + 6, VisibleItems * ( ItemWidth + JWidth ), ScrollWidth);

            canv.FillStyle = "FFDDFF";
            canv.LineWidth = 1;
            canv.StrokeStyle = "#FFDDFF";
            ScrollPosition = width * ScrollOffset / ( Controls.Count - VisibleItems );

            canv.FillRect(TotalX + ( ScrollPosition ) + 2, TotalY + ItemHeight + 6, 5, ScrollWidth - 2);

            var curX = 3;
            for (var i = ScrollOffset; i < Math.Min(Controls.Count, ScrollOffset + VisibleItems); i++) {
                Controls[i].Parent = this;
                Controls[i].X = curX;
                Controls[i].Y = 2;
                Controls[i].Height = ItemHeight;
                Controls[i].Width = ItemWidth;

                curX += ItemWidth + JWidth;
                Controls[i].Draw(canv);
            }

            canv.Restore();
            base.Draw(canv);
        }
    }
}