using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UIManager;
using OurSonic.Utility;
namespace OurSonic.Areas
{
    public class ColorEditingArea : Panel
    {
        [IntrinsicProperty]
        public LevelObjectAssetFrame Frame { get; set; }
        [IntrinsicProperty]
        public bool ShowOffset { get; set; }
        [IntrinsicProperty]
        public bool Editable { get; set; }
        [IntrinsicProperty]
        public Editor Editor { get; set; }
        [IntrinsicProperty]
        public bool ShowHurtMap { get; set; }
        [IntrinsicProperty]
        public bool ShowCollideMap { get; set; }
        [IntrinsicProperty]
        public PaletteArea PaletteEditor { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        protected bool Clicking { get; set; }
        [IntrinsicProperty]
        protected bool ClickHandled { get; set; }
        [IntrinsicProperty]
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

        public override void Draw(CanvasRenderingContext2D canv)
        {
            base.Draw(canv);

            if (!Visible) return;
            if (Editor == null) return;
            var pos = new Point(TotalX, y: TotalY);

            Editor.Draw(canv, pos, new Point(Width, Height), ShowCollideMap, ShowHurtMap);
        }
    }
}