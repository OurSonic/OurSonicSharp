using OurSonic.Level;
namespace OurSonic.UIManager.Areas
{
    public class ColorEditingArea:Panel {
        public ColorEditingArea(int x, int y, int width, int height) : base(x, y, width, height)
        {
            
        }

        public void Init(LevelObjectAssetFrame frame)
        {
            
            Editor=new Editor(frame,ShowOffset);
        }
        
        public bool ShowOffset { get; set; }
        public bool Editable { get; set; }
        public Editor Editor { get; set; }

        /*function ColorEditingArea(x, y, size, showOffset) {
            this.forceDrawing = function () {
                return { redraw: false, clearCache: false };
            };
            this.lastPosition = null;
            this.x = x;
            this.y = y;
            this.size = size;
            this.showHurtMap = false;
            this.showCollideMap = false;
            this.editable = true;
            this.visible = true;
            this.editor = null;
            this.clicking = false;
            this.paletteEditor = null;
            this.parent = null;
            this.click = undefined;
            this.init = function (frame) {
                this.frame = frame;
                this.width = this.size.width;
                this.height = this.size.height;
                this.editor = new Editor(frame, showOffset);
            };
            this.focus = function () {

            };
            this.loseFocus = function () {

            };

            this.onClick = function (e) {
                if (!this.visible) return;
                if (!this.editor) return;
                this.clicking = true;
                this.clickHandled = false;
                var scalex = this.size.width / this.editor.assetFrame.width;
                var scaley = this.size.height / this.editor.assetFrame.height;
                this.editor.showHurtMap = this.showHurtMap;
                this.editor.showCollideMap = this.showCollideMap;

                var pos = { x: _H.floor(e.x / scalex), y: _H.floor(e.y / scaley) };
                if (!this.editable) {
                    if (this.click) {
                        this.click(pos);
                    }
                } else {
                    this.lastPosition = pos;
                    if (this.paletteEditor)
                        this.editor.currentColor = this.paletteEditor.selectedIndex;

                    if (this.showHurtMap || this.showCollideMap) {
                        this.editor.currentColor = !e.right;
                    }

                    this.editor.drawPixel(pos);
                }

            };
            this.onKeyDown = function (e) {

            };
            this.onMouseUp = function (e) {
                if (!this.visible) return;

                this.lastPosition = null;
                this.clickHandled = false;
                this.clicking = false;
            };
            this.clickHandled = false;
            this.onMouseOver = function (e) {
                if (!this.editor) return;

                var scalex = this.size.width / this.editor.assetFrame.width;
                var scaley = this.size.height / this.editor.assetFrame.height;

                var pos = { x: _H.floor(e.x / scalex), y: _H.floor(e.y / scaley) };
                this.editor.showHurtMap = this.showHurtMap;
                this.editor.showCollideMap = this.showCollideMap;


                if (this.clicking) {
                    if (!this.editable) {
                        if (this.click) {
                            this.click(pos);
                        }
                    } else {
                        this.clickHandled = true;
                        if (this.showHurtMap || this.showCollideMap) {
                            this.editor.currentColor = !e.right;
                        }
                        this.editor.drawLine(pos, this.lastPosition);
                        this.lastPosition = pos;
                    }
                }
            };
            this.draw = function (canv) {
                if (!this.visible) return;
                if (!this.editor) return;
                var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

                this.editor.draw(canv, pos, this.size, this.showCollideMap, this.showHurtMap);

            };
            return this;
        }
        
         
         */
         
    }
}