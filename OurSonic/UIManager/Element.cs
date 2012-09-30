using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.UIManager
{
    public class Element
    {
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }
        [IntrinsicProperty]
        public int Depth { get; set; }
        [IntrinsicProperty]
        public bool Visible { get; set; }
        [IntrinsicProperty]
        public object CachedDrawing { get; set; }
        [IntrinsicProperty]
        public Action Click { get; set; }
        [IntrinsicProperty]
        public Action MouseUp { get; set; }
        [IntrinsicProperty]
        public Action MouseOver { get; set; }
        [IntrinsicProperty]
        public bool EditMode { get; set; }
        [IntrinsicProperty]
        public EditorEngine EditorEngine { get; set; }
        [IntrinsicProperty]
        public Element Parent { get; set; }
        [IntrinsicProperty]
        public bool Focused { get; set; }
        public int TotalX
        {
            get { return X + ( Parent != null ? Parent.TotalX : 0 ); }
        }
        public int TotalY
        {
            get { return Y + ( Parent != null ? Parent.TotalY : 0 ); }
        }

        public Element(int x, int y)
        {
            X = x;
            Y = y;

            EditorEngine = new EditorEngine(this);
            Visible = true;
            /*
                        if (this.Construct) {
                            this.Construct();
                        }
            */
        }

        public virtual void Construct() {}

        public bool IsEditMode()
        {
            return EditMode || ( Parent != null && Parent.IsEditMode() );
        }

        public virtual ForceRedrawing ForceDrawing()
        {
            return new ForceRedrawing {Redraw = false, ClearCache = false};
        }

        public virtual void OnKeyDown(object e) {}

        public virtual void Focus(Pointer e)
        {
            Focused = true;
        }

        public virtual void LoseFocus()
        {
            Focused = false;
        }

        public virtual bool OnClick(Pointer e)
        {
            if (IsEditMode()) {
                if (EditorEngine.Click(e))
                    return true;
            }
            return false;
        }

        public virtual bool OnMouseUp(Pointer e)
        {
            if (IsEditMode()) {
                if (EditorEngine.MouseUp(e))
                    return true;
            }
            return false;
        }

        public virtual bool OnMouseOver(Pointer e)
        {
            if (IsEditMode()) {
                if (EditorEngine.MouseOver(e))
                    return true;
            }
            return false;
        }

        public virtual void Draw(CanvasContext2D canv)
        {
            if (IsEditMode())
                EditorEngine.Draw(canv);
        }

        public void ClearCache()
        {
            CachedDrawing = null;
        }

        public virtual bool OnScroll(Pointer e)
        {
            return false;
        }

        #region Nested type: ForceRedrawing

        [Serializable]
        public class ForceRedrawing
        {
            public bool Redraw { get; set; }
            public bool ClearCache { get; set; }
        }

        #endregion
    }
}