using System;
using System.Html.Media.Graphics;
using OurSonic.Level;
namespace OurSonic.UIManager.Areas
{
    public class Editor
    {
        public LevelObjectAssetFrame AssetFrame { get; set; }
        public bool ShowOutline { get; set; }
        public bool ShowOffset { get; set; }
        public bool ShowHurtMap { get; set; }
        public int LineWidth { get; set; }
        public int CurrentColor { get; set; }
        public bool ShowCollideMap { get; set; }

        public Editor(LevelObjectAssetFrame assetFrame, bool showOffset)
        {
            AssetFrame = assetFrame;
            ShowOffset = showOffset;
            LineWidth = 1;
            CurrentColor = 0;
            ShowOutline = true;
        }

        public void Draw(CanvasContext2D canvas, Point pos, Point size, bool showCollideMap, bool showHurtMap)
        {
            AssetFrame.DrawUI(canvas, pos, size, ShowOutline, showCollideMap, showHurtMap, ShowOffset, false, false);
        }

        public void DrawPixel(Point location1)
        {
            var halfwidth = ( LineWidth / 2 );
            var map = !ShowHurtMap && !ShowCollideMap ? AssetFrame.ColorMap : ( ShowHurtMap ? AssetFrame.HurtSonicMap : AssetFrame.CollisionMap );

            if (LineWidth == 1)
                map[location1.X][location1.Y] = CurrentColor;
            else {
                for (var k = -halfwidth; k < halfwidth; k++) {
                    for (var c = -halfwidth; c < halfwidth; c++) {
                        map[Math.Min(Math.Max(0, location1.X + k), AssetFrame.Width)][Math.Min(Math.Max(0, location1.Y + c), AssetFrame.Height)] = CurrentColor;
                    }
                }
            }

            AssetFrame.ClearCache();
        }

        public void DrawLine(Point location1, Point location2)
        {
            var dx = Math.Abs(( location2.X ) - ( location1.X ));
            var dy = Math.Abs(( location2.Y ) - ( location1.Y ));
            var sx = 1;
            var sy = 1;
            var error = dx - dy;
            if (location1.X > location2.X)
                sx = -1;
            if (location1.Y > location2.Y)
                sy = -1;
            while (true) {
                DrawPixel(location1);

                if (location1.X == location2.X && location1.Y == location2.Y)
                    break;
                var e2 = error * 2;
                if (e2 > -dy) {
                    error -= dy;
                    location1.X += sx;
                }
                if (e2 < dx) {
                    error += dx;
                    location1.Y += sy;
                }
            }
        }
    }
}