using System;
using System.Collections.Generic;
using System.Linq;
using NodeJSLibrary;
using SocketIONodeLibrary;
namespace OurSonicNode
{
    public partial class Server
    {
        private string objDirectory = "/usr/local/src/sonic/ObjectData/";
        private JsDictionary<int, string> levelData;
        private FS fs;
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
                                          fs.ReadFile(levelsDir + files[i], "utf8", (er, file) => { fileData[i1] = file; });
                                      }
                                  });
            io.Set("log level", 1);
            app.Listen(8998);
            io.Sockets.On("connection", (SocketIOConnection socket) => {
                                            int curLevel = 0;
                                            socket.On("GetSonicLevel", (string levelName) => {
                                                                           Global.Console.Log("Serving " + fileNames[curLevel] + "  " + curLevel);
                                                                           socket.Emit("SonicLevel",
                                                                                       new {Data = fileData[curLevel++ % fileData.Length]});
                                                                       });

                                            socket.On("GetObject",
                                                      (string _object) =>
                                                      fs.Exists(objDirectory + _object + ".js",
                                                                (er, exists) =>
                                                                fs.ReadFile(objDirectory + _object + ".js", "utf8",
                                                                            (err, result) => socket.Emit("GetObject.Response", new {Data = result}))));

                                            socket.On("GetObjects", (string[] _objects) => {
                                                                        int ind = 0;
                                                                        socket.Emit("GetObjects.Response",
                                                                                    new {
                                                                                                Data =
                                                                                            _getObjects(_objects).Select(
                                                                                                    a => new {key = _objects[ind++], value = a}).ToArray()});
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
            foreach (var _object in _objects)
            {

                if (!fs.ExistsSync(objDirectory + _object + ".js")) yield return "";
                else
                    yield return fs.ReadFileSync(objDirectory + _object + ".js", "utf8");

            }
        }



    }
}