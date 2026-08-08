import { useLesson } from "../sdk/LessonContext";

export default function GraphPanel() {
  const { lesson } = useLesson();

  const graphWidth = 520;
  const graphHeight = 220;

  const left = 60;
  const bottom = 180;
  const top = 20;

  const startX = left;
  const endX = graphWidth;

  const startY = bottom;

  const mapPosition = (position: number) => {
    return bottom - ((position + 10) / 20) * 140;
  };

  const endY = mapPosition(lesson.currentPosition);

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-cyan-400">Position–Time Graph</h2>

      <p className="mt-2 mb-5 text-slate-400">
        Live position of the particle during the experiment.
      </p>

      <svg viewBox={`0 0 ${graphWidth + 40} ${graphHeight}`} className="w-full">
        {/* Grid */}

        {Array.from({ length: 6 }).map((_, i) => {
          const y = top + i * 32;

          return (
            <line
              key={`h${i}`}
              x1={left}
              y1={y}
              x2={graphWidth}
              y2={y}
              stroke="#334155"
              strokeWidth="1"
            />
          );
        })}

        {Array.from({ length: 6 }).map((_, i) => {
          const x = left + i * 92;

          return (
            <line
              key={`v${i}`}
              x1={x}
              y1={top}
              x2={x}
              y2={bottom}
              stroke="#334155"
              strokeWidth="1"
            />
          );
        })}

        {/* Axes */}

        <line
          x1={left}
          y1={top}
          x2={left}
          y2={bottom}
          stroke="#94a3b8"
          strokeWidth="2"
        />

        <line
          x1={left}
          y1={bottom}
          x2={graphWidth}
          y2={bottom}
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Y Labels */}

        {[-10, -5, 0, 5, 10].map((value) => {
          const y = mapPosition(value);

          return (
            <text key={value} x="18" y={y + 5} fill="#94a3b8" fontSize="12">
              {value}
            </text>
          );
        })}

        {/* Motion Line */}

        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#22d3ee"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Start */}

        <circle cx={startX} cy={startY} r="6" fill="#22c55e" />

        {/* Current */}

        <circle cx={endX} cy={endY} r="7" fill="#ef4444" />

        {/* Axis Labels */}

        <text x="5" y="18" fill="#94a3b8" fontSize="13">
          Position (m)
        </text>

        <text x="470" y="205" fill="#94a3b8" fontSize="13">
          Time
        </text>
      </svg>
    </section>
  );
}
