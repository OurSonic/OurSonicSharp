using System.Html;
using System.Html.Media.Graphics;
using jQueryApi;
namespace OurSonic
{
    public class SonicEngine
    {
        public int canvasHeight;
        public int canvasWidth;
        private bool fullscreenMode;
        private CanvasInformation gameCanvas;
        private string gameCanvasName = "gameLayer";
        private jQueryEvent lastMouseMove;
        private SonicManager sonicManager;
        private CanvasInformation uiCanvas;
        private string uiCanvasName = "uiLayer";

        public SonicEngine()
        {
            /*var pl = @"";
            Window.Instance.Me().console.log(new Compressor().CompressText(pl));*/
            var gameCanvasItem = jQuery.Select(string.Format("#{0}", gameCanvasName));
            gameCanvas =
                    new CanvasInformation(
                            (CanvasContext2D) gameCanvasItem[0].As<CanvasElement>().GetContext(Rendering.Render2D),
                            gameCanvasItem);
            var uiCanvasItem = jQuery.Select(string.Format("#{0}", uiCanvasName));
            uiCanvas =
                    new CanvasInformation(
                            (CanvasContext2D) uiCanvasItem[0].As<CanvasElement>().GetContext(Rendering.Render2D), uiCanvasItem);

            canvasWidth = 0;
            canvasHeight = 0;

            uiCanvas.DomCanvas.MouseDown(canvasOnClick);
            uiCanvas.DomCanvas.MouseUp(canvasMouseUp);
            uiCanvas.DomCanvas.MouseMove(canvasMouseMove);

            uiCanvas.DomCanvas.Bind("touchstart", canvasOnClick);
            uiCanvas.DomCanvas.Bind("touchend", canvasMouseUp);
            uiCanvas.DomCanvas.Bind("touchmove", canvasMouseMove);

            uiCanvas.DomCanvas.Bind("DOMMouseScroll", handleScroll);
            uiCanvas.DomCanvas.Bind("mousewheel", handleScroll);
            uiCanvas.DomCanvas.Bind("contextmenu", (e) => e.PreventDefault());

            jQuery.Document.Keydown(e => {
                                        if (sonicManager.SonicToon == null)
                                            sonicManager.UIManager.OnKeyDown(e);
                                    });

            jQuery.Document.Keydown(a => {
                                        if (a.Me().keyCode == 37) {
                                            sonicManager.WindowLocation.X -= 128;
                                            sonicManager.BigWindowLocation.X = sonicManager.WindowLocation.Y;
                                        }
                                        if (a.Me().keyCode == 38) {
                                            sonicManager.WindowLocation.Y -= 128;
                                            sonicManager.BigWindowLocation.Y = sonicManager.WindowLocation.Y;
                                        }
                                        if (a.Me().keyCode == 39) {
                                            sonicManager.WindowLocation.X += 128;
                                            sonicManager.BigWindowLocation.X = sonicManager.WindowLocation.Y;
                                        }
                                        if (a.Me().keyCode == 40) {
                                            sonicManager.WindowLocation.Y += 128;
                                            sonicManager.BigWindowLocation.Y = sonicManager.WindowLocation.Y;
                                        }
                                    });

            /*
    KeyboardJS.bind.key("o", function () {
                     

        if (sonicManager.sonicToon)
            sonicManager.inHaltMode = !sonicManager.inHaltMode;
    }, function () { });

    KeyboardJS.bind.key("2", function () {
        sonicManager.indexedPalette++;
        for (var block in sonicManager.SonicLevel.Blocks) {
            sonicManager.SonicLevel.Blocks[block].image = [];
        }

    }, function () { });


    KeyboardJS.bind.key("p", function () {
        if (sonicManager.sonicToon)
            if (sonicManager.inHaltMode) {
                sonicManager.waitingForTickContinue = false;
            }
    }, function () { });


    KeyboardJS.bind.key("h", function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.hit(sonicManager.sonicToon.x, sonicManager.sonicToon.y);
    }, function () { });


 
    KeyboardJS.bind.key("c", function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.debug();
    }, function () { });

    KeyboardJS.bind.key("e", function () {
        sonicManager.SonicLevel.curHeightMap = !sonicManager.SonicLevel.curHeightMap;
    }, function () { });

    KeyboardJS.bind.key("f", function () {
        sonicManager.showHeightMap = !sonicManager.showHeightMap;
    }, function () { });

    KeyboardJS.bind.key("up", function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.pressUp();
        else {
            sonicManager.windowLocation.y -= 128;
            sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;

        }

    }, function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.releaseUp();
    });

    KeyboardJS.bind.key("down", function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.pressCrouch();
        else {
            sonicManager.windowLocation.y += 128;
            sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;

        }
    }, function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.releaseCrouch();
    });

    KeyboardJS.bind.key("left", function () {
        if (sonicManager.sonicToon) {
            sonicManager.sonicToon.pressLeft();
        } else {
            sonicManager.windowLocation.x -= 128; 
            sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;
            
        }
    }, function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.releaseLeft();
    });

    KeyboardJS.bind.key("right", function () {

        if (sonicManager.sonicToon) {
            sonicManager.sonicToon.pressRight();
        } else {
            sonicManager.windowLocation.x += 128;
            sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;

        }
    }, function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.releaseRight();
    });

    KeyboardJS.bind.key("space", function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.pressJump();
    }, function () {
        if (sonicManager.sonicToon)
            sonicManager.sonicToon.releaseJump();
    });*/

            fullscreenMode = true;

            Window.AddEventListener("onresize", e => resizeCanvas());
            jQuery.Document.Resize(e => resizeCanvas());

            sonicManager = new SonicManager(this, gameCanvas, resizeCanvas);
            sonicManager.IndexedPalette = 0;
            Window.SetInterval(GameDraw, 1000 / 60);
            Window.SetInterval(UIDraw, 1000 / 20);
            resizeCanvas();
        }

        private void handleScroll(jQueryEvent jQueryEvent)
        {
            jQueryEvent.PreventDefault();

            sonicManager.UIManager.OnMouseScroll(jQueryEvent);
        }

        private void canvasMouseMove(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            Document.Body.Style.Cursor = "default";
            lastMouseMove = queryEvent;
            if (sonicManager.UIManager.OnMouseMove(queryEvent)) return;

            return;
        }

        private void canvasOnClick(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            if (sonicManager.UIManager.OnClick(queryEvent)) return;
            if (sonicManager.OnClick(queryEvent)) return;
            sonicManager.UIManager.dragger.Click( /*elementEvent*/);
        }

        private void canvasMouseUp(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            sonicManager.UIManager.OnMouseUp(lastMouseMove);
        }

        public void resizeCanvas()
        {
            canvasWidth = jQuery.Window.GetWidth();
            canvasHeight = jQuery.Window.GetHeight();

            uiCanvas.DomCanvas.Attribute("width", canvasWidth.ToString());
            uiCanvas.DomCanvas.Attribute("height", canvasHeight.ToString());

            sonicManager.WindowLocation = Constants.DefaultWindowLocation(sonicManager.CurrentGameState,
                                                                          uiCanvas, sonicManager.Scale);
            sonicManager.RealScale = !fullscreenMode
                                             ? new Point(1, 1)
                                             : new Point(canvasWidth / 320 / sonicManager.Scale.X,
                                                         canvasHeight / 224 / sonicManager.Scale.Y);

            gameCanvas.DomCanvas.Attribute("width", ( sonicManager.WindowLocation.Width *
                                                      ( sonicManager.SonicToon != null
                                                                ? sonicManager.Scale.X * sonicManager.RealScale.X
                                                                : 1 ) ).ToString());
            gameCanvas.DomCanvas.Attribute("height", ( sonicManager.WindowLocation.Height *
                                                       ( sonicManager.SonicToon != null
                                                                 ? sonicManager.Scale.Y * sonicManager.RealScale.Y
                                                                 : 1 ) ).ToString());

//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));

            var screenOffset = sonicManager.SonicToon != null
                                       ? new Point(canvasWidth / 2 -
                                                   sonicManager.WindowLocation.Width * sonicManager.Scale.X *
                                                   sonicManager.RealScale.X / 2,
                                                   canvasHeight / 2 -
                                                   sonicManager.WindowLocation.Height * sonicManager.Scale.Y *
                                                   sonicManager.RealScale.Y / 2)
                                       : new Point(0, 0);
            gameCanvas.DomCanvas.CSS("left", screenOffset.X.ToPx());
            gameCanvas.DomCanvas.CSS("top", screenOffset.Y.ToPx());
        }

        public void Clear(CanvasInformation canv)
        {
            canv.DomCanvas[0].Me().width = ( gameCanvas.DomCanvas.GetWidth() );
        }

        public void GameDraw()
        {
            if (!sonicManager.InHaltMode)
                Clear(gameCanvas);
            sonicManager.Draw(gameCanvas.Context);
        }

        public void UIDraw()
        {
            if (!sonicManager.InHaltMode)
                Clear(uiCanvas);
            sonicManager.UIManager.Draw(uiCanvas.Context);
        }
    }
}