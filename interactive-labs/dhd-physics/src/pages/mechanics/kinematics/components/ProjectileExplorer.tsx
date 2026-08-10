import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { clamp, round } from "../shared/kinematicsMath";

type ProjectilePoint = { t: number; x: number; y: number; vx: number; vy: number; speed: number };

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

// Ideal projectile motion, no air resistance. Horizontal and vertical
// motion are computed independently and only meet through shared time t,
// which is the physical point this lesson exists to teach.
function projectileModel(speed: number, angle: number, height: number, gravity: number, samples = 81) {
  const theta = toRadians(angle);
  const ux = speed * Math.cos(theta);
  const uy = speed * Math.sin(theta);
  // Positive root of 0 = height + uy*t - 1/2*g*t^2 (ground intersection).
  const flightTime = (uy + Math.sqrt(uy * uy + 2 * gravity * height)) / gravity;
  // Rendering gets a non-zero domain while the sampled model retains the
  // true flight time, including a valid zero-time horizontal ground launch.
  const renderFlightTime = Math.max(flightTime, 0.1);
  const points: ProjectilePoint[] = Array.from({ length: samples }, (_, index) => {
    const t = (flightTime * index) / (samples - 1);
    const vx = ux;
    const vy = uy - gravity * t;
    return {
      t,
      x: ux * t,
      y: Math.max(0, height + uy * t - 0.5 * gravity * t * t),
      vx,
      vy,
      speed: Math.hypot(vx, vy),
    };
  });
  return { ux, uy, flightTime, renderFlightTime, range: ux * flightTime, maxHeight: height + (uy * uy) / (2 * gravity), points };
}

type SliderProps = { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void };

function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  return (
    <label className="block space-y-2">
      <span className="flex justify-between gap-3 text-sm text-slate-300">
        <span>{label}</span>
        <strong className="text-violet-300">
          {round(value)} {unit}
        </strong>
      </span>
      <input
        className="w-full accent-violet-400"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`${label} in ${unit}`}
      />
      <span className="flex justify-between text-[11px] text-slate-500">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </span>
    </label>
  );
}

export default function ProjectileExplorer() {
  const [speed, setSpeed] = useState(18);
  const [angle, setAngle] = useState(48);
  const [height, setHeight] = useState(0);
  const [gravity, setGravity] = useState(9.81);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const model = useMemo(() => projectileModel(speed, angle, height, gravity), [angle, gravity, height, speed]);
  const current = model.points.reduce(
    (closest, point) => (Math.abs(point.t - currentTime) < Math.abs(closest.t - currentTime) ? point : closest),
    model.points[0],
  );

  const reset = () => {
    setSpeed(18);
    setAngle(48);
    setHeight(0);
    setGravity(9.81);
    setCurrentTime(0);
    setPlaying(false);
  };

  useEffect(() => setCurrentTime((time) => clamp(time, 0, model.flightTime)), [model.flightTime]);
  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () => setCurrentTime((time) => (time >= model.flightTime ? 0 : Number((time + 0.03).toFixed(3)))),
      30,
    );
    return () => window.clearInterval(timer);
  }, [model.flightTime, playing]);

  const plot = { width: 720, height: 360, left: 42, right: 20, top: 20, bottom: 34 };
  const renderRange = Math.max(model.range, model.ux * model.renderFlightTime, 1);
  const xScale = (plot.width - plot.left - plot.right) / renderRange;
  const yScale = (plot.height - plot.top - plot.bottom) / Math.max(model.maxHeight, 1);
  const xMap = (x: number) => plot.left + x * xScale;
  const yMap = (y: number) => plot.height - plot.bottom - y * yScale;
  const trajectory = model.points
    .map((point, index) => `${index === 0 ? "M" : "L"}${xMap(point.x).toFixed(1)} ${yMap(point.y).toFixed(1)}`)
    .join(" ");
  // Illustrative-only scale: velocity (m/s) and gravity (m/s²) are drawn
  // with the same pixel-per-unit factor purely so both vectors stay
  // visible inside the plot. Their drawn lengths are NOT proportional
  // to each other's true relative magnitude — disclosed to the student
  // in the caption below rather than left implicit.
  const vectorScale = 2.5;

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-400/20 bg-slate-950 shadow-2xl shadow-violet-950/20">
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-6 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Two-dimensional laboratory</p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Projectile motion: two independent directions</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Horizontal velocity remains constant while gravity changes the vertical velocity. Scrub the trajectory and inspect both components.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-violet-400 hover:text-violet-300"
            aria-label="Reset projectile simulation"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </header>
      <div className="grid gap-6 p-5 lg:grid-cols-[260px_1fr] lg:p-8">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Launch controls</p>
            <div className="mt-5 space-y-5">
              <Slider label="Launch speed · u" value={speed} min={5} max={30} step={1} unit="m/s" onChange={setSpeed} />
              <Slider label="Launch angle · θ" value={angle} min={10} max={80} step={1} unit="°" onChange={setAngle} />
              <Slider label="Initial height" value={height} min={0} max={12} step={1} unit="m" onChange={setHeight} />
              <Slider label="Gravity · g" value={gravity} min={1} max={15} step={0.01} unit="m/s²" onChange={setGravity} />
            </div>
            <div className="mt-6 flex gap-2 border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-400 px-3 py-3 text-sm font-bold text-slate-950"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={reset} className="rounded-xl border border-slate-700 px-4 text-sm text-slate-300">
                Reset
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Component equations</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">x = u<sub>x</sub>t</p>
            <p className="text-sm leading-7 text-slate-200">y = u<sub>y</sub>t − ½gt²</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              u<sub>x</sub> = {round(model.ux)} m/s · u<sub>y</sub> = {round(model.uy)} m/s
            </p>
          </div>
        </aside>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Trajectory and vectors</p>
                <p className="mt-1 text-sm text-slate-400">The cyan vector is velocity; the violet vector is acceleration due to gravity.</p>
              </div>
              <strong className="text-violet-300">t = {round(currentTime)} s</strong>
            </div>
            <svg viewBox={`0 0 ${plot.width} ${plot.height}`} role="img" aria-label="Projectile trajectory graph" className="h-auto w-full rounded-xl bg-slate-950">
              <line x1={plot.left} x2={plot.width - plot.right} y1={plot.height - plot.bottom} y2={plot.height - plot.bottom} stroke="#52617c" />
              <line x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.height - plot.bottom} stroke="#52617c" />
              <path d={trajectory} fill="none" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
              <circle cx={xMap(current.x)} cy={yMap(current.y)} r="8" fill="#67e8f9" stroke="#0b1120" strokeWidth="4" />
              <line
                x1={xMap(current.x)}
                y1={yMap(current.y)}
                x2={xMap(current.x) + current.vx * vectorScale}
                y2={yMap(current.y) - current.vy * vectorScale}
                stroke="#67e8f9"
                strokeWidth="3"
              />
              <line
                x1={xMap(current.x)}
                y1={yMap(current.y)}
                x2={xMap(current.x)}
                y2={yMap(current.y) + gravity * vectorScale}
                stroke="#c084fc"
                strokeWidth="3"
              />
              <text x={plot.left} y={plot.height - 8} fill="#7f8ba3" fontSize="11">0 m</text>
              <text x={plot.width - plot.right} y={plot.height - 8} fill="#7f8ba3" fontSize="11" textAnchor="end">
                R = {round(model.range)} m
              </text>
              <text x={xMap(current.x) + current.vx * vectorScale + 6} y={yMap(current.y) - current.vy * vectorScale} fill="#67e8f9" fontSize="11">v</text>
              <text x={xMap(current.x) + 6} y={yMap(current.y) + gravity * vectorScale + 12} fill="#c084fc" fontSize="11">g</text>
            </svg>
            <p className="mt-2 text-xs text-slate-500">
              Vector lengths are drawn at the same illustrative scale so both stay visible — they are not to true relative scale between m/s and m/s².
            </p>
            <input
              className="mt-4 w-full accent-violet-400"
              type="range"
              min="0"
              max={model.flightTime}
              step="0.01"
              value={currentTime}
              onChange={(event) => setCurrentTime(Number(event.target.value))}
              aria-label="Scrub projectile time"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="text-xs text-slate-500">Position</span>
              <strong className="mt-1 block text-xl text-white">({round(current.x)}, {round(current.y)}) m</strong>
              <small className="text-slate-400">x, y</small>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <span className="text-xs text-slate-500">Velocity components</span>
              <strong className="mt-1 block text-xl text-cyan-300">({round(current.vx)}, {round(current.vy)})</strong>
              <small className="text-slate-400">vₓ, vᵧ in m/s</small>
            </div>
            <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-4">
              <span className="text-xs text-slate-500">Speed / acceleration</span>
              <strong className="mt-1 block text-xl text-violet-300">{round(current.speed)} m/s</strong>
              <small className="text-slate-400">a = {round(gravity)} m/s² downward</small>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <strong className="block text-violet-300">Time of flight</strong>
              <span>{round(model.flightTime)} s</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <strong className="block text-violet-300">Maximum height</strong>
              <span>{round(model.maxHeight)} m</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
              <strong className="block text-violet-300">Horizontal range</strong>
              <span>{round(model.range)} m</span>
            </div>
          </div>
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-4 text-sm leading-6 text-slate-300">
            <strong className="text-violet-300">Gravity does not disappear at the apex.</strong> At the highest point, vertical velocity is zero, but vertical acceleration remains −g = −{round(gravity)} m/s²: downward throughout the ideal flight.
          </div>
        </div>
      </div>
    </section>
  );
}
