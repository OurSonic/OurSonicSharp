using System;
using System.Collections.Generic;
using System.Html;
using System.Text;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Scope.Directive;
using OurSonic.UI.Services;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;

namespace OurSonic.UI.Controllers
{
    
    internal class LevelSelectorController
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

            this.scope.Callback.WindowClosed = () => { Window.Alert("woooo"); };
            this.scope.Callback.LoadLevel += loadLevelFn;
            //scope.SwingAway(SwingDirection.Left, false, null);


            scope.Watch("model.selectedLevel", () => this.scope.Callback.LoadLevel(this.scope.Model.SelectedLevel));


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

                var sonicManager = SonicManager.Instance;
                sonicManager.ClearCache();

                sonicManager.Load(level);

                sonicManager.WindowLocation.X = 0;
                sonicManager.WindowLocation.Y = 0;
                sonicManager.BigWindowLocation.X = (int)(sonicManager.WindowLocation.X - sonicManager.WindowLocation.Width * 0.2);
                sonicManager.BigWindowLocation.Y = (int)(sonicManager.WindowLocation.Y - sonicManager.WindowLocation.Height * 0.2);

                sonicManager.BigWindowLocation.Width = (int)(sonicManager.WindowLocation.Width * 1.8);
                sonicManager.BigWindowLocation.Height = (int)(sonicManager.WindowLocation.Height * 1.8);

                if (sonicManager.CurrentGameState == GameState.Playing)
                    SonicEngine.runGame();
                //#if RELEASE
                SonicEngine.runGame();

                sonicManager.CacheTiles();

                //#endif
            });
        }

    }
}
