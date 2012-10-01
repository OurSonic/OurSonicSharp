using System;
using System.Collections.Generic;
using System.Linq;
using NodeJSLibrary;
using OurSonicModels;
using OurSonicModels.Common;
using SocketIONodeLibrary;
namespace OurSonicNode
{
    public partial class Server
    {
        private FS fs;
        private JsDictionary<int, string> levelData;
        private string objDirectory = "/usr/local/src/sonic/ObjectData/";

        public Server()
        {
            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            levelData = new JsDictionary<int, string>();
            //load();
            var http = Global.Require<Http>("http");
            var app = http.CreateServer((req, res) => res.End());
            var io = Global.Require<SocketIOModule>("socket.io").Listen(app);

            fs = Global.Require<FS>("fs");
            string[] fileData = new string[0];
            string[] fileNames = new string[0];
            string levelsDir = "/usr/local/src/sonic/LevelData/";
            fs.Readdir(levelsDir, (err, files) => {
                                      for (int i = 0; i < files.Length; i++) {
                                          int i1 = i;
                                          fileNames[i1] = files[i];
                                          Global.Console.Log(fileNames[i1] + " loaded");
                                          
                                          fs.ReadFile(levelsDir + files[i], "utf8", (er, file) => { fileData[i1] = file; });
                                      }
                                  });
            io.Set("log level", 1);
            app.Listen(8998);
            io.Sockets.On("connection", (SocketIOConnection socket) => {
                                            int curLevel = 0;
                                            socket.On("GetSonicLevel", (string levelName) =>
                                            {
                                                Global.Console.Log("Serving " + fileNames[curLevel] + "  " + curLevel);
                                                socket.Emit("SonicLevel",new DataObject<string>(fileData[curLevel++ % fileData.Length]));
                                            });
                                            socket.On("GetLevels.Request", () =>
                                            {
                                                Global.Console.Log("Serving list");
                                                socket.Emit("GetLevels.Response", new DataObject<string[]>(fileNames));
                                            });


                                            socket.On("LoadLevel.Request", (DataObject<string> levelName) =>
                                            {
                                                Global.Console.Log("Serving Level " + levelName.Data);
                                                socket.Emit("LoadLevel.Response", new DataObject<string>(fileData[fileNames.IndexOf(levelName.Data)]));
                                            });

                                            socket.On("GetObject",
                                                      (DataObject<string> _object) =>
                                                      fs.Exists(objDirectory + _object.Data + ".js",
                                                                (er, exists) =>
                                                                fs.ReadFile(objDirectory + _object.Data + ".js", "utf8",
                                                                            (err, result) => socket.Emit("GetObject.Response", new DataObject<string>(result)))));

                                            socket.On("SaveObject",
                                                      (SaveObjectModel _object) => {



                                                          fs.Exists(objDirectory + _object.OldKey + ".js",
                                                                    (er, exists) =>
                                                                    {
                                                                        if(exists)
                                                                            fs.TruncateSync(objDirectory + _object.OldKey + ".js", 0);
                                                                        fs.WriteFileSync(objDirectory + _object.Key + ".js", _object.Data);
                                                                        socket.Emit("SaveObject.Response", new { Data = true });
                                                                    });


                                                           


                                                      });

                                            socket.On("GetObjects", (string[] _objects) => {
                                                                        int ind = 0;
                                                                        socket.Emit("GetObjects.Response",
                                                                                    new {
                                                                                                Data =
                                                                                            _getObjects(_objects).Select(
                                                                                                    a => new {key = _objects[ind++], value = a}).
                                                                                            ToArray()
                                                                                        });
                                                                    });
                                            socket.On("GetAllObjects",
                                                      (string[] _objects) =>
                                                      socket.Emit("GetAllObjects.Response",
                                                                  new {
                                                                              Data =
                                                                          fs.ReaddirSync(objDirectory).Where(a => a.EndsWith(( ".js" ))).Select(
                                                                                  a => a.Replace(".js", "")).ToArray()
                                                                      }));
                                        });
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
}