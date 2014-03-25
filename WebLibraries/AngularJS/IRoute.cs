using System;
using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// see http://docs.angularjs.org/api/ng.$routeProvider#when for options explanations
    /// </summary>
    [Serializable]
    [Imported]
    public class Route
    {
        

        public string Controller{ get; set; }
        public string Template { get; set; }
        [ScriptName("templateUrl")]
        public string TemplateURL { get; set; }
        public object Resolve { get; set; }
        public string RedirectTo { get; set; }
        public bool ReloadOnSearch { get; set; }

#if TODO
        controller?: any;
        template?: string;
        templateUrl?: string;
        resolve?: any;
        redirectTo?: any;
        reloadOnSearch?: bool;
#endif
    }
}