using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager.Areas
{
    public class PaletteArea : Panel
    {
        [IntrinsicProperty]
        private string[] Palette { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        protected bool ClickHandled { get; set; }
        [IntrinsicProperty]
        public bool ShowCurrent { get; set; }
        [IntrinsicProperty]
        protected bool Wide { get; set; }
        [IntrinsicProperty]
        public int SelectedIndex { get; set; }
        [IntrinsicProperty]
        protected bool Clicking { get; set; }
        public PaletteArea(int x, int y) : base(x, y, 0, 0) {}

        public override bool OnClick(Pointer e)
        {
            if (!Visible) return false;
            Clicking = true;
            ClickHandled = false;

            var _x = ( e.X / Scale.X );
            var _y = ( e.Y / Scale.Y );

            if (Wide)
                SelectedIndex = _y * Palette.Length / 2 + _x;
            else
                SelectedIndex = _y * 2 + _x;

            return base.OnClick(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (Clicking) {
                var _x = ( e.X / Scale.X );
                var _y = ( e.Y / Scale.Y );

                if (Wide)
                    SelectedIndex = _y * Palette.Length / 2 + _x;
                else
                    SelectedIndex = _y * 2 + _x;
            }
            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;

            ClickHandled = false;
            Clicking = false;
            return base.OnMouseUp(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            base.Draw(canv);

            if (!Visible) return;
            if (Palette == null) return;

            canv.Save();

            canv.StrokeStyle = "#000";
            canv.LineWidth = 1;
            var pos = new Point(TotalX, TotalY);
            var f = Palette.Length / 2;

            if (Wide) {
                for (var h = 0; h < 2; h++) {
                    for (var w = 0; w < f; w++) {
                        canv.FillStyle = Palette[w + h * f];
                        canv.FillRect(pos.X + w * Scale.X, pos.Y + h * Scale.Y, Scale.X, Scale.Y);
                        canv.StrokeRect(pos.X + w * Scale.X, pos.Y + h * Scale.Y, Scale.X, Scale.Y);
                    }
                }
                if (ShowCurrent) {
                    canv.FillStyle = Palette[SelectedIndex];
                    canv.FillRect(pos.X, pos.Y + f * Scale.Y, Scale.X * 2, Scale.Y * 2);
                    canv.StrokeRect(pos.X, pos.Y + f * Scale.Y, Scale.X * 2, Scale.Y * 2);
                }
            } else {
                for (var h = 0; h < f; h++) {
                    for (var w = 0; w < 2; w++) {
                        canv.FillStyle = Palette[w + h * 2];
                        canv.FillRect(pos.X + w * Scale.X, pos.Y + h * Scale.Y, Scale.X, Scale.Y);
                        canv.StrokeRect(pos.X + w * Scale.X, pos.Y + h * Scale.Y, Scale.X, Scale.Y);
                    }
                }
                if (ShowCurrent) {
                    canv.FillStyle = Palette[SelectedIndex];
                    canv.FillRect(pos.X, pos.Y + f * Scale.Y, Scale.X * 2, Scale.Y * 2);
                    canv.StrokeRect(pos.X, pos.Y + f * Scale.Y, Scale.X * 2, Scale.Y * 2);
                }
            }

            canv.Restore();
        }

        public override void Construct()
        {
            base.Construct();
        }

        public void Init(string[] palette, bool wide)
        {
            Clicking = false;
            SelectedIndex = 0;

            Wide = wide;
            if (!Wide) {
                Width = Scale.X * 2;
                Height = Scale.Y * palette.Length / 2;
            } else {
                Width = Scale.X * palette.Length / 2;
                Height = Scale.Y * 2;
            }
            Palette = palette;
        }
    }
}