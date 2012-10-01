Type.registerNamespace('OurSonicModels');
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.AnimatedPaletteItem
OurSonicModels.AnimatedPaletteItem = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.AnimatedPalettePiece
OurSonicModels.AnimatedPalettePiece = function() {
};
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
Type.registerNamespace('OurSonicModels');
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLData
OurSonicModels.SLData = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataAnimation
OurSonicModels.SLDataAnimation = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataAnimationFrame
OurSonicModels.SLDataAnimationFrame = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataChunkBlock
OurSonicModels.SLDataChunkBlock = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataCNZBumperEntry
OurSonicModels.SLDataCNZBumperEntry = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataObjectEntry
OurSonicModels.SLDataObjectEntry = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataPatternIndex
OurSonicModels.SLDataPatternIndex = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataRingEntry
OurSonicModels.SLDataRingEntry = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.SLDataStartPositionEntry
OurSonicModels.SLDataStartPositionEntry = function() {
};
////////////////////////////////////////////////////////////////////////////////
// OurSonicModels.Solidity
OurSonicModels.Solidity = function() {
};
OurSonicModels.Solidity.prototype = { NotSolid: 0, TopSolid: 1, LRBSolid: 2, AllSolid: 3 };
OurSonicModels.Solidity.registerEnum('OurSonicModels.Solidity', false);
OurSonicModels.AnimatedPaletteItem.registerClass('OurSonicModels.AnimatedPaletteItem', Object);
OurSonicModels.AnimatedPalettePiece.registerClass('OurSonicModels.AnimatedPalettePiece', Object);
OurSonicModels.SLData.registerClass('OurSonicModels.SLData', Object);
OurSonicModels.SLDataAnimation.registerClass('OurSonicModels.SLDataAnimation', Object);
OurSonicModels.SLDataAnimationFrame.registerClass('OurSonicModels.SLDataAnimationFrame', Object);
OurSonicModels.SLDataChunkBlock.registerClass('OurSonicModels.SLDataChunkBlock', Object);
OurSonicModels.SLDataCNZBumperEntry.registerClass('OurSonicModels.SLDataCNZBumperEntry', Object);
OurSonicModels.SLDataObjectEntry.registerClass('OurSonicModels.SLDataObjectEntry', Object);
OurSonicModels.SLDataPatternIndex.registerClass('OurSonicModels.SLDataPatternIndex', Object);
OurSonicModels.SLDataRingEntry.registerClass('OurSonicModels.SLDataRingEntry', Object);
OurSonicModels.SLDataStartPositionEntry.registerClass('OurSonicModels.SLDataStartPositionEntry', Object);
