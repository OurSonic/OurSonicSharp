using System;
using OurSonic.Level;
using OurSonic.Level.Tiles;
using OurSonic.Utility;
namespace OurSonic.UIManager.Areas
{
    public class TileChunkArea
    {
        private ScrollBox chunkPieceList;
        private ScrollBox tilePieceList;

        public TileChunkArea(UIManager uiManager)
        {
            var tileChunkArea = uiManager.UIManagerAreas.TileChunkArea = new UIArea<TileChunk>(null, 700, 500, 390, 390) {Closable = true};
            tileChunkArea.Visible = true;

            uiManager.AddArea(tileChunkArea);
            tileChunkArea.AddControl(new TextArea(30, 25, "Tile Chunks") {Color = "blue"});

            tileChunkArea.AddControl(chunkPieceList = new ScrollBox(30, 70, 96 - 16, 3, 64) {BackColor = "rgb(50,60,127)"});

            TileChunk[] tileChunks = SonicManager.Instance.SonicLevel.Chunks.Array();
            for (int index = 0; index < tileChunks.Length; index++) {
                var tileChunk = tileChunks[index];
                ImageButton<TileChunk> chunkButton = new ImageButton<TileChunk>(tileChunk, 0, 0, 0, 0);
                chunkButton.OnDraw = (cnv, x, y) => {
                                         chunkButton.Data.DrawUI(cnv, new Point(x, y), new DoublePoint(0.5d, 0.5d), 0);
                                         chunkButton.Data.DrawUI(cnv, new Point(x, y), new DoublePoint(0.5d, 0.5d), 1);
                                     };
                chunkButton.Font = UIManager.SmallTextFont;
                chunkButton.Text = "Chunk #" + index;
                chunkButton.Click = (e) => { tileChunkArea.Data = tileChunk; };
                chunkPieceList.AddControl(chunkButton);
            }

            Image image = new Image(125, 70, 256, 256);
            int areaDrawScale = 2;
            image.OnDraw += (context, x, y) => {
                                if (tileChunkArea.Data == null) return;
                                tileChunkArea.Data.DrawUI(context, new Point(x, y), new Point(areaDrawScale, areaDrawScale), 0);
                                tileChunkArea.Data.DrawUI(context, new Point(x, y), new Point(areaDrawScale, areaDrawScale), 1);
                            };
            image.Click += (e) => {
                               if (tileChunkArea.Data == null) return;
                               var tilePiece = tileChunkArea.Data.GetBlockAt(e.X / areaDrawScale, e.Y / areaDrawScale);

                               uiManager.UIManagerAreas.TilePieceArea.Visible = true;
                               uiManager.UIManagerAreas.TilePieceArea.Data = tilePiece;
                               tilePieceList.ScrollIndex = Math.Max(uiManager.sonicManager.SonicLevel.TilePieces.IndexOf(tilePiece) - 1, 0);
                           };
            tileChunkArea.AddControl(image);

            buildTilePiece(uiManager);

            /*
                        var table=tileChunkArea.AddControl(new Table(10, 40, 350, 280));
                        var row = table.AddRow(new TableRow(50.Percent()));
                        var cell = row.AddCell(new TableCell(50.Percent(), 50.Percent()));
                        cell.AddControl(new Button(0, 0, 0, 0, "Text"));
                        cell = row.AddCell(new TableCell(50.Percent(), 50.Percent()));
                        cell.AddControl(new Button(0, 0, 0, 0, "Text1")); 



                        row = table.AddRow(new TableRow(100));
                        cell = row.AddCell(new TableCell(100, 100));
                        cell.AddControl(new Button(0, 0, 100, 100, "Text"));
                        cell = row.AddCell(new TableCell(100, 100){FullSize=false});
                        cell.AddControl(new Button(0, 0, 100, 50, "Text1"));
                        cell.AddControl(new Button(0, 50, 100, 50, "Text2"));*/
        }

        private void buildTilePiece(UIManager uiManager)
        {
            var tilePieceArea = uiManager.UIManagerAreas.TilePieceArea = new UIArea<TilePiece>(null, 1100, 400, 390, 390) {Closable = true};
            tilePieceArea.Visible = false;

            uiManager.AddArea(tilePieceArea);
            tilePieceArea.AddControl(new TextArea(30, 25, "Tile Pieces") {Color = "blue"});

            bool showHeightMap = false;
            tilePieceArea.AddControl(new Button(100, 50, 125, 25, (Func<string>) ( () => showHeightMap ? "Hide Height Map" : "Show Height Map" )) {
                                                                                                                                                         Click = (e) => {
                                                                                                                                                                     if (tilePieceArea.Data == null) return;
                                                                                                                                                                     showHeightMap = !showHeightMap;
                                                                                                                                                                 }
                                                                                                                                                 });

            tilePieceList = new ScrollBox(10, 35, 96 - 16, 4, 64) {BackColor = "rgb(50,60,127)"};
            tilePieceArea.AddControl(tilePieceList);

            var tilePieces = SonicManager.Instance.SonicLevel.TilePieces.Array();
            for (int index = 0; index < tilePieces.Length; index++) {
                var tilePiece = tilePieces[index];
                ImageButton<TilePiece> tilePieceButton = new ImageButton<TilePiece>(tilePiece, 0, 0, 0, 0);
                tilePieceButton.OnDraw = (cnv, x, y) => {
                                             cnv.Save();
                                             cnv.Translate(x, y);
                                             cnv.Scale(4, 4);
                                             tilePieceButton.Data.Draw(cnv, new Point(0, 0), 0, false, false, 0);
                                             tilePieceButton.Data.Draw(cnv, new Point(0, 0), 1, false, false, 0);

                                             if (showHeightMap) {
                                                 HeightMap hmap;
                                                 if (SonicManager.Instance.SonicLevel.CurHeightMap)
                                                     hmap = tilePiece.GetLayer1HeightMaps();
                                                 else
                                                     hmap = tilePiece.GetLayer2HeightMaps();

                                                 hmap.Draw(cnv, new Point(0, 0), false, false, 1, 0);
                                             }

                                             cnv.Restore();
                                         };
                tilePieceButton.Font = UIManager.SmallTextFont;
                tilePieceButton.Text = "Tile Piece #" + index;
                tilePieceButton.Click = (e) => { tilePieceArea.Data = tilePiece; };
                tilePieceList.AddControl(tilePieceButton);
            }

            Image image = new Image(105, 120, 256, 256);
            image.OnDraw += (context, x, y) => {
                                if (tilePieceArea.Data == null) return;
                                context.Save();
                                context.Translate(x, y);
                                context.Scale(16, 16);
                                tilePieceArea.Data.Draw(context, new Point(0, 0), 0, false, false, 0);
                                tilePieceArea.Data.Draw(context, new Point(0, 0), 1, false, false, 0);
                                context.Restore();
                            };

            tilePieceArea.AddControl(image);
        }
    }
}