using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UIManager;
using OurSonic.Utility;
namespace OurSonic.Areas
{
    public class PieceLayoutMaker
    {
        private double largeScale = 1;
        [IntrinsicProperty]
        public LevelObjectPieceLayout PieceLayout { get; set; }
        [IntrinsicProperty]
        public int SelectedPieceIndex { get; set; }
        [IntrinsicProperty]
        public bool ShowImages { get; set; }
        [IntrinsicProperty]
        protected int LineWidth { get; set; }
        [IntrinsicProperty]
        protected int CurrentColor { get; set; }
        [IntrinsicProperty]
        protected bool ShowOutline { get; set; }
        [IntrinsicProperty]
        protected int DraggingIndex { get; set; }
        [IntrinsicProperty]
        protected Point ZeroPosition { get; set; }

        public PieceLayoutMaker(LevelObjectPieceLayout pieceLayout)
        {
            PieceLayout = pieceLayout;
            LineWidth = 1;
            CurrentColor = 0;
            ShowOutline = true;
            ShowImages = false;
            SelectedPieceIndex = 0;
            DraggingIndex = -1;
            ZeroPosition = new Point(0, 0);
        }

        public void Draw(CanvasRenderingContext2D canvas, Point pos, Point scale)
        {
//            PieceLayout.DrawUI(canvas, pos, ShowImages, SelectedPieceIndex, ZeroPosition, largeScale);
        }

        public void MouseUp()
        {
            DraggingIndex = -1;
        }

        public void SetPriority(bool val)
        {
            PieceLayout.Pieces[SelectedPieceIndex].Priority = val;
        }

        public void PlaceItem(Point position, Point lastPosition)
        {
            var goodPosition = position;
            if (lastPosition != null) {
                goodPosition = position;
                position = lastPosition;
            }

            for (var i = 0; i < PieceLayout.Pieces.Count; i++) {
                var j = PieceLayout.Pieces[i];
                var piece = SonicManager.Instance.UIManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Pieces[j.PieceIndex];
                var asset = SonicManager.Instance.UIManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Assets[piece.AssetIndex];
                var size = new Point(10, 10);
                if (asset.Frames.Count > 0) {
                    var frm = asset.Frames[0];
                    size.X = frm.Width / 2 + 10;
                    size.Y = frm.Height / 2 + 10;
                }

                if (position.X - ZeroPosition.X > j.X - size.X &&
                    position.X - ZeroPosition.X < j.X + size.X &&
                    position.Y - ZeroPosition.Y > j.Y - size.Y &&
                    position.Y - ZeroPosition.Y < j.Y + size.Y) {
                    if (!( DraggingIndex == -1 || DraggingIndex == i ))
                        continue;

                    j.X = goodPosition.X - ZeroPosition.X;
                    j.Y = goodPosition.Y - ZeroPosition.Y;
                    SelectedPieceIndex = i;
                    DraggingIndex = i;

                    var cj = SonicManager.Instance.UIManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.MainPanel.Data.SelectPieceScroll.Controls;

                    for (var ci = 0; ci < cj.Count; ci++) {
                        if (ci == j.PieceIndex)
                            ( (ImageButton) cj[ci] ).Toggled = true;
                        else
                            ( (ImageButton) cj[ci] ).Toggled = false;
                    }
                    PieceLayout.Update();
                    return;
                }
            }

            if (lastPosition != null) {
                ZeroPosition.X += goodPosition.X - lastPosition.X;
                ZeroPosition.Y += goodPosition.Y - lastPosition.Y;
            }

            //sonicManager.uiManager.objectFrameworkArea.mainPanel.updatePieces();
        }

        public void OffsetScale(bool positive)
        {
            /*ZeroPosition.X = (int)(largeScale * 30) * (positive ? -1 : 1);
            ZeroPosition.Y = (int)(largeScale * 30) * (positive ? -1 : 1);*/
            largeScale += positive ? .1 : -.1;
        }
    }
}