using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using OurSonic.UI.Scope.Directive;

namespace OurSonic.UI.Scope.Controller
{

    public class LoginScope : FloatingWindowBaseScope
    {
        [IntrinsicProperty]
        public LoginScopeModel Model { get; set; }
    }

    [Serializable]
    public class LoginScopeModel
    {
        public Action WindowClosed { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Action CreateAccount { get; set; }
        public Action LoginAccount { get; set; }
        public Action<object> dosomething { get; set; }
    }
}
