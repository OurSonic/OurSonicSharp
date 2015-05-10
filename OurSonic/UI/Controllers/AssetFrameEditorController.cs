
using System;
using System.Collections.Generic;
using System.Html;
using jQueryApi;
using OurSonic.Level.Objects;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Services;
using OurSonic.UIManager;
using OurSonic.Utility;
using OurSonicModels;
using OurSonicModels.Common;
using Element = OurSonic.UIManager.Element;

namespace OurSonic.UI.Controllers
{
    internal class AssetFrameEditorController : IController
    {
        public const string Name = "AssetFrameEditorController";
        public const string View = "AssetFrameEditor";
        private readonly AssetFrameEditorScope scope;

        public AssetFrameEditorController(AssetFrameEditorScope scope)
        {
            this.scope = scope;
            this.scope.Visible = true;
            this.scope.Model.LineWidth = 1;
        } 
    }

    public interface IController
    {
    }
}