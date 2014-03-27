using System;
using System.Collections.Generic;
using System.Html;
using System.Text;
using OurSonic.UI.Scope.Controller;
using OurSonic.UI.Scope.Directive;
using OurSonic.UI.Services;

namespace OurSonic.UI.Controllers
{
    internal class LoginController
    {
        public const string Name = "LoginController";
        public const string View = "Login";
        private readonly LoginScope myScope;
        private readonly CreateUIService myCreateUIService;

        public LoginController(LoginScope scope,CreateUIService createUIService)
        {
            myScope = scope;
            myScope.Visible = true;
            myCreateUIService = createUIService;
            myScope.Model = new LoginScopeModel();
            /*
                        scope.Model.dosomething += (o) =>
                        {
                            Console.WriteLine(o);
                        };
            */
            scope.Model.Username = "dested1";
            scope.Model.Password = "d";


            myScope.Model.WindowClosed = () => { Window.Alert("woooo"); }; 
            myScope.Model.LoginAccount = LoginAccountFn;
            myScope.Model.CreateAccount = CreateAccountFn;

            /* myScope.Model.Username = "dested1";
            myScope.Model.Password = "d";

            */
            //            Window.SetTimeout(LoginAccountFn, 250);
        }
          

        private void CreateAccountFn()
        {
            myScope.SwingAway(SwingDirection.Left, false, null);
        }

        private void LoginAccountFn()
        {
            myScope.SwingAway(SwingDirection.Right, false, null);
        }

 
    }
}
