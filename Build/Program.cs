using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
namespace Build
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string shufSharp = "OurSonicSharp";

            var projs = new[] {
/*
                    shufSharp+@"\Libraries\CommonLibraries\",
                    shufSharp+@"\Libraries\CommonShuffleLibrary\",
                    shufSharp+@"\Libraries\ShuffleGameLibrary\",
*/
/*
                    shufSharp+@"\Servers\AdminServer\",
                    shufSharp+@"\Servers\ChatServer\",
                    shufSharp+@"\Servers\DebugServer\",
                    shufSharp+@"\Servers\GameServer\",
                    shufSharp+@"\Servers\GatewayServer\",
                    shufSharp+@"\Servers\HeadServer\",
                    shufSharp+@"\Servers\SiteServer\",
*/
/*
                    shufSharp+@"\Models\",
                    shufSharp+@"\Client\",
*/
                                      shufSharp + @"\OurSonic\",
                                      shufSharp + @"\OurSonicNode\",
                              };
            var md = new DirectoryInfo(Directory.GetCurrentDirectory());

            var pre = md.Parent.Parent.Parent.Parent.FullName + "\\";

            foreach (var proj in projs) {
#if DEBUG
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#else
                var from = pre + proj + @"\bin\release\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#endif
                var to = pre + shufSharp + @"\output\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if (File.Exists(to)) File.Delete(to);
                File.Copy(from, to);
            }

            //client happens in buildsite.cs
            var depends = new Dictionary<string, Application> {
                                                                      {
                                                                              shufSharp + @"\OurSonic\",
                                                                              new Application(false, "$(function(){new OurSonic.Page();});",
                                                                                              new List<string> {
/*
                                @"./CommonLibraries.js",
                                @"./CommonShuffleLibrary.js",
                                @"./ShuffleGameLibrary.js",
                                @"./Models.js",
                                @"./RawDeflate.js",
*/
                                                                                                               })
                                                                      }, {
                                                                                 shufSharp + @"\OurSonicNode\",
                                                                                 new Application(true, "new OurSonicNode.Server();", new List<string> {
                                                                                                                                                              @"./RawDeflate.js",
                                                                                                                                                              @"./RawDeflate.js",
                                                                                                                                                      })
                                                                         },
                                                              };
            foreach (var depend in depends) {
                var to = pre + shufSharp + @"\output\" + depend.Key.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

                if (depend.Value.Node) {
                    output += "require('./mscorlib.node.debug.js');";
                    output += "Enumerable=require('./linq.js');";
                } else
                {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in depend.Value.IncludesAfter) {
                    output += string.Format("require('{0}');", depe);
                }

                var lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                lines.Add(depend.Value.After);

                File.WriteAllLines(to, lines);
            }

/*
            foreach (var d in Directory.GetDirectories(pre + shufSharp + @"\ShuffleGames\"))
            {
                var to = pre + shufSharp + @"\output\Games\" + d.Split('\\').Last();
                if (!Directory.Exists(to))

                    Directory.CreateDirectory(to);
                if (d.EndsWith("bin") || d.EndsWith("obj"))
                {
                    continue;
                }
                File.WriteAllText(to + @"\app.js", File.ReadAllText(d + @"\app.js"));
            }
*/
        }

        #region Nested type: Application

        public class Application
        {
            public string After { get; set; }
            public bool Node { get; set; }
            public List<string> IncludesAfter { get; set; }

            public Application(bool node, string prepend, List<string> includesAfter)
            {
                After = prepend;
                Node = node;
                IncludesAfter = includesAfter;
            }
        }

        #endregion
    }
}