import { useLesson } from "../../sdk/LessonContext";

export default function Controls() {
  const { lesson, setPosition, resetExperiment } = useLesson();

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-semibold text-cyan-400">
        Experiment Controls
      </h2>

      <div className="space-y-8">
        {/* Position Slider */}

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-slate-300">Current Position</span>

            <span className="font-semibold text-cyan-400">
              {lesson.currentPosition.toFixed(1)} m
            </span>
          </div>

          <input
            type="range"
            min={lesson.initialPosition}
            max={10}
            step={0.1}
            value={lesson.currentPosition}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
        </div>

        {/* Experiment Summary */}

        <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div>
            <p className="text-sm text-slate-400">Selected Route</p>

            <p className="mt-1 font-semibold capitalize text-white">
              {lesson.route}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Current Position</p>

            <p className="mt-1 font-semibold text-cyan-400">
              {lesson.currentPosition.toFixed(1)} m
            </p>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-4">
          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-cyan-500/40 px-5 py-2 font-semibold text-black"
          >
            ▶ Play
          </button>

          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-slate-700/60 px-5 py-2 text-slate-300"
          >
            ⏸ Pause
          </button>

          <button
            onClick={resetExperiment}
            className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-400"
          >
            Reset
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Playback controls will become active in a future lesson when
          experiment animation is introduced.
        </p>
      </div>
    </div>
  );
}
