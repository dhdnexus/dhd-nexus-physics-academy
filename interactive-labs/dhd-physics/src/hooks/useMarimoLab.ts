// src/hooks/useMarimoLab.ts
//
// DHD Nexus Physics Academy
// Milestone B9.4.3 -- React Integration
//
// Single abstraction over the two supported Marimo execution
// environments:
//
//   - "wasm"  (students, default): the committed, browser-native
//     export. Always available the instant the page loads -- no
//     health check needed, since it's a static asset served from the
//     same origin as the rest of the app.
//
//   - "local" (authoring/desktop): the existing B9.3 session-managed
//     local Marimo server, reached via the preserved
//     MarimoSessionContext / marimoLauncher infrastructure.
//
// Components consume this hook and render one UI; they don't branch
// on environment logic themselves -- that keeps MarimoLabLaunch and
// the dedicated lab route free of duplicated per-mode code.

import { useMarimoSession } from "../context/MarimoSessionContext";
import { launchMarimo } from "../services/marimoLauncher";
import {
  getMarimoMode,
  DISPLACEMENT_WASM_LAB_PATH,
  type MarimoMode,
} from "../services/marimoEnvironment";

export type MarimoLabStatus =
  | "ready" // wasm: always ready, it's a static asset
  | "checking" // local: health check in progress
  | "running" // local: server detected
  | "launch_required"; // local: server not detected yet

export interface MarimoLabState {
  mode: MarimoMode;
  status: MarimoLabStatus;
  /** Where "open the lab" should navigate to, for the current mode. */
  href: string;
  /** Re-check availability (no-op in wasm mode; health re-check in local mode). */
  refresh: () => Promise<void>;
  /** Perform the mode-appropriate launch action before navigating (no-op in wasm mode). */
  launch: () => Promise<void>;
}

export function useMarimoLab(): MarimoLabState {
  const mode = getMarimoMode();
  const { session, refresh } = useMarimoSession();

  if (mode === "wasm") {
    return {
      mode,
      status: "ready",
      href: DISPLACEMENT_WASM_LAB_PATH,
      refresh: async () => {},
      launch: async () => {},
    };
  }

  const status: MarimoLabStatus =
    session.status === "running"
      ? "running"
      : session.status === "checking"
      ? "checking"
      : "launch_required";

  return {
    mode,
    status,
    href: session.url,
    refresh,
    launch: async () => {
      await launchMarimo(session.url);
      setTimeout(refresh, 1000);
    },
  };
}
