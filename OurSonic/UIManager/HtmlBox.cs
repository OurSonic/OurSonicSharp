using System;
using System.Html.Media.Graphics;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class HtmlBox : Element
    {
        public Action Init { get; set; }
        public Action<int, int> UpdatePosition { get; set; }
        public Action _Focus { get; set; }
        public Action _Hide { get; set; }
        public HtmlBox(int x, int y) : base(x, y) {}

        public override void Construct()
        {
            Init();
            base.Construct();
        }

        public override void Focus(Pointer e)
        {
            _Focus();
            base.Focus(e);
        }

        public override void LoseFocus()
        {
            _Hide();
            base.LoseFocus();
        }

        public override bool OnClick(Pointer e)
        {
            return false;
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (MouseUp != null) MouseUp(new Point(e.X, e.Y));
            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (MouseOver != null) MouseOver(new Point(e.X, e.Y));
            return base.OnMouseOver(e);
        }

        public override void Draw(CanvasRenderingContext2D canv)
        {
            if (!Visible) return;
            UpdatePosition(TotalX, TotalY);

            base.Draw(canv);
        }
    }
}