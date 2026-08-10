import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import KinematicsGraph from "../shared/KinematicsGraph";
import { clamp, findNearestPoint, round, sampleConstantAcceleration } from "../shared/kinematicsMath";

type Scenario = "rest" | "constant-velocity" | "constant-acceleration" | "turning-point";

const SCENARIOS: Record<Scenario, { title: string; description: string; u: number; a: number; duration: number }> = {
  rest: { title: "Constant position", description: "Zero slope on x–t means zero velocity.", u: 0, a: 0, duration: 8 },
  "constant-velocity": { title: "Constant velocity", description: "A straight x–t line has a constant gradient.", u: 2, a: 0, duration: 8 },
  "constant-acceleration": { title: "Constant acceleration", description: "The gradient of v–t is constant, so x–t curves.", u: 0, a: 1.5, duration: 8 },
  "turning-point": { title: "Turning point", description: "Velocity crosses zero, so position reaches a maximum.", u: 4, a: -1, duration: 8 },
};

export default function MotionGraphsExplorer() {
  const [scenario, setScenario] = useState<Scenario>("constant-acceleration");
  const [currentTime, setCurrentTime] = useState(3);
  const [playing, setPlaying] = useState(false);
  const model = SCENARIOS[scenario];
  const points = useMemo(() => sampleConstantAcceleration(model.u, model.a, model.duration, 0), [model]);
  const current = findNearestPoint(points, currentTime);
  const deltaV = current.v - model.u;
  const reset = () => {
    setScenario("constant-acceleration");
    setCurrentTime(0);
    setPlaying(false);
  };

  useEffect(() => setCurrentTime((time) => clamp(time, 0, model.duration)), [model.duration]);
  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(
      () => setCurrentTime((time) => (time >= model.duration ? 0 : Number((time + 0.05).toFixed(2)))),
      50,
    );
    return () => window.clearInterval(timer);
  }, [model.duration, playing]);

  return (
    <section className="overflow-hidden rounded-3xl border border-amber-400/20 bg-slate-950 shadow-2xl shadow-amber-950/20">
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-6 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Graph literacy lab</p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">One motion, three connected graphs</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Choose a motion scenario and trace the chain: position–time slope gives velocity; velocity–time slope gives acceleration.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-amber-400 hover:text-amber-300"
            aria-label="Reset motion graphs simulation"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </header>
      <div className="grid gap-6 p-5 lg:grid-cols-[260px_1fr] lg:p-8">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Motion scenarios</p>
            <div className="mt-4 space-y-2">
              {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setScenario(key);
                    setCurrentTime(0);
                  }}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    scenario === key ? "border-amber-300 bg-amber-300/10 text-amber-200" : "border-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <strong className="block text-sm">{SCENARIOS[key].title}</strong>
                  <span className="mt-1 block text-xs text-slate-500">{SCENARIOS[key].description}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 flex gap-2 border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-300 px-3 py-3 text-sm font-bold text-slate-950"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={reset} className="rounded-xl border border-slate-700 px-4 text-sm text-slate-300">
                Reset
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-300/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Live interpretation</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              At <strong className="text-white">t = {round(current.t)} s</strong>, x = {round(current.x)} m, v = {round(current.v)} m/s, and a = {round(current.a)} m/s².
            </p>
          </div>
        </aside>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Synchronized time</p>
                <p className="mt-1 text-sm text-slate-300">Drag the marker to inspect the same instant in every graph.</p>
              </div>
              <strong className="text-amber-300">t = {round(currentTime)} s</strong>
            </div>
            <input
              className="mt-5 w-full accent-amber-300"
              type="range"
              min="0"
              max={model.duration}
              step="0.1"
              value={currentTime}
              onChange={(event) => setCurrentTime(Number(event.target.value))}
              aria-label="Scrub motion graph time"
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <KinematicsGraph kind="position" points={points} currentTime={currentTime} color="#58a6ff" showSlope />
            <KinematicsGraph kind="velocity" points={points} currentTime={currentTime} color="#f5c84c" showSlope showArea />
            <KinematicsGraph kind="acceleration" points={points} currentTime={currentTime} color="#9b7cff" showArea />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-4 text-sm text-slate-300">
              <strong className="block text-blue-300">Slope of x–t</strong>
              <span>velocity = {round(current.v)} m/s</span>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-300/5 p-4 text-sm text-slate-300">
              <strong className="block text-amber-300">Slope of v–t</strong>
              <span>acceleration = {round(current.a)} m/s²</span>
            </div>
            <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-4 text-sm text-slate-300">
              <strong className="block text-violet-300">Area under v–t</strong>
              <span>displacement = {round(current.x)} m</span>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-slate-300">
              <strong className="block text-emerald-300">Area under a–t</strong>
              <span>Δv = {round(deltaV)} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
