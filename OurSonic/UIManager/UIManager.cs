using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
using OurSonic.UIManager.Areas;
using OurSonic.Utility;
using jQueryApi;
namespace OurSonic.UIManager
{
    public class UIManager
    {
        public const string SmallTextFont = "8pt Calibri ";
        public const string ButtonFont = "12pt Calibri ";
        public const string SmallButtonFont = "13pt Arial bold ";
        public const string TextFont = "11pt Arial bold ";
        private static string _curLevelName;
        private readonly CanvasContext2D mainCanvas;
        private readonly Point scale;
        public readonly SonicManager sonicManager;
        private List<string> messages = new List<string>();
        [IntrinsicProperty]
        public List<UIArea> UIAreas { get; set; }
        [IntrinsicProperty]
        public Dragger dragger { get; set; }
        [IntrinsicProperty]
        public UIManagerData Data { get; set; }
        [IntrinsicProperty]
        public UIArea<ColorEditorAreaData> ColorEditorArea { get; set; }
        [IntrinsicProperty]
        public ObjectFrameworkArea ObjectFrameworkArea { get; set; }
        [IntrinsicProperty]
        public UIArea ObjectFrameworkListArea { get; set; }
        [IntrinsicProperty]
        public UIArea<LiveObjectsAreaData> LiveObjectsArea { get; set; }
        [IntrinsicProperty]
        public static UIManager Instance { get; set; }
        [IntrinsicProperty]
        private UIArea[] canvasDepths { get; set; }
        public static string CurLevelName
        {
            get { return _curLevelName; }
            set
            {
                UpdateTitle("- Our Sonic - " + value);

                _curLevelName = value;
            }
        }

        public UIManager(SonicManager sonicManager, CanvasContext2D mainCanvas, Point scale)
        {
            Instance = this;
            mainCanvas.Font = TextFont;
            UIAreas = new List<UIArea>();

            this.sonicManager = sonicManager;
            this.mainCanvas = mainCanvas;
            this.scale = scale;
            dragger = new Dragger((xsp, ysp) => {
                                      sonicManager.WindowLocation.X += (int) xsp;
                                      sonicManager.WindowLocation.Y += (int) ysp;

                                      sonicManager.BigWindowLocation.X = sonicManager.WindowLocation.X;
                                      sonicManager.BigWindowLocation.Y = sonicManager.WindowLocation.Y;
                                  });

            new LevelInformationArea(this);
            new ColorEditorArea(this);
            new ObjectFrameworkArea(this);
            new ObjectFrameworkListArea(this);
            new LiveObjectsArea(this);
        }

        public bool OnClick(Pointer cell)
        {
            UIArea goodArea = null;
            var cl = ( UIAreas ).OrderBy((f) => -f.Depth).ToArray();
            for (var ij = 0; ij < cl.Length; ij++) {
                var are = cl[ij];
                if (are.Visible &&
                    ( are.IsEditMode()
                              ? are.Y - are.EditorEngine.MaxSize() <= cell.Y &&
                                are.Y + are.EditorEngine.MaxSize() + are.Height > cell.Y &&
                                are.X - are.EditorEngine.MaxSize() <= cell.X &&
                                are.X + are.EditorEngine.MaxSize() + are.Width > cell.X
                              : are.Y <= cell.Y &&
                                are.Y + are.Height > cell.Y &&
                                are.X <= cell.X &&
                                are.X + are.Width > cell.X )) {
                    goodArea = are;
                    var ec = new Pointer(cell.X - are.X, cell.Y - are.Y, 0, cell.Right);
                    are.OnClick(ec);
                    break;
                }
            }

            if (goodArea.Truthy()) {
                for (int index = 0; index < UIAreas.Count; index++) {
                    var are = UIAreas[index];
                    if (goodArea == are) {
                        are.Depth = 1;
                        are.Focus(cell);
                    } else {
                        if (are.Visible) {
                            are.Depth = 0;
                            are.LoseFocus();
                        }
                    }
                }

                return true;
            } else {
                for (int index = 0; index < UIAreas.Count; index++) {
                    var are = UIAreas[index];
                    if (are.Visible) {
                        are.Depth = 0;
                        are.LoseFocus();
                    }
                }
            }

            sonicManager.UIManager.dragger.Click(cell);
            return false;
        }

        public bool OnMouseMove(Pointer cell)
        {
            var cl = ( UIAreas ).OrderBy((f) => { return -f.Depth; }).ToArray();

            for (var ij = 0; ij < cl.Length; ij++) {
                var are = cl[ij];
                if (are.Dragging.Truthy() || are.IsEditMode() || ( are.Visible && are.Y <= cell.Y &&
                                                                   are.Y + are.Height > cell.Y &&
                                                                   are.X <= cell.X &&
                                                                   are.X + are.Width > cell.X )) {
                    var cell2 = new Pointer(cell.X - are.X, cell.Y - are.Y, 0, cell.Right);
                    return are.OnMouseOver(cell2);
                }
            }

            if (dragger.IsDragging(cell)) {
                dragger.MouseMove(cell);
                return false;
            }
            dragger.MouseMove(cell);

            return false;
        }

        public void OnMouseUp(Pointer cell)
        {
            foreach (var are in UIAreas) {
                var ec = new Pointer(cell.X - are.X, cell.Y - are.Y, 0, cell.Right);
                are.OnMouseUp(ec);
            }

            dragger.MouseUp(cell);
        }

        public bool OnMouseScroll(jQueryEvent e)
        {
            int delta = e.Me().wheelDelta ? e.Me().wheelDelta / 40 : e.Me().detail ? -e.Me().detail : 0;

            var cell = Help.GetCursorPosition(e);

            for (int index = 0; index < UIAreas.Count; index++) {
                var are = UIAreas[index];
                if (are.Visible && are.Y <= cell.Y && are.Y + are.Height > cell.Y && are.X <= cell.X && are.X + are.Width > cell.X) {
                    var cell2 = new Pointer(cell.X - are.X, cell.Y - are.Y, delta, cell.Right);
                    return are.OnScroll(cell2);
                }
            }
            return false;
        }

        public bool OnKeyDown(ElementEvent jQueryEvent)
        {
            for (int index = 0; index < UIAreas.Count; index++) {
                var are = UIAreas[index];
                if (are.OnKeyDown(jQueryEvent)) return true;
            }
            return false;
        }

        public void AddArea(UIArea uiArea)
        {
            uiArea.Construct();
            UIAreas.Add(uiArea);

            UpdateDepth();
        }

        public void UpdateDepth()
        {
            canvasDepths = UIAreas.OrderBy(f => f.Depth).ToArray();
        }

        public void Draw(CanvasContext2D canvas)
        {
            dragger.Tick();
            canvas.Save();

            for (int index = 0; index < canvasDepths.Length; index++) {
                var are = canvasDepths[index];
                are.Draw(canvas);
            }

            if (true /*DEBUGs*/) {
                for (var i = 0; i < messages.Count; i++) {
                    canvas.FillText(messages[i], 10, 25 + i * 30);
                }
            }

            canvas.Restore();
        }

        public static void UpdateTitle(string title)
        {
            Document.Title = title;
        }
    }
    [Serializable]
    public class UIManagerData
    {
        public UIManagerDataIndexes Indexes { get; set; }
        public dynamic SolidTileArea { get; set; } //todo:: to SolidTileArea obejct
        public dynamic ModifyTilePieceArea { get; set; } //todo:: to ModifyTilePieceArea obejct
    }
    [Serializable]
    public class UIManagerDataIndexes
    {
        public int TPIndex { get; set; }
    }
}