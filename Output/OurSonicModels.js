﻿(function() {
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.AnimatedPaletteItem
	var $OurSonicModels_AnimatedPaletteItem = function() {
	};
	$OurSonicModels_AnimatedPaletteItem.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.AnimatedPalettePiece
	var $OurSonicModels_AnimatedPalettePiece = function() {
	};
	$OurSonicModels_AnimatedPalettePiece.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SaveObjectModel
	var $OurSonicModels_SaveObjectModel = function() {
	};
	$OurSonicModels_SaveObjectModel.createInstance = function() {
		return $OurSonicModels_SaveObjectModel.$ctor();
	};
	$OurSonicModels_SaveObjectModel.$ctor = function() {
		var $this = {};
		$this.key = null;
		$this.oldKey = null;
		$this.data = null;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLData
	var $OurSonicModels_SLData = function() {
	};
	$OurSonicModels_SLData.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataAnimation
	var $OurSonicModels_SLDataAnimation = function() {
	};
	$OurSonicModels_SLDataAnimation.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataAnimationFrame
	var $OurSonicModels_SLDataAnimationFrame = function() {
	};
	$OurSonicModels_SLDataAnimationFrame.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataChunkBlock
	var $OurSonicModels_SLDataChunkBlock = function() {
	};
	$OurSonicModels_SLDataChunkBlock.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataCNZBumperEntry
	var $OurSonicModels_SLDataCNZBumperEntry = function() {
	};
	$OurSonicModels_SLDataCNZBumperEntry.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataObjectEntry
	var $OurSonicModels_SLDataObjectEntry = function() {
	};
	$OurSonicModels_SLDataObjectEntry.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataPatternIndex
	var $OurSonicModels_SLDataPatternIndex = function() {
	};
	$OurSonicModels_SLDataPatternIndex.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataRingEntry
	var $OurSonicModels_SLDataRingEntry = function() {
	};
	$OurSonicModels_SLDataRingEntry.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.SLDataStartPositionEntry
	var $OurSonicModels_SLDataStartPositionEntry = function() {
	};
	$OurSonicModels_SLDataStartPositionEntry.createInstance = function() {
		return {};
	};
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.Solidity
	var $OurSonicModels_Solidity = function() {
	};
	$OurSonicModels_Solidity.prototype = { NotSolid: 0, TopSolid: 1, LRBSolid: 2, AllSolid: 3 };
	ss.registerEnum(global, 'OurSonicModels.Solidity', $OurSonicModels_Solidity, false);
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.Common.DataObject
	var $OurSonicModels_Common_DataObject$1 = function(T) {
		var $type = function(data) {
			this.Data = ss.getDefaultValue(T);
			this.Data = data;
		};
		ss.registerGenericClassInstance($type, $OurSonicModels_Common_DataObject$1, [T], function() {
			return Object;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'OurSonicModels.Common.DataObject$1', $OurSonicModels_Common_DataObject$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// OurSonicModels.Common.DelegateOrValue
	var $OurSonicModels_Common_DelegateOrValue$1 = function(T) {
		var $type = function(d) {
			this.isValue = false;
			this.$method = null;
			this.$value = ss.getDefaultValue(T);
			this.$method = d;
			this.isValue = false;
		};
		$type.prototype = {
			$evaluate: function() {
				if (this.isValue === true) {
					return this.$value;
				}
				else if (this.isValue === false) {
					return this.$method();
				}
				return ss.getDefaultValue(T);
			}
		};
		$type.$ctor1 = function(d) {
			this.isValue = false;
			this.$method = null;
			this.$value = ss.getDefaultValue(T);
			this.$value = d;
			this.isValue = true;
		};
		$type.$ctor1.prototype = $type.prototype;
		$type.op_Implicit$2 = function(d) {
			return new (ss.makeGenericType($OurSonicModels_Common_DelegateOrValue$1, [T]).$ctor1)(d);
		};
		$type.op_Implicit$1 = function(d) {
			return new (ss.makeGenericType($OurSonicModels_Common_DelegateOrValue$1, [T]))(d);
		};
		$type.op_Implicit = function(d) {
			return d.$evaluate();
		};
		ss.registerGenericClassInstance($type, $OurSonicModels_Common_DelegateOrValue$1, [T], function() {
			return Object;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'OurSonicModels.Common.DelegateOrValue$1', $OurSonicModels_Common_DelegateOrValue$1, 1);
	ss.registerClass(global, 'OurSonicModels.AnimatedPaletteItem', $OurSonicModels_AnimatedPaletteItem);
	ss.registerClass(global, 'OurSonicModels.AnimatedPalettePiece', $OurSonicModels_AnimatedPalettePiece);
	ss.registerClass(global, 'OurSonicModels.SaveObjectModel', $OurSonicModels_SaveObjectModel);
	ss.registerClass(global, 'OurSonicModels.SLData', $OurSonicModels_SLData);
	ss.registerClass(global, 'OurSonicModels.SLDataAnimation', $OurSonicModels_SLDataAnimation);
	ss.registerClass(global, 'OurSonicModels.SLDataAnimationFrame', $OurSonicModels_SLDataAnimationFrame);
	ss.registerClass(global, 'OurSonicModels.SLDataChunkBlock', $OurSonicModels_SLDataChunkBlock);
	ss.registerClass(global, 'OurSonicModels.SLDataCNZBumperEntry', $OurSonicModels_SLDataCNZBumperEntry);
	ss.registerClass(global, 'OurSonicModels.SLDataObjectEntry', $OurSonicModels_SLDataObjectEntry);
	ss.registerClass(global, 'OurSonicModels.SLDataPatternIndex', $OurSonicModels_SLDataPatternIndex);
	ss.registerClass(global, 'OurSonicModels.SLDataRingEntry', $OurSonicModels_SLDataRingEntry);
	ss.registerClass(global, 'OurSonicModels.SLDataStartPositionEntry', $OurSonicModels_SLDataStartPositionEntry);
})();
