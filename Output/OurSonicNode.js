require('./mscorlib.node.debug.js');require('./RawDeflate.js');
Type.registerNamespace('OurSonicNode');
////////////////////////////////////////////////////////////////////////////////
// OurSonicNode.Compress
OurSonicNode.Compress = function() {
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
						var imj = (__dirname + this.s1.$ + '\\' + this.s3.$).replaceAll('.js', '.min.js');
						fs.writeFile(imj, fm, function(a, b) {
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
	var mf = new Array(10);
	var bars = [];
	//some setup code
	var foo = [];
	var $t1 = bars.getEnumerator();
	try {
		while ($t1.moveNext()) {
			var bar = $t1.get_current();
			for (var $t2 = 0; $t2 < mf.length; $t2++) {
				var inds = mf[$t2];
				if (Enumerable.from(inds).any(function(a) {
					return a === bar;
				})) {
					foo.add(inds[0]);
				}
			}
		}
	}
	finally {
		$t1.dispose();
	}
	//var io = Global.Require<SocketIO>("socket.io").Listen(app);
};
OurSonicNode.Compress.registerClass('OurSonicNode.Compress', Object);
OurSonicNode.Server.registerClass('OurSonicNode.Server', Object);
new OurSonicNode.Compress();
