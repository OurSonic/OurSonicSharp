﻿using System;
using System.Html;
using System.Reflection;
using System.Runtime.CompilerServices;
using ng;
using OurSonic.Filters;
using OurSonic.UI.Controllers;
using OurSonic.UI.Directives;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services;
using OurSonic.Utility;
using OurSonicModels.Common;

namespace OurSonic
{
    public static class BuildAngular
    {
        private const string ScopeName = "$scope";
        private const string RootScopeName = "$rootScope";
        private const string CompileName = "$compile";
        private const string Http = "$http";
        private const string TemplateCache = "$templateCache";


        public static void Setup()
        {



            var module = angular.Module("acg", new string[] { "ui.utils", "ui.codemirror", "ui.bootstrap"  })
                .Config(new object[] {"$httpProvider", new Action<dynamic>(buildHttpProvider)})
                .Controller(LevelSelectorController.Name, new object[] {ScopeName, CreateUIService.Name, new Func<LevelSelectorScope, CreateUIService, object>((scope, createUIService) => new LevelSelectorController(scope, createUIService))})
                .Controller(ObjectFrameworkListController.Name, new object[] {ScopeName, CreateUIService.Name, new Func<ObjectFrameworkListScope, CreateUIService, object>((scope, createUIService) => new ObjectFrameworkListController(scope, createUIService))})
                .Controller(TileEditorController.Name, new object[] {ScopeName, CreateUIService.Name, new Func<TileEditorScope, CreateUIService, object>((scope, createUIService) => new TileEditorController(scope, createUIService))})
                .Controller(ObjectFrameworkEditorController.Name, new object[] {ScopeName, CreateUIService.Name, new Func<ObjectFrameworkEditorScope, CreateUIService, object>((scope, createUIService) => new ObjectFrameworkEditorController(scope, createUIService))})
                .Controller(AssetFrameEditorController.Name, new object[] {ScopeName, new Func<AssetFrameEditorScope, object>((scope) => new AssetFrameEditorController(scope))})
                .Service(CreateUIService.Name, new object[] {CompileName, RootScopeName, new Func<CompileService, IRootScopeService, object>((compileService, rootScopeService) => new CreateUIService(compileService, rootScopeService))})
                .Directive(FancyListDirective.Name, new object[] {new Func<object>(() => new FancyListDirective())})
                .Directive(FancyListIndexDirective.Name, new object[] {new Func<object>(() => new FancyListIndexDirective())})
                .Directive(FancyHorizontalListDirective.Name, new object[] {new Func<object>(() => new FancyHorizontalListDirective())})
                .Directive(FancyHorizontalListIndexDirective.Name, new object[] {new Func<object>(() => new FancyHorizontalListIndexDirective())})
                .Directive(CanvasTilePieceDirective.Name, new object[] { new Func<object>(() => new CanvasTilePieceDirective()) })
                .Directive(CanvasTileChunkDirective.Name, new object[] { new Func<object>(() => new CanvasTileChunkDirective()) })
                .Directive(CanvasPieceLayoutEditDirective.Name, new object[] {new Func<object>(() => new CanvasPieceLayoutEditDirective())})
                .Directive(CanvasPieceLayoutDirective.Name, new object[] {new Func<object>(() => new CanvasPieceLayoutDirective())})
                .Directive(CanvasAssetFrameDirective.Name, new object[] {new Func<object>(() => new CanvasAssetFrameDirective())})
                .Directive(CanvasAssetFrameEditDirective.Name, new object[] {new Func<object>(() => new CanvasAssetFrameEditDirective())})
                .Directive(CanvasAssetFramePaletteEditDirective.Name, new object[] {new Func<object>(() => new CanvasAssetFramePaletteEditDirective())})
                .Directive(CanvasPieceAssetDirective.Name, new object[] {new Func<object>(() => new CanvasPieceAssetDirective())})
                .Directive(DraggableDirective.Name, new object[] {new Func<object>(() => new DraggableDirective())})
                .Directive(FloatingWindowDirective.Name, new object[] {new Func<object>(() => new FloatingWindowDirective())})
                .Directive(ForNextDirective.Name, new object[] {new Func<object>(() => new ForNextDirective())})
                .Filter(RoundFilter.Name, new object[] {new Func<Func<object, object>>(() => new RoundFilter().Filter)})
                .Filter(SwitchFilter.Name, new object[] {new Func<Func<bool, object, object, object>>(() => new SwitchFilter().Filter)})
                .Run(new object[]
                     {
                         Http, TemplateCache, CreateUIService.Name, new Action<IHttpService, ITemplateCacheService, CreateUIService>(
                                                                        (http, templateCache, createUIService) =>
                                                                        {
                                                                            buildCache(http, templateCache);
                                                                            createUIService.Create(LevelSelectorController.View);
                                                                            createUIService.Create(ObjectFrameworkListController.View);
                                                                        })
                     });


/*

            var controllers = Assembly.GetExecutingAssembly().GetTypes().Where(a => typeof(IController).IsAssignableFrom(a) && !a.IsInterface);
            foreach (var controller in controllers)
            {
                ConstructorInfo constructorInfo = controller.GetConstructors()[0];
                var injection=new object[constructorInfo.ParameterTypes.Length+1];

                for (int index = 0; index < constructorInfo.ParameterTypes.Length; index++)
                {
                    var parameterType = constructorInfo.ParameterTypes[index];
                    if (typeof(IScope).IsAssignableFrom(parameterType))
                    {
                        injection[index] = "$scope";
                    }
                    else
                    {
                        injection[index] = GetConstant(parameterType, "Name").GetValue(null);
                    }
                }
                injection[constructorInfo.ParameterTypes.Length] = null;
                module.Controller(controller.Name, injection);
            }
*/



            //            MinimizeController.Register(module);

            angular.Bootstrap(Window.Document, "acg");
        }

        private static FieldInfo GetConstant(Type type,string name)
        {
            FieldInfo[] fieldInfos = type.GetFields(BindingFlags.Public |
                 BindingFlags.Static | BindingFlags.FlattenHierarchy);

            return fieldInfos.First(fi => fi.Name == name);
        }

        private static void buildCache(IHttpService http, ITemplateCacheService templateCache)
        {
            string[] uis =
            {
                LevelSelectorController.View,
            };
            for (int index = 0; index < uis.Length; index++)
            {
                var ui = string.Format("{1}partials/UIs/{0}.html", uis[index], Constants.ContentAddress);
                http.Get(ui, null).Success(a => templateCache.Put(ui, a));
            }
        }


        private static void buildHttpProvider(dynamic httpProvider)
        {
            httpProvider.defaults.useXDomain = true;
            Delete(httpProvider.defaults.headers.common["X-Requested-With"]);
        }

        [InlineCode("delete {o};")]
        private static void Delete(object o)
        {
        }
    }
}