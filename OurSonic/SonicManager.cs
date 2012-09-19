using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using OurSonic.Drawing;
using OurSonicModels;
using jQueryApi;
namespace OurSonic
{
    public partial class SonicManager
    {
        public static SonicManager Instance;
        private static string[] base64chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".Split("");
        private static JsDictionary<string, int> base64Inv;
        private readonly CanvasInformation mainCanvas;
        private readonly SonicEngine myEngine;
        private readonly ObjectManager objectManager;
        public int DrawTickCount;
        private int imageLength;
        private string myStatus;
        private object sonicSprites;
        private int tickCount;
        private bool waitingForDrawContinue;
        private bool waitingForTickContinue;
        [IntrinsicProperty]
        public GameState CurrentGameState { get; set; }
        [IntrinsicProperty]
        public IntersectingRectangle BigWindowLocation { get; set; }
        [IntrinsicProperty]
        public UIManager UIManager { get; set; }
        [IntrinsicProperty]
        public Sonic SonicToon { get; set; }
        [IntrinsicProperty]
        public Point Scale { get; set; }
        [IntrinsicProperty]
        public IntersectingRectangle WindowLocation { get; set; }
        [IntrinsicProperty]
        public Point RealScale { get; set; }
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
        protected List<SonicObject> InFocusObjects { get; set; }
        [IntrinsicProperty]
        protected bool Loading { get; set; }
        [IntrinsicProperty]
        protected SpriteCache SpriteCache { get; set; }
        [IntrinsicProperty]
        protected SpriteLoader SpriteLoader { get; set; }
        protected string Status
        {
            get { return myStatus; }
            set
            {
                UIManager.UpdateTitle(value);
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
            myEngine = engine;
            myEngine.canvasWidth = jQuery.Window.GetWidth();
            myEngine.canvasHeight = jQuery.Window.GetHeight();

            gameCanvas.DomCanvas[0].SetAttribute("width", myEngine.canvasWidth);
            gameCanvas.DomCanvas[0].SetAttribute("height", myEngine.canvasHeight);

            jQuery.GetJson("Content/sprites/sonic.js", data => { sonicSprites = data; });

            objectManager = new ObjectManager(this);
            objectManager.Init();
            int scl = 2;
            Scale = new Point(scl, scl);
            RealScale = new Point(1, 1);
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

            UIManager = new UIManager(this, mainCanvas, Scale);
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
            var e = new Point(elementEvent.ClientX / Scale.X / RealScale.X / WindowLocation.X,
                              elementEvent.ClientY / Scale.Y / RealScale.Y + WindowLocation.Y);

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
                        if (tp != null) {
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
                        //this.SonicLevel.Rings.push({ X: ex, Y: ey });
                        return true;
                    case ClickState.PlaceObject:
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
            InFocusObjects = new List<SonicObject>();
            foreach (SonicObject obj in SonicLevel.Objects) {
                localPoint.X = obj.X;
                localPoint.Y = obj.Y;
                if (BigWindowLocation.Intersects(localPoint)) {
                    InFocusObjects.Add(obj);
                    obj.Tick(obj, SonicLevel, SonicToon);
                }
            }
            //sonicManager.uiManager.liveObjectsArea.populate(sonicManager.inFocusObjects);TODO:::
            foreach (AnimationInstance animationInstance in AnimationInstances) {
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
                } catch (Exception exc) {
                    string txt = "There was an error on this page.\n\n";
                    txt += "Error description: " + exc.Message + "\n\n";
                    txt += "Stack: " + exc.InnerException + "\n\n"; //todo::callstack
                    txt += "Click OK to continue.\n\n";

                    Window.Alert(txt);
                    throw exc;
                } finally {
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
            SpriteCache = new SpriteCache();
            var ci = SpriteCache.Rings;
            var inj = 0;
            var spriteLocations = new List<string>();

            for (int j = 0; j < 4; j++) {
                spriteLocations.Add(string.Format("assets/Sprites/ring{0}.png", j));
                imageLength++;
            }
            int md = 0;
            var ind_ = SpriteCache.Indexes;
            SpriteLoader = new SpriteLoader(completed, update);
            var spriteStep = SpriteLoader.AddStep("Sprites", (i, done) => {
                                                                 var sp = i * 200;
                                                                 ci[sp] = Help.LoadSprite(spriteLocations[i],
                                                                                          jd => {
                                                                                              ci[
                                                                                                      jd.Me().Tag *
                                                                                                      200 +
                                                                                                      scale.X * 100 +
                                                                                                      scale.Y] =
                                                                                                      Help.
                                                                                                              ScaleSprite
                                                                                                              (jd, scale,
                                                                                                               jc =>
                                                                                                               done());
                                                                                          });
                                                             });
            /*


                    var sm = this.spriteLoader = new SpriteLoader(completed, update);
                    var spriteStep = sm.addStep("Sprites", function (i, done) {
                        var sp = i * 200;
                        ci[sp] = _H.loadSprite(spriteLocations[i], function (jd) {
                            ci[jd.tag * 200 + scale.x * 100 + scale.y] = _H.scaleSprite(jd, scale, function (jc) {
                                done();
                            });
                        });
                        ci[sp].tag = i;
                    }, function () {
                        ind_.sprites = ind_.sprites + 1;
                        if (ind_.sprites == 4) {
                            return true;
                        }
                        return false;
                    }, false);


                    for (var i = 0; i < spriteLocations.length; i++) {
                        sm.addIterationToStep(spriteStep, i);
                    }

                    var that = this;
                    var tileStep = sm.addStep("Tiles", function (k, done) {
                        var canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
                        var ctx = canv.context;
                        canv.width = canv.width;
                        md = that.SonicLevel.Blocks[k];
                        md.draw(ctx, { x: 0, y: 0 }, scale, false);
                        that.SpriteCache.tilepieces[false + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;




                        canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
                        ctx = canv.context;
                        canv.width = canv.width;

                        md.draw(ctx, { x: 0, y: 0 }, scale, true);
                        that.SpriteCache.tilepieces[true + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
                        done();
                        done();

                    }, function () {
                        ind_.tps++;
                        if (ind_.tps == that.SonicLevel.Blocks.length * 2) {
                            return true;
                        }
                        return false;
                    }, true);



                    for (var k = 0; k < this.SonicLevel.Blocks.length; k++) {
                        sm.addIterationToStep(tileStep, k);
                    }


                    var speed = 1;
                    /*
                    var pixelStep = sm.addStep("Pixels", function (k, done) {

                    var ca = _H.defaultCanvas(1, 1);
                    ca.fillStyle = "#" + sonicManager.SonicLevel.Palette[k.x][k.y];
                    ca.context.fillRect(0, 0, 1, 1);
                    sonicManager.SonicLevel.Palette[k.x][k.y] = _H.loadSprite(ca.canvas.toDataURL("image/png"), done);


                    }, function () {
                    ind_.px++;
                    if (ind_.px >= 16*4) {
                    return true;
                    }
                    return false;
                    });

                    for (var qc = 0; qc < sonicManager.SonicLevel.Palette.length; qc++) {
                    for (var qcc = 0; qcc < sonicManager.SonicLevel.Palette[qc].length; qcc++) {
                    sm.addIterationToStep(pixelStep, { x: qc, y: qcc });
                    }
                    }
                    #1#


                    /*        var heightStep = sm.addStep("Height Maps", function (k, done) {
                    var canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
                    var ctx = canv.context;
                    ctx.clearRect(0, 0, canv.width, canv.height);
                    md = that.SonicLevel.HeightMaps[k];
                    md.index = k;
                    md.draw(ctx, { x: 0, y: 0 }, scale, -1, false, false, 0);
                    var fc = canv.canvas.toDataURL("image/png");
                    that.SpriteCache.heightMaps[md.index] = _H.loadSprite(fc, done);


                    }, function () {
                    ind_.hms++;
                    if (ind_.hms >= that.SonicLevel.HeightMaps.length / speed) {
                    return true;
                    }
                    return false;
                    });


                    for (var k = 0; k < this.SonicLevel.HeightMaps.length; k++) {

                    sm.addIterationToStep(heightStep, k);
                    }#1#


                    /*
                    var tileStep = sm.addStep("Tile Maps", function (k, done) {
                    var canv = _H.defaultCanvas(16 * scale.x, 16 * scale.y);
                    var ctx = canv.context;
                    ctx.clearRect(0, 0, canv.width, canv.height);
                    md = that.SonicLevel.Tiles[k];
                    md.index = k;
                    md.draw(ctx, { x: 0, y: 0 }, scale,  false, false, 0);
                    var fc = canv.canvas.toDataURL("image/png");
                    that.SpriteCache.tiles[md.index] = _H.loadSprite(fc, done);

                    }, function () {
                    ind_.tls++;
                    if (ind_.tls >= that.SonicLevel.Tiles.length  / speed) {
                    return true;
                    }
                    return false;
                    });


                    for (var k = 0; k < this.SonicLevel.Tiles.length; k++) { 
                    sm.addIterationToStep(tileStep, k);
                    }
                    #1#

                    var numOfAnimations = 0;

                    /* var aTileStep = sm.addStep("Animated Tile Maps", function (k, done) {

                    for (var m = 0; m < 4; m++) {
                    var canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
                    var ctx = canv.context;
                    k.draw(ctx, { x: 0, y: 0 }, scale, false, false, m);
                    sonicManager.SpriteCache.tiles[k.index + " " + false + " " + false + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);

                    canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
                    ctx = canv.context;
                    k.draw(ctx, { x: 0, y: 0 }, scale, true, false, m);
                    sonicManager.SpriteCache.tiles[k.index + " " + true + " " + false + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);

                    canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
                    ctx = canv.context;
                    k.draw(ctx, { x: 0, y: 0 }, scale, false, true, m);
                    sonicManager.SpriteCache.tiles[k.index + " " + false + " " + true + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);

                    canv = _H.defaultCanvas(8 * scale.x, 8 * scale.y);
                    ctx = canv.context;
                    k.draw(ctx, { x: 0, y: 0 }, scale, true, true, m);
                    sonicManager.SpriteCache.tiles[k.index + " " + true + " " + true + " " + m] = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);



                    }

                    }, function () {
                    ind_.aes++;
                    if (ind_.aes >= numOfAnimations * 4 * 4) {
                    return true;
                    }
                    return false;
                    }, true);

                    for (jc = 0; jc < sonicManager.SonicLevel.AnimatedFiles.length; jc++) {
                    var fcc = sonicManager.SonicLevel.AnimatedFiles[jc];
                    for (j = 0; j < fcc.length; j++) {
                    sm.addIterationToStep(aTileStep, fcc[j]);
                    numOfAnimations++;
                    }
                    }#1#


                    var chunkStep = sm.addStep("Chunk Maps", function (k, done) {

                        var canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                        var ctx = canv.context;
                        canv.width = canv.width;
                        md = that.SonicLevel.Chunks[k];
                        /*

                        md.draw(ctx, { x: 0, y: 0 }, scale, false);
                        //var fc = canv.canvas.toDataURL("image/png");

                        that.SpriteCache.tileChunks[false + " " + md.index + " " + scale.y + " " + scale.x + " -"] = canv.canvas;
                        ind_.tcs++;
                        done();

                        canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                        ctx = canv.context;
                        ctx.clearRect(0, 0, canv.width, canv.height);


                        if (!md.onlyBackground()) {
                        md.draw(ctx, { x: 0, y: 0 }, scale, true);
                        //  var fc = canv.canvas.toDataURL("image/png");
                        that.SpriteCache.tileChunks[true + " " + md.index + " " + scale.y + " " + scale.x + " -"] = canv.canvas;
                        ind_.tcs++;
                        done();
                        } else {
                        that.SpriteCache.tileChunks[true + " " + md.index + " " + scale.y + " " + scale.x + " -"] = 1;
                        ind_.tcs++;
                        done();
                        }


                        if (md.animated) {
                        sonicManager.DrawTickCount = 0;
                        sonicManager.CACHING = false;
                        for (var c = 0; c < md.animated.Frames.length; c++) {
                        var frame = md.animated.Frames[c];

                        canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                        ctx = canv.context;
                        ctx.clearRect(0, 0, canv.width, canv.height);

                        md.draw(ctx, { x: 0, y: 0 }, scale, true, c);
                        //   var fc = canv.canvas.toDataURL("image/png");
                        that.SpriteCache.tileChunks[true + " " + md.index + " " + scale.y + " " + scale.x + " " + c] = canv.canvas;
                        canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                        ctx = canv.context;
                        ctx.clearRect(0, 0, canv.width, canv.height);

                        md.draw(ctx, { x: 0, y: 0 }, scale, false, c);
                        // var fc = canv.canvas.toDataURL("image/png");
                        that.SpriteCache.tileChunks[false + " " + md.index + " " + scale.y + " " + scale.x + " " + c] = canv.canvas;
                        }
                        sonicManager.CACHING = true;
                        }#1#


                        var posj = { x: 0, y: 0 };
                        canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                        ctx = canv.context;
                        ctx.clearRect(0, 0, canv.width, canv.height);
                        for (var _y = 0; _y < 8; _y++) {
                            for (var _x = 0; _x < 8; _x++) {
                                var tp = md.tilePieces[_x][_y];
                                var hd = sonicManager.SonicLevel.HeightMaps[sonicManager.SonicLevel.CollisionIndexes1[tp.Block]];
                                var __x = _x;
                                var __y = _y;
                                var vangle;
                                var posm = { x: posj.x + (__x * 16) * scale.x, y: posj.y + (__y * 16) * scale.y };



                                if (hd == undefined) continue;
                                if (hd == 0) {

                                } else if (hd == 1) {
                                    if (tp.Solid1 > 0) {
                                        ctx.fillStyle = HeightMask.colors[tp.Solid1];
                                        ctx.fillRect(posj.x + (__x * 16) * scale.x, posj.y + (__y * 16) * scale.y, scale.x * 16, scale.y * 16);
                                    }
                                }
                                else {
                                    vangle = sonicManager.SonicLevel.Angles[sonicManager.SonicLevel.CollisionIndexes1[tp.Block]];

                                    hd.draw(ctx, posm, scale, -1, tp.XFlip, tp.YFlip, tp.Solid1, vangle);
                                    /*   posm.x += 16 * scale.x / 2;
                                    posm.y += 16 * scale.y / 2;
                                    ctx.strokeStyle = "#DDD";
                                    ctx.font = "18pt courier ";
                                    ctx.shadowColor = "";
                                    ctx.shadowBlur = 0;
                                    ctx.lineWidth = 1;
                                    ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);#1#
                                }
                            }
                        }
                        //  var fc = canv.canvas.toDataURL("image/png");
                        that.SpriteCache.heightMapChunks[1 + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
                        ind_.hmc++; done();




                        canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                        ctx = canv.context;
                        ctx.clearRect(0, 0, canv.width, canv.height);
                        for (var _y = 0; _y < 8; _y++) {
                            for (var _x = 0; _x < 8; _x++) {
                                var tp = md.tilePieces[_x][_y];
                                var hd = sonicManager.SonicLevel.HeightMaps[sonicManager.SonicLevel.CollisionIndexes2[tp.Block]];
                                var __x = _x;
                                var __y = _y;
                                var vangle;
                                var posm = { x: posj.x + (__x * 16) * scale.x, y: posj.y + (__y * 16) * scale.y };
                                if (hd == undefined) continue;

                                if (hd == 0) {

                                } else if (hd == 1) {
                                    if (tp.Solid2 > 0) {
                                        ctx.fillStyle = HeightMask.colors[tp.Solid2];
                                        ctx.fillRect(posj.x + (__x * 16) * scale.x, posj.y + (__y * 16) * scale.y, scale.x * 16, scale.y * 16);
                                    }
                                }
                                else {
                                    vangle = sonicManager.SonicLevel.Angles[sonicManager.SonicLevel.CollisionIndexes2[tp.Block]];

                                    hd.draw(ctx, posm, scale, -1, tp.XFlip, tp.YFlip, tp.Solid2, vangle);
                                    /*   posm.x += 16 * scale.x / 2;
                                    posm.y += 16 * scale.y / 2;
                                    ctx.strokeStyle = "#DDD";
                                    ctx.font = "18pt courier ";
                                    ctx.shadowColor = "";
                                    ctx.shadowBlur = 0;
                                    ctx.lineWidth = 1;
                                    ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);#1#

                                }
                            }
                        }
                        //  var fc = canv.canvas.toDataURL("image/png");
                        that.SpriteCache.heightMapChunks[2 + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
                        ind_.hmc++; done();


                    }, function () {
                        if (/*ind_.tcs >= that.SonicLevel.Chunks.length * 2 / speed && #1#ind_.hmc >= that.SonicLevel.Chunks.length * 2 / speed) {

                            return true;
                        }
                        return false;
                    }, true);

                    for (var k = 0; k < this.SonicLevel.Chunks.length; k++) {
                        sm.addIterationToStep(chunkStep, k);
                    }



                    var sonicStep = sm.addStep("Sonic Sprites", function (sp, done) {

                        var cci = that.SpriteCache.sonicSprites;

                        for (var spritec in $sonicSprites) {
                            cci[spritec + scale.x + scale.y] = _H.scaleCSImage($sonicSprites[spritec], scale);
                        }

                        var cji = that.SpriteCache.animationSprites = [];

                        for (var anni in sonicManager.animations) {
                            var imd = 0;
                            for (var image in sonicManager.animations[anni].images) {
                                cji[(imd++) + " " + sonicManager.animations[anni].name + scale.x + scale.y] = _H.scaleCSImage(sonicManager.animations[anni].images[image], scale);
                            }
                        }

                        done();
                    }, function () {
                        return true;
                    }, false);



                    that.spriteLocations = [];
                    sm.addIterationToStep(sonicStep, true);



                    var bgStep = sm.addStep("Background data", function (sp, done) {

                        var canv = _H.defaultCanvas(that.SonicLevel.BackgroundWidth * 128 * scale.x, that.SonicLevel.BackgroundHeight * 128 * scale.y);
                        var ctx = canv.context;
                        ctx.clearRect(0, 0, canv.width, canv.height);

                        for (var x = 0; x < that.SonicLevel.BackgroundWidth; x++) {
                            for (var y = 0; y < that.SonicLevel.BackgroundHeight; y++) {
                                var ck = sonicManager.SonicLevel.Chunks[that.SonicLevel.BGChunkMap[x][y]];
                                if (ck) {
                                    ck.draw(ctx, { x: x * 128 * scale.x, y: y * 128 * scale.y }, scale, 0);
                                }
                            }
                        }

                        that.SpriteCache.bgImage = _H.loadSprite(canv.canvas.toDataURL("image/png"), done);


                    }, function () {
                        that.background = new ParallaxBG(that.SpriteCache.bgImage, { x: 1, y: 1 });
                        return true;

                    }, true);
                    sm.addIterationToStep(bgStep, 0);
            */
        }

        public void Draw(CanvasContext2D canvas)
        {
            if (InHaltMode) {
                canvas.FillStyle = "white";
                canvas.Font = "21pt arial bold";
                canvas.FillText("HALT MODE\r\n Press: P to step\r\n        O to resume", 10, 120);

                if (waitingForDrawContinue)
                    return;
                else
                    waitingForDrawContinue = true;
            }
            canvas.Save();
            var localPoint = new Point(0, 0);

            DrawTickCount++;
            if (false && ( SpriteLoader != null && !SpriteLoader.Tick() || Loading )) {
                canvas.FillStyle = "white";
                canvas.FillText(
                        "Loading...   " /*+ (this.inds.tc + this.inds.tp + this.inds.t) + " / " + (this.inds.total)*/, 95,
                        95);
                canvas.Restore();
                return;
            }
            ScreenOffset.X = 0;
            ScreenOffset.Y = 0;

            if (CurrentGameState == GameState.Playing) {
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

                WindowLocation.X = SonicToon.X * WindowLocation.Width / 2;
                WindowLocation.Y = SonicToon.Y * WindowLocation.Height / 2;

                BigWindowLocation.X = SonicToon.X * BigWindowLocation.Width / 2;
                BigWindowLocation.Y = SonicToon.Y * BigWindowLocation.Height / 2;
                if (Background != null) {
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
            if (WindowLocation.X < 0) WindowLocation.X = 0;
            if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
            var offs = new List<Point>();
            int w1 = WindowLocation.Width / 128;
            int h1 = WindowLocation.Height / 128;
            for (int i = -1; i < w1; i++)
                for (int j = -1; j < h1; j++)
                    offs.Add(new Point(i, j));

            var bounds = new IntersectingRectangle(-32, -32, WindowLocation.Width * Scale.X + 32, WindowLocation.Height * Scale.Y + 32);
            if (SonicLevel.Chunks != null && SonicLevel.Chunks.Count > 0) {
                if (SonicLevel.PaletteItems[0] != null) {
                    for (int k = 0; k < SonicLevel.PaletteItems[0].Count; k++) {
                        var pal = SonicLevel.PaletteItems[0][k];
                        for (int j = 0; j < pal.TotalLength; j += pal.SkipIndex) {
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
                int fxP = ( WindowLocation.X + 128 ) / 128;
                int fyP = ( WindowLocation.Y + 128 ) / 128;
                foreach (Point off in offs) {
                    int _xP = fxP + off.X;
                    int _yP = fyP + off.Y;
                    int _yPreal = fyP + off.Y;
                    if (_xP < 0 || _xP >= SonicLevel.LevelWidth)
                        continue;

                    _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                    int ind = SonicLevel.ChunkMap[_xP][_yP];
                    TileChunk chunk = SonicLevel.Chunks[ind];
                    TileChunk anni = SonicLevel.Chunks[ind];
                    if  (anni != null)
                        anni.AnimatedTick();
                    if (chunk == null)
                        continue;
                    localPoint.X = ( _xP * 128 * Scale.X ) - WindowLocation.X * Scale.X;
                    localPoint.Y = ( _yPreal * 128 * Scale.Y ) - WindowLocation.Y * Scale.Y;

                    if (!chunk.IsEmpty())
                        chunk.Draw(canvas, localPoint, Scale, 0, bounds);
                    if (false && CurrentGameState == GameState.Editing) {
                        canvas.StrokeStyle = "#DD0033";
                        canvas.LineWidth = 3;
                        canvas.StrokeRect(localPoint.X, localPoint.Y, 128 * Scale.X, 128 * Scale.Y);
                    }
                }
                foreach (var r in SonicLevel.Rings) {
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

                foreach (SonicObject o in SonicLevel.Objects) {
                    localPoint.X = o.X;
                    localPoint.Y = o.Y;
                    if (o.Dead || BigWindowLocation.Intersects(localPoint)) {
                        o.Draw(canvas, ( o.X - WindowLocation.X ) * Scale.X, ( o.Y - WindowLocation.Y ) * Scale.Y, Scale,
                               ShowHeightMap);
                    }
                }
                foreach (AnimationInstance ano in AnimationInstances) {
                    ano.Draw(canvas, -WindowLocation.X, -WindowLocation.Y, Scale);
                }
                for (int i = ActiveRings.Count - 1; i >= 0; i--) {
                    Ring ac = ActiveRings[i];
                    localPoint.X = ac.X - WindowLocation.X;
                    localPoint.Y = ac.Y - WindowLocation.Y;
                    ac.Draw(canvas, localPoint, Scale);
                    if (ac.TickCount > 256)
                        ActiveRings.Remove(ac);
                }
                if (CurrentGameState == GameState.Playing) {
                    SonicToon.Draw(canvas, Scale);
                    if (WindowLocation.X < 0) WindowLocation.X = 0;
                    if (WindowLocation.Y < 0) WindowLocation.Y = 0;
                    if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                        WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
                    //if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
                    //    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
                }

                foreach (Point off in offs) {
                    int _xP = fxP + off.X;
                    int _yP = fyP + off.Y;
                    int _yPreal = fyP + off.Y;
                    if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                    _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                    TileChunk chunk = SonicLevel.Chunks[SonicLevel.ChunkMap[_xP][_yP]];
                    if (chunk == null)
                        continue;
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
                        /*
                            var fd = sonicManager.SpriteCache.heightMapChunks[(this.SonicLevel.curHeightMap ? 1 : 2) + " " + chunk.index + " " + scale.y + " " + scale.x];
                                if (!fd) {
                                    var md = chunk;
                                    var posj1 = { x: 0, y: 0 };
                                    var canv = _H.defaultCanvas(128 * scale.x, 128 * scale.y);
                                    var ctx = canv.context;
                                    canv.width = canv.width;
                                    for (var _y = 0; _y < 8; _y++) {
                                        for (var _x = 0; _x < 8; _x++) {
                                            var tp = md.tilePieces[_x][_y];

                                            var hd = sonicManager.SonicLevel.HeightMaps[(this.SonicLevel.curHeightMap ? sonicManager.SonicLevel.CollisionIndexes1[tp.Block] : sonicManager.SonicLevel.CollisionIndexes2[tp.Block])];

                                            var __x = _x;
                                            var __y = _y;
                                            var vangle;
                                            var posm = { x: posj1.x + (__x * 16) * scale.x, y: posj1.y + (__y * 16) * scale.y };



                                            if (hd == undefined) continue;
                                            if (hd == 0) {

                                            } else if (hd == 1) {
                                                if ((this.SonicLevel.curHeightMap ? tp.Solid1 : tp.Solid2) > 0) {
                                                    ctx.fillStyle = HeightMask.colors[this.SonicLevel.curHeightMap ? tp.Solid1 : tp.Solid2];
                                                    ctx.fillRect(posj1.x + (__x * 16) * scale.x, posj1.y + (__y * 16) * scale.y, scale.x * 16, scale.y * 16);
                                                }
                                            }
                                            else {
                                                vangle = sonicManager.SonicLevel.Angles[(this.SonicLevel.curHeightMap ? sonicManager.SonicLevel.CollisionIndexes1[tp.Block] : sonicManager.SonicLevel.CollisionIndexes2[tp.Block])];

                                                hd.draw(ctx, posm, scale, -1, tp.XFlip, tp.YFlip, this.SonicLevel.curHeightMap ? tp.Solid1 : tp.Solid2, vangle);
                                                /*   posm.x += 16 * scale.x / 2;
                                                posm.y += 16 * scale.y / 2;
                                                ctx.strokeStyle = "#DDD";
                                                ctx.font = "18pt courier ";
                                                ctx.shadowColor = "";
                                                ctx.shadowBlur = 0;
                                                ctx.lineWidth = 1;
                                                ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);#1#
                                            }
                                        }
                                    }
                                    //  var fc = canv.canvas.toDataURL("image/png");
                                    fd = that.SpriteCache.heightMapChunks[(this.SonicLevel.curHeightMap ? 1 : 2) + " " + md.index + " " + scale.y + " " + scale.x] = canv.canvas;
                                }
                                canvas.drawImage(fd, posj.x, posj.y);*/
                    }
                    if (CurrentGameState == GameState.Editing) {
                        canvas.StrokeStyle = "#DD0033";
                        canvas.LineWidth = 3;
                        canvas.StrokeRect(localPoint.X, localPoint.Y, 128 * Scale.X, 128 * Scale.Y);
                    }
                }
            }

            canvas.Restore();

            if (CurrentGameState == GameState.Playing)
                SonicToon.DrawUI(canvas, new Point(ScreenOffset.X, ScreenOffset.Y), Scale);
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

        private int[] decodeNumeric(string s)
        {
            s = s.Replace(new Regex("[^" + base64chars.Join("") + "=]", "g"), "");
            var p = s.CharAt(s.Length - 1) == "=" ? ( s.CharAt(s.Length - 2) == "=" ? "AA" : "A" ) : "";
            var r = new List<int>();
            s = s.Substr(0, s.Length - p.Length) + p;
            for (int c = 0; c < s.Length; c += 4) {
                var n = ( base64Inv[s.CharAt(c)] << 18 ) + ( base64Inv[s.CharAt(c + 1)] << 12 ) +
                        ( base64Inv[s.CharAt(c + 2)] << 6 ) + base64Inv[s.CharAt(c + 3)];

                r.Add(( n >> 16 ) & 255);
                r.Add(( n >> 8 ) & 255);
                r.Add(n & 255);
            }
            return (int[]) r.Slice(0, r.Count - 1);
        }
    }
}