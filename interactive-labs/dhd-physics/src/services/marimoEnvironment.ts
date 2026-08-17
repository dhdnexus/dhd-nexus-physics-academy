// src/services/marimoEnvironment.ts
//
// DHD Nexus Physics Academy
// Milestone B9.4.3 -- React Integration
//
// Every student reaching Physics Academy through GitHub -> Vercel must
// get the computational lab with no Python install and no backend
// server: that's MarimoMode "wasm", and it is the default in every
// environment unless explicitly overridden.
//
// The B9.3 local-session infrastructure (marimoHealth / marimoLauncher
// / MarimoSessionContext) is preserved as-is for MarimoMode "local" --
// the authoring/desktop environment, where a content author runs
// `marimo edit` against a live local server. It is opt-in via an
// environment variable, never the default, so a misconfigured or
// missing env var can never leave a student pointed at localhost.

export type MarimoMode = "wasm" | "local";

/**
 * Determines which Marimo execution environment the app should use.
 *
 * Reads VITE_MARIMO_MODE. Any value other than the literal string
 * "local" (including unset) resolves to "wasm" -- the safe,
 * backend-free default for anyone accessing the deployed site.
 */
export function getMarimoMode(): MarimoMode {
  const raw = import.meta.env.VITE_MARIMO_MODE as string | undefined;
  return raw?.trim().toLowerCase() === "local" ? "local" : "wasm";
}

/**
 * Path (relative to the deployed app's origin) of the committed,
 * browser-native WASM export for the Displacement lesson. Synced into
 * public/marimo/displacement/ at build time from the engineering
 * repo's marimo-notebooks/.../web/ directory -- see
 * scripts/sync-marimo-lab.mjs and scripts/export_marimo_wasm.py.
 */
export const DISPLACEMENT_WASM_LAB_PATH = "/marimo/displacement/index.html";
