//#define FTP
//#define COMPRESS
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using Limilabs.FTP.Client;
using Renci.SshNet;
namespace Build
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string shufSharp = "osoni";

            var projs = new[] {
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

            foreach (var file in Directory.GetFiles(pre + shufSharp + @"\OurSonic\UI\Partials\Areas"))
            {

                var to = pre + shufSharp + @"\output\partials\UIs\" + file.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last();

                if (File.Exists(to)) File.Delete(to);

                File.Copy(file, to);
            }
            foreach (var file in Directory.GetFiles(pre + shufSharp + @"\OurSonic\UI\Partials\Directives"))
            {

                var to = pre + shufSharp + @"\output\partials\" + file.Split(new[] { "\\" }, StringSplitOptions.RemoveEmptyEntries).Last();

                if (File.Exists(to)) File.Delete(to);

                File.Copy(file, to);
            }
                
            
                                      
            

            //client imports happens in buildsite.cs
            var imports = new Dictionary<string, Application> {
                                                                      {
                                                                              shufSharp + @"\OurSonic\",
                                                                              new Application(false,
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
                                                                                 new Application(true,
                                                                                                 new List<string> {
                                                                                                                          @"./lib/RawDeflate.js",
                                                                                                                          @"./OurSonicModels.js",
                                                                                                                  })
                                                                         },
                                                              };

#if FTP
            Console.WriteLine("connecting ftp");
             

            SftpClient client = new SftpClient("50.116.28.16", "root", "FuckYou1!");
            client.Connect();

         /*   Ftp webftp = new Ftp();
            webftp.Connect("dested.com");
            webftp.Login("dested", "Ddested");
            Console.WriteLine("connected");

            webftp.Progress += (e, c) => {
                                   Console.SetCursorPosition(65, 5);
                                   Console.Write("|");

                                   for (int i = 0; i < c.Percentage / 10; i++) {
                                       Console.Write("=");
                                   }
                                   for (int i = (int) ( c.Percentage / 10 ); i < 10; i++) {
                                       Console.Write("-");
                                   }
                                   Console.Write("|");

                                   Console.Write(c.Percentage + "  %  ");
                                   Console.WriteLine();
                               };
*/
#endif 
            
            foreach (var depend in imports) {
                var to = pre + shufSharp + @"\output\" + depend.Key.Split(new[] {"\\"}, StringSplitOptions.RemoveEmptyEntries).Last() + ".js";
                var output = "";

                if (depend.Value.Node) {
                    output += "require('./mscorlib.js');";
//                    output += "Enumerable=require('./linq.js');";
                } else {
                    //output += "require('./mscorlib.debug.js');";
                }

                foreach (var depe in depend.Value.IncludesAfter) {
                    output += string.Format("require('{0}');", depe);
                }

                string text = output + ";" + File.ReadAllText(to);

#if COMPRESS
                Yahoo.Yui.Compressor.JavaScriptCompressor jc = new JavaScriptCompressor();
                jc.ObfuscateJavascript = true;
                text=jc.Compress(text);
#endif

                File.WriteAllText(to, text);
                Console.WriteLine("writing " + to);

                var name = to.Split(new char[] {'\\'}, StringSplitOptions.RemoveEmptyEntries).Last();
                File.WriteAllText(@"C:\inetpub\wwwroot\sonic\" + name, text);

#if FTP
                Console.WriteLine("ftp start " + text.Length.ToString("N0"));
                //webFTP.Upload("/httpdocs/nsonic/" + name, to);
                client.UploadFile(File.OpenRead(@"C:\inetpub\wwwroot\sonic\" + name), "/var/www/sonic/" + name);
                Console.WriteLine("ftp complete " + to);
#endif

                //serverftp.Upload("/usr/local/src/sonic/" + to.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries).Last(), to);
            }
            if (Directory.Exists(@"C:\inetpub\wwwroot\sonic\partials"))
                Directory.Delete(@"C:\inetpub\wwwroot\sonic\partials",true);
            DirectoryCopy(pre + shufSharp + @"\output\partials\", @"C:\inetpub\wwwroot\sonic\partials", true);

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
        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);
            DirectoryInfo[] dirs = dir.GetDirectories();

            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }

            // If the destination directory doesn't exist, create it. 
            if (!Directory.Exists(destDirName))
            {
                Directory.CreateDirectory(destDirName);
            }

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                string temppath = Path.Combine(destDirName, file.Name);
                file.CopyTo(temppath, false);
            }

            // If copying subdirectories, copy them and their contents to new location. 
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    string temppath = Path.Combine(destDirName, subdir.Name);
                    DirectoryCopy(subdir.FullName, temppath, copySubDirs);
                }
            }
        }
        #region Nested type: Application

        public class Application
        {
            public bool Node { get; set; }
            public List<string> IncludesAfter { get; set; }

            public Application(bool node, List<string> includesAfter)
            {
                Node = node;
                IncludesAfter = includesAfter;
            }
        }

        #endregion
    }
}