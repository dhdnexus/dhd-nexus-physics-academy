import "./marimo-lab-launch.css";

/**
 * DHD Nexus Physics Academy — Displacement Lesson
 * Marimo Interactive Lab launch card (Milestone B9.2).
 *
 * This component is presentational only. It performs no displacement
 * or distance calculations of its own -- it references the existing
 * Marimo notebook (marimo-notebooks/mechanics/kinematics/
 * lesson-01-displacement/displacement_lab.py) as the computational
 * companion, rather than reimplementing any of its physics here.
 *
 * The notebook runs as a separate Python/Marimo process and is not
 * bundled into this static React build. If a hosted notebook URL is
 * configured (VITE_MARIMO_DISPLACEMENT_URL), this card embeds it in
 * an iframe; otherwise it falls back to the exact local launch
 * command, so the experience degrades gracefully rather than
 * pointing at a broken link.
 */

const LAUNCH_COMMAND =
  "marimo run marimo-notebooks/mechanics/kinematics/lesson-01-displacement/displacement_lab.py";

const LEARNING_OBJECTIVES = [
  "Identify the reference frame for a motion: origin, positive direction, and units.",
  "Distinguish an object's position, r, from its displacement, Δr = r_f − r_i.",
  "Calculate signed displacement from an initial and a final position, and read its sign as a direction.",
  "Distinguish displacement (depends only on endpoints) from distance travelled (depends on the whole path).",
  "Explain why a return-to-origin motion has zero displacement but non-zero distance travelled.",
];

function hostedNotebookUrl(): string | null {
  const url = import.meta.env.VITE_MARIMO_DISPLACEMENT_URL as string | undefined;
  return url && url.trim().length > 0 ? url : null;
}

export default function MarimoLabLaunch() {
  const embedUrl = hostedNotebookUrl();

  return (
    <section className="mll-card" aria-labelledby="mll-heading">
      <div className="mll-header">
        <span className="mll-eyebrow">Computational companion</span>
        <h2 id="mll-heading" className="mll-title">
          Interactive Computational Lab
        </h2>
        <p className="mll-overview">
          The Displacement Explorer above shows the concept live in your
          browser. The Marimo lab is the same lesson's computational
          companion: a Python notebook where you can freely change the
          initial and final position, add a detour, and watch
          displacement and distance travelled recompute in real time —
          all driven by the same displacement mathematics, not a
          separate reimplementation of it.
        </p>
      </div>

      <div className="mll-objectives">
        <h3 className="mll-objectives-heading">Learning objectives</h3>
        <ul>
          {LEARNING_OBJECTIVES.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </div>

      {embedUrl ? (
        <div className="mll-embed-wrap">
          <iframe
            src={embedUrl}
            title="Displacement — Marimo Interactive Lab"
            className="mll-embed"
            loading="lazy"
          />
          <a
            className="mll-launch-button"
            href={embedUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in a new tab ↗
          </a>
        </div>
      ) : (
        <div className="mll-launch-fallback">
          <p className="mll-launch-note">
            This lab runs as a local Marimo notebook and isn't hosted
            for this deployment yet. Launch it from the engineering
            repository:
          </p>
          <code className="mll-launch-command">{LAUNCH_COMMAND}</code>
          <a
            className="mll-launch-button"
            href="https://docs.marimo.io/getting_started/"
            target="_blank"
            rel="noreferrer"
          >
            New to Marimo? ↗
          </a>
        </div>
      )}
    </section>
  );
}
