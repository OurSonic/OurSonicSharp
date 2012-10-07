using System.Html;
using OurSonic.Utility;
namespace OurSonic
{
    public class Page
    {
        public Page()
        {
            var stats = new XStats();
            Document.Body.AppendChild(stats.Element);

            new SonicEngine();
        }
    }
}