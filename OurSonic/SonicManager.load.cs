using System;
using System.Collections;
using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Serialization;
using OurSonic.Level;
using OurSonic.Level.Animations;
using OurSonic.Level.Objects;
using OurSonic.Level.Tiles;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;

namespace OurSonic
{
    public partial class SonicManager
    {
        public JsDictionary<string, LevelObject> cachedObjects;
        

        public void loadObjects(KeyValuePair<string, string>[] objects)
        {
            cachedObjects = new JsDictionary<string, LevelObject>();

            foreach (LevelObjectInfo t in SonicLevel.Objects) {
                var o = t.Key;
                if (cachedObjects.ContainsKey(o)) {
                    t.SetObjectData(cachedObjects[o]);
                    continue;
                }
                var d = objects.First(p => p.Key == o);
                if (d.Falsey()) {
                    t.SetObjectData(new LevelObject(o));
                    continue;
                }
                LevelObjectData dat;
                if (d.Value.Length == 0) dat = new LevelObjectData();
                else dat = (LevelObjectData) Json.Parse(d.Value);

                var dr = ObjectManager.ExtendObject(dat);
                cachedObjects[o] = dr;
                t.SetObjectData(dr);
            }

            /* 
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
        }

        public void loadObjects(List<string> objects)
        {
            SonicEngine.Instance.client.Emit("GetObjects", objects);
        }

        public void Load(SLData sonicLevel)
        {
            Loading = true;
            Status = "Decoding";
            Status = "Determining Level Information";

            SonicLevel = new SonicLevel();
            this.TilePaletteAnimationManager.ClearCache();
            for (var n = 0; n < sonicLevel.Rings.Length; n++) {
                SonicLevel.Rings[n] = new Ring(true);

                SonicLevel.Rings[n].X = sonicLevel.Rings[n].X;
                SonicLevel.Rings[n].Y = sonicLevel.Rings[n].Y;
            }

            SonicLevel.LevelWidth = sonicLevel.ForegroundWidth;
            SonicLevel.LevelHeight = sonicLevel.ForegroundHeight;
            SonicLevel.ChunkMap = sonicLevel.Foreground;
            SonicLevel.BGChunkMap = sonicLevel.Background;

            for (int l = 0; l < sonicLevel.Objects.Length; l++) {
                SonicLevel.Objects[l] = new LevelObjectInfo(sonicLevel.Objects[l]);
                SonicLevel.Objects[l].Index = l;
            }

            var objectKeys = new List<string>();

            foreach (LevelObjectInfo t in SonicLevel.Objects)
            {
                var o = t.Key;
                if (objectKeys.All(p => p != o)) objectKeys.Add(o);
            }
            loadObjects(objectKeys);

            for (int j = 0; j < sonicLevel.Tiles.Length; j++)
            {
                var fc = sonicLevel.Tiles[j];
                var tiles = fc;
                List<int> mj = new List<int>();

                for (int i = 0; i < tiles.Length; i++) {
                    var value = sonicLevel.Tiles[j][i];
                    mj.Add(( value >> 4 ));
                    mj.Add(( value & 0xF ));
                }
                var mfc = new int[8][];
                for (int o = 0; o < 8; o++) {
                    mfc[o] = new int[8];
                }
                for (int n = 0; n < mj.Count; n++) {
                    mfc[n % 8][n / 8] = mj[n];
                }

                SonicLevel.Tiles[j] = new Tile(mfc);
                SonicLevel.Tiles[j].Index = j;
            }
            var acs = SonicLevel.AnimatedChunks = new List<TileChunk>();

            if (sonicLevel.AnimatedFiles.Truthy()) {
                SonicLevel.AnimatedTileFiles = new Tile[sonicLevel.AnimatedFiles.Length][];
                for (var animatedFileIndex = 0; animatedFileIndex < sonicLevel.AnimatedFiles.Length; animatedFileIndex++) {
                    var animatedFile = sonicLevel.AnimatedFiles[animatedFileIndex];
                    SonicLevel.AnimatedTileFiles[animatedFileIndex] = new Tile[animatedFile.Length];

                    for (int filePiece = 0; filePiece < animatedFile.Length; filePiece++) {
                        var c = animatedFile[filePiece];
                        var tiles = c;
                        List<int> mjc = new List<int>();

                        for (int l = 0; l < tiles.Length; l++) {
                            var value = animatedFile[filePiece][l];
                            mjc.Add(( value >> 4 ));
                            mjc.Add(( value & 0xF ));
                        }
                        var mfc = new int[8][];
                        for (int o = 0; o < 8; o++) {
                            mfc[o] = new int[8];
                        }
                        for (int n = 0; n < mjc.Count; n++) {
                            mfc[n % 8][n / 8] = mjc[n];
                        }
                        Tile tile = new Tile(mfc);
                        tile.IsTileAnimated = true;

                        tile.Index = filePiece * 10000 + animatedFileIndex;
                        SonicLevel.AnimatedTileFiles[animatedFileIndex][filePiece] = tile;
                    }
                }
            }

            for (int j = 0; j < sonicLevel.Blocks.Length; j++) {
                var fc = sonicLevel.Blocks[j];
                var mj = new TilePiece();
                mj.Index = j;
                mj.Tiles = new List<TileItem>();

                for (int p = 0; p < fc.Length; p++) {
                    mj.Tiles.Add(new TileItem() {
                                                        _Tile = fc[p].Tile,
                                                        Index = p,
                                                        Palette = fc[p].Palette,
                                                        Priority = fc[p].Priority,
                                                        XFlip = fc[p].XFlip,
                                                        YFlip = fc[p].YFlip,
                                                });
                }
                mj.Init();
                SonicLevel.TilePieces[j] = mj;
            }

            SonicLevel.Angles = sonicLevel.Angles;
            SonicLevel.TileAnimations =
                    new List<TileAnimation>(
                            sonicLevel.Animations.Map(
                                    a =>
                                    new TileAnimation() {
                                                            AnimationTileFile = a.AnimationFile,
                                                            AnimationTileIndex = a.AnimationTileIndex,
                                                            AutomatedTiming = a.AutomatedTiming,
                                                            NumberOfTiles = a.NumberOfTiles,
                                                            Frames =
                                                                    (TileAnimationFrame[])
                                                                    a.Frames.Map(
                                                                            b =>
                                                                            new TileAnimationFrame() {Ticks = b.Ticks, StartingTileIndex = b.StartingTileIndex}).Slice(0)
                                                    }));
            SonicLevel.CollisionIndexes1 = sonicLevel.CollisionIndexes1;
            SonicLevel.CollisionIndexes2 = sonicLevel.CollisionIndexes2;

            for (int i = 0; i < sonicLevel.HeightMaps.Length; i++) {
                var b1 = true;
                var b2 = true;
                for (int m = 0; m < sonicLevel.HeightMaps[i].Length; m++) {
                    if (b1 && sonicLevel.HeightMaps[i][m] != 0)
                        b1 = false;

                    if (b2 && sonicLevel.HeightMaps[i][m] != 16)
                        b2 = false;
                }
                if (b1)
                    SonicLevel.HeightMaps[i] = new HeightMap(false);
                else if (b2)
                    SonicLevel.HeightMaps[i] = new HeightMap(true);
                else
                    SonicLevel.HeightMaps[i] = new HeightMap(sonicLevel.HeightMaps[i], i);
            }

            for (int j = 0; j < sonicLevel.Chunks.Length; j++) {
                var fc = sonicLevel.Chunks[j];
                var mj = new TileChunk();
                mj.Index = j;
                mj.TilePieces = new TilePieceInfo[8][];
                for (int i = 0; i < 8; i++) {
                    mj.TilePieces[i] = new TilePieceInfo[8];
                }
                for (int p = 0; p < fc.Length; p++) {
                    mj.TilePieces[p % 8][p / 8] = new TilePieceInfo() {
                                                                              Index = p,
                                                                              Block = fc[p].Block,
                                                                              Solid1 = fc[p].Solid1,
                                                                              Solid2 = fc[p].Solid2,
                                                                              XFlip = fc[p].XFlip,
                                                                              YFlip = fc[p].YFlip
                                                                      };
                }

                SonicLevel.Chunks[j] = mj;
                mj.Animated = new JsDictionary<int, TileAnimation>();
                //Help.Debugger();
                for (int tpX = 0; tpX < mj.TilePieces.Length; tpX++) {
                    for (int tpY = 0; tpY < mj.TilePieces[tpX].Length; tpY++) {
                        var pm = mj.TilePieces[tpX][tpY].GetTilePiece();
                        if (pm != null) {
                            foreach (var mjc in pm.Tiles) {
                                var fa = containsAnimatedTile(mjc._Tile, SonicLevel);
                                if (fa.Truthy()) {
                                    mj.Animated[tpY * 8 + tpX] = fa;
                                    acs[j] = mj;
                                }
                            }
                        }
                    }
                }
            }
            SonicLevel.Palette = sonicLevel.Palette.Map(a => a.Map(paletteToCanvas));
            SonicLevel.StartPositions = sonicLevel.StartPositions.Map(a => new Point(a.X, a.Y)).Array();

            SonicLevel.AnimatedPalettes = new List<PaletteItem>();
            if (sonicLevel.PaletteItems.Length > 0) {

                for (int k = 0; k < sonicLevel.PaletteItems[0].Length; k++) {
                    AnimatedPaletteItem pal = sonicLevel.PaletteItems[0][k];
                    SonicLevel.AnimatedPalettes.Add(new PaletteItem()
                    {
                        Palette = ((string[])Script.Eval(pal.Palette)).Map(paletteToCanvas),
                        SkipIndex = pal.SkipIndex,
                        TotalLength = pal.TotalLength,
                        Pieces =
                                pal.Pieces.Map(a => new PaletteItemPieces()
                                {
                                    PaletteIndex = a.PaletteIndex,
                                    PaletteMultiply = a.PaletteMultiply,
                                    PaletteOffset = a.PaletteOffset
                                })
                    });
                }
            }

            foreach (var dj in SonicLevel.TilePieces) {
                dj.AnimatedPaletteIndexes = new List<int>();
                if (SonicLevel.AnimatedPalettes.Count > 0)
                {
                    foreach (var mj in dj.Tiles) {
                        Tile tile = mj.GetTile();

                        if (tile.Truthy()) {
                            tile.AnimatedPaletteIndexes = new List<int>();
                            var pl = tile.GetAllPaletteIndexes();
                            tile.PaletteIndexesToBeAnimated = new JsDictionary<int, List<int>>();
                            for (int animatedPaletteIndex = 0; animatedPaletteIndex < SonicLevel.AnimatedPalettes.Count; animatedPaletteIndex++) {
                                var pal = SonicLevel.AnimatedPalettes[animatedPaletteIndex];
                                tile.PaletteIndexesToBeAnimated[animatedPaletteIndex] = new List<int>();

                                foreach (var mjce in pal.Pieces)
                                {
                                    PaletteItemPieces mje1 = mjce;
                                    if (mj.Palette == mje1.PaletteIndex) {
                                        if (pl.Any(j => j == mje1.PaletteOffset / 2 || j == mje1.PaletteOffset / 2 + 1)) {
                                            dj.AnimatedPaletteIndexes.Add(animatedPaletteIndex);
                                            tile.AnimatedPaletteIndexes.Add(animatedPaletteIndex);
                                            foreach (var pIndex in pl)
                                            {
                                                if (pIndex == mje1.PaletteOffset/2 || pIndex == mje1.PaletteOffset/2 + 1)
                                                {
                                                    tile.PaletteIndexesToBeAnimated[animatedPaletteIndex].Add(pIndex);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var finished = new Action(() => { Loading = false; });
            PreloadSprites(() => {
                               finished();
                               ForceResize();
                           },
                           (s) => { });
            ForceResize();
            OnLevelLoad(SonicLevel);

            /* 

               

        var finished = function () {
            sonicManager.uiManager.levelManagerArea.visible = true;
            sonicManager.loading = false;
            sonicManager.uiManager.modifyTC.tileChunk = sonicManager.SonicLevel.Chunks[0];
            sonicManager.uiManager.modifyTilePieceArea.tilePiece = sonicManager.uiManager.modifyTP.tilePiece = sonicManager.SonicLevel.TilePieces[0];

        };

        //        var inds = sonicManager.inds = { r:0,t: 0, tp: 0, tc: 0, total: (sonicManager.SonicLevel.Chunks.length * 2 + sonicManager.SonicLevel.TilePieces.length * 5 + sonicManager.SonicLevel.Tiles.length), done: false };

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

 

*/
        }

        private static CanvasElement paletteToCanvas(string b)
        {
            var cn = CanvasInformation.Create(1, 1);
            cn.Context.FillStyle = b;
            cn.Context.FillRect(0, 0, 1, 1);
            return cn.Canvas;
        }
         
    }
}