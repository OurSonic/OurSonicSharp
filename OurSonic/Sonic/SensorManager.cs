using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level;
using OurSonic.Level.Tiles;
using OurSonic.Utility;
using OurSonicModels;
namespace OurSonic.Sonic
{
    public class SensorManager
    {
        [IntrinsicProperty]
        protected JsDictionary<string, Sensor> Sensors { get; set; }
        [IntrinsicProperty]
        protected JsDictionary<string, SensorM> SensorResults { get; set; }

        public SensorManager()
        {
            Sensors = new JsDictionary<string, Sensor>();
            SensorResults = new JsDictionary<string, SensorM>();
        }

        public Sensor AddSensor(string letter, Sensor sensor)
        {
            Sensors[letter] = ( sensor );
            SensorResults[letter] = null;
            return sensor;
        }

        public Sensor CreateVerticalSensor(string letter, int x, int y1, int y2, string color, bool ignoreSolid = false)
        {
            return AddSensor(letter, new Sensor(x, x, y1, y2, this, color, ignoreSolid, letter));
        }

        public Sensor CreateHorizontalSensor(string letter, int y, int x1, int x2, string color, bool ignoreSolid = false)
        {
            return AddSensor(letter, new Sensor(x1, x2, y, y, this, color, ignoreSolid, letter));
        }

        public bool Check(Sonic character)
        {
            bool none = false;
            foreach (var i in Sensors) {
                SensorResults[i.Key] = i.Value.Check(character);
                none = none || ( SensorResults[i.Key] != null );
            }
            return none;
        }

        public SensorM GetResult(string mn)
        {
            return SensorResults[mn];
        }

        public void Draw(CanvasRenderingContext2D canvas, Sonic sonic)
        {
            foreach (var sensor in Sensors) {
                sensor.Value.Draw(canvas, sonic, SensorResults[sensor.Key]);
            }
        }

        public void BuildChunk(TileChunk chunk, bool isLayerOne)
        {
            if (isLayerOne)
            {
                if (chunk.HeightBlocks1.Truthy())
                    return;
                var hb1 = chunk.HeightBlocks1 = new Solidity[128][];
                var ab1 = chunk.AngleMap1 = new int[8][];
                for (var _1 = 0; _1 < 128; _1++)
                {
                    hb1[_1] = new Solidity[128];
                }
                for (var _1 = 0; _1 < 8; _1++)
                {
                    ab1[_1] = new int[8];
                }

                for (var _y = 0; _y < 8; _y++)
                {
                    for (var _x = 0; _x < 8; _x++)
                    {
                        var tp = chunk.TilePieces[_x][_y];

                        ab1[_x][_y] = tp.GetLayer1Angles();

                        if (!(ab1[_x][_y] == 0 || ab1[_x][_y] == 255 || ab1[_x][_y] == 1))
                        {
                            if (tp.XFlip)
                            {
                                if (tp.YFlip)
                                {
                                    ab1[_x][_y] = 192 - ab1[_x][_y] + 192;

                                    ab1[_x][_y] = 128 - ab1[_x][_y] + 128;
                                }
                                else
                                    ab1[_x][_y] = 128 - ab1[_x][_y] + 128;
                            }
                            else
                            {
                                if (tp.YFlip)
                                    ab1[_x][_y] = 192 - ab1[_x][_y] + 192;
                                else
                                    ab1[_x][_y] = (ab1[_x][_y]);
                            }
                        }

                        var __x = 0;
                        var __y = 0;

                        HeightMap heightMask = tp.GetLayer1HeightMaps();
                        int[] heightMaskItems = null;
                        if (heightMask == null) continue;
                        Solidity mj;
                        if (heightMask.Full != null)
                        {
                            mj = !heightMask.Full.Value ? 0 : tp.Solid1;
                            for (__y = 0; __y < 16; __y++)
                            {
                                for (__x = 0; __x < 16; __x++)
                                {
                                    hb1[(_x * 16 + __x)][(_y * 16 + __y)] = mj;
                                }
                            }
                        }
                        else
                            heightMaskItems = heightMask.Items;

                        for (__y = 0; __y < 16; __y++)
                        {
                            for (__x = 0; __x < 16; __x++)
                            {
                                var jx = 0;
                                var jy = 0;
                                if (tp.XFlip)
                                {
                                    if (tp.YFlip)
                                    {
                                        jx = 15 - __x;
                                        jy = 15 - __y;
                                    }
                                    else
                                    {
                                        jx = 15 - __x;
                                        jy = __y;
                                    }
                                }
                                else
                                {
                                    if (tp.YFlip)
                                    {
                                        jx = __x;
                                        jy = 15 - __y;
                                    }
                                    else
                                    {
                                        jx = __x;
                                        jy = __y;
                                    }
                                }

                                if (heightMask.Full == null)
                                {
                                    switch (tp.Solid1)
                                    {
                                        case 0:
                                            hb1[(_x * 16 + jx)][(_y * 16 + jy)] = 0;
                                            break;
                                        case (Solidity)1:
                                        case (Solidity)2:
                                        case (Solidity)3:
                                            hb1[(_x * 16 + jx)][(_y * 16 + jy)] = HeightMap.ItemsGood(heightMaskItems, __x, __y) ? tp.Solid1 : 0;
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if (chunk.HeightBlocks2.Truthy())
                    return;

                var hb2 = chunk.HeightBlocks2 = new Solidity[128][];
                var ab2 = chunk.AngleMap2 = new int[8][];
                for (var _1 = 0; _1 < 128; _1++)
                {
                    hb2[_1] = new Solidity[128];
                }
                for (var _1 = 0; _1 < 8; _1++)
                {
                    ab2[_1] = new int[8];
                }

                for (var _y = 0; _y < 8; _y++)
                {
                    for (var _x = 0; _x < 8; _x++)
                    {
                        var tp = chunk.TilePieces[_x][_y];

                        ab2[_x][_y] = tp.GetLayer2Angles();

                        if (!(ab2[_x][_y] == 0 || ab2[_x][_y] == 255 || ab2[_x][_y] == 1))
                        {
                            if (tp.XFlip)
                            {
                                if (tp.YFlip)
                                {
                                    ab2[_x][_y] = 192 - ab2[_x][_y] + 192;

                                    ab2[_x][_y] = 128 - ab2[_x][_y] + 128;
                                }
                                else
                                    ab2[_x][_y] = 128 - ab2[_x][_y] + 128;
                            }
                            else
                            {
                                if (tp.YFlip)
                                    ab2[_x][_y] = 192 - ab2[_x][_y] + 192;
                                else
                                    ab2[_x][_y] = (ab2[_x][_y]);
                            }
                        }

                        int __x;
                        int __y;
                        var hd2 = tp.GetLayer2HeightMaps();
                        if (hd2 == null) continue;
                        Solidity mj;

                        int[] hd2Items = null;

                        if (hd2.Full != null)
                        {
                            mj = hd2.Full == false ? 0 : tp.Solid2;
                            for (__y = 0; __y < 16; __y++)
                            {
                                for (__x = 0; __x < 16; __x++)
                                {
                                    hb2[(_x * 16 + __x)][(_y * 16 + __y)] = mj;
                                }
                            }
                        }
                        else
                            hd2Items = hd2.Items;

                        for (__y = 0; __y < 16; __y++)
                        {
                            for (__x = 0; __x < 16; __x++)
                            {
                                var jx = 0;
                                var jy = 0;
                                if (tp.XFlip)
                                {
                                    if (tp.YFlip)
                                    {
                                        jx = 15 - __x;
                                        jy = 15 - __y;
                                    }
                                    else
                                    {
                                        jx = 15 - __x;
                                        jy = __y;
                                    }
                                }
                                else
                                {
                                    if (tp.YFlip)
                                    {
                                        jx = __x;
                                        jy = 15 - __y;
                                    }
                                    else
                                    {
                                        jx = __x;
                                        jy = __y;
                                    }
                                }

                                if (hd2.Full == null)
                                {
                                    switch (tp.Solid2)
                                    {
                                        case (Solidity)0:
                                            hb2[(_x * 16 + jx)][(_y * 16 + jy)] = Solidity.NotSolid;
                                            break;
                                        case (Solidity)1:
                                        case (Solidity)2:
                                        case (Solidity)3:
                                            hb2[(_x * 16 + jx)][(_y * 16 + jy)] = HeightMap.ItemsGood(hd2Items, __x, __y) ? tp.Solid2 : 0;
                                            break;
                                    }
                                }

                                //imap[(x * 128 + _x * 16 + __x) + (y * 128 + _y * 16 + __y) * (SonicManager.Instance.SonicLevel.LevelWidth)] = tp.heightMask.angle;
                            }
                        }
                    }
                }
            }
        }


    }
    public class Sensor
    {
        private SensorM __currentM = new SensorM(0, 0);
        [IntrinsicProperty]
        public int Value { get; set; }
        [IntrinsicProperty]
        public int Angle { get; set; }
        [IntrinsicProperty]
        public string Letter { get; set; }
        [IntrinsicProperty]
        public bool Chosen { get; set; }
        [IntrinsicProperty]
        protected bool IgnoreSolid { get; set; }
        [IntrinsicProperty]
        protected string Color { get; set; }
        [IntrinsicProperty]
        protected SensorManager Manager { get; set; }
        [IntrinsicProperty]
        protected int X1 { get; set; }
        [IntrinsicProperty]
        protected int X2 { get; set; }
        [IntrinsicProperty]
        protected int Y1 { get; set; }
        [IntrinsicProperty]
        protected int Y2 { get; set; }

        public Sensor(int x1, int x2, int y1, int y2, SensorManager manager, string color, bool ignoreSolid, string letter)
        {
            X1 = x1;
            X2 = x2;
            Y1 = y1;
            Y2 = y2;
            Manager = manager;
            Color = color;
            IgnoreSolid = ignoreSolid;
            Letter = letter;
        }

        private SensorM checkCollisionLineWrap(int x1, int x2, int y1, int y2, bool ignoreSolid)
        {
            //todo: this is some of the worst code man has ever written. if youre reading this im sorry. send me an email dested@gmail for an apology.

            var _x = x1 / 128;
            var _y = Help.Mod(y1 / 128, SonicManager.Instance.SonicLevel.LevelHeight);
            var tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x, _y);
            Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);

            var curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
            var cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
            var __x = x1 - _x * 128;
            var __y = y1 - _y * 128;
            var i = 0;
            var length = 0;

            if (y1 == y2) {
                if (Math.Max(x1, x2) > SonicManager.Instance.SonicLevel.LevelWidth * 128) {
                    __currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128 - 20;
                    __currentM.Angle = 0xff;
                    return __currentM;
                }
                if (x1 < x2) {
                    length = x2 - x1;
                    if (curh[( __x )][__y] >= (Solidity) 2) {
                        for (i = 0; i < 128 * 2; i++) {
                            while (true) {
                                if (__x - i < 0) {
                                    if (_x - 1 < 0) {
                                        __currentM.Value = 0;
                                        __currentM.Angle = 0xFF;
                                        return __currentM;
                                    }
                                    tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x - 1, _y);
                                    Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);

                                    curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                    cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                    __x += 128;
                                } else break;
                            }
                            if ( /*x1 - i > SonicManager.Instance.SonicLevel.LevelWidth || */curh[( __x - i )][__y] >= (Solidity) 1 ||
                                                                                             SonicManager.Instance.SonicToon.CheckCollisionWithObjects
                                                                                                     (x1 - i, y1, Letter)) {
                                /*            if (!( ( curh[( __x - i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                                    continue;*/

                                __currentM.Value = x1 - i;
                                __currentM.Angle = cura[( __x - i ) / 16][( __y ) / 16];
                                return __currentM;
                            }
                        }
                    }

                    for (i = 0; i < length; i++) {
                        while (true) {
                            if (__x + i >= 128) {
/*
                                if (_x + 1 >= SonicManager.Instance.SonicLevel.LevelWidth)
                                {
                                    this.__currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128;
                                    this.__currentM.Angle = 0xFF;
                                    return this.__currentM;
                                }
*/

                                tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x + 1, _y);
                                Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);

                                curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                __x -= 128;
                            } else break;
                        }

                        if ( /*x1 + i > SonicManager.Instance.SonicLevel.LevelWidth || */ curh[( __x + i )][__y] >= (Solidity) 1 ||
                                                                                          SonicManager.Instance.SonicToon.CheckCollisionWithObjects(
                                                                                                  x1 + i, y1, Letter)) {
                            /*if (!( ( curh[( __x + i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                                continue;*/

                            __currentM.Value = x1 + i;
                            __currentM.Angle = cura[( __x + i ) / 16][( __y ) / 16];
                            return __currentM;
                        }
                    }
                } else {
                    length = x1 - x2;
                    if (curh[( __x )][__y] >= (Solidity) 2) {
                        for (i = 0; i < 128 * 2; i++) {
                            while (true) {
                                if (__x + i >= 128) {
/*
                                    if (_x + 1 >= SonicManager.Instance.SonicLevel.LevelWidth)
                                    {
                                        this.__currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128;
                                        this.__currentM.Angle = 0xFF;
                                        return this.__currentM;
                                    }
*/
                                    tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x + 1, _y);
                                    Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);

                                    curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                    cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                    __x -= 128;
                                } else break;
                            }
                            if ( /*x1 + i > SonicManager.Instance.SonicLevel.LevelWidth || */  curh[( __x + i )][__y] >= (Solidity) 1 ||
                                                                                               SonicManager.Instance.SonicToon.
                                                                                                            CheckCollisionWithObjects(x1 + i, y1, Letter)) {
                                /*    if (!( ( curh[( __x + i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                                    continue;*/

                                __currentM.Value = x1 + i;
                                __currentM.Angle = cura[( __x + i ) / 16][( __y ) / 16];
                                return __currentM;
                            }
                        }
                    }

                    for (i = 0; i < length; i++) {
                        while (true) {
                            if (__x - i < 0) {
                                if (_x - 1 < 0) {
                                    __currentM.Value = 0;
                                    __currentM.Angle = 0xFF;
                                    return __currentM;
                                }
                                tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x - 1, _y);
                                Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);

                                curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                __x += 128;
                            } else break;
                        }

                        if ( /*x1 - i > SonicManager.Instance.SonicLevel.LevelWidth ||*/ curh[( __x - i )][__y] >= (Solidity) 1 ||
                                                                                         SonicManager.Instance.SonicToon.CheckCollisionWithObjects(
                                                                                                 x1 - i, y1, Letter)) {
                            /*          if (!( ( curh[( __x - i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                                continue;*/

                            __currentM.Value = x1 - i;
                            __currentM.Angle = cura[( __x - i ) / 16][( __y ) / 16];
                            return __currentM;
                        }
                    }
                }
            } else {
                //top to bottom 
                if (y1 < y2) {
                    length = y2 - y1;
                    if (curh[( __x )][__y] >= (Solidity) 2) {
                        for (i = 0; i < 128 * 2; i++) {
                            while (true) {
                                if (__y - i < 0) {
                                    tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x, Help.Mod(( _y - 1 ), SonicManager.Instance.SonicLevel.LevelHeight));
                                    Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);
                                    curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                    cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                    __y += 128;
                                } else break;
                            }
                            if (curh[__x][__y - i] > (Solidity) 1 || SonicManager.Instance.SonicToon.CheckCollisionWithObjects(x1, y1 - i, Letter)) {
/*
                                if (!( ( curh[__x][__y - i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) )) {
                                    Help.Debugger();
                                    continue;
                                }
*/

                                __currentM.Value = y1 - i;
                                __currentM.Angle = cura[( __x ) / 16][( __y - i ) / 16];
                                return __currentM;
                            }
                        }
                    }
                    for (i = 0; i < length; i++) {
                        while (true) {
                            if (__y + i >= 128) {
                                tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x, ( _y + 1 ) % SonicManager.Instance.SonicLevel.LevelHeight);
                                Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);
                                curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                __y -= 128;
                            } else break;
                        }
                        if (curh[__x][__y + i] >= (Solidity) 1 || SonicManager.Instance.SonicToon.CheckCollisionWithObjects(x1, y1 + i, Letter)) {
                            if (curh[__x][__y + i] == (Solidity) 1 && SonicManager.Instance.SonicToon.InAir && SonicManager.Instance.SonicToon.Ysp < 0)
                                continue;

/*
                            if (!( ( curh[__x][__y + i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                            {
                                Help.Debugger();
                                continue;
                            }
*/
                            __currentM.Value = y1 + i;
                            __currentM.Angle = cura[( __x ) / 16][( __y + i ) / 16];
                            return __currentM;
                        }
                    }
                } else {
                    length = y1 - y2;
                    if (curh[( __x )][__y] >= (Solidity) 2) {
                        for (i = 0; i < 128 * 2; i++) {
                            while (true) {
                                if (__y + i >= 128) {
                                    tc =
                                            SonicManager.Instance.SonicLevel.GetChunkAt(_x, ( _y + 1 ) % SonicManager.Instance.SonicLevel.LevelHeight);
                                    Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);
                                    curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                    cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                    __y -= 128;
                                } else break;
                            }
                            if (curh[__x][__y + i] >= (Solidity) 1 || SonicManager.Instance.SonicToon.CheckCollisionWithObjects(x1, y1 + i, Letter)) {
/*
                                if (!( ( curh[__x][__y + i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                                {
                                    Help.Debugger();
                                    continue;
                                }
*/
                                __currentM.Value = y1 + i;
                                __currentM.Angle = cura[( __x ) / 16][( __y + i ) / 16];
                                return __currentM;
                            }
                        }
                    }

                    for (i = 0; i < length; i++) {
                        while (true) {
                            if (__y - i < 0) {
                                tc = SonicManager.Instance.SonicLevel.GetChunkAt(_x, Help.Mod(( _y - 1 ), SonicManager.Instance.SonicLevel.LevelHeight));
                                Manager.BuildChunk(tc, SonicManager.Instance.SonicLevel.CurHeightMap);
                                curh = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.HeightBlocks1 : tc.HeightBlocks2;
                                cura = SonicManager.Instance.SonicLevel.CurHeightMap ? tc.AngleMap1 : tc.AngleMap2;
                                __y += 128;
                            } else break;
                        }
                        if (curh[__x][__y - i] > (Solidity) 1 || SonicManager.Instance.SonicToon.CheckCollisionWithObjects(x1, y1 + i, Letter)) {
/*                            if (!( ( curh[__x][__y - i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
                            {
                                Help.Debugger();
                                continue;
                            }*/
                            __currentM.Value = y1 - i;
                            __currentM.Angle = cura[( __x ) / 16][( __y - i ) / 16];
                            return __currentM;
                        }
                    }
                }
            }
            return null;
        }


        public void Draw(CanvasRenderingContext2D canvas, Sonic character, SensorM sensorResult)
        {
            var x = Help.Floor(character.X) - SonicManager.Instance.WindowLocation.X;
            var y = Help.Floor(character.Y) - SonicManager.Instance.WindowLocation.Y;

            canvas.BeginPath();
            if (sensorResult.Truthy() && sensorResult.Chosen) {
                canvas.StrokeStyle = "#FFF76D";
                canvas.LineWidth = 4;
            } else {
                canvas.StrokeStyle = Color;
                canvas.LineWidth = 2;
            }
            switch (character.Mode) {
                case RotationMode.Floor:
                    canvas.MoveTo(( x + X1 ), ( y + Y1 ));
                    canvas.LineTo(( x + X2 ), ( y + Y2 ));
                    break;
                case RotationMode.LeftWall:
                    canvas.MoveTo(( x - Y1 ), ( y + X1 ));
                    canvas.LineTo(( x - Y2 ), ( y + X2 ));
                    break;
                case RotationMode.Ceiling:
                    canvas.MoveTo(( x - X1 ), ( y - Y1 ));
                    canvas.LineTo(( x - X2 ), ( y - Y2 ));
                    break;
                case RotationMode.RightWall:
                    canvas.MoveTo(( x + Y1 ), ( y - X1 ));
                    canvas.LineTo(( x + Y2 ), ( y - X2 ));
                    break;
            }

            canvas.ClosePath();
            canvas.Stroke();
        }

        public SensorM Check(Sonic character)
        {
            var _y2 = character.InAir ? Y2 : Y2;

            SensorM m = null;
            var x = Help.Floor(character.X);
            var y = Help.Floor(character.Y);
            switch (character.Mode) {
                case RotationMode.Floor:
                    m = checkCollisionLineWrap(x + X1, x + X2, y + Y1, y + _y2, IgnoreSolid);
                    break;
                case RotationMode.LeftWall:
                    m = checkCollisionLineWrap(x - Y1, x - _y2, y + X1, y + X2, IgnoreSolid);
                    break;
                case RotationMode.Ceiling:
                    m = checkCollisionLineWrap(x - X1, x - X2, y - Y1, y - _y2, IgnoreSolid);
                    break;
                case RotationMode.RightWall:
                    m = checkCollisionLineWrap(x + Y1, x + _y2, y - X1, y - X2, IgnoreSolid);
                    break;
            }

            if (m != null) {
                m.Letter = Letter;
                if (m.Angle == 255 || m.Angle == 0 || m.Angle == 1) {
                    if (character.Mode == RotationMode.Floor)
                        m.Angle = 255;
                    if (character.Mode == RotationMode.LeftWall)
                        m.Angle = 64;
                    if (character.Mode == RotationMode.Ceiling)
                        m.Angle = 128;
                    if (character.Mode == RotationMode.RightWall)
                        m.Angle = 192;
                }
            }
            return m;
        }
    }
    [Serializable]
    public class SensorM
    {
        public int Value { get; set; }
        public int Angle { get; set; }
        public string Letter { get; set; }
        public bool Chosen { get; set; }

        [ObjectLiteral]
        public SensorM(int value, int angle)
        {
            Value = value;
            Angle = angle;
        }
    }
}