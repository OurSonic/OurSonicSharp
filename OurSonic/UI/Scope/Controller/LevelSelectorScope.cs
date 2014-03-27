using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using OurSonic.UI.Scope.Directive;

namespace OurSonic.UI.Scope.Controller
{

    public class LevelSelectorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public LevelSelectorScopeModel Model { get; set; }
        [IntrinsicProperty]
        public LevelSelectorScopeCallback Callback { get; set; }
    }

    [Serializable]
    public class LevelSelectorScopeCallback
    {
        public Action WindowClosed { get; set; }
        public Action<LevelModel> LoadLevel { get; set; }
    }
    [Serializable]
    public class LevelSelectorScopeModel
    {
        public LevelModel SelectedLevel { get; set; }
        public string LoadingStatus { get; set; } 
        public List<LevelModel> Levels { get; set; }
    }
    [Serializable]
    public class LevelModel
    {
        public string Name { get; set; }
    }
}
