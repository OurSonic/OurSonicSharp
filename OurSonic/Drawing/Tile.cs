using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Text;

namespace OurSonic.Drawing
{
    public class Tile
    {
        private int[] index;
        private Animation willAnimate;
        public int _Tile { get; set; }
        public bool Priority { get; set; }

        public bool XFlip { get; set; }
        public bool YFlip { get; set; }

        public int Palette { get; set; }

        public Tile(List<List<int>> colors)
        {
            int?[][] fm = new int?[colors.Count][];

            for (int i = 0; i < colors.Count; i++)
            {
                for (int j = 0; j < colors[i].Count; j++)
                {
                    fm[i][j] = colors[i][j];
                }
            }

            Colors = fm;
            Sprites = new List<int>();
            CurPaletteIndexes = null;
        }

        protected int[] CurPaletteIndexes { get; set; }

        protected List<int> Sprites { get; set; }

        protected int?[][] Colors { get; set; }
        protected bool ShowOutline { get; set; }

        public int Index { get; set; }

        public void Draw(CanvasContext2D canvas, Point pos, Point scale, bool xflip, bool yflip, int palette, int layer, int animationFrame)
        {
            if (CheckGood(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame))
            {
                return;
            }
            var cx = Colors.Length * scale.X;
            var cy = Colors.Length * scale.Y;
            var j = Help.DefaultCanvas(cx, cy);

            if (pos.X < 0 || pos.Y < 0)
                return;
            var oPos = new Point(0, 0);
            if (xflip)
            {
                oPos.X = -Colors.Length * scale.X;
                j.Context.Scale(-1, 1);
            }
            if (yflip)
            {
                oPos.Y = -Colors.Length * scale.Y;
                j.Context.Scale(1, -1);
            }

            for (int i = 0; i < Colors.Length; i++)
            {
                for (int jf = 0; jf < Colors[i].Length; jf++)
                {
                    var gj = Colors[i][jf];
                    if (gj == null)
                    {
                        continue;
                    }
                    var m = SonicManager.Instance.SonicLevel.Palette[(palette + SonicManager.Instance.IndexedPalette) % SonicManager.Instance.SonicLevel.Palette.Length][gj];
                    if (j.Context.FillStyle != "#" + m)
                        j.Context.FillStyle = "#" + m;

                    j.Context.FillRect(oPos.X + (i * scale.X), oPos.Y + jf * scale.Y, scale.X, scale.Y);
                }
            }
            var fd = j.DomCanvas;
            canvas.DrawImage((CanvasElement)fd[0], pos.X, pos.Y);

            if (ShowOutline)
            {
                canvas.StrokeStyle = "#DD0033";
                canvas.LineWidth = 3;
                canvas.StrokeRect(pos.X, pos.Y, 8 * scale.X, 8 * scale.Y);
            }
        }

        private bool CheckGood(CanvasContext2D canvas, Point pos, Point scale, bool xflip, bool yflip, int palette, int layer, int animationFrame)
        {
            if (index[0] != 'A')
            {
                if (willAnimate == null) return false;
                var an = willAnimate;

            }
            return false;



            /*
                            if (this.index[0] != 'A') {
                                if (this.willAnimate === false) return false;

                                if (this.willAnimate != undefined) {
                                    var an = this.willAnimate;
                                    var anin = an.AnimationTileIndex;

                                    if (sonicManager.CACHING) return true;

                                    var ind = animationFrame;

                                    var frame = an.Frames[ind];
                                    if (!frame) frame = an.Frames[0];
                                    var file = sonicManager.SonicLevel.AnimatedFiles[an.AnimationFile];
                                    var va = file[frame.StartingTileIndex + (this.index - anin)];
                                    if (va) {
                                        if (canvas.fillStyle != "rbga(255,255,255,255)")
                                            canvas.fillStyle = "rbga(255,255,255,255)";
                                        va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                                        return true;
                                    }
                                    return false;
                                }
                                for (var i = 0; i < sonicManager.SonicLevel.Animations.length; i++) {
                                    var an = sonicManager.SonicLevel.Animations[i];
                                    var anin = an.AnimationTileIndex;
                                    var num = an.NumberOfTiles;
                                    if (this.index >= anin && this.index < anin + num) {
                                        if (sonicManager.CACHING) return true;
                                        this.willAnimate = an;
                                        var ind = animationFrame;
                                        var frame = an.Frames[ind];
                                        if (!frame) frame = an.Frames[0];
                                        var file = sonicManager.SonicLevel.AnimatedFiles[an.AnimationFile];
                                        var va = file[frame.StartingTileIndex + (this.index - anin)];
                                        if (va) {
                                            if (canvas.fillStyle != "rbga(255,255,255,255)")
                                                canvas.fillStyle = "rbga(255,255,255,255)";
                                            va.draw(canvas, pos, scale, xflip, yflip, palette, layer, animationFrame);
                                            return true;
                                        }

                                    }
                                }
                                this.willAnimate = false;
                            }
                            return false;*/
        }
        private void ChangeColor(int x, int y, int color)
        {
            Colors[x][y] = color;
            Sprites = new List<int>();

        }
        /* 
         
            this.getAllPaletteIndexes = function () {

                if (!this.curPaletteIndexes) {

                    var d = [];
                    var dEnumerable = JSLINQ(d);

                    for (var i = 0; i < this.colors.length; i++) {
                        for (var jf = 0; jf < this.colors[i].length; jf++) {
                            var gj = this.colors[i][jf];
                            if (gj == 0) continue;

                            if (!dEnumerable.Any(function (D) {
                                return D == gj;
                            })) {
                                d.push(gj);
                            }
                        }
                    }


                    this.curPaletteIndexes = d;
                }
                return this.curPaletteIndexes;

            };
            this.clearCache = function() {
                this.curPaletteIndexes = undefined;

            };

         
            this.drawUI = function (canvas, pos, scale, xflip, yflip, palette) {


                for (var i = 0; i < this.colors.length; i++) {
                    for (var j = 0; j < this.colors[i].length; j++) {
                        var gj = this.colors[i][j];
                        if (gj == 0) continue;

                        //canvas.drawImage(sonicManager.SonicLevel.Palette[palette][gj], pos.x + ((i)) * scale.x, pos.y + (j) * scale.y, scale.x, scale.y);

                        var m = sonicManager.SonicLevel.Palette[palette][gj];
                        if (canvas.fillStyle != "#" + m)
                            canvas.fillStyle = "#" + m;

                        if (xflip) {
                            if (yflip) {
                                canvas.fillRect(pos.x + (7 - (i)) * scale.x, pos.y + (7 - j) * scale.y, scale.x, scale.y);
                            } else {
                                canvas.fillRect(pos.x + (7 - (i)) * scale.x, pos.y + (j) * scale.y, scale.x, scale.y);

                            }
                        } else {
                            if (yflip) {
                                canvas.fillRect(pos.x + ((i)) * scale.x, pos.y + (7 - j) * scale.y, scale.x, scale.y);
                            } else {
                                canvas.fillRect(pos.x + ((i)) * scale.x, pos.y + (j) * scale.y, scale.x, scale.y);
                            }
                        }


                    }
                }

                /*  if (showOutline) {
                canvas.strokeStyle = "#DD0033";
                canvas.lineWidth = 3;
                canvas.strokeRect(pos.x, pos.y, 8 * scale.x, 8 * scale.y);
                }#1#


            };
     
            };*/
    }
}
