#!/usr/bin/env node
/**
 * DHD Nexus -- Sync Marimo WASM Lab
 * Milestone B9.4.2 -- Build Automation
 *
 * Copies the committed, pre-exported browser-native Marimo bundle
 * (marimo-notebooks/mechanics/kinematics/lesson-01-displacement/web/)
 * into this app's public/ directory, so `vite build` bundles it as a
 * static asset that Vercel serves with zero backend involvement.
 *
 * This script does NOT run the Python/marimo export itself -- that is
 * scripts/export_marimo_wasm.py at the repository root, run manually
 * (or by CI, if a future milestone adds that) whenever the notebook
 * changes. This script only mirrors the already-exported, already-
 * committed output into the frontend build.
 *
 * Runs automatically as part of `npm run build` (see package.json).
 */

import { existsSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE = join(
  __dirname,
  "..",
  "..",
  "..",
  "marimo-notebooks",
  "mechanics",
  "kinematics",
  "lesson-01-displacement",
  "web"
);

const DESTINATION = join(__dirname, "..", "public", "marimo", "displacement");

function main() {
  if (!existsSync(SOURCE)) {
    console.error(
      `[sync-marimo-lab] Source not found: ${SOURCE}\n` +
        "Run `python3 scripts/export_marimo_wasm.py` from the repository " +
        "root first, and commit the resulting web/ directory."
    );
    process.exit(1);
  }

  if (existsSync(DESTINATION)) {
    rmSync(DESTINATION, { recursive: true, force: true });
  }
  mkdirSync(DESTINATION, { recursive: true });

  cpSync(SOURCE, DESTINATION, { recursive: true });

  console.log(
    `[sync-marimo-lab] Synced ${SOURCE} -> ${DESTINATION}`
  );
}

main();
