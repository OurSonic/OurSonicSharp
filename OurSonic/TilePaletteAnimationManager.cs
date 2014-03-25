using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using OurSonic.Level;
using OurSonic.Utility;

namespace OurSonic
{
    public class TilePaletteAnimationManager
    {
        public SonicManager SonicManager { get; set; }


        public JsDictionary<int, TilePaletteAnimation> Animations;


        public TilePaletteAnimationManager(SonicManager sonicManager)
        {
            SonicManager = sonicManager;
            Init();
        }

        private void Init()
        {
            Animations = new JsDictionary<int, TilePaletteAnimation>();
            for (int animatedPaletteIndex = 0;
                animatedPaletteIndex < SonicManager.SonicLevel.AnimatedPalettes.Count;
                animatedPaletteIndex++)
            {
                Animations[animatedPaletteIndex] = new TilePaletteAnimation(this,SonicManager.SonicLevel.AnimatedPalettes[animatedPaletteIndex]);
                Animations[animatedPaletteIndex].Init();
            }
        }

        public void ClearCache()
        {
            Animations = null;

        }

        public void TickAnimatedPalettes()
        { 
            foreach (var animation in Animations)
            {
                TilePaletteAnimation tilePaletteAnimation = animation.Value;
                tilePaletteAnimation.Tick();
            }
        }

        public TilePaletteAnimationFrame GetCurrentFrame(int paletteAnimationIndex)
        {
            return Animations[paletteAnimationIndex].GetCurrentFrame();
        }
        public TilePaletteAnimation GetPaletteAnimation(int paletteAnimationIndex)
        {
            return Animations[paletteAnimationIndex];
        }
    }
    public class TilePaletteAnimation
    {
        [IntrinsicProperty]
        public TilePaletteAnimationManager Manager { get; set; }
        [IntrinsicProperty]
        public PaletteItem AnimatedPaletteData { get; set; }
        [IntrinsicProperty]
        public int CurrentFrame { get; set; }
        [IntrinsicProperty]
        public List<TilePaletteAnimationFrame> Frames { get; set; }


        public TilePaletteAnimation(TilePaletteAnimationManager manager, PaletteItem animatedPaletteData)
        {
            Manager = manager;
            AnimatedPaletteData = animatedPaletteData;
            Frames = new List<TilePaletteAnimationFrame>();

        }

        public TilePaletteAnimationFrame GetCurrentFrame()
        {
            return Frames[CurrentFrame];
        }

        public void Tick()
        {
            var pal = AnimatedPaletteData;


            if (pal.SkipIndex == 0) return;
            if (pal.TotalLength == 0) return;

            //when to move to the next frame
            for (int j = 0; j <= pal.TotalLength; j += pal.SkipIndex)
            {
                if (Manager.SonicManager.DrawTickCount%(pal.TotalLength + pal.SkipIndex) == j)
                //todo ^^^this calc is suspected to be wrong
                {
                    CurrentFrame = j / pal.SkipIndex;
                } 
            }


        }

        public void Init()
        {

            var pal = AnimatedPaletteData;

            if (pal.SkipIndex == 0) return;
            if (pal.TotalLength == 0) return;

            //when to move to the next frame
            for (int j = 0; j <= pal.TotalLength; j += pal.SkipIndex)
            {
                int frameIndex = j / pal.SkipIndex;
                if (Frames[frameIndex] == null)
                {
                    Frames[frameIndex] = new TilePaletteAnimationFrame(frameIndex, this);
                }
            }
        }
    }

    public class TilePaletteAnimationFrame
    {
        public TilePaletteAnimation Animation { get; set; }

        [IntrinsicProperty]
        public int FrameIndex { get; set; }
        public TilePaletteAnimationFrame(int frameIndex, TilePaletteAnimation animation)
        {
            Animation = animation;
            FrameIndex = frameIndex;
        }

        private string[][] tempPalette;
        public void SetPalette()
        { 
            var levelPalette = Animation.Manager.SonicManager.SonicLevel.Palette;
            clonePalette(levelPalette);

            var pal = Animation.AnimatedPaletteData;

            for (int index = 0; index < pal.Pieces.Count; index++)
            {
                var palettePiece = pal.Pieces[index];




                int colorIndex = FrameIndex + (pal.Pieces.Count * index)/*+ 0 + (palettePiece.PaletteMultiply)*/;
                //todo ^^^this calc is suspected to be wrong
                //could be: int colorIndex = FrameIndex * index + (pal.Pieces.Count)/*+ 0 + (palettePiece.PaletteMultiply)*/;



                int replaceIndex = (palettePiece.PaletteOffset) / 2;

                var color = pal.Palette[colorIndex];
                if (color != null)
                    levelPalette[palettePiece.PaletteIndex][replaceIndex] = color;
                else//bug, shouldnt hit
                    levelPalette[palettePiece.PaletteIndex][replaceIndex] = "#000000";
            }


        }

        private void clonePalette(string[][] levelPalette)
        {
            tempPalette = new string[levelPalette.Length][];
            for (int index = 0; index < levelPalette.Length; index++)
            {
                var canvasElements = levelPalette[index];
                tempPalette[index] = new string[canvasElements.Length];
                for (int index2 = 0; index2 < canvasElements.Length; index2++)
                {
                    tempPalette[index][index2] = canvasElements[index2];
                }
            }
        }

        public void ClearPalette()
        {
            Animation.Manager.SonicManager.SonicLevel.Palette = tempPalette;
            tempPalette = null;
        }
    }
}