using System.Html;
namespace OurSonic.Level
{
    public class ObjectManager
    {
        public static ImageElement broken = Help.LoadSprite("assets/Sprites/broken.png", (e) => { });
        private SonicManager sonicManager;

        public ObjectManager(SonicManager sonicManager)
        {
            this.sonicManager = sonicManager;
            Window.Instance.Me().objectManager = this;
        }

        public void Init() {}

        public LevelObject ExtendObject(LevelObjectData d)
        {
            LevelObject obj = new LevelObject(d.Key) {
                                                             CollideScript = d.CollideScript,
                                                             HurtScript = d.HurtScript,
                                                             InitScript = d.InitScript,
                                                             TickScript = d.TickScript
                                                     };
            //d.oldKey = name;
            for (int i = 0; i < d.Assets.Count; i++) {
                var asset = d.Assets[i];
                var levelObjectAsset = new LevelObjectAsset("") {
                                                                        Name = asset.Name,
                                                                };

                for (int index = 0; index < asset.Frames.Count; index++) {
                    var fr = asset.Frames[index];
                    levelObjectAsset.Frames[index] = new LevelObjectAssetFrame("") {
                                                                                           OffsetX = fr.OffsetX,
                                                                                           Width = fr.Width,
                                                                                           Height = fr.Height,
                                                                                           OffsetY = fr.OffsetY,
                                                                                           HurtSonicMap = fr.HurtSonicMap,
                                                                                           CollisionMap = fr.CollisionMap,
                                                                                           ColorMap = fr.ColorMap,
                                                                                           Palette = fr.Palette,
                                                                                   };
                }
                obj.Assets[i] = levelObjectAsset;
            }
            for (int index = 0; index < d.Pieces.Count; index++) {
                var piece = d.Pieces[index];
                obj.Pieces[index] = piece;
            }
            for (int index = 0; index < d.PieceLayouts.Count; index++) {
                var pl = d.PieceLayouts[index];
                obj.PieceLayouts[index] = new LevelObjectPieceLayout(pl.Name) {
                                                                                      Height = pl.Height,
                                                                                      Width = pl.Width
                                                                              };

                for (int i = 0; i < d.PieceLayouts[index].Pieces.Count; i++) {
                    obj.PieceLayouts[index].Pieces[i] = d.PieceLayouts[index].Pieces[i];
                }
            }
            for (int index = 0; index < d.Projectiles.Count; index++) {
                var proj = d.Projectiles[index];
                proj = new LevelObjectProjectile(proj.Name) {
                                                                    X = proj.X,
                                                                    Y = proj.Y,
                                                                    Xsp = proj.Xsp,
                                                                    Ysp = proj.Ysp,
                                                                    Xflip = proj.Xflip,
                                                                    Yflip = proj.Yflip,
                                                                    AssetIndex = proj.AssetIndex,
                                                                    FrameIndex = proj.FrameIndex,
                                                            };
                obj.Projectiles[index] = proj;
            }
            return obj;
        }
    }
}