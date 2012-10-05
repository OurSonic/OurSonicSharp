﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Limilabs.FTP.Client;
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
                                      shufSharp + @"\OurSonicModels\",
                              };
            var md = new DirectoryInfo(Directory.GetCurrentDirectory());

            var pre = md.Parent.Parent.Parent.Parent.FullName + "\\";
            Console.WriteLine("starting");

            foreach (var proj in projs)
            {
#if DEBUG
                var from = pre + proj + @"\bin\debug\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#else
                var from = pre + proj + @"\bin\release\" + proj.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
#endif
                var to = pre + shufSharp + @"\output\" + proj.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                if (File.Exists(to)) File.Delete(to);
                File.Copy(from, to);
                Console.WriteLine("copying " + to);
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
                                @"./RawDeflate.js",
*/
                                

                                                                                                               })
                                                                      }, {
                                                                                 shufSharp + @"\OurSonicNode\",
                                                                                 new Application(true, "new OurSonicNode.Server();", new List<string> {
                                                                                                                                                              @"./RawDeflate.js",
                                @"./OurSonicModels.js",

                                                                                                                                                      })
                                                                         },
                                                              };

            Console.WriteLine("connecting ftp");

            Ftp webftp = new Ftp();
            webftp.Connect("dested.com");
            webftp.Login("dested", "Ddested");
            Console.WriteLine("connected");

            webftp.Progress += (e,c) => {
                 

                                   Console.SetCursorPosition(65, 5);
                                   Console.Write("|");
                
                for (int i = 0; i < c.Percentage / 10; i++)
                {
                    Console.Write("=");
                }
                for (int i = (int) ( c.Percentage / 10 ); i < 10; i++)
                {
                    Console.Write("-");
                }
                Console.Write("|");

                Console.Write(c.Percentage + "  %  ");
                Console.WriteLine();

                               };

/*            Ftp serverftp = new Ftp();
            serverftp.Connect("50.116.22.241");
            serverftp.Login("dested", "FuckYou1!");*/

            foreach (var depend in depends)
            {
                var to = pre + shufSharp + @"\output\" + depend.Key.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

                if (depend.Value.Node)
                {
                    output += "require('./mscorlib.node.debug.js');";
                    output += "Enumerable=require('./linq.js');";
                }
                else
                {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in depend.Value.IncludesAfter)
                {
                    output += string.Format("require('{0}');", depe);
                }

                var lines = new List<string>();
                lines.Add(output);
                lines.AddRange(File.ReadAllLines(to));

                lines.Add(depend.Value.After);

                File.WriteAllLines(to, lines);
                Console.WriteLine("writing "+to);

                Console.WriteLine("ftp start " + lines.Sum(a=>a.Length).ToString("d"));
                webftp.Upload("/httpdocs/nsonic/" + to.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries).Last(), to);
                Console.WriteLine("ftp complete " + to);

                //serverftp.Upload("/usr/local/src/sonic/" + to.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries).Last(), to);

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