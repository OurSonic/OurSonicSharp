;(function() {
	'use strict';
	var $asm = {};
	global.OurSonic = global.OurSonic || {};
	global.OurSonic.Areas = global.OurSonic.Areas || {};
	global.OurSonic.Filters = global.OurSonic.Filters || {};
	global.OurSonic.Level = global.OurSonic.Level || {};
	global.OurSonic.Level.Animations = global.OurSonic.Level.Animations || {};
	global.OurSonic.Level.Events = global.OurSonic.Level.Events || {};
	global.OurSonic.Level.Objects = global.OurSonic.Level.Objects || {};
	global.OurSonic.Level.Tiles = global.OurSonic.Level.Tiles || {};
	global.OurSonic.Sonic = global.OurSonic.Sonic || {};
	global.OurSonic.UI = global.OurSonic.UI || {};
	global.OurSonic.UI.Controllers = global.OurSonic.UI.Controllers || {};
	global.OurSonic.UI.Directives = global.OurSonic.UI.Directives || {};
	global.OurSonic.UI.Scope = global.OurSonic.UI.Scope || {};
	global.OurSonic.UI.Scope.Controller = global.OurSonic.UI.Scope.Controller || {};
	global.OurSonic.UI.Scope.Directive = global.OurSonic.UI.Scope.Directive || {};
	global.OurSonic.UI.Services = global.OurSonic.UI.Services || {};
	global.OurSonic.UIManager = global.OurSonic.UIManager || {};
	global.OurSonic.Utility = global.OurSonic.Utility || {};
	ss.initAssembly($asm, 'OurSonic');
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.BuildAngular
	var $OurSonic_BuildAngular = function() {
	};
	$OurSonic_BuildAngular.__typeName = 'OurSonic.BuildAngular';
	$OurSonic_BuildAngular.setup = function() {
		var module = angular.module('acg', ['ui.utils', 'ui.codemirror', 'ui.bootstrap']).config(['$httpProvider', $OurSonic_BuildAngular.$buildHttpProvider]).controller($OurSonic_UI_Controllers_$LevelSelectorController.$name, [$OurSonic_BuildAngular.$scopeName, $OurSonic_UI_Services_CreateUIService.name$1, function(scope, createUIService) {
			return new $OurSonic_UI_Controllers_$LevelSelectorController(scope, createUIService);
		}]).controller($OurSonic_UI_Controllers_$ObjectFrameworkListController.$name, [$OurSonic_BuildAngular.$scopeName, $OurSonic_UI_Services_CreateUIService.name$1, function(scope1, createUIService1) {
			return new $OurSonic_UI_Controllers_$ObjectFrameworkListController(scope1, createUIService1);
		}]).controller($OurSonic_UI_Controllers_$TileEditorController.$name, [$OurSonic_BuildAngular.$scopeName, $OurSonic_UI_Services_CreateUIService.name$1, function(scope2, createUIService2) {
			return new $OurSonic_UI_Controllers_$TileEditorController(scope2, createUIService2);
		}]).controller($OurSonic_UI_Controllers_$ObjectFrameworkEditorController.$name, [$OurSonic_BuildAngular.$scopeName, $OurSonic_UI_Services_CreateUIService.name$1, function(scope3, createUIService3) {
			return new $OurSonic_UI_Controllers_$ObjectFrameworkEditorController(scope3, createUIService3);
		}]).controller($OurSonic_UI_Controllers_$AssetFrameEditorController.$name, [$OurSonic_BuildAngular.$scopeName, function(scope4) {
			return new $OurSonic_UI_Controllers_$AssetFrameEditorController(scope4);
		}]).service($OurSonic_UI_Services_CreateUIService.name$1, [$OurSonic_BuildAngular.$compileName, $OurSonic_BuildAngular.$rootScopeName, function(compileService, rootScopeService) {
			return new $OurSonic_UI_Services_CreateUIService(compileService, rootScopeService);
		}]).directive($OurSonic_UI_Directives_FancyListDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_FancyListDirective();
		}]).directive($OurSonic_UI_Directives_FancyListIndexDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_FancyListIndexDirective();
		}]).directive($OurSonic_UI_Directives_FancyHorizontalListDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_FancyHorizontalListDirective();
		}]).directive($OurSonic_UI_Directives_FancyHorizontalListIndexDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_FancyHorizontalListIndexDirective();
		}]).directive($OurSonic_UI_Directives_CanvasTilePieceDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasTilePieceDirective();
		}]).directive($OurSonic_UI_Directives_CanvasTileChunkDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasTileChunkDirective();
		}]).directive($OurSonic_UI_Directives_CanvasPieceLayoutEditDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasPieceLayoutEditDirective();
		}]).directive($OurSonic_UI_Directives_CanvasPieceLayoutDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasPieceLayoutDirective();
		}]).directive($OurSonic_UI_Directives_CanvasAssetFrameDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasAssetFrameDirective();
		}]).directive($OurSonic_UI_Directives_CanvasAssetFrameEditDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasAssetFrameEditDirective();
		}]).directive($OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective();
		}]).directive($OurSonic_UI_Directives_CanvasPieceAssetDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_CanvasPieceAssetDirective();
		}]).directive($OurSonic_UI_Directives_DraggableDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_DraggableDirective();
		}]).directive($OurSonic_UI_Directives_FloatingWindowDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_FloatingWindowDirective();
		}]).directive($OurSonic_UI_Directives_ForNextDirective.name$1, [function() {
			return new $OurSonic_UI_Directives_ForNextDirective();
		}]).filter($OurSonic_Filters_RoundFilter.name$1, [function() {
			var $t1 = new $OurSonic_Filters_RoundFilter();
			return ss.mkdel($t1, $t1.filter);
		}]).filter($OurSonic_Filters_SwitchFilter.name$1, [function() {
			var $t2 = new $OurSonic_Filters_SwitchFilter();
			return ss.mkdel($t2, $t2.filter);
		}]).run([$OurSonic_BuildAngular.$http, $OurSonic_BuildAngular.$templateCache, $OurSonic_UI_Services_CreateUIService.name$1, function(http, templateCache, createUIService4) {
			$OurSonic_BuildAngular.$buildCache(http, templateCache);
			createUIService4.create($OurSonic_UI_Controllers_$LevelSelectorController.$view);
			createUIService4.create($OurSonic_UI_Controllers_$ObjectFrameworkListController.$view);
		}]);
		//
		//
		//            var controllers = Assembly.GetExecutingAssembly().GetTypes().Where(a => typeof(IController).IsAssignableFrom(a) && !a.IsInterface);
		//
		//
		//            foreach (var controller in controllers)
		//
		//
		//            {
		//
		//
		//            ConstructorInfo constructorInfo = controller.GetConstructors()[0];
		//
		//
		//            var injection=new object[constructorInfo.ParameterTypes.Length+1];
		//
		//
		//            
		//
		//
		//            for (int index = 0; index < constructorInfo.ParameterTypes.Length; index++)
		//
		//
		//            {
		//
		//
		//            var parameterType = constructorInfo.ParameterTypes[index];
		//
		//
		//            if (typeof(IScope).IsAssignableFrom(parameterType))
		//
		//
		//            {
		//
		//
		//            injection[index] = "$scope";
		//
		//
		//            }
		//
		//
		//            else
		//
		//
		//            {
		//
		//
		//            injection[index] = GetConstant(parameterType, "Name").GetValue(null);
		//
		//
		//            }
		//
		//
		//            }
		//
		//
		//            injection[constructorInfo.ParameterTypes.Length] = null;
		//
		//
		//            module.Controller(controller.Name, injection);
		//
		//
		//            }
		//            MinimizeController.Register(module);
		angular.bootstrap(window.document, ['acg']);
	};
	$OurSonic_BuildAngular.$getConstant = function(type, name) {
		var fieldInfos = ss.getMembers(type, 4, 88);
		return OurSonicModels.Common.EnumerableExtensions.first$1(Object).call(null, fieldInfos, function(fi) {
			return ss.referenceEquals(fi.name, name);
		});
	};
	$OurSonic_BuildAngular.$buildCache = function(http, templateCache) {
		var uis = [$OurSonic_UI_Controllers_$LevelSelectorController.$view];
		for (var index = 0; index < uis.length; index++) {
			var ui = { $: ss.formatString('{1}partials/UIs/{0}.html', uis[index], $OurSonic_Utility_Constants.contentAddress) };
			http.get(ui.$, null).success(ss.mkdel({ ui: ui }, function(a) {
				return templateCache.put(this.ui.$, a);
			}));
		}
	};
	$OurSonic_BuildAngular.$buildHttpProvider = function(httpProvider) {
		httpProvider.defaults.useXDomain = true;
		delete httpProvider.defaults.headers.common['X-Requested-With'];
	};
	global.OurSonic.BuildAngular = $OurSonic_BuildAngular;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Page
	var $OurSonic_Page = function() {
		var stats = new xStats();
		document.body.appendChild(stats.element);
		new $OurSonic_SonicEngine();
		$OurSonic_BuildAngular.setup();
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
		var $t1 = document.getElementById(this.$gameCanvasName);
		this.$gameCanvas = $OurSonic_Utility_CanvasInformation.create$1(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')), 0, 0, true);
		var $t2 = document.getElementById(this.$uiCanvasName);
		this.$uiCanvas = $OurSonic_Utility_CanvasInformation.create$1(ss.cast($t2, ss.isValue($t2) && (ss.isInstanceOfType($t2, Element) && $t2.tagName === 'CANVAS')), 0, 0, true);
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
				sonicManager.scale = $OurSonic_Utility_Point.$ctor1(4, 4);
				sonicManager.windowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(sonicManager.currentGameState, $OurSonic_SonicEngine.instance.$gameCanvas, sonicManager.scale);
				sonicManager.sonicToon = null;
				break;
			}
			case 1: {
				sonicManager.currentGameState = 0;
				sonicManager.scale = $OurSonic_Utility_Point.$ctor1(4, 4);
				sonicManager.windowLocation = $OurSonic_Utility_Constants.defaultWindowLocation(sonicManager.currentGameState, $OurSonic_SonicEngine.instance.$gameCanvas, sonicManager.scale);
				sonicManager.sonicToon = new $OurSonic_Sonic_Sonic();
				break;
			}
		}
		sonicManager.destroyCanvases();
		sonicManager.resetCanvases();
	};
	global.OurSonic.SonicEngine = $OurSonic_SonicEngine;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.SonicManager
	var $OurSonic_SonicManager = function(engine, gameCanvas, resize) {
		this.mainCanvas = null;
		this.$engine = null;
		this.objectManager = null;
		this.drawTickCount = 0;
		this.$clicking = false;
		this.$imageLength = 0;
		this.$status = null;
		this.overrideRealScale = null;
		this.$sonicSprites = null;
		this.tickCount = 0;
		this.$waitingForDrawContinue = false;
		this.waitingForTickContinue = false;
		this.$lowChunkCanvas = null;
		this.$sonicCanvas = null;
		this.$highChuckCanvas = null;
		this.currentGameState = 0;
		this.bigWindowLocation = null;
		this.uiManager = null;
		this.sonicToon = null;
		this.scale = null;
		this.windowLocation = null;
		this.realScale = null;
		this.inHaltMode = false;
		this.indexedPalette = 0;
		this.tileAnimations = null;
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
		this.onLevelLoad = null;
		this.tileChunkDebugDrawOptions = null;
		this.tilePaletteAnimationManager = null;
		this.tileAnimationManager = null;
		this.cachedObjects = null;
		$OurSonic_SonicManager.instance = this;
		//            SonicToon = new Sonic();
		this.$engine = engine;
		this.$engine.canvasWidth = $(window).width();
		this.$engine.canvasHeight = $(window).height();
		gameCanvas.domCanvas[0].setAttribute('width', this.$engine.canvasWidth.toString());
		gameCanvas.domCanvas[0].setAttribute('height', this.$engine.canvasHeight.toString());
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
		this.tileAnimations = [];
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
		;
		this.clickState = 1;
		this.tickCount = 0;
		this.drawTickCount = 0;
		this.inHaltMode = false;
		this.waitingForTickContinue = false;
		this.$waitingForDrawContinue = false;
		this.tileChunkDebugDrawOptions = $OurSonic_Level_Tiles_TileChunkDebugDrawOptions.$ctor();
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
	global.OurSonic.SonicManager = $OurSonic_SonicManager;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.TileAnimation
	var $OurSonic_TileAnimation = function(manager, animatedTileData) {
		this.manager = null;
		this.animatedTileData = null;
		this.currentFrame = 0;
		this.frames = null;
		this.manager = manager;
		this.animatedTileData = animatedTileData;
		this.frames = [];
		this.currentFrame = 0;
	};
	$OurSonic_TileAnimation.__typeName = 'OurSonic.TileAnimation';
	global.OurSonic.TileAnimation = $OurSonic_TileAnimation;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.TileAnimationFrame
	var $OurSonic_TileAnimationFrame = function(frameIndex, animation) {
		this.$1$AnimationField = null;
		this.frameIndex = 0;
		this.set_animation(animation);
		this.frameIndex = frameIndex;
	};
	$OurSonic_TileAnimationFrame.__typeName = 'OurSonic.TileAnimationFrame';
	global.OurSonic.TileAnimationFrame = $OurSonic_TileAnimationFrame;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.TileAnimationManager
	var $OurSonic_TileAnimationManager = function(sonicManager) {
		this.$1$SonicManagerField = null;
		this.animations = null;
		this.set_sonicManager(sonicManager);
		this.$init();
	};
	$OurSonic_TileAnimationManager.__typeName = 'OurSonic.TileAnimationManager';
	global.OurSonic.TileAnimationManager = $OurSonic_TileAnimationManager;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.TilePaletteAnimation
	var $OurSonic_TilePaletteAnimation = function(manager, animatedPaletteData) {
		this.manager = null;
		this.animatedPaletteData = null;
		this.currentFrame = 0;
		this.frames = null;
		this.manager = manager;
		this.animatedPaletteData = animatedPaletteData;
		this.frames = [];
	};
	$OurSonic_TilePaletteAnimation.__typeName = 'OurSonic.TilePaletteAnimation';
	global.OurSonic.TilePaletteAnimation = $OurSonic_TilePaletteAnimation;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.TilePaletteAnimationFrame
	var $OurSonic_TilePaletteAnimationFrame = function(frameIndex, animation) {
		this.$1$AnimationField = null;
		this.frameIndex = 0;
		this.$tempPalette = null;
		this.set_animation(animation);
		this.frameIndex = frameIndex;
	};
	$OurSonic_TilePaletteAnimationFrame.__typeName = 'OurSonic.TilePaletteAnimationFrame';
	global.OurSonic.TilePaletteAnimationFrame = $OurSonic_TilePaletteAnimationFrame;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.TilePaletteAnimationManager
	var $OurSonic_TilePaletteAnimationManager = function(sonicManager) {
		this.$1$SonicManagerField = null;
		this.animations = null;
		this.set_sonicManager(sonicManager);
		this.$init();
	};
	$OurSonic_TilePaletteAnimationManager.__typeName = 'OurSonic.TilePaletteAnimationManager';
	global.OurSonic.TilePaletteAnimationManager = $OurSonic_TilePaletteAnimationManager;
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
		var $t8 = this.levelManager;
		var $t7 = new $OurSonic_UIManager_Button(50, 110, 120, 28, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Debug Animations'));
		$t7.click = function(p1) {
			$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.outlineChunk = !$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.outlineChunk;
			$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.showPaletteAnimationData = !$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.showPaletteAnimationData;
			$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.showBaseData = !$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.showBaseData;
			$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.showTileAnimationData = !$OurSonic_SonicManager.instance.tileChunkDebugDrawOptions.showTileAnimationData;
		};
		$t8.addControl($OurSonic_UIManager_Button).call($t8, $t7);
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
				this.$loadLevel(new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(ss.cast(window.window.STATICLEVEL, String)));
			}
		}), 3000);
		$OurSonic_SonicEngine.instance.client.on('GetLevels.Response', function(data) {
			neverGot = false;
			var load = true;
			var $t6 = OurSonicModels.Common.EnumerableExtensions.orderBy$4(String).call(null, data.Data, function(a) {
				return a;
			});
			for (var $t7 = 0; $t7 < $t6.length; $t7++) {
				var level = $t6[$t7];
				if (load) {
					//#if RELEASE
					//loadLevel(level);
					//#endif
					load = false;
				}
				var area = { $: level };
				var $t8 = new $OurSonic_UIManager_Button(0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(level));
				$t8.color = 'rgb(50,190,90)';
				$t8.click = ss.mkdel({ area: area }, function(p1) {
					loadLevel(this.area.$);
				});
				ctls.addControl($OurSonic_UIManager_Button).call(ctls, $t8);
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
				var $t6 = OurSonicModels.Common.EnumerableExtensions.orderBy$4(String).call(null, obj, function(a) {
					return a;
				});
				for (var $t7 = 0; $t7 < $t6.length; $t7++) {
					var itm = $t6[$t7];
					var d;
					var name = { $: itm };
					var $t8 = new $OurSonic_UIManager_Button(0, 0, 0, 0, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2(itm));
					$t8.color = 'rgb(50,190,90)';
					$t8.click = ss.mkdel({ name: name }, function(p1) {
						loadObject(this.name.$);
					});
					fList.addControl($OurSonic_UIManager_Button).call(fList, d = $t8);
				}
			});
		};
		var $t9 = new $OurSonic_UIManager_Button(200, 50, 160, 25, ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Save Framework'));
		$t9.color = 'rgb(50,150,50)';
		$t9.click = function(p2) {
			var oldTitle = $OurSonic_UIManager_UIManager.get_curLevelName();
			$OurSonic_UIManager_UIManager.updateTitle('Saving Object');
			var k = uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.key;
			var $t10 = uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.oldKey;
			if (ss.isNullOrUndefined($t10)) {
				$t10 = uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework.key;
			}
			var o = $t10;
			var v = $OurSonic_Utility_Help.stringify(uiManager.get_uiManagerAreas().objectFrameworkArea.objectFrameworkArea.data.objectFramework);
			var $t12 = $OurSonic_SonicEngine.instance.client;
			var $t11 = OurSonicModels.SaveObjectModel.$ctor();
			$t11.key = k;
			$t11.oldKey = o;
			$t11.data = v;
			$t12.emit('SaveObject', $t11);
			$OurSonic_SonicEngine.instance.client.on('SaveObject.Response', function(data1) {
				$OurSonic_UIManager_UIManager.updateTitle(oldTitle);
			});
			getObjects();
		};
		objectFrameworkListArea.addControl($OurSonic_UIManager_Button).call(objectFrameworkListArea, $t9);
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
		this.$palette = null;
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
		var tileChunks = $OurSonic_SonicManager.instance.sonicLevel.tileChunks;
		for (var index = 0; index < tileChunks.length; index++) {
			var tileChunk = { $: tileChunks[index] };
			var chunkButton = new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TileChunk]))(tileChunk.$, 0, 0, 0, 0);
			chunkButton.onDraw = function(cnv, x, y) {
				//                                         chunkButton.Data.DrawUI(cnv, new Point(x, y), new DoublePoint(0.5d, 0.5d), 0);
				//                                         chunkButton.Data.DrawUI(cnv, new Point(x, y), new DoublePoint(0.5d, 0.5d), 1);
			};
			chunkButton.font = $OurSonic_UIManager_UIManager.smallTextFont;
			chunkButton.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Chunk #' + index);
			chunkButton.click = ss.mkdel({ tileChunk: tileChunk }, function(e) {
				tileChunkArea.data = this.tileChunk.$;
			});
			this.$chunkPieceList.addControl(ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TileChunk])).call(this.$chunkPieceList, chunkButton);
		}
		var image = new $OurSonic_UIManager_Image(125, 70, 256, 256);
		var areaDrawScale = 2;
		image.onDraw = ss.delegateCombine(image.onDraw, function(context, x1, y1) {
			if (ss.isNullOrUndefined(tileChunkArea.data)) {
				return;
			}
			//                                tileChunkArea.Data.DrawUI(context, new Point(x, y), new Point(areaDrawScale, areaDrawScale), 0);
			//                                tileChunkArea.Data.DrawUI(context, new Point(x, y), new Point(areaDrawScale, areaDrawScale), 1);
		});
		image.click = ss.delegateCombine(image.click, function(e1) {
			if (ss.isNullOrUndefined(tileChunkArea.data)) {
				return;
			}
			//                               var tilePiece = tileChunkArea.Data.GetBlockAt(e.X / areaDrawScale, e.Y / areaDrawScale);
			//                               uiManager.UIManagerAreas.TilePieceArea.Visible = false;
			//                               uiManager.UIManagerAreas.TilePieceArea.Data = tilePiece;
			//                               tilePieceList.ScrollIndex = Math.Max(uiManager.sonicManager.SonicLevel.TilePieces.IndexOf(tilePiece) - 1, 0);
		});
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
	// OurSonic.Filters.RoundFilter
	var $OurSonic_Filters_RoundFilter = function() {
	};
	$OurSonic_Filters_RoundFilter.__typeName = 'OurSonic.Filters.RoundFilter';
	global.OurSonic.Filters.RoundFilter = $OurSonic_Filters_RoundFilter;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Filters.SwitchFilter
	var $OurSonic_Filters_SwitchFilter = function() {
	};
	$OurSonic_Filters_SwitchFilter.__typeName = 'OurSonic.Filters.SwitchFilter';
	global.OurSonic.Filters.SwitchFilter = $OurSonic_Filters_SwitchFilter;
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
		this.tileAnimations = null;
		this.animatedTileFiles = null;
		this.chunkMap = null;
		this.rings = null;
		this.curHeightMap = false;
		this.levelWidth = 0;
		this.levelHeight = 0;
		this.tileChunks = null;
		this.tiles = null;
		this.tilePieces = null;
		this.objects = null;
		this.animatedPalettes = null;
		this.palette = null;
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
		this.tileChunks = [];
		this.chunkMap = [];
		this.rings = [];
		this.objects = [];
		this.heightMaps = [];
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
	// OurSonic.Level.Animations.AnimationInstance
	var $OurSonic_Level_Animations_AnimationInstance = function() {
	};
	$OurSonic_Level_Animations_AnimationInstance.__typeName = 'OurSonic.Level.Animations.AnimationInstance';
	global.OurSonic.Level.Animations.AnimationInstance = $OurSonic_Level_Animations_AnimationInstance;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Animations.TileAnimationData
	var $OurSonic_Level_Animations_TileAnimationData = function() {
		this.animationTileFile = 0;
		this.numberOfTiles = 0;
		this.lastAnimatedIndex = 0;
		this.lastAnimatedFrame = null;
		this.animationTileIndex = 0;
		this.dataFrames = null;
		this.automatedTiming = 0;
	};
	$OurSonic_Level_Animations_TileAnimationData.__typeName = 'OurSonic.Level.Animations.TileAnimationData';
	global.OurSonic.Level.Animations.TileAnimationData = $OurSonic_Level_Animations_TileAnimationData;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Animations.TileAnimationDataFrame
	var $OurSonic_Level_Animations_TileAnimationDataFrame = function() {
		this.ticks = 0;
		this.startingTileIndex = 0;
	};
	$OurSonic_Level_Animations_TileAnimationDataFrame.__typeName = 'OurSonic.Level.Animations.TileAnimationDataFrame';
	global.OurSonic.Level.Animations.TileAnimationDataFrame = $OurSonic_Level_Animations_TileAnimationDataFrame;
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
		this.$image = null;
		this.transparentColor = null;
		this.$image = {};
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
		this.pieceLayoutIndex = 0;
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
		obj.description = d.description;
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
	// OurSonic.Level.Tiles.ChunkLayer
	var $OurSonic_Level_Tiles_ChunkLayer = function() {
	};
	$OurSonic_Level_Tiles_ChunkLayer.__typeName = 'OurSonic.Level.Tiles.ChunkLayer';
	global.OurSonic.Level.Tiles.ChunkLayer = $OurSonic_Level_Tiles_ChunkLayer;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.ChunkLayer
	var $OurSonic_Level_Tiles_ChunkLayer$1 = function(T) {
		var $type = function() {
			this.low = ss.getDefaultValue(T);
			this.high = ss.getDefaultValue(T);
		};
		ss.registerGenericClassInstance($type, $OurSonic_Level_Tiles_ChunkLayer$1, [T], {
			get_item: function(layer) {
				switch (layer) {
					case 0: {
						return this.low;
					}
					case 1: {
						return this.high;
					}
					default: {
						return ss.getDefaultValue(T);
					}
				}
			},
			set_item: function(layer, value) {
				switch (layer) {
					case 0: {
						this.low = value;
						break;
					}
					case 1: {
						this.high = value;
						break;
					}
				}
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_Level_Tiles_ChunkLayer$1.__typeName = 'OurSonic.Level.Tiles.ChunkLayer$1';
	ss.initGenericClass($OurSonic_Level_Tiles_ChunkLayer$1, $asm, 1);
	global.OurSonic.Level.Tiles.ChunkLayer$1 = $OurSonic_Level_Tiles_ChunkLayer$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.PaletteAnimationCanvasFrame
	var $OurSonic_Level_Tiles_PaletteAnimationCanvasFrame = function() {
		this.canvas = null;
	};
	$OurSonic_Level_Tiles_PaletteAnimationCanvasFrame.__typeName = 'OurSonic.Level.Tiles.PaletteAnimationCanvasFrame';
	global.OurSonic.Level.Tiles.PaletteAnimationCanvasFrame = $OurSonic_Level_Tiles_PaletteAnimationCanvasFrame;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.PaletteAnimationCanvasFrames
	var $OurSonic_Level_Tiles_PaletteAnimationCanvasFrames = function(paletteAnimationIndex) {
		this.paletteAnimationIndex = 0;
		this.position = null;
		this.frames = null;
		this.paletteAnimationIndex = paletteAnimationIndex;
		this.frames = {};
	};
	$OurSonic_Level_Tiles_PaletteAnimationCanvasFrames.__typeName = 'OurSonic.Level.Tiles.PaletteAnimationCanvasFrames';
	global.OurSonic.Level.Tiles.PaletteAnimationCanvasFrames = $OurSonic_Level_Tiles_PaletteAnimationCanvasFrames;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.RotationMode
	var $OurSonic_Level_Tiles_RotationMode = function() {
	};
	$OurSonic_Level_Tiles_RotationMode.__typeName = 'OurSonic.Level.Tiles.RotationMode';
	global.OurSonic.Level.Tiles.RotationMode = $OurSonic_Level_Tiles_RotationMode;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.Tile
	var $OurSonic_Level_Tiles_Tile = function(colors) {
		this.$canAnimate = true;
		this.curPaletteIndexes = null;
		this.colors = null;
		this.index = 0;
		this.isTileAnimated = false;
		this.animatedPaletteIndexes = null;
		this.animatedTileIndexes = null;
		this.paletteIndexesToBeAnimated = null;
		this.$baseCaches = {};
		this.$animatedPaletteCaches = {};
		this.colors = colors;
		this.curPaletteIndexes = null;
	};
	$OurSonic_Level_Tiles_Tile.__typeName = 'OurSonic.Level.Tiles.Tile';
	global.OurSonic.Level.Tiles.Tile = $OurSonic_Level_Tiles_Tile;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileAnimationCanvasFrame
	var $OurSonic_Level_Tiles_TileAnimationCanvasFrame = function() {
		this.canvas = null;
	};
	$OurSonic_Level_Tiles_TileAnimationCanvasFrame.__typeName = 'OurSonic.Level.Tiles.TileAnimationCanvasFrame';
	global.OurSonic.Level.Tiles.TileAnimationCanvasFrame = $OurSonic_Level_Tiles_TileAnimationCanvasFrame;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileAnimationCanvasFrames
	var $OurSonic_Level_Tiles_TileAnimationCanvasFrames = function(tileAnimationIndex) {
		this.tileAnimationIndex = 0;
		this.position = null;
		this.frames = null;
		this.tileAnimationIndex = tileAnimationIndex;
		this.frames = {};
	};
	$OurSonic_Level_Tiles_TileAnimationCanvasFrames.__typeName = 'OurSonic.Level.Tiles.TileAnimationCanvasFrames';
	global.OurSonic.Level.Tiles.TileAnimationCanvasFrames = $OurSonic_Level_Tiles_TileAnimationCanvasFrames;
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
		this.$baseCanvasCache = null;
		this.$paletteAnimationCanvasesCache = null;
		this.$tileAnimationCanvasesCache = null;
		this.currentTileAnimationFrameIndexCache = null;
		this.currentPaletteAnimationFrameIndexCache = null;
		this.$myLocalPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
		this.isOnlyBackground = null;
		this.isOnlyForeground = null;
		this.$empty = null;
		this.tilePieces = null;
		this.tileAnimations = null;
		this.index = 0;
		this.heightBlocks1 = null;
		this.heightBlocks2 = null;
		this.angleMap1 = null;
		this.angleMap2 = null;
		this.$tileAnimationIndexes = null;
		this.$paletteAnimationIndexes = null;
		this.isOnlyBackground = null;
	};
	$OurSonic_Level_Tiles_TileChunk.__typeName = 'OurSonic.Level.Tiles.TileChunk';
	global.OurSonic.Level.Tiles.TileChunk = $OurSonic_Level_Tiles_TileChunk;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileChunkDebugDrawOptions
	var $OurSonic_Level_Tiles_TileChunkDebugDrawOptions = function() {
	};
	$OurSonic_Level_Tiles_TileChunkDebugDrawOptions.__typeName = 'OurSonic.Level.Tiles.TileChunkDebugDrawOptions';
	$OurSonic_Level_Tiles_TileChunkDebugDrawOptions.createInstance = function() {
		return $OurSonic_Level_Tiles_TileChunkDebugDrawOptions.$ctor();
	};
	$OurSonic_Level_Tiles_TileChunkDebugDrawOptions.$ctor = function() {
		var $this = {};
		$this.showBaseData = false;
		$this.showTileAnimationData = false;
		$this.showPaletteAnimationData = false;
		$this.outlineChunk = false;
		$this.outlineTilePieces = false;
		$this.outlineTiles = false;
		$this.outlineTilePiece = null;
		$this.outlineTile = null;
		return $this;
	};
	global.OurSonic.Level.Tiles.TileChunkDebugDrawOptions = $OurSonic_Level_Tiles_TileChunkDebugDrawOptions;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TileInfo
	var $OurSonic_Level_Tiles_TileInfo = function() {
		this._Tile = 0;
		this.priority = false;
		this.xFlip = false;
		this.yFlip = false;
		this.palette = 0;
		this.index = 0;
	};
	$OurSonic_Level_Tiles_TileInfo.__typeName = 'OurSonic.Level.Tiles.TileInfo';
	global.OurSonic.Level.Tiles.TileInfo = $OurSonic_Level_Tiles_TileInfo;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TilePiece
	var $OurSonic_Level_Tiles_TilePiece = function() {
		this.$onlyBackground = false;
		this.$onlyBackgroundSet = false;
		this.$onlyForeground = false;
		this.$onlyForegroundSet = false;
		this.$shouldAnimate = null;
		this.tiles = null;
		this.index = 0;
		this.animatedPaletteIndexes = null;
		this.$1$AnimatedTileIndexesField = null;
		this.$animatedPaletteCaches = {};
	};
	$OurSonic_Level_Tiles_TilePiece.__typeName = 'OurSonic.Level.Tiles.TilePiece';
	global.OurSonic.Level.Tiles.TilePiece = $OurSonic_Level_Tiles_TilePiece;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.Level.Tiles.TilePieceInfo
	var $OurSonic_Level_Tiles_TilePieceInfo = function() {
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
		this.sensorManager = null;
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
		this.$halfSize = $OurSonic_Utility_Point.$ctor1(20, 20);
		this.$offsetFromImage = $OurSonic_Utility_Point.$ctor1(0, 0);
		this.$objectCollision = $OurSonic_Utility_Point.$ctor1(0, 0);
		this.$ringCollisionRect = $OurSonic_Utility_Rectangle.$ctor1(0, 0, 0, 0);
		this.watcher = new $OurSonic_Sonic_Watcher();
		this.$physicsVariables = $OurSonic_Sonic_SonicConstants.sonic();
		var sonicManager = $OurSonic_SonicManager.instance;
		this.$sonicLevel = sonicManager.sonicLevel;
		this.x = this.$sonicLevel.startPositions[0].x;
		this.y = this.$sonicLevel.startPositions[0].y;
		this.sensorManager = new $OurSonic_Sonic_SensorManager();
		this.haltSmoke = [];
		this.rings = 7;
		this.sensorManager.createVerticalSensor('a', -9, 0, 36, '#F202F2', false);
		this.sensorManager.createVerticalSensor('b', 9, 0, 36, '#02C2F2', false);
		this.sensorManager.createVerticalSensor('c', -9, 0, -20, '#2D2C21', false);
		this.sensorManager.createVerticalSensor('d', 9, 0, -20, '#C24222', false);
		this.sensorManager.createHorizontalSensor('m1', 4, 0, -12, '#212C2E', false);
		this.sensorManager.createHorizontalSensor('m2', 4, 0, 13, '#22Ffc1', false);
		this.spriteState = 'normal';
		this.myRec = $OurSonic_Utility_Rectangle.$ctor1(0, 0, 0, 0);
		this.sonicLastHitTick = -2147483648;
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
	// OurSonic.UI.Controllers.AssetFrameEditorController
	var $OurSonic_UI_Controllers_$AssetFrameEditorController = function(scope) {
		this.$scope = null;
		this.$scope = scope;
		this.$scope.visible = true;
		this.$scope.model.lineWidth = 1;
	};
	$OurSonic_UI_Controllers_$AssetFrameEditorController.__typeName = 'OurSonic.UI.Controllers.$AssetFrameEditorController';
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Controllers.LevelSelectorController
	var $OurSonic_UI_Controllers_$LevelSelectorController = function(scope, createUIService) {
		this.$scope = null;
		this.$createUIService = null;
		this.$scope = scope;
		this.$scope.visible = true;
		this.$createUIService = createUIService;
		this.$scope.model = $OurSonic_UI_Scope_Controller_LevelSelectorScopeModel.$ctor();
		this.$scope.callback = $OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback.$ctor();
		scope.model.loadingStatus = 'Level Not Loaded';
		this.$scope.callback.windowClosed = function() {
		};
		this.$scope.callback.loadLevel = ss.delegateCombine(this.$scope.callback.loadLevel, ss.mkdel(this, this.$loadLevelFn));
		//scope.SwingAway(SwingDirection.Left, false, null);
		scope.$watch('model.selectedLevel', ss.mkdel(this, function() {
			if (ss.isValue(this.$scope.model.selectedLevel)) {
				this.$scope.callback.loadLevel(this.$scope.model.selectedLevel);
			}
		}));
		var neverGot = true;
		$OurSonic_SonicEngine.instance.client.on('LoadLevel.Response', ss.mkdel(this, this.$loadLevel));
		window.setTimeout(ss.mkdel(this, function() {
			if (neverGot) {
				scope.model.loadingStatus = 'Connection Failed, static level loaded';
				this.$loadLevel(new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(ss.cast(window.window.STATICLEVEL, String)));
				scope.$apply();
			}
		}), 3000);
		$OurSonic_SonicEngine.instance.client.on('GetLevels.Response', function(data) {
			neverGot = false;
			scope.model.levels = ss.arrayClone(OurSonicModels.Common.EnumerableExtensions.select$1(String, $OurSonic_UI_Scope_Controller_LevelModel).call(null, OurSonicModels.Common.EnumerableExtensions.orderBy$4(String).call(null, data.Data, function(a) {
				return a;
			}), function(a1) {
				var $t1 = $OurSonic_UI_Scope_Controller_LevelModel.$ctor();
				$t1.name = a1;
				return $t1;
			}));
			scope.$apply();
		});
		$OurSonic_SonicEngine.instance.client.emit('GetLevels.Request', null);
	};
	$OurSonic_UI_Controllers_$LevelSelectorController.__typeName = 'OurSonic.UI.Controllers.$LevelSelectorController';
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Controllers.ObjectFrameworkEditorController
	var $OurSonic_UI_Controllers_$ObjectFrameworkEditorController = function(scope, createUIService) {
		this.$scope = null;
		this.$createUIService = null;
		this.$scope = scope;
		this.$scope.visible = true;
		this.$createUIService = createUIService;
		scope.callback.editAssetFrame = ss.mkdel(this, this.$editAssetFrameFn);
		scope.callback.addAsset = ss.mkdel(this, this.$addAssetFn);
		scope.callback.addPiece = ss.mkdel(this, this.$addPieceFn);
		scope.callback.addPieceLayout = ss.mkdel(this, this.$addPieceLayoutFn);
		scope.callback.addProjectile = ss.mkdel(this, this.$addProjectileFn);
		scope.callback.addFrameToAsset = ss.mkdel(this, this.$addFrameToAssetFn);
		scope.callback.removeFrameFromAsset = ss.mkdel(this, this.$removeFrameFromAssetFn);
		scope.callback.removeAsset = ss.mkdel(this, this.$removeAssetFn);
		scope.callback.removePiece = ss.mkdel(this, this.$removedPieceFn);
		scope.callback.removePieceLayout = ss.mkdel(this, this.$removePieceLayoutFn);
		scope.callback.removeProjectile = ss.mkdel(this, this.$removeProjectileFn);
		scope.callback.saveChanges = ss.mkdel(this, this.$saveChangesFn);
		scope.callback.modifyScript = ss.mkdel(this, this.$modifyScriptFn);
		scope.model.codeMirrorOptions = {
			lineNumbers: true,
			theme: 'midnight',
			mode: 'javascript',
			gutters: ['CodeMirror-linenumbers', 'breakpoints'],
			onGutterClick: function(cm, n, gutter, evt) {
				scope.model.codeMirror = cm;
			},
			onLoad: function(editor) {
				scope.model.codeMirror = editor;
			}
		};
		scope.$watch('model.selectedAsset', ss.mkdel(this, function(newValue) {
			if (ss.isValue(newValue)) {
				this.$resetModel();
				this.$scope.model.selectedAsset = ss.cast(newValue, $OurSonic_Level_Objects_LevelObjectAsset);
				this.$scope.model.selectedAssetFrame = this.$scope.model.selectedAsset.frames[0];
			}
		}));
		scope.$watch('model.selectedPiece', ss.mkdel(this, function(newValue1) {
			if (ss.isValue(newValue1)) {
				this.$resetModel();
				this.$scope.model.selectedPiece = newValue1;
			}
		}));
		scope.$watch('model.selectedPieceLayout', ss.mkdel(this, function(newValue2) {
			if (ss.isValue(newValue2)) {
				this.$resetModel();
				this.$scope.model.selectedPieceLayout = ss.cast(newValue2, $OurSonic_Level_Objects_LevelObjectPieceLayout);
				this.$scope.model.selectedPieceLayoutPiece = this.$scope.model.selectedPieceLayout.pieces[0];
			}
		}));
		scope.$watch('model.selectedProjectile', ss.mkdel(this, function(newValue3) {
			if (ss.isValue(newValue3)) {
				this.$resetModel();
				this.$scope.model.selectedProjectile = newValue3;
			}
		}));
		this.$resetModel();
	};
	$OurSonic_UI_Controllers_$ObjectFrameworkEditorController.__typeName = 'OurSonic.UI.Controllers.$ObjectFrameworkEditorController';
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Controllers.ObjectFrameworkListController
	var $OurSonic_UI_Controllers_$ObjectFrameworkListController = function(scope, createUIService) {
		this.$scope = null;
		this.$createUIService = null;
		this.$scope = scope;
		this.$scope.visible = true;
		this.$createUIService = createUIService;
		this.$scope.model = $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel.$ctor();
		this.$scope.callback = $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback.$ctor();
		this.$scope.callback.loadObject = ss.delegateCombine(this.$scope.callback.loadObject, ss.mkdel(this, this.$loadObjectFn));
		scope.$watch('model.selectedObject', ss.mkdel(this, function() {
			if (ss.isValue(this.$scope.model.selectedObject)) {
				this.$loadObjectFn(this.$scope.model.selectedObject);
			}
		}));
		$OurSonic_SonicEngine.instance.client.on('GetAllObjectsData.Response', function(data) {
			var obj = data.Data;
			scope.model.objects = ss.arrayClone(OurSonicModels.Common.EnumerableExtensions.select$1(OurSonicModels.ObjectModelData, $OurSonic_UI_Controllers_ObjectModel).call(null, OurSonicModels.Common.EnumerableExtensions.orderBy$4(OurSonicModels.ObjectModelData).call(null, obj, function(a) {
				return a.name;
			}), function(a1) {
				var $t1 = $OurSonic_UI_Controllers_ObjectModel.$ctor();
				$t1.name = a1.name;
				$t1.object = $OurSonic_Level_Objects_ObjectManager.extendObject($.parseJSON(a1.data));
				return $t1;
			}));
			scope.$apply();
		});
		this.$scope.callback.createFramework = ss.delegateCombine(this.$scope.callback.createFramework, ss.mkdel(this, this.$createFrameworkFn));
		$OurSonic_SonicEngine.instance.client.emit('GetAllObjectsData', '');
	};
	$OurSonic_UI_Controllers_$ObjectFrameworkListController.__typeName = 'OurSonic.UI.Controllers.$ObjectFrameworkListController';
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Controllers.TileEditorController
	var $OurSonic_UI_Controllers_$TileEditorController = function(scope, createUIService) {
		this.$scope = null;
		this.$createUIService = null;
		this.$scope = scope;
		this.$scope.visible = true;
		this.$createUIService = createUIService;
		scope.model.tileChunkInfo = $OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel.$ctor();
		var $t2 = scope.model.tileChunkInfo;
		var $t1 = $OurSonic_Level_Tiles_TileChunkDebugDrawOptions.$ctor();
		$t1.outlineTilePieces = true;
		$t2.debugDrawOptions = $t1;
		var $t4 = scope.model.tileChunkInfo;
		var $t3 = $OurSonic_UI_Scope_Controller_TileChunkDrawOptions.$ctor();
		$t3.showLowLayer = true;
		$t3.showHighLayer = true;
		$t4.drawOptions = $t3;
		scope.$watch('model.tileChunkInfo.debugDrawOptions.outlineTilePiece', function() {
			scope.model.tileChunkInfo.selectedTilePiece = scope.model.tileChunkInfo.debugDrawOptions.outlineTilePiece;
		});
	};
	$OurSonic_UI_Controllers_$TileEditorController.__typeName = 'OurSonic.UI.Controllers.$TileEditorController';
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Controllers.IController
	var $OurSonic_UI_Controllers_IController = function() {
	};
	$OurSonic_UI_Controllers_IController.__typeName = 'OurSonic.UI.Controllers.IController';
	global.OurSonic.UI.Controllers.IController = $OurSonic_UI_Controllers_IController;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Controllers.ObjectModel
	var $OurSonic_UI_Controllers_ObjectModel = function() {
	};
	$OurSonic_UI_Controllers_ObjectModel.__typeName = 'OurSonic.UI.Controllers.ObjectModel';
	$OurSonic_UI_Controllers_ObjectModel.createInstance = function() {
		return $OurSonic_UI_Controllers_ObjectModel.$ctor();
	};
	$OurSonic_UI_Controllers_ObjectModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		$this.object = null;
		return $this;
	};
	global.OurSonic.UI.Controllers.ObjectModel = $OurSonic_UI_Controllers_ObjectModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.AssetFrameEditType
	var $OurSonic_UI_Directives_AssetFrameEditType = function() {
	};
	$OurSonic_UI_Directives_AssetFrameEditType.__typeName = 'OurSonic.UI.Directives.AssetFrameEditType';
	global.OurSonic.UI.Directives.AssetFrameEditType = $OurSonic_UI_Directives_AssetFrameEditType;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasAssetFrameDirective
	var $OurSonic_UI_Directives_CanvasAssetFrameDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { frame: '=', width: '=', height: '=', inline: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasAssetFrameDirective.__typeName = 'OurSonic.UI.Directives.CanvasAssetFrameDirective';
	global.OurSonic.UI.Directives.CanvasAssetFrameDirective = $OurSonic_UI_Directives_CanvasAssetFrameDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasAssetFrameEditDirective
	var $OurSonic_UI_Directives_CanvasAssetFrameEditDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas> ';
		this.replace = true;
		this.transclude = true;
		this.scope = { frame: '=', width: '=', height: '=', edit: '=', editColor: '=', lineWidth: '=', editType: '=', editPaletteIndex: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasAssetFrameEditDirective.__typeName = 'OurSonic.UI.Directives.CanvasAssetFrameEditDirective';
	global.OurSonic.UI.Directives.CanvasAssetFrameEditDirective = $OurSonic_UI_Directives_CanvasAssetFrameEditDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasAssetFramePaletteEditDirective
	var $OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { frame: '=', selectedPaletteIndex: '=', showCurrent: '=', width: '=', edit: '=', height: '=', wide: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective.__typeName = 'OurSonic.UI.Directives.CanvasAssetFramePaletteEditDirective';
	global.OurSonic.UI.Directives.CanvasAssetFramePaletteEditDirective = $OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasPieceAssetDirective
	var $OurSonic_UI_Directives_CanvasPieceAssetDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { asset: '=', width: '=', height: '=', inline: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasPieceAssetDirective.__typeName = 'OurSonic.UI.Directives.CanvasPieceAssetDirective';
	global.OurSonic.UI.Directives.CanvasPieceAssetDirective = $OurSonic_UI_Directives_CanvasPieceAssetDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasPieceLayoutDirective
	var $OurSonic_UI_Directives_CanvasPieceLayoutDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { pieceLayout: '=', objectData: '=', width: '=', height: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasPieceLayoutDirective.__typeName = 'OurSonic.UI.Directives.CanvasPieceLayoutDirective';
	global.OurSonic.UI.Directives.CanvasPieceLayoutDirective = $OurSonic_UI_Directives_CanvasPieceLayoutDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasPieceLayoutEditDirective
	var $OurSonic_UI_Directives_CanvasPieceLayoutEditDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { pieceLayout: '=', objectData: '=', selectedPieceLayoutPiece: '=', showImages: '=', width: '=', scale: '=', height: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasPieceLayoutEditDirective.__typeName = 'OurSonic.UI.Directives.CanvasPieceLayoutEditDirective';
	global.OurSonic.UI.Directives.CanvasPieceLayoutEditDirective = $OurSonic_UI_Directives_CanvasPieceLayoutEditDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasTileChunkDirective
	var $OurSonic_UI_Directives_CanvasTileChunkDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { tileChunk: '=', width: '=', shouldAnimate: '=', height: '=', debugDrawOptions: '=', drawOptions: '=', edit: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasTileChunkDirective.__typeName = 'OurSonic.UI.Directives.CanvasTileChunkDirective';
	global.OurSonic.UI.Directives.CanvasTileChunkDirective = $OurSonic_UI_Directives_CanvasTileChunkDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.CanvasTilePieceDirective
	var $OurSonic_UI_Directives_CanvasTilePieceDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.template = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.template = '<canvas></canvas>';
		this.replace = true;
		this.transclude = true;
		this.scope = { tilePiece: '=', width: '=', shouldAnimate: '=', height: '=', edit: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_CanvasTilePieceDirective.__typeName = 'OurSonic.UI.Directives.CanvasTilePieceDirective';
	global.OurSonic.UI.Directives.CanvasTilePieceDirective = $OurSonic_UI_Directives_CanvasTilePieceDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.DraggableDirective
	var $OurSonic_UI_Directives_DraggableDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_DraggableDirective.__typeName = 'OurSonic.UI.Directives.DraggableDirective';
	global.OurSonic.UI.Directives.DraggableDirective = $OurSonic_UI_Directives_DraggableDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.FancyHorizontalListDirective
	var $OurSonic_UI_Directives_FancyHorizontalListDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.templateUrl = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/fancyHorizontalList.html', $OurSonic_Utility_Constants.contentAddress);
		this.replace = true;
		this.transclude = true;
		this.scope = { items: '=', bind: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_FancyHorizontalListDirective.__typeName = 'OurSonic.UI.Directives.FancyHorizontalListDirective';
	global.OurSonic.UI.Directives.FancyHorizontalListDirective = $OurSonic_UI_Directives_FancyHorizontalListDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.FancyHorizontalListIndexDirective
	var $OurSonic_UI_Directives_FancyHorizontalListIndexDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.templateUrl = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/fancyHorizontalListIndex.html', $OurSonic_Utility_Constants.contentAddress);
		this.replace = true;
		this.transclude = true;
		this.scope = { items: '=', bindIndex: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_FancyHorizontalListIndexDirective.__typeName = 'OurSonic.UI.Directives.FancyHorizontalListIndexDirective';
	global.OurSonic.UI.Directives.FancyHorizontalListIndexDirective = $OurSonic_UI_Directives_FancyHorizontalListIndexDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.FancyListDirective
	var $OurSonic_UI_Directives_FancyListDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.templateUrl = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/fancyList.html', $OurSonic_Utility_Constants.contentAddress);
		this.replace = true;
		this.transclude = true;
		this.scope = { items: '=', bind: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_FancyListDirective.__typeName = 'OurSonic.UI.Directives.FancyListDirective';
	global.OurSonic.UI.Directives.FancyListDirective = $OurSonic_UI_Directives_FancyListDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.FancyListIndexDirective
	var $OurSonic_UI_Directives_FancyListIndexDirective = function() {
		this.link = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.templateUrl = null;
		this.transclude = false;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/fancyListIndex.html', $OurSonic_Utility_Constants.contentAddress);
		this.replace = true;
		this.transclude = true;
		this.scope = { items: '=', bindIndex: '=' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_FancyListIndexDirective.__typeName = 'OurSonic.UI.Directives.FancyListIndexDirective';
	global.OurSonic.UI.Directives.FancyListIndexDirective = $OurSonic_UI_Directives_FancyListIndexDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.FloatingWindowDirective
	var $OurSonic_UI_Directives_FloatingWindowDirective = function() {
		this.link = null;
		this.$myElement = null;
		this.$myScope = null;
		this.replace = false;
		this.restrict = null;
		this.scope = null;
		this.templateUrl = null;
		this.transclude = false;
		//            myUIManagerService = uiManagerService;
		this.restrict = 'EA';
		this.templateUrl = ss.formatString('{0}partials/floatingWindow.html', $OurSonic_Utility_Constants.contentAddress);
		this.replace = true;
		this.transclude = true;
		this.scope = { width: '=', height: '=', left: '=', top: '=', windowTitle: '=', visible: '=', onclose: '&' };
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_FloatingWindowDirective.__typeName = 'OurSonic.UI.Directives.FloatingWindowDirective';
	global.OurSonic.UI.Directives.FloatingWindowDirective = $OurSonic_UI_Directives_FloatingWindowDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Directives.ForNextDirective
	var $OurSonic_UI_Directives_ForNextDirective = function() {
		this.link = null;
		this.link = ss.mkdel(this, this.$linkFn);
	};
	$OurSonic_UI_Directives_ForNextDirective.__typeName = 'OurSonic.UI.Directives.ForNextDirective';
	global.OurSonic.UI.Directives.ForNextDirective = $OurSonic_UI_Directives_ForNextDirective;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope._KeepBaseScopeAlive
	var $OurSonic_UI_Scope__KeepBaseScopeAlive = function() {
	};
	$OurSonic_UI_Scope__KeepBaseScopeAlive.__typeName = 'OurSonic.UI.Scope._KeepBaseScopeAlive';
	global.OurSonic.UI.Scope._KeepBaseScopeAlive = $OurSonic_UI_Scope__KeepBaseScopeAlive;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.AssetFrameEditorScope
	var $OurSonic_UI_Scope_Controller_AssetFrameEditorScope = function() {
		this.model = null;
		this.callback = null;
		$OurSonic_UI_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScope.__typeName = 'OurSonic.UI.Scope.Controller.AssetFrameEditorScope';
	global.OurSonic.UI.Scope.Controller.AssetFrameEditorScope = $OurSonic_UI_Scope_Controller_AssetFrameEditorScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.AssetFrameEditorScopeCallback
	var $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback = function() {
	};
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback.__typeName = 'OurSonic.UI.Scope.Controller.AssetFrameEditorScopeCallback';
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback.$ctor();
	};
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback.$ctor = function() {
		var $this = {};
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.AssetFrameEditorScopeCallback = $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.AssetFrameEditorScopeModel
	var $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel = function() {
	};
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel.__typeName = 'OurSonic.UI.Scope.Controller.AssetFrameEditorScopeModel';
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel.$ctor = function() {
		var $this = {};
		$this.frame = null;
		$this.editOffset = false;
		$this.editHurtMap = false;
		$this.editCollisionMap = false;
		$this.lineWidth = 0;
		$this.currentColor = 0;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.AssetFrameEditorScopeModel = $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.LevelModel
	var $OurSonic_UI_Scope_Controller_LevelModel = function() {
	};
	$OurSonic_UI_Scope_Controller_LevelModel.__typeName = 'OurSonic.UI.Scope.Controller.LevelModel';
	$OurSonic_UI_Scope_Controller_LevelModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_LevelModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_LevelModel.$ctor = function() {
		var $this = {};
		$this.name = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.LevelModel = $OurSonic_UI_Scope_Controller_LevelModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.LevelSelectorScope
	var $OurSonic_UI_Scope_Controller_LevelSelectorScope = function() {
		this.model = null;
		this.callback = null;
		$OurSonic_UI_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	$OurSonic_UI_Scope_Controller_LevelSelectorScope.__typeName = 'OurSonic.UI.Scope.Controller.LevelSelectorScope';
	global.OurSonic.UI.Scope.Controller.LevelSelectorScope = $OurSonic_UI_Scope_Controller_LevelSelectorScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.LevelSelectorScopeCallback
	var $OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback = function() {
	};
	$OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback.__typeName = 'OurSonic.UI.Scope.Controller.LevelSelectorScopeCallback';
	$OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback.$ctor();
	};
	$OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback.$ctor = function() {
		var $this = {};
		$this.windowClosed = null;
		$this.loadLevel = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.LevelSelectorScopeCallback = $OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.LevelSelectorScopeModel
	var $OurSonic_UI_Scope_Controller_LevelSelectorScopeModel = function() {
	};
	$OurSonic_UI_Scope_Controller_LevelSelectorScopeModel.__typeName = 'OurSonic.UI.Scope.Controller.LevelSelectorScopeModel';
	$OurSonic_UI_Scope_Controller_LevelSelectorScopeModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_LevelSelectorScopeModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_LevelSelectorScopeModel.$ctor = function() {
		var $this = {};
		$this.selectedLevel = null;
		$this.loadingStatus = null;
		$this.levels = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.LevelSelectorScopeModel = $OurSonic_UI_Scope_Controller_LevelSelectorScopeModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ModifyScript
	var $OurSonic_UI_Scope_Controller_ModifyScript = function() {
	};
	$OurSonic_UI_Scope_Controller_ModifyScript.__typeName = 'OurSonic.UI.Scope.Controller.ModifyScript';
	global.OurSonic.UI.Scope.Controller.ModifyScript = $OurSonic_UI_Scope_Controller_ModifyScript;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScope
	var $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope = function() {
		this.model = null;
		this.callback = null;
		$OurSonic_UI_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope.__typeName = 'OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScope';
	global.OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScope = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScopeCallback
	var $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback = function() {
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.__typeName = 'OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScopeCallback';
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.$ctor();
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.$ctor = function() {
		var $this = {};
		$this.editAssetFrame = null;
		$this.addAsset = null;
		$this.addPiece = null;
		$this.addPieceLayout = null;
		$this.addProjectile = null;
		$this.addFrameToAsset = null;
		$this.removeFrameFromAsset = null;
		$this.removeAsset = null;
		$this.removePiece = null;
		$this.removePieceLayout = null;
		$this.removeProjectile = null;
		$this.modifyScript = null;
		$this.saveChanges = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScopeCallback = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScopeModel
	var $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel = function() {
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.__typeName = 'OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScopeModel';
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.$ctor = function() {
		var $this = {};
		$this.objectData = null;
		$this.selectedAsset = null;
		$this.selectedPiece = null;
		$this.selectedPieceLayout = null;
		$this.selectedProjectile = null;
		$this.selectedAssetFrame = null;
		$this.assetEditType = null;
		$this.selectedPieceLayoutPiece = null;
		$this.modifyScript = null;
		$this.codeMirrorOptions = null;
		$this.codeMirror = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.ObjectFrameworkEditorScopeModel = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ObjectFrameworkListScope
	var $OurSonic_UI_Scope_Controller_ObjectFrameworkListScope = function() {
		this.model = null;
		this.callback = null;
		$OurSonic_UI_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScope.__typeName = 'OurSonic.UI.Scope.Controller.ObjectFrameworkListScope';
	global.OurSonic.UI.Scope.Controller.ObjectFrameworkListScope = $OurSonic_UI_Scope_Controller_ObjectFrameworkListScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ObjectFrameworkListScopeCallback
	var $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback = function() {
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback.__typeName = 'OurSonic.UI.Scope.Controller.ObjectFrameworkListScopeCallback';
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback.$ctor();
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback.$ctor = function() {
		var $this = {};
		$this.loadObject = null;
		$this.createFramework = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.ObjectFrameworkListScopeCallback = $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.ObjectFrameworkListScopeModel
	var $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel = function() {
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel.__typeName = 'OurSonic.UI.Scope.Controller.ObjectFrameworkListScopeModel';
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel.$ctor = function() {
		var $this = {};
		$this.selectedObject = null;
		$this.objects = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.ObjectFrameworkListScopeModel = $OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.TileChunkDrawOptions
	var $OurSonic_UI_Scope_Controller_TileChunkDrawOptions = function() {
	};
	$OurSonic_UI_Scope_Controller_TileChunkDrawOptions.__typeName = 'OurSonic.UI.Scope.Controller.TileChunkDrawOptions';
	$OurSonic_UI_Scope_Controller_TileChunkDrawOptions.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_TileChunkDrawOptions.$ctor();
	};
	$OurSonic_UI_Scope_Controller_TileChunkDrawOptions.$ctor = function() {
		var $this = {};
		$this.showLowLayer = false;
		$this.showHighLayer = false;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.TileChunkDrawOptions = $OurSonic_UI_Scope_Controller_TileChunkDrawOptions;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.TileChunkInfoScopeModel
	var $OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel = function() {
	};
	$OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel.__typeName = 'OurSonic.UI.Scope.Controller.TileChunkInfoScopeModel';
	$OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel.$ctor = function() {
		var $this = {};
		$this.selectedTilePiece = null;
		$this.debugDrawOptions = null;
		$this.drawOptions = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.TileChunkInfoScopeModel = $OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.TileEditorScope
	var $OurSonic_UI_Scope_Controller_TileEditorScope = function() {
		this.model = null;
		this.callback = null;
		$OurSonic_UI_Scope_Directive_FloatingWindowBaseScope.call(this);
	};
	$OurSonic_UI_Scope_Controller_TileEditorScope.__typeName = 'OurSonic.UI.Scope.Controller.TileEditorScope';
	global.OurSonic.UI.Scope.Controller.TileEditorScope = $OurSonic_UI_Scope_Controller_TileEditorScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.TileEditorScopeCallback
	var $OurSonic_UI_Scope_Controller_TileEditorScopeCallback = function() {
	};
	$OurSonic_UI_Scope_Controller_TileEditorScopeCallback.__typeName = 'OurSonic.UI.Scope.Controller.TileEditorScopeCallback';
	$OurSonic_UI_Scope_Controller_TileEditorScopeCallback.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_TileEditorScopeCallback.$ctor();
	};
	$OurSonic_UI_Scope_Controller_TileEditorScopeCallback.$ctor = function() {
		var $this = {};
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.TileEditorScopeCallback = $OurSonic_UI_Scope_Controller_TileEditorScopeCallback;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Controller.TileEditorScopeModel
	var $OurSonic_UI_Scope_Controller_TileEditorScopeModel = function() {
	};
	$OurSonic_UI_Scope_Controller_TileEditorScopeModel.__typeName = 'OurSonic.UI.Scope.Controller.TileEditorScopeModel';
	$OurSonic_UI_Scope_Controller_TileEditorScopeModel.createInstance = function() {
		return $OurSonic_UI_Scope_Controller_TileEditorScopeModel.$ctor();
	};
	$OurSonic_UI_Scope_Controller_TileEditorScopeModel.$ctor = function() {
		var $this = {};
		$this.tileChunks = null;
		$this.tilePieces = null;
		$this.tileChunkInfo = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Controller.TileEditorScopeModel = $OurSonic_UI_Scope_Controller_TileEditorScopeModel;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasAssetFrameEditScope
	var $OurSonic_UI_Scope_Directive_CanvasAssetFrameEditScope = function() {
		this.frame = null;
		this.width = 0;
		this.height = 0;
		this.lineWidth = 0;
		this.editPaletteIndex = 0;
		this.edit = false;
		this.editType = null;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasAssetFrameEditScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasAssetFrameEditScope';
	global.OurSonic.UI.Scope.Directive.CanvasAssetFrameEditScope = $OurSonic_UI_Scope_Directive_CanvasAssetFrameEditScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasAssetFramePaletteEditScope
	var $OurSonic_UI_Scope_Directive_CanvasAssetFramePaletteEditScope = function() {
		this.frame = null;
		this.width = 0;
		this.height = 0;
		this.selectedPaletteIndex = 0;
		this.showCurrent = false;
		this.wide = false;
		this.edit = false;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasAssetFramePaletteEditScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasAssetFramePaletteEditScope';
	global.OurSonic.UI.Scope.Directive.CanvasAssetFramePaletteEditScope = $OurSonic_UI_Scope_Directive_CanvasAssetFramePaletteEditScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasAssetFrameScope
	var $OurSonic_UI_Scope_Directive_CanvasAssetFrameScope = function() {
		this.frame = null;
		this.inline = false;
		this.width = 0;
		this.height = 0;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasAssetFrameScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasAssetFrameScope';
	global.OurSonic.UI.Scope.Directive.CanvasAssetFrameScope = $OurSonic_UI_Scope_Directive_CanvasAssetFrameScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasPieceLayoutEditScope
	var $OurSonic_UI_Scope_Directive_CanvasPieceLayoutEditScope = function() {
		this.pieceLayout = null;
		this.width = 0;
		this.height = 0;
		this.showImages = false;
		this.selectedPieceLayoutPiece = null;
		this.scale = 0;
		this.zeroPosition = null;
		this.objectData = null;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasPieceLayoutEditScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasPieceLayoutEditScope';
	global.OurSonic.UI.Scope.Directive.CanvasPieceLayoutEditScope = $OurSonic_UI_Scope_Directive_CanvasPieceLayoutEditScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasPieceLayoutScope
	var $OurSonic_UI_Scope_Directive_CanvasPieceLayoutScope = function() {
		this.pieceLayout = null;
		this.width = 0;
		this.height = 0;
		this.objectData = null;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasPieceLayoutScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasPieceLayoutScope';
	global.OurSonic.UI.Scope.Directive.CanvasPieceLayoutScope = $OurSonic_UI_Scope_Directive_CanvasPieceLayoutScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasPieceScope
	var $OurSonic_UI_Scope_Directive_CanvasPieceScope = function() {
		this.asset = null;
		this.inline = false;
		this.width = 0;
		this.height = 0;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasPieceScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasPieceScope';
	global.OurSonic.UI.Scope.Directive.CanvasPieceScope = $OurSonic_UI_Scope_Directive_CanvasPieceScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasTileChunkScope
	var $OurSonic_UI_Scope_Directive_CanvasTileChunkScope = function() {
		this.tileChunk = null;
		this.width = 0;
		this.edit = false;
		this.height = 0;
		this.shouldAnimate = false;
		this.debugDrawOptions = null;
		this.drawOptions = null;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasTileChunkScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasTileChunkScope';
	global.OurSonic.UI.Scope.Directive.CanvasTileChunkScope = $OurSonic_UI_Scope_Directive_CanvasTileChunkScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.CanvasTilePieceScope
	var $OurSonic_UI_Scope_Directive_CanvasTilePieceScope = function() {
		this.tilePiece = null;
		this.width = 0;
		this.edit = false;
		this.height = 0;
		this.shouldAnimate = false;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_CanvasTilePieceScope.__typeName = 'OurSonic.UI.Scope.Directive.CanvasTilePieceScope';
	global.OurSonic.UI.Scope.Directive.CanvasTilePieceScope = $OurSonic_UI_Scope_Directive_CanvasTilePieceScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.FloatingWindowBaseScope
	var $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope = function() {
		this.swingAway = null;
		this.swingBack = null;
		this.minimize = null;
		this.visible = false;
		this.minimized = false;
		this.onClose = null;
		this.onReady = null;
		this.destroyWindow = null;
		$OurSonic_UI_Services_ManagedScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_FloatingWindowBaseScope.__typeName = 'OurSonic.UI.Scope.Directive.FloatingWindowBaseScope';
	global.OurSonic.UI.Scope.Directive.FloatingWindowBaseScope = $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.FloatingWindowPosition
	var $OurSonic_UI_Scope_Directive_FloatingWindowPosition = function() {
	};
	$OurSonic_UI_Scope_Directive_FloatingWindowPosition.__typeName = 'OurSonic.UI.Scope.Directive.FloatingWindowPosition';
	$OurSonic_UI_Scope_Directive_FloatingWindowPosition.createInstance = function() {
		return $OurSonic_UI_Scope_Directive_FloatingWindowPosition.$ctor();
	};
	$OurSonic_UI_Scope_Directive_FloatingWindowPosition.$ctor = function() {
		var $this = {};
		$this.display = null;
		$this.left = null;
		$this.top = null;
		$this.marginLeft = null;
		$this.marginTop = null;
		$this.zIndex = 0;
		return $this;
	};
	global.OurSonic.UI.Scope.Directive.FloatingWindowPosition = $OurSonic_UI_Scope_Directive_FloatingWindowPosition;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.FloatingWindowScope
	var $OurSonic_UI_Scope_Directive_FloatingWindowScope = function() {
		this.$parent = null;
		this.visible = false;
		this.width = null;
		this.height = null;
		this.left = null;
		this.top = null;
		this.sizeStyle = null;
		this.lastSizeStyle = null;
		this.positionStyles = null;
		this.lastPositionStyles = null;
		this.windowTitle = null;
		this.onclose = null;
		this.close = null;
		this.minimize = null;
		this.maximize = null;
		this.restore = null;
		this.isMaximized = false;
		OurSonic.UI.Scope.BaseScope.call(this);
	};
	$OurSonic_UI_Scope_Directive_FloatingWindowScope.__typeName = 'OurSonic.UI.Scope.Directive.FloatingWindowScope';
	global.OurSonic.UI.Scope.Directive.FloatingWindowScope = $OurSonic_UI_Scope_Directive_FloatingWindowScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.Size
	var $OurSonic_UI_Scope_Directive_Size = function() {
	};
	$OurSonic_UI_Scope_Directive_Size.__typeName = 'OurSonic.UI.Scope.Directive.Size';
	$OurSonic_UI_Scope_Directive_Size.createInstance = function() {
		return $OurSonic_UI_Scope_Directive_Size.$ctor();
	};
	$OurSonic_UI_Scope_Directive_Size.$ctor = function() {
		var $this = {};
		$this.width = null;
		$this.height = null;
		return $this;
	};
	global.OurSonic.UI.Scope.Directive.Size = $OurSonic_UI_Scope_Directive_Size;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Scope.Directive.SwingDirection
	var $OurSonic_UI_Scope_Directive_SwingDirection = function() {
	};
	$OurSonic_UI_Scope_Directive_SwingDirection.__typeName = 'OurSonic.UI.Scope.Directive.SwingDirection';
	global.OurSonic.UI.Scope.Directive.SwingDirection = $OurSonic_UI_Scope_Directive_SwingDirection;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Services.CreatedUI
	var $OurSonic_UI_Services_CreatedUI$1 = function(T) {
		var $type = function(scope, element) {
			this.scope = null;
			this.element = null;
			this.scope = scope;
			this.element = element;
		};
		ss.registerGenericClassInstance($type, $OurSonic_UI_Services_CreatedUI$1, [T], {
			destroy: function() {
				if (!ss.staticEquals(this.scope.onDestroy, null)) {
					this.scope.onDestroy();
				}
				this.scope.$destroy();
				this.element.remove();
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$OurSonic_UI_Services_CreatedUI$1.__typeName = 'OurSonic.UI.Services.CreatedUI$1';
	ss.initGenericClass($OurSonic_UI_Services_CreatedUI$1, $asm, 1);
	global.OurSonic.UI.Services.CreatedUI$1 = $OurSonic_UI_Services_CreatedUI$1;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Services.CreateUIService
	var $OurSonic_UI_Services_CreateUIService = function(compileService, rootScopeService) {
		this.$myCompileService = null;
		this.$myRootScopeService = null;
		this.$singltons = {};
		this.$myCompileService = compileService;
		this.$myRootScopeService = rootScopeService;
	};
	$OurSonic_UI_Services_CreateUIService.__typeName = 'OurSonic.UI.Services.CreateUIService';
	global.OurSonic.UI.Services.CreateUIService = $OurSonic_UI_Services_CreateUIService;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UI.Services.ManagedScope
	var $OurSonic_UI_Services_ManagedScope = function() {
		this.onDestroy = null;
		OurSonic.UI.Scope.BaseScope.call(this);
	};
	$OurSonic_UI_Services_ManagedScope.__typeName = 'OurSonic.UI.Services.ManagedScope';
	global.OurSonic.UI.Services.ManagedScope = $OurSonic_UI_Services_ManagedScope;
	////////////////////////////////////////////////////////////////////////////////
	// OurSonic.UIManager.Button
	var $OurSonic_UIManager_Button = function(x, y, width, height, text) {
		this.font = null;
		this.toggle = false;
		this.toggled = false;
		this.$clicking = false;
		this.$button2Grad = null;
		this.button1Grad = null;
		this.$buttonBorderGrad = null;
		this.text = null;
		this.color = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.text = text;
		this.toggle = false;
		this.toggled = false;
		this.font = $OurSonic_UIManager_UIManager.buttonFont;
		this.$clicking = false;
		this.button1Grad = null;
		this.$button2Grad = null;
		this.$buttonBorderGrad = null;
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
		this.$startDragging = null;
		this.$dragg = null;
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
		this.$clicking = false;
		this.$button2Grad = null;
		this.onDraw = null;
		this.button1Grad = null;
		this.$buttonBorderGrad = null;
		this.text = null;
		this.color = null;
		$OurSonic_UIManager_Element.call(this, x, y);
		this.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('');
		this.toggle = false;
		this.toggled = false;
		this.font = '';
		this.$clicking = false;
		this.onDraw = null;
		this.button1Grad = null;
		this.$button2Grad = null;
		this.$buttonBorderGrad = null;
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
		this.$canvasDepths = null;
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
		//            new LevelSelectorArea(this);
		new $OurSonic_Areas_ColorEditorArea(this);
		//            new ObjectFrameworkArea(this);
		//            new ObjectFrameworkListArea(this);
		var l = new $OurSonic_Areas_LevelManagerArea(this);
		l.levelManager.visible = false;
		sonicManager.onLevelLoad = ss.delegateCombine(sonicManager.onLevelLoad, function(level) {
			l.levelManager.visible = true;
			//                                            new TileChunkArea(this);
		});
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
	// OurSonic.Utility.CanvasInformation
	var $OurSonic_Utility_CanvasInformation = function(context, domCanvas) {
		this.context = null;
		this.domCanvas = null;
		this.canvas = null;
		this.context = context;
		this.domCanvas = domCanvas;
		var $t1 = domCanvas[0];
		this.canvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
	};
	$OurSonic_Utility_CanvasInformation.__typeName = 'OurSonic.Utility.CanvasInformation';
	$OurSonic_Utility_CanvasInformation.get_blackPixel = function() {
		if (ss.isNullOrUndefined($OurSonic_Utility_CanvasInformation.$blackPixel)) {
			var m = $OurSonic_Utility_CanvasInformation.create(0, 0, false);
			m.context.fillStyle = 'black';
			m.context.fillRect(0, 0, 1, 1);
			$OurSonic_Utility_CanvasInformation.$blackPixel = m.canvas;
		}
		return $OurSonic_Utility_CanvasInformation.$blackPixel;
	};
	$OurSonic_Utility_CanvasInformation.create = function(w, h, pixelated) {
		var $t1 = document.createElement('canvas');
		var canvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
		return $OurSonic_Utility_CanvasInformation.create$1(canvas, w, h, pixelated);
	};
	$OurSonic_Utility_CanvasInformation.create$1 = function(canvas, w, h, pixelated) {
		if (w === 0) {
			w = 1;
		}
		if (h === 0) {
			h = 1;
		}
		canvas.width = w;
		canvas.height = h;
		var ctx = ss.cast(canvas.getContext('2d'), CanvasRenderingContext2D);
		if (pixelated) {
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;
		}
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
	$OurSonic_Utility_Extensions.offsetPixelsForWater = function(context) {
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
		var imaged = context.getImageData(0, 0, 320, 224);
		var imaged2 = context.getImageData(0, 0, 320, 224);
		var imagedArray = imaged.data;
		var imaged2Array = imaged2.data;
		var n = offsets_.length;
		for (var y = 0; y < 224; y++) {
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
	// OurSonic.Utility.FloatPoint
	var $OurSonic_Utility_FloatPoint = function() {
	};
	$OurSonic_Utility_FloatPoint.__typeName = 'OurSonic.Utility.FloatPoint';
	$OurSonic_Utility_FloatPoint.offset = function($this, windowLocation) {
		return $OurSonic_Utility_FloatPoint.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
	};
	$OurSonic_Utility_FloatPoint.negate = function($this, windowLocation) {
		return $OurSonic_Utility_FloatPoint.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
	};
	$OurSonic_Utility_FloatPoint.negate$1 = function($this, x, y) {
		return $OurSonic_Utility_FloatPoint.$ctor1($this.x - x, $this.y - y);
	};
	$OurSonic_Utility_FloatPoint.op_Implicit = function(p) {
		return $OurSonic_Utility_FloatPoint.$ctor1(p.x, p.y);
	};
	$OurSonic_Utility_FloatPoint.string = function($this) {
		return ss.formatString('{{X:{0}, Y:{1}}}', $this.x, $this.y);
	};
	$OurSonic_Utility_FloatPoint.$ctor1 = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	$OurSonic_Utility_FloatPoint.$ctor = function(pos) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = pos.x;
		$this.y = pos.y;
		return $this;
	};
	global.OurSonic.Utility.FloatPoint = $OurSonic_Utility_FloatPoint;
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
		var canv = $OurSonic_Utility_CanvasInformation.create(image.width * scale.x, image.height * scale.y, true);
		canv.context.save();
		canv.context.scale(scale.x, scale.y);
		canv.context.drawImage(image, 0, 0);
		canv.context.restore();
		return canv;
	};
	$OurSonic_Utility_Help.scalePixelData = function(scale, data) {
		var Uint8ClampedArray = data.data;
		var colors = new Array(ss.Int32.div(Uint8ClampedArray.length, 4));
		for (var f = 0; f < Uint8ClampedArray.length; f += 4) {
			colors[ss.Int32.div(f, 4)] = $OurSonic_Utility_Help.$colorObjectFromData(Uint8ClampedArray, f);
		}
		var d = $OurSonic_Utility_CanvasInformation.create(1, 1, false).context.createImageData(data.width * scale.x, data.height * scale.y);
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
		var $t1 = document.createElement('canvas');
		var canvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
		canvas.width = data.width;
		canvas.height = data.height;
		// Copy the image contents to the canvas
		var ctx = ss.cast(canvas.getContext('2d'), CanvasRenderingContext2D);
		ctx.putImageData(data, 0, 0);
		var dataURL = canvas.toDataURL('image/png');
		return ss.cast(dataURL, String);
	};
	$OurSonic_Utility_Help.$colorObjectFromData = function(data, c) {
		var r = data[c];
		var g = data[c + 1];
		var b = data[c + 2];
		var a = data[c + 3];
		return { r: r, g: g, b: b, a: a };
	};
	$OurSonic_Utility_Help.getImageData = function(image) {
		var $t1 = document.createElement('canvas');
		var canvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
		canvas.width = image.width;
		canvas.height = image.height;
		var ctx = ss.cast(canvas.getContext('2d'), CanvasRenderingContext2D);
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
		var dc = $OurSonic_Utility_CanvasInformation.create(1, 1, false);
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
			if (key.indexOf('$') === 0) {
				return undefined;
			}
			if (key === 'image') {
				return undefined;
			}
			if (key === 'imageData') {
				return undefined;
			}
			if (key === 'oldScale') {
				return undefined;
			}
			if (key === 'sprite') {
				return undefined;
			}
			if (key === 'sprites') {
				return undefined;
			}
			if (key === 'index') {
				return undefined;
			}
			if (key === '_style') {
				return undefined;
			}
			else {
				return value;
			}
		});
		//.replaceAll("false", "0").replaceAll("true", "1");
	};
	$OurSonic_Utility_Help.safeResize = function(block, width, height) {
		var m = $OurSonic_Utility_CanvasInformation.create(width, height, false);
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
			result[ss.cast(window.window.decodeURIComponent(m[1]), String)] = ss.cast(window.window.decodeURIComponent(m[2]), String);
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
	ss.initClass($OurSonic_BuildAngular, $asm, {});
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
			this.sonicManager.clearCache();
			this.sonicManager.load(level);
			this.sonicManager.windowLocation.x = 0;
			this.sonicManager.windowLocation.y = 0;
			this.sonicManager.bigWindowLocation.x = ss.Int32.trunc(this.sonicManager.windowLocation.x - this.sonicManager.windowLocation.width * 0.2);
			this.sonicManager.bigWindowLocation.y = ss.Int32.trunc(this.sonicManager.windowLocation.y - this.sonicManager.windowLocation.height * 0.2);
			this.sonicManager.bigWindowLocation.width = ss.Int32.trunc(this.sonicManager.windowLocation.width * 1.8);
			this.sonicManager.bigWindowLocation.height = ss.Int32.trunc(this.sonicManager.windowLocation.height * 1.8);
			var dl = $OurSonic_Utility_Help.getQueryString();
			if (ss.keyExists(dl, 'run')) {
				if (this.sonicManager.currentGameState === 0) {
					$OurSonic_SonicEngine.runGame();
				}
				$OurSonic_SonicEngine.runGame();
			}
			this.sonicManager.cacheTiles();
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
			this.sonicManager.destroyCanvases();
			this.sonicManager.resetCanvases();
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
			this.sonicManager.mainDraw(this.$gameCanvas);
		},
		uiDraw: function() {
			//if (!sonicManager.InHaltMode)
			this.clear(this.$uiCanvas);
			this.$uiCanvas.context.webkitImageSmoothingEnabled = false;
			this.sonicManager.uiManager.draw(this.$uiCanvas.context);
		}
	});
	ss.initClass($OurSonic_SonicManager, $asm, {
		get_$status: function() {
			return this.$status;
		},
		set_$status: function(value) {
			$OurSonic_UIManager_UIManager.updateTitle(value);
			this.$status = value;
		},
		onClick: function(Event) {
			//Help.Debugger();
			//then clicking
			//then chunk editor/tilepiece editor/tile editor/ heightmap editor/ and proper map editor;
			this.$clicking = true;
			if (this.$effectClick(Event)) {
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
		$effectClick: function(Event) {
			//    if (CurrentGameState == GameState.Playing) return false;
			var e = $OurSonic_Utility_Point.$ctor1(ss.Int32.trunc(Event.clientX / this.scale.x / this.realScale.x + this.windowLocation.x), ss.Int32.trunc(Event.clientY / this.scale.y / this.realScale.y + this.windowLocation.y));
			//if (CurrentGameState == GameState.Playing) {
			//SonicToon.X = e.X;
			//SonicToon.X = e.Y;
			//}
			var ey;
			var ex;
			if (Event.ctrlKey) {
				ex = ss.Int32.div(e.x, 128);
				ey = ss.Int32.div(e.y, 128);
				var ch = this.sonicLevel.getChunkAt(ex, ey);
				if (ss.isValue(this.uiManager.get_uiManagerAreas().tilePieceArea)) {
					ch.setTilePieceAt(e.x - ex * 128, e.y - ey * 128, this.uiManager.get_uiManagerAreas().tilePieceArea.data, true);
				}
				return true;
			}
			if (Event.shiftKey) {
				ex = ss.Int32.div(e.x, 128);
				ey = ss.Int32.div(e.y, 128);
				var ch1 = this.sonicLevel.getChunkAt(ex, ey);
				if (ss.isValue(this.uiManager.get_uiManagerAreas().tileChunkArea)) {
					this.sonicLevel.setChunkAt(ex, ey, this.uiManager.get_uiManagerAreas().tileChunkArea.data);
				}
				return true;
			}
			if (Event.button === 0) {
				switch (this.clickState) {
					case 0: {
						return true;
					}
					case 1: {
						ex = ss.Int32.div(e.x, 128);
						ey = ss.Int32.div(e.y, 128);
						var ch2 = this.sonicLevel.getChunkAt(ex, ey);
						var tp = ch2.getTilePieceAt(e.x - ex * 128, e.y - ey * 128, true);
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
						ci[i] = $OurSonic_Utility_CanvasInformation.create(jd.width, jd.height, false);
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
			var context = canvas.context;
			if (this.inHaltMode) {
				if (this.$drawHaltMode(context)) {
					return;
				}
			}
			this.$engine.clear(canvas);
			if (ss.isNullOrUndefined(this.sonicLevel)) {
				return;
			}
			context.save();
			var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
			this.drawTickCount++;
			if (this.spriteLoader && !this.spriteLoader.tick() || this.loading) {
				$OurSonic_SonicManager.$drawLoading(context);
				context.restore();
				return;
			}
			this.$updatePositions(context);
			var w1 = ss.Int32.div(this.windowLocation.width, 128) + 2;
			var h1 = ss.Int32.div(this.windowLocation.height, 128) + 2;
			//cleaner with 2 padding on the widthheight
			if (this.currentGameState === 1) {
				w1 += 1;
				h1 += 1;
				w1 = ss.Int32.div(w1, this.scale.x);
				h1 = ss.Int32.div(h1, this.scale.y);
			}
			var offs = $OurSonic_SonicManager.$getOffs(w1, h1);
			this.tilePaletteAnimationManager.tickAnimatedPalettes();
			this.tileAnimationManager.tickAnimatedTiles();
			var fxP = ss.Int32.trunc(this.windowLocation.x / 128);
			var fyP = ss.Int32.trunc(this.windowLocation.y / 128);
			this.resetCanvases();
			var zero = $OurSonic_Utility_Point.$ctor1(0, 0);
			if (this.background) {
				var wOffset = this.windowLocation.x;
				var bw = this.background.width;
				var movex = ss.Int32.div(wOffset, bw) * bw;
				localPoint.x = -this.windowLocation.x + movex;
				localPoint.y = ss.Int32.div(-this.windowLocation.y, 4);
				this.background.draw(this.$lowChunkCanvas.context, localPoint, wOffset);
				localPoint.x = -this.windowLocation.x + movex + this.background.width;
				localPoint.y = ss.Int32.div(-this.windowLocation.y, 4);
				this.background.draw(this.$lowChunkCanvas.context, localPoint, wOffset);
			}
			this.$drawLowChunks(this.$lowChunkCanvas.context, zero, offs, fyP, fxP);
			if (this.showHeightMap) {
				this.$drawHighChunks(this.$lowChunkCanvas.context, fxP, fyP, offs, zero);
			}
			this.$drawObjects(this.$sonicCanvas.context, zero);
			this.$drawAnimations(this.$sonicCanvas.context);
			this.$drawRings(this.$sonicCanvas.context, zero);
			this.$drawSonic(this.$sonicCanvas.context);
			//drawRings(canvas, zero);
			//editing^
			if (!this.showHeightMap) {
				this.$drawHighChunks(this.$highChuckCanvas.context, fxP, fyP, offs, zero);
			}
			this.$drawDebugTextChunks(this.$highChuckCanvas.context, fxP, fyP, offs, zero);
			$OurSonic_Utility_Extensions.offsetPixelsForWater(this.$lowChunkCanvas.context);
			$OurSonic_Utility_Extensions.offsetPixelsForWater(this.$highChuckCanvas.context);
			this.$drawCanveses(context, localPoint);
			context.restore();
			if (this.currentGameState === 0) {
				this.sonicToon.drawUI(context, $OurSonic_Utility_Point.$ctor1(this.screenOffset.x, this.screenOffset.y));
			}
		},
		$drawCanveses: function(canvas, localPoint) {
			canvas.scale(this.scale.x, this.scale.y);
			canvas.drawImage(this.$lowChunkCanvas.canvas, localPoint.x, localPoint.y);
			canvas.drawImage(this.$sonicCanvas.canvas, localPoint.x, localPoint.y);
			canvas.drawImage(this.$highChuckCanvas.canvas, localPoint.x, localPoint.y);
		},
		resetCanvases: function() {
			this.$lowChunkCanvas = this.$lowChunkCanvas || $OurSonic_Utility_CanvasInformation.create(this.windowLocation.width, this.windowLocation.height, false);
			this.$sonicCanvas = this.$sonicCanvas || $OurSonic_Utility_CanvasInformation.create(this.windowLocation.width, this.windowLocation.height, true);
			this.$highChuckCanvas = this.$highChuckCanvas || $OurSonic_Utility_CanvasInformation.create(this.windowLocation.width, this.windowLocation.height, false);
			this.$sonicCanvas.context.clearRect(0, 0, this.windowLocation.width, this.windowLocation.height);
			this.$highChuckCanvas.context.clearRect(0, 0, this.windowLocation.width, this.windowLocation.height);
			this.$lowChunkCanvas.context.clearRect(0, 0, this.windowLocation.width, this.windowLocation.height);
		},
		destroyCanvases: function() {
			this.$lowChunkCanvas = null;
			this.$sonicCanvas = null;
			this.$highChuckCanvas = null;
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
				if (ss.isNullOrUndefined(chunk)) {
					continue;
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
				if (ss.isNullOrUndefined(chunk)) {
					continue;
				}
				localPoint.x = _xPreal * 128 - this.windowLocation.x;
				localPoint.y = _yPreal * 128 - this.windowLocation.y;
				if (!chunk.isEmpty() && !chunk.onlyBackground()) {
					chunk.draw(canvas, localPoint, 1);
				}
				if (this.showHeightMap) {
					var fd = this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + chunk.index];
					if (ss.isNullOrUndefined(fd)) {
						fd = this.$cacheHeightMapForChunk(chunk);
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
		$drawDebugTextChunks: function(canvas, fxP, fyP, offs, localPoint) {
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
				if (ss.isNullOrUndefined(chunk)) {
					continue;
				}
				localPoint.x = _xPreal * 128 - this.windowLocation.x;
				localPoint.y = _yPreal * 128 - this.windowLocation.y;
				if (!chunk.isEmpty() && !chunk.onlyForeground()) {
					chunk.drawAnimationDebug(canvas, localPoint, 0, this.tileChunkDebugDrawOptions);
				}
				if (!chunk.isEmpty() && !chunk.onlyBackground()) {
					chunk.drawAnimationDebug(canvas, localPoint, 1, this.tileChunkDebugDrawOptions);
				}
			}
		},
		$cacheHeightMapForChunk: function(chunk) {
			var md = chunk;
			var posj1 = $OurSonic_Utility_Point.$ctor1(0, 0);
			var canv = $OurSonic_Utility_CanvasInformation.create(128, 128, false);
			var ctx = canv.context;
			this.$engine.clear(canv);
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
			return this.spriteCache.heightMapChunks[(this.sonicLevel.curHeightMap ? 1 : 2) + ' ' + md.index] = canv;
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
			for (var $t1 = 0; $t1 < sonLevel.tileAnimations.length; $t1++) {
				var an = sonLevel.tileAnimations[$t1];
				var anin = an.animationTileIndex;
				var num = an.numberOfTiles;
				if (tile >= anin && tile < anin + num) {
					return an;
				}
			}
			return null;
		},
		clearCache: function() {
			if (ss.isValue(this.spriteCache)) {
				this.spriteCache.clearCache();
			}
			if (ss.isValue(this.sonicLevel)) {
				this.sonicLevel.clearCache();
			}
			if (ss.isValue(this.tilePaletteAnimationManager)) {
				this.tilePaletteAnimationManager.clearCache();
			}
			if (ss.isValue(this.tileAnimationManager)) {
				this.tileAnimationManager.clearCache();
			}
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
		cacheTiles: function() {
			console.time('tileCache');
			this.tilePaletteAnimationManager = new $OurSonic_TilePaletteAnimationManager(this);
			this.tileAnimationManager = new $OurSonic_TileAnimationManager(this);
			for (var $t1 = 0; $t1 < this.sonicLevel.tileChunks.length; $t1++) {
				var chunk = this.sonicLevel.tileChunks[$t1];
				chunk.initCache();
				chunk.warmCache();
			}
			console.timeEnd('tileCache');
			if (ss.isValue(this.sonicToon)) {
				console.time('collisionCache');
				for (var $t2 = 0; $t2 < this.sonicLevel.tileChunks.length; $t2++) {
					var chunk1 = this.sonicLevel.tileChunks[$t2];
					this.sonicToon.sensorManager.buildChunk(chunk1, false);
					this.sonicToon.sensorManager.buildChunk(chunk1, true);
				}
				console.timeEnd('collisionCache');
			}
			if (false) {
				this.$debugDraw();
			}
		},
		$debugDraw: function() {
			var numWide = 10;
			var dropOffIndex = 0;
			var pieces = [];
			while (true) {
				var debugCanvases = [];
				var totalHeight = 0;
				var broke = false;
				for (var index = dropOffIndex; index < this.sonicLevel.tileChunks.length; index++) {
					var chunk = this.sonicLevel.tileChunks[index];
					var canvasCache = chunk.debug_DrawCache();
					totalHeight += canvasCache.canvas.height;
					ss.add(debugCanvases, canvasCache);
					if (totalHeight > 10000) {
						dropOffIndex = index + 1;
						broke = true;
						break;
					}
				}
				var bigOne = $OurSonic_Utility_CanvasInformation.create(numWide * 128, totalHeight, false);
				var currentPosition = 0;
				for (var index1 = 0; index1 < debugCanvases.length; index1++) {
					var canvasInformation = debugCanvases[index1];
					bigOne.context.drawImage(canvasInformation.canvas, 0, currentPosition);
					currentPosition += canvasInformation.canvas.height;
				}
				ss.add(pieces, ss.cast(bigOne.canvas.toDataURL(), String));
				if (!broke) {
					break;
				}
			}
			var str = '<html><body>';
			for (var $t1 = 0; $t1 < pieces.length; $t1++) {
				var piece = pieces[$t1];
				str += '<img src="' + piece + '"/>\n';
			}
			str += '</body></html>';
			var $t2 = window.document.createElement('textarea');
			var tx = ss.cast($t2, ss.isValue($t2) && (ss.isInstanceOfType($t2, Element) && $t2.tagName === 'TEXTAREA'));
			tx.style.position = 'absolute';
			tx.value = str;
			window.document.body.appendChild(tx);
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
				var d = OurSonicModels.Common.EnumerableExtensions.first$1(Object).call(null, objects, ss.mkdel({ o: o }, function(p) {
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
				if (OurSonicModels.Common.EnumerableExtensions.all(String).call(null, objectKeys, ss.mkdel({ o: o }, function(p) {
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
				this.sonicLevel.animatedTileFiles = new Array(sonicLevel.AnimatedFiles.length);
				for (var animatedFileIndex = 0; animatedFileIndex < sonicLevel.AnimatedFiles.length; animatedFileIndex++) {
					var animatedFile = sonicLevel.AnimatedFiles[animatedFileIndex];
					this.sonicLevel.animatedTileFiles[animatedFileIndex] = new Array(animatedFile.length);
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
						tile.isTileAnimated = true;
						tile.index = filePiece * 10000 + animatedFileIndex;
						this.sonicLevel.animatedTileFiles[animatedFileIndex][filePiece] = tile;
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
					var $t2 = new $OurSonic_Level_Tiles_TileInfo();
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
			this.sonicLevel.tileAnimations = ss.arrayClone(sonicLevel.Animations.map(function(a) {
				var $t4 = new $OurSonic_Level_Animations_TileAnimationData();
				$t4.animationTileFile = a.AnimationFile;
				$t4.animationTileIndex = a.AnimationTileIndex;
				$t4.automatedTiming = a.AutomatedTiming;
				$t4.numberOfTiles = a.NumberOfTiles;
				$t4.dataFrames = a.Frames.map(function(b) {
					var $t5 = new $OurSonic_Level_Animations_TileAnimationDataFrame();
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
				this.sonicLevel.tileChunks[j2] = mj2;
				mj2.tileAnimations = {};
				for (var tpX = 0; tpX < mj2.tilePieces.length; tpX++) {
					for (var tpY = 0; tpY < mj2.tilePieces[tpX].length; tpY++) {
						var pm = mj2.tilePieces[tpX][tpY].getTilePiece();
						if (ss.isValue(pm)) {
							for (var $t9 = 0; $t9 < pm.tiles.length; $t9++) {
								var mjc1 = pm.tiles[$t9];
								var fa = this.$containsAnimatedTile(mjc1._Tile, this.sonicLevel);
								if (fa) {
									mj2.tileAnimations[tpY * 8 + tpX] = fa;
									acs[j2] = mj2;
								}
							}
						}
					}
				}
			}
			this.sonicLevel.palette = sonicLevel.Palette.map(function(a1) {
				return a1.map(function(b3) {
					return b3;
				});
			});
			this.sonicLevel.startPositions = sonicLevel.StartPositions.map(function(a2) {
				return $OurSonic_Utility_Point.$ctor1(a2.X, a2.Y);
			});
			this.sonicLevel.animatedPalettes = [];
			if (sonicLevel.PaletteItems.length > 0) {
				for (var k = 0; k < sonicLevel.PaletteItems[0].length; k++) {
					var pal = sonicLevel.PaletteItems[0][k];
					var $t12 = this.sonicLevel.animatedPalettes;
					var $t10 = new $OurSonic_Level_PaletteItem();
					$t10.palette = ss.cast(eval(pal.Palette), Array).map(function(b4) {
						return b4;
					});
					$t10.skipIndex = pal.SkipIndex;
					$t10.totalLength = pal.TotalLength;
					$t10.pieces = pal.Pieces.map(function(a3) {
						var $t11 = new $OurSonic_Level_PaletteItemPieces();
						$t11.paletteIndex = a3.PaletteIndex;
						$t11.paletteMultiply = a3.PaletteMultiply;
						$t11.paletteOffset = a3.PaletteOffset;
						return $t11;
					});
					ss.add($t12, $t10);
				}
			}
			for (var $t13 = 0; $t13 < this.sonicLevel.tilePieces.length; $t13++) {
				var tilePiece = this.sonicLevel.tilePieces[$t13];
				tilePiece.animatedPaletteIndexes = [];
				tilePiece.set_animatedTileIndexes([]);
				if (this.sonicLevel.animatedPalettes.length > 0) {
					for (var $t14 = 0; $t14 < tilePiece.tiles.length; $t14++) {
						var mj3 = tilePiece.tiles[$t14];
						var tile1 = mj3.getTile();
						if (tile1) {
							tile1.animatedPaletteIndexes = [];
							var pl = tile1.getAllPaletteIndexes();
							tile1.paletteIndexesToBeAnimated = {};
							tile1.animatedTileIndexes = [];
							for (var tileAnimationIndex = 0; tileAnimationIndex < this.sonicLevel.tileAnimations.length; tileAnimationIndex++) {
								var tileAnimationData = this.sonicLevel.tileAnimations[tileAnimationIndex];
								var anin = tileAnimationData.animationTileIndex;
								var num = tileAnimationData.numberOfTiles;
								if (tile1.index >= anin && tile1.index < anin + num) {
									ss.add(tilePiece.get_animatedTileIndexes(), tileAnimationIndex);
									ss.add(tile1.animatedTileIndexes, tileAnimationIndex);
								}
							}
							for (var animatedPaletteIndex = 0; animatedPaletteIndex < this.sonicLevel.animatedPalettes.length; animatedPaletteIndex++) {
								var pal1 = this.sonicLevel.animatedPalettes[animatedPaletteIndex];
								tile1.paletteIndexesToBeAnimated[animatedPaletteIndex] = [];
								for (var $t15 = 0; $t15 < pal1.pieces.length; $t15++) {
									var mjce = pal1.pieces[$t15];
									var mje1 = { $: mjce };
									if (mj3.palette === mje1.$.paletteIndex) {
										if (OurSonicModels.Common.EnumerableExtensions.any$1(ss.Int32).call(null, pl, ss.mkdel({ mje1: mje1 }, function(j3) {
											return j3 === ss.Int32.div(this.mje1.$.paletteOffset, 2) || j3 === ss.Int32.div(this.mje1.$.paletteOffset, 2) + 1;
										}))) {
											ss.add(tilePiece.animatedPaletteIndexes, animatedPaletteIndex);
											ss.add(tile1.animatedPaletteIndexes, animatedPaletteIndex);
											for (var $t16 = 0; $t16 < pl.length; $t16++) {
												var pIndex = pl[$t16];
												if (pIndex === ss.Int32.div(mje1.$.paletteOffset, 2) || pIndex === ss.Int32.div(mje1.$.paletteOffset, 2) + 1) {
													ss.add(tile1.paletteIndexesToBeAnimated[animatedPaletteIndex], pIndex);
												}
											}
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
			//        sonicManager.uiManager.modifyTC.tileChunk = sonicManager.SonicLevel.TileChunks[0];
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
			//        //        var inds = sonicManager.inds = { r:0,t: 0, tp: 0, tc: 0, total: (sonicManager.SonicLevel.TileChunks.length * 2 + sonicManager.SonicLevel.TilePieces.length * 5 + sonicManager.SonicLevel.Tiles.length), done: false };
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
	ss.initClass($OurSonic_TileAnimation, $asm, {
		getCurrentFrame: function() {
			return this.frames[this.currentFrame];
		},
		tick: function() {
			var anni = this.animatedTileData;
			if (ss.isNullOrUndefined(anni.lastAnimatedFrame)) {
				anni.lastAnimatedFrame = 0;
				anni.lastAnimatedIndex = 0;
			}
			if (anni.dataFrames[anni.lastAnimatedIndex].ticks === 0 || ss.Nullable$1.ge(ss.Nullable$1.sub($OurSonic_SonicManager.instance.drawTickCount, anni.lastAnimatedFrame), ((anni.automatedTiming > 0) ? anni.automatedTiming : anni.dataFrames[anni.lastAnimatedIndex].ticks))) {
				anni.lastAnimatedFrame = $OurSonic_SonicManager.instance.drawTickCount;
				anni.lastAnimatedIndex = (anni.lastAnimatedIndex + 1) % anni.dataFrames.length;
				this.currentFrame = anni.lastAnimatedIndex;
			}
		},
		init: function() {
			for (var index = 0; index < this.animatedTileData.dataFrames.length; index++) {
				this.frames[index] = new $OurSonic_TileAnimationFrame(index, this);
			}
		}
	});
	ss.initClass($OurSonic_TileAnimationFrame, $asm, {
		get_animation: function() {
			return this.$1$AnimationField;
		},
		set_animation: function(value) {
			this.$1$AnimationField = value;
		},
		frameData: function() {
			return this.get_animation().animatedTileData.dataFrames[this.frameIndex];
		}
	});
	ss.initClass($OurSonic_TileAnimationManager, $asm, {
		get_sonicManager: function() {
			return this.$1$SonicManagerField;
		},
		set_sonicManager: function(value) {
			this.$1$SonicManagerField = value;
		},
		$init: function() {
			this.animations = {};
			for (var animatedTileIndex = 0; animatedTileIndex < this.get_sonicManager().sonicLevel.tileAnimations.length; animatedTileIndex++) {
				this.animations[animatedTileIndex] = new $OurSonic_TileAnimation(this, this.get_sonicManager().sonicLevel.tileAnimations[animatedTileIndex]);
				this.animations[animatedTileIndex].init();
			}
		},
		tickAnimatedTiles: function() {
			if (ss.isNullOrUndefined(this.animations)) {
				this.$init();
			}
			var $t1 = new ss.ObjectEnumerator(this.animations);
			try {
				while ($t1.moveNext()) {
					var animation = $t1.current();
					var tilePaletteAnimation = animation.value;
					tilePaletteAnimation.tick();
				}
			}
			finally {
				$t1.dispose();
			}
		},
		clearCache: function() {
			this.animations = null;
		},
		getCurrentFrame: function(tileAnimationIndex) {
			return this.animations[tileAnimationIndex].getCurrentFrame();
		}
	});
	ss.initClass($OurSonic_TilePaletteAnimation, $asm, {
		getCurrentFrame: function() {
			return this.frames[this.currentFrame];
		},
		tick: function() {
			var pal = this.animatedPaletteData;
			if (pal.skipIndex === 0) {
				return;
			}
			if (pal.totalLength === 0) {
				return;
			}
			//when to move to the next frame
			for (var j = 0; j <= pal.totalLength; j += pal.skipIndex) {
				if (this.manager.get_sonicManager().drawTickCount % (pal.totalLength + pal.skipIndex) === j) {
					this.currentFrame = ss.Int32.div(j, pal.skipIndex);
				}
			}
		},
		init: function() {
			var pal = this.animatedPaletteData;
			if (pal.skipIndex === 0) {
				return;
			}
			if (pal.totalLength === 0) {
				return;
			}
			//when to move to the next frame
			for (var j = 0; j <= pal.totalLength; j += pal.skipIndex) {
				var frameIndex = ss.Int32.div(j, pal.skipIndex);
				if (ss.isNullOrUndefined(this.frames[frameIndex])) {
					this.frames[frameIndex] = new $OurSonic_TilePaletteAnimationFrame(frameIndex, this);
				}
			}
		}
	});
	ss.initClass($OurSonic_TilePaletteAnimationFrame, $asm, {
		get_animation: function() {
			return this.$1$AnimationField;
		},
		set_animation: function(value) {
			this.$1$AnimationField = value;
		},
		setPalette: function() {
			var levelPalette = this.get_animation().manager.get_sonicManager().sonicLevel.palette;
			this.$clonePalette(levelPalette);
			var pal = this.get_animation().animatedPaletteData;
			for (var index = 0; index < pal.pieces.length; index++) {
				var palettePiece = pal.pieces[index];
				var colorIndex = this.frameIndex + pal.pieces.length * index;
				//todo ^^^this calc is suspected to be wrong
				//could be: int colorIndex = FrameIndex * index + (pal.Pieces.Count)/*+ 0 + (palettePiece.PaletteMultiply)*/;
				var replaceIndex = ss.Int32.div(palettePiece.paletteOffset, 2);
				var color = pal.palette[colorIndex];
				if (ss.isValue(color)) {
					levelPalette[palettePiece.paletteIndex][replaceIndex] = color;
				}
				else {
					levelPalette[palettePiece.paletteIndex][replaceIndex] = '#000000';
				}
			}
		},
		$clonePalette: function(levelPalette) {
			this.$tempPalette = new Array(levelPalette.length);
			for (var index = 0; index < levelPalette.length; index++) {
				var canvasElements = levelPalette[index];
				this.$tempPalette[index] = new Array(canvasElements.length);
				for (var index2 = 0; index2 < canvasElements.length; index2++) {
					this.$tempPalette[index][index2] = canvasElements[index2];
				}
			}
		},
		clearPalette: function() {
			this.get_animation().manager.get_sonicManager().sonicLevel.palette = this.$tempPalette;
			this.$tempPalette = null;
		}
	});
	ss.initClass($OurSonic_TilePaletteAnimationManager, $asm, {
		get_sonicManager: function() {
			return this.$1$SonicManagerField;
		},
		set_sonicManager: function(value) {
			this.$1$SonicManagerField = value;
		},
		$init: function() {
			this.animations = {};
			for (var animatedPaletteIndex = 0; animatedPaletteIndex < this.get_sonicManager().sonicLevel.animatedPalettes.length; animatedPaletteIndex++) {
				this.animations[animatedPaletteIndex] = new $OurSonic_TilePaletteAnimation(this, this.get_sonicManager().sonicLevel.animatedPalettes[animatedPaletteIndex]);
				this.animations[animatedPaletteIndex].init();
			}
		},
		clearCache: function() {
			this.animations = null;
		},
		tickAnimatedPalettes: function() {
			if (ss.isNullOrUndefined(this.animations)) {
				this.$init();
			}
			var $t1 = new ss.ObjectEnumerator(this.animations);
			try {
				while ($t1.moveNext()) {
					var animation = $t1.current();
					var tilePaletteAnimation = animation.value;
					tilePaletteAnimation.tick();
				}
			}
			finally {
				$t1.dispose();
			}
		},
		getCurrentFrame: function(paletteAnimationIndex) {
			return this.animations[paletteAnimationIndex].getCurrentFrame();
		},
		getPaletteAnimation: function(paletteAnimationIndex) {
			return this.animations[paletteAnimationIndex];
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
			this.assetFrame.drawUI(canvas, pos, this.showOutline, showCollideMap, showHurtMap, this.showOffset, false, false);
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
				$OurSonic_SonicEngine.instance.runSonic(level);
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
			//
			//            objectFrameworkArea.Data.MainPanel.AddControl(new HtmlBox(15, -35) {
			//
			//            Width = 485,
			//
			//            Height = 485,
			//
			//            Init = () => {
			//
			//            jQuery.FromElement(Document.Body).Append(@"<textarea id=""code"" name=""code"" style=""position:absolute;width:485px;height:485px;""></textarea>");
			//
			//            objectFrameworkArea.Data.CodeMirror = (TextAreaElement) Document.GetElementById("code");
			//
			//            objectFrameworkArea.Data.CodeMirror.Value = value;
			//
			//            CodeMirrorLine hlLine = null;
			//
			//            
			//
			//            var codeMirrorOptions = new CodeMirrorOptions() {
			//
			//            LineNumbers = true,
			//
			//            MatchBrackets = true,
			//
			//            OnChange = change,
			//
			//            //extraKeys= new { "Ctrl-Space"= (cm)=> { CodeMirror.simpleHint(cm, CodeMirror.javascriptHint); } },
			//
			//            OnCursorActivity = (e) => {
			//
			//            objectFrameworkArea.Data.Editor.SetLineClass(hlLine, null);
			//
			//            hlLine = objectFrameworkArea.Data.Editor.SetLineClass(objectFrameworkArea.Data.Editor.GetCursor().Line, "activeline");
			//
			//            },
			//
			//            OnFocus =
			//
			//            (editor) => { SonicManager.Instance.TypingInEditor = true; },
			//
			//            OnBlur =
			//
			//            (editor) => {
			//
			//            SonicManager.Instance.TypingInEditor =
			//
			//            false;
			//
			//            }
			//
			//            };
			//
			//            objectFrameworkArea.Data.Editor = CodeMirror.FromTextArea(objectFrameworkArea.Data.CodeMirror, codeMirrorOptions);
			//
			//            objectFrameworkArea.Data.Editor.SetOption("theme", "night");
			//
			//            
			//
			//            hlLine = objectFrameworkArea.Data.Editor.SetLineClass(0, "activeline");
			//
			//            
			//
			//            var scroller = objectFrameworkArea.Data.Editor.GetScrollerElement();
			//
			//            scroller.Style.Height = "485px";
			//
			//            scroller.Style.Width = "485px";
			//
			//            objectFrameworkArea.Data.Editor.Refresh();
			//
			//            },
			//
			//            UpdatePosition = (x, y) => {
			//
			//            var scroller = objectFrameworkArea.Data.Editor.GetScrollerElement();
			//
			//            if (scroller.Style.Left == x + "px" && scroller.Style.Top == y + "px")
			//
			//            return;
			//
			//            scroller.Style.Left = x + "px";
			//
			//            scroller.Style.Top = y + "px";
			//
			//            objectFrameworkArea.Data.Editor.Refresh();
			//
			//            },
			//
			//            _Focus = () => {
			//
			//            var sc = objectFrameworkArea.Data.Editor.GetScrollerElement();
			//
			//            if (sc != null)
			//
			//            sc.Style.Visibility = "visible";
			//
			//            },
			//
			//            _Hide = () => {
			//
			//            var sc = objectFrameworkArea.Data.Editor.GetScrollerElement();
			//
			//            objectFrameworkArea.Data.Editor.GetInputField().Blur();
			//
			//            //            Engine.uiCanvasItem.focus();
			//
			//            //            document.body.focus();
			//
			//            
			//
			//            //            editor.onBlur();
			//
			//            
			//
			//            if (sc != null) {
			//
			//            sc.Style.Left = "-100px";
			//
			//            sc.Style.Top = "-100px";
			//
			//            sc.Style.Visibility = "hidden";
			//
			//            }
			//
			//            }
			//
			//            });
		},
		clearMainArea: function() {
			this.objectFrameworkArea.data.mainPanel.controls = [];
			var $t2 = this.objectFrameworkArea.data;
			var $t1 = document.getElementById('code');
			$t2.codeMirror = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'TEXTAREA'));
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
				this.selectedIndex = ss.Int32.div(_y * this.$palette.length, 2) + _x;
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
					this.selectedIndex = ss.Int32.div(_y * this.$palette.length, 2) + _x;
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
			if (ss.isNullOrUndefined(this.$palette)) {
				return;
			}
			canv.save();
			canv.strokeStyle = '#000';
			canv.lineWidth = 2;
			var pos = $OurSonic_Utility_Point.$ctor1(this.get_totalX(), this.get_totalY());
			var f = ss.Int32.trunc(ss.round(this.$palette.length / 2));
			if (this.wide) {
				for (var h = 0; h < 2; h++) {
					for (var w = 0; w < f; w++) {
						canv.fillStyle = this.$palette[w + h * f];
						canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
						canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
					}
				}
				if (this.showCurrent) {
					canv.fillStyle = this.$palette[this.selectedIndex];
					canv.fillRect(pos.x + f * this.scale.x, pos.y, this.scale.x * 2, this.scale.y * 2);
					canv.strokeRect(pos.x + f * this.scale.x, pos.y, this.scale.x * 2, this.scale.y * 2);
				}
			}
			else {
				for (var h1 = 0; h1 < f; h1++) {
					for (var w1 = 0; w1 < 2; w1++) {
						canv.fillStyle = this.$palette[w1 + h1 * 2];
						canv.fillRect(pos.x + w1 * this.scale.x, pos.y + h1 * this.scale.y, this.scale.x, this.scale.y);
						canv.strokeRect(pos.x + w1 * this.scale.x, pos.y + h1 * this.scale.y, this.scale.x, this.scale.y);
					}
				}
				if (this.showCurrent) {
					canv.fillStyle = this.$palette[this.selectedIndex];
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
			this.$palette = palette;
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
			//            PieceLayout.DrawUI(canvas, pos, ShowImages, SelectedPieceIndex, ZeroPosition, largeScale);
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
				var tilePieceButton = new (ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TilePiece]))(tilePiece.$, 0, 0, 0, 0);
				tilePieceButton.onDraw = ss.mkdel({ tilePiece: tilePiece }, function(cnv, x, y) {
					cnv.save();
					cnv.translate(x, y);
					cnv.scale(4, 4);
					//                                             tilePieceButton.Data.Draw(cnv, new Point(0, 0), ChunkLayer.Low, false, false, 0);
					//                                             tilePieceButton.Data.Draw(cnv, new Point(0, 0), ChunkLayer.High, false, false, 0);
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
				tilePieceButton.font = $OurSonic_UIManager_UIManager.smallTextFont;
				tilePieceButton.text = ss.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [String]).op_Implicit$2('Tile Piece #' + index);
				tilePieceButton.click = ss.mkdel({ tilePiece: tilePiece }, function(e1) {
					tilePieceArea.data = this.tilePiece.$;
				});
				this.$tilePieceList.addControl(ss.makeGenericType($OurSonic_UIManager_ImageButton$1, [$OurSonic_Level_Tiles_TilePiece])).call(this.$tilePieceList, tilePieceButton);
			}
			var image = new $OurSonic_UIManager_Image(105, 120, 256, 256);
			image.onDraw = ss.delegateCombine(image.onDraw, function(context, x1, y1) {
				if (ss.isNullOrUndefined(tilePieceArea.data)) {
					return;
				}
				context.save();
				context.translate(x1, y1);
				context.scale(16, 16);
				//                                tilePieceArea.Data.Draw(context, new Point(0, 0), ChunkLayer.Low, false, false, 0);
				//                                tilePieceArea.Data.Draw(context, new Point(0, 0), ChunkLayer.High, false, false, 0);
				context.restore();
			});
			tilePieceArea.addControl($OurSonic_UIManager_Image).call(tilePieceArea, image);
		}
	});
	ss.initClass($OurSonic_Areas_UIManagerAreas, $asm, {});
	ss.initClass($OurSonic_Filters_RoundFilter, $asm, {
		filter: function(input) {
			return parseInt(input.toString());
		}
	});
	ss.initClass($OurSonic_Filters_SwitchFilter, $asm, {
		filter: function(val, on, off) {
			return (val ? on : off);
		}
	});
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
				var ntcanvas = $OurSonic_Utility_CanvasInformation.create(16, 16, false);
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
			return this.tileChunks[this.chunkMap[x][y]];
		},
		clearCache: function() {
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var tile = this.tiles[$t1];
				tile.clearCache();
			}
			for (var $t2 = 0; $t2 < this.tileChunks.length; $t2++) {
				var chunk = this.tileChunks[$t2];
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
	ss.initClass($OurSonic_Level_Animations_AnimationInstance, $asm, {
		tick: function() {
		},
		draw: function(canvas, i, i1) {
		}
	});
	ss.initClass($OurSonic_Level_Animations_TileAnimationData, $asm, {
		getAnimationFile: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.animatedTileFiles[this.animationTileFile];
		}
	});
	ss.initClass($OurSonic_Level_Animations_TileAnimationDataFrame, $asm, {});
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
			var c = this.getCache(false, false, false);
			mainCanvas.save();
			mainCanvas.translate(pos.x, pos.y);
			mainCanvas.scale(width / this.width, height / this.height);
			mainCanvas.drawImage(c.canvas, 0, 0);
			mainCanvas.restore();
		},
		getCache: function(showOutline, showCollideMap, showHurtMap) {
			var m = this.$image[((showOutline ? 1 : 0) + 2) * 7 ^ ((showCollideMap ? 1 : 0) + 2) * 89 ^ ((showHurtMap ? 1 : 0) + 2) * 79];
			if (ss.isNullOrUndefined(m)) {
				var mj = $OurSonic_Utility_CanvasInformation.create(this.width, this.height, false);
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
							canvas.fillStyle = 'rgba(0,0,0,0)';
						}
						else {
							//  var negative = _H.negateColor(color);
							canvas.fillStyle = '#' + color;
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
				this.setCache(mj, showOutline, showCollideMap, showHurtMap);
			}
			return m;
		},
		clearCache: function() {
			this.$image = {};
		},
		setCache: function(image, showOutline, showCollideMap, showHurtMap) {
			this.$image[((showOutline ? 1 : 0) + 2) * 7 ^ ((showCollideMap ? 1 : 0) + 2) * 89 ^ ((showHurtMap ? 1 : 0) + 2) * 79] = image;
		},
		drawUI: function(_canvas, pos, showOutline, showCollideMap, showHurtMap, showOffset, xflip, yflip) {
			var fd = this.getCache(showOutline, showCollideMap, showHurtMap);
			_canvas.save();
			_canvas.translate(pos.x, pos.y);
			if (xflip) {
				if (yflip) {
					_canvas.translate(fd.canvas.width / 2, fd.canvas.height / 2);
					_canvas.rotate(-90 * Math.PI / 180);
					_canvas.translate(-fd.canvas.width / 2, -fd.canvas.height / 2);
					_canvas.translate(0, this.height);
					_canvas.scale(1, -1);
				}
				else {
					_canvas.translate(fd.canvas.width / 2, fd.canvas.height / 2);
					_canvas.rotate(-90 * Math.PI / 180);
					_canvas.translate(-fd.canvas.width / 2, -fd.canvas.height / 2);
				}
			}
			else if (yflip) {
				_canvas.translate(0, this.height);
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
			this.pieceLayoutIndex = ind;
			var pcs = this.objectData.pieceLayouts[this.pieceLayoutIndex].pieces;
			this.pieces = [];
			for (var $t1 = 0; $t1 < pcs.length; $t1++) {
				var t = pcs[$t1];
				ss.add(this.pieces, t);
			}
		},
		setObjectData: function(obj) {
			this.objectData = obj;
			if (this.objectData.pieceLayouts.length > this.pieceLayoutIndex && this.objectData.pieceLayouts[this.pieceLayoutIndex].pieces.length > 0) {
				this.setPieceLayoutIndex(this.pieceLayoutIndex);
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
			return this.objectData.pieceLayouts[this.pieceLayoutIndex];
		},
		getRect: function() {
			if (this.objectData.pieceLayouts.length === 0) {
				this.$_rect.x = ss.Int32.trunc(this.x);
				this.$_rect.y = ss.Int32.trunc(this.y);
				this.$_rect.width = $OurSonic_Level_Objects_ObjectManager.broken.width;
				this.$_rect.height = $OurSonic_Level_Objects_ObjectManager.broken.height;
				return this.$_rect;
			}
			return this.objectData.pieceLayouts[this.pieceLayoutIndex].getRectangle(this.objectData);
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
			this.pieceLayoutIndex = 0;
			//maybe
			this.subdata = this.o.SubType;
			this.upperNibble = this.subdata >> 4;
			this.lowerNibble = this.subdata & 15;
			if (this.objectData.pieceLayouts.length > this.pieceLayoutIndex && this.objectData.pieceLayouts[this.pieceLayoutIndex].pieces.length > 0) {
				this.setPieceLayoutIndex(this.pieceLayoutIndex);
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
					if (this.twoDArray(map, mX + frm.offsetX, mY + frm.offsetY, this.xflip ^ piece.xflip, this.yflip ^ piece.yflip) === true) {
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
		drawUI: function(canvas, showImages, selectedPieceIndex, levelObject) {
			canvas.save();
			if (!showImages) {
				canvas.strokeStyle = '#000000';
				canvas.lineWidth = 2;
				canvas.beginPath();
				canvas.moveTo(-1000, 0);
				canvas.lineTo(1000, 0);
				canvas.closePath();
				canvas.stroke();
				canvas.beginPath();
				canvas.moveTo(0, -1000);
				canvas.lineTo(0, 1000);
				canvas.closePath();
				canvas.stroke();
				for (var i = 1; i < this.pieces.length; i++) {
					var j = this.pieces[i];
					canvas.beginPath();
					canvas.moveTo(j.x, j.y);
					canvas.lineTo(this.pieces[i - 1].x, this.pieces[i - 1].y);
					canvas.stroke();
				}
			}
			for (var $t1 = 0; $t1 < this.pieces.length; $t1++) {
				var levelObjectPieceLayoutPiece = this.pieces[$t1];
				if (showImages) {
					var piece = levelObject.pieces[levelObjectPieceLayoutPiece.pieceIndex];
					var asset = levelObject.assets[piece.assetIndex];
					if (asset.frames.length > 0) {
						var frm = asset.frames[0];
						frm.drawUI(canvas, $OurSonic_Utility_Point.$ctor1(levelObjectPieceLayoutPiece.x - frm.offsetX, levelObjectPieceLayoutPiece.y - frm.offsetY), false, false, false, false, piece.xflip, piece.yflip);
					}
				}
				else {
					var drawRadial;
					drawRadial = $OurSonic_SonicManager.instance.mainCanvas.context.createRadialGradient(0, 0, 0, 10, 10, 50);
					drawRadial.addColorStop(0, 'white');
					if (selectedPieceIndex === levelObjectPieceLayoutPiece.pieceIndex) {
						drawRadial.addColorStop(1, 'yellow');
					}
					else {
						drawRadial.addColorStop(1, 'red');
					}
					canvas.fillStyle = drawRadial;
					canvas.beginPath();
					canvas.arc(levelObjectPieceLayoutPiece.x, levelObjectPieceLayoutPiece.y, 10, 0, Math.PI * 2, true);
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
					frm.drawUI(canvas, $OurSonic_Utility_Point.$ctor1(x - frm.offsetX, y - frm.offsetY), false, showHeightMap, showHeightMap, false, instance.xflip ^ piece.xflip, instance.yflip ^ piece.yflip);
				}
			}
		},
		getRectangle: function(levelObject) {
			var left = 2147483647;
			var top = 2147483647;
			var right = -2147483648;
			var bottom = -2147483648;
			for (var $t1 = 0; $t1 < this.pieces.length; $t1++) {
				var levelObjectPieceLayoutPiece = this.pieces[$t1];
				var piece = levelObject.pieces[levelObjectPieceLayoutPiece.pieceIndex];
				var asset = levelObject.assets[piece.assetIndex];
				var frame = asset.frames[piece.frameIndex];
				var pieceX = levelObjectPieceLayoutPiece.x - frame.offsetX;
				var pieceY = levelObjectPieceLayoutPiece.y - frame.offsetY;
				var pieceWidth = frame.width;
				var pieceHeight = frame.height;
				if (pieceX < left) {
					left = pieceX;
				}
				if (pieceY < top) {
					top = pieceY;
				}
				if (pieceX + pieceWidth > right) {
					right = pieceX + pieceWidth;
				}
				if (pieceY + pieceHeight > bottom) {
					bottom = pieceY + pieceHeight;
				}
			}
			return $OurSonic_Utility_Rectangle.$ctor1(left, top, right - left, bottom - top);
		}
	});
	ss.initClass($OurSonic_Level_Objects_LevelObjectPieceLayoutPiece, $asm, {});
	ss.initClass($OurSonic_Level_Objects_LevelObjectProjectile, $asm, {});
	ss.initClass($OurSonic_Level_Objects_ObjectManager, $asm, {
		init: function() {
		}
	});
	ss.initEnum($OurSonic_Level_Tiles_ChunkLayer, $asm, { low: 0, high: 1 });
	ss.initClass($OurSonic_Level_Tiles_PaletteAnimationCanvasFrame, $asm, {});
	ss.initClass($OurSonic_Level_Tiles_PaletteAnimationCanvasFrames, $asm, {});
	ss.initEnum($OurSonic_Level_Tiles_RotationMode, $asm, { floor: 134, rightWall: 224, ceiling: 314, leftWall: 44 });
	ss.initClass($OurSonic_Level_Tiles_Tile, $asm, {
		drawBase: function(canvas, pos, xflip, yflip, palette, isAnimatedTile) {
			//we dont predraw animated tiles
			if (ss.isValue(this.animatedTileIndexes) && (!isAnimatedTile && this.animatedTileIndexes.length > 0)) {
				return;
			}
			var baseCacheIndex = this.$getBaseCacheIndex(xflip, yflip, palette);
			var baseCache = this.$baseCaches[baseCacheIndex];
			if (ss.isNullOrUndefined(baseCache)) {
				var squareSize = this.colors.length;
				var j;
				j = $OurSonic_Utility_CanvasInformation.create(squareSize, squareSize, false);
				if (pos.x < 0 || pos.y < 0) {
					return;
				}
				var oPos = $OurSonic_Utility_Point.$ctor1(0, 0);
				if (xflip) {
					oPos.x = -squareSize;
					j.context.scale(-1, 1);
				}
				if (yflip) {
					oPos.y = -squareSize;
					j.context.scale(1, -1);
				}
				var palette_ = $OurSonic_SonicManager.instance.sonicLevel.palette;
				var colorPaletteIndex = (palette + $OurSonic_SonicManager.instance.indexedPalette) % palette_.length;
				var x = oPos.x;
				var y = oPos.y;
				for (var _x = 0; _x < squareSize; _x++) {
					for (var _y = 0; _y < squareSize; _y++) {
						var colorIndex = this.colors[_x][_y];
						if (colorIndex === 0) {
							continue;
						}
						j.context.fillStyle = palette_[colorPaletteIndex][colorIndex];
						j.context.fillRect(x + _x, y + _y, 1, 1);
					}
				}
				this.$baseCaches[baseCacheIndex] = baseCache = j;
			}
			canvas.drawImage(baseCache.canvas, pos.x, pos.y);
		},
		$getBaseCacheIndex: function(xflip, yflip, palette) {
			return (palette << 6) + ((xflip ? 1 : 0) << 5) + ((yflip ? 1 : 0) << 4);
		},
		$getAnimatedPaletteCacheIndex: function(xflip, yflip, palette, animatedPaletteIndex, frameIndex) {
			return (frameIndex << 8) + (animatedPaletteIndex << 7) + (palette << 6) + ((xflip ? 1 : 0) << 5) + ((yflip ? 1 : 0) << 4);
		},
		drawAnimatedPalette: function(canvas, pos, xflip, yflip, palette, animatedPaletteIndex, isAnimatedTile) {
			//we dont predraw animated tiles
			if (ss.isValue(this.animatedTileIndexes) && (!isAnimatedTile && this.animatedTileIndexes.length > 0)) {
				return;
			}
			var animatedPaletteCacheIndex = this.$getAnimatedPaletteCacheIndex(xflip, yflip, palette, animatedPaletteIndex, $OurSonic_SonicManager.instance.tilePaletteAnimationManager.getPaletteAnimation(animatedPaletteIndex).currentFrame);
			var animatedPaletteCache = this.$animatedPaletteCaches[animatedPaletteCacheIndex];
			if (ss.isNullOrUndefined(animatedPaletteCache)) {
				var squareSize = this.colors.length;
				var j;
				j = $OurSonic_Utility_CanvasInformation.create(squareSize, squareSize, false);
				if (pos.x < 0 || pos.y < 0) {
					return;
				}
				var oPos = $OurSonic_Utility_Point.$ctor1(0, 0);
				if (xflip) {
					oPos.x = -squareSize;
					j.context.scale(-1, 1);
				}
				if (yflip) {
					oPos.y = -squareSize;
					j.context.scale(1, -1);
				}
				var palette_ = $OurSonic_SonicManager.instance.sonicLevel.palette;
				var colorPaletteIndex = (palette + $OurSonic_SonicManager.instance.indexedPalette) % palette_.length;
				var x = oPos.x;
				var y = oPos.y;
				for (var _x = 0; _x < squareSize; _x++) {
					for (var _y = 0; _y < squareSize; _y++) {
						var colorIndex = this.colors[_x][_y];
						if (colorIndex === 0) {
							continue;
						}
						if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(this.paletteIndexesToBeAnimated[animatedPaletteIndex], colorIndex) === -1) {
							continue;
						}
						j.context.fillStyle = palette_[colorPaletteIndex][colorIndex];
						j.context.fillRect(x + _x, y + _y, 1, 1);
					}
				}
				this.$animatedPaletteCaches[animatedPaletteCacheIndex] = animatedPaletteCache = j;
			}
			canvas.drawImage(animatedPaletteCache.canvas, pos.x, pos.y);
		},
		drawAnimatedTile: function(canvas, pos, xflip, yflip, palette, animatedTileIndex) {
			if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(this.animatedTileIndexes, animatedTileIndex) === -1) {
				return;
			}
			var tileAnimationFrame = $OurSonic_SonicManager.instance.tileAnimationManager.getCurrentFrame(animatedTileIndex);
			var tileAnimation = tileAnimationFrame.get_animation();
			var tileAnimationData = tileAnimation.animatedTileData;
			var animationIndex = tileAnimationData.animationTileIndex;
			var frame = tileAnimationFrame.frameData();
			if (!frame) {
				frame = tileAnimation.animatedTileData.dataFrames[0];
				//todo throw
			}
			var file = tileAnimationData.getAnimationFile();
			var va = file[frame.startingTileIndex + (this.index - animationIndex)];
			if (ss.isValue(va)) {
				va.drawBase(canvas, pos, xflip, yflip, palette, true);
			}
			else {
				//todo throw
			}
		},
		shouldTileAnimate: function() {
			return this.isTileAnimated && this.$canAnimate;
		},
		getAllPaletteIndexes: function() {
			if (ss.isNullOrUndefined(this.curPaletteIndexes)) {
				var d = [];
				for (var _x = 0; _x < this.colors.length; _x++) {
					var color = this.colors[_x];
					for (var _y = 0; _y < color.length; _y++) {
						var col = { $: color[_y] };
						if (col.$ === 0) {
							continue;
						}
						if (OurSonicModels.Common.EnumerableExtensions.all(ss.Int32).call(null, d, ss.mkdel({ col: col }, function(a) {
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
	ss.initClass($OurSonic_Level_Tiles_TileAnimationCanvasFrame, $asm, {});
	ss.initClass($OurSonic_Level_Tiles_TileAnimationCanvasFrames, $asm, {});
	ss.initClass($OurSonic_Level_Tiles_TileCacheBlock, $asm, {});
	ss.initEnum($OurSonic_Level_Tiles_TileCacheBlockType, $asm, { block: 0, tilePiece: 1 });
	ss.initClass($OurSonic_Level_Tiles_TileChunk, $asm, {
		clearCache: function() {
		},
		initCache: function() {
			this.$baseCanvasCache = new (ss.makeGenericType($OurSonic_Level_Tiles_ChunkLayer$1, [$OurSonic_Utility_CanvasInformation]))();
			this.$paletteAnimationCanvasesCache = new (ss.makeGenericType($OurSonic_Level_Tiles_ChunkLayer$1, [Object]))();
			this.$tileAnimationCanvasesCache = new (ss.makeGenericType($OurSonic_Level_Tiles_ChunkLayer$1, [Object]))();
			this.$tileAnimationCanvasesCache.set_item(0, {});
			this.$tileAnimationCanvasesCache.set_item(1, {});
			this.$paletteAnimationCanvasesCache.set_item(0, {});
			this.$paletteAnimationCanvasesCache.set_item(1, {});
			this.currentTileAnimationFrameIndexCache = [];
			this.currentPaletteAnimationFrameIndexCache = [];
		},
		warmCache: function() {
			this.cacheBase(0);
			this.cacheBase(1);
			if (this.$hasPixelAnimations()) {
				this.cachePaletteAnimation(0);
				this.cachePaletteAnimation(1);
			}
			if (this.$hasTileAnimations()) {
				this.cacheTileAnimation(0);
				this.cacheTileAnimation(1);
			}
		},
		cacheBase: function(layer) {
			if (((layer === 0) ? this.onlyForeground() : this.onlyBackground())) {
				return;
			}
			this.$baseCanvasCache.set_item(layer, $OurSonic_Utility_CanvasInformation.create(128, 128, false));
			this.$drawTilePiecesBase(this.$baseCanvasCache.get_item(layer).context, layer, $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize);
		},
		cachePaletteAnimation: function(layer) {
			var paletteAnimationCanvases = this.$paletteAnimationCanvasesCache.get_item(layer);
			var $t1 = this.$getAllPaletteAnimationIndexes();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var paletteAnimationIndex = $t1[$t2];
				var rect = this.$getAnimationPaletteSurfaceInformation(paletteAnimationIndex, layer);
				if (ss.isNullOrUndefined(rect)) {
					continue;
				}
				var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex] = new $OurSonic_Level_Tiles_PaletteAnimationCanvasFrames(paletteAnimationIndex);
				var tilePaletteAnimation = $OurSonic_SonicManager.instance.tilePaletteAnimationManager.animations[paletteAnimationIndex];
				paletteAnimationCanvasFrames.position = $OurSonic_Utility_Point.$ctor1(rect.x * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, rect.y * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize);
				for (var $t3 = 0; $t3 < tilePaletteAnimation.frames.length; $t3++) {
					var currentFrame = tilePaletteAnimation.frames[$t3];
					tilePaletteAnimation.currentFrame = currentFrame.frameIndex;
					var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.frames[currentFrame.frameIndex] = new $OurSonic_Level_Tiles_PaletteAnimationCanvasFrame();
					currentFrame.setPalette();
					var tilePaletteCanvas = $OurSonic_Utility_CanvasInformation.create(rect.width * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, rect.height * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, false);
					paletteAnimationCanvasFrame.canvas = tilePaletteCanvas;
					paletteAnimationCanvasFrame.canvas.context.save();
					paletteAnimationCanvasFrame.canvas.context.translate(-rect.x * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, -rect.y * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize);
					this.$drawTilePiecesAnimatedPalette(tilePaletteCanvas.context, layer, $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, paletteAnimationIndex);
					paletteAnimationCanvasFrame.canvas.context.restore();
					currentFrame.clearPalette();
				}
				tilePaletteAnimation.currentFrame = 0;
			}
		},
		cacheTileAnimation: function(layer) {
			var tileAnimationCanvases = this.$tileAnimationCanvasesCache.get_item(layer);
			var $t1 = this.$getAllTileAnimationIndexes();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var tileAnimationIndex = $t1[$t2];
				var rect = this.$getAnimationTileSurfaceInformation(tileAnimationIndex, layer);
				if (ss.isNullOrUndefined(rect)) {
					continue;
				}
				var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex] = new $OurSonic_Level_Tiles_TileAnimationCanvasFrames(tileAnimationIndex);
				var tileAnimation = $OurSonic_SonicManager.instance.tileAnimationManager.animations[tileAnimationIndex];
				tileAnimationCanvasFrames.position = $OurSonic_Utility_Point.$ctor1(rect.x * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, rect.y * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize);
				for (var $t3 = 0; $t3 < tileAnimation.frames.length; $t3++) {
					var currentFrame = tileAnimation.frames[$t3];
					var tileAnimationCanvasFrame = tileAnimationCanvasFrames.frames[currentFrame.frameIndex] = new $OurSonic_Level_Tiles_TileAnimationCanvasFrame();
					var tileTileCanvas = $OurSonic_Utility_CanvasInformation.create(rect.width * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, rect.height * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, false);
					tileAnimationCanvasFrame.canvas = tileTileCanvas;
					tileAnimation.currentFrame = currentFrame.frameIndex;
					tileAnimationCanvasFrame.canvas.context.save();
					tileAnimationCanvasFrame.canvas.context.translate(-rect.x * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, -rect.y * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize);
					this.$drawTilePiecesAnimatedTile(tileTileCanvas.context, layer, $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, tileAnimationIndex);
					tileAnimationCanvasFrame.canvas.context.restore();
				}
				tileAnimation.currentFrame = 0;
			}
		},
		$getAnimationTileSurfaceInformation: function(tileAnimationIndex, layer) {
			var lowestX = 2147483647;
			var highestX = -2147483648;
			var lowestY = 2147483647;
			var highestY = -2147483648;
			for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceY++) {
				for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceX++) {
					var pieceInfo = this.tilePieces[pieceX][pieceY];
					var piece = pieceInfo.getTilePiece();
					if (ss.isNullOrUndefined(piece)) {
						continue;
					}
					if (((layer === 0) ? piece.onlyForeground() : piece.onlyBackground())) {
						continue;
					}
					if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(piece.get_animatedTileIndexes(), tileAnimationIndex) === -1) {
						continue;
					}
					if (pieceX < lowestX) {
						lowestX = pieceX;
					}
					if (pieceX > highestX) {
						highestX = pieceX;
					}
					if (pieceY < lowestY) {
						lowestY = pieceY;
					}
					if (pieceY > highestY) {
						highestY = pieceY;
					}
				}
			}
			if (lowestX === 2147483647) {
				return null;
			}
			return $OurSonic_Utility_Rectangle.$ctor1(lowestX, lowestY, highestX - lowestX + 1, highestY - lowestY + 1);
		},
		$getAnimationPaletteSurfaceInformation: function(paletteAnimationIndex, layer) {
			var lowestX = 2147483647;
			var highestX = -2147483648;
			var lowestY = 2147483647;
			var highestY = -2147483648;
			for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceY++) {
				for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceX++) {
					var piece = this.tilePieces[pieceX][pieceY].getTilePiece();
					if (ss.isNullOrUndefined(piece)) {
						continue;
					}
					if (((layer === 0) ? piece.onlyForeground() : piece.onlyBackground())) {
						continue;
					}
					if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(piece.animatedPaletteIndexes, paletteAnimationIndex) === -1) {
						continue;
					}
					if (pieceX < lowestX) {
						lowestX = pieceX;
					}
					if (pieceX > highestX) {
						highestX = pieceX;
					}
					if (pieceY < lowestY) {
						lowestY = pieceY;
					}
					if (pieceY > highestY) {
						highestY = pieceY;
					}
				}
			}
			if (lowestX === 2147483647) {
				return null;
			}
			return $OurSonic_Utility_Rectangle.$ctor1(lowestX, lowestY, highestX - lowestX + 1, highestY - lowestY + 1);
		},
		drawAnimationDebug: function(canvas, position, layer, debugDrawOptions) {
			if (ss.isNullOrUndefined(debugDrawOptions)) {
				return;
			}
			canvas.save();
			canvas.fillStyle = 'White';
			canvas.textBaseline = 'top';
			{
				var yOffset = ((layer === 0) ? 0 : 64);
				if (debugDrawOptions.showBaseData) {
					canvas.fillText('Base', position.x + 0, position.y + yOffset);
				}
				if (debugDrawOptions.showPaletteAnimationData) {
					if (this.$hasPixelAnimations()) {
						var paletteAnimationCanvases = this.$paletteAnimationCanvasesCache.get_item(layer);
						var $t1 = this.$getAllPaletteAnimationIndexes();
						for (var $t2 = 0; $t2 < $t1.length; $t2++) {
							var paletteAnimationIndex = $t1[$t2];
							var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
							if (ss.isNullOrUndefined(paletteAnimationCanvasFrames)) {
								continue;
							}
							var currentFrame = $OurSonic_SonicManager.instance.tilePaletteAnimationManager.getCurrentFrame(paletteAnimationIndex);
							canvas.fillText('Palette ' + paletteAnimationIndex + '-' + currentFrame.frameIndex, position.x + 25, position.y + yOffset + paletteAnimationIndex * 13);
						}
					}
				}
				if (debugDrawOptions.showTileAnimationData) {
					if (this.$hasTileAnimations()) {
						var tileAnimationCanvases = this.$tileAnimationCanvasesCache.get_item(layer);
						var $t3 = this.$getAllTileAnimationIndexes();
						for (var $t4 = 0; $t4 < $t3.length; $t4++) {
							var tileAnimationIndex = $t3[$t4];
							var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex];
							if (ss.isNullOrUndefined(tileAnimationCanvasFrames)) {
								continue;
							}
							var currentFrame1 = $OurSonic_SonicManager.instance.tileAnimationManager.getCurrentFrame(tileAnimationIndex);
							canvas.fillText('Tile ' + tileAnimationIndex + '-' + currentFrame1.frameIndex, position.x + 75, position.y + yOffset + tileAnimationIndex * 13);
						}
					}
				}
			}
			if (debugDrawOptions.outlineChunk) {
				canvas.strokeStyle = 'black';
				canvas.strokeRect(position.x, position.y, 128, 128);
			}
			if (debugDrawOptions.outlineTiles) {
				canvas.strokeStyle = 'green';
				for (var x = 0; x < $OurSonic_Level_Tiles_TileChunk.tileSideLength; x++) {
					for (var y = 0; y < $OurSonic_Level_Tiles_TileChunk.tileSideLength; y++) {
						canvas.strokeRect(position.x + x * $OurSonic_Level_Tiles_TileChunk.tileSquareSize, position.y + y * $OurSonic_Level_Tiles_TileChunk.tileSquareSize, 8, 8);
					}
				}
			}
			if (debugDrawOptions.outlineTilePieces) {
				canvas.strokeStyle = 'purple';
				for (var x1 = 0; x1 < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; x1++) {
					for (var y1 = 0; y1 < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; y1++) {
						canvas.strokeRect(position.x + x1 * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, position.y + y1 * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, 16, 16);
					}
				}
			}
			if (ss.isValue(debugDrawOptions.outlineTile)) {
				//
				//                                canvas.StrokeStyle = "yellow";
				//
				//                                for (int x = 0; x < TileSideLength; x++)
				//
				//                                {
				//
				//                                for (int y = 0; y < TileSideLength; y++)
				//
				//                                {
				//
				//                                var tilePieceInfo = this.GetTilePiece(x, y);
				//
				//                                if (tilePieceInfo == null) continue;
				//
				//                                var tilePiece = tilePieceInfo.GetTilePiece();
				//
				//                                if (tilePiece == null) continue;
				//
				//                                
				//
				//                                
				//
				//                                
				//
				//                                if (tilePiece == debugDrawOptions.OutlineTilePiece)
				//
				//                                {
				//
				//                                canvas.StrokeRect(position.X + (x * TileSquareSize), position.Y + (y * TileSquareSize), TileSquareSize, TileSquareSize);
				//
				//                                }
				//
				//                                }
				//
				//                                }
			}
			if (ss.isValue(debugDrawOptions.outlineTilePiece)) {
				canvas.strokeStyle = 'yellow';
				for (var x2 = 0; x2 < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; x2++) {
					for (var y2 = 0; y2 < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; y2++) {
						var tilePieceInfo = this.getTilePieceInfo(x2, y2, false);
						if (ss.isNullOrUndefined(tilePieceInfo)) {
							continue;
						}
						var tilePiece = tilePieceInfo.getTilePiece();
						if (ss.isNullOrUndefined(tilePiece)) {
							continue;
						}
						if (tilePiece.index === debugDrawOptions.outlineTilePiece.block) {
							canvas.strokeRect(position.x + x2 * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, position.y + y2 * $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize, 16, 16);
						}
					}
				}
			}
			canvas.restore();
		},
		debug_DrawCache: function() {
			var numWide = 10;
			var numOfChunks = 0;
			for (var i = 0; i < 2; i++) {
				var chunkLayer = i;
				if (ss.isValue(this.$baseCanvasCache.get_item(chunkLayer))) {
					numOfChunks++;
				}
				var $t1 = new ss.ObjectEnumerator(this.$paletteAnimationCanvasesCache.get_item(chunkLayer));
				try {
					while ($t1.moveNext()) {
						var paletteAnimationCanvasCache = $t1.current();
						var $t2 = new ss.ObjectEnumerator(paletteAnimationCanvasCache.value.frames);
						try {
							while ($t2.moveNext()) {
								var frame = $t2.current();
								numOfChunks++;
							}
						}
						finally {
							$t2.dispose();
						}
					}
				}
				finally {
					$t1.dispose();
				}
				var $t3 = new ss.ObjectEnumerator(this.$tileAnimationCanvasesCache.get_item(chunkLayer));
				try {
					while ($t3.moveNext()) {
						var tileAnimationCanvasCache = $t3.current();
						var $t4 = new ss.ObjectEnumerator(tileAnimationCanvasCache.value.frames);
						try {
							while ($t4.moveNext()) {
								var frame1 = $t4.current();
								numOfChunks++;
							}
						}
						finally {
							$t4.dispose();
						}
					}
				}
				finally {
					$t3.dispose();
				}
			}
			var canvas = $OurSonic_Utility_CanvasInformation.create(ss.Int32.trunc(numWide * 128), ss.Int32.trunc(Math.ceil(numOfChunks / numWide)) * 128, false);
			canvas.context.fillStyle = '#111111';
			canvas.context.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
			numOfChunks = 0;
			canvas.context.strokeStyle = '#FFFFFF';
			canvas.context.lineWidth = 4;
			for (var i1 = 0; i1 < 2; i1++) {
				var chunkLayer1 = i1;
				canvas.context.strokeStyle = ((chunkLayer1 === 0) ? 'Green' : 'Yellow');
				if (ss.isValue(this.$baseCanvasCache.get_item(chunkLayer1))) {
					var context = canvas.context;
					context.save();
					var x = ss.Int32.trunc(numOfChunks % numWide * 128);
					var y = ss.Int32.trunc(Math.floor(numOfChunks / numWide)) * 128;
					context.translate(x, y);
					canvas.context.fillStyle = ((chunkLayer1 === 0) ? '#333333' : '#777777');
					context.fillRect(0, 0, 128, 128);
					context.drawImage(this.$baseCanvasCache.get_item(chunkLayer1).canvas, 0, 0);
					context.strokeRect(0, 0, 128, 128);
					context.restore();
					numOfChunks++;
				}
				canvas.context.strokeStyle = ((chunkLayer1 === 0) ? 'pink' : 'purple');
				var $t5 = new ss.ObjectEnumerator(this.$paletteAnimationCanvasesCache.get_item(chunkLayer1));
				try {
					while ($t5.moveNext()) {
						var paletteAnimationCanvasCache1 = $t5.current();
						var $t6 = new ss.ObjectEnumerator(paletteAnimationCanvasCache1.value.frames);
						try {
							while ($t6.moveNext()) {
								var frame2 = $t6.current();
								var context1 = canvas.context;
								context1.save();
								var x1 = ss.Int32.trunc(numOfChunks % numWide * 128);
								var y1 = ss.Int32.trunc(Math.floor(numOfChunks / numWide)) * 128;
								context1.translate(x1, y1);
								canvas.context.fillStyle = ((chunkLayer1 === 0) ? '#333333' : '#777777');
								context1.fillRect(0, 0, 128, 128);
								context1.drawImage(frame2.value.canvas.canvas, paletteAnimationCanvasCache1.value.position.x, paletteAnimationCanvasCache1.value.position.y);
								context1.strokeRect(0, 0, 128, 128);
								context1.restore();
								numOfChunks++;
							}
						}
						finally {
							$t6.dispose();
						}
					}
				}
				finally {
					$t5.dispose();
				}
				canvas.context.strokeStyle = ((chunkLayer1 === 0) ? 'red' : 'orange');
				var $t7 = new ss.ObjectEnumerator(this.$tileAnimationCanvasesCache.get_item(chunkLayer1));
				try {
					while ($t7.moveNext()) {
						var tileAnimationCanvasCache1 = $t7.current();
						var $t8 = new ss.ObjectEnumerator(tileAnimationCanvasCache1.value.frames);
						try {
							while ($t8.moveNext()) {
								var frame3 = $t8.current();
								var context2 = canvas.context;
								context2.save();
								var x2 = ss.Int32.trunc(numOfChunks % numWide * 128);
								var y2 = ss.Int32.trunc(Math.floor(numOfChunks / numWide)) * 128;
								context2.translate(x2, y2);
								canvas.context.fillStyle = ((chunkLayer1 === 0) ? '#333333' : '#777777');
								context2.fillRect(0, 0, 128, 128);
								context2.drawImage(frame3.value.canvas.canvas, tileAnimationCanvasCache1.value.position.y, tileAnimationCanvasCache1.value.position.y);
								context2.strokeRect(0, 0, 128, 128);
								context2.restore();
								numOfChunks++;
							}
						}
						finally {
							$t8.dispose();
						}
					}
				}
				finally {
					$t7.dispose();
				}
			}
			canvas.context.strokeStyle = 'blue';
			canvas.context.strokeRect(0, 0, canvas.canvas.width, canvas.canvas.height);
			canvas.context.fillStyle = 'white';
			canvas.context.font = '20px bold';
			canvas.context.fillText('Number Of Chunks: ' + numOfChunks, 50, 50);
			return canvas;
		},
		getTilePieceAt: function(x, y, large) {
			return this.getTilePieceInfo(x, y, large).getTilePiece();
		},
		setTilePieceAt: function(x, y, tp, large) {
			if (this.getTilePieceInfo(x, y, large).setTilePiece(tp)) {
				this.clearCache();
			}
		},
		getTilePieceInfo: function(x, y, large) {
			if (large) {
				return this.tilePieces[ss.Int32.div(x, $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize)][ss.Int32.div(y, $OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize)];
			}
			else {
				return this.tilePieces[x][y];
			}
		},
		onlyBackground: function() {
			if (!ss.isValue(this.isOnlyBackground)) {
				var $t1 = ss.getEnumerator(this.$eachPiece());
				try {
					while ($t1.moveNext()) {
						var tilePiece = $t1.current();
						if (!tilePiece.onlyBackground()) {
							return ss.unbox(this.isOnlyBackground = false);
						}
					}
				}
				finally {
					$t1.dispose();
				}
				this.isOnlyBackground = true;
				return ss.unbox(this.isOnlyBackground);
			}
			return ss.unbox(this.isOnlyBackground);
		},
		onlyForeground: function() {
			if (!ss.isValue(this.isOnlyForeground)) {
				var $t1 = ss.getEnumerator(this.$eachPiece());
				try {
					while ($t1.moveNext()) {
						var tilePiece = $t1.current();
						if (!tilePiece.onlyForeground()) {
							return ss.unbox(this.isOnlyForeground = false);
						}
					}
				}
				finally {
					$t1.dispose();
				}
				this.isOnlyForeground = true;
				return ss.unbox(this.isOnlyForeground);
			}
			return ss.unbox(this.isOnlyForeground);
		},
		isEmpty: function() {
			if (!ss.isValue(this.$empty)) {
				var $t1 = ss.getEnumerator(this.$eachPiece());
				try {
					while ($t1.moveNext()) {
						var tilePiece = $t1.current();
						if (tilePiece.index !== 0) {
							return ss.unbox(this.$empty = false);
						}
					}
				}
				finally {
					$t1.dispose();
				}
				this.$empty = true;
			}
			return ss.unbox(this.$empty);
		},
		$eachPiece: function() {
			return new ss.IteratorBlockEnumerable(function() {
				return (function() {
					var $result, $state = 0, pieceY, pieceX, tilePiece;
					return new ss.IteratorBlockEnumerator(function() {
						$sm1:
						for (;;) {
							switch ($state) {
								case 0: {
									$state = -1;
									pieceY = 0;
									$state = 1;
									continue $sm1;
								}
								case 1: {
									$state = -1;
									if (!(pieceY < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength)) {
										$state = -1;
										break $sm1;
									}
									pieceX = 0;
									$state = 3;
									continue $sm1;
								}
								case 3: {
									$state = -1;
									if (!(pieceX < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength)) {
										$state = 2;
										continue $sm1;
									}
									tilePiece = this.tilePieces[pieceX][pieceY].getTilePiece();
									if (ss.isValue(tilePiece)) {
										$result = tilePiece;
										$state = 4;
										return true;
									}
									$state = 4;
									continue $sm1;
								}
								case 2: {
									$state = -1;
									pieceY++;
									$state = 1;
									continue $sm1;
								}
								case 4: {
									$state = -1;
									pieceX++;
									$state = 3;
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
				}).call(this);
			}, this);
		},
		$hasPixelAnimations: function() {
			return this.$getAllPaletteAnimationIndexes().length > 0;
		},
		$hasTileAnimations: function() {
			return this.$getAllTileAnimationIndexes().length > 0;
		},
		$getAllPaletteAnimationIndexes: function() {
			if (ss.isNullOrUndefined(this.$paletteAnimationIndexes)) {
				this.$paletteAnimationIndexes = [];
				var $t1 = ss.getEnumerator(this.$eachPiece());
				try {
					while ($t1.moveNext()) {
						var tilePiece = $t1.current();
						if (ss.isNullOrUndefined(tilePiece.animatedPaletteIndexes)) {
							continue;
						}
						for (var $t2 = 0; $t2 < tilePiece.animatedPaletteIndexes.length; $t2++) {
							var animatedPaletteIndex = tilePiece.animatedPaletteIndexes[$t2];
							if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(this.$paletteAnimationIndexes, animatedPaletteIndex) === -1) {
								ss.add(this.$paletteAnimationIndexes, animatedPaletteIndex);
							}
						}
					}
				}
				finally {
					$t1.dispose();
				}
			}
			return this.$paletteAnimationIndexes;
		},
		$getAllTileAnimationIndexes: function() {
			if (ss.isNullOrUndefined(this.$tileAnimationIndexes)) {
				this.$tileAnimationIndexes = [];
				var $t1 = ss.getEnumerator(this.$eachPiece());
				try {
					while ($t1.moveNext()) {
						var tilePiece = $t1.current();
						for (var $t2 = 0; $t2 < tilePiece.tiles.length; $t2++) {
							var tileInfo = tilePiece.tiles[$t2];
							var tile = tileInfo.getTile();
							if (ss.isNullOrUndefined(tile)) {
								continue;
							}
							if (ss.isNullOrUndefined(tile.animatedTileIndexes)) {
								continue;
							}
							for (var $t3 = 0; $t3 < tile.animatedTileIndexes.length; $t3++) {
								var animatedTileIndex = tile.animatedTileIndexes[$t3];
								if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(this.$tileAnimationIndexes, animatedTileIndex) === -1) {
									ss.add(this.$tileAnimationIndexes, animatedTileIndex);
								}
							}
						}
					}
				}
				finally {
					$t1.dispose();
				}
			}
			return this.$tileAnimationIndexes;
		},
		neverAnimates: function() {
			return !(this.$hasTileAnimations() || this.$hasPixelAnimations());
		},
		draw: function(canvas, position, layer) {
			canvas.save();
			{
				canvas.drawImage(this.$baseCanvasCache.get_item(layer).canvas, position.x, position.y);
				if (this.$hasPixelAnimations()) {
					var paletteAnimationCanvases = this.$paletteAnimationCanvasesCache.get_item(layer);
					var $t1 = this.$getAllPaletteAnimationIndexes();
					for (var $t2 = 0; $t2 < $t1.length; $t2++) {
						var paletteAnimationIndex = $t1[$t2];
						var paletteAnimationCanvasFrames = paletteAnimationCanvases[paletteAnimationIndex];
						if (ss.isNullOrUndefined(paletteAnimationCanvasFrames)) {
							continue;
						}
						var currentFrame = $OurSonic_SonicManager.instance.tilePaletteAnimationManager.getCurrentFrame(paletteAnimationIndex);
						this.currentPaletteAnimationFrameIndexCache[paletteAnimationIndex] = currentFrame.frameIndex;
						var paletteAnimationCanvasFrame = paletteAnimationCanvasFrames.frames[currentFrame.frameIndex];
						var canvasLayerToDraw = paletteAnimationCanvasFrame.canvas.canvas;
						canvas.drawImage(canvasLayerToDraw, position.x + paletteAnimationCanvasFrames.position.x, position.y + paletteAnimationCanvasFrames.position.y);
					}
				}
				if (this.$hasTileAnimations()) {
					var tileAnimationCanvases = this.$tileAnimationCanvasesCache.get_item(layer);
					var $t3 = this.$getAllTileAnimationIndexes();
					for (var $t4 = 0; $t4 < $t3.length; $t4++) {
						var tileAnimationIndex = $t3[$t4];
						var tileAnimationCanvasFrames = tileAnimationCanvases[tileAnimationIndex];
						if (ss.isNullOrUndefined(tileAnimationCanvasFrames)) {
							continue;
						}
						var currentFrame1 = $OurSonic_SonicManager.instance.tileAnimationManager.getCurrentFrame(tileAnimationIndex);
						this.currentTileAnimationFrameIndexCache[tileAnimationIndex] = currentFrame1.frameIndex;
						var tileAnimationCanvasFrame = tileAnimationCanvasFrames.frames[currentFrame1.frameIndex];
						var canvasLayerToDraw1 = tileAnimationCanvasFrame.canvas.canvas;
						canvas.drawImage(canvasLayerToDraw1, position.x + tileAnimationCanvasFrames.position.x, position.y + tileAnimationCanvasFrames.position.y);
					}
				}
			}
			canvas.restore();
		},
		$drawTilePiecesAnimatedPalette: function(canvas, layer, piecesSquareSize, animatedPaletteIndex) {
			for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceY++) {
				for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceX++) {
					var pieceInfo = this.tilePieces[pieceX][pieceY];
					var piece = pieceInfo.getTilePiece();
					if (ss.isNullOrUndefined(piece)) {
						continue;
					}
					if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(piece.animatedPaletteIndexes, animatedPaletteIndex) === -1) {
						continue;
					}
					if (((layer === 0) ? piece.onlyForeground() : piece.onlyBackground())) {
						continue;
					}
					this.$myLocalPoint.x = pieceX * piecesSquareSize;
					this.$myLocalPoint.y = pieceY * piecesSquareSize;
					piece.drawAnimatedPalette(canvas, this.$myLocalPoint, layer, pieceInfo.xFlip, pieceInfo.yFlip, animatedPaletteIndex);
				}
			}
		},
		$drawTilePiecesAnimatedTile: function(canvas, layer, piecesSquareSize, animatedTileIndex) {
			for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceY++) {
				for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceX++) {
					var pieceInfo = this.tilePieces[pieceX][pieceY];
					var piece = pieceInfo.getTilePiece();
					if (ss.isNullOrUndefined(piece)) {
						continue;
					}
					if (OurSonicModels.Common.EnumerableExtensions.indexOfFast(piece.get_animatedTileIndexes(), animatedTileIndex) === -1) {
						continue;
					}
					if (((layer === 0) ? piece.onlyForeground() : piece.onlyBackground())) {
						continue;
					}
					this.$myLocalPoint.x = pieceX * piecesSquareSize;
					this.$myLocalPoint.y = pieceY * piecesSquareSize;
					piece.drawAnimatedTile(canvas, this.$myLocalPoint, layer, pieceInfo.xFlip, pieceInfo.yFlip, animatedTileIndex);
				}
			}
		},
		$drawTilePiecesBase: function(canvas, layer, piecesSquareSize) {
			for (var pieceY = 0; pieceY < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceY++) {
				for (var pieceX = 0; pieceX < $OurSonic_Level_Tiles_TileChunk.tilePieceSideLength; pieceX++) {
					var pieceInfo = this.tilePieces[pieceX][pieceY];
					var piece = pieceInfo.getTilePiece();
					if (ss.isNullOrUndefined(piece)) {
						continue;
					}
					if (((layer === 0) ? piece.onlyForeground() : piece.onlyBackground())) {
						continue;
					}
					this.$myLocalPoint.x = pieceX * piecesSquareSize;
					this.$myLocalPoint.y = pieceY * piecesSquareSize;
					piece.drawBase(canvas, this.$myLocalPoint, layer, pieceInfo.xFlip, pieceInfo.yFlip);
				}
			}
		}
	});
	ss.initClass($OurSonic_Level_Tiles_TileChunkDebugDrawOptions, $asm, {});
	ss.initClass($OurSonic_Level_Tiles_TileInfo, $asm, {
		getTile: function() {
			return $OurSonic_SonicManager.instance.sonicLevel.getTile(this._Tile);
		}
	});
	ss.initClass($OurSonic_Level_Tiles_TilePiece, $asm, {
		get_animatedTileIndexes: function() {
			return this.$1$AnimatedTileIndexesField;
		},
		set_animatedTileIndexes: function(value) {
			this.$1$AnimatedTileIndexesField = value;
		},
		init: function() {
			this.onlyBackground();
			this.onlyForeground();
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
		drawBase: function(canvas, position, layer, xFlip, yFlip) {
			var drawOrderIndex = 0;
			drawOrderIndex = (xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3));
			var tilePieceLength = 8;
			var ac = $OurSonic_Utility_CanvasInformation.create(tilePieceLength * 2, tilePieceLength * 2, false);
			var i = 0;
			var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var tileItem = this.tiles[$t1];
				var tile = tileItem.getTile();
				if (tile) {
					if (tileItem.priority === (layer === 1)) {
						var _xf = xFlip ^ tileItem.xFlip;
						var _yf = yFlip ^ tileItem.yFlip;
						var df = $OurSonic_Level_Tiles_TilePiece.$drawInfo[$OurSonic_Level_Tiles_TilePiece.$drawOrder[drawOrderIndex][i]];
						localPoint.x = df[0] * tilePieceLength;
						localPoint.y = df[1] * tilePieceLength;
						tile.drawBase(ac.context, localPoint, _xf, _yf, tileItem.palette, false);
					}
				}
				i++;
			}
			canvas.drawImage(ac.canvas, position.x, position.y);
		},
		$getAnimatedPaletteCacheIndex: function(xflip, yflip, animatedPaletteIndex, frameIndex) {
			return (frameIndex << 8) + (animatedPaletteIndex << 7) + ((xflip ? 1 : 0) << 5) + ((yflip ? 1 : 0) << 4);
		},
		drawAnimatedPalette: function(canvas, position, layer, xFlip, yFlip, animatedPaletteIndex) {
			var animatedPaletteCacheIndex = this.$getAnimatedPaletteCacheIndex(xFlip, yFlip, animatedPaletteIndex, $OurSonic_SonicManager.instance.tilePaletteAnimationManager.getPaletteAnimation(animatedPaletteIndex).currentFrame);
			var animatedPaletteCache = this.$animatedPaletteCaches[animatedPaletteCacheIndex];
			if (ss.isNullOrUndefined(animatedPaletteCache)) {
				var drawOrderIndex = 0;
				drawOrderIndex = (xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3));
				var tilePieceLength = 8;
				var ac = $OurSonic_Utility_CanvasInformation.create(tilePieceLength * 2, tilePieceLength * 2, false);
				var i = 0;
				var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
				for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
					var tileItem = this.tiles[$t1];
					var tile = tileItem.getTile();
					if (tile) {
						if (tileItem.priority === (layer === 1)) {
							var _xf = xFlip ^ tileItem.xFlip;
							var _yf = yFlip ^ tileItem.yFlip;
							var df = $OurSonic_Level_Tiles_TilePiece.$drawInfo[$OurSonic_Level_Tiles_TilePiece.$drawOrder[drawOrderIndex][i]];
							localPoint.x = df[0] * tilePieceLength;
							localPoint.y = df[1] * tilePieceLength;
							tile.drawAnimatedPalette(ac.context, localPoint, _xf, _yf, tileItem.palette, animatedPaletteIndex, false);
						}
					}
					i++;
				}
				this.$animatedPaletteCaches[animatedPaletteCacheIndex] = animatedPaletteCache = ac;
			}
			canvas.drawImage(animatedPaletteCache.canvas, position.x, position.y);
		},
		drawAnimatedTile: function(canvas, position, layer, xFlip, yFlip, animatedTileIndex) {
			var drawOrderIndex = 0;
			drawOrderIndex = (xFlip ? (yFlip ? 0 : 1) : (yFlip ? 2 : 3));
			var tilePieceLength = 8;
			var ac = $OurSonic_Utility_CanvasInformation.create(tilePieceLength * 2, tilePieceLength * 2, false);
			var i = 0;
			var localPoint = $OurSonic_Utility_Point.$ctor1(0, 0);
			for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
				var tileItem = this.tiles[$t1];
				var tile = tileItem.getTile();
				if (tile) {
					if (tileItem.priority === (layer === 1)) {
						var _xf = xFlip ^ tileItem.xFlip;
						var _yf = yFlip ^ tileItem.yFlip;
						var df = $OurSonic_Level_Tiles_TilePiece.$drawInfo[$OurSonic_Level_Tiles_TilePiece.$drawOrder[drawOrderIndex][i]];
						localPoint.x = df[0] * tilePieceLength;
						localPoint.y = df[1] * tilePieceLength;
						tile.drawAnimatedTile(ac.context, localPoint, _xf, _yf, tileItem.palette, animatedTileIndex);
					}
				}
				i++;
			}
			canvas.drawImage(ac.canvas, position.x, position.y);
		},
		shouldAnimate: function() {
			if (ss.isNullOrUndefined(this.$shouldAnimate)) {
				for (var $t1 = 0; $t1 < this.tiles.length; $t1++) {
					var t = this.tiles[$t1];
					var tile = t.getTile();
					if (tile) {
						if (tile.shouldTileAnimate()) {
							return ss.unbox(this.$shouldAnimate = true);
						}
					}
				}
				this.$shouldAnimate = false;
			}
			return ss.unbox(this.$shouldAnimate);
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
			return $OurSonic_SonicManager.instance.sonicLevel.getTilePiece(this.block);
		},
		setTilePiece: function(tp) {
			if (this.block === tp.index) {
				return false;
			}
			this.block = tp.index;
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
			//todo: this is some of the worst code man has ever written. if youre reading this im sorry. send me an email dested@gmail for an apology.
			var _x = ss.Int32.div(x1, 128);
			var _y = $OurSonic_Utility_Help.mod(ss.Int32.div(y1, 128), $OurSonic_SonicManager.instance.sonicLevel.levelHeight);
			var tc = $OurSonic_SonicManager.instance.sonicLevel.getChunkAt(_x, _y);
			this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
									this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
								this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
									this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
								this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
									this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
								this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
									this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
								this.manager.buildChunk(tc, $OurSonic_SonicManager.instance.sonicLevel.curHeightMap);
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
		},
		buildChunk: function(chunk, isLayerOne) {
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
			this.myRec.x = ss.Int32.trunc(this.x - 10);
			this.myRec.y = ss.Int32.trunc(this.y - 20);
			this.myRec.width = 20;
			this.myRec.height = 40;
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
				this.x = (sonicLevel.levelWidth * 128 + this.x) % (sonicLevel.levelWidth * 128);
				this.y = (sonicLevel.levelHeight * 128 + this.y) % (sonicLevel.levelHeight * 128);
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
			this.sensorManager.check(this);
			var sensorM1 = this.sensorManager.getResult('m1');
			var sensorM2 = this.sensorManager.getResult('m2');
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
			this.sensorManager.check(this);
			var sensorA = this.sensorManager.getResult('a');
			var sensorB = this.sensorManager.getResult('b');
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
				this.sensorManager.check(this);
				var sensorC = this.sensorManager.getResult('c');
				var sensorD = this.sensorManager.getResult('d');
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
			return this.$halfSize;
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
			this.$offsetFromImage.x = xOffset;
			this.$offsetFromImage.y = yOffset;
			return this.$offsetFromImage;
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
					this.sensorManager.draw(canvas, this);
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
			canvas.save();
			{
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
			canvas.restore();
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
			this.$objectCollision.x = x;
			this.$objectCollision.y = y;
			var me = this.$objectCollision;
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
			this.$ringCollisionRect.x = 0;
			this.$ringCollisionRect.y = 0;
			this.$ringCollisionRect.width = 16;
			this.$ringCollisionRect.height = 16;
			var rings = $OurSonic_SonicManager.instance.sonicLevel.rings;
			for (var index = 0; index < rings.length; index++) {
				var ring = rings[index];
				var pos = ring;
				if (this.obtainedRing[index]) {
					continue;
				}
				this.$ringCollisionRect.x = pos.x;
				this.$ringCollisionRect.y = pos.y;
				if ($OurSonic_Utility_IntersectingRectangle.intersectRect(me, this.$ringCollisionRect)) {
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
	ss.initInterface($OurSonic_UI_Controllers_IController, $asm, {});
	ss.initClass($OurSonic_UI_Controllers_$AssetFrameEditorController, $asm, {}, null, [$OurSonic_UI_Controllers_IController]);
	ss.initClass($OurSonic_UI_Controllers_$LevelSelectorController, $asm, {
		$loadLevelFn: function(arg) {
			this.$scope.model.loadingStatus = 'Downloading ' + arg.name;
			$OurSonic_SonicEngine.instance.client.emit('LoadLevel.Request', new (ss.makeGenericType(OurSonicModels.Common.DataObject$1, [String]))(arg.name));
		},
		$loadLevel: function(data) {
			$OurSonic_Utility_Help.decodeString$1(OurSonicModels.SLData).call(null, data.Data, ss.mkdel(this, function(level) {
				this.$scope.model.loadingStatus = 'Loading: ';
				$OurSonic_SonicEngine.instance.runSonic(level);
				this.$createUIService.createSingleton$2($OurSonic_UI_Scope_Controller_TileEditorScope).call(this.$createUIService, $OurSonic_UI_Controllers_$TileEditorController.$view, function(_scope, elem) {
					_scope.callback = $OurSonic_UI_Scope_Controller_TileEditorScopeCallback.$ctor();
					_scope.model = $OurSonic_UI_Scope_Controller_TileEditorScopeModel.$ctor();
					_scope.model.tileChunks = $OurSonic_SonicManager.instance.sonicLevel.tileChunks;
					//                    _scope.Model.TilePieces = SonicManager.Instance.SonicLevel.TilePieces;
				});
			}));
		}
	}, null, [$OurSonic_UI_Controllers_IController]);
	ss.initClass($OurSonic_UI_Controllers_$ObjectFrameworkEditorController, $asm, {
		$saveChangesFn: function() {
			var k = this.$scope.model.objectData.key;
			var $t1 = this.$scope.model.objectData.oldKey;
			if (ss.isNullOrUndefined($t1)) {
				$t1 = this.$scope.model.objectData.key;
			}
			var o = $t1;
			var v = $OurSonic_Utility_Help.stringify(this.$scope.model.objectData);
			var $t3 = $OurSonic_SonicEngine.instance.client;
			var $t2 = OurSonicModels.SaveObjectModel.$ctor();
			$t2.key = k;
			$t2.oldKey = o;
			$t2.data = v;
			$t3.emit('SaveObject', $t2);
			$OurSonic_SonicEngine.instance.client.on('SaveObject.Response', function(data) {
				$OurSonic_SonicEngine.instance.client.emit('GetAllObjectsData', '');
			});
		},
		$modifyScriptFn: function(arg) {
			this.$resetModel();
			this.$scope.model.modifyScript = arg;
		},
		$removeProjectileFn: function() {
			ss.remove(this.$scope.model.objectData.projectiles, this.$scope.model.selectedProjectile);
			this.$scope.model.selectedProjectile = null;
		},
		$removePieceLayoutFn: function() {
			ss.remove(this.$scope.model.objectData.pieceLayouts, this.$scope.model.selectedPieceLayout);
			this.$scope.model.selectedPieceLayout = null;
		},
		$removedPieceFn: function() {
			ss.remove(this.$scope.model.objectData.pieces, this.$scope.model.selectedPiece);
			this.$scope.model.selectedPiece = null;
		},
		$removeAssetFn: function() {
			ss.remove(this.$scope.model.objectData.assets, this.$scope.model.selectedAsset);
			this.$scope.model.selectedAsset = null;
		},
		$removeFrameFromAssetFn: function() {
			ss.remove(this.$scope.model.selectedAsset.frames, this.$scope.model.selectedAssetFrame);
			this.$scope.model.selectedAssetFrame = null;
		},
		$addFrameToAssetFn: function() {
			var vs;
			ss.add(this.$scope.model.selectedAsset.frames, vs = new $OurSonic_Level_Objects_LevelObjectAssetFrame('Frame ' + (this.$scope.model.selectedAsset.frames.length + 1)));
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
		},
		$addProjectileFn: function() {
			ss.add(this.$scope.model.objectData.projectiles, $OurSonic_Level_Objects_LevelObjectProjectile.$ctor('Piece Projectile ' + (this.$scope.model.objectData.projectiles.length + 1)));
		},
		$addPieceLayoutFn: function() {
			ss.add(this.$scope.model.objectData.pieceLayouts, new $OurSonic_Level_Objects_LevelObjectPieceLayout('Piece Layout ' + (this.$scope.model.objectData.pieceLayouts.length + 1)));
		},
		$addPieceFn: function() {
			ss.add(this.$scope.model.objectData.pieces, $OurSonic_Level_Objects_LevelObjectPiece.$ctor('Piece ' + (this.$scope.model.objectData.pieces.length + 1)));
		},
		$addAssetFn: function() {
			ss.add(this.$scope.model.objectData.assets, new $OurSonic_Level_Objects_LevelObjectAsset('Asset ' + (this.$scope.model.objectData.assets.length + 1)));
		},
		$resetModel: function() {
			this.$scope.model.assetEditType = 'offset';
			this.$scope.model.selectedAsset = null;
			this.$scope.model.selectedPiece = null;
			this.$scope.model.selectedProjectile = null;
			this.$scope.model.selectedPieceLayout = null;
			this.$scope.model.selectedAssetFrame = null;
			this.$scope.model.selectedPieceLayoutPiece = null;
			this.$scope.model.modifyScript = 'none';
		},
		$editAssetFrameFn: function() {
			this.$createUIService.createSingleton$2($OurSonic_UI_Scope_Controller_AssetFrameEditorScope).call(this.$createUIService, $OurSonic_UI_Controllers_$AssetFrameEditorController.$view, ss.mkdel(this, function(scope, elem) {
				scope.callback = $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback.$ctor();
				scope.model = $OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel.$ctor();
				scope.model.frame = this.$scope.model.selectedAssetFrame;
			}));
		}
	}, null, [$OurSonic_UI_Controllers_IController]);
	ss.initClass($OurSonic_UI_Controllers_$ObjectFrameworkListController, $asm, {
		$createFrameworkFn: function() {
			this.$createUIService.createSingleton$2($OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope).call(this.$createUIService, $OurSonic_UI_Controllers_$ObjectFrameworkEditorController.$view, function(scope, elem) {
				scope.callback = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.$ctor();
				scope.model = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.$ctor();
				scope.model.objectData = new $OurSonic_Level_Objects_LevelObject('SomeKey');
			});
		},
		$loadObjectFn: function(arg) {
			var name = arg.name;
			var objects = $OurSonic_SonicManager.instance.cachedObjects;
			if (ss.isValue(objects)) {
				if (ss.isValue(objects[name])) {
					this.$createUIService.createSingleton$2($OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope).call(this.$createUIService, $OurSonic_UI_Controllers_$ObjectFrameworkEditorController.$view, function(scope, elem) {
						scope.callback = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.$ctor();
						scope.model = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.$ctor();
						scope.model.objectData = objects[name];
					});
					return;
				}
			}
			if (arg.object.pieceLayouts.length > 0) {
				var pl = arg.object.pieceLayouts[0];
				//    pl.DrawUI();
			}
			this.$createUIService.createSingleton$2($OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope).call(this.$createUIService, $OurSonic_UI_Controllers_$ObjectFrameworkEditorController.$view, function(scope1, elem1) {
				scope1.callback = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback.$ctor();
				scope1.model = $OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel.$ctor();
				scope1.model.objectData = arg.object;
			});
			//
			//                        var oldTitle = UIManager.UIManager.CurLevelName;
			//
			//                        
			//
			//                        UIManager.UIManager.UpdateTitle("Downloading Object:" + name);
			//
			//                        
			//
			//                        SonicEngine.Instance.client.Emit("GetObject", new DataObject<string>(name));
			//
			//                        SonicEngine.Instance.client.On<DataObject<string>>("GetObject.Response",
			//
			//                        (lvl) =>
			//
			//                        {
			//
			//                        UIManager.UIManager.UpdateTitle(oldTitle);
			//
			//                        var d = ObjectManager.ExtendObject(jQuery.ParseJsonData<LevelObjectData>(lvl.Data));
			//
			//                        
			//
			//                        createUIService.CreateSingleton<ObjectFrameworkEditorScope>(ObjectFrameworkEditorController.View, (scope, elem) =>
			//
			//                        {
			//
			//                        scope.Callback = new ObjectFrameworkEditorScopeCallback();
			//
			//                        scope.Model = new ObjectFrameworkEditorScopeModel();
			//
			//                        scope.Model.ObjectData = d;
			//
			//                        });
			//
			//                        
			//
			//                        });
		}
	}, null, [$OurSonic_UI_Controllers_IController]);
	ss.initClass($OurSonic_UI_Controllers_$TileEditorController, $asm, {}, null, [$OurSonic_UI_Controllers_IController]);
	ss.initClass($OurSonic_UI_Controllers_ObjectModel, $asm, {});
	ss.initEnum($OurSonic_UI_Directives_AssetFrameEditType, $asm, { hurtMap: 'hurtMap', colorMap: 'colorMap', collisionMap: 'collisionMap', offset: 'offset' }, true);
	ss.initClass($OurSonic_UI_Directives_CanvasAssetFrameDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			element.width(scope.width);
			element.height(scope.height);
			element[0].style.display = (scope.inline ? 'inline-block' : 'block');
			var $t1 = element[0];
			var context = ss.cast(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')).getContext('2d'), CanvasRenderingContext2D);
			var updateFrame = function() {
				context.canvas.width = context.canvas.width;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				scope.frame.drawSimple(context, $OurSonic_Utility_Point.$ctor1(0, 0), scope.width, scope.height, false, false);
			};
			scope.$watch('frame', updateFrame);
			scope.$watch('frame.width', updateFrame);
			scope.$watch('frame.height', updateFrame);
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasAssetFrameEditDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			var $t1 = element[0];
			var frameCanvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
			frameCanvas.width = scope.width;
			frameCanvas.height = scope.height;
			var mousedown = false;
			element.mousedown(function(e) {
				mousedown = true;
			});
			element.mouseup(function(e1) {
				mousedown = false;
			});
			element.mousemove(function(e2) {
				scope.$apply(function() {
					if (!mousedown) {
						return;
					}
					if (scope.edit) {
						var x = e2.offsetX;
						var y = e2.offsetY;
						var _x = ss.Int32.trunc(x / (scope.width / scope.frame.width));
						var _y = ss.Int32.trunc(y / (scope.height / scope.frame.height));
						var halfwidth = ss.Int32.div(scope.lineWidth, 2);
						var map;
						var setValue;
						switch (scope.editType) {
							case 'colorMap': {
								setValue = scope.editPaletteIndex;
								map = scope.frame.colorMap;
								break;
							}
							case 'hurtMap': {
								setValue = scope.editPaletteIndex;
								map = scope.frame.hurtSonicMap;
								break;
							}
							case 'collisionMap': {
								setValue = scope.editPaletteIndex;
								map = scope.frame.collisionMap;
								break;
							}
							case 'offset': {
								scope.frame.offsetX = _x;
								scope.frame.offsetY = _y;
								//special
								return;
							}
							default: {
								throw new ss.ArgumentOutOfRangeException();
							}
						}
						if (scope.lineWidth === 1) {
							map[_x][_y] = setValue;
						}
						else {
							for (var k = -halfwidth; k < halfwidth; k++) {
								for (var c = -halfwidth; c < halfwidth; c++) {
									map[Math.min(Math.max(0, _x + k), scope.frame.width)][Math.min(Math.max(0, _y + c), scope.frame.height)] = setValue;
								}
							}
						}
						scope.frame.clearCache();
					}
				});
			});
			var frameContext = ss.cast(frameCanvas.getContext('2d'), CanvasRenderingContext2D);
			var updateFrame = function() {
				frameContext.canvas.width = frameContext.canvas.width;
				frameContext.webkitImageSmoothingEnabled = false;
				frameContext.mozImageSmoothingEnabled = false;
				frameContext.imageSmoothingEnabled = false;
				frameContext.scale(scope.width / scope.frame.width, scope.height / scope.frame.height);
				scope.frame.drawUI(frameContext, $OurSonic_Utility_Point.$ctor1(0, 0), false, scope.editType === 'collisionMap', scope.editType === 'hurtMap', scope.editType === 'offset', false, false);
			};
			scope.$watch('frame', updateFrame);
			scope.$watch('editType', updateFrame);
			scope.$watch('frame.width', updateFrame);
			scope.$watch('frame.height', updateFrame);
			scope.$watch('frame.offsetX', updateFrame);
			scope.$watch('frame.offsetY', updateFrame);
			scope.$watch('frame.hurtSonicMap', updateFrame, true);
			scope.$watch('frame.collisionMap', updateFrame, true);
			scope.$watch('frame.colorMap', updateFrame, true);
			scope.$watch('frame.palette', updateFrame, true);
			scope.$watch('editType', updateFrame);
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			var $t1 = element[0];
			var paletteCanvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
			paletteCanvas.width = scope.width;
			paletteCanvas.height = scope.height;
			element.mousedown(function(e) {
				if (scope.edit) {
					var f = ss.Int32.trunc(Math.ceil(scope.frame.palette.length / 2));
					var x = e.offsetX;
					var y = e.offsetY;
					if (scope.wide) {
						var _x = ss.Int32.trunc(x / (scope.width / (f + (scope.showCurrent ? 2 : 0))));
						var _y = ss.Int32.trunc(y / (scope.height / 2));
						if (ss.isValue(scope.frame.palette[_y * f + _x])) {
							scope.selectedPaletteIndex = _y * f + _x;
						}
					}
					else {
						var _x1 = ss.Int32.trunc(x / (scope.width / 2));
						var _y1 = ss.Int32.trunc(y / (scope.height / (f + (scope.showCurrent ? 2 : 0))));
						if (ss.isValue(scope.frame.palette[_y1 * 2 + _x1])) {
							scope.selectedPaletteIndex = _y1 * 2 + _x1;
						}
					}
				}
			});
			var paletteContext = ss.cast(paletteCanvas.getContext('2d'), CanvasRenderingContext2D);
			if (scope.showCurrent) {
				scope.selectedPaletteIndex = 0;
			}
			var updateFrame = function() {
				paletteContext.canvas.width = paletteContext.canvas.width;
				paletteContext.webkitImageSmoothingEnabled = false;
				paletteContext.mozImageSmoothingEnabled = false;
				paletteContext.imageSmoothingEnabled = false;
				var palette = scope.frame.palette;
				var canv = paletteContext;
				canv.save();
				var f1 = ss.Int32.trunc(Math.ceil(palette.length / 2));
				if (scope.wide) {
					canv.scale(scope.width / (f1 + (scope.showCurrent ? 2 : 0)), scope.height / 2);
					for (var h = 0; h < 2; h++) {
						for (var w = 0; w < f1; w++) {
							if (ss.isValue(palette[w + h * f1])) {
								canv.fillStyle = palette[w + h * f1];
								canv.fillRect(w, h, 1, 1);
							}
						}
					}
					if (scope.showCurrent) {
						canv.fillStyle = palette[scope.selectedPaletteIndex];
						canv.fillRect(f1, 0, 2, 2);
					}
				}
				else {
					canv.scale(scope.width / 2, scope.height / (f1 + (scope.showCurrent ? 2 : 0)));
					for (var h1 = 0; h1 < f1; h1++) {
						for (var w1 = 0; w1 < 2; w1++) {
							if (ss.isValue(palette[w1 + h1 * 2])) {
								canv.fillStyle = palette[w1 + h1 * 2];
								canv.fillRect(w1, h1, 1, 1);
							}
						}
					}
					if (scope.showCurrent) {
						canv.fillStyle = palette[scope.selectedPaletteIndex];
						canv.fillRect(0, f1, 2, 2);
					}
				}
				canv.restore();
			};
			scope.$watch('frame', updateFrame);
			scope.$watch('frame.palette', updateFrame);
			scope.$watch('selectedPaletteIndex', updateFrame);
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasPieceAssetDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			element.width(scope.width);
			element.height(scope.height);
			element[0].style.display = (scope.inline ? 'inline-block' : 'block');
			var $t1 = element[0];
			var context = ss.cast(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')).getContext('2d'), CanvasRenderingContext2D);
			var updateAsset = function() {
				context.canvas.width = context.canvas.width;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				var levelObjectAssetFrames = scope.asset.frames;
				if (levelObjectAssetFrames.length === 0) {
					return;
				}
				levelObjectAssetFrames[0].drawSimple(context, $OurSonic_Utility_Point.$ctor1(0, 0), scope.width, scope.height, false, false);
			};
			scope.$watch('asset', updateAsset);
			scope.$watch('asset.frames', updateAsset);
			scope.$watch('asset.width', updateAsset);
			scope.$watch('asset.height', updateAsset);
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasPieceLayoutDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			element.width(scope.width);
			element.height(scope.height);
			element[0].style.display = 'inline-block';
			var $t1 = element[0];
			var context = ss.cast(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')).getContext('2d'), CanvasRenderingContext2D);
			var updatePieceLayout = function() {
				context.canvas.width = context.canvas.width;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				context.fillStyle = '#FFFFFF';
				context.fillRect(0, 0, scope.width, scope.height);
				context.beginPath();
				context.rect(0, 0, scope.width, scope.height);
				context.clip();
				context.closePath();
				if (ss.isNullOrUndefined(scope.pieceLayout)) {
					return;
				}
				var rect = scope.pieceLayout.getRectangle(scope.objectData);
				context.scale(scope.width / rect.width, scope.height / rect.height);
				context.translate(-rect.x, -rect.y);
				scope.pieceLayout.drawUI(context, true, -1, scope.objectData);
			};
			scope.$watch('pieceLayout', updatePieceLayout);
			scope.$watch('pieceLayout.pieces', updatePieceLayout, true);
		},
		$pointInArea: function(x, y, rad, posX, posY) {
			return posX > x - rad && posY > y - rad && posX < x + rad && posY < y + rad;
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasPieceLayoutEditDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			element.width(scope.width);
			element.height(scope.height);
			var mouseDown = false;
			var lastPosition = $OurSonic_Utility_FloatPoint.$ctor1(scope.width / 2, scope.height / 2);
			var movingPiece = null;
			element.mousedown(ss.mkdel(this, function(e) {
				lastPosition.x = e.offsetX;
				lastPosition.y = e.offsetY;
				mouseDown = true;
				var posX = (e.offsetX - scope.zeroPosition.x) / scope.scale;
				var posY = (e.offsetY - scope.zeroPosition.y) / scope.scale;
				for (var $t1 = 0; $t1 < scope.pieceLayout.pieces.length; $t1++) {
					var levelObjectPieceLayoutPiece = scope.pieceLayout.pieces[$t1];
					var piece = scope.objectData.pieces[levelObjectPieceLayoutPiece.pieceIndex];
					var asset = scope.objectData.assets[piece.assetIndex];
					if (asset.frames.length > 0) {
						var frm = asset.frames[0];
						if (this.$pointInArea(levelObjectPieceLayoutPiece.x - frm.offsetX, levelObjectPieceLayoutPiece.y - frm.offsetY, 30, posX, posY)) {
							movingPiece = levelObjectPieceLayoutPiece;
							scope.selectedPieceLayoutPiece = movingPiece;
							lastPosition.x = posX;
							lastPosition.y = posY;
							return;
						}
					}
				}
			}));
			element.mouseup(function(e1) {
				mouseDown = false;
				movingPiece = null;
			});
			element.mousemove(function(e2) {
				scope.$apply(function() {
					if (!mouseDown) {
						return;
					}
					var x = e2.offsetX;
					var y = e2.offsetY;
					if (ss.isValue(movingPiece)) {
						var posX1 = (e2.offsetX - scope.zeroPosition.x) / scope.scale;
						var posY1 = (e2.offsetY - scope.zeroPosition.y) / scope.scale;
						if (Math.abs(ss.Int32.trunc(posX1 - lastPosition.x)) > 0) {
							movingPiece.x += ss.Int32.trunc(posX1 - lastPosition.x);
							lastPosition.x = posX1;
						}
						if (Math.abs(ss.Int32.trunc(posY1 - lastPosition.y)) > 0) {
							movingPiece.y += ss.Int32.trunc(posY1 - lastPosition.y);
							lastPosition.y = posY1;
						}
					}
					else {
						scope.zeroPosition.x += ss.Int32.trunc(x - lastPosition.x);
						scope.zeroPosition.y += ss.Int32.trunc(y - lastPosition.y);
						lastPosition.x = e2.offsetX;
						lastPosition.y = e2.offsetY;
					}
				});
			});
			element[0].style.display = 'inline-block';
			var $t2 = element[0];
			var context = ss.cast(ss.cast($t2, ss.isValue($t2) && (ss.isInstanceOfType($t2, Element) && $t2.tagName === 'CANVAS')).getContext('2d'), CanvasRenderingContext2D);
			scope.scale = 1;
			scope.zeroPosition = $OurSonic_Utility_Point.$ctor1(0, 0);
			var updatePieceLayout = function() {
				context.canvas.width = context.canvas.width;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				context.fillStyle = '#FFFFFF';
				context.fillRect(0, 0, scope.width, scope.height);
				context.beginPath();
				context.rect(0, 0, scope.width, scope.height);
				context.clip();
				context.closePath();
				context.translate(scope.zeroPosition.x, scope.zeroPosition.y);
				context.scale(scope.scale, scope.scale);
				scope.pieceLayout.drawUI(context, scope.showImages, ss.indexOf(scope.pieceLayout.pieces, scope.selectedPieceLayoutPiece), scope.objectData);
			};
			scope.$watch('pieceLayout', updatePieceLayout);
			scope.$watch('pieceLayout.pieces', updatePieceLayout, true);
			scope.$watch('scale', updatePieceLayout);
			scope.$watch('showImages', updatePieceLayout);
			scope.$watch('zeroPosition', updatePieceLayout, true);
			scope.$watch('selectedPieceLayoutPiece', updatePieceLayout);
		},
		$pointInArea: function(x, y, rad, posX, posY) {
			return posX > x - rad && posY > y - rad && posX < x + rad && posY < y + rad;
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasTileChunkDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			element.width(scope.width);
			element.height(scope.height);
			if (scope.edit) {
				element.click(function(ev) {
					if (ss.isNullOrUndefined(scope.tileChunk)) {
						return;
					}
					var x = ev.offsetX;
					var y = ev.offsetY;
					var _x = ss.Int32.trunc(x / (scope.width / 128));
					var _y = ss.Int32.trunc(y / (scope.height / 128));
					scope.debugDrawOptions.outlineTilePiece = scope.tileChunk.getTilePieceInfo(_x, _y, true);
				});
			}
			var $t1 = element[0];
			var context = ss.cast(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')).getContext('2d'), CanvasRenderingContext2D);
			var updateTileChunk = function() {
				if (ss.isNullOrUndefined(scope.tileChunk)) {
					return;
				}
				var drawOptions = scope.drawOptions || $OurSonic_UI_Directives_CanvasTileChunkDirective.defaultDrawOptions;
				context.canvas.width = context.canvas.width;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				context.scale(scope.width / 128, scope.height / 128);
				if (drawOptions.showLowLayer && !scope.tileChunk.onlyForeground()) {
					scope.tileChunk.draw(context, $OurSonic_Utility_Point.$ctor1(0, 0), 0);
				}
				if (drawOptions.showHighLayer && !scope.tileChunk.onlyBackground()) {
					scope.tileChunk.draw(context, $OurSonic_Utility_Point.$ctor1(0, 0), 1);
				}
				if (ss.isValue(scope.debugDrawOptions)) {
					if (drawOptions.showLowLayer && !scope.tileChunk.onlyForeground()) {
						scope.tileChunk.drawAnimationDebug(context, $OurSonic_Utility_Point.$ctor1(0, 0), 0, scope.debugDrawOptions);
					}
					if (drawOptions.showHighLayer && !scope.tileChunk.onlyBackground()) {
						scope.tileChunk.drawAnimationDebug(context, $OurSonic_Utility_Point.$ctor1(0, 0), 1, scope.debugDrawOptions);
					}
				}
			};
			scope.$watch('tileChunk', updateTileChunk);
			scope.$watch('drawOptions', updateTileChunk, true);
			scope.$watch('debugDrawOptions', updateTileChunk, true);
			scope.$watch('tileChunk.currentTileAnimationFrameIndexCache', updateTileChunk, true);
			scope.$watch('tileChunk.currentPaletteAnimationFrameIndexCache', updateTileChunk, true);
			window.setInterval(function() {
				if (ss.isNullOrUndefined(scope.tileChunk)) {
					return;
				}
				if (!scope.tileChunk.neverAnimates()) {
					if (scope.shouldAnimate) {
						updateTileChunk();
					}
					else {
						scope.$digest();
					}
				}
			}, 16);
		}
	});
	ss.initClass($OurSonic_UI_Directives_CanvasTilePieceDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			element.width(scope.width);
			element.height(scope.height);
			if (scope.edit) {
				element.click(function(ev) {
					var tilePieceInfo = scope.tilePiece;
					if (ss.isNullOrUndefined(tilePieceInfo)) {
						return;
					}
					var x = ev.offsetX;
					var y = ev.offsetY;
					var _x = ss.Int32.trunc(x / (scope.width / 128));
					var _y = ss.Int32.trunc(y / (scope.height / 128));
					//                                  scope.DebugDrawOptions.OutlineTilePiece = scope.TileChunk.GetTilePieceInfo(_x, _y, true);
				});
			}
			var zero = $OurSonic_Utility_Point.$ctor1(0, 0);
			var $t1 = element[0];
			var context = ss.cast(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')).getContext('2d'), CanvasRenderingContext2D);
			var updateTilePiece = function() {
				if (ss.isNullOrUndefined(scope.tilePiece)) {
					return;
				}
				var tilePiece = scope.tilePiece.getTilePiece();
				context.canvas.width = context.canvas.width;
				context.webkitImageSmoothingEnabled = false;
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
				context.scale(scope.width / 16, scope.height / 16);
				tilePiece.drawBase(context, zero, 0, false, false);
				tilePiece.drawBase(context, zero, 1, false, false);
				for (var index = 0; index < tilePiece.animatedPaletteIndexes.length; index++) {
					var animatedPaletteIndex = tilePiece.animatedPaletteIndexes[index];
					tilePiece.drawAnimatedPalette(context, zero, 0, false, false, animatedPaletteIndex);
					tilePiece.drawAnimatedPalette(context, zero, 1, false, false, animatedPaletteIndex);
				}
				for (var index1 = 0; index1 < tilePiece.get_animatedTileIndexes().length; index1++) {
					var animatedTileIndex = tilePiece.get_animatedTileIndexes()[index1];
					tilePiece.drawAnimatedTile(context, zero, 0, false, false, animatedTileIndex);
					tilePiece.drawAnimatedTile(context, zero, 1, false, false, animatedTileIndex);
				}
			};
			scope.$watch('tilePiece', updateTilePiece);
			window.setInterval(function() {
				//
				//                                   if (tilePieceInfo == null) return;
				//
				//                                   if (!tilePieceInfo.ShouldAnimate())
				//
				//                                   {
				//
				//                                   if (scope.ShouldAnimate)
				//
				//                                   {
				//
				//                                   updateTilePiece();
				//
				//                                   }
				//
				//                                   else
				//
				//                                   scope.Digest();
				//
				//                                   }
			}, 16);
		}
	});
	ss.initClass($OurSonic_UI_Directives_DraggableDirective, $asm, {
		$linkFn: function(scope, element, attrs) {
			element.draggable({ cancel: '.window .inner-window' });
		}
	});
	ss.initClass($OurSonic_UI_Directives_FancyHorizontalListDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			scope.itemClick = function(item) {
				scope.bind = item;
			};
			scope.currentClass = function(item1) {
				return (!!ss.referenceEquals(item1, scope.bind) ? 'fancy-horizontal-list-item fancy-horizontal-list-item-selected' : 'fancy-horizontal-list-item ');
			};
			scope.parentScope = scope['$parent']['$parent']['$parent'];
		}
	});
	ss.initClass($OurSonic_UI_Directives_FancyHorizontalListIndexDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			scope.itemClick = function(index) {
				scope.bindIndex = index;
			};
			scope.currentClass = function(index1) {
				return (!!ss.referenceEquals(index1, scope.bindIndex) ? 'fancy-horizontal-list-item fancy-horizontal-list-item-selected' : 'fancy-horizontal-list-item ');
			};
			scope.parentScope = scope['$parent']['$parent']['$parent'];
		}
	});
	ss.initClass($OurSonic_UI_Directives_FancyListDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			scope.itemClick = function(item) {
				scope.bind = item;
			};
			scope.currentClass = function(item1) {
				return (!!ss.referenceEquals(item1, scope.bind) ? 'fancy-list-item fancy-list-item-selected' : 'fancy-list-item ');
			};
			scope.parentScope = scope['$parent']['$parent']['$parent'];
		}
	});
	ss.initClass($OurSonic_UI_Directives_FancyListIndexDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			scope.itemClick = function(index) {
				scope.bindIndex = index;
			};
			scope.currentClass = function(index1) {
				return (!!ss.referenceEquals(index1, scope.bindIndex) ? 'fancy-list-item fancy-list-item-selected' : 'fancy-list-item ');
			};
			scope.parentScope = scope['$parent']['$parent']['$parent'];
		}
	});
	ss.initClass($OurSonic_UI_Directives_FloatingWindowDirective, $asm, {
		$linkFn: function(scope, element, attr) {
			this.$myElement = element;
			this.$myScope = scope;
			$OurSonic_UI_Directives_FloatingWindowDirective.$items.add(element, scope);
			element.click(ss.thisFix(ss.mkdel(this, function(elem, event) {
				this.$focus();
			})));
			scope.$parent.swingAway = ss.mkdel(this, function(a, b, c) {
				this.swingAway(a, b, element, c);
			});
			scope.$parent.swingBack = ss.mkdel(this, function(c1) {
				this.swingBack(scope, element, c1);
			});
			scope.$parent.minimize = function() {
				scope.$parent.minimized = true;
				scope.minimize();
			};
			scope.$parent.destroyWindow = function() {
				scope.$destroy();
				element.remove();
			};
			var $t1 = $OurSonic_UI_Scope_Directive_FloatingWindowPosition.$ctor();
			$t1.left = scope.left;
			$t1.top = scope.top;
			$t1.display = 'block';
			scope.positionStyles = $t1;
			scope.positionStyles.zIndex = 10000;
			if (scope.left.indexOf('%') !== -1) {
				scope.positionStyles.marginLeft = -ss.Int32.div(parseInt(ss.replaceAllString(scope.width, 'px', '')), 2) + 'px';
			}
			if (scope.top.indexOf('%') !== -1) {
				scope.positionStyles.marginTop = -ss.Int32.div(parseInt(ss.replaceAllString(scope.height, 'px', '')), 2) + 'px';
			}
			var $t2 = $OurSonic_UI_Scope_Directive_Size.$ctor();
			$t2.width = scope.width;
			$t2.height = scope.height;
			scope.sizeStyle = $t2;
			scope.maximize = function() {
				if (!scope.isMaximized) {
					scope.lastPositionStyles = scope.positionStyles;
					scope.lastSizeStyle = scope.sizeStyle;
					var $t3 = $OurSonic_UI_Scope_Directive_FloatingWindowPosition.$ctor();
					$t3.left = '0';
					$t3.top = '0';
					$t3.display = 'block';
					scope.positionStyles = $t3;
					var $t4 = $OurSonic_UI_Scope_Directive_Size.$ctor();
					$t4.width = '100%';
					$t4.height = '100%';
					scope.sizeStyle = $t4;
				}
				else {
					scope.positionStyles = scope.lastPositionStyles;
					scope.sizeStyle = scope.lastSizeStyle;
					scope.lastPositionStyles = null;
					scope.lastSizeStyle = null;
				}
				scope.isMaximized = !scope.isMaximized;
			};
			scope.close = function() {
				if (!ss.staticEquals(scope.onclose, null)) {
					scope.onclose();
				}
				if (!ss.staticEquals(scope.$parent.onClose, null)) {
					scope.$parent.onClose();
				}
				//todo destroy
				scope.positionStyles.display = 'none';
			};
			scope.minimize = function() {
				//                myUIManagerService.OnMinimize(scope);
				scope.$parent.swingAway(5, false, function() {
					scope.positionStyles.display = 'none';
				});
			};
			scope.restore = function() {
				scope.$parent.swingBack(null);
				scope.positionStyles.display = 'block';
			};
			this.$focus();
			if (!ss.staticEquals(scope.$parent.onReady, null)) {
				scope.$parent.onReady();
			}
		},
		$focus: function() {
			var $t1 = $OurSonic_UI_Directives_FloatingWindowDirective.$items.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var floatingWindowScope = $t1.current();
					floatingWindowScope.value.positionStyles.zIndex = 10000;
				}
			}
			finally {
				$t1.dispose();
			}
			if ($OurSonic_UI_Directives_FloatingWindowDirective.$items.containsKey(this.$myElement)) {
				$OurSonic_UI_Directives_FloatingWindowDirective.$items.get_item(this.$myElement).positionStyles.zIndex = 10001;
				if (ss.isNullOrUndefined(this.$myScope.$root.$$phase)) {
					this.$myScope.$apply();
				}
			}
		},
		swingBack: function(scope, element, callback) {
			window.setTimeout(function() {
				var js = {};
				js['left'] = scope.left;
				js['top'] = scope.top;
				element.css('display', 'block');
				element.animate(js, 'fast', 'swing', callback);
			}, 1);
		},
		swingAway: function(direction, simulate, element, callback) {
			var js = {};
			var distance = '3000';
			switch (direction) {
				case 0: {
					js['left'] = '-' + distance + 'px';
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 1: {
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 2: {
					js['left'] = distance + 'px';
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 3: {
					js['left'] = distance + 'px';
					break;
				}
				case 4: {
					js['left'] = distance + 'px';
					js['top'] = distance + 'px';
					break;
				}
				case 5: {
					js['top'] = distance + 'px';
					break;
				}
				case 6: {
					js['left'] = '-' + distance + 'px';
					js['top'] = distance + 'px';
					break;
				}
				case 7: {
					js['left'] = distance + 'px';
					break;
				}
			}
			if (simulate) {
				element.css(js);
				element.css('display', 'none');
				if (!ss.staticEquals(callback, null)) {
					callback();
				}
			}
			else {
				element.animate(js, 'slow', 'swing', function() {
					element.css('display', 'none');
					if (!ss.staticEquals(callback, null)) {
						callback();
					}
				});
			}
		}
	});
	ss.initClass($OurSonic_UI_Directives_ForNextDirective, $asm, {
		$linkFn: function(scope, element, attrs) {
			$OurSonic_UI_Directives_ForNextDirective.$forCounter++;
			var next = element.next();
			var id = next.attr('id');
			if (ss.isNullOrUndefined(id)) {
				id = 'forLink' + $OurSonic_UI_Directives_ForNextDirective.$forCounter;
				next.attr('id', id);
			}
			element.attr('for', id);
		}
	});
	ss.initClass($OurSonic_UI_Scope__KeepBaseScopeAlive, $asm, {});
	ss.initClass($OurSonic_UI_Services_ManagedScope, $asm, {}, OurSonic.UI.Scope.BaseScope);
	ss.initClass($OurSonic_UI_Scope_Directive_FloatingWindowBaseScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Controller_AssetFrameEditorScope, $asm, {}, $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope);
	ss.initClass($OurSonic_UI_Scope_Controller_AssetFrameEditorScopeCallback, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_AssetFrameEditorScopeModel, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_LevelModel, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_LevelSelectorScope, $asm, {}, $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope);
	ss.initClass($OurSonic_UI_Scope_Controller_LevelSelectorScopeCallback, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_LevelSelectorScopeModel, $asm, {});
	ss.initEnum($OurSonic_UI_Scope_Controller_ModifyScript, $asm, { none: 'none', tick: 'tick', init: 'init', collide: 'collide', hurt: 'hurt' }, true);
	ss.initClass($OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScope, $asm, {}, $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope);
	ss.initClass($OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeCallback, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_ObjectFrameworkEditorScopeModel, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_ObjectFrameworkListScope, $asm, {}, $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope);
	ss.initClass($OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeCallback, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_ObjectFrameworkListScopeModel, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_TileChunkDrawOptions, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_TileChunkInfoScopeModel, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_TileEditorScope, $asm, {}, $OurSonic_UI_Scope_Directive_FloatingWindowBaseScope);
	ss.initClass($OurSonic_UI_Scope_Controller_TileEditorScopeCallback, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Controller_TileEditorScopeModel, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasAssetFrameEditScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasAssetFramePaletteEditScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasAssetFrameScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasPieceLayoutEditScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasPieceLayoutScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasPieceScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasTileChunkScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_CanvasTilePieceScope, $asm, {}, $OurSonic_UI_Services_ManagedScope);
	ss.initClass($OurSonic_UI_Scope_Directive_FloatingWindowPosition, $asm, {});
	ss.initClass($OurSonic_UI_Scope_Directive_FloatingWindowScope, $asm, {}, OurSonic.UI.Scope.BaseScope);
	ss.initClass($OurSonic_UI_Scope_Directive_Size, $asm, {});
	ss.initEnum($OurSonic_UI_Scope_Directive_SwingDirection, $asm, { topLeft: 0, top: 1, topRight: 2, right: 3, bottomRight: 4, bottom: 5, bottomLeft: 6, left: 7 });
	ss.initClass($OurSonic_UI_Services_CreateUIService, $asm, {
		create$1: function(T) {
			return function(ui) {
				return this.create$3(T).call(this, ui, function(a, b) {
				});
			};
		},
		create$3: function(T) {
			return function(ui, populateScope) {
				var scope = this.$myRootScopeService.$new();
				var html = $(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, $OurSonic_Utility_Constants.contentAddress));
				populateScope(scope, html);
				var item = this.$myCompileService(html)(scope);
				item.appendTo(window.document.body);
				if (ss.isNullOrUndefined(scope.$$phase)) {
					scope.$apply();
				}
				scope = angular.element(item.children()[0]).scope() || scope;
				return new (ss.makeGenericType($OurSonic_UI_Services_CreatedUI$1, [T]))(scope, item);
			};
		},
		createSingleton: function(ui) {
			return this.createSingleton$1($OurSonic_UI_Services_ManagedScope).call(this, ui);
		},
		createSingleton$1: function(T) {
			return function(ui) {
				return this.createSingleton$2(T).call(this, ui, function(a, b) {
				});
			};
		},
		createSingleton$2: function(T) {
			return function(ui, populateScope) {
				var scope;
				if (ss.keyExists(this.$singltons, ui)) {
					var html = this.$singltons[ui];
					if (html.parent().length === 0) {
						delete this.$singltons[ui];
					}
				}
				if (ss.keyExists(this.$singltons, ui)) {
					var html1 = this.$singltons[ui];
					if (html1[0].nodeType === 8) {
						this.$singltons[ui] = html1 = html1.next();
					}
					scope = this.$myRootScopeService.$new();
					populateScope(scope, html1);
					var item = this.$myCompileService(html1)(scope);
					if (ss.isNullOrUndefined(scope.$$phase)) {
						scope.$apply();
					}
					scope = angular.element(item.children()[0]).scope() || scope;
					return new (ss.makeGenericType($OurSonic_UI_Services_CreatedUI$1, [T]))(scope, html1);
				}
				else {
					scope = this.$myRootScopeService.$new();
					var html2 = $(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, $OurSonic_Utility_Constants.contentAddress));
					populateScope(scope, html2);
					var item1 = this.$myCompileService(html2)(scope);
					item1.appendTo(window.document.body);
					if (ss.isNullOrUndefined(scope.$$phase)) {
						scope.$apply();
					}
					scope = angular.element(item1.children()[0]).scope() || scope;
					this.$singltons[ui] = item1;
					return new (ss.makeGenericType($OurSonic_UI_Services_CreatedUI$1, [T]))(scope, item1);
				}
			};
		},
		create: function(ui) {
			var scope = this.$myRootScopeService.$new();
			var item = this.$myCompileService($(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, $OurSonic_Utility_Constants.contentAddress)))(scope);
			item.appendTo(window.document.body);
			if (ss.isNullOrUndefined(scope.$$phase)) {
				scope.$apply();
			}
			scope = angular.element(item.children()[0]).scope() || scope;
			return new (ss.makeGenericType($OurSonic_UI_Services_CreatedUI$1, [$OurSonic_UI_Services_ManagedScope]))(scope, item);
		},
		create$2: function(ui, scope) {
			var item = this.$myCompileService($(ss.formatString('<div ng-include src="\'{1}partials/UIs/{0}.html\'"></div>', ui, $OurSonic_Utility_Constants.contentAddress)))(scope);
			item.appendTo(window.document.body);
			if (ss.isNullOrUndefined(scope.$$phase)) {
				scope.$apply();
			}
			scope = angular.element(item.children()[0]).scope() || scope;
			return new (ss.makeGenericType($OurSonic_UI_Services_CreatedUI$1, [$OurSonic_UI_Services_ManagedScope]))(scope, item);
		}
	});
	ss.initClass($OurSonic_UIManager_Button, $asm, {
		construct: function() {
			$OurSonic_UIManager_Element.prototype.construct.call(this);
			var canv = $OurSonic_Utility_CanvasInformation.create(1, 1, false).context;
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.$button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.$button2Grad.addColorStop(0, '#A5A5A5');
			this.$button2Grad.addColorStop(1, '#FFFFFF');
			this.$buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.$buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.$buttonBorderGrad.addColorStop(1, '#7a7a7a');
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			this.$clicking = true;
			if (this.toggle) {
				this.toggled = !this.toggled;
			}
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			if (this.$clicking) {
				if (!ss.staticEquals(this.click, null)) {
					this.click($OurSonic_Utility_Point.$ctor1(e.x, e.y));
				}
			}
			this.$clicking = false;
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
			canv.strokeStyle = this.$buttonBorderGrad;
			if (this.toggle) {
				canv.fillStyle = (this.toggled ? this.button1Grad : this.$button2Grad);
			}
			else {
				canv.fillStyle = (this.$clicking ? this.button1Grad : this.$button2Grad);
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
					this.$startDragging = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
					this.editing = true;
					j1.editing = true;
					return true;
				}
			}
			if (e.x > x && e.x < x + w && e.y > y && e.y < y + h) {
				this.$dragg = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
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
			this.$startDragging = null;
			this.$dragg = null;
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
				var jx = e.x - this.$dragg.x;
				var jy = e.y - this.$dragg.y;
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
					var dv = $OurSonic_Utility_Point.$ctor1(this.$startDragging.x - e.x, this.$startDragging.y - e.y);
					j.click(dv);
					this.$startDragging = $OurSonic_Utility_Point.$ctor1(e.x + dv.x, e.y + dv.y);
					return true;
				}
				var rect = $OurSonic_Utility_Rectangle.$ctor1(x + ss.Int32.div(w * j.x, 100) - ss.Int32.div(sz, 2), y + ss.Int32.div(h * j.y, 100) - ss.Int32.div(sz, 2), sz, sz);
				if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
					document.body.style.cursor = j.cursor;
					if (j.editing) {
						var dv1 = $OurSonic_Utility_Point.$ctor1(this.$startDragging.x - e.x, this.$startDragging.y - e.y);
						j.click(dv1);
						this.$startDragging = $OurSonic_Utility_Point.$ctor1(e.x + dv1.x, e.y + dv1.y);
					}
					return true;
				}
			}
			this.$startDragging = $OurSonic_Utility_Point.$ctor1(e.x, e.y);
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
			var canv = $OurSonic_Utility_CanvasInformation.create(1, 1, false).context;
			this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.button1Grad.addColorStop(0, '#FFFFFF');
			this.button1Grad.addColorStop(1, '#A5A5A5');
			this.$button2Grad = canv.createLinearGradient(0, 0, 0, 1);
			this.$button2Grad.addColorStop(0, '#A5A5A5');
			this.$button2Grad.addColorStop(1, '#FFFFFF');
			this.$buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
			this.$buttonBorderGrad.addColorStop(0, '#AFAFAF');
			this.$buttonBorderGrad.addColorStop(1, '#7a7a7a');
		},
		onClick: function(e) {
			if (!this.visible) {
				return false;
			}
			this.$clicking = true;
			if (this.toggle) {
				this.toggled = !this.toggled;
			}
			return $OurSonic_UIManager_Element.prototype.onClick.call(this, e);
		},
		onMouseUp: function(e) {
			if (!this.visible) {
				return false;
			}
			if (this.$clicking) {
				if (!ss.staticEquals(this.click, null)) {
					this.click($OurSonic_Utility_Point.$ctor1(e.x, e.y));
				}
			}
			this.$clicking = false;
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
			canv.strokeStyle = this.$buttonBorderGrad;
			if (this.toggle) {
				canv.fillStyle = (this.toggled ? this.button1Grad : this.$button2Grad);
			}
			else {
				canv.fillStyle = (this.$clicking ? this.button1Grad : this.$button2Grad);
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
			var canv = $OurSonic_Utility_CanvasInformation.create(1, 1, false).context;
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
			return false;
			// now unsupported
			// if (e.AltKey) return false;
			// if (Focused) {
			// if (e.CtrlKey) {
			// if (e.KeyCode == 65) {
			// DragPosition = 0;
			// CursorPosition = Text.Length;
			// } else if (e.KeyCode == 67) {
			// // _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
			// } else if (e.KeyCode == 88) {
			// //  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
			// 
			// Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) +
			// Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
			// 
			// CursorPosition = Math.Min(CursorPosition, DragPosition);
			// DragPosition = -1;
			// }
			// } else if (e.KeyCode == 37) {
			// if (e.ShiftKey) {
			// if (DragPosition == -1)
			// DragPosition = CursorPosition;
			// CursorPosition = Math.Max(CursorPosition - 1, 0);
			// } else {
			// DragPosition = -1;
			// CursorPosition = Math.Max(CursorPosition - 1, 0);
			// }
			// } else if (e.KeyCode == 39) {
			// if (e.ShiftKey) {
			// if (DragPosition == -1)
			// DragPosition = CursorPosition;
			// CursorPosition = Math.Min(CursorPosition + 1, Text.Length);
			// } else {
			// DragPosition = -1;
			// CursorPosition = Math.Min(CursorPosition + 1, Text.Length);
			// }
			// } else {
			// if (e.KeyCode == 8) {
			// if (DragPosition == -1)
			// Text = Text.Substring(0, CursorPosition - 1) + Text.Substring(CursorPosition, Text.Length);
			// else {
			// Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) +
			// Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
			// }
			// if (DragPosition == -1) {
			// if (CursorPosition > 0)
			// CursorPosition--;
			// } else
			// CursorPosition = Math.Min(CursorPosition, DragPosition);
			// } else if (e.KeyCode == 46) {
			// if (DragPosition == -1)
			// Text = Text.Substring(0, CursorPosition) + Text.Substring(Math.Min(CursorPosition + 1, Text.Length), Text.Length);
			// else {
			// Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) +
			// Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
			// }
			// if (DragPosition == -1) {} else
			// CursorPosition = Math.Min(CursorPosition, DragPosition);
			// } else {
			// var m = (char) e.KeyCode;
			// var t = String.FromCharCode(m);
			// if (DragPosition == -1)
			// Text = Text.Substring(0, CursorPosition) + t + Text.Substring(CursorPosition, Text.Length);
			// else {
			// Text = Text.Substring(0, Math.Min(CursorPosition, DragPosition)) + t +
			// Text.Substring(Math.Max(CursorPosition, DragPosition), Text.Length);
			// }
			// if (DragPosition == -1)
			// CursorPosition++;
			// else
			// CursorPosition = Math.Max(CursorPosition, DragPosition);
			// }
			// DragPosition = -1;
			// }
			// 
			// if (TextChanged != null)
			// TextChanged();
			// 
			// e.PreventDefault();
			// return true;
			// }
			// return false;
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
				var cg = $OurSonic_Utility_CanvasInformation.create(this.width + 20, this.height + 20, false);
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
			var cl = OurSonicModels.Common.EnumerableExtensions.orderBy($OurSonic_UIManager_UIArea).call(null, this.uiAreas, function(f) {
				return -f.get_depth();
			});
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
			var cl = OurSonicModels.Common.EnumerableExtensions.orderBy($OurSonic_UIManager_UIArea).call(null, this.uiAreas, function(f) {
				return -f.get_depth();
			});
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
			this.$canvasDepths = OurSonicModels.Common.EnumerableExtensions.orderBy($OurSonic_UIManager_UIArea).call(null, this.uiAreas, function(f) {
				return f.get_depth();
			});
		},
		draw: function(canvas) {
			this.dragger.tick();
			canvas.save();
			for (var $t1 = 0; $t1 < this.$canvasDepths.length; $t1++) {
				var are = this.$canvasDepths[$t1];
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
	ss.initClass($OurSonic_Utility_FloatPoint, $asm, {});
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
	$OurSonic_Utility_Constants.contentAddress = '';
	$OurSonic_Level_Tiles_TileChunk.tilePiecesSquareSize = 16;
	$OurSonic_Level_Tiles_TileChunk.tileSquareSize = 8;
	$OurSonic_Level_Tiles_TileChunk.size = 128;
	$OurSonic_Level_Tiles_TileChunk.tilePieceSideLength = 8;
	$OurSonic_Level_Tiles_TileChunk.tileSideLength = 16;
	$OurSonic_Level_Tiles_TilePiece.$drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
	$OurSonic_Level_Tiles_TilePiece.$drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
	$OurSonic_Level_Objects_ObjectManager.broken = $OurSonic_Utility_Help.loadSprite('assets/Sprites/broken.png', function(e) {
	});
	$OurSonic_Level_HeightMap.colors = ['', 'rgba(255,98,235,0.6)', 'rgba(24,218,235,0.6)', 'rgba(24,98,235,0.6)'];
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
	$OurSonic_UI_Controllers_$TileEditorController.$name = 'TileEditorController';
	$OurSonic_UI_Controllers_$TileEditorController.$view = 'TileEditor';
	$OurSonic_UI_Controllers_$LevelSelectorController.$name = 'LevelSelectorController';
	$OurSonic_UI_Controllers_$LevelSelectorController.$view = 'LevelSelector';
	$OurSonic_UI_Services_CreateUIService.name$1 = 'CreateUIService';
	$OurSonic_UI_Controllers_$AssetFrameEditorController.$name = 'AssetFrameEditorController';
	$OurSonic_UI_Controllers_$AssetFrameEditorController.$view = 'AssetFrameEditor';
	$OurSonic_UI_Controllers_$ObjectFrameworkEditorController.$name = 'ObjectFrameworkEditorController';
	$OurSonic_UI_Controllers_$ObjectFrameworkEditorController.$view = 'ObjectFrameworkEditor';
	$OurSonic_UI_Controllers_$ObjectFrameworkListController.$name = 'ObjectFrameworkListController';
	$OurSonic_UI_Controllers_$ObjectFrameworkListController.$view = 'ObjectFrameworkList';
	$OurSonic_UI_Directives_FancyListDirective.name$1 = 'fancyList';
	$OurSonic_UI_Directives_FancyListIndexDirective.name$1 = 'fancyListIndex';
	$OurSonic_UI_Directives_FancyHorizontalListDirective.name$1 = 'fancyHorizontalList';
	$OurSonic_UI_Directives_FancyHorizontalListIndexDirective.name$1 = 'fancyHorizontalListIndex';
	$OurSonic_UI_Directives_CanvasTilePieceDirective.name$1 = 'canvasTilePiece';
	$OurSonic_UI_Directives_CanvasTileChunkDirective.name$1 = 'canvasTileChunk';
	var $t1 = $OurSonic_UI_Scope_Controller_TileChunkDrawOptions.$ctor();
	$t1.showHighLayer = true;
	$t1.showLowLayer = true;
	$OurSonic_UI_Directives_CanvasTileChunkDirective.defaultDrawOptions = $t1;
	$OurSonic_UI_Directives_CanvasPieceLayoutEditDirective.name$1 = 'canvasPieceLayoutEdit';
	$OurSonic_UI_Directives_CanvasPieceLayoutDirective.name$1 = 'canvasPieceLayout';
	$OurSonic_UI_Directives_CanvasAssetFrameDirective.name$1 = 'canvasAssetFrame';
	$OurSonic_UI_Directives_CanvasAssetFrameEditDirective.name$1 = 'canvasAssetFrameEdit';
	$OurSonic_UI_Directives_CanvasAssetFramePaletteEditDirective.name$1 = 'canvasAssetFramePaletteEdit';
	$OurSonic_UI_Directives_CanvasPieceAssetDirective.name$1 = 'canvasPieceAsset';
	$OurSonic_UI_Directives_DraggableDirective.name$1 = 'draggable';
	$OurSonic_UI_Directives_FloatingWindowDirective.name$1 = 'floatingWindow';
	$OurSonic_UI_Directives_FloatingWindowDirective.$items = new (ss.makeGenericType(ss.Dictionary$2, [Object, $OurSonic_UI_Scope_Directive_FloatingWindowScope]))();
	$OurSonic_UI_Directives_ForNextDirective.name$1 = 'forNext';
	$OurSonic_UI_Directives_ForNextDirective.$forCounter = 0;
	$OurSonic_Filters_RoundFilter.name$1 = 'round';
	$OurSonic_Filters_SwitchFilter.name$1 = 'switch';
	$OurSonic_BuildAngular.$scopeName = '$scope';
	$OurSonic_BuildAngular.$rootScopeName = '$rootScope';
	$OurSonic_BuildAngular.$compileName = '$compile';
	$OurSonic_BuildAngular.$http = '$http';
	$OurSonic_BuildAngular.$templateCache = '$templateCache';
	$OurSonic_Page.main();
})();
