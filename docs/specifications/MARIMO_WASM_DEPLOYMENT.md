# Marimo WASM Deployment — Milestone B9.4

## What this is

Every student reaching Physics Academy through GitHub → Vercel gets
the Displacement computational lab with **no Python install and no
backend server**. The lab runs entirely in the browser via
[Pyodide](https://pyodide.org) (Python compiled to WebAssembly),
exported from the authored Marimo notebook as a static HTML/JS/CSS
bundle that Vercel serves like any other static asset.

The `.py` notebook (`marimo-notebooks/mechanics/kinematics/lesson-01-
displacement/displacement_lab.py`) remains the single authoring
source. The exported bundle
(`marimo-notebooks/mechanics/kinematics/lesson-01-displacement/web/`)
is a **generated artifact — never edit it by hand.** Regenerate it
with the export script whenever the notebook changes.

## Two execution environments

| | Browser WASM (`wasm`) | Local Marimo (`local`) |
|---|---|---|
| Who | Every student, by default | Content authors, opt-in |
| Backend required | No | Yes — a locally running `marimo edit`/`marimo run` server |
| How the React app reaches it | Static asset at `/marimo/displacement/index.html` | `http://localhost:2718`, via the B9.3 session-management infrastructure |
| Enabled by | Default (no configuration needed) | `VITE_MARIMO_MODE=local` in `.env.local` |

The React app never hard-codes which environment it's in — see
`src/services/marimoEnvironment.ts` and `src/hooks/useMarimoLab.ts`.
The B9.3 desktop session infrastructure (`MarimoSessionContext`,
`marimoLauncher.ts`, `marimoHealth.ts`) is fully preserved; it now
only activates in `local` mode.

## Export command

From the **repository root** (not `interactive-labs/dhd-physics/`):

```bash
python3 scripts/export_marimo_wasm.py
```

Requires `marimo` and `build` to be installed:

```bash
pip install marimo build
```

### What the script actually does

1. Builds `python_calculators` as a wheel (`pip`-installable package,
   zero third-party dependencies — this is what makes it installable
   inside Pyodide via `micropip`, not just a normal Python
   environment). This wheel **is** the mathematical source of truth;
   the browser build imports the same code as local Marimo and pytest
   do, not a reimplementation.
2. Copies the notebook and the wheel into a scratch temp directory,
   and adds **one line** to that copy's PEP 723 dependency header
   referencing the wheel by relative path. **The real authoring
   source file is never modified** — this is verified by
   `tests/marimo/test_wasm_export.py`.
3. Runs `marimo export html-wasm` against the staged copy.
4. Copies the built wheel into the exported output directory. This
   step is required: marimo's WASM export embeds the dependency
   *reference* to a local wheel in `index.html`, but does not copy
   the wheel file itself — without this step, the browser would try
   to fetch a wheel that doesn't exist at the exported bundle's URL.
5. Verifies `index.html` exists, the wheel is present in the output,
   and the wheel is actually referenced in `index.html` — fails loudly
   if any of that isn't true, rather than silently producing a broken
   bundle.

## Generated files

Everything under
`marimo-notebooks/mechanics/kinematics/lesson-01-displacement/web/`
(~28 MB: `index.html`, JS/CSS assets, the Pyodide runtime loader, and
`python_calculators-<version>-py3-none-any.whl`). **Do not hand-edit
anything in this directory** — regenerate it instead.

## Regeneration procedure

Whenever `displacement_lab.py` or `python_calculators/` changes:

```bash
# from the repository root
python3 scripts/export_marimo_wasm.py
git add marimo-notebooks/mechanics/kinematics/lesson-01-displacement/web
git commit -m "Regenerate Displacement WASM export"
git push
```

That's the entire workflow: **Edit notebook → Export → Git Push →
Vercel Deploy.** No CI step regenerates this automatically in B9.4 —
that was an explicit decision for this milestone (see
`docs/roadmaps/MILESTONES.md`); a future milestone may add a GitHub
Actions job to do this instead of committing the artifact by hand.

## How the frontend picks it up

The frontend doesn't read from `marimo-notebooks/` directly — Vite
only bundles its own `public/` directory. A small sync step mirrors
the committed export into the frontend build:

```bash
# from interactive-labs/dhd-physics/
npm run build
# runs, in order:
#   1. npm run sync:marimo   (scripts/sync-marimo-lab.mjs)
#   2. tsc -b
#   3. vite build
```

`sync:marimo` copies
`marimo-notebooks/.../lesson-01-displacement/web/` into
`interactive-labs/dhd-physics/public/marimo/displacement/`. That
directory is **git-ignored in the frontend app** (see `.gitignore`) —
it's a build-time mirror of the one canonical, committed copy in the
engineering repo, not a second copy to keep in sync by hand.

You can run the sync on its own during local development:

```bash
npm run sync:marimo
```

## Vercel behaviour

Vercel runs `npm run build` (per the existing `vercel.json` — **not
modified in this milestone**) and serves the resulting `dist/`
directory as static files. Since:

- `sync:marimo` runs automatically as part of `build`, and
- Vite copies `public/` verbatim into `dist/` at build time,

...`dist/marimo/displacement/index.html` and all its assets end up in
the deployed output automatically, with **no Vercel configuration
changes needed**. Vercel doesn't run Python at all — the WASM export
is pure static HTML/JS/CSS/WASM, indistinguishable to Vercel from any
other static asset in the app.

The lesson page's "Open Interactive Computational Lab" button
navigates to `/mechanics/kinematics/displacement/lab` (a real React
Router route — see `src/pages/mechanics/kinematics/displacement/lab/`)
which performs a full-page navigation to
`/marimo/displacement/index.html` in `wasm` mode. This is a real
browser navigation, not an iframe — the exported bundle is itself a
complete, independent web app with its own React root, so mounting it
inside the Academy's own React tree would cause DOM/asset conflicts.

## Verification commands

```bash
# From the repository root:
python3 scripts/export_marimo_wasm.py
python3 -m pytest tests/marimo -q

# From interactive-labs/dhd-physics/:
npm run build
npm run validate:content
```

## Known limitation

Full in-browser execution (confirming Pyodide actually loads,
installs the wheel via micropip, and runs a calculation) could not be
verified end-to-end in the environment this milestone was built in,
because that environment's network egress doesn't reach the CDN that
serves the Pyodide runtime assets at page-load time. Everything short
of that was verified directly: the wheel builds, is correctly
referenced in the exported `index.html`, resolves at the expected
relative URL once placed alongside `index.html` (confirmed by direct
inspection of the exported HTML and file layout), and the full
export → sync → Vite build → `dist/` pipeline produces exactly the
expected static files. Recommend one manual check in an unrestricted
browser (open the deployed `/mechanics/kinematics/displacement/lab`
route, or serve `web/` locally with `python -m http.server`) before
treating this as fully verified in production.
