using System;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class Element
    {
        internal ForceRedrawing cachedForceRedrawing = new ForceRedrawing();
        private int myDepth;
        [IntrinsicProperty]
        public int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
        [IntrinsicProperty]
        public int Width { get; set; }
        [IntrinsicProperty]
        public int Height { get; set; }

        public int Depth
        {
            get { return myDepth; }
            set
            {
                myDepth = value;
                if (( this is UIArea ))
                    UIManager.Instance.UpdateDepth();
            }
        }
        [IntrinsicProperty]
        public bool Visible { get; set; }
        [IntrinsicProperty]
        public CanvasInformation CachedDrawing { get; set; }
        [IntrinsicProperty]
        public Action<Point> Click { get; set; }
        [IntrinsicProperty]
        public Action<Point> MouseUp { get; set; }
        [IntrinsicProperty]
        public Action<Point> MouseOver { get; set; }
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
            return cachedForceRedrawing; //redraw=false,cache=false
        }

        public virtual bool OnKeyDown(ElementEvent e)
        {
            return false;
        }

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