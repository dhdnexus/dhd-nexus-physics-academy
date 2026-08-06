export default function Displacement() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Header */}

      <section>
        <h1 className="text-5xl font-bold text-cyan-400">
          Displacement Explorer
        </h1>

        <p className="mt-3 text-slate-300">
          Lesson 01 • Mechanics • Kinematics
        </p>
      </section>

      {/* Animation */}

      <section className="h-[420px] rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl">🎬</div>

          <p className="mt-4 text-slate-400">Manim Animation Area</p>
        </div>
      </section>

      {/* Controls */}

      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold">Controls</h2>

        <div className="mt-6">
          <label className="block mb-2">Position</label>

          <input
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            className="w-full"
          />
        </div>

        <button className="mt-6 rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-black hover:bg-cyan-400">
          Reset
        </button>
      </section>

      {/* Physics */}

      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold mb-6">Live Physics</h2>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-slate-400">Initial Position</p>
            <h3 className="text-3xl font-bold">0 m</h3>
          </div>

          <div>
            <p className="text-slate-400">Final Position</p>
            <h3 className="text-3xl font-bold">0 m</h3>
          </div>

          <div>
            <p className="text-slate-400">Displacement</p>
            <h3 className="text-3xl font-bold text-cyan-400">0 m</h3>
          </div>
        </div>
      </section>

      {/* Graph */}

      <section className="h-[300px] rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl">📈</div>

          <p className="mt-4 text-slate-400">Position–Time Graph</p>
        </div>
      </section>

      {/* Explanation */}

      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold">Explanation</h2>

        <p className="mt-5 leading-8 text-slate-300">
          Displacement is the straight-line change in position from the initial
          position to the final position. It is a vector quantity because it has
          both magnitude and direction.
        </p>
      </section>
    </div>
  );
}
