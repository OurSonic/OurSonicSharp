using System.Collections.Generic;
using System.Html;
using OurSonic.Utility;
namespace OurSonic.Level.Objects
{
    public class ObjectManager
    {
        public static ImageElement broken = Help.LoadSprite("assets/Sprites/broken.png", (e) => { });
        private SonicManager sonicManager;

        public ObjectManager(SonicManager sonicManager)
        {
            this.sonicManager = sonicManager;
        }

        public void Init() { }

        public static LevelObject ExtendObject(LevelObjectData d)
        {
            LevelObject obj = new LevelObject(d.Key)
            {
                CollideScript = d.CollideScript,
                HurtScript = d.HurtScript,
                InitScript = d.InitScript,
                TickScript = d.TickScript
            };
            obj.Description = d.Description;
            //d.oldKey = name;
            obj.Assets = new List<LevelObjectAsset>();

            for (int i = 0; i < d.Assets.Count; i++)
            {
                var asset = d.Assets[i];
                var levelObjectAsset = new LevelObjectAsset(asset.Name)
                {
                    Name = asset.Name,
                };
                levelObjectAsset.Frames = new List<LevelObjectAssetFrame>();
                for (int index = 0; index < asset.Frames.Count; index++)
                {
                    var fr = asset.Frames[index];

                    levelObjectAsset.Frames[index] = new LevelObjectAssetFrame(fr.Name)
                    {
                        OffsetX = fr.OffsetX,
                        Width = fr.Width,
                        TransparentColor = fr.TransparentColor,
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
            obj.Pieces = new List<LevelObjectPiece>();

            for (int index = 0; index < d.Pieces.Count; index++)
            {
                var piece = d.Pieces[index];
                obj.Pieces[index] = piece;
            }
            obj.PieceLayouts = new List<LevelObjectPieceLayout>();
            for (int index = 0; index < d.PieceLayouts.Count; index++)
            {
                var pl = d.PieceLayouts[index];
                obj.PieceLayouts[index] = new LevelObjectPieceLayout(pl.Name)
                {
                    Height = pl.Height,
                    Width = pl.Width
                };

                obj.PieceLayouts[index].Pieces = new List<LevelObjectPieceLayoutPiece>();
                for (int i = 0; i < d.PieceLayouts[index].Pieces.Count; i++)
                {
                    obj.PieceLayouts[index].Pieces[i] = d.PieceLayouts[index].Pieces[i];
                }
            }
            obj.Projectiles = new List<LevelObjectProjectile>();
            for (int index = 0; index < d.Projectiles.Count; index++)
            {
                var proj = d.Projectiles[index];
                proj = new LevelObjectProjectile(proj.Name)
                {
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