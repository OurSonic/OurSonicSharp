using System;
using System.Html.Media.Graphics;
using OurSonic.Drawing;
namespace OurSonic
{
    public class HeightMask
    {
        public static string[] colors = new[] {"", "rgba(255,98,235,0.6)", "rgba(24,218,235,0.6)", "rgba(24,98,235,0.6)"};
        protected int Width { get; set; }
        protected int Height { get; set; }
        protected int[] Items { get; set; }
        protected int Integer { get; set; }
        protected int Index { get; set; }

        public HeightMask(int[] heightMap)
        {
            Items = heightMap;
            Width = 16;
            Height = 16;
            Integer = -1000;
        }

        public static implicit operator HeightMask(int d)
        {
            var m = d == 0 ? 0 : 16;
            return new HeightMask(new[] {m, m, m, m, m, m, m, m, m, m, m, m, m, m, m, m}); //16 m's
        }

        public static implicit operator int(HeightMask d)
        {
            if (d.Integer != -1000) return d.Integer;

            var good = d.Items[0];
            for (int i = 0; i < d.Items.Length; i++) {
                if (d.Items[i] != good) {
                    good = -999;
                    break;
                }
            }
            d.Integer = good;
            return good;
        }

        public void SetItem(int x, int y, RotationMode rotationMode)
        {
            var jx = 0;
            var jy = 0;
            switch (rotationMode) {
                case RotationMode.Floor:
                    jx = x;
                    jy = y;
                    break;
                case RotationMode.LeftWall:
                    jx = y;
                    jy = 15 - x;
                    break;
                case RotationMode.Ceiling:
                    jx = x;
                    jy = 15 - y;
                    break;
                case RotationMode.RightWall:
                    jx = y;
                    jy = x;
                    break;
            }
            Items[jx] = 16 - jy;
        }

        public void Draw(CanvasContext2D canvas, Point pos, Point scale, int state, bool xflip, bool yflip, int solid, int angle)
        {
            canvas.Save();

            var oPos = new Point(pos);
            if (xflip) {
                pos.X = -pos.X - 16 * scale.X;
                canvas.Scale(-1, 1);
            }
            if (yflip) {
                pos.Y = -pos.Y - 16 * scale.Y;
                canvas.Scale(1, -1);
            }
            var fd = SonicManager.Instance.SpriteCache.HeightMaps[Index];
            if (fd != null) {
                if (fd.Loaded())
                    canvas.DrawImage(fd, pos.X, pos.Y);
            } else {
                if (solid > 0) {
                    for (int x = 0; x < 16; x++) {
                        for (int y = 0; y < 16; y++) {
                            var jx = 0;
                            var jy = 0;
                            if (itemsGood(x, y)) {
                                jx = x;
                                jy = y;
                                var _x = pos.X + jx * scale.X;
                                var _y = pos.Y + jy * scale.Y;
                                canvas.LineWidth = 1;
                                canvas.FillStyle = colors[solid];
                                canvas.FillRect(_x, _y, scale.X, scale.Y);
                                if (angle != 255) {
                                    canvas.BeginPath();
                                    canvas.LineWidth = 3;
                                    canvas.StrokeStyle = "rgba(163,241,255,0.8)";
                                    canvas.MoveTo(pos.X + scale.X * 16 / 2, pos.Y + scale.Y * 16 / 2);
                                    canvas.LineTo(pos.X + scale.X * 16 / 2 - Help.Sin(angle) * scale.X * 8,
                                                  pos.Y + scale.Y * 16 / 2 - Help.Cos(angle) * scale.X * 8);
                                    canvas.Stroke();
                                    canvas.BeginPath();
                                    canvas.FillStyle = "rgba(163,241,255,0.8)";
                                    canvas.Arc(pos.X + scale.X * 16 / 2 - Help.Sin(angle) * scale.X * 8,
                                               pos.Y + scale.Y * 16 / 2 - Help.Cos(angle) * scale.X * 8, 5, 0, 2 * Math.PI, true);
                                    canvas.Fill();
                                }
/*
                                canvas.LineWidth = 1;
                                canvas.StrokeStyle = "#000000";
                                canvas.StrokeRect(pos.X, pos.Y, scale.X * 16, scale.Y * 16);
*/
                            }
                        }
                    }
                }
            }
            canvas.Restore();
            pos.X = oPos.X;
            pos.Y = oPos.Y;
        }

        private bool itemsGood(int x, int y)
        {
            if (Items[x] < 0)
                return Math.Abs(Items[x]) >= y;
            return Items[x] >= 16 - y;
        }

        /*          
            this.drawUI = function (canvas, pos, scale, state, xflip, yflip, solid, angle) {

                if (solid > 0) {
                    for (var x = 0; x < 16; x++) {
                        for (var y = 0; y < 16; y++) {
                            var jx = 0, jy = 0;
                            if (xflip) {
                                if (yflip) {
                                    jx = 15 - x;
                                    jy = 15 - y;
                                } else {
                                    jx = 15 - x;
                                    jy = y;
                                }
                            } else {
                                if (yflip) {
                                    jx = x;
                                    jy = 15 - y;
                                } else {
                                    jx = x;
                                    jy = y;
                                }
                            }

                            var _x = _H.floor(pos.x + (jx * scale.x));
                            var _y = _H.floor(pos.y + (jy * scale.y));

                            canvas.lineWidth = 1;
                            if (state <= 0 && _H.itemsGood(this.items, x, y, jy) && solid > 0) {
                                canvas.fillStyle = HeightMask.colors[solid];
                                canvas.fillRect(_x, _y, scale.x, scale.y);
                            } else {
                                if (state != -1) {
                                   // canvas.lineWidth = 1;
                                   // canvas.strokeStyle = "#0C3146";
                                   // canvas.strokeRect(_x, _y, scale.x, scale.y);
                                }
                            }



                        }
                    }

                    if (!(angle == 0 || angle == 255 || angle == 1)) {
                        if (xflip) {
                            if (yflip) {
                                angle = 192 - angle + 192;

                                angle = 128 - angle + 128;

                            } else {
                                angle = 128 - angle + 128;
                            }
                        } else {
                            if (yflip) {
                                angle = 192 - angle + 192;
                            } else {
                                angle = angle;
                            }
                        }
                    }

                    canvas.beginPath();
                    canvas.lineWidth = 4;
                    canvas.strokeStyle = "#03F3CA";
                    canvas.moveTo(_H.floor(pos.x + scale.x * 16 / 2), _H.floor(pos.y + scale.y * 16 / 2));
                    canvas.lineTo(_H.floor(pos.x + scale.x * 16 / 2 - _H.Sin(angle) * scale.x * 8), _H.floor(pos.y + scale.y * 16 / 2 - _H.Cos(angle) * scale.x * 8));
                    canvas.stroke();

                }
            };
         */
    }
}