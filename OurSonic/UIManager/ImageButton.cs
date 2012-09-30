using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.UIManager
{
    public class ImageButton<T> : ImageButton
    {
        [IntrinsicProperty]
        public T Data { get; set; }
        public ImageButton(T data,int x, int y, int width, int height) : base(x, y, width, height)
        {


            Data = data;
        }
    }
    public class ImageButton : Element
    {
        private string oldText;
        [IntrinsicProperty]
        public string Font { get; set; }
        [IntrinsicProperty]
        public bool Toggle { get; set; }
        [IntrinsicProperty]
        public bool Toggled { get; set; }
        [IntrinsicProperty]
        private bool Clicking { get; set; }
        [IntrinsicProperty]
        private Gradient Button2Grad { get; set; }
        [IntrinsicProperty]
        public Action<CanvasContext2D, int, int> Image { get; set; }
        [IntrinsicProperty]
        public Gradient Button1Grad { get; set; }
        private bool created { get; set; }
        [IntrinsicProperty]
        private Gradient ButtonBorderGrad { get; set; }
        [IntrinsicProperty]
        public DelegateOrValue<string> Text { get; set; }
        [IntrinsicProperty]
        public string Color { get; set; }

        public ImageButton(int x, int y, int width, int height)
                : base(x, y)
        {
            Text = "";
            Toggle = false;
            Toggled = false;
            Font = "";
            Clicking = false;
            Image = null;
            created = false;
            Button1Grad = null;
            Button2Grad = null;
            ButtonBorderGrad = null;

            Width = width;
            Height = height;
        }

        public override void Construct()
        {
            base.Construct();
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible)
                return false;
            Clicking = true;
            if (Toggle)
                Toggled = !Toggled;

            return base.OnClick(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible)
                return false;
            if (Clicking) {
                if (Click != null)
                    Click();
            }
            Clicking = false;
            if (MouseUp != null)
                MouseUp();

            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (!Visible) return false;
            if (MouseOver != null)
                MouseOver();
            return base.OnMouseOver(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;

            canv.Save();

            if (!created) {
                created = true;
                Button1Grad = canv.CreateLinearGradient(0, 0, 0, 1);

                Button1Grad.AddColorStop(0, "#FFFFFF");
                Button1Grad.AddColorStop(1, "#A5A5A5");

                Button2Grad = canv.CreateLinearGradient(0, 0, 0, 1);
                Button2Grad.AddColorStop(0, "#A5A5A5");
                Button2Grad.AddColorStop(1, "#FFFFFF");

                ButtonBorderGrad = canv.CreateLinearGradient(0, 0, 0, 1);
                ButtonBorderGrad.AddColorStop(0, "#AFAFAF");
                ButtonBorderGrad.AddColorStop(1, "#7a7a7a");
            }

            canv.StrokeStyle = ButtonBorderGrad;
            if (Toggle) {
                canv.FillStyle = ( Toggled
                                           ? Button1Grad
                                           : Button2Grad );
            } else {
                canv.FillStyle = ( Clicking
                                           ? Button1Grad
                                           : Button2Grad );
            }
            canv.LineWidth = 2;
            Help.RoundRect(canv, TotalX, TotalY, Width, Height, 2, true, true);
            if (canv.Font != Font)
                canv.Font = Font;
            canv.FillStyle = "#000000";
            string txt = Text;

            canv.Save();
            Image(canv, TotalX, TotalY);
            canv.Restore();

            canv.FillText(txt, TotalX + ( ( Width / 2 ) - ( canv.MeasureText(txt).Width / 2 ) ), TotalY + Height - 3);

            canv.Restore();
        }
    }
}