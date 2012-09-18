namespace OurSonic
{
    public class Animation
    {
        /*   function Animation(name, images) {
    this.images = images;
    this.name = name;
    this.draw = function (canvas, x, y, scale, animationIndex) {
        canvas.save(); 
        var jv = (function (ind, imgs) {
            var dj = 0;
            for (var vm in imgs) {
                if (dj == ind)
                    return vm;
                dj++;

            }
            return null;
        })(animationIndex, this.images);
        
        canvas.drawImage(sonicManager.SpriteCache.animationSprites[animationIndex + " " + name + scale.x + scale.y],
            (x - this.images[jv].width / 2) * scale.x, (y - this.images[jv].height / 2) * scale.y);
        canvas.restore();
    };
}*/
        public int LastAnimatedIndex { get; set; }
        public int? LastAnimatedFrame { get; set; }
        public AnimationFrame[] Frames { get; set; }
        public int AutomatedTiming { get; set; }
        public Animation(string name, object data) {}
    }
    public class AnimationFrame
    {
        public decimal Ticks { get; set; }
    }
}