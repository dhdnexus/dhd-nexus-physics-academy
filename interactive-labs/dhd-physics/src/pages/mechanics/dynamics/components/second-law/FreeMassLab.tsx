import { useEffect, useMemo, useState } from "react";
import ForceDiagram from "../../shared/ForceDiagram";
import { resultant, round, type PhysicsVector } from "../../shared/forceMath";
import KinematicsGraph from "../../../kinematics/shared/KinematicsGraph";
import { sampleConstantAcceleration } from "../../../kinematics/shared/kinematicsMath";

export default function FreeMassLab() {
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(20);
  const [angle, setAngle] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const forces: PhysicsVector[] = [
    { id: "F", name: "Applied", magnitude: force, angleDegrees: angle, color: "#a78bfa" },
  ];
  const result = useMemo(() => resultant(forces), [force, angle]);
  const acceleration = result.magnitude / mass;
  const duration = 6;
  const points = useMemo(() => sampleConstantAcceleration(0, acceleration, duration), [acceleration]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const dt = (now - previous) / 1000;
      previous = now;
      setTime((current) => {
        const next = current + dt;
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return (
    <div className="space-y-4">
      <div className="grid gap-5 lg:grid-cols-[1fr_250px]">
        <ForceDiagram
          forces={forces}
          onChange={(next) => {
            const updated = next[0];
            setForce(updated.magnitude);
            setAngle(updated.angleDegrees);
          }}
          label="Interactive free-mass force diagram"
        />
        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <label className="block text-sm text-slate-300">Mass <strong className="float-right text-violet-300">{round(mass)} kg</strong>
            <input className="mt-2 w-full accent-violet-400" type="range" min="1" max="20" step="0.5" value={mass} onChange={(e) => setMass(+e.target.value)} />
          </label>
          <label className="block text-sm text-slate-300">Force <strong className="float-right text-violet-300">{round(force)} N</strong>
            <input className="mt-2 w-full accent-violet-400" type="range" min="0" max="60" step="1" value={force} onChange={(e) => setForce(+e.target.value)} />
          </label>
          <label className="block text-sm text-slate-300">Angle <strong className="float-right text-violet-300">{round(angle)}°</strong>
            <input className="mt-2 w-full accent-violet-400" type="range" min="-90" max="90" step="1" value={angle} onChange={(e) => setAngle(+e.target.value)} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setTime(0); setPlaying(true); }} className="rounded-xl bg-violet-400 px-3 py-2 text-sm font-bold text-slate-950">Play</button>
            <button onClick={() => setPlaying(false)} className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-bold text-slate-200">Pause</button>
          </div>
          <button onClick={() => { setTime(0); setPlaying(false); }} className="w-full rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300">Reset time</button>
        </aside>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 p-4"><span className="text-xs text-slate-500">ΣF</span><strong className="block text-xl text-violet-300">{round(result.magnitude)} N</strong></div>
        <div className="rounded-xl border border-slate-800 p-4"><span className="text-xs text-slate-500">Acceleration</span><strong className="block text-xl text-cyan-300">{round(acceleration)} m/s²</strong></div>
        <div className="rounded-xl border border-slate-800 p-4"><span className="text-xs text-slate-500">Current time</span><strong className="block text-xl text-white">{round(time)} s</strong></div>
      </div>
      <KinematicsGraph kind="velocity" points={points} currentTime={time} showSlope />
    </div>
  );
}
