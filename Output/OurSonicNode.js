require('./mscorlib.node.debug.js');Enumerable=require('./linq.js');require('./RawDeflate.js');require('./RawDeflate.js');
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
	this.$objDirectory = '/usr/local/src/sonic/ObjectData/';
	this.$levelData = null;
	this.$fs = null;
	setInterval(function() {
		console.log('keep alive ' + (new Date()).toString().substring(17, 24));
	}, 10000);
	this.$levelData = {};
	//load();
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = require('socket.io').listen(app);
	this.$fs = require('fs');
	var fileData = [];
	var fileNames = [];
	var levelsDir = '/usr/local/src/sonic/LevelData/';
	this.$fs.readdir(levelsDir, Function.mkdel(this, function(err, files) {
		for (var i = 0; i < files.length; i++) {
			var i1 = { $: i };
			fileNames[i1.$] = files[i];
			this.$fs.readFile(levelsDir + files[i], 'utf8', Function.mkdel({ i1: i1 }, function(er, file) {
				fileData[this.i1.$] = file;
			}));
		}
	}));
	io.set('log level', 1);
	app.listen(8998);
	io.sockets.on('connection', Function.mkdel(this, function(socket) {
		var curLevel = 0;
		socket.on('GetSonicLevel', function(levelName) {
			console.log('Serving ' + fileNames[curLevel] + '  ' + curLevel);
			socket.emit('SonicLevel', { Data: fileData[curLevel++ % fileData.length] });
		});
		socket.on('GetObject', Function.mkdel(this, function(_object) {
			this.$fs.exists(this.$objDirectory + _object + '.js', Function.mkdel(this, function(er1, exists) {
				this.$fs.readFile(this.$objDirectory + _object + '.js', 'utf8', function(err1, result) {
					socket.emit('GetObject.Response', { Data: result });
				});
			}));
		}));
		socket.on('GetObjects', Function.mkdel(this, function(_objects) {
			var ind = 0;
			socket.emit('GetObjects.Response', { Data: Enumerable.from(this.$_getObjects(_objects)).select(function(a) {
				return { key: _objects[ind++], value: a };
			}).toArray() });
		}));
		socket.on('GetAllObjects', Function.mkdel(this, function(_objects1) {
			socket.emit('GetAllObjects.Response', { Data: Enumerable.from(this.$fs.readdirSync(this.$objDirectory)).where(function(a1) {
				return a1.endsWith('.js');
			}).select(function(a2) {
				return a2.replaceAll('.js', '');
			}).toArray() });
		}));
	}));
};
OurSonicNode.Server.prototype = {
	$_getObjects: function(_objects) {
		return new ss.IteratorBlockEnumerable(function() {
			return (function(_objects) {
				var $result, $state = 0, $t1, _object;
				return new ss.IteratorBlockEnumerator(function() {
					$sm1:
					for (;;) {
						switch ($state) {
							case 0: {
								$state = -1;
								$t1 = 0;
								$state = 1;
								continue $sm1;
							}
							case 1: {
								$state = -1;
								if (!($t1 < _objects.length)) {
									$state = -1;
									break $sm1;
								}
								_object = _objects[$t1];
								if (!this.$fs.existsSync(this.$objDirectory + _object + '.js')) {
									$result = '';
									$state = 2;
									return true;
								}
								else {
									$result = this.$fs.readFileSync(this.$objDirectory + _object + '.js', 'utf8');
									$state = 2;
									return true;
								}
							}
							case 2: {
								$state = -1;
								$t1++;
								$state = 1;
								continue $sm1;
							}
							default: {
								break $sm1;
							}
						}
					}
					return false;
				}, function() {
					return $result;
				}, null, this);
			}).call(this, _objects);
		}, this);
	}
};
OurSonicNode.Compress.registerClass('OurSonicNode.Compress', Object);
OurSonicNode.Server.registerClass('OurSonicNode.Server', Object);
new OurSonicNode.Server();
