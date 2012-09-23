namespace OurSonic.Level
{
    public class ObjectManager
    {
//        STATIC var broken = _H.loadSprite("assets/Sprites/broken.png");
        public ObjectManager(SonicManager sonicManager)
        {
            /*

    this.sonicManager = sonicManager;
    window.objectManager = this;
    this.metaObjectFrameworks = [];
    this.objectFrameworks = [];
*/
        }

        public void Init() {}

        public void ExtendObject(dynamic d)
        {
            /*d.oldKey = name;
        for (var asset in d.assets) {
            d.assets[asset] = _H.extend(new LevelObjectAsset(""), d.assets[asset]);
            for (var frame in d.assets[asset].frames) {
                d.assets[asset].frames[frame] = _H.extend(new LevelObjectAssetFrame(0), d.assets[asset].frames[frame]);
            }
        }
        for (var piece in d.pieces) {
            d.pieces[piece] = _H.extend(new LevelObjectPiece(""), d.pieces[piece]);
        }
        for (var pieceLayout in d.pieceLayouts) {
            d.pieceLayouts[pieceLayout] = _H.extend(new LevelObjectPieceLayout(""), d.pieceLayouts[pieceLayout]);
            for (var piece in d.pieceLayouts[pieceLayout].pieces) {
                d.pieceLayouts[pieceLayout].pieces[piece] = _H.extend(new LevelObjectPieceLayoutPiece(0), d.pieceLayouts[pieceLayout].pieces[piece]);
            }
        }
        for (var projectile in d.projectiles) {
            d.projectiles[projectile] = _H.extend(new LevelObjectProjectile(""), d.projectiles[projectile]);
        }
        return d;*/
        }
    }
}