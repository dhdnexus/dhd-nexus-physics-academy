import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import "./kinematics-explorer.css";

type LabMode = "displacement" | "velocity" | "suvat";
type GraphKind = "position" | "velocity" | "acceleration";
type RouteKind = "direct" | "detour" | "return";

type KinematicsExplorerProps = {
  mode: LabMode;
};

type Point = { t: number; x: number; v: number; a: number };

const MODE_COPY: Record<LabMode, { eyebrow: string; title: string; description: string }> = {
  displacement: {
    eyebrow: "Concept lab · 01",
    title: "Displacement explorer",
    description: "Separate the path travelled from the straight-line change in position.",
  },
  velocity: {
    eyebrow: "Concept lab · 02",
    title: "Velocity explorer",
    description: "See how velocity is the slope of position and the direction of motion.",
  },
  suvat: {
    eyebrow: "Equation lab · 03",
    title: "SUVAT equation lab",
    description: "Change the known quantities and watch the motion, graphs, and equation solve together.",
  },
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const format = (value: number, digits = 1) => Number(value.toFixed(digits));
const signed = (value: number, unit: string) => `${value >= 0 ? "+" : "−"}${Math.abs(format(value))} ${unit}`;

function solveEquation(mode: LabMode, u: number, a: number, t: number, displacement: number) {
  if (mode === "velocity") return { formula: "v = u + at", value: u + a * t, label: "final velocity", unit: "m/s" };
  if (mode === "displacement") return { formula: "Δx = x₂ − x₁", value: displacement, label: "displacement", unit: "m" };
  return { formula: "Δx = ut + ½at²", value: u * t + 0.5 * a * t * t, label: "displacement", unit: "m" };
}

function Slider({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return (
    <label className="ke-slider-row">
      <span className="ke-slider-label"><span>{label}</span><strong>{format(value)} {unit}</strong></span>
      <input aria-label={`${label} in ${unit}`} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span className="ke-slider-scale"><span>{min} {unit}</span><span>{max} {unit}</span></span>
    </label>
  );
}

function Graph({ kind, points, currentTime, accent }: { kind: GraphKind; points: Point[]; currentTime: number; accent: string }) {
  const width = 420;
  const height = 148;
  const pad = { left: 30, right: 12, top: 20, bottom: 24 };
  const values = points.map((point) => point[kind === "position" ? "x" : kind === "velocity" ? "v" : "a"]);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const span = max - min || 1;
  const endTime = points[points.length - 1]?.t || 1;
  const xMap = (t: number) => pad.left + (t / endTime) * (width - pad.left - pad.right);
  const yMap = (value: number) => pad.top + (1 - (value - min) / span) * (height - pad.top - pad.bottom);
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${xMap(point.t).toFixed(1)} ${yMap(point[kind === "position" ? "x" : kind === "velocity" ? "v" : "a"]).toFixed(1)}`).join(" ");
  const current = points.reduce((closest, point) => Math.abs(point.t - currentTime) < Math.abs(closest.t - currentTime) ? point : closest, points[0]);
  const currentValue = current?.[kind === "position" ? "x" : kind === "velocity" ? "v" : "a"] ?? 0;
  const title = kind === "position" ? "position–time" : kind === "velocity" ? "velocity–time" : "acceleration–time";
  const unit = kind === "position" ? "x (m)" : kind === "velocity" ? "v (m/s)" : "a (m/s²)";

  return (
    <div className="ke-graph-card">
      <div className="ke-graph-heading"><span>{title}</span><b style={{ color: accent }}>{format(currentValue)} {kind === "position" ? "m" : kind === "velocity" ? "m/s" : "m/s²"}</b></div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title} graph`} className="ke-graph">
        {[0, 1, 2, 3].map((line) => { const y = pad.top + line * ((height - pad.top - pad.bottom) / 3); return <line key={line} x1={pad.left} x2={width - pad.right} y1={y} y2={y} className="ke-grid" />; })}
        <line x1={pad.left} x2={pad.left} y1={pad.top} y2={height - pad.bottom} className="ke-axis" />
        <line x1={pad.left} x2={width - pad.right} y1={height - pad.bottom} y2={height - pad.bottom} className="ke-axis" />
        <text x={pad.left} y={12} className="ke-axis-label">{unit}</text>
        <text x={width - pad.right - 8} y={height - 6} className="ke-axis-label">t (s)</text>
        <path d={path} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <line x1={xMap(currentTime)} x2={xMap(currentTime)} y1={pad.top} y2={height - pad.bottom} className="ke-scrub-line" />
        <circle cx={xMap(current?.t ?? 0)} cy={yMap(currentValue)} r="5" fill={accent} stroke="#0b1120" strokeWidth="3" />
        <g transform={`translate(${clamp(xMap(current?.t ?? 0) + 7, 8, width - 80)}, ${clamp(yMap(currentValue) - 26, 18, height - 42)})`}>
          <rect width="68" height="22" rx="11" fill={accent} />
          <text x="34" y="15" textAnchor="middle" className="ke-marker-text">{kind === "position" ? "Δx" : kind === "velocity" ? "v(t)" : "a"}</text>
        </g>
      </svg>
    </div>
  );
}

function MotionTrack({ points, currentTime, onTimeChange, route, displacement }: { points: Point[]; currentTime: number; onTimeChange: (time: number) => void; route: RouteKind; displacement: number }) {
  const progress = points[points.length - 1]?.t ? currentTime / points[points.length - 1].t : 0;
  const marker = 13 + progress * 74;
  return (
    <div className="ke-motion-card">
      <div className="ke-motion-heading"><span>Motion track</span><span className="ke-live"><i /> LIVE MODEL</span></div>
      <div className="ke-track" aria-label="Animated motion track">
        <div className="ke-track-line" />
        <div className="ke-track-route" data-route={route} />
        <div className="ke-track-marker" style={{ left: `${marker}%` }}><span>●</span></div>
        <span className="ke-track-label ke-track-start">x₀</span><span className="ke-track-label ke-track-end">x₀ {displacement >= 0 ? "+" : "−"} |Δx|</span>
      </div>
      <label className="ke-scrubber"><span>t = {format(currentTime)} s</span><input aria-label="Scrub time" type="range" min="0" max={points[points.length - 1]?.t || 1} step="0.1" value={currentTime} onChange={(event) => onTimeChange(Number(event.target.value))} /></label>
    </div>
  );
}

export default function KinematicsExplorer({ mode }: KinematicsExplorerProps) {
  const [initialVelocity, setInitialVelocity] = useState(2);
  const [acceleration, setAcceleration] = useState(1);
  const [duration, setDuration] = useState(5);
  const [start, setStart] = useState(-4);
  const [finish, setFinish] = useState(6);
  const [route, setRoute] = useState<RouteKind>("direct");
  const [currentTime, setCurrentTime] = useState(2.1);
  const [playing, setPlaying] = useState(false);
  const [activeGraph, setActiveGraph] = useState<GraphKind>(mode === "displacement" ? "position" : mode === "velocity" ? "velocity" : "position");

  const effectiveDuration = mode === "displacement" ? 5 : duration;
  const displacement = mode === "displacement" ? finish - start : initialVelocity * duration + 0.5 * acceleration * duration * duration;
  const distance = mode === "displacement" ? Math.abs(displacement) + (route === "detour" ? 6 : route === "return" ? 8 : 0) : Math.abs(displacement);
  const points = useMemo<Point[]>(() => Array.from({ length: 41 }, (_, index) => { const t = (effectiveDuration * index) / 40; return { t, x: mode === "displacement" ? start + (finish - start) * (t / effectiveDuration) : initialVelocity * t + 0.5 * acceleration * t * t, v: mode === "displacement" ? (finish - start) / effectiveDuration : initialVelocity + acceleration * t, a: mode === "displacement" ? 0 : acceleration }; }), [acceleration, effectiveDuration, finish, initialVelocity, mode, start]);
  const solved = solveEquation(mode, initialVelocity, acceleration, duration, displacement);
  const current = points.reduce((closest, point) => Math.abs(point.t - currentTime) < Math.abs(closest.t - currentTime) ? point : closest, points[0]);

  useEffect(() => { setCurrentTime((value) => clamp(value, 0, effectiveDuration)); }, [effectiveDuration]);
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setCurrentTime((value) => value >= effectiveDuration ? 0 : Number((value + 0.05).toFixed(2))), 50); return () => window.clearInterval(timer); }, [effectiveDuration, playing]);

  const reset = () => { setInitialVelocity(2); setAcceleration(1); setDuration(5); setStart(-4); setFinish(6); setRoute("direct"); setCurrentTime(0); setPlaying(false); };
  const copy = MODE_COPY[mode];
  const accent = mode === "displacement" ? "#f5c84c" : mode === "velocity" ? "#58a6ff" : "#9b7cff";
  const graphKinds: GraphKind[] = mode === "displacement" ? ["position"] : ["position", "velocity", "acceleration"];

  return (
    <section className="ke-shell" style={{ "--ke-accent": accent } as CSSProperties}>
      <div className="ke-topbar"><div><span className="ke-eyebrow">{copy.eyebrow}</span><h2>{copy.title}</h2><p>{copy.description}</p></div><div className="ke-top-actions"><span className="ke-status"><i /> Simulation ready</span><button type="button" className="ke-icon-button" onClick={reset} aria-label="Reset simulation"><RotateCcw size={16} /></button></div></div>
      <div className="ke-layout">
        <div className="ke-controls-column">
          <div className="ke-equation-card"><span className="ke-card-kicker">LIVE EQUATION</span><div className="ke-equation">{mode === "displacement" ? "Δx = x₂ − x₁" : mode === "velocity" ? "v = u + at" : "Δx = ut + ½at²"}</div><p>{format(solved.value)} <span>{solved.unit}</span></p><div className="ke-substitution">{mode === "displacement" ? `${format(finish)} − (${format(start)})` : mode === "velocity" ? `${format(initialVelocity)} + (${format(acceleration)} × ${format(duration)})` : `${format(initialVelocity)} × ${format(duration)} + ½ × ${format(acceleration)} × ${format(duration)}²`}</div></div>
          <div className="ke-control-card"><div className="ke-card-header"><span>Experiment controls</span><Sparkles size={15} /></div>
            {mode === "displacement" ? <><Slider label="Start position" value={start} min={-10} max={4} step={1} unit="m" onChange={setStart} /><Slider label="Final position" value={finish} min={-4} max={10} step={1} unit="m" onChange={setFinish} /><label className="ke-select-row"><span>Path taken</span><select value={route} onChange={(event) => setRoute(event.target.value as RouteKind)}><option value="direct">Direct path</option><option value="detour">Detour path</option><option value="return">Overshoot and return</option></select></label></> : <><Slider label="Initial velocity · u" value={initialVelocity} min={-4} max={8} step={0.5} unit="m/s" onChange={setInitialVelocity} /><Slider label="Acceleration · a" value={acceleration} min={-3} max={4} step={0.5} unit="m/s²" onChange={setAcceleration} /><Slider label="Time · t" value={duration} min={1} max={10} step={0.5} unit="s" onChange={setDuration} /></>}
            <div className="ke-control-divider" /><div className="ke-button-row"><button type="button" className="ke-primary-button" onClick={() => setPlaying((value) => !value)}>{playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play motion"}</button><button type="button" className="ke-secondary-button" onClick={reset}>Reset</button></div>
          </div>
          <div className="ke-reading-grid"><div><span>At current time</span><strong>{format(current?.x ?? 0)} m</strong><small>position</small></div><div><span>Velocity</span><strong>{format(current?.v ?? 0)} m/s</strong><small>direction-aware</small></div><div><span>Acceleration</span><strong>{format(current?.a ?? 0)} m/s²</strong><small>constant model</small></div></div>
        </div>
        <div className="ke-visual-column">
          <MotionTrack points={points} currentTime={currentTime} onTimeChange={setCurrentTime} route={route} displacement={displacement} />
          <div className="ke-graph-toolbar"><div><span className="ke-card-kicker">SYNCHRONIZED GRAPHS</span><p>Drag the time marker or play the model to connect the graphs.</p></div><div className="ke-graph-tabs">{graphKinds.map((kind) => <button type="button" key={kind} className={activeGraph === kind ? "is-active" : ""} onClick={() => setActiveGraph(kind)}>{kind === "position" ? "x–t" : kind === "velocity" ? "v–t" : "a–t"}</button>)}</div></div>
          <div className={`ke-graphs ${mode === "displacement" ? "ke-graphs-single" : ""}`}>{graphKinds.map((kind) => <Graph key={kind} kind={kind} points={points} currentTime={currentTime} accent={kind === activeGraph ? accent : "#718096"} />)}</div>
          <div className="ke-insight"><span className="ke-insight-mark">i</span><p><strong>{mode === "displacement" ? "Distance is path-dependent; displacement is not." : mode === "velocity" ? "Velocity is the gradient of the position–time graph." : "One constant-acceleration model powers every panel."}</strong> {mode === "displacement" ? `This route travels ${format(distance)} m, but the vector change is ${signed(displacement, "m")}.` : `At t = ${format(currentTime)} s, the model predicts ${format(current?.v ?? 0)} m/s.`}</p></div>
        </div>
      </div>
    </section>
  );
}
