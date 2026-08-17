import "./marimo-lab-launch.css";

import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Play } from "lucide-react";

import { useMarimoLab } from "../../../../../hooks/useMarimoLab";

/**
 * DHD Nexus Physics Academy
 * Milestone B9.4.3 — React Integration
 *
 * Upgraded from B9.3: this card no longer talks to localhost directly
 * or embeds anything in an iframe. It links to the dedicated
 * full-screen lab route (/mechanics/kinematics/displacement/lab),
 * which itself resolves -- via useMarimoLab() -- to either the
 * browser-native WASM export (students, default, no backend) or the
 * local Marimo server (authoring, opt-in). This component doesn't
 * need to know which; that's the point of the abstraction.
 */

const LEARNING_OBJECTIVES = [
  "Identify the reference frame for a motion: origin, positive direction, and units.",
  "Distinguish an object's position, r, from its displacement, Δr = r_f − r_i.",
  "Calculate signed displacement from an initial and a final position.",
  "Distinguish displacement from distance travelled.",
  "Explain return-to-origin motion using displacement and distance.",
];

export default function MarimoLabLaunch() {
  const { mode, status } = useMarimoLab();

  const statusIcon =
    status === "ready" || status === "running" ? (
      <CheckCircle2 size={18} color="#16A34A" />
    ) : (
      <Clock size={18} color="#D97706" />
    );

  const statusText =
    mode === "wasm"
      ? "Ready — runs in your browser, no install required"
      : status === "running"
      ? "Local Marimo server running"
      : status === "checking"
      ? "Checking local server..."
      : "Local Marimo — launch required";

  return (
    <section className="mll-card" aria-labelledby="mll-heading">
      <div className="mll-header">
        <span className="mll-eyebrow">Computational companion</span>

        <h2 id="mll-heading" className="mll-title">
          Interactive Computational Lab
        </h2>

        <p className="mll-overview">
          The Displacement Explorer above teaches the concept visually.
          The Marimo lab lets you experiment computationally with the
          same displacement mathematics from the Python calculator
          layer — no duplicated physics, just a different way to
          explore it.
        </p>
      </div>

      <div className="mll-status-row">
        {statusIcon}
        <strong>{statusText}</strong>
      </div>

      <div className="mll-objectives">
        <h3 className="mll-objectives-heading">Learning objectives</h3>

        <ul>
          {LEARNING_OBJECTIVES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <Link
        to="/mechanics/kinematics/displacement/lab"
        className="mll-launch-button"
      >
        <Play size={16} />
        Open Interactive Computational Lab
      </Link>
    </section>
  );
}
