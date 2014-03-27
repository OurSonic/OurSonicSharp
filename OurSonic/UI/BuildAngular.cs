using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using System.Text;
using ng;
using OurSonic.UI.Controllers;
using OurSonic.UI.Directives;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services;
using OurSonic.Utility;

namespace OurSonic
{
    public static class BuildAngular
    {
        private const string ScopeName = "$scope";
        private const string RootScopeName = "$rootScope";
        private const string CompileName = "$compile";
        private const string Http = "$http";
        private const string TemplateCache = "$templateCache";


        public static void Setup( )
        {

            var module = angular.Module("acg", new string[] { "ui.utils", "ui.codemirror" })
                            .Config(new object[] { "$httpProvider", new Action<dynamic>(buildHttpProvider) })
                            .Controller(LevelSelectorController.Name, new object[] { ScopeName, CreateUIService.Name, new Func<LevelSelectorScope, CreateUIService, object>((scope, createUIService) => new LevelSelectorController(scope, createUIService)) })
                            .Service(CreateUIService.Name, new object[] { CompileName, RootScopeName, new Func<CompileService, IRootScopeService, object>((compileService, rootScopeService) => new CreateUIService(compileService, rootScopeService)) })
                            .Directive(FancyListDirective.Name, new object[] { new Func<object>(() => new FancyListDirective()) })
                            .Directive(DraggableDirective.Name, new object[] { new Func<object>(() => new DraggableDirective()) })
                            .Directive(FloatingWindowDirective.Name, new object[] { new Func<object>(() => new FloatingWindowDirective()) })
                            .Directive(ForNextDirective.Name, new object[] { new Func<object>(() => new ForNextDirective()) })
                //                            .Filter(RoundFilter.Name, new object[] { new Func<Func<object, object>>(() => new RoundFilter().Filter) })
                            .Run(new object[] { Http, TemplateCache, new Action<IHttpService, ITemplateCacheService>((http, templateCache) => buildCache(http, templateCache)) });

            //            MinimizeController.Register(module);

            angular.Bootstrap(Window.Document, "acg");

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
