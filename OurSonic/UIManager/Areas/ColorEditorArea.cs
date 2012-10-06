using System;
using OurSonic.Level;
using OurSonic.Utility;
namespace OurSonic.UIManager.Areas
{
    public class ColorEditorArea
    {
        public ColorEditorArea(UIManager uiManager)
        {
            var colorEditorArea = uiManager.ColorEditorArea = new UIArea<ColorEditorAreaData>(new ColorEditorAreaData(), 650, 30, 960, 800) {Closable = true};

            colorEditorArea.Visible = false;
            uiManager.AddArea(colorEditorArea);

            colorEditorArea.Data.ColorEditor = new ColorEditingArea(30, 45, 680, 680) {ShowOffset = false};

            colorEditorArea.AddControl(colorEditorArea.Data.ColorEditor);
            colorEditorArea.AddControl(new Button(770, 70, 150, 22, "Show Outline") {
                                                                                            Color = "rgb(50,150,50)",
                                                                                            Click = (p) => { colorEditorArea.Data.ColorEditor.Editor.ShowOutline = !colorEditorArea.Data.ColorEditor.Editor.ShowOutline; }
                                                                                    });

            Button bt = null;
            colorEditorArea.AddControl(bt = new Button(770, 190, 150, 22, "Modify Hurt Map") {
                                                                                                     Color = "rgb(50,150,50)",
                                                                                                     Click = (p) => {
                                                                                                                 if (colorEditorArea.Data.ColorEditor.ShowHurtMap == false && colorEditorArea.Data.ColorEditor.ShowCollideMap == false) {
                                                                                                                     colorEditorArea.Data.ColorEditor.ShowHurtMap = true;
                                                                                                                     colorEditorArea.Data.ColorEditor.ShowCollideMap = false;
                                                                                                                     bt.Text = "Modify Collide Map";
                                                                                                                 } else if (colorEditorArea.Data.ColorEditor.ShowCollideMap == false) {
                                                                                                                     colorEditorArea.Data.ColorEditor.ShowHurtMap = false;
                                                                                                                     colorEditorArea.Data.ColorEditor.ShowCollideMap = true;
                                                                                                                     bt.Text = "Modify Pixel Map";
                                                                                                                 } else {
                                                                                                                     colorEditorArea.Data.ColorEditor.ShowHurtMap = false;
                                                                                                                     colorEditorArea.Data.ColorEditor.ShowCollideMap = false;
                                                                                                                     bt.Text = "Modify Hurt Map";
                                                                                                                 }
                                                                                                             }
                                                                                             });

            colorEditorArea.AddControl(new TextArea(750, 150, ( (Func<string>) ( () => { return "Line Width:" + colorEditorArea.Data.ColorEditor.Editor.LineWidth; } ) )) {Color = "Black"});

            colorEditorArea.AddControl(new Button(900, 120, 14, 20, "^") {
                                                                                 Color = "rgb(50,150,50)",
                                                                                 Click = (p) => { colorEditorArea.Data.ColorEditor.Editor.LineWidth = Math.Max(colorEditorArea.Data.ColorEditor.Editor.LineWidth + 1, 1); }
                                                                         });
            colorEditorArea.AddControl(new Button(900, 145, 14, 20, "v") {
                                                                                 Color = "rgb(50,150,50)",
                                                                                 Click = (p) => { colorEditorArea.Data.ColorEditor.Editor.LineWidth = Math.Min(colorEditorArea.Data.ColorEditor.Editor.LineWidth - 1, 10); }
                                                                         });
            colorEditorArea.AddControl(colorEditorArea.Data.PaletteArea = new PaletteArea(770, 250) {Scale = new Point(45, 45), ShowCurrent = true});
            colorEditorArea.Data.ColorEditor.PaletteEditor = colorEditorArea.Data.PaletteArea;
            colorEditorArea.Data.Init = (frame) => {
                                            colorEditorArea.Data.ColorEditor.Scale = new Point(700 / frame.Width, 700 / frame.Height);
                                            colorEditorArea.Data.ColorEditor.Init(frame);
                                            colorEditorArea.Data.PaletteArea.Init(frame.Palette, false);
                                        };
        }
    }
    [Serializable]
    public class ColorEditorAreaData
    {
        public ColorEditingArea ColorEditor { get; set; }
        public PaletteArea PaletteArea { get; set; }
        public Action<LevelObjectAssetFrame> Init { get; set; }
    }
}