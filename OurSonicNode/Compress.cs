using System.Text;
using CommonWebLibraries;
using NodeJS;
using NodeJS.FSModule;
namespace OurSonicNode
{
    public class Compress
    {
        public Compress()
        {
            StringBuilder sb = new StringBuilder();
            int[] lines = {0};
            var __dirname = @"C:\code\SonicImageParser\data\LevelOutput\";
            FS.Readdir(__dirname,
                       (ex, ab) => {
                           foreach (var s in ab) {
                               string s1 = s;
                               FS.Readdir(__dirname + s,
                                          (ex2, ab2) => {
                                              foreach (var s2 in ab2) {
                                                  Console.Log(s2);
                                                  string s3 = s2;
                                                  FS.ReadFile(__dirname + s1 + "\\" + s2,
                                                              Encoding.Utf8,
                                                              (err, content) => {
                                                                  if (s3.EndsWith(".min.js")) FS.Unlink(__dirname + s1 + "\\" + s3);
                                                                  var fm = new Compressor().CompressText(content);
                                                                  FS.AppendFile("abcdef.js", string.Format("window.levelData[{0}] = '{1}';\r\n\r\n", lines[0]++, fm), Encoding.Utf8, (ecr) => { });
                                                                  var imj = ( __dirname + s1 + "\\" + s3 ).Replace(".js", ".min.js");
                                                                  FS.Unlink(__dirname + s1 + "\\" + s3);
                                                                  FS.WriteFile(imj, fm, (ecr2) => { });
                                                              });
                                              }
                                          });
                           }
                       });
        }
    }
}