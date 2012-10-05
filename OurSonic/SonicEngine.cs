using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.UIManager;
using OurSonicModels;
using OurSonicModels.Common;
using SocketIOWebLibrary;
using WebLibraries;
using jQueryApi;
namespace OurSonic
{
    public class SonicEngine
    {
        public int canvasHeight;
        public int canvasWidth;
        public SocketIOClient client;
        private bool fullscreenMode;
        private CanvasInformation gameCanvas;
        private string gameCanvasName = "gameLayer";
        private Pointer lastMouseMove;
        public SonicManager sonicManager;
        private CanvasInformation uiCanvas;
        private string uiCanvasName = "uiLayer";
        
        private int gameGoodWidth;
        private int uiGoodWidth;
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
                            (CanvasContext2D)gameCanvasItem[0].As<CanvasElement>().GetContext(Rendering.Render2D),
                            gameCanvasItem);

//          new SpeedTester(gameCanvas);return;
            var uiCanvasItem = jQuery.Select(string.Format("#{0}", uiCanvasName));
            uiCanvas =
                    new CanvasInformation(
                            (CanvasContext2D)uiCanvasItem[0].As<CanvasElement>().GetContext(Rendering.Render2D), uiCanvasItem);

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
            bool dontPress = false;
            Document.AddEventListener("keypress", e =>
            {
                //if (sonicManager.CurrentGameState == GameState.Editing)
                dontPress = sonicManager.UIManager.OnKeyDown(e);
            }, true);
            Document.AddEventListener("keyup", e =>
            {
                //if (sonicManager.CurrentGameState == GameState.Editing)
                dontPress = false;
            }, true);

            Document.AddEventListener("onkeydown", e =>
            {
                //if (sonicManager.CurrentGameState == GameState.Editing)
                dontPress = sonicManager.UIManager.OnKeyDown(e);
            }, true);
            Document.AddEventListener("onkeyup", e =>
            {
                //if (sonicManager.CurrentGameState == GameState.Editing)
                dontPress = false;
            }, true);

/*

            jQuery.Document.Keydown(e =>
            {
                //if (sonicManager.CurrentGameState == GameState.Editing)
                dontPress = sonicManager.UIManager.OnKeyDown(e);
            });

            jQuery.Document.Keyup(e =>
            {
                dontPress = false;
            });
*/

            KeyboardJS.Instance().Bind.Key("f", () => {
                if (dontPress) return;
                sonicManager.ShowHeightMap = !sonicManager.ShowHeightMap;
                                                }, () => { });

            KeyboardJS.Instance().Bind.Key("o",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               if (sonicManager.CurrentGameState == GameState.Playing)
                                                   sonicManager.InHaltMode = !sonicManager.InHaltMode;
                                           },
                                           () => { });
            int levelIndex = 0;
            client = SocketIOClient.Connect("50.116.22.241:8998");

            client.On<DataObject<string>>("SonicLevel",
                                          data => {
                                              Help.DecodeString<SLData>(data.Data,
                                                                        (level) => {

                                                                            sonicManager.Load(level);

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


                                              


                                          });
            client.On<DataObject<KeyValuePair<string, string>[]>>("GetObjects.Response", data => { sonicManager.loadObjects(data.Data); }
                    );

            KeyboardJS.Instance().Bind.Key("2", () => { if (dontPress) return; client.Emit("GetSonicLevel", "0"); }, () => { });

            KeyboardJS.Instance().Bind.Key("1",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               sonicManager.IndexedPalette++;
                                               sonicManager.ClearCache();
                                           },
                                           () => { });

            KeyboardJS.Instance().Bind.Key("q",
                                           () => { if (dontPress) return; runGame(); },
                                           () => { });

            KeyboardJS.Instance().Bind.Key("p",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               if (sonicManager.CurrentGameState == GameState.Playing)
                                                   if (sonicManager.InHaltMode) sonicManager.waitingForTickContinue = false;
                                           },
                                           () => { });

            KeyboardJS.Instance().Bind.Key("h",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               if (sonicManager.CurrentGameState == GameState.Playing)
                                                   sonicManager.SonicToon.Hit(sonicManager.SonicToon.X, sonicManager.SonicToon.Y);
                                           },
                                           () => { });

            KeyboardJS.Instance().Bind.Key("c",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               if (sonicManager.CurrentGameState == GameState.Playing)
                                                   sonicManager.SonicToon.Debug();
                                           },
                                           () => { });

            KeyboardJS.Instance().Bind.Key("up",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.PressUp();
                                                       break;
                                                   case GameState.Editing:

                                                       sonicManager.WindowLocation.Y -= 128;
                                                       sonicManager.BigWindowLocation.Y -= 128;
                                                       break;
                                               }
                                           },
                                           () =>
                                           {
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.ReleaseUp();
                                                       break;
                                                   case GameState.Editing:
                                                       break;
                                               }
                                           });

            KeyboardJS.Instance().Bind.Key("down",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.PressCrouch();
                                                       break;
                                                   case GameState.Editing:

                                                       sonicManager.WindowLocation.Y += 128;
                                                       sonicManager.BigWindowLocation.Y += 128;
                                                       break;
                                               }
                                           },
                                           () =>
                                           {
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.ReleaseCrouch();
                                                       break;
                                                   case GameState.Editing:
                                                       break;
                                               }
                                           });

            KeyboardJS.Instance().Bind.Key("left",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.PressLeft();
                                                       break;
                                                   case GameState.Editing:
                                                       sonicManager.WindowLocation.X -= 128;
                                                       sonicManager.BigWindowLocation.X -= 128;
                                                       break;
                                               }
                                           },
                                           () =>
                                           {
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.ReleaseLeft();
                                                       break;
                                                   case GameState.Editing:
                                                       break;
                                               }
                                           });

            KeyboardJS.Instance().Bind.Key("right",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.PressRight();
                                                       break;
                                                   case GameState.Editing:
                                                       sonicManager.WindowLocation.X += 128;
                                                       sonicManager.BigWindowLocation.X += 128;
                                                       break;
                                               }
                                           },
                                           () =>
                                           {
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.ReleaseRight();
                                                       break;
                                                   case GameState.Editing:
                                                       break;
                                               }
                                           });

            KeyboardJS.Instance().Bind.Key("space",
                                           () =>
                                           {
                                               if (dontPress) return;
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.PressJump();

                                                       break;
                                                   case GameState.Editing:
                                                       break;
                                               }
                                           },
                                           () =>
                                           {
                                               switch (sonicManager.CurrentGameState)
                                               {
                                                   case GameState.Playing:
                                                       sonicManager.SonicToon.ReleaseJump();
                                                       break;
                                                   case GameState.Editing:
                                                       break;
                                               }
                                           });

            KeyboardJS.Instance().Bind.Key("e", () => {
                                                    if (dontPress) return; sonicManager.SonicLevel.CurHeightMap = !sonicManager.SonicLevel.CurHeightMap;
                                                }, () => { });

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

        public static  void runGame()
        {
            var sonicManager = SonicManager.Instance;
            switch (sonicManager.CurrentGameState)
            {
                case GameState.Playing:
                    sonicManager.CurrentGameState = GameState.Editing;
                    sonicManager.WindowLocation = Constants.DefaultWindowLocation(sonicManager.CurrentGameState, Instance. gameCanvas, sonicManager.Scale);
                    sonicManager.SonicToon = null;
                    break;
                case GameState.Editing:
                    sonicManager.CurrentGameState = GameState.Playing;
                    sonicManager.WindowLocation = Constants.DefaultWindowLocation(sonicManager.CurrentGameState, Instance. gameCanvas, sonicManager.Scale);
                    sonicManager.SonicToon = new Sonic();
                    break;
            }
        }

        private void handleScroll(jQueryEvent jQueryEvent)
        {
            jQueryEvent.PreventDefault();

            int j = jQueryEvent.Me().detail ? jQueryEvent.Me().detail * (-120) : jQueryEvent.Me().wheelDelta;
            /*
                        double rate = j < 0 ? -1 : 1;
                        sonicManager.Scale.X += Script.Reinterpret<int>(rate);
                        sonicManager.Scale.Y += Script.Reinterpret<int>(rate);
                        sonicManager.ClearCache();

                        sonicManager.PreloadSprites(sonicManager.Scale, () => { }, (a) => { });*/

            sonicManager.UIManager.OnMouseScroll(jQueryEvent);
        }

        private void canvasMouseMove(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            Document.Body.Style.Cursor = "default";
            lastMouseMove = Help.GetCursorPosition(queryEvent);
            if (sonicManager.UIManager.OnMouseMove(lastMouseMove)) return;

            return;
        }

        private void canvasOnClick(jQueryEvent queryEvent)
        {
            queryEvent.PreventDefault();
            if (sonicManager.UIManager.OnClick(Help.GetCursorPosition(queryEvent))) return;
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
                                                                          uiCanvas,
                                                                          sonicManager.Scale);
            sonicManager.RealScale  = !fullscreenMode
                                             ? new DoublePoint(1, 1)
                                             : new DoublePoint( (canvasWidth / 320d / sonicManager.Scale.X), ( canvasHeight / 224d / sonicManager.Scale.Y ));
            
            gameCanvas.DomCanvas.Attribute("width",
                                           (sonicManager.WindowLocation.Width *
                                             (sonicManager.CurrentGameState == GameState.Playing
                                                       ? sonicManager.Scale.X * sonicManager.RealScale.X
                                                       : 1)).ToString());
            gameCanvas.DomCanvas.Attribute("height",
                                           (sonicManager.WindowLocation.Height *
                                             (sonicManager.CurrentGameState == GameState.Playing
                                                       ? sonicManager.Scale.Y * sonicManager.RealScale.Y
                                                       : 1)).ToString());



            uiGoodWidth = canvasWidth;
            gameGoodWidth = (int)(sonicManager.WindowLocation.Width * (sonicManager.CurrentGameState==GameState.Playing ? sonicManager.Scale.X * sonicManager.RealScale.X : 1));




            var screenOffset = sonicManager.CurrentGameState == GameState.Playing
                                       ? new DoublePoint(( ( canvasWidth / 2d -
                                                           sonicManager.WindowLocation.Width * sonicManager.Scale.X *
                                                           sonicManager.RealScale.X / 2 )),
                                                     ( canvasHeight / 2d -
                                                           sonicManager.WindowLocation.Height * sonicManager.Scale.Y *
                                                           sonicManager.RealScale.Y / 2 ))
                                       : new DoublePoint(0, 0);
            gameCanvas.DomCanvas.CSS("left", screenOffset.X.ToPx());
            gameCanvas.DomCanvas.CSS("top", screenOffset.Y.ToPx());
        }

        public void Clear(CanvasInformation canv)
        {
            int w;
            if (canv == gameCanvas) {
                w = gameGoodWidth;
            }else {
                w = uiGoodWidth;
               
            }
            canv.DomCanvas[0].Me().width = w;
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