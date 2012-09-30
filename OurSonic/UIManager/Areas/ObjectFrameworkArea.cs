using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;
using OurSonic.Level;
using jQueryApi;
namespace OurSonic.UIManager.Areas
{
    public class ObjectFrameworkArea
    {
        [IntrinsicProperty]
        public ObjectFrameworkData Data { get; set; }
        public ObjectFrameworkArea(UIManager manager)
        {
            Data = new ObjectFrameworkData();
            Data.ObjectFramework = new LevelObject("Foo");

            var size = 40 * 4;

            var objectFrameworkArea = new UIArea(540, 75, 850, 690) { Closable = true };
            manager.AddArea(objectFrameworkArea);

            objectFrameworkArea.AddControl(new TextArea(30, 25, "Object Framework") { Color = "blue" });

            objectFrameworkArea.AddControl(new TextArea(16, 60, "Assets") { Color = "black" });

            objectFrameworkArea.AddControl(new Button(160, 38, 140, 25, "Add Asset")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.ObjectFramework.Assets.Add(
                            new LevelObjectAsset("Asset " +
                                                 (Data.ObjectFramework.Assets.Count +
                                                   1)));
                    Populate(Data.ObjectFramework);

                }
            });

            objectFrameworkArea.AddControl(
                    Data.Assets = new ScrollBox(30, 60 + 10) { ItemHeight = 25, VisibleItems = 4, ItemWidth = 250, BackColor = "rgb(50, 60, 127)", });




            objectFrameworkArea.AddControl(new TextArea(16, 60 + (size * 1), "Pieces") { Color = "black" });

            objectFrameworkArea.AddControl(new Button(160, 38 + (size * 1), 140, 25, "Add Piece")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {

                    Data.ObjectFramework.Pieces.Add(
                            new LevelObjectPiece("Piece " +
                                                 (Data.ObjectFramework.
                                                           Pieces.Count +
                                                   1)));
                    Populate(Data.ObjectFramework);

                }
            });

            objectFrameworkArea.AddControl(
                    Data.Pieces =
                    new ScrollBox(30, 60 + 10 + (size * 1)) { ItemHeight = 25, VisibleItems = 4, ItemWidth = 250, BackColor = "rgb(50, 60, 127)", });



            objectFrameworkArea.AddControl(new TextArea(16, 60 + (size * 2), "Piece Layouts") { Color = "black" });

            objectFrameworkArea.AddControl(new Button(160, 38 + (size * 2), 140, 25, "Add Piece Layout")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.ObjectFramework.PieceLayouts.Add(
                            new LevelObjectPieceLayout("Piece Layout " +
                                                       (Data.
                                                                 ObjectFramework
                                                                 .
                                                                 PieceLayouts
                                                                 .Count +
                                                         1)));
                    Populate(Data.ObjectFramework);
                }
            });

            objectFrameworkArea.AddControl(
                    Data.PieceLayouts =
                    new ScrollBox(30, 60 + 10 + (size * 2)) { ItemHeight = 25, VisibleItems = 4, ItemWidth = 250, BackColor = "rgb(50, 60, 127)", });



            objectFrameworkArea.AddControl(new TextArea(16, 60 + (size * 3), "Projectiles") { Color = "black" });

            objectFrameworkArea.AddControl(new Button(160, 38 + (size * 3), 140, 25, "Add Projectile")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.ObjectFramework.Projectiles.Add(
                            new LevelObjectProjectile(
                                    "Piece Projectile " +
                                    (Data.ObjectFramework.Projectiles.
                                              Count + 1)));
                    Populate(Data.ObjectFramework);
                }
            });

            objectFrameworkArea.AddControl(
                    Data.Projectiles =
                    new ScrollBox(30, 60 + 10 + (size * 3)) { ItemHeight = 25, VisibleItems = 4, ItemWidth = 250, BackColor = "rgb(50, 60, 127)", });

            objectFrameworkArea.AddControl(new TextArea(320, 80 - 20, "Key: ") { Font = UIManager.SmallTextFont, Color = "black" });
            objectFrameworkArea.AddControl(
                    Data.Key =
                    new TextBox(370, 60 - 20, 150, 25, "") { Color = "rgb(50,150,50)", Click = () => { Data.ObjectFramework.Key = Data.Key.Text; } });

            objectFrameworkArea.AddControl(new TextArea(320 + 205, 80 - 24, "Description: ") { Font = UIManager.SmallTextFont, Color = "black" });
            objectFrameworkArea.AddControl(
                    Data.Description =
                    new TextBox(370 + 240, 60 - 20, 220, 25, "") { Color = "rgb(50,150,50)", Click = () => { Data.ObjectFramework.Description = Data.Description.Text; } });




            objectFrameworkArea.AddControl(Data.b1 = new Button(320, 95 - 20, 250, 25, "onInit")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.b2.Toggled = false;
                    Data.b3.Toggled = false;
                    Data.b4.Toggled = false;
                    if (Data.b1.Toggled)
                    {
                        addCodeWindow(Data.ObjectFramework.InitScript, () =>
                        {
                            Data.ObjectFramework.InitScript = Data.Editor.GetValue();
                        });
                    }
                    else
                    {
                        ClearMainArea();
                    }
                }
            });
            Data.b1.Toggle = true;

            objectFrameworkArea.AddControl(Data.b2 = new Button(580, 95 - 20, 250, 25, "onTick")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.b1.Toggled = false;
                    Data.b3.Toggled = false;
                    Data.b4.Toggled = false;
                    if (Data.b2.Toggled)
                    {
                        addCodeWindow(Data.ObjectFramework.TickScript, () =>
                        {
                            Data.ObjectFramework.TickScript = Data.Editor.GetValue();
                        });
                    }
                    else
                    {
                        ClearMainArea();
                    }
                }
            });
            Data.b2.Toggle = true;


            objectFrameworkArea.AddControl(Data.b3 = new Button(320, 130 - 20, 250, 25, "onCollide")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.b1.Toggled = false;
                    Data.b2.Toggled = false;
                    Data.b4.Toggled = false;
                    if (Data.b3.Toggled)
                    {
                        addCodeWindow(Data.ObjectFramework.CollideScript, () =>
                        {
                            Data.ObjectFramework.CollideScript = Data.Editor.GetValue();
                        });
                    }
                    else
                    {
                        ClearMainArea();
                    }
                }
            });
            Data.b3.Toggle = true;


            objectFrameworkArea.AddControl(Data.b4 = new Button(580, 130 - 20, 250, 25, "onHurtSonic")
            {

                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    Data.b1.Toggled = false;
                    Data.b2.Toggled = false;
                    Data.b3.Toggled = false;
                    if (Data.b4.Toggled)
                    {
                        addCodeWindow(Data.ObjectFramework.HurtScript, () =>
                        {
                            Data.ObjectFramework.HurtScript = Data.Editor.GetValue();
                        });
                    }
                    else
                    {
                        ClearMainArea();
                    }
                }
            });
            Data.b4.Toggle = true;


            objectFrameworkArea.AddControl(Data.MainPanel = new Panel<MainPanelData>(new MainPanelData(), 320, 150, 510, 510));
            //    setTimeout("        var sc = document.getElementById("picFieldUploader");sc.style.visibility = "hidden";sc.style.position="absolute";", 300);


        }


        private void addCodeWindow(string value, Action change)
        {

            ClearMainArea();
            Data.MainPanel.AddControl(new HtmlBox(15, -35)
                                      {
                                          Width = 485,
                                          Height = 485,
                                          Init = () =>
                                          {
                                              jQuery.Document.Append(
                                                      @"<textarea id=""code"" name=""code"" style=""position:absolute;width:485px;height:485px;""></textarea>");
                                              Data.CodeMirror = (TextAreaElement)Document.GetElementById("code");
                                              Data.CodeMirror.Value = value;
                                              CodeMirrorLine hlLine = null;

                                              var codeMirrorOptions = new CodeMirrorOptions()
                                              {
                                                  LineNumbers = true,
                                                  MatchBrackets = true,
                                                  OnChange = change,
                                                  //extraKeys= new { "Ctrl-Space"= (cm)=> { CodeMirror.simpleHint(cm, CodeMirror.javascriptHint); } },
                                                  OnCursorActivity = (e) =>
                                                  {
                                                      Data.Editor.SetLineClass(hlLine, null);
                                                      hlLine = Data.Editor.SetLineClass(Data.Editor.GetCursor().Line, "activeline");
                                                  },
                                                  OnFocus =
                                                          (editor) =>
                                                          {
                                                              SonicManager.Instance.TypingInEditor = true;
                                                          },
                                                  OnBlur =
                                                          (editor) =>
                                                          {
                                                              SonicManager.Instance.TypingInEditor =
                                                                      false;
                                                          }
                                              };
                                              Data.Editor = CodeMirror.FromTextArea(Data.CodeMirror, codeMirrorOptions);
                                              Data.Editor.SetOption("theme", "night");

                                              hlLine = Data.Editor.SetLineClass(0, "activeline");

                                              var scroller = Data.Editor.GetScrollerElement();
                                              scroller.Style.Height = "485px";
                                              scroller.Style.Width = "485px";
                                              Data.Editor.Refresh();

                                          },
                                          UpdatePosition = (x, y) =>
                                                           {
                                                               var scroller = Data.Editor.GetScrollerElement();
                                                               if (scroller.Style.Left == x + "px" && scroller.Style.Top == y + "px")
                                                                   return;
                                                               scroller.Style.Left = x + "px";
                                                               scroller.Style.Top = y + "px";
                                                               Data.Editor.Refresh();
                                                           },
                                          _Focus = () =>
                                                   {
                                                       var sc = Data.Editor.GetScrollerElement();
                                                       if (sc != null)
                                                       {
                                                           sc.Style.Visibility = "visible";
                                                       }
                                                   },
                                          _Hide = () =>
                                                  {
                                                      var sc = Data.Editor.GetScrollerElement();
                                                      Data.Editor.GetInputField().Blur();
                                                      //            Engine.uiCanvasItem.focus();
                                                      //            document.body.focus();

                                                      //            editor.onBlur();

                                                      if (sc != null)
                                                      {
                                                          sc.Style.Left = "-100px";
                                                          sc.Style.Top = "-100px";
                                                          sc.Style.Visibility = "hidden";
                                                      }
                                                  }
                                      });
        }

        public void ClearMainArea()
        {
            Data.MainPanel.Controls = new List<Element>();
            Data.CodeMirror = (TextAreaElement)Document.GetElementById("code");

            jQuery.Select(".CodeMirror").Remove();
            if (Data.CodeMirror.Truthy())
            {
                Data.CodeMirror.ParentNode.RemoveChild(Data.CodeMirror);
            }
            var sc = Document.GetElementById("picFieldUploader");
            if (sc != null)
                sc.Style.Visibility = "hidden";

        }

        private void Populate(LevelObject objectFramework)
        {

            ClearMainArea();
            Data.ObjectFramework = objectFramework;
            Data.Key.Text = objectFramework.Key;
            Data.Description.Text = objectFramework.Description ?? "";
            Data.Assets.ClearControls();
            foreach (var t in objectFramework.Assets)
            {
                Button<LevelObjectAsset> b = null;
                b = new Button<LevelObjectAsset>(null,0, 0, 0, 0, (Func<string>)(() => b.Data.Name));
                b.Color = "rgb(50,190,90)";
                b.Click = () =>
                {
                    Data.b1.Toggled = false;
                    Data.b2.Toggled = false;
                    Data.b3.Toggled = false;
                    Data.b4.Toggled = false;
                    loadAsset(b.Data);

                };
                b.Data = t;
                Data.Assets.AddControl(b);
            }

            Data.Pieces.ClearControls();
            foreach (var t in objectFramework.Pieces)
            {
                Button<LevelObjectPiece> b = null; b = new Button<LevelObjectPiece>(null,0, 0, 0, 0, (Func<string>)(() => b.Data.Name));
                
                b.Color = "rgb(50,190,90)";
                b.Click = () =>
                          {
                              Data.b1.Toggled = false;
                              Data.b2.Toggled = false;
                              Data.b3.Toggled = false;
                              Data.b4.Toggled = false;
                              loadPiece(b.Data);

                          };
                Data.Pieces.AddControl(b);
                b.Data = t;
            }

            Data.PieceLayouts.ClearControls();
            foreach (var t in objectFramework.PieceLayouts)
            {
                Button<LevelObjectPieceLayout> b = null; b = new Button<LevelObjectPieceLayout>(null,0, 0, 0, 0, (Func<string>)(() => b.Data.Name));
                
                b.Color = "rgb(50,190,90)";
                b.Click = () =>
                          {
                              Data.b1.Toggled = false;
                              Data.b2.Toggled = false;
                              Data.b3.Toggled = false;
                              Data.b4.Toggled = false;
                              loadPieceLayout(b.Data);

                          };
                Data.PieceLayouts.AddControl(b);
                b.Data = t;
            }

            Data.Projectiles.ClearControls();
            foreach (var t in objectFramework.Projectiles)
            {
                Button<LevelObjectProjectile> b = null; b = new Button<LevelObjectProjectile>(null,0, 0, 0, 0, (Func<string>)(() => b.Data.Name));
                
                b.Color = "rgb(50,190,90)";
                b.Click = () =>
                          {
                              Data.b1.Toggled = false;
                              Data.b2.Toggled = false;
                              Data.b3.Toggled = false;
                              Data.b4.Toggled = false;
                              loadProjectile(b.Data);

                          };
                Data.Projectiles.AddControl(b);
                b.Data = t;
            }

        }

        private void loadProjectile(LevelObjectProjectile data)
        {
            /*
                    objectFrameworkArea.clearMainArea();


                    objectFrameworkArea.mainPanel.addControl(new TextArea(25, 25, "Name: ", sonicManager.uiManager.textFont, "black"));
                    objectFrameworkArea.mainPanel.addControl(new TextBox(100, 5, 290, 25, projectile.name, sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () { projectile.name = this.text; }));
                    var b;
                    objectFrameworkArea.mainPanel.addControl(b = new Button(40, 160, 70, 25, "XFlip", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
                        projectile.xflip = b.toggled;
                    }));
                    b.toggle = true;
                    b.toggled = projectile.xflip;

                    var c;
                    objectFrameworkArea.mainPanel.addControl(c = new Button(115, 160, 70, 25, "YFlip", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
                        projectile.yflip = c.toggled;
                    }));
                    c.toggle = true;
                    c.toggled = projectile.yflip;


                    var jd;
                    objectFrameworkArea.mainPanel.addControl(jd = new HScrollBox(20, 35, 70, 4, 112, "rgb(50,60,127)"));
                    var bd;
                    jd.controls = [];
                    for (var i = 0; i < objectFrameworkArea.objectFramework.assets.length; i++) {
                        jd.addControl(bd = new ImageButton(0, 0, 0, 0, function () { return this.state.name; }, "10pt Arial", function (canvas, x, y) {
                            if (this.state.frames.length == 0) return;
                            this.state.frames[0].drawSimple(canvas, { x: x, y: y }, this.width, this.height - 15, projectile.xflip, projectile.yflip);
                        }, function () {


                            for (var j = 0; j < jd.controls.length; j++) {
                                if (jd.controls[j] == this) {
                                    if (projectile.assetIndex == j)
                                        this.toggled = true;

                                    projectile.assetIndex = j;
                                    continue;
                                }
                                jd.controls[j].toggled = false;
                            }

                        }));
                        bd.toggle = true;
                        bd.state = objectFrameworkArea.objectFramework.assets[i];
                        if (projectile.assetIndex == i) {
                            bd.toggled = true;
                        }
                    }
            */
        }

        private void loadPieceLayout(LevelObjectPieceLayout data)
        { /*
        objectFrameworkArea.clearMainArea();


        objectFrameworkArea.mainPanel.addControl(new TextArea(25, 25, "Name: ", sonicManager.uiManager.textFont, "black"));
        objectFrameworkArea.mainPanel.addControl(new TextBox(100, 5, 390, 25, pieceLayout.name, sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () { pieceLayout.name = this.text; }));


        objectFrameworkArea.mainPanel.addControl(pe = new PieceLayoutEditor(145, 105, { width: 350, height: 280 }));
        pe.init(pieceLayout);

        var listOfPieces;
        objectFrameworkArea.mainPanel.addControl(listOfPieces = new ScrollBox(10, 105, 70, 5, 112, "rgb(50,60,127)"));


        var selectPieceScroll;
        objectFrameworkArea.mainPanel.addControl(objectFrameworkArea.mainPanel.selectPieceScroll = selectPieceScroll = new HScrollBox(145, 390, 70, 3, 112, "rgb(50,60,127)"));
        var bdc;
        selectPieceScroll.controls = [];


        objectFrameworkArea.mainPanel.addControl(objectFrameworkArea.mainPanel.priorityDrawing = new Button(148, 38, 140, 25, "Foreground", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
            pe.pieceLayoutMaker.setPriority(this.toggled);
        }));
        objectFrameworkArea.mainPanel.priorityDrawing.toggle = true;


        for (var i = 0; i < objectFrameworkArea.objectFramework.pieces.length; i++) {

            selectPieceScroll.addControl(bdc = new ImageButton(0, 0, 0, 0,
                function () {
                    return objectFrameworkArea.objectFramework.pieces[this.state.index].name;
                }, "10pt Arial",
                function (canvas, x, y) {
                    var d = objectFrameworkArea.objectFramework.pieces[this.state.index];
                    var ast = objectFrameworkArea.objectFramework.assets[d.assetIndex];
                    if (ast.frames.length == 0) return;
                    ast.frames[0].drawSimple(canvas, { x: x, y: y }, this.width, this.height - 15, d.xflip, d.yflip);
                }, function () {
                    listOfPieces.controls[pe.pieceLayoutMaker.selectedPieceIndex].state.pieceIndex = this.state.index;

                    for (var i = 0; i < selectPieceScroll.controls.length; i++) {
                        if (selectPieceScroll.controls[i] == this)
                            selectPieceScroll.controls[i].toggled = true;
                        else
                            selectPieceScroll.controls[i].toggled = false;
                    }
                }));

            bdc.state = {
                piece: pieceLayout.pieces[0],
                index: i
            };
            bdc.toggle = true;
            if (pieceLayout.pieces[0])
                bdc.toggled = pieceLayout.pieces[0].pieceIndex == i;
        }

        var pe;
        var showB;
        objectFrameworkArea.mainPanel.addControl(showB = new Button(348, 38, 140, 25, "Show Images", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
            pe.pieceLayoutMaker.showImages = this.toggled;
        }));
        showB.toggle = true;

        objectFrameworkArea.mainPanel.addControl(new Button(348, 68, 140, 25, "Add Branch", sonicManager.uiManager.buttonFont, "rgb(50,150,50)", function () {
            var pc;
            pe.pieceLayoutMaker.pieceLayout.pieces.push(pc = new LevelObjectPieceLayoutPiece(_H.floor(objectFrameworkArea.objectFramework.pieces.length * Math.random())));
            pc.x = _H.floor(Math.random() * pe.pieceLayoutMaker.pieceLayout.width);
            pc.y = _H.floor(Math.random() * pe.pieceLayoutMaker.pieceLayout.height);

            pe.pieceLayoutMaker.selectedPieceIndex = pe.pieceLayoutMaker.pieceLayout.pieces.length - 1;

            buildleftScroll();
        }));

        function buildleftScroll() {
            var bd;

            listOfPieces.controls = [];
            for (var i = 0; i < pieceLayout.pieces.length; i++) {

                listOfPieces.addControl(bd = new ImageButton(0, 0, 0, 0, function () {
                    return objectFrameworkArea.objectFramework.pieces[this.state.pieceIndex].name;
                }, "10pt Arial", function (canvas, x, y) {
                    var pc = objectFrameworkArea.objectFramework.pieces[this.state.pieceIndex];
                    var ast = objectFrameworkArea.objectFramework.assets[pc.assetIndex];
                    if (ast.frames.length == 0) return;
                    ast.frames[0].drawSimple(canvas, { x: x, y: y }, this.width, this.height - 15, pc.xflip, pc.yflip);
                }, function () {

                    for (var j = 0; j < listOfPieces.controls.length; j++) {
                        if (this == listOfPieces.controls[j]) {
                            listOfPieces.controls[j].toggled = true;
                            pe.pieceLayoutMaker.selectedPieceIndex = j;
                        } else {
                            listOfPieces.controls[j].toggled = false;
                        }
                    }

                    for (var j = 0; j < selectPieceScroll.controls.length; j++) {

                        selectPieceScroll.controls[j].state.piece = this.state;
                        selectPieceScroll.controls[j].toggled = (j == pieceLayout.pieces[pe.pieceLayoutMaker.selectedPieceIndex].pieceIndex);

                    }

                }));
                bd.toggle = true;
                bd.state = pieceLayout.pieces[i];
                if (i == pe.pieceLayoutMaker.selectedPieceIndex) bd.toggled = true;
            }
        }

        buildleftScroll();

        objectFrameworkArea.mainPanel.updatePieces = function () {
            var df;
            for (var j = 0; j < listOfPieces.controls.length; j++) {
                if (j == pe.pieceLayoutMaker.selectedPieceIndex) {
                    listOfPieces.controls[j].toggled = true;
                    df = listOfPieces.controls[j];
                }
                else {
                    listOfPieces.controls[j].toggled = false;
                }
            }

            for (var j = 0; j < objectFrameworkArea.mainPanel.selectPieceScroll.controls.length; j++) {
                df.piece = this;
                if (df.piece.pieceIndex == j)
                    objectFrameworkArea.mainPanel.selectPieceScroll.controls[j].toggled = true;
                else
                    objectFrameworkArea.mainPanel.selectPieceScroll.controls[j].toggled = false;
            }


        };

*/
        }

        private void loadPiece(LevelObjectPiece piece)
        {
            ClearMainArea();


            Data.MainPanel.AddControl(new TextArea(25, 25, "Name: ") { Color = "black" });
            TextBox textBox = null;
            Data.MainPanel.AddControl(textBox = new TextBox(100, 5, 290, 25, piece.Name) { Color = "rgb(50,150,50)", Click = () => { piece.Name = textBox.Text; } });

            Button b = null;
            Data.MainPanel.AddControl(b = new Button(40, 160, 70, 25, "XFlip")
            {
                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    piece.Xflip = b.Toggled;
                }
            });
            b.Toggle = true;
            b.Toggled = piece.Xflip;

            Button c = null;
            Data.MainPanel.AddControl(c = new Button(115, 160, 70, 25, "YFlip")
            {
                Color = "rgb(50,150,50)",
                Click = () =>
                {
                    piece.Yflip = c.Toggled;
                }
            });
            c.Toggle = true;
            c.Toggled = piece.Yflip;


            HScrollBox jd;
            Data.MainPanel.AddControl(jd = new HScrollBox(20, 35,70,4,112) { BackColor = "rgb(50,60,127)" });
            ImageButton<LevelObjectAsset> bd = null;
            jd.Controls = new List<Element>();

            for (var i = 0; i < Data.ObjectFramework.Assets.Count; i++)
            {
                jd.AddControl(bd = new ImageButton<LevelObjectAsset>(null,0, 0, 0, 0)
                {
                    Text = ((Func<string>)(() => bd.Data.Name)),
                    Image = (canvas, x, y) =>
                    {
                        if (bd.Data.Frames.Count == 0) return;
                        bd.Data.Frames[0].DrawSimple(canvas, new Point(x, y), bd.Width, bd.Height - 15, piece.Xflip, piece.Yflip);
                    },
                    Click = () =>
                    {


                        for (var j = 0; j < jd.Controls.Count; j++)
                        {
                            if (jd.Controls[j] == bd)
                            {
                                if (piece.AssetIndex == j)
                                    bd.Toggled = true;

                                piece.AssetIndex = j;
                                continue;
                            }
                            ((ImageButton)jd.Controls[j]).Toggled = false;
                        }

                    }
                });
                bd.Toggle = true;
                bd.Data = Data.ObjectFramework.Assets[i];
                if (piece.AssetIndex == i)
                {
                    bd.Toggled = true;
                }
            }
        }

        private void loadAsset(LevelObjectAsset asset)
        {

            ClearMainArea();


            Data.MainPanel.AddControl(new TextArea(25, 25, "Name: ") { Color = "black" });
            TextBox tb = null;
            Data.MainPanel.AddControl(tb = new TextBox(100, 5, 290, 25, asset.Name) { Color = "rgb(50,150,50)", Click = () => { asset.Name = tb.Text; } });

            Data.MainPanel.AddControl(new Button(400, 5, 100, 25, "Add Frame")
            {
                Color = "rgb(50,150,50)",
                Click = () =>
                {

                    LevelObjectAssetFrame vs;
                    asset.Frames.Add(vs = new LevelObjectAssetFrame("Frame " + (asset.Frames.Count + 1)));
                    vs.Palette = new string[] { "000", "111", "222", "333", "444", "555", "666", "777", "888", "999", "AAA", "BBB", "CCC", "DDD", "EEE", "FFF" };
                    vs.Width = (int)(Math.Floor(Math.Random() * 40) + 20);
                    vs.Height = (int)(Math.Floor(Math.Random() * 40) + 20);
                    vs.ColorMap=new int[vs.Width][];
                    for (var i = 0; i < vs.Width; i++)
                    {
                        vs.ColorMap[i] = new int[vs.Height];
                        for (var j = 0; j < vs.Height; j++)
                        {
                            vs.ColorMap[i][j] = (int)Math.Floor(Math.Random() * vs.Palette.Length);
                        }
                    }

                    //Data.MainPanel.populate(asset);
                }
            });

            HScrollBox jd;
            Data.MainPanel.AddControl(jd = new HScrollBox(20, 35, 70, 4, 112) { BackColor = "rgb(50,60,127)" });
            Data.MainPanel.Data.AssetPopulate = (ast) =>
            {
                ImageButton<LevelObjectAssetFrame> bd = null;
                jd.Controls = new List<Element>();
                for (var i = 0; i < ast.Frames.Count; i++)
                {
                    jd.AddControl(bd = new ImageButton<LevelObjectAssetFrame>(null,0, 0, 0, 0)
                    {
                        Text = ((Func<string>)(() => { return ast.Name; })),
                        Image = (canvas, x, y) =>
                        {
                            bd.Data.DrawSimple(canvas, new Point(x, y), bd.Width, bd.Height - 15, false, false);
                        },
                        Click = () =>
                        {
                            Data.MainPanel.Data.LoadFrame(bd.Data);
                        }
                    });
                    bd.Data = ast.Frames[i];
                }
            };


            Data.MainPanel.Data.AssetPopulate(asset);

            Data.MainPanel.AddControl(Data.MainPanel.Data.FrameArea = new Panel(7, 155, 480, 350));
            Data.MainPanel.Data.FrameArea.Outline = false;


            Data.MainPanel.Data.LoadFrame = (frame) =>
            {
                Data.MainPanel.Data.FrameArea.Controls = new List<Element>();
                //Data.MainPanel.Data.FrameArea.currentFrame = frame;
                //var ce;
                Data.MainPanel.Data.FrameArea.AddControl(new TextArea(15, 21, "Name: ") { Color = "black" });
                TextBox textBox = null;
                Data.MainPanel.Data.FrameArea.AddControl(new TextBox(90, 0, 395, 25, frame.Name)
                {
                    Color = "rgb(50,150,50)",
                    Click = () => { frame.Name = textBox.Text; }
                });


                Data.MainPanel.Data.FrameArea.AddControl(new TextArea(0, 275, (Func<string>)(() => { return "Width:  " + frame.Width; })) { Color = "Black" });

                Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 275 - 25, 14, 17, "^"){Color="rgb(50,150,50)", Click=() =>
                {
                    frame.SetWidth(frame.Width + 1);
                }});
                Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 275 - 5, 14, 20, "v")
                {
                    Color = "rgb(50,150,50)",
                    Click = () =>
                        {
                            frame.SetWidth(frame.Width - 1);

                        }
                });

                Data.MainPanel.Data.FrameArea.AddControl(new TextArea(0, 320, ((Func<string>)(() => { return "Height: " + frame.Height; }))) { Color = "Black" });


                Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 320 - 25, 14, 17, "^"){Color= "rgb(50,150,50)",Click= () =>
                {
                    frame.SetHeight(frame.Height + 1);

                }});
                Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 320 - 5, 14, 20, "v"){Color="rgb(50,150,50)", Click=() =>
                {
                    frame.SetHeight(frame.Height - 1);

                }});

                Button bt;
                Data.MainPanel.Data.FrameArea.AddControl(bt = new Button(230 - 55, 35, 150, 25, "Collide Map"){Color="rgb(50,150,50)", Click=() =>
                {
                //    ce.showCollideMap = this.toggled;
                }});
                bt.Toggle = true;
                Data.MainPanel.Data.FrameArea.AddControl(bt = new Button(390 - 55, 35, 150, 25, "Hurt Map"){Color="rgb(50,150,50)",Click= () =>
                {
                //    ce.showHurtMap = this.toggled;
                }});
                bt.Toggle = true;

      /*          Data.MainPanel.Data.FrameArea.AddControl(Data.MainPanel.Data.FrameArea.colorEditor = new ColorEditingArea(230 - 55, 65, new Point(310, 225), true));
                var ce = Data.MainPanel.Data.FrameArea.colorEditor;
                ce.init(frame);
                ce.editor.showOutline = false;
                ce.editable = false;
                ce.click = (e) =>
                {
                    frame.setOffset(e.x, e.y);

                };*/
/*
                Data.MainPanel.Data.FrameArea.AddControl(new HtmlBox(19, 64, 120, 31, () =>
                {
                    var sc = document.getElementById("picFieldUploader");

                    sc.style.left = (objectFrameworkArea.x + 320 + 7 + 19) + "px";
                    sc.style.top = (objectFrameworkArea.y + 150 + 155 + 64) + "px";
                    sc.style.position = "absolute";
                    sc.style.visibility = "visible";
                }, (x, y) =>
                {
                    var sc = document.getElementById("picFieldUploader");
                    if (sc)
                    {
                        if (sc.style.left == x + "px" && sc.style.top == y + "px")
                            return;
                        sc.style.left = x + "px";
                        sc.style.top = y + "px";
                    }
                }, () =>
                {
                    var sc = document.getElementById("picFieldUploader");
                    if (sc)
                    {
                        sc.style.visibility = "visible";
                    }
                }, () =>
                {
                    var sc = document.getElementById("picFieldUploader");
                    if (sc)
                    {
                        sc.style.left = "-100px";
                        sc.style.top = "-100px";
                        sc.style.visibility = "hidden";
                    }
                }));
*/


             /*   var pa;
                Data.MainPanel.Data.FrameArea.AddControl(Data.MainPanel.Data.FrameArea.palatteArea = new PaletteArea(230 - 55, 300, new Point(39, 11), false));
                Data.MainPanel.Data.FrameArea.palatteArea.init(frame.palette, true);

                Data.MainPanel.Data.FrameArea.AddControl(new Button(230 - 55, 305 + 11 * 2, 310, 25, "Edit Map"){Color="rgb(50,150,50)", Click=() =>
                {
                    sonicManager.uiManager.colorEditorArea.init(frame);
                    sonicManager.uiManager.colorEditorArea.visible = true;
                    sonicManager.uiManager.colorEditorArea.depth = objectFrameworkArea.depth + 1;
                    objectFrameworkArea.loseFocus();

                }});*/

            };
        }

        /*
          
            window.imageUploaded = function (img) {
                _H.loadSprite(img, function (image) {
                    objectFrameworkArea.mainPanel.frameArea.currentFrame.uploadImage(image);
                    var ce = objectFrameworkArea.mainPanel.frameArea.colorEditor;
                    ce.init(objectFrameworkArea.mainPanel.frameArea.currentFrame);
                    ce.editor.showOutline = false;
                    ce.editable = false;
                    ce.click = function (e) {
                        if (objectFrameworkArea.mainPanel.frameArea.currentFrame) {
                            objectFrameworkArea.mainPanel.frameArea.currentFrame.offsetX = e.x;
                            objectFrameworkArea.mainPanel.frameArea.currentFrame.offsetY = e.y;
                            objectFrameworkArea.mainPanel.frameArea.currentFrame.clearCache();
                        }
                    };

                    objectFrameworkArea.mainPanel.frameArea.palatteArea.init(objectFrameworkArea.mainPanel.frameArea.currentFrame.palette, true);
                });
            };*/
    }
    [Serializable]
    public class ObjectFrameworkData
    {
        public Button b1 = null;
        public Button b2 = null;
        public Button b3 = null;
        public Button b4 = null;

        public ScrollBox Pieces { get; set; }
        public ScrollBox Assets { get; set; }
        public ScrollBox PieceLayouts { get; set; }
        public ScrollBox Projectiles { get; set; }
        public LevelObject ObjectFramework { get; set; }
        public TextBox Key { get; set; }
        public TextBox Description { get; set; }
        public CodeMirror Editor { get; set; }
        public Panel<MainPanelData> MainPanel { get; set; }
        public TextAreaElement CodeMirror { get; set; }
    }
    public class MainPanelData
    {
        public Action<LevelObjectAsset> AssetPopulate { get; set; }
        public Panel FrameArea { get; set; }

        public Action<LevelObjectAssetFrame> LoadFrame { get; set; }
    }
}