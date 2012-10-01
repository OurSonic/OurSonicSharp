using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
using OurSonic.UIManager.Areas;
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
        public static string CurLevelName
        {
            get { return _curLevelName; }
            set
            {
                UpdateTitle("- Our Sonic - " + value);

                _curLevelName = value;
            }
        }
        public UIArea<ColorEditorAreaData> ColorEditorArea { get; set; }
        public ObjectFrameworkArea ObjectFrameworkArea { get; set; }
        public UIArea ObjectFrameworkListArea { get; set; }
        public UIArea<LiveObjectsAreaData> LiveObjectsArea { get; set; }

        public UIManager(SonicManager sonicManager, CanvasContext2D mainCanvas, Point scale)
        {
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

        public bool OnClick(jQueryEvent e)
        {
            var cell = Help.GetCursorPosition(e);

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
                    var ec = new Pointer(cell.X - are.X, cell.Y - are.Y);
                    are.OnClick(ec);
                    break;
                }
            }

            if (goodArea.Truthy()) {
                foreach (var are in UIAreas) {
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
                foreach (var are in UIAreas) {
                    if (are.Visible) {
                        are.Depth = 0;
                        are.LoseFocus();
                    }
                }
            }

            sonicManager.UIManager.dragger.Click(e);
            return false;
        }

        public bool OnMouseMove(jQueryEvent e)
        {
            var cell = Help.GetCursorPosition(e);

            var cl = ( UIAreas ).OrderBy((f) => { return -f.Depth; }).ToArray();

            for (var ij = 0; ij < cl.Length; ij++) {
                var are = cl[ij];
                if (are.Dragging.Truthy() || are.IsEditMode() || ( are.Visible && are.Y <= cell.Y &&
                                                                   are.Y + are.Height > cell.Y &&
                                                                   are.X <= cell.X &&
                                                                   are.X + are.Width > cell.X )) {
                    var cell2 = new Pointer(cell.X - are.X, cell.Y - are.Y);
                    return are.OnMouseOver(cell2);
                }
            }

            if (dragger.IsDragging(e)) {
                dragger.MouseMove(e);
                return false;
            }
            dragger.MouseMove(e);

            return false;
        }

        public void OnMouseUp(jQueryEvent e)
        {
            var cell = Help.GetCursorPosition(e, true);

            foreach (var are in UIAreas) {
                var ec = new Pointer(cell.X - are.X, cell.Y - are.Y);
                are.OnMouseUp(ec);
            }

            dragger.MouseUp(e);
        }

        public bool OnMouseScroll(jQueryEvent e)
        {
            int delta = e.Me().wheelDelta ? e.Me().wheelDelta / 40 : e.Me().detail ? -e.Me().detail : 0;

            var cell = Help.GetCursorPosition(e, true);

            foreach (var are in UIAreas) {
                if (are.Visible && are.Y <= cell.Y && are.Y + are.Height > cell.Y && are.X <= cell.X && are.X + are.Width > cell.X) {
                    var cell2 = new Pointer(cell.X - are.X, cell.Y - are.Y, delta);
                    return are.OnScroll(cell2);
                }
            }
            return false;
        }

        public bool OnKeyDown(ElementEvent jQueryEvent)
        {
            foreach (var are in UIAreas) {
                if (are.OnKeyDown(jQueryEvent)) {
                    return true;
                }
            }
            return false;
        }

        public void AddArea(UIArea uiArea)
        {
            uiArea.Construct();
            UIAreas.Add(uiArea);
        }

        public void Draw(CanvasContext2D canvas)
        {
            dragger.Tick();
            canvas.Save();
            var cl = UIAreas.OrderBy(f => f.Depth).ToArray();
            foreach (var are in cl) {
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
    public class UIManagerData
    {
        [IntrinsicProperty]
        public UIManagerDataIndexes Indexes { get; set; }
        [IntrinsicProperty]
        public dynamic SolidTileArea { get; set; } //todo:: to SolidTileArea obejct
        [IntrinsicProperty]
        public dynamic ModifyTilePieceArea { get; set; } //todo:: to ModifyTilePieceArea obejct
    }
    public class UIManagerDataIndexes
    {
        [IntrinsicProperty]
        public int TPIndex { get; set; }
    }
}