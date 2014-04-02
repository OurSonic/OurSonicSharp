using System;
using System.Collections.Generic;
using System.Html;
using CodeMirrorLibrary;
using jQueryApi;
using OurSonic.Level.Objects;
using OurSonic.UI.Directives;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services;
using OurSonic.UIManager;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;
using Element = OurSonic.UIManager.Element;

namespace OurSonic.UI.Controllers
{
    internal class ObjectFrameworkEditorController
    {
        public const string Name = "ObjectFrameworkEditorController";
        public const string View = "ObjectFrameworkEditor";
        private readonly ObjectFrameworkEditorScope scope;
        private readonly CreateUIService createUIService;

        public ObjectFrameworkEditorController(ObjectFrameworkEditorScope scope, CreateUIService createUIService)
        {
            this.scope = scope;
            this.scope.Visible = true;
            this.createUIService = createUIService;

            scope.Callback.EditAssetFrame = editAssetFrameFn;

            scope.Callback.AddAsset = addAssetFn;
            scope.Callback.AddPiece = addPieceFn;
            scope.Callback.AddPieceLayout = addPieceLayoutFn;
            scope.Callback.AddProjectile = addProjectileFn;

            scope.Callback.AddFrameToAsset = addFrameToAssetFn;
            scope.Callback.RemoveFrameFromAsset = removeFrameFromAssetFn;


            scope.Callback.RemoveAsset = removeAssetFn;
            scope.Callback.RemovePiece = removedPieceFn;
            scope.Callback.RemovePieceLayout = removePieceLayoutFn;
            scope.Callback.RemoveProjectile = removeProjectileFn;

            scope.Callback.SaveChanges = saveChangesFn;

            scope.Callback.ModifyScript = modifyScriptFn;

            scope.Model.CodeMirrorOptions = new CodeMirrorOptions()
                                            {
                                                LineNumbers = true,
                                                Theme = "midnight",
                                                Mode = "javascript",
                                                Gutters = new[] { "CodeMirror-linenumbers", "breakpoints" },
                                                OnGutterClick = (cm, n, gutter, evt) =>
                                                                {
                                                                    scope.Model.CodeMirror = cm;
                                                                },
                                                OnLoad = (editor) =>
                                                         {
                                                             scope.Model.CodeMirror = editor;
                                                         },
                                            };


            scope.Watch("model.selectedAsset", (newValue) =>
            {
                if (newValue != null)
                {
                    resetModel();
                    this.scope.Model.SelectedAsset = (LevelObjectAsset)newValue;
                    this.scope.Model.SelectedAssetFrame = this.scope.Model.SelectedAsset.Frames[0];
                }
            });
            scope.Watch("model.selectedPiece", (newValue) =>
            {
                if (newValue != null)
                {
                    resetModel();
                    this.scope.Model.SelectedPiece = (LevelObjectPiece)newValue;
                }
            });
            scope.Watch("model.selectedPieceLayout", (newValue) =>
            {
                if (newValue != null)
                {
                    resetModel();
                    this.scope.Model.SelectedPieceLayout = (LevelObjectPieceLayout)newValue;
                    this.scope.Model.SelectedPieceLayoutPiece = this.scope.Model.SelectedPieceLayout.Pieces[0];
                }
            });
            scope.Watch("model.selectedProjectile", (newValue) =>
            {
                if (newValue != null)
                {
                    resetModel();
                    this.scope.Model.SelectedProjectile = (LevelObjectProjectile)newValue;
                }
            });


            resetModel();
        }

        private void saveChangesFn()
        { 

            var k = scope.Model.ObjectData.Key;
            var o = scope.Model.ObjectData.oldKey ?? scope.Model.ObjectData.Key;
            var v = Help.Stringify(scope.Model.ObjectData);

            SonicEngine.Instance.client.Emit("SaveObject", new SaveObjectModel { Key = k, OldKey = o, Data = v });
            SonicEngine.Instance.client.On<bool>("SaveObject.Response", (data) =>
                                                                        {

                                                                            SonicEngine.Instance.client.Emit("GetAllObjectsData", "");
                                                                        });
             

        }

        private void modifyScriptFn(ModifyScript arg)
        {
            resetModel();
            scope.Model.ModifyScript = arg;
        }

        private void removeProjectileFn()
        {
            scope.Model.ObjectData.Projectiles.Remove(scope.Model.SelectedProjectile);
            scope.Model.SelectedProjectile = null;

        }

        private void removePieceLayoutFn()
        {
            scope.Model.ObjectData.PieceLayouts.Remove(scope.Model.SelectedPieceLayout);
            scope.Model.SelectedPieceLayout = null;

        }

        private void removedPieceFn()
        {
            scope.Model.ObjectData.Pieces.Remove(scope.Model.SelectedPiece);
            scope.Model.SelectedPiece = null;

        }

        private void removeAssetFn()
        {
            scope.Model.ObjectData.Assets.Remove(scope.Model.SelectedAsset);
            scope.Model.SelectedAsset = null;
        }

        private void removeFrameFromAssetFn()
        {
            scope.Model.SelectedAsset.Frames.Remove(scope.Model.SelectedAssetFrame);
            scope.Model.SelectedAssetFrame = null;
        }

        private void addFrameToAssetFn()
        {
            LevelObjectAssetFrame vs;
            scope.Model.SelectedAsset.Frames.Add(vs = new LevelObjectAssetFrame("Frame " + (scope.Model.SelectedAsset.Frames.Count + 1)));
            vs.Palette = new string[] { "000", "111", "222", "333", "444", "555", "666", "777", "888", "999", "AAA", "BBB", "CCC", "DDD", "EEE", "FFF" };
            vs.Width = (int)(Math.Floor(Math.Random() * 40) + 20);
            vs.Height = (int)(Math.Floor(Math.Random() * 40) + 20);
            vs.ColorMap = new int[vs.Width][];
            for (var i = 0; i < vs.Width; i++)
            {
                vs.ColorMap[i] = new int[vs.Height];
                for (var j = 0; j < vs.Height; j++)
                {
                    vs.ColorMap[i][j] = (int)Math.Floor(Math.Random() * vs.Palette.Length);
                }
            }
        }

        private void addProjectileFn()
        {
            scope.Model.ObjectData.Projectiles.Add(new LevelObjectProjectile("Piece Projectile " + (scope.Model.ObjectData.Projectiles.Count + 1)));
        }

        private void addPieceLayoutFn()
        {
            scope.Model.ObjectData.PieceLayouts.Add(new LevelObjectPieceLayout("Piece Layout " + (scope.Model.ObjectData.PieceLayouts.Count + 1)));
        }

        private void addPieceFn()
        {
            scope.Model.ObjectData.Pieces.Add(new LevelObjectPiece("Piece " + (scope.Model.ObjectData.Pieces.Count + 1)));
        }

        private void addAssetFn()
        {
            scope.Model.ObjectData.Assets.Add(new LevelObjectAsset("Asset " + (scope.Model.ObjectData.Assets.Count + 1)));
        }

        private void resetModel()
        {
            scope.Model.AssetEditType = AssetFrameEditType.Offset;
            this.scope.Model.SelectedAsset = null;
            this.scope.Model.SelectedPiece = null;
            this.scope.Model.SelectedProjectile = null;
            this.scope.Model.SelectedPieceLayout = null;
            this.scope.Model.SelectedAssetFrame = null;
            this.scope.Model.SelectedPieceLayoutPiece = null;
            scope.Model.ModifyScript = ModifyScript.None;
        }

        private void editAssetFrameFn()
        {
            createUIService.CreateSingleton<AssetFrameEditorScope>(AssetFrameEditorController.View, (scope, elem) =>
            {
                scope.Callback = new AssetFrameEditorScopeCallback();
                scope.Model = new AssetFrameEditorScopeModel();
                scope.Model.Frame = this.scope.Model.SelectedAssetFrame;
            });
        }
    }
}