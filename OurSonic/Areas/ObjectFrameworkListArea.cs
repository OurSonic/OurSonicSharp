using System;
using System.Collections.Generic;
using System.Linq;
using OurSonic.Level.Objects;
using OurSonic.UIManager;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;
using jQueryApi;
namespace OurSonic.Areas
{
    public class ObjectFrameworkListArea
    {
        public ObjectFrameworkListArea(UIManager.UIManager uiManager)
        {
            Action<string> loadObject = null;

            var objectFrameworkListArea = uiManager.UIManagerAreas.ObjectFrameworkListArea = new UIArea(90, 500, 390, 300) {Closable = true};
            objectFrameworkListArea.Visible = true;

            uiManager.AddArea(objectFrameworkListArea);
            objectFrameworkListArea.AddControl(new TextArea(30, 25, "Object Frameworks") {Color = "blue"});
            ScrollBox fList;
            objectFrameworkListArea.AddControl(fList = new ScrollBox(30, 90, 25, 6, 315) {BackColor = "rgb(50,60,127)"});
            objectFrameworkListArea.AddControl(new Button(35, 50, 160, 25, "Create Framework") {
                                                                                                       Color = "rgb(50,150,50)",
                                                                                                       Click = (p) => {
                                                                                                                   uiManager.UIManagerAreas.ObjectFrameworkArea.Populate(new LevelObject("SomeKey"));
                                                                                                                   uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
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
                                                                                                                  var oldTitle = UIManager.UIManager.CurLevelName;
                                                                                                                  UIManager.UIManager.UpdateTitle("Saving Object");

                                                                                                                  var k = uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Key;
                                                                                                                  var o = uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.oldKey ??
                                                                                                                          uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Key;
                                                                                                                  var v = Help.Stringify(uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework);

                                                                                                                  SonicEngine.Instance.client.Emit("SaveObject", new SaveObjectModel {Key = k, OldKey = o, Data = v});
                                                                                                                  SonicEngine.Instance.client.On<bool>("SaveObject.Response", (data) => { UIManager.UIManager.UpdateTitle(oldTitle); });

                                                                                                                  getObjects();
                                                                                                              }
                                                                                              });

            getObjects();
            loadObject = (name) => {
                             var objects = SonicManager.Instance.cachedObjects;
                             if (objects != null) {
                                 if (objects[name] != null) {
                                     uiManager.UIManagerAreas.ObjectFrameworkArea.Populate(objects[name]);
                                     uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                                     return;
                                 }
                             }

                             var oldTitle = UIManager.UIManager.CurLevelName;

                             UIManager.UIManager.UpdateTitle("Downloading Object:" + name);

                             SonicEngine.Instance.client.Emit("GetObject", new DataObject<string>(name));
                             SonicEngine.Instance.client.On<DataObject<string>>("GetObject.Response",
                                                                                (lvl) => {
                                                                                    UIManager.UIManager.UpdateTitle(oldTitle);
                                                                                    var d = ObjectManager.ExtendObject(jQuery.ParseJsonData<LevelObjectData>(lvl.Data));
                                                                                    uiManager.UIManagerAreas.ObjectFrameworkArea.Populate(d);
                                                                                    uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                                                                                });
                         };
        }
    }
}