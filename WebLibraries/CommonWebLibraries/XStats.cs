using System.Html;
using System.Runtime.CompilerServices;
namespace CommonWebLibraries
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("xStats")]
    public class XStats
    {
        [IntrinsicProperty]
        public Element Element { get; set; }
    }
}