using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using OurSonic.UI.Scope.Directive;

namespace OurSonic.UI.Scope.Controller
{
    public class ObjectFrameworkListScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public ObjectFrameworkListScopeModel Model { get; set; }
        [IntrinsicProperty]
        public ObjectFrameworkListScopeCallback Callback { get; set; }
    }

    [Serializable]
    public class ObjectFrameworkListScopeCallback
    {
        public Action<ObjectModel> LoadObject { get; set; }
        public Action CreateFramework { get; set; }
        public Action SaveFramework { get; set; }
    }
    [Serializable]
    public class ObjectFrameworkListScopeModel
    {
        public ObjectModel SelectedObject { get; set; }
        public List<ObjectModel> Objects { get; set; }
    }
    [Serializable]
    public class ObjectModel
    {
        public string Name { get; set; }
    }
}