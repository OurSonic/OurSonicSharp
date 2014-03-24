namespace OurSonic
{
    public class TileAnimationManager
    {
        public SonicManager SonicManager { get; set; }

        public TileAnimationManager(SonicManager sonicManager)
        {
            SonicManager = sonicManager;
        }

        public void TickAnimatedTiles()
        {
        }
    }
}