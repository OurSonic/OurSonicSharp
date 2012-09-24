using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonicModels;
namespace OurSonic.Level
{
    public class LevelObjectInfo
    {
        private Rectangle _rect = new Rectangle(0, 0, 0, 0);
        public int lastDrawTick;
        [IntrinsicProperty]
        public SLDataObjectEntry O { get; set; }
        [IntrinsicProperty]
        public double X { get; set; }
        [IntrinsicProperty]
        public double Y { get; set; }
        [IntrinsicProperty]
        public double Xsp { get; set; }
        [IntrinsicProperty]
        public double Ysp { get; set; }
        [IntrinsicProperty]
        public bool Xflip { get; set; }
        [IntrinsicProperty]
        public bool Yflip { get; set; }
        [IntrinsicProperty]
        public int Subdata { get; set; }
        [IntrinsicProperty]
        public string Key { get; set; }
        [IntrinsicProperty]
        public LevelObject ObjectData { get; set; }
        [IntrinsicProperty]
        public int UpperNibble { get; set; }
        [IntrinsicProperty]
        public int LowerNibble { get; set; }
        [IntrinsicProperty]
        public int PieceIndex { get; set; }
        [IntrinsicProperty]
        public List<LevelObjectPiece> Pieces { get; set; }
        [IntrinsicProperty]
        public bool Dead { get; set; }
        [IntrinsicProperty]
        public LevelObjectInfo State { get; set; }
        [IntrinsicProperty]
        public int Index { get; set; }
        [IntrinsicProperty]
        public List<string> Debug { get; set; }
        [IntrinsicProperty]
        public Action<List<string>> ConsoleLog { get; set; }

        public LevelObjectInfo(SLDataObjectEntry o)
        {
            O = o;
            X = o.X;
            Y = o.Y;
            Xflip = o.XFlip;
            Yflip = o.YFlip;
            Subdata = o.SubType;
            Key = o.ID.ToString();
            UpperNibble = Subdata >> 4;
            LowerNibble = Subdata & 0xf;
        }

        public void Log(string txt, int level = 100)
        {
            if (Debug.Falsey())
                Debug = new List<string>();

            if (level == 0)
                Debug.Add(" -- " + txt + " -- ");
            else
                Debug.Add(txt);
            if (ConsoleLog.Truthy())
                ConsoleLog(Debug);
        }

        public void SetPieceLayoutIndex(int ind)
        {
            PieceIndex = ind;

            var pcs = ObjectData.PieceLayouts[PieceIndex].Pieces;

            Pieces = new List<LevelObjectPiece>();

            for (int i = 0; i < pcs.Count; i++) {
                Pieces.Add(pcs[i].Me<LevelObjectPiece>());
            }
        }

        public void SetObjectData(LevelObject obj)
        {
            ObjectData = obj;

            if (ObjectData.PieceLayouts.Count > PieceIndex &&
                ObjectData.PieceLayouts[PieceIndex].Pieces.Count > 0)
                SetPieceLayoutIndex(PieceIndex);
        }

        public bool Tick(LevelObjectInfo @object, SonicLevel level, Sonic sonic)
        {
            if (Dead || ObjectData.Falsey()) return false;

            try {
                return ObjectData.Tick(@object, level, sonic);
            } catch (Exception EJ) {
                //this.Log(EJ.name + " " + EJ.message, 0);

                return false;
            }
        }

        public LevelObjectPieceLayout MainPieceLayout()
        {
            return ObjectData.PieceLayouts[PieceIndex];
        }

        public Rectangle GetRect(Point scale)
        {
            if (ObjectData.PieceLayouts.Count == 0) {
                _rect.X = (int) X;
                _rect.Y = (int) Y;
                _rect.Width = ObjectManager.broken.Width;
                _rect.Height = ObjectManager.broken.Height;
                return _rect;
            }

            var pcs = Pieces;

            _rect.Y = 0;
            _rect.Y = 0;
            _rect.Width = 0;
            _rect.Height = 0;

            for (var pieceIndex = 0; pieceIndex < pcs.Count; pieceIndex++) {
                var j = pcs[pieceIndex];
                var piece = ObjectData.Pieces[j.PieceIndex];
                var asset = ObjectData.Assets[piece.AssetIndex];
                if (asset.Frames.Count > 0) {
                    var frm = asset.Frames[j.FrameIndex];
                    Help.MergeRect(_rect, new Rectangle(frm.OffsetX + j.Y, frm.OffsetY + j.Y, frm.Width * scale.Y, frm.Height * scale.Y));
                }
            }
            _rect.X = _rect.X * scale.X;
            _rect.Y = _rect.Y * scale.Y;
            _rect.Width -= _rect.X;
            _rect.Height -= _rect.Y;

            _rect.X += (int) X;
            _rect.Y += (int) Y;
            return _rect;
        }

        public void Draw(CanvasContext2D canvas, int x, int y, Point scale, bool showHeightMap)
        {
            if (Dead || ObjectData.Falsey()) return;

            if (ObjectData.PieceLayouts.Count == 0) {
                canvas.DrawImage(ObjectManager.broken, ( x - ObjectManager.broken.Width / 2 ), ( y - ObjectManager.broken.Height / 2 ),
                                 ObjectManager.broken.Width * scale.X, ObjectManager.broken.Height * scale.Y);
                return;
            }

            MainPieceLayout().Draw(canvas, x, y, scale, ObjectData, this, showHeightMap);
            if (false /* || this.consoleLog*/) {
                var gr = GetRect(scale);
                canvas.Save();
                canvas.FillStyle = "rgba(228,228,12,0.4)";
                var wd = 1;
                canvas.FillRect(gr.X - X + x - ( gr.Width / 2 ) - wd, gr.Y - Y + y - ( gr.Height / 2 ) - wd, gr.Width - ( gr.X - X ) + wd * 2,
                                gr.Height - ( gr.Y - Y ) + wd * 2);
                canvas.Restore();
            }
        }

        public void Reset()
        {
            X = O.X;
            Y = O.Y;
            Xsp = 0;
            Ysp = 0;
            State = null;
            Xflip = O.XFlip;
            Yflip = O.YFlip;
            Dead = false;
            PieceIndex = 0; //maybe
            Subdata = O.SubType;
            UpperNibble = Subdata >> 4;
            LowerNibble = Subdata & 0xf;
            if (ObjectData.PieceLayouts.Count > PieceIndex &&
                ObjectData.PieceLayouts[PieceIndex].Pieces.Count > 0)
                SetPieceLayoutIndex(PieceIndex);
        }

        public LevelObjectPiece Collides(Point sonic)
        {
            return Collision(sonic, false);
        }

        public LevelObjectPiece HurtsSonic(Point sonic)
        {
            return Collision(sonic, true);
        }

        public void Kill()
        {
            Dead = true;
        }

        public LevelObjectPiece Collision(Point sonic, bool isHurtMap)
        {
            if (Dead || ObjectData.Falsey() || ObjectData.PieceLayouts.Count == 0) return null;
            var pcs = Pieces;
            int mX = (int) ( ( sonic.X ) - X );
            int mY = (int) ( ( sonic.Y ) - Y );
            for (var pieceIndex = 0; pieceIndex < pcs.Count; pieceIndex++) {
                var j = pcs[pieceIndex];
                var piece = ObjectData.Pieces[j.PieceIndex];
                var asset = ObjectData.Assets[piece.AssetIndex];
                if (asset.Frames.Count > 0) {
                    var frm = asset.Frames[j.FrameIndex];
                    var map = isHurtMap ? frm.HurtSonicMap : frm.CollisionMap;
                    if (twoDArray(map, ( mX + frm.OffsetX + j.X ), ( mY + frm.OffsetY + j.Y )) == true)
                        return j;
                }
            }

            return null;
        }

        public bool twoDArray(int[][] map, int x, int y)
        {
            if (map.Falsey() || x < 0 || y < 0 || x > map.Length)
                return false;
            var d = map[x];
            if (d.Falsey() || y > d.Length)
                return false;
            return d[y] > 0;
        }

        public dynamic Collide(Sonic sonic, string sensor, dynamic piece)
        {
            try {
                return ObjectData.OnCollide(this, SonicManager.Instance.SonicLevel, sonic, sensor, piece);
            } catch (Exception EJ) {
                //this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
                return false;
            }
        }

        public dynamic HurtSonic(Sonic sonic, string sensor, dynamic piece)
        {
            try {
                return ObjectData.OnHurtSonic(this, SonicManager.Instance.SonicLevel, sonic, sensor, piece);
            } catch (Exception EJ) {
                //this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
                return null;
            }
        }
    }
}