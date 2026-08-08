export default function AnimationPanel() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
      <div className="border-b border-slate-700 px-8 py-5">
        <h2 className="text-2xl font-bold text-cyan-400">
          Scientific Visualization
        </h2>

        <p className="mt-2 text-slate-400">
          Observe the concept of displacement through high-quality Manim
          animations before performing the experiment.
        </p>
      </div>

      <div className="flex aspect-video items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="text-7xl">🎬</div>

          <h3 className="mt-6 text-2xl font-semibold text-white">
            Lesson Animation
          </h3>

          <p className="mt-3 max-w-xl text-slate-400">
            This panel will display the rendered Manim animation for Lesson 01.
            Students should watch the visualization before interacting with the
            laboratory below.
          </p>
        </div>
      </div>
    </section>
  );
}
