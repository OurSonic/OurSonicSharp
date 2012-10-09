using System;
using System.Collections.Generic;
using System.Html;
using CodeMirrorLibrary;
using OurSonic.Level.Objects;
using OurSonic.Utility;
using jQueryApi;
namespace OurSonic.UIManager.Areas
{
    public class ObjectFrameworkArea
    {
        public UIArea<ObjectFrameworkData> objectFrameworkArea;

        public ObjectFrameworkArea(UIManager manager)
        {
            var size = 40 * 4;

            objectFrameworkArea = new UIArea<ObjectFrameworkData>(new ObjectFrameworkData() {ObjectFramework = new LevelObject("Foo")}, 540, 75, 850, 690) {Closable = true};
            objectFrameworkArea.Visible = false;
            manager.AddArea(objectFrameworkArea);
            manager.UIManagerAreas.ObjectFrameworkArea = this;

            objectFrameworkArea.AddControl(new TextArea(30, 25, "Object Framework") {Color = "blue"});

            objectFrameworkArea.AddControl(new TextArea(16, 60, "Assets") {Color = "black"});

            objectFrameworkArea.AddControl(new Button(160, 38, 140, 25, "Add Asset") {
                                                                                             Color = "rgb(50,150,50)",
                                                                                             Click = (p) => {
                                                                                                         objectFrameworkArea.Data.ObjectFramework.Assets.Add(
                                                                                                                 new LevelObjectAsset("Asset " +
                                                                                                                                      ( objectFrameworkArea.Data.ObjectFramework.Assets.Count +
                                                                                                                                        1 )));
                                                                                                         Populate(objectFrameworkArea.Data.ObjectFramework);
                                                                                                     }
                                                                                     });

            objectFrameworkArea.AddControl(
                    objectFrameworkArea.Data.Assets = new ScrollBox(30, 60 + 10, 25, 4, 250) {BackColor = "rgb(50, 60, 127)",});

            objectFrameworkArea.AddControl(new TextArea(16, 60 + ( size * 1 ), "Pieces") {Color = "black"});

            objectFrameworkArea.AddControl(new Button(160, 38 + ( size * 1 ), 140, 25, "Add Piece") {
                                                                                                            Color = "rgb(50,150,50)",
                                                                                                            Click = (p) => {
                                                                                                                        objectFrameworkArea.Data.ObjectFramework.Pieces.Add(
                                                                                                                                new LevelObjectPiece("Piece " +
                                                                                                                                                     ( objectFrameworkArea.Data.ObjectFramework.
                                                                                                                                                                           Pieces.Count +
                                                                                                                                                       1 )));
                                                                                                                        Populate(objectFrameworkArea.Data.ObjectFramework);
                                                                                                                    }
                                                                                                    });

            objectFrameworkArea.AddControl(
                    objectFrameworkArea.Data.Pieces =
                    new ScrollBox(30, 60 + 10 + ( size * 1 ), 25, 4, 250) {BackColor = "rgb(50, 60, 127)",});

            objectFrameworkArea.AddControl(new TextArea(16, 60 + ( size * 2 ), "Piece Layouts") {Color = "black"});

            objectFrameworkArea.AddControl(new Button(160, 38 + ( size * 2 ), 140, 25, "Add Piece Layout") {
                                                                                                                   Color = "rgb(50,150,50)",
                                                                                                                   Click = (p) => {
                                                                                                                               objectFrameworkArea.Data.ObjectFramework.PieceLayouts.Add(
                                                                                                                                       new LevelObjectPieceLayout("Piece Layout " +
                                                                                                                                                                  ( objectFrameworkArea.Data.
                                                                                                                                                                                        ObjectFramework
                                                                                                                                                                                       .
                                                                                                                                                                                        PieceLayouts
                                                                                                                                                                                       .Count +
                                                                                                                                                                    1 )));
                                                                                                                               Populate(objectFrameworkArea.Data.ObjectFramework);
                                                                                                                           }
                                                                                                           });

            objectFrameworkArea.AddControl(
                    objectFrameworkArea.Data.PieceLayouts =
                    new ScrollBox(30, 60 + 10 + ( size * 2 ), 25, 4, 250) {BackColor = "rgb(50, 60, 127)",});

            objectFrameworkArea.AddControl(new TextArea(16, 60 + ( size * 3 ), "Projectiles") {Color = "black"});

            objectFrameworkArea.AddControl(new Button(160, 38 + ( size * 3 ), 140, 25, "Add Projectile") {
                                                                                                                 Color = "rgb(50,150,50)",
                                                                                                                 Click = (p) => {
                                                                                                                             objectFrameworkArea.Data.ObjectFramework.Projectiles.Add(
                                                                                                                                     new LevelObjectProjectile(
                                                                                                                                             "Piece Projectile " +
                                                                                                                                             ( objectFrameworkArea.Data.ObjectFramework.Projectiles.
                                                                                                                                                                   Count + 1 )));
                                                                                                                             Populate(objectFrameworkArea.Data.ObjectFramework);
                                                                                                                         }
                                                                                                         });

            objectFrameworkArea.AddControl(
                    objectFrameworkArea.Data.Projectiles =
                    new ScrollBox(30, 60 + 10 + ( size * 3 ), 25, 4, 250) {BackColor = "rgb(50, 60, 127)",});

            objectFrameworkArea.AddControl(new TextArea(320, 80 - 20, "Key: ") {Font = UIManager.SmallTextFont, Color = "black"});
            objectFrameworkArea.AddControl(
                    objectFrameworkArea.Data.Key =
                    new TextBox(370, 60 - 20, 150, 25, "") {Color = "rgb(50,150,50)", Click = (p) => { objectFrameworkArea.Data.ObjectFramework.Key = objectFrameworkArea.Data.Key.Text; }});

            objectFrameworkArea.AddControl(new TextArea(320 + 205, 80 - 24, "Description: ") {Font = UIManager.SmallTextFont, Color = "black"});
            objectFrameworkArea.AddControl(
                    objectFrameworkArea.Data.Description =
                    new TextBox(370 + 240, 60 - 20, 220, 25, "") {Color = "rgb(50,150,50)", Click = (p) => { objectFrameworkArea.Data.ObjectFramework.Description = objectFrameworkArea.Data.Description.Text; }});

            objectFrameworkArea.AddControl(objectFrameworkArea.Data.b1 = new Button(320, 95 - 20, 250, 25, "onInit") {
                                                                                                                             Color = "rgb(50,150,50)",
                                                                                                                             Click = (p) => {
                                                                                                                                         objectFrameworkArea.Data.b2.Toggled = false;
                                                                                                                                         objectFrameworkArea.Data.b3.Toggled = false;
                                                                                                                                         objectFrameworkArea.Data.b4.Toggled = false;
                                                                                                                                         if (objectFrameworkArea.Data.b1.Toggled) {
                                                                                                                                             addCodeWindow(objectFrameworkArea.Data.ObjectFramework.InitScript,
                                                                                                                                                           () => { objectFrameworkArea.Data.ObjectFramework.InitScript = objectFrameworkArea.Data.Editor.GetValue(); });
                                                                                                                                         } else
                                                                                                                                             ClearMainArea();
                                                                                                                                     }
                                                                                                                     });
            objectFrameworkArea.Data.b1.Toggle = true;

            objectFrameworkArea.AddControl(objectFrameworkArea.Data.b2 = new Button(580, 95 - 20, 250, 25, "onTick") {
                                                                                                                             Color = "rgb(50,150,50)",
                                                                                                                             Click = (p) => {
                                                                                                                                         objectFrameworkArea.Data.b1.Toggled = false;
                                                                                                                                         objectFrameworkArea.Data.b3.Toggled = false;
                                                                                                                                         objectFrameworkArea.Data.b4.Toggled = false;
                                                                                                                                         if (objectFrameworkArea.Data.b2.Toggled) {
                                                                                                                                             addCodeWindow(objectFrameworkArea.Data.ObjectFramework.TickScript,
                                                                                                                                                           () => { objectFrameworkArea.Data.ObjectFramework.TickScript = objectFrameworkArea.Data.Editor.GetValue(); });
                                                                                                                                         } else
                                                                                                                                             ClearMainArea();
                                                                                                                                     }
                                                                                                                     });
            objectFrameworkArea.Data.b2.Toggle = true;

            objectFrameworkArea.AddControl(objectFrameworkArea.Data.b3 = new Button(320, 130 - 20, 250, 25, "onCollide") {
                                                                                                                                 Color = "rgb(50,150,50)",
                                                                                                                                 Click = (p) => {
                                                                                                                                             objectFrameworkArea.Data.b1.Toggled = false;
                                                                                                                                             objectFrameworkArea.Data.b2.Toggled = false;
                                                                                                                                             objectFrameworkArea.Data.b4.Toggled = false;
                                                                                                                                             if (objectFrameworkArea.Data.b3.Toggled) {
                                                                                                                                                 addCodeWindow(objectFrameworkArea.Data.ObjectFramework.CollideScript,
                                                                                                                                                               () => { objectFrameworkArea.Data.ObjectFramework.CollideScript = objectFrameworkArea.Data.Editor.GetValue(); });
                                                                                                                                             } else
                                                                                                                                                 ClearMainArea();
                                                                                                                                         }
                                                                                                                         });
            objectFrameworkArea.Data.b3.Toggle = true;

            objectFrameworkArea.AddControl(objectFrameworkArea.Data.b4 = new Button(580, 130 - 20, 250, 25, "onHurtSonic") {
                                                                                                                                   Color = "rgb(50,150,50)",
                                                                                                                                   Click = (p) => {
                                                                                                                                               objectFrameworkArea.Data.b1.Toggled = false;
                                                                                                                                               objectFrameworkArea.Data.b2.Toggled = false;
                                                                                                                                               objectFrameworkArea.Data.b3.Toggled = false;
                                                                                                                                               if (objectFrameworkArea.Data.b4.Toggled) {
                                                                                                                                                   addCodeWindow(objectFrameworkArea.Data.ObjectFramework.HurtScript,
                                                                                                                                                                 () => { objectFrameworkArea.Data.ObjectFramework.HurtScript = objectFrameworkArea.Data.Editor.GetValue(); });
                                                                                                                                               } else
                                                                                                                                                   ClearMainArea();
                                                                                                                                           }
                                                                                                                           });
            objectFrameworkArea.Data.b4.Toggle = true;

            objectFrameworkArea.AddControl(objectFrameworkArea.Data.MainPanel = new Panel<MainPanelData>(new MainPanelData(), 320, 150, 510, 510));
            //    setTimeout("        var sc = document.getElementById("picFieldUploader");sc.style.visibility = "hidden";sc.style.position="absolute";", 300);
        }

        private void addCodeWindow(string value, Action change)
        {
            ClearMainArea();
            objectFrameworkArea.Data.MainPanel.AddControl(new HtmlBox(15, -35) {
                                                                                       Width = 485,
                                                                                       Height = 485,
                                                                                       Init = () => {
                                                                                                  jQuery.FromElement(Document.Body).Append(@"<textarea id=""code"" name=""code"" style=""position:absolute;width:485px;height:485px;""></textarea>");
                                                                                                  objectFrameworkArea.Data.CodeMirror = (TextAreaElement) Document.GetElementById("code");
                                                                                                  objectFrameworkArea.Data.CodeMirror.Value = value;
                                                                                                  CodeMirrorLine hlLine = null;

                                                                                                  var codeMirrorOptions = new CodeMirrorOptions() {
                                                                                                                                                          LineNumbers = true,
                                                                                                                                                          MatchBrackets = true,
                                                                                                                                                          OnChange = change,
                                                                                                                                                          //extraKeys= new { "Ctrl-Space"= (cm)=> { CodeMirror.simpleHint(cm, CodeMirror.javascriptHint); } },
                                                                                                                                                          OnCursorActivity = (e) => {
                                                                                                                                                                                 objectFrameworkArea.Data.Editor.SetLineClass(hlLine, null);
                                                                                                                                                                                 hlLine = objectFrameworkArea.Data.Editor.SetLineClass(objectFrameworkArea.Data.Editor.GetCursor().Line, "activeline");
                                                                                                                                                                             },
                                                                                                                                                          OnFocus =
                                                                                                                                                                  (editor) => { SonicManager.Instance.TypingInEditor = true; },
                                                                                                                                                          OnBlur =
                                                                                                                                                                  (editor) => {
                                                                                                                                                                      SonicManager.Instance.TypingInEditor =
                                                                                                                                                                              false;
                                                                                                                                                                  }
                                                                                                                                                  };
                                                                                                  objectFrameworkArea.Data.Editor = CodeMirror.FromTextArea(objectFrameworkArea.Data.CodeMirror, codeMirrorOptions);
                                                                                                  objectFrameworkArea.Data.Editor.SetOption("theme", "night");

                                                                                                  hlLine = objectFrameworkArea.Data.Editor.SetLineClass(0, "activeline");

                                                                                                  var scroller = objectFrameworkArea.Data.Editor.GetScrollerElement();
                                                                                                  scroller.Style.Height = "485px";
                                                                                                  scroller.Style.Width = "485px";
                                                                                                  objectFrameworkArea.Data.Editor.Refresh();
                                                                                              },
                                                                                       UpdatePosition = (x, y) => {
                                                                                                            var scroller = objectFrameworkArea.Data.Editor.GetScrollerElement();
                                                                                                            if (scroller.Style.Left == x + "px" && scroller.Style.Top == y + "px")
                                                                                                                return;
                                                                                                            scroller.Style.Left = x + "px";
                                                                                                            scroller.Style.Top = y + "px";
                                                                                                            objectFrameworkArea.Data.Editor.Refresh();
                                                                                                        },
                                                                                       _Focus = () => {
                                                                                                    var sc = objectFrameworkArea.Data.Editor.GetScrollerElement();
                                                                                                    if (sc != null)
                                                                                                        sc.Style.Visibility = "visible";
                                                                                                },
                                                                                       _Hide = () => {
                                                                                                   var sc = objectFrameworkArea.Data.Editor.GetScrollerElement();
                                                                                                   objectFrameworkArea.Data.Editor.GetInputField().Blur();
                                                                                                   //            Engine.uiCanvasItem.focus();
                                                                                                   //            document.body.focus();

                                                                                                   //            editor.onBlur();

                                                                                                   if (sc != null) {
                                                                                                       sc.Style.Left = "-100px";
                                                                                                       sc.Style.Top = "-100px";
                                                                                                       sc.Style.Visibility = "hidden";
                                                                                                   }
                                                                                               }
                                                                               });
        }

        public void ClearMainArea()
        {
            objectFrameworkArea.Data.MainPanel.Controls = new List<Element>();
            objectFrameworkArea.Data.CodeMirror = (TextAreaElement) Document.GetElementById("code");

            jQuery.Select(".CodeMirror").Remove();
            if (objectFrameworkArea.Data.CodeMirror.Truthy())
                objectFrameworkArea.Data.CodeMirror.ParentNode.RemoveChild(objectFrameworkArea.Data.CodeMirror);
            var sc = Document.GetElementById("picFieldUploader");
            if (sc != null)
                sc.Style.Visibility = "hidden";
        }

        public void Populate(LevelObject objectFramework)
        {
            ClearMainArea();
            objectFrameworkArea.Data.ObjectFramework = objectFramework;
            objectFrameworkArea.Data.Key.Text = objectFramework.Key;
            objectFrameworkArea.Data.Description.Text = objectFramework.Description ?? "";
            objectFrameworkArea.Data.Assets.ClearControls();
            for (int index = 0; index < objectFramework.Assets.Count; index++) {
                var t = objectFramework.Assets[index];
                Button<LevelObjectAsset> b = null;
                b = new Button<LevelObjectAsset>(null, 0, 0, 0, 0, (Func<string>) ( () => b.Data.Name ));
                b.Color = "rgb(50,190,90)";
                Button<LevelObjectAsset> b1 = b;
                b.Click = (p) => {
                              objectFrameworkArea.Data.b1.Toggled = false;
                              objectFrameworkArea.Data.b2.Toggled = false;
                              objectFrameworkArea.Data.b3.Toggled = false;
                              objectFrameworkArea.Data.b4.Toggled = false;
                              loadAsset(b1.Data);
                          };
                b.Data = t;
                objectFrameworkArea.Data.Assets.AddControl(b);
            }

            objectFrameworkArea.Data.Pieces.ClearControls();
            for (int index = 0; index < objectFramework.Pieces.Count; index++) {
                var t = objectFramework.Pieces[index];
                Button<LevelObjectPiece> b = null;
                b = new Button<LevelObjectPiece>(null, 0, 0, 0, 0, (Func<string>) ( () => b.Data.Name ));

                b.Color = "rgb(50,190,90)";
                Button<LevelObjectPiece> b1 = b;
                b.Click = (p) => {
                              objectFrameworkArea.Data.b1.Toggled = false;
                              objectFrameworkArea.Data.b2.Toggled = false;
                              objectFrameworkArea.Data.b3.Toggled = false;
                              objectFrameworkArea.Data.b4.Toggled = false;
                              loadPiece(b1.Data);
                          };
                objectFrameworkArea.Data.Pieces.AddControl(b);
                b.Data = t;
            }

            objectFrameworkArea.Data.PieceLayouts.ClearControls();
            for (int index = 0; index < objectFramework.PieceLayouts.Count; index++) {
                var t = objectFramework.PieceLayouts[index];
                Button<LevelObjectPieceLayout> b = null;
                b = new Button<LevelObjectPieceLayout>(null, 0, 0, 0, 0, (Func<string>) ( () => b.Data.Name ));

                b.Color = "rgb(50,190,90)";
                Button<LevelObjectPieceLayout> b1 = b;
                b.Click = (p) => {
                              objectFrameworkArea.Data.b1.Toggled = false;
                              objectFrameworkArea.Data.b2.Toggled = false;
                              objectFrameworkArea.Data.b3.Toggled = false;
                              objectFrameworkArea.Data.b4.Toggled = false;
                              loadPieceLayout(b1.Data);
                          };
                objectFrameworkArea.Data.PieceLayouts.AddControl(b);
                b.Data = t;
            }

            objectFrameworkArea.Data.Projectiles.ClearControls();
            for (int index = 0; index < objectFramework.Projectiles.Count; index++) {
                var t = objectFramework.Projectiles[index];
                Button<LevelObjectProjectile> b = null;
                b = new Button<LevelObjectProjectile>(null, 0, 0, 0, 0, (Func<string>) ( () => b.Data.Name ));

                b.Color = "rgb(50,190,90)";
                Button<LevelObjectProjectile> b1 = b;
                b.Click = (p) => {
                              objectFrameworkArea.Data.b1.Toggled = false;
                              objectFrameworkArea.Data.b2.Toggled = false;
                              objectFrameworkArea.Data.b3.Toggled = false;
                              objectFrameworkArea.Data.b4.Toggled = false;
                              loadProjectile(b1.Data);
                          };
                objectFrameworkArea.Data.Projectiles.AddControl(b);
                b.Data = t;
            }
        }

        private void loadProjectile(LevelObjectProjectile projectile)
        {
            ClearMainArea();

            objectFrameworkArea.Data.MainPanel.AddControl(new TextArea(25, 25, "Name= ") {Color = "black"});
            TextBox fm = null;
            objectFrameworkArea.Data.MainPanel.AddControl(fm = new TextBox(100, 5, 290, 25, projectile.Name) {Color = "rgb(50,150,50)", Click = (p) => { projectile.Name = fm.Text; }});
            Button b = null;
            objectFrameworkArea.Data.MainPanel.AddControl(b = new Button(40, 160, 70, 25, "XFlip") {
                                                                                                           Color = "rgb(50,150,50)",
                                                                                                           Click = (p) => { projectile.Xflip = b.Toggled; }
                                                                                                   });
            b.Toggle = true;
            b.Toggled = projectile.Xflip;

            Button c = null;
            objectFrameworkArea.Data.MainPanel.AddControl(c = new Button(115, 160, 70, 25, "YFlip") {
                                                                                                            Color = "rgb(50,150,50)",
                                                                                                            Click = (p) => { projectile.Yflip = c.Toggled; }
                                                                                                    });
            c.Toggle = true;
            c.Toggled = projectile.Yflip;

            HScrollBox jd;
            objectFrameworkArea.Data.MainPanel.AddControl(jd = new HScrollBox(20, 35, 70, 4, 112) {BackColor = "rgb(50,60,127)"});
            jd.Controls = new List<Element>();
            for (var i = 0; i < objectFrameworkArea.Data.ObjectFramework.Assets.Count; i++) {
                ImageButton<LevelObjectAsset> bd = new ImageButton<LevelObjectAsset>(null, 0, 0, 0, 0);
                bd.Text = ( (Func<string>) ( () => { return bd.Data.Name; } ) );
                bd.OnDraw = (canvas, x, y) => {
                                if (bd.Data.Frames.Count == 0) return;
                                bd.Data.Frames[0].DrawSimple(canvas, new Point(x, y), bd.Width, bd.Height - 15, projectile.Xflip, projectile.Yflip);
                            };
                bd.Click = (p) => {
                               for (var j = 0; j < jd.Controls.Count; j++) {
                                   if (jd.Controls[j] == bd) {
                                       if (projectile.AssetIndex == j)
                                           bd.Toggled = true;

                                       projectile.AssetIndex = j;
                                       continue;
                                   }
                                   ( (ImageButton) jd.Controls[j] ).Toggled = false;
                               }
                           };

                jd.AddControl(bd);
                bd.Toggle = true;
                bd.Data = objectFrameworkArea.Data.ObjectFramework.Assets[i];
                if (projectile.AssetIndex == i)
                    bd.Toggled = true;
            }
        }

        private void loadPieceLayout(LevelObjectPieceLayout pieceLayout)
        {
            ClearMainArea();

            objectFrameworkArea.Data.MainPanel.AddControl(new TextArea(25, 25, "Name= ") {Color = "black"});
            TextBox textBox = null;
            textBox = new TextBox(100, 5, 390, 25, pieceLayout.Name) {Color = "rgb(50,150,50)", Click = (p) => { pieceLayout.Name = textBox.Text; }};
            objectFrameworkArea.Data.MainPanel.AddControl(textBox);

            objectFrameworkArea.Data.MainPanel.AddControl(objectFrameworkArea.Data.MainPanel.Data.pe = new PieceLayoutEditor(145, 105, new Point(350, 280)));
            objectFrameworkArea.Data.MainPanel.Data.pe.Init(pieceLayout);

            objectFrameworkArea.Data.MainPanel.AddControl(objectFrameworkArea.Data.ListOfPieces = new ScrollBox(10, 105, 70, 5, 112) {BackColor = "rgb(50,60,127)"});

            HScrollBox selectPieceScroll;
            objectFrameworkArea.Data.MainPanel.AddControl(objectFrameworkArea.Data.MainPanel.Data.SelectPieceScroll = selectPieceScroll = new HScrollBox(145, 390, 70, 3, 112) {BackColor = "rgb(50,60,127)"});
            selectPieceScroll.Controls = new List<Element>();
            ;

            objectFrameworkArea.Data.MainPanel.AddControl(objectFrameworkArea.Data.MainPanel.Data.PriorityDrawing = new Button(148, 38, 140, 25, "Foreground") {
                                                                                                                                                                       Color = "rgb(50,150,50)",
                                                                                                                                                                       Click =
                                                                                                                                                                               (p) => {
                                                                                                                                                                                   objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.SetPriority(
                                                                                                                                                                                           objectFrameworkArea.Data.MainPanel.Data.PriorityDrawing.Toggled);
                                                                                                                                                                               }
                                                                                                                                                               });
            objectFrameworkArea.Data.MainPanel.Data.PriorityDrawing.Toggle = true;

            for (var i = 0; i < objectFrameworkArea.Data.ObjectFramework.Pieces.Count; i++) {
                ImageButton<ObjectFrameworkAreaPiece> bdc = new ImageButton<ObjectFrameworkAreaPiece>(null, 0, 0, 0, 0);
                bdc.Text = ( (Func<string>) ( () => objectFrameworkArea.Data.ObjectFramework.Pieces[bdc.Data.index].Name ) );
                bdc.OnDraw = (canvas, x, y) => {
                                 var d = objectFrameworkArea.Data.ObjectFramework.Pieces[bdc.Data.index];
                                 var ast = objectFrameworkArea.Data.ObjectFramework.Assets[d.AssetIndex];
                                 if (ast.Frames.Count == 0) return;
                                 ast.Frames[0].DrawSimple(canvas, new Point(x, y), bdc.Width, bdc.Height - 15, d.Xflip, d.Yflip);
                             };
                bdc.Click = (p) => {
                                ( (ImageButton<LevelObjectPieceLayoutPiece>) objectFrameworkArea.Data.ListOfPieces.Controls[objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex] ).Data.PieceIndex = bdc.Data.index;

                                foreach (ImageButton<ObjectFrameworkAreaPiece> t in selectPieceScroll.Controls) {
                                    if (t == bdc)
                                        t.Toggled = true;
                                    else
                                        t.Toggled = false;
                                }
                            };

                selectPieceScroll.AddControl(bdc);

                bdc.Data = new ObjectFrameworkAreaPiece {piece = pieceLayout.Pieces[0], index = i};
                bdc.Toggle = true;
                if (pieceLayout.Pieces.Count > 0)
                    bdc.Toggled = pieceLayout.Pieces[0].PieceIndex == i;
            }

            Button showB = null;
            objectFrameworkArea.Data.MainPanel.AddControl(showB = new Button(348, 38, 140, 25, "Show Images") {
                                                                                                                      Color = "rgb(50,150,50)",
                                                                                                                      Click = (p) => { objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.ShowImages = showB.Toggled; }
                                                                                                              });
            showB.Toggle = true;

            objectFrameworkArea.Data.MainPanel.AddControl(new Button(348, 68, 140, 25, "Add Branch") {
                                                                                                             Color = "rgb(50,150,50)",
                                                                                                             Click = (p) => {
                                                                                                                         LevelObjectPieceLayoutPiece pc;
                                                                                                                         objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.PieceLayout.Pieces.Add(
                                                                                                                                 pc = new LevelObjectPieceLayoutPiece((int) ( objectFrameworkArea.Data.ObjectFramework.Pieces.Count * Math.Random() )));
                                                                                                                         pc.X = (int) ( Math.Random() * objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.PieceLayout.Width );
                                                                                                                         pc.Y = (int) ( Math.Random() * objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.PieceLayout.Height );

                                                                                                                         objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex = objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.PieceLayout.Pieces.Count - 1;

                                                                                                                         buildleftScroll(pieceLayout);
                                                                                                                     }
                                                                                                     });

            buildleftScroll(pieceLayout);

/*
            Data.MainPanel.Data.UpdatePieces = () =>
            {
                ImageButton<ObjectFrameworkAreaPiece> df=null;
                for (var j = 0; j < Data.ListOfPieces.Controls.Count; j++)
                {


                    if (j == Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex)
                    {
                        ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = true;
                        df = ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]);
                    }
                    else
                    {
                        ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = false;
                    }
                }

                for (var j = 0; j < Data.MainPanel.Data.SelectPieceScroll.Controls.Count; j++)
                {
                    df.Data.piece = ??this??;
                    if (df.Data.piece.PieceIndex == j)
                        ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = true;
                    else
                        ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = false;
                }


            };
*/
        }

        private void buildleftScroll(LevelObjectPieceLayout pieceLayout)
        {
            objectFrameworkArea.Data.ListOfPieces.Controls = new List<Element>();
            for (var i = 0; i < pieceLayout.Pieces.Count; i++) {
                ImageButton<LevelObjectPieceLayoutPiece> bd = new ImageButton<LevelObjectPieceLayoutPiece>(null, 0, 0, 0, 0);
                bd.Text = (Func<string>) ( () => { return objectFrameworkArea.Data.ObjectFramework.Pieces[bd.Data.PieceIndex].Name; } );
                bd.OnDraw = (canvas, x, y) => {
                                var pc = objectFrameworkArea.Data.ObjectFramework.Pieces[bd.Data.PieceIndex];
                                var ast = objectFrameworkArea.Data.ObjectFramework.Assets[pc.AssetIndex];
                                if (ast.Frames.Count == 0) return;
                                ast.Frames[0].DrawSimple(canvas, new Point(x, y), bd.Width, bd.Height - 15, pc.Xflip, pc.Yflip);
                            };
                bd.Click = (p) => {
                               for (var j = 0; j < objectFrameworkArea.Data.ListOfPieces.Controls.Count; j++) {
                                   if (bd == objectFrameworkArea.Data.ListOfPieces.Controls[j]) {
                                       ( (ImageButton) objectFrameworkArea.Data.ListOfPieces.Controls[j] ).Toggled = true;
                                       objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex = j;
                                   } else
                                       ( (ImageButton) objectFrameworkArea.Data.ListOfPieces.Controls[j] ).Toggled = false;
                               }

                               for (var j = 0; j < objectFrameworkArea.Data.MainPanel.Data.SelectPieceScroll.Controls.Count; j++) {
                                   var fm = ( (ImageButton<ObjectFrameworkAreaPiece>) objectFrameworkArea.Data.MainPanel.Data.SelectPieceScroll.Controls[j] );
                                   fm.Data.piece = bd.Data;
                                   fm.Toggled = ( j == pieceLayout.Pieces[objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex].PieceIndex );
                               }
                           };
                objectFrameworkArea.Data.ListOfPieces.AddControl(bd);
                bd.Toggle = true;
                bd.Data = pieceLayout.Pieces[i];
                if (i == objectFrameworkArea.Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex) bd.Toggled = true;
            }
        }

        private void loadPiece(LevelObjectPiece piece)
        {
            ClearMainArea();

            objectFrameworkArea.Data.MainPanel.AddControl(new TextArea(25, 25, "Name: ") {Color = "black"});
            TextBox textBox = null;
            objectFrameworkArea.Data.MainPanel.AddControl(textBox = new TextBox(100, 5, 290, 25, piece.Name) {Color = "rgb(50,150,50)", Click = (p) => { piece.Name = textBox.Text; }});

            Button b = null;
            objectFrameworkArea.Data.MainPanel.AddControl(b = new Button(40, 160, 70, 25, "XFlip") {
                                                                                                           Color = "rgb(50,150,50)",
                                                                                                           Click = (p) => { piece.Xflip = b.Toggled; }
                                                                                                   });
            b.Toggle = true;
            b.Toggled = piece.Xflip;

            Button c = null;
            objectFrameworkArea.Data.MainPanel.AddControl(c = new Button(115, 160, 70, 25, "YFlip") {
                                                                                                            Color = "rgb(50,150,50)",
                                                                                                            Click = (p) => { piece.Yflip = c.Toggled; }
                                                                                                    });
            c.Toggle = true;
            c.Toggled = piece.Yflip;

            HScrollBox jd;
            objectFrameworkArea.Data.MainPanel.AddControl(jd = new HScrollBox(20, 35, 70, 4, 112) {BackColor = "rgb(50,60,127)"});
            ImageButton<LevelObjectAsset> bd = null;
            jd.Controls = new List<Element>();

            for (var i = 0; i < objectFrameworkArea.Data.ObjectFramework.Assets.Count; i++) {
                bd = new ImageButton<LevelObjectAsset>(objectFrameworkArea.Data.ObjectFramework.Assets[i], 0, 0, 0, 0);
                ImageButton<LevelObjectAsset> bd1 = bd;
                bd.Text = ( (Func<string>) ( () => bd1.Data.Name ) );

                bd.OnDraw = (canvas, x, y) => {
                                if (bd1.Data.Frames.Count == 0) return;
                                bd1.Data.Frames[0].DrawSimple(canvas, new Point(x, y), bd1.Width, bd1.Height - 15, piece.Xflip, piece.Yflip);
                            };
                bd.Click = (p) => {
                               for (var j = 0; j < jd.Controls.Count; j++) {
                                   if (jd.Controls[j] == bd1) {
                                       if (piece.AssetIndex == j)
                                           bd1.Toggled = true;

                                       piece.AssetIndex = j;
                                       continue;
                                   }
                                   ( (ImageButton) jd.Controls[j] ).Toggled = false;
                               }
                           };

                jd.AddControl(bd);
                bd.Toggle = true;
                if (piece.AssetIndex == i)
                    bd.Toggled = true;
            }
        }

        private void loadAsset(LevelObjectAsset asset)
        {
            ClearMainArea();

            objectFrameworkArea.Data.MainPanel.AddControl(new TextArea(25, 25, "Name: ") {Color = "black"});
            TextBox tb = null;
            objectFrameworkArea.Data.MainPanel.AddControl(tb = new TextBox(100, 5, 290, 25, asset.Name) {Color = "rgb(50,150,50)", Click = (p) => { asset.Name = tb.Text; }});

            objectFrameworkArea.Data.MainPanel.AddControl(new Button(400, 5, 100, 25, "Add Frame") {
                                                                                                           Color = "rgb(50,150,50)",
                                                                                                           Click = (p) => {
                                                                                                                       LevelObjectAssetFrame vs;
                                                                                                                       asset.Frames.Add(vs = new LevelObjectAssetFrame("Frame " + ( asset.Frames.Count + 1 )));
                                                                                                                       vs.Palette = new string[] {"000", "111", "222", "333", "444", "555", "666", "777", "888", "999", "AAA", "BBB", "CCC", "DDD", "EEE", "FFF"};
                                                                                                                       vs.Width = (int) ( Math.Floor(Math.Random() * 40) + 20 );
                                                                                                                       vs.Height = (int) ( Math.Floor(Math.Random() * 40) + 20 );
                                                                                                                       vs.ColorMap = new int[vs.Width][];
                                                                                                                       for (var i = 0; i < vs.Width; i++) {
                                                                                                                           vs.ColorMap[i] = new int[vs.Height];
                                                                                                                           for (var j = 0; j < vs.Height; j++) {
                                                                                                                               vs.ColorMap[i][j] = (int) Math.Floor(Math.Random() * vs.Palette.Length);
                                                                                                                           }
                                                                                                                       }

                                                                                                                       objectFrameworkArea.Data.MainPanel.Data.AssetPopulate(asset);
                                                                                                                   }
                                                                                                   });

            HScrollBox jd;
            objectFrameworkArea.Data.MainPanel.AddControl(jd = new HScrollBox(20, 35, 70, 4, 112) {BackColor = "rgb(50,60,127)"});
            objectFrameworkArea.Data.MainPanel.Data.AssetPopulate = (ast) => {
                                                                        jd.Controls = new List<Element>();
                                                                        for (int index = 0; index < ast.Frames.Count; index++) {
                                                                            LevelObjectAssetFrame t = ast.Frames[index];
                                                                            ImageButton<LevelObjectAssetFrame> bd = null;
                                                                            bd = new ImageButton<LevelObjectAssetFrame>(null, 0, 0, 0, 0);

                                                                            bd.Text = ( (Func<string>) ( () => { return bd.Data.Name; } ) );
                                                                            bd.OnDraw = (canvas, x, y) =>
                                                                                        bd.Data.DrawSimple(canvas, new Point(x, y), bd.Width, bd.Height - 15, false, false);

                                                                            bd.Click = (p) => objectFrameworkArea.Data.MainPanel.Data.LoadFrame(bd.Data);

                                                                            jd.AddControl(bd);
                                                                            bd.Data = t;
                                                                        }
                                                                    };

            objectFrameworkArea.Data.MainPanel.Data.AssetPopulate(asset);

            objectFrameworkArea.Data.MainPanel.AddControl(objectFrameworkArea.Data.MainPanel.Data.FrameArea = new Panel<FrameAreaData>(new FrameAreaData(), 7, 155, 480, 350));
            objectFrameworkArea.Data.MainPanel.Data.FrameArea.Outline = false;

            objectFrameworkArea.Data.MainPanel.Data.LoadFrame = (frame) => {
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.Controls = new List<Element>();
                                                                    //Data.MainPanel.Data.FrameArea.currentFrame = frame;
                                                                    //var ce;
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new TextArea(15, 21, "Name: ") {Color = "black"});
                                                                    TextBox textBox = null;
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new TextBox(90, 0, 395, 25, frame.Name) {
                                                                                                                                                                                 Color = "rgb(50,150,50)",
                                                                                                                                                                                 Click = (p) => { frame.Name = textBox.Text; }
                                                                                                                                                                         });

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new TextArea(0, 275, (Func<string>) ( () => { return "Width:  " + frame.Width; } )) {Color = "Black"});

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 275 - 25, 14, 17, "^") {
                                                                                                                                                                               Color = "rgb(50,150,50)",
                                                                                                                                                                               Click = (p) => { frame.SetWidth(frame.Width + 1); }
                                                                                                                                                                       });
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 275 - 5, 14, 20, "v") {
                                                                                                                                                                              Color = "rgb(50,150,50)",
                                                                                                                                                                              Click = (p) => { frame.SetWidth(frame.Width - 1); }
                                                                                                                                                                      });

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new TextArea(0, 320, ( (Func<string>) ( () => { return "Height: " + frame.Height; } ) )) {Color = "Black"});

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 320 - 25, 14, 17, "^") {
                                                                                                                                                                               Color = "rgb(50,150,50)",
                                                                                                                                                                               Click = (p) => { frame.SetHeight(frame.Height + 1); }
                                                                                                                                                                       });
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new Button(75, 320 - 5, 14, 20, "v") {
                                                                                                                                                                              Color = "rgb(50,150,50)",
                                                                                                                                                                              Click = (p) => { frame.SetHeight(frame.Height - 1); }
                                                                                                                                                                      });

                                                                    Button bt;
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(bt = new Button(230 - 55, 35, 150, 25, "Collide Map") {
                                                                                                                                                                                               Color = "rgb(50,150,50)",
                                                                                                                                                                                               Click = (p) => {
                                                                                                                                                                                                           //    ce.showCollideMap = this.toggled;
                                                                                                                                                                                                       }
                                                                                                                                                                                       });
                                                                    bt.Toggle = true;
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(bt = new Button(390 - 55, 35, 150, 25, "Hurt Map") {
                                                                                                                                                                                            Color = "rgb(50,150,50)",
                                                                                                                                                                                            Click = (p) => {
                                                                                                                                                                                                        //    ce.showHurtMap = this.toggled;
                                                                                                                                                                                                    }
                                                                                                                                                                                    });
                                                                    bt.Toggle = true;

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(objectFrameworkArea.Data.MainPanel.Data.FrameArea.Data.ColorEditor = new ColorEditingArea(230 - 55, 65, 310, 225) {ShowOffset = true});
                                                                    var ce = objectFrameworkArea.Data.MainPanel.Data.FrameArea.Data.ColorEditor;
                                                                    ce.Init(frame);
                                                                    ce.Editor.ShowOutline = false;
                                                                    ce.Editable = false;
                                                                    ce.Click = (p) => { frame.SetOffset(p.X, p.Y); };
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

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(objectFrameworkArea.Data.MainPanel.Data.FrameArea.Data.PalatteArea = new PaletteArea(230 - 55, 300) {Scale = new Point(39, 11), ShowCurrent = false});
                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.Data.PalatteArea.Init(frame.Palette, true);

                                                                    objectFrameworkArea.Data.MainPanel.Data.FrameArea.AddControl(new Button(230 - 55, 305 + 11 * 2, 310, 25, "Edit Map") {
                                                                                                                                                                                                 Color = "rgb(50,150,50)",
                                                                                                                                                                                                 Click = (p) => {
                                                                                                                                                                                                             SonicManager.Instance.UIManager.UIManagerAreas.ColorEditorArea.Data.Init(frame);
                                                                                                                                                                                                             SonicManager.Instance.UIManager.UIManagerAreas.ColorEditorArea.Visible = true;
                                                                                                                                                                                                             SonicManager.Instance.UIManager.UIManagerAreas.ColorEditorArea.Depth = /*this.Depth + 1*/ 10;
                                                                                                                                                                                                             objectFrameworkArea.LoseFocus();
                                                                                                                                                                                                         }
                                                                                                                                                                                         });
                                                                };
        }

        #region Nested type: ObjectFrameworkAreaPiece

        [Serializable]
        public class ObjectFrameworkAreaPiece
        {
            public LevelObjectPieceLayoutPiece piece { get; set; }
            public int index { get; set; }
        }

        #endregion

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
        public ScrollBox ListOfPieces { get; set; }
    }
    [Serializable]
    public class MainPanelData
    {
        public Action<LevelObjectAsset> AssetPopulate { get; set; }
        public Panel<FrameAreaData> FrameArea { get; set; }
        public Action<LevelObjectAssetFrame> LoadFrame { get; set; }
        public HScrollBox SelectPieceScroll { get; set; }
        public Button PriorityDrawing { get; set; }
        public PieceLayoutEditor pe { get; set; }
        public Action UpdatePieces { get; set; }
    }
    [Serializable]
    public class FrameAreaData
    {
        public PaletteArea PalatteArea { get; set; }
        public ColorEditingArea ColorEditor { get; set; }
    }
}