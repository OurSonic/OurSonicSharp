using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.Level
{
    [Serializable]
    public class Ring : Point
    {
        [IntrinsicProperty]
        public bool Active { get; set; }
        [IntrinsicProperty]
        protected int AnimationIndex { get; set; }
        [IntrinsicProperty]
        public int TickCount { get; set; }
        [IntrinsicProperty]
        public double Ysp { get; set; }
        [IntrinsicProperty]
        public double Xsp { get; set; }

        public Ring(bool active) : base(0, 0)
        {
            Active = active;
        }

        public void Draw(CanvasRenderingContext2D canvas, Point pos)
        {
            if (Active) {
                Ysp += 0.09375;
                X += (int) Xsp;
                Y += (int) Ysp;

                var wl = SonicManager.Instance.WindowLocation;
                if (X < wl.X || Y < wl.Y || X > wl.X + wl.Width || Y > wl.Y + wl.Height) {
                    TickCount = 0xfffffff;
                    return;
                }
                /*       if (SonicManager.Instance.SonicToon.CheckCollisionLine((this.X) + 8, (this.Y) + 8, 16, 1) != -1)
                {
                this.Ysp *= -0.75;
            }

            if (SonicManager.Instance.SonicToon.CheckCollisionLine((this.X) - 8, (this.Y) + 8, 26, 0) != -1) {
                this.Xsp *= -0.75;
            } */

                if (SonicManager.Instance.DrawTickCount > SonicManager.Instance.SonicToon.sonicLastHitTick + 64 &&
                    IntersectingRectangle.IntersectsRect(SonicManager.Instance.SonicToon.myRec,
                                                         new Rectangle(X - 8, Y - 8, 8 * 2, 2 * 8))) {
                    TickCount = 0xfffffff;
                    SonicManager.Instance.SonicToon.Rings++;
                    return;
                }

                TickCount++;
            }
            if (SonicManager.Instance.CurrentGameState == GameState.Playing)
                AnimationIndex = ( SonicManager.Instance.DrawTickCount % ( ( Active ? 4 : 8 ) * 4 ) ) / ( Active ? 4 : 8 );
            else AnimationIndex = 0;
            List<CanvasInformation> sprites = null;
            if (SonicManager.Instance.SpriteCache.Rings.Truthy())
                sprites = SonicManager.Instance.SpriteCache.Rings;
            else throw new Exception("bad ring animation");
            var sps = sprites[AnimationIndex];

            canvas.DrawImage(sps.Canvas, ( pos.X - 8 ), ( pos.Y - 8 ));
        }
    }
}