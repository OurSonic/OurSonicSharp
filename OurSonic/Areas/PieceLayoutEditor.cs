using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UIManager;
using OurSonic.Utility;
namespace OurSonic.Areas
{
    public class PieceLayoutEditor : Element
    {
        [IntrinsicProperty]
        public Point Size { get; set; }
        [IntrinsicProperty]
        protected bool ShowHurtMap { get; set; }
        [IntrinsicProperty]
        protected bool ShowCollideMap { get; set; }
        [IntrinsicProperty]
        protected bool Clicking { get; set; }
        [IntrinsicProperty]
        public PieceLayoutMaker PieceLayoutMaker { get; set; }
        [IntrinsicProperty]
        protected LevelObjectPieceLayout PieceLayout { get; set; }
        [IntrinsicProperty]
        protected Point LastPosition { get; set; }
        [IntrinsicProperty]
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

            return false;
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

        public override void Draw(CanvasRenderingContext2D canv)
        {
            if (!Visible) return;
            if (PieceLayoutMaker == null) return;
            var pos = new Point(TotalX, TotalY);

            PieceLayoutMaker.Draw(canv, pos, Size);

            base.Draw(canv);
        }
    }
}