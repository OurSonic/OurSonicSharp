using System;
using System.Collections.Generic;
using System.Linq;
using NodeJSLibrary;
using OurSonicModels;
using OurSonicModels.Common;
using SocketIOLibrary;
namespace OurSonicNode
{
    public   class Server
    { 
        private string objDirectory = "ObjectData/";
        private FS fs;

        public Server()
        {
            fs = Global.Require<FS>("fs");
         var    http = Global.Require<Http>("http");

            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
 
            //load();

            var app = http.CreateServer((req, res) => res.End());
            var io = SocketIO.Listen(app);

            string[] fileData = new string[0];
            string[] fileNames = new string[0];
            string levelsDir = "LevelData/";
            fs.Readdir(levelsDir,
                       (err, files) => {
                           for (int i = 0; i < files.Length; i++) {
                               int i1 = i;
                               fileNames[i1] = files[i].Replace(".min.js", "");
                               Global.Console.Log(fileNames[i1] + " loaded");

                               fs.ReadFile(levelsDir + files[i],"utf8" , (er, file) => { fileData[i1] = file; });
                           }
                       });
            io.Set("log level", 1);
            app.Listen(8998);
            io.Sockets.On("connection",
                          new Action<SocketIOConnection>((SocketIOConnection socket) => {
                                                             int curLevel = 0;
                                                             socket.On("GetSonicLevel",
                                                                       new Action<string>((levelName) => {
                                                                                              Global.Console.Log("Serving " + fileNames[curLevel] + "  " + curLevel);
                                                                                              socket.Emit("SonicLevel", new DataObject<string>(fileData[curLevel++ % fileData.Length]));
                                                                                          }));
                                                             socket.On("GetLevels.Request",
                                                                       new Action(() => {
                                                                                      Global.Console.Log("Serving list");
                                                                                      socket.Emit("GetLevels.Response", new DataObject<string[]>(fileNames));
                                                                                  }));

                                                             socket.On("LoadLevel.Request",
                                                                       new Action<DataObject<string>>((levelName) => {
                                                                                                          Global.Console.Log("Serving Level " + levelName.Data);
                                                                                                          socket.Emit("LoadLevel.Response", new DataObject<string>(fileData[fileNames.IndexOf(levelName.Data)]));
                                                                                                      }));

                                                             socket.On("GetObject",
                                                                       new Action<DataObject<string>>((_object) =>
                                                                                                      fs.Exists(objDirectory + _object.Data + ".js",
                                                                                                                (er,exists) =>
                                                                                                                fs.ReadFile(objDirectory + _object.Data + ".js",
                                                                                                                            "utf8",
                                                                                                                            (err, result) => socket.Emit("GetObject.Response", new DataObject<string>(result))))));

                                                             socket.On("SaveObject",
                                                                       new Action<SaveObjectModel>((_object) => {
                                                                                                       fs.Exists(objDirectory + _object.OldKey + ".js",
                                                                                                                 (er, exists) =>
                                                                                                                 {
                                                                                                                     if (exists)
                                                                                                                         fs.Unlink(objDirectory + _object.OldKey + ".js");
                                                                                                                     fs.WriteFileSync(objDirectory + _object.Key + ".js", _object.Data);
                                                                                                                     socket.Emit("SaveObject.Response", new {Data = true});
                                                                                                                 });
                                                                                                   }));

                                                             socket.On("GetObjects",
                                                                       new Action<string[]>((_objects) => {
                                                                                                int ind = 0;
                                                                                                socket.Emit("GetObjects.Response",
                                                                                                            new {
                                                                                                                        Data =
                                                                                                                    _getObjects(_objects).Select(
                                                                                                                            a => new {key = _objects[ind++], value = a})
                                                                                                                });
                                                                                            }));

                                                             socket.On("GetAllObjects",
                                                                       new Action<string[]>((_objects) => {
                                                                                                socket.Emit("GetAllObjects.Response",
                                                                                                            new {
                                                                                                                        Data =
                                                                                                                    fs.ReaddirSync(objDirectory).Where(a => a.EndsWith(( ".js" ))).Select(
                                                                                                                            a => a.Replace(".js", ""))
                                                                                                                });
                                                                                            }));
                                                         }));
        }

        public static void Main()
        {
     //    new Compress();
            new Server();
        }

        private IEnumerable<string> _getObjects(string[] _objects)
        {
            foreach (var _object in _objects) {
                if (!fs.ExistsSync(objDirectory + _object + ".js")) yield return "";
                else
                    yield return fs.ReadFileSync(objDirectory + _object + ".js", "utf8");
            }
        }
    }

    public static class EnumerableExtensions
    {
        public static T[] Where<T>(this T[] items, Func<T, bool> clause)
        {
            List<T> items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2.ToArray();
        }
        public static T2[] Select<T, T2>(this T[] items, Func<T, T2> clause)
        {
            List<T2> items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.Add(clause(item));
            }
            return items2.ToArray();
        }



        public static T[] Where<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {
            List<T> items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2.ToArray();
        }
        public static T2[] Select<T, T2>(this IEnumerable<T> items, Func<T, T2> clause)
        {
            List<T2> items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.Add(clause(item));
            }
            return items2.ToArray();
        }
    }
}