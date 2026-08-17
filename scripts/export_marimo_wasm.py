#!/usr/bin/env python3
"""
DHD Nexus -- Marimo WASM Export Pipeline
Milestone B9.4.1 / B9.4.2 -- Browser Export Pipeline & Build Automation

Implements the workflow:

    Edit notebook -> Export -> Git Push -> Vercel Deploy

This script is the single reproducible entry point for turning the
authored Marimo notebook into the browser-native, backend-free
artifact that Vercel serves as a static asset.

WHAT IT DOES
------------
1. Builds `python_calculators` as a wheel. This package is the single
   mathematical source of truth shared by local Marimo (authoring)
   and the browser WASM export (students) -- the wheel is literally
   the same code, not a reimplementation.
2. Copies the authored notebook and the wheel into a scratch
   directory, and adds ONE dependency line to that *copy's* PEP 723
   header referencing the wheel by relative path. The real authoring
   source file at marimo-notebooks/.../displacement_lab.py is never
   modified -- per the project rule that the notebook remains the
   authoring source and generated artifacts are never hand-edited.
3. Runs `marimo export html-wasm` against the staged copy.
4. Copies the built wheel into the exported output directory.
   (marimo's WASM export embeds the dependency *reference* in
   index.html but does not itself copy locally-referenced wheel
   files -- this step is required, not optional. Verified by direct
   inspection of the exported HTML during development of this
   script.)
5. Verifies the expected files exist in the output before reporting
   success.

The output directory (marimo-notebooks/.../lesson-01-displacement/web/)
is the deployable artifact. It is committed to the repository -- per
project decision, this milestone does not use GitHub Actions to
regenerate it on push. Regenerating it and committing the result is a
manual (but fully scripted, one-command) step whenever the notebook
changes.

USAGE
-----
    python3 scripts/export_marimo_wasm.py

Run from the repository root. Requires `marimo` and `build` to be
installed (pip install marimo build).

See docs/specifications/MARIMO_WASM_DEPLOYMENT.md for the full
explanation, regeneration procedure, and Vercel deployment behaviour.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CALCULATOR_PKG = REPO_ROOT / "python_calculators"
NOTEBOOK_DIR = (
    REPO_ROOT
    / "marimo-notebooks"
    / "mechanics"
    / "kinematics"
    / "lesson-01-displacement"
)
NOTEBOOK_SOURCE = NOTEBOOK_DIR / "displacement_lab.py"
OUTPUT_DIR = NOTEBOOK_DIR / "web"

MARIMO_DEPENDENCY_LINE = '#     "marimo>=0.23.16",\n'


def run(cmd: list[str], **kwargs) -> None:
    print(f"$ {' '.join(str(c) for c in cmd)}")
    subprocess.run(cmd, check=True, **kwargs)


def build_wheel(dist_dir: Path) -> Path:
    """Build python_calculators as a wheel; return the wheel's path."""
    run(
        [sys.executable, "-m", "build", "--wheel", "--outdir", str(dist_dir)],
        cwd=CALCULATOR_PKG,
    )

    wheels = sorted(dist_dir.glob("python_calculators-*.whl"))
    if not wheels:
        raise RuntimeError(
            "Wheel build did not produce a .whl file in "
            f"{dist_dir}. Check the `build` output above."
        )
    return wheels[-1]


def stage_notebook(staging_dir: Path, wheel_path: Path) -> Path:
    """
    Copy the notebook and the wheel into a scratch directory, and add
    a wheel dependency line to the STAGED copy's PEP 723 header only.
    The real authoring source file is never touched.

    Handles two cases: the notebook already has a `# /// script`
    header (patch the dependencies list), or it has none at all
    (prepend a minimal header declaring both marimo and the wheel).
    """
    if not NOTEBOOK_SOURCE.exists():
        raise RuntimeError(f"Notebook source not found: {NOTEBOOK_SOURCE}")

    staged_notebook = staging_dir / NOTEBOOK_SOURCE.name
    shutil.copy2(NOTEBOOK_SOURCE, staged_notebook)

    staged_wheel = staging_dir / wheel_path.name
    shutil.copy2(wheel_path, staged_wheel)

    original = staged_notebook.read_text(encoding="utf-8")

    if "python-calculators @" in original:
        raise RuntimeError(
            "The authoring notebook's PEP 723 header already references a "
            "python-calculators wheel. Expected it to be clean -- has the "
            "notebook been hand-edited to include a WASM-specific "
            "dependency? If so, remove it; this script manages that line "
            "for the staged export copy only."
        )

    dependency_line = f'#     "python-calculators @ ./{wheel_path.name}",\n'

    if MARIMO_DEPENDENCY_LINE in original:
        # Header already present (e.g. added by a previous `marimo edit` /
        # `marimo run` session) -- patch its dependencies list in place.
        patched = original.replace(
            MARIMO_DEPENDENCY_LINE,
            MARIMO_DEPENDENCY_LINE + dependency_line,
        )
    elif "# /// script" in original:
        raise RuntimeError(
            "The staged notebook has a '# /// script' header but not the "
            f"expected marimo dependency line ({MARIMO_DEPENDENCY_LINE!r}). "
            "The header format may have changed -- update this script's "
            "patch logic to match."
        )
    else:
        # No PEP 723 header at all -- this is the normal state of the
        # real authoring source file. Prepend a minimal header with
        # both dependencies declared from the start.
        header = (
            "# /// script\n"
            '# requires-python = ">=3.12"\n'
            "# dependencies = [\n"
            + MARIMO_DEPENDENCY_LINE
            + dependency_line
            + "# ]\n"
            "# ///\n"
        )
        patched = header + original

    staged_notebook.write_text(patched, encoding="utf-8")
    return staged_notebook


def export_wasm(staged_notebook: Path, output_dir: Path) -> None:
    if output_dir.exists():
        shutil.rmtree(output_dir)

    run(
        [
            "marimo",
            "export",
            "html-wasm",
            str(staged_notebook),
            "-o",
            str(output_dir),
            "--mode",
            "run",
            "-f",
        ]
    )


def bundle_wheel_into_output(wheel_path: Path, output_dir: Path) -> Path:
    """
    marimo's WASM export embeds the dependency *reference* to the
    wheel in index.html, but does not copy the wheel file itself into
    the output. This step is required for the exported app to
    actually resolve the dependency at runtime (the browser fetches
    it relative to index.html's own URL).
    """
    destination = output_dir / wheel_path.name
    shutil.copy2(wheel_path, destination)
    return destination


def verify_output(output_dir: Path, wheel_name: str) -> None:
    index_html = output_dir / "index.html"
    if not index_html.exists():
        raise RuntimeError(f"Expected {index_html} to exist after export.")

    wheel_in_output = output_dir / wheel_name
    if not wheel_in_output.exists():
        raise RuntimeError(
            f"Expected the wheel {wheel_name} to be present in the "
            f"exported output at {wheel_in_output}, but it was not found."
        )

    html_text = index_html.read_text(encoding="utf-8", errors="ignore")
    if wheel_name not in html_text:
        raise RuntimeError(
            f"{wheel_name} is present in the output directory but is not "
            "referenced anywhere in index.html -- the dependency header "
            "patch may not have taken effect."
        )

    print(f"Verified: {index_html}")
    print(f"Verified: {wheel_in_output}")
    print(f"Verified: {wheel_name} is referenced in index.html")


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="dhd-nexus-wasm-export-") as tmp:
        tmp_path = Path(tmp)
        dist_dir = tmp_path / "dist"
        staging_dir = tmp_path / "staging"
        dist_dir.mkdir()
        staging_dir.mkdir()

        print("== Step 1/4: Building python_calculators wheel ==")
        wheel_path = build_wheel(dist_dir)
        print(f"Built {wheel_path.name}")
        print()

        print("== Step 2/4: Staging notebook + wheel (authoring source untouched) ==")
        staged_notebook = stage_notebook(staging_dir, wheel_path)
        print(f"Staged: {staged_notebook}")
        print()

        print("== Step 3/4: Exporting to browser-native HTML/WASM ==")
        export_wasm(staged_notebook, OUTPUT_DIR)
        bundle_wheel_into_output(wheel_path, OUTPUT_DIR)
        print()

        print("== Step 4/4: Verifying output ==")
        verify_output(OUTPUT_DIR, wheel_path.name)

    print()
    print(f"Export complete: {OUTPUT_DIR}")
    print("Commit this directory to deploy the update (git add / commit / push).")


if __name__ == "__main__":
    main()
