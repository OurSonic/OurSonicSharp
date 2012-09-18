using System;
namespace OurSonic
{
    public class SpriteLoader
    {
        public SpriteLoader(Action completed, Action<string> update)
        {
            /*
   var that = this;
    this.stepIndex = 0;
    this.steps = [];
    this.done = false;
    this.tickIndex = 0;
    this.tick = function () {
        //this.stepIndex = this.steps.length;

        if (this.stepIndex == this.steps.length) {
            if (!this.done) {
                this.done = true;
                completed();
            }
            return true;
        }
        var stp = this.steps[this.stepIndex];
        if (!stp) return true;

        if (that.tickIndex % _H.floor(stp.iterations.length / 12) == 0)
            update("Caching: " + stp.title + " " + Math.floor(((that.tickIndex / stp.iterations.length) * 100)) + "%");

        if (stp.iterations.length > this.tickIndex) {
            stp.method(stp.iterations[this.tickIndex++], function () {
                if (stp.finish()) {
                    that.stepIndex++;
                    that.tickIndex = 0;
                }
            });
        }
        return false;
    };
    this.addStep = function (title, method, onFinish, disable) {
        if (disable)
            return -1;
        this.steps.push({ title: title, method: method, finish: onFinish, iterations: [] });
        return this.steps.length - 1;
    };
    this.addIterationToStep = function (stepIndex, index) {
        if (stepIndex == -1) return;
        this.steps[stepIndex].iterations.push(index);
    };
 */
        }

        public bool Tick()
        {
            return false;
        }

        public SpriteLoaderStep AddStep(string sprites, Action<int, Action> action)
        {
            return null;
        }
    }
    public class SpriteLoaderStep {}
}