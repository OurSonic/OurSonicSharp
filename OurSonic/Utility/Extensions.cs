using System;
using System.Collections.Generic;
using System.Collections.TypedArrays;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
namespace OurSonic.Utility
{
    public static class Extensions
    {
        [InlineCode("{o}")]
        public static dynamic Me(this object o)
        {
            return o;
        }

        [InlineCode("{o}")]
        
        public static T Me<T>(this object o)
        {
            return default(T);
        }

        [InlineCode("{o}")]
        
        public static T[] Array<T>(this List<T> o)
        {
            return new T[0];
        }

        private static int[] offsets = { 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
/*
        private static int[] offsets = {
                                               0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3,
                                               2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                               1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1,
                                               -1, -2, -2, -2, -2, -2, -2, -2, -2, -3, -3, -3, -2,
                                               -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, -1,
                                               -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0,
                                       };
*/

        static void MakeOffset()
        {
            if (DOES % 3 == 0)
            {
                offsets = new int[] { 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
                return;
            } if (DOES % 3 == 1)
            {
                offsets = new int[] { 0 };
                return;
            }

            if (SonicManager.Instance.DrawTickCount % 10 != 0)
                return;

            var c = 3;//(int)(Math.Abs(Math.Sin(SonicManager.Instance.DrawTickCount) * 10));
            List<int> ms = new List<int>();

            for (int i = -c; i < c; i++)
            {
                int len = ((c + 1) - Math.Abs(i)) * Math.Abs(i);
                for (int j = 0; j < len; j++)
                {
                    ms.Add(i);
                }
            } for (int i = c; i > -c; i--)
            {
                int len = ((c + 1) - Math.Abs(i)) * Math.Abs(i);
                for (int j = 0; j < len; j++)
                {
                    ms.Add(i);
                }
            }
            offsets = ms.Array();
        }

        

        private static int curY = 0;
        public static int DOES = 0;
        public static void OffsetStuffOtherWay(this CanvasRenderingContext2D context)
        {


            var offsets_ = offsets;
            int cury = curY;
            if (SonicManager.Instance.DrawTickCount % 3 == 0)
                cury++; 
            var n = offsets_.Length;




            for (var y = 0; y < 240; y++)
            {
                var off = (offsets_[(((cury + y) % n) + n) % n]);

                context.DrawImage(context.Me().canvas, 0, y,320,1,off,y,320,1);


            }
            //context.PutImageData(imaged, 0, 0);
            curY = cury;

        }
         public static void OffsetPixelsForWater(this CanvasRenderingContext2D context)
         {
             return;
            MakeOffset();
        /*    if (DOES)
            {
                OffsetStuffOtherWay(context);
                return;
            }*/
            var offsets_ = offsets;
            int cury = curY;
            if (SonicManager.Instance.DrawTickCount % 3 == 0)
                cury++;
            ImageData imaged = context.GetImageData(0, 0, 320, 240);
            ImageData imaged2 = context.GetImageData(0, 0, 320, 240);

            Uint8ClampedArray imagedArray = imaged.Data;
            Uint8ClampedArray imaged2Array = imaged2.Data;
            var n = offsets_.Length;
            for (var y = 0; y < 240; y++)
            {
                var off = -(offsets_[(((cury + y) % n) + n) % n]);
                if (off == 0) continue;
                int yOff = y * 320;

                for (var x = 0; x < 320; x++)
                {

                    var ind = (x + yOff) * 4;

                    int mc = (x + off);

                    if (mc < 0)
                        mc = 0;
                    if (mc >= 320)
                        mc = 319;


                    int index = (mc + yOff) * 4;
                    imagedArray[ind + 0] = imaged2Array[index + 0];
                    imagedArray[ind + 1] = imaged2Array[index + 1];
                    imagedArray[ind + 2] = imaged2Array[index + 2];
                    imagedArray[ind + 3] = imaged2Array[index + 3];

                }
            }
            context.PutImageData(imaged, 0, 0);
            curY = cury;

        }

        public static ExtraData<T, T2> WithData<T, T2>(this T item, T2 data)
        {
            return new ExtraData<T, T2>(item, data);
        }

        public static string Percent(this int num)
        {
            return num + "%";
        }

        public static string Percent(this double num)
        {
            return num + "%";
        }
    }
}