using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Text.RegularExpressions;
using OurSonic.Drawing;
using jQueryApi;

namespace OurSonic
{
    public class SonicManager
    {
        private readonly CanvasInformation mainCanvas;
        private readonly SonicEngine myEngine;
        private readonly ObjectManager objectManager;
        public int DrawTickCount;
        private int imageLength;
        private object sonicSprites;
        private int tickCount;
        private bool waitingForDrawContinue;
        private bool waitingForTickContinue;

        public SonicManager(SonicEngine engine, CanvasInformation gameCanvas, Action resize)
        {
            Instance = this;

            myEngine = engine;
            myEngine.canvasWidth = jQuery.Window.GetWidth();
            myEngine.canvasHeight = jQuery.Window.GetHeight();

            jQuery.GetJson("Content/sprites/sonic.js", data => { sonicSprites = data; });

            objectManager = new ObjectManager(this);
            objectManager.Init();
            int scl = 2;
            Scale = new Point(scl, scl);
            RealScale = new Point(1, 1);
            mainCanvas = gameCanvas;

            WindowLocation = Constants.DefaultWindowLocation(1, mainCanvas, Scale);
            BigWindowLocation = Constants.DefaultWindowLocation(1, mainCanvas, Scale);
            BigWindowLocation.Width = (int)(BigWindowLocation.Width * 1.8);
            BigWindowLocation.Height = (int)(BigWindowLocation.Height * 1.8);

            Animations = new List<Animation>();
            AnimationInstances = new List<AnimationInstance>();
            jQuery.GetJson("Content/sprites/explosion.js", data => Animations.Add(new Animation("explosion", data)));

            ShowHeightMap = false;
            GoodRing = new Ring(false);
            ActiveRings = new List<Ring>();
            ForceResize = resize;
            Background = null;
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

        public GameState CurrentGameState { get; set; }

        public IntersectingRectangle BigWindowLocation { get; set; }
        public UIManager UIManager { get; set; }
        public Sonic SonicToon { get; set; }
        public Point Scale { get; set; }
        public IntersectingRectangle WindowLocation { get; set; }
        public Point RealScale { get; set; }
        public bool InHaltMode { get; set; }
        public int IndexedPalette { get; set; }
        public List<Animation> Animations { get; set; }
        public List<AnimationInstance> AnimationInstances { get; set; }
        public Ring GoodRing { get; set; }
        public bool ShowHeightMap { get; set; }
        public Point ScreenOffset { get; set; }
        public List<Ring> ActiveRings { get; set; }
        public Action ForceResize { get; set; }
        public SonicBackground Background { get; set; }
        public ClickState ClickState { get; set; }
        public SonicLevel SonicLevel { get; set; }
        protected List<SonicObject> InFocusObjects { get; set; }
        protected bool Loading { get; set; }
        protected SpriteCache SpriteCache { get; set; }
        protected SpriteLoader SpriteLoader { get; set; }

        public static SonicManager Instance;
        private string myStatus;


        public bool OnClick(jQueryEvent elementEvent)
        {
            var e = new Point(elementEvent.ClientX / Scale.X / RealScale.X / WindowLocation.X,
                              elementEvent.ClientY / Scale.Y / RealScale.Y + WindowLocation.Y);

            if (elementEvent.Button == 0)
            {
                int ey;
                int ex;
                switch (ClickState)
                {
                    case ClickState.Dragging:
                        return false;
                        break;
                    case ClickState.PlaceChunk:
                        ex = e.X / 128;
                        ey = e.Y / 128;
                        TileChunk ch = SonicLevel.Chunks[SonicLevel.ChunkMap[ex][ey]];
                        TilePiece tp = ch.GetBlock(e.X - ex * 128, e.Y - ey * 128);
                        if (tp != null)
                        {
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
            InFocusObjects = new List<SonicObject>();
            foreach (SonicObject obj in SonicLevel.Objects)
            {
                if (BigWindowLocation.Intersects(new Point(obj.X, obj.Y)))
                {
                    InFocusObjects.Add(obj);
                    obj.Tick(obj, SonicLevel, SonicToon);
                }
            }
            //sonicManager.uiManager.liveObjectsArea.populate(sonicManager.inFocusObjects);TODO:::
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
                    if (waitingForTickContinue)
                        return;

                tickCount++;
                tickObjects();
                SonicToon.Ticking = true;
                try
                {
                    SonicToon.Tick(SonicLevel, Scale);
                }
                catch (Exception exc)
                {
                    string txt = "There was an error on this page.\n\n";
                    txt += "Error description: " + exc.Message + "\n\n";
                    txt += "Stack: " + exc.InnerException + "\n\n"; //todo::callstack
                    txt += "Click OK to continue.\n\n";

                    Window.Alert(txt);
                    throw exc;
                }
                finally
                {
                    SonicToon.Ticking = false;
                }
                if (InHaltMode)
                {
                    if (waitingForTickContinue)
                    {
                        return;
                    }
                    waitingForTickContinue = true;
                    waitingForDrawContinue = false;
                }
                if (SonicToon.X > 128 * SonicLevel.LevelWidth)
                {
                    SonicToon.X = 0;
                }
            }
        }

        public void PreloadSprites(Point scale, Action completed, Action<string> update)
        {
            SpriteCache = new SpriteCache();
            var ci = SpriteCache.Rings;
            var inj = 0;
            var spriteLocations = new List<string>();

            for (int j = 0; j < 4; j++)
            {
                spriteLocations.Add(string.Format("assets/Sprites/ring{0}.png", j));
                imageLength++;
            }
            int md = 0;
            var ind_ = SpriteCache.Indexes;
            SpriteLoader = new SpriteLoader(completed, update);
            var spriteStep = SpriteLoader.AddStep("Sprites", (i, done) =>
                                                                 {
                                                                     var sp = i * 200;
                                                                     ci[sp] = Help.LoadSprite(spriteLocations[i],
                                                                                              jd =>
                                                                                              {
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
            if (InHaltMode)
            {
                canvas.FillStyle = "white";
                canvas.Font = "21pt arial bold";
                canvas.FillText("HALT MODE\r\n Press: P to step\r\n        O to resume", 10, 120);

                if (waitingForDrawContinue)
                {
                    return;
                }
                else
                {
                    waitingForDrawContinue = true;
                }
            }
            canvas.Save();
            DrawTickCount++;
            if (SpriteLoader != null && !SpriteLoader.Tick() || Loading)
            {
                canvas.FillStyle = "white";
                canvas.FillText(
                    "Loading...   " /*+ (this.inds.tc + this.inds.tp + this.inds.t) + " / " + (this.inds.total)*/, 95,
                    95);
                canvas.Restore();
                return;
            }
            ScreenOffset = new Point(0, 0);

            if (CurrentGameState == GameState.Playing)
            {
                canvas.Scale(RealScale.X, RealScale.Y);
                if (SonicToon.Ticking)
                {
                    while (true)
                    {
                        if (SonicToon.Ticking)
                        {
                            break;
                        }
                    }
                }
                canvas.Translate(ScreenOffset.X, ScreenOffset.Y);
                canvas.FillStyle = "#000000";
                canvas.FillRect(0, 0, WindowLocation.Width * Scale.X, WindowLocation.Height * Scale.Y);

                WindowLocation.X = SonicToon.X * WindowLocation.Width / 2;
                WindowLocation.Y = SonicToon.Y * WindowLocation.Height / 2;

                BigWindowLocation.X = SonicToon.X * BigWindowLocation.Width / 2;
                BigWindowLocation.Y = SonicToon.Y * BigWindowLocation.Height / 2;
                if (Background != null)
                {
                    int wOffset = WindowLocation.X;
                    int bw = Background.Width / Scale.X;
                    int movex = (wOffset / bw) * bw;
                    Background.Draw(canvas, new Point(-WindowLocation.X * Scale.X + movex, -WindowLocation.Y / 4 * Scale.Y),
                                    Scale, wOffset);
                    Background.Draw(canvas,
                                    new Point(-WindowLocation.X * Scale.X + movex + Background.Width,
                                              -WindowLocation.Y / 4 * Scale.Y), Scale, wOffset);
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


            var bounds = new IntersectingRectangle(-32, -32, WindowLocation.Width * Scale.X + 32,
                                                   WindowLocation.Height * Scale.Y + 32, Constants.Intersects);
            if (SonicLevel.Chunks != null && SonicLevel.Chunks.Count > 0)
            {
                if (SonicLevel.PaletteItems[0]!=null)
                {
                    for (int k = 0; k < SonicLevel.PaletteItems[0].Count; k++)
                    {
                        var pal = SonicLevel.PaletteItems[0][k];
                        for (int j = 0; j < pal.TotalLength; j += pal.SkipIndex)
                        {
                            if (DrawTickCount % (pal.TotalLength + pal.SkipIndex) == j)
                            {
                                SonicLevel.palAn[k] = j / pal.SkipIndex;
                            }
                        }

                        for (int m = 0; m < pal.Pieces.Count; m++)
                        {
                            var mj = pal.Pieces[m];
                            SonicLevel.Palette[mj.PaletteIndex][mj.PaletteOffset / 2] =
                                pal.Palette[SonicLevel.palAn[k] * (pal.Pieces.Count * 2) + 0 + (mj.PaletteMultiply)];
                            SonicLevel.Palette[mj.PaletteIndex][mj.PaletteOffset / 2 + 1] =
                                pal.Palette[SonicLevel.palAn[k] * (pal.Pieces.Count * 2) + 1 + (mj.PaletteMultiply)];
                        }
                    }
                }
                int fxP = (WindowLocation.X + 128) / 128;
                int fyP = (WindowLocation.Y + 128) / 128;
                foreach (Point off in offs)
                {
                    int _xP = fxP + off.X;
                    int _yP = fyP + off.Y;
                    int _yPreal = fyP + off.Y;
                    if (_xP < 0 || _xP >= SonicLevel.LevelWidth)
                        continue;

                    _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                    int ind = SonicLevel.ChunkMap[_xP][_yP];
                    TileChunk chunk = SonicLevel.Chunks[ind];
                    TileChunk anni = SonicLevel.Chunks[ind];
                    if (anni != null)
                        anni.AnimatedTick();
                    if (chunk == null)
                        continue;
                    var pos = new Point(_xP * 128 * Scale.X, _yPreal * 128 * Scale.Y);
                    var posj = new Point(pos.X - WindowLocation.X * Scale.X, pos.Y - WindowLocation.Y * Scale.Y);
                    if (!chunk.IsEmpty())
                        chunk.Draw(canvas, posj, Scale, 0, bounds);
                    if (false && CurrentGameState == GameState.Editing)
                    {
                        canvas.StrokeStyle = "#DD0033";
                        canvas.LineWidth = 3;
                        canvas.StrokeRect(posj.X, posj.Y, 128 * Scale.X, 128 * Scale.Y);
                    }
                }
                foreach (var r in SonicLevel.Rings)
                {
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
                foreach (SonicObject o in SonicLevel.Objects)
                {
                    if (o.Dead || BigWindowLocation.Intersects(new Point(o.X, o.Y)))
                    {
                        o.Draw(canvas, (o.X - WindowLocation.X) * Scale.X, (o.Y - WindowLocation.Y) * Scale.Y, Scale,
                               ShowHeightMap);
                    }
                }
                foreach (AnimationInstance ano in AnimationInstances)
                {
                    ano.Draw(canvas, -WindowLocation.X, -WindowLocation.Y, Scale);
                }
                for (int i = ActiveRings.Count - 1; i >= 0; i--)
                {
                    Ring ac = ActiveRings[i];
                    ac.Draw(canvas, new Point(ac.X - WindowLocation.X, ac.Y - WindowLocation.Y), Scale);
                    if (ac.TickCount > 256)
                    {
                        ActiveRings.Remove(ac);
                    }
                }
                if (CurrentGameState == GameState.Playing)
                {
                    SonicToon.Draw(canvas, Scale);
                    if (WindowLocation.X < 0) WindowLocation.X = 0;
                    if (WindowLocation.Y < 0) WindowLocation.Y = 0;
                    if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
                        WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
                    //if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
                    //    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
                }

                foreach (Point off in offs)
                {
                    int _xP = fxP + off.X;
                    int _yP = fyP + off.Y;
                    int _yPreal = fyP + off.Y;
                    if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
                    _yP = Help.Mod(_yP, SonicLevel.LevelHeight);
                    TileChunk chunk = SonicLevel.Chunks[SonicLevel.ChunkMap[_xP][_yP]];
                    if (chunk == null)
                        continue;
                    var pos = new Point(_xP * 128 * Scale.X, _yPreal * 128 * Scale.Y);
                    var posj = new Point(pos.X - WindowLocation.X * Scale.X, pos.Y - WindowLocation.Y * Scale.Y);
                    if (!chunk.IsEmpty() && !chunk.OnlyBackground())
                    {
                        chunk.Draw(canvas, posj, Scale, 1, bounds);
                    }
                    if (false && CurrentGameState == GameState.Editing)
                    {
                        canvas.StrokeStyle = "#DD0033";
                        canvas.LineWidth = 3;
                        canvas.StrokeRect(posj.X, posj.Y, 128 * Scale.X, 128 * Scale.Y);
                    }

                    if (ShowHeightMap)
                    {
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
                    if (CurrentGameState == GameState.Editing)
                    {
                        canvas.StrokeStyle = "#DD0033";
                        canvas.LineWidth = 3;
                        canvas.StrokeRect(posj.X, posj.Y, 128 * Scale.X, 128 * Scale.Y);
                    }
                }
            }

            canvas.Restore();
            if (CurrentGameState == GameState.Playing)
            {
                SonicToon.DrawUI(canvas, new Point(ScreenOffset.X, ScreenOffset.Y), Scale);
            }
        }

        public void Load(string lvl, CanvasElement mainCanvas)
        {
            Loading = true;
            Status = "Decoding";
            var sonicLevel = jQuery.ParseJsonData<SonicLevelData>(Help.DecodeString(lvl));
            Status = "Determining Level Information";

            if (SonicLevel.Chunks == null)
                SonicLevel.Chunks = new List<TileChunk>();
            if (SonicLevel.Blocks == null)
                SonicLevel.Blocks = new List<TilePiece>();
            if (SonicLevel.Tiles == null)
                SonicLevel.Tiles = new List<Tile>();
            if (SonicLevel.Rings == null)
                SonicLevel.Rings = new JsDictionary<string, Ring>();

            SonicLevel.LevelWidth = sonicLevel.ForegroundWidth;
            SonicLevel.LevelHeight = sonicLevel.ForegroundHeight;
            var mf = decodeNumeric(sonicLevel.Foreground);

            sonicLevel.ChunkMap = new List<List<int>>();
            for (int q = 0; q < sonicLevel.ForegroundWidth; q++)
            {
                sonicLevel.ChunkMap[q] = new List<int>();
                for (int r = 0; r < sonicLevel.ForegroundHeight; r++)
                {
                    sonicLevel.ChunkMap[q][r] = mf[q + r*sonicLevel.ForegroundWidth];

                }
            }
            sonicLevel.BGChunkMap = new List<List<int>>();
            for (int q = 0; q < sonicLevel.BackgroundWidth; q++)
            {
                sonicLevel.BGChunkMap[q] = new List<int>();
                for (int r = 0; r < sonicLevel.BackgroundHeight; r++)
                {
                    sonicLevel.BGChunkMap[q][r] = mf[q + r*sonicLevel.BackgroundWidth];

                }
            }
            /*
        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
            o = sonicManager.SonicLevel.Objects[l];
            _H.ObjectParse(o, (function (r) {
                return function (rq) {
                    sonicManager.SonicLevel.Objects[r] = rq;
                };
            })(l));
        }*/
            for (int l = 0; l < sonicLevel.Objects.Length; l++)
            {
                SonicLevel.Objects[l] = new SonicObject(sonicLevel.Objects[l]);
                SonicLevel.Objects[l].Index = l;
            }

            var objectKeys = new JsDictionary<string, object>();
            /*
        var objectKeys = [];
        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
            o = sonicManager.SonicLevel.Objects[l].key;

            if (JSLINQ(objectKeys).Count(function (p) { return p == o; }) == 0) {
                objectKeys.push(o);
            }
        }



        OurSonic.SonicLevels.getObjects(objectKeys, function (objects) {
            window.CachedObjects = [];
            for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
                o = sonicManager.SonicLevel.Objects[l].key;
                if (window.CachedObjects[o]) {
                    sonicManager.SonicLevel.Objects[l].setObjectData(window.CachedObjects[o]);
                    continue;
                }
                var d = JSLINQ(objects).First(function (p) { return p.key == o; });
                if (!d) {
                    sonicManager.SonicLevel.Objects[l].setObjectData(new LevelObject(o));
                    continue;
                }

                var dr = _H.extend(new LevelObject(""), jQuery.parseJSON(d.value));
                dr = sonicManager.objectManager.extendObject(dr);

                for (var n = 0; n < dr.assets.length; n++) {
                    for (var s = 0; s < dr.assets[n].frames.length; s++) {
                        dr.assets[n].frames[s].hurtSonicMap.length = dr.assets[n].frames[s].width;
                        dr.assets[n].frames[s].collisionMap.length = dr.assets[n].frames[s].width;
                        for (var t = 0; t < dr.assets[n].frames[s].hurtSonicMap.length; t++) {
                            dr.assets[n].frames[s].hurtSonicMap[t].length = dr.assets[n].frames[s].height;
                            dr.assets[n].frames[s].collisionMap[t].length = dr.assets[n].frames[s].height;

                        }
                    }
                }

                window.CachedObjects[o] = dr;
                sonicManager.SonicLevel.Objects[l].setObjectData(dr);

            }

        });

*/

            /*    var jm = [];
                    jm[0] = [];
                    jm[1] = [];
                    jm[2] = [];
                    jm[3] = [];
                    for (var qc = 0; qc < sonicManager.SonicLevel.Palette.length;qc++ ) {
                    jm[_H.floor(qc / 16)][qc % 16] = sonicManager.SonicLevel.Palette[qc];
                    }
                    sonicManager.SonicLevel.Palette=jm;*/

            SonicLevel.CurPaletteIndex = 0;
            SonicLevel.palAn = new List<int>();
            SonicLevel.CurHeightMap = true;
            for (int j = 0; j < sonicLevel.Tiles.Count; j++)
            {
                var fc = sonicLevel.Tiles[j];
                var tiles = decodeNumeric(fc);
                var mj = new List<int>();

                for (int i = 0; i < tiles.Length; i++)
                {
                   // var value = sonicLevel.Tiles[j][i];
                   // mj.Add(value >> 4);
                  //  mj.Add(value & 0xF);
                }
                var mfc = new List<List<int>>();
                for (int o = 0; o < 8; o++)
                {
                    mfc[o] = new List<int>();
                }
                for (int n = 0; n < mf.Length; n++)
                {
                    mfc[n%8][n/8] = mf[n];
                }

                SonicLevel.Tiles[j] = new Tile(mfc);
                SonicLevel.Tiles[j].Index = j;


            }
var acs = SonicLevel.AnimatedChunks = new List<TileChunk>();
            /*
                    
                    if (sonicManager.SonicLevel.AnimatedFiles) {
                        for (jc = 0; jc < sonicManager.SonicLevel.AnimatedFiles.length; jc++) {
                            var fcc = sonicManager.SonicLevel.AnimatedFiles[jc];
                            for (j = 0; j < fcc.length; j++) {
                                fc = fcc[j];
                                fcc[j] = decodeNumeric(fc);

                                mj = [];
                                for (l = 0; l < fcc[j].length; l++) {
                                    value = fcc[j][l];
                                    mj.push(value >> 4);
                                    mj.push(value & 0xF);
                                }
                                fcc[j] = { colors: mj };
                                td = fcc[j];
                                mf = [];
                                for (o = 0; o < 8; o++) {
                                    mf[o] = [];
                                }
                                for (n = 0; n < td.colors.length; n++) {
                                    mf[n % 8][_H.floor(n / 8)] = td.colors[n];
                                }
                                td.colors = mf;
                                td.index = "A" + j + "_" + jc;
                                fcc[j] = _H.extend(new Tile(), td);

                            }
                        }
                    }
             */

            for (int j = 0; j < sonicLevel.Blocks.Count; j++)
            {
                var fc = sonicLevel.Blocks[j];
                var mj = new TilePiece();
                mj.Index = j;
                mj.Tiles = new List<Tile>();
                
                for (int p = 0; p < fc.Count; p++)
                {
                    mj.Tiles.Add(fc[p]);
                }

                SonicLevel.Blocks[j] = mj;

            }

            SonicLevel.Angles = decodeNumeric(sonicLevel.Angles);

            SonicLevel.CollisionIndexes1 = decodeNumeric(sonicLevel.CollisionIndexes1);
            SonicLevel.CollisionIndexes2 = decodeNumeric(sonicLevel.CollisionIndexes2);

            for (int i = 0; i < sonicLevel.HeightMaps.Count; i++)
            {
                var b1 = true;
                var b2 = true;
                for (int m = 0; m < sonicLevel.HeightMaps[i].Count; m++)
                {
                    if (b1 && sonicLevel.HeightMaps[i][m] != 0)
                    {
                        b1 = false;
                    }

                    if (b2 && sonicLevel.HeightMaps[i][m] != 16)
                    {
                        b2 = false;
                    }
                }
                if (b1)
                {
                    SonicLevel.HeightMaps[i] = 0;

                }
                else if (b2)
                {
                    SonicLevel.HeightMaps[i] = 1;
                }
                else
                {
                    SonicLevel.HeightMaps[i] = new HeightMask(sonicLevel.HeightMaps[i]);
                    
                }

            }

            for (int j = 0; j < sonicLevel.Chunks.Count; j++)
            {
                var fc = sonicLevel.Chunks[j];
                var mj = new TileChunk();
                mj.Index = j;
                mj.TilePieces=new TilePiece[8][];
                for (int i = 0; i < 8; i++)
                {
                    mj.TilePieces[i] = new TilePiece[8];
                }
                for (int p = 0; p < fc.Length; p++)
                {
                    mj.TilePieces[p % 8][p / 8] = fc.Me()[p];
                }
                SonicLevel.Chunks[j] = mj;
                mj.Animated = new List<Animation>();

                for (int ic = 0; ic < mj.TilePieces.Length; ic++)
                {
                    for (int jc = 0; jc < mj.TilePieces[ic].Length; jc++)
                    {
                        var r = mj.TilePieces[ic][jc];
                        var pm = SonicLevel.Blocks[r.Block];
                        if (pm != null)
                        {
                            for (int ci = 0; ci < pm.Tiles.Count; ci++)
                            {
                                var mjc = pm.Tiles[ci];
                                if (SonicLevel.Tiles[mjc._Tile]!=null)
                                {
                                    var fa = containsAnimatedTile(mjc._Tile);
                                    if (fa != null)
                                    {
                                        mj.Animated[jc*8 + ic] = fa;
                                        acs[j] = mj;

                                    }
                                }
                            }
                        }
                    }
                }
                


            /*for (je = 0; je < fc.angleMap1.length; je++) {
            for (jc = 0; jc < fc.angleMap1[je].length; jc++) {
            fc.angleMap1[je][jc] = parseInt(fc.angleMap1[je][jc], 16);
            }
            }
            for (je = 0; je < fc.angleMap2.length; je++) {
            for (jc = 0; jc < fc.angleMap2[je].length; jc++) {
            fc.angleMap2[je][jc] = parseInt(fc.angleMap2[je][jc], 16);
            }
            }


            for (je = 0; je < fc.heightMap1.length; je++) {
            for (jc = 0; jc < fc.heightMap1[je].length; jc++) {
            fc.heightMap1[je][jc] = sonicManager.SonicLevel.HeightMaps[fc.heightMap1[je][jc]];
            }
            }

            for (je = 0; je < fc.heightMap2.length; je++) {
            for (jc = 0; jc < fc.heightMap2[je].length; jc++) {
            fc.heightMap2[je][jc] = sonicManager.SonicLevel.HeightMaps[fc.heightMap2[je][jc]];
            }
            }*/

            }
            

        if (SonicLevel.PaletteItems[0]!=null) {
            for (var k = 0; k < sonicLevel.PaletteItems[0].Count; k++) {
                var pal = sonicLevel.PaletteItems[0][k];
                SonicLevel.PaletteItems[0][k] = pal;
                pal.Palette = (List<string>)Script.Eval(pal.Palette.Me());

                //below this is bad
                if (pal.TotalLength == 0)
                    pal.TotalLength = pal.Palette.Count;
                if (pal.SkipIndex == 0)
                    pal.SkipIndex = pal.Palette.Count / 8;
                //^
            }
        }


            SonicLevel = sonicLevel.Translate();


            /* 

              
        for (var kd = 0; kd < sonicManager.SonicLevel.Blocks.length; kd++) {
            var dj = sonicManager.SonicLevel.Blocks[kd];
            dj.animatedFrames = [];

            for (var i = 0; i < dj.tiles.length; i++) {
                var mj = dj.tiles[i];
                if (sonicManager.SonicLevel.Tiles[mj.Tile]) {

                    var pl = JSLINQ(sonicManager.SonicLevel.Tiles[mj.Tile].getAllPaletteIndexes());


                    if (sonicManager.SonicLevel.PaletteItems[0]) {
                        for (var k = 0; k < sonicManager.SonicLevel.PaletteItems[0].length; k++) {
                            var pal = sonicManager.SonicLevel.PaletteItems[0][k];


                            for (var m = 0; m < pal.Pieces.length; m++) {
                                var mje = pal.Pieces[m];

                                if (mj.Palette == mje.PaletteIndex) {
                                    if (pl.Any(function (J) {
                                        return J == mje.PaletteOffset / 2 || J == mje.PaletteOffset / 2 + 1;
                                    })) {
                                        dj.animatedFrames.push(k);
                                    }
                                }
                            }

                        }

                    }
                }

            }
        }


        var finished = function () {
            sonicManager.uiManager.levelManagerArea.visible = true;
            sonicManager.loading = false;
            sonicManager.uiManager.modifyTC.tileChunk = sonicManager.SonicLevel.Chunks[0];
            sonicManager.uiManager.modifyTilePieceArea.tilePiece = sonicManager.uiManager.modifyTP.tilePiece = sonicManager.SonicLevel.Blocks[0];

        };

        //        var inds = sonicManager.inds = { r:0,t: 0, tp: 0, tc: 0, total: (sonicManager.SonicLevel.Chunks.length * 2 + sonicManager.SonicLevel.Blocks.length * 5 + sonicManager.SonicLevel.Tiles.length), done: false };

        sonicManager.CACHING = true;
        sonicManager.preLoadSprites(scale, function () {
            //          inds.r = 1;
            sonicManager.CACHING = false;
            finished();

            sonicManager.uiManager.updateTitle("Level Loaded");
            sonicManager.forceResize();


            var dl = _H.getQueryString();
            if (dl["run"]) {
                setTimeout(sonicManager.uiManager.runSonic, 1000);
            }

        }, sonicManager.uiManager.updateTitle);


        /*
        var scal = scale;
        for (j = 0; j < sonicManager.SonicLevel.Tiles.length; j++) {
        fc = sonicManager.SonicLevel.Tiles[j];
        fc.cacheImage(mainCanvas, scal, function (j) {
        inds.t++;
        var done1 = function (c) {
        inds.tp++;
        if (inds.tp == sonicManager.SonicLevel.Blocks.length * 5) {

        var done2 = function (c2) {
        inds.tc++;

        finished();
        };

        for (j = 0; j < sonicManager.SonicLevel.Chunks.length; j++) {
        fc = sonicManager.SonicLevel.Chunks[j];
        fc.cacheImage(mainCanvas, scal, 1, done2);
        fc.cacheImage(mainCanvas, scal, 2, done2);
        }
        }
        };
        if (inds.t == sonicManager.SonicLevel.Tiles.length) {
        for (j = 0; j < sonicManager.SonicLevel.Blocks.length; j++) {
        fc = sonicManager.SonicLevel.Blocks[j];
        fc.cacheImage(mainCanvas, scal, 0, done1);
        fc.cacheImage(mainCanvas, scal, 1, done1);
        fc.cacheImage(mainCanvas, scal, 2, done1);
        fc.cacheImage(mainCanvas, scal, 3, done1);
        fc.cacheImage(mainCanvas, scal, 4, done1);
        }
        }
        });
        }#1#

*/
        }

        private Animation containsAnimatedTile(int tile)
        {
            return null;
        }

        private static string[] base64chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".Split("");

        private static JsDictionary<string, int> base64Inv;

        static SonicManager()
        {
            base64Inv = new JsDictionary<string, int>();
            for (var i = 0; i < base64chars.Length; i++)
            {
                base64Inv[base64chars[i]] = i;
            }
        }


        private int[] decodeNumeric(string s)
        {
            s = s.Replace(new Regex("[^" + base64chars.Join("") + "=]", "g"), "");
            var p = s.CharAt(s.Length - 1) == "=" ? (s.CharAt(s.Length - 2) == "=" ? "AA" : "A") : "";
            var r = new List<int>();
            s = s.Substr(0, s.Length - p.Length) + p;
            for (int c = 0; c < s.Length; c += 4)
            {
                var n = (base64Inv[s.CharAt(c)] << 18) + (base64Inv[s.CharAt(c + 1)] << 12) +
                        (base64Inv[s.CharAt(c + 2)] << 6) + base64Inv[s.CharAt(c + 3)];

                r.Add((n >> 16) & 255);
                r.Add((n >> 8) & 255);
                r.Add(n & 255);
            }
            return (int[])r.Slice(0, r.Count - 1);

        }

        protected string Status
        {
            get { return myStatus; }
            set
            {
                UIManager.UpdateTitle(value);
                myStatus = value;
            }
        }


    }
}