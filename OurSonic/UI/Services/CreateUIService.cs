using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using System.Text;
using jQueryApi;
using ng;
using OurSonic.UI.Scope;
using OurSonic.Utility;

namespace OurSonic.UI.Services
{
    public class CreateUIService
    {
        public const string Name = "CreateUIService";
        private readonly CompileService myCompileService;
        private readonly IRootScopeService myRootScopeService;
        private JsDictionary<string, AngularElement> singltons = new JsDictionary<string, AngularElement>();

        public CreateUIService(CompileService compileService, IRootScopeService rootScopeService)
        {
            myCompileService = compileService;
            myRootScopeService = rootScopeService;
        }

        public CreatedUI<T> Create<T>(string ui) where T : ManagedScope
        {
            return Create<T>(ui, (a, b) => { });
        }

        public CreatedUI<T> Create<T>(string ui, Action<T, jQueryObject> populateScope) where T : ManagedScope
        {
            var scope = myRootScopeService.New<T>();
            var html =
                jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress));
            populateScope(scope, html);
            var item = myCompileService(html)(scope);
            item.AppendTo(Window.Document.Body);

            if (scope.Phase == null)
            {
                scope.Apply();
            }

            scope = angular.Element(item.Children()[0]).Scope<T>() ?? scope;

            return new CreatedUI<T>(scope, item);
        }


        public CreatedUI<ManagedScope> CreateSingleton(string ui)
        {
            return CreateSingleton<ManagedScope>(ui);
        }

        public CreatedUI<T> CreateSingleton<T>(string ui) where T : ManagedScope
        {
            return CreateSingleton<T>(ui, (a, b) => { });
        }

        public CreatedUI<T> CreateSingleton<T>(string ui, Action<T, jQueryObject> populateScope) where T : ManagedScope
        {
            T scope;

            if (singltons.ContainsKey(ui))
            {
                var html = singltons[ui];
                if (html.Parent().Length == 0)
                {
                    singltons.Remove(ui);
                }
            }

            if (singltons.ContainsKey(ui))
            {
                var html = singltons[ui];

                scope = myRootScopeService.New<T>();
                populateScope(scope, html);
                var item = myCompileService(html)(scope);
                if (scope.Phase == null)
                {
                    scope.Apply();
                }

                scope = angular.Element(item.Children()[0]).Scope<T>() ?? scope;
                return new CreatedUI<T>(scope, html);
            }
            else
            {
                scope = myRootScopeService.New<T>();
                var html =
                    jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui,
                        Constants.ContentAddress));
                populateScope(scope, html);
                var item = myCompileService(html)(scope);
                item.AppendTo(Window.Document.Body);
                if (scope.Phase == null)
                {
                    scope.Apply();
                }

                scope = angular.Element(item.Children()[0]).Scope<T>() ?? scope;
                singltons[ui] = item;

                return new CreatedUI<T>(scope, item);
            }
        }


        public CreatedUI<ManagedScope> Create(string ui)
        {
            var scope = (ManagedScope)myRootScopeService.New();
            var item =
                myCompileService(
                    jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress)))(scope);
            item.AppendTo(Window.Document.Body);
            if (scope.Phase == null)
            {
                scope.Apply();
            }

            scope = angular.Element(item.Children()[0]).Scope<ManagedScope>() ?? scope;


            return new CreatedUI<ManagedScope>(scope, item);
        }

        public CreatedUI<ManagedScope> Create(string ui, ManagedScope scope)
        {
            var item = myCompileService(jQuery.FromHtml(string.Format("<div ng-include src=\"'{1}partials/UIs/{0}.html'\"></div>", ui, Constants.ContentAddress)))(scope);
            item.AppendTo(Window.Document.Body);
            if (scope.Phase == null)
            {
                scope.Apply();
            }

            scope = angular.Element(item.Children()[0]).Scope<ManagedScope>() ?? scope;
            return new CreatedUI<ManagedScope>(scope, item);
        }
    }

    public class CreatedUI<T> where T : ManagedScope
    {
        public CreatedUI(T scope, AngularElement element)
        {
            Scope = scope;
            Element = element;
        }
        [IntrinsicProperty]
        public T Scope { get; set; }
        [IntrinsicProperty]
        public AngularElement Element { get; set; }

        public void Destroy()
        {
            if (Scope.OnDestroy != null)
            {
                Scope.OnDestroy();
            }
            Scope.Destroy();
            Element.Remove();
        }
    }

    public class ManagedScope : BaseScope
    {
        [IntrinsicProperty]
        public Action OnDestroy { get; set; }
    }
}
