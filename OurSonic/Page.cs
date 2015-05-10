using System.Html;
using OurSonic.Utility;
using jQueryApi;
namespace OurSonic
{
    public class Page
    {
        private Page()
        {
            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);

            new SonicEngine();
             

            BuildAngular.Setup(); 

        }

        public static void Main()
        {
            jQuery.OnDocumentReady(() => { new Page(); });
        }
    }
}