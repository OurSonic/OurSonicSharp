using System;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonicModels.Common;
using jQueryApi;
namespace OurSonic.UIManager
{
    public class TextBox : Element
    {
        private int blinkTick;
        private bool blinked;
        private CanvasContext2D can;
        [IntrinsicProperty]
        public Action TextChanged { get; set; }
        [IntrinsicProperty]
        public string Text { get; set; }
        [IntrinsicProperty]
        public string Font { get; set; }
        [IntrinsicProperty]
        public bool Clicking { get; set; }
        [IntrinsicProperty]
        public string Color { get; set; }
        [IntrinsicProperty]
        public int CursorPosition { get; set; }
        [IntrinsicProperty]
        public int DragPosition { get; set; }
        [IntrinsicProperty]
        public int DrawTicks { get; set; }
        [IntrinsicProperty]
        public int LastClickTick { get; set; }
        [IntrinsicProperty]
        public bool Created { get; set; }
        [IntrinsicProperty]
        public bool Blinked { get; set; }
        [IntrinsicProperty]
        public int BlinkTick { get; set; }
        [IntrinsicProperty]
        public Gradient Button1Grad { get; set; }
        [IntrinsicProperty]
        public Gradient Button2Grad { get; set; }
        [IntrinsicProperty]
        public Gradient ButtonBorderGrad { get; set; }
        [IntrinsicProperty]
        public bool Can { get; set; }

        public TextBox(int x, int y, int width, int height, DelegateOrValue<string> text)
                : base(x, y)
        {
            Text = text;
            Width = width;
            Height = height;
            Font = UIManager.TextFont;

            DragPosition = -1;
        }

        public override void Construct()
        {
            base.Construct();
        }

        public override bool OnKeyDown(ElementEvent e2)
        {
            var e = e2.Me();
            if (e.altKey) return false;
            if (Focused) {
                if (e.ctrlKey) {
                    if (e.keyCode == 65) {
                        DragPosition = 0;
                        CursorPosition = Text.Length;
                    } else if (e.keyCode == 67) {
                        // _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
                    } else if (e.keyCode == 88) {
                        //  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));

                        Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) +
                               Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);

                        CursorPosition = Math.Min(CursorPosition, DragPosition);
                        DragPosition = -1;
                    }
                } else if (e.keyCode == 37) {
                    if (e.shiftKey) {
                        if (DragPosition == -1)
                            DragPosition = CursorPosition;
                        CursorPosition = Math.Max(CursorPosition - 1, 0);
                    } else {
                        DragPosition = -1;
                        CursorPosition = Math.Max(CursorPosition - 1, 0);
                    }
                } else if (e.keyCode == 39) {
                    if (e.shiftKey) {
                        if (DragPosition == -1)
                            DragPosition = CursorPosition;
                        CursorPosition = Math.Min(CursorPosition + 1, Text.Length);
                    } else {
                        DragPosition = -1;
                        CursorPosition = Math.Min(CursorPosition + 1, Text.Length);
                    }
                } else {
                    if (e.keyCode == 8) {
                        if (DragPosition == -1)
                            Text = Text.Substring(0, CursorPosition - 1) + Text.Substring(CursorPosition, Text.Length);
                        else {
                            Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) +
                                   Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
                        }
                        if (DragPosition == -1) {
                            if (CursorPosition > 0)
                                CursorPosition--;
                        } else
                            CursorPosition = Math.Min(CursorPosition, DragPosition);
                    } else if (e.keyCode == 46) {
                        if (DragPosition == -1)
                            Text = Text.Substring(0, CursorPosition) + Text.Substring(Math.Min(CursorPosition + 1, Text.Length), Text.Length);
                        else {
                            Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) +
                                   Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
                        }
                        if (DragPosition == -1) {} else
                            CursorPosition = Math.Min(CursorPosition, DragPosition);
                    } else {
                        char m = e.keyCode;
                        var t = String.FromCharCode(m);
                        if (DragPosition == -1)
                            Text = Text.Substring(0, CursorPosition) + t + Text.Substring(CursorPosition, Text.Length);
                        else {
                            Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) + t +
                                   Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
                        }
                        if (DragPosition == -1)
                            CursorPosition++;
                        else
                            CursorPosition = Math.Max(CursorPosition, DragPosition);
                    }
                    DragPosition = -1;
                }

                if (TextChanged != null)
                    TextChanged();

                e.preventDefault();
                return true;
            }
            return false;
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible) return false;
            Clicking = true;
            can.Save();
            if (can.Font != Font)
                can.Font = Font;
            for (var i = 0; i < Text.Length; i++) {
                DragPosition = -1;
                var w = can.MeasureText(Text.Substring(0, i)).Width;
                if (w > e.X - 14) {
                    CursorPosition = i;
                    if (DrawTicks - LastClickTick < 15)
                        SelectWord();
                    LastClickTick = DrawTicks;
                    return false;
                }
            }
            CursorPosition = Text.Length;
            if (DrawTicks - LastClickTick < 20)
                SelectWord();
            LastClickTick = DrawTicks;
            can.Restore();

            return base.OnClick(e);
        }

        private void SelectWord()
        {
            var j = Text.Split(" ");

            var pos = 0;
            for (var i = 0; i < j.Length; i++) {
                if (CursorPosition < j[i].Length + pos) {
                    DragPosition = pos;
                    CursorPosition = j[i].Length + pos;
                    return;
                } else
                    pos += j[i].Length + 1;
            }

            DragPosition = pos - j[j.Length - 1].Length;
            CursorPosition = Text.Length;
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;
            if (Clicking) {}
            Clicking = false;
            if (MouseUp != null) MouseUp(new Point(e.X, e.Y));

            return base.OnMouseUp(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (!Visible) return false;
            Document.Body.Style.Cursor = "text";
            if (Clicking) {
                if (DragPosition == -1)
                    DragPosition = CursorPosition;
                can.Save();

                if (can.Font != Font)
                    can.Font = Font;
                for (var i = 0; i < Text.Length; i++) {
                    var w = can.MeasureText(Text.Substring(0, i)).Width;
                    if (w > e.X - 14) {
                        CursorPosition = i;
                        return false;
                    }
                }
                can.Restore();

                CursorPosition = Text.Length;
            }
            if (MouseOver != null) MouseOver(new Point(e.X, e.Y));
            return base.OnMouseOver(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            if (!Visible) return;
            canv.Save();
            if (!Focused) {
                CursorPosition = -1;
                DragPosition = -1;
            }
            DrawTicks++;
            can = canv;
            if (!Created) {
                Created = true;
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
            canv.FillStyle = Clicking ? Button1Grad : Button2Grad;
            canv.LineWidth = 2;
            Help.RoundRect(canv, TotalX, TotalY, Width, Height, 2, true, true);
            if (canv.Font != Font)
                canv.Font = Font;

            if (DragPosition != -1) {
                canv.FillStyle = "#598AFF";

                var w1 = canv.MeasureText(Text.Substring(0, Math.Min(DragPosition, CursorPosition))).Width;
                var w2 = canv.MeasureText(Text.Substring(0, Math.Max(DragPosition, CursorPosition))).Width;
                canv.FillRect(TotalX + 8 + w1,
                              TotalY + 3,
                              w2 - w1,
                              ( Height - 7 ));
            }
            canv.FillStyle = "#000000";

            int hc;
            if (canv.Font.IndexOf("pt") != -1)
                hc = int.Parse(canv.Font.Substr(0, canv.Font.IndexOf("pt")));
            else
                hc = int.Parse(canv.Font.Substr(0, canv.Font.IndexOf("px")));
            canv.FillText(Text, TotalX + 8, TotalY + ( ( Height - hc ) / 2 ) + Height / 2);

            if (Focused && ( ( blinkTick++ % 35 ) == 0 ))
                blinked = !blinked;
            if (Focused && blinked) {
                canv.StrokeStyle = "#000000";
                var w = canv.MeasureText(Text.Substring(0, CursorPosition)).Width;
                canv.BeginPath();
                canv.MoveTo(TotalX + 8 + w, TotalY + 3);
                canv.LineTo(TotalX + 8 + w, TotalY + ( Height - 7 ));
                canv.LineWidth = 2;
                canv.Stroke();
            }
            canv.Restore();

            base.Draw(canv);
        }
    }
}