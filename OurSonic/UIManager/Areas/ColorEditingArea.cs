using System.Html.Media.Graphics;
using OurSonic.Level;
using OurSonic.Utility;
namespace OurSonic.UIManager.Areas
{
    public class ColorEditingArea : Panel
    {
        public LevelObjectAssetFrame Frame { get; set; }
        public bool ShowOffset { get; set; }
        public bool Editable { get; set; }
        public Editor Editor { get; set; }
        public bool ShowHurtMap { get; set; }
        public bool ShowCollideMap { get; set; }
        public PaletteArea PaletteEditor { get; set; }
        public Point Scale { get; set; }
        protected bool Clicking { get; set; }
        protected bool ClickHandled { get; set; }
        protected Point LastPosition { get; set; }

        public ColorEditingArea(int x, int y, int width, int height)
                : base(x, y, width, height)
        {
            Editable = true;
        }

        public void Init(LevelObjectAssetFrame frame)
        {
            Frame = frame;

            Editor = new Editor(frame, ShowOffset);
        }

        public override bool OnClick(Pointer e)
        {
            if (!Visible) return false;
            if (Editor == null) return false;
            Clicking = true;
            ClickHandled = false;
            var scalex = Width / Editor.AssetFrame.Width;
            var scaley = Height / Editor.AssetFrame.Height;
            Editor.ShowHurtMap = ShowHurtMap;
            Editor.ShowCollideMap = ShowCollideMap;

            var pos = new Point(( e.X / scalex ), ( e.Y / scaley ));
            if (!Editable) {
                if (Click != null)
                    Click(pos);
            } else {
                LastPosition = pos;
                if (PaletteEditor != null)
                    Editor.CurrentColor = PaletteEditor.SelectedIndex;

                if (ShowHurtMap || ShowCollideMap)
                    Editor.CurrentColor = e.Right ? 0 : 1;

                Editor.DrawPixel(pos);
            }

            return base.OnClick(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            if (Editor == null) return false;

            var scalex = Width / Editor.AssetFrame.Width;
            var scaley = Height / Editor.AssetFrame.Height;

            var pos = new Point(( e.X / scalex ), ( e.Y / scaley ));
            Editor.ShowHurtMap = ShowHurtMap;
            Editor.ShowCollideMap = ShowCollideMap;

            if (Clicking) {
                if (!Editable) {
                    if (Click != null)
                        Click(pos);
                } else {
                    ClickHandled = true;
                    if (ShowHurtMap || ShowCollideMap)
                        Editor.CurrentColor = e.Right ? 0 : 1;
                    Editor.DrawLine(pos, LastPosition);
                    LastPosition = pos;
                }
            }
            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            if (!Visible) return false;

            LastPosition = null;
            ClickHandled = false;
            Clicking = false;
            return base.OnMouseUp(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            base.Draw(canv);

            if (!Visible) return;
            if (Editor == null) return;
            var pos = new Point(TotalX, y: TotalY);

            Editor.Draw(canv, pos, new Point(Width, Height), ShowCollideMap, ShowHurtMap);
        }
    }
}