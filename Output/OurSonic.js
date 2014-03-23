
(function() {
	'use strict';
	var $asm = {};
	global.OurSonic = global.OurSonic || {};
	global.OurSonic.Areas = global.OurSonic.Areas || {};
	global.OurSonic.Level = global.OurSonic.Level || {};
	global.OurSonic.Level.Animations = global.OurSonic.Level.Animations || {};
	global.OurSonic.Level.Events = global.OurSonic.Level.Events || {};
	global.OurSonic.Level.Objects = global.OurSonic.Level.Objects || {};
	global.OurSonic.Level.Tiles = global.OurSonic.Level.Tiles || {};
	global.OurSonic.Sonic = global.OurSonic.Sonic || {};
	global.OurSonic.UIManager = global.OurSonic.UIManager || {};
	global.OurSonic.Utility = global.OurSonic.Utility || {};
	ss.initAssembly($asm, 'OurSonic');
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Page
	var $OurSonic_Page = function() {
		var stats = new xStats();
		document.body.appendChild(stats.element);
		new $OurSonic_SonicEngine();
	};
	$OurSonic_Page.__typeName = 'OurSonic.Page';
	$OurSonic_Page.main = function() {
		$(function() {
			new $OurSonic_Page();
		});
	};
	global.OurSonic.Page = $OurSonic_Page;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.SonicEngine
	var $OurSonic_SonicEngine = function() {
		this.$wideScreen = true;
		this.canvasHeight = 0;
		this.canvasWidth = 0;
		this.client = null;
		this.$fullscreenMode = false;
		this.$gameCanvas = null;
		this.$gameCanvasName = 'gameLayer';
		this.$gameGoodWidth = 0;
		this.$lastMouseMove = null;
		this.sonicManager = null;
		this.$uiCanvas = null;
		this.$uiCanvasName = 'uiLayer';
		this.$uiGoodWidth = 0;
		$OurSonic_SonicEngine.instance = this;
		//var pl = @"";
		//Window.Instance.Me().Global.Console.Log(new Compressor().CompressText(pl));
		this.$gameCanvas = $OurSonic_Utility_CanvasInformation.create$1(document.getElementById(this.$gameCanvasName), 0, 0);
		this.$uiCanvas = $OurSonic_Utility_CanvasInformation.create$1(document.getElementById(this.$uiCanvasName), 0, 0);
		//new SpeedTester(gameCanvas);return;
		this.canvasWidth = 0;
		this.canvasHeight = 0;
		this.$bindInput();
		this.$fullscreenMode = true;
		window.addEventListener('resize', ss.mkdel(this, function(e) {
			this.resizeCanvas(true);
		}));
		$(document).resize(ss.mkdel(this, function(e1) {
			this.resizeCanvas(true);
		}));
		this.sonicManager = new $OurSonic_SonicManager(this, this.$gameCanvas, ss.mkdel(this, function() {
			this.resizeCanvas(true);
		}));
		this.sonicManager.indexedPalette = 0;
		window.setInterval(ss.mkdel(this.sonicManager, this.sonicManager.tick), 16);
		window.setInterval(ss.mkdel(this, this.gameDraw), 16);
		window.setInterval(ss.mkdel(this, this.uiDraw), 100);
		this.resizeCanvas(true);
	};
	$OurSonic_SonicEngine.__typeName = 'OurSonic.SonicEngine';
	$OurSonic_SonicEngine.runGame = function() {
		var sonicManager = $OurSonic_SonicManager.instance;
		switch (sonicManager.currentGameState) {
			case 0: {
				sonicManager.currentGameState = 1;
				sonicManager.scale = $OurSonic_Utility_Point.$ctor1(2, 2);
				sonicManager.windowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(sonicManager.currentGameState, $OurSonic_SonicEngine.instance.$gameCanvas, sonicManager.scale);
				sonicManager.sonicToon = null;
				break;
			}
			case 1: {
				sonicManager.currentGameState = 0;
				sonicManager.scale = $OurSonic_Utility_Point.$ctor1(2, 2);
				sonicManager.windowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(sonicManager.currentGameState, $OurSonic_SonicEngine.instance.$gameCanvas, sonicManager.scale);
				sonicManager.sonicToon = new $OurSonic_Sonic_Sonic();
				break;
			}
		}
	};
	global.OurSonic.SonicEngine = $OurSonic_SonicEngine;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.SonicManager
	var $OurSonic_SonicManager = function(engine, gameCanvas, resize) {
		this.mainCanvas = null;
		this.$myEngine = null;
		this.objectManager = null;
		this.drawTickCount = 0;
		this.$clicking = false;
		this.$imageLength = 0;
		this.$myStatus = null;
		this.overrideRealScale = null;
		this.$sonicSprites = null;
		this.tickCount = 0;
		this.$waitingForDrawContinue = false;
		this.waitingForTickContinue = false;
		this.$myAnother = null;
		this.$mySonCanvas = null;
		this.$myAnotherw = null;
		this.currentGameState = 0;
		this.bigWindowLocation = null;
		this.uiManager = null;
		this.sonicToon = null;
		this.scale = null;
		this.windowLocation = null;
		this.realScale = null;
		this.inHaltMode = false;
		this.indexedPalette = 0;
		this.animations = null;
		this.animationInstances = null;
		this.goodRing = null;
		this.showHeightMap = false;
		this.screenOffset = null;
		this.activeRings = null;
		this.forceResize = null;
		this.background = null;
		this.clickState = 0;
		this.sonicLevel = null;
		this.inFocusObjects = null;
		this.loading = false;
		this.spriteCache = null;
		this.spriteLoader = null;
		this.typingInEditor = false;
		this.onLevelLoad = null;
		this.cachedObjects = null;
		$OurSonic_SonicManager.instance = this;
		//            SonicToon = new Sonic();
		this.$myEngine = engine;
		this.$myEngine.canvasWidth = $(window).width();
		this.$myEngine.canvasHeight = $(window).height();
		gameCanvas.domCanvas[0].setAttribute('width', this.$myEngine.canvasWidth);
		gameCanvas.domCanvas[0].setAttribute('height', this.$myEngine.canvasHeight);
		$.getJSON('Content/sprites/sonic.js', ss.mkdel(this, function(data) {
			this.$sonicSprites = data;
		}));
		this.objectManager = new $OurSonic_Level_Objects_ObjectManager(this);
		this.objectManager.init();
		var scl = 2;
		this.scale = $OurSonic_Utility_Point.$ctor1(scl, scl);
		this.realScale = $OurSonic_Utility_DoublePoint.$ctor1(1, 1);
		this.mainCanvas = gameCanvas;
		this.windowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(1, this.mainCanvas, this.scale);
		this.bigWindowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(1, this.mainCanvas, this.scale);
		this.bigWindowLocation.width = ss.Int32.trunc(this.bigWindowLocation.width * 1.8);
		this.bigWindowLocation.height = ss.Int32.trunc(this.bigWindowLocation.height * 1.8);
		this.animations = [];
		this.animationInstances = [];
		//jQuery.GetJson("Content/sprites/explosion.js", data => Animations.Add(new Animation("explosion", data)));
		this.showHeightMap = false;
		this.goodRing = $OurSonic_Level_Ring.$ctor(false);
		this.activeRings = [];
		this.forceResize = resize;
		this.background = null;
		this.currentGameState = 1;
		this.screenOffset = $OurSonic_Utility_Point.$ctor1(ss.Int32.div(this.mainCanvas.domCanvas.width(), 2) - ss.Int32.div(this.windowLocation.width, 2), ss.Int32.div(this.mainCanvas.domCanvas.height(), 2) - ss.Int32.div(this.windowLocation.height, 2));
		this.uiManager = new $OurSonic_UIManager_UIManager(this, this.mainCanvas.context);
		//UIManager.ObjectFrameworkArea.Populate(new LevelObject("Somekey"));
		this.clickState = 1;
		this.tickCount = 0;
		this.drawTickCount = 0;
		this.inHaltMode = false;
		this.waitingForTickContinue = false;
		this.$waitingForDrawContinue = false;
	};
	$OurSonic_SonicManager.__typeName = 'OurSonic.SonicManager';
	$OurSonic_SonicManager.$getOffs = function(w1, h1) {
		var hash = (w1 + 1) * (h1 + 1);
		if (ss.keyExists($OurSonic_SonicManager.$_cachedOffs, hash)) {
			return $OurSonic_SonicManager.$_cachedOffs[hash];
		}
		var offs = [];
		var ca = 0;
		for (var y = -1; y < h1; y++) {
			for (var x = -1; x < w1; x++) {
				offs[ca++] = $OurSonic_Utility_Point.$ctor1(x, y);
			}
		}
		return $OurSonic_SonicManager.$_cachedOffs[hash] = offs;
	};
	$OurSonic_SonicManager.$drawLoading = function(canvas) {
		canvas.fillStyle = 'white';
		canvas.fillText('Loading...   ', 95, 95);
		canvas.restore();
		return;
	};
	$OurSonic_SonicManager.$paletteToCanvas = function(b) {
		var cn = $OurSonic_Utility_CanvasInformation.create(1, 1);
		cn.context.fillStyle = b;
		cn.context.fillRect(0, 0, 1, 1);
		return cn.canvas;
	};
	global.OurSonic.SonicManager = $OurSonic_SonicManager;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.SpeedTester
	var $OurSonic_SpeedTester = function(gameCanvas) {
		this.$HEIGHT = 1;
		this.$SIZE = 512;
		this.$WIDTH = 1;
		this.$img = null;
		var m = $OurSonic_Utility_CanvasInformation.create(this.$SIZE, this.$SIZE);
		gameCanvas.canvas.width = window.outerWidth;
		gameCanvas.canvas.height = window.outerHeight;
		var con = m.context;
		this.$img = con.getImageData(0, 0, this.$SIZE, this.$SIZE);
		window.setInterval(ss.mkdel(this, function() {
			this.$makeit(gameCanvas, m);
		}), 16);
	};
	$OurSonic_SpeedTester.__typeName = 'OurSonic.SpeedTester';
	global.OurSonic.SpeedTester = $OurSonic_SpeedTester;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ColorEditingArea
	var $OurSonic_Areas_ColorEditingArea = function(x, y, width, height) {
		this.frame = null;
		this.showOffset = false;
		this.editable = false;
		this.editor = null;
		this.showHurtMap = false;
		this.showCollideMap = false;
		this.paletteEditor = null;
		this.scale = null;
		this.clicking = false;
		this.clickHandled = false;
		this.lastPosition = null;
		$OurSonic_UIManager_Panel.call(this, x, y, width, height);
		this.editable = true;
	};
	$OurSonic_Areas_ColorEditingArea.__typeName = 'OurSonic.Areas.ColorEditingArea';
	global.OurSonic.Areas.ColorEditingArea = $OurSonic_Areas_ColorEditingArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ColorEditorArea
	var $OurSonic_Areas_ColorEditorArea = function(uiManager) {
		var $t2 = uiManager.get_uiManagerAreas();
		var $t1 = new (ss.makeGenericType($OurSonic_UIManager_UIArea$1, [$OurSonic_Areas_ColorEditorAreaData]))($OurSonic_Areas_ColorEditorAreaData.$ctor(), 650, 30, 960, 800);
		$t1.closable = true;
		var colorEditorArea = $t2.colorEditorArea = $t1;
		colorEditorArea.visible = false;
		uiManager.addArea(colorEditorArea);
		var $t4 = colorEditorArea.data;
		var $t3 = new $OurSonic_Areas_ColorEditingArea(30, 45, 680, 680);
		$t3.showOffset = false;
		$t4.colorEditor = $t3;
		colorEditorArea.addControl($OurSonic_Areas_ColorEditingArea).call(colorEditorArea, colorEditorArea.data.colorEditor);
		var $t5 = new $OurSonic_UIManager_Button(770, 70, 150, 22, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Show Outline'));
		$t5.color = 'rgb(50,150,50)';
		$t5.click = function(p) {
			colorEditorArea.data.colorEditor.editor.showOutline = !colorEditorArea.data.colorEditor.editor.showOutline;
		};
		colorEditorArea.addControl($OurSonic_UIManager_Button).call(colorEditorArea, $t5);
		var bt = null;
		var $t6 = new $OurSonic_UIManager_Button(770, 190, 150, 22, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Modify Hurt Map'));
		$t6.color = 'rgb(50,150,50)';
		$t6.click = function(p1) {
			if (colorEditorArea.data.colorEditor.showHurtMap === false && colorEditorArea.data.colorEditor.showCollideMap === false) {
				colorEditorArea.data.colorEditor.showHurtMap = true;
				colorEditorArea.data.colorEditor.showCollideMap = false;
				bt.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Modify Collide Map');
			}
			else if (colorEditorArea.data.colorEditor.showCollideMap === false) {
				colorEditorArea.data.colorEditor.showHurtMap = false;
				colorEditorArea.data.colorEditor.showCollideMap = true;
				bt.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Modify Pixel Map');
			}
			else {
				colorEditorArea.data.colorEditor.showHurtMap = false;
				colorEditorArea.data.colorEditor.showCollideMap = false;
				bt.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Modify Hurt Map');
			}
		};
		colorEditorArea.addControl($OurSonic_UIManager_Button).call(colorEditorArea, bt = $t6);
		var $t7 = new $OurSonic_UIManager_TextArea(750, 150, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(function() {
			return 'Line Width:' + colorEditorArea.data.colorEditor.editor.lineWidth;
		}));
		$t7.color = 'Black';
		colorEditorArea.addControl($OurSonic_UIManager_TextArea).call(colorEditorArea, $t7);
		var $t8 = new $OurSonic_UIManager_Button(900, 120, 14, 20, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('^'));
		$t8.color = 'rgb(50,150,50)';
		$t8.click = function(p2) {
			colorEditorArea.data.colorEditor.editor.lineWidth = Math.max(colorEditorArea.data.colorEditor.editor.lineWidth + 1, 1);
		};
		colorEditorArea.addControl($OurSonic_UIManager_Button).call(colorEditorArea, $t8);
		var $t9 = new $OurSonic_UIManager_Button(900, 145, 14, 20, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('v'));
		$t9.color = 'rgb(50,150,50)';
		$t9.click = function(p3) {
			colorEditorArea.data.colorEditor.editor.lineWidth = Math.min(colorEditorArea.data.colorEditor.editor.lineWidth - 1, 10);
		};
		colorEditorArea.addControl($OurSonic_UIManager_Button).call(colorEditorArea, $t9);
		var $t11 = colorEditorArea.data;
		var $t10 = new $OurSonic_Areas_PaletteArea(770, 250);
		$t10.scale = $OurSonic_Utility_Point.$ctor1(45, 45);
		$t10.showCurrent = true;
		colorEditorArea.addControl($OurSonic_Areas_PaletteArea).call(colorEditorArea, $t11.paletteArea = $t10);
		colorEditorArea.data.colorEditor.paletteEditor = colorEditorArea.data.paletteArea;
		colorEditorArea.data.init = function(frame) {
			colorEditorArea.data.colorEditor.scale = $OurSonic_Utility_Point.$ctor1(ss.Int32.div(700, frame.width), ss.Int32.div(700, frame.height));
			colorEditorArea.data.colorEditor.init(frame);
			colorEditorArea.data.paletteArea.init(frame.palette, false);
		};
	};
	$OurSonic_Areas_ColorEditorArea.__typeName = 'OurSonic.Areas.ColorEditorArea';
	global.OurSonic.Areas.ColorEditorArea = $OurSonic_Areas_ColorEditorArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ColorEditorAreaData
	var $OurSonic_Areas_ColorEditorAreaData = function() {
	};
	$OurSonic_Areas_ColorEditorAreaData.__typeName = 'OurSonic.Areas.ColorEditorAreaData';
	$OurSonic_Areas_ColorEditorAreaData.createInstance = function() {
		return $OurSonic_Areas_ColorEditorAreaData.$ctor();
	};
	$OurSonic_Areas_ColorEditorAreaData.$ctor = function() {
		var $this = {};
		$this.colorEditor = null;
		$this.paletteArea = null;
		$this.init = null;
		return $this;
	};
	global.OurSonic.Areas.ColorEditorAreaData = $OurSonic_Areas_ColorEditorAreaData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.DebugConsoleData
	var $OurSonic_Areas_DebugConsoleData = function() {
	};
	$OurSonic_Areas_DebugConsoleData.__typeName = 'OurSonic.Areas.DebugConsoleData';
	$OurSonic_Areas_DebugConsoleData.createInstance = function() {
		return $OurSonic_Areas_DebugConsoleData.$ctor();
	};
	$OurSonic_Areas_DebugConsoleData.$ctor = function() {
		var $this = {};
		$this.populate = null;
		$this.watch = null;
		$this.element = null;
		return $this;
	};
	global.OurSonic.Areas.DebugConsoleData = $OurSonic_Areas_DebugConsoleData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.Editor
	var $OurSonic_Areas_Editor = function(assetFrame, showOffset) {
		this.assetFrame = null;
		this.showOutline = false;
		this.showOffset = false;
		this.showHurtMap = false;
		this.lineWidth = 0;
		this.currentColor = 0;
		this.showCollideMap = false;
		this.assetFrame = assetFrame;
		this.showOffset = showOffset;
		this.lineWidth = 1;
		this.currentColor = 0;
		this.showOutline = true;
	};
	$OurSonic_Areas_Editor.__typeName = 'OurSonic.Areas.Editor';
	global.OurSonic.Areas.Editor = $OurSonic_Areas_Editor;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.FrameAreaData
	var $OurSonic_Areas_FrameAreaData = function() {
	};
	$OurSonic_Areas_FrameAreaData.__typeName = 'OurSonic.Areas.FrameAreaData';
	$OurSonic_Areas_FrameAreaData.createInstance = function() {
		return $OurSonic_Areas_FrameAreaData.$ctor();
	};
	$OurSonic_Areas_FrameAreaData.$ctor = function() {
		var $this = {};
		$this.palatteArea = null;
		$this.colorEditor = null;
		return $this;
	};
	global.OurSonic.Areas.FrameAreaData = $OurSonic_Areas_FrameAreaData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.LevelManagerArea
	var $OurSonic_Areas_LevelManagerArea = function(uiManager) {
		this.levelManager = null;
		var $t2 = uiManager.get_uiManagerAreas();
		var $t1 = new $OurSonic_UIManager_UIArea(window.outerWidth - 440, 100, 390, 390);
		$t1.closable = true;
		this.levelManager = $t2.levelManagerArea = $t1;
		this.levelManager.visible = true;
		uiManager.addArea(this.levelManager);
		var $t4 = this.levelManager;
		var $t3 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Level Manager'));
		$t3.color = 'blue';
		$t4.addControl($OurSonic_UIManager_TextArea).call($t4, $t3);
		var $t6 = this.levelManager;
		var $t5 = new $OurSonic_UIManager_Button(50, 70, 120, 28, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Live Objects'));
		$t5.click = function(p) {
			new $OurSonic_Areas_LiveObjectsArea(uiManager);
		};
		$t6.addControl($OurSonic_UIManager_Button).call($t6, $t5);
	};
	$OurSonic_Areas_LevelManagerArea.__typeName = 'OurSonic.Areas.LevelManagerArea';
	global.OurSonic.Areas.LevelManagerArea = $OurSonic_Areas_LevelManagerArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.LevelSelectorArea
	var $OurSonic_Areas_LevelSelectorArea = function(manager) {
		var levelInformation = new $OurSonic_UIManager_UIArea(70, 70, 460, 420);
		levelInformation.visible = true;
		manager.addArea(levelInformation);
		var $t1 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Level Selector'));
		$t1.font = $OurSonic_UIManager_UIManager.textFont;
		$t1.color = 'blue';
		levelInformation.addControl($OurSonic_UIManager_TextArea).call(levelInformation, $t1);
		var $t2 = new $OurSonic_UIManager_TextArea(30, 52, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(function() {
			return $OurSonic_UIManager_UIManager.get_curLevelName();
		}));
		$t2.font = $OurSonic_UIManager_UIManager.textFont;
		$t2.color = 'black';
		levelInformation.addControl($OurSonic_UIManager_TextArea).call(levelInformation, $t2);
		var $t3 = new $OurSonic_UIManager_Button(320, 70, 100, 22, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Save Level'));
		$t3.font = $OurSonic_UIManager_UIManager.buttonFont;
		$t3.color = 'rgb(50,150,50)';
		levelInformation.addControl($OurSonic_UIManager_Button).call(levelInformation, $t3);
		var $t4 = new $OurSonic_UIManager_Button(320, 105, 135, 22, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Load Empty Level'));
		$t4.font = $OurSonic_UIManager_UIManager.buttonFont;
		$t4.color = 'rgb(50,150,50)';
		$t4.click = function(p) {
			//  levelManagerArea.visible = true;
			//  loadingText.visible = true;
			//  var index = 0;
			//  var tim = function () {
			//  var max = 188;
			//  if (index == max) {
			//  setTimeout(function () {
			//  alert(_H.stringify(sonicManager.SonicLevel));
			//  sonicManager.uiManager.loadGame(_H.stringify(sonicManager.SonicLevel), sonicManager.mainCanvas);
			//  loadingText.visible = false;
			//  }, 500);
			//  return;
			//  }
			//  setTimeout(tim, 100);
			//  
			//  _H.loadSprite("assets/Chunks/Tile" + index++ + ".png", function (image) {
			//  loadingText.text = "Loading " + index + "/" + max;
			//  sonicManager.importChunkFromImage(image);
			//  if (index == max) {
			//  sonicManager.inds = { done: true };
			//  }
			//  });
			//  
			//  };
			//  setTimeout(tim, 100);
		};
		levelInformation.addControl($OurSonic_UIManager_Button).call(levelInformation, $t4);
		var $t5 = new $OurSonic_UIManager_ScrollBox(30, 70, 25, 11, 250);
		$t5.backColor = 'rgb(50, 60, 127)';
		var ctls = levelInformation.addControl($OurSonic_UIManager_ScrollBox).call(levelInformation, $t5);
		var loadLevel = function(name) {
			$OurSonic_UIManager_UIManager.updateTitle('Downloading ' + name);
			$OurSonic_SonicEngine.instance.client.emit('LoadLevel.Request', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(name));
			;
		};
		var neverGot = true;
		$OurSonic_SonicEngine.instance.client.on('LoadLevel.Response', ss.mkdel(this, this.$loadLevel));
		window.setTimeout(ss.mkdel(this, function() {
			if (neverGot) {
				$OurSonic_UIManager_UIManager.set_curLevelName('Connection Failed, static level loaded');
				this.$loadLevel(new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))($OurSonic_SonicManager.STATICLEVEL));
			}
		}), 3000);
		$OurSonic_SonicEngine.instance.client.on('GetLevels.Response', function(data) {
			neverGot = false;
			var load = true;
			var $t6 = Enumerable.from(data.Data).orderBy(function(a) {
				return a;
			}).getEnumerator();
			try {
				while ($t6.moveNext()) {
					var level = $t6.current();
					if (load) {
						//#if RELEASE
						loadLevel(level);
						//#endif
						load = false;
					}
					var area = { $: level };
					var $t7 = new $OurSonic_UIManager_Button(0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(level));
					$t7.color = 'rgb(50,190,90)';
					$t7.click = ss.mkdel({ area: area }, function(p1) {
						loadLevel(this.area.$);
					});
					ctls.addControl($OurSonic_UIManager_Button).call(ctls, $t7);
				}
			}
			finally {
				$t6.dispose();
			}
		});
		$OurSonic_SonicEngine.instance.client.emit('GetLevels.Request', null);
		$OurSonic_UIManager_UIManager.set_curLevelName('Level Not Loaded');
	};
	$OurSonic_Areas_LevelSelectorArea.__typeName = 'OurSonic.Areas.LevelSelectorArea';
	global.OurSonic.Areas.LevelSelectorArea = $OurSonic_Areas_LevelSelectorArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.LiveObjectsArea
	var $OurSonic_Areas_LiveObjectsArea = function(uiManager) {
		var $t2 = uiManager.get_uiManagerAreas();
		var $t1 = new (ss.makeGenericType($OurSonic_UIManager_UIArea$1, [$OurSonic_Areas_LiveObjectsAreaData]))($OurSonic_Areas_LiveObjectsAreaData.$ctor(), 947, 95, 770, 700);
		$t1.closable = true;
		var liveObjectsArea = $t2.liveObjectsArea = $t1;
		liveObjectsArea.visible = true;
		uiManager.addArea(liveObjectsArea);
		var $t3 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Live Objects'));
		$t3.color = 'blue';
		liveObjectsArea.addControl($OurSonic_UIManager_TextArea).call(liveObjectsArea, $t3);
		var scl;
		var $t4 = new $OurSonic_UIManager_HScrollBox(20, 60, 85, 8, 85);
		$t4.backColor = 'rgb(50,150,50)';
		liveObjectsArea.addControl($OurSonic_UIManager_HScrollBox).call(liveObjectsArea, scl = $t4);
		liveObjectsArea.data.populate = function(liveObjects) {
			for (var $t5 = 0; $t5 < scl.controls.length; $t5++) {
				var t = scl.controls[$t5];
				ss.cast(t, ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_LivePopulateModel])).data.checked = false;
			}
			for (var $t6 = 0; $t6 < liveObjects.length; $t6++) {
				var lo = liveObjects[$t6];
				var satisfied = false;
				for (var $t7 = 0; $t7 < scl.controls.length; $t7++) {
					var t1 = scl.controls[$t7];
					if (lo.index === ss.cast(t1, ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_LivePopulateModel])).data.object.index) {
						ss.cast(t1, ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_LivePopulateModel])).data.checked = true;
						satisfied = true;
						break;
					}
				}
				if (!satisfied) {
					var obj = { $: lo };
					var dm = { $: null };
					var imageButton = new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_LivePopulateModel]))($OurSonic_Areas_LivePopulateModel.$ctor(), 0, 0, 0, 0);
					imageButton.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(obj.$.objectData.description + '(' + obj.$.objectData.key + ')');
					imageButton.onDraw = ss.mkdel({ obj: obj, dm: dm }, function(canv, x, y) {
						this.obj.$.draw(canv, x + ss.Int32.div(this.dm.$.width, 2), y + ss.Int32.div(this.dm.$.height, 2), false);
					});
					imageButton.click = ss.mkdel({ obj: obj }, function(p) {
						liveObjectsArea.data.debugConsole.data.populate(this.obj.$);
					});
					scl.addControl(dm.$ = imageButton);
					dm.$.data.checked = true;
					dm.$.data.object = obj.$;
				}
			}
			for (var i = scl.controls.length - 1; i >= 0; i--) {
				if (!ss.cast(scl.controls[i], ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_LivePopulateModel])).data.checked) {
					ss.removeAt(scl.controls, i);
				}
			}
		};
		liveObjectsArea.addControl(ss.makeGenericType($OurSonic_UIManager_Panel$1, [$OurSonic_Areas_DebugConsoleData])).call(liveObjectsArea, liveObjectsArea.data.debugConsole = new (ss.makeGenericType($OurSonic_UIManager_Panel$1, [$OurSonic_Areas_DebugConsoleData]))($OurSonic_Areas_DebugConsoleData.$ctor(), 20, 200, 730, 450));
		liveObjectsArea.data.debugConsole.data.populate = function(obj1) {
			liveObjectsArea.data.debugConsole.clear();
			var $t10 = liveObjectsArea.data.debugConsole;
			var $t9 = liveObjectsArea.data.debugConsole.data;
			var $t8 = new $OurSonic_UIManager_ScrollBox(10, 15, 30, 12, 210);
			$t8.backColor = 'rgb(50,150,50)';
			$t10.addControl($OurSonic_UIManager_ScrollBox).call($t10, $t9.watch = $t8);
			var o = obj1;
			var $t11 = new ss.ObjectEnumerator(o);
			try {
				while ($t11.moveNext()) {
					var pr = $t11.current();
					if (true) {
						var pr1 = { $: pr };
						var $t13 = liveObjectsArea.data.debugConsole.data.watch;
						var $t12 = new $OurSonic_UIManager_Button(0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ pr1: pr1 }, function() {
							return this.pr1.$.key + ': ' + this.pr1.$.value;
						})));
						$t12.color = 'rgb(50,190,90)';
						$t13.addControl($OurSonic_UIManager_Button).call($t13, $t12);
					}
				}
			}
			finally {
				$t11.dispose();
			}
			for (var $t14 = 0; $t14 < $OurSonic_SonicManager.instance.sonicLevel.objects.length; $t14++) {
				var t2 = $OurSonic_SonicManager.instance.sonicLevel.objects[$t14];
				t2.consoleLog = null;
			}
			obj1.consoleLog = function(txt) {
				liveObjectsArea.data.debugConsole.data.element.innerHTML = txt.join('\n');
				liveObjectsArea.data.debugConsole.data.element.scrollTop = liveObjectsArea.data.debugConsole.data.element.scrollHeight;
			};
			var $t16 = liveObjectsArea.data.debugConsole;
			var $t15 = new $OurSonic_UIManager_HtmlBox(270, 15);
			$t15.width = 445;
			$t15.height = 430;
			$t15.set_init(function() {
				var gm = liveObjectsArea.data.debugConsole.data.element;
				if (ss.isValue(gm)) {
					gm.parentNode.removeChild(gm);
				}
				$(document.body).append('<textarea id="console" name="console" style="position:absolute;width:445px;height:430px;"></textarea>');
				liveObjectsArea.data.debugConsole.data.element = document.getElementById('console');
			});
			$t15.set_updatePosition(function(x1, y1) {
				var scroller = liveObjectsArea.data.debugConsole.data.element;
				if (ss.referenceEquals(scroller.style.left, x1 + 'px') && ss.referenceEquals(scroller.style.top, y1 + 'px')) {
					return;
				}
				scroller.style.left = x1 + 'px';
				scroller.style.top = y1 + 'px';
			});
			$t15.set__Focus(function() {
				var sc = liveObjectsArea.data.debugConsole.data.element;
				if (ss.isValue(sc)) {
					sc.style.visibility = 'visible';
				}
			});
			$t15.set__Hide(function() {
				var sc1 = liveObjectsArea.data.debugConsole.data.element;
				sc1.blur();
				//            Engine.uiCanvasItem.focus();
				//            document.body.focus();
				//            editor.onBlur();
				if (ss.isValue(sc1)) {
					sc1.style.left = '-100px';
					sc1.style.top = '-100px';
					sc1.style.visibility = 'hidden';
				}
			});
			$t16.addControl($OurSonic_UIManager_HtmlBox).call($t16, $t15);
		};
	};
	$OurSonic_Areas_LiveObjectsArea.__typeName = 'OurSonic.Areas.LiveObjectsArea';
	global.OurSonic.Areas.LiveObjectsArea = $OurSonic_Areas_LiveObjectsArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.LiveObjectsAreaData
	var $OurSonic_Areas_LiveObjectsAreaData = function() {
	};
	$OurSonic_Areas_LiveObjectsAreaData.__typeName = 'OurSonic.Areas.LiveObjectsAreaData';
	$OurSonic_Areas_LiveObjectsAreaData.createInstance = function() {
		return $OurSonic_Areas_LiveObjectsAreaData.$ctor();
	};
	$OurSonic_Areas_LiveObjectsAreaData.$ctor = function() {
		var $this = {};
		$this.debugConsole = null;
		$this.populate = null;
		return $this;
	};
	global.OurSonic.Areas.LiveObjectsAreaData = $OurSonic_Areas_LiveObjectsAreaData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.LivePopulateModel
	var $OurSonic_Areas_LivePopulateModel = function() {
	};
	$OurSonic_Areas_LivePopulateModel.__typeName = 'OurSonic.Areas.LivePopulateModel';
	$OurSonic_Areas_LivePopulateModel.createInstance = function() {
		return $OurSonic_Areas_LivePopulateModel.$ctor();
	};
	$OurSonic_Areas_LivePopulateModel.$ctor = function() {
		var $this = {};
		$this.checked = false;
		$this.object = null;
		return $this;
	};
	global.OurSonic.Areas.LivePopulateModel = $OurSonic_Areas_LivePopulateModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.MainPanelData
	var $OurSonic_Areas_MainPanelData = function() {
	};
	$OurSonic_Areas_MainPanelData.__typeName = 'OurSonic.Areas.MainPanelData';
	$OurSonic_Areas_MainPanelData.createInstance = function() {
		return $OurSonic_Areas_MainPanelData.$ctor();
	};
	$OurSonic_Areas_MainPanelData.$ctor = function() {
		var $this = {};
		$this.assetPopulate = null;
		$this.frameArea = null;
		$this.loadFrame = null;
		$this.selectPieceScroll = null;
		$this.priorityDrawing = null;
		$this.pe = null;
		$this.updatePieces = null;
		return $this;
	};
	global.OurSonic.Areas.MainPanelData = $OurSonic_Areas_MainPanelData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ObjectFrameworkArea
	var $OurSonic_Areas_ObjectFrameworkArea = function(manager) {
		this.objectFrameworkArea = null;
		var size = 160;
		var $t2 = ss.makeGenericType($OurSonic_UIManager_UIArea$1, [$OurSonic_Areas_ObjectFrameworkData]);
		var $t1 = $OurSonic_Areas_ObjectFrameworkData.$ctor();
		$t1.objectFramework = new $OurSonic_Level_Objects_LevelObject('Foo');
		var $t3 = new $t2($t1, 540, 75, 850, 690);
		$t3.closable = true;
		this.objectFrameworkArea = $t3;
		this.objectFrameworkArea.visible = false;
		manager.addArea(this.objectFrameworkArea);
		manager.get_uiManagerAreas().objectFrameworkArea = this;
		var $t5 = this.objectFrameworkArea;
		var $t4 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Object Framework'));
		$t4.color = 'blue';
		$t5.addControl($OurSonic_UIManager_TextArea).call($t5, $t4);
		var $t7 = this.objectFrameworkArea;
		var $t6 = new $OurSonic_UIManager_TextArea(16, 60, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Assets'));
		$t6.color = 'black';
		$t7.addControl($OurSonic_UIManager_TextArea).call($t7, $t6);
		var $t9 = this.objectFrameworkArea;
		var $t8 = new $OurSonic_UIManager_Button(160, 38, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Add Asset'));
		$t8.color = 'rgb(50,150,50)';
		$t8.click = ss.mkdel(this, function(p) {
			ss.add(this.objectFrameworkArea.data.objectFramework.assets, new $OurSonic_Level_Objects_LevelObjectAsset('Asset ' + (this.objectFrameworkArea.data.objectFramework.assets.length + 1)));
			this.populate(this.objectFrameworkArea.data.objectFramework);
		});
		$t9.addControl($OurSonic_UIManager_Button).call($t9, $t8);
		var $t12 = this.objectFrameworkArea;
		var $t11 = this.objectFrameworkArea.data;
		var $t10 = new $OurSonic_UIManager_ScrollBox(30, 70, 25, 4, 250);
		$t10.backColor = 'rgb(50, 60, 127)';
		$t12.addControl($OurSonic_UIManager_ScrollBox).call($t12, $t11.assets = $t10);
		var $t14 = this.objectFrameworkArea;
		var $t13 = new $OurSonic_UIManager_TextArea(16, 60 + size * 1, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Pieces'));
		$t13.color = 'black';
		$t14.addControl($OurSonic_UIManager_TextArea).call($t14, $t13);
		var $t16 = this.objectFrameworkArea;
		var $t15 = new $OurSonic_UIManager_Button(160, 38 + size * 1, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Add Piece'));
		$t15.color = 'rgb(50,150,50)';
		$t15.click = ss.mkdel(this, function(p1) {
			ss.add(this.objectFrameworkArea.data.objectFramework.pieces, $OurSonic_Level_Objects_LevelObjectPiece.$ctor('Piece ' + (this.objectFrameworkArea.data.objectFramework.pieces.length + 1)));
			this.populate(this.objectFrameworkArea.data.objectFramework);
		});
		$t16.addControl($OurSonic_UIManager_Button).call($t16, $t15);
		var $t19 = this.objectFrameworkArea;
		var $t18 = this.objectFrameworkArea.data;
		var $t17 = new $OurSonic_UIManager_ScrollBox(30, 70 + size * 1, 25, 4, 250);
		$t17.backColor = 'rgb(50, 60, 127)';
		$t19.addControl($OurSonic_UIManager_ScrollBox).call($t19, $t18.pieces = $t17);
		var $t21 = this.objectFrameworkArea;
		var $t20 = new $OurSonic_UIManager_TextArea(16, 60 + size * 2, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Piece Layouts'));
		$t20.color = 'black';
		$t21.addControl($OurSonic_UIManager_TextArea).call($t21, $t20);
		var $t23 = this.objectFrameworkArea;
		var $t22 = new $OurSonic_UIManager_Button(160, 38 + size * 2, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Add Piece Layout'));
		$t22.color = 'rgb(50,150,50)';
		$t22.click = ss.mkdel(this, function(p2) {
			ss.add(this.objectFrameworkArea.data.objectFramework.pieceLayouts, new $OurSonic_Level_Objects_LevelObjectPieceLayout('Piece Layout ' + (this.objectFrameworkArea.data.objectFramework.pieceLayouts.length + 1)));
			this.populate(this.objectFrameworkArea.data.objectFramework);
		});
		$t23.addControl($OurSonic_UIManager_Button).call($t23, $t22);
		var $t26 = this.objectFrameworkArea;
		var $t25 = this.objectFrameworkArea.data;
		var $t24 = new $OurSonic_UIManager_ScrollBox(30, 70 + size * 2, 25, 4, 250);
		$t24.backColor = 'rgb(50, 60, 127)';
		$t26.addControl($OurSonic_UIManager_ScrollBox).call($t26, $t25.pieceLayouts = $t24);
		var $t28 = this.objectFrameworkArea;
		var $t27 = new $OurSonic_UIManager_TextArea(16, 60 + size * 3, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Projectiles'));
		$t27.color = 'black';
		$t28.addControl($OurSonic_UIManager_TextArea).call($t28, $t27);
		var $t30 = this.objectFrameworkArea;
		var $t29 = new $OurSonic_UIManager_Button(160, 38 + size * 3, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Add Projectile'));
		$t29.color = 'rgb(50,150,50)';
		$t29.click = ss.mkdel(this, function(p3) {
			ss.add(this.objectFrameworkArea.data.objectFramework.projectiles, $OurSonic_Level_Objects_LevelObjectProjectile.$ctor('Piece Projectile ' + (this.objectFrameworkArea.data.objectFramework.projectiles.length + 1)));
			this.populate(this.objectFrameworkArea.data.objectFramework);
		});
		$t30.addControl($OurSonic_UIManager_Button).call($t30, $t29);
		var $t33 = this.objectFrameworkArea;
		var $t32 = this.objectFrameworkArea.data;
		var $t31 = new $OurSonic_UIManager_ScrollBox(30, 70 + size * 3, 25, 4, 250);
		$t31.backColor = 'rgb(50, 60, 127)';
		$t33.addControl($OurSonic_UIManager_ScrollBox).call($t33, $t32.projectiles = $t31);
		var $t35 = this.objectFrameworkArea;
		var $t34 = new $OurSonic_UIManager_TextArea(320, 60, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Key: '));
		$t34.font = $OurSonic_UIManager_UIManager.smallTextFont;
		$t34.color = 'black';
		$t35.addControl($OurSonic_UIManager_TextArea).call($t35, $t34);
		var $t38 = this.objectFrameworkArea;
		var $t37 = this.objectFrameworkArea.data;
		var $t36 = new $OurSonic_UIManager_TextBox(370, 40, 150, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(''));
		$t36.color = 'rgb(50,150,50)';
		$t36.click = ss.mkdel(this, function(p4) {
			this.objectFrameworkArea.data.objectFramework.key = this.objectFrameworkArea.data.key.text;
		});
		$t38.addControl($OurSonic_UIManager_TextBox).call($t38, $t37.key = $t36);
		var $t40 = this.objectFrameworkArea;
		var $t39 = new $OurSonic_UIManager_TextArea(525, 56, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Description: '));
		$t39.font = $OurSonic_UIManager_UIManager.smallTextFont;
		$t39.color = 'black';
		$t40.addControl($OurSonic_UIManager_TextArea).call($t40, $t39);
		var $t43 = this.objectFrameworkArea;
		var $t42 = this.objectFrameworkArea.data;
		var $t41 = new $OurSonic_UIManager_TextBox(610, 40, 220, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(''));
		$t41.color = 'rgb(50,150,50)';
		$t41.click = ss.mkdel(this, function(p5) {
			this.objectFrameworkArea.data.objectFramework.description = this.objectFrameworkArea.data.description.text;
		});
		$t43.addControl($OurSonic_UIManager_TextBox).call($t43, $t42.description = $t41);
		var $t46 = this.objectFrameworkArea;
		var $t45 = this.objectFrameworkArea.data;
		var $t44 = new $OurSonic_UIManager_Button(320, 75, 250, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('onInit'));
		$t44.color = 'rgb(50,150,50)';
		$t44.click = ss.mkdel(this, function(p6) {
			this.objectFrameworkArea.data.b2.toggled = false;
			this.objectFrameworkArea.data.b3.toggled = false;
			this.objectFrameworkArea.data.b4.toggled = false;
			if (this.objectFrameworkArea.data.b1.toggled) {
				this.$addCodeWindow(this.objectFrameworkArea.data.objectFramework.initScript, ss.mkdel(this, function() {
					this.objectFrameworkArea.data.objectFramework.initScript = this.objectFrameworkArea.data.editor.getValue();
				}));
			}
			else {
				this.clearMainArea();
			}
		});
		$t46.addControl($OurSonic_UIManager_Button).call($t46, $t45.b1 = $t44);
		this.objectFrameworkArea.data.b1.toggle = true;
		var $t49 = this.objectFrameworkArea;
		var $t48 = this.objectFrameworkArea.data;
		var $t47 = new $OurSonic_UIManager_Button(580, 75, 250, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('onTick'));
		$t47.color = 'rgb(50,150,50)';
		$t47.click = ss.mkdel(this, function(p7) {
			this.objectFrameworkArea.data.b1.toggled = false;
			this.objectFrameworkArea.data.b3.toggled = false;
			this.objectFrameworkArea.data.b4.toggled = false;
			if (this.objectFrameworkArea.data.b2.toggled) {
				this.$addCodeWindow(this.objectFrameworkArea.data.objectFramework.tickScript, ss.mkdel(this, function() {
					this.objectFrameworkArea.data.objectFramework.tickScript = this.objectFrameworkArea.data.editor.getValue();
				}));
			}
			else {
				this.clearMainArea();
			}
		});
		$t49.addControl($OurSonic_UIManager_Button).call($t49, $t48.b2 = $t47);
		this.objectFrameworkArea.data.b2.toggle = true;
		var $t52 = this.objectFrameworkArea;
		var $t51 = this.objectFrameworkArea.data;
		var $t50 = new $OurSonic_UIManager_Button(320, 110, 250, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('onCollide'));
		$t50.color = 'rgb(50,150,50)';
		$t50.click = ss.mkdel(this, function(p8) {
			this.objectFrameworkArea.data.b1.toggled = false;
			this.objectFrameworkArea.data.b2.toggled = false;
			this.objectFrameworkArea.data.b4.toggled = false;
			if (this.objectFrameworkArea.data.b3.toggled) {
				this.$addCodeWindow(this.objectFrameworkArea.data.objectFramework.collideScript, ss.mkdel(this, function() {
					this.objectFrameworkArea.data.objectFramework.collideScript = this.objectFrameworkArea.data.editor.getValue();
				}));
			}
			else {
				this.clearMainArea();
			}
		});
		$t52.addControl($OurSonic_UIManager_Button).call($t52, $t51.b3 = $t50);
		this.objectFrameworkArea.data.b3.toggle = true;
		var $t55 = this.objectFrameworkArea;
		var $t54 = this.objectFrameworkArea.data;
		var $t53 = new $OurSonic_UIManager_Button(580, 110, 250, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('onHurtSonic'));
		$t53.color = 'rgb(50,150,50)';
		$t53.click = ss.mkdel(this, function(p9) {
			this.objectFrameworkArea.data.b1.toggled = false;
			this.objectFrameworkArea.data.b2.toggled = false;
			this.objectFrameworkArea.data.b3.toggled = false;
			if (this.objectFrameworkArea.data.b4.toggled) {
				this.$addCodeWindow(this.objectFrameworkArea.data.objectFramework.hurtScript, ss.mkdel(this, function() {
					this.objectFrameworkArea.data.objectFramework.hurtScript = this.objectFrameworkArea.data.editor.getValue();
				}));
			}
			else {
				this.clearMainArea();
			}
		});
		$t55.addControl($OurSonic_UIManager_Button).call($t55, $t54.b4 = $t53);
		this.objectFrameworkArea.data.b4.toggle = true;
		this.objectFrameworkArea.addControl(ss.makeGenericType($OurSonic_UIManager_Panel$1, [$OurSonic_Areas_MainPanelData])).call(this.objectFrameworkArea, this.objectFrameworkArea.data.mainPanel = new (ss.makeGenericType($OurSonic_UIManager_Panel$1, [$OurSonic_Areas_MainPanelData]))($OurSonic_Areas_MainPanelData.$ctor(), 320, 150, 510, 510));
		//    setTimeout("        var sc = document.getElementById("picFieldUploader");sc.style.visibility = "hidden";sc.style.position="absolute";", 300);
	};
	$OurSonic_Areas_ObjectFrameworkArea.__typeName = 'OurSonic.Areas.ObjectFrameworkArea';
	global.OurSonic.Areas.ObjectFrameworkArea = $OurSonic_Areas_ObjectFrameworkArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ObjectFrameworkArea.ObjectFrameworkAreaPiece
	var $OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece = function() {
	};
	$OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece.__typeName = 'OurSonic.Areas.ObjectFrameworkArea$ObjectFrameworkAreaPiece';
	$OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece.createInstance = function() {
		return $OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece.$ctor();
	};
	$OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece.$ctor = function() {
		var $this = {};
		$this.piece = null;
		$this.index = 0;
		return $this;
	};
	global.OurSonic.Areas.ObjectFrameworkArea$ObjectFrameworkAreaPiece = $OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ObjectFrameworkData
	var $OurSonic_Areas_ObjectFrameworkData = function() {
	};
	$OurSonic_Areas_ObjectFrameworkData.__typeName = 'OurSonic.Areas.ObjectFrameworkData';
	$OurSonic_Areas_ObjectFrameworkData.createInstance = function() {
		return $OurSonic_Areas_ObjectFrameworkData.$ctor();
	};
	$OurSonic_Areas_ObjectFrameworkData.$ctor = function() {
		var $this = {};
		$this.b1 = null;
		$this.b2 = null;
		$this.b3 = null;
		$this.b4 = null;
		$this.pieces = null;
		$this.assets = null;
		$this.pieceLayouts = null;
		$this.projectiles = null;
		$this.objectFramework = null;
		$this.key = null;
		$this.description = null;
		$this.editor = null;
		$this.mainPanel = null;
		$this.codeMirror = null;
		$this.listOfPieces = null;
		return $this;
	};
	global.OurSonic.Areas.ObjectFrameworkData = $OurSonic_Areas_ObjectFrameworkData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.ObjectFrameworkListArea
	var $OurSonic_Areas_ObjectFrameworkListArea = function(uiManager) {
		var loadObject = null;
		var $t2 = uiManager.get_uiManagerAreas();
		var $t1 = new $OurSonic_UIManager_UIArea(90, 500, 390, 300);
		$t1.closable = true;
		var objectFrameworkListArea = $t2.objectFrameworkListArea = $t1;
		objectFrameworkListArea.visible = true;
		uiManager.addArea(objectFrameworkListArea);
		var $t3 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Object Frameworks'));
		$t3.color = 'blue';
		objectFrameworkListArea.addControl($OurSonic_UIManager_TextArea).call(objectFrameworkListArea, $t3);
		var fList;
		var $t4 = new $OurSonic_UIManager_ScrollBox(30, 90, 25, 6, 315);
		$t4.backColor = 'rgb(50,60,127)';
		objectFrameworkListArea.addControl($OurSonic_UIManager_ScrollBox).call(objectFrameworkListArea, fList = $t4);
		var $t5 = new $OurSonic_UIManager_Button(35, 50, 160, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Create Framework'));
		$t5.color = 'rgb(50,150,50)';
		$t5.click = function(p) {
			uiManager.get_uiManagerAreas().objectFrameworkArea.populate(new $OurSonic_Level_Objects_LevelObject('SomeKey'));
			uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.visible = true;
		};
		objectFrameworkListArea.addControl($OurSonic_UIManager_Button).call(objectFrameworkListArea, $t5);
		var getObjects = function() {
			$OurSonic_SonicEngine.instance.client.emit('GetAllObjects', '');
			$OurSonic_SonicEngine.instance.client.on('GetAllObjects.Response', function(data) {
				var obj = data.Data;
				fList.controls = [];
				var $t6 = Enumerable.from(obj).orderBy(function(a) {
					return a;
				}).getEnumerator();
				try {
					while ($t6.moveNext()) {
						var itm = $t6.current();
						var d;
						var name = { $: itm };
						var $t7 = new $OurSonic_UIManager_Button(0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(itm));
						$t7.color = 'rgb(50,190,90)';
						$t7.click = ss.mkdel({ name: name }, function(p1) {
							loadObject(this.name.$);
						});
						fList.addControl($OurSonic_UIManager_Button).call(fList, d = $t7);
					}
				}
				finally {
					$t6.dispose();
				}
			});
		};
		var $t8 = new $OurSonic_UIManager_Button(200, 50, 160, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Save Framework'));
		$t8.color = 'rgb(50,150,50)';
		$t8.click = function(p2) {
			var oldTitle = $OurSonic_UIManager_UIManager.get_curLevelName();
			$OurSonic_UIManager_UIManager.updateTitle('Saving Object');
			var k = uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.key;
			var $t9 = uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.oldKey;
			if (ss.isNullOrUndefined($t9)) {
				$t9 = uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.key;
			}
			var o = $t9;
			var v = $OurSonic_Utility_Help.stringify(uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework);
			var $t11 = $OurSonic_SonicEngine.instance.client;
			var $t10 = OurSonicModels.SaveObjectModel.$ctor();
			$t10.key = k;
			$t10.oldKey = o;
			$t10.data = v;
			$t11.emit('SaveObject', $t10);
			$OurSonic_SonicEngine.instance.client.on('SaveObject.Response', function(data1) {
				$OurSonic_UIManager_UIManager.updateTitle(oldTitle);
			});
			getObjects();
		};
		objectFrameworkListArea.addControl($OurSonic_UIManager_Button).call(objectFrameworkListArea, $t8);
		getObjects();
		loadObject = function(name1) {
			var objects = $OurSonic_SonicManager.instance.cachedObjects;
			if (ss.isValue(objects)) {
				if (ss.isValue(objects[name1])) {
					uiManager.get_uiManagerAreas().objectFrameworkArea.populate(objects[name1]);
					uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.visible = true;
					return;
				}
			}
			var oldTitle1 = $OurSonic_UIManager_UIManager.get_curLevelName();
			$OurSonic_UIManager_UIManager.updateTitle('Downloading Object:' + name1);
			$OurSonic_SonicEngine.instance.client.emit('GetObject', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(name1));
			$OurSonic_SonicEngine.instance.client.on('GetObject.Response', function(lvl) {
				$OurSonic_UIManager_UIManager.updateTitle(oldTitle1);
				var d1 = $OurSonic_Level_Objects_ObjectManager.extendObject($.parseJSON(lvl.Data));
				uiManager.get_uiManagerAreas().objectFrameworkArea.populate(d1);
				uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.visible = true;
			});
		};
	};
	$OurSonic_Areas_ObjectFrameworkListArea.__typeName = 'OurSonic.Areas.ObjectFrameworkListArea';
	global.OurSonic.Areas.ObjectFrameworkListArea = $OurSonic_Areas_ObjectFrameworkListArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.PaletteArea
	var $OurSonic_Areas_PaletteArea = function(x, y) {
		this.palette = null;
		this.scale = null;
		this.clickHandled = false;
		this.showCurrent = false;
		this.wide = false;
		this.selectedIndex = 0;
		this.clicking = false;
		$OurSonic_UIManager_Panel.call(this, x, y, 0, 0);
	};
	$OurSonic_Areas_PaletteArea.__typeName = 'OurSonic.Areas.PaletteArea';
	global.OurSonic.Areas.PaletteArea = $OurSonic_Areas_PaletteArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.PieceLayoutEditor
	var $OurSonic_Areas_PieceLayoutEditor = function(x, y, size) {
		this.size = null;
		this.showHurtMap = false;
		this.showCollideMap = false;
		this.clicking = false;
		this.pieceLayoutMaker = null;
		this.pieceLayout = null;
		this.lastPosition = null;
		this.clickHandled = false;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.size = size;
		this.showHurtMap = false;
		this.showCollideMap = false;
		this.visible = true;
		this.size = size;
		this.clicking = false;
		this.pieceLayoutMaker = null;
	};
	$OurSonic_Areas_PieceLayoutEditor.__typeName = 'OurSonic.Areas.PieceLayoutEditor';
	global.OurSonic.Areas.PieceLayoutEditor = $OurSonic_Areas_PieceLayoutEditor;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.PieceLayoutMaker
	var $OurSonic_Areas_PieceLayoutMaker = function(pieceLayout) {
		this.$largeScale = 1;
		this.pieceLayout = null;
		this.selectedPieceIndex = 0;
		this.showImages = false;
		this.lineWidth = 0;
		this.currentColor = 0;
		this.showOutline = false;
		this.draggingIndex = 0;
		this.zeroPosition = null;
		this.pieceLayout = pieceLayout;
		this.lineWidth = 1;
		this.currentColor = 0;
		this.showOutline = true;
		this.showImages = false;
		this.selectedPieceIndex = 0;
		this.draggingIndex = -1;
		this.zeroPosition = $OurSonic_Utility_Point.$ctor1(0, 0);
	};
	$OurSonic_Areas_PieceLayoutMaker.__typeName = 'OurSonic.Areas.PieceLayoutMaker';
	global.OurSonic.Areas.PieceLayoutMaker = $OurSonic_Areas_PieceLayoutMaker;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.TileChunkArea
	var $OurSonic_Areas_TileChunkArea = function(uiManager) {
		this.$chunkPieceList = null;
		this.$tilePieceList = null;
		var $t2 = uiManager.get_uiManagerAreas();
		var $t1 = new (ss.makeGenericType($OurSonic_UIManager_UIArea$1, [$OurSonic_Level_Tiles_TileChunk]))(null, 700, 500, 390, 390);
		$t1.closable = true;
		var tileChunkArea = $t2.tileChunkArea = $t1;
		tileChunkArea.visible = false;
		uiManager.addArea(tileChunkArea);
		var $t3 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Tile Chunks'));
		$t3.color = 'blue';
		tileChunkArea.addControl($OurSonic_UIManager_TextArea).call(tileChunkArea, $t3);
		var $t4 = new $OurSonic_UIManager_ScrollBox(30, 70, 80, 3, 64);
		$t4.backColor = 'rgb(50,60,127)';
		tileChunkArea.addControl($OurSonic_UIManager_ScrollBox).call(tileChunkArea, this.$chunkPieceList = $t4);
		var tileChunks = $OurSonic_SonicManager.instance.sonicLevel.chunks;
		for (var index = 0; index < tileChunks.length; index++) {
			var tileChunk = { $: tileChunks[index] };
			var chunkButton = { $: new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TileChunk]))(tileChunk.$, 0, 0, 0, 0) };
			chunkButton.$.onDraw = ss.mkdel({ chunkButton: chunkButton }, function(cnv, x, y) {
				this.chunkButton.$.data.drawUI(cnv, $OurSonic_Utility_Point.$ctor1(x, y), $OurSonic_Utility_DoublePoint.$ctor1(0.5, 0.5), 0);
				this.chunkButton.$.data.drawUI(cnv, $OurSonic_Utility_Point.$ctor1(x, y), $OurSonic_Utility_DoublePoint.$ctor1(0.5, 0.5), 1);
			});
			chunkButton.$.font = $OurSonic_UIManager_UIManager.smallTextFont;
			chunkButton.$.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Chunk #' + index);
			chunkButton.$.click = ss.mkdel({ tileChunk: tileChunk }, function(e) {
				tileChunkArea.data = this.tileChunk.$;
			});
			this.$chunkPieceList.addControl(ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TileChunk])).call(this.$chunkPieceList, chunkButton.$);
		}
		var image = new $OurSonic_UIManager_Image(125, 70, 256, 256);
		var areaDrawScale = 2;
		image.onDraw = ss.delegateCombine(image.onDraw, function(context, x1, y1) {
			if (ss.isNullOrUndefined(tileChunkArea.data)) {
				return;
			}
			tileChunkArea.data.drawUI(context, $OurSonic_Utility_Point.$ctor1(x1, y1), $OurSonic_Utility_DoublePoint.op_Implicit($OurSonic_Utility_Point.$ctor1(areaDrawScale, areaDrawScale)), 0);
			tileChunkArea.data.drawUI(context, $OurSonic_Utility_Point.$ctor1(x1, y1), $OurSonic_Utility_DoublePoint.op_Implicit($OurSonic_Utility_Point.$ctor1(areaDrawScale, areaDrawScale)), 1);
		});
		image.click = ss.delegateCombine(image.click, ss.mkdel(this, function(e1) {
			if (ss.isNullOrUndefined(tileChunkArea.data)) {
				return;
			}
			var tilePiece = tileChunkArea.data.getBlockAt(ss.Int32.div(e1.x, areaDrawScale), ss.Int32.div(e1.y, areaDrawScale));
			uiManager.get_uiManagerAreas().tilePieceArea.visible = false;
			uiManager.get_uiManagerAreas().tilePieceArea.data = tilePiece;
			this.$tilePieceList.scrollIndex = Math.max(ss.indexOf(uiManager.sonicManager.sonicLevel.tilePieces, tilePiece) - 1, 0);
		}));
		tileChunkArea.addControl($OurSonic_UIManager_Image).call(tileChunkArea, image);
		this.$buildTilePiece(uiManager);
		//
		//                        var table=tileChunkArea.AddControl(new Table(10, 40, 350, 280));
		//
		//                        var row = table.AddRow(new TableRow(50.Percent()));
		//
		//                        var cell = row.AddCell(new TableCell(50.Percent(), 50.Percent()));
		//
		//                        cell.AddControl(new Button(0, 0, 0, 0, "Text"));
		//
		//                        cell = row.AddCell(new TableCell(50.Percent(), 50.Percent()));
		//
		//                        cell.AddControl(new Button(0, 0, 0, 0, "Text1"));
		//
		//                        
		//
		//                        
		//
		//                        
		//
		//                        row = table.AddRow(new TableRow(100));
		//
		//                        cell = row.AddCell(new TableCell(100, 100));
		//
		//                        cell.AddControl(new Button(0, 0, 100, 100, "Text"));
		//
		//                        cell = row.AddCell(new TableCell(100, 100){FullSize=false});
		//
		//                        cell.AddControl(new Button(0, 0, 100, 50, "Text1"));
		//
		//                        cell.AddControl(new Button(0, 50, 100, 50, "Text2"));
	};
	$OurSonic_Areas_TileChunkArea.__typeName = 'OurSonic.Areas.TileChunkArea';
	global.OurSonic.Areas.TileChunkArea = $OurSonic_Areas_TileChunkArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Areas.UIManagerAreas
	var $OurSonic_Areas_UIManagerAreas = function() {
		this.tileChunkArea = null;
		this.levelManagerArea = null;
		this.tilePieceArea = null;
		this.colorEditorArea = null;
		this.objectFrameworkArea = null;
		this.objectFrameworkListArea = null;
		this.liveObjectsArea = null;
	};
	$OurSonic_Areas_UIManagerAreas.__typeName = 'OurSonic.Areas.UIManagerAreas';
	global.OurSonic.Areas.UIManagerAreas = $OurSonic_Areas_UIManagerAreas;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.HeightMap
	var $OurSonic_Level_HeightMap = function(full) {
		this.width = 0;
		this.height = 0;
		this.items = null;
		this.index = 0;
		this.$1$FullField = null;
		this.set_full(full);
	};
	$OurSonic_Level_HeightMap.__typeName = 'OurSonic.Level.HeightMap';
	$OurSonic_Level_HeightMap.$ctor1 = function(heightMap, i) {
		this.width = 0;
		this.height = 0;
		this.items = null;
		this.index = 0;
		this.$1$FullField = null;
		this.items = heightMap;
		this.width = 16;
		this.height = 16;
		this.index = i;
	};
	$OurSonic_Level_HeightMap.itemsGood = function(items, x, y) {
		if (items[x] < 0) {
			return Math.abs(items[x]) >= y;
		}
		return items[x] >= 16 - y;
	};
	global.OurSonic.Level.HeightMap = $OurSonic_Level_HeightMap;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.PaletteItem
	var $OurSonic_Level_PaletteItem = function() {
		this.palette = null;
		this.skipIndex = 0;
		this.totalLength = 0;
		this.pieces = null;
	};
	$OurSonic_Level_PaletteItem.__typeName = 'OurSonic.Level.PaletteItem';
	global.OurSonic.Level.PaletteItem = $OurSonic_Level_PaletteItem;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.PaletteItemPieces
	var $OurSonic_Level_PaletteItemPieces = function() {
		this.paletteIndex = 0;
		this.paletteMultiply = 0;
		this.paletteOffset = 0;
	};
	$OurSonic_Level_PaletteItemPieces.__typeName = 'OurSonic.Level.PaletteItemPieces';
	global.OurSonic.Level.PaletteItemPieces = $OurSonic_Level_PaletteItemPieces;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Ring
	var $OurSonic_Level_Ring = function() {
	};
	$OurSonic_Level_Ring.__typeName = 'OurSonic.Level.Ring';
	$OurSonic_Level_Ring.draw = function($this, canvas, pos) {
		if ($this.active) {
			$this.ysp += 0.09375;
			$this.x += ss.Int32.trunc($this.xsp);
			$this.y += ss.Int32.trunc($this.ysp);
			var wl = $OurSonic_SonicManager.instance.windowLocation;
			if ($this.x < wl.x || $this.y < wl.y || $this.x > wl.x + wl.width || $this.y > wl.y + wl.height) {
				$this.tickCount = 268435455;
				return;
			}
			//       if (SonicManager.Instance.SonicToon.CheckCollisionLine((this.X) + 8, (this.Y) + 8, 16, 1) != -1)
			//       {
			//       this.Ysp *= -0.75;
			//       }
			//       
			//       if (SonicManager.Instance.SonicToon.CheckCollisionLine((this.X) - 8, (this.Y) + 8, 26, 0) != -1) {
			//       this.Xsp *= -0.75;
			//       }
			if ($OurSonic_SonicManager.instance.drawTickCount > $OurSonic_SonicManager.instance.sonicToon.sonicLastHitTick + 64 && $OurSonic_Utility_IntersectingRectangle.intersectsRect($OurSonic_SonicManager.instance.sonicToon.myRec, $OurSonic_Utility_Rectangle.$ctor1($this.x - 8, $this.y - 8, 16, 16))) {
				$this.tickCount = 268435455;
				$OurSonic_SonicManager.instance.sonicToon.rings++;
				return;
			}
			$this.tickCount++;
		}
		if ($OurSonic_SonicManager.instance.currentGameState === 0) {
			$this.animationIndex = ss.Int32.div($OurSonic_SonicManager.instance.drawTickCount % (($this.active ? 4 : 8) * 4), ($this.active ? 4 : 8));
		}
		else {
			$this.animationIndex = 0;
		}
		var sprites = null;
		if ($OurSonic_SonicManager.instance.spriteCache.rings) {
			sprites = $OurSonic_SonicManager.instance.spriteCache.rings;
		}
		else {
			throw new ss.Exception('bad ring animation');
		}
		var sps = sprites[$this.animationIndex];
		canvas.drawImage(sps.canvas, pos.x - 8, pos.y - 8);
	};
	$OurSonic_Level_Ring.$ctor = function(active) {
		var $this = $OurSonic_Utility_Point.$ctor1(0, 0);
		$this.active = false;
		$this.animationIndex = 0;
		$this.tickCount = 0;
		$this.ysp = 0;
		$this.xsp = 0;
		$this.active = active;
		return $this;
	};
	global.OurSonic.Level.Ring = $OurSonic_Level_Ring;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.SonicBackground
	var $OurSonic_Level_SonicBackground = function() {
		this.width = 0;
		this.height = 0;
	};
	$OurSonic_Level_SonicBackground.__typeName = 'OurSonic.Level.SonicBackground';
	global.OurSonic.Level.SonicBackground = $OurSonic_Level_SonicBackground;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.SonicImage
	var $OurSonic_Level_SonicImage = function() {
	};
	$OurSonic_Level_SonicImage.__typeName = 'OurSonic.Level.SonicImage';
	global.OurSonic.Level.SonicImage = $OurSonic_Level_SonicImage;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.SonicLevel
	var $OurSonic_Level_SonicLevel = function() {
		this.animations = null;
		this.animatedFiles = null;
		this.chunkMap = null;
		this.rings = null;
		this.curHeightMap = false;
		this.levelWidth = 0;
		this.levelHeight = 0;
		this.chunks = null;
		this.tiles = null;
		this.tilePieces = null;
		this.objects = null;
		this.paletteItems = null;
		this.palette = null;
		this.paletteAnimationIndexes = null;
		this.startPositions = null;
		this.curPaletteIndex = 0;
		this.angles = null;
		this.collisionIndexes1 = null;
		this.collisionIndexes2 = null;
		this.heightMaps = null;
		this.animatedChunks = null;
		this.bgChunkMap = null;
		this.tiles = [];
		this.tilePieces = [];
		this.chunks = [];
		this.chunkMap = [];
		this.rings = [];
		this.objects = [];
		this.heightMaps = [];
		this.paletteAnimationIndexes = [];
		this.tiles = [];
		this.curHeightMap = true;
		this.curPaletteIndex = 0;
		this.levelWidth = 0;
		this.levelHeight = 0;
	};
	$OurSonic_Level_SonicLevel.__typeName = 'OurSonic.Level.SonicLevel';
	global.OurSonic.Level.SonicLevel = $OurSonic_Level_SonicLevel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.SpriteCache
	var $OurSonic_Level_SpriteCache = function() {
		this.rings = null;
		this.tileChunks = null;
		this.tilepieces = null;
		this.heightMaps = null;
		this.tiles = null;
		this.sonicSprites = null;
		this.heightMapChunks = null;
		this.indexes = null;
		this.$1$AnimationSpritesField = null;
		this.rings = [];
		this.tileChunks = [];
		this.tilepieces = {};
		this.tiles = [];
		this.sonicSprites = {};
		this.heightMaps = [];
		this.heightMapChunks = {};
		this.indexes = new $OurSonic_Level_SpriteCacheIndexes();
	};
	$OurSonic_Level_SpriteCache.__typeName = 'OurSonic.Level.SpriteCache';
	global.OurSonic.Level.SpriteCache = $OurSonic_Level_SpriteCache;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.SpriteCacheIndexes
	var $OurSonic_Level_SpriteCacheIndexes = function() {
		this.sprites = 0;
		this.tps = 0;
		this.tcs = 0;
		this.ss = 0;
		this.hms = 0;
		this.hmc = 0;
		this.tls = 0;
		this.px = 0;
		this.aes = 0;
	};
	$OurSonic_Level_SpriteCacheIndexes.__typeName = 'OurSonic.Level.SpriteCacheIndexes';
	global.OurSonic.Level.SpriteCacheIndexes = $OurSonic_Level_SpriteCacheIndexes;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Animations.Animation
	var $OurSonic_Level_Animations_Animation = function() {
		this.animationFile = 0;
		this.numberOfTiles = 0;
		this.lastAnimatedIndex = 0;
		this.lastAnimatedFrame = null;
		this.animationTileIndex = 0;
		this.frames = null;
		this.automatedTiming = 0;
	};
	$OurSonic_Level_Animations_Animation.__typeName = 'OurSonic.Level.Animations.Animation';
	global.OurSonic.Level.Animations.Animation = $OurSonic_Level_Animations_Animation;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Animations.AnimationFrame
	var $OurSonic_Level_Animations_AnimationFrame = function() {
		this.ticks = 0;
		this.startingTileIndex = 0;
	};
	$OurSonic_Level_Animations_AnimationFrame.__typeName = 'OurSonic.Level.Animations.AnimationFrame';
	global.OurSonic.Level.Animations.AnimationFrame = $OurSonic_Level_Animations_AnimationFrame;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Animations.AnimationInstance
	var $OurSonic_Level_Animations_AnimationInstance = function() {
	};
	$OurSonic_Level_Animations_AnimationInstance.__typeName = 'OurSonic.Level.Animations.AnimationInstance';
	global.OurSonic.Level.Animations.AnimationInstance = $OurSonic_Level_Animations_AnimationInstance;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Events.LevelEvent
	var $OurSonic_Level_Events_LevelEvent = function() {
	};
	$OurSonic_Level_Events_LevelEvent.__typeName = 'OurSonic.Level.Events.LevelEvent';
	global.OurSonic.Level.Events.LevelEvent = $OurSonic_Level_Events_LevelEvent;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObject
	var $OurSonic_Level_Objects_LevelObject = function(key) {
		this.$cacheCompiled = {};
		this.$cacheLast = {};
		this.oldKey = null;
		this.key = null;
		this.assets = null;
		this.pieces = null;
		this.pieceLayouts = null;
		this.projectiles = null;
		this.initScript = null;
		this.tickScript = null;
		this.collideScript = null;
		this.hurtScript = null;
		this.description = null;
		this.key = key;
		this.initScript = 'this.state = {\r\n\txsp: 0.0,\r\n\tysp: 0.0,\r\n\tfacing: false,\r\n};';
		this.pieces = [];
		this.pieceLayouts = [];
		this.projectiles = [];
		this.assets = [];
	};
	$OurSonic_Level_Objects_LevelObject.__typeName = 'OurSonic.Level.Objects.LevelObject';
	global.OurSonic.Level.Objects.LevelObject = $OurSonic_Level_Objects_LevelObject;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectAsset
	var $OurSonic_Level_Objects_LevelObjectAsset = function(name) {
		this.frames = null;
		this.name = null;
		this.frames = [];
		this.name = name;
	};
	$OurSonic_Level_Objects_LevelObjectAsset.__typeName = 'OurSonic.Level.Objects.LevelObjectAsset';
	global.OurSonic.Level.Objects.LevelObjectAsset = $OurSonic_Level_Objects_LevelObjectAsset;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectAssetFrame
	var $OurSonic_Level_Objects_LevelObjectAssetFrame = function(name) {
		this.offsetX = 0;
		this.width = 0;
		this.height = 0;
		this.offsetY = 0;
		this.hurtSonicMap = null;
		this.collisionMap = null;
		this.colorMap = null;
		this.palette = null;
		this.name = null;
		this.image = null;
		this.transparentColor = null;
		this.image = {};
		this.name = name;
		this.collisionMap = new Array(100);
		this.hurtSonicMap = new Array(100);
		for (var i = 0; i < 100; i++) {
			this.collisionMap[i] = new Array(100);
			this.hurtSonicMap[i] = new Array(100);
		}
	};
	$OurSonic_Level_Objects_LevelObjectAssetFrame.__typeName = 'OurSonic.Level.Objects.LevelObjectAssetFrame';
	global.OurSonic.Level.Objects.LevelObjectAssetFrame = $OurSonic_Level_Objects_LevelObjectAssetFrame;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectData
	var $OurSonic_Level_Objects_LevelObjectData = function() {
	};
	$OurSonic_Level_Objects_LevelObjectData.__typeName = 'OurSonic.Level.Objects.LevelObjectData';
	$OurSonic_Level_Objects_LevelObjectData.createInstance = function() {
		return $OurSonic_Level_Objects_LevelObjectData.$ctor();
	};
	$OurSonic_Level_Objects_LevelObjectData.$ctor = function() {
		var $this = {};
		$this.key = null;
		$this.description = null;
		$this.assets = null;
		$this.pieces = null;
		$this.pieceLayouts = null;
		$this.projectiles = null;
		$this.initScript = null;
		$this.tickScript = null;
		$this.collideScript = null;
		$this.hurtScript = null;
		$this.assets = [];
		$this.pieces = [];
		$this.projectiles = [];
		$this.pieceLayouts = [];
		$this.key = '';
		$this.description = '';
		$this.initScript = '';
		$this.tickScript = '';
		$this.collideScript = '';
		$this.hurtScript = '';
		return $this;
	};
	global.OurSonic.Level.Objects.LevelObjectData = $OurSonic_Level_Objects_LevelObjectData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectInfo
	var $OurSonic_Level_Objects_LevelObjectInfo = function(o) {
		this.$_rect = $OurSonic_Utility_Rectangle.$ctor1(0, 0, 0, 0);
		this.lastDrawTick = 0;
		this.o = null;
		this.x = 0;
		this.y = 0;
		this.xsp = 0;
		this.ysp = 0;
		this.xflip = false;
		this.yflip = false;
		this.subdata = 0;
		this.key = null;
		this.objectData = null;
		this.upperNibble = 0;
		this.lowerNibble = 0;
		this.pieceIndex = 0;
		this.pieces = null;
		this.dead = false;
		this.state = null;
		this.index = 0;
		this.debug = null;
		this.consoleLog = null;
		this.o = o;
		this.x = o.X;
		this.y = o.Y;
		this.xflip = o.XFlip;
		this.yflip = o.YFlip;
		this.subdata = o.SubType;
		this.key = o.ID.toString();
		this.upperNibble = this.subdata >> 4;
		this.lowerNibble = this.subdata & 15;
	};
	$OurSonic_Level_Objects_LevelObjectInfo.__typeName = 'OurSonic.Level.Objects.LevelObjectInfo';
	global.OurSonic.Level.Objects.LevelObjectInfo = $OurSonic_Level_Objects_LevelObjectInfo;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectPiece
	var $OurSonic_Level_Objects_LevelObjectPiece = function() {
	};
	$OurSonic_Level_Objects_LevelObjectPiece.__typeName = 'OurSonic.Level.Objects.LevelObjectPiece';
	$OurSonic_Level_Objects_LevelObjectPiece.$ctor = function(name) {
		var $this = {};
		$this.assetIndex = 0;
		$this.frameIndex = 0;
		$this.pieceIndex = 0;
		$this.x = 0;
		$this.y = 0;
		$this.collided = false;
		$this.xflip = false;
		$this.yflip = false;
		$this.visible = false;
		$this.name = null;
		$this.name = name;
		return $this;
	};
	global.OurSonic.Level.Objects.LevelObjectPiece = $OurSonic_Level_Objects_LevelObjectPiece;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectPieceLayout
	var $OurSonic_Level_Objects_LevelObjectPieceLayout = function(name) {
		this.width = 0;
		this.height = 0;
		this.pieces = null;
		this.name = null;
		this.name = name;
		this.width = 350;
		this.height = 280;
		this.pieces = [];
	};
	$OurSonic_Level_Objects_LevelObjectPieceLayout.__typeName = 'OurSonic.Level.Objects.LevelObjectPieceLayout';
	global.OurSonic.Level.Objects.LevelObjectPieceLayout = $OurSonic_Level_Objects_LevelObjectPieceLayout;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectPieceLayoutPiece
	var $OurSonic_Level_Objects_LevelObjectPieceLayoutPiece = function() {
	};
	$OurSonic_Level_Objects_LevelObjectPieceLayoutPiece.__typeName = 'OurSonic.Level.Objects.LevelObjectPieceLayoutPiece';
	$OurSonic_Level_Objects_LevelObjectPieceLayoutPiece.$ctor = function(pieceIndex) {
		var $this = {};
		$this.pieceIndex = 0;
		$this.assetIndex = 0;
		$this.frameIndex = 0;
		$this.priority = false;
		$this.x = 0;
		$this.y = 0;
		$this.visible = false;
		$this.pieceIndex = pieceIndex;
		return $this;
	};
	global.OurSonic.Level.Objects.LevelObjectPieceLayoutPiece = $OurSonic_Level_Objects_LevelObjectPieceLayoutPiece;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.LevelObjectProjectile
	var $OurSonic_Level_Objects_LevelObjectProjectile = function() {
	};
	$OurSonic_Level_Objects_LevelObjectProjectile.__typeName = 'OurSonic.Level.Objects.LevelObjectProjectile';
	$OurSonic_Level_Objects_LevelObjectProjectile.$ctor = function(name) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.xsp = 0;
		$this.ysp = 0;
		$this.xflip = false;
		$this.yflip = false;
		$this.assetIndex = 0;
		$this.frameIndex = 0;
		$this.name = null;
		$this.name = name;
		return $this;
	};
	global.OurSonic.Level.Objects.LevelObjectProjectile = $OurSonic_Level_Objects_LevelObjectProjectile;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Objects.ObjectManager
	var $OurSonic_Level_Objects_ObjectManager = function(sonicManager) {
		this.$sonicManager = null;
		this.$sonicManager = sonicManager;
	};
	$OurSonic_Level_Objects_ObjectManager.__typeName = 'OurSonic.Level.Objects.ObjectManager';
	$OurSonic_Level_Objects_ObjectManager.extendObject = function(d) {
		var $t1 = new $OurSonic_Level_Objects_LevelObject(d.key);
		$t1.collideScript = d.collideScript;
		$t1.hurtScript = d.hurtScript;
		$t1.initScript = d.initScript;
		$t1.tickScript = d.tickScript;
		var obj = $t1;
		//d.oldKey = name;
		obj.assets = [];
		for (var i = 0; i < d.assets.length; i++) {
			var asset = d.assets[i];
			var $t2 = new $OurSonic_Level_Objects_LevelObjectAsset(asset.name);
			$t2.name = asset.name;
			var levelObjectAsset = $t2;
			levelObjectAsset.frames = [];
			for (var index = 0; index < asset.frames.length; index++) {
				var fr = asset.frames[index];
				var $t4 = levelObjectAsset.frames;
				var $t3 = new $OurSonic_Level_Objects_LevelObjectAssetFrame(fr.name);
				$t3.offsetX = fr.offsetX;
				$t3.width = fr.width;
				$t3.transparentColor = fr.transparentColor;
				$t3.height = fr.height;
				$t3.offsetY = fr.offsetY;
				$t3.hurtSonicMap = fr.hurtSonicMap;
				$t3.collisionMap = fr.collisionMap;
				$t3.colorMap = fr.colorMap;
				$t3.palette = fr.palette;
				$t4[index] = $t3;
			}
			obj.assets[i] = levelObjectAsset;
		}
		obj.pieces = [];
		for (var index1 = 0; index1 < d.pieces.length; index1++) {
			var piece = d.pieces[index1];
			obj.pieces[index1] = piece;
		}
		obj.pieceLayouts = [];
		for (var index2 = 0; index2 < d.pieceLayouts.length; index2++) {
			var pl = d.pieceLayouts[index2];
			var $t6 = obj.pieceLayouts;
			var $t5 = new $OurSonic_Level_Objects_LevelObjectPieceLayout(pl.name);
			$t5.height = pl.height;
			$t5.width = pl.width;
			$t6[index2] = $t5;
			obj.pieceLayouts[index2].pieces = [];
			for (var i1 = 0; i1 < d.pieceLayouts[index2].pieces.length; i1++) {
				obj.pieceLayouts[index2].pieces[i1] = d.pieceLayouts[index2].pieces[i1];
			}
		}
		obj.projectiles = [];
		for (var index3 = 0; index3 < d.projectiles.length; index3++) {
			var proj = d.projectiles[index3];
			var $t7 = $OurSonic_Level_Objects_LevelObjectProjectile.$ctor(proj.name);
			$t7.x = proj.x;
			$t7.y = proj.y;
			$t7.xsp = proj.xsp;
			$t7.ysp = proj.ysp;
			$t7.xflip = proj.xflip;
			$t7.yflip = proj.yflip;
			$t7.assetIndex = proj.assetIndex;
			$t7.frameIndex = proj.frameIndex;
			proj = $t7;
			obj.projectiles[index3] = proj;
		}
		return obj;
	};
	global.OurSonic.Level.Objects.ObjectManager = $OurSonic_Level_Objects_ObjectManager;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.RotationMode
	var $OurSonic_Level_Tiles_RotationMode = function() {
	};
	$OurSonic_Level_Tiles_RotationMode.__typeName = 'OurSonic.Level.Tiles.RotationMode';
	global.OurSonic.Level.Tiles.RotationMode = $OurSonic_Level_Tiles_RotationMode;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.Tile
	var $OurSonic_Level_Tiles_Tile = function(colors) {
		this.$_caches = {};
		this.$canAnimate = true;
		this.$willAnimate = null;
		this._Tile = 0;
		this.priority = false;
		this.xFlip = false;
		this.yFlip = false;
		this.palette = 0;
		this.curPaletteIndexes = null;
		this.sprites = null;
		this.colors = null;
		this.showOutline = false;
		this.index = 0;
		this.isAnimated = false;
		this.animatedFrames = null;
		this.colors = colors;
		this.sprites = [];
		this.curPaletteIndexes = null;
	};
	$OurSonic_Level_Tiles_Tile.__typeName = 'OurSonic.Level.Tiles.Tile';
	global.OurSonic.Level.Tiles.Tile = $OurSonic_Level_Tiles_Tile;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileCacheBlock
	var $OurSonic_Level_Tiles_TileCacheBlock = function() {
	};
	$OurSonic_Level_Tiles_TileCacheBlock.__typeName = 'OurSonic.Level.Tiles.TileCacheBlock';
	$OurSonic_Level_Tiles_TileCacheBlock.$ctor = function(type) {
		var $this = {};
		$this.animatedKey = 0;
		$this.type = 0;
		$this.tilePieceInfo = null;
		$this.block = null;
		$this.xPos = 0;
		$this.yPos = 0;
		$this.type = type;
		return $this;
	};
	global.OurSonic.Level.Tiles.TileCacheBlock = $OurSonic_Level_Tiles_TileCacheBlock;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileCacheBlockType
	var $OurSonic_Level_Tiles_TileCacheBlockType = function() {
	};
	$OurSonic_Level_Tiles_TileCacheBlockType.__typeName = 'OurSonic.Level.Tiles.TileCacheBlockType';
	global.OurSonic.Level.Tiles.TileCacheBlockType = $OurSonic_Level_Tiles_TileCacheBlockType;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileChunk
	var $OurSonic_Level_Tiles_TileChunk = function() {
		this.$layerCacheBlocks = null;
		this.$myLocalPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
		this.$myNeverAnimate = null;
		this.$neverAnimateCache = null;
		this.isOnlyBackground = null;
		this.isOnlyForeground = null;
		this.empty = null;
		this.tilePieces = null;
		this.animated = null;
		this.index = 0;
		this.heightBlocks1 = null;
		this.heightBlocks2 = null;
		this.angleMap1 = null;
		this.angleMap2 = null;
		this.isOnlyBackground = null;
		this.$neverAnimateCache = new Array(2);
		this.$layerCacheBlocks = new Array(2);
	};
	$OurSonic_Level_Tiles_TileChunk.__typeName = 'OurSonic.Level.Tiles.TileChunk';
	global.OurSonic.Level.Tiles.TileChunk = $OurSonic_Level_Tiles_TileChunk;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileItem
	var $OurSonic_Level_Tiles_TileItem = function() {
		this._Tile = 0;
		this.priority = false;
		this.xFlip = false;
		this.yFlip = false;
		this.palette = 0;
		this.index = 0;
	};
	$OurSonic_Level_Tiles_TileItem.__typeName = 'OurSonic.Level.Tiles.TileItem';
	global.OurSonic.Level.Tiles.TileItem = $OurSonic_Level_Tiles_TileItem;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TilePiece
	var $OurSonic_Level_Tiles_TilePiece = function() {
		this.$onlyBackground = false;
		this.$onlyBackgroundSet = false;
		this.$onlyForeground = false;
		this.$onlyForegroundSet = false;
		this.$shouldAnimate = null;
		this.image = null;
		this.tiles = null;
		this.index = 0;
		this.$1$AnimatedFramesField = null;
		this.image = {};
	};
	$OurSonic_Level_Tiles_TilePiece.__typeName = 'OurSonic.Level.Tiles.TilePiece';
	global.OurSonic.Level.Tiles.TilePiece = $OurSonic_Level_Tiles_TilePiece;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TilePieceInfo
	var $OurSonic_Level_Tiles_TilePieceInfo = function() {
		this.$block = null;
		this.block = 0;
		this.xFlip = false;
		this.yFlip = false;
		this.solid1 = 0;
		this.solid2 = 0;
		this.index = 0;
	};
	$OurSonic_Level_Tiles_TilePieceInfo.__typeName = 'OurSonic.Level.Tiles.TilePieceInfo';
	global.OurSonic.Level.Tiles.TilePieceInfo = $OurSonic_Level_Tiles_TilePieceInfo;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Sonic.Sensor
	var $OurSonic_Sonic_Sensor = function(x1, x2, y1, y2, manager, color, ignoreSolid, letter) {
		this.$__currentM = { value: 0, angle: 0 };
		this.value = 0;
		this.angle = 0;
		this.letter = null;
		this.chosen = false;
		this.ignoreSolid = false;
		this.color = null;
		this.manager = null;
		this.x1 = 0;
		this.x2 = 0;
		this.y1 = 0;
		this.y2 = 0;
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.manager = manager;
		this.color = color;
		this.ignoreSolid = ignoreSolid;
		this.letter = letter;
	};
	$OurSonic_Sonic_Sensor.__typeName = 'OurSonic.Sonic.Sensor';
	global.OurSonic.Sonic.Sensor = $OurSonic_Sonic_Sensor;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Sonic.SensorM
	var $OurSonic_Sonic_SensorM = function() {
	};
	$OurSonic_Sonic_SensorM.__typeName = 'OurSonic.Sonic.SensorM';
	global.OurSonic.Sonic.SensorM = $OurSonic_Sonic_SensorM;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Sonic.SensorManager
	var $OurSonic_Sonic_SensorManager = function() {
		this.sensors = null;
		this.sensorResults = null;
		this.sensors = {};
		this.sensorResults = {};
	};
	$OurSonic_Sonic_SensorManager.__typeName = 'OurSonic.Sonic.SensorManager';
	global.OurSonic.Sonic.SensorManager = $OurSonic_Sonic_SensorManager;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Sonic.Sonic
	var $OurSonic_Sonic_Sonic = function() {
		this.myRec = null;
		this.obtainedRing = {};
		this.$oldSign = 0;
		this.$physicsVariables = null;
		this.$runningTick = 0;
		this.$sensorManager = null;
		this.sonicLastHitTick = 0;
		this.$sonicLevel = null;
		this.watcher = null;
		this.ticking = false;
		this.x = 0;
		this.y = 0;
		this.rings = 0;
		this.debugging = false;
		this.jumping = false;
		this.crouching = false;
		this.holdingLeft = false;
		this.holdingRight = false;
		this.holdingUp = false;
		this.xsp = 0;
		this.ysp = 0;
		this.gsp = 0;
		this.rolling = false;
		this.inAir = false;
		this.wasInAir = false;
		this.holdingJump = false;
		this.justHit = false;
		this.hLock = 0;
		this.mode = 0;
		this.facing = false;
		this.breaking = 0;
		this.ducking = false;
		this.spinDash = false;
		this.spinDashSpeed = 0;
		this.angle = 0;
		this.currentlyBall = false;
		this.spriteState = null;
		this.haltSmoke = null;
		this.wasJumping = false;
		this.watcher = new $OurSonic_Sonic_Watcher();
		this.$physicsVariables = $OurSonic_Sonic_SonicConstants.sonic();
		var sonicManager = $OurSonic_SonicManager.instance;
		this.$sonicLevel = sonicManager.sonicLevel;
		this.x = this.$sonicLevel.startPositions[0].x;
		this.y = this.$sonicLevel.startPositions[0].y;
		this.$sensorManager = new $OurSonic_Sonic_SensorManager();
		this.haltSmoke = [];
		this.rings = 7;
		this.$sensorManager.createVerticalSensor('a', -9, 0, 36, '#F202F2', false);
		this.$sensorManager.createVerticalSensor('b', 9, 0, 36, '#02C2F2', false);
		this.$sensorManager.createVerticalSensor('c', -9, 0, -20, '#2D2C21', false);
		this.$sensorManager.createVerticalSensor('d', 9, 0, -20, '#C24222', false);
		this.$sensorManager.createHorizontalSensor('m1', 4, 0, -12, '#212C2E', false);
		this.$sensorManager.createHorizontalSensor('m2', 4, 0, 13, '#22Ffc1', false);
		this.spriteState = 'normal';
	};
	$OurSonic_Sonic_Sonic.__typeName = 'OurSonic.Sonic.Sonic';
	global.OurSonic.Sonic.Sonic = $OurSonic_Sonic_Sonic;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Sonic.SonicConstants
	var $OurSonic_Sonic_SonicConstants = function() {
		this.acc = 0;
		this.air = 0;
		this.dec = 0;
		this.frc = 0;
		this.grv = 0;
		this.jmp = 0;
		this.rdec = 0;
		this.rfrc = 0;
		this.slp = 0;
		this.slpRollingDown = 0;
		this.slpRollingUp = 0;
		this.topSpeed = 0;
	};
	$OurSonic_Sonic_SonicConstants.__typeName = 'OurSonic.Sonic.SonicConstants';
	$OurSonic_Sonic_SonicConstants.sonic = function() {
		var $t1 = new $OurSonic_Sonic_SonicConstants();
		$t1.acc = 0.046875;
		$t1.dec = 0.5;
		$t1.slp = 0.125;
		$t1.frc = 0.046875;
		$t1.rdec = 0.125;
		$t1.rfrc = 0.0234375;
		$t1.slpRollingUp = 0.078125;
		$t1.slpRollingDown = 0.3125;
		$t1.jmp = -6.5;
		$t1.grv = 0.21875;
		$t1.air = 0.09375;
		$t1.topSpeed = 6;
		var sc = $t1;
		return sc;
	};
	global.OurSonic.Sonic.SonicConstants = $OurSonic_Sonic_SonicConstants;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Sonic.Watcher
	var $OurSonic_Sonic_Watcher = function() {
		this.$lastTick = 0;
		this.mult = 1;
	};
	$OurSonic_Sonic_Watcher.__typeName = 'OurSonic.Sonic.Watcher';
	global.OurSonic.Sonic.Watcher = $OurSonic_Sonic_Watcher;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Button
	var $OurSonic_UIManager_Button = function(x, y, width, height, text) {
		this.font = null;
		this.toggle = false;
		this.toggled = false;
		this.clicking = false;
		this.button2Grad = null;
		this.button1Grad = null;
		this.buttonBorderGrad = null;
		this.text = null;
		this.color = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.text = text;
		this.toggle = false;
		this.toggled = false;
		this.font = $OurSonic_UIManager_UIManager.buttonFont;
		this.clicking = false;
		this.button1Grad = null;
		this.button2Grad = null;
		this.buttonBorderGrad = null;
		this.width = width;
		this.height = height;
	};
	$OurSonic_UIManager_Button.__typeName = 'OurSonic.UIManager.Button';
	global.OurSonic.UIManager.Button = $OurSonic_UIManager_Button;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Button
	var $OurSonic_UIManager_Button$1 = function(T) {
		var $type = function(data, x, y, width, height, text) {
			this.data = ss.getDefaultValue(T);
			$OurSonic_UIManager_Button.call(this, x, y, width, height, text);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UIManager_Button$1, [T], {}, function() {
			return $OurSonic_UIManager_Button;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UIManager_Button$1.__typeName = 'OurSonic.UIManager.Button$1';
	ss.initGenericClass($OurSonic_UIManager_Button$1, $asm, 1);
	global.OurSonic.UIManager.Button$1 = $OurSonic_UIManager_Button$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.EditorEngine
	var $OurSonic_UIManager_EditorEngine = function(el) {
		this.$points = null;
		this.editing = false;
		this.element = null;
		this.dragging = false;
		this.startDragging = null;
		this.dragg = null;
		this.element = el;
		this.$points = [$OurSonic_UIManager_EditorEnginePoint.$ctor(0, 0, 10, 'nw-resize', ss.mkdel(this, function(dv) {
			var x = dv.x;
			var y = dv.y;
			this.element.width += x;
			this.element.height += y;
			this.element.x -= x;
			this.element.y -= y;
			this.element.clearCache();
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(100, 0, 10, 'ne-resize', ss.mkdel(this, function(dv1) {
			var x1 = dv1.x;
			var y1 = dv1.y;
			this.element.width -= x1;
			this.element.height += y1;
			this.element.y -= y1;
			this.element.clearCache();
			dv1.x = 0;
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(100, 100, 10, 'se-resize', ss.mkdel(this, function(dv2) {
			var x2 = dv2.x;
			var y2 = dv2.y;
			this.element.width -= x2;
			this.element.height -= y2;
			this.element.clearCache();
			dv2.x = dv2.y = 0;
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(0, 100, 10, 'sw-resize', ss.mkdel(this, function(dv3) {
			var x3 = dv3.x;
			var y3 = dv3.y;
			this.element.width += x3;
			this.element.height -= y3;
			this.element.x -= x3;
			this.element.clearCache();
			dv3.y = 0;
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(50, 0, 5, 'n-resize', ss.mkdel(this, function(dv4) {
			var x4 = dv4.x;
			var y4 = dv4.y;
			this.element.height += y4;
			this.element.y -= x4;
			this.element.clearCache();
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(100, 50, 5, 'e-resize', ss.mkdel(this, function(dv5) {
			var x5 = dv5.x;
			var y5 = dv5.y;
			this.element.width -= y5;
			this.element.clearCache();
			dv5.x = dv5.y = 0;
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(50, 100, 5, 'n-resize', ss.mkdel(this, function(dv6) {
			var x6 = dv6.x;
			var y6 = dv6.y;
			this.element.height -= y6;
			this.element.clearCache();
			dv6.x = dv6.y = 0;
		})), $OurSonic_UIManager_EditorEnginePoint.$ctor(0, 50, 5, 'e-resize', ss.mkdel(this, function(dv7) {
			var x7 = dv7.x;
			var y7 = dv7.y;
			this.element.width += x7;
			this.element.x -= x7;
			this.element.clearCache();
		}))];
	};
	$OurSonic_UIManager_EditorEngine.__typeName = 'OurSonic.UIManager.EditorEngine';
	global.OurSonic.UIManager.EditorEngine = $OurSonic_UIManager_EditorEngine;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.EditorEnginePoint
	var $OurSonic_UIManager_EditorEnginePoint = function() {
	};
	$OurSonic_UIManager_EditorEnginePoint.__typeName = 'OurSonic.UIManager.EditorEnginePoint';
	$OurSonic_UIManager_EditorEnginePoint.$ctor = function(x, y, size, cursor, click) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.size = 0;
		$this.cursor = null;
		$this.click = null;
		$this.editing = false;
		$this.x = x;
		$this.y = y;
		$this.size = size;
		$this.cursor = cursor;
		$this.click = click;
		return $this;
	};
	global.OurSonic.UIManager.EditorEnginePoint = $OurSonic_UIManager_EditorEnginePoint;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Element
	var $OurSonic_UIManager_Element = function(x, y) {
		this.$cachedForceRedrawing = $OurSonic_UIManager_Element$ForceRedrawing.$ctor();
		this.$myDepth = 0;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.visible = false;
		this.cachedDrawing = null;
		this.click = null;
		this.mouseUp = null;
		this.mouseOver = null;
		this.editMode = false;
		this.editorEngine = null;
		this.parent = null;
		this.focused = false;
		this.x = x;
		this.y = y;
		this.editorEngine = new $OurSonic_UIManager_EditorEngine(this);
		this.visible = true;
		//
		//                        if (this.Construct) {
		//
		//                        this.Construct();
		//
		//                        }
	};
	$OurSonic_UIManager_Element.__typeName = 'OurSonic.UIManager.Element';
	global.OurSonic.UIManager.Element = $OurSonic_UIManager_Element;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Element.ForceRedrawing
	var $OurSonic_UIManager_Element$ForceRedrawing = function() {
	};
	$OurSonic_UIManager_Element$ForceRedrawing.__typeName = 'OurSonic.UIManager.Element$ForceRedrawing';
	$OurSonic_UIManager_Element$ForceRedrawing.createInstance = function() {
		return $OurSonic_UIManager_Element$ForceRedrawing.$ctor();
	};
	$OurSonic_UIManager_Element$ForceRedrawing.$ctor = function() {
		var $this = {};
		$this.redraw = false;
		$this.clearCache = false;
		return $this;
	};
	global.OurSonic.UIManager.Element$ForceRedrawing = $OurSonic_UIManager_Element$ForceRedrawing;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.HScrollBox
	var $OurSonic_UIManager_HScrollBox = function(x, y, itemHeight, visibleItems, itemWidth) {
		this.itemWidth = 0;
		this.scrollWidth = 0;
		this.jWidth = 0;
		this.visibleItems = 0;
		this.itemHeight = 0;
		this.backColor = null;
		this.scrollOffset = 0;
		this.scrollPosition = 0;
		this.dragging = false;
		this.controls = null;
		this.scrolling = false;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.itemWidth = itemWidth;
		this.scrollWidth = 14;
		this.jWidth = 5;
		this.visibleItems = visibleItems;
		this.itemHeight = itemHeight;
		this.controls = [];
	};
	$OurSonic_UIManager_HScrollBox.__typeName = 'OurSonic.UIManager.HScrollBox';
	global.OurSonic.UIManager.HScrollBox = $OurSonic_UIManager_HScrollBox;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.HtmlBox
	var $OurSonic_UIManager_HtmlBox = function(x, y) {
		this.$2$InitField = null;
		this.$2$UpdatePositionField = null;
		this.$2$_FocusField = null;
		this.$2$_HideField = null;
		$OurSonic_UIManager_Element.call(this, x, y);
	};
	$OurSonic_UIManager_HtmlBox.__typeName = 'OurSonic.UIManager.HtmlBox';
	global.OurSonic.UIManager.HtmlBox = $OurSonic_UIManager_HtmlBox;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Image
	var $OurSonic_UIManager_Image = function(x, y, width, height) {
		this.onDraw = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.onDraw = null;
		this.width = width;
		this.height = height;
	};
	$OurSonic_UIManager_Image.__typeName = 'OurSonic.UIManager.Image';
	global.OurSonic.UIManager.Image = $OurSonic_UIManager_Image;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Image
	var $OurSonic_UIManager_Image$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = ss.getDefaultValue(T);
			$OurSonic_UIManager_Image.call(this, x, y, width, height);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UIManager_Image$1, [T], {}, function() {
			return $OurSonic_UIManager_Image;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UIManager_Image$1.__typeName = 'OurSonic.UIManager.Image$1';
	ss.initGenericClass($OurSonic_UIManager_Image$1, $asm, 1);
	global.OurSonic.UIManager.Image$1 = $OurSonic_UIManager_Image$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.ImageButton
	var $OurSonic_UIManager_ImageButton = function(x, y, width, height) {
		this.font = null;
		this.toggle = false;
		this.toggled = false;
		this.clicking = false;
		this.button2Grad = null;
		this.onDraw = null;
		this.button1Grad = null;
		this.buttonBorderGrad = null;
		this.text = null;
		this.color = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('');
		this.toggle = false;
		this.toggled = false;
		this.font = '';
		this.clicking = false;
		this.onDraw = null;
		this.button1Grad = null;
		this.button2Grad = null;
		this.buttonBorderGrad = null;
		this.width = width;
		this.height = height;
	};
	$OurSonic_UIManager_ImageButton.__typeName = 'OurSonic.UIManager.ImageButton';
	global.OurSonic.UIManager.ImageButton = $OurSonic_UIManager_ImageButton;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.ImageButton
	var $OurSonic_UIManager_ImageButton$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = ss.getDefaultValue(T);
			$OurSonic_UIManager_ImageButton.call(this, x, y, width, height);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UIManager_ImageButton$1, [T], {}, function() {
			return $OurSonic_UIManager_ImageButton;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UIManager_ImageButton$1.__typeName = 'OurSonic.UIManager.ImageButton$1';
	ss.initGenericClass($OurSonic_UIManager_ImageButton$1, $asm, 1);
	global.OurSonic.UIManager.ImageButton$1 = $OurSonic_UIManager_ImageButton$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Panel
	var $OurSonic_UIManager_Panel = function(x, y, width, height) {
		this.controls = null;
		this.outline = false;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.outline = true;
		this.width = width;
		this.height = height;
		this.controls = [];
	};
	$OurSonic_UIManager_Panel.__typeName = 'OurSonic.UIManager.Panel';
	global.OurSonic.UIManager.Panel = $OurSonic_UIManager_Panel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Panel
	var $OurSonic_UIManager_Panel$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = ss.getDefaultValue(T);
			$OurSonic_UIManager_Panel.call(this, x, y, width, height);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UIManager_Panel$1, [T], {}, function() {
			return $OurSonic_UIManager_Panel;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UIManager_Panel$1.__typeName = 'OurSonic.UIManager.Panel$1';
	ss.initGenericClass($OurSonic_UIManager_Panel$1, $asm, 1);
	global.OurSonic.UIManager.Panel$1 = $OurSonic_UIManager_Panel$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Pointer
	var $OurSonic_UIManager_Pointer = function() {
	};
	$OurSonic_UIManager_Pointer.__typeName = 'OurSonic.UIManager.Pointer';
	$OurSonic_UIManager_Pointer.$ctor = function(x, y, delta, right) {
		var $this = $OurSonic_Utility_Point.$ctor1(x, y);
		$this.delta = 0;
		$this.right = false;
		$this.delta = delta;
		$this.right = right;
		return $this;
	};
	global.OurSonic.UIManager.Pointer = $OurSonic_UIManager_Pointer;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.PropertyButton
	var $OurSonic_UIManager_PropertyButton = function(x, y) {
		$OurSonic_UIManager_Element.call(this, x, y);
	};
	$OurSonic_UIManager_PropertyButton.__typeName = 'OurSonic.UIManager.PropertyButton';
	global.OurSonic.UIManager.PropertyButton = $OurSonic_UIManager_PropertyButton;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.ScrollBox
	var $OurSonic_UIManager_ScrollBox = function(x, y, itemHeight, visibleItems, itemWidth) {
		this.itemWidth = 0;
		this.scrollWidth = 0;
		this.jHeight = 0;
		this.visibleItems = 0;
		this.itemHeight = 0;
		this.backColor = null;
		this.scrollIndex = 0;
		this.scrollPosition = 0;
		this.dragging = false;
		this.controls = null;
		this.scrolling = false;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.itemWidth = itemWidth;
		this.scrollWidth = 14;
		this.visibleItems = visibleItems;
		this.itemHeight = itemHeight;
		this.backColor = '';
		this.jHeight = 5;
		this.controls = [];
	};
	$OurSonic_UIManager_ScrollBox.__typeName = 'OurSonic.UIManager.ScrollBox';
	global.OurSonic.UIManager.ScrollBox = $OurSonic_UIManager_ScrollBox;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Table
	var $OurSonic_UIManager_Table = function(x, y, width, height) {
		this.rows = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.width = width;
		this.height = height;
		this.rows = [];
	};
	$OurSonic_UIManager_Table.__typeName = 'OurSonic.UIManager.Table';
	global.OurSonic.UIManager.Table = $OurSonic_UIManager_Table;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Table
	var $OurSonic_UIManager_Table$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = ss.getDefaultValue(T);
			$OurSonic_UIManager_Table.call(this, x, y, width, height);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UIManager_Table$1, [T], {}, function() {
			return $OurSonic_UIManager_Table;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UIManager_Table$1.__typeName = 'OurSonic.UIManager.Table$1';
	ss.initGenericClass($OurSonic_UIManager_Table$1, $asm, 1);
	global.OurSonic.UIManager.Table$1 = $OurSonic_UIManager_Table$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.TableCell
	var $OurSonic_UIManager_TableCell = function() {
		this.cellHeight = null;
		this.cellWidth = null;
		this.fullSize = false;
		this.rowSpan = 0;
		this.colSpan = 0;
		$OurSonic_UIManager_Panel.call(this, 0, 0, 0, 0);
	};
	$OurSonic_UIManager_TableCell.__typeName = 'OurSonic.UIManager.TableCell';
	$OurSonic_UIManager_TableCell.$ctor1 = function(width, height) {
		this.cellHeight = null;
		this.cellWidth = null;
		this.fullSize = false;
		this.rowSpan = 0;
		this.colSpan = 0;
		$OurSonic_UIManager_Panel.call(this, 0, 0, 0, 0);
		this.cellWidth = width;
		this.cellHeight = height;
		this.outline = true;
		this.fullSize = true;
	};
	global.OurSonic.UIManager.TableCell = $OurSonic_UIManager_TableCell;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.TableRow
	var $OurSonic_UIManager_TableRow = function(height) {
		this.cells = null;
		this.$2$RowHeightField = null;
		$OurSonic_UIManager_Element.call(this, 0, 0);
		this.set_rowHeight(height);
		this.cells = [];
	};
	$OurSonic_UIManager_TableRow.__typeName = 'OurSonic.UIManager.TableRow';
	global.OurSonic.UIManager.TableRow = $OurSonic_UIManager_TableRow;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.TextArea
	var $OurSonic_UIManager_TextArea = function(x, y, text) {
		this.$oldText = null;
		this.text = null;
		this.font = null;
		this.color = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.text = text;
		this.font = $OurSonic_UIManager_UIManager.textFont;
		this.color = 'black';
		this.$oldText = '';
	};
	$OurSonic_UIManager_TextArea.__typeName = 'OurSonic.UIManager.TextArea';
	global.OurSonic.UIManager.TextArea = $OurSonic_UIManager_TextArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.TextBox
	var $OurSonic_UIManager_TextBox = function(x, y, width, height, text) {
		this.$blinkTick = 0;
		this.$blinked = false;
		this.$can = null;
		this.$oldText = null;
		this.textChanged = null;
		this.text = null;
		this.font = null;
		this.clicking = false;
		this.color = null;
		this.cursorPosition = 0;
		this.dragPosition = 0;
		this.drawTicks = 0;
		this.lastClickTick = 0;
		this.blinked = false;
		this.blinkTick = 0;
		this.button1Grad = null;
		this.button2Grad = null;
		this.buttonBorderGrad = null;
		this.can = false;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit(text);
		this.width = width;
		this.height = height;
		this.font = $OurSonic_UIManager_UIManager.textFont;
		this.dragPosition = -1;
	};
	$OurSonic_UIManager_TextBox.__typeName = 'OurSonic.UIManager.TextBox';
	global.OurSonic.UIManager.TextBox = $OurSonic_UIManager_TextBox;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.UIArea
	var $OurSonic_UIManager_UIArea = function(x, y, width, height) {
		this.dragging = null;
		this.closable = false;
		$OurSonic_UIManager_Panel.call(this, x, y, width, height);
		this.closable = true;
		this.outline = false;
	};
	$OurSonic_UIManager_UIArea.__typeName = 'OurSonic.UIManager.UIArea';
	global.OurSonic.UIManager.UIArea = $OurSonic_UIManager_UIArea;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.UIArea
	var $OurSonic_UIManager_UIArea$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = ss.getDefaultValue(T);
			$OurSonic_UIManager_UIArea.call(this, x, y, width, height);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UIManager_UIArea$1, [T], {}, function() {
			return $OurSonic_UIManager_UIArea;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UIManager_UIArea$1.__typeName = 'OurSonic.UIManager.UIArea$1';
	ss.initGenericClass($OurSonic_UIManager_UIArea$1, $asm, 1);
	global.OurSonic.UIManager.UIArea$1 = $OurSonic_UIManager_UIArea$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.UIManager
	var $OurSonic_UIManager_UIManager = function(sonicManager, mainCanvas) {
		this.$mainCanvas = null;
		this.sonicManager = null;
		this.$messages = [];
		this.uiAreas = null;
		this.dragger = null;
		this.data = null;
		this.canvasDepths = null;
		this.$1$UIManagerAreasField = null;
		$OurSonic_UIManager_UIManager.instance = this;
		mainCanvas.font = $OurSonic_UIManager_UIManager.textFont;
		this.uiAreas = [];
		this.sonicManager = sonicManager;
		this.$mainCanvas = mainCanvas;
		this.dragger = new $OurSonic_Utility_Dragger(function(xsp, ysp) {
			sonicManager.windowLocation.x += ss.Int32.trunc(xsp);
			sonicManager.windowLocation.y += ss.Int32.trunc(ysp);
			sonicManager.bigWindowLocation.x = sonicManager.windowLocation.x;
			sonicManager.bigWindowLocation.y = sonicManager.windowLocation.y;
		});
		this.set_uiManagerAreas(new $OurSonic_Areas_UIManagerAreas());
		new $OurSonic_Areas_LevelSelectorArea(this);
		new $OurSonic_Areas_ColorEditorArea(this);
		new $OurSonic_Areas_ObjectFrameworkArea(this);
		new $OurSonic_Areas_ObjectFrameworkListArea(this);
		var l = new $OurSonic_Areas_LevelManagerArea(this);
		l.levelManager.visible = false;
		sonicManager.onLevelLoad = ss.delegateCombine(sonicManager.onLevelLoad, ss.mkdel(this, function(level) {
			l.levelManager.visible = true;
			new $OurSonic_Areas_TileChunkArea(this);
		}));
	};
	$OurSonic_UIManager_UIManager.__typeName = 'OurSonic.UIManager.UIManager';
	$OurSonic_UIManager_UIManager.get_curLevelName = function() {
		return $OurSonic_UIManager_UIManager.$_curLevelName;
	};
	$OurSonic_UIManager_UIManager.set_curLevelName = function(value) {
		$OurSonic_UIManager_UIManager.updateTitle('- Our Sonic - ' + value);
		$OurSonic_UIManager_UIManager.$_curLevelName = value;
	};
	$OurSonic_UIManager_UIManager.updateTitle = function(title) {
		document.title = title;
	};
	global.OurSonic.UIManager.UIManager = $OurSonic_UIManager_UIManager;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.UIManagerData
	var $OurSonic_UIManager_UIManagerData = function() {
	};
	$OurSonic_UIManager_UIManagerData.__typeName = 'OurSonic.UIManager.UIManagerData';
	$OurSonic_UIManager_UIManagerData.createInstance = function() {
		return $OurSonic_UIManager_UIManagerData.$ctor();
	};
	$OurSonic_UIManager_UIManagerData.$ctor = function() {
		var $this = {};
		$this.indexes = null;
		$this.solidTileArea = null;
		$this.modifyTilePieceArea = null;
		return $this;
	};
	global.OurSonic.UIManager.UIManagerData = $OurSonic_UIManager_UIManagerData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.UIManagerDataIndexes
	var $OurSonic_UIManager_UIManagerDataIndexes = function() {
	};
	$OurSonic_UIManager_UIManagerDataIndexes.__typeName = 'OurSonic.UIManager.UIManagerDataIndexes';
	$OurSonic_UIManager_UIManagerDataIndexes.createInstance = function() {
		return $OurSonic_UIManager_UIManagerDataIndexes.$ctor();
	};
	$OurSonic_UIManager_UIManagerDataIndexes.$ctor = function() {
		var $this = {};
		$this.tpIndex = 0;
		return $this;
	};
	global.OurSonic.UIManager.UIManagerDataIndexes = $OurSonic_UIManager_UIManagerDataIndexes;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.CanvasHandler
	var $OurSonic_Utility_CanvasHandler = function(canvas) {
		this.$myCanvas = null;
		this.$myCanvas = canvas;
		canvas.save();
	};
	$OurSonic_Utility_CanvasHandler.__typeName = 'OurSonic.Utility.CanvasHandler';
	global.OurSonic.Utility.CanvasHandler = $OurSonic_Utility_CanvasHandler;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.CanvasInformation
	var $OurSonic_Utility_CanvasInformation = function(context, domCanvas) {
		this.context = null;
		this.domCanvas = null;
		this.canvas = null;
		this.context = context;
		this.domCanvas = domCanvas;
		this.canvas = domCanvas[0];
	};
	$OurSonic_Utility_CanvasInformation.__typeName = 'OurSonic.Utility.CanvasInformation';
	$OurSonic_Utility_CanvasInformation.get_blackPixel = function() {
		if (ss.isNullOrUndefined($OurSonic_Utility_CanvasInformation.$blackPixel)) {
			var m = $OurSonic_Utility_CanvasInformation.create(0, 0);
			m.context.fillStyle = 'black';
			m.context.fillRect(0, 0, 1, 1);
			$OurSonic_Utility_CanvasInformation.$blackPixel = m.canvas;
		}
		return $OurSonic_Utility_CanvasInformation.$blackPixel;
	};
	$OurSonic_Utility_CanvasInformation.create = function(w, h) {
		var canvas = document.createElement('canvas');
		return $OurSonic_Utility_CanvasInformation.create$1(canvas, w, h);
	};
	$OurSonic_Utility_CanvasInformation.create$1 = function(canvas, w, h) {
		if (w === 0) {
			w = 1;
		}
		if (h === 0) {
			h = 1;
		}
		canvas.width = w;
		canvas.height = h;
		var ctx = canvas.getContext('2d');
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		return new $OurSonic_Utility_CanvasInformation(ctx, $(canvas));
	};
	global.OurSonic.Utility.CanvasInformation = $OurSonic_Utility_CanvasInformation;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.ClickState
	var $OurSonic_Utility_ClickState = function() {
	};
	$OurSonic_Utility_ClickState.__typeName = 'OurSonic.Utility.ClickState';
	global.OurSonic.Utility.ClickState = $OurSonic_Utility_ClickState;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Color
	var $OurSonic_Utility_Color = function() {
	};
	$OurSonic_Utility_Color.__typeName = 'OurSonic.Utility.Color';
	global.OurSonic.Utility.Color = $OurSonic_Utility_Color;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Constants
	var $OurSonic_Utility_Constants = function() {
	};
	$OurSonic_Utility_Constants.__typeName = 'OurSonic.Utility.Constants';
	$OurSonic_Utility_Constants.defaultWindowLocation = function(state, canvas, scale) {
		switch (state) {
			case 0: {
				return new $OurSonic_Utility_IntersectingRectangle(0, 0, 320, 224);
			}
			case 1: {
				var x = 0;
				var y = 0;
				if ($OurSonic_SonicManager.instance.sonicLevel && $OurSonic_SonicManager.instance.sonicLevel.startPositions && $OurSonic_SonicManager.instance.sonicLevel.startPositions[0]) {
					x = $OurSonic_SonicManager.instance.sonicLevel.startPositions[0].x - 128 * scale.x;
					y = $OurSonic_SonicManager.instance.sonicLevel.startPositions[0].y - 128 * scale.y;
				}
				return new $OurSonic_Utility_IntersectingRectangle(x, y, window.innerWidth, window.innerHeight);
			}
		}
		return null;
	};
	global.OurSonic.Utility.Constants = $OurSonic_Utility_Constants;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.DoublePoint
	var $OurSonic_Utility_DoublePoint = function() {
	};
	$OurSonic_Utility_DoublePoint.__typeName = 'OurSonic.Utility.DoublePoint';
	$OurSonic_Utility_DoublePoint.offset = function($this, windowLocation) {
		return $OurSonic_Utility_DoublePoint.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
	};
	$OurSonic_Utility_DoublePoint.negate = function($this, windowLocation) {
		return $OurSonic_Utility_DoublePoint.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
	};
	$OurSonic_Utility_DoublePoint.negate$1 = function($this, x, y) {
		return $OurSonic_Utility_DoublePoint.$ctor1($this.x - x, $this.y - y);
	};
	$OurSonic_Utility_DoublePoint.op_Implicit = function(p) {
		return $OurSonic_Utility_DoublePoint.$ctor1(p.x, p.y);
	};
	$OurSonic_Utility_DoublePoint.string = function($this) {
		return ss.formatString('{{X:{0}, Y:{1}}}', $this.x, $this.y);
	};
	$OurSonic_Utility_DoublePoint.$ctor1 = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	$OurSonic_Utility_DoublePoint.$ctor = function(pos) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = pos.x;
		$this.y = pos.y;
		return $this;
	};
	global.OurSonic.Utility.DoublePoint = $OurSonic_Utility_DoublePoint;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Dragger
	var $OurSonic_Utility_Dragger = function(onFling) {
		this.$myOnFling = null;
		this.$lag = 0.925000011920929;
		this.$lastPos = null;
		this.$xsp = 0;
		this.$ysp = 0;
		this.$myOnFling = onFling;
	};
	$OurSonic_Utility_Dragger.__typeName = 'OurSonic.Utility.Dragger';
	global.OurSonic.Utility.Dragger = $OurSonic_Utility_Dragger;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Extensions
	var $OurSonic_Utility_Extensions = function() {
	};
	$OurSonic_Utility_Extensions.__typeName = 'OurSonic.Utility.Extensions';
	$OurSonic_Utility_Extensions.$makeOffset = function() {
		if ($OurSonic_Utility_Extensions.DOES % 3 === 0) {
			$OurSonic_Utility_Extensions.$offsets = [1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			return;
		}
		if ($OurSonic_Utility_Extensions.DOES % 3 === 1) {
			$OurSonic_Utility_Extensions.$offsets = [0];
			return;
		}
		if ($OurSonic_SonicManager.instance.drawTickCount % 10 !== 0) {
			return;
		}
		var c = 3;
		//(int)(Math.Abs(Math.Sin(SonicManager.Instance.DrawTickCount) * 10));
		var ms = [];
		for (var i = -c; i < c; i++) {
			var len = (c + 1 - Math.abs(i)) * Math.abs(i);
			for (var j = 0; j < len; j++) {
				ss.add(ms, i);
			}
		}
		for (var i1 = c; i1 > -c; i1--) {
			var len1 = (c + 1 - Math.abs(i1)) * Math.abs(i1);
			for (var j1 = 0; j1 < len1; j1++) {
				ss.add(ms, i1);
			}
		}
		$OurSonic_Utility_Extensions.$offsets = ms;
	};
	$OurSonic_Utility_Extensions.offsetStuffOtherWay = function(context) {
		var offsets_ = $OurSonic_Utility_Extensions.$offsets;
		var cury = $OurSonic_Utility_Extensions.$curY;
		if ($OurSonic_SonicManager.instance.drawTickCount % 3 === 0) {
			cury++;
		}
		var n = offsets_.length;
		for (var y = 0; y < 240; y++) {
			var off = offsets_[((cury + y) % n + n) % n];
			context.drawImage(context.canvas, 0, y, 320, 1, off, y, 320, 1);
		}
		//context.PutImageData(imaged, 0, 0);
		$OurSonic_Utility_Extensions.$curY = cury;
	};
	$OurSonic_Utility_Extensions.offsetStuff = function(context) {
		return;
		$OurSonic_Utility_Extensions.$makeOffset();
		//    if (DOES)
		//    {
		//    OffsetStuffOtherWay(context);
		//    return;
		//    }
		var offsets_ = $OurSonic_Utility_Extensions.$offsets;
		var cury = $OurSonic_Utility_Extensions.$curY;
		if ($OurSonic_SonicManager.instance.drawTickCount % 3 === 0) {
			cury++;
		}
		var imaged = context.getImageData(0, 0, 320, 240);
		var imaged2 = context.getImageData(0, 0, 320, 240);
		var imagedArray = imaged.data;
		var imaged2Array = imaged2.data;
		var n = offsets_.length;
		for (var y = 0; y < 240; y++) {
			var off = -offsets_[((cury + y) % n + n) % n];
			if (off === 0) {
				continue;
			}
			var yOff = y * 320;
			for (var x = 0; x < 320; x++) {
				var ind = (x + yOff) * 4;
				var mc = x + off;
				if (mc < 0) {
					mc = 0;
				}
				if (mc >= 320) {
					mc = 319;
				}
				var index = (mc + yOff) * 4;
				imagedArray[ind + 0] = imaged2Array[index + 0];
				imagedArray[ind + 1] = imaged2Array[index + 1];
				imagedArray[ind + 2] = imaged2Array[index + 2];
				imagedArray[ind + 3] = imaged2Array[index + 3];
			}
		}
		context.putImageData(imaged, 0, 0);
		$OurSonic_Utility_Extensions.$curY = cury;
	};
	$OurSonic_Utility_Extensions.withData = function(T, T2) {
		return function(item, data) {
			return new (ss.makeGenericType($OurSonic_Utility_ExtraData$2, [T, T2]))(item, data);
		};
	};
	$OurSonic_Utility_Extensions.percent$1 = function(num) {
		return num + '%';
	};
	$OurSonic_Utility_Extensions.percent = function(num) {
		return num + '%';
	};
	global.OurSonic.Utility.Extensions = $OurSonic_Utility_Extensions;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.ExtraData
	var $OurSonic_Utility_ExtraData$2 = function(T, T2) {
		var $type = function(item, data) {
			this.item = ss.getDefaultValue(T);
			this.data = ss.getDefaultValue(T2);
			this.data = data;
			this.item = item;
		};
		$type.op_Implicit = function(d) {
			return d.item;
		};
		$type.op_Implicit$1 = function(d) {
			return d.data;
		};
		ss.registerGenericClassInstance($type, $OurSonic_Utility_ExtraData$2, [T, T2], {}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_Utility_ExtraData$2.__typeName = 'OurSonic.Utility.ExtraData$2';
	ss.initGenericClass($OurSonic_Utility_ExtraData$2, $asm, 2);
	global.OurSonic.Utility.ExtraData$2 = $OurSonic_Utility_ExtraData$2;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.GameState
	var $OurSonic_Utility_GameState = function() {
	};
	$OurSonic_Utility_GameState.__typeName = 'OurSonic.Utility.GameState';
	global.OurSonic.Utility.GameState = $OurSonic_Utility_GameState;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Help
	var $OurSonic_Utility_Help = function() {
	};
	$OurSonic_Utility_Help.__typeName = 'OurSonic.Utility.Help';
	$OurSonic_Utility_Help.toPx$1 = function(number) {
		return number + 'px';
	};
	$OurSonic_Utility_Help.toPx = function(number) {
		return number + 'px';
	};
	$OurSonic_Utility_Help.sin = function(f) {
		return $OurSonic_Utility_Help.$cos_table[f + 64 & 255];
	};
	$OurSonic_Utility_Help.cos = function(f) {
		return $OurSonic_Utility_Help.$cos_table[f & 255];
	};
	$OurSonic_Utility_Help.mod = function(j, n) {
		return (j % n + n) % n;
	};
	$OurSonic_Utility_Help.scaleSprite = function(image, scale) {
		var canv = $OurSonic_Utility_CanvasInformation.create(image.width * scale.x, image.height * scale.y);
		canv.context.save();
		canv.context.scale(scale.x, scale.y);
		canv.context.drawImage(image, 0, 0);
		canv.context.restore();
		return canv;
	};
	$OurSonic_Utility_Help.scalePixelData = function(scale, data) {
		var pixelArray = data.data;
		var colors = new Array(ss.Int32.div(pixelArray.length, 4));
		for (var f = 0; f < pixelArray.length; f += 4) {
			colors[ss.Int32.div(f, 4)] = $OurSonic_Utility_Help.$colorObjectFromData(pixelArray, f);
		}
		var d = $OurSonic_Utility_CanvasInformation.create(1, 1).context.createImageData(data.width * scale.x, data.height * scale.y);
		$OurSonic_Utility_Help.$setDataFromColors(d.data, colors, scale, data.width, colors[0]);
		return d;
	};
	$OurSonic_Utility_Help.$setDataFromColors = function(data, colors, scale, width, transparent) {
		for (var i = 0; i < colors.length; i++) {
			var curX = i % width;
			var curY = ss.Int32.div(i, width);
			var g = colors[i];
			var isTrans = false;
			if (transparent) {
				if (g.r === transparent.r && g.g === transparent.g && g.b === transparent.b) {
					isTrans = true;
				}
			}
			for (var j = 0; j < scale.x; j++) {
				for (var k = 0; k < scale.y; k++) {
					var x = curX * scale.x + j;
					var y = curY * scale.y + k;
					var c = (x + y * (scale.x * width)) * 4;
					if (isTrans) {
						data[c + 0] = 0;
						data[c + 1] = 0;
						data[c + 2] = 0;
						data[c + 3] = 0;
						continue;
					}
					data[c] = g.r;
					data[c + 1] = g.g;
					data[c + 2] = g.b;
					data[c + 3] = 255;
				}
			}
		}
	};
	$OurSonic_Utility_Help.$getBase64Image = function(data) {
		// Create an empty canvas element
		var canvas = document.createElement('canvas');
		canvas.width = data.width;
		canvas.height = data.height;
		// Copy the image contents to the canvas
		var ctx = canvas.getContext('2d');
		ctx.putImageData(data, 0, 0);
		var dataURL = canvas.toDataURL('image/png');
		return ss.cast(dataURL, String);
	};
	$OurSonic_Utility_Help.$colorObjectFromData = function(data, c) {
		var r = ss.unbox(ss.cast(data[c], ss.Int32));
		var g = ss.unbox(ss.cast(data[c + 1], ss.Int32));
		var b = ss.unbox(ss.cast(data[c + 2], ss.Int32));
		var a = ss.unbox(ss.cast(data[c + 3], ss.Int32));
		return { r: r, g: g, b: b, a: a };
	};
	$OurSonic_Utility_Help.getImageData = function(image) {
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);
		var data = ctx.getImageData(0, 0, image.width, image.height);
		return data;
	};
	$OurSonic_Utility_Help.scaleCsImage = function(image, scale, complete) {
		var df = image.bytes;
		var colors = new Array(df.length);
		for (var f = 0; f < df.length; f++) {
			var c = image.palette[df[f]];
			colors[f] = { r: c[0], g: c[1], b: c[2], a: c[3] };
		}
		var dc = $OurSonic_Utility_CanvasInformation.create(1, 1);
		var d = dc.context.createImageData(image.width * scale.x, image.height * scale.y);
		$OurSonic_Utility_Help.$setDataFromColors(d.data, colors, scale, image.width, colors[0]);
		return $OurSonic_Utility_Help.loadSprite($OurSonic_Utility_Help.$getBase64Image(d), complete);
	};
	$OurSonic_Utility_Help.loaded = function(element) {
		return element.getAttribute('loaded') === 'true';
	};
	$OurSonic_Utility_Help.loaded$1 = function(element, set) {
		element.setAttribute('loaded', (set ? 'true' : 'false'));
	};
	$OurSonic_Utility_Help.loadSprite = function(src, complete) {
		var sprite1 = new Image();
		sprite1.addEventListener('load', function(e) {
			$OurSonic_Utility_Help.loaded$1(sprite1, true);
			if (complete) {
				complete(sprite1);
			}
		}, false);
		sprite1.src = src;
		return sprite1;
	};
	$OurSonic_Utility_Help.decodeString = function(lvl) {
		return (new Compressor()).DecompressText(lvl);
	};
	$OurSonic_Utility_Help.decodeString$1 = function(T) {
		return function(lvl, complete) {
			if (hasWebWorker()) {
				(new FunctionWorker('lib/FunctionWorker.js')).threadedFunction(function(e) {
					self.importScripts('RawDeflate.js');
					e.data = (new Compressor()).DecompressText(e.data);
					e.callback(e.data);
				}, function(e1) {
					complete(JSON.parse(e1.data));
				}, function(e2) {
				}, lvl);
			}
			else {
				complete(JSON.parse((new Compressor()).DecompressText(lvl)));
			}
		};
	};
	$OurSonic_Utility_Help.fixAngle = function(angle) {
		var fixedAng = ss.Int32.trunc(Math.floor((256 - angle) * 1.4062)) % 360;
		var flop = 360 - fixedAng;
		return $OurSonic_Utility_Help.degToRad(flop);
	};
	$OurSonic_Utility_Help.degToRad = function(angle) {
		return angle * Math.PI / 180;
	};
	$OurSonic_Utility_Help.sign = function(m) {
		return ((m === 0) ? 0 : ((m < 0) ? -1 : 1));
	};
	$OurSonic_Utility_Help.floor = function(spinDashSpeed) {
		if (spinDashSpeed > 0) {
			return ss.unbox(ss.cast(~~spinDashSpeed, ss.Int32));
		}
		return ss.Int32.trunc(Math.floor(spinDashSpeed));
	};
	$OurSonic_Utility_Help.max = function(f1, f2) {
		return ((f1 < f2) ? f2 : f1);
	};
	$OurSonic_Utility_Help.min = function(f1, f2) {
		return ((f1 > f2) ? f2 : f1);
	};
	$OurSonic_Utility_Help.clone = function(T) {
		return function(o) {
			return ss.getDefaultValue(T);
		};
	};
	$OurSonic_Utility_Help.mergeRect = function(main, small) {
		main.x = Math.min(small.x, main.x);
		main.width = Math.max(small.x + small.width + main.x, main.width);
		main.y = Math.min(small.y, main.y);
		main.height = Math.max(small.y + small.height + main.y, main.height);
	};
	$OurSonic_Utility_Help.roundRect = function(ctx, x, y, width, height, radius, fill, stroke) {
		ctx.save();
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width, y);
		//ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height);
		// ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x, y + height);
		// ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		if (stroke) {
			ctx.stroke();
		}
		if (fill) {
			ctx.fill();
		}
		ctx.restore();
	};
	$OurSonic_Utility_Help.getCursorPosition = function(ev) {
		if (!!(ev.originalEvent && ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0)) {
			ev = ev.originalEvent.targetTouches[0];
		}
		if (!!(ss.isValue(ev.pageX) && ss.isValue(ev.pageY))) {
			return $OurSonic_UIManager_Pointer.$ctor(ev.pageX, ev.pageY, 0, ev.which === 3);
		}
		//if (ev.x != null && ev.y != null) return new { x: ev.x, y: ev.y };
		return $OurSonic_UIManager_Pointer.$ctor(ev.clientX, ev.clientY, 0, ev.which === 3);
	};
	$OurSonic_Utility_Help.stringify = function(obj) {
		return JSON.stringify(obj, function(key, value) {
			if (key === 'image') {
				return null;
			}
			if (key === 'imageData') {
				return null;
			}
			if (key === 'oldScale') {
				return null;
			}
			if (key === 'sprite') {
				return null;
			}
			if (key === 'sprites') {
				return null;
			}
			if (key === 'index') {
				return null;
			}
			if (key === '_style') {
				return null;
			}
			else {
				return value;
			}
		});
		//.replaceAll("false", "0").replaceAll("true", "1");
	};
	$OurSonic_Utility_Help.safeResize = function(block, width, height) {
		var m = $OurSonic_Utility_CanvasInformation.create(width, height);
		//var img=block.Context.GetImageData(0, 0, block.Canvas.Width, block.Canvas.Height);
		//m.Context.PutImageData(img, 0, 0);
		m.context.drawImage(block.canvas, 0, 0);
		return m;
	};
	$OurSonic_Utility_Help.getQueryString = function() {
		var result = {};
		var queryString = window.location.search.substring(1);
		var re = new RegExp('/([^&=]+)=([^&]*)/g');
		var m;
		while (ss.isValue(m = re.exec(queryString))) {
			result[ss.cast(window.decodeURIComponent(m[1]), String)] = ss.cast(window.decodeURIComponent(m[2]), String);
		}
		return result;
	};
	global.OurSonic.Utility.Help = $OurSonic_Utility_Help;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.IntersectingRectangle
	var $OurSonic_Utility_IntersectingRectangle = function(x, y, width, height) {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
	$OurSonic_Utility_IntersectingRectangle.__typeName = 'OurSonic.Utility.IntersectingRectangle';
	$OurSonic_Utility_IntersectingRectangle.intersectsRect = function(r, p) {
		return r.x < p.x && r.x + r.width > p.x && r.y < p.y && r.y + r.height > p.y;
	};
	$OurSonic_Utility_IntersectingRectangle.intersectRect = function(r1, r2) {
		return !(r2.x > r1.x + r1.width || r2.x + 0 < r1.x || r2.y > r1.y + r1.height || r2.y + 0 < r1.y);
	};
	global.OurSonic.Utility.IntersectingRectangle = $OurSonic_Utility_IntersectingRectangle;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Point
	var $OurSonic_Utility_Point = function() {
	};
	$OurSonic_Utility_Point.__typeName = 'OurSonic.Utility.Point';
	$OurSonic_Utility_Point.offset = function($this, windowLocation) {
		return $OurSonic_Utility_Point.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
	};
	$OurSonic_Utility_Point.negate = function($this, windowLocation) {
		return $OurSonic_Utility_Point.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
	};
	$OurSonic_Utility_Point.negate$1 = function($this, x, y) {
		return $OurSonic_Utility_Point.$ctor1($this.x - x, $this.y - y);
	};
	$OurSonic_Utility_Point.set = function($this, x, y) {
		$this.x = x;
		$this.y = y;
	};
	$OurSonic_Utility_Point.$ctor1 = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	$OurSonic_Utility_Point.$ctor = function(pos) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = pos.x;
		$this.y = pos.y;
		return $this;
	};
	global.OurSonic.Utility.Point = $OurSonic_Utility_Point;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.Rectangle
	var $OurSonic_Utility_Rectangle = function() {
	};
	$OurSonic_Utility_Rectangle.__typeName = 'OurSonic.Utility.Rectangle';
	$OurSonic_Utility_Rectangle.createInstance = function() {
		return $OurSonic_Utility_Rectangle.$ctor();
	};
	$OurSonic_Utility_Rectangle.$ctor = function() {
		var $this = $OurSonic_Utility_Point.$ctor1(0, 0);
		$this.width = 0;
		$this.height = 0;
		return $this;
	};
	$OurSonic_Utility_Rectangle.$ctor1 = function(x, y, width, height) {
		var $this = $OurSonic_Utility_Point.$ctor1(x, y);
		$this.width = 0;
		$this.height = 0;
		$this.width = width;
		$this.height = height;
		return $this;
	};
	global.OurSonic.Utility.Rectangle = $OurSonic_Utility_Rectangle;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.SizeNumber
	var $OurSonic_Utility_SizeNumber = function(s) {
		this.$value = null;
		this.$value = s.toString();
	};
	$OurSonic_Utility_SizeNumber.__typeName = 'OurSonic.Utility.SizeNumber';
	$OurSonic_Utility_SizeNumber.$ctor1 = function(s) {
		this.$value = null;
		this.$value = s;
	};
	$OurSonic_Utility_SizeNumber.op_Implicit$3 = function(d) {
		return new $OurSonic_Utility_SizeNumber.$ctor1(d);
	};
	$OurSonic_Utility_SizeNumber.op_Implicit$2 = function(d) {
		return new $OurSonic_Utility_SizeNumber(d);
	};
	$OurSonic_Utility_SizeNumber.op_Implicit$1 = function(d) {
		return d.$value;
	};
	$OurSonic_Utility_SizeNumber.op_Implicit = function(d) {
		return parseFloat(ss.replaceAllString(d.$value, '%', ''));
	};
	global.OurSonic.Utility.SizeNumber = $OurSonic_Utility_SizeNumber;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.SpriteLoader
	var $OurSonic_Utility_SpriteLoader = function(completed, update) {
		this.$myCompleted = null;
		this.$myUpdate = null;
		this.$done = false;
		this.$stepIndex = 0;
		this.$steps = [];
		this.$tickIndex = 0;
		this.$myCompleted = completed;
		this.$myUpdate = update;
	};
	$OurSonic_Utility_SpriteLoader.__typeName = 'OurSonic.Utility.SpriteLoader';
	global.OurSonic.Utility.SpriteLoader = $OurSonic_Utility_SpriteLoader;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Utility.SpriteLoaderStep
	var $OurSonic_Utility_SpriteLoaderStep = function(title, method, onFinish) {
		this.title = null;
		this.method = null;
		this.onFinish = null;
		this.iterations = null;
		this.title = title;
		this.method = method;
		this.onFinish = onFinish;
		this.iterations = [];
	};
	$OurSonic_Utility_SpriteLoaderStep.__typeName = 'OurSonic.Utility.SpriteLoaderStep';
	global.OurSonic.Utility.SpriteLoaderStep = $OurSonic_Utility_SpriteLoaderStep;
	ss.initClass($OurSonic_Page, $asm, {});
	ss.initClass($OurSonic_SonicEngine, $asm, {
		$bindInput: function() {
			this.$uiCanvas.domCanvas.mousedown(ss.mkdel(this, this.$canvasOnClick));
			this.$uiCanvas.domCanvas.mouseup(ss.mkdel(this, this.$canvasMouseUp));
			this.$uiCanvas.domCanvas.mousemove(ss.mkdel(this, this.$canvasMouseMove));
			this.$uiCanvas.domCanvas.bind('touchstart', ss.mkdel(this, this.$canvasOnClick));
			this.$uiCanvas.domCanvas.bind('touchend', ss.mkdel(this, this.$canvasMouseUp));
			this.$uiCanvas.domCanvas.bind('touchmove', ss.mkdel(this, this.$canvasMouseMove));
			this.$uiCanvas.domCanvas.bind('DOMMouseScroll', ss.mkdel(this, this.$handleScroll));
			this.$uiCanvas.domCanvas.bind('mousewheel', ss.mkdel(this, this.$handleScroll));
			this.$uiCanvas.domCanvas.bind('contextmenu', function(e) {
				e.preventDefault();
			});
			var dontPress = false;
			document.addEventListener('keypress', ss.mkdel(this, function(e1) {
				//if (sonicManager.CurrentGameState == GameState.Editing)
				dontPress = this.sonicManager.uiManager.onKeyDown(e1);
			}), true);
			document.addEventListener('keyup', function(e2) {
				//if (sonicManager.CurrentGameState == GameState.Editing)
				dontPress = false;
			}, true);
			document.addEventListener('onkeydown', ss.mkdel(this, function(e3) {
				//if (sonicManager.CurrentGameState == GameState.Editing)
				dontPress = this.sonicManager.uiManager.onKeyDown(e3);
			}), true);
			document.addEventListener('onkeyup', function(e4) {
				//if (sonicManager.CurrentGameState == GameState.Editing)
				dontPress = false;
			}, true);
			//
			//
			//                        jQuery.Document.Keydown(e =>
			//
			//
			//                        {
			//
			//
			//                        //if (sonicManager.CurrentGameState == GameState.Editing)
			//
			//
			//                        dontPress = sonicManager.UIManager.OnKeyDown(e);
			//
			//
			//                        });
			//
			//
			//                        
			//
			//
			//                        jQuery.Document.Keyup(e =>
			//
			//
			//                        {
			//
			//
			//                        dontPress = false;
			//
			//
			//                        });
			KeyboardJS.bind.key('f', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				this.sonicManager.showHeightMap = !this.sonicManager.showHeightMap;
			}), function() {
			});
			KeyboardJS.bind.key('o', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				if (this.sonicManager.currentGameState === 0) {
					this.sonicManager.inHaltMode = !this.sonicManager.inHaltMode;
				}
			}), function() {
			});
			KeyboardJS.bind.key('j', ss.mkdel(this, function() {
				this.sonicManager.replaceMagic();
			}), function() {
			});
			this.client = io.connect('127.0.0.1:8998');
			this.client.on('SonicLevel', ss.mkdel(this, function(data) {
				$OurSonic_Utility_Help.decodeString$1(OurSonicModels.SLData).call(null, data.Data, ss.mkdel(this, this.runSonic));
			}));
			this.client.on('GetObjects.Response', ss.mkdel(this, function(data1) {
				this.sonicManager.loadObjects(data1.Data);
			}));
			KeyboardJS.bind.key('2', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				this.client.emit('GetSonicLevel', '0');
			}), function() {
			});
			KeyboardJS.bind.key('1', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				this.sonicManager.indexedPalette++;
				this.sonicManager.clearCache();
			}), function() {
			});
			KeyboardJS.bind.key('q', function() {
				$OurSonic_SonicEngine.runGame();
			}, function() {
			});
			KeyboardJS.bind.key('z', function() {
				$OurSonic_Utility_Extensions.DOES++;
			}, function() {
			});
			KeyboardJS.bind.key('p', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				if (this.sonicManager.currentGameState === 0) {
					if (this.sonicManager.inHaltMode) {
						this.sonicManager.waitingForTickContinue = false;
					}
				}
			}), function() {
			});
			KeyboardJS.bind.key('h', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				if (this.sonicManager.currentGameState === 0) {
					this.sonicManager.sonicToon.hit(this.sonicManager.sonicToon.x, this.sonicManager.sonicToon.y);
				}
			}), function() {
			});
			KeyboardJS.bind.key('u', ss.mkdel(this, function() {
				this.$wideScreen = !this.$wideScreen;
				this.resizeCanvas(true);
			}), function() {
			});
			KeyboardJS.bind.key('c', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				if (this.sonicManager.currentGameState === 0) {
					this.sonicManager.sonicToon.debug();
				}
			}), function() {
			});
			KeyboardJS.bind.key('up', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.pressUp();
						break;
					}
					case 1: {
						this.sonicManager.windowLocation.y -= 128;
						this.sonicManager.bigWindowLocation.y -= 128;
						break;
					}
				}
			}), ss.mkdel(this, function() {
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.releaseUp();
						break;
					}
					case 1: {
						break;
					}
				}
			}));
			KeyboardJS.bind.key('down', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.pressCrouch();
						break;
					}
					case 1: {
						this.sonicManager.windowLocation.y += 128;
						this.sonicManager.bigWindowLocation.y += 128;
						break;
					}
				}
			}), ss.mkdel(this, function() {
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.releaseCrouch();
						break;
					}
					case 1: {
						break;
					}
				}
			}));
			KeyboardJS.bind.key('left', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.pressLeft();
						break;
					}
					case 1: {
						this.sonicManager.windowLocation.x -= 128;
						this.sonicManager.bigWindowLocation.x -= 128;
						break;
					}
				}
			}), ss.mkdel(this, function() {
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.releaseLeft();
						break;
					}
					case 1: {
						break;
					}
				}
			}));
			KeyboardJS.bind.key('right', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.pressRight();
						break;
					}
					case 1: {
						this.sonicManager.windowLocation.x += 128;
						this.sonicManager.bigWindowLocation.x += 128;
						break;
					}
				}
			}), ss.mkdel(this, function() {
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.releaseRight();
						break;
					}
					case 1: {
						break;
					}
				}
			}));
			KeyboardJS.bind.key('space', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.pressJump();
						break;
					}
					case 1: {
						break;
					}
				}
			}), ss.mkdel(this, function() {
				switch (this.sonicManager.currentGameState) {
					case 0: {
						this.sonicManager.sonicToon.releaseJump();
						break;
					}
					case 1: {
						break;
					}
				}
			}));
			KeyboardJS.bind.key('e', ss.mkdel(this, function() {
				if (dontPress) {
					return;
				}
				this.sonicManager.sonicLevel.curHeightMap = !this.sonicManager.sonicLevel.curHeightMap;
			}), function() {
			});
		},
		runSonic: function(level) {
			this.sonicManager.load(level);
			this.sonicManager.windowLocation.x = 0;
			this.sonicManager.windowLocation.y = 0;
			this.sonicManager.bigWindowLocation.x = ss.Int32.trunc(this.sonicManager.windowLocation.x - this.sonicManager.windowLocation.width * 0.2);
			this.sonicManager.bigWindowLocation.y = ss.Int32.trunc(this.sonicManager.windowLocation.y - this.sonicManager.windowLocation.height * 0.2);
			this.sonicManager.bigWindowLocation.width = ss.Int32.trunc(this.sonicManager.windowLocation.width * 1.8);
			this.sonicManager.bigWindowLocation.height = ss.Int32.trunc(this.sonicManager.windowLocation.height * 1.8);
			this.sonicManager.clearCache();
			var dl = $OurSonic_Utility_Help.getQueryString();
			if (ss.keyExists(dl, 'run')) {
				if (this.sonicManager.currentGameState === 0) {
					$OurSonic_SonicEngine.runGame();
				}
				$OurSonic_SonicEngine.runGame();
			}
		},
		$handleScroll: function(jQueryEvent) {
			jQueryEvent.preventDefault();
			var j = ss.unbox(ss.cast((!!jQueryEvent.detail ? (jQueryEvent.detail * -120) : jQueryEvent.wheelDelta), ss.Int32));
			if (!this.sonicManager.uiManager.onMouseScroll(jQueryEvent)) {
				var rate = ((j < 0) ? -0.05 : 0.05);
				this.sonicManager.overrideRealScale.x += rate;
				this.sonicManager.overrideRealScale.y += rate;
				this.resizeCanvas(false);
				//  sonicManager.ClearCache();
				//  sonicManager.PreloadSprites(sonicManager.Scale, () => { }, (a) => { });
			}
		},
		$canvasMouseMove: function(queryEvent) {
			queryEvent.preventDefault();
			document.body.style.cursor = 'default';
			this.$lastMouseMove = $OurSonic_Utility_Help.getCursorPosition(queryEvent);
			if (this.sonicManager.uiManager.onMouseMove(this.$lastMouseMove)) {
				return;
			}
			if (this.sonicManager.mouseMove(queryEvent)) {
				return;
			}
			return;
		},
		$canvasOnClick: function(queryEvent) {
			queryEvent.preventDefault();
			if (this.sonicManager.uiManager.onClick($OurSonic_Utility_Help.getCursorPosition(queryEvent))) {
				return;
			}
			if (this.sonicManager.onClick(queryEvent)) {
				return;
			}
		},
		$canvasMouseUp: function(queryEvent) {
			queryEvent.preventDefault();
			this.sonicManager.uiManager.onMouseUp(this.$lastMouseMove);
			if (this.sonicManager.mouseUp(queryEvent)) {
				return;
			}
		},
		resizeCanvas: function(resetOverride) {
			this.canvasWidth = $(window).width();
			this.canvasHeight = $(window).height();
			this.$uiCanvas.domCanvas.attr('width', this.canvasWidth.toString());
			this.$uiCanvas.domCanvas.attr('height', this.canvasHeight.toString());
			this.sonicManager.windowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(this.sonicManager.currentGameState, this.$uiCanvas, this.sonicManager.scale);
			var wide = $OurSonic_Utility_DoublePoint.$ctor1(this.canvasWidth / 320 / this.sonicManager.scale.x, this.canvasHeight / 224 / this.sonicManager.scale.y);
			var even = $OurSonic_Utility_DoublePoint.$ctor1(Math.min(this.canvasWidth / 320 / this.sonicManager.scale.x, this.canvasHeight / 224 / this.sonicManager.scale.y), Math.min(this.canvasWidth / 320 / this.sonicManager.scale.x, this.canvasHeight / 224 / this.sonicManager.scale.y));
			this.sonicManager.realScale = (!this.$fullscreenMode ? $OurSonic_Utility_DoublePoint.$ctor1(1, 1) : (this.$wideScreen ? wide : even));
			if (resetOverride || ss.isNullOrUndefined(this.sonicManager.overrideRealScale)) {
				this.sonicManager.overrideRealScale = $OurSonic_Utility_DoublePoint.$ctor(this.sonicManager.realScale);
			}
			else {
				this.sonicManager.realScale = $OurSonic_Utility_DoublePoint.$ctor(this.sonicManager.overrideRealScale);
			}
			this.$gameCanvas.domCanvas.attr('width', (this.sonicManager.windowLocation.width * ((this.sonicManager.currentGameState === 0) ? (this.sonicManager.scale.x * this.sonicManager.realScale.x) : 1)).toString());
			this.$gameCanvas.domCanvas.attr('height', (this.sonicManager.windowLocation.height * ((this.sonicManager.currentGameState === 0) ? (this.sonicManager.scale.y * this.sonicManager.realScale.y) : 1)).toString());
			this.$uiGoodWidth = this.canvasWidth;
			this.$gameGoodWidth = ss.Int32.trunc(this.sonicManager.windowLocation.width * ((this.sonicManager.currentGameState === 0) ? (this.sonicManager.scale.x * this.sonicManager.realScale.x) : 1));
			var screenOffset = ((this.sonicManager.currentGameState === 0) ? $OurSonic_Utility_DoublePoint.$ctor1(this.canvasWidth / 2 - this.sonicManager.windowLocation.width * this.sonicManager.scale.x * this.sonicManager.realScale.x / 2, this.canvasHeight / 2 - this.sonicManager.windowLocation.height * this.sonicManager.scale.y * this.sonicManager.realScale.y / 2) : $OurSonic_Utility_DoublePoint.$ctor1(0, 0));
			this.$gameCanvas.domCanvas.css('left', $OurSonic_Utility_Help.toPx(screenOffset.x));
			this.$gameCanvas.domCanvas.css('top', $OurSonic_Utility_Help.toPx(screenOffset.y));
		},
		clear: function(canv) {
			var w;
			if (ss.referenceEquals(canv, this.$gameCanvas)) {
				w = this.$gameGoodWidth;
			}
			else {
				w = this.$uiGoodWidth;
			}
			canv.domCanvas[0].width = w;
			this.$gameCanvas.context.webkitImageSmoothingEnabled = false;
			this.$gameCanvas.context.mozImageSmoothingEnabled = false;
			this.$gameCanvas.context.imageSmoothingEnabled = false;
		},
		gameDraw: function() {
			if (!this.sonicManager.inHaltMode) {
				this.clear(this.$gameCanvas);
			}
			this.sonicManager.mainDraw(this.$gameCanvas.context);
		},
		uiDraw: function() {
			if (!this.sonicManager.inHaltMode) {
				this.clear(this.$uiCanvas);
			}
			this.$uiCanvas.context.webkitImageSmoothingEnabled = false;
			this.sonicManager.uiManager.draw(this.$uiCanvas.context);
		}
	});
	ss.initClass($OurSonic_SonicManager, $asm, {
		get_$status: function() {
			return this.$myStatus;
		},
		set_$status: function(value) {
			$OurSonic_UIManager_UIManager.updateTitle(value);
			this.$myStatus = value;
		},
		onClick: function(elementEvent) {
			//Help.Debugger();
			//then clicking
			//then chunk editor/tilepiece editor/tile editor/ heightmap editor/ and proper map editor;
			this.$clicking = true;
			if (this.$effectClick(elementEvent)) {
				return true;
			}
			return false;
			// 
			//                case ClickState.PlaceObject:
			// 
			//                var ex = _H.floor((e.x));
			// 
			//                var ey = _H.floor((e.y));
			// 
			//                
			// 
			//                for (var l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
			// 
			//                var o = sonicManager.SonicLevel.Objects[l];
			// 
			//                
			// 
			//                if (_H.intersects2(o.getRect(scale), { X: ex, Y: ey })) {
			// 
			//                alert("Object Data: " + _H.stringify(o));
			// 
			//                }
			// 
			//                }
			// 
			//                
			// 
			//                return true;
			// 
			//                
			// 
			//                break;
		},
		$effectClick: function(elementEvent) {
			if (this.currentGameState === 0) {
				return false;
			}
			var e = $OurSonic_Utility_Point.$ctor1(ss.Int32.trunc(elementEvent.clientX / this.scale.x / this.realScale.x + this.windowLocation.x), ss.Int32.trunc(elementEvent.clientY / this.scale.y / this.realScale.y + this.windowLocation.y));
			//if (CurrentGameState == GameState.Playing) {
			//SonicToon.X = e.X;
			//SonicToon.X = e.Y;
			//}
			var ey;
			var ex;
			if (elementEvent.ctrlKey) {
				ex = ss.Int32.div(e.x, 128);
				ey = ss.Int32.div(e.y, 128);
				var ch = this.sonicLevel.getChunkAt(ex, ey);
				if (ss.isValue(this.uiManager.get_uiManagerAreas().tilePieceArea)) {
					ch.setBlockAt(e.x - ex * 128, e.y - ey * 128, this.uiManager.get_uiManagerAreas().tilePieceArea.data);
				}
				return true;
			}
			if (elementEvent.shiftKey) {
				ex = ss.Int32.div(e.x, 128);
				ey = ss.Int32.div(e.y, 128);
				var ch1 = this.sonicLevel.getChunkAt(ex, ey);
				if (ss.isValue(this.uiManager.get_uiManagerAreas().tileChunkArea)) {
					this.sonicLevel.setChunkAt(ex, ey, this.uiManager.get_uiManagerAreas().tileChunkArea.data);
				}
				return true;
			}
			if (elementEvent.button === 0) {
				switch (this.clickState) {
					case 0: {
						return true;
					}
					case 1: {
						ex = ss.Int32.div(e.x, 128);
						ey = ss.Int32.div(e.y, 128);
						var ch2 = this.sonicLevel.getChunkAt(ex, ey);
						var tp = ch2.getBlockAt(e.x - ex * 128, e.y - ey * 128);
						var dontClear = false;
						if (ss.isValue(this.uiManager.get_uiManagerAreas().tileChunkArea)) {
							//UIManager.UIManagerAreas.TileChunkArea.Visible = true;
							if (ss.referenceEquals(this.uiManager.get_uiManagerAreas().tileChunkArea.data, ch2)) {
								dontClear = true;
							}
							this.uiManager.get_uiManagerAreas().tileChunkArea.data = ch2;
							//tilePieceList.ScrollIndex = Math.Max(uiManager.sonicManager.SonicLevel.TilePieces.IndexOf(tilePiece) - 1, 0);
						}
						if (ss.isValue(this.uiManager.get_uiManagerAreas().tilePieceArea)) {
							//    UIManager.UIManagerAreas.TilePieceArea.Visible = true;
							if (!ss.referenceEquals(this.uiManager.get_uiManagerAreas().tilePieceArea.data, tp)) {
								dontClear = true;
							}
							this.uiManager.get_uiManagerAreas().tilePieceArea.data = tp;
							//UIManager.UIManagerAreas.TilePieceArea.ScrollIndex = Math.Max(SonicLevel.TilePieces.IndexOf(tp) - 1, 0);
						}
						// if (!dontClear)
						this.clearCache();
						return true;
					}
					case 2: {
						ex = e.x;
						ey = e.y;
						var $t2 = this.sonicLevel.rings;
						var $t1 = $OurSonic_Level_Ring.$ctor(true);
						$t1.x = ex;
						$t1.y = ey;
						ss.add($t2, $t1);
						return true;
					}
					case 3: {
						ex = e.x;
						ey = e.y;
						var pos = $OurSonic_Utility_Point.$ctor1(ex, ey);
						for (var $t3 = 0; $t3 < this.sonicLevel.objects.length; $t3++) {
							var o = this.sonicLevel.objects[$t3];
							if ($OurSonic_Utility_IntersectingRectangle.intersectsRect(o.getRect(), pos)) {
								window.alert('Object Data: ' + $OurSonic_Utility_Help.stringify(o));
							}
						}
						return true;
					}
				}
			}
			return false;
		},
		$tickObjects: function() {
			var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
			this.inFocusObjects = [];
			var levelObjectInfos = this.sonicLevel.objects;
			for (var $t1 = 0; $t1 < levelObjectInfos.length; $t1++) {
				var obj = levelObjectInfos[$t1];
				localPoint.x = ss.Int32.trunc(obj.x);
				localPoint.y = ss.Int32.trunc(obj.y);
				if (this.bigWindowLocation.intersects(localPoint)) {
					ss.add(this.inFocusObjects, obj);
					obj.tick(obj, this.sonicLevel, this.sonicToon);
				}
			}
			if (ss.isValue(this.uiManager.get_uiManagerAreas().liveObjectsArea)) {
				this.uiManager.get_uiManagerAreas().liveObjectsArea.data.populate(this.inFocusObjects);
			}
			for (var $t2 = 0; $t2 < this.animationInstances.length; $t2++) {
				var animationInstance = this.animationInstances[$t2];
				animationInstance.tick();
			}
		},
		tick: function() {
			if (this.loading) {
				return;
			}
			if (this.currentGameState === 0) {
				if (this.inHaltMode) {
					if (this.waitingForTickContinue) {
						return;
					}
				}
				this.tickCount++;
				this.$tickObjects();
				this.sonicToon.ticking = true;
				try {
					this.sonicToon.tick(this.sonicLevel);
				}
				finally {
					this.sonicToon.ticking = false;
				}
				if (this.inHaltMode) {
					if (this.waitingForTickContinue) {
						return;
					}
					this.waitingForTickContinue = true;
					this.$waitingForDrawContinue = false;
				}
				//  if (SonicToon.X > 128 * SonicLevel.LevelWidth)
				//  SonicToon.X = 0;
			}
		},
		preloadSprites: function(completed, update) {
			if (ss.isValue(this.spriteCache)) {
				completed();
				return;
			}
			this.spriteCache = this.spriteCache || new $OurSonic_Level_SpriteCache();
			var ci = this.spriteCache.rings;
			var spriteLocations = [];
			for (var j = 0; j < 4; j++) {
				ss.add(spriteLocations, ss.formatString('assets/Sprites/ring{0}.png', j));
				this.$imageLength++;
			}
			var ind_ = this.spriteCache.indexes;
			this.spriteLoader = new $OurSonic_Utility_SpriteLoader(completed, update);
			if (ci.length === 0) {
				var spriteStep = this.spriteLoader.addStep('Sprites', function(i, done) {
					$OurSonic_Utility_Help.loadSprite(spriteLocations[i], function(jd) {
						ci[i] = $OurSonic_Utility_CanvasInformation.create(jd.width, jd.height);
						ci[i].context.drawImage(jd, 0, 0);
						done();
					});
				}, function() {
					ind_.sprites++;
					if (ind_.sprites === 4) {
						return true;
					}
					return false;
				}, false);
				for (var i1 = 0; i1 < spriteLocations.length; i1++) {
					this.spriteLoader.addIterationToStep(spriteStep, i1);
				}
			}
			var cci = this.spriteCache.sonicSprites;
			if (ss.getKeyCount(cci) === 0) {
				var sonicStep = this.spriteLoader.addStep('Sonic Sprites', ss.mkdel(this, function(sp, done1) {
					var $t1 = new ss.ObjectEnumerator(this.$sonicSprites);
					try {
						while ($t1.moveNext()) {
							var sonicSprite = $t1.current();
							cci[sonicSprite.key] = $OurSonic_Utility_Help.scaleCsImage(sonicSprite.value, $OurSonic_Utility_Point.$ctor1(1, 1), function(ec) {
							});
						}
					}
					finally {
						$t1.dispose();
					}
					//var numOfAnimations = 0;
					//
					//var cji = SpriteCache.AnimationSprites = new JsDictionary<string, CanvasInformation>();
					//
					//foreach (var anni in Animations)
					//{
					//var imd = 0;
					//foreach (var image in anni.Images)
					//{
					//cji[(imd++) + " " + anni.Name + scale.x + scale.y] = _H.scaleCSImage(sonicManager.animations[anni].images[image], scale);
					//}
					//}
					done1();
				}), function() {
					return true;
				}, false);
				this.spriteLoader.addIterationToStep(sonicStep, 0);
			}
		},
		mainDraw: function(canvas) {
			if (this.inHaltMode) {
				if (this.$drawHaltMode(canvas)) {
					return;
				}
			}
			if (ss.isNullOrUndefined(this.sonicLevel)) {
				return;
			}
			canvas.save();
			var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
			this.drawTickCount++;
			if (this.spriteLoader && !this.spriteLoader.tick() || this.loading) {
				$OurSonic_SonicManager.$drawLoading(canvas);
				canvas.restore();
				return;
			}
			this.$updatePositions(canvas);
			var w1 = ss.Int32.div(this.windowLocation.width, 128) + 2;
			var h1 = ss.Int32.div(this.windowLocation.height, 128) + 2;
			//cleaner with 2 padding on the widthheight
			if (this.currentGameState === 1) {
				w1 = ss.Int32.div(w1, this.scale.x);
				h1 = ss.Int32.div(h1, this.scale.y);
			}
			var offs = $OurSonic_SonicManager.$getOffs(w1, h1);
			this.$updatePalettes();
			var fxP = ss.Int32.trunc(this.windowLocation.x / 128);
			var fyP = ss.Int32.trunc(this.windowLocation.y / 128);
			this.$resetCanvases();
			var zero = $OurSonic_Utility_Point.$ctor1(0, 0);
			if (this.background) {
				var wOffset = this.windowLocation.x;
				var bw = this.background.width;
				var movex = ss.Int32.div(wOffset, bw) * bw;
				localPoint.x = -this.windowLocation.x + movex;
				localPoint.y = ss.Int32.div(-this.windowLocation.y, 4);
				this.background.draw(this.$myAnother.context, localPoint, wOffset);
				localPoint.x = -this.windowLocation.x + movex + this.background.width;
				localPoint.y = ss.Int32.div(-this.windowLocation.y, 4);
				this.background.draw(this.$myAnother.context, localPoint, wOffset);
			}
			this.$drawLowChunks(this.$myAnother.context, zero, offs, fyP, fxP);
			if (this.showHeightMap) {
				this.$drawHighChunks(this.$myAnother.context, fxP, fyP, offs, zero);
			}
			this.$drawObjects(this.$mySonCanvas.context, zero);
			this.$drawAnimations(this.$mySonCanvas.context);
			this.$drawRings(this.$mySonCanvas.context, zero);
			this.$drawSonic(this.$mySonCanvas.context);
			//drawRings(canvas, zero);
			//editing^
			if (!this.showHeightMap) {
				this.$drawHighChunks(this.$myAnotherw.context, fxP, fyP, offs, zero);
			}
			$OurSonic_Utility_Extensions.offsetStuff(this.$myAnother.context);
			$OurSonic_Utility_Extensions.offsetStuff(this.$myAnotherw.context);
			this.$drawSonic(this.$myAnother.context);
			this.$drawCanveses(canvas, localPoint);
			canvas.restore();
			if (this.currentGameState === 0) {
				this.sonicToon.drawUI(canvas, $OurSonic_Utility_Point.$ctor1(this.screenOffset.x, this.screenOffset.y));
			}
		},
		$drawCanveses: function(canvas, localPoint) {
			canvas.scale(this.scale.x, this.scale.y);
			canvas.drawImage(this.$myAnother.canvas, localPoint.x, localPoint.y);
			canvas.drawImage(this.$mySonCanvas.canvas, localPoint.x, localPoint.y);
			canvas.drawImage(this.$myAnotherw.canvas, localPoint.x, localPoint.y);
		},
		$resetCanvases: function() {
			this.$myAnother = this.$myAnother || $OurSonic_Utility_CanvasInformation.create(320, 240);
			this.$mySonCanvas = this.$mySonCanvas || $OurSonic_Utility_CanvasInformation.create(320, 240);
			this.$myAnotherw = this.$myAnotherw || $OurSonic_Utility_CanvasInformation.create(320, 240);
			this.$mySonCanvas.context.clearRect(0, 0, 320, 240);
			this.$myAnotherw.context.clearRect(0, 0, 320, 240);
			this.$myAnother.context.clearRect(0, 0, 320, 240);
		},
		$updatePositions: function(canvas) {
			this.screenOffset.x = 0;
			this.screenOffset.y = 0;
			if (this.currentGameState === 0) {
				this.$updatePositionsForPlaying(canvas);
			}
			//    if (WindowLocation.X < 0) WindowLocation.X = 0;
			//    if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
			//    WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
		},
		$updatePositionsForPlaying: function(canvas) {
			canvas.scale(this.realScale.x, this.realScale.y);
			if (this.sonicToon.ticking) {
				while (true) {
					if (this.sonicToon.ticking) {
						break;
					}
				}
			}
			canvas.translate(this.screenOffset.x, this.screenOffset.y);
			//canvas.FillStyle = "#000000";
			//canvas.FillRect(0, 0, WindowLocation.Width * Scale.X, WindowLocation.Height * Scale.Y);
			this.windowLocation.x = ss.Int32.trunc(this.sonicToon.x) - ss.Int32.div(this.windowLocation.width, 2);
			this.windowLocation.y = ss.Int32.trunc(this.sonicToon.y) - ss.Int32.div(this.windowLocation.height, 2);
			this.bigWindowLocation.x = ss.Int32.trunc(this.sonicToon.x) - ss.Int32.div(this.bigWindowLocation.width, 2);
			this.bigWindowLocation.y = ss.Int32.trunc(this.sonicToon.y) - ss.Int32.div(this.bigWindowLocation.height, 2);
			this.bigWindowLocation.x = ss.Int32.trunc(this.bigWindowLocation.x - this.windowLocation.width * 0.2);
			this.bigWindowLocation.y = ss.Int32.trunc(this.bigWindowLocation.y - this.windowLocation.height * 0.2);
			this.bigWindowLocation.width = ss.Int32.trunc(this.windowLocation.width * 1.8);
			this.bigWindowLocation.height = ss.Int32.trunc(this.windowLocation.height * 1.8);
		},
		$drawHaltMode: function(canvas) {
			canvas.fillStyle = 'white';
			canvas.font = '21pt arial bold';
			canvas.fillText('HALT MODE\r\n Press: P to step\r\n        O to resume', 10, 120);
			if (this.$waitingForDrawContinue) {
				return true;
			}
			else {
				this.$waitingForDrawContinue = true;
			}
			return false;
		},
		$updatePalettes: function() {
			if (this.sonicLevel.paletteItems.length > 0) {
				for (var k = 0; k < this.sonicLevel.paletteItems[0].length; k++) {
					var pal = this.sonicLevel.paletteItems[0][k];
					if (pal.skipIndex === 0) {
						continue;
					}
					if (pal.totalLength === 0) {
						continue;
					}
					for (var j = 0; j <= pal.totalLength; j += pal.skipIndex) {
						if (this.drawTickCount % (pal.totalLength + pal.skipIndex) === j) {
							this.sonicLevel.paletteAnimationIndexes[k] = ss.Int32.div(j, pal.skipIndex);
						}
					}
					for (var $t1 = 0; $t1 < pal.pieces.length; $t1++) {
						var mj = pal.pieces[$t1];
						var m = pal.palette[this.sonicLevel.paletteAnimationIndexes[k] * (pal.pieces.length * 2) + 0 + mj.paletteMultiply];
						if (ss.isValue(m)) {
							this.sonicLevel.palette[mj.paletteIndex][ss.Int32.div(mj.paletteOffset, 2)] = m;
						}
						else {
							this.sonicLevel.palette[mj.paletteIndex][ss.Int32.div(mj.paletteOffset, 2)] = $OurSonic_Utility_CanvasInformation.get_blackPixel();
						}
					}
				}
			}
		},
		$drawLowChunks: function(canvas, localPoint, offs, fyP, fxP) {
			for (var $t1 = 0; $t1 < offs.length; $t1++) {
				var off = offs[$t1];
				var _xP = fxP + off.x;
				var _yP = fyP + off.y;
				var _xPreal = fxP + off.x;
				var _yPreal = fyP + off.y;
				//if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
				_xP = $OurSonic_Utility_Help.mod(_xP, this.sonicLevel.levelWidth);
				_yP = $OurSonic_Utility_Help.mod(_yP, this.sonicLevel.levelHeight);
				var chunk = this.sonicLevel.getChunkAt(_xP, _yP);
				if (chunk) {
					chunk.animatedTick();
				}
				localPoint.x = _xPreal * 128 - this.windowLocation.x;
				localPoint.y = _yPreal * 128 - this.windowLocation.y;
				if (!chunk.isEmpty() && !chunk.onlyForeground()) {
					chunk.draw(canvas, localPoint, 0);
				}
			}
		},
		$drawHighChunks: function(canvas, fxP, fyP, offs, localPoint) {
			for (var $t1 = 0; $t1 < offs.length; $t1++) {
				var off = offs[$t1];
				var _xP = fxP + off.x;
				var _yP = fyP + off.y;
				var _xPreal = fxP + off.x;
				var _yPreal = fyP + off.y;
				//if (_xP < 0 || _xP >= SonicLevel.LevelWidth) continue;
				_xP = $OurSonic_Utility_Help.mod(_xP, this.sonicLevel.levelWidth);
				_yP = $OurSonic_Utility_Help.mod(_yP, this.sonicLevel.levelHeight);
				var chunk = this.sonicLevel.getChunkAt(_xP, _yP);
				localPoint.x = _xPreal * 128 - this.windowLocation.x;
				localPoint.y = _yPreal * 128 - this.windowLocation.y;
				if (!chunk.isEmpty() && !chunk.onlyBackground()) {
					chunk.draw(canvas, localPoint, 1);
				}
				if (this.showHeightMap) {
					var fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + chunk.index];
					if (!fd) {
						var md = chunk;
						var posj1 = $OurSonic_Utility_Point.$ctor1(0, 0);
						var canv = $OurSonic_Utility_CanvasInformation.create(128, 128);
						var ctx = canv.context;
						this.$myEngine.clear(canv);
						for (var _y = 0; _y < 8; _y++) {
							for (var _x = 0; _x < 8; _x++) {
								var tp = md.tilePieces[_x][_y];
								var solid = (this.sonicLevel.curHeightMap ? tp.solid1 : tp.solid2);
								var hd = (this.sonicLevel.curHeightMap ? tp.getLayer1HeightMaps() : tp.getLayer2HeightMaps());
								var __x = _x;
								var __y = _y;
								var vangle = 0;
								var posm = $OurSonic_Utility_Point.$ctor1(posj1.x + __x * 16, posj1.y + __y * 16);
								if (!hd) {
									continue;
								}
								if (hd.get_full() === false) {
								}
								else if (hd.get_full() === true) {
									if (solid > 0) {
										ctx.fillStyle = $OurSonic_Level_HeightMap.colors[solid];
										ctx.fillRect(posj1.x + __x * 16, posj1.y + __y * 16, 16, 16);
									}
								}
								else {
									vangle = (this.sonicLevel.curHeightMap ? tp.getLayer1Angles() : tp.getLayer2Angles());
									hd.draw(ctx, posm, tp.xFlip, tp.yFlip, solid, vangle);
									//   posm.x += 16 * scale.x / 2;
									//   posm.y += 16 * scale.y / 2;
									//   ctx.strokeStyle = "#DDD";
									//   ctx.font = "18pt courier ";
									//   ctx.shadowColor = "";
									//   ctx.shadowBlur = 0;
									//   ctx.lineWidth = 1;
									//   ctx.strokeText(vangle.toString(16), posm.x - 12, posm.y + 7);
								}
							}
						}
						fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + md.index] = canv;
					}
					canvas.drawImage(fd.canvas, localPoint.x, localPoint.y);
				}
				if (this.currentGameState === 1) {
					canvas.strokeStyle = '#DD0033';
					canvas.lineWidth = 3;
					canvas.strokeRect(localPoint.x, localPoint.y, 128, 128);
				}
			}
		},
		$drawSonic: function(canvas) {
			if (this.currentGameState === 0) {
				this.sonicToon.draw(canvas);
				//if (WindowLocation.X < 0) WindowLocation.X = 0;
				//if (WindowLocation.X > 128 * SonicLevel.LevelWidth - WindowLocation.Width)
				//    WindowLocation.X = 128 * SonicLevel.LevelWidth - WindowLocation.Width;
				//if (WindowLocation.Y > 128 * SonicLevel.LevelHeight - WindowLocation.Height)
				//    WindowLocation.Y = 128 * SonicLevel.LevelHeight - WindowLocation.Height;
			}
		},
		$drawRings: function(canvas, localPoint) {
			for (var index = 0; index < this.sonicLevel.rings.length; index++) {
				var r = this.sonicLevel.rings[index];
				switch (this.currentGameState) {
					case 0: {
						if (!this.sonicToon.obtainedRing[index]) {
							if (this.bigWindowLocation.intersects(r)) {
								$OurSonic_Level_Ring.draw(this.goodRing, canvas, $OurSonic_Utility_Point.negate$1(r, this.windowLocation.x, this.windowLocation.y));
							}
						}
						break;
					}
					case 1: {
						if (this.bigWindowLocation.intersects(r)) {
							$OurSonic_Level_Ring.draw(this.goodRing, canvas, $OurSonic_Utility_Point.negate$1(r, this.windowLocation.x, this.windowLocation.y));
						}
						break;
					}
				}
				//
				//                 for (var ring in this.SonicLevel.Rings) {
				//
				//                 var r = this.SonicLevel.Rings[ring];
				//
				//                 if (this.sonicToon) {
				//
				//                 if (!this.sonicToon.obtainedRing[ring])
				//
				//                 if (this.bigWindowLocation.intersects(r))
				//
				//                 this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, true);
				//
				//                 } else {
				//
				//                 if (this.bigWindowLocation.intersects(r))
				//
				//                 this.goodRing.draw(canvas, { x: (r.x) - this.windowLocation.x, y: (r.y) - this.windowLocation.y }, scale, false);
				//
				//                 }
				//
				//                 }
			}
			switch (this.currentGameState) {
				case 0: {
					for (var i = this.activeRings.length - 1; i >= 0; i--) {
						var ac = this.activeRings[i];
						localPoint.x = ac.x - this.windowLocation.x;
						localPoint.y = ac.y - this.windowLocation.y;
						$OurSonic_Level_Ring.draw(ac, canvas, localPoint);
						if (ac.tickCount > 256) {
							ss.remove(this.activeRings, ac);
						}
					}
					break;
				}
				case 1: {
					break;
				}
			}
		},
		$drawAnimations: function(canvas) {
			for (var $t1 = 0; $t1 < this.animationInstances.length; $t1++) {
				var ano = this.animationInstances[$t1];
				ano.draw(canvas, -this.windowLocation.x, -this.windowLocation.y);
			}
		},
		$drawObjects: function(canvas, localPoint) {
			var levelObjectInfos = this.sonicLevel.objects;
			for (var $t1 = 0; $t1 < levelObjectInfos.length; $t1++) {
				var o = levelObjectInfos[$t1];
				localPoint.x = o.x;
				localPoint.y = o.y;
				if (o.dead || this.bigWindowLocation.intersects(localPoint)) {
					o.draw(canvas, localPoint.x - this.windowLocation.x, localPoint.y - this.windowLocation.y, this.showHeightMap);
				}
			}
		},
		$containsAnimatedTile: function(tile, sonLevel) {
			for (var $t1 = 0; $t1 < sonLevel.animations.length; $t1++) {
				var an = sonLevel.animations[$t1];
				var anin = an.animationTileIndex;
				var num = an.numberOfTiles;
				if (tile >= anin && tile < anin + num) {
					return an;
				}
			}
			return null;
		},
		clearCache: function() {
			this.sonicLevel.clearCache();
			this.spriteCache.clearCache();
		},
		mouseUp: function(queryEvent) {
			this.$clicking = false;
			return false;
		},
		mouseMove: function(queryEvent) {
			if (this.$clicking) {
				if (this.$effectClick(queryEvent)) {
					return true;
				}
			}
			return false;
		},
		replaceMagic: function() {
			this.replace($OurSonic_Utility_Rectangle.$ctor1(0, 0, 15, 30), $OurSonic_Utility_Point.$ctor1(712, 40));
			//level 1 act 1
			// Replace(new Rectangle(312, 15, 55, 70), new Point(1032, 0)); // laucnh base 1 :-/
		},
		replace: function(from, to) {
			for (var y = from.height; y >= 0; y--) {
				var curY = { $: y };
				window.setTimeout(ss.mkdel({ curY: curY, $this: this }, function() {
					for (var x = 0; x < from.width; x++) {
						var toChunkX = ss.Int32.div(to.x + x, 8);
						var toChunkY = ss.Int32.div(to.y + this.curY.$, 8);
						var tochunk = this.$this.sonicLevel.getChunkAt(toChunkX, toChunkY);
						tochunk.clearCache();
						var totp = tochunk.tilePieces[to.x + x - toChunkX * 8][to.y + this.curY.$ - toChunkY * 8];
						tochunk.isOnlyBackground = null;
						tochunk.isOnlyForeground = null;
						var fromChunkX = ss.Int32.div(from.x + x, 8);
						var fromChunkY = ss.Int32.div(from.y + this.curY.$, 8);
						var fromchunk = this.$this.sonicLevel.getChunkAt(fromChunkX, fromChunkY);
						fromchunk.clearCache();
						fromchunk.isOnlyBackground = null;
						fromchunk.isOnlyForeground = null;
						var fromtp = fromchunk.tilePieces[from.x + x - fromChunkX * 8][from.y + this.curY.$ - fromChunkY * 8];
						tochunk.tilePieces[to.x + x - toChunkX * 8][to.y + this.curY.$ - toChunkY * 8] = fromtp;
						fromchunk.tilePieces[from.x + x - fromChunkX * 8][from.y + this.curY.$ - fromChunkY * 8] = totp;
					}
				}), (from.height - y) * 50);
			}
		},
		loadObjects: function(objects) {
			this.cachedObjects = {};
			for (var $t1 = 0; $t1 < this.sonicLevel.objects.length; $t1++) {
				var t = this.sonicLevel.objects[$t1];
				var o = { $: t.key };
				if (ss.keyExists(this.cachedObjects, o.$)) {
					t.setObjectData(this.cachedObjects[o.$]);
					continue;
				}
				var d = Enumerable.from(objects).first(ss.mkdel({ o: o }, function(p) {
					return ss.referenceEquals(p.key, this.o.$);
				}));
				if (!d) {
					t.setObjectData(new $OurSonic_Level_Objects_LevelObject(o.$));
					continue;
				}
				var dat;
				if (d.value.length === 0) {
					dat = $OurSonic_Level_Objects_LevelObjectData.$ctor();
				}
				else {
					dat = JSON.parse(d.value);
				}
				var dr = $OurSonic_Level_Objects_ObjectManager.extendObject(dat);
				this.cachedObjects[o.$] = dr;
				t.setObjectData(dr);
			}
			// 
			//        OurSonic.SonicLevels.getObjects(objectKeys, function (objects) {
			// 
			//        window.CachedObjects = [];
			// 
			//        for (l = 0; l < sonicManager.SonicLevel.Objects.length; l++) {
			// 
			//        o = sonicManager.SonicLevel.Objects[l].key;
			// 
			//        if (window.CachedObjects[o]) {
			// 
			//        sonicManager.SonicLevel.Objects[l].setObjectData(window.CachedObjects[o]);
			// 
			//        continue;
			// 
			//        }
			// 
			//        var d = JSLINQ(objects).First(function (p) { return p.key == o; });
			// 
			//        if (!d) {
			// 
			//        sonicManager.SonicLevel.Objects[l].setObjectData(new LevelObject(o));
			// 
			//        continue;
			// 
			//        }
			// 
			//        
			// 
			//        var dr = _H.extend(new LevelObject(""), jQuery.parseJSON(d.value));
			// 
			//        dr = sonicManager.objectManager.extendObject(dr);
			// 
			//        
			// 
			//        for (var n = 0; n < dr.assets.length; n++) {
			// 
			//        for (var s = 0; s < dr.assets[n].frames.length; s++) {
			// 
			//        dr.assets[n].frames[s].hurtSonicMap.length = dr.assets[n].frames[s].width;
			// 
			//        dr.assets[n].frames[s].collisionMap.length = dr.assets[n].frames[s].width;
			// 
			//        for (var t = 0; t < dr.assets[n].frames[s].hurtSonicMap.length; t++) {
			// 
			//        dr.assets[n].frames[s].hurtSonicMap[t].length = dr.assets[n].frames[s].height;
			// 
			//        dr.assets[n].frames[s].collisionMap[t].length = dr.assets[n].frames[s].height;
			// 
			//        
			// 
			//        }
			// 
			//        }
			// 
			//        }
			// 
			//        
			// 
			//        window.CachedObjects[o] = dr;
			// 
			//        sonicManager.SonicLevel.Objects[l].setObjectData(dr);
			// 
			//        
			// 
			//        }
			// 
			//        
			// 
			//        });
		},
		loadObjects$1: function(objects) {
			$OurSonic_SonicEngine.instance.client.emit('GetObjects', objects);
		},
		load: function(sonicLevel) {
			this.loading = true;
			this.set_$status('Decoding');
			this.set_$status('Determining Level Information');
			this.sonicLevel = new $OurSonic_Level_SonicLevel();
			for (var n = 0; n < sonicLevel.Rings.length; n++) {
				this.sonicLevel.rings[n] = $OurSonic_Level_Ring.$ctor(true);
				this.sonicLevel.rings[n].x = sonicLevel.Rings[n].X;
				this.sonicLevel.rings[n].y = sonicLevel.Rings[n].Y;
			}
			this.sonicLevel.levelWidth = sonicLevel.ForegroundWidth;
			this.sonicLevel.levelHeight = sonicLevel.ForegroundHeight;
			this.sonicLevel.chunkMap = sonicLevel.Foreground;
			this.sonicLevel.bgChunkMap = sonicLevel.Background;
			for (var l = 0; l < sonicLevel.Objects.length; l++) {
				this.sonicLevel.objects[l] = new $OurSonic_Level_Objects_LevelObjectInfo(sonicLevel.Objects[l]);
				this.sonicLevel.objects[l].index = l;
			}
			var objectKeys = [];
			for (var $t1 = 0; $t1 < this.sonicLevel.objects.length; $t1++) {
				var t = this.sonicLevel.objects[$t1];
				var o = { $: t.key };
				if (Enumerable.from(objectKeys).all(ss.mkdel({ o: o }, function(p) {
					return !ss.referenceEquals(p, this.o.$);
				}))) {
					ss.add(objectKeys, o.$);
				}
			}
			this.loadObjects$1(objectKeys);
			for (var j = 0; j < sonicLevel.Tiles.length; j++) {
				var fc = sonicLevel.Tiles[j];
				var tiles = fc;
				var mj = [];
				for (var i = 0; i < tiles.length; i++) {
					var value = sonicLevel.Tiles[j][i];
					ss.add(mj, value >> 4);
					ss.add(mj, value & 15);
				}
				var mfc = new Array(8);
				for (var o1 = 0; o1 < 8; o1++) {
					mfc[o1] = new Array(8);
				}
				for (var n1 = 0; n1 < mj.length; n1++) {
					mfc[n1 % 8][ss.Int32.div(n1, 8)] = mj[n1];
				}
				this.sonicLevel.tiles[j] = new $OurSonic_Level_Tiles_Tile(mfc);
				this.sonicLevel.tiles[j].index = j;
			}
			var acs = this.sonicLevel.animatedChunks = [];
			if (sonicLevel.AnimatedFiles) {
				this.sonicLevel.animatedFiles = new Array(sonicLevel.AnimatedFiles.length);
				for (var animatedFileIndex = 0; animatedFileIndex < sonicLevel.AnimatedFiles.length; animatedFileIndex++) {
					var animatedFile = sonicLevel.AnimatedFiles[animatedFileIndex];
					this.sonicLevel.animatedFiles[animatedFileIndex] = new Array(animatedFile.length);
					for (var filePiece = 0; filePiece < animatedFile.length; filePiece++) {
						var c = animatedFile[filePiece];
						var tiles1 = c;
						var mjc = [];
						for (var l1 = 0; l1 < tiles1.length; l1++) {
							var value1 = animatedFile[filePiece][l1];
							ss.add(mjc, value1 >> 4);
							ss.add(mjc, value1 & 15);
						}
						var mfc1 = new Array(8);
						for (var o2 = 0; o2 < 8; o2++) {
							mfc1[o2] = new Array(8);
						}
						for (var n2 = 0; n2 < mjc.length; n2++) {
							mfc1[n2 % 8][ss.Int32.div(n2, 8)] = mjc[n2];
						}
						var tile = new $OurSonic_Level_Tiles_Tile(mfc1);
						tile.isAnimated = true;
						tile.index = filePiece * 10000 + animatedFileIndex;
						this.sonicLevel.animatedFiles[animatedFileIndex][filePiece] = tile;
					}
				}
			}
			for (var j1 = 0; j1 < sonicLevel.Blocks.length; j1++) {
				var fc1 = sonicLevel.Blocks[j1];
				var mj1 = new $OurSonic_Level_Tiles_TilePiece();
				mj1.index = j1;
				mj1.tiles = [];
				for (var p1 = 0; p1 < fc1.length; p1++) {
					var $t3 = mj1.tiles;
					var $t2 = new $OurSonic_Level_Tiles_TileItem();
					$t2._Tile = fc1[p1].Tile;
					$t2.index = p1;
					$t2.palette = fc1[p1].Palette;
					$t2.priority = fc1[p1].Priority;
					$t2.xFlip = fc1[p1].XFlip;
					$t2.yFlip = fc1[p1].YFlip;
					ss.add($t3, $t2);
				}
				mj1.init();
				this.sonicLevel.tilePieces[j1] = mj1;
			}
			this.sonicLevel.angles = sonicLevel.Angles;
			this.sonicLevel.animations = ss.arrayClone(sonicLevel.Animations.map(function(a) {
				var $t4 = new $OurSonic_Level_Animations_Animation();
				$t4.animationFile = a.AnimationFile;
				$t4.animationTileIndex = a.AnimationTileIndex;
				$t4.automatedTiming = a.AutomatedTiming;
				$t4.numberOfTiles = a.NumberOfTiles;
				$t4.frames = a.Frames.map(function(b) {
					var $t5 = new $OurSonic_Level_Animations_AnimationFrame();
					$t5.ticks = b.Ticks;
					$t5.startingTileIndex = b.StartingTileIndex;
					return $t5;
				}).slice(0);
				return $t4;
			}));
			this.sonicLevel.collisionIndexes1 = sonicLevel.CollisionIndexes1;
			this.sonicLevel.collisionIndexes2 = sonicLevel.CollisionIndexes2;
			for (var i1 = 0; i1 < sonicLevel.HeightMaps.length; i1++) {
				var b1 = true;
				var b2 = true;
				for (var m = 0; m < sonicLevel.HeightMaps[i1].length; m++) {
					if (b1 && sonicLevel.HeightMaps[i1][m] !== 0) {
						b1 = false;
					}
					if (b2 && sonicLevel.HeightMaps[i1][m] !== 16) {
						b2 = false;
					}
				}
				if (b1) {
					this.sonicLevel.heightMaps[i1] = new $OurSonic_Level_HeightMap(false);
				}
				else if (b2) {
					this.sonicLevel.heightMaps[i1] = new $OurSonic_Level_HeightMap(true);
				}
				else {
					this.sonicLevel.heightMaps[i1] = new $OurSonic_Level_HeightMap.$ctor1(sonicLevel.HeightMaps[i1], i1);
				}
			}
			for (var j2 = 0; j2 < sonicLevel.Chunks.length; j2++) {
				var fc2 = sonicLevel.Chunks[j2];
				var mj2 = new $OurSonic_Level_Tiles_TileChunk();
				mj2.index = j2;
				mj2.tilePieces = new Array(8);
				for (var i2 = 0; i2 < 8; i2++) {
					mj2.tilePieces[i2] = new Array(8);
				}
				for (var p2 = 0; p2 < fc2.length; p2++) {
					var $t7 = mj2.tilePieces[p2 % 8];
					var $t8 = ss.Int32.div(p2, 8);
					var $t6 = new $OurSonic_Level_Tiles_TilePieceInfo();
					$t6.index = p2;
					$t6.block = fc2[p2].Block;
					$t6.solid1 = fc2[p2].Solid1;
					$t6.solid2 = fc2[p2].Solid2;
					$t6.xFlip = fc2[p2].XFlip;
					$t6.yFlip = fc2[p2].YFlip;
					$t7[$t8] = $t6;
				}
				this.sonicLevel.chunks[j2] = mj2;
				mj2.animated = {};
				//Help.Debugger();
				for (var tpX = 0; tpX < mj2.tilePieces.length; tpX++) {
					for (var tpY = 0; tpY < mj2.tilePieces[tpX].length; tpY++) {
						var pm = mj2.tilePieces[tpX][tpY].getTilePiece();
						if (ss.isValue(pm)) {
							for (var $t9 = 0; $t9 < pm.tiles.length; $t9++) {
								var mjc1 = pm.tiles[$t9];
								var fa = this.$containsAnimatedTile(mjc1._Tile, this.sonicLevel);
								if (fa) {
									mj2.animated[tpY * 8 + tpX] = fa;
									acs[j2] = mj2;
								}
							}
						}
					}
				}
			}
			this.sonicLevel.palette = sonicLevel.Palette.map(ss.mkdel(this, function(a1) {
				return a1.map($OurSonic_SonicManager.$paletteToCanvas);
			}));
			this.sonicLevel.startPositions = sonicLevel.StartPositions.map(function(a2) {
				return $OurSonic_Utility_Point.$ctor1(a2.X, a2.Y);
			});
			this.sonicLevel.paletteItems = [];
			if (sonicLevel.PaletteItems.length > 0) {
				this.sonicLevel.paletteItems[0] = [];
				for (var k = 0; k < sonicLevel.PaletteItems[0].length; k++) {
					var pal = sonicLevel.PaletteItems[0][k];
					var $t12 = this.sonicLevel.paletteItems[0];
					var $t10 = new $OurSonic_Level_PaletteItem();
					$t10.palette = ss.cast(eval(pal.Palette), Array).map($OurSonic_SonicManager.$paletteToCanvas);
					$t10.skipIndex = pal.SkipIndex;
					$t10.totalLength = pal.TotalLength;
					$t10.pieces = pal.Pieces.map(function(a3) {
						var $t11 = new $OurSonic_Level_PaletteItemPieces();
						$t11.paletteIndex = a3.PaletteIndex;
						$t11.paletteMultiply = a3.PaletteMultiply;
						$t11.paletteOffset = a3.PaletteOffset;
						return $t11;
					});
					$t12[k] = $t10;
				}
			}
			for (var $t13 = 0; $t13 < this.sonicLevel.tilePieces.length; $t13++) {
				var dj = this.sonicLevel.tilePieces[$t13];
				dj.set_animatedFrames([]);
				if (sonicLevel.PaletteItems.length > 0) {
					for (var $t14 = 0; $t14 < dj.tiles.length; $t14++) {
						var mj3 = dj.tiles[$t14];
						var tile1 = mj3.getTile();
						if (tile1) {
							tile1.animatedFrames = [];
							var pl = tile1.getAllPaletteIndexes();
							for (var k1 = 0; k1 < this.sonicLevel.paletteItems[0].length; k1++) {
								var pal1 = this.sonicLevel.paletteItems[0][k1];
								for (var $t15 = 0; $t15 < pal1.pieces.length; $t15++) {
									var mjce = pal1.pieces[$t15];
									var mje1 = { $: mjce };
									if (mj3.palette === mje1.$.paletteIndex) {
										if (Enumerable.from(pl).any(ss.mkdel({ mje1: mje1 }, function(j3) {
											return j3 === ss.Int32.div(this.mje1.$.paletteOffset, 2) || j3 === ss.Int32.div(this.mje1.$.paletteOffset, 2) + 1;
										}))) {
											ss.add(dj.get_animatedFrames(), k1);
											ss.add(tile1.animatedFrames, k1);
										}
									}
								}
							}
						}
					}
				}
			}
			var finished = ss.mkdel(this, function() {
				this.loading = false;
			});
			this.preloadSprites(ss.mkdel(this, function() {
				finished();
				this.forceResize();
			}), function(s) {
			});
			this.forceResize();
			this.onLevelLoad(this.sonicLevel);
			// 
			//
			//               
			//
			//        var finished = function () {
			// 
			//
			//               
			//
			//        sonicManager.uiManager.levelManagerArea.visible = true;
			// 
			//
			//               
			//
			//        sonicManager.loading = false;
			// 
			//
			//               
			//
			//        sonicManager.uiManager.modifyTC.tileChunk = sonicManager.SonicLevel.Chunks[0];
			// 
			//
			//               
			//
			//        sonicManager.uiManager.modifyTilePieceArea.tilePiece = sonicManager.uiManager.modifyTP.tilePiece = sonicManager.SonicLevel.TilePieces[0];
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        };
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        //        var inds = sonicManager.inds = { r:0,t: 0, tp: 0, tc: 0, total: (sonicManager.SonicLevel.Chunks.length * 2 + sonicManager.SonicLevel.TilePieces.length * 5 + sonicManager.SonicLevel.Tiles.length), done: false };
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        sonicManager.CACHING = true;
			// 
			//
			//               
			//
			//        sonicManager.preLoadSprites(scale, function () {
			// 
			//
			//               
			//
			//        //          inds.r = 1;
			// 
			//
			//               
			//
			//        sonicManager.CACHING = false;
			// 
			//
			//               
			//
			//        finished();
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        sonicManager.uiManager.updateTitle("Level Loaded");
			// 
			//
			//               
			//
			//        sonicManager.forceResize();
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        var dl = _H.getQueryString();
			// 
			//
			//               
			//
			//        if (dl["run"]) {
			// 
			//
			//               
			//
			//        setTimeout(sonicManager.uiManager.runSonic, 1000);
			// 
			//
			//               
			//
			//        }
			// 
			//
			//               
			//
			//        
			// 
			//
			//               
			//
			//        }, sonicManager.uiManager.updateTitle);
		}
	});
	ss.initClass($OurSonic_SpeedTester, $asm, {
		$makeit: function(gameCanvas, m) {
			var mc = this.$img.data;
			var length = mc.length;
			for (var i = 0; i < length; i += 4) {
				mc[i] = 205;
				mc[i + 1] = i % 255;
				mc[i + 2] = 245;
				mc[i + 3] = 255;
			}
			var mj = gameCanvas.context;
			var fm = $OurSonic_Utility_Help.scalePixelData($OurSonic_Utility_Point.$ctor1(2, 2), this.$img);
			mj.save();
			for (var w = 0; w < this.$WIDTH; w++) {
				for (var h = 0; h < this.$HEIGHT; h++) {
					mj.putImageData(fm, w * this.$SIZE, h * this.$SIZE);
				}
			}
			mj.restore();
		}
	});
	ss.initClass($OurSonic_UIManager_Element, $asm, {
		get_depth: function() {
			return this.$myDepth;
		},
		set_depth: function(value) {
			this.$myDepth = value;
			if (ss.isInstanceOfType(this, $OurSonic_UIManager_UIArea)) {
				$OurSonic_UIManager_UIManager.instance.updateDepth();
			}
		},
		get_totalX: function() {
			return this.x + (ss.isValue(this.parent) ? this.parent.get_totalX() : 0);
		},
		get_totalY: function() {
			return this.y + (ss.isValue(this.parent) ? this.parent.get_totalY() : 0);
		},
		construct: function() {
		},
		isEditMode: function() {
			return this.editMode || ss.isValue(this.parent) && this.parent.isEditMode();
		},
		forceDrawing: function() {
			return this.$cachedForceRedrawing;
			//redraw=false,cache=false
		},
		onKeyDown: function(e) {
			return false;
		},
		focus: function(e) {
			this.focused = true;
		},
		loseFocus: function() {
			this.focused = false;
		},
		onClick: function(e) {
			if (this.isEditMode()) {
				if (this.editorEngine.click(e)) {
					return true;
				}
			}
			return false;
		},
		onMouseUp: function(e) {
			if (this.isEditMode()) {
				if (this.editorEngine.mouseUp(e)) {
					return true;
				}
			}
			return false;
		},
		onMouseOver: function(e) {
			if (this.isEditMode()) {
				if (this.editorEngine.mouseOver(e)) {
					return true;
				}
			}
			return false;
		},
		draw: function(canv) {
			if (this.isEditMode()) {
				this.editorEngine.draw(canv);
			}
		},
		clearCache: function() {
			this.cachedDrawing = null;
		},
		onScroll: function(e) {
			return false;
		}
	});
	ss.initClass($OurSonic_UIManager_Panel, $asm, {
		clear: function() {
			ss.clear(this.controls);
		},
		childrenAreEditing: function() {
			var ch = this.controls;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var t = ch[$t1];
				if (t.editorEngine.dragging || t.editorEngine.editing) {
					return true;
				}
				if (ss.isInstanceOfType(t, $OurSonic_UIManager_Panel) && ss.cast(t, $OurSonic_UIManager_Panel).childrenAreEditing()) {
					return true;
				}
			}
			return false;
		},
		focus: function(e) {
			var e2 = $OurSonic_UIManager_Pointer.$ctor(0, 0, 0, false);
			var ch = this.controls;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var t = ch[$t1];
				if (t.visible && t.y <= e.y && t.y + t.height > e.y && t.x <= e.x && t.x + t.width > e.x) {
					e2.x = e.x - t.x;
					e2.y = e.y - t.y;
					t.focus(e2);
				}
			}
			$OurSonic_UIManager_Element.prototype.focus.call(this, e);
		},
		loseFocus: function() {
			var ch = this.controls;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var t = ch[$t1];
				t.loseFocus();
			}
			$OurSonic_UIManager_Element.prototype.loseFocus.call(this);
		},
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var element = this.controls[$t1];
				element.construct();
			}
		},
		onKeyDown: function(e) {
			$OurSonic_UIManager_Element.prototype.onKeyDown.call(this, e);
			if (!this.visible) {
				return false;
			}
			var ch = this.controls;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var t = ch[$t1];
				if (t.onKeyDown(e)) {
					return true;
				}
			}
			return false;
		},
		onClick: function(e) {
			var e2 = $OurSonic_UIManager_Pointer.$ctor(0, 0, 0, false);
			if (!this.visible) {
				return false;
			}
			var clicked = false;
			var ch = this.controls;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var control = ch[$t1];
				if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
					e2.x = e.x - control.x;
					e2.y = e.y - control.y;
					control.focus(e2);
					control.onClick(e2);
					clicked = true;
				}
				else {
					control.loseFocus();
				}
			}
			if (!clicked && !this.isEditMode() && ss.isInstanceOfType(this, $OurSonic_UIManager_UIArea)) {
				ss.cast(this, $OurSonic_UIManager_UIArea).dragging = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
			}
			return clicked;
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			var dragging = null;
			var uiArea = ss.safeCast(this, $OurSonic_UIManager_UIArea);
			if (ss.isValue(uiArea)) {
				dragging = uiArea.dragging;
			}
			if (ss.isNullOrUndefined(dragging)) {
				for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
					var control = this.controls[$t1];
					if (control.visible && (control.editorEngine.editing || control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x)) {
						e.x -= control.x;
						e.y -= control.y;
						control.onMouseOver(e);
						return true;
					}
				}
				return true;
			}
			this.x += e.x - dragging.x;
			this.y += e.y - dragging.y;
			//this.onMove(); 
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				control.onMouseUp($OurSonic_UIManager_Pointer.$ctor(e.x - control.x, e.y - control.y, 0, false));
			}
			var uiArea = ss.safeCast(this, $OurSonic_UIManager_UIArea);
			if (ss.isValue(uiArea)) {
				uiArea.dragging = null;
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onScroll: function(e) {
			if (!this.visible) {
				return false;
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				if (control.visible && (control.editorEngine.editing || control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x)) {
					e.x -= control.x;
					e.y -= control.y;
					return control.onScroll(e);
				}
			}
			return $OurSonic_UIManager_Element.prototype.onScroll.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			var _x = this.x;
			var _y = this.y;
			canv.save();
			if (this.outline) {
				var lingrad = canv.createLinearGradient(0, 0, 0, this.height);
				lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
				lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');
				canv.fillStyle = lingrad;
				canv.strokeStyle = '#333';
				var rad = 5;
				$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, rad, true, true);
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var t = this.controls[$t1];
				t.draw(canv);
			}
			this.x = _x;
			this.y = _y;
			canv.restore();
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		},
		addControl: function(T) {
			return function(element) {
				element.parent = this;
				element.construct();
				ss.add(this.controls, element);
				return element;
			};
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_Areas_ColorEditingArea, $asm, {
		init: function(frame) {
			this.frame = frame;
			this.editor = new $OurSonic_Areas_Editor(frame, this.showOffset);
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			if (ss.isNullOrUndefined(this.editor)) {
				return false;
			}
			this.clicking = true;
			this.clickHandled = false;
			var scalex = ss.Int32.div(this.width, this.editor.assetFrame.width);
			var scaley = ss.Int32.div(this.height, this.editor.assetFrame.height);
			this.editor.showHurtMap = this.showHurtMap;
			this.editor.showCollideMap = this.showCollideMap;
			var pos = $OurSonic_Utility_Point.$ctor1(ss.Int32.div(e.x, scalex), ss.Int32.div(e.y, scaley));
			if (!this.editable) {
				if (!ss.staticEquals(this.click, null)) {
					this.click(pos);
				}
			}
			else {
				this.lastPosition = pos;
				if (ss.isValue(this.paletteEditor)) {
					this.editor.currentColor = this.paletteEditor.selectedIndex;
				}
				if (this.showHurtMap || this.showCollideMap) {
					this.editor.currentColor = (e.right ? 0 : 1);
				}
				this.editor.drawPixel(pos);
			}
			return $OurSonic_UIManager_Panel.prototype.onClick.call(this, e);
		},
		onMouseOver: function(e) {
			if (ss.isNullOrUndefined(this.editor)) {
				return false;
			}
			var scalex = ss.Int32.div(this.width, this.editor.assetFrame.width);
			var scaley = ss.Int32.div(this.height, this.editor.assetFrame.height);
			var pos = $OurSonic_Utility_Point.$ctor1(ss.Int32.div(e.x, scalex), ss.Int32.div(e.y, scaley));
			this.editor.showHurtMap = this.showHurtMap;
			this.editor.showCollideMap = this.showCollideMap;
			if (this.clicking) {
				if (!this.editable) {
					if (!ss.staticEquals(this.click, null)) {
						this.click(pos);
					}
				}
				else {
					this.clickHandled = true;
					if (this.showHurtMap || this.showCollideMap) {
						this.editor.currentColor = (e.right ? 0 : 1);
					}
					this.editor.drawLine(pos, this.lastPosition);
					this.lastPosition = pos;
				}
			}
			return $OurSonic_UIManager_Panel.prototype.onMouseOver.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			this.lastPosition = null;
			this.clickHandled = false;
			this.clicking = false;
			return $OurSonic_UIManager_Panel.prototype.onMouseUp.call(this, e);
		},
		draw: function(canv) {
			$OurSonic_UIManager_Panel.prototype.draw.call(this, canv);
			if (!this.visible) {
				return;
			}
			if (ss.isNullOrUndefined(this.editor)) {
				return;
			}
			var pos = $OurSonic_Utility_Point.$ctor1(this.get_totalX(), this.get_totalY());
			this.editor.draw(canv, pos, $OurSonic_Utility_Point.$ctor1(this.width, this.height), this.showCollideMap, this.showHurtMap);
		}
	}, $OurSonic_UIManager_Panel);
	ss.initClass($OurSonic_Areas_ColorEditorArea, $asm, {});
	ss.initClass($OurSonic_Areas_ColorEditorAreaData, $asm, {});
	ss.initClass($OurSonic_Areas_DebugConsoleData, $asm, {});
	ss.initClass($OurSonic_Areas_Editor, $asm, {
		draw: function(canvas, pos, size, showCollideMap, showHurtMap) {
			this.assetFrame.drawUI(canvas, pos, size, this.showOutline, showCollideMap, showHurtMap, this.showOffset, false, false);
		},
		drawPixel: function(location1) {
			var halfwidth = ss.Int32.div(this.lineWidth, 2);
			var map = ((!this.showHurtMap && !this.showCollideMap) ? this.assetFrame.colorMap : (this.showHurtMap ? this.assetFrame.hurtSonicMap : this.assetFrame.collisionMap));
			if (this.lineWidth === 1) {
				map[location1.x][location1.y] = this.currentColor;
			}
			else {
				for (var k = -halfwidth; k < halfwidth; k++) {
					for (var c = -halfwidth; c < halfwidth; c++) {
						map[Math.min(Math.max(0, location1.x + k), this.assetFrame.width)][Math.min(Math.max(0, location1.y + c), this.assetFrame.height)] = this.currentColor;
					}
				}
			}
			this.assetFrame.clearCache();
		},
		drawLine: function(locationa, location2) {
			var location1 = $OurSonic_Utility_Point.$ctor(locationa);
			var dx = Math.abs(location2.x - location1.x);
			var dy = Math.abs(location2.y - location1.y);
			var sx = 1;
			var sy = 1;
			var error = dx - dy;
			if (location1.x > location2.x) {
				sx = -1;
			}
			if (location1.y > location2.y) {
				sy = -1;
			}
			while (true) {
				this.drawPixel(location1);
				if (location1.x === location2.x && location1.y === location2.y) {
					break;
				}
				var e2 = error * 2;
				if (e2 > -dy) {
					error -= dy;
					location1.x += sx;
				}
				if (e2 < dx) {
					error += dx;
					location1.y += sy;
				}
			}
		}
	});
	ss.initClass($OurSonic_Areas_FrameAreaData, $asm, {});
	ss.initClass($OurSonic_Areas_LevelManagerArea, $asm, {});
	ss.initClass($OurSonic_Areas_LevelSelectorArea, $asm, {
		$loadLevel: function(data) {
			$OurSonic_Utility_Help.decodeString$1(OurSonicModels.SLData).call(null, data.Data, function(level) {
				$OurSonic_UIManager_UIManager.updateTitle('Loading: ');
				var sonicManager = $OurSonic_SonicManager.instance;
				sonicManager.load(level);
				sonicManager.windowLocation.x = 0;
				sonicManager.windowLocation.y = 0;
				sonicManager.bigWindowLocation.x = ss.Int32.trunc(sonicManager.windowLocation.x - sonicManager.windowLocation.width * 0.2);
				sonicManager.bigWindowLocation.y = ss.Int32.trunc(sonicManager.windowLocation.y - sonicManager.windowLocation.height * 0.2);
				sonicManager.bigWindowLocation.width = ss.Int32.trunc(sonicManager.windowLocation.width * 1.8);
				sonicManager.bigWindowLocation.height = ss.Int32.trunc(sonicManager.windowLocation.height * 1.8);
				sonicManager.clearCache();
				if (sonicManager.currentGameState === 0) {
					$OurSonic_SonicEngine.runGame();
				}
				//#if RELEASE
				$OurSonic_SonicEngine.runGame();
				//#endif
			});
		}
	});
	ss.initClass($OurSonic_Areas_LiveObjectsArea, $asm, {});
	ss.initClass($OurSonic_Areas_LiveObjectsAreaData, $asm, {});
	ss.initClass($OurSonic_Areas_LivePopulateModel, $asm, {});
	ss.initClass($OurSonic_Areas_MainPanelData, $asm, {});
	ss.initClass($OurSonic_Areas_ObjectFrameworkArea, $asm, {
		$addCodeWindow: function(value, change) {
			this.clearMainArea();
			var $t2 = this.objectFrameworkArea.data.mainPanel;
			var $t1 = new $OurSonic_UIManager_HtmlBox(15, -35);
			$t1.width = 485;
			$t1.height = 485;
			$t1.set_init(ss.mkdel(this, function() {
				$(document.body).append('<textarea id="code" name="code" style="position:absolute;width:485px;height:485px;"></textarea>');
				this.objectFrameworkArea.data.codeMirror = document.getElementById('code');
				this.objectFrameworkArea.data.codeMirror.value = value;
				var hlLine = null;
				var codeMirrorOptions = {
					lineNumbers: true,
					matchBrackets: true,
					onChange: change,
					onCursorActivity: ss.mkdel(this, function(e) {
						this.objectFrameworkArea.data.editor.setLineClass(hlLine, null);
						hlLine = this.objectFrameworkArea.data.editor.setLineClass(this.objectFrameworkArea.data.editor.getCursor().line, 'activeline');
					}),
					onFocus: function(editor) {
						$OurSonic_SonicManager.instance.typingInEditor = true;
					},
					onBlur: function(editor1) {
						$OurSonic_SonicManager.instance.typingInEditor = false;
					}
				};
				this.objectFrameworkArea.data.editor = CodeMirror.fromTextArea(this.objectFrameworkArea.data.codeMirror, codeMirrorOptions);
				this.objectFrameworkArea.data.editor.setOption('theme', 'night');
				hlLine = this.objectFrameworkArea.data.editor.setLineClass(0, 'activeline');
				var scroller = this.objectFrameworkArea.data.editor.getScrollerElement();
				scroller.style.height = '485px';
				scroller.style.width = '485px';
				this.objectFrameworkArea.data.editor.refresh();
			}));
			$t1.set_updatePosition(ss.mkdel(this, function(x, y) {
				var scroller1 = this.objectFrameworkArea.data.editor.getScrollerElement();
				if (ss.referenceEquals(scroller1.style.left, x + 'px') && ss.referenceEquals(scroller1.style.top, y + 'px')) {
					return;
				}
				scroller1.style.left = x + 'px';
				scroller1.style.top = y + 'px';
				this.objectFrameworkArea.data.editor.refresh();
			}));
			$t1.set__Focus(ss.mkdel(this, function() {
				var sc = this.objectFrameworkArea.data.editor.getScrollerElement();
				if (ss.isValue(sc)) {
					sc.style.visibility = 'visible';
				}
			}));
			$t1.set__Hide(ss.mkdel(this, function() {
				var sc1 = this.objectFrameworkArea.data.editor.getScrollerElement();
				this.objectFrameworkArea.data.editor.getInputField().blur();
				//            Engine.uiCanvasItem.focus();
				//            document.body.focus();
				//            editor.onBlur();
				if (ss.isValue(sc1)) {
					sc1.style.left = '-100px';
					sc1.style.top = '-100px';
					sc1.style.visibility = 'hidden';
				}
			}));
			$t2.addControl($OurSonic_UIManager_HtmlBox).call($t2, $t1);
		},
		clearMainArea: function() {
			this.objectFrameworkArea.data.mainPanel.controls = [];
			this.objectFrameworkArea.data.codeMirror = document.getElementById('code');
			$('.CodeMirror').remove();
			if (this.objectFrameworkArea.data.codeMirror) {
				this.objectFrameworkArea.data.codeMirror.parentNode.removeChild(this.objectFrameworkArea.data.codeMirror);
			}
			var sc = document.getElementById('picFieldUploader');
			if (ss.isValue(sc)) {
				sc.style.visibility = 'hidden';
			}
		},
		populate: function(objectFramework) {
			this.clearMainArea();
			this.objectFrameworkArea.data.objectFramework = objectFramework;
			this.objectFrameworkArea.data.key.text = objectFramework.key;
			this.objectFrameworkArea.data.description.text = ss.coalesce(objectFramework.description, '');
			this.objectFrameworkArea.data.assets.clearControls();
			for (var $t1 = 0; $t1 < objectFramework.assets.length; $t1++) {
				var t = objectFramework.assets[$t1];
				var b = { $: null };
				b.$ = new (ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectAsset]))(null, 0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ b: b }, function() {
					return this.b.$.data.name;
				})));
				b.$.color = 'rgb(50,190,90)';
				var b1 = { $: b.$ };
				b.$.click = ss.mkdel({ b1: b1, $this: this }, function(p) {
					this.$this.objectFrameworkArea.data.b1.toggled = false;
					this.$this.objectFrameworkArea.data.b2.toggled = false;
					this.$this.objectFrameworkArea.data.b3.toggled = false;
					this.$this.objectFrameworkArea.data.b4.toggled = false;
					this.$this.$loadAsset(this.b1.$.data);
				});
				b.$.data = t;
				this.objectFrameworkArea.data.assets.addControl(ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectAsset])).call(this.objectFrameworkArea.data.assets, b.$);
			}
			this.objectFrameworkArea.data.pieces.clearControls();
			for (var $t2 = 0; $t2 < objectFramework.pieces.length; $t2++) {
				var t1 = objectFramework.pieces[$t2];
				var b2 = { $: null };
				b2.$ = new (ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectPiece]))(null, 0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ b2: b2 }, function() {
					return this.b2.$.data.name;
				})));
				b2.$.color = 'rgb(50,190,90)';
				var b11 = { $: b2.$ };
				b2.$.click = ss.mkdel({ b11: b11, $this: this }, function(p1) {
					this.$this.objectFrameworkArea.data.b1.toggled = false;
					this.$this.objectFrameworkArea.data.b2.toggled = false;
					this.$this.objectFrameworkArea.data.b3.toggled = false;
					this.$this.objectFrameworkArea.data.b4.toggled = false;
					this.$this.$loadPiece(this.b11.$.data);
				});
				this.objectFrameworkArea.data.pieces.addControl(ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectPiece])).call(this.objectFrameworkArea.data.pieces, b2.$);
				b2.$.data = t1;
			}
			this.objectFrameworkArea.data.pieceLayouts.clearControls();
			for (var $t3 = 0; $t3 < objectFramework.pieceLayouts.length; $t3++) {
				var t2 = objectFramework.pieceLayouts[$t3];
				var b3 = { $: null };
				b3.$ = new (ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectPieceLayout]))(null, 0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ b3: b3 }, function() {
					return this.b3.$.data.name;
				})));
				b3.$.color = 'rgb(50,190,90)';
				var b12 = { $: b3.$ };
				b3.$.click = ss.mkdel({ b12: b12, $this: this }, function(p2) {
					this.$this.objectFrameworkArea.data.b1.toggled = false;
					this.$this.objectFrameworkArea.data.b2.toggled = false;
					this.$this.objectFrameworkArea.data.b3.toggled = false;
					this.$this.objectFrameworkArea.data.b4.toggled = false;
					this.$this.$loadPieceLayout(this.b12.$.data);
				});
				this.objectFrameworkArea.data.pieceLayouts.addControl(ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectPieceLayout])).call(this.objectFrameworkArea.data.pieceLayouts, b3.$);
				b3.$.data = t2;
			}
			this.objectFrameworkArea.data.projectiles.clearControls();
			for (var $t4 = 0; $t4 < objectFramework.projectiles.length; $t4++) {
				var t3 = objectFramework.projectiles[$t4];
				var b4 = { $: null };
				b4.$ = new (ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectProjectile]))(null, 0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ b4: b4 }, function() {
					return this.b4.$.data.name;
				})));
				b4.$.color = 'rgb(50,190,90)';
				var b13 = { $: b4.$ };
				b4.$.click = ss.mkdel({ b13: b13, $this: this }, function(p3) {
					this.$this.objectFrameworkArea.data.b1.toggled = false;
					this.$this.objectFrameworkArea.data.b2.toggled = false;
					this.$this.objectFrameworkArea.data.b3.toggled = false;
					this.$this.objectFrameworkArea.data.b4.toggled = false;
					this.$this.$loadProjectile(this.b13.$.data);
				});
				this.objectFrameworkArea.data.projectiles.addControl(ss.makeGenericType($OurSonic_UIManager_Button$1, [$OurSonic_Level_Objects_LevelObjectProjectile])).call(this.objectFrameworkArea.data.projectiles, b4.$);
				b4.$.data = t3;
			}
		},
		$loadProjectile: function(projectile) {
			this.clearMainArea();
			var $t2 = this.objectFrameworkArea.data.mainPanel;
			var $t1 = new $OurSonic_UIManager_TextArea(25, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Name= '));
			$t1.color = 'black';
			$t2.addControl($OurSonic_UIManager_TextArea).call($t2, $t1);
			var fm = null;
			var $t4 = this.objectFrameworkArea.data.mainPanel;
			var $t3 = new $OurSonic_UIManager_TextBox(100, 5, 290, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(projectile.name));
			$t3.color = 'rgb(50,150,50)';
			$t3.click = function(p) {
				projectile.name = fm.text;
			};
			$t4.addControl($OurSonic_UIManager_TextBox).call($t4, fm = $t3);
			var b = null;
			var $t6 = this.objectFrameworkArea.data.mainPanel;
			var $t5 = new $OurSonic_UIManager_Button(40, 160, 70, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('XFlip'));
			$t5.color = 'rgb(50,150,50)';
			$t5.click = function(p1) {
				projectile.xflip = b.toggled;
			};
			$t6.addControl($OurSonic_UIManager_Button).call($t6, b = $t5);
			b.toggle = true;
			b.toggled = projectile.xflip;
			var c = null;
			var $t8 = this.objectFrameworkArea.data.mainPanel;
			var $t7 = new $OurSonic_UIManager_Button(115, 160, 70, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('YFlip'));
			$t7.color = 'rgb(50,150,50)';
			$t7.click = function(p2) {
				projectile.yflip = c.toggled;
			};
			$t8.addControl($OurSonic_UIManager_Button).call($t8, c = $t7);
			c.toggle = true;
			c.toggled = projectile.yflip;
			var jd;
			var $t10 = this.objectFrameworkArea.data.mainPanel;
			var $t9 = new $OurSonic_UIManager_HScrollBox(20, 35, 70, 4, 112);
			$t9.backColor = 'rgb(50,60,127)';
			$t10.addControl($OurSonic_UIManager_HScrollBox).call($t10, jd = $t9);
			jd.controls = [];
			for (var i = 0; i < this.objectFrameworkArea.data.objectFramework.assets.length; i++) {
				var bd = { $: new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Objects_LevelObjectAsset]))(null, 0, 0, 0, 0) };
				bd.$.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ bd: bd }, function() {
					return this.bd.$.data.name;
				}));
				bd.$.onDraw = ss.mkdel({ bd: bd }, function(canvas, x, y) {
					if (this.bd.$.data.frames.length === 0) {
						return;
					}
					this.bd.$.data.frames[0].drawSimple(canvas, $OurSonic_Utility_Point.$ctor1(x, y), this.bd.$.width, this.bd.$.height - 15, projectile.xflip, projectile.yflip);
				});
				bd.$.click = ss.mkdel({ bd: bd }, function(p3) {
					for (var j = 0; j < jd.controls.length; j++) {
						if (ss.referenceEquals(jd.controls[j], this.bd.$)) {
							if (projectile.assetIndex === j) {
								this.bd.$.toggled = true;
							}
							projectile.assetIndex = j;
							continue;
						}
						ss.cast(jd.controls[j], $OurSonic_UIManager_ImageButton).toggled = false;
					}
				});
				jd.addControl(bd.$);
				bd.$.toggle = true;
				bd.$.data = this.objectFrameworkArea.data.objectFramework.assets[i];
				if (projectile.assetIndex === i) {
					bd.$.toggled = true;
				}
			}
		},
		$loadPieceLayout: function(pieceLayout) {
			this.clearMainArea();
			var $t2 = this.objectFrameworkArea.data.mainPanel;
			var $t1 = new $OurSonic_UIManager_TextArea(25, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Name= '));
			$t1.color = 'black';
			$t2.addControl($OurSonic_UIManager_TextArea).call($t2, $t1);
			var textBox = null;
			var $t3 = new $OurSonic_UIManager_TextBox(100, 5, 390, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(pieceLayout.name));
			$t3.color = 'rgb(50,150,50)';
			$t3.click = function(p) {
				pieceLayout.name = textBox.text;
			};
			textBox = $t3;
			this.objectFrameworkArea.data.mainPanel.addControl($OurSonic_UIManager_TextBox).call(this.objectFrameworkArea.data.mainPanel, textBox);
			this.objectFrameworkArea.data.mainPanel.addControl($OurSonic_Areas_PieceLayoutEditor).call(this.objectFrameworkArea.data.mainPanel, this.objectFrameworkArea.data.mainPanel.data.pe = new $OurSonic_Areas_PieceLayoutEditor(145, 105, $OurSonic_Utility_Point.$ctor1(350, 280)));
			this.objectFrameworkArea.data.mainPanel.data.pe.init(pieceLayout);
			var $t6 = this.objectFrameworkArea.data.mainPanel;
			var $t5 = this.objectFrameworkArea.data;
			var $t4 = new $OurSonic_UIManager_ScrollBox(10, 105, 70, 5, 112);
			$t4.backColor = 'rgb(50,60,127)';
			$t6.addControl($OurSonic_UIManager_ScrollBox).call($t6, $t5.listOfPieces = $t4);
			var selectPieceScroll;
			var $t9 = this.objectFrameworkArea.data.mainPanel;
			var $t8 = this.objectFrameworkArea.data.mainPanel.data;
			var $t7 = new $OurSonic_UIManager_HScrollBox(145, 390, 70, 3, 112);
			$t7.backColor = 'rgb(50,60,127)';
			$t9.addControl($OurSonic_UIManager_HScrollBox).call($t9, $t8.selectPieceScroll = selectPieceScroll = $t7);
			selectPieceScroll.controls = [];
			;
			var $t12 = this.objectFrameworkArea.data.mainPanel;
			var $t11 = this.objectFrameworkArea.data.mainPanel.data;
			var $t10 = new $OurSonic_UIManager_Button(148, 38, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Foreground'));
			$t10.color = 'rgb(50,150,50)';
			$t10.click = ss.mkdel(this, function(p1) {
				this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.setPriority(this.objectFrameworkArea.data.mainPanel.data.priorityDrawing.toggled);
			});
			$t12.addControl($OurSonic_UIManager_Button).call($t12, $t11.priorityDrawing = $t10);
			this.objectFrameworkArea.data.mainPanel.data.priorityDrawing.toggle = true;
			for (var i = 0; i < this.objectFrameworkArea.data.objectFramework.pieces.length; i++) {
				var bdc = { $: new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece]))(null, 0, 0, 0, 0) };
				bdc.$.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ bdc: bdc, $this: this }, function() {
					return this.$this.objectFrameworkArea.data.objectFramework.pieces[this.bdc.$.data.index].name;
				}));
				bdc.$.onDraw = ss.mkdel({ bdc: bdc, $this: this }, function(canvas, x, y) {
					var d = this.$this.objectFrameworkArea.data.objectFramework.pieces[this.bdc.$.data.index];
					var ast = this.$this.objectFrameworkArea.data.objectFramework.assets[d.assetIndex];
					if (ast.frames.length === 0) {
						return;
					}
					ast.frames[0].drawSimple(canvas, $OurSonic_Utility_Point.$ctor1(x, y), this.bdc.$.width, this.bdc.$.height - 15, d.xflip, d.yflip);
				});
				bdc.$.click = ss.mkdel({ bdc: bdc, $this: this }, function(p2) {
					ss.cast(this.$this.objectFrameworkArea.data.listOfPieces.controls[this.$this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.selectedPieceIndex], ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Objects_LevelObjectPieceLayoutPiece])).data.pieceIndex = this.bdc.$.data.index;
					for (var $t13 = 0; $t13 < selectPieceScroll.controls.length; $t13++) {
						var t = selectPieceScroll.controls[$t13];
						if (ss.referenceEquals(t, this.bdc.$)) {
							t.toggled = true;
						}
						else {
							t.toggled = false;
						}
					}
				});
				selectPieceScroll.addControl(bdc.$);
				var $t15 = bdc.$;
				var $t14 = $OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece.$ctor();
				$t14.piece = pieceLayout.pieces[0];
				$t14.index = i;
				$t15.data = $t14;
				bdc.$.toggle = true;
				if (pieceLayout.pieces.length > 0) {
					bdc.$.toggled = pieceLayout.pieces[0].pieceIndex === i;
				}
			}
			var showB = null;
			var $t17 = this.objectFrameworkArea.data.mainPanel;
			var $t16 = new $OurSonic_UIManager_Button(348, 38, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Show Images'));
			$t16.color = 'rgb(50,150,50)';
			$t16.click = ss.mkdel(this, function(p3) {
				this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.showImages = showB.toggled;
			});
			$t17.addControl($OurSonic_UIManager_Button).call($t17, showB = $t16);
			showB.toggle = true;
			var $t19 = this.objectFrameworkArea.data.mainPanel;
			var $t18 = new $OurSonic_UIManager_Button(348, 68, 140, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Add Branch'));
			$t18.color = 'rgb(50,150,50)';
			$t18.click = ss.mkdel(this, function(p4) {
				var pc;
				ss.add(this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.pieceLayout.pieces, pc = $OurSonic_Level_Objects_LevelObjectPieceLayoutPiece.$ctor(ss.Int32.trunc(this.objectFrameworkArea.data.objectFramework.pieces.length * Math.random())));
				pc.x = ss.Int32.trunc(Math.random() * this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.pieceLayout.width);
				pc.y = ss.Int32.trunc(Math.random() * this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.pieceLayout.height);
				this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.selectedPieceIndex = this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.pieceLayout.pieces.length - 1;
				this.$buildleftScroll(pieceLayout);
			});
			$t19.addControl($OurSonic_UIManager_Button).call($t19, $t18);
			this.$buildleftScroll(pieceLayout);
			//
			//            Data.MainPanel.Data.UpdatePieces = () =>
			//
			//            {
			//
			//            ImageButton<ObjectFrameworkAreaPiece> df=null;
			//
			//            for (var j = 0; j < Data.ListOfPieces.Controls.Count; j++)
			//
			//            {
			//
			//            
			//
			//            
			//
			//            if (j == Data.MainPanel.Data.pe.PieceLayoutMaker.SelectedPieceIndex)
			//
			//            {
			//
			//            ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = true;
			//
			//            df = ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]);
			//
			//            }
			//
			//            else
			//
			//            {
			//
			//            ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = false;
			//
			//            }
			//
			//            }
			//
			//            
			//
			//            for (var j = 0; j < Data.MainPanel.Data.SelectPieceScroll.Controls.Count; j++)
			//
			//            {
			//
			//            df.Data.piece = ??this??;
			//
			//            if (df.Data.piece.PieceIndex == j)
			//
			//            ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = true;
			//
			//            else
			//
			//            ((ImageButton<ObjectFrameworkAreaPiece>)Data.MainPanel.Data.SelectPieceScroll.Controls[j]).Toggled = false;
			//
			//            }
			//
			//            
			//
			//            
			//
			//            };
		},
		$buildleftScroll: function(pieceLayout) {
			this.objectFrameworkArea.data.listOfPieces.controls = [];
			for (var i = 0; i < pieceLayout.pieces.length; i++) {
				var bd = { $: new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Objects_LevelObjectPieceLayoutPiece]))(null, 0, 0, 0, 0) };
				bd.$.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ bd: bd, $this: this }, function() {
					return this.$this.objectFrameworkArea.data.objectFramework.pieces[this.bd.$.data.pieceIndex].name;
				}));
				bd.$.onDraw = ss.mkdel({ bd: bd, $this: this }, function(canvas, x, y) {
					var pc = this.$this.objectFrameworkArea.data.objectFramework.pieces[this.bd.$.data.pieceIndex];
					var ast = this.$this.objectFrameworkArea.data.objectFramework.assets[pc.assetIndex];
					if (ast.frames.length === 0) {
						return;
					}
					ast.frames[0].drawSimple(canvas, $OurSonic_Utility_Point.$ctor1(x, y), this.bd.$.width, this.bd.$.height - 15, pc.xflip, pc.yflip);
				});
				bd.$.click = ss.mkdel({ bd: bd, $this: this }, function(p) {
					for (var j = 0; j < this.$this.objectFrameworkArea.data.listOfPieces.controls.length; j++) {
						if (ss.referenceEquals(this.bd.$, this.$this.objectFrameworkArea.data.listOfPieces.controls[j])) {
							ss.cast(this.$this.objectFrameworkArea.data.listOfPieces.controls[j], $OurSonic_UIManager_ImageButton).toggled = true;
							this.$this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.selectedPieceIndex = j;
						}
						else {
							ss.cast(this.$this.objectFrameworkArea.data.listOfPieces.controls[j], $OurSonic_UIManager_ImageButton).toggled = false;
						}
					}
					for (var j1 = 0; j1 < this.$this.objectFrameworkArea.data.mainPanel.data.selectPieceScroll.controls.length; j1++) {
						var fm = ss.cast(this.$this.objectFrameworkArea.data.mainPanel.data.selectPieceScroll.controls[j1], ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece]));
						fm.data.piece = this.bd.$.data;
						fm.toggled = j1 === pieceLayout.pieces[this.$this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.selectedPieceIndex].pieceIndex;
					}
				});
				this.objectFrameworkArea.data.listOfPieces.addControl(ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Objects_LevelObjectPieceLayoutPiece])).call(this.objectFrameworkArea.data.listOfPieces, bd.$);
				bd.$.toggle = true;
				bd.$.data = pieceLayout.pieces[i];
				if (i === this.objectFrameworkArea.data.mainPanel.data.pe.pieceLayoutMaker.selectedPieceIndex) {
					bd.$.toggled = true;
				}
			}
		},
		$loadPiece: function(piece) {
			this.clearMainArea();
			var $t2 = this.objectFrameworkArea.data.mainPanel;
			var $t1 = new $OurSonic_UIManager_TextArea(25, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Name: '));
			$t1.color = 'black';
			$t2.addControl($OurSonic_UIManager_TextArea).call($t2, $t1);
			var textBox = null;
			var $t4 = this.objectFrameworkArea.data.mainPanel;
			var $t3 = new $OurSonic_UIManager_TextBox(100, 5, 290, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(piece.name));
			$t3.color = 'rgb(50,150,50)';
			$t3.click = function(p) {
				piece.name = textBox.text;
			};
			$t4.addControl($OurSonic_UIManager_TextBox).call($t4, textBox = $t3);
			var b = null;
			var $t6 = this.objectFrameworkArea.data.mainPanel;
			var $t5 = new $OurSonic_UIManager_Button(40, 160, 70, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('XFlip'));
			$t5.color = 'rgb(50,150,50)';
			$t5.click = function(p1) {
				piece.xflip = b.toggled;
			};
			$t6.addControl($OurSonic_UIManager_Button).call($t6, b = $t5);
			b.toggle = true;
			b.toggled = piece.xflip;
			var c = null;
			var $t8 = this.objectFrameworkArea.data.mainPanel;
			var $t7 = new $OurSonic_UIManager_Button(115, 160, 70, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('YFlip'));
			$t7.color = 'rgb(50,150,50)';
			$t7.click = function(p2) {
				piece.yflip = c.toggled;
			};
			$t8.addControl($OurSonic_UIManager_Button).call($t8, c = $t7);
			c.toggle = true;
			c.toggled = piece.yflip;
			var jd;
			var $t10 = this.objectFrameworkArea.data.mainPanel;
			var $t9 = new $OurSonic_UIManager_HScrollBox(20, 35, 70, 4, 112);
			$t9.backColor = 'rgb(50,60,127)';
			$t10.addControl($OurSonic_UIManager_HScrollBox).call($t10, jd = $t9);
			var bd = null;
			jd.controls = [];
			for (var i = 0; i < this.objectFrameworkArea.data.objectFramework.assets.length; i++) {
				bd = new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Objects_LevelObjectAsset]))(this.objectFrameworkArea.data.objectFramework.assets[i], 0, 0, 0, 0);
				var bd1 = { $: bd };
				bd.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ bd1: bd1 }, function() {
					return this.bd1.$.data.name;
				}));
				bd.onDraw = ss.mkdel({ bd1: bd1 }, function(canvas, x, y) {
					if (this.bd1.$.data.frames.length === 0) {
						return;
					}
					this.bd1.$.data.frames[0].drawSimple(canvas, $OurSonic_Utility_Point.$ctor1(x, y), this.bd1.$.width, this.bd1.$.height - 15, piece.xflip, piece.yflip);
				});
				bd.click = ss.mkdel({ bd1: bd1 }, function(p3) {
					for (var j = 0; j < jd.controls.length; j++) {
						if (ss.referenceEquals(jd.controls[j], this.bd1.$)) {
							if (piece.assetIndex === j) {
								this.bd1.$.toggled = true;
							}
							piece.assetIndex = j;
							continue;
						}
						ss.cast(jd.controls[j], $OurSonic_UIManager_ImageButton).toggled = false;
					}
				});
				jd.addControl(bd);
				bd.toggle = true;
				if (piece.assetIndex === i) {
					bd.toggled = true;
				}
			}
		},
		$loadAsset: function(asset) {
			this.clearMainArea();
			var $t2 = this.objectFrameworkArea.data.mainPanel;
			var $t1 = new $OurSonic_UIManager_TextArea(25, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Name: '));
			$t1.color = 'black';
			$t2.addControl($OurSonic_UIManager_TextArea).call($t2, $t1);
			var tb = null;
			var $t4 = this.objectFrameworkArea.data.mainPanel;
			var $t3 = new $OurSonic_UIManager_TextBox(100, 5, 290, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(asset.name));
			$t3.color = 'rgb(50,150,50)';
			$t3.click = function(p) {
				asset.name = tb.text;
			};
			$t4.addControl($OurSonic_UIManager_TextBox).call($t4, tb = $t3);
			var $t6 = this.objectFrameworkArea.data.mainPanel;
			var $t5 = new $OurSonic_UIManager_Button(400, 5, 100, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Add Frame'));
			$t5.color = 'rgb(50,150,50)';
			$t5.click = ss.mkdel(this, function(p1) {
				var vs;
				ss.add(asset.frames, vs = new $OurSonic_Level_Objects_LevelObjectAssetFrame('Frame ' + (asset.frames.length + 1)));
				vs.palette = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'];
				vs.width = ss.Int32.trunc(Math.floor(Math.random() * 40) + 20);
				vs.height = ss.Int32.trunc(Math.floor(Math.random() * 40) + 20);
				vs.colorMap = new Array(vs.width);
				for (var i = 0; i < vs.width; i++) {
					vs.colorMap[i] = new Array(vs.height);
					for (var j = 0; j < vs.height; j++) {
						vs.colorMap[i][j] = ss.Int32.trunc(Math.floor(Math.random() * vs.palette.length));
					}
				}
				this.objectFrameworkArea.data.mainPanel.data.assetPopulate(asset);
			});
			$t6.addControl($OurSonic_UIManager_Button).call($t6, $t5);
			var jd;
			var $t8 = this.objectFrameworkArea.data.mainPanel;
			var $t7 = new $OurSonic_UIManager_HScrollBox(20, 35, 70, 4, 112);
			$t7.backColor = 'rgb(50,60,127)';
			$t8.addControl($OurSonic_UIManager_HScrollBox).call($t8, jd = $t7);
			this.objectFrameworkArea.data.mainPanel.data.assetPopulate = ss.mkdel(this, function(ast) {
				jd.controls = [];
				for (var $t9 = 0; $t9 < ast.frames.length; $t9++) {
					var t = ast.frames[$t9];
					var bd = { $: null };
					bd.$ = new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Objects_LevelObjectAssetFrame]))(null, 0, 0, 0, 0);
					bd.$.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(ss.mkdel({ bd: bd }, function() {
						return this.bd.$.data.name;
					}));
					bd.$.onDraw = ss.mkdel({ bd: bd }, function(canvas, x, y) {
						this.bd.$.data.drawSimple(canvas, $OurSonic_Utility_Point.$ctor1(x, y), this.bd.$.width, this.bd.$.height - 15, false, false);
					});
					bd.$.click = ss.mkdel({ bd: bd, $this: this }, function(p2) {
						this.$this.objectFrameworkArea.data.mainPanel.data.loadFrame(this.bd.$.data);
					});
					jd.addControl(bd.$);
					bd.$.data = t;
				}
			});
			this.objectFrameworkArea.data.mainPanel.data.assetPopulate(asset);
			this.objectFrameworkArea.data.mainPanel.addControl(ss.makeGenericType($OurSonic_UIManager_Panel$1, [$OurSonic_Areas_FrameAreaData])).call(this.objectFrameworkArea.data.mainPanel, this.objectFrameworkArea.data.mainPanel.data.frameArea = new (ss.makeGenericType($OurSonic_UIManager_Panel$1, [$OurSonic_Areas_FrameAreaData]))($OurSonic_Areas_FrameAreaData.$ctor(), 7, 155, 480, 350));
			this.objectFrameworkArea.data.mainPanel.data.frameArea.outline = false;
			this.objectFrameworkArea.data.mainPanel.data.loadFrame = ss.mkdel(this, function(frame) {
				this.objectFrameworkArea.data.mainPanel.data.frameArea.controls = [];
				//Data.MainPanel.Data.FrameArea.currentFrame = frame;
				//var ce;
				var $t11 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t10 = new $OurSonic_UIManager_TextArea(15, 21, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Name: '));
				$t10.color = 'black';
				$t11.addControl($OurSonic_UIManager_TextArea).call($t11, $t10);
				var textBox = null;
				var $t13 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t12 = new $OurSonic_UIManager_TextBox(90, 0, 395, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(ss.coalesce(frame.name, '')));
				$t12.color = 'rgb(50,150,50)';
				$t12.click = function(p3) {
					frame.name = textBox.text;
				};
				$t13.addControl($OurSonic_UIManager_TextBox).call($t13, textBox = $t12);
				var $t15 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t14 = new $OurSonic_UIManager_TextArea(15, 100, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Transparent Color: '));
				$t14.color = 'black';
				$t15.addControl($OurSonic_UIManager_TextArea).call($t15, $t14);
				var tb2 = null;
				var $t17 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t16 = new $OurSonic_UIManager_TextBox(15, 120, 395, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(ss.coalesce(frame.transparentColor, '')));
				$t16.color = 'rgb(50,150,50)';
				$t16.textChanged = function() {
					frame.transparentColor = tb2.text;
					frame.clearCache();
				};
				$t17.addControl($OurSonic_UIManager_TextBox).call($t17, tb2 = $t16);
				var $t19 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t18 = new $OurSonic_UIManager_TextArea(0, 275, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(function() {
					return 'Width:  ' + frame.width;
				}));
				$t18.color = 'Black';
				$t19.addControl($OurSonic_UIManager_TextArea).call($t19, $t18);
				var $t21 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t20 = new $OurSonic_UIManager_Button(75, 250, 14, 17, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('^'));
				$t20.color = 'rgb(50,150,50)';
				$t20.click = function(p4) {
					frame.setWidth(frame.width + 1);
				};
				$t21.addControl($OurSonic_UIManager_Button).call($t21, $t20);
				var $t23 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t22 = new $OurSonic_UIManager_Button(75, 270, 14, 20, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('v'));
				$t22.color = 'rgb(50,150,50)';
				$t22.click = function(p5) {
					frame.setWidth(frame.width - 1);
				};
				$t23.addControl($OurSonic_UIManager_Button).call($t23, $t22);
				var $t25 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t24 = new $OurSonic_UIManager_TextArea(0, 320, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(function() {
					return 'Height: ' + frame.height;
				}));
				$t24.color = 'Black';
				$t25.addControl($OurSonic_UIManager_TextArea).call($t25, $t24);
				var $t27 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t26 = new $OurSonic_UIManager_Button(75, 295, 14, 17, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('^'));
				$t26.color = 'rgb(50,150,50)';
				$t26.click = function(p6) {
					frame.setHeight(frame.height + 1);
				};
				$t27.addControl($OurSonic_UIManager_Button).call($t27, $t26);
				var $t29 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t28 = new $OurSonic_UIManager_Button(75, 315, 14, 20, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('v'));
				$t28.color = 'rgb(50,150,50)';
				$t28.click = function(p7) {
					frame.setHeight(frame.height - 1);
				};
				$t29.addControl($OurSonic_UIManager_Button).call($t29, $t28);
				var bt;
				var $t31 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t30 = new $OurSonic_UIManager_Button(175, 35, 150, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Collide Map'));
				$t30.color = 'rgb(50,150,50)';
				$t30.click = function(p8) {
					//    ce.showCollideMap = this.toggled;
				};
				$t31.addControl($OurSonic_UIManager_Button).call($t31, bt = $t30);
				bt.toggle = true;
				var $t33 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t32 = new $OurSonic_UIManager_Button(335, 35, 150, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Hurt Map'));
				$t32.color = 'rgb(50,150,50)';
				$t32.click = function(p9) {
					//    ce.showHurtMap = this.toggled;
				};
				$t33.addControl($OurSonic_UIManager_Button).call($t33, bt = $t32);
				bt.toggle = true;
				var $t36 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t35 = this.objectFrameworkArea.data.mainPanel.data.frameArea.data;
				var $t34 = new $OurSonic_Areas_ColorEditingArea(175, 65, 310, 225);
				$t34.showOffset = true;
				$t36.addControl($OurSonic_Areas_ColorEditingArea).call($t36, $t35.colorEditor = $t34);
				var ce = this.objectFrameworkArea.data.mainPanel.data.frameArea.data.colorEditor;
				ce.init(frame);
				ce.editor.showOutline = false;
				ce.editable = false;
				ce.click = function(p10) {
					frame.setOffset(p10.x, p10.y);
				};
				//
				//                                Data.MainPanel.Data.FrameArea.AddControl(new HtmlBox(19, 64, 120, 31, () =>
				//
				//                                {
				//
				//                                var sc = document.getElementById("picFieldUploader");
				//
				//                                
				//
				//                                sc.style.left = (objectFrameworkArea.x + 320 + 7 + 19) + "px";
				//
				//                                sc.style.top = (objectFrameworkArea.y + 150 + 155 + 64) + "px";
				//
				//                                sc.style.position = "absolute";
				//
				//                                sc.style.visibility = "visible";
				//
				//                                }, (x, y) =>
				//
				//                                {
				//
				//                                var sc = document.getElementById("picFieldUploader");
				//
				//                                if (sc)
				//
				//                                {
				//
				//                                if (sc.style.left == x + "px" && sc.style.top == y + "px")
				//
				//                                return;
				//
				//                                sc.style.left = x + "px";
				//
				//                                sc.style.top = y + "px";
				//
				//                                }
				//
				//                                }, () =>
				//
				//                                {
				//
				//                                var sc = document.getElementById("picFieldUploader");
				//
				//                                if (sc)
				//
				//                                {
				//
				//                                sc.style.visibility = "visible";
				//
				//                                }
				//
				//                                }, () =>
				//
				//                                {
				//
				//                                var sc = document.getElementById("picFieldUploader");
				//
				//                                if (sc)
				//
				//                                {
				//
				//                                sc.style.left = "-100px";
				//
				//                                sc.style.top = "-100px";
				//
				//                                sc.style.visibility = "hidden";
				//
				//                                }
				//
				//                                }));
				var $t39 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t38 = this.objectFrameworkArea.data.mainPanel.data.frameArea.data;
				var $t37 = new $OurSonic_Areas_PaletteArea(175, 300);
				$t37.scale = $OurSonic_Utility_Point.$ctor1(39, 11);
				$t37.showCurrent = false;
				$t39.addControl($OurSonic_Areas_PaletteArea).call($t39, $t38.palatteArea = $t37);
				this.objectFrameworkArea.data.mainPanel.data.frameArea.data.palatteArea.init(frame.palette, true);
				var $t41 = this.objectFrameworkArea.data.mainPanel.data.frameArea;
				var $t40 = new $OurSonic_UIManager_Button(175, 327, 310, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Edit Map'));
				$t40.color = 'rgb(50,150,50)';
				$t40.click = ss.mkdel(this, function(p11) {
					$OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().colorEditorArea.data.init(frame);
					$OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().colorEditorArea.visible = true;
					$OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().colorEditorArea.set_depth(10);
					this.objectFrameworkArea.loseFocus();
				});
				$t41.addControl($OurSonic_UIManager_Button).call($t41, $t40);
			});
		}
	});
	ss.initClass($OurSonic_Areas_ObjectFrameworkArea$ObjectFrameworkAreaPiece, $asm, {});
	ss.initClass($OurSonic_Areas_ObjectFrameworkData, $asm, {});
	ss.initClass($OurSonic_Areas_ObjectFrameworkListArea, $asm, {});
	ss.initClass($OurSonic_Areas_PaletteArea, $asm, {
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			this.clicking = true;
			this.clickHandled = false;
			var _x = ss.Int32.div(e.x, this.scale.x);
			var _y = ss.Int32.div(e.y, this.scale.y);
			if (this.wide) {
				this.selectedIndex = ss.Int32.div(_y * this.palette.length, 2) + _x;
			}
			else {
				this.selectedIndex = _y * 2 + _x;
			}
			return $OurSonic_UIManager_Panel.prototype.onClick.call(this, e);
		},
		onMouseOver: function(e) {
			if (this.clicking) {
				var _x = ss.Int32.div(e.x, this.scale.x);
				var _y = ss.Int32.div(e.y, this.scale.y);
				if (this.wide) {
					this.selectedIndex = ss.Int32.div(_y * this.palette.length, 2) + _x;
				}
				else {
					this.selectedIndex = _y * 2 + _x;
				}
			}
			return $OurSonic_UIManager_Panel.prototype.onMouseOver.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			this.clickHandled = false;
			this.clicking = false;
			return $OurSonic_UIManager_Panel.prototype.onMouseUp.call(this, e);
		},
		draw: function(canv) {
			$OurSonic_UIManager_Panel.prototype.draw.call(this, canv);
			if (!this.visible) {
				return;
			}
			if (ss.isNullOrUndefined(this.palette)) {
				return;
			}
			canv.save();
			canv.strokeStyle = '#000';
			canv.lineWidth = 2;
			var pos = $OurSonic_Utility_Point.$ctor1(this.get_totalX(), this.get_totalY());
			var f = ss.Int32.trunc(ss.round(this.palette.length / 2));
			if (this.wide) {
				for (var h = 0; h < 2; h++) {
					for (var w = 0; w < f; w++) {
						canv.fillStyle = this.palette[w + h * f];
						canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
						canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
					}
				}
				if (this.showCurrent) {
					canv.fillStyle = this.palette[this.selectedIndex];
					canv.fillRect(pos.x + f * this.scale.x, pos.y, this.scale.x * 2, this.scale.y * 2);
					canv.strokeRect(pos.x + f * this.scale.x, pos.y, this.scale.x * 2, this.scale.y * 2);
				}
			}
			else {
				for (var h1 = 0; h1 < f; h1++) {
					for (var w1 = 0; w1 < 2; w1++) {
						canv.fillStyle = this.palette[w1 + h1 * 2];
						canv.fillRect(pos.x + w1 * this.scale.x, pos.y + h1 * this.scale.y, this.scale.x, this.scale.y);
						canv.strokeRect(pos.x + w1 * this.scale.x, pos.y + h1 * this.scale.y, this.scale.x, this.scale.y);
					}
				}
				if (this.showCurrent) {
					canv.fillStyle = this.palette[this.selectedIndex];
					canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
					canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
				}
			}
			canv.restore();
		},
		construct: function() {
			$OurSonic_UIManager_Panel.prototype.construct.call(this);
		},
		init: function(palette, wide) {
			this.clicking = false;
			this.selectedIndex = 0;
			this.wide = wide;
			if (!this.wide) {
				this.width = this.scale.x * 2;
				this.height = ss.Int32.div(this.scale.y * palette.length, 2);
			}
			else {
				this.width = ss.Int32.div(this.scale.x * palette.length, 2);
				this.height = this.scale.y * 2;
			}
			this.palette = palette;
		}
	}, $OurSonic_UIManager_Panel);
	ss.initClass($OurSonic_Areas_PieceLayoutEditor, $asm, {
		init: function(pieceLayout) {
			this.pieceLayout = pieceLayout;
			this.width = this.size.x;
			this.height = this.size.y;
			this.pieceLayoutMaker = new $OurSonic_Areas_PieceLayoutMaker(pieceLayout);
		},
		onScroll: function(e) {
			this.pieceLayoutMaker.offsetScale(e.delta > 0);
			return false;
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			if (ss.isNullOrUndefined(this.pieceLayoutMaker)) {
				return false;
			}
			this.clicking = true;
			this.clickHandled = false;
			this.lastPosition = e;
			this.pieceLayoutMaker.placeItem(e, null);
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			this.lastPosition = null;
			this.clickHandled = false;
			this.clicking = false;
			this.pieceLayoutMaker.mouseUp();
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (ss.isNullOrUndefined(this.pieceLayoutMaker)) {
				return false;
			}
			if (this.clicking) {
				this.clickHandled = true;
				this.pieceLayoutMaker.placeItem(e, this.lastPosition);
				this.lastPosition = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			if (ss.isNullOrUndefined(this.pieceLayoutMaker)) {
				return;
			}
			var pos = $OurSonic_Utility_Point.$ctor1(this.get_totalX(), this.get_totalY());
			this.pieceLayoutMaker.draw(canv, pos, this.size);
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_Areas_PieceLayoutMaker, $asm, {
		draw: function(canvas, pos, scale) {
			this.pieceLayout.drawUI(canvas, pos, scale, this.showOutline, this.showImages, this.selectedPieceIndex, this.zeroPosition, this.$largeScale);
		},
		mouseUp: function() {
			this.draggingIndex = -1;
		},
		setPriority: function(val) {
			this.pieceLayout.pieces[this.selectedPieceIndex].priority = val;
		},
		placeItem: function(position, lastPosition) {
			var goodPosition = position;
			if (ss.isValue(lastPosition)) {
				goodPosition = position;
				position = lastPosition;
			}
			for (var i = 0; i < this.pieceLayout.pieces.length; i++) {
				var j = this.pieceLayout.pieces[i];
				var piece = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.pieces[j.pieceIndex];
				var asset = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.assets[piece.assetIndex];
				var size = $OurSonic_Utility_Point.$ctor1(10, 10);
				if (asset.frames.length > 0) {
					var frm = asset.frames[0];
					size.x = ss.Int32.div(frm.width, 2) + 10;
					size.y = ss.Int32.div(frm.height, 2) + 10;
				}
				if (position.x - this.zeroPosition.x > j.x - size.x && position.x - this.zeroPosition.x < j.x + size.x && position.y - this.zeroPosition.y > j.y - size.y && position.y - this.zeroPosition.y < j.y + size.y) {
					if (!(this.draggingIndex === -1 || this.draggingIndex === i)) {
						continue;
					}
					j.x = goodPosition.x - this.zeroPosition.x;
					j.y = goodPosition.y - this.zeroPosition.y;
					this.selectedPieceIndex = i;
					this.draggingIndex = i;
					var cj = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.mainPanel.data.selectPieceScroll.controls;
					for (var ci = 0; ci < cj.length; ci++) {
						if (ci === j.pieceIndex) {
							ss.cast(cj[ci], $OurSonic_UIManager_ImageButton).toggled = true;
						}
						else {
							ss.cast(cj[ci], $OurSonic_UIManager_ImageButton).toggled = false;
						}
					}
					this.pieceLayout.update();
					return;
				}
			}
			if (ss.isValue(lastPosition)) {
				this.zeroPosition.x += goodPosition.x - lastPosition.x;
				this.zeroPosition.y += goodPosition.y - lastPosition.y;
			}
			//sonicManager.uiManager.objectFrameworkArea.mainPanel.updatePieces();
		},
		offsetScale: function(positive) {
			//ZeroPosition.X = (int)(largeScale * 30) * (positive ? -1 : 1);
			//ZeroPosition.Y = (int)(largeScale * 30) * (positive ? -1 : 1);
			this.$largeScale += (positive ? 0.1 : -0.1);
		}
	});
	ss.initClass($OurSonic_Areas_TileChunkArea, $asm, {
		$buildTilePiece: function(uiManager) {
			var $t2 = uiManager.get_uiManagerAreas();
			var $t1 = new (ss.makeGenericType($OurSonic_UIManager_UIArea$1, [$OurSonic_Level_Tiles_TilePiece]))(null, 1100, 400, 390, 390);
			$t1.closable = true;
			var tilePieceArea = $t2.tilePieceArea = $t1;
			tilePieceArea.visible = false;
			uiManager.addArea(tilePieceArea);
			var $t3 = new $OurSonic_UIManager_TextArea(30, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Tile Pieces'));
			$t3.color = 'blue';
			tilePieceArea.addControl($OurSonic_UIManager_TextArea).call(tilePieceArea, $t3);
			var showHeightMap = false;
			var $t4 = new $OurSonic_UIManager_Button(100, 50, 125, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$1(function() {
				return (showHeightMap ? 'Hide Height Map' : 'Show Height Map');
			}));
			$t4.click = function(e) {
				if (ss.isNullOrUndefined(tilePieceArea.data)) {
					return;
				}
				showHeightMap = !showHeightMap;
			};
			tilePieceArea.addControl($OurSonic_UIManager_Button).call(tilePieceArea, $t4);
			var $t5 = new $OurSonic_UIManager_ScrollBox(10, 35, 80, 4, 64);
			$t5.backColor = 'rgb(50,60,127)';
			this.$tilePieceList = $t5;
			tilePieceArea.addControl($OurSonic_UIManager_ScrollBox).call(tilePieceArea, this.$tilePieceList);
			var tilePieces = $OurSonic_SonicManager.instance.sonicLevel.tilePieces;
			for (var index = 0; index < tilePieces.length; index++) {
				var tilePiece = { $: tilePieces[index] };
				var tilePieceButton = { $: new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TilePiece]))(tilePiece.$, 0, 0, 0, 0) };
				tilePieceButton.$.onDraw = ss.mkdel({ tilePieceButton: tilePieceButton, tilePiece: tilePiece }, function(cnv, x, y) {
					cnv.save();
					cnv.translate(x, y);
					cnv.scale(4, 4);
					this.tilePieceButton.$.data.draw(cnv, $OurSonic_Utility_Point.$ctor1(0, 0), 0, false, false, 0);
					this.tilePieceButton.$.data.draw(cnv, $OurSonic_Utility_Point.$ctor1(0, 0), 1, false, false, 0);
					if (showHeightMap) {
						var hmap;
						if ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap) {
							hmap = this.tilePiece.$.getLayer1HeightMaps();
						}
						else {
							hmap = this.tilePiece.$.getLayer2HeightMaps();
						}
						hmap.draw(cnv, $OurSonic_Utility_Point.$ctor1(0, 0), false, false, 1, 0);
					}
					cnv.restore();
				});
				tilePieceButton.$.font = $OurSonic_UIManager_UIManager.smallTextFont;
				tilePieceButton.$.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Tile Piece #' + index);
				tilePieceButton.$.click = ss.mkdel({ tilePiece: tilePiece }, function(e1) {
					tilePieceArea.data = this.tilePiece.$;
				});
				this.$tilePieceList.addControl(ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TilePiece])).call(this.$tilePieceList, tilePieceButton.$);
			}
			var image = new $OurSonic_UIManager_Image(105, 120, 256, 256);
			image.onDraw = ss.delegateCombine(image.onDraw, function(context, x1, y1) {
				if (ss.isNullOrUndefined(tilePieceArea.data)) {
					return;
				}
				context.save();
				context.translate(x1, y1);
				context.scale(16, 16);
				tilePieceArea.data.draw(context, $OurSonic_Utility_Point.$ctor1(0, 0), 0, false, false, 0);
				tilePieceArea.data.draw(context, $OurSonic_Utility_Point.$ctor1(0, 0), 1, false, false, 0);
				context.restore();
			});
			tilePieceArea.addControl($OurSonic_UIManager_Image).call(tilePieceArea, image);
		}
	});
	ss.initClass($OurSonic_Areas_UIManagerAreas, $asm, {});
	ss.initClass($OurSonic_Level_HeightMap, $asm, {
		get_full: function() {
			return this.$1$FullField;
		},
		set_full: function(value) {
			this.$1$FullField = value;
		},
		setItem: function(x, y, rotationMode) {
			var jx = 0;
			var jy = 0;
			switch (rotationMode) {
				case 134: {
					jx = x;
					jy = y;
					break;
				}
				case 44: {
					jx = y;
					jy = 15 - x;
					break;
				}
				case 314: {
					jx = x;
					jy = 15 - y;
					break;
				}
				case 224: {
					jx = y;
					jy = x;
					break;
				}
			}
			this.items[jx] = 16 - jy;
		},
		draw: function(canvas, pos, xflip, yflip, solid, angle) {
			if (ss.isNullOrUndefined(this.items)) {
				return;
			}
			canvas.save();
			var oPos = $OurSonic_Utility_Point.$ctor(pos);
			if (xflip) {
				pos.x = -pos.x - 16;
				canvas.scale(-1, 1);
			}
			if (yflip) {
				pos.y = -pos.y - 16;
				canvas.scale(1, -1);
			}
			var fd = $OurSonic_SonicManager.instance.spriteCache.heightMaps[this.index + (solid << 20)];
			if (this.index !== -1 && fd) {
				canvas.drawImage(fd.canvas, pos.x, pos.y);
			}
			else {
				var ntcanvas = $OurSonic_Utility_CanvasInformation.create(16, 16);
				var ncanvas = ntcanvas.context;
				if (solid > 0) {
					for (var x = 0; x < 16; x++) {
						for (var y = 0; y < 16; y++) {
							var jx = 0;
							var jy = 0;
							if ($OurSonic_Level_HeightMap.itemsGood(this.items, x, y)) {
								jx = x;
								jy = y;
								var _x = jx;
								var _y = jy;
								ncanvas.lineWidth = 1;
								ncanvas.fillStyle = $OurSonic_Level_HeightMap.colors[solid];
								ncanvas.fillRect(_x, _y, 1, 1);
								if (angle !== 255) {
									ncanvas.beginPath();
									ncanvas.lineWidth = 1;
									ncanvas.strokeStyle = 'rgba(163,241,255,0.8)';
									ncanvas.moveTo(8, 8);
									ncanvas.lineTo(8 - $OurSonic_Utility_Help.sin(angle) * 8, 8 - $OurSonic_Utility_Help.cos(angle) * 8);
									ncanvas.stroke();
									//ncanvas.BeginPath();
									//ncanvas.FillStyle = "rgba(163,241,255,0.8)";
									//ncanvas.Arc(16 / 2 - Help.Sin(angle) * 8,16 / 2 - Help.Cos(angle) * 8,5,0,2 * Math.PI,true);
									//ncanvas.Fill();
								}
								//
								//                                canvas.LineWidth = 1;
								//
								//                                canvas.StrokeStyle = "#000000";
								//
								//                                canvas.StrokeRect(pos.X, pos.Y, scale.X * 16, scale.Y * 16);
							}
						}
					}
				}
				$OurSonic_SonicManager.instance.spriteCache.heightMaps[this.index + (solid << 20)] = ntcanvas;
				canvas.drawImage(ntcanvas.canvas, pos.x, pos.y);
			}
			canvas.restore();
			pos.x = oPos.x;
			pos.y = oPos.y;
		}
	});
	$OurSonic_Level_HeightMap.$ctor1.prototype = $OurSonic_Level_HeightMap.prototype;
	ss.initClass($OurSonic_Level_PaletteItem, $asm, {});
	ss.initClass($OurSonic_Level_PaletteItemPieces, $asm, {});
	ss.initClass($OurSonic_Utility_Point, $asm, {});
	ss.initClass($OurSonic_Level_Ring, $asm, {}, $OurSonic_Utility_Point);
	ss.initClass($OurSonic_Level_SonicBackground, $asm, {
		draw: function(canvas, point, wOffset) {
		}
	});
	ss.initClass($OurSonic_Level_SonicImage, $asm, {});
	ss.initClass($OurSonic_Level_SonicLevel, $asm, {
		getChunkAt: function(x, y) {
			return this.chunks[this.chunkMap[x][y]];
		},
		clearCache: function() {
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var tile = this.tiles[$t1];
				tile.clearCache();
			}
			for (var $t2 = 0; $t2 < this.tilePieces.length; $t2++) {
				var tilePiece = this.tilePieces[$t2];
				tilePiece.clearCache();
			}
			for (var $t3 = 0; $t3 < this.chunks.length; $t3++) {
				var chunk = this.chunks[$t3];
				chunk.clearCache();
			}
		},
		getTile: function(tile) {
			return this.tiles[tile];
		},
		getTilePiece: function(block) {
			return this.tilePieces[block];
		},
		setChunkAt: function(x, y, tileChunk) {
			this.chunkMap[x][y] = tileChunk.index;
		}
	});
	ss.initClass($OurSonic_Level_SpriteCache, $asm, {
		get_animationSprites: function() {
			return this.$1$AnimationSpritesField;
		},
		set_animationSprites: function(value) {
			this.$1$AnimationSpritesField = value;
		},
		clearCache: function() {
			this.heightMaps = [];
			this.heightMapChunks = {};
		}
	});
	ss.initClass($OurSonic_Level_SpriteCacheIndexes, $asm, {});
	ss.initClass($OurSonic_Level_Animations_Animation, $asm, {
		getAnimationFile: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.animatedFiles[this.animationFile];
		}
	});
	ss.initClass($OurSonic_Level_Animations_AnimationFrame, $asm, {});
	ss.initClass($OurSonic_Level_Animations_AnimationInstance, $asm, {
		tick: function() {
		},
		draw: function(canvas, i, i1) {
		}
	});
	ss.initClass($OurSonic_Level_Events_LevelEvent, $asm, {});
	ss.initClass($OurSonic_Level_Objects_LevelObject, $asm, {
		init: function(object, level, sonic) {
			object.reset();
			this.$evalMe('initScript').apply(object, [object, level, sonic]);
		},
		onCollide: function(object, level, sonic, sensor, piece) {
			return !!this.$evalMe('collideScript').apply(object, [object, level, sonic, sensor, piece]);
		},
		onHurtSonic: function(object, level, sonic, sensor, piece) {
			return !!this.$evalMe('hurtScript').apply(object, [object, level, sonic, sensor, piece]);
		},
		tick: function(object, level, sonic) {
			if (object.lastDrawTick !== $OurSonic_SonicManager.instance.tickCount - 1) {
				this.init(object, level, sonic);
			}
			object.lastDrawTick = $OurSonic_SonicManager.instance.tickCount;
			this.$evalMe('tickScript').apply(object, [object, level, sonic]);
			if (object.state) {
				object.xsp = object.state.xsp;
				object.ysp = object.state.ysp;
			}
			object.x += object.xsp;
			object.y += object.ysp;
			return true;
		},
		die: function() {
			//alert('todo death');
		},
		$evalMe: function(js) {
			if (ss.isNullOrUndefined(this.$cacheLast[js])) {
				this.$cacheLast[js] = null;
			}
			if (!ss.referenceEquals(this.$cacheLast[js], this[js])) {
				this.$cacheCompiled[js] = null;
			}
			this.$cacheLast[js] = this[js];
			if (ss.staticEquals(this.$cacheCompiled[js], null)) {
				this.$cacheCompiled[js] = eval('(function(object,level,sonic,sensor,piece){' + this[js] + '});');
			}
			return this.$cacheCompiled[js];
		}
	});
	ss.initClass($OurSonic_Level_Objects_LevelObjectAsset, $asm, {});
	ss.initClass($OurSonic_Level_Objects_LevelObjectAssetFrame, $asm, {
		setWidth: function(w) {
			this.width = w;
			this.collisionMap = this.collisionMap.slice(0, w);
			this.clearCache();
		},
		setHeight: function(h) {
			this.height = h;
			for (var j = 0; j < this.width; j++) {
				this.collisionMap[j] = this.collisionMap[j].slice(0, h);
			}
			this.clearCache();
		},
		setOffset: function(ex, ey) {
			this.offsetX = ex;
			this.offsetY = ey;
			this.clearCache();
		},
		drawSimple: function(mainCanvas, pos, width, height, xflip, yflip) {
			var c = this.getCache($OurSonic_Utility_Point.$ctor1(width, height), false, false, false);
			mainCanvas.save();
			mainCanvas.translate(pos.x, pos.y);
			mainCanvas.scale(width / this.width, height / this.height);
			mainCanvas.drawImage(c.canvas, 0, 0);
			mainCanvas.restore();
		},
		getCache: function(size, showOutline, showCollideMap, showHurtMap) {
			var m = this.image[size.x * 47 ^ ((showOutline ? 1 : 0) + 2) * 7 ^ ((showCollideMap ? 1 : 0) + 2) * 89 ^ ((showHurtMap ? 1 : 0) + 2) * 79];
			if (ss.isNullOrUndefined(m)) {
				var mj = $OurSonic_Utility_CanvasInformation.create(size.x, size.y);
				var canvas = mj.context;
				canvas.save();
				canvas.strokeStyle = '#000000';
				canvas.lineWidth = 1;
				for (var x = 0; x < this.width; x++) {
					for (var y = 0; y < this.height; y++) {
						var ex = x;
						var ey = y;
						var d = this.colorMap[ex][ey];
						var color = this.palette[d];
						if (ss.referenceEquals(color, this.transparentColor)) {
							if (canvas.fillStyle !== 'rgba(0,0,0,0)') {
								canvas.fillStyle = 'rgba(0,0,0,0)';
							}
						}
						else {
							//  var negative = _H.negateColor(color);
							if (!ss.referenceEquals(canvas.fillStyle, '#' + color)) {
								canvas.fillStyle = '#' + color;
							}
						}
						//if (canvas.strokeStyle != "#" + negative)
						//    canvas.strokeStyle = "#" + negative; 
						canvas.fillRect(ex, ey, 1, 1);
						//  if (showOutline)
						//    canvas.strokeRect(ex, ey, 1, 1);
						if (showCollideMap) {
							if (this.collisionMap[ex][ey] > 0) {
								canvas.fillStyle = 'rgba(30,34,255,0.6)';
								canvas.fillRect(ex, ey, 1, 1);
							}
						}
						if (showHurtMap) {
							if (this.hurtSonicMap[ex][ey] > 0) {
								canvas.fillStyle = 'rgba(211,12,55,0.6)';
								canvas.fillRect(ex, ey, 1, 1);
							}
						}
					}
				}
				canvas.restore();
				m = mj;
				this.setCache(mj, size, showOutline, showCollideMap, showHurtMap);
			}
			return m;
		},
		clearCache: function() {
			this.image = {};
		},
		setCache: function(image, size, showOutline, showCollideMap, showHurtMap) {
			this.image[size.x * 47 ^ ((showOutline ? 1 : 0) + 2) * 7 ^ ((showCollideMap ? 1 : 0) + 2) * 89 ^ ((showHurtMap ? 1 : 0) + 2) * 79] = image;
		},
		drawUI: function(_canvas, pos, size, showOutline, showCollideMap, showHurtMap, showOffset, xflip, yflip) {
			var fd = this.getCache(size, showOutline, showCollideMap, showHurtMap);
			_canvas.save();
			_canvas.translate(pos.x, pos.y);
			_canvas.scale(size.x / this.width, size.y / this.height);
			if (xflip) {
				if (yflip) {
					_canvas.translate(fd.canvas.width / 2, fd.canvas.height / 2);
					_canvas.rotate(-90 * Math.PI / 180);
					_canvas.translate(-fd.canvas.width / 2, -fd.canvas.height / 2);
					_canvas.translate(0, size.y);
					_canvas.scale(1, -1);
				}
				else {
					_canvas.translate(fd.canvas.width / 2, fd.canvas.height / 2);
					_canvas.rotate(-90 * Math.PI / 180);
					_canvas.translate(-fd.canvas.width / 2, -fd.canvas.height / 2);
				}
			}
			else if (yflip) {
				_canvas.translate(0, size.y);
				_canvas.scale(1, -1);
			}
			else {
			}
			_canvas.drawImage(fd.canvas, 0, 0);
			if (showOffset) {
				_canvas.beginPath();
				_canvas.moveTo(this.offsetX, 0);
				_canvas.lineTo(this.offsetX, this.height);
				_canvas.lineWidth = 1;
				_canvas.strokeStyle = '#000000';
				_canvas.stroke();
				_canvas.beginPath();
				_canvas.moveTo(0, this.offsetY);
				_canvas.lineTo(this.width, this.offsetY);
				_canvas.lineWidth = 1;
				_canvas.strokeStyle = '#000000';
				_canvas.stroke();
			}
			_canvas.restore();
		}
	});
	ss.initClass($OurSonic_Level_Objects_LevelObjectData, $asm, {});
	ss.initClass($OurSonic_Level_Objects_LevelObjectInfo, $asm, {
		log: function(txt, level) {
			if (!this.debug) {
				this.debug = [];
			}
			if (level === 0) {
				ss.add(this.debug, ' -- ' + txt + ' -- ');
			}
			else {
				ss.add(this.debug, txt);
			}
			if (this.consoleLog) {
				this.consoleLog(this.debug);
			}
		},
		setPieceLayoutIndex: function(ind) {
			this.pieceIndex = ind;
			var pcs = this.objectData.pieceLayouts[this.pieceIndex].pieces;
			this.pieces = [];
			for (var $t1 = 0; $t1 < pcs.length; $t1++) {
				var t = pcs[$t1];
				ss.add(this.pieces, t);
			}
		},
		setObjectData: function(obj) {
			this.objectData = obj;
			if (this.objectData.pieceLayouts.length > this.pieceIndex && this.objectData.pieceLayouts[this.pieceIndex].pieces.length > 0) {
				this.setPieceLayoutIndex(this.pieceIndex);
			}
		},
		tick: function(object, level, sonic) {
			if (this.dead || !this.objectData) {
				return false;
			}
			try {
				return this.objectData.tick(object, level, sonic);
			}
			catch ($t1) {
				var EJ = ss.Exception.wrap($t1);
				this.log(EJ.get_message(), 0);
				return false;
			}
		},
		mainPieceLayout: function() {
			return this.objectData.pieceLayouts[this.pieceIndex];
		},
		getRect: function() {
			if (this.objectData.pieceLayouts.length === 0) {
				this.$_rect.x = ss.Int32.trunc(this.x);
				this.$_rect.y = ss.Int32.trunc(this.y);
				this.$_rect.width = $OurSonic_Level_Objects_ObjectManager.broken.width;
				this.$_rect.height = $OurSonic_Level_Objects_ObjectManager.broken.height;
				return this.$_rect;
			}
			var pcs = this.pieces;
			this.$_rect.y = 0;
			this.$_rect.y = 0;
			this.$_rect.width = 0;
			this.$_rect.height = 0;
			for (var $t1 = 0; $t1 < pcs.length; $t1++) {
				var j = pcs[$t1];
				var piece = this.objectData.pieces[j.pieceIndex];
				var asset = this.objectData.assets[piece.assetIndex];
				if (asset.frames.length > 0) {
					var frm = asset.frames[j.frameIndex];
					$OurSonic_Utility_Help.mergeRect(this.$_rect, $OurSonic_Utility_Rectangle.$ctor1(frm.offsetX + j.x, frm.offsetY + j.y, frm.width, frm.height));
				}
			}
			this.$_rect.x = this.$_rect.x;
			this.$_rect.y = this.$_rect.y;
			this.$_rect.width -= this.$_rect.x;
			this.$_rect.height -= this.$_rect.y;
			this.$_rect.x += ss.Int32.trunc(this.x);
			this.$_rect.y += ss.Int32.trunc(this.y);
			return this.$_rect;
		},
		draw: function(canvas, x, y, showHeightMap) {
			if (this.dead || !this.objectData) {
				return;
			}
			if (this.objectData.pieceLayouts.length === 0) {
				canvas.drawImage($OurSonic_Level_Objects_ObjectManager.broken, x - ss.Int32.div($OurSonic_Level_Objects_ObjectManager.broken.width, 2), y - ss.Int32.div($OurSonic_Level_Objects_ObjectManager.broken.height, 2), $OurSonic_Level_Objects_ObjectManager.broken.width, $OurSonic_Level_Objects_ObjectManager.broken.height);
				return;
			}
			this.mainPieceLayout().draw(canvas, x, y, this.objectData, this, showHeightMap);
			if (!ss.staticEquals(this.consoleLog, null)) {
				var gr = this.getRect();
				canvas.save();
				canvas.fillStyle = 'rgba(228,228,12,0.4)';
				var wd = 1;
				canvas.fillRect(gr.x - this.x + x - ss.Int32.div(gr.width, 2) - wd, gr.y - this.y + y - ss.Int32.div(gr.height, 2) - wd, gr.width - (gr.x - this.x) + wd * 2, gr.height - (gr.y - this.y) + wd * 2);
				canvas.restore();
			}
		},
		reset: function() {
			this.x = this.o.X;
			this.y = this.o.Y;
			this.xsp = 0;
			this.ysp = 0;
			this.state = null;
			this.xflip = this.o.XFlip;
			this.yflip = this.o.YFlip;
			this.dead = false;
			this.pieceIndex = 0;
			//maybe
			this.subdata = this.o.SubType;
			this.upperNibble = this.subdata >> 4;
			this.lowerNibble = this.subdata & 15;
			if (this.objectData.pieceLayouts.length > this.pieceIndex && this.objectData.pieceLayouts[this.pieceIndex].pieces.length > 0) {
				this.setPieceLayoutIndex(this.pieceIndex);
			}
		},
		collides: function(sonic) {
			return this.collision(sonic, false);
		},
		hurtsSonic: function(sonic) {
			return this.collision(sonic, true);
		},
		kill: function() {
			this.dead = true;
		},
		collision: function(sonic, isHurtMap) {
			if (this.dead || !this.objectData || this.objectData.pieceLayouts.length === 0) {
				return null;
			}
			var pcs = this.pieces;
			var mX = ss.Int32.trunc(sonic.x - this.x);
			var mY = ss.Int32.trunc(sonic.y - this.y);
			////speed?
			//if (mX < -50 || mY < -50) {
			//return null;
			//}
			for (var $t1 = 0; $t1 < pcs.length; $t1++) {
				var j = pcs[$t1];
				var piece = this.objectData.pieces[j.pieceIndex];
				var asset = this.objectData.assets[piece.assetIndex];
				if (asset.frames.length > 0) {
					var frm = asset.frames[j.frameIndex];
					var map = (isHurtMap ? frm.hurtSonicMap : frm.collisionMap);
					if (this.twoDArray(map, mX + frm.offsetX + j.x, mY + frm.offsetY + j.y, this.xflip ^ piece.xflip, this.yflip ^ piece.yflip) === true) {
						return j;
					}
				}
			}
			return null;
		},
		twoDArray: function(map, x, y, xflip, yflip) {
			//var height= map.Length;
			//var width = map[0].Length;
			//
			//if (yflip) {
			//if (xflip)
			//{
			//y = height - y;
			//
			//var oldx = x;
			//x = height - y;
			//y = oldx;
			//}
			//else {
			//y = height - y;
			//}
			//}else {
			//if (xflip) {
			//var oldx = x;
			//x = height - y;
			//y =  oldx;
			//} else {
			//
			//}
			//}
			if (!map || x < 0 || y < 0 || x > map.length) {
				return false;
			}
			var d = map[x];
			if (!d || y > d.length) {
				return false;
			}
			return d[y] > 0;
		},
		collide: function(sonic, sensor, piece) {
			try {
				return !!this.objectData.onCollide(this, $OurSonic_SonicManager.instance.sonicLevel, sonic, sensor, piece);
			}
			catch ($t1) {
				var EJ = ss.Exception.wrap($t1);
				this.log(EJ.get_message(), 0);
				return false;
			}
		},
		hurtSonic: function(sonic, sensor, piece) {
			try {
				return !!this.objectData.onHurtSonic(this, $OurSonic_SonicManager.instance.sonicLevel, sonic, sensor, piece);
			}
			catch ($t1) {
				var EJ = ss.Exception.wrap($t1);
				this.log(EJ.get_message(), 0);
				return false;
			}
		}
	});
	ss.initClass($OurSonic_Level_Objects_LevelObjectPiece, $asm, {});
	ss.initClass($OurSonic_Level_Objects_LevelObjectPieceLayout, $asm, {
		update: function() {
			for (var $t1 = 0; $t1 < $OurSonic_SonicManager.instance.sonicLevel.objects.length; $t1++) {
				var t = $OurSonic_SonicManager.instance.sonicLevel.objects[$t1];
				t.reset();
			}
		},
		drawUI: function(canvas, pos, scale, showOutline, showImages, selectedPieceIndex, zeroPosition, largeScale) {
			canvas.save();
			canvas.strokeStyle = '#000000';
			canvas.lineWidth = 2;
			canvas.fillStyle = '#FFFFFF';
			canvas.fillRect(pos.x, pos.y, this.width, this.height);
			canvas.beginPath();
			canvas.rect(pos.x, pos.y, this.width, this.height);
			canvas.clip();
			canvas.closePath();
			canvas.translate(zeroPosition.x, zeroPosition.y);
			canvas.scale(largeScale, largeScale);
			canvas.beginPath();
			canvas.moveTo(pos.x + -250, pos.y + 0);
			canvas.lineTo(pos.x + 250, pos.y + 0);
			canvas.closePath();
			canvas.stroke();
			canvas.beginPath();
			canvas.moveTo(pos.x + 0, pos.y + -250);
			canvas.lineTo(pos.x + 0, pos.y + 250);
			canvas.closePath();
			canvas.stroke();
			for (var i = 1; i < this.pieces.length; i++) {
				var j = this.pieces[i];
				canvas.beginPath();
				canvas.moveTo(pos.x + j.x, pos.y + j.y);
				canvas.lineTo(pos.x + this.pieces[i - 1].x, pos.y + this.pieces[i - 1].y);
				canvas.stroke();
			}
			var drawRadial;
			for (var i1 = 0; i1 < this.pieces.length; i1++) {
				var j1 = this.pieces[i1];
				if (showImages) {
					var piece = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.pieces[j1.pieceIndex];
					var asset = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.assets[piece.assetIndex];
					if (asset.frames.length > 0) {
						var frm = asset.frames[j1.frameIndex];
						drawRadial = $OurSonic_SonicManager.instance.mainCanvas.context.createRadialGradient(0, 0, 0, 10, 10, 50);
						drawRadial.addColorStop(0, 'white');
						if (selectedPieceIndex === i1) {
							drawRadial.addColorStop(1, 'yellow');
						}
						else {
							drawRadial.addColorStop(1, 'red');
						}
						canvas.fillStyle = drawRadial;
						//var borderSize = 3;
						//   canvas.fillRect(pos.x + j.x - frm.offsetX - borderSize, pos.y + j.y - frm.offsetY - borderSize, frm.width + borderSize * 2, frm.height + borderSize*2);
						frm.drawUI(canvas, $OurSonic_Utility_Point.$ctor1(pos.x + j1.x - frm.offsetX, pos.y + j1.y - frm.offsetY), $OurSonic_Utility_Point.$ctor1(frm.width, frm.height), false, true, true, false, piece.xflip, piece.yflip);
					}
				}
				else {
					drawRadial = $OurSonic_SonicManager.instance.mainCanvas.context.createRadialGradient(0, 0, 0, 10, 10, 50);
					drawRadial.addColorStop(0, 'white');
					if (selectedPieceIndex === i1) {
						drawRadial.addColorStop(1, 'yellow');
					}
					else {
						drawRadial.addColorStop(1, 'red');
					}
					canvas.fillStyle = drawRadial;
					canvas.beginPath();
					canvas.arc(pos.x + j1.x, pos.y + j1.y, 10, 0, Math.PI * 2, true);
					canvas.closePath();
					canvas.fill();
				}
			}
			canvas.restore();
		},
		draw: function(canvas, x, y, framework, instance, showHeightMap) {
			for (var $t1 = 0; $t1 < instance.pieces.length; $t1++) {
				var j = instance.pieces[$t1];
				if (!j.visible) {
					continue;
				}
				var piece = framework.pieces[j.pieceIndex];
				var asset = framework.assets[piece.assetIndex];
				if (asset.frames.length > 0) {
					var frm = asset.frames[j.frameIndex];
					frm.drawUI(canvas, $OurSonic_Utility_Point.$ctor1(x + j.x - frm.offsetX, y + j.y - frm.offsetY), $OurSonic_Utility_Point.$ctor1(frm.width, frm.height), false, showHeightMap, showHeightMap, false, instance.xflip ^ piece.xflip, instance.yflip ^ piece.yflip);
				}
			}
		}
	});
	ss.initClass($OurSonic_Level_Objects_LevelObjectPieceLayoutPiece, $asm, {});
	ss.initClass($OurSonic_Level_Objects_LevelObjectProjectile, $asm, {});
	ss.initClass($OurSonic_Level_Objects_ObjectManager, $asm, {
		init: function() {
		}
	});
	ss.initEnum($OurSonic_Level_Tiles_RotationMode, $asm, { floor: 134, rightWall: 224, ceiling: 314, leftWall: 44 });
	ss.initClass($OurSonic_Level_Tiles_Tile, $asm, {
		draw: function(canvas, pos, xflip, yflip, palette, animationFrame) {
			if (this.$checkGood(canvas, pos, xflip, yflip, palette, animationFrame)) {
				return;
			}
			var j;
			if (ss.isNullOrUndefined(j = this.$getCached(palette, animationFrame, xflip, yflip))) {
				var cx = this.colors.length;
				var cy = this.colors.length;
				j = $OurSonic_Utility_CanvasInformation.create(cx, cy);
				if (pos.x < 0 || pos.y < 0) {
					return;
				}
				var oPos = $OurSonic_Utility_Point.$ctor1(0, 0);
				if (xflip) {
					oPos.x = -this.colors.length;
					j.context.scale(-1, 1);
				}
				if (yflip) {
					oPos.y = -this.colors.length;
					j.context.scale(1, -1);
				}
				var palette_ = $OurSonic_SonicManager.instance.sonicLevel.palette;
				var mx = this.colors.length;
				var my = this.colors[0].length;
				var index_ = (palette + $OurSonic_SonicManager.instance.indexedPalette) % palette_.length;
				var x = oPos.x;
				var y = oPos.y;
				for (var _x = 0; _x < mx; _x++) {
					for (var _y = 0; _y < my; _y++) {
						var colorIndex = this.colors[_x][_y];
						if (colorIndex === 0) {
							continue;
						}
						j.context.drawImage(palette_[index_][colorIndex], x + _x, y + _y);
					}
				}
				this.$setCached(j, palette, animationFrame, xflip, yflip);
			}
			canvas.drawImage(j.canvas, pos.x, pos.y);
			if (this.showOutline) {
				canvas.strokeStyle = '#DD0033';
				canvas.lineWidth = 3;
				canvas.strokeRect(pos.x, pos.y, 8, 8);
			}
		},
		$getCached: function(palette, animationFrame, xflip, yflip) {
			return null;
			var mp = palette + ' ' + animationFrame + ' ' + xflip + ' ' + yflip + ' ';
			if (ss.isValue(this.animatedFrames) && this.animatedFrames.length > 0) {
				var paletteAnimations = $OurSonic_SonicManager.instance.sonicLevel.paletteAnimationIndexes;
				for (var $t1 = 0; $t1 < this.animatedFrames.length; $t1++) {
					var animatedFrame = this.animatedFrames[$t1];
					mp += paletteAnimations[animatedFrame] + ' ';
				}
			}
			return this.$_caches[mp];
		},
		$setCached: function(canvas, palette, animationFrame, xflip, yflip) {
			return;
			var mp = palette + ' ' + animationFrame + ' ' + xflip + ' ' + yflip + ' ';
			if (ss.isValue(this.animatedFrames) && this.animatedFrames.length > 0) {
				var paletteAnimations = $OurSonic_SonicManager.instance.sonicLevel.paletteAnimationIndexes;
				for (var $t1 = 0; $t1 < this.animatedFrames.length; $t1++) {
					var animatedFrame = this.animatedFrames[$t1];
					mp += paletteAnimations[animatedFrame] + ' ';
				}
			}
			this.$_caches[mp] = canvas;
		},
		shouldAnimate: function() {
			return this.isAnimated && this.$canAnimate;
		},
		$checkGood: function(canvas, pos, xflip, yflip, palette, animationFrame) {
			if (!this.isAnimated) {
				if (!this.$canAnimate) {
					return false;
				}
				var an = this.$willAnimate;
				if (this.$willAnimate) {
					var anin = an.animationTileIndex;
					var ind = animationFrame;
					var frame = an.frames[ind];
					if (!frame) {
						frame = an.frames[0];
					}
					var file = $OurSonic_SonicManager.instance.sonicLevel.animatedFiles[an.animationFile];
					var va = file[frame.startingTileIndex + (this.index - anin)];
					if (va) {
						va.draw(canvas, pos, xflip, yflip, palette, animationFrame);
						return true;
					}
					return false;
				}
				for (var $t1 = 0; $t1 < $OurSonic_SonicManager.instance.sonicLevel.animations.length; $t1++) {
					var acn = $OurSonic_SonicManager.instance.sonicLevel.animations[$t1];
					var anin1 = acn.animationTileIndex;
					var num = acn.numberOfTiles;
					if (this.index >= anin1 && this.index < anin1 + num) {
						this.$willAnimate = acn;
						var ind1 = animationFrame;
						var frame1 = acn.frames[ind1];
						if (!frame1) {
							frame1 = acn.frames[0];
						}
						var file1 = acn.getAnimationFile();
						var va1 = file1[frame1.startingTileIndex + (this.index - anin1)];
						if (va1) {
							va1.draw(canvas, pos, xflip, yflip, palette, animationFrame);
							return true;
						}
					}
				}
			}
			this.$canAnimate = false;
			return false;
		},
		$changeColor: function(x, y, color) {
			this.colors[x][y] = color;
			this.sprites = [];
		},
		getAllPaletteIndexes: function() {
			if (!this.curPaletteIndexes) {
				var d = [];
				for (var _x = 0; _x < this.colors.length; _x++) {
					var color = this.colors[_x];
					for (var _y = 0; _y < color.length; _y++) {
						var col = { $: color[_y] };
						if (col.$ === 0) {
							continue;
						}
						if (Enumerable.from(d).all(ss.mkdel({ col: col }, function(a) {
							return a !== this.col.$;
						}))) {
							ss.add(d, col.$);
						}
					}
				}
				this.curPaletteIndexes = d.slice(0);
			}
			return this.curPaletteIndexes;
		},
		clearCache: function() {
			this.curPaletteIndexes = null;
		}
	});
	ss.initClass($OurSonic_Level_Tiles_TileCacheBlock, $asm, {});
	ss.initEnum($OurSonic_Level_Tiles_TileCacheBlockType, $asm, { block: 0, tilePiece: 1 });
	ss.initClass($OurSonic_Level_Tiles_TileChunk, $asm, {
		drawUI: function(canvas, position, scale, layer) {
			var $t1 = new $OurSonic_Utility_CanvasHandler(canvas);
			try {
				canvas.translate(position.x, position.y);
				canvas.scale(scale.x, scale.y);
				var pieceWidth = 16;
				var pieceHeight = 16;
				var isBack = layer === 0;
				//for building no aniamtion cache
				this.$drawOld(canvas, $OurSonic_Utility_Point.$ctor1(0, 0), layer, pieceWidth, pieceHeight, isBack, false, null, null);
			}
			finally {
				if (ss.isValue($t1)) {
					$t1.dispose();
				}
			}
		},
		clearCache: function() {
			this.$layerCacheBlocks = new Array(2);
			this.$neverAnimateCache = new Array(2);
		},
		getBlockAt: function(x, y) {
			return this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)].getTilePiece();
		},
		setBlockAt: function(x, y, tp) {
			if (this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)].setTilePiece(tp)) {
				this.clearCache();
			}
		},
		getTilePiece: function(x, y) {
			return this.tilePieces[ss.Int32.div(x, 16)][ss.Int32.div(y, 16)];
		},
		onlyBackground: function() {
			if (!ss.isValue(this.isOnlyBackground)) {
				var tpl = this.tilePieces.length;
				var tph = this.tilePieces[0].length;
				for (var i = 0; i < tpl; i++) {
					for (var j = 0; j < tph; j++) {
						var tilePiece = this.tilePieces[i][j].getTilePiece();
						if (ss.isValue(tilePiece) && !tilePiece.onlyBackground()) {
							return ss.unbox(this.isOnlyBackground = false);
						}
					}
				}
				this.isOnlyBackground = true;
				return ss.unbox(this.isOnlyBackground);
			}
			return ss.unbox(this.isOnlyBackground);
		},
		onlyForeground: function() {
			if (!ss.isValue(this.isOnlyForeground)) {
				var tpl = this.tilePieces.length;
				var tph = this.tilePieces[0].length;
				for (var i = 0; i < tpl; i++) {
					for (var j = 0; j < tph; j++) {
						var tilePiece = this.tilePieces[i][j].getTilePiece();
						if (ss.isValue(tilePiece) && !tilePiece.onlyForeground()) {
							return ss.unbox(this.isOnlyForeground = false);
						}
					}
				}
				this.isOnlyForeground = true;
				return ss.unbox(this.isOnlyForeground);
			}
			return ss.unbox(this.isOnlyForeground);
		},
		isEmpty: function() {
			if (!ss.isValue(this.empty)) {
				var tpl = this.tilePieces.length;
				var tph = this.tilePieces[0].length;
				for (var i = 0; i < tpl; i++) {
					for (var j = 0; j < tph; j++) {
						var r = this.tilePieces[i][j];
						if (ss.isValue(r) && r.block !== 0) {
							return ss.unbox(this.empty = false);
						}
					}
				}
				this.empty = true;
			}
			return ss.unbox(this.empty);
		},
		neverAnimates: function() {
			var $state = 0, len1, len2, nothing, i, j, pm;
			$sm1:
			for (;;) {
				switch ($state) {
					case 0: {
						if (!ss.isValue(this.$myNeverAnimate)) {
							len1 = this.tilePieces.length;
							len2 = this.tilePieces[0].length;
							nothing = true;
							for (i = 0; i < len1; i++) {
								for (j = 0; j < len2; j++) {
									pm = this.tilePieces[i][j].getTilePiece();
									if (ss.isNullOrUndefined(pm)) {
										continue;
									}
									if (this.animated && this.animated[j * len1 + i] || pm.get_animatedFrames().length > 0) {
										nothing = false;
										$state = 2;
										continue $sm1;
									}
								}
							}
							$state = 2;
							continue $sm1;
						}
						$state = 1;
						continue $sm1;
					}
					case 2: {
						this.$myNeverAnimate = nothing;
						$state = 1;
						continue $sm1;
					}
					case 1: {
						return ss.unbox(this.$myNeverAnimate);
					}
					default: {
						break $sm1;
					}
				}
			}
		},
		draw: function(canvas, position, layer) {
			var neverAnimates = this.neverAnimates();
			if (ss.isNullOrUndefined(this.$layerCacheBlocks[layer])) {
				this.$layerCacheBlocks[layer] = this.buildCacheBlock(layer);
			}
			{
				var $t3 = new $OurSonic_Utility_CanvasHandler(canvas);
				try {
					if (ss.isValue(this.$neverAnimateCache[layer])) {
						this.$drawFullChunk(canvas, position, layer);
						return;
					}
					var oldCanvas = null;
					var oldPoint = null;
					var pieceWidth = 16;
					var pieceHeight = 16;
					var isBack = layer === 0;
					if (neverAnimates) {
						oldCanvas = canvas;
						this.$neverAnimateCache[layer] = $OurSonic_Utility_CanvasInformation.create($OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide * pieceWidth, $OurSonic_Level_Tiles_TileChunk.$numOfPiecesLong * pieceHeight);
						canvas = this.$neverAnimateCache[layer].context;
						oldPoint = $OurSonic_Utility_Point.$ctor(position);
						$OurSonic_Utility_Point.set(position, 0, 0);
						//for building no aniamtion cache
						this.$drawOld(canvas, position, layer, pieceWidth, pieceHeight, isBack, neverAnimates, oldPoint, oldCanvas);
						return;
					}
					var $t1 = this.$layerCacheBlocks[layer];
					for (var $t2 = 0; $t2 < $t1.length; $t2++) {
						var tileCacheBlock = $t1[$t2];
						switch (tileCacheBlock.type) {
							case 0: {
								this.$drawBlock(canvas, position, tileCacheBlock);
								break;
							}
							case 1: {
								this.$drawTilePiece(canvas, position, layer, tileCacheBlock, isBack);
								break;
							}
						}
					}
				}
				finally {
					if (ss.isValue($t3)) {
						$t3.dispose();
					}
				}
			}
		},
		$drawOld: function(canvas, position, layer, pieceWidth, pieceHeight, isBack, neverAnimates, oldPoint, oldCanvas) {
			var posX = position.x;
			var posY = position.y;
			var curKey = 0;
			//pieceY * numOfPiecesWide + pieceX              VV
			for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.$numOfPiecesLong; pieceY++) {
				curKey = pieceY * $OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide;
				for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide; pieceX++) {
					curKey += pieceX;
					this.$drawIt(canvas, layer, this.tilePieces[pieceX][pieceY], isBack, curKey, posX + pieceX * pieceWidth, posY + pieceY * pieceHeight);
				}
			}
			if (neverAnimates) {
				position = oldPoint;
				canvas = oldCanvas;
				canvas.drawImage(this.$neverAnimateCache[layer].canvas, position.x, position.y);
			}
		},
		$drawTilePiece: function(canvas, position, layer, tileCacheBlock, isBack) {
			this.$drawIt(canvas, layer, tileCacheBlock.tilePieceInfo, isBack, tileCacheBlock.animatedKey, position.x + tileCacheBlock.xPos, position.y + tileCacheBlock.yPos);
			//
			//                        canvas.Save();
			//
			//                        canvas.StrokeStyle = "green";
			//
			//                        canvas.StrokeRect(position.X * scale.X * pieceWidth, position.Y * scale.Y * pieceHeight, 16 * scale.X, 16 * scale.Y);
			//
			//                        canvas.Restore();
		},
		$drawBlock: function(canvas, position, tileCacheBlock) {
			canvas.drawImage(tileCacheBlock.block.canvas, position.x, position.y);
			var areas = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas();
			if (ss.isValue(areas.tileChunkArea) && ss.isValue(areas.tileChunkArea.data) && areas.tileChunkArea.data.index === this.index) {
				canvas.save();
				canvas.strokeStyle = 'yellow';
				canvas.lineWidth = 2;
				canvas.strokeRect(position.x, position.y, tileCacheBlock.block.canvas.width, tileCacheBlock.block.canvas.height);
				canvas.restore();
			}
		},
		$drawFullChunk: function(canvas, position, layer) {
			canvas.drawImage(this.$neverAnimateCache[layer].canvas, position.x, position.y);
			var areas = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas();
			if (ss.isValue(areas.tileChunkArea) && ss.isValue(areas.tileChunkArea.data) && areas.tileChunkArea.data.index === this.index) {
				canvas.save();
				canvas.strokeStyle = 'yellow';
				canvas.lineWidth = 2;
				canvas.strokeRect(position.x, position.y, this.$neverAnimateCache[layer].canvas.width, this.$neverAnimateCache[layer].canvas.height);
				canvas.restore();
			}
			//
			//                        canvas.Save();
			//
			//                        canvas.StrokeStyle = "red";
			//
			//                        canvas.StrokeRect(position.X, position.Y, 128 , 128);
			//
			//                        canvas.Restore();
		},
		$drawIt: function(canvas, layer, pieceInfo, isBack, animatedKey, pointx, pointy) {
			var piece = pieceInfo.getTilePiece();
			if ((isBack ? piece.onlyForeground() : piece.onlyBackground())) {
				return;
			}
			var animatedIndex = 0;
			var animation = this.animated[animatedKey];
			if (this.animated && animation) {
				animatedIndex = animation.lastAnimatedIndex;
			}
			this.$myLocalPoint.x = pointx;
			this.$myLocalPoint.y = pointy;
			piece.draw(canvas, this.$myLocalPoint, layer, pieceInfo.xFlip, pieceInfo.yFlip, animatedIndex);
			//canvas.StrokeStyle = "#FFF";
			//canvas.StrokeRect(position.X + pieceX * 16 * scale.X, position.Y + pieceY * 16 * scale.Y, scale.X * 16, scale.Y * 16);
		},
		buildCacheBlock: function(layer) {
			var tilePieces = [];
			var block = null;
			if (ss.isValue(this.$neverAnimateCache[layer])) {
				return [];
			}
			var pieceWidth = 16;
			var pieceHeight = 16;
			if (this.neverAnimates()) {
				return [];
			}
			var isBack = layer === 0;
			for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide; pieceX++) {
				for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.$numOfPiecesLong; pieceY++) {
					var cacheBlock = this.$buildCacheBlock(layer, pieceWidth, pieceHeight, this.tilePieces[pieceX][pieceY], isBack, pieceX, pieceY, block);
					switch (cacheBlock.type) {
						case 0: {
							block = cacheBlock;
							break;
						}
						case 1: {
							ss.add(tilePieces, cacheBlock);
							break;
						}
					}
				}
			}
			var tileCacheBlocks = ss.arrayClone(tilePieces);
			if (ss.isValue(block)) {
				ss.add(tileCacheBlocks, block);
			}
			return tileCacheBlocks;
		},
		$buildCacheBlock: function(layer, pieceWidth, pieceHeight, pieceInfo, isBack, pieceX, pieceY, oldCacheBlock) {
			//if (isBack ? (piece.onlyForeground) : (piece.onlyBackground)) return null;
			var piece = pieceInfo.getTilePiece();
			if (ss.isNullOrUndefined(piece)) {
				return oldCacheBlock;
			}
			var animatedIndex = 0;
			var animation = this.animated[pieceY * $OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide + pieceX];
			var cacheBlockNeeded = false;
			var shouldAnimate = piece.shouldAnimate();
			if (this.animated && animation) {
				animatedIndex = animation.lastAnimatedIndex;
			}
			else if (piece.get_animatedFrames().length === 0 && (!shouldAnimate || ss.unbox(this.$myNeverAnimate))) {
				cacheBlockNeeded = true;
			}
			if (cacheBlockNeeded) {
				var internalPoint = $OurSonic_Utility_Point.$ctor1(pieceX * pieceWidth, pieceY * pieceHeight);
				if (ss.isNullOrUndefined(oldCacheBlock)) {
					oldCacheBlock = $OurSonic_Level_Tiles_TileCacheBlock.$ctor(0);
					oldCacheBlock.block = $OurSonic_Utility_CanvasInformation.create(pieceWidth * 8, pieceHeight * 8);
				}
				oldCacheBlock.block.context.save();
				piece.draw(oldCacheBlock.block.context, internalPoint, layer, pieceInfo.xFlip, pieceInfo.yFlip, animatedIndex);
				//                oldCacheBlock.Block.Context.FillStyle = oldCacheBlock.Color;
				//                oldCacheBlock.Block.Context.FillRect(internalPoint.X, internalPoint.Y, 16 * scale.X, 16 * scale.Y);
				oldCacheBlock.block.context.restore();
				return oldCacheBlock;
			}
			else {
				var $t1 = $OurSonic_Level_Tiles_TileCacheBlock.$ctor(1);
				$t1.tilePieceInfo = pieceInfo;
				$t1.xPos = pieceX * pieceWidth;
				$t1.yPos = pieceY * pieceHeight;
				$t1.animatedKey = pieceY * $OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide + pieceX;
				return $t1;
			}
		},
		animatedTick: function() {
			var $t1 = new ss.ObjectEnumerator(this.animated);
			try {
				while ($t1.moveNext()) {
					var an = $t1.current();
					var anni = an.value;
					if (!anni.lastAnimatedFrame) {
						anni.lastAnimatedFrame = 0;
						anni.lastAnimatedIndex = 0;
					}
					if (anni.frames[anni.lastAnimatedIndex].ticks === 0 || ss.Nullable$1.ge(ss.Nullable$1.sub($OurSonic_SonicManager.instance.drawTickCount, anni.lastAnimatedFrame), ((anni.automatedTiming > 0) ? anni.automatedTiming : anni.frames[anni.lastAnimatedIndex].ticks))) {
						anni.lastAnimatedFrame = $OurSonic_SonicManager.instance.drawTickCount;
						anni.lastAnimatedIndex = (anni.lastAnimatedIndex + 1) % anni.frames.length;
					}
				}
			}
			finally {
				$t1.dispose();
			}
		}
	});
	ss.initClass($OurSonic_Level_Tiles_TileItem, $asm, {
		getTile: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.getTile(this._Tile);
		}
	});
	ss.initClass($OurSonic_Level_Tiles_TilePiece, $asm, {
		get_animatedFrames: function() {
			return this.$1$AnimatedFramesField;
		},
		set_animatedFrames: function(value) {
			this.$1$AnimatedFramesField = value;
		},
		init: function() {
			this.onlyBackground();
			this.onlyForeground();
		},
		clearCache: function() {
			this.image = {};
		},
		onlyBackground: function() {
			if (this.$onlyBackgroundSet) {
				return this.$onlyBackground;
			}
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var mj = this.tiles[$t1];
				if (mj) {
					if (mj.priority) {
						this.$onlyBackgroundSet = true;
						return this.$onlyBackground = false;
					}
				}
			}
			this.$onlyBackgroundSet = true;
			return this.$onlyBackground = true;
		},
		onlyForeground: function() {
			if (this.$onlyForegroundSet) {
				return this.$onlyForeground;
			}
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var mj = this.tiles[$t1];
				if (mj) {
					if (!mj.priority) {
						this.$onlyForegroundSet = true;
						return this.$onlyForeground = false;
					}
				}
			}
			this.$onlyForegroundSet = true;
			return this.$onlyForeground = true;
		},
		draw: function(canvas, position, layer, xFlip, yFlip, animatedIndex) {
			var drawOrderIndex = 0;
			drawOrderIndex = (xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3));
			//
			//
			//
			//
			//            var i = 0;
			//
			//
			//
			//
			//            
			//
			//
			//
			//
			//            var localPoint=new Point(0,0);
			//
			//
			//
			//
			//            
			//
			//
			//
			//
			//            
			//
			//
			//
			//
			//            foreach (TileItem t in Tiles.Array())
			//
			//
			//
			//
			//            {
			//
			//
			//
			//
			//            var mj = t;
			//
			//
			//
			//
			//            var tile = t.GetTile();
			//
			//
			//
			//
			//            if (tile.Truthy())
			//
			//
			//
			//
			//            {
			//
			//
			//
			//
			//            if (mj.Priority == (layer == 1))
			//
			//
			//
			//
			//            {
			//
			//
			//
			//
			//            var _xf = xFlip ^ mj.XFlip;
			//
			//
			//
			//
			//            var _yf = yFlip ^ mj.YFlip;
			//
			//
			//
			//
			//            var df = DrawInfo[DrawOrder[drawOrderIndex][i]];
			//
			//
			//
			//
			//            localPoint.X = position.X+ df[0] * 8;
			//
			//
			//
			//
			//            localPoint.Y = position.Y + df[1] * 8;
			//
			//
			//
			//
			//            tile.Draw(canvas, localPoint, _xf, _yf, mj.Palette,  animatedIndex);
			//
			//
			//
			//
			//            }
			//
			//
			//
			//
			//            }
			//
			//
			//
			//
			//            i++;
			//
			//
			//
			//
			//            }
			var fd = this.$getCache(layer, drawOrderIndex, animatedIndex);
			if (!fd) {
				fd = this.$buildCache(layer, xFlip, yFlip, animatedIndex, drawOrderIndex);
			}
			this.$drawIt(canvas, fd, position);
			return true;
		},
		shouldAnimate: function() {
			if (ss.isNullOrUndefined(this.$shouldAnimate)) {
				for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
					var t = this.tiles[$t1];
					var mj = t.getTile();
					if (mj) {
						if (mj.shouldAnimate()) {
							return ss.unbox(this.$shouldAnimate = true);
						}
					}
				}
				this.$shouldAnimate = false;
			}
			return ss.unbox(this.$shouldAnimate);
		},
		$buildCache: function(layer, xFlip, yFlip, animatedIndex, drawOrderIndex) {
			var fd;
			var ac = $OurSonic_Utility_CanvasInformation.create(16, 16);
			var sX = 8;
			var sY = 8;
			var i = 0;
			var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var t = this.tiles[$t1];
				var mj = t;
				var tile = t.getTile();
				if (tile) {
					if (mj.priority === (layer === 1)) {
						var _xf = xFlip ^ mj.xFlip;
						var _yf = yFlip ^ mj.yFlip;
						var df = $OurSonic_Level_Tiles_TilePiece.$drawInfo[$OurSonic_Level_Tiles_TilePiece.$drawOrder[drawOrderIndex][i]];
						localPoint.x = df[0] * sX;
						localPoint.y = df[1] * sY;
						tile.draw(ac.context, localPoint, _xf, _yf, mj.palette, animatedIndex);
					}
				}
				i++;
			}
			//            ac.Context.StrokeStyle = "#FF593F";
			//            ac.Context.LineWidth = 1;
			//            ac.Context.StrokeRect(0, 0, 2*8 * SonicManager.Instance.Scale.X, 2*8 * SonicManager.Instance.Scale.Y);
			fd = ac.canvas;
			this.$setCache(layer, drawOrderIndex, animatedIndex, fd);
			return fd;
		},
		$setCache: function(layer, drawOrder, animationFrame, image) {
			var palAn = $OurSonic_SonicManager.instance.sonicLevel.paletteAnimationIndexes;
			var val = (drawOrder << 8) + (animationFrame << 20) + (layer + 1 << 24);
			//okay
			if (this.get_animatedFrames().length > 0) {
				for (var index = 0; index < this.get_animatedFrames().length; index++) {
					var animatedFrame = this.get_animatedFrames()[index];
					val += palAn[animatedFrame] + ' ';
				}
			}
			this.image[val] = image;
		},
		$getCache: function(layer, drawOrder, animationFrame) {
			var palAn = $OurSonic_SonicManager.instance.sonicLevel.paletteAnimationIndexes;
			var val = (drawOrder << 8) + (animationFrame << 20) + (layer + 1 << 24);
			//okay
			if (this.get_animatedFrames().length > 0) {
				var $t1 = this.get_animatedFrames();
				for (var $t2 = 0; $t2 < $t1.length; $t2++) {
					var animatedFrame = $t1[$t2];
					val += palAn[animatedFrame] + ' ';
				}
			}
			return ss.cast(this.image[val], Element);
		},
		$drawIt: function(canvas, fd, position) {
			canvas.drawImage(fd, position.x, position.y);
			var areas = $OurSonic_SonicManager.instance.uiManager.get_uiManagerAreas();
			if (ss.isValue(areas.tilePieceArea) && ss.isValue(areas.tilePieceArea.data) && areas.tilePieceArea.data.index === this.index) {
				canvas.save();
				canvas.strokeStyle = 'light green';
				canvas.lineWidth = 2;
				canvas.strokeRect(position.x, position.y, fd.width, fd.height);
				canvas.restore();
			}
		},
		getLayer1Angles: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.angles[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes1[this.index]];
		},
		getLayer2Angles: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.angles[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes2[this.index]];
		},
		getLayer1HeightMaps: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.heightMaps[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes1[this.index]];
		},
		getLayer2HeightMaps: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.heightMaps[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes2[this.index]];
		}
	});
	ss.initClass($OurSonic_Level_Tiles_TilePieceInfo, $asm, {
		getTilePiece: function() {
			if (ss.isNullOrUndefined(this.$block)) {
				this.$block = $OurSonic_SonicManager.instance.sonicLevel.getTilePiece(this.block);
			}
			return this.$block;
		},
		setTilePiece: function(tp) {
			if (this.block === tp.index) {
				return false;
			}
			this.block = tp.index;
			this.$block = null;
			return true;
		},
		getLayer1Angles: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.angles[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes1[this.block]];
		},
		getLayer2Angles: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.angles[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes2[this.block]];
		},
		getLayer1HeightMaps: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.heightMaps[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes1[this.block]];
		},
		getLayer2HeightMaps: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.heightMaps[$OurSonic_SonicManager.instance.sonicLevel.collisionIndexes2[this.block]];
		}
	});
	ss.initClass($OurSonic_Sonic_Sensor, $asm, {
		$checkCollisionLineWrap: function(x1, x2, y1, y2, ignoreSolid) {
			var _x = ss.Int32.div(x1, 128);
			var _y = $OurSonic_Utility_Help.mod(ss.Int32.div(y1, 128), $OurSonic_SonicManager.instance.sonicLevel.levelHeight);
			var tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x, _y);
			this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
			var curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
			var cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
			var __x = x1 - _x * 128;
			var __y = y1 - _y * 128;
			var i = 0;
			var length = 0;
			if (y1 === y2) {
				if (Math.max(x1, x2) > $OurSonic_SonicManager.instance.sonicLevel.levelWidth * 128) {
					this.$__currentM.value = $OurSonic_SonicManager.instance.sonicLevel.levelWidth * 128 - 20;
					this.$__currentM.angle = 255;
					return this.$__currentM;
				}
				if (x1 < x2) {
					length = x2 - x1;
					if (curh[__x][__y] >= 2) {
						for (i = 0; i < 256; i++) {
							while (true) {
								if (__x - i < 0) {
									if (_x - 1 < 0) {
										this.$__currentM.value = 0;
										this.$__currentM.angle = 255;
										return this.$__currentM;
									}
									tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x - 1, _y);
									this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
									curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
									cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
									__x += 128;
								}
								else {
									break;
								}
							}
							if (curh[__x - i][__y] >= 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 - i, y1, this.letter)) {
								//            if (!( ( curh[( __x - i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
								//            continue;
								this.$__currentM.value = x1 - i;
								this.$__currentM.angle = cura[ss.Int32.div(__x - i, 16)][ss.Int32.div(__y, 16)];
								return this.$__currentM;
							}
						}
					}
					for (i = 0; i < length; i++) {
						while (true) {
							if (__x + i >= 128) {
								//
								//                                if (_x + 1 >= SonicManager.Instance.SonicLevel.LevelWidth)
								//
								//                                {
								//
								//                                this.__currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128;
								//
								//                                this.__currentM.Angle = 0xFF;
								//
								//                                return this.__currentM;
								//
								//                                }
								tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x + 1, _y);
								this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
								curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
								cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
								__x -= 128;
							}
							else {
								break;
							}
						}
						if (curh[__x + i][__y] >= 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 + i, y1, this.letter)) {
							//if (!( ( curh[( __x + i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//continue;
							this.$__currentM.value = x1 + i;
							this.$__currentM.angle = cura[ss.Int32.div(__x + i, 16)][ss.Int32.div(__y, 16)];
							return this.$__currentM;
						}
					}
				}
				else {
					length = x1 - x2;
					if (curh[__x][__y] >= 2) {
						for (i = 0; i < 256; i++) {
							while (true) {
								if (__x + i >= 128) {
									//
									//                                    if (_x + 1 >= SonicManager.Instance.SonicLevel.LevelWidth)
									//
									//                                    {
									//
									//                                    this.__currentM.Value = SonicManager.Instance.SonicLevel.LevelWidth * 128;
									//
									//                                    this.__currentM.Angle = 0xFF;
									//
									//                                    return this.__currentM;
									//
									//                                    }
									tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x + 1, _y);
									this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
									curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
									cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
									__x -= 128;
								}
								else {
									break;
								}
							}
							if (curh[__x + i][__y] >= 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 + i, y1, this.letter)) {
								//    if (!( ( curh[( __x + i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
								//    continue;
								this.$__currentM.value = x1 + i;
								this.$__currentM.angle = cura[ss.Int32.div(__x + i, 16)][ss.Int32.div(__y, 16)];
								return this.$__currentM;
							}
						}
					}
					for (i = 0; i < length; i++) {
						while (true) {
							if (__x - i < 0) {
								if (_x - 1 < 0) {
									this.$__currentM.value = 0;
									this.$__currentM.angle = 255;
									return this.$__currentM;
								}
								tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x - 1, _y);
								this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
								curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
								cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
								__x += 128;
							}
							else {
								break;
							}
						}
						if (curh[__x - i][__y] >= 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1 - i, y1, this.letter)) {
							//          if (!( ( curh[( __x - i )][__y] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//          continue;
							this.$__currentM.value = x1 - i;
							this.$__currentM.angle = cura[ss.Int32.div(__x - i, 16)][ss.Int32.div(__y, 16)];
							return this.$__currentM;
						}
					}
				}
			}
			else {
				//top to bottom 
				if (y1 < y2) {
					length = y2 - y1;
					if (curh[__x][__y] >= 2) {
						for (i = 0; i < 256; i++) {
							while (true) {
								if (__y - i < 0) {
									tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x, $OurSonic_Utility_Help.mod(_y - 1, $OurSonic_SonicManager.instance.sonicLevel.levelHeight));
									this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
									curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
									cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
									__y += 128;
								}
								else {
									break;
								}
							}
							if (curh[__x][__y - i] > 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 - i, this.letter)) {
								//
								//                                if (!( ( curh[__x][__y - i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) )) {
								//
								//                                Help.Debugger();
								//
								//                                continue;
								//
								//                                }
								this.$__currentM.value = y1 - i;
								this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y - i, 16)];
								return this.$__currentM;
							}
						}
					}
					for (i = 0; i < length; i++) {
						while (true) {
							if (__y + i >= 128) {
								tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x, (_y + 1) % $OurSonic_SonicManager.instance.sonicLevel.levelHeight);
								this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
								curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
								cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
								__y -= 128;
							}
							else {
								break;
							}
						}
						if (curh[__x][__y + i] >= 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 + i, this.letter)) {
							if (curh[__x][__y + i] === 1 && $OurSonic_SonicManager.instance.sonicToon.inAir && $OurSonic_SonicManager.instance.sonicToon.ysp < 0) {
								continue;
							}
							//
							//                            if (!( ( curh[__x][__y + i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//
							//                            {
							//
							//                            Help.Debugger();
							//
							//                            continue;
							//
							//                            }
							this.$__currentM.value = y1 + i;
							this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y + i, 16)];
							return this.$__currentM;
						}
					}
				}
				else {
					length = y1 - y2;
					if (curh[__x][__y] >= 2) {
						for (i = 0; i < 256; i++) {
							while (true) {
								if (__y + i >= 128) {
									tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x, (_y + 1) % $OurSonic_SonicManager.instance.sonicLevel.levelHeight);
									this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
									curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
									cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
									__y -= 128;
								}
								else {
									break;
								}
							}
							if (curh[__x][__y + i] >= 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 + i, this.letter)) {
								//
								//                                if (!( ( curh[__x][__y + i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
								//
								//                                {
								//
								//                                Help.Debugger();
								//
								//                                continue;
								//
								//                                }
								this.$__currentM.value = y1 + i;
								this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y + i, 16)];
								return this.$__currentM;
							}
						}
					}
					for (i = 0; i < length; i++) {
						while (true) {
							if (__y - i < 0) {
								tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x, $OurSonic_Utility_Help.mod(_y - 1, $OurSonic_SonicManager.instance.sonicLevel.levelHeight));
								this.$buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
								curh = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.heightBlocks1 : tc.heightBlocks2);
								cura = ($OurSonic_SonicManager.instance.sonicLevel.curHeightMap ? tc.angleMap1 : tc.angleMap2);
								__y += 128;
							}
							else {
								break;
							}
						}
						if (curh[__x][__y - i] > 1 || $OurSonic_SonicManager.instance.sonicToon.checkCollisionWithObjects(x1, y1 + i, this.letter)) {
							//                            if (!( ( curh[__x][__y - i] < (Solidity) 3 || ( Letter == "a" || Letter == "b" ) ) ))
							//                            {
							//                            Help.Debugger();
							//                            continue;
							//                            }
							this.$__currentM.value = y1 - i;
							this.$__currentM.angle = cura[ss.Int32.div(__x, 16)][ss.Int32.div(__y - i, 16)];
							return this.$__currentM;
						}
					}
				}
			}
			return null;
		},
		$buildChunk: function(chunk, isLayerOne) {
			if (isLayerOne) {
				if (chunk.heightBlocks1) {
					return;
				}
				var hb1 = chunk.heightBlocks1 = new Array(128);
				var ab1 = chunk.angleMap1 = new Array(8);
				for (var _1 = 0; _1 < 128; _1++) {
					hb1[_1] = new Array(128);
				}
				for (var _11 = 0; _11 < 8; _11++) {
					ab1[_11] = new Array(8);
				}
				for (var _y = 0; _y < 8; _y++) {
					for (var _x = 0; _x < 8; _x++) {
						var tp = chunk.tilePieces[_x][_y];
						ab1[_x][_y] = tp.getLayer1Angles();
						if (!(ab1[_x][_y] === 0 || ab1[_x][_y] === 255 || ab1[_x][_y] === 1)) {
							if (tp.xFlip) {
								if (tp.yFlip) {
									ab1[_x][_y] = 192 - ab1[_x][_y] + 192;
									ab1[_x][_y] = 128 - ab1[_x][_y] + 128;
								}
								else {
									ab1[_x][_y] = 128 - ab1[_x][_y] + 128;
								}
							}
							else if (tp.yFlip) {
								ab1[_x][_y] = 192 - ab1[_x][_y] + 192;
							}
							else {
								ab1[_x][_y] = ab1[_x][_y];
							}
						}
						var __x = 0;
						var __y = 0;
						var heightMask = tp.getLayer1HeightMaps();
						var heightMaskItems = null;
						if (ss.isNullOrUndefined(heightMask)) {
							continue;
						}
						var mj;
						if (ss.isValue(heightMask.get_full())) {
							mj = (!ss.unbox(heightMask.get_full()) ? 0 : tp.solid1);
							for (__y = 0; __y < 16; __y++) {
								for (__x = 0; __x < 16; __x++) {
									hb1[_x * 16 + __x][_y * 16 + __y] = mj;
								}
							}
						}
						else {
							heightMaskItems = heightMask.items;
						}
						for (__y = 0; __y < 16; __y++) {
							for (__x = 0; __x < 16; __x++) {
								var jx = 0;
								var jy = 0;
								if (tp.xFlip) {
									if (tp.yFlip) {
										jx = 15 - __x;
										jy = 15 - __y;
									}
									else {
										jx = 15 - __x;
										jy = __y;
									}
								}
								else if (tp.yFlip) {
									jx = __x;
									jy = 15 - __y;
								}
								else {
									jx = __x;
									jy = __y;
								}
								if (ss.isNullOrUndefined(heightMask.get_full())) {
									switch (tp.solid1) {
										case 0: {
											hb1[_x * 16 + jx][_y * 16 + jy] = 0;
											break;
										}
										case 1:
										case 2:
										case 3: {
											hb1[_x * 16 + jx][_y * 16 + jy] = ($OurSonic_Level_HeightMap.itemsGood(heightMaskItems, __x, __y) ? tp.solid1 : 0);
											break;
										}
									}
								}
							}
						}
					}
				}
			}
			else {
				if (chunk.heightBlocks2) {
					return;
				}
				var hb2 = chunk.heightBlocks2 = new Array(128);
				var ab2 = chunk.angleMap2 = new Array(8);
				for (var _12 = 0; _12 < 128; _12++) {
					hb2[_12] = new Array(128);
				}
				for (var _13 = 0; _13 < 8; _13++) {
					ab2[_13] = new Array(8);
				}
				for (var _y1 = 0; _y1 < 8; _y1++) {
					for (var _x1 = 0; _x1 < 8; _x1++) {
						var tp1 = chunk.tilePieces[_x1][_y1];
						ab2[_x1][_y1] = tp1.getLayer2Angles();
						if (!(ab2[_x1][_y1] === 0 || ab2[_x1][_y1] === 255 || ab2[_x1][_y1] === 1)) {
							if (tp1.xFlip) {
								if (tp1.yFlip) {
									ab2[_x1][_y1] = 192 - ab2[_x1][_y1] + 192;
									ab2[_x1][_y1] = 128 - ab2[_x1][_y1] + 128;
								}
								else {
									ab2[_x1][_y1] = 128 - ab2[_x1][_y1] + 128;
								}
							}
							else if (tp1.yFlip) {
								ab2[_x1][_y1] = 192 - ab2[_x1][_y1] + 192;
							}
							else {
								ab2[_x1][_y1] = ab2[_x1][_y1];
							}
						}
						var __x1;
						var __y1;
						var hd2 = tp1.getLayer2HeightMaps();
						if (ss.isNullOrUndefined(hd2)) {
							continue;
						}
						var mj1;
						var hd2Items = null;
						if (ss.isValue(hd2.get_full())) {
							mj1 = ((hd2.get_full() === false) ? 0 : tp1.solid2);
							for (__y1 = 0; __y1 < 16; __y1++) {
								for (__x1 = 0; __x1 < 16; __x1++) {
									hb2[_x1 * 16 + __x1][_y1 * 16 + __y1] = mj1;
								}
							}
						}
						else {
							hd2Items = hd2.items;
						}
						for (__y1 = 0; __y1 < 16; __y1++) {
							for (__x1 = 0; __x1 < 16; __x1++) {
								var jx1 = 0;
								var jy1 = 0;
								if (tp1.xFlip) {
									if (tp1.yFlip) {
										jx1 = 15 - __x1;
										jy1 = 15 - __y1;
									}
									else {
										jx1 = 15 - __x1;
										jy1 = __y1;
									}
								}
								else if (tp1.yFlip) {
									jx1 = __x1;
									jy1 = 15 - __y1;
								}
								else {
									jx1 = __x1;
									jy1 = __y1;
								}
								if (ss.isNullOrUndefined(hd2.get_full())) {
									switch (tp1.solid2) {
										case 0: {
											hb2[_x1 * 16 + jx1][_y1 * 16 + jy1] = 0;
											break;
										}
										case 1:
										case 2:
										case 3: {
											hb2[_x1 * 16 + jx1][_y1 * 16 + jy1] = ($OurSonic_Level_HeightMap.itemsGood(hd2Items, __x1, __y1) ? tp1.solid2 : 0);
											break;
										}
									}
								}
								//imap[(x * 128 + _x * 16 + __x) + (y * 128 + _y * 16 + __y) * (SonicManager.Instance.SonicLevel.LevelWidth)] = tp.heightMask.angle;
							}
						}
					}
				}
			}
		},
		draw: function(canvas, character, sensorResult) {
			var x = $OurSonic_Utility_Help.floor(character.x) - $OurSonic_SonicManager.instance.windowLocation.x;
			var y = $OurSonic_Utility_Help.floor(character.y) - $OurSonic_SonicManager.instance.windowLocation.y;
			canvas.beginPath();
			if (sensorResult && sensorResult.chosen) {
				canvas.strokeStyle = '#FFF76D';
				canvas.lineWidth = 4;
			}
			else {
				canvas.strokeStyle = this.color;
				canvas.lineWidth = 2;
			}
			switch (character.mode) {
				case 134: {
					canvas.moveTo(x + this.x1, y + this.y1);
					canvas.lineTo(x + this.x2, y + this.y2);
					break;
				}
				case 44: {
					canvas.moveTo(x - this.y1, y + this.x1);
					canvas.lineTo(x - this.y2, y + this.x2);
					break;
				}
				case 314: {
					canvas.moveTo(x - this.x1, y - this.y1);
					canvas.lineTo(x - this.x2, y - this.y2);
					break;
				}
				case 224: {
					canvas.moveTo(x + this.y1, y - this.x1);
					canvas.lineTo(x + this.y2, y - this.x2);
					break;
				}
			}
			canvas.closePath();
			canvas.stroke();
		},
		check: function(character) {
			var _y2 = (character.inAir ? this.y2 : this.y2);
			var m = null;
			var x = $OurSonic_Utility_Help.floor(character.x);
			var y = $OurSonic_Utility_Help.floor(character.y);
			switch (character.mode) {
				case 134: {
					m = this.$checkCollisionLineWrap(x + this.x1, x + this.x2, y + this.y1, y + _y2, this.ignoreSolid);
					break;
				}
				case 44: {
					m = this.$checkCollisionLineWrap(x - this.y1, x - _y2, y + this.x1, y + this.x2, this.ignoreSolid);
					break;
				}
				case 314: {
					m = this.$checkCollisionLineWrap(x - this.x1, x - this.x2, y - this.y1, y - _y2, this.ignoreSolid);
					break;
				}
				case 224: {
					m = this.$checkCollisionLineWrap(x + this.y1, x + _y2, y - this.x1, y - this.x2, this.ignoreSolid);
					break;
				}
			}
			if (ss.isValue(m)) {
				m.letter = this.letter;
				if (m.angle === 255 || m.angle === 0 || m.angle === 1) {
					if (character.mode === 134) {
						m.angle = 255;
					}
					if (character.mode === 44) {
						m.angle = 64;
					}
					if (character.mode === 314) {
						m.angle = 128;
					}
					if (character.mode === 224) {
						m.angle = 192;
					}
				}
			}
			return m;
		}
	});
	ss.initClass($OurSonic_Sonic_SensorM, $asm, {});
	ss.initClass($OurSonic_Sonic_SensorManager, $asm, {
		addSensor: function(letter, sensor) {
			this.sensors[letter] = sensor;
			this.sensorResults[letter] = null;
			return sensor;
		},
		createVerticalSensor: function(letter, x, y1, y2, color, ignoreSolid) {
			return this.addSensor(letter, new $OurSonic_Sonic_Sensor(x, x, y1, y2, this, color, ignoreSolid, letter));
		},
		createHorizontalSensor: function(letter, y, x1, x2, color, ignoreSolid) {
			return this.addSensor(letter, new $OurSonic_Sonic_Sensor(x1, x2, y, y, this, color, ignoreSolid, letter));
		},
		check: function(character) {
			var none = false;
			var $t1 = new ss.ObjectEnumerator(this.sensors);
			try {
				while ($t1.moveNext()) {
					var i = $t1.current();
					this.sensorResults[i.key] = i.value.check(character);
					none = none || ss.isValue(this.sensorResults[i.key]);
				}
			}
			finally {
				$t1.dispose();
			}
			return none;
		},
		getResult: function(mn) {
			return this.sensorResults[mn];
		},
		draw: function(canvas, sonic) {
			var $t1 = new ss.ObjectEnumerator(this.sensors);
			try {
				while ($t1.moveNext()) {
					var sensor = $t1.current();
					sensor.value.draw(canvas, sonic, this.sensorResults[sensor.key]);
				}
			}
			finally {
				$t1.dispose();
			}
		}
	});
	ss.initClass($OurSonic_Sonic_Sonic, $asm, {
		updateMode: function() {
			if (this.angle <= 34 || this.angle >= 222) {
				this.mode = 134;
			}
			else if (this.angle > 34 && this.angle < 89) {
				this.mode = 44;
			}
			else if (this.angle >= 89 && this.angle < 161) {
				this.mode = 314;
			}
			else if (this.angle > 161 && this.angle < 222) {
				this.mode = 224;
			}
			//        x = _H.floor(x);
			//        y = _H.floor(y);
			this.myRec = $OurSonic_Utility_Rectangle.$ctor1(ss.Int32.trunc(this.x - 10), ss.Int32.trunc(this.y - 20), 20, 40);
			if (this.inAir) {
				this.mode = 134;
			}
		},
		tick: function(sonicLevel) {
			if (this.debugging) {
				var debugSpeed = this.watcher.multiply(15);
				if (this.holdingRight) {
					this.x += debugSpeed;
				}
				if (this.holdingLeft) {
					this.x -= debugSpeed;
				}
				if (this.crouching) {
					this.y += debugSpeed;
				}
				if (this.holdingUp) {
					this.y -= debugSpeed;
				}
				var offset = $OurSonic_Utility_Point.$ctor1(0, 0);
				// getOffsetFromImage();
				this.x = (sonicLevel.levelWidth * 128 + this.x) % (sonicLevel.levelWidth * 128) + offset.x;
				this.y = (sonicLevel.levelHeight * 128 + this.y) % (sonicLevel.levelHeight * 128) + offset.y;
				return;
			}
			this.updateMode();
			if (this.hLock > 0) {
				this.hLock--;
				this.holdingRight = false;
				this.holdingLeft = false;
			}
			if (this.inAir) {
				if (this.angle !== 255) {
					this.angle = (255 + (this.angle + ((this.angle > 127) ? 2 : -2))) % 255;
					if (this.angle >= 253 || this.angle <= 1) {
						this.angle = 255;
					}
				}
			}
			this.$effectPhysics();
			this.checkCollisionWithRings();
			this.$updateSprite();
			this.$sensorManager.check(this);
			var sensorM1 = this.$sensorManager.getResult('m1');
			var sensorM2 = this.$sensorManager.getResult('m2');
			var best = this.$getBestSensor(sensorM1, sensorM2, this.mode);
			if (ss.isValue(best)) {
				switch (this.mode) {
					case 134: {
						this.x = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? 12 : -12));
						this.gsp = 0;
						if (this.inAir) {
							this.xsp = 0;
						}
						break;
					}
					case 44: {
						this.y = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? 12 : -12));
						if (this.inAir) {
							this.xsp = 0;
						}
						break;
					}
					case 314: {
						this.x = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? -12 : 12));
						this.gsp = 0;
						if (this.inAir) {
							this.xsp = 0;
						}
						break;
					}
					case 224: {
						this.y = best.value + ((ss.isValue(sensorM2) && ss.isValue(sensorM1) && sensorM1.value === sensorM2.value) ? 12 : ((best.letter === 'm1') ? -12 : 12));
						this.gsp = 0;
						if (this.inAir) {
							this.xsp = 0;
						}
						break;
					}
				}
			}
			this.$sensorManager.check(this);
			var sensorA = this.$sensorManager.getResult('a');
			var sensorB = this.$sensorManager.getResult('b');
			var fy;
			var fx;
			var hSize = this.$getHalfImageSize();
			if (!this.inAir) {
				best = this.$getBestSensor(sensorA, sensorB, this.mode);
				if (ss.isNullOrUndefined(best)) {
					this.inAir = true;
				}
				else {
					this.justHit = false;
					switch (this.mode) {
						case 134: {
							best.chosen = true;
							this.angle = best.angle;
							this.y = fy = best.value - hSize.y;
							break;
						}
						case 44: {
							best.chosen = true;
							this.angle = best.angle;
							this.x = fx = best.value + hSize.x;
							break;
						}
						case 314: {
							best.chosen = true;
							this.angle = best.angle;
							this.y = fy = best.value + hSize.y;
							break;
						}
						case 224: {
							best.chosen = true;
							this.angle = best.angle;
							this.x = fx = best.value - hSize.x;
							break;
						}
					}
				}
				this.updateMode();
			}
			else {
				if (ss.isNullOrUndefined(sensorA) && ss.isNullOrUndefined(sensorB)) {
					this.inAir = true;
				}
				else if (ss.isValue(sensorA) && sensorA.value >= 0 && (ss.isValue(sensorB) && sensorB.value >= 0)) {
					if (sensorA.value < sensorB.value) {
						if (this.y + 20 >= sensorA.value) {
							this.angle = sensorA.angle;
							this.y = fy = sensorA.value - hSize.y;
							this.rolling = this.currentlyBall = false;
							this.inAir = false;
						}
					}
					else if (sensorB.value > -1) {
						if (this.y + 20 >= sensorB.value) {
							this.angle = sensorB.angle;
							this.y = fy = sensorB.value - hSize.y;
							this.rolling = this.currentlyBall = false;
							this.inAir = false;
						}
					}
				}
				else if (ss.isValue(sensorA) && sensorA.value > -1) {
					if (this.y + 20 >= sensorA.value) {
						this.angle = sensorA.angle;
						this.y = fy = sensorA.value - hSize.y;
						this.rolling = this.currentlyBall = false;
						this.inAir = false;
					}
				}
				else if (ss.isValue(sensorB) && sensorB.value > -1) {
					if (this.y + 20 >= sensorB.value) {
						this.angle = sensorB.angle;
						this.y = fy = sensorB.value - hSize.y;
						this.rolling = this.currentlyBall = false;
						this.inAir = false;
					}
				}
				this.updateMode();
				var cur = $OurSonic_SonicManager.instance.spriteCache.sonicSprites[this.spriteState];
				var __h = ss.Int32.div(cur.height, 2);
				this.$sensorManager.check(this);
				var sensorC = this.$sensorManager.getResult('c');
				var sensorD = this.$sensorManager.getResult('d');
				if (ss.isNullOrUndefined(sensorC) && ss.isNullOrUndefined(sensorD)) {
				}
				else {
					if (ss.isValue(sensorD) && ss.isValue(sensorC) && (sensorC.value >= 0 && sensorD.value >= 0)) {
						if (sensorC.value < sensorD.value) {
							if (this.y + __h >= sensorC.value) {
								if (this.ysp < 0) {
									if (sensorC.angle > 64 && sensorC.angle < 192) {
										this.angle = sensorC.angle;
										this.gsp = this.ysp;
										this.inAir = false;
										this.wasInAir = false;
									}
									else {
										this.ysp = 0;
									}
									this.y = fy = sensorC.value + __h;
								}
							}
						}
						else if (this.y + __h >= sensorD.value) {
							if (this.ysp < 0) {
								if (sensorD.angle > 64 && sensorD.angle < 192) {
									this.angle = sensorD.angle;
									this.gsp = -this.ysp;
									this.inAir = false;
									this.wasInAir = false;
								}
								else {
									this.ysp = 0;
								}
								this.y = fy = sensorD.value + __h;
							}
						}
					}
					else if (ss.isValue(sensorC) && sensorC.value > -1) {
						if (this.y + __h >= sensorC.value) {
							if (this.ysp < 0) {
								if (sensorC.angle > 64 && sensorC.angle < 192) {
									this.angle = sensorC.angle;
									this.gsp = this.ysp;
									this.inAir = false;
									this.wasInAir = false;
								}
								else {
									this.ysp = 0;
								}
								this.y = fy = sensorC.value + __h;
							}
						}
					}
					else if (ss.isValue(sensorD) && sensorD.value > -1) {
						if (this.y + __h >= sensorD.value) {
							if (this.ysp < 0) {
								if (sensorD.angle > 64 && sensorD.angle < 192) {
									this.angle = sensorD.angle;
									this.gsp = -this.ysp;
									this.inAir = false;
									this.wasInAir = false;
								}
								else {
									this.ysp = 0;
								}
								this.y = fy = sensorD.value + __h;
							}
						}
					}
					this.updateMode();
				}
			}
		},
		$getBestSensor: function(sensor1, sensor2, mode) {
			if (ss.isNullOrUndefined(sensor1) && ss.isNullOrUndefined(sensor2)) {
				return null;
			}
			if (ss.isNullOrUndefined(sensor1)) {
				return sensor2;
			}
			if (ss.isNullOrUndefined(sensor2)) {
				return sensor1;
			}
			switch (mode) {
				case 134: {
					return ((sensor1.value < sensor2.value) ? sensor1 : sensor2);
				}
				case 44: {
					return ((sensor1.value > sensor2.value) ? sensor1 : sensor2);
				}
				case 314: {
					return ((sensor1.value > sensor2.value) ? sensor1 : sensor2);
				}
				case 224: {
					return ((sensor1.value < sensor2.value) ? sensor1 : sensor2);
				}
			}
			return null;
		},
		invulnerable: function() {
			var mc = $OurSonic_SonicManager.instance.drawTickCount - this.sonicLastHitTick;
			if (mc < 120) {
				if (mc % 8 < 4) {
					return true;
				}
			}
			return false;
		},
		$getHalfImageSize: function() {
			return $OurSonic_Utility_Point.$ctor1(20, 20);
			//
			//                        var scale = SonicManager.Instance.Scale;
			//
			//                        var cur = SonicManager.Instance.SpriteCache.SonicSprites[SpriteState + scale.X + scale.Y];
			//
			//                        var xSize = 0;
			//
			//                        var ySize = 0;
			//
			//                        switch (Mode) {
			//
			//                        case RotationMode.Floor:
			//
			//                        ySize = ( cur.Height / scale.Y / 2 );
			//
			//                        break;
			//
			//                        case RotationMode.LeftWall:
			//
			//                        xSize = ( cur.Width / scale.X / 2 );
			//
			//                        
			//
			//                        break;
			//
			//                        case RotationMode.Ceiling:
			//
			//                        ySize = ( cur.Height / scale.Y / 2 );
			//
			//                        
			//
			//                        break;
			//
			//                        case RotationMode.RightWall:
			//
			//                        
			//
			//                        xSize = ( cur.Width / scale.X / 2 );
			//
			//                        break;
			//
			//                        }
			//
			//                        return new Point(xSize, ySize);
		},
		$getOffsetFromImage: function() {
			var cur = $OurSonic_SonicManager.instance.spriteCache.sonicSprites[this.spriteState];
			var xOffset = 0;
			var yOffset = 0;
			if (cur.height !== 40) {
				var n;
				switch (this.mode) {
					case 134: {
						n = 0;
						yOffset = ss.Int32.div(40 - (cur.height + n), 2);
						break;
					}
					case 44: {
						n = 15;
						xOffset = ss.Int32.div(-(40 - (cur.height + n)), 2);
						break;
					}
					case 314: {
						n = 8;
						yOffset = ss.Int32.div(-(40 - (cur.height + n)), 2);
						break;
					}
					case 224: {
						n = 9;
						xOffset = ss.Int32.div(40 - (cur.height + n), 2);
						break;
					}
				}
			}
			return $OurSonic_Utility_Point.$ctor1(xOffset, yOffset);
		},
		$updateSprite: function() {
			var absgsp = Math.abs(this.gsp);
			var word = this.spriteState.substr(0, this.spriteState.length - 1);
			var j = parseInt(this.spriteState.substr(this.spriteState.length - 1, this.spriteState.length));
			if (this.breaking > 0) {
				if (this.gsp > 0 || this.gsp === 0 || this.spriteState === 'breaking3') {
					this.facing = false;
					this.breaking = 0;
				}
			}
			else if (this.breaking < 0) {
				if (this.gsp < 0 || this.gsp === 0 || this.spriteState === 'breaking3') {
					this.breaking = 0;
					this.facing = true;
				}
			}
			var epsilon = 1E-05;
			if (this.justHit) {
				if (word !== 'hit') {
					this.spriteState = 'hit0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0) {
					this.spriteState = 'hit1';
				}
			}
			else if (this.spinDash) {
				if (word !== 'spindash') {
					this.spriteState = 'spindash0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(2 - absgsp)) === 0) {
					this.spriteState = 'spindash' + (j + 1) % 6;
				}
			}
			else if (Math.abs(absgsp - 0) < epsilon && this.inAir === false) {
				if (this.ducking) {
					if (word !== 'duck') {
						this.spriteState = 'duck0';
						this.$runningTick = 1;
					}
					else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(4 - absgsp)) === 0) {
						this.spriteState = 'duck1';
					}
				}
				else if (this.holdingUp) {
					if (word !== 'lookingup') {
						this.spriteState = 'lookingup0';
						this.$runningTick = 1;
					}
					else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(4 - absgsp)) === 0) {
						this.spriteState = 'lookingup1';
					}
				}
				else {
					this.spriteState = 'normal';
					this.currentlyBall = false;
					this.rolling = false;
					this.$runningTick = 0;
				}
			}
			else if (this.breaking !== 0) {
				if (word !== 'breaking') {
					this.spriteState = 'breaking0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % 7 === 0) {
					this.spriteState = 'breaking' + (j + 1) % 4;
					if (j === 0) {
						ss.add(this.haltSmoke, $OurSonic_Utility_Point.$ctor1(ss.Int32.trunc(this.x), ss.Int32.trunc(this.y)));
					}
				}
			}
			else if (this.currentlyBall) {
				if (word !== 'balls') {
					this.spriteState = 'balls0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0 || 8 - absgsp < 1) {
					this.spriteState = 'balls' + (j + 1) % 5;
				}
			}
			else if (absgsp < 6) {
				if (word !== 'running') {
					this.spriteState = 'running0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0 || 8 - absgsp < 1) {
					this.spriteState = 'running' + (j + 1) % 8;
				}
			}
			else if (absgsp >= 6) {
				if (word !== 'fastrunning') {
					this.spriteState = 'fastrunning0';
					this.$runningTick = 1;
				}
				else if (this.$runningTick++ % ss.Int32.trunc(Math.floor(8 - absgsp)) === 0 || 8 - absgsp < 1) {
					this.spriteState = 'fastrunning' + (j + 1) % 4;
				}
			}
		},
		$effectPhysics: function() {
			this.watcher.tick();
			var physics = this.$physicsVariables;
			var max = physics.topSpeed;
			if (!this.jumping) {
				if (!this.inAir && this.wasJumping) {
					this.wasJumping = false;
				}
			}
			if (this.inAir && !this.wasInAir) {
				this.wasInAir = true;
				var offset = this.$getOffsetFromImage();
				//  X += offset.X;
				//  Y += offset.Y;
				//if ((angle >= 0x70 && angle <= 0x90)) {
				//xsp = (gsp);
				//}
			}
			if (!this.inAir && this.wasInAir) {
				this.wasInAir = false;
				if (this.angle >= 240 || this.angle <= 15) {
					this.gsp = this.xsp;
				}
				else if (this.angle > 226 && this.angle <= 239 || this.angle >= 16 && this.angle <= 31) {
					this.gsp = this.ysp;
				}
				else if (this.angle >= 192 && this.angle <= 226) {
					this.gsp = -this.ysp;
				}
				else if (this.angle >= 32 && this.angle <= 63) {
					this.gsp = this.ysp;
				}
				this.xsp = 0;
				this.ysp = 0;
			}
			if (!this.inAir && !this.rolling && !this.spinDash) {
				if (!this.holdingLeft && !this.holdingRight && !this.justHit) {
					//friction
					this.gsp -= Math.min(Math.abs(this.gsp), this.watcher.multiply(physics.frc)) * ((this.gsp > 0) ? 1 : -1);
				}
				this.$oldSign = $OurSonic_Utility_Help.sign(this.gsp);
				//slope
				this.gsp += this.watcher.multiply(physics.slp) * -$OurSonic_Utility_Help.sin(this.angle);
				if (this.$oldSign !== $OurSonic_Utility_Help.sign(this.gsp) && this.$oldSign !== 0) {
					this.hLock = 30;
				}
				if (this.holdingRight && !this.holdingLeft && !this.justHit) {
					this.facing = true;
					if (this.gsp >= 0) {
						//accelerate 
						this.gsp += this.watcher.multiply(physics.acc);
						if (this.gsp > max) {
							this.gsp = max;
						}
					}
					else {
						//decelerate 
						this.gsp += this.watcher.multiply(physics.dec);
						if (Math.abs(this.gsp) > 4.5) {
							this.facing = false;
							this.breaking = 1;
							this.$runningTick = 0;
						}
					}
				}
				if (this.holdingLeft && !this.holdingRight && !this.justHit) {
					this.facing = false;
					if (this.gsp <= 0) {
						//accelerate 
						this.gsp -= this.watcher.multiply(physics.acc);
						if (this.gsp < -max) {
							this.gsp = -max;
						}
					}
					else {
						//decelerate 
						this.gsp -= this.watcher.multiply(physics.dec);
						if (Math.abs(this.gsp) > 4.5) {
							this.facing = true;
							this.breaking = -1;
							this.$runningTick = 0;
						}
					}
				}
			}
			this.ducking = false;
			if (this.crouching) {
				if (Math.abs(this.gsp) > 1.03125) {
					this.rolling = true;
					this.currentlyBall = true;
				}
				else {
					this.ducking = true;
				}
			}
			else if (this.spinDash) {
				this.gsp = (8 + ss.Int32.div($OurSonic_Utility_Help.floor(this.spinDashSpeed), 2)) * (this.facing ? 1 : -1);
				this.spinDash = false;
				this.rolling = true;
				this.currentlyBall = true;
			}
			if (!this.inAir && this.rolling) {
				//dec  
				if (this.holdingLeft && !this.justHit) {
					if (this.gsp > 0) {
						if (this.rolling) {
							this.gsp = $OurSonic_Utility_Help.max(0, this.gsp - this.watcher.multiply(physics.rdec));
						}
					}
				}
				if (this.holdingRight && !this.justHit) {
					if (this.gsp < 0) {
						if (this.rolling) {
							this.gsp = $OurSonic_Utility_Help.min(0, this.gsp + this.watcher.multiply(physics.rdec));
						}
					}
				}
				//friction
				this.gsp -= Math.min(Math.abs(this.gsp), this.watcher.multiply(physics.rfrc)) * ((this.gsp > 0) ? 1 : -1);
				this.$oldSign = $OurSonic_Utility_Help.sign(this.gsp);
				//slope
				var ang = $OurSonic_Utility_Help.sin(this.angle);
				if (ang > 0 === this.gsp > 0) {
					this.gsp += this.watcher.multiply(-physics.slpRollingUp) * ang;
				}
				else {
					this.gsp += this.watcher.multiply(-physics.slpRollingDown) * ang;
				}
				if (this.gsp > max * 2.5) {
					this.gsp = max * 2.5;
				}
				if (this.gsp < -max * 2.5) {
					this.gsp = -max * 2.5;
				}
				if (this.$oldSign !== $OurSonic_Utility_Help.sign(this.gsp) && this.$oldSign !== 0) {
					this.hLock = 30;
				}
				if (Math.abs(this.gsp) < 0.53125) {
					this.rolling = false;
					this.currentlyBall = false;
				}
			}
			this.checkCollisionWithRings();
			if (this.inAir) {
				if (this.holdingRight && !this.holdingLeft && !this.justHit) {
					this.facing = true;
					if (this.xsp >= 0) {
						//accelerate 
						this.xsp += this.watcher.multiply(physics.air);
						if (this.xsp > max) {
							this.xsp = max;
						}
					}
					else {
						//decelerate 
						this.xsp += this.watcher.multiply(physics.air);
					}
				}
				if (this.holdingLeft && !this.holdingRight && !this.justHit) {
					this.facing = false;
					if (this.xsp <= 0) {
						//accelerate 
						this.xsp -= this.watcher.multiply(physics.air);
						if (this.xsp < -max) {
							this.xsp = -max;
						}
					}
					else {
						//decelerate 
						this.xsp -= this.watcher.multiply(physics.air);
					}
				}
				if (this.wasInAir) {
					if (this.jumping) {
					}
					else {
					}
				}
				//gravity
				this.ysp += (this.justHit ? 0.1875 : physics.grv);
				//drag
				if (this.ysp < 0 && this.ysp > -4) {
					if (Math.abs(this.xsp) > 0.125) {
						this.xsp *= 0.96875;
					}
				}
				if (this.ysp > 16) {
					this.ysp = 16;
				}
			}
			if (this.wasInAir && this.jumping) {
			}
			else if (this.jumping && !this.wasJumping) {
				this.wasJumping = true;
				if (this.ducking) {
					this.spinDash = true;
					this.spinDashSpeed += 2;
					if (this.spinDashSpeed > 8) {
						this.spinDashSpeed = 8;
					}
					this.spriteState = 'spindash0';
				}
				else {
					this.inAir = true;
					this.currentlyBall = true;
					this.xsp = physics.jmp * $OurSonic_Utility_Help.sin(this.angle) + this.gsp * $OurSonic_Utility_Help.cos(this.angle);
					this.ysp = physics.jmp * $OurSonic_Utility_Help.cos(this.angle);
					if (Math.abs(this.xsp) < 0.17) {
						this.xsp = 0;
					}
				}
			}
			if (!this.inAir) {
				if (this.spinDash) {
					this.gsp = 0;
				}
				this.xsp = this.gsp * $OurSonic_Utility_Help.cos(this.angle);
				this.ysp = this.gsp * -$OurSonic_Utility_Help.sin(this.angle);
				if (Math.abs(this.gsp) < 2.5 && this.mode !== 134) {
					if (this.mode === 224) {
						this.x += 0;
					}
					else if (this.mode === 44) {
						this.x += 0;
					}
					else if (this.mode === 314) {
						this.y += 0;
					}
					var oldMode = this.mode;
					this.updateMode();
					//Gsp = 0;NO
					this.mode = 134;
					this.hLock = 30;
					this.inAir = true;
				}
			}
			if (this.xsp > 0 && this.xsp < 0.008) {
				this.gsp = 0;
				this.xsp = 0;
			}
			if (this.xsp < 0 && this.xsp > -0.008) {
				this.gsp = 0;
				this.xsp = 0;
			}
			this.x = (this.$sonicLevel.levelWidth * 128 + (this.x + this.xsp)) % (this.$sonicLevel.levelWidth * 128);
			this.y = (this.$sonicLevel.levelHeight * 128 + (this.y + this.ysp)) % (this.$sonicLevel.levelHeight * 128);
		},
		draw: function(canvas) {
			var fx = this.x;
			var fy = this.y;
			if (this.invulnerable()) {
				return;
			}
			var cur = $OurSonic_SonicManager.instance.spriteCache.sonicSprites[this.spriteState];
			if (ss.isNullOrUndefined(cur)) {
			}
			if ($OurSonic_Utility_Help.loaded(cur)) {
				canvas.save();
				var offset = this.$getOffsetFromImage();
				canvas.translate(fx - $OurSonic_SonicManager.instance.windowLocation.x + offset.x, fy - $OurSonic_SonicManager.instance.windowLocation.y + offset.y);
				if ($OurSonic_SonicManager.instance.showHeightMap) {
					canvas.save();
					var mul = 6;
					var xj = this.xsp * mul;
					var yj = this.ysp * mul;
					canvas.beginPath();
					canvas.moveTo(0, 0);
					canvas.lineTo(xj, yj);
					canvas.fillStyle = 'rgba(163,241,255,0.8)';
					canvas.arc(xj, yj, 5, 0, 2 * Math.PI, true);
					canvas.closePath();
					canvas.lineWidth = 6;
					canvas.strokeStyle = 'white';
					//6C6CFC
					canvas.stroke();
					canvas.lineWidth = 3;
					canvas.strokeStyle = '#2448D8';
					//6C6CFC
					canvas.fill();
					canvas.stroke();
					canvas.restore();
				}
				if (!this.facing) {
					//canvas.translate(cur.width, 0);
					canvas.scale(-1, 1);
					if (!this.currentlyBall && !this.spinDash) {
						canvas.rotate(-$OurSonic_Utility_Help.fixAngle(this.angle));
					}
					canvas.drawImage(cur, ss.Int32.div(-cur.width, 2), ss.Int32.div(-cur.height, 2));
					if (this.spinDash) {
						canvas.drawImage($OurSonic_SonicManager.instance.spriteCache.sonicSprites['spinsmoke' + ss.Int32.div($OurSonic_SonicManager.instance.drawTickCount % 14, 2)], ss.Int32.div(-cur.width, 2) - 25, ss.Int32.div(-cur.height, 2) + offset.y - 14, cur.width, cur.height);
					}
				}
				else {
					if (!this.currentlyBall && !this.spinDash) {
						canvas.rotate($OurSonic_Utility_Help.fixAngle(this.angle));
					}
					canvas.drawImage(cur, ss.Int32.div(-cur.width, 2), ss.Int32.div(-cur.height, 2));
					if (this.spinDash) {
						canvas.drawImage($OurSonic_SonicManager.instance.spriteCache.sonicSprites['spinsmoke' + ss.Int32.div($OurSonic_SonicManager.instance.drawTickCount % 14, 2)], ss.Int32.div(-cur.width, 2) - 25, ss.Int32.div(-cur.height, 2) + offset.y - 14, cur.width, cur.height);
					}
				}
				//
				//               canvas.moveTo(-10 * scale.x, 4 * scale.y);
				//
				//               canvas.lineTo(10 * scale.x, 4 * scale.y);
				//
				//               canvas.lineWidth = 3;
				//
				//               canvas.strokeStyle = "#FFF";
				//
				//               canvas.stroke();
				//
				//               
				//
				//               canvas.moveTo(-9 * scale.x, 0 * scale.y);
				//
				//               canvas.lineTo(-9 * scale.x, 20 * scale.y);
				//
				//               canvas.lineWidth = 3;
				//
				//               canvas.strokeStyle = "#FFF";
				//
				//               canvas.stroke();
				//
				//               
				//
				//               canvas.moveTo(9 * scale.x, 0 * scale.y);
				//
				//               canvas.lineTo(9 * scale.x, 20 * scale.y);
				//
				//               canvas.lineWidth = 3;
				//
				//               canvas.strokeStyle = "#FFF";
				//
				//               canvas.stroke();
				//
				//                canvas.strokeStyle = "#FFF";
				//
				//                canvas.lineWidth = 4;
				//
				//                canvas.strokeRect(-cur.width / 2, -cur.height / 2, cur.width, cur.height);
				canvas.restore();
				if ($OurSonic_SonicManager.instance.showHeightMap) {
					this.$sensorManager.draw(canvas, this);
				}
				for (var i = 0; i < this.haltSmoke.length; i++) {
					var lo = this.haltSmoke[i];
					canvas.drawImage($OurSonic_SonicManager.instance.spriteCache.sonicSprites['haltsmoke' + ss.Int32.div($OurSonic_SonicManager.instance.drawTickCount % 24, 6)], lo.x - $OurSonic_SonicManager.instance.windowLocation.x - 25, lo.y + 12 - $OurSonic_SonicManager.instance.windowLocation.y + offset.y);
					if (ss.Int32.div(($OurSonic_SonicManager.instance.drawTickCount + 6) % 24, 6) === 0) {
						this.haltSmoke = ss.arrayExtract(this.haltSmoke, i, 1);
					}
				}
			}
		},
		drawUI: function(canvas, pos) {
			var $t1 = new $OurSonic_Utility_CanvasHandler(canvas);
			try {
				if (canvas.font !== '13pt Arial bold') {
					canvas.font = '13pt Arial bold';
				}
				canvas.fillStyle = 'White';
				canvas.fillText('Rings: ' + this.rings, pos.x + 90, pos.y + 45);
				canvas.fillText('Angle: ' + this.angle.toString(16), pos.x + 90, pos.y + 75);
				canvas.fillText('Position: ' + this.x + ', ' + this.y, pos.x + 90, pos.y + 105);
				canvas.fillText('Speed: g: ' + this.gsp.toFixed(3) + ' x:' + this.xsp.toFixed(3) + ' y:' + this.ysp.toFixed(3), pos.x + 90, pos.y + 135);
				canvas.fillText('Mode: ' + this.mode.toString(), pos.x + 90, pos.y + 165);
				canvas.fillText('Multiplier: ' + this.watcher.mult, pos.x + 90, pos.y + 195);
				//                canvas.FillText("RealScale: " + SonicManager.Instance.RealScale.String(), pos.X + 90, pos.Y + 225);
				if (this.inAir) {
					canvas.fillText('Air ', pos.x + 220, pos.y + 45);
				}
				if (this.hLock > 0) {
					canvas.fillText('HLock: ' + this.hLock, pos.x + 90, pos.y + 195);
				}
			}
			finally {
				if (ss.isValue($t1)) {
					$t1.dispose();
				}
			}
		},
		hit: function(x, y) {
			if ($OurSonic_SonicManager.instance.drawTickCount - this.sonicLastHitTick < 120) {
				return;
			}
			this.justHit = true;
			this.ysp = -4;
			this.xsp = 2 * ((this.x - x < 0) ? -1 : 1);
			this.sonicLastHitTick = $OurSonic_SonicManager.instance.drawTickCount;
			var t = 0;
			var angle = 101.25;
			var n = false;
			var speed = 4;
			while (t < this.rings) {
				var ring = $OurSonic_Level_Ring.$ctor(true);
				ss.add($OurSonic_SonicManager.instance.activeRings, ring);
				ring.x = ss.Int32.trunc(this.x);
				ring.y = ss.Int32.trunc(this.y) - 10;
				ring.ysp = -Math.sin(angle) * speed;
				ring.xsp = Math.cos(angle) * speed;
				if (n) {
					ring.ysp *= -1;
					angle += 22.5;
				}
				n = !n;
				t++;
				if (t === 16) {
					speed = 2;
					angle = 101.25;
				}
			}
			this.rings = 0;
		},
		debug: function() {
			this.debugging = !this.debugging;
			this.xsp = 0;
			this.gsp = 0;
			this.ysp = 0;
			this.spriteState = 'normal';
		},
		pressUp: function() {
			this.holdingUp = true;
		},
		releaseUp: function() {
			this.holdingUp = false;
		},
		pressCrouch: function() {
			this.crouching = true;
		},
		releaseCrouch: function() {
			this.crouching = false;
		},
		pressLeft: function() {
			this.holdingLeft = true;
		},
		releaseLeft: function() {
			this.holdingLeft = false;
		},
		pressRight: function() {
			this.holdingRight = true;
		},
		releaseRight: function() {
			this.holdingRight = false;
		},
		pressJump: function() {
			this.jumping = true;
		},
		releaseJump: function() {
			this.jumping = false;
		},
		checkCollisionWithObjects: function(x, y, letter) {
			var me = $OurSonic_Utility_Point.$ctor1(x, y);
			var levelObjectInfos = $OurSonic_SonicManager.instance.inFocusObjects;
			for (var $t1 = 0; $t1 < levelObjectInfos.length; $t1++) {
				var ob = levelObjectInfos[$t1];
				var dj = ob.collides(me);
				var dj2 = ob.hurtsSonic(me);
				if (dj) {
					return ob.collide(this, letter, dj);
				}
				if (dj2) {
					return ob.hurtSonic(this, letter, dj2);
				}
			}
			return false;
		},
		checkCollisionWithRings: function() {
			var me = this.myRec;
			var rectangle = $OurSonic_Utility_Rectangle.$ctor1(0, 0, 16, 16);
			var rings = $OurSonic_SonicManager.instance.sonicLevel.rings;
			for (var index = 0; index < rings.length; index++) {
				var ring = rings[index];
				var pos = ring;
				if (this.obtainedRing[index]) {
					continue;
				}
				rectangle.x = pos.x;
				rectangle.y = pos.y;
				if ($OurSonic_Utility_IntersectingRectangle.intersectRect(me, rectangle)) {
					this.rings++;
					this.obtainedRing[index] = true;
				}
			}
		},
		checkCollisionLine: function(p0, p1, p2, p3) {
			return null;
		}
	});
	ss.initClass($OurSonic_Sonic_SonicConstants, $asm, {});
	ss.initClass($OurSonic_Sonic_Watcher, $asm, {
		tick: function() {
			if (true || $OurSonic_SonicManager.instance.inHaltMode) {
				this.mult = 1;
				return;
			}
			var ticks = (new Date()).getTime();
			var offset = 0;
			if (this.$lastTick === 0) {
				offset = 16;
			}
			else {
				offset = ticks - this.$lastTick;
			}
			this.$lastTick = ticks;
			this.mult = offset / 16;
		},
		multiply: function(v) {
			return this.mult * v;
		}
	});
	ss.initClass($OurSonic_UIManager_Button, $asm, {
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
			var canv = $OurSonic_Utility_CanvasInformation.create(1, 1).context;
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button2Grad.addColorStop(0, '#A5A5A5');
			this.button2Grad.addColorStop(1, '#FFFFFF');
			this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			this.clicking = true;
			if (this.toggle) {
				this.toggled = !this.toggled;
			}
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			if (this.clicking) {
				if (!ss.staticEquals(this.click, null)) {
					this.click($OurSonic_Utility_Point.$ctor1(e.x, e.y));
				}
			}
			this.clicking = false;
			if (!ss.staticEquals(this.mouseUp, null)) {
				this.mouseUp($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			if (!ss.staticEquals(this.mouseOver, null)) {
				this.mouseOver($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			canv.strokeStyle = this.buttonBorderGrad;
			if (this.toggle) {
				canv.fillStyle = (this.toggled ? this.button1Grad : this.button2Grad);
			}
			else {
				canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
			}
			canv.lineWidth = 2;
			$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
			if (!ss.referenceEquals(canv.font, this.font)) {
				canv.font = this.font;
			}
			canv.fillStyle = '#000000';
			var txt = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit(this.text);
			canv.fillText(txt, this.get_totalX() + (ss.Int32.div(this.width, 2) - canv.measureText(txt).width / 2), this.get_totalY() + ss.Int32.div(this.height, 3) * 2);
			canv.restore();
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_EditorEngine, $asm, {
		click: function(e) {
			var x = 0;
			var y = 0;
			var w = this.element.width;
			var h = this.element.height;
			//uiManager.propertyList.populate(this.Element);
			for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
				var j = this.$points[$t1];
				j.editing = false;
			}
			for (var $t2 = 0; $t2 < this.$points.length; $t2++) {
				var j1 = this.$points[$t2];
				var sz = j1.size * 5;
				var rect = $OurSonic_Utility_Rectangle.$ctor1(x + ss.Int32.div(w * j1.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j1.y, 100) - ss.Int32.div(sz, 2), sz, sz);
				if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
					document.body.style.cursor = j1.cursor;
					this.startDragging = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
					this.editing = true;
					j1.editing = true;
					return true;
				}
			}
			if (e.x > x && e.x < x + w && e.y > y && e.y < y + h) {
				this.dragg = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
				document.body.style.cursor = 'move';
				this.dragging = true;
				return false;
			}
			else {
				document.body.style.cursor = 'default';
			}
			return false;
		},
		mouseUp: function(e) {
			for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
				var j = this.$points[$t1];
				j.editing = false;
			}
			this.editing = false;
			this.dragging = false;
			this.startDragging = null;
			this.dragg = null;
			return false;
		},
		mouseOver: function(e) {
			var x = 0;
			var y = 0;
			var w = this.element.width;
			var h = this.element.height;
			document.body.style.cursor = 'move';
			if (this.dragging) {
				//
				//                if (this.Element.ChildrenAreEditing())
				//
				//                {
				//
				//                return false;
				//
				//                }
				var jx = e.x - this.dragg.x;
				var jy = e.y - this.dragg.y;
				this.element.x += jx;
				this.element.y += jy;
				//   window.DEBUGLABELS[0] = "E: " + e.X + " " + e.Y;
				//   window.DEBUGLABELS[1] = "Dragg: " + this.dragg.X + " " + this.dragg.Y;
				//   window.DEBUGLABELS[2] = "Element: " + this.Element.X + " " + this.Element.Y;
				//   window.DEBUGLABELS[3] = "Offset: " + jx + " " + jy;
				//this.dragg.x += jx;
				//this.dragg.y += jy;
				return false;
			}
			for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
				var j = this.$points[$t1];
				var sz = j.size * 5;
				if (j.editing) {
					document.body.style.cursor = j.cursor;
					var dv = $OurSonic_Utility_Point.$ctor1(this.startDragging.x - e.x, this.startDragging.y - e.y);
					j.click(dv);
					this.startDragging = $OurSonic_Utility_Point.$ctor1(e.x + dv.x, e.y + dv.y);
					return true;
				}
				var rect = $OurSonic_Utility_Rectangle.$ctor1(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(sz, 2), sz, sz);
				if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
					document.body.style.cursor = j.cursor;
					if (j.editing) {
						var dv1 = $OurSonic_Utility_Point.$ctor1(this.startDragging.x - e.x, this.startDragging.y - e.y);
						j.click(dv1);
						this.startDragging = $OurSonic_Utility_Point.$ctor1(e.x + dv1.x, e.y + dv1.y);
					}
					return true;
				}
			}
			this.startDragging = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
			return this.editing;
		},
		draw: function(canv) {
			canv.save();
			var size = 0;
			canv.strokeStyle = canv.fillStyle = 'white';
			canv.lineWidth = 3;
			canv.dashedRect(this.element.get_totalX() - size, this.element.get_totalY() - size, this.element.width + size * 2, this.element.height + size * 2, [2, 2]);
			//canv.strokeRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2);
			var x = this.element.get_totalX();
			var y = this.element.get_totalY();
			var w = this.element.width;
			var h = this.element.height;
			for (var $t1 = 0; $t1 < this.$points.length; $t1++) {
				var j = this.$points[$t1];
				canv.fillRect(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(j.size, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(j.size, 2), j.size, j.size);
			}
			canv.restore();
		},
		maxSize: function() {
			return 10;
		}
	});
	ss.initClass($OurSonic_UIManager_EditorEnginePoint, $asm, {});
	ss.initClass($OurSonic_UIManager_Element$ForceRedrawing, $asm, {});
	ss.initClass($OurSonic_UIManager_HScrollBox, $asm, {
		construct: function() {
			this.width = this.visibleItems * (this.itemWidth + this.jWidth);
			this.height = this.itemHeight + this.scrollWidth;
			this.scrolling = false;
		},
		addControl: function(control) {
			control.parent = this;
			control.construct();
			ss.add(this.controls, control);
			return control;
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
				var control = this.controls[ij];
				if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					control.onClick(e);
					return true;
				}
			}
			if (e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
				var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
				this.scrollOffset = ss.Int32.div(e.x, width) * (this.controls.length - this.visibleItems);
				this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
			}
			this.dragging = true;
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			this.dragging = false;
			for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
				var control = this.controls[ij];
				if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					control.onMouseUp(e);
					return true;
				}
			}
			if (!ss.staticEquals(this.mouseUp, null)) {
				this.mouseUp($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					control.onMouseOver(e);
					break;
				}
			}
			if (this.dragging && e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
				var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
				this.scrollOffset = ss.Int32.trunc(e.x / width * (this.controls.length - this.visibleItems));
				this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);
			}
			if (!ss.staticEquals(this.mouseOver, null)) {
				this.mouseOver($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		onScroll: function(e) {
			if (!this.visible) {
				return false;
			}
			if (e.delta > 0) {
				if (this.scrollOffset > 0) {
					this.scrollOffset--;
				}
			}
			else if (this.scrollOffset < this.controls.length - this.visibleItems) {
				this.scrollOffset++;
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					return true;
				}
			}
			//if (this.scroll) this.scroll();
			return true;
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			canv.fillStyle = this.backColor;
			var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
			canv.fillStyle = this.backColor;
			canv.lineWidth = 1;
			canv.strokeStyle = '#333';
			$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.visibleItems * (this.itemWidth + this.jWidth) + 2, this.itemHeight + this.scrollWidth + 6, 3, true, true);
			canv.fillStyle = 'grey';
			canv.lineWidth = 1;
			canv.strokeStyle = '#444';
			canv.fillRect(this.get_totalX() + 2, this.get_totalY() + this.itemHeight + 6, this.visibleItems * (this.itemWidth + this.jWidth), this.scrollWidth);
			canv.fillStyle = 'FFDDFF';
			canv.lineWidth = 1;
			canv.strokeStyle = '#FFDDFF';
			this.scrollPosition = ss.Int32.div(width * this.scrollOffset, this.controls.length - this.visibleItems);
			canv.fillRect(this.get_totalX() + this.scrollPosition + 2, this.get_totalY() + this.itemHeight + 6, 5, this.scrollWidth - 2);
			var curX = 3;
			for (var i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
				this.controls[i].parent = this;
				this.controls[i].x = curX;
				this.controls[i].y = 2;
				this.controls[i].height = this.itemHeight;
				this.controls[i].width = this.itemWidth;
				curX += this.itemWidth + this.jWidth;
				this.controls[i].draw(canv);
			}
			canv.restore();
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_HtmlBox, $asm, {
		get_init: function() {
			return this.$2$InitField;
		},
		set_init: function(value) {
			this.$2$InitField = value;
		},
		get_updatePosition: function() {
			return this.$2$UpdatePositionField;
		},
		set_updatePosition: function(value) {
			this.$2$UpdatePositionField = value;
		},
		get__Focus: function() {
			return this.$2$_FocusField;
		},
		set__Focus: function(value) {
			this.$2$_FocusField = value;
		},
		get__Hide: function() {
			return this.$2$_HideField;
		},
		set__Hide: function(value) {
			this.$2$_HideField = value;
		},
		construct: function() {
			this.get_init()();
			$OurSonic_UIManager_Element.prototype.construct.call(this);
		},
		focus: function(e) {
			this.get__Focus()();
			$OurSonic_UIManager_Element.prototype.focus.call(this, e);
		},
		loseFocus: function() {
			this.get__Hide()();
			$OurSonic_UIManager_Element.prototype.loseFocus.call(this);
		},
		onClick: function(e) {
			return false;
		},
		onMouseUp: function(e) {
			if (!ss.staticEquals(this.mouseUp, null)) {
				this.mouseUp($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!ss.staticEquals(this.mouseOver, null)) {
				this.mouseOver($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			this.get_updatePosition()(this.get_totalX(), this.get_totalY());
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_Image, $asm, {
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			debugger;
			if (!ss.staticEquals(this.click, null)) {
				this.click(e);
			}
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			canv.lineWidth = 2;
			$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
			canv.fillStyle = '#000000';
			this.onDraw(canv, this.get_totalX(), this.get_totalY());
			canv.restore();
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_ImageButton, $asm, {
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
			var canv = $OurSonic_Utility_CanvasInformation.create(1, 1).context;
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button2Grad.addColorStop(0, '#A5A5A5');
			this.button2Grad.addColorStop(1, '#FFFFFF');
			this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			this.clicking = true;
			if (this.toggle) {
				this.toggled = !this.toggled;
			}
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			if (this.clicking) {
				if (!ss.staticEquals(this.click, null)) {
					this.click($OurSonic_Utility_Point.$ctor1(e.x, e.y));
				}
			}
			this.clicking = false;
			if (!ss.staticEquals(this.mouseUp, null)) {
				this.mouseUp($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			if (!ss.staticEquals(this.mouseOver, null)) {
				this.mouseOver($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			canv.strokeStyle = this.buttonBorderGrad;
			if (this.toggle) {
				canv.fillStyle = (this.toggled ? this.button1Grad : this.button2Grad);
			}
			else {
				canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
			}
			canv.lineWidth = 2;
			$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
			if (!ss.referenceEquals(canv.font, this.font)) {
				canv.font = this.font;
			}
			canv.fillStyle = '#000000';
			var txt = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit(this.text);
			canv.save();
			this.onDraw(canv, this.get_totalX(), this.get_totalY());
			canv.restore();
			canv.fillText(txt, this.get_totalX() + (ss.Int32.div(this.width, 2) - canv.measureText(txt).width / 2), this.get_totalY() + this.height - 3);
			canv.restore();
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_Pointer, $asm, {}, $OurSonic_Utility_Point);
	ss.initClass($OurSonic_UIManager_PropertyButton, $asm, {
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_ScrollBox, $asm, {
		construct: function() {
			this.height = this.visibleItems * (this.itemHeight + this.jHeight);
			this.width = this.itemWidth + this.scrollWidth;
			this.scrolling = false;
		},
		addControl: function(T) {
			return function(control) {
				control.parent = this;
				control.construct();
				ss.add(this.controls, control);
				return control;
			};
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			for (var ij = this.scrollIndex; ij < this.controls.length; ij++) {
				var control = this.controls[ij];
				if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					control.onClick(e);
					return true;
				}
			}
			if (e.x > this.itemWidth && e.x < this.itemWidth + this.scrollWidth) {
				var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
				this.scrollIndex = ss.Int32.div(e.y, height) * (this.controls.length - this.visibleItems);
				this.scrollIndex = Math.min(Math.max(this.scrollIndex, 0), this.controls.length);
			}
			this.dragging = true;
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			this.dragging = false;
			for (var ij = this.scrollIndex; ij < this.controls.length; ij++) {
				var control = this.controls[ij];
				if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					control.onMouseUp(e);
					return true;
				}
			}
			if (!ss.staticEquals(this.mouseUp, null)) {
				this.mouseUp($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					control.onMouseOver(e);
					break;
				}
			}
			if (this.dragging && e.x > this.itemWidth && e.x < this.itemWidth + this.scrollWidth) {
				var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
				this.scrollIndex = ss.Int32.trunc(e.y / height * (this.controls.length - this.visibleItems));
				this.scrollIndex = Math.min(Math.max(this.scrollIndex, 0), this.controls.length);
			}
			if (!ss.staticEquals(this.mouseOver, null)) {
				this.mouseOver($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		onScroll: function(e) {
			if (!this.visible) {
				return false;
			}
			if (e.delta > 0) {
				if (this.scrollIndex > 0) {
					this.scrollIndex--;
				}
			}
			else if (this.scrollIndex < this.controls.length - this.visibleItems) {
				this.scrollIndex++;
			}
			for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
				var control = this.controls[$t1];
				if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
					e.x -= control.x;
					e.y -= control.y;
					return true;
				}
			}
			//if (this.scroll) this.scroll();
			return true;
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			canv.fillStyle = this.backColor;
			var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;
			canv.fillStyle = this.backColor;
			canv.lineWidth = 1;
			canv.strokeStyle = '#333';
			$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.itemWidth + this.scrollWidth + 6, this.visibleItems * (this.itemHeight + this.jHeight), 3, true, true);
			canv.fillStyle = 'grey';
			canv.lineWidth = 1;
			canv.strokeStyle = '#444';
			canv.fillRect(this.get_totalX() + this.itemWidth + 2 + 2, this.get_totalY() + 2, this.scrollWidth, this.height);
			canv.fillStyle = 'FFDDFF';
			canv.lineWidth = 1;
			canv.strokeStyle = '#FFDDFF';
			this.scrollPosition = ss.Int32.div(height * this.scrollIndex, this.controls.length - this.visibleItems);
			canv.fillRect(this.get_totalX() + this.itemWidth + 2 + 2 + 2, this.get_totalY() + 2 + this.scrollPosition, this.scrollWidth - 2, 5);
			var curY = 3;
			for (var i = this.scrollIndex; i < Math.min(this.controls.length, this.scrollIndex + this.visibleItems); i++) {
				this.controls[i].parent = this;
				this.controls[i].x = 2;
				this.controls[i].y = curY;
				this.controls[i].height = this.itemHeight;
				this.controls[i].width = this.itemWidth;
				curY += this.itemHeight + this.jHeight;
				this.controls[i].draw(canv);
			}
			canv.restore();
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		},
		clearControls: function() {
			this.controls = [];
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_Table, $asm, {
		childrenAreEditing: function() {
			var ch = this.rows;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var t = ch[$t1];
				if (t.editorEngine.dragging || t.editorEngine.editing) {
					return true;
				}
				if (t.childrenAreEditing()) {
					return true;
				}
			}
			return false;
		},
		$buildSizeMap: function() {
			var spots = [];
			var totalWidth = { $: this.width };
			var totalHeight = { $: this.height };
			var lastRowRect = $OurSonic_Utility_Rectangle.$ctor1(0, 0, 0, 0);
			var mainRow = this.rows[0];
			for (var $t1 = 0; $t1 < this.rows.length; $t1++) {
				var row = this.rows[$t1];
				var lastRowRectData = $OurSonic_Utility_Extensions.withData($OurSonic_Utility_Rectangle, $OurSonic_UIManager_TableRow).call(null, this.$calculateRowSize(row, lastRowRect.y + lastRowRect.height, totalWidth, totalHeight), row);
				lastRowRect = ss.makeGenericType($OurSonic_Utility_ExtraData$2, [$OurSonic_Utility_Rectangle, $OurSonic_UIManager_TableRow]).op_Implicit(lastRowRectData);
				var lastCellRect = $OurSonic_Utility_Rectangle.$ctor1(0, lastRowRect.y, 0, 0);
				for (var $t2 = 0; $t2 < row.cells.length; $t2++) {
					var cell = row.cells[$t2];
					var lastCellRectData = $OurSonic_Utility_Extensions.withData($OurSonic_Utility_Rectangle, $OurSonic_UIManager_TableCell).call(null, this.$calculateCellSize(cell, lastCellRect.x + lastCellRect.width, lastCellRect.y, totalWidth, totalHeight), cell);
					ss.add(spots, lastCellRectData);
					lastCellRect = ss.makeGenericType($OurSonic_Utility_ExtraData$2, [$OurSonic_Utility_Rectangle, $OurSonic_UIManager_TableCell]).op_Implicit(lastCellRectData);
				}
			}
			return spots;
		},
		$calculateRowSize: function(row, y, totalWidth, totalHeight) {
			var height;
			if (ss.isNullOrUndefined($OurSonic_Utility_SizeNumber.op_Implicit$1(row.get_rowHeight()))) {
				height = totalHeight.$ / row.get_table().rows.length;
			}
			else if (ss.endsWithString($OurSonic_Utility_SizeNumber.op_Implicit$1(row.get_rowHeight()), '%')) {
				height = totalHeight.$ * $OurSonic_Utility_SizeNumber.op_Implicit(row.get_rowHeight()) / 100;
			}
			else {
				if ($OurSonic_Utility_SizeNumber.op_Implicit(row.get_rowHeight()) + y > totalHeight.$) {
					var resetHeight = ss.Int32.trunc(y + $OurSonic_Utility_SizeNumber.op_Implicit(row.get_rowHeight()));
					totalHeight.$ = resetHeight;
				}
				height = $OurSonic_Utility_SizeNumber.op_Implicit(row.get_rowHeight());
			}
			return $OurSonic_Utility_Rectangle.$ctor1(0, y, totalWidth.$, ss.Int32.trunc(height));
		},
		$calculateCellSize: function(cell, x, y, totalWidth, totalHeight) {
			var width;
			var height;
			var lastCellAtThisIndex;
			var rowIndex = ss.indexOf(cell.get_row().get_table().rows, cell.get_row());
			if (rowIndex === 0) {
				lastCellAtThisIndex = null;
			}
			else {
				lastCellAtThisIndex = cell.get_row().get_table().rows[rowIndex - 1].cells[ss.indexOf(cell.get_row().cells, cell)];
			}
			if (ss.isNullOrUndefined($OurSonic_Utility_SizeNumber.op_Implicit$1(cell.cellWidth))) {
				width = (ss.isNullOrUndefined(lastCellAtThisIndex) ? (totalWidth.$ / cell.get_row().cells.length) : $OurSonic_Utility_SizeNumber.op_Implicit(lastCellAtThisIndex.cellWidth));
			}
			else if (ss.endsWithString($OurSonic_Utility_SizeNumber.op_Implicit$1(cell.cellWidth), '%')) {
				width = totalWidth.$ * $OurSonic_Utility_SizeNumber.op_Implicit(cell.cellWidth) / 100;
			}
			else {
				if ($OurSonic_Utility_SizeNumber.op_Implicit(cell.cellWidth) + x > totalWidth.$) {
					totalWidth.$ = ss.Int32.trunc(x + $OurSonic_Utility_SizeNumber.op_Implicit(cell.cellWidth));
				}
				width = $OurSonic_Utility_SizeNumber.op_Implicit(cell.cellWidth);
			}
			if (ss.isNullOrUndefined($OurSonic_Utility_SizeNumber.op_Implicit$1(cell.cellHeight))) {
				height = totalHeight.$;
			}
			else if (ss.endsWithString($OurSonic_Utility_SizeNumber.op_Implicit$1(cell.cellHeight), '%')) {
				height = totalHeight.$ * $OurSonic_Utility_SizeNumber.op_Implicit(cell.cellHeight) / 100;
			}
			else {
				if ($OurSonic_Utility_SizeNumber.op_Implicit(cell.cellHeight) + y > totalHeight.$) {
					totalHeight.$ = ss.Int32.trunc(y + $OurSonic_Utility_SizeNumber.op_Implicit(cell.cellHeight));
				}
				height = $OurSonic_Utility_SizeNumber.op_Implicit(cell.cellHeight);
			}
			if (cell.fullSize) {
				for (var $t1 = 0; $t1 < cell.controls.length; $t1++) {
					var cnt = cell.controls[$t1];
					cnt.x = 0;
					cnt.y = 0;
					cnt.width = ss.Int32.trunc(width);
					cnt.height = ss.Int32.trunc(height);
				}
			}
			return $OurSonic_Utility_Rectangle.$ctor1(x, y, ss.Int32.trunc(width), ss.Int32.trunc(height));
		},
		focus: function(e) {
			$OurSonic_UIManager_Element.prototype.focus.call(this, e);
		},
		loseFocus: function() {
			$OurSonic_UIManager_Element.prototype.loseFocus.call(this);
		},
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
		},
		onKeyDown: function(e) {
			return $OurSonic_UIManager_Element.prototype.onKeyDown.call(this, e);
		},
		onClick: function(e) {
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseOver: function(e) {
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		onMouseUp: function(e) {
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onScroll: function(e) {
			return $OurSonic_UIManager_Element.prototype.onScroll.call(this, e);
		},
		draw: function(canv) {
			var fm = this.$buildSizeMap();
			for (var $t1 = 0; $t1 < fm.length; $t1++) {
				var extraData = fm[$t1];
				extraData.data.x = extraData.item.x;
				extraData.data.y = extraData.item.y;
				extraData.data.cellWidth = $OurSonic_Utility_SizeNumber.op_Implicit$2(extraData.item.width);
				extraData.data.cellHeight = $OurSonic_Utility_SizeNumber.op_Implicit$2(extraData.item.height);
				extraData.data.draw(canv);
			}
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		},
		addRow: function(element) {
			element.parent = this;
			element.construct();
			ss.add(this.rows, element);
			return element;
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_TableCell, $asm, {
		get_row: function() {
			return ss.cast(this.parent, $OurSonic_UIManager_TableRow);
		},
		focus: function(e) {
			$OurSonic_UIManager_Panel.prototype.focus.call(this, e);
		},
		loseFocus: function() {
			$OurSonic_UIManager_Panel.prototype.loseFocus.call(this);
		},
		construct: function() {
			$OurSonic_UIManager_Panel.prototype.construct.call(this);
		},
		onKeyDown: function(e) {
			return $OurSonic_UIManager_Panel.prototype.onKeyDown.call(this, e);
		},
		onClick: function(e) {
			return $OurSonic_UIManager_Panel.prototype.onClick.call(this, e);
		},
		onMouseOver: function(e) {
			return $OurSonic_UIManager_Panel.prototype.onMouseOver.call(this, e);
		},
		onMouseUp: function(e) {
			return $OurSonic_UIManager_Panel.prototype.onMouseUp.call(this, e);
		},
		onScroll: function(e) {
			return $OurSonic_UIManager_Panel.prototype.onScroll.call(this, e);
		},
		draw: function(canv) {
			this.width = ss.Int32.trunc($OurSonic_Utility_SizeNumber.op_Implicit(this.cellWidth));
			this.height = ss.Int32.trunc($OurSonic_Utility_SizeNumber.op_Implicit(this.cellHeight));
			$OurSonic_UIManager_Panel.prototype.draw.call(this, canv);
		}
	}, $OurSonic_UIManager_Panel);
	$OurSonic_UIManager_TableCell.$ctor1.prototype = $OurSonic_UIManager_TableCell.prototype;
	ss.initClass($OurSonic_UIManager_TableRow, $asm, {
		get_rowHeight: function() {
			return this.$2$RowHeightField;
		},
		set_rowHeight: function(value) {
			this.$2$RowHeightField = value;
		},
		get_table: function() {
			return ss.cast(this.parent, $OurSonic_UIManager_Table);
		},
		childrenAreEditing: function() {
			var ch = this.cells;
			for (var $t1 = 0; $t1 < ch.length; $t1++) {
				var t = ch[$t1];
				if (t.editorEngine.dragging || t.editorEngine.editing) {
					return true;
				}
				if (t.childrenAreEditing()) {
					return true;
				}
			}
			return false;
		},
		focus: function(e) {
			$OurSonic_UIManager_Element.prototype.focus.call(this, e);
		},
		loseFocus: function() {
			$OurSonic_UIManager_Element.prototype.loseFocus.call(this);
		},
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
		},
		onKeyDown: function(e) {
			return $OurSonic_UIManager_Element.prototype.onKeyDown.call(this, e);
		},
		onClick: function(e) {
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseOver: function(e) {
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		onMouseUp: function(e) {
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onScroll: function(e) {
			return $OurSonic_UIManager_Element.prototype.onScroll.call(this, e);
		},
		draw: function(canv) {
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		},
		addCell: function(element) {
			element.parent = this;
			element.construct();
			ss.add(this.cells, element);
			return element;
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_TextArea, $asm, {
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			var txt = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit(this.text);
			if (!ss.referenceEquals(canv.font, this.font)) {
				canv.font = this.font;
			}
			//var w = canv.MeasureText(txt).Width;
			//var h = int.Parse(canv.Font.Split("pt")[0]);
			//   canv.fillStyle = "rgba(255,255,255,0.78)";
			// var pad = 3;
			//     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));
			canv.fillStyle = this.color;
			canv.fillText(txt, this.get_totalX(), this.get_totalY());
		},
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
		},
		forceDrawing: function() {
			var txt = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit(this.text);
			this.$cachedForceRedrawing.redraw = false;
			this.$cachedForceRedrawing.clearCache = false;
			if (ss.referenceEquals(txt, this.$oldText)) {
				this.$cachedForceRedrawing.redraw = true;
			}
			else {
				this.$oldText = txt;
				this.$cachedForceRedrawing.redraw = true;
				this.$cachedForceRedrawing.clearCache = true;
			}
			return this.$cachedForceRedrawing;
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_TextBox, $asm, {
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
			var canv = $OurSonic_Utility_CanvasInformation.create(1, 1).context;
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button2Grad.addColorStop(0, '#A5A5A5');
			this.button2Grad.addColorStop(1, '#FFFFFF');
			this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.buttonBorderGrad.addColorStop(1, '#7a7a7a');
		},
		onKeyDown: function(e) {
			if (e.altKey) {
				return false;
			}
			if (this.focused) {
				if (e.ctrlKey) {
					if (e.keyCode === 65) {
						this.dragPosition = 0;
						this.cursorPosition = this.text.length;
					}
					else if (e.keyCode === 67) {
						// _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
					}
					else if (e.keyCode === 88) {
						//  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
						this.text = this.text.substr(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substr(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
						this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
						this.dragPosition = -1;
					}
				}
				else if (e.keyCode === 37) {
					if (e.shiftKey) {
						if (this.dragPosition === -1) {
							this.dragPosition = this.cursorPosition;
						}
						this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
					}
					else {
						this.dragPosition = -1;
						this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
					}
				}
				else if (e.keyCode === 39) {
					if (e.shiftKey) {
						if (this.dragPosition === -1) {
							this.dragPosition = this.cursorPosition;
						}
						this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
					}
					else {
						this.dragPosition = -1;
						this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
					}
				}
				else {
					if (e.keyCode === 8) {
						if (this.dragPosition === -1) {
							this.text = this.text.substr(0, this.cursorPosition - 1) + this.text.substr(this.cursorPosition, this.text.length);
						}
						else {
							this.text = this.text.substr(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substr(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
						}
						if (this.dragPosition === -1) {
							if (this.cursorPosition > 0) {
								this.cursorPosition--;
							}
						}
						else {
							this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
						}
					}
					else if (e.keyCode === 46) {
						if (this.dragPosition === -1) {
							this.text = this.text.substr(0, this.cursorPosition) + this.text.substr(Math.min(this.cursorPosition + 1, this.text.length), this.text.length);
						}
						else {
							this.text = this.text.substr(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substr(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
						}
						if (this.dragPosition === -1) {
						}
						else {
							this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
						}
					}
					else {
						var m = e.keyCode;
						var t = String.fromCharCode(m);
						if (this.dragPosition === -1) {
							this.text = this.text.substr(0, this.cursorPosition) + t + this.text.substr(this.cursorPosition, this.text.length);
						}
						else {
							this.text = this.text.substr(0, Math.min(this.cursorPosition, this.dragPosition)) + t + this.text.substr(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
						}
						if (this.dragPosition === -1) {
							this.cursorPosition++;
						}
						else {
							this.cursorPosition = Math.max(this.cursorPosition, this.dragPosition);
						}
					}
					this.dragPosition = -1;
				}
				if (!ss.staticEquals(this.textChanged, null)) {
					this.textChanged();
				}
				e.preventDefault();
				return true;
			}
			return false;
		},
		forceDrawing: function() {
			var redraw = this.focused;
			if (!ss.referenceEquals(this.$oldText, this.text)) {
				this.$oldText = this.text;
				redraw = true;
			}
			this.$cachedForceRedrawing.redraw = redraw;
			return this.$cachedForceRedrawing;
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			this.clicking = true;
			this.$can.save();
			if (!ss.referenceEquals(this.$can.font, this.font)) {
				this.$can.font = this.font;
			}
			for (var i = 0; i < this.text.length; i++) {
				this.dragPosition = -1;
				var w = this.$can.measureText(this.text.substr(0, i)).width;
				if (w > e.x - 14) {
					this.cursorPosition = i;
					if (this.drawTicks - this.lastClickTick < 15) {
						this.$selectWord();
					}
					this.lastClickTick = this.drawTicks;
					return false;
				}
			}
			this.cursorPosition = this.text.length;
			if (this.drawTicks - this.lastClickTick < 20) {
				this.$selectWord();
			}
			this.lastClickTick = this.drawTicks;
			this.$can.restore();
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		$selectWord: function() {
			var j = this.text.split(' ');
			var pos = 0;
			for (var i = 0; i < j.length; i++) {
				if (this.cursorPosition < j[i].length + pos) {
					this.dragPosition = pos;
					this.cursorPosition = j[i].length + pos;
					return;
				}
				else {
					pos += j[i].length + 1;
				}
			}
			this.dragPosition = pos - j[j.length - 1].length;
			this.cursorPosition = this.text.length;
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			if (this.clicking) {
			}
			this.clicking = false;
			if (!ss.staticEquals(this.mouseUp, null)) {
				this.mouseUp($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseUp.call(this, e);
		},
		onMouseOver: function(e) {
			if (!this.visible) {
				return false;
			}
			document.body.style.cursor = 'text';
			if (this.clicking) {
				if (this.dragPosition === -1) {
					this.dragPosition = this.cursorPosition;
				}
				this.$can.save();
				if (!ss.referenceEquals(this.$can.font, this.font)) {
					this.$can.font = this.font;
				}
				for (var i = 0; i < this.text.length; i++) {
					var w = this.$can.measureText(this.text.substr(0, i)).width;
					if (w > e.x - 14) {
						this.cursorPosition = i;
						return false;
					}
				}
				this.$can.restore();
				this.cursorPosition = this.text.length;
			}
			if (!ss.staticEquals(this.mouseOver, null)) {
				this.mouseOver($OurSonic_Utility_Point.$ctor1(e.x, e.y));
			}
			return $OurSonic_UIManager_Element.prototype.onMouseOver.call(this, e);
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			if (!this.focused) {
				this.cursorPosition = -1;
				this.dragPosition = -1;
			}
			this.drawTicks++;
			this.$can = canv;
			canv.strokeStyle = this.buttonBorderGrad;
			canv.fillStyle = (this.clicking ? this.button1Grad : this.button2Grad);
			canv.lineWidth = 2;
			$OurSonic_Utility_Help.roundRect(canv, this.get_totalX(), this.get_totalY(), this.width, this.height, 2, true, true);
			if (!ss.referenceEquals(canv.font, this.font)) {
				canv.font = this.font;
			}
			if (this.dragPosition !== -1) {
				canv.fillStyle = '#598AFF';
				var w1 = canv.measureText(this.text.substr(0, Math.min(this.dragPosition, this.cursorPosition))).width;
				var w2 = canv.measureText(this.text.substr(0, Math.max(this.dragPosition, this.cursorPosition))).width;
				canv.fillRect(this.get_totalX() + 8 + w1, this.get_totalY() + 3, w2 - w1, this.height - 7);
			}
			canv.fillStyle = '#000000';
			var hc;
			if (canv.font.indexOf('pt') !== -1) {
				hc = parseInt(canv.font.substr(0, canv.font.indexOf('pt')));
			}
			else {
				hc = parseInt(canv.font.substr(0, canv.font.indexOf('px')));
			}
			canv.fillText(this.text, this.get_totalX() + 8, this.get_totalY() + ss.Int32.div(this.height - hc, 2) + ss.Int32.div(this.height, 2));
			if (this.focused && this.$blinkTick++ % 35 === 0) {
				this.$blinked = !this.$blinked;
			}
			if (this.focused && this.$blinked) {
				canv.strokeStyle = '#000000';
				var w = canv.measureText(this.text.substr(0, this.cursorPosition)).width;
				canv.beginPath();
				canv.moveTo(this.get_totalX() + 8 + w, this.get_totalY() + 3);
				canv.lineTo(this.get_totalX() + 8 + w, this.get_totalY() + (this.height - 7));
				canv.lineWidth = 2;
				canv.stroke();
			}
			canv.restore();
			$OurSonic_UIManager_Element.prototype.draw.call(this, canv);
		}
	}, $OurSonic_UIManager_Element);
	ss.initClass($OurSonic_UIManager_UIArea, $asm, {
		addControl: function(T) {
			return function(element) {
				var fm = $OurSonic_UIManager_Panel.prototype.addControl(T).call(this, element);
				fm.construct();
				return fm;
			};
		},
		construct: function() {
			if (this.closable) {
				var $t1 = new $OurSonic_UIManager_Button(this.width - 30, 4, 26, 23, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('X'));
				$t1.font = $OurSonic_UIManager_UIManager.buttonFont;
				$t1.color = 'Green';
				$t1.click = ss.mkdel(this, function(p) {
					this.loseFocus();
					this.visible = false;
				});
				this.addControl($OurSonic_UIManager_Button).call(this, $t1);
			}
			$OurSonic_UIManager_Panel.prototype.construct.call(this);
		},
		onClick: function(e) {
			var base = $OurSonic_UIManager_Panel.prototype.onClick.call(this, e);
			if (!base && !this.isEditMode()) {
				this.dragging = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
			}
			return base;
		},
		draw: function(canv) {
			if (!this.visible) {
				return;
			}
			canv.save();
			if (!this.cachedDrawing) {
				var cg = $OurSonic_Utility_CanvasInformation.create(this.width + 20, this.height + 20);
				var cv = cg.context;
				cv.translate(10, 10);
				var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
				lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
				lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');
				cv.fillStyle = lingrad;
				cv.strokeStyle = '#333';
				var xy = $OurSonic_Utility_Point.$ctor1(this.x, this.y);
				this.x = 0;
				this.y = 0;
				var rad = 30;
				$OurSonic_Utility_Help.roundRect(cv, this.x, this.y, this.width, this.height, rad, true, true);
				cv.beginPath();
				cv.moveTo(this.x, this.y + rad);
				cv.lineTo(this.x + this.width, this.y + rad);
				cv.lineWidth = 2;
				cv.strokeStyle = '#000000';
				cv.stroke();
				for (var $t1 = 0; $t1 < this.controls.length; $t1++) {
					var t1 = this.controls[$t1];
					var good = t1.forceDrawing();
					if (good.redraw) {
						t1.draw(cv);
					}
				}
				this.x = xy.x;
				this.y = xy.y;
				this.cachedDrawing = cg;
			}
			this.$drawCache(canv);
			if (this.cachedDrawing.canvas.width !== this.width + 20 || this.cachedDrawing.canvas.height !== this.height + 20) {
				this.cachedDrawing = null;
			}
			for (var $t2 = 0; $t2 < this.controls.length; $t2++) {
				var t = this.controls[$t2];
				var good1 = t.forceDrawing();
				if (!good1.redraw) {
					t.draw(canv);
				}
				if (good1.clearCache) {
					this.cachedDrawing = null;
				}
			}
			canv.restore();
			$OurSonic_UIManager_Panel.prototype.draw.call(this, canv);
		},
		$drawCache: function(canv) {
			canv.drawImage(this.cachedDrawing.canvas, this.x - 10, this.y - 10);
		}
	}, $OurSonic_UIManager_Panel);
	ss.initClass($OurSonic_UIManager_UIManager, $asm, {
		get_uiManagerAreas: function() {
			return this.$1$UIManagerAreasField;
		},
		set_uiManagerAreas: function(value) {
			this.$1$UIManagerAreasField = value;
		},
		onClick: function(cell) {
			var goodArea = null;
			var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
				return -f.get_depth();
			}).toArray();
			for (var $t1 = 0; $t1 < cl.length; $t1++) {
				var are = cl[$t1];
				if (are.visible && (are.isEditMode() ? (are.y - are.editorEngine.maxSize() <= cell.y && are.y + are.editorEngine.maxSize() + are.height > cell.y && are.x - are.editorEngine.maxSize() <= cell.x && are.x + are.editorEngine.maxSize() + are.width > cell.x) : (are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x))) {
					goodArea = are;
					var ec = $OurSonic_UIManager_Pointer.$ctor(cell.x - are.x, cell.y - are.y, 0, cell.right);
					are.onClick(ec);
					break;
				}
			}
			if (goodArea) {
				for (var $t2 = 0; $t2 < this.uiAreas.length; $t2++) {
					var are1 = this.uiAreas[$t2];
					if (ss.referenceEquals(goodArea, are1)) {
						are1.set_depth(1);
						are1.focus(cell);
					}
					else if (are1.visible) {
						are1.set_depth(0);
						are1.loseFocus();
					}
				}
				return true;
			}
			else {
				for (var $t3 = 0; $t3 < this.uiAreas.length; $t3++) {
					var are2 = this.uiAreas[$t3];
					if (are2.visible) {
						are2.set_depth(0);
						are2.loseFocus();
					}
				}
			}
			this.sonicManager.uiManager.dragger.click(cell);
			return false;
		},
		onMouseMove: function(cell) {
			var cl = Enumerable.from(this.uiAreas).orderBy(function(f) {
				return -f.get_depth();
			}).toArray();
			for (var $t1 = 0; $t1 < cl.length; $t1++) {
				var are = cl[$t1];
				if (are.dragging || are.isEditMode() || are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
					var cell2 = $OurSonic_UIManager_Pointer.$ctor(cell.x - are.x, cell.y - are.y, 0, cell.right);
					return are.onMouseOver(cell2);
				}
			}
			if (this.dragger.isDragging(cell)) {
				this.dragger.mouseMove(cell);
				return false;
			}
			this.dragger.mouseMove(cell);
			return false;
		},
		onMouseUp: function(cell) {
			for (var $t1 = 0; $t1 < this.uiAreas.length; $t1++) {
				var are = this.uiAreas[$t1];
				var ec = $OurSonic_UIManager_Pointer.$ctor(cell.x - are.x, cell.y - are.y, 0, cell.right);
				are.onMouseUp(ec);
			}
			this.dragger.mouseUp(cell);
		},
		onMouseScroll: function(e) {
			var delta = ss.unbox(ss.cast((!!e.wheelDelta ? (e.wheelDelta / 40) : (!!e.detail ? -e.detail : 0)), ss.Int32));
			var cell = $OurSonic_Utility_Help.getCursorPosition(e);
			for (var $t1 = 0; $t1 < this.uiAreas.length; $t1++) {
				var are = this.uiAreas[$t1];
				if (are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
					var cell2 = $OurSonic_UIManager_Pointer.$ctor(cell.x - are.x, cell.y - are.y, delta, cell.right);
					return are.onScroll(cell2);
				}
			}
			return false;
		},
		onKeyDown: function(jQueryEvent) {
			for (var $t1 = 0; $t1 < this.uiAreas.length; $t1++) {
				var are = this.uiAreas[$t1];
				if (are.onKeyDown(jQueryEvent)) {
					return true;
				}
			}
			return false;
		},
		addArea: function(uiArea) {
			uiArea.construct();
			ss.add(this.uiAreas, uiArea);
			this.updateDepth();
		},
		updateDepth: function() {
			this.canvasDepths = Enumerable.from(this.uiAreas).orderBy(function(f) {
				return f.get_depth();
			}).toArray();
		},
		draw: function(canvas) {
			this.dragger.tick();
			canvas.save();
			for (var $t1 = 0; $t1 < this.canvasDepths.length; $t1++) {
				var are = this.canvasDepths[$t1];
				are.draw(canvas);
			}
			if (true) {
				for (var i = 0; i < this.$messages.length; i++) {
					canvas.fillText(this.$messages[i], 10, 25 + i * 30);
				}
			}
			canvas.restore();
		}
	});
	ss.initClass($OurSonic_UIManager_UIManagerData, $asm, {});
	ss.initClass($OurSonic_UIManager_UIManagerDataIndexes, $asm, {});
	ss.initClass($OurSonic_Utility_CanvasHandler, $asm, {
		dispose: function() {
			this.$myCanvas.restore();
		}
	}, null, [ss.IDisposable]);
	ss.initClass($OurSonic_Utility_CanvasInformation, $asm, {});
	ss.initEnum($OurSonic_Utility_ClickState, $asm, { dragging: 0, placeChunk: 1, placeRing: 2, placeObject: 3 });
	ss.initClass($OurSonic_Utility_Color, $asm, {});
	ss.initClass($OurSonic_Utility_Constants, $asm, {});
	ss.initClass($OurSonic_Utility_DoublePoint, $asm, {});
	ss.initClass($OurSonic_Utility_Dragger, $asm, {
		click: function(cell) {
			this.$lastPos = $OurSonic_Utility_Point.$ctor1(cell.x, cell.y);
		},
		isDragging: function(cell) {
			return this.$lastPos;
		},
		mouseUp: function(cell) {
			this.$lastPos = null;
		},
		mouseMove: function(cell) {
			if (!this.$lastPos) {
				return;
			}
			this.$xsp += (this.$lastPos.x - cell.x) * 2.70000004768372;
			this.$ysp += (this.$lastPos.y - cell.y) * 2.70000004768372;
			this.$xsp = ((this.$xsp > 0) ? 1 : -1) * Math.min(Math.abs(this.$xsp), 60);
			this.$ysp = ((this.$ysp > 0) ? 1 : -1) * Math.min(Math.abs(this.$ysp), 60);
			this.$lastPos = $OurSonic_Utility_Point.$ctor1(cell.x, cell.y);
		},
		tick: function() {
			if (this.$xsp === 0 && this.$ysp === 0) {
				return;
			}
			this.$myOnFling(this.$xsp, this.$ysp);
			if (this.$xsp > 0) {
				this.$xsp *= this.$lag;
			}
			else {
				this.$xsp *= this.$lag;
			}
			if (this.$ysp > 0) {
				this.$ysp *= this.$lag;
			}
			else {
				this.$ysp *= this.$lag;
			}
			if (Math.abs(this.$xsp) <= 2) {
				this.$xsp = 0;
			}
			if (Math.abs(this.$ysp) <= 2) {
				this.$ysp = 0;
			}
		}
	});
	ss.initClass($OurSonic_Utility_Extensions, $asm, {});
	ss.initEnum($OurSonic_Utility_GameState, $asm, { playing: 0, editing: 1 });
	ss.initClass($OurSonic_Utility_Help, $asm, {});
	ss.initClass($OurSonic_Utility_IntersectingRectangle, $asm, {
		intersects: function(p) {
			return this.x < p.x && this.x + this.width > p.x && this.y < p.y && this.y + this.height > p.y;
		}
	});
	ss.initClass($OurSonic_Utility_Rectangle, $asm, {}, $OurSonic_Utility_Point);
	ss.initClass($OurSonic_Utility_SizeNumber, $asm, {});
	$OurSonic_Utility_SizeNumber.$ctor1.prototype = $OurSonic_Utility_SizeNumber.prototype;
	ss.initClass($OurSonic_Utility_SpriteLoader, $asm, {
		tick: function() {
			if (this.$stepIndex === this.$steps.length) {
				if (!this.$done) {
					this.$done = true;
					this.$myCompleted();
				}
				return true;
			}
			var stp = this.$steps[this.$stepIndex];
			if (!stp) {
				return true;
			}
			if (ss.Int32.div(this.$tickIndex % stp.iterations.length, 12) === 0) {
				this.$myUpdate('Caching: ' + stp.title + ' ' + ss.Int32.div(this.$tickIndex, stp.iterations.length) * 100 + '%');
			}
			if (stp.iterations.length > this.$tickIndex) {
				stp.method(stp.iterations[this.$tickIndex++], ss.mkdel(this, function() {
					if (stp.onFinish()) {
						this.$stepIndex++;
						this.$tickIndex = 0;
					}
				}));
			}
			return false;
		},
		addStep: function(title, method, onFinish, disable) {
			if (disable) {
				return -1;
			}
			ss.add(this.$steps, new $OurSonic_Utility_SpriteLoaderStep(title, method, onFinish));
			return this.$steps.length - 1;
		},
		addIterationToStep: function(spriteStep, i) {
			if (spriteStep === -1) {
				return;
			}
			ss.add(this.$steps[spriteStep].iterations, i);
		}
	});
	ss.initClass($OurSonic_Utility_SpriteLoaderStep, $asm, {});
	$OurSonic_Utility_CanvasInformation.$blackPixel = null;
	$OurSonic_Utility_Help.$cos_table = [1, 0.9997, 0.9988, 0.99729, 0.99518, 0.99248, 0.98918, 0.98528, 0.98079, 0.9757, 0.97003, 0.96378, 0.95694, 0.94953, 0.94154, 0.93299, 0.92388, 0.91421, 0.90399, 0.89322, 0.88192, 0.87009, 0.85773, 0.84485, 0.83147, 0.81758, 0.80321, 0.78835, 0.77301, 0.75721, 0.74095, 0.72425, 0.70711, 0.68954, 0.67156, 0.65317, 0.63439, 0.61523, 0.5957, 0.57581, 0.55557, 0.535, 0.5141, 0.4929, 0.4714, 0.44961, 0.42755, 0.40524, 0.38268, 0.3599, 0.33689, 0.31368, 0.29028, 0.26671, 0.24298, 0.2191, 0.19509, 0.17096, 0.14673, 0.12241, 0.09802, 0.07356, 0.04907, 0.02454, 0, -0.02454, -0.04907, -0.07356, -0.09802, -0.12241, -0.14673, -0.17096, -0.19509, -0.2191, -0.24298, -0.26671, -0.29028, -0.31368, -0.33689, -0.3599, -0.38268, -0.40524, -0.42755, -0.44961, -0.4714, -0.4929, -0.5141, -0.535, -0.55557, -0.57581, -0.5957, -0.61523, -0.63439, -0.65317, -0.67156, -0.68954, -0.70711, -0.72425, -0.74095, -0.75721, -0.77301, -0.78835, -0.80321, -0.81758, -0.83147, -0.84485, -0.85773, -0.87009, -0.88192, -0.89322, -0.90399, -0.91421, -0.92388, -0.93299, -0.94154, -0.94953, -0.95694, -0.96378, -0.97003, -0.9757, -0.98079, -0.98528, -0.98918, -0.99248, -0.99518, -0.99729, -0.9988, -0.9997, -1, -0.9997, -0.9988, -0.99729, -0.99518, -0.99248, -0.98918, -0.98528, -0.98079, -0.9757, -0.97003, -0.96378, -0.95694, -0.94953, -0.94154, -0.93299, -0.92388, -0.91421, -0.90399, -0.89322, -0.88192, -0.87009, -0.85773, -0.84485, -0.83147, -0.81758, -0.80321, -0.78835, -0.77301, -0.75721, -0.74095, -0.72425, -0.70711, -0.68954, -0.67156, -0.65317, -0.63439, -0.61523, -0.5957, -0.57581, -0.55557, -0.535, -0.5141, -0.4929, -0.4714, -0.44961, -0.42756, -0.40524, -0.38268, -0.3599, -0.33689, -0.31368, -0.29028, -0.26671, -0.24298, -0.2191, -0.19509, -0.17096, -0.14673, -0.12241, -0.09802, -0.07356, -0.04907, -0.02454, 0, 0.02454, 0.04907, 0.07356, 0.09802, 0.12241, 0.14673, 0.17096, 0.19509, 0.2191, 0.24298, 0.26671, 0.29028, 0.31368, 0.33689, 0.3599, 0.38268, 0.40524, 0.42756, 0.44961, 0.4714, 0.4929, 0.5141, 0.535, 0.55557, 0.57581, 0.5957, 0.61523, 0.63439, 0.65317, 0.67156, 0.68954, 0.70711, 0.72425, 0.74095, 0.75721, 0.77301, 0.78835, 0.80321, 0.81758, 0.83147, 0.84485, 0.85773, 0.87009, 0.88192, 0.89322, 0.90399, 0.91421, 0.92388, 0.93299, 0.94154, 0.94953, 0.95694, 0.96378, 0.97003, 0.9757, 0.98079, 0.98528, 0.98918, 0.99248, 0.99518, 0.99729, 0.9988, 0.9997];
	$OurSonic_SonicManager.instance = null;
	$OurSonic_SonicManager.$_cachedOffs = {};
	$OurSonic_SonicManager.STATICLEVEL = '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';
	$OurSonic_Level_HeightMap.colors = ['', 'rgba(255,98,235,0.6)', 'rgba(24,218,235,0.6)', 'rgba(24,98,235,0.6)'];
	$OurSonic_Level_Tiles_TileChunk.$numOfPiecesWide = 8;
	$OurSonic_Level_Tiles_TileChunk.$numOfPiecesLong = 8;
	$OurSonic_Level_Tiles_TilePiece.$drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
	$OurSonic_Level_Tiles_TilePiece.$drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
	$OurSonic_Level_Objects_ObjectManager.broken = $OurSonic_Utility_Help.loadSprite('assets/Sprites/broken.png', function(e) {
	});
	$OurSonic_UIManager_UIManager.smallTextFont = '8pt Calibri ';
	$OurSonic_UIManager_UIManager.buttonFont = '12pt Calibri ';
	$OurSonic_UIManager_UIManager.smallButtonFont = '13pt Arial bold ';
	$OurSonic_UIManager_UIManager.textFont = '11pt Arial bold ';
	$OurSonic_UIManager_UIManager.$_curLevelName = null;
	$OurSonic_UIManager_UIManager.instance = null;
	$OurSonic_Utility_Extensions.$offsets = [1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	$OurSonic_Utility_Extensions.$curY = 0;
	$OurSonic_Utility_Extensions.DOES = 0;
	$OurSonic_SonicEngine.instance = null;
	$OurSonic_Page.main();
})();
