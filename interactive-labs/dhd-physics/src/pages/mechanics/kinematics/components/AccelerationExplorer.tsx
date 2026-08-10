import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import KinematicsGraph from "../shared/KinematicsGraph";
import {
  accelerationMeaning,
  clamp,
  findNearestPoint,
  round,
  sampleConstantAcceleration,
} from "../shared/kinematicsMath";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
};

function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  return (
    <label className="block space-y-2">
      <span className="flex justify-between gap-3 text-sm text-slate-300">
        <span>{label}</span>
        <strong className="text-cyan-300">
          {round(value)} {unit}
        </strong>
      </span>
      <input
        className="w-full accent-cyan-400"
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

export default function AccelerationExplorer() {
  const [initialVelocity, setInitialVelocity] = useState(3);
  const [acceleration, setAcceleration] = useState(-1);
  const [duration, setDuration] = useState(8);
  const [currentTime, setCurrentTime] = useState(2.5);
  const [playing, setPlaying] = useState(false);

  const points = useMemo(
    () => sampleConstantAcceleration(initialVelocity, acceleration, duration, 0),
    [acceleration, duration, initialVelocity],
  );
  const current = findNearestPoint(points, currentTime);
  const deltaVelocity = current.v - initialVelocity;
  const averageAcceleration = current.t > 0 ? deltaVelocity / current.t : acceleration;

  const reset = () => {
    setInitialVelocity(3);
    setAcceleration(-1);
    setDuration(8);
    setCurrentTime(0);
    setPlaying(false);
  };

  useEffect(() => {
    setCurrentTime((time) => clamp(time, 0, duration));
  }, [duration]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setCurrentTime((time) => (time >= duration ? 0 : Number((time + 0.05).toFixed(2))));
    }, 50);
    return () => window.clearInterval(timer);
  }, [duration, playing]);

  // The "motion model" track is a real signed number line: its ends are
  // the minimum and maximum position reached anywhere in the observed
  // interval (not just t = 0 and t = duration), so the marker moves by
  // actual displacement rather than by elapsed-time fraction. This
  // matters whenever acceleration opposes the initial velocity: the
  // object slows, stops, and can reverse direction within the window.
  const positions = points.map((point) => point.x);
  const minX = Math.min(...positions, 0);
  const maxX = Math.max(...positions, 0);
  const spanX = maxX - minX || 1;
  const trackPercent = clamp(((current.x - minX) / spanX) * 76 + 12, 12, 88);

  let ratioLabel =
    currentTime > 0.05
      ? `${round(acceleration)} = ${round(deltaVelocity)} / ${round(currentTime)}`
      : `${round(acceleration)} m/s² — at t = 0 s, Δv is still 0. Drag the scrubber forward to see the ratio settle at a.`;

  ratioLabel = current.t > 0
    ? `Average acceleration over 0 to ${round(current.t)} s: Δv / Δt = ${round(deltaVelocity)} / ${round(current.t)} = ${round(averageAcceleration)} m/s².`
    : `At t = 0 s, Δv / Δt is not a finite-interval quotient. In this constant-acceleration model, the instantaneous acceleration is a = ${round(acceleration)} m/s².`;

  return (
    <section className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950 shadow-2xl shadow-cyan-950/20">
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-6 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Concept lab · acceleration</p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Acceleration is a change in velocity</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Change the direction and magnitude of acceleration. Watch velocity respond—even when the object is slowing down.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Reset acceleration simulation"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </header>
      <div className="grid gap-6 p-5 lg:grid-cols-[270px_1fr] lg:p-8">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Experiment controls</p>
            <div className="mt-5 space-y-5">
              <Slider label="Initial velocity · u" value={initialVelocity} min={-6} max={6} step={0.5} unit="m/s" onChange={setInitialVelocity} />
              <Slider label="Acceleration · a" value={acceleration} min={-3} max={3} step={0.5} unit="m/s²" onChange={setAcceleration} />
              <Slider label="Observation time · t" value={duration} min={2} max={12} step={0.5} unit="s" onChange={setDuration} />
            </div>
            <div className="mt-6 flex gap-2 border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-3 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={reset} className="rounded-xl border border-slate-700 px-4 text-sm text-slate-300 hover:border-slate-500">
                Reset
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Core relationship</p>
            <p className="mt-3 text-2xl font-serif italic text-white">a = Δv / Δt</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{ratioLabel}</p>
          </div>
        </aside>
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="text-xs text-slate-500">Current velocity</span>
              <strong className="mt-1 block text-2xl text-cyan-300">{round(current.v)} m/s</strong>
              <small className="text-slate-400">direction-aware</small>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="text-xs text-slate-500">Velocity change</span>
              <strong className="mt-1 block text-2xl text-amber-300">{round(deltaVelocity)} m/s</strong>
              <small className="text-slate-400">from t = 0</small>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <span className="text-xs text-slate-500">At current time</span>
              <strong className="mt-1 block text-2xl text-violet-300">{round(current.t)} s</strong>
              <small className="text-slate-400">{accelerationMeaning(initialVelocity, acceleration)}</small>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Position on the number line</span>
              <span className="text-xs text-cyan-300">t = {round(currentTime)} s</span>
            </div>
            <div className="relative h-20 overflow-hidden rounded-xl bg-slate-950">
              <div className="absolute inset-x-4 top-1/2 h-px bg-slate-700" />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_8px_rgba(103,232,249,0.3)]"
                style={{ left: `${trackPercent}%` }}
              />
              <div className="absolute left-4 top-3 text-xs text-slate-500">x = {round(minX)} m</div>
              <div className="absolute right-4 top-3 text-xs text-slate-500">x = {round(maxX)} m</div>
            </div>
            <label className="mt-3 block">
              <span className="sr-only">Scrub acceleration time</span>
              <input
                className="w-full accent-cyan-400"
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={(event) => setCurrentTime(Number(event.target.value))}
              />
            </label>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <KinematicsGraph kind="position" points={points} currentTime={currentTime} color="#58a6ff" showSlope />
            <KinematicsGraph kind="velocity" points={points} currentTime={currentTime} color="#f5c84c" showSlope showArea />
            <KinematicsGraph kind="acceleration" points={points} currentTime={currentTime} color="#9b7cff" showArea />
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-6 text-slate-300">
            <strong className="text-cyan-300">Interpretation: </strong>
            {accelerationMeaning(initialVelocity, acceleration)} The velocity–time graph changes by the signed area under the acceleration–time graph.
          </div>
        </div>
      </div>
    </section>
  );
}
