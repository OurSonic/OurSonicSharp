using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using SocketIOWebLibrary;
using WebLibraries;
using jQueryApi;
namespace OurSonic
{
    [Imported]
    [IgnoreGenericArguments]
    public class DataObject<T>
    {
        [IntrinsicProperty]
        [PreserveCase]
        public T Data { get; set; }
    }
    public class SonicEngine
    {
        public int canvasHeight;
        public int canvasWidth;
        public SocketIOClient client;
        private bool fullscreenMode;
        private CanvasInformation gameCanvas;
        private string gameCanvasName = "gameLayer";
        private jQueryEvent lastMouseMove;
        private SonicManager sonicManager;
        private CanvasInformation uiCanvas;
        private string uiCanvasName = "uiLayer";
        [IntrinsicProperty]
        public static SonicEngine Instance { get; set; }

        public SonicEngine()
        {
            Instance = this;
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
                                        if (sonicManager.CurrentGameState == GameState.Editing)
                                            sonicManager.UIManager.OnKeyDown(e);
                                    });

            KeyboardJS.Instance().Bind.Key("f", () => { sonicManager.ShowHeightMap = !sonicManager.ShowHeightMap; }, () => { });

            KeyboardJS.Instance().Bind.Key("o", () => {
                                                    if (sonicManager.CurrentGameState == GameState.Playing)
                                                        sonicManager.InHaltMode = !sonicManager.InHaltMode;
                                                }, () => { });
            int levelIndex = 0;
            client = SocketIOClient.Connect("50.116.22.241:8998");

            client.On<DataObject<string>>("SonicLevel", data => {
                                                            sonicManager.Load(data.Data);

                                                            sonicManager.WindowLocation.X = 0;
                                                            sonicManager.WindowLocation.Y = 0;
                                                            sonicManager.BigWindowLocation.X =
                                                                    (int) ( sonicManager.WindowLocation.X - sonicManager.WindowLocation.Width * 0.2 );
                                                            sonicManager.BigWindowLocation.Y =
                                                                    (int) ( sonicManager.WindowLocation.Y - sonicManager.WindowLocation.Height * 0.2 );

                                                            sonicManager.BigWindowLocation.Width = (int) ( sonicManager.WindowLocation.Width * 1.8 );
                                                            sonicManager.BigWindowLocation.Height = (int) ( sonicManager.WindowLocation.Height * 1.8 );
                                                            sonicManager.ClearCache();

                                                            if (sonicManager.CurrentGameState == GameState.Playing)
                                                                runGame();
                                                            runGame();
                                                        });
            client.On<DataObject<KeyValuePair<string, string>[]>>("GetObjects.Response", data => { sonicManager.loadObjects(data.Data); }
                    );

            KeyboardJS.Instance().Bind.Key("2", () => { client.Emit("GetSonicLevel", "0"); }, () => { });
            client.Emit("GetSonicLevel", "0");

            KeyboardJS.Instance().Bind.Key("1", () => {
                                                    sonicManager.IndexedPalette++;
                                                    sonicManager.ClearCache();
                                                }, () => { });

            KeyboardJS.Instance().Bind.Key("q",
                                           () => { runGame(); }, () => { });

            KeyboardJS.Instance().Bind.Key("p",
                                           () => {
                                               if (sonicManager.CurrentGameState == GameState.Playing)
                                                   if (sonicManager.InHaltMode) sonicManager.waitingForTickContinue = false;
                                           }, () => { });

            KeyboardJS.Instance().Bind.Key("h", () => {
                                                    if (sonicManager.CurrentGameState == GameState.Playing)
                                                        sonicManager.SonicToon.Hit(sonicManager.SonicToon.X, sonicManager.SonicToon.Y);
                                                }, () => { });

            KeyboardJS.Instance().Bind.Key("c", () => {
                                                    if (sonicManager.CurrentGameState == GameState.Playing)
                                                        sonicManager.SonicToon.Debug();
                                                }, () => { });

            KeyboardJS.Instance().Bind.Key("up", () => {
                                                     switch (sonicManager.CurrentGameState) {
                                                         case GameState.Playing:
                                                             sonicManager.SonicToon.PressUp();
                                                             break;
                                                         case GameState.Editing:

                                                             sonicManager.WindowLocation.Y -= 128;
                                                             sonicManager.BigWindowLocation.Y -= 128;
                                                             break;
                                                     }
                                                 }, () => {
                                                        switch (sonicManager.CurrentGameState) {
                                                            case GameState.Playing:
                                                                sonicManager.SonicToon.ReleaseUp();
                                                                break;
                                                            case GameState.Editing:
                                                                break;
                                                        }
                                                    });

            KeyboardJS.Instance().Bind.Key("down", () => {
                                                       switch (sonicManager.CurrentGameState) {
                                                           case GameState.Playing:
                                                               sonicManager.SonicToon.PressCrouch();
                                                               break;
                                                           case GameState.Editing:

                                                               sonicManager.WindowLocation.Y += 128;
                                                               sonicManager.BigWindowLocation.Y += 128;
                                                               break;
                                                       }
                                                   }, () => {
                                                          switch (sonicManager.CurrentGameState) {
                                                              case GameState.Playing:
                                                                  sonicManager.SonicToon.ReleaseCrouch();
                                                                  break;
                                                              case GameState.Editing:
                                                                  break;
                                                          }
                                                      });

            KeyboardJS.Instance().Bind.Key("left", () => {
                                                       switch (sonicManager.CurrentGameState) {
                                                           case GameState.Playing:
                                                               sonicManager.SonicToon.PressLeft();
                                                               break;
                                                           case GameState.Editing:
                                                               sonicManager.WindowLocation.X -= 128;
                                                               sonicManager.BigWindowLocation.X -= 128;
                                                               break;
                                                       }
                                                   }, () => {
                                                          switch (sonicManager.CurrentGameState) {
                                                              case GameState.Playing:
                                                                  sonicManager.SonicToon.ReleaseLeft();
                                                                  break;
                                                              case GameState.Editing:
                                                                  break;
                                                          }
                                                      });

            KeyboardJS.Instance().Bind.Key("right", () => {
                                                        switch (sonicManager.CurrentGameState) {
                                                            case GameState.Playing:
                                                                sonicManager.SonicToon.PressRight();
                                                                break;
                                                            case GameState.Editing:
                                                                sonicManager.WindowLocation.X += 128;
                                                                sonicManager.BigWindowLocation.X += 128;
                                                                break;
                                                        }
                                                    }, () => {
                                                           switch (sonicManager.CurrentGameState) {
                                                               case GameState.Playing:
                                                                   sonicManager.SonicToon.ReleaseRight();
                                                                   break;
                                                               case GameState.Editing:
                                                                   break;
                                                           }
                                                       });

            KeyboardJS.Instance().Bind.Key("space", () => {
                                                        switch (sonicManager.CurrentGameState) {
                                                            case GameState.Playing:
                                                                sonicManager.SonicToon.PressJump();

                                                                break;
                                                            case GameState.Editing:
                                                                break;
                                                        }
                                                    }, () => {
                                                           switch (sonicManager.CurrentGameState) {
                                                               case GameState.Playing:
                                                                   sonicManager.SonicToon.ReleaseJump();
                                                                   break;
                                                               case GameState.Editing:
                                                                   break;
                                                           }
                                                       });

            KeyboardJS.Instance().Bind.Key("e", () => { sonicManager.SonicLevel.CurHeightMap = !sonicManager.SonicLevel.CurHeightMap; }, () => { });

            fullscreenMode = true;

            Window.AddEventListener("resize", e => resizeCanvas());
            jQuery.Document.Resize(e => resizeCanvas());

            sonicManager = new SonicManager(this, gameCanvas, resizeCanvas);
            sonicManager.IndexedPalette = 0;
            Window.SetInterval(sonicManager.Tick, 1000 / 60);
            Window.SetInterval(GameDraw, 1000 / 60);
            Window.SetInterval(UIDraw, 1000 / 20);
            resizeCanvas();
        }

        private void runGame()
        {
            switch (sonicManager.CurrentGameState) {
                case GameState.Playing:
                    sonicManager.CurrentGameState = GameState.Editing;
                    sonicManager.WindowLocation = Constants.DefaultWindowLocation(sonicManager.CurrentGameState, gameCanvas, sonicManager.Scale);
                    sonicManager.SonicToon = null;
                    break;
                case GameState.Editing:
                    sonicManager.CurrentGameState = GameState.Playing;
                    sonicManager.WindowLocation = Constants.DefaultWindowLocation(sonicManager.CurrentGameState, gameCanvas, sonicManager.Scale);
                    sonicManager.SonicToon = new Sonic();
                    break;
            }
        }

        private void handleScroll(jQueryEvent jQueryEvent)
        {
            jQueryEvent.PreventDefault();

            int j = jQueryEvent.Me().detail ? jQueryEvent.Me().detail * ( -120 ) : jQueryEvent.Me().wheelDelta;

            double rate = j < 0 ? -1 : 1;
            sonicManager.Scale.X += Script.Reinterpret<int>(rate);
            sonicManager.Scale.Y += Script.Reinterpret<int>(rate);
            sonicManager.ClearCache();

            sonicManager.PreloadSprites(sonicManager.Scale, () => { }, (a) => { });
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
                                                      ( sonicManager.CurrentGameState == GameState.Playing
                                                                ? sonicManager.Scale.X * sonicManager.RealScale.X
                                                                : 1 ) ).ToString());
            gameCanvas.DomCanvas.Attribute("height", ( sonicManager.WindowLocation.Height *
                                                       ( sonicManager.CurrentGameState == GameState.Playing
                                                                 ? sonicManager.Scale.Y * sonicManager.RealScale.Y
                                                                 : 1 ) ).ToString());

            var screenOffset = sonicManager.CurrentGameState == GameState.Playing
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