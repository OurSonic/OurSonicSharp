using System;
using System.Collections.Generic;
using System.Linq;
using OurSonic.Level;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;
using jQueryApi;
namespace OurSonic.UIManager.Areas
{
    public class ObjectFrameworkListArea
    {
        public ObjectFrameworkListArea(UIManager uiManager)
        {
            Action<string> loadObject = null;

            var size = 40 * 4;

            var objectFrameworkListArea = uiManager.ObjectFrameworkListArea = new UIArea(90, 500, 390, 300) {Closable = true};
            objectFrameworkListArea.Visible = true;

            uiManager.AddArea(objectFrameworkListArea);
            objectFrameworkListArea.AddControl(new TextArea(30, 25, "Object Frameworks") {Color = "blue"});
            ScrollBox fList;
            objectFrameworkListArea.AddControl(fList = new ScrollBox(30, 90, 25, 6, 315) {BackColor = "rgb(50,60,127)"});
            objectFrameworkListArea.AddControl(new Button(35, 50, 160, 25, "Create Framework") {
                                                                                                       Color = "rgb(50,150,50)",
                                                                                                       Click = (p) => {
                                                                                                                   uiManager.ObjectFrameworkArea.Populate(new LevelObject("SomeKey"));
                                                                                                                   uiManager.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                                                                                                               }
                                                                                               });
            Action getObjects = () => {
                                    SonicEngine.Instance.client.Emit("GetAllObjects", "");
                                    SonicEngine.Instance.client.On<DataObject<string[]>>("GetAllObjects.Response",
                                                                                         (data) => {
                                                                                             var obj = data.Data;

                                                                                             fList.Controls = new List<Element>();
                                                                                             foreach (var itm in obj.OrderBy(a => a)) {
                                                                                                 Button d;
                                                                                                 string name = itm;
                                                                                                 fList.AddControl(d = new Button(0, 0, 0, 0, itm) {
                                                                                                                                                          Color = "rgb(50,190,90)",
                                                                                                                                                          Click = (p) => { loadObject(name); }
                                                                                                                                                  });
                                                                                             }
                                                                                         });
                                };

            objectFrameworkListArea.AddControl(new Button(200, 50, 160, 25, "Save Framework") {
                                                                                                      Color = "rgb(50,150,50)",
                                                                                                      Click = (p) => {
                                                                                                                  var oldTitle = UIManager.CurLevelName;
                                                                                                                  UIManager.UpdateTitle("Saving Object");

                                                                                                                  var k = uiManager.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Key;
                                                                                                                  var o = uiManager.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.oldKey ?? uiManager.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Key;
                                                                                                                  var v = Help.Stringify(uiManager.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework);

                                                                                                                  SonicEngine.Instance.client.Emit("SaveObject", new SaveObjectModel {Key = k, OldKey = o, Data = v});
                                                                                                                  SonicEngine.Instance.client.On<bool>("SaveObject.Response", (data) => { UIManager.UpdateTitle(oldTitle); });

                                                                                                                  getObjects();
                                                                                                              }
                                                                                              });

            getObjects();
            loadObject = (name) => {
                             var objects = SonicManager.Instance.cachedObjects;
                             if (objects != null) {
                                 if (objects[name] != null) {
                                     uiManager.ObjectFrameworkArea.Populate(objects[name]);
                                     uiManager.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                                     return;
                                 }
                             }

                             var oldTitle = UIManager.CurLevelName;

                             UIManager.UpdateTitle("Downloading Object:" + name);

                             SonicEngine.Instance.client.Emit("GetObject", new DataObject<string>(name));
                             SonicEngine.Instance.client.On<DataObject<string>>("GetObject.Response",
                                                                                (lvl) => {
                                                                                    UIManager.UpdateTitle(oldTitle);
                                                                                    var d = ObjectManager.ExtendObject(jQuery.ParseJsonData<LevelObjectData>(lvl.Data));
                                                                                    uiManager.ObjectFrameworkArea.Populate(d);
                                                                                    uiManager.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                                                                                });
                         };
        }
    }
}