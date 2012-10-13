using System;
using System.Collections.Generic;
using System.Html;
using OurSonic.Level.Objects;
using jQueryApi;
namespace OurSonic.UIManager.Areas
{
    public class LiveObjectsArea
    {
        public LiveObjectsArea(UIManager uiManager)
        {
            var liveObjectsArea = uiManager.UIManagerAreas.LiveObjectsArea = new UIArea<LiveObjectsAreaData>(new LiveObjectsAreaData(), 947, 95, 770, 700) {Closable = true};
            liveObjectsArea.Visible = true;
            uiManager.AddArea(liveObjectsArea);
            liveObjectsArea.AddControl(new TextArea(30, 25, "Live Objects") {Color = "blue"});
            HScrollBox scl;
            liveObjectsArea.AddControl(scl = new HScrollBox(20, 60, 85, 8, 85) {BackColor = "rgb(50,150,50)"});

            liveObjectsArea.Data.Populate = (liveObjects) => {
                                                foreach (Element t in scl.Controls) {
                                                    ( (ImageButton<LivePopulateModel>) t ).Data.@checked = false;
                                                }

                                                foreach (var lo in liveObjects) {
                                                    var satisfied = false;
                                                    foreach (Element t in scl.Controls) {
                                                        if (lo.Index == ( (ImageButton<LivePopulateModel>) t ).Data.@object.Index) {
                                                            ( (ImageButton<LivePopulateModel>) t ).Data.@checked = true;
                                                            satisfied = true;
                                                            break;
                                                        }
                                                    }
                                                    if (!satisfied) {
                                                        var obj = lo;

                                                        ImageButton<LivePopulateModel> dm = null;
                                                        ImageButton<LivePopulateModel> imageButton = new ImageButton<LivePopulateModel>(new LivePopulateModel(), 0, 0, 0, 0);
                                                        imageButton.Text = obj.ObjectData.Description + "(" + obj.ObjectData.Key + ")";
                                                        imageButton.OnDraw = (canv, x, y) => { obj.Draw(canv, x + dm.Width / 2, y + dm.Height / 2, false); };
                                                        imageButton.Click = (p) => { liveObjectsArea.Data.DebugConsole.Data.Populate(obj); };
                                                        scl.AddControl(dm = imageButton);
                                                        dm.Data.@checked = true;
                                                        dm.Data.@object = obj;
                                                    }
                                                }
                                                for (var i = scl.Controls.Count - 1; i >= 0; i--) {
                                                    if (!( (ImageButton<LivePopulateModel>) scl.Controls[i] ).Data.@checked)
                                                        scl.Controls.RemoveAt(i);
                                                }
                                            };
            liveObjectsArea.AddControl(liveObjectsArea.Data.DebugConsole = new Panel<DebugConsoleData>(new DebugConsoleData(), 20, 200, 730, 450));

            liveObjectsArea.Data.DebugConsole.Data.Populate = (obj) => {
                                                                  liveObjectsArea.Data.DebugConsole.Clear();
                                                                  liveObjectsArea.Data.DebugConsole.AddControl(liveObjectsArea.Data.DebugConsole.Data.Watch = new ScrollBox(10, 15, 30, 12, 210) {BackColor = "rgb(50,150,50)"});

                                                                  var o = JsDictionary<string, object>.GetDictionary(obj);

                                                                  foreach (var pr in o) {
                                                                      if (true /*!Help.IsFunction(pr.Value)*/) {
                                                                          KeyValuePair<string, object> pr1 = pr;
                                                                          liveObjectsArea.Data.DebugConsole.Data.Watch.AddControl(new Button(0, 0, 0, 0, (Func<string>) ( () => pr1.Key + ": " + pr1.Value )) {Color = "rgb(50,190,90)"});
                                                                      }
                                                                  }

                                                                  foreach (LevelObjectInfo t in SonicManager.Instance.SonicLevel.Objects) {
                                                                      t.ConsoleLog = null;
                                                                  }

                                                                  obj.ConsoleLog = (txt) => {
                                                                                       liveObjectsArea.Data.DebugConsole.Data.Element.InnerHTML = txt.Join("\n");
                                                                                       liveObjectsArea.Data.DebugConsole.Data.Element.ScrollTop = liveObjectsArea.Data.DebugConsole.Data.Element.ScrollHeight;
                                                                                   };

                                                                  liveObjectsArea.Data.DebugConsole.AddControl(new HtmlBox(270, 15) {
                                                                                                                                            Width = 445,
                                                                                                                                            Height = 430,
                                                                                                                                            Init = () => {
                                                                                                                                                       var gm = liveObjectsArea.Data.DebugConsole.Data.Element;
                                                                                                                                                       if (gm != null)
                                                                                                                                                           gm.ParentNode.RemoveChild(gm);

                                                                                                                                                       jQuery.FromElement(Document.Body).Append(
                                                                                                                                                               @"<textarea id=""console"" name=""console"" style=""position:absolute;width:445px;height:430px;""></textarea>");
                                                                                                                                                       liveObjectsArea.Data.DebugConsole.Data.Element = Document.GetElementById("console");
                                                                                                                                                   },
                                                                                                                                            UpdatePosition = (x, y) => {
                                                                                                                                                                 var scroller = liveObjectsArea.Data.DebugConsole.Data.Element;
                                                                                                                                                                 if (scroller.Style.Left == x + "px" && scroller.Style.Top == y + "px")
                                                                                                                                                                     return;
                                                                                                                                                                 scroller.Style.Left = x + "px";
                                                                                                                                                                 scroller.Style.Top = y + "px";
                                                                                                                                                             },
                                                                                                                                            _Focus = () => {
                                                                                                                                                         var sc = liveObjectsArea.Data.DebugConsole.Data.Element;
                                                                                                                                                         if (sc != null)
                                                                                                                                                             sc.Style.Visibility = "visible";
                                                                                                                                                     },
                                                                                                                                            _Hide = () => {
                                                                                                                                                        var sc = liveObjectsArea.Data.DebugConsole.Data.Element;
                                                                                                                                                        sc.Blur();
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
                                                              };
        }
    }
    [Serializable]
    public class LivePopulateModel
    {
        public bool @checked { get; set; }
        public LevelObjectInfo @object { get; set; }
    }
    [Serializable]
    public class DebugConsoleData
    {
        public Action<LevelObjectInfo> Populate { get; set; }
        public ScrollBox Watch { get; set; }
        public System.Html.Element Element { get; set; }
    }
    [Serializable]
    public class LiveObjectsAreaData
    {
        public Panel<DebugConsoleData> DebugConsole { get; set; }
        public Action<List<LevelObjectInfo>> Populate { get; set; }
    }
}