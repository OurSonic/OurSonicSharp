using System.Html.Media.Graphics;
using OurSonic.Level;
using OurSonic.Utility;
namespace OurSonic.UIManager.Areas
{
    public class PieceLayoutEditor : Element
    {
        public Point Size { get; set; }
        protected bool ShowHurtMap { get; set; }
        protected bool ShowCollideMap { get; set; }
        protected bool Clicking { get; set; }
        public PieceLayoutMaker PieceLayoutMaker { get; set; }
        protected LevelObjectPieceLayout PieceLayout { get; set; }
        protected Point LastPosition { get; set; }
        protected bool ClickHandled { get; set; }

        public PieceLayoutEditor(int x, int y, Point size) : base(x, y)
        {
            Size = size;
            ShowHurtMap = false;
            ShowCollideMap = false;
            Visible = true;
            Size = size;
            Clicking = false;
            PieceLayoutMaker = null;
        }

        public void Init(LevelObjectPieceLayout pieceLayout)
        {
            PieceLayout = pieceLayout;
            Width = Size.X;
            Height = Size.Y;
            PieceLayoutMaker = new PieceLayoutMaker(pieceLayout);
        }

        public override bool OnScroll(Pointer e)
        {
            PieceLayoutMaker.OffsetScale(e.Delta > 0);

            return base.OnScroll(e);
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible) return false;
            if (PieceLayoutMaker == null) return false;
            Clicking = true;
            ClickHandled = false;
            LastPosition = e;
            PieceLayoutMaker.PlaceItem(e, null);
            return base.OnClick(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;

            LastPosition = null;
            ClickHandled = false;
            Clicking = false;
            PieceLayoutMaker.MouseUp();
            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (PieceLayoutMaker == null) return false;

            if (Clicking) {
                ClickHandled = true;
                PieceLayoutMaker.PlaceItem(e, LastPosition);
                LastPosition = new Point(e.X, e.Y);
            }
            return base.OnMouseOver(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;
            if (PieceLayoutMaker == null) return;
            var pos = new Point(TotalX, TotalY);

            PieceLayoutMaker.Draw(canv, pos, Size);

            base.Draw(canv);
        }
    }
}