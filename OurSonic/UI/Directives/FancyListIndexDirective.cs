using System;
using jQueryApi;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class FancyListIndexDirective
    {
        public const string Name = "fancyListIndex";
        public Action<dynamic, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string templateUrl;
        public bool transclude;

        public FancyListIndexDirective()
        {
            restrict = "EA";
            templateUrl = string.Format("{0}partials/fancyListIndex.html", Constants.ContentAddress);
            replace = true;
            transclude = true;
            scope = new
            {
                items = "=",
                bindIndex = "=",
            };
            link = LinkFn;
        }

        private void LinkFn(dynamic scope, jQueryObject element, dynamic attr)
        {
            scope.itemClick = new Action<dynamic>((index) =>
            {
                scope.bindIndex = index;
            });

            scope.currentClass = new Func<dynamic, dynamic>((index) => (index == scope.bindIndex) ? "fancy-list-item fancy-list-item-selected" : "fancy-list-item ");
            scope.parentScope = scope["$parent"]["$parent"]["$parent"];
        }
    }
}
