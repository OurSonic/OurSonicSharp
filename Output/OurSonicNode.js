require('./mscorlib.node.debug.js');require('./RawDeflate.js');
Type.registerNamespace('OurSonicNode');
////////////////////////////////////////////////////////////////////////////////
// OurSonicNode.Compress
OurSonicNode.Compress = function() {
	var sb = new ss.StringBuilder();
	var lines = [0];
	var fs = require('fs');
	var __dirname = 'C:\\code\\SonicImageParser\\data\\LevelOutput\\';
	fs.readdir(__dirname, function(ex, ab) {
		for (var $t1 = 0; $t1 < ab.length; $t1++) {
			var s = ab[$t1];
			var s1 = { $: s };
			fs.readdir(__dirname + s, Function.mkdel({ s1: s1 }, function(ex2, ab2) {
				for (var $t2 = 0; $t2 < ab2.length; $t2++) {
					var s2 = ab2[$t2];
					console.log(s2);
					var s3 = { $: s2 };
					fs.readFile(__dirname + this.s1.$ + '\\' + s2, 'utf8', Function.mkdel({ s3: s3, s1: this.s1 }, function(err, content) {
						if (this.s3.$.endsWith('.min.js')) {
							fs.unlink(__dirname + this.s1.$ + '\\' + this.s3.$);
						}
						var fm = (new Compressor()).CompressText(content);
						fs.appendFile('abcdef.js', String.format('window.levelData[{0}] = \'{1}\';\r\n\r\n', lines[0]++, fm), 'utf8', function(a, b) {
						});
						var imj = (__dirname + this.s1.$ + '\\' + this.s3.$).replaceAll('.js', '.min.js');
						fs.writeFile(imj, fm, function(a1, b1) {
						});
					}));
				}
			}));
		}
	});
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicNode.Server
OurSonicNode.Server = function() {
	this.$levelData = null;
	this.$levelData = {};
	//load();
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = require('socket.io').listen(app);
	var fs = require('fs');
	var fileData = [];
	var fileNames = [];
	var levelsDir = '/usr/local/src/sonic/LevelData/';
	fs.readdir(levelsDir, function(err, files) {
		for (var i = 0; i < files.length; i++) {
			var i1 = { $: i };
			fileNames[i1.$] = files[i];
			fs.readFile(levelsDir + files[i], 'utf8', Function.mkdel({ i1: i1 }, function(er, file) {
				fileData[this.i1.$] = file;
			}));
		}
	});
	io.set('log level', 1);
	app.listen(8998);
	io.sockets.on('connection', function(socket) {
		var curLevel = 0;
		socket.on('GetSonicLevel', function(levelName) {
			console.log('Serving ' + fileNames[curLevel] + '  ' + curLevel);
			socket.emit('SonicLevel', { Data: fileData[curLevel++ % fileData.length] });
		});
		socket.on('disconnect', function(data) {
		});
	});
};
OurSonicNode.Compress.registerClass('OurSonicNode.Compress', Object);
OurSonicNode.Server.registerClass('OurSonicNode.Server', Object);
new OurSonicNode.Server();
