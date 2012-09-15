using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Text;
using jQueryApi;

namespace OurSonic
{
    public class SonicEngine
    {
        private void handleScroll(ElementEvent elementEvent)
        {
            elementEvent.PreventDefault();

            sonicManager.UIManager.OnMouseScroll(elementEvent);

        }

        private ElementEvent lastMouseMove;

        private void canvasMouseMove(ElementEvent elementEvent)
        {
            elementEvent.PreventDefault();
            Document.Body.Style.Cursor = "default";
            lastMouseMove = elementEvent;
            if (sonicManager.UIManager.OnMouseMove(elementEvent)) return ;

            return ;

        }
        private void canvasOnClick(ElementEvent elementEvent)
        {
            elementEvent.PreventDefault();
            if (sonicManager.UIManager.OnClick(elementEvent)) return;
            if (sonicManager.OnClick(elementEvent)) return;
            sonicManager.UIManager.dragger.Click(/*elementEvent*/);
        }


        private void canvasMouseUp(ElementEvent elementEvent)
        {
            elementEvent.PreventDefault();
            sonicManager.UIManager.OnMouseUp(lastMouseMove);

        }

        private string gameCanvasName = "gameLayer";
        private string uiCanvasName = "uiLayer";
        private jQueryObject gameCanvasItem;
        private CanvasContext2D gameCanvas;
        private jQueryObject uiCanvasItem;
        private CanvasContext2D uiCanvas;
        private int canvasWidth;
        private int canvasHeight;

        private SonicManager sonicManager; 
        private bool fullscreenMode;


        public SonicEngine()
        {
            gameCanvasItem = jQuery.Select(string.Format("#{0}", gameCanvasName));
            gameCanvas = (CanvasContext2D) gameCanvasItem[0].As<CanvasElement>().GetContext(Rendering.Render2D);
            uiCanvasItem = jQuery.Select(string.Format("#{0}", uiCanvasName));
            uiCanvas = (CanvasContext2D) uiCanvasItem[0].As<CanvasElement>().GetContext(Rendering.Render2D);
            canvasWidth = 0;
            canvasHeight = 0;


            var element = uiCanvasItem[0];
            element.AddEventListener("DOMMouseScroll", handleScroll, false);
            element.AddEventListener("mousewheel", handleScroll, false);

            element.AddEventListener("touchmove", canvasMouseMove, false);
            element.AddEventListener("touchstart", canvasOnClick, false);
            element.AddEventListener("touchend", canvasMouseUp, false);

            element.AddEventListener("mousemove", canvasMouseMove, false);
            element.AddEventListener("mousedown", canvasOnClick, false);
            element.AddEventListener("mouseup", canvasMouseUp, false);
            element.AddEventListener("contextmenu", (e) => e.PreventDefault(), false);

            jQuery.Document.Keydown(e =>
                                        {
                                            if (sonicManager.SonicToon==null)
                                            {
                                                sonicManager.UIManager.OnKeyDown(e);
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
        }
  
        public void resizeCanvas()
        {
            canvasWidth= jQuery.Window.GetWidth();
            canvasHeight = jQuery.Window.GetHeight();
            sonicManager.WindowLocation = Constants.DefaultWindowLocation(sonicManager.SonicToon == null ? 1 : 0,uiCanvas, sonicManager.Scale);
            sonicManager.RealScale = !fullscreenMode ? new Point(1, 1) : new Point(canvasWidth / 320 / sonicManager.Scale.X, canvasHeight / 224 / sonicManager.Scale.Y);

            gameCanvasItem.Attribute("width", (sonicManager.WindowLocation.Width *
                                               (sonicManager.SonicToon != null
                                                    ? sonicManager.Scale.X * sonicManager.RealScale.X
                                                    : 1)) .ToPx());
            gameCanvasItem.Attribute("height", (sonicManager.WindowLocation.Height *
                                               (sonicManager.SonicToon != null
                                                    ? sonicManager.Scale.Y * sonicManager.RealScale.Y
                                                    : 1)).ToPx());
            uiCanvasItem.Attribute("width", canvasWidth.ToPx());
            uiCanvasItem.Attribute("height", canvasHeight.ToPx());


//TODO::            that.uiCanvas.goodWidth = that.canvasWidth;
//            that.gameCanvas.goodWidth = (window.sonicManager.windowLocation.width * (window.sonicManager.sonicToon ? window.sonicManager.scale.x * window.sonicManager.realScale.x : 1));

            var screenOffset = sonicManager.SonicToon != null
                                   ? new Point(canvasWidth/2 -
                                               sonicManager.WindowLocation.Width*sonicManager.Scale.X*
                                               sonicManager.RealScale.X/2,
                                               canvasHeight/2 -
                                               sonicManager.WindowLocation.Height*sonicManager.Scale.Y*
                                               sonicManager.RealScale.Y/2)
                                   : new Point(0, 0);
            gameCanvasItem.CSS("left", screenOffset.X .ToPx());
            gameCanvasItem.CSS("top", screenOffset.Y.ToPx());
            Window.AddEventListener("onresize",e=>resizeCanvas());
            jQuery.Document.Resize(e => resizeCanvas());

            sonicManager = new SonicManager(gameCanvas, resizeCanvas);
            sonicManager.IndexedPalette = 0;
            Window.SetInterval(() =>
            {
                GameDraw();
            }, 1000 / 60);
            Window.SetInterval(() =>
            {
                UIDraw();
            }, 1000 / 20);
            this.resizeCanvas();
        }
        public void Clear()
        {
            gameCanvasItem.Width(gameCanvasItem.GetWidth());
        }

        public void GameDraw()
        {

            if (!sonicManager.InHaltMode)
            {
                Clear();
            }
            sonicManager.Draw(gameCanvas);
        }
        public void UIDraw()
        {

            if (!sonicManager.InHaltMode)
            {
                Clear();
            }
            sonicManager.UIManager.Draw(gameCanvas);
        }
         
    }
}
