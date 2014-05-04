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
    internal class ObjectFrameworkListController : IController
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

            scope.Watch("model.selectedObject", () =>
            {
                if (this.scope.Model.SelectedObject != null)
                    loadObjectFn(this.scope.Model.SelectedObject);
            });



            SonicEngine.Instance.client.On<DataObject<ObjectModelData[]>>("GetAllObjectsData.Response",
                                                              (data) =>
                                                              {
                                                                  var obj = data.Data;

                                                                  scope.Model.Objects = new List<ObjectModel>(obj.OrderBy(a => a.Name).Select(a => new ObjectModel()
                                                                                                                                                 {
                                                                                                                                                     Name = a.Name,
                                                                                                                                                     Object = ObjectManager.ExtendObject(jQuery.ParseJsonData<LevelObjectData>(a.Data))

                                                                                                                                                 }));
                                                                  scope.Apply();

                                                              });
            this.scope.Callback.CreateFramework += createFrameworkFn;


            SonicEngine.Instance.client.Emit("GetAllObjectsData", "");

        }

        private void createFrameworkFn()
        {

            createUIService.CreateSingleton<ObjectFrameworkEditorScope>(ObjectFrameworkEditorController.View, (scope, elem) =>
            {
                scope.Callback = new ObjectFrameworkEditorScopeCallback();
                scope.Model = new ObjectFrameworkEditorScopeModel();
                scope.Model.ObjectData = new LevelObject("SomeKey");
            });


        }

        private void loadObjectFn(ObjectModel arg)
        {
            var name = arg.Name;
            var objects = SonicManager.Instance.cachedObjects;
            if (objects != null)
            {
                if (objects[name] != null)
                {
                    createUIService.CreateSingleton<ObjectFrameworkEditorScope>(ObjectFrameworkEditorController.View, (scope, elem) =>
                    {
                        scope.Callback = new ObjectFrameworkEditorScopeCallback();
                        scope.Model = new ObjectFrameworkEditorScopeModel();
                        scope.Model.ObjectData = objects[name];
                    });
                    return;
                }
            }

            if (arg.Object.PieceLayouts.Count > 0)
            {
                var pl = arg.Object.PieceLayouts[0];
            //    pl.DrawUI();

            }


            createUIService.CreateSingleton<ObjectFrameworkEditorScope>(ObjectFrameworkEditorController.View, (scope, elem) =>
            {
                scope.Callback = new ObjectFrameworkEditorScopeCallback();
                scope.Model = new ObjectFrameworkEditorScopeModel();
                scope.Model.ObjectData = arg.Object;
            });

            /*
                        var oldTitle = UIManager.UIManager.CurLevelName;

                        UIManager.UIManager.UpdateTitle("Downloading Object:" + name);

                        SonicEngine.Instance.client.Emit("GetObject", new DataObject<string>(name));
                        SonicEngine.Instance.client.On<DataObject<string>>("GetObject.Response",
                                                                           (lvl) =>
                                                                           {
                                                                               UIManager.UIManager.UpdateTitle(oldTitle);
                                                                               var d = ObjectManager.ExtendObject(jQuery.ParseJsonData<LevelObjectData>(lvl.Data));

                                                                               createUIService.CreateSingleton<ObjectFrameworkEditorScope>(ObjectFrameworkEditorController.View, (scope, elem) =>
                                                                               {
                                                                                   scope.Callback = new ObjectFrameworkEditorScopeCallback();
                                                                                   scope.Model = new ObjectFrameworkEditorScopeModel();
                                                                                   scope.Model.ObjectData = d;
                                                                               });

                                                                           });*/

        }

    }
    [Serializable]
    public class ObjectModel
    {
        public string Name { get; set; }
        public LevelObject Object { get; set; }
    }

}