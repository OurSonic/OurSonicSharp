namespace OurSonic.Utility
{
    public class Constants
    {
        public static IntersectingRectangle DefaultWindowLocation(GameState state, CanvasInformation canvas, Point scale)
        {
            switch (state) {
                case GameState.Playing:
                    return new IntersectingRectangle(0, 0, 320, 224);
                case GameState.Editing:
                    var x = 0;
                    var y = 0;
                    if (SonicManager.Instance.SonicLevel.Truthy() && SonicManager.Instance.SonicLevel.StartPositions.Truthy() &&
                        SonicManager.Instance.SonicLevel.StartPositions[0].Truthy()) {
                        x = SonicManager.Instance.SonicLevel.StartPositions[0].X - 128 * scale.X;
                        y = SonicManager.Instance.SonicLevel.StartPositions[0].Y - 128 * scale.Y;
                    }
                    return new IntersectingRectangle(x, y, canvas.DomCanvas.GetWidth(), canvas.DomCanvas.GetHeight());
            }
            return null;
        }
    }
}