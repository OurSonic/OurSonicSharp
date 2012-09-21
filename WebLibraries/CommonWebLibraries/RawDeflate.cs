using System.Runtime.CompilerServices;
namespace CommonWebLibraries
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    [ScriptName("Compressor")]
    public class Compressor
    {
        [ScriptName("CompressText")]
        public string CompressText(string txt)
        {
            return null;
        }

        [ScriptName("DecompressText")]
        public string DecompressText(string txt)
        {
            return null;
        }
    }
}