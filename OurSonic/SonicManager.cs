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
        private static JsDictionary<int, Point[]> _cachedOffs = new JsDictionary<int, Point[]>();
        public readonly CanvasInformation mainCanvas;
        private readonly SonicEngine engine;
        public readonly ObjectManager objectManager;
        public int DrawTickCount;
        private bool clicking;
        private int imageLength;
        private string status;
        public DoublePoint overrideRealScale;
        private JsDictionary<string, SonicImage> sonicSprites;
        public int tickCount;
        private bool waitingForDrawContinue;
        public bool waitingForTickContinue;
        private CanvasInformation lowChunkCanvas;
        private CanvasInformation sonicCanvas;
        private CanvasInformation highChuckCanvas;
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
        public List<TileAnimationData> TileAnimations { get; set; }
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
            get { return status; }
            set
            {
                OurSonic.UIManager.UIManager.UpdateTitle(value);
                status = value;
            }
        }

        [IntrinsicProperty]
        public TilePaletteAnimationManager TilePaletteAnimationManager { get; set; }
        [IntrinsicProperty]
        public TileAnimationManager TileAnimationManager { get; set; }


        static SonicManager()
        {
        }

        public SonicManager(SonicEngine engine, CanvasInformation gameCanvas, Action resize)
        {
            Instance = this;
            //            SonicToon = new Sonic();

            this.engine = engine;
            this.engine.canvasWidth = jQuery.Window.GetWidth();
            this.engine.canvasHeight = jQuery.Window.GetHeight();

            gameCanvas.DomCanvas[0].SetAttribute("width", this.engine.canvasWidth.ToString());
            gameCanvas.DomCanvas[0].SetAttribute("height", this.engine.canvasHeight.ToString());

            jQuery.GetJsonData<JsDictionary<string, SonicImage>>("Content/sprites/sonic.js", data => { sonicSprites = data; });

            objectManager = new ObjectManager(this);
            objectManager.Init();
            int scl = 2;
            Scale = new Point(scl, scl);
            RealScale = new DoublePoint(1, 1);
            mainCanvas = gameCanvas;

            WindowLocation = Constants.DefaultWindowLocation(GameState.Editing, mainCanvas, Scale);
            BigWindowLocation = Constants.DefaultWindowLocation(GameState.Editing, mainCanvas, Scale);
            BigWindowLocation.Width = (int)(BigWindowLocation.Width * 1.8);
            BigWindowLocation.Height = (int)(BigWindowLocation.Height * 1.8);

            TileAnimations = new List<TileAnimationData>();
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

            UIManager = new UIManager.UIManager(this, mainCanvas.Context); ;

            ClickState = ClickState.PlaceChunk;
            tickCount = 0;
            DrawTickCount = 0;
            InHaltMode = false;
            waitingForTickContinue = false;
            waitingForDrawContinue = false;
        }

        public bool OnClick(jQueryEvent Event)
        {
            //Help.Debugger();
            //then clicking
            //then chunk editor/tilepiece editor/tile editor/ heightmap editor/ and proper map editor;

            clicking = true;
            if (effectClick(Event)) return true;
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

        private bool effectClick(jQueryEvent Event)
        {
            //    if (CurrentGameState == GameState.Playing) return false;

            var e = new Point((int)((double)Event.ClientX / Scale.X / RealScale.X + WindowLocation.X),
                              (int)((double)Event.ClientY / Scale.Y / RealScale.Y + WindowLocation.Y));

            /*if (CurrentGameState == GameState.Playing) {
                SonicToon.X = e.X;
                SonicToon.X = e.Y;
            }*/
            int ey;
            int ex;

            if (Event.CtrlKey)
            {
                ex = e.X / 128;
                ey = e.Y / 128;
                TileChunk ch = SonicLevel.GetChunkAt(ex, ey);
                if (UIManager.UIManagerAreas.TilePieceArea != null)
                    ch.SetBlockAt(e.X - ex * 128, e.Y - ey * 128, UIManager.UIManagerAreas.TilePieceArea.Data);
                return true;
            }
            if (Event.ShiftKey)
            {
                ex = e.X / 128;
                ey = e.Y / 128;
                TileChunk ch = SonicLevel.GetChunkAt(ex, ey);
                if (UIManager.UIManagerAreas.TileChunkArea != null)
                    SonicLevel.SetChunkAt(ex, ey, UIManager.UIManagerAreas.TileChunkArea.Data);
                return true;
            }

            if (Event.Button == 0)
            {
                switch (ClickState)
                {
                    case ClickState.Dragging:
                        return true;
                    case ClickState.PlaceChunk:
                        ex = e.X / 128;
                        ey = e.Y / 128;
                        TileChunk ch = SonicLevel.GetChunkAt(ex, ey);
                        TilePiece tp = ch.GetBlockAt(e.X - ex * 128, e.Y - ey * 128);

                        bool dontClear = false;
                        if (UIManager.UIManagerAreas.TileChunkArea != null)
                        {
                            //UIManager.UIManagerAreas.TileChunkArea.Visible = true;
                            if (UIManager.UIManagerAreas.TileChunkArea.Data == ch)
                                dontClear = true;
                            UIManager.UIManagerAreas.TileChunkArea.Data = ch;
                            //tilePieceList.ScrollIndex = Math.Max(uiManager.sonicManager.SonicLevel.TilePieces.IndexOf(tilePiece) - 1, 0);
                        }
                        if (UIManager.UIManagerAreas.TilePieceArea != null)
                        {
                            //    UIManager.UIManagerAreas.TilePieceArea.Visible = true;
                            if (UIManager.UIManagerAreas.TilePieceArea.Data != tp)
                                dontClear = true;
                            UIManager.UIManagerAreas.TilePieceArea.Data = tp;
                            //UIManager.UIManagerAreas.TilePieceArea.ScrollIndex = Math.Max(SonicLevel.TilePieces.IndexOf(tp) - 1, 0);
                        }

                        // if (!dontClear)
                        ClearCache();

                        return true;
                    case ClickState.PlaceRing:
                        ex = e.X;
                        ey = e.Y;
                        SonicLevel.Rings.Add(new Ring(true) { X = ex, Y = ey });
                        return true;
                    case ClickState.PlaceObject:

                        ex = e.X;
                        ey = e.Y;
                        var pos = new Point(ex, ey);
                        foreach (var o in SonicLevel.Objects)
                        {
                            if (IntersectingRectangle.IntersectsRect(o.GetRect(), pos)) Window.Alert("Object Data: " + Help.Stringify(o));
                        }

                        return true;
                }
            }
            return false;
        }

        private void tickObjects()
        {
            var localPoint = new Point(0, 0);
            InFocusObjects = new List<LevelObjectInfo>();
            var levelObjectInfos = SonicLevel.Objects;

            foreach (LevelObjectInfo obj in levelObjectInfos)
            {
                localPoint.X = (int)obj.X;
                localPoint.Y = (int)obj.Y;
                if (BigWindowLocation.Intersects(localPoint))
                {
                    InFocusObjects.Add(obj);
                    obj.Tick(obj, SonicLevel, SonicToon);
                }
            }

            if (UIManager.UIManagerAreas.LiveObjectsArea != null)
                UIManager.UIManagerAreas.LiveObjectsArea.Data.Populate(InFocusObjects);

            foreach (AnimationInstance animationInstance in AnimationInstances)
            {
                animationInstance.Tick();
            }
        }

        public void Tick()
        {
            if (Loading) return;

            if (CurrentGameState == GameState.Playing)
            {
                if (InHaltMode)
                {
                    if (waitingForTickContinue)
                        return;
                }

                tickCount++;
                tickObjects();
                SonicToon.Ticking = true;
                try
                {
                    SonicToon.Tick(SonicLevel);
                }
                /*
catch (Exception exc)
{
string txt = "There was an error on this page.\n\n";
txt += "Error description: " + exc.Message + "\n\n";
txt += "Stack: " + exc.InnerException + "\n\n"; //todo::callstack
txt += "Click OK to continue.\n\n";


Global.Global.Console.Log(exc.Me());
Window.Alert(txt);
throw exc;
}
*/
                finally
                {
                    SonicToon.Ticking = false;
                }
                if (InHaltMode)
                {
                    if (waitingForTickContinue)
                        return;
                    waitingForTickContinue = true;
                    waitingForDrawContinue = false;
                }
                /*  if (SonicToon.X > 128 * SonicLevel.LevelWidth)
                      SonicToon.X = 0;*/
            }
        }

        public void PreloadSprites(Action completed, Action<string> update)
        {
            if (SpriteCache != null)
            {
                completed();
                return;
            }

            SpriteCache = SpriteCache ?? new SpriteCache();
            var ci = SpriteCache.Rings;
            var spriteLocations = new List<string>();

            for (int j = 0; j < 4; j++)
            {
                spriteLocations.Add(string.Format("assets/Sprites/ring{0}.png", j));
                imageLength++;
            }
            var ind_ = SpriteCache.Indexes;
            SpriteLoader = new SpriteLoader(completed, update);
            if (ci.Count == 0)
            {
                var spriteStep = SpriteLoader.AddStep("Sprites",
                                                      (i, done) =>
                                                      {
                                                          Help.LoadSprite(spriteLocations[i],
                                                                          jd =>
                                                                          {
                                                                              ci[i] = CanvasInformation.Create(jd.Width, jd.Height);
                                                                              ci[i].Context.DrawImage(jd, 0, 0);

                                                                              done();
                                                                          });
                                                      },
                                                      () =>
                                                      {
                                                          ind_.Sprites++;
                                                          if (ind_.Sprites == 4)
                                                              return true;
                                                          return false;
                                                      },
                                                      false);
                for (var i = 0; i < spriteLocations.Count; i++)
                {
                    SpriteLoader.AddIterationToStep(spriteStep, i);
                }
            }
            var cci = SpriteCache.SonicSprites;

            if (cci.Count == 0)
            {
                var sonicStep = SpriteLoader.AddStep("Sonic Sprites",
                                                     (sp, done) =>
                                                     {
                                                         foreach (var sonicSprite in sonicSprites)
                                                         {
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

        public void MainDraw(CanvasInformation canvas)
        {
            var context = canvas.Context;
            if (InHaltMode)
                if (drawHaltMode(context)) return;

            engine.Clear(canvas);
            if (SonicLevel == null) return;
            context.Save();
            var localPoint = new Point(0, 0);

            DrawTickCount++;
            if (SpriteLoader.Truthy() && !SpriteLoader.Tick() || Loading)
            {
                drawLoading(context);
                context.Restore();
                return;
            }
            updatePositions(context);
            int w1 = WindowLocation.Width / 128 + 2;
            int h1 = WindowLocation.Height / 128 + 2; //cleaner with 2 padding on the widthheight

            if (CurrentGameState == GameState.Editing)
            {
                w1 /= Scale.X;
                h1 /= Scale.Y;
            }

            var offs = getOffs(w1, h1);

            TilePaletteAnimationManager.TickAnimatedPalettes();
            TileAnimationManager.TickAnimatedTiles();
            int fxP = (int)((WindowLocation.X) / 128.0);
            int fyP = (int)((WindowLocation.Y) / 128.0);


            resetCanvases();

            var zero = new Point(0, 0);


            if (Background.Truthy())
            {
                int wOffset = WindowLocation.X;
                int bw = Background.Width;
                int movex = (wOffset / bw) * bw;
                localPoint.X = -WindowLocation.X + movex;
                localPoint.Y = -WindowLocation.Y / 4;

                Background.Draw(lowChunkCanvas.Context, localPoint, wOffset);

                localPoint.X = -WindowLocation.X + movex + Background.Width;
                localPoint.Y = -WindowLocation.Y / 4;

                Background.Draw(lowChunkCanvas.Context, localPoint, wOffset);
            }


            drawLowChunks(lowChunkCanvas.Context, zero, offs, fyP, fxP);

            if (ShowHeightMap) drawHighChunks(lowChunkCanvas.Context, fxP, fyP, offs, zero);

            drawObjects(sonicCanvas.Context, zero);
            drawAnimations(sonicCanvas.Context);
            drawRings(sonicCanvas.Context, zero);
            drawSonic(sonicCanvas.Context);
            //drawRings(canvas, zero);
            //editing^

            if (!ShowHeightMap)
                drawHighChunks(highChuckCanvas.Context, fxP, fyP, offs, zero);

            drawDebugTextChunks(highChuckCanvas.Context, fxP, fyP, offs, zero);


            lowChunkCanvas.Context.OffsetPixelsForWater();
            highChuckCanvas.Context.OffsetPixelsForWater();
            drawSonic(lowChunkCanvas.Context);

            drawCanveses(context, localPoint);

            context.Restore();
            if (CurrentGameState == GameState.Playing)
                SonicToon.DrawUI(context, new Point(ScreenOffset.X, ScreenOffset.Y));
        }

        private void drawCanveses(CanvasRenderingContext2D canvas, Point localPoint)
        {
            canvas.Scale(Scale.X, Scale.Y);
            canvas.DrawImage(lowChunkCanvas.Canvas, localPoint.X, localPoint.Y);
            canvas.DrawImage(sonicCanvas.Canvas, localPoint.X, localPoint.Y);
            canvas.DrawImage(highChuckCanvas.Canvas, localPoint.X, localPoint.Y);
        }

        private void resetCanvases()
        {
            lowChunkCanvas = lowChunkCanvas ?? CanvasInformation.Create(320, 240);
            sonicCanvas = sonicCanvas ?? CanvasInformation.Create(320, 240);
            highChuckCanvas = highChuckCanvas ?? CanvasInformation.Create(320, 240);
            sonicCanvas.Context.ClearRect(0, 0, 320, 240);
            highChuckCanvas.Context.ClearRect(0, 0, 320, 240);
            lowChunkCanvas.Context.ClearRect(0, 0, 320, 240);
        }

        private static Point[] getOffs(int w1, int h1)
        {
            int hash = (w1 + 1) * (h1 + 1);
            if (_cachedOffs.ContainsKey(hash))
                return _cachedOffs[hash];

            var offs = new Point[0];

            var ca = 0;
            for (int y = -1; y < h1; y++)
                for (int x = -1; x < w1; x++)
                    offs[ca++] = (new Point(x, y));
            return _cachedOffs[hash] = offs;
        }

        private void updatePositions(CanvasRenderingContext2D canvas)
        {
            ScreenOffset.X = 0;
            ScreenOffset.Y = 0;

            if (CurrentGameState == GameState.Playing) updatePositionsForPlaying(canvas);

            /*    if (WindowLocation.X < 0) WindowLocation.X = 0;
            if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;*/
        }

        private void updatePositionsForPlaying(CanvasRenderingContext2D canvas)
        {
            canvas.Scale(RealScale.X, RealScale.Y);
            if (SonicToon.Ticking)
            {
                while (true)
                {
                    if (SonicToon.Ticking)
                        break;
                }
            }
            canvas.Translate(ScreenOffset.X, ScreenOffset.Y);
            //canvas.FillStyle = "#000000";
            //canvas.FillRect(0, 0, WindowLocation.Width * Scale.X, WindowLocation.Height * Scale.Y);

            WindowLocation.X = (int)(SonicToon.X) - WindowLocation.Width / 2;
            WindowLocation.Y = (int)(SonicToon.Y) - WindowLocation.Height / 2;

            BigWindowLocation.X = (int)(SonicToon.X) - BigWindowLocation.Width / 2;
            BigWindowLocation.Y = (int)(SonicToon.Y) - BigWindowLocation.Height / 2;

            BigWindowLocation.X = (int)(BigWindowLocation.X - WindowLocation.Width * 0.2);
            BigWindowLocation.Y = (int)(BigWindowLocation.Y - WindowLocation.Height * 0.2);

            BigWindowLocation.Width = (int)(WindowLocation.Width * 1.8);
            BigWindowLocation.Height = (int)(WindowLocation.Height * 1.8);


        }

        private static void drawLoading(CanvasRenderingContext2D canvas)
        {
            canvas.FillStyle = "white";
            canvas.FillText("Loading...   " /*+ (this.inds.tc + this.inds.tp + this.inds.t) + " / " + (this.inds.total)*/, 95, 95);
            canvas.Restore();
            return;
        }

        private bool drawHaltMode(CanvasRenderingContext2D canvas)
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


        private void drawLowChunks(CanvasRenderingContext2D canvas, Point localPoint, Point[] offs, int fyP, int fxP)
        {
            foreach (Point off in offs)
            {
                int _xP = fxP + off.X;
                int _yP = fyP + off.Y;
                int _xPreal = fxP + off.X;
                int _yPreal = fyP + off.Y;
                //if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                _xP = Help.Mod(_xP, SonicLevel.LevelWidth);
                _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                TileChunk chunk = SonicLevel.GetChunkAt(_xP, _yP);
                if (chunk == null) continue;
                localPoint.X = (_xPreal * 128) - WindowLocation.X;
                localPoint.Y = (_yPreal * 128) - WindowLocation.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyForeground())
                    chunk.Draw(canvas, localPoint, ChunkLayer.Low);
            }
        }

        private void drawHighChunks(CanvasRenderingContext2D canvas, int fxP, int fyP, Point[] offs, Point localPoint)
        {
            foreach (Point off in offs)
            {
                int _xP = fxP + off.X;
                int _yP = fyP + off.Y;
                int _xPreal = fxP + off.X;
                int _yPreal = fyP + off.Y;
                //if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                _xP = Help.Mod(_xP, SonicLevel.LevelWidth);
                _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                TileChunk chunk = SonicLevel.GetChunkAt(_xP, _yP);
                if (chunk == null) continue;

                localPoint.X = (_xPreal * 128) - WindowLocation.X;
                localPoint.Y = (_yPreal * 128) - WindowLocation.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyBackground())
                    chunk.Draw(canvas, localPoint, ChunkLayer.High);

                if (ShowHeightMap)
                {
                    var fd = SpriteCache.HeightMapChunks[(SonicLevel.CurHeightMap ? 1 : 2) + " " + chunk.Index];

                    if (fd == null)
                    {
                        fd = cacheHeightMapForChunk(chunk);
                    }
                    canvas.DrawImage(fd.Canvas, localPoint.X, localPoint.Y);
                }
                if (CurrentGameState == GameState.Editing)
                {
                    canvas.StrokeStyle = "#DD0033";
                    canvas.LineWidth = 3;
                    canvas.StrokeRect(localPoint.X, localPoint.Y, 128, 128);
                }
            }
        }
        private void drawDebugTextChunks(CanvasRenderingContext2D canvas, int fxP, int fyP, Point[] offs, Point localPoint)
        {
            foreach (Point off in offs)
            {
                int _xP = fxP + off.X;
                int _yP = fyP + off.Y;
                int _xPreal = fxP + off.X;
                int _yPreal = fyP + off.Y;
                //if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                _xP = Help.Mod(_xP, SonicLevel.LevelWidth);
                _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                TileChunk chunk = SonicLevel.GetChunkAt(_xP, _yP);
                if (chunk == null) continue;

                localPoint.X = (_xPreal * 128) - WindowLocation.X;
                localPoint.Y = (_yPreal * 128) - WindowLocation.Y;

                if (!chunk.IsEmpty() && !chunk.OnlyForeground())
                    chunk.DrawAnimationDebug(canvas, localPoint, ChunkLayer.Low);

                if (!chunk.IsEmpty() && !chunk.OnlyBackground())
                    chunk.DrawAnimationDebug(canvas, localPoint, ChunkLayer.High);
            }
        }

        private CanvasInformation cacheHeightMapForChunk(TileChunk chunk)
        {
            var md = chunk;
            var posj1 = new Point(0, 0);
            var canv = CanvasInformation.Create(128, 128);
            var ctx = canv.Context;
            engine.Clear(canv);
            for (var _y = 0; _y < 8; _y++)
            {
                for (var _x = 0; _x < 8; _x++)
                {
                    var tp = md.TilePieces[_x][_y];
                    var solid = (int)(SonicLevel.CurHeightMap ? tp.Solid1 : tp.Solid2);

                    var hd = SonicLevel.CurHeightMap ? tp.GetLayer1HeightMaps() : tp.GetLayer2HeightMaps();

                    var __x = _x;
                    var __y = _y;
                    var vangle = 0;
                    var posm = new Point(posj1.X + (__x * 16), posj1.Y + (__y * 16));

                    if (hd.Falsey()) continue;
                    if (hd.Full == false)
                    {
                    }
                    else if (hd.Full == true)
                    {
                        if (solid > 0)
                        {
                            ctx.FillStyle = HeightMap.colors[solid];
                            ctx.FillRect(posj1.X + (__x * 16),
                                posj1.Y + (__y * 16),
                                16,
                                16);
                        }
                    }
                    else
                    {
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
            return SpriteCache.HeightMapChunks[(SonicLevel.CurHeightMap ? 1 : 2) + " " + md.Index]
                    = canv;
        }

        private void drawSonic(CanvasRenderingContext2D canvas)
        {
            if (CurrentGameState == GameState.Playing)
            {
                SonicToon.Draw(canvas);
                //if (WindowLocation.X < 0) WindowLocation.X = 0;

                //if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                //    WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
                //if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
                //    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
            }
        }

        private void drawRings(CanvasRenderingContext2D canvas, Point localPoint)
        {
            for (int index = 0; index < SonicLevel.Rings.Count; index++)
            {
                var r = SonicLevel.Rings[index];

                switch (CurrentGameState)
                {
                    case GameState.Playing:
                        if (!SonicToon.obtainedRing[index])
                        {
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

            switch (CurrentGameState)
            {
                case GameState.Playing:

                    for (int i = ActiveRings.Count - 1; i >= 0; i--)
                    {
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

        private void drawAnimations(CanvasRenderingContext2D canvas)
        {
            foreach (AnimationInstance ano in AnimationInstances)
            {
                ano.Draw(canvas, -WindowLocation.X, -WindowLocation.Y);
            }
        }

        private void drawObjects(CanvasRenderingContext2D canvas, Point localPoint)
        {
            List<LevelObjectInfo> levelObjectInfos = SonicLevel.Objects;
            foreach (LevelObjectInfo o in levelObjectInfos)
            {
                localPoint.X = Script.Reinterpret<int>(o.X);
                localPoint.Y = Script.Reinterpret<int>(o.Y);
                if (o.Dead || BigWindowLocation.Intersects(localPoint))
                {
                    o.Draw(canvas,
                           ((localPoint.X - WindowLocation.X)),
                           ((localPoint.Y - WindowLocation.Y)),
                           ShowHeightMap);
                }
            }
        }

        private TileAnimationData containsAnimatedTile(int tile, SonicLevel sonLevel)
        {
            foreach (var an in sonLevel.TileAnimations)
            {
                var anin = an.AnimationTileIndex;
                var num = an.NumberOfTiles;
                if (tile >= anin && tile < anin + num)
                    return an;
            }
            return null;
        }

        public void ClearCache()
        {
            if (SpriteCache != null) SpriteCache.ClearCache();
            if (SonicLevel != null) SonicLevel.ClearCache();
            if (TilePaletteAnimationManager != null) TilePaletteAnimationManager.ClearCache();
            if (TileAnimationManager != null) TileAnimationManager.ClearCache();
        }

        public bool MouseUp(jQueryEvent queryEvent)
        {
            clicking = false;
            return false;
        }

        public bool MouseMove(jQueryEvent queryEvent)
        {
            if (clicking)
                if (effectClick(queryEvent)) return true;
            return false;
        }

        public void ReplaceMagic()
        {
            Replace(new Rectangle(0, 0, 15, 30), new Point(712, 40)); //level 1 act 1
            // Replace(new Rectangle(312, 15, 55, 70), new Point(1032, 0)); // laucnh base 1 :-/
        }

        public void Replace(Rectangle from, Point to)
        {
            for (int y = from.Height; y >= 0; y--)
            {
                int curY = y;
                Window.SetTimeout(
                    () =>
                    {
                        for (int x = 0; x < from.Width; x++)
                        {
                            var toChunkX = (to.X + x) / 8;
                            var toChunkY = (to.Y + curY) / 8;

                            var tochunk = SonicLevel.GetChunkAt(toChunkX, toChunkY);
                            tochunk.ClearCache();
                            var totp = tochunk.TilePieces[(to.X + x) - toChunkX * 8][(to.Y + curY) - toChunkY * 8];
                            tochunk.IsOnlyBackground = null;
                            tochunk.IsOnlyForeground = null;

                            var fromChunkX = (from.X + x) / 8;
                            var fromChunkY = (from.Y + curY) / 8;

                            var fromchunk = SonicLevel.GetChunkAt(fromChunkX, fromChunkY);
                            fromchunk.ClearCache();
                            fromchunk.IsOnlyBackground = null;
                            fromchunk.IsOnlyForeground = null;
                            var fromtp = fromchunk.TilePieces[(from.X + x) - fromChunkX * 8][(from.Y + curY) - fromChunkY * 8];

                            tochunk.TilePieces[(to.X + x) - toChunkX * 8][(to.Y + curY) - toChunkY * 8] = fromtp;
                            fromchunk.TilePieces[(from.X + x) - fromChunkX * 8][(from.Y + curY) - fromChunkY * 8] = totp;

                        }


                    },
                    (from.Height - y) * 50
               );
            }
        }


        public void CacheTiles()
        {

            Console.Time("tileCache");
            TilePaletteAnimationManager = new TilePaletteAnimationManager(this);
            TileAnimationManager = new TileAnimationManager(this);
            foreach (var chunk in SonicLevel.TileChunks)
            {
                chunk.InitCache();
                chunk.WarmCache();
            }
            Console.TimeEnd("tileCache");


            Console.Time("collisionCache");
            foreach (var chunk in SonicLevel.TileChunks)
            {
                SonicToon.SensorManager.BuildChunk(chunk, false);
                SonicToon.SensorManager.BuildChunk(chunk, true);
            }
            Console.TimeEnd("collisionCache");



            if (false)
            {
                debugDraw();
            }
        }

        private void debugDraw()
        {
            int numWide = 10;
            int dropOffIndex = 0;
            List<string> pieces = new List<string>();

            while (true)
            {
                List<CanvasInformation> debugCanvases = new List<CanvasInformation>();
                int totalHeight = 0;
                var broke = false;
                for (int index = dropOffIndex; index < SonicLevel.TileChunks.Count; index++)
                {
                    var chunk = SonicLevel.TileChunks[index];
                    var canvasCache = chunk.Debug_DrawCache();
                    totalHeight += canvasCache.Canvas.Height;
                    debugCanvases.Add(canvasCache);
                    if (totalHeight > 10000)
                    {
                        dropOffIndex = index + 1;
                        broke = true;
                        break;
                    }
                }

                var bigOne = CanvasInformation.Create(numWide * 128, totalHeight);
                int currentPosition = 0;
                for (int index = 0; index < debugCanvases.Count; index++)
                {
                    var canvasInformation = debugCanvases[index];
                    bigOne.Context.DrawImage(canvasInformation.Canvas, 0, currentPosition);
                    currentPosition += canvasInformation.Canvas.Height;
                }
                pieces.Add(bigOne.Canvas.Me().toDataURL());
                if (!broke) break;
            }

            var str = "<html><body>";
            foreach (var piece in pieces)
            {
                str += "<img src=\"" + piece + "\"/>\n";
            }
            str += "</body></html>";
            var tx = (TextAreaElement)Window.Document.CreateElement("textarea");
            tx.Style.Position = "absolute";
            tx.Value = str;
            Window.Document.Body.AppendChild(tx);
        }
    }
}
//http://www.youtube.com/watch?v=_VTJtFERW54