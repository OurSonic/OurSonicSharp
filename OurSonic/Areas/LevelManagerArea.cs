using System.Html;
using OurSonic.Level.Tiles;
using OurSonic.UIManager;
namespace OurSonic.Areas
{
    public class LevelManagerArea
    {
        public UIArea LevelManager;

        public LevelManagerArea(UIManager.UIManager uiManager)
        {

            LevelManager = uiManager.UIManagerAreas.LevelManagerArea = new UIArea(Window.OuterWidth - 440, 100, 390, 390) { Closable = true };
            LevelManager.Visible = true;

            uiManager.AddArea(LevelManager);
            LevelManager.AddControl(new TextArea(30, 25, "Level Manager") { Color = "blue" });

            LevelManager.AddControl(new Button(50, 70, 120, 28, "Live Objects") { Click = (p) => { new LiveObjectsArea(uiManager); } });
            LevelManager.AddControl(new Button(50, 110, 120, 28, "Debug Animations")
            {
                Click = (p) =>
                {

                    SonicManager.Instance.TileChunkDebugDrawOptions.OutlineChunk = !SonicManager.Instance.TileChunkDebugDrawOptions.OutlineChunk;
                    SonicManager.Instance.TileChunkDebugDrawOptions.ShowPaletteAnimationData = !SonicManager.Instance.TileChunkDebugDrawOptions.ShowPaletteAnimationData;
                    SonicManager.Instance.TileChunkDebugDrawOptions.ShowBaseData = !SonicManager.Instance.TileChunkDebugDrawOptions.ShowBaseData;
                    SonicManager.Instance.TileChunkDebugDrawOptions.ShowTileAnimationData = !SonicManager.Instance.TileChunkDebugDrawOptions.ShowTileAnimationData;

                }
            });
        }
    }
}