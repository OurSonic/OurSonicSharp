using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using OurSonic.Level.Animations;
using OurSonic.Utility;

namespace OurSonic
{
    public class TileAnimationManager
    {
        public SonicManager SonicManager { get; set; }

        public JsDictionary<int, TileAnimation> Animations;
        public TileAnimationManager(SonicManager sonicManager)
        {
            SonicManager = sonicManager;
            Init();

        }

        private void Init()
        {
            Animations = new JsDictionary<int, TileAnimation>();
            for (int animatedTileIndex = 0; animatedTileIndex < SonicManager.SonicLevel.TileAnimations.Count; animatedTileIndex++)
            {
                Animations[animatedTileIndex] = new TileAnimation(this, SonicManager.SonicLevel.TileAnimations[animatedTileIndex]);
                Animations[animatedTileIndex].Init();
            }
        }

        public void TickAnimatedTiles()
        {
            if (Animations == null) Init();

            foreach (var animation in Animations)
            {
                var tilePaletteAnimation = animation.Value;
                tilePaletteAnimation.Tick();
            }

        } 

        public void ClearCache()
        {
            Animations = null;

        }
         

        public TileAnimationFrame GetCurrentFrame(int tileAnimationIndex)
        {
            return Animations[tileAnimationIndex].GetCurrentFrame();
        }
    }
    public class TileAnimation
    {
        [IntrinsicProperty]
        public TileAnimationManager Manager { get; set; }
        [IntrinsicProperty]
        public TileAnimationData AnimatedTileData { get; set; }
        [IntrinsicProperty]
        public int CurrentFrame { get; set; }
        [IntrinsicProperty]
        public List<TileAnimationFrame> Frames { get; set; }


        public TileAnimation(TileAnimationManager manager, TileAnimationData animatedTileData)
        {
            Manager = manager;
            AnimatedTileData = animatedTileData;
            Frames = new List<TileAnimationFrame>();
            CurrentFrame = 0;
        }

        public TileAnimationFrame GetCurrentFrame()
        {
            return Frames[CurrentFrame];
        }

        public void Tick()
        {
            var anni = AnimatedTileData;
            if (anni.LastAnimatedFrame == null)
            {
                anni.LastAnimatedFrame = 0;
                anni.LastAnimatedIndex = 0;
            }
            if (anni.DataFrames[anni.LastAnimatedIndex].Ticks == 0 ||
                (SonicManager.Instance.DrawTickCount - anni.LastAnimatedFrame) >=
                ((anni.AutomatedTiming > 0) ? anni.AutomatedTiming : anni.DataFrames[anni.LastAnimatedIndex].Ticks))
            {
                anni.LastAnimatedFrame = SonicManager.Instance.DrawTickCount;
                anni.LastAnimatedIndex = (anni.LastAnimatedIndex + 1) % anni.DataFrames.Length;
                CurrentFrame = anni.LastAnimatedIndex;

            }
 


        }

        public void Init()
        {
            for (int index = 0; index < AnimatedTileData.DataFrames.Length; index++)
            {
                Frames[index] = new TileAnimationFrame(index, this);
            }
        }
    }

    public class TileAnimationFrame
    {
        public TileAnimation Animation { get; set; }

        [IntrinsicProperty]
        public int FrameIndex { get; set; }
        public TileAnimationFrame(int frameIndex, TileAnimation animation)
        {
            Animation = animation;
            FrameIndex = frameIndex;
        }
      
        public TileAnimationDataFrame FrameData()
        {
            return Animation.AnimatedTileData.DataFrames[FrameIndex];
        } 
         
    }

}