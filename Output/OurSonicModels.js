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
