using System;
using System.Collections.Generic;
using System.Linq;
using NodeJS;
using NodeJS.FSModule;
using NodeJS.HttpModule;
using OurSonicModels;
using OurSonicModels.Common;
using SocketIOLibrary;
namespace OurSonicNode
{
    public partial class Server
    {
        private JsDictionary<int, string> levelData;
        private string objDirectory = "/usr/local/src/sonic/ObjectData/";

        public Server()
        {
            Globals.SetInterval(() => { Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            levelData = new JsDictionary<int, string>();
            //load();

            var app = Http.CreateServer((req, res) => res.End());
            var io = SocketIO.Listen(app);

            string[] fileData = new string[0];
            string[] fileNames = new string[0];
            string levelsDir = "/usr/local/src/sonic/LevelData/";
            FS.Readdir(levelsDir,
                       (err, files) => {
                           for (int i = 0; i < files.Length; i++) {
                               int i1 = i;
                               fileNames[i1] = files[i].Replace(".min.js", "");
                               Console.Log(fileNames[i1] + " loaded");

                               FS.ReadFile(levelsDir + files[i], Encoding.Utf8, (er, file) => { fileData[i1] = file; });
                           }
                       });
            io.Set("log level", 1);
            app.Listen(8998);
            io.Sockets.On("connection",
                          new Action<SocketIOConnection>((SocketIOConnection socket) => {
                                                             int curLevel = 0;
                                                             socket.On("GetSonicLevel",
                                                                       new Action<string>((levelName) => {
                                                                                              Console.Log("Serving " + fileNames[curLevel] + "  " + curLevel);
                                                                                              socket.Emit("SonicLevel", new DataObject<string>(fileData[curLevel++ % fileData.Length]));
                                                                                          }));
                                                             socket.On("GetLevels.Request",
                                                                       new Action(() => {
                                                                                      Console.Log("Serving list");
                                                                                      socket.Emit("GetLevels.Response", new DataObject<string[]>(fileNames));
                                                                                  }));

                                                             socket.On("LoadLevel.Request",
                                                                       new Action<DataObject<string>>((levelName) => {
                                                                                                          Console.Log("Serving Level " + levelName.Data);
                                                                                                          socket.Emit("LoadLevel.Response", new DataObject<string>(fileData[fileNames.IndexOf(levelName.Data)]));
                                                                                                      }));

                                                             socket.On("GetObject",
                                                                       new Action<DataObject<string>>((_object) =>
                                                                                                      FS.Exists(objDirectory + _object.Data + ".js",
                                                                                                                (exists) =>
                                                                                                                FS.ReadFile(objDirectory + _object.Data + ".js",
                                                                                                                            Encoding.Utf8,
                                                                                                                            (err, result) => socket.Emit("GetObject.Response", new DataObject<string>(result))))));

                                                             socket.On("SaveObject",
                                                                       new Action<SaveObjectModel>((_object) => {
                                                                                                       FS.Exists(objDirectory + _object.OldKey + ".js",
                                                                                                                 (exists) => {
                                                                                                                     if (exists)
                                                                                                                         FS.UnlinkSync(objDirectory + _object.OldKey + ".js");
                                                                                                                     FS.WriteFileSync(objDirectory + _object.Key + ".js", _object.Data);
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
                                                                                                                            a => new {key = _objects[ind++], value = a}).
                                                                                                                                          ToArray()
                                                                                                                });
                                                                                            }));

                                                             socket.On("GetAllObjects",
                                                                       new Action<string[]>((_objects) => {
                                                                                                socket.Emit("GetAllObjects.Response",
                                                                                                            new {
                                                                                                                        Data =
                                                                                                                    FS.ReaddirSync(objDirectory).Where(a => a.EndsWith(( ".js" ))).Select(
                                                                                                                            a => a.Replace(".js", "")).ToArray()
                                                                                                                });
                                                                                            }));
                                                         }));
        }

        public static void Main()
        {
            new Server();
        }

        private IEnumerable<string> _getObjects(string[] _objects)
        {
            foreach (var _object in _objects) {
                if (!FS.ExistsSync(objDirectory + _object + ".js")) yield return "";
                else
                    yield return FS.ReadFileSync(objDirectory + _object + ".js", Encoding.Utf8);
            }
        }
    }
}