using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic.UIManager
{
    public class Table<T> : Table
    {
        [IntrinsicProperty]
        public T Data { get; set; }

        public Table(T data, int x, int y, int width, int height)
                : base(x, y, width, height)
        {
            Data = data;
        }
    }
    public class Table : Element
    {
        [IntrinsicProperty]
        public List<TableRow> Rows { get; set; }

        public Table(int x, int y, int width, int height)
                : base(x, y)
        {
            Width = width;
            Height = height;
            Rows = new List<TableRow>();
        }

        public bool ChildrenAreEditing()
        {
            var ch = Rows;
            foreach (TableRow t in ch) {
                if (t.EditorEngine.Dragging.Truthy() || t.EditorEngine.Editing)
                    return true;
                if (t.ChildrenAreEditing())
                    return true;
            }
            return false;
        }

        private List<ExtraData<Rectangle, TableCell>> BuildSizeMap()
        {
            List<ExtraData<Rectangle, TableCell>> spots = new List<ExtraData<Rectangle, TableCell>>();

            int totalWidth = Width;
            int totalHeight = Height;

            Rectangle lastRowRect = new Rectangle(0, 0, 0, 0);

            var mainRow = Rows[0];

            foreach (TableRow row in Rows) {
                var lastRowRectData = calculateRowSize(row, lastRowRect.Y + lastRowRect.Height, ref totalWidth, ref totalHeight).WithData(row);
                lastRowRect = lastRowRectData;

                var lastCellRect = new Rectangle(0, lastRowRect.Y, 0, 0);
                foreach (TableCell cell in row.Cells) {
                    var lastCellRectData = calculateCellSize(cell, lastCellRect.X + lastCellRect.Width, lastCellRect.Y /*+ lastCellRect.Height*/, ref totalWidth, ref totalHeight).WithData(cell);
                    spots.Add(lastCellRectData);
                    lastCellRect = lastCellRectData;
                }
            }
            return spots;
        }

        private Rectangle calculateRowSize(TableRow row, int y, ref int totalWidth, ref int totalHeight)
        {
            double height;
            if (row.RowHeight == null)
                height = (double) totalHeight / row.Table.Rows.Count;

            else if (( (string) row.RowHeight ).EndsWith("%"))
                height = totalHeight * ( row.RowHeight ) / 100;
            else {
                if (row.RowHeight + y > totalHeight) {
                    int resetHeight = (int) ( y + row.RowHeight );
                    totalHeight = resetHeight;
                }
                height = row.RowHeight;
            }

            return new Rectangle(0, y, totalWidth, (int) height);
        }

        private Rectangle calculateCellSize(TableCell cell, int x, int y, ref int totalWidth, ref int totalHeight)
        {
            double width;
            double height;
            TableCell lastCellAtThisIndex;
            int rowIndex = cell.Row.Table.Rows.IndexOf(cell.Row);
            if (rowIndex == 0)
                lastCellAtThisIndex = null;
            else
                lastCellAtThisIndex = cell.Row.Table.Rows[rowIndex - 1].Cells[cell.Row.Cells.IndexOf(cell)];

            if (cell.CellWidth == null) width = lastCellAtThisIndex == null ? ( (double) totalWidth / cell.Row.Cells.Count ) : (double) lastCellAtThisIndex.CellWidth;
            else if (( (string) cell.CellWidth ).EndsWith("%"))
                width = totalWidth * ( cell.CellWidth ) / 100;
            else {
                if (cell.CellWidth + x > totalWidth)
                    totalWidth = (int) ( x + cell.CellWidth );
                width = cell.CellWidth;
            }

            if (cell.CellHeight == null)
                height = totalHeight;
            else if (( (string) cell.CellHeight ).EndsWith("%"))
                height = totalHeight * ( cell.CellHeight ) / 100;
            else {
                if (cell.CellHeight + y > totalHeight)
                    totalHeight = (int) ( y + cell.CellHeight );
                height = cell.CellHeight;
            }

            if (cell.FullSize) {
                foreach (var cnt in cell.Controls) {
                    cnt.X = 0;
                    cnt.Y = 0;
                    cnt.Width = (int) width;
                    cnt.Height = (int) height;
                }
            }

            return new Rectangle(x, y, (int) width, (int) height);
        }

        public override void Focus(Pointer e)
        {
            base.Focus(e);
        }

        public override void LoseFocus()
        {
            base.LoseFocus();
        }

        public override void Construct()
        {
            base.Construct();
        }

        public override bool OnKeyDown(ElementEvent e)
        {
            return base.OnKeyDown(e);
        }

        public override bool OnClick(Pointer e)
        {
            return base.OnClick(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            return base.OnMouseUp(e);
        }

        public override bool OnScroll(Pointer e)
        {
            return base.OnScroll(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            var fm = BuildSizeMap();

            foreach (var extraData in fm) {
                extraData.Data.X = extraData.Item.X;
                extraData.Data.Y = extraData.Item.Y;
                extraData.Data.CellWidth = extraData.Item.Width;
                extraData.Data.CellHeight = extraData.Item.Height;
                extraData.Data.Draw(canv);
            }

            base.Draw(canv);
        }

        public virtual TableRow AddRow(TableRow element)
        {
            element.Parent = this;

            element.Construct();

            Rows.Add(element);
            return element;
        }
    }
    public class TableRow : Element
    {
        [IntrinsicProperty]
        public List<TableCell> Cells { get; set; }
        public SizeNumber RowHeight { get; set; }
        public Table Table
        {
            get { return (Table) Parent; }
        }

        public TableRow(SizeNumber height)
                : base(0, 0)
        {
            RowHeight = height;
            Cells = new List<TableCell>();
        }

        public bool ChildrenAreEditing()
        {
            var ch = Cells;
            foreach (TableCell t in ch) {
                if (t.EditorEngine.Dragging.Truthy() || t.EditorEngine.Editing)
                    return true;
                if (t.ChildrenAreEditing())
                    return true;
            }
            return false;
        }

        public override void Focus(Pointer e)
        {
            base.Focus(e);
        }

        public override void LoseFocus()
        {
            base.LoseFocus();
        }

        public override void Construct()
        {
            base.Construct();
        }

        public override bool OnKeyDown(ElementEvent e)
        {
            return base.OnKeyDown(e);
        }

        public override bool OnClick(Pointer e)
        {
            return base.OnClick(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            return base.OnMouseUp(e);
        }

        public override bool OnScroll(Pointer e)
        {
            return base.OnScroll(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            base.Draw(canv);
        }

        public virtual TableCell AddCell(TableCell element)
        {
            element.Parent = this;

            element.Construct();

            Cells.Add(element);
            return element;
        }
    }
    public class TableCell : Panel
    {
        [IntrinsicProperty]
        public SizeNumber CellHeight { get; set; }
        [IntrinsicProperty]
        public SizeNumber CellWidth { get; set; }
        [IntrinsicProperty]
        public bool FullSize { get; set; }
        [IntrinsicProperty]
        public int RowSpan { get; set; }
        [IntrinsicProperty]
        public int ColSpan { get; set; }
        public TableRow Row
        {
            get { return (TableRow) Parent; }
        }

        public TableCell(SizeNumber width, SizeNumber height)
                : base(0, 0, 0, 0)
        {
            CellWidth = width;
            CellHeight = height;
            Outline = true;
            FullSize = true;
        }

        public TableCell()
                : base(0, 0, 0, 0) {}

        public override void Focus(Pointer e)
        {
            base.Focus(e);
        }

        public override void LoseFocus()
        {
            base.LoseFocus();
        }

        public override void Construct()
        {
            base.Construct();
        }

        public override bool OnKeyDown(ElementEvent e)
        {
            return base.OnKeyDown(e);
        }

        public override bool OnClick(Pointer e)
        {
            return base.OnClick(e);
        }

        public override bool OnMouseOver(Pointer e)
        {
            return base.OnMouseOver(e);
        }

        public override bool OnMouseUp(Pointer e)
        {
            return base.OnMouseUp(e);
        }

        public override bool OnScroll(Pointer e)
        {
            return base.OnScroll(e);
        }

        public override void Draw(CanvasContext2D canv)
        {
            Width = (int) (double) CellWidth;
            Height = (int) (double) CellHeight;

            base.Draw(canv);
        }
    }
}