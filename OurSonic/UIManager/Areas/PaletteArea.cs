namespace OurSonic.UIManager.Areas
{
    public class PaletteArea : Panel
    {
        /*function PaletteArea(x, y, scale, showCurrent) {
            this.forceDrawing = function () {
                return { redraw: false, clearCache: false };
            };
            this.showCurrent = showCurrent;
            this.x = x;
            this.y = y;
            this.visible = true;
            this.scale = scale;
            this.clicking = false;
            this.selectedIndex = 0;
            this.parent = null;
            this.wide = false;
            this.init = function (palette, wide) {
                this.wide = wide;
                if (!wide) {
                    this.width = this.scale.x * 2;
                    this.height = this.scale.y * palette.length / 2;
                }
                else {
                    this.width = this.scale.x * palette.length / 2;
                    this.height = this.scale.y * 2;
                }
                this.palette = palette;

            }
            this.focus = function () {

            };
            this.loseFocus = function () {

            };
            this.onClick = function (e) {
                if (!this.visible) return;
                this.clicking = true;
                this.clickHandled = false;

                var _x = _H.floor(e.x / scale.x);
                var _y = _H.floor(e.y / scale.y);

                if (this.wide) {
                    this.selectedIndex = _y * palette.length / 2 + _x;
                }
                else {
                    this.selectedIndex = _y * 2 + _x;
                }

            };
            this.onKeyDown = function (e) {

            };
            this.onMouseUp = function (e) {
                if (!this.visible) return;

                this.clickHandled = false;
                this.clicking = false;
            };
            this.clickHandled = false;
            this.onMouseOver = function (e) {
                if (this.clicking) {

                    var _x = _H.floor(e.x / scale.x);
                    var _y = _H.floor(e.y / scale.y);

                    if (this.wide) {
                        this.selectedIndex = _y * palette.length / 2 + _x;
                    }
                    else {
                        this.selectedIndex = _y * 2 + _x;
                    }
                }
            };
            this.draw = function (canv) {
                if (!this.visible) return;
                if (!this.palette) return;


                canv.strokeStyle = "#000";
                canv.lineWidth = 1;
                var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

                if (this.wide) {
                    var f = _H.floor(this.palette.length / 2);
                    for (var h = 0; h < 2; h++) {
                        for (var w = 0; w < f; w++) {
                            canv.fillStyle = this.palette[w + h * f];
                            canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                            canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                        }
                    }
                    if (this.showCurrent) {
                        canv.fillStyle = this.palette[this.selectedIndex];
                        canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
                        canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
                    }
                } else {

                    var f = _H.floor(this.palette.length / 2);
                    for (var h = 0; h < f; h++) {
                        for (var w = 0; w < 2; w++) {
                            canv.fillStyle = this.palette[w + h * 2];
                            canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                            canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                        }
                    }
                    if (this.showCurrent) {
                        canv.fillStyle = this.palette[this.selectedIndex];
                        canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
                        canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
                    }
                }

            };
            return this;
        }
        */
        public PaletteArea(int x, int y, int width, int height) : base(x, y, width, height) {}
        public bool ShowCurrent { get; set; }
        public Point Size { get; set; }

        public override void Construct()
        {
            base.Construct();
        }

        public void Init(object palette, bool b)
        {
        }
    }
}