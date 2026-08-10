import { useId, useRef, useState, type PointerEvent } from "react";
import type { PhysicsVector } from "./forceMath";
import { round, components } from "./forceMath";

type Props = {
  forces: PhysicsVector[];
  onChange?: (forces: PhysicsVector[]) => void;
  surfaceAngleDeg?: number;
  showComponents?: boolean;
  readonly?: boolean;
  label?: string;
};

const W = 560;
const H = 300;
const CX = 280;
const CY = 155;
const SCALE = 3.2;

const point = (magnitude: number, angleDegrees: number) => {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: CX + magnitude * SCALE * Math.cos(radians),
    y: CY - magnitude * SCALE * Math.sin(radians),
  };
};

export default function ForceDiagram({
  forces,
  onChange,
  surfaceAngleDeg = 0,
  showComponents = false,
  readonly = false,
  label = "Free-body diagram",
}: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<string | null>(null);
  const markerId = `dyn-arrow-${useId().replace(/:/g, "")}`;

  const move = (event: PointerEvent<SVGSVGElement>) => {
    if (!drag || readonly || !onChange || !svg.current) return;
    const rect = svg.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * W) / rect.width;
    const y = ((event.clientY - rect.top) * H) / rect.height;
    const dx = (x - CX) / SCALE;
    const dy = (CY - y) / SCALE;
    const magnitude = Math.min(80, Math.hypot(dx, dy));
    const angleDegrees = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;

    onChange(
      forces.map((force) =>
        force.id === drag ? { ...force, magnitude, angleDegrees } : force,
      ),
    );
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">
          {label}
        </span>
        <span className="text-[11px] text-slate-500">Arrow length is visual scale</span>
      </div>

      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none"
        role="img"
        aria-label={label}
        onPointerMove={move}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <g transform={`rotate(${-surfaceAngleDeg} ${CX} ${CY})`}>
          <line x1="65" x2="495" y1={CY} y2={CY} stroke="#334155" />
          <line x1={CX} x2={CX} y1="35" y2="275" stroke="#334155" />
          {surfaceAngleDeg !== 0 && (
            <line
              x1="100"
              y1={CY}
              x2="460"
              y2={CY + Math.tan((surfaceAngleDeg * Math.PI) / 180) * 360}
              stroke="#64748b"
              strokeWidth="10"
              strokeLinecap="round"
            />
          )}
        </g>

        {forces.map((force) => {
          const p = point(force.magnitude, force.angleDegrees);
          const color = force.color || "#67e8f9";
          const vectorComponents = components(force);
          const theta = (surfaceAngleDeg * Math.PI) / 180;
          const localParallel = vectorComponents.x * Math.cos(theta) + vectorComponents.y * Math.sin(theta);
          const localPerpendicular = -vectorComponents.x * Math.sin(theta) + vectorComponents.y * Math.cos(theta);
          const parallelX = localParallel * Math.cos(theta);
          const parallelY = localParallel * Math.sin(theta);
          const perpendicularX = -localPerpendicular * Math.sin(theta);
          const perpendicularY = localPerpendicular * Math.cos(theta);
          const parallelPoint = { x: CX + parallelX * SCALE, y: CY - parallelY * SCALE };
          const perpendicularPoint = { x: CX + (parallelX + perpendicularX) * SCALE, y: CY - (parallelY + perpendicularY) * SCALE };

          return (
            <g key={force.id} style={{ color }}>
              <line
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth="4"
                markerEnd={`url(#${markerId})`}
                opacity=".95"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="9"
                fill="currentColor"
                opacity={readonly ? 0.35 : 1}
                onPointerDown={(event) => {
                  if (readonly || !onChange) return;
                  event.stopPropagation();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setDrag(force.id);
                }}
              />
              <text
                x={p.x + (p.x >= CX ? 10 : -10)}
                y={p.y - 10}
                fill="currentColor"
                fontSize="13"
                textAnchor={p.x >= CX ? "start" : "end"}
              >
                {force.name} {round(force.magnitude)} N
              </text>

              {showComponents && (
                <>
                  <line x1={CX} y1={CY} x2={parallelPoint.x} y2={parallelPoint.y} stroke="currentColor" strokeDasharray="5 5" opacity=".5" />
                  <line x1={parallelPoint.x} y1={parallelPoint.y} x2={perpendicularPoint.x} y2={perpendicularPoint.y} stroke="currentColor" strokeDasharray="5 5" opacity=".5" />
                  <text x={parallelPoint.x + 6} y={parallelPoint.y - 6} fill="currentColor" fontSize="11" opacity=".85">parallel</text>
                  <text x={perpendicularPoint.x + 6} y={perpendicularPoint.y + 12} fill="currentColor" fontSize="11" opacity=".85">perpendicular</text>
                </>
              )}
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r="18" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
        <text x={CX} y={CY + 4} fill="#e2e8f0" fontSize="11" textAnchor="middle">m</text>
      </svg>
    </div>
  );
}
