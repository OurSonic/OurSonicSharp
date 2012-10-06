using System.Html.Media.Graphics;
using OurSonic.Utility;
namespace OurSonic
{
    public class AnimationInstance
    {
        public void Tick() {}
        public void Draw(CanvasContext2D canvas, int i, int i1, Point scale) {}
/*

function AnimationInstance(animation, x, y, tick) {
    this.x = x;
    this.y = y;
    this.xsp = 0;
    this.ysp = 0;
    this.animation = animation;
    this.animationIndex = 0;

    this.draw = function (canvas, _x, _y, scale) {
        this.animation.draw(canvas, _x + x, _y + y, scale, this.animationIndex);
    };

    this.tick = tick || function () {

    };
}*/
    }
}