using System.Html;
using System.Html.Media.Graphics;
using OurSonic.Utility;
namespace OurSonic
{
    public class SpeedTester
    {
        private int HEIGHT = 1;
        private int SIZE = 128 * 4;
        private int WIDTH = 1;
        private ImageData img;

        public SpeedTester(CanvasInformation gameCanvas)
        {
            var m = Help.DefaultCanvas(SIZE, SIZE);
            gameCanvas.Canvas.Width = Window.OuterWidth;
            gameCanvas.Canvas.Height = Window.OuterHeight;

            var con = m.Context;
            img = con.GetImageData(0, 0, SIZE, SIZE);
            Window.SetInterval(() => { makeit(gameCanvas, m); }, 1000 / 60);
        }

        private void makeit(CanvasInformation gameCanvas, CanvasInformation m)
        {
            var mc = img.Data;
            int length = mc.Length;
            for (int i = 0; i < length; i += 4) {
                mc[i] = 205;
                mc[i + 1] = i % 255;
                mc[i + 2] = 245;
                mc[i + 3] = 255;
            }

            var mj = gameCanvas.Context;
            var fm = Help.ScalePixelData(new Point(2, 2), img);

            mj.Save();
            for (int w = 0; w < WIDTH; w++) {
                for (int h = 0; h < HEIGHT; h++) {
                    mj.PutImageData(fm, w * SIZE, h * SIZE);
                }
            }
            mj.Restore();
        }
    }
}