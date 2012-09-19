using System.Collections.Generic;
using System.Linq;
namespace OurSonicNode
{
    public class Server
    {
        public Server()
        {

            int[][] mf = new int[10][];
            List<int> bars = new List<int>();
            //some setup code

            List<int> foo = new List<int>();


            foreach (var bar in bars) {
                foreach (var inds in mf) {
                if(inds.Any(a=>a==bar)) {
                    foo.Add(inds[0]);

                }
            }
            }

            //var io = Global.Require<SocketIO>("socket.io").Listen(app);
        }
    }
}