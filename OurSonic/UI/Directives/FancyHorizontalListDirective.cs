using System;
using jQueryApi;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{
    public class FancyHorizontalListDirective
    {
        public const string Name = "fancyHorizontalList";
        public Action<dynamic, jQueryObject, dynamic> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string templateUrl;
        public bool transclude;

        public FancyHorizontalListDirective()
        {
            restrict = "EA";
            templateUrl = string.Format("{0}partials/fancyHorizontalList.html", Constants.ContentAddress);
            replace = true;
            transclude = true;
            scope = new
            {
                items = "=",
                bind = "=",
            };
            link = LinkFn;
        }

        private void LinkFn(dynamic scope, jQueryObject element, dynamic attr)
        {
            scope.itemClick = new Action<dynamic>((item) =>
                                                  {
                                                      scope.bind = item;
                                                  });
 
            scope.currentClass = new Func<dynamic, dynamic>((item) => (item == scope.bind) ? "fancy-horizontal-list-item fancy-horizontal-list-item-selected" : "fancy-horizontal-list-item ");
            scope.parentScope = scope["$parent"]["$parent"]["$parent"];
        }
    }
}
