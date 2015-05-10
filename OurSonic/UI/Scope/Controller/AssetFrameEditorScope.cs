using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using OurSonic.Level.Objects;
using OurSonic.UI.Scope.Directive;

namespace OurSonic.UI.Scope.Controller
{
    public class AssetFrameEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public AssetFrameEditorScopeModel Model { get; set; }
        [IntrinsicProperty]
        public AssetFrameEditorScopeCallback Callback { get; set; }
    }
    [Serializable]
    public class AssetFrameEditorScopeCallback
    {
    }
    [Serializable]
    public class AssetFrameEditorScopeModel
    {
        public LevelObjectAssetFrame Frame { get; set; }

        public bool EditOffset { get; set; }
        public bool EditHurtMap { get; set; }
        public bool EditCollisionMap { get; set; }
        public int LineWidth { get; set; }
        public int CurrentColor { get; set; }

    }
}