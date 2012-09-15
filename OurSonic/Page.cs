using System;
using System.Collections.Generic;
using System.Html; 
using System.Html;
using System.Runtime.CompilerServices;
using CommonWebLibraries;

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
