import "./marimo-lab-launch.css";

import { CheckCircle2, Clock, RefreshCw, Play } from "lucide-react";

import { useMarimoSession } from "../../../../../context/MarimoSessionContext";
import { launchMarimo } from "../../../../../services/marimoLauncher";

/**
 * DHD Nexus Physics Academy
 * Milestone B9.3
 * Bidirectional Launch & Session Management
 */

const LAUNCH_COMMAND =
  "marimo run marimo-notebooks/mechanics/kinematics/lesson-01-displacement/displacement_lab.py";

const LEARNING_OBJECTIVES = [
  "Identify the reference frame for a motion: origin, positive direction, and units.",
  "Distinguish an object's position, r, from its displacement, Δr = r_f − r_i.",
  "Calculate signed displacement from an initial and a final position.",
  "Distinguish displacement from distance travelled.",
  "Explain return-to-origin motion using displacement and distance.",
];

function hostedNotebookUrl(): string | null {
  const url = import.meta.env
    .VITE_MARIMO_DISPLACEMENT_URL as string | undefined;

  return url && url.trim().length > 0 ? url : null;
}

export default function MarimoLabLaunch() {
  const embedUrl = hostedNotebookUrl();
  const { session, refresh } = useMarimoSession();

  const handleLaunch = async () => {
    await launchMarimo();
    setTimeout(refresh, 1000);
  };

  const statusIcon =
    session.status === "running" ? (
      <CheckCircle2 size={18} color="#16A34A" />
    ) : (
      <Clock size={18} color="#D97706" />
    );

  const statusText =
    session.status === "running"
      ? "Running"
      : session.status === "checking"
      ? "Checking..."
      : "Launch Required";

  return (
    <section className="mll-card" aria-labelledby="mll-heading">
      <div className="mll-header">
        <span className="mll-eyebrow">Computational companion</span>

        <h2 id="mll-heading" className="mll-title">
          Interactive Computational Lab
        </h2>

        <p className="mll-overview">
          The Displacement Explorer teaches the concept visually. The
          Marimo notebook provides computational experimentation using
          the same displacement mathematics from the Python calculator
          layer.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {statusIcon}
        <strong>{statusText}</strong>

        <button
          onClick={refresh}
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="mll-objectives">
        <h3 className="mll-objectives-heading">Learning objectives</h3>

        <ul>
          {LEARNING_OBJECTIVES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {embedUrl ? (
        <div className="mll-embed-wrap">
          <iframe
            src={embedUrl}
            title="Displacement Marimo Lab"
            className="mll-embed"
            loading="lazy"
          />

          <button
            onClick={handleLaunch}
            className="mll-launch-button"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Play size={16} />
            Open in New Tab
          </button>
        </div>
      ) : (
        <div className="mll-launch-fallback">
          <p className="mll-launch-note">
            Local notebook detected through the DHD Nexus session
            manager.
          </p>

          <code className="mll-launch-command">{LAUNCH_COMMAND}</code>

          <button
            onClick={handleLaunch}
            className="mll-launch-button"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Play size={16} />
            Launch Marimo Notebook
          </button>
        </div>
      )}
    </section>
  );
}