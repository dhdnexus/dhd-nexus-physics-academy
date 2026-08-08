import { useLesson } from "../../sdk/LessonContext";

export default function Canvas() {
  const { lesson } = useLesson();

  const map = (x: number) => 10 + ((x + 10) / 20) * 80;

  const start = map(lesson.initialPosition);
  const finish = map(lesson.finalPosition);
  const current = map(lesson.currentPosition);

  function renderRoute() {
    switch (lesson.route) {
      case "direct":
        return (
          <line
            x1={start}
            y1="50"
            x2={finish}
            y2="50"
            stroke="#3b82f6"
            strokeWidth="5"
            strokeLinecap="round"
          />
        );

      case "detour":
        return (
          <polyline
            points={`${start},50 ${start},34 ${finish},34 ${finish},50`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );

      case "return":
        return (
          <polyline
            points={`${start},50 ${finish + 10},50 ${finish},50`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );
    }
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-cyan-400">Laboratory Canvas</h2>

      <p className="mt-2 mb-6 text-slate-400">
        Observe the difference between the path travelled and the displacement.
      </p>

      <div className="relative h-56">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {renderRoute()}

          {/* Displacement */}

          <line
            x1={start}
            y1="50"
            x2={finish}
            y2="50"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Number Line */}

        <div className="absolute left-[10%] right-[10%] top-1/2 h-1 rounded-full bg-slate-600" />

        {/* Start */}

        <div
          className="absolute transition-all duration-300"
          style={{
            left: `${start}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="h-5 w-5 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />
        </div>

        {/* Finish */}

        <div
          className="absolute transition-all duration-300"
          style={{
            left: `${finish}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="h-5 w-5 rounded-full bg-red-500 shadow-lg shadow-red-500/30" />
        </div>

        {/* Particle */}

        <div
          className="absolute transition-all duration-500 ease-out"
          style={{
            left: `${current}%`,
            top: "50%",
            transform: "translate(-50%, -120%)",
          }}
        >
          <div className="h-7 w-7 rounded-full border-4 border-cyan-300 bg-cyan-500 shadow-xl shadow-cyan-400/60" />

          <p className="mt-2 text-center text-xs font-semibold text-cyan-300">
            Particle
          </p>
        </div>
      </div>
    </section>
  );
}
