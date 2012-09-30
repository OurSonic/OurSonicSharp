using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.UIManager
{
    public class TextArea : Element
    {
        private string oldText;
        [IntrinsicProperty]
        public DelegateOrValue<string> Text { get; set; }
        [IntrinsicProperty]
        public string Font { get; set; }
        [IntrinsicProperty]
        public string Color { get; set; }

        public TextArea(int x, int y)
                : base(x, y)
        {
            Text = "";
            Font = "18pt Calibri";
            Color = "black";
            oldText = "";
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;
            string txt = Text;

            if (canv.Font != Font)
                canv.Font = Font;

            var w = canv.MeasureText(txt).Width;
            var h = int.Parse(canv.Font.Split("pt")[0]);

            //   canv.fillStyle = "rgba(255,255,255,0.78)";
            var pad = 3;
            //     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));

            canv.FillStyle = Color;

            canv.FillText(txt, Parent.X + X, Parent.Y + Y);
        }

        public override ForceRedrawing ForceDrawing()
        {
            string txt = Text;
            if (txt == oldText)
                return new ForceRedrawing() {Redraw = true, ClearCache = false};
            oldText = txt;
            return new ForceRedrawing() {Redraw = true, ClearCache = true};
        }
    }
}