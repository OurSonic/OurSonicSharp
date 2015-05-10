using System;
using System.Collections.Generic;
using System.Text;
using jQueryApi;
using OurSonic.Utility;

namespace OurSonic.UI.Directives
{

    public class DraggableDirective
    {
        public const string Name = "draggable";
        public Action<dynamic, jQueryObject, dynamic> link;

        public DraggableDirective()
        {
            link = linkFn;
        }

        private void linkFn(dynamic scope, jQueryObject element, dynamic attrs)
        {
            element.Me().draggable(new { cancel = ".window .inner-window" });
        }
    }
}
