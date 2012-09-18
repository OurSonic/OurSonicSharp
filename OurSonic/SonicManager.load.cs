using System;
using System.Collections.Generic;
using System.Html;
using OurSonic.Drawing;
using OurSonicModels;
using jQueryApi;
namespace OurSonic
{
    public partial class SonicManager
    {
        public void Load(string lvl, CanvasElement mainCanvas)
        {
            Loading = true;
            Status = "Decoding";
            var sonicLevel = jQuery.ParseJsonData<SLData>(Help.DecodeString(lvl));
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
            SonicLevel.ChunkMap = sonicLevel.Foreground;
            SonicLevel.BGChunkMap = sonicLevel.Background;
            /*
        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
            o = sonicManager.SonicLevel.Objects[l];
            _H.ObjectParse(o, (function (r) {
                return function (rq) {
                    sonicManager.SonicLevel.Objects[r] = rq;
                };
            })(l));
        }*/
            SonicLevel.Objects = new List<SonicObject>();

            for (int l = 0; l < sonicLevel.Objects.Length; l++) {
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
            SonicLevel.Tiles = new List<Tile>();

            for (int j = 0; j < sonicLevel.Tiles.Length; j++) {
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
            SonicLevel.Blocks = new List<TilePiece>();

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

                SonicLevel.Blocks[j] = mj;
            }

            SonicLevel.Angles = sonicLevel.Angles;
            SonicLevel.AnimatedFiles = sonicLevel.AnimatedFiles;
            SonicLevel.Animations =
                    new List<Animation>(
                            sonicLevel.Animations.Map(
                                    a =>
                                    new Animation() {
                                                            AnimationFile = a.AnimationFile,
                                                            AnimationTileIndex = a.AnimationTileIndex,
                                                            AutomatedTiming = a.AutomatedTiming,
                                                            NumberOfTiles = a.NumberOfTiles,
                                                            Frames =
                                                                    (AnimationFrame[])
                                                                    a.Frames.Map(
                                                                            b =>
                                                                            new AnimationFrame()
                                                                            {Ticks = b.Ticks, StartingTileIndex = b.StartingTileIndex}).Slice(0)
                                                    }));
            SonicLevel.CollisionIndexes1 = sonicLevel.CollisionIndexes1;
            SonicLevel.CollisionIndexes2 = sonicLevel.CollisionIndexes2;
            SonicLevel.HeightMaps = new List<HeightMask>();

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
                    SonicLevel.HeightMaps[i] = 0;
                else if (b2)
                    SonicLevel.HeightMaps[i] = 1;
                else
                    SonicLevel.HeightMaps[i] = new HeightMask(sonicLevel.HeightMaps[i]);
            }
            SonicLevel.Chunks = new List<TileChunk>();

            for (int j = 0; j < sonicLevel.Chunks.Length; j++) {
                var fc = sonicLevel.Chunks[j];
                var mj = new TileChunk();
                mj.Index = j;
                mj.TilePieces = new TilePiece[8][];
                for (int i = 0; i < 8; i++) {
                    mj.TilePieces[i] = new TilePiece[8];
                }
                for (int p = 0; p < fc.Length; p++) {
                    mj.TilePieces[p % 8][p / 8] = new TilePiece() {
                                                                          Index = p,
                                                                          Block = fc[p].Block,
                                                                          XFlip = fc[p].XFlip,
                                                                          YFlip = fc[p].YFlip
                                                                  };
                }
                SonicLevel.Chunks[j] = mj;
                mj.Animated = new List<Animation>();

                for (int ic = 0; ic < mj.TilePieces.Length; ic++) {
                    for (int jc = 0; jc < mj.TilePieces[ic].Length; jc++) {
                        var r = mj.TilePieces[ic][jc];
                        var pm = SonicLevel.Blocks[r.Block];
                        if (pm != null) {
                            for (int ci = 0; ci < pm.Tiles.Count; ci++) {
                                var mjc = pm.Tiles[ci];
                                if (SonicLevel.Tiles[mjc._Tile] != null) {
                                    var fa = containsAnimatedTile(mjc._Tile, sonicLevel);
                                    if (fa != null) {
                                        mj.Animated[jc * 8 + ic] = fa;
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
            SonicLevel.Palette = sonicLevel.Palette;

            SonicLevel.PaletteItems = new List<List<PaletteItem>>();
            if (sonicLevel.PaletteItems[0] != null) {
                SonicLevel.PaletteItems[0] = new List<PaletteItem>();

                for (int k = 0; k < sonicLevel.PaletteItems[0].Length; k++) {
                    AnimatedPaletteItem pal = sonicLevel.PaletteItems[0][k];
                    SonicLevel.PaletteItems[0][k] = new PaletteItem() {
                                                                              Palette = (string[]) Script.Eval(pal.Palette),
                                                                              SkipIndex = pal.SkipIndex,
                                                                              TotalLength = pal.TotalLength,
                                                                              Pieces =
                                                                                      pal.Pieces.Map(
                                                                                              a =>
                                                                                              new PaletteItemPieces() {
                                                                                                                              PaletteIndex =
                                                                                                                                      a.PaletteIndex,
                                                                                                                              PaletteMultiply =
                                                                                                                                      a.
                                                                                                                                      PaletteMultiply,
                                                                                                                              PaletteOffset =
                                                                                                                                      a.PaletteOffset
                                                                                                                      })
                                                                      };
                }
            }

/*
            if (SonicLevel.PaletteItems[0] != null)
            {
                for (var k = 0; k < sonicLevel.PaletteItems[0].Count; k++)
                {
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
*/

            /*
                          for (var kd = 0; kd < sonicLevel.Blocks.Count; kd++) {
                        var dj = sonicLevel.Blocks[kd];
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
                    }*/

            //  SonicLevel = sonicLevel.Translate();

            /* 

               

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
    }
}