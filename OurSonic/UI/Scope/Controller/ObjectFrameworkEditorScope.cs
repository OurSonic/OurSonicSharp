using System;
using System.Runtime.CompilerServices;
using CodeMirrorLibrary;
using OurSonic.Level.Objects;
using OurSonic.UI.Directives;
using OurSonic.UI.Scope.Directive;

namespace OurSonic.UI.Scope.Controller
{
    public class ObjectFrameworkEditorScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public ObjectFrameworkEditorScopeModel Model { get; set; }
        [IntrinsicProperty]
        public ObjectFrameworkEditorScopeCallback Callback { get; set; }
    }

    [Serializable]
    public class ObjectFrameworkEditorScopeCallback
    {
        public Action EditAssetFrame { get; set; }
        public Action AddAsset { get; set; }
        public Action AddPiece { get; set; }
        public Action AddPieceLayout { get; set; }
        public Action AddProjectile { get; set; }
        public Action AddFrameToAsset { get; set; }
        public Action RemoveFrameFromAsset { get; set; }
        public Action RemoveAsset { get; set; }
        public Action RemovePiece { get; set; }
        public Action RemovePieceLayout { get; set; }
        public Action RemoveProjectile { get; set; }
        public Action<ModifyScript> ModifyScript { get; set; }
        public Action SaveChanges { get; set; }
    }

    [Serializable]
    public class ObjectFrameworkEditorScopeModel
    {
        public LevelObject ObjectData { get; set; }
        public LevelObjectAsset SelectedAsset { get; set; }
        public LevelObjectPiece SelectedPiece { get; set; }
        public LevelObjectPieceLayout SelectedPieceLayout { get; set; }
        public LevelObjectProjectile SelectedProjectile { get; set; }
        public LevelObjectAssetFrame SelectedAssetFrame { get; set; }
        public AssetFrameEditType AssetEditType { get; set; }
        public LevelObjectPieceLayoutPiece SelectedPieceLayoutPiece { get; set; }
        public ModifyScript ModifyScript { get; set; }
        public CodeMirrorOptions CodeMirrorOptions { get; set; }
        public CodeMirror CodeMirror { get; set; }
    }

    [NamedValues]
    public enum ModifyScript
    {
        None,
        Tick,
        Init,
        Collide,
        Hurt
    }
}