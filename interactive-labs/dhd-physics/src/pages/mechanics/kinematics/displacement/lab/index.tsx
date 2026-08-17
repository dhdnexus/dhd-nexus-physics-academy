// src/pages/mechanics/kinematics/displacement/lab/index.tsx
//
// DHD Nexus Physics Academy
// Milestone B9.4.3 -- React Integration
//
// Dedicated full-screen route for the Displacement computational lab.
// The lesson page (../index.tsx) remains the teaching page; this
// route IS the computational experience -- a full navigation to the
// mode-appropriate Marimo target (the committed browser-native WASM
// export for students, or the live local server for authoring), not
// an iframe embedded inside the lesson layout.
//
// Uses useMarimoLab() so this page contains no per-mode branching of
// its own -- the hook already resolved which environment to target.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Loader2 } from "lucide-react";

import { useMarimoLab } from "../../../../../hooks/useMarimoLab";
import "./displacement-lab-route.css";

export default function DisplacementLabRoute() {
  const { mode, status, href, refresh, launch } = useMarimoLab();
  const [navigated, setNavigated] = useState(false);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (mode === "wasm" && !navigated) {
      setNavigated(true);
      window.location.assign(href);
    }
  }, [mode, href, navigated]);

  const handleOpen = async () => {
    await launch();
    setNavigated(true);
    window.location.assign(href);
  };

  return (
    <div className="dlr-screen">
      <div className="dlr-panel">
        <span className="dlr-eyebrow">DHD Nexus Physics Academy</span>
        <h1 className="dlr-title">Displacement — Computational Lab</h1>

        {mode === "wasm" ? (
          <>
            <p className="dlr-body">
              Opening the browser-native computational lab. No install
              required — this runs entirely in your browser.
            </p>
            <div className="dlr-status">
              <Loader2 size={18} className="dlr-spin" />
              <span>Launching…</span>
            </div>
            <a className="dlr-manual-link" href={href}>
              <ExternalLink size={16} />
              Click here if it doesn't open automatically
            </a>
          </>
        ) : (
          <>
            <p className="dlr-body">
              Authoring mode: this opens your local Marimo server rather
              than the browser-native export.
            </p>
            <p className="dlr-status-text">
              Status:{" "}
              <strong>
                {status === "running"
                  ? "Running"
                  : status === "checking"
                  ? "Checking…"
                  : "Launch required"}
              </strong>
            </p>
            <button className="dlr-launch-button" onClick={handleOpen}>
              <ExternalLink size={16} />
              Open Local Marimo
            </button>
          </>
        )}

        <Link className="dlr-back-link" to="/mechanics/kinematics/displacement">
          ← Back to the Displacement lesson
        </Link>
      </div>
    </div>
  );
}
