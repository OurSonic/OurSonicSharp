using OurSonic.Level;
namespace OurSonic.UIManager.Areas
{
    public class PieceLayoutEditor:Element {
        public Point Size { get; set; }

        public PieceLayoutEditor(int x, int y, Point size) : base(x,y)
        {
            Size = size;

        }

        public PieceLayoutMaker PieceLayoutMaker { get; set; }

        /*function PieceLayoutEditor(x, y, size) {
            this.forceDrawing = function () {
                return { redraw: false, clearCache: false };
            };
            this.lastPosition = null;
            this.x = x;
            this.y = y;
            this.showHurtMap = false;
            this.showCollideMap = false;
            this.visible = true;
            this.size = size;
            this.clicking = false;
            this.parent = null;
            this.pieceLayoutMaker = null;
            this.init = function (pieceLayout) {
                this.pieceLayout = pieceLayout;
                this.width = size.width;
                this.height = size.height;
                this.pieceLayoutMaker = new PieceLayoutMaker(pieceLayout);
            };
            this.focus = function () {

            };
            this.loseFocus = function () {

            };

            this.onClick = function (e) {
                if (!this.visible) return;
                if (!this.pieceLayoutMaker) return;
                this.clicking = true;
                this.clickHandled = false;
                this.lastPosition = e;
                this.pieceLayoutMaker.placeItem(e);

            };
            this.onKeyDown = function (e) {

            };
            this.onMouseUp = function (e) {
                if (!this.visible) return;

                this.lastPosition = null;
                this.clickHandled = false;
                this.clicking = false;
                this.pieceLayoutMaker.mouseUp();
            };
            this.clickHandled = false;
            this.onMouseOver = function (e) {
                if (!this.pieceLayoutMaker) return;

                if (this.clicking) {
                    this.clickHandled = true;
                    this.pieceLayoutMaker.placeItem(e, this.lastPosition);
                    this.lastPosition = { x: e.x, y: e.y };


                }
            };
            this.draw = function (canv) {
                if (!this.visible) return;
                if (!this.pieceLayoutMaker) return;
                var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

                this.pieceLayoutMaker.draw(canv, pos, this.size);

            };
            return this;
        }
         */

        public void Init(LevelObjectPieceLayout pieceLayout)
        {

            this.PieceLayout = pieceLayout;
            this.Width = Size.X;
            this.Height = Size.Y;
            this.PieceLayoutMaker = new PieceLayoutMaker(pieceLayout);
        }

        protected LevelObjectPieceLayout PieceLayout { get; set; }
    }
}