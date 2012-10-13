using System;
using OurSonic.Level;
using OurSonic.Level.Tiles;
using OurSonic.Utility;
namespace OurSonic.UIManager.Areas
{
    public class LevelManagerArea
    { 

        public LevelManagerArea(UIManager uiManager)
        {
            var levelManagerArea = uiManager.UIManagerAreas.LevelManagerArea = new UIArea(850, 100, 390, 390) { Closable = true };
            levelManagerArea.Visible = true;

            uiManager.AddArea(levelManagerArea);
            levelManagerArea.AddControl(new TextArea(30, 25, "Level Manager") {Color = "blue"});

             
            levelManagerArea.AddControl(new Button(50,70,120,28,"Live Objects"){Click=(p)=> {
                                                                                          new LiveObjectsArea(uiManager);

                                                                                      }}); 
        }

     }
}