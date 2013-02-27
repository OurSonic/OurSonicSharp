require('./mscorlib.js');Enumerable=require('./linq.js');require('./lib/RawDeflate.js');require('./OurSonicModels.js');
require('mscorlib');
var socketio = require('socket.io');
////////////////////////////////////////////////////////////////////////////////
// OurSonicNode.Compress
var $OurSonicNode_Compress = function() {
	var fs = new FS();
	var sb = new ss.StringBuilder();
	var lines = [0];
	var __dirname = 'C:\\code\\SonicImageParser\\data\\LevelOutput\\';
	fs.readdir(__dirname, function(ex, ab) {
		for (var $t1 = 0; $t1 < ab.length; $t1++) {
			var s = ab[$t1];
			var s1 = { $: s };
			fs.readdir(__dirname + s, ss.mkdel({ s1: s1 }, function(ex2, ab2) {
				for (var $t2 = 0; $t2 < ab2.length; $t2++) {
					var s2 = ab2[$t2];
					console.log(s2);
					var s3 = { $: s2 };
					fs.readFile(__dirname + this.s1.$ + '\\' + s2, 'utf8', ss.mkdel({ s3: s3, s1: this.s1 }, function(err, content) {
						if (ss.endsWithString(this.s3.$, '.min.js')) {
							fs.unlink(__dirname + this.s1.$ + '\\' + this.s3.$);
						}
						var fm = (new Compressor()).CompressText(content);
						//FS.AppendFile("abcdef.js", string.Format("window.levelData[{0}] = '{1}';\r\n\r\n", lines[0]++, fm), "utf8", (ecr) => { });
						var imj = ss.replaceAllString(__dirname + this.s1.$ + '\\' + this.s3.$, '.js', '.min.js');
						fs.unlink(__dirname + this.s1.$ + '\\' + this.s3.$);
						fs.writeFile(imj, fm, function(er, ecr2) {
						});
					}));
				}
			}));
		}
	});
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicNode.Server
var $OurSonicNode_Server = function() {
	this.$objDirectory = '/usr/local/src/sonic/ObjectData/';
	this.$fs = null;
	this.$fs = require('fs');
	var http = require('http');
	setInterval(function() {
		console.log('keep alive ' + (new Date()).toString().substr(17, 24));
	}, 10000);
	//load();
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	var fileData = [];
	var fileNames = [];
	var levelsDir = '/usr/local/src/sonic/LevelData/';
	this.$fs.readdir(levelsDir, ss.mkdel(this, function(err, files) {
		for (var i = 0; i < files.length; i++) {
			var i1 = { $: i };
			fileNames[i1.$] = ss.replaceAllString(files[i], '.min.js', '');
			console.log(fileNames[i1.$] + ' loaded');
			this.$fs.readFile(levelsDir + files[i], 'utf8', ss.mkdel({ i1: i1 }, function(er, file) {
				fileData[this.i1.$] = file;
			}));
		}
	}));
	io.set('log level', 1);
	app.listen(8998);
	io.sockets.on('connection', ss.mkdel(this, function(socket) {
		var curLevel = 0;
		socket.on('GetSonicLevel', function(levelName) {
			console.log('Serving ' + fileNames[curLevel] + '  ' + curLevel);
			socket.emit('SonicLevel', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(fileData[curLevel++ % fileData.length]));
		});
		socket.on('GetLevels.Request', function() {
			console.log('Serving list');
			socket.emit('GetLevels.Response', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [Array]))(fileNames));
		});
		socket.on('LoadLevel.Request', function(levelName1) {
			console.log('Serving Level ' + levelName1.Data);
			socket.emit('LoadLevel.Response', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(fileData[ss.indexOf(fileNames, levelName1.Data)]));
		});
		socket.on('GetObject', ss.mkdel(this, function(_object) {
			this.$fs.exists(this.$objDirectory + _object.Data + '.js', ss.mkdel(this, function(er1, exists) {
				this.$fs.readFile(this.$objDirectory + _object.Data + '.js', 'utf8', function(err1, result) {
					socket.emit('GetObject.Response', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(result));
				});
			}));
		}));
		socket.on('SaveObject', ss.mkdel(this, function(_object1) {
			this.$fs.exists(this.$objDirectory + _object1.oldKey + '.js', ss.mkdel(this, function(er2, exists1) {
				if (exists1) {
					this.$fs.unlink(this.$objDirectory + _object1.oldKey + '.js');
				}
				this.$fs.writeFileSync(this.$objDirectory + _object1.key + '.js', _object1.data);
				socket.emit('SaveObject.Response', { Data: true });
			}));
		}));
		socket.on('GetObjects', ss.mkdel(this, function(_objects) {
			var ind = 0;
			socket.emit('GetObjects.Response', { Data: Enumerable.from(this.$_getObjects(_objects)).select(function(a) {
				return { key: _objects[ind++], value: a };
			}).toArray() });
		}));
		socket.on('GetAllObjects', ss.mkdel(this, function(_objects1) {
			socket.emit('GetAllObjects.Response', { Data: Enumerable.from(this.$fs.readdirSync(this.$objDirectory)).where(function(a1) {
				return ss.endsWithString(a1, '.js');
			}).select(function(a2) {
				return ss.replaceAllString(a2, '.js', '');
			}).toArray() });
		}));
	}));
};
$OurSonicNode_Server.prototype = {
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
$OurSonicNode_Server.main = function() {
	new $OurSonicNode_Compress();
	new $OurSonicNode_Server();
};
ss.registerClass(global, 'OurSonicNode.Compress', $OurSonicNode_Compress);
ss.registerClass(global, 'OurSonicNode.Server', $OurSonicNode_Server);
$OurSonicNode_Server.main();
