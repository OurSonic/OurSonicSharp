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
        public Ring(bool active) : base(0, 0) {}

        public void Draw(CanvasContext2D canvas, Point pos, Point scale)
        {
            if (Active) {
                /*
                 
  if (active) {
            this.ysp += 0.09375;
            this.x += this.xsp;
            this.y += this.ysp;

            if (this.x < sonicManager.windowLocation.x || this.y < sonicManager.windowLocation.y || this.x > sonicManager.windowLocation.x + sonicManager.windowLocation.width || this.y > sonicManager.windowLocation.y + sonicManager.windowLocation.height) {
                this.tickCount = 0xffffffff;
                return false;
            }
/*            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) + 8, _H.floor(this.y) + 8, 16, 1) != -1) {
                this.ysp *= -0.75;
            }

            if (sonicManager.sonicToon.checkCollisionLine(_H.floor(this.x) - 8, _H.floor(this.y) + 8, 26, 0) != -1) {
                this.xsp *= -0.75;
            }#1#

            if (sonicManager.drawTickCount > sonicManager.sonicToon.sonicLastHitTick + 64 && 
                _H.intersectRect(sonicManager.sonicToon.myRec, { x: this.x - 8 * scale.x, width:  8 *2* scale.x, y: this.y - 8 * scale.y, height: 2* 8 * scale.y })) {
                this.tickCount = 0xffffffff;
                sonicManager.sonicToon.rings++;
                return false;
            }

            this.tickCount++;
        }
                 */
            }

            if (true || SonicManager.Instance.CurrentGameState == GameState.Playing)
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