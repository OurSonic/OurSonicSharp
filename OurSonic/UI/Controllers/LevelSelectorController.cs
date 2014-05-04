using System;
using System.Collections.Generic;
using System.Html;
using System.Text;
using OurSonic.Level;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Scope.Directive;
using OurSonic.UI.Services;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;

namespace OurSonic.UI.Controllers
{

    internal class LevelSelectorController : IController
    {
        public const string Name = "LevelSelectorController";
        public const string View = "LevelSelector";
        private readonly LevelSelectorScope scope;
        private readonly CreateUIService createUIService;

        public LevelSelectorController(LevelSelectorScope scope, CreateUIService createUIService)
        {
            this.scope = scope;
            this.scope.Visible = true;
            this.createUIService = createUIService;
            this.scope.Model = new LevelSelectorScopeModel();
            this.scope.Callback = new LevelSelectorScopeCallback();
            scope.Model.LoadingStatus = "Level Not Loaded";

            this.scope.Callback.WindowClosed = () => {   };
            this.scope.Callback.LoadLevel += loadLevelFn;
            //scope.SwingAway(SwingDirection.Left, false, null);


            scope.Watch("model.selectedLevel", () =>
                                               {
                                                   if (this.scope.Model.SelectedLevel != null)
                                                       this.scope.Callback.LoadLevel(this.scope.Model.SelectedLevel);
                                               });


            bool neverGot = true;
            SonicEngine.Instance.client.On<DataObject<string>>("LoadLevel.Response", LoadLevel);
            Window.SetTimeout(() =>
            {
                if (neverGot)
                {
                    scope.Model.LoadingStatus = "Connection Failed, static level loaded";
                    LoadLevel(new DataObject<string>(Window.Instance.Me().STATICLEVEL));

                    scope.Apply();

                }
            }, 3000);

            SonicEngine.Instance.client.On<DataObject<string[]>>("GetLevels.Response",
                                                                 data =>
                                                                 {
                                                                     neverGot = false;
                                                                     scope.Model.Levels = new List<LevelModel>(data.Data.OrderBy(a => a).Select(a => new LevelModel() { Name = a }));
                                                                     scope.Apply();

                                                                 });
            SonicEngine.Instance.client.Emit("GetLevels.Request", null);


        }

        private void loadLevelFn(LevelModel arg)
        {
            scope.Model.LoadingStatus = "Downloading " + arg.Name;

            SonicEngine.Instance.client.Emit("LoadLevel.Request", new DataObject<string>(arg.Name));
        }

        //todo move to service
        private void LoadLevel(DataObject<string> data)
        {
            Help.DecodeString<SLData>(data.Data, (level) =>
            {
                scope.Model.LoadingStatus = ("Loading: ");
                SonicEngine.Instance.RunSonic(level);


                createUIService.CreateSingleton<TileEditorScope>(TileEditorController.View, (_scope, elem) =>
                {
                    _scope.Callback = new TileEditorScopeCallback();
                    _scope.Model = new TileEditorScopeModel();

                    _scope.Model.TileChunks = SonicManager.Instance.SonicLevel.TileChunks;
//                    _scope.Model.TilePieces = SonicManager.Instance.SonicLevel.TilePieces;
                });


            });
        }

    }
}
