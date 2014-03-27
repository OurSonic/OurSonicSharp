using System;
using System.Collections.Generic;
using System.Html;
using jQueryApi;
using OurSonic.Level.Objects;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services;
using OurSonic.UIManager;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;
using Element = OurSonic.UIManager.Element;

namespace OurSonic.UI.Controllers
{
    internal class ObjectFrameworkListController
    {
        public const string Name = "ObjectFrameworkListController";
        public const string View = "ObjectFrameworkList";
        private readonly ObjectFrameworkListScope scope;
        private readonly CreateUIService createUIService;

        public ObjectFrameworkListController(ObjectFrameworkListScope scope, CreateUIService createUIService)
        {
            this.scope = scope;
            this.scope.Visible = true;
            this.createUIService = createUIService;
            this.scope.Model = new ObjectFrameworkListScopeModel();
            this.scope.Callback = new ObjectFrameworkListScopeCallback();

            this.scope.Callback.LoadObject += loadObjectFn;

            scope.Watch("model.selectedObject", () => loadObjectFn(this.scope.Model.SelectedObject));



            Action getObjects = () =>
            {
                SonicEngine.Instance.client.Emit("GetAllObjects", "");
                SonicEngine.Instance.client.On<DataObject<string[]>>("GetAllObjects.Response",
                                                                     (data) =>
                                                                     {
                                                                         var obj = data.Data;

                                                                         scope.Model.Objects = new List<ObjectModel>(obj.OrderBy(a => a).Select(a => new ObjectModel() { Name = a }));
                                                                         scope.Apply();

                                                                     });
            };


            this.scope.Callback.CreateFramework += createFrameworkFn;
            this.scope.Callback.SaveFramework += saveFrameworkFn;
            getObjects();

        }

        private void saveFrameworkFn()
        {
         /*   var oldTitle = UIManager.UIManager.CurLevelName;
            UIManager.UIManager.UpdateTitle("Saving Object");

            var k = uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Key;
            var o = uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.oldKey ??
                    uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework.Key;
            var v = Help.Stringify(uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Data.ObjectFramework);

            SonicEngine.Instance.client.Emit("SaveObject", new SaveObjectModel { Key = k, OldKey = o, Data = v });
            SonicEngine.Instance.client.On<bool>("SaveObject.Response", (data) => { UIManager.UIManager.UpdateTitle(oldTitle); });

            getObjects();*/

        }

        private void createFrameworkFn()
        {
/*
            uiManager.UIManagerAreas.ObjectFrameworkArea.Populate(new LevelObject("SomeKey"));
            uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
*/

        }

        private void loadObjectFn(ObjectModel arg)
        {
/*
            var objects = SonicManager.Instance.cachedObjects;
            if (objects != null)
            {
                if (objects[name] != null)
                {
                    uiManager.UIManagerAreas.ObjectFrameworkArea.Populate(objects[name]);
                    uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                    return;
                }
            }

            var oldTitle = UIManager.UIManager.CurLevelName;

            UIManager.UIManager.UpdateTitle("Downloading Object:" + name);

            SonicEngine.Instance.client.Emit("GetObject", new DataObject<string>(name));
            SonicEngine.Instance.client.On<DataObject<string>>("GetObject.Response",
                                                               (lvl) =>
                                                               {
                                                                   UIManager.UIManager.UpdateTitle(oldTitle);
                                                                   var d = ObjectManager.ExtendObject(jQuery.ParseJsonData<LevelObjectData>(lvl.Data));
                                                                   uiManager.UIManagerAreas.ObjectFrameworkArea.Populate(d);
                                                                   uiManager.UIManagerAreas.ObjectFrameworkArea.objectFrameworkArea.Visible = true;
                                                               });
*/

        }

    }
}