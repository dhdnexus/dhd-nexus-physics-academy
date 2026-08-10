import { useState } from "react";
import ForceDiagram from "../../shared/ForceDiagram";
import { atwoodAcceleration, atwoodTension, round } from "../../shared/forceMath";

export default function AtwoodLab() {
  const [m1, setM1] = useState(3);
  const [m2, setM2] = useState(6);
  const g = 9.81;
  const aSigned = atwoodAcceleration(m1, m2, g);
  const acceleration = Math.abs(aSigned);
  const tension = atwoodTension(m1, m2, g);
  const heavierIsM2 = m2 >= m1;

  const body1Forces = [
    { id: "t1", name: "T", magnitude: tension, angleDegrees: 90, color: "#67e8f9" },
    { id: "w1", name: "W₁", magnitude: m1 * g, angleDegrees: -90, color: "#fb7185" },
  ];
  const body2Forces = [
    { id: "t2", name: "T", magnitude: tension, angleDegrees: 90, color: "#67e8f9" },
    { id: "w2", name: "W₂", magnitude: m2 * g, angleDegrees: -90, color: "#fb7185" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-violet-300">Body 1 FBD</p>
          <ForceDiagram forces={body1Forces} readonly label="Free-body diagram for mass one" />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-cyan-300">Body 2 FBD</p>
          <ForceDiagram forces={body2Forces} readonly label="Free-body diagram for mass two" />
        </div>
      </div>
      <aside className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-300">m₁ <strong className="float-right text-violet-300">{m1} kg</strong>
            <input className="mt-2 w-full accent-violet-400" type="range" min="1" max="15" step="1" value={m1} onChange={(e) => setM1(+e.target.value)} />
          </label>
          <label className="text-sm text-slate-300">m₂ <strong className="float-right text-cyan-300">{m2} kg</strong>
            <input className="mt-2 w-full accent-cyan-400" type="range" min="1" max="15" step="1" value={m2} onChange={(e) => setM2(+e.target.value)} />
          </label>
        </div>
        <div className="border-t border-slate-800 pt-4 text-sm text-slate-300">
          <p>Shared acceleration <strong className="text-cyan-300">{round(acceleration)} m/s²</strong> toward {heavierIsM2 ? "m₂" : "m₁"}</p>
          <p className="mt-2">Tension <strong className="text-amber-300">{round(tension)} N</strong></p>
          <p className="mt-3 text-xs text-slate-500">Ideal massless string and frictionless massless pulley are assumed.</p>
        </div>
      </aside>
    </div>
  );
}
