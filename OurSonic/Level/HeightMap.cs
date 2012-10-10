using System;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level.Tiles;
using OurSonic.Utility;
namespace OurSonic.Level
{
    public class HeightMap
    {
        public static string[] colors = new[] {"", "rgba(255,98,235,0.6)", "rgba(24,218,235,0.6)", "rgba(24,98,235,0.6)"};
        [IntrinsicProperty]
        protected int Width { get; set; }
        [IntrinsicProperty]
        protected int Height { get; set; }
        [IntrinsicProperty]
        public int[] Items { get; set; } 
        [IntrinsicProperty]
        protected int Index { get; set; }

        public HeightMap(int[] heightMap, int i)
        {
            Items = heightMap;
            Width = 16;
            Height = 16; 
            Index = i;
        }
        public HeightMap(bool full)
        {
            Full = full;
        }

        public bool? Full { get; set; }
          

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

        public void Draw(CanvasContext2D canvas, Point pos, bool xflip, bool yflip, int solid, int angle)
        {
            if (this.Items == null) {
                return;
            }
            canvas.Save();

            var oPos = new Point(pos);
            if (xflip) {
                pos.X = -pos.X - 16;
                canvas.Scale(-1, 1);
            }
            if (yflip) {
                pos.Y = -pos.Y - 16;
                canvas.Scale(1, -1);
            }
            var fd = SonicManager.Instance.SpriteCache.HeightMaps[Index + ( solid << 20 )];
            if (Index != -1 && fd.Truthy())
                canvas.DrawImage(fd.Canvas, pos.X, pos.Y);
            else {
                var ntcanvas = CanvasInformation.Create(16, 16);
                var ncanvas = ntcanvas.Context;

                if (solid > 0) {
                    for (int x = 0; x < 16; x++) {
                        for (int y = 0; y < 16; y++) {
                            var jx = 0;
                            var jy = 0;
                            if (ItemsGood(Items, x, y)) {
                                jx = x;
                                jy = y;
                                var _x = jx;
                                var _y = jy;
                                ncanvas.LineWidth = 1;
                                ncanvas.FillStyle = colors[solid];
                                ncanvas.FillRect(_x, _y, 1, 1);
                                if (angle != 255) {
                                    ncanvas.BeginPath();
                                    ncanvas.LineWidth = 1;
                                    ncanvas.StrokeStyle = "rgba(163,241,255,0.8)";
                                    ncanvas.MoveTo(16 / 2, 16 / 2);
                                    ncanvas.LineTo(16 / 2 - Help.Sin(angle) * 8,16 / 2 - Help.Cos(angle) * 8);
                                    ncanvas.Stroke();
                                    /*ncanvas.BeginPath();
                                    ncanvas.FillStyle = "rgba(163,241,255,0.8)";
                                    ncanvas.Arc(16 / 2 - Help.Sin(angle) * 8,16 / 2 - Help.Cos(angle) * 8,5,0,2 * Math.PI,true);
                                    ncanvas.Fill();*/
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
                SonicManager.Instance.SpriteCache.HeightMaps[Index + ( solid << 20 )] = ntcanvas;

                canvas.DrawImage(ntcanvas.Canvas, pos.X, pos.Y);
            }
            canvas.Restore();
            pos.X = oPos.X;
            pos.Y = oPos.Y;
        }

        public static bool ItemsGood(int[] items, int x, int y)
        {
            if (items[x] < 0)
                return Math.Abs(items[x]) >= y;
            return items[x] >= 16 - y;
        }

     }
}