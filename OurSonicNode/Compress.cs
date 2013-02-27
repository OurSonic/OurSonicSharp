using System.Text;
using CommonWebLibraries;

using NodeJSLibrary;
namespace OurSonicNode
{
    public class Compress
    {
        public Compress()
        {
            var fs=new FS();
            StringBuilder sb = new StringBuilder();
            int[] lines = {0};
            var __dirname = @"C:\code\SonicImageParser\data\LevelOutput\";
            fs.Readdir(__dirname,
                       (ex, ab) => {
                           foreach (var s in ab) {
                               string s1 = s;
                               fs.Readdir(__dirname + s,
                                          (ex2, ab2) => {
                                              foreach (var s2 in ab2) {
                                                  Global.Console.Log(s2);
                                                  string s3 = s2;
                                                  fs.ReadFile(__dirname + s1 + "\\" + s2,"utf8",
                                                              (err, content) => {
                                                                  if (s3.EndsWith(".min.js")) fs.Unlink(__dirname + s1 + "\\" + s3);
                                                                  var fm = new Compressor().CompressText(content);
                                                                //FS.AppendFile("abcdef.js", string.Format("window.levelData[{0}] = '{1}';\r\n\r\n", lines[0]++, fm), "utf8", (ecr) => { });
                                                                  var imj = ( __dirname + s1 + "\\" + s3 ).Replace(".js", ".min.js");
                                                                  fs.Unlink(__dirname + s1 + "\\" + s3);
                                                                  fs.WriteFile(imj, fm, (er,ecr2) => { });
                                                              });
                                              }
                                          });
                           }
                       });
        }
    }
}