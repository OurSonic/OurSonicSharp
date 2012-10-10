using System;
using System.Linq;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;
namespace OurSonic.UIManager.Areas
{
    public class LevelInformationArea
    {
        public LevelInformationArea(UIManager manager)
        {
            var levelInformation = new UIArea(70, 70, 460, 420);
            manager.AddArea(levelInformation);

            levelInformation.AddControl(new TextArea(30, 25, "Level Selector") {Font = UIManager.TextFont, Color = "blue"});
            levelInformation.AddControl(new TextArea(30, 52, ( (Func<string>) ( () => UIManager.CurLevelName ) )) {Font = UIManager.TextFont, Color = "black"});

            levelInformation.AddControl(new Button(320, 70, 100, 22, "Save Level") {Font = UIManager.ButtonFont, Color = "rgb(50,150,50)"});

            levelInformation.AddControl(new Button(320, 105, 135, 22, "Load Empty Level") {
                                                                                                  Font = UIManager.ButtonFont,
                                                                                                  Color = "rgb(50,150,50)",
                                                                                                  Click = (p) => {
                                                                                                              /*  levelManagerArea.visible = true;
loadingText.visible = true;
var index = 0;
var tim = function () {
var max = 188;
if (index == max) {
setTimeout(function () {
alert(_H.stringify(sonicManager.SonicLevel));
sonicManager.uiManager.loadGame(_H.stringify(sonicManager.SonicLevel), sonicManager.mainCanvas);
loadingText.visible = false;
}, 500);
return;
}
setTimeout(tim, 100);

_H.loadSprite("assets/Chunks/Tile" + index++ + ".png", function (image) {
loadingText.text = "Loading " + index + "/" + max;
sonicManager.importChunkFromImage(image);
if (index == max) {
sonicManager.inds = { done: true };
}
});

};
setTimeout(tim, 100);*/
                                                                                                          }
                                                                                          });

            var ctls =
                    levelInformation.AddControl(new ScrollBox(30, 70, 25, 11, 250) {BackColor = "rgb(50, 60, 127)",});
            var loadLevel = (Action<string>) ( name => {
                                                   UIManager.UpdateTitle("Downloading " + name);
                                                   SonicEngine.Instance.client.Emit("LoadLevel.Request", new DataObject<string>(name));
                                                   ;
                                               } );

            SonicEngine.Instance.client.On<DataObject<string>>("LoadLevel.Response",
                                                               (data) => Help.DecodeString<SLData>(data.Data,
                                                                                                   (level) => {
                                                                                                       UIManager.UpdateTitle("Loading: ");

                                                                                                       var sonicManager = SonicManager.Instance;
                                                                                                       sonicManager.Load(level);

                                                                                                       sonicManager.WindowLocation.X = 0;
                                                                                                       sonicManager.WindowLocation.Y = 0;
                                                                                                       sonicManager.BigWindowLocation.X = (int) ( sonicManager.WindowLocation.X - sonicManager.WindowLocation.Width * 0.2 );
                                                                                                       sonicManager.BigWindowLocation.Y = (int) ( sonicManager.WindowLocation.Y - sonicManager.WindowLocation.Height * 0.2 );

                                                                                                       sonicManager.BigWindowLocation.Width = (int) ( sonicManager.WindowLocation.Width * 1.8 );
                                                                                                       sonicManager.BigWindowLocation.Height = (int) ( sonicManager.WindowLocation.Height * 1.8 );
                                                                                                       sonicManager.ClearCache();

                                                                                                       if (sonicManager.CurrentGameState == GameState.Playing)
                                                                                                           SonicEngine.runGame();
                                                                                                       SonicEngine.runGame();
                                                                                                   }));

            SonicEngine.Instance.client.On<DataObject<string[]>>("GetLevels.Response",
                                                                 data => {
                                                                     bool load = true;
                                                                     foreach (var level in data.Data.OrderBy(a => a)) {
                                                                         if (load) {
                                                                             loadLevel(level);
                                                                             load = false;
                                                                         }
                                                                         string area = level;
                                                                         ctls.AddControl(new Button(0, 0, 0, 0, level) {
                                                                                                                               Color = "rgb(50,190,90)",
                                                                                                                               Click = (p) => { loadLevel(area); }
                                                                                                                       });
                                                                     }
                                                                 });
            SonicEngine.Instance.client.Emit("GetLevels.Request", null);

            UIManager.CurLevelName = "Level Not Loaded";
        }
    }
}