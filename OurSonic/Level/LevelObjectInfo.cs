using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using OurSonicModels;
namespace OurSonic.Level
{
    [Serializable]
    public class LevelObjectInfo
    {
        private Rectangle _rect = new Rectangle(0, 0, 0, 0);
        public int lastDrawTick;
        public SLDataObjectEntry O { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Xsp { get; set; }
        public double Ysp { get; set; }
        public bool Xflip { get; set; }
        public bool Yflip { get; set; }
        public int Subdata { get; set; }
        public string Key { get; set; }
        public LevelObject ObjectData { get; set; }
        public int UpperNibble { get; set; }
        public int LowerNibble { get; set; }
        public int PieceIndex { get; set; }
        public List<LevelObjectPiece> Pieces { get; set; }
        public bool Dead { get; set; }
        public LevelObjectInfo State { get; set; }
        public int Index { get; set; }
        public List<string> Debug { get; set; }
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
            {
                Debug = new List<string>();
            }

            if (level == 0)
            {
                this.Debug.Add(" -- " + txt + " -- ");
            }
            else
            {
                this.Debug.Add(txt);
            }
            if (this.ConsoleLog.Truthy())
            {
                this.ConsoleLog(this.Debug);
            }
        }

        protected Action<List<string>> ConsoleLog { get; set; }

        public void SetPieceLayoutIndex(int ind)
        {
            /*            PieceIndex = ind;

                        var pcs = ObjectData.PieceLayouts[PieceIndex].Pieces;

                        Pieces = new List<LevelObjectPieceLayoutPiece>();
                        for (int i = 0; i < pcs.Count; i++) {
                            Pieces.Add(pcs[i]);
                        }*/
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

            try
            {
                return ObjectData.Tick(@object, level, sonic);
            }
            catch (Exception EJ)
            {
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
            if (ObjectData.PieceLayouts.Count == 0)
            {
                _rect.X = (int)X;
                _rect.Y = (int)Y;
                _rect.Width = ObjectManager.broken.Width;
                _rect.Height = ObjectManager.broken.Height;
                return _rect;
            }

            var pcs = Pieces;

            _rect.Y = 0;
            _rect.Y = 0;
            _rect.Width = 0;
            _rect.Height = 0;

            for (var pieceIndex = 0; pieceIndex < pcs.Count; pieceIndex++)
            {
                var j = pcs[pieceIndex];
                var piece = ObjectData.Pieces[j.PieceIndex];
                var asset = ObjectData.Assets[piece.AssetIndex];
                if (asset.Frames.Count > 0)
                {
                    var frm = asset.Frames[j.FrameIndex];
                    Help.MergeRect(_rect, new Rectangle(frm.OffsetX + j.Y, frm.OffsetY + j.Y, frm.Width * scale.Y, frm.Height * scale.Y));
                }
            }
            _rect.X = _rect.X * scale.X;
            _rect.Y = _rect.Y * scale.Y;
            _rect.Width -= _rect.X;
            _rect.Height -= _rect.Y;

            _rect.X += (int)X;
            _rect.Y += (int)Y;
            return _rect;
        }

        public void Draw(CanvasContext2D canvas, int x, int y, Point scale, bool showHeightMap)
        {
            if (Dead || ObjectData.Falsey()) return;

            if (ObjectData.PieceLayouts.Count == 0)
            {
                canvas.DrawImage(ObjectManager.broken, (x - ObjectManager.broken.Width / 2), (y - ObjectManager.broken.Height / 2),
                                 ObjectManager.broken.Width * scale.X, ObjectManager.broken.Height * scale.Y);
                return;
            }

            MainPieceLayout().Draw(canvas, x, y, scale, ObjectData, this, showHeightMap);
            if (true /* || this.consoleLog*/)
            {
                var gr = GetRect(scale);
                canvas.Save();
                canvas.FillStyle = "rgba(228,228,12,0.4)";
                var wd = 1;
                canvas.FillRect(gr.X - X + x - (gr.Width / 2) - wd, gr.Y - Y + y - (gr.Height / 2) - wd, gr.Width - (gr.X - X) + wd * 2,
                                gr.Height - (gr.Y - Y) + wd * 2);
                canvas.Restore();
            }
        }

        public void Reset()
        {
            this.X = this.O.X;
            this.Y = this.O.Y;
            this.Xsp = 0;
            this.Ysp = 0;
            this.State = null;
            this.Xflip = this.O.XFlip;
            this.Yflip = this.O.YFlip;
            this.Dead = false;
            this.PieceIndex = 0; //maybe
            this.Subdata = this.O.SubType;
            this.UpperNibble = this.Subdata >> 4;
            this.LowerNibble = this.Subdata & 0xf;
            if (this.ObjectData.PieceLayouts.Count > this.PieceIndex &&
                this.ObjectData.PieceLayouts[this.PieceIndex].Pieces.Count > 0)
            {
                this.SetPieceLayoutIndex(this.PieceIndex);
            }
        }

        public LevelObjectPiece Collides(Sonic sonic)
        {
            return Collision(sonic, false);
        }

        public void Kill()
        {
            Dead = true;
        }

        public LevelObjectPiece Collision(Sonic sonic, bool isHurtMap)
        {
            if (Dead || ObjectData.Falsey() || ObjectData.PieceLayouts.Count == 0) return null;
            var pcs = Pieces;
            for (var pieceIndex = 0; pieceIndex < pcs.Count; pieceIndex++)
            {
                var j = pcs[pieceIndex];
                var piece = ObjectData.Pieces[j.PieceIndex];
                var asset = ObjectData.Assets[piece.AssetIndex];
                if (asset.Frames.Count > 0)
                {
                    var frm = asset.Frames[j.FrameIndex];
                    var map = isHurtMap ? frm.HurtSonicMap : frm.CollisionMap;
                    if (twoDArray(map, (int)((sonic.X) - X + frm.OffsetX + j.X), (int)((sonic.Y) - Y + frm.OffsetY + j.Y)) == true)
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

        public dynamic Collide(Sonic sonic, SensorM sensor, dynamic piece)
        {
            try
            {
                return ObjectData.OnCollide(this, SonicManager.Instance.SonicLevel, sonic, sensor, piece);
            }
            catch (Exception EJ)
            {
                //this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
                return false;
            }
        }

        public dynamic HurtSonic(Sonic sonic, SensorM sensor, dynamic piece)
        {
            try
            {
                return ObjectData.OnHurtSonic(this, SonicManager.Instance.SonicLevel, sonic, sensor, piece);
            }
            catch (Exception EJ)
            {
                //this.log(EJ.name + " " + EJ.message + " " + EJ.stack, 0);
                return null;
            }
        }
    }
}