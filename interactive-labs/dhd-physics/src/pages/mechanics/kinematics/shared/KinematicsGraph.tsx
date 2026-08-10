import type { KinematicPoint } from "./kinematicsMath";
import { clamp, findNearestPoint, round } from "./kinematicsMath";

type GraphKind = "position" | "velocity" | "acceleration";

type KinematicsGraphProps = {
  kind: GraphKind;
  points: KinematicPoint[];
  currentTime: number;
  color?: string;
  showSlope?: boolean;
  showArea?: boolean;
};

const valueFor = (point: KinematicPoint, kind: GraphKind) =>
  kind === "position" ? point.x : kind === "velocity" ? point.v : point.a;

// What the shaded area under this particular graph physically represents.
// Area under v-t is displacement (x(t) - x(0)); area under a-t is the
// change in velocity (v(t) - v(0)). Area under x-t has no standard
// teaching interpretation at this level, so it is never shaded.
const areaMeaning = (points: KinematicPoint[], current: KinematicPoint, kind: GraphKind) => {
  if (points.length === 0) return null;
  const start = points[0];
  if (kind === "velocity") return { label: "displacement", unit: "m", value: current.x - start.x };
  if (kind === "acceleration") return { label: "Δv", unit: "m/s", value: current.v - start.v };
  return null;
};

export default function KinematicsGraph({
  kind,
  points,
  currentTime,
  color = "#58a6ff",
  showSlope = false,
  showArea = false,
}: KinematicsGraphProps) {
  const width = 520;
  const height = 220;
  const pad = { left: 42, right: 18, top: 24, bottom: 34 };
  const values = points.map((point) => valueFor(point, kind));
  const rawMin = Math.min(...values, 0);
  const rawMax = Math.max(...values, 1);
  const span = rawMax - rawMin || 1;
  const min = rawMin - span * 0.08;
  const max = rawMax + span * 0.08;
  const endTime = points.at(-1)?.t || 1;
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;

  // Pixels-per-unit scale factors. Any slope drawn on screen must be
  // converted through these, or the tangent line will point the wrong
  // way whenever the time axis and value axis have different physical
  // units (which is always true here: seconds vs m, m/s, or m/s²).
  const pxPerSecond = plotWidth / endTime;
  const pxPerUnit = plotHeight / (max - min);

  const xMap = (time: number) => pad.left + time * pxPerSecond;
  const yMap = (value: number) => pad.top + (1 - (value - min) / (max - min)) * plotHeight;

  const current = findNearestPoint(points, currentTime);
  const currentIndex = points.indexOf(current);

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${xMap(point.t).toFixed(1)} ${yMap(valueFor(point, kind)).toFixed(1)}`)
    .join(" ");

  const currentX = xMap(current.t);
  const currentY = yMap(valueFor(current, kind));
  const zeroY = yMap(0);
  const title = kind === "position" ? "Position–time" : kind === "velocity" ? "Velocity–time" : "Acceleration–time";
  const unit = kind === "position" ? "x (m)" : kind === "velocity" ? "v (m/s)" : "a (m/s²)";

  // Slope of THIS graph at the marker, in data units per second:
  // slope of x-t is v, slope of v-t is a. (Slope of a-t is not shown;
  // acceleration is modelled as constant, so its own tangent is flat
  // and not pedagogically useful to draw.)
  const slope = kind === "position" ? current.v : current.a;
  const tangentHalfSeconds = Math.max(endTime * 0.06, 0.05);
  const tangentDx = tangentHalfSeconds * pxPerSecond;
  const tangentDy = slope * tangentHalfSeconds * pxPerUnit;

  const area = showArea ? areaMeaning(points, current, kind) : null;

  // Build the actual filled region between the curve and the zero line
  // from t = 0 to the marker — not a rectangle. This is what makes the
  // shaded area visually match the integral it represents, including
  // when the curve changes shape (e.g. the turning-point scenario).
  const areaPath = (() => {
    if (!area || currentIndex < 1) return "";
    const segment = points.slice(0, currentIndex + 1);
    const top = segment
      .map((point, index) => `${index === 0 ? "M" : "L"}${xMap(point.t).toFixed(1)} ${yMap(valueFor(point, kind)).toFixed(1)}`)
      .join(" ");
    const lastT = segment.at(-1)!.t;
    const firstT = segment[0].t;
    return `${top} L${xMap(lastT).toFixed(1)} ${zeroY.toFixed(1)} L${xMap(firstT).toFixed(1)} ${zeroY.toFixed(1)} Z`;
  })();

  // Render each signed strip independently. A zero crossing is split at its
  // interpolated time, so positive and negative displacement stay distinct.
  const signedAreaPaths = areaPath
    ? (() => {
        if (!area || currentIndex < 1) return [];
        const strips: Array<{ d: string; fill: string }> = [];
        const segment = points.slice(0, currentIndex + 1);

        for (let index = 0; index < segment.length - 1; index += 1) {
          const first = segment[index];
          const second = segment[index + 1];
          const firstValue = valueFor(first, kind);
          const secondValue = valueFor(second, kind);
          const crossing = firstValue * secondValue < 0
            ? { ...first, t: first.t + ((second.t - first.t) * -firstValue) / (secondValue - firstValue) }
            : null;
          const pieces = crossing ? [[first, crossing], [crossing, second]] : [[first, second]];

          pieces.forEach(([start, end]) => {
            const startValue = valueFor(start, kind);
            const endValue = valueFor(end, kind);
            if (startValue === 0 && endValue === 0) return;
            strips.push({
              d: `M${xMap(start.t).toFixed(1)} ${zeroY.toFixed(1)} L${xMap(start.t).toFixed(1)} ${yMap(startValue).toFixed(1)} L${xMap(end.t).toFixed(1)} ${yMap(endValue).toFixed(1)} L${xMap(end.t).toFixed(1)} ${zeroY.toFixed(1)} Z`,
              fill: (startValue + endValue) / 2 >= 0 ? "#60a5fa" : "#fb7185",
            });
          });
        }
        return strips;
      })()
    : [];

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4 shadow-xl shadow-slate-950/20">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{title}</p>
          <p className="text-xs text-slate-400">{unit}</p>
        </div>
        <strong style={{ color }} className="text-sm">
          {round(valueFor(current, kind))}
        </strong>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title} graph`} className="h-auto w-full overflow-visible">
        {[0, 1, 2, 3].map((line) => {
          const y = pad.top + (line * plotHeight) / 3;
          return <line key={line} x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="#243047" strokeWidth="1" />;
        })}
        <line x1={pad.left} x2={pad.left} y1={pad.top} y2={height - pad.bottom} stroke="#52617c" />
        <line x1={pad.left} x2={width - pad.right} y1={zeroY} y2={zeroY} stroke="#52617c" strokeDasharray="4 4" />
        {signedAreaPaths.map((strip, index) => <path key={`${kind}-area-${index}`} d={strip.d} fill={strip.fill} opacity="0.22" stroke="none" />)}
        {showSlope && kind !== "acceleration" && (
          <line
            x1={clamp(currentX - tangentDx, pad.left, width - pad.right)}
            y1={clamp(currentY + tangentDy, pad.top, height - pad.bottom)}
            x2={clamp(currentX + tangentDx, pad.left, width - pad.right)}
            y2={clamp(currentY - tangentDy, pad.top, height - pad.bottom)}
            stroke="#f5c84c"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        )}
        <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1={currentX} x2={currentX} y1={pad.top} y2={height - pad.bottom} stroke="#f5c84c" strokeDasharray="3 4" />
        <circle cx={currentX} cy={currentY} r="6" fill={color} stroke="#0b1120" strokeWidth="3" />
        <text x={pad.left} y={height - 8} fill="#7f8ba3" fontSize="11">0 s</text>
        <text x={width - pad.right} y={height - 8} fill="#7f8ba3" fontSize="11" textAnchor="end">
          {round(endTime)} s
        </text>
      </svg>
      <p className="mt-2 text-xs text-slate-400">
        At <strong className="text-slate-200">t = {round(current.t)} s</strong>,{" "}
        {kind === "position"
          ? `the gradient is v = ${round(current.v)} m/s`
          : kind === "velocity"
          ? `the gradient is a = ${round(current.a)} m/s²`
          : `the acceleration is ${round(current.a)} m/s²`}
        .
      </p>
      {area && (
        <p className="mt-1 text-xs text-slate-400">
          Shaded area (0 → t) = <strong className="text-slate-200">{area.label} = {round(area.value)} {area.unit}</strong>
        </p>
      )}
      {kind === "velocity" && area && (
        <p className="mt-1 text-xs text-slate-400">
          <span className="text-blue-300">Blue</span> is positive displacement; <span className="text-rose-300">red</span> is negative displacement. Their signed sum is the net displacement.
        </p>
      )}
    </article>
  );
}
