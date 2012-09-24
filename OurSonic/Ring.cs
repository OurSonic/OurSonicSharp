using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic
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

        public void Draw(CanvasContext2D canvas, Point pos, Point scale)
        {
            if (Active) {
                this.Ysp += 0.09375;
                this.X += (int)this.Xsp;
                this.Y += (int)this.Ysp;


                var wl = SonicManager.Instance.WindowLocation;
                if (this.X < wl.X || this.Y < wl.Y || this.X > wl.X + wl.Width || this.Y > wl.Y + wl.Height) {
                    this.TickCount = 0xfffffff;
                    return;
                }
/*            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) + 8, _H.floor(this.y) + 8, 16, 1) != -1) {
                this.ysp *= -0.75;
            }

            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) - 8, _H.floor(this.y) + 8, 26, 0) != -1) {
                this.xsp *= -0.75;
            }*/

                if (SonicManager.Instance.DrawTickCount > SonicManager.Instance.SonicToon.sonicLastHitTick + 64 &&
                    IntersectingRectangle.IntersectsRect(SonicManager.Instance.SonicToon.myRec,
                                       new Rectangle(this.X - 8 * scale.X, this.Y - 8 * scale.Y, 8 * 2 * scale.X, 2 * 8 * scale.Y)))
                {
                    this.TickCount = 0xfffffff;
                    SonicManager.Instance.SonicToon.Rings++;
                    return;
                }

                this.TickCount++;

            }
            if ( SonicManager.Instance.CurrentGameState == GameState.Playing)
                AnimationIndex = ( SonicManager.Instance.DrawTickCount % ( ( Active ? 4 : 8 ) * 4 ) ) / ( Active ? 4 : 8 );
            else AnimationIndex = 0;
            List<ImageElement> sprites = null;
            if (SonicManager.Instance.SpriteCache.Rings.Truthy())
                sprites = SonicManager.Instance.SpriteCache.Rings;
            else throw new Exception("bad ring animation");
            var sps = sprites[AnimationIndex * 200 + scale.Y * 100 + scale.X];
            if (sps.Falsey()) throw new Exception("bad ring animation");
            if (sps.Loaded()) canvas.DrawImage(sps, ( pos.X - 8 ) * scale.X, ( pos.Y - 8 ) * scale.Y);
        }

    }
}