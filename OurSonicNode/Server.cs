using System.Collections.Generic;
using NodeJSLibrary;
using SocketIONodeLibrary;
namespace OurSonicNode
{
    public partial class Server
    {
        private JsDictionary<int, string> levelData;

        public Server()
        {
            levelData = new JsDictionary<int, string>();
            //load();
            var http = Global.Require<Http>("http");
            var app = http.CreateServer((req, res) => res.End());
            var io = Global.Require<SocketIOModule>("socket.io").Listen(app);

            var fs = Global.Require<FS>("fs");
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
                                            socket.On("disconnect", (string data) => { });          
                                        });
        }
    }
}