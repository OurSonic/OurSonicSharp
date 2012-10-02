Type.registerNamespace('OurSonicModels');
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.AnimatedPaletteItem
OurSonicModels.AnimatedPaletteItem = function() {
};
OurSonicModels.AnimatedPaletteItem.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.AnimatedPalettePiece
OurSonicModels.AnimatedPalettePiece = function() {
};
OurSonicModels.AnimatedPalettePiece.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SaveObjectModel
OurSonicModels.SaveObjectModel = function() {
};
OurSonicModels.SaveObjectModel.createInstance = function() {
	return OurSonicModels.SaveObjectModel.$ctor();
};
OurSonicModels.SaveObjectModel.$ctor = function() {
	var $this = {};
	$this.key = null;
	$this.oldKey = null;
	$this.data = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLData
OurSonicModels.SLData = function() {
};
OurSonicModels.SLData.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataAnimation
OurSonicModels.SLDataAnimation = function() {
};
OurSonicModels.SLDataAnimation.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataAnimationFrame
OurSonicModels.SLDataAnimationFrame = function() {
};
OurSonicModels.SLDataAnimationFrame.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataChunkBlock
OurSonicModels.SLDataChunkBlock = function() {
};
OurSonicModels.SLDataChunkBlock.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataCNZBumperEntry
OurSonicModels.SLDataCNZBumperEntry = function() {
};
OurSonicModels.SLDataCNZBumperEntry.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataObjectEntry
OurSonicModels.SLDataObjectEntry = function() {
};
OurSonicModels.SLDataObjectEntry.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataPatternIndex
OurSonicModels.SLDataPatternIndex = function() {
};
OurSonicModels.SLDataPatternIndex.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataRingEntry
OurSonicModels.SLDataRingEntry = function() {
};
OurSonicModels.SLDataRingEntry.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataStartPositionEntry
OurSonicModels.SLDataStartPositionEntry = function() {
};
OurSonicModels.SLDataStartPositionEntry.createInstance = function() {
	return {};
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.Solidity
OurSonicModels.Solidity = function() {
};
OurSonicModels.Solidity.prototype = { NotSolid: 0, TopSolid: 1, LRBSolid: 2, AllSolid: 3 };
OurSonicModels.Solidity.registerEnum('OurSonicModels.Solidity', false);
Type.registerNamespace('OurSonicModels.Common');
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.Common.DataObject
OurSonicModels.Common.DataObject$1 = function(T) {
	var $type = function(data) {
		this.Data = T.getDefaultValue();
		this.Data = data;
	};
	$type.registerGenericClassInstance($type, OurSonicModels.Common.DataObject$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
OurSonicModels.Common.DataObject$1.registerGenericClass('OurSonicModels.Common.DataObject$1', 1);
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.Common.DelegateOrValue
OurSonicModels.Common.DelegateOrValue$1 = function(T) {
	var $type = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
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
			return T.getDefaultValue();
		}
	};
	$type.$ctor1 = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$value = d;
		this.isValue = true;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.op_Implicit$2 = function(d) {
		return new (Type.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [T]).$ctor1)(d);
	};
	$type.op_Implicit$1 = function(d) {
		return new (Type.makeGenericType(OurSonicModels.Common.DelegateOrValue$1, [T]))(d);
	};
	$type.op_Implicit = function(d) {
		return d.$evaluate();
	};
	$type.registerGenericClassInstance($type, OurSonicModels.Common.DelegateOrValue$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
OurSonicModels.Common.DelegateOrValue$1.registerGenericClass('OurSonicModels.Common.DelegateOrValue$1', 1);
OurSonicModels.AnimatedPaletteItem.registerClass('OurSonicModels.AnimatedPaletteItem', Object);
OurSonicModels.AnimatedPalettePiece.registerClass('OurSonicModels.AnimatedPalettePiece', Object);
OurSonicModels.SaveObjectModel.registerClass('OurSonicModels.SaveObjectModel', Object);
OurSonicModels.SLData.registerClass('OurSonicModels.SLData', Object);
OurSonicModels.SLDataAnimation.registerClass('OurSonicModels.SLDataAnimation', Object);
OurSonicModels.SLDataAnimationFrame.registerClass('OurSonicModels.SLDataAnimationFrame', Object);
OurSonicModels.SLDataChunkBlock.registerClass('OurSonicModels.SLDataChunkBlock', Object);
OurSonicModels.SLDataCNZBumperEntry.registerClass('OurSonicModels.SLDataCNZBumperEntry', Object);
OurSonicModels.SLDataObjectEntry.registerClass('OurSonicModels.SLDataObjectEntry', Object);
OurSonicModels.SLDataPatternIndex.registerClass('OurSonicModels.SLDataPatternIndex', Object);
OurSonicModels.SLDataRingEntry.registerClass('OurSonicModels.SLDataRingEntry', Object);
OurSonicModels.SLDataStartPositionEntry.registerClass('OurSonicModels.SLDataStartPositionEntry', Object);
