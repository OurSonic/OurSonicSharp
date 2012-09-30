using System;
namespace OurSonic.UIManager
{
    public class HtmlBox : Element
    {
        public Action Init { get; set; }
        public Action<int, int> UpdatePosition { get; set; }
        public Action _Focus { get; set; }
        public Action _Hide { get; set; }
        public HtmlBox(int x, int y) : base(x, y) {}

        public override void Construct()
        {
            base.Construct();
        }
    }
}