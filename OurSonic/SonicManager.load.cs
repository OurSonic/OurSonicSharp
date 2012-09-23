using System;
using System.Collections.Generic;
using System.Linq;
using NodeJSLibrary;
using OurSonic.Level;
using OurSonic.Tiles;
using OurSonicModels;
using jQueryApi;
namespace OurSonic
{
    public partial class SonicManager
    {
        public void loadObjects(dynamic[] objects)
        {
            for (int l = 0; l < SonicLevel.Objects.Count; l++) {
                var o = SonicLevel.Objects[l].Key;
                if()
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
        public void Load(string lvl)
        {
            Loading = true;
            Status = "Decoding";
            var sonicLevel = jQuery.ParseJsonData<SLData>(Help.DecodeString(lvl));
            Status = "Determining Level Information";

            if (SonicLevel.Chunks.Falsey())
                SonicLevel.Chunks = new List<TileChunk>();
            if (SonicLevel.Blocks.Falsey())
                SonicLevel.Blocks = new List<TilePiece>();
            if (SonicLevel.Tiles.Falsey())
                SonicLevel.Tiles = new List<Tile>();
            if (SonicLevel.Rings.Falsey())
                SonicLevel.Rings = new List<Ring>();

            for (var n = 0; n < sonicLevel.Rings.Length; n++) {
                SonicLevel.Rings[n] = new Ring(true);

                SonicLevel.Rings[n].X = sonicLevel.Rings[n].X;
                SonicLevel.Rings[n].Y = sonicLevel.Rings[n].Y;
            }

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

            SonicLevel.Objects = new List<LevelObjectInfo>();

            for (int l = 0; l < sonicLevel.Objects.Length; l++) {
                SonicLevel.Objects[l] = new LevelObjectInfo(sonicLevel.Objects[l]);
                SonicLevel.Objects[l].Index = l;
            }


            var objectKeys = new List<string>();
            for (int l = 0; l < SonicLevel.Objects.Count; l++) {
                var o = SonicLevel.Objects[l].Key;
                if (objectKeys.Count(p => p == o) == 0) {
                    objectKeys.Add(o);
                }

            }        

//TODO: LOAD OBJECTS
            KLOADOBEJCTS
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

            if (sonicLevel.AnimatedFiles.Truthy()) {
                SonicLevel.AnimatedFiles = new Tile[sonicLevel.AnimatedFiles.Length][];
                for (var jc = 0; jc < sonicLevel.AnimatedFiles.Length; jc++) {
                    var fcc = sonicLevel.AnimatedFiles[jc];
                    SonicLevel.AnimatedFiles[jc] = new Tile[fcc.Length];

                    for (int j = 0; j < fcc.Length; j++) {
                        var c = fcc[j];
                        var tiles = c;
                        List<int> mjc = new List<int>();

                        for (int l = 0; l < tiles.Length; l++) {
                            var value = fcc[j][l];
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
                        tile.IsAnimated = true;

                        tile.Index = j * 10000 + jc;
                        SonicLevel.AnimatedFiles[jc][j] = tile;
                    }
                }
            }
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
                                                                          Solid1 = fc[p].Solid1,
                                                                          Solid2 = fc[p].Solid2,
                                                                          XFlip = fc[p].XFlip,
                                                                          YFlip = fc[p].YFlip
                                                                  };
                }

                SonicLevel.Chunks[j] = mj;
                mj.Animated = new JsDictionary<int, Animation>();
                //Help.Debugger();
                for (int tpX = 0; tpX < mj.TilePieces.Length; tpX++) {
                    for (int tpY = 0; tpY < mj.TilePieces[tpX].Length; tpY++) {
                        var r = mj.TilePieces[tpX][tpY];
                        var pm = SonicLevel.Blocks[r.Block];
                        if (pm.Truthy()) {
                            for (int ci = 0; ci < pm.Tiles.Count; ci++) {
                                var mjc = pm.Tiles[ci];
                                if (SonicLevel.Tiles[mjc._Tile].Truthy()) {
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
            }
            SonicLevel.Palette = sonicLevel.Palette;
            SonicLevel.StartPositions = Script.Reinterpret<Point[]>(sonicLevel.StartPositions.Map(a => new Point(a.X, a.Y)));

            SonicLevel.PaletteItems = new List<List<PaletteItem>>();
            if (sonicLevel.PaletteItems[0].Truthy()) {
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

            for (int kd = 0; kd < SonicLevel.Blocks.Count; kd++) {
                var dj = SonicLevel.Blocks[kd];
                dj.AnimatedFrames = new int[0];
                for (int index = 0; index < dj.Tiles.Count; index++) {
                    var mj = dj.Tiles[index];
                    if (SonicLevel.Tiles[mj._Tile].Truthy()) {
                        var pl = SonicLevel.Tiles[mj._Tile].GetAllPaletteIndexes();
                        if (SonicLevel.PaletteItems[0].Truthy()) {
                            for (int k = 0; k < SonicLevel.PaletteItems[0].Count; k++) {
                                var pal = SonicLevel.PaletteItems[0][k];
                                foreach (var mjce in pal.Pieces) {
                                    PaletteItemPieces mje1 = mjce;
                                    if (mj.Palette == mje1.PaletteIndex) {
                                        if (pl.Any(j => j == mje1.PaletteOffset / 2 || j == mje1.PaletteOffset / 2 + 1))
                                            dj.AnimatedFrames[dj.AnimatedFrames.Length] = ( k );
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var finished = new Action(() => { Loading = false; });
            PreloadSprites(Scale, () => {
                                      finished();
                                      ForceResize();
                                  }, (s) => { Global.Console.Log("ff " + s); });
            ForceResize();

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

 

*/
        }
    }
}