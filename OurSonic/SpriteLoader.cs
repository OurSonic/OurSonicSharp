using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using OurSonic.Utility;
namespace OurSonic
{
    public class SpriteLoader
    {
        private readonly Action myCompleted;
        private readonly Action<string> myUpdate;
        private bool done = false;
        private int stepIndex = 0;
        private List<SpriteLoaderStep> steps = new List<SpriteLoaderStep>();
        private int tickIndex = 0;

        public SpriteLoader(Action completed, Action<string> update)
        {
            myCompleted = completed;
            myUpdate = update;
        }

        public bool Tick()
        {
            if (stepIndex == steps.Count) {
                if (!done) {
                    done = true;
                    myCompleted();
                }
                return true;
            }
            var stp = steps[stepIndex];
            if (stp.Falsey()) return true;
            if (tickIndex % stp.Iterations.Count / 12 == 0)
                myUpdate("Caching: " + stp.Title + " " + ( ( tickIndex / stp.Iterations.Count ) * 100 ) + "%");
            if (stp.Iterations.Count > tickIndex) {
                stp.Method(stp.Iterations[tickIndex++],
                           () => {
                               if (stp.OnFinish()) {
                                   stepIndex++;
                                   tickIndex = 0;
                               }
                           });
            }

            return false;
        }

        public int AddStep(string title, Action<int, Action> method, Func<bool> onFinish, bool disable)
        {
            if (disable) return -1;
            steps.Add(new SpriteLoaderStep(title, method, onFinish));
            return steps.Count - 1;
        }

        public void AddIterationToStep(int spriteStep, int i)
        {
            if (spriteStep == -1) return;
            steps[spriteStep].Iterations.Add(i);
        }
    }
    public class SpriteLoaderStep
    {
        [IntrinsicProperty]
        public string Title { get; set; }
        [IntrinsicProperty]
        public Action<int, Action> Method { get; set; }
        [IntrinsicProperty]
        public Func<bool> OnFinish { get; set; }
        [IntrinsicProperty]
        public List<int> Iterations { get; set; }

        public SpriteLoaderStep(string title, Action<int, Action> method, Func<bool> onFinish)
        {
            Title = title;
            Method = method;
            OnFinish = onFinish;
            Iterations = new List<int>();
        }
    }
}