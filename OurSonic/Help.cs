using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.CompilerServices;

namespace OurSonic
{
   public static class Help
    { 
       public static string ToPx(this int number)
       {
           return number + "px";
       }

       public static int Mod(int j, int n)
       {
           return ((j % n) + n) % n;
           
       }

       public static string ScaleSprite(object image, Point scale, Action<object> complete)
       {
           /*     var data = _H.getImageData(sprite);
                   var colors = [];
                   for (var f = 0; f < data.length; f += 4) {
                       colors.push(_H.colorObjectFromData(data, f));
                   }
                   var d = this.defaultCanvas().context.createImageData(sprite.width * scale.x, sprite.height * scale.y);
                   _H.setDataFromColors(d.data, colors, scale, sprite.width, { r: 0, g: 0, b: 0 });
                   return _H.loadSprite(_H.getBase64Image(d), complete);*/
           return null;
       }
       public static string ScaleCSImage(object image, Point scale, Action<object> complete)
       {

           /* var df = image.bytes;
                   var colors = [];
                   for (var f = 0; f < df.length; f += 1) {
                       colors.push(image.palette[df[f]]);
                   }
                   var dc = this.defaultCanvas();
                   var d = dc.context.createImageData(image.width * scale.x, image.height * scale.y);
                   _H.setDataFromColorsNew(d.data, colors, scale, image.width, { r: 0, g: 0, b: 0 });

                   return _H.loadSprite(_H.getBase64Image(d), complete);*/
           return null;
       }

       public static string LoadSprite(string spriteLocation, Action<LoadSpriteImage> action)
       {
           /*   var sprite1 = new Image();

                   sprite1.onload = function () {
                       sprite1.loaded = true;
                       if (complete) complete(sprite1);
                   };
                   sprite1.src = src;
                   return sprite1;*/
           return null;
       }
    }

    public class LoadSpriteImage
    {
        public int Tag { get; set; }
    }
}
