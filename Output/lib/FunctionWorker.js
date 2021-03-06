var me = (self || window);
me.FunctionWorker = function(scriptName) {
    this.scriptName = scriptName;
    this.threadedFunction = function(func, onfinished, callback, initialData) {
        var worker = new Worker(this.scriptName);
        worker.onmessage = (function(e) {
            var f = e.data;
//            eval("f=" + JSON.parse(e.data));

            switch (f.state) {
            case 'callback':
                callback && callback(f);
                break;
            case 'finished':
                onfinished && onfinished(f);
                break;
            }
        });

        var script = "(function (_e) { (" + func.toString() + ")(_e);})";

        var toSend = "{ caller: " + script + ",initialData:'" + initialData + "' }";
        worker.postMessage(toSend); // Send data to our worker.
    };
    return this;
};

onmessage = function(e) {
    var f;
    eval("f=" + e.data);
    var aj;
    eval("aj=({ callback: function (j) { self.postMessage({data:j,state:'callback'}); }, data: '" + f.initialData + "'}); (" + f.caller + ")(aj);");
    self.postMessage({ data: aj.data, state: 'finished' });
};


function hasWebWorker() {
    return false && typeof Worker !== "undefined";
}