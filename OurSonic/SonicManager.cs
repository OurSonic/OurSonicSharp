﻿using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level;
using OurSonic.Tiles;
using OurSonic.Utility;
using jQueryApi;
namespace OurSonic
{
    public partial class SonicManager
    {
        public static SonicManager Instance;
        private static string[] base64chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".Split("");
        private static JsDictionary<string, int> base64Inv;
        private static JsDictionary<int, Point[]> _cachedOffs = new JsDictionary<int, Point[]>();
        public readonly CanvasInformation mainCanvas;
        private readonly SonicEngine myEngine;
        public readonly ObjectManager objectManager;
        public int DrawTickCount;
        private int imageLength;
        private string myStatus;
        public DoublePoint overrideRealScale;
        private JsDictionary<string, SonicImage> sonicSprites;
        public int tickCount;
        private bool waitingForDrawContinue;
        public bool waitingForTickContinue;
        [IntrinsicProperty]
        public GameState CurrentGameState { get; set; }
        [IntrinsicProperty]
        public IntersectingRectangle BigWindowLocation { get; set; }
        [IntrinsicProperty]
        public UIManager.UIManager UIManager { get; set; }
        [IntrinsicProperty]
        public Sonic SonicToon { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public IntersectingRectangle WindowLocation { get; set; }
        [IntrinsicProperty]
        public DoublePoint RealScale { get; set; }
        [IntrinsicProperty]
        public bool InHaltMode { get; set; }
        [IntrinsicProperty]
        public int IndexedPalette { get; set; }
        [IntrinsicProperty]
        public List<Animation> Animations { get; set; }
        [IntrinsicProperty]
        public List<AnimationInstance> AnimationInstances { get; set; }
        [IntrinsicProperty]
        public Ring GoodRing { get; set; }
        [IntrinsicProperty]
        public bool ShowHeightMap { get; set; }
        [IntrinsicProperty]
        public Point ScreenOffset { get; set; }
        [IntrinsicProperty]
        public List<Ring> ActiveRings { get; set; }
        [IntrinsicProperty]
        public Action ForceResize { get; set; }
        [IntrinsicProperty]
        public SonicBackground Background { get; set; }
        [IntrinsicProperty]
        public ClickState ClickState { get; set; }
        [IntrinsicProperty]
        public SonicLevel SonicLevel { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectInfo> InFocusObjects { get; set; }
        [IntrinsicProperty]
        protected bool Loading { get; set; }
        [IntrinsicProperty]
        public SpriteCache SpriteCache { get; set; }
        [IntrinsicProperty]
        protected SpriteLoader SpriteLoader { get; set; }
        [IntrinsicProperty]
        public bool TypingInEditor { get; set; }
        protected string Status
        {
            get { return myStatus; }
            set
            {
                OurSonic.UIManager.UIManager.UpdateTitle(value);
                myStatus = value;
            }
        }

        static SonicManager()
        {
            base64Inv = new JsDictionary<string, int>();
            for (var i = 0; i < base64chars.Length; i++) {
                base64Inv[base64chars[i]] = i;
            }
        }

        public SonicManager(SonicEngine engine, CanvasInformation gameCanvas, Action resize)
        {
            Instance = this;
            //            SonicToon = new Sonic();

            ClickState = ClickState.PlaceRing;

            myEngine = engine;
            myEngine.canvasWidth = jQuery.Window.GetWidth();
            myEngine.canvasHeight = jQuery.Window.GetHeight();

            gameCanvas.DomCanvas[0].SetAttribute("width", myEngine.canvasWidth);
            gameCanvas.DomCanvas[0].SetAttribute("height", myEngine.canvasHeight);

            jQuery.GetJsonData<JsDictionary<string, SonicImage>>("Content/sprites/sonic.js", data => { sonicSprites = data; });

            objectManager = new ObjectManager(this);
            objectManager.Init();
            int scl = 2;
            Scale = new Point(scl, scl);
            RealScale = new DoublePoint(1, 1);
            mainCanvas = gameCanvas;

            WindowLocation = Constants.DefaultWindowLocation(GameState.Editing, mainCanvas, Scale);
            BigWindowLocation = Constants.DefaultWindowLocation(GameState.Editing, mainCanvas, Scale);
            BigWindowLocation.Width = (int) ( BigWindowLocation.Width * 1.8 );
            BigWindowLocation.Height = (int) ( BigWindowLocation.Height * 1.8 );

            Animations = new List<Animation>();
            AnimationInstances = new List<AnimationInstance>();
            //jQuery.GetJson("Content/sprites/explosion.js", data => Animations.Add(new Animation("explosion", data)));

            ShowHeightMap = false;
            GoodRing = new Ring(false);
            ActiveRings = new List<Ring>();
            ForceResize = resize;
            Background = null;
            CurrentGameState = GameState.Editing;

            ScreenOffset = new Point(mainCanvas.DomCanvas.GetWidth() / 2 - WindowLocation.Width * Scale.X / 2,
                                     mainCanvas.DomCanvas.GetHeight() / 2 - WindowLocation.Height * Scale.Y / 2);

            UIManager = new UIManager.UIManager(this, mainCanvas.Context, Scale);
            //UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));

            ClickState = ClickState.Dragging;
            tickCount = 0;
            DrawTickCount = 0;
            InHaltMode = false;
            waitingForTickContinue = false;
            waitingForDrawContinue = false;
            SonicLevel = new SonicLevel();
        }

        public bool OnClick(jQueryEvent elementEvent)
        {
            //Help.Debugger();
            var e = new Point(elementEvent.ClientX / Scale.X / WindowLocation.X,
                              elementEvent.ClientY / Scale.Y / WindowLocation.Y);

            if (elementEvent.Button == 0) {
                int ey;
                int ex;
                switch (ClickState) {
                    case ClickState.Dragging:
                        return false;
                        break;
                    case ClickState.PlaceChunk:
                        ex = e.X / 128;
                        ey = e.Y / 128;
                        TileChunk ch = SonicLevel.Chunks[SonicLevel.ChunkMap[ex][ey]];
                        TilePiece tp = ch.GetBlock(e.X - ex * 128, e.Y - ey * 128);
                        if (tp.Truthy()) {
                            TilePiece tpc = ch.GetTilePiece(e.X - ex * 128, e.Y - ey * 128);
                            UIManager.Data.Indexes.TPIndex = SonicLevel.Blocks.IndexOf(tp);
                            UIManager.Data.ModifyTilePieceArea.TilePiece = tp;
                            UIManager.Data.SolidTileArea.Visible = true;

                            UIManager.Data.ModifyTilePieceArea.tpc = tpc;
                        }
                        return true;
                    case ClickState.PlaceRing:
                        ex = e.X;
                        ey = e.Y;
                        SonicLevel.Rings.Add(new Ring(true) {X = ex, Y = ey});
                        return true;
                    case ClickState.PlaceObject:

                        ex = e.X;
                        ey = e.Y;
                        var pos = new Point(ex, ey);
                        for (var l = 0; l < SonicLevel.Objects.Count; l++) {
                            var o = SonicLevel.Objects[l];

                            if (IntersectingRectangle.IntersectsRect(o.GetRect(Scale), pos)) Window.Alert("Object Data: " + Help.Stringify(o));
                        }

                        return true;

                        break;
                }
            }
            return false;

            /* 
                case ClickState.PlaceObject:
                    var ex = _H.floor((e.x));
                    var ey = _H.floor((e.y));

                    for (var l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
                        var o = sonicManager.SonicLevel.Objects[l];

                        if (_H.intersects2(o.getRect(scale), { X: ex, Y: ey })) {
                            alert("Object Data: " + _H.stringify(o));
                        }
                    }

                    return true;

                    break;  
             */
            return false;
        }

        private void tickObjects()
        {
            var localPoint = new Point(0, 0);
            InFocusObjects = new List<LevelObjectInfo>();
            var levelObjectInfos = SonicLevel.Objects;

            for (int index = 0; index < levelObjectInfos.Count; index++) {
                LevelObjectInfo obj = levelObjectInfos[index];
                localPoint.X = (int) obj.X;
                localPoint.Y = (int) obj.Y;
                if (BigWindowLocation.Intersects(localPoint)) {
                    InFocusObjects.Add(obj);
                    obj.Tick(obj, SonicLevel, SonicToon);
                }
            }
            UIManager.LiveObjectsArea.Data.Populate(InFocusObjects);
            for (int index = 0; index < AnimationInstances.Count; index++) {
                AnimationInstance animationInstance = AnimationInstances[index];
                animationInstance.Tick();
            }
        }

        public void Tick()
        {
            if (Loading) return;

            if (CurrentGameState == GameState.Playing) {
                if (InHaltMode) {
                    if (waitingForTickContinue)
                        return;
                }

                tickCount++;
                tickObjects();
                SonicToon.Ticking = true;
                try {
                    SonicToon.Tick(SonicLevel, Scale);
                }
                        /*
                catch (Exception exc)
                {
                    string txt = "There was an error on this page.\n\n";
                    txt += "Error description: " + exc.Message + "\n\n";
                    txt += "Stack: " + exc.InnerException + "\n\n"; //todo::callstack
                    txt += "Click OK to continue.\n\n";


                    Global.Console.Log(exc.Me());
                    Window.Alert(txt);
                    throw exc;
                }
*/
                finally {
                    SonicToon.Ticking = false;
                }
                if (InHaltMode) {
                    if (waitingForTickContinue)
                        return;
                    waitingForTickContinue = true;
                    waitingForDrawContinue = false;
                }
                if (SonicToon.X > 128 * SonicLevel.LevelWidth)
                    SonicToon.X = 0;
            }
        }

        public void PreloadSprites(Point scale, Action completed, Action<string> update)
        {
            if (SpriteCache != null) {
                completed();
                return;
            }

            SpriteCache = SpriteCache ?? new SpriteCache();
            var ci = SpriteCache.Rings;
            var inj = 0;
            var spriteLocations = new List<string>();

            for (int j = 0; j < 4; j++) {
                spriteLocations.Add(string.Format("assets/Sprites/ring{0}.png", j));
                imageLength++;
            }
            int md = 0;
            var ind_ = SpriteCache.Indexes;
            var sl = SpriteLoader = new SpriteLoader(completed, update);
            if (ci.Count == 0) {
                var spriteStep = SpriteLoader.AddStep("Sprites",
                                                      (i, done) => {
                                                          var sp = i * 200;
                                                          ci[sp] = Help.LoadSprite(spriteLocations[i],
                                                                                   jd => {
                                                                                       ci[jd.Me().Tag * 200 + scale.X * 100 + scale.Y] =
                                                                                               Help.ScaleSprite(jd, scale, jc => done());
                                                                                   });
                                                          ci[sp].Me().Tag = i;
                                                      },
                                                      () => {
                                                          ind_.Sprites++;
                                                          if (ind_.Sprites == 4)
                                                              return true;
                                                          return false;
                                                      },
                                                      false);
                for (var i = 0; i < spriteLocations.Count; i++) {
                    SpriteLoader.AddIterationToStep(spriteStep, i);
                }
            }
            var numOfAnimations = 0;
            var cci = SpriteCache.SonicSprites;

            if (cci.Count == 0) {
                var sonicStep = SpriteLoader.AddStep("Sonic Sprites",
                                                     (sp, done) => {
                                                         foreach (var sonicSprite in sonicSprites) {
                                                             cci[sonicSprite.Key + scale.X + scale.Y] =
                                                                     Help.ScaleCsImage(sonicSprite.Value, scale, (ec) => { });
                                                         }

                                                         /*var cji = SpriteCache.AnimationSprites = new JsDictionary<string, CanvasInformation>();

foreach (var anni in Animations)
{
var imd = 0;
foreach (var image in anni.Images)
{
cji[(imd++) + " " + anni.Name + scale.x + scale.y] = _H.scaleCSImage(sonicManager.animations[anni].images[image], scale);
}
}*/
                                                         done();
                                                     },
                                                     () => true,
                                                     false);

                SpriteLoader.AddIterationToStep(sonicStep, 0);
            }
        }

        public void Draw(CanvasContext2D canvas)
        {
            if (InHaltMode)
                if (drawHaltMode(canvas)) return;
            canvas.Save();
            var localPoint = new Point(0, 0);

            DrawTickCount++;
            if (SpriteLoader.Truthy() && !SpriteLoader.Tick() || Loading) {
                drawLoading(canvas);
                return;
            }
            updatePositions(canvas, localPoint);
            int w1 = WindowLocation.Width / 128 + 2;
            int h1 = WindowLocation.Height / 128 + 2; //cleaner with 2 padding on the widthheight
            var offs = getOffs(h1, w1);

            var bounds = new IntersectingRectangle(-32, -32, WindowLocation.Width * Scale.X + 32, WindowLocation.Height * Scale.Y + 32);
            if (SonicLevel.Chunks.Truthy() && SonicLevel.Chunks.Count > 0) {
                updatePalettes();
                int fxP = (int) ( ( WindowLocation.X ) / 128.0 );
                int fyP = (int) ( ( WindowLocation.Y ) / 128.0 );
                drawLowChunks(canvas, bounds, localPoint, offs, fyP, fxP);

                drawObjects(canvas, localPoint);
                drawAnimations(canvas);
                drawRings(canvas, localPoint);
                drawSonic(canvas);

                drawHighChunks(canvas, fxP, fyP, offs, bounds, localPoint);
            }

            //drawRings(canvas, localPoint);
            //editing^

            canvas.Restore();

            if (CurrentGameState == GameState.Playing)
                SonicToon.DrawUI(canvas, new Point(ScreenOffset.X, ScreenOffset.Y), Scale);
        }

        private static Point[] getOffs(int h1, int w1)
        {
            int hash = ( h1 + 1 ) * ( w1 + 1 );
            if (_cachedOffs.ContainsKey(hash))
                return _cachedOffs[hash];

            var offs = new Point[0];

            var ca = 0;
            for (int i = -1; i < w1; i++)
                for (int j = -1; j < h1; j++)
                    offs[ca++] = ( new Point(i, j) );
            return _cachedOffs[hash] = offs;
        }

        private void updatePositions(CanvasContext2D canvas, Point localPoint)
        {
            ScreenOffset.X = 0;
            ScreenOffset.Y = 0;

            if (CurrentGameState == GameState.Playing) updatePositionsForPlaying(canvas, localPoint);

            if (WindowLocation.X < 0) WindowLocation.X = 0;
            if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
        }

        private void updatePositionsForPlaying(CanvasContext2D canvas, Point localPoint)
        {
            canvas.Scale(RealScale.X, RealScale.Y);
            if (SonicToon.Ticking) {
                while (true) {
                    if (SonicToon.Ticking)
                        break;
                }
            }
            canvas.Translate(ScreenOffset.X, ScreenOffset.Y);
            canvas.FillStyle = "#000000";
            canvas.FillRect(0, 0, WindowLocation.Width * Scale.X, WindowLocation.Height * Scale.Y);

            WindowLocation.X = (int) ( SonicToon.X ) - WindowLocation.Width / 2;
            WindowLocation.Y = (int) ( SonicToon.Y ) - WindowLocation.Height / 2;

            BigWindowLocation.X = (int) ( SonicToon.X ) - BigWindowLocation.Width / 2;
            BigWindowLocation.Y = (int) ( SonicToon.Y ) - BigWindowLocation.Height / 2;

            BigWindowLocation.X = (int) ( BigWindowLocation.X - WindowLocation.Width * 0.2 );
            BigWindowLocation.Y = (int) ( BigWindowLocation.Y - WindowLocation.Height * 0.2 );

            BigWindowLocation.Width = (int) ( WindowLocation.Width * 1.8 );
            BigWindowLocation.Height = (int) ( WindowLocation.Height * 1.8 );

            if (Background.Truthy()) {
                int wOffset = WindowLocation.X;
                int bw = Background.Width / Scale.X;
                int movex = ( wOffset / bw ) * bw;
                localPoint.X = -WindowLocation.X * Scale.X + movex;
                localPoint.Y = -WindowLocation.Y / 4 * Scale.Y;

                Background.Draw(canvas, localPoint, Scale, wOffset);

                localPoint.X = -WindowLocation.X * Scale.X + movex + Background.Width;
                localPoint.Y = -WindowLocation.Y / 4 * Scale.Y;

                Background.Draw(canvas, localPoint, Scale, wOffset);
            }
        }

        private static void drawLoading(CanvasContext2D canvas)
        {
            canvas.FillStyle = "white";
            canvas.FillText("Loading...   " /*+ (this.inds.tc + this.inds.tp + this.inds.t) + " / " + (this.inds.total)*/, 95, 95);
            canvas.Restore();
            return;
        }

        private bool drawHaltMode(CanvasContext2D canvas)
        {
            canvas.FillStyle = "white";
            canvas.Font = "21pt arial bold";
            canvas.FillText("HALT MODE\r\n Press: P to step\r\n        O to resume", 10, 120);

            if (waitingForDrawContinue)
                return true;
            else
                waitingForDrawContinue = true;
            return false;
        }

        private void updatePalettes()
        {
            if (SonicLevel.PaletteItems[0].Truthy()) {
                for (int k = 0; k < SonicLevel.PaletteItems[0].Count; k++) {
                    var pal = SonicLevel.PaletteItems[0][k];
                    if (pal.SkipIndex == 0) continue;
                    if (pal.TotalLength == 0) continue;

                    for (int j = 0; j <= pal.TotalLength; j += pal.SkipIndex) {
                        if (DrawTickCount % ( pal.TotalLength + pal.SkipIndex ) == j)
                            SonicLevel.palAn[k] = j / pal.SkipIndex;
                    }

                    for (int m = 0; m < pal.Pieces.Count; m++) {
                        var mj = pal.Pieces[m];
                        SonicLevel.Palette[mj.PaletteIndex][mj.PaletteOffset / 2] =
                                pal.Palette[SonicLevel.palAn[k] * ( pal.Pieces.Count * 2 ) + 0 + ( mj.PaletteMultiply )];
                        SonicLevel.Palette[mj.PaletteIndex][mj.PaletteOffset / 2 + 1] =
                                pal.Palette[SonicLevel.palAn[k] * ( pal.Pieces.Count * 2 ) + 1 + ( mj.PaletteMultiply )];
                    }
                }
            }
        }

        private void drawLowChunks(CanvasContext2D canvas, IntersectingRectangle bounds, Point localPoint, Point[] offs, int fyP, int fxP)
        {
            foreach (Point off in offs) {
                int _xP = fxP + off.X;
                int _yP = fyP + off.Y;
                int _yPreal = fyP + off.Y;
                if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                TileChunk chunk = SonicLevel.Chunks[SonicLevel.ChunkMap[_xP][_yP]];
                TileChunk anni = SonicLevel.Chunks[SonicLevel.ChunkMap[_xP][_yP]];
                if (anni.Truthy())
                    anni.AnimatedTick();
                localPoint.X = ( _xP * 128 * Scale.X ) - WindowLocation.X * Scale.X;
                localPoint.Y = ( _yPreal * 128 * Scale.Y ) - WindowLocation.Y * Scale.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyForeground())
                    chunk.Draw(canvas, localPoint, Scale, 0, bounds);

                if (false && CurrentGameState == GameState.Editing) {
                    canvas.StrokeStyle = "#DD0033";
                    canvas.LineWidth = 3;
                    canvas.StrokeRect(localPoint.X, localPoint.Y, 128 * Scale.X, 128 * Scale.Y);
                }
            }
        }

        private void drawHighChunks(CanvasContext2D canvas, int fxP, int fyP, Point[] offs, IntersectingRectangle bounds, Point localPoint)
        {
            foreach (Point off in offs) {
                int _xP = fxP + off.X;
                int _yP = fyP + off.Y;
                int _yPreal = fyP + off.Y;
                if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                TileChunk chunk = SonicLevel.Chunks[SonicLevel.ChunkMap[_xP][_yP]];

                localPoint.X = ( _xP * 128 * Scale.X ) - WindowLocation.X * Scale.X;
                localPoint.Y = ( _yPreal * 128 * Scale.Y ) - WindowLocation.Y * Scale.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyBackground())
                    chunk.Draw(canvas, localPoint, Scale, 1, bounds);
                if (false && CurrentGameState == GameState.Editing) {
                    canvas.StrokeStyle = "#DD0033";
                    canvas.LineWidth = 3;
                    canvas.StrokeRect(localPoint.X, localPoint.Y, 128 * Scale.X, 128 * Scale.Y);
                }

                if (ShowHeightMap) {
                    var fd = SpriteCache.HeightMapChunks[( SonicLevel.CurHeightMap ? 1 : 2 ) + " " + chunk.Index + " " + Scale.Y + " " + Scale.X];

                    if (fd.Falsey()) {
                        var md = chunk;
                        var posj1 = new Point(0, 0);
                        var canv = Help.DefaultCanvas(128 * Scale.X, 128 * Scale.Y);
                        var ctx = canv.Context;
                        myEngine.Clear(canv);
                        for (var _y = 0; _y < 8; _y++) {
                            for (var _x = 0; _x < 8; _x++) {
                                var tp = md.TilePieces[_x][_y];
                                var solid = (int) ( SonicLevel.CurHeightMap ? tp.Solid1 : tp.Solid2 );
                                var hd =
                                        SonicLevel.HeightMaps[
                                                ( SonicLevel.CurHeightMap
                                                          ? SonicLevel.CollisionIndexes1[tp.Block]
                                                          : SonicLevel.CollisionIndexes2[tp.Block] )];

                                var __x = _x;
                                var __y = _y;
                                var vangle = 0;
                                var posm = new Point(posj1.X + ( __x * 16 ) * Scale.X, posj1.Y + ( __y * 16 ) * Scale.Y);

                                if (hd.Falsey()) continue;
                                if (hd == 0) {} else if (hd == 1) {
                                    if (solid > 0) {
                                        ctx.FillStyle = HeightMask.colors[solid];
                                        ctx.FillRect(posj1.X + ( __x * 16 ) * Scale.X,
                                                     posj1.Y + ( __y * 16 ) * Scale.Y,
                                                     Scale.X * 16,
                                                     Scale.Y * 16);
                                    }
                                } else {
                                    vangle =
                                            SonicLevel.Angles[
                                                    ( SonicLevel.CurHeightMap
                                                              ? SonicLevel.CollisionIndexes1[tp.Block]
                                                              : SonicLevel.CollisionIndexes2[tp.Block] )];

                                    hd.Draw(ctx, posm, Scale, -1, tp.XFlip, tp.YFlip, solid, vangle);
                                    /*   posm.x += 16 * scale.x / 2;
                                        posm.y += 16 * scale.y / 2;
                                        ctx.strokeStyle = "#DDD";
                                        ctx.font = "18pt courier ";
                                        ctx.shadowColor = "";
                                        ctx.shadowBlur = 0;
                                        ctx.lineWidth = 1;
                                        ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);*/
                                }
                            }
                        }
                        fd =
                                SpriteCache.HeightMapChunks[( SonicLevel.CurHeightMap ? 1 : 2 ) + " " + md.Index + " " + Scale.Y + " " + Scale.X]
                                = canv;
                    }
                    canvas.DrawImage(fd.Canvas, localPoint.X, localPoint.Y);
                }
                if (CurrentGameState == GameState.Editing) {
                    canvas.StrokeStyle = "#DD0033";
                    canvas.LineWidth = 3;
                    canvas.StrokeRect(localPoint.X, localPoint.Y, 128 * Scale.X, 128 * Scale.Y);
                }
            }
        }

        private void drawSonic(CanvasContext2D canvas)
        {
            if (CurrentGameState == GameState.Playing) {
                SonicToon.Draw(canvas, Scale);
                if (WindowLocation.X < 0) WindowLocation.X = 0;

                if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                    WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
                //if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
                //    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
            }
        }

        private void drawRings(CanvasContext2D canvas, Point localPoint)
        {
            for (int index = 0; index < SonicLevel.Rings.Count; index++) {
                var r = SonicLevel.Rings[index];

                switch (CurrentGameState) {
                    case GameState.Playing:
                        if (!SonicToon.obtainedRing[index]) {
                            if (BigWindowLocation.Intersects(r))
                                GoodRing.Draw(canvas, r.Negate(WindowLocation.X, WindowLocation.Y), Scale);
                        }
                        break;
                    case GameState.Editing:
                        if (BigWindowLocation.Intersects(r))
                            GoodRing.Draw(canvas, r.Negate(WindowLocation.X, WindowLocation.Y), Scale);
                        break;
                }

                /*
                 for (var ring in this.SonicLevel.Rings) {
                        var r = this.SonicLevel.Rings[ring];
                        if (this.sonicToon) {
                            if (!this.sonicToon.obtainedRing[ring])
                                if (this.bigWindowLocation.intersects(r))
                                    this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, true);
                        } else {
                            if (this.bigWindowLocation.intersects(r))
                                this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, false);
                        }
                    }
                 */
            }

            switch (CurrentGameState) {
                case GameState.Playing:

                    for (int i = ActiveRings.Count - 1; i >= 0; i--) {
                        Ring ac = ActiveRings[i];

                        localPoint.X = ac.X - WindowLocation.X;
                        localPoint.Y = ac.Y - WindowLocation.Y;
                        ac.Draw(canvas, localPoint, Scale);
                        if (ac.TickCount > 256)
                            ActiveRings.Remove(ac);
                    }
                    break;
                case GameState.Editing:
                    break;
            }
        }

        private void drawAnimations(CanvasContext2D canvas)
        {
            for (int index = 0; index < AnimationInstances.Count; index++) {
                AnimationInstance ano = AnimationInstances[index];
                ano.Draw(canvas, -WindowLocation.X, -WindowLocation.Y, Scale);
            }
        }

        private void drawObjects(CanvasContext2D canvas, Point localPoint)
        {
            List<LevelObjectInfo> levelObjectInfos = SonicLevel.Objects;
            for (int index = 0; index < levelObjectInfos.Count; index++) {
                LevelObjectInfo o = levelObjectInfos[index];
                localPoint.X = Script.Reinterpret<int>(o.X);
                localPoint.Y = Script.Reinterpret<int>(o.Y);
                if (o.Dead || BigWindowLocation.Intersects(localPoint)) {
                    o.Draw(canvas,
                           ( ( localPoint.X - WindowLocation.X ) * Scale.X ),
                           ( ( localPoint.Y - WindowLocation.Y ) * Scale.Y ),
                           Scale,
                           ShowHeightMap);
                }
            }
        }

        private Animation containsAnimatedTile(int tile, SonicLevel sonLevel)
        {
            for (int i = 0; i < sonLevel.Animations.Count; i++) {
                var an = sonLevel.Animations[i];
                var anin = an.AnimationTileIndex;
                var num = an.NumberOfTiles;
                if (tile >= anin && tile < anin + num)
                    return an;
            }
            return null;
        }

        public void ClearCache()
        {
            for (int index = 0; index < SonicLevel.Tiles.Count; index++) {
                var tile = SonicLevel.Tiles[index];
                tile.ClearCache();
            }
            for (int index = 0; index < SonicLevel.Blocks.Count; index++) {
                var tilePiece = SonicLevel.Blocks[index];
                tilePiece.ClearCache();
            }
            Instance.SpriteCache.HeightMaps = new List<CanvasInformation>();
            Instance.SpriteCache.HeightMapChunks = new JsDictionary<string, CanvasInformation>();
        }
    }
}
//http://www.youtube.com/watch?v=_VTJtFERW54