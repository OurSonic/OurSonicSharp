using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level;
using OurSonic.Level.Animations;
using OurSonic.Level.Objects;
using OurSonic.Level.Tiles;
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
        public Sonic.Sonic SonicToon { get; set; }
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
        [IntrinsicProperty]
        public Action<SonicLevel> OnLevelLoad { get; set; }
        private string Status
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

            ScreenOffset = new Point(mainCanvas.DomCanvas.GetWidth() / 2 - WindowLocation.Width / 2,
                                     mainCanvas.DomCanvas.GetHeight() / 2 - WindowLocation.Height / 2);

            UIManager = new UIManager.UIManager(this, mainCanvas.Context);
            //UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));

            ClickState = ClickState.PlaceChunk;
            tickCount = 0;
            DrawTickCount = 0;
            InHaltMode = false;
            waitingForTickContinue = false;
            waitingForDrawContinue = false;
        }

        public bool OnClick(jQueryEvent elementEvent)
        {
            //Help.Debugger();
            var e = new Point((int) ( (double) elementEvent.ClientX / Scale.X / RealScale.X + WindowLocation.X ),
                              (int) ( (double) elementEvent.ClientY / Scale.Y / RealScale.Y + WindowLocation.Y ));

            //then clicking
            //then chunk editor/tilepiece editor/tile editor/ heightmap editor/ and proper map editor;

            int ey;
            int ex;

            if (elementEvent.CtrlKey) {
                ex = e.X / 128;
                ey = e.Y / 128;
                TileChunk ch = SonicLevel.GetChunkAt(ex, ey);
                if (UIManager.UIManagerAreas.TilePieceArea != null)
                    ch.SetBlockAt(e.X - ex * 128, e.Y - ey * 128, UIManager.UIManagerAreas.TilePieceArea.Data);
                return true;
            }
            if (elementEvent.ShiftKey) {
                ex = e.X / 128;
                ey = e.Y / 128;
                TileChunk ch = SonicLevel.GetChunkAt(ex, ey);
                if (UIManager.UIManagerAreas.TileChunkArea != null)
                    SonicLevel.SetChunkAt(ex, ey, UIManager.UIManagerAreas.TileChunkArea.Data);
                return true;
            }

            if (elementEvent.Button == 0) {
                switch (ClickState) {
                    case ClickState.Dragging:
                        return false;
                    case ClickState.PlaceChunk:
                        ex = e.X / 128;
                        ey = e.Y / 128;
                        TileChunk ch = SonicLevel.GetChunkAt(ex, ey);
                        TilePiece tp = ch.GetBlockAt(e.X - ex * 128, e.Y - ey * 128);

                        if (UIManager.UIManagerAreas.TileChunkArea != null) {
                            UIManager.UIManagerAreas.TileChunkArea.Visible = true;
                            UIManager.UIManagerAreas.TileChunkArea.Data = ch;
                            //tilePieceList.ScrollIndex = Math.Max(uiManager.sonicManager.SonicLevel.TilePieces.IndexOf(tilePiece) - 1, 0);
                        }
                        if (UIManager.UIManagerAreas.TilePieceArea != null) {
                            UIManager.UIManagerAreas.TilePieceArea.Visible = true;
                            UIManager.UIManagerAreas.TilePieceArea.Data = tp;
                            //UIManager.UIManagerAreas.TilePieceArea.ScrollIndex = Math.Max(SonicLevel.TilePieces.IndexOf(tp) - 1, 0);
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

                            if (IntersectingRectangle.IntersectsRect(o.GetRect(), pos)) Window.Alert("Object Data: " + Help.Stringify(o));
                        }

                        return true;
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

            if (UIManager.UIManagerAreas.LiveObjectsArea != null)
                UIManager.UIManagerAreas.LiveObjectsArea.Data.Populate(InFocusObjects);

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
                    SonicToon.Tick(SonicLevel);
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

        public void PreloadSprites(Action completed, Action<string> update)
        {
            if (SpriteCache != null) {
                completed();
                return;
            }

            SpriteCache = SpriteCache ?? new SpriteCache();
            var ci = SpriteCache.Rings;
            var spriteLocations = new List<string>();

            for (int j = 0; j < 4; j++) {
                spriteLocations.Add(string.Format("assets/Sprites/ring{0}.png", j));
                imageLength++;
            }
            var ind_ = SpriteCache.Indexes;
            SpriteLoader = new SpriteLoader(completed, update);
            if (ci.Count == 0) {
                var spriteStep = SpriteLoader.AddStep("Sprites",
                                                      (i, done) => {
                                                          Help.LoadSprite(spriteLocations[i],
                                                                          jd => {
                                                                              ci[i] = CanvasInformation.Create(jd.Width, jd.Height);
                                                                              ci[i].Context.DrawImage(jd, 0, 0);

                                                                              done();
                                                                          });
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
            var cci = SpriteCache.SonicSprites;

            if (cci.Count == 0) {
                var sonicStep = SpriteLoader.AddStep("Sonic Sprites",
                                                     (sp, done) => {
                                                         foreach (var sonicSprite in sonicSprites) {
                                                             cci[sonicSprite.Key] =
                                                                     Help.ScaleCsImage(sonicSprite.Value, new Point(1, 1), (ec) => { });
                                                         }

                                                         /*var numOfAnimations = 0;

                                                         var cji = SpriteCache.AnimationSprites = new JsDictionary<string, CanvasInformation>();

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

        public void MainDraw(CanvasContext2D canvas)
        {
            if (InHaltMode)
                if (drawHaltMode(canvas)) return;
            if (SonicLevel == null) return;
            canvas.Save();
            var localPoint = new Point(0, 0);

            DrawTickCount++;
            if (SpriteLoader.Truthy() && !SpriteLoader.Tick() || Loading) {
                drawLoading(canvas);
                canvas.Restore();
                return;
            }
            updatePositions(canvas, localPoint);
            int w1 = WindowLocation.Width / 128 + 2;
            int h1 = WindowLocation.Height / 128 + 2; //cleaner with 2 padding on the widthheight
            var offs = getOffs(h1, w1);

            var bounds = new IntersectingRectangle(-32, -32, WindowLocation.Width + 32, WindowLocation.Height + 32);
            updatePalettes();
            int fxP = (int) ( ( WindowLocation.X ) / 128.0 );
            int fyP = (int) ( ( WindowLocation.Y ) / 128.0 );

            canvas.Scale(Scale.X, Scale.Y);
            drawLowChunks(canvas, bounds, localPoint, offs, fyP, fxP);

            if (ShowHeightMap) drawHighChunks(canvas, fxP, fyP, offs, bounds, localPoint);

            drawObjects(canvas, localPoint);
            drawAnimations(canvas);
            drawRings(canvas, localPoint);
            drawSonic(canvas);
            //drawRings(canvas, localPoint);
            //editing^

            if (!ShowHeightMap)
                drawHighChunks(canvas, fxP, fyP, offs, bounds, localPoint);

            canvas.Restore();

            if (CurrentGameState == GameState.Playing)
                SonicToon.DrawUI(canvas, new Point(ScreenOffset.X, ScreenOffset.Y));
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
            //canvas.FillStyle = "#000000";
            //canvas.FillRect(0, 0, WindowLocation.Width * Scale.X, WindowLocation.Height * Scale.Y);

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
                int bw = Background.Width;
                int movex = ( wOffset / bw ) * bw;
                localPoint.X = -WindowLocation.X + movex;
                localPoint.Y = -WindowLocation.Y / 4;

                Background.Draw(canvas, localPoint, wOffset);

                localPoint.X = -WindowLocation.X + movex + Background.Width;
                localPoint.Y = -WindowLocation.Y / 4;

                Background.Draw(canvas, localPoint, wOffset);
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
            if (SonicLevel.PaletteItems.Count > 0) {
                for (int k = 0; k < SonicLevel.PaletteItems[0].Count; k++) {
                    var pal = SonicLevel.PaletteItems[0][k];
                    if (pal.SkipIndex == 0) continue;
                    if (pal.TotalLength == 0) continue;

                    for (int j = 0; j <= pal.TotalLength; j += pal.SkipIndex) {
                        if (DrawTickCount % ( pal.TotalLength + pal.SkipIndex ) == j)
                            SonicLevel.PaletteAnimationIndexes[k] = j / pal.SkipIndex;
                    }

                    for (int m = 0; m < pal.Pieces.Count; m++) {
                        var mj = pal.Pieces[m];
                        SonicLevel.Palette[mj.PaletteIndex][( mj.PaletteOffset ) / 2] =
                                pal.Palette[SonicLevel.PaletteAnimationIndexes[k] * ( pal.Pieces.Count * 2 ) + 0 + ( mj.PaletteMultiply )];
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
                TileChunk chunk = SonicLevel.GetChunkAt(_xP, _yP);
                if (chunk.Truthy())
                    chunk.AnimatedTick();
                localPoint.X = ( _xP * 128 ) - WindowLocation.X;
                localPoint.Y = ( _yPreal * 128 ) - WindowLocation.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyForeground())
                    chunk.Draw(canvas, localPoint, 0, bounds);
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
                TileChunk chunk = SonicLevel.GetChunkAt(_xP, _yP);

                localPoint.X = ( _xP * 128 ) - WindowLocation.X;
                localPoint.Y = ( _yPreal * 128 ) - WindowLocation.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyBackground())
                    chunk.Draw(canvas, localPoint, 1, bounds);

                if (ShowHeightMap) {
                    var fd = SpriteCache.HeightMapChunks[( SonicLevel.CurHeightMap ? 1 : 2 ) + " " + chunk.Index];

                    if (fd.Falsey()) {
                        var md = chunk;
                        var posj1 = new Point(0, 0);
                        var canv = CanvasInformation.Create(128, 128);
                        var ctx = canv.Context;
                        myEngine.Clear(canv);
                        for (var _y = 0; _y < 8; _y++) {
                            for (var _x = 0; _x < 8; _x++) {
                                var tp = md.TilePieces[_x][_y];
                                var solid = (int) ( SonicLevel.CurHeightMap ? tp.Solid1 : tp.Solid2 );

                                var hd = SonicLevel.CurHeightMap ? tp.GetLayer1HeightMaps() : tp.GetLayer2HeightMaps();

                                var __x = _x;
                                var __y = _y;
                                var vangle = 0;
                                var posm = new Point(posj1.X + ( __x * 16 ), posj1.Y + ( __y * 16 ));

                                if (hd.Falsey()) continue;
                                if (hd.Full == false) {} else if (hd.Full == true) {
                                    if (solid > 0) {
                                        ctx.FillStyle = HeightMap.colors[solid];
                                        ctx.FillRect(posj1.X + ( __x * 16 ),
                                                     posj1.Y + ( __y * 16 ),
                                                     16,
                                                     16);
                                    }
                                } else {
                                    vangle = SonicLevel.CurHeightMap ? tp.GetLayer1Angles() : tp.GetLayer2Angles();
                                    hd.Draw(ctx, posm, tp.XFlip, tp.YFlip, solid, vangle);
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
                                SpriteCache.HeightMapChunks[( SonicLevel.CurHeightMap ? 1 : 2 ) + " " + md.Index]
                                = canv;
                    }
                    canvas.DrawImage(fd.Canvas, localPoint.X, localPoint.Y);
                }
                if (CurrentGameState == GameState.Editing) {
                    canvas.StrokeStyle = "#DD0033";
                    canvas.LineWidth = 3;
                    canvas.StrokeRect(localPoint.X, localPoint.Y, 128, 128);
                }
            }
        }

        private void drawSonic(CanvasContext2D canvas)
        {
            if (CurrentGameState == GameState.Playing) {
                SonicToon.Draw(canvas);
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
                                GoodRing.Draw(canvas, r.Negate(WindowLocation.X, WindowLocation.Y));
                        }
                        break;
                    case GameState.Editing:
                        if (BigWindowLocation.Intersects(r))
                            GoodRing.Draw(canvas, r.Negate(WindowLocation.X, WindowLocation.Y));
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
                        ac.Draw(canvas, localPoint);
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
                ano.Draw(canvas, -WindowLocation.X, -WindowLocation.Y);
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
                           ( ( localPoint.X - WindowLocation.X ) ),
                           ( ( localPoint.Y - WindowLocation.Y ) ),
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
            SonicLevel.ClearCache();
            SpriteCache.ClearCache();
        }
    }
}
//http://www.youtube.com/watch?v=_VTJtFERW54