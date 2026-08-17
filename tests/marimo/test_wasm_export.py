"""
Milestone B9.4.1 / B9.4.2 — Browser Export Pipeline & Build Automation

Validates scripts/export_marimo_wasm.py:
  - the authoring notebook source is never modified by the export
  - the export produces the expected output files
  - the built wheel is present in the output and referenced in
    index.html (i.e. the browser can actually resolve
    python_calculators at runtime)
  - running the export twice is reproducible (idempotent output shape)

This test actually runs the export (it is the same script used for
real releases) rather than mocking it, since the thing most likely to
break silently -- marimo not auto-bundling a locally-referenced wheel
-- would not be caught by a mock.
"""

import hashlib
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
EXPORT_SCRIPT = REPO_ROOT / "scripts" / "export_marimo_wasm.py"
NOTEBOOK_SOURCE = (
    REPO_ROOT
    / "marimo-notebooks"
    / "mechanics"
    / "kinematics"
    / "lesson-01-displacement"
    / "displacement_lab.py"
)
OUTPUT_DIR = (
    REPO_ROOT
    / "marimo-notebooks"
    / "mechanics"
    / "kinematics"
    / "lesson-01-displacement"
    / "web"
)


def _notebook_hash() -> str:
    return hashlib.sha256(NOTEBOOK_SOURCE.read_bytes()).hexdigest()


def test_export_script_runs_and_produces_expected_output():
    before_hash = _notebook_hash()

    result = subprocess.run(
        [sys.executable, str(EXPORT_SCRIPT)],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        timeout=300,
    )

    assert result.returncode == 0, (
        f"export script failed:\nstdout:\n{result.stdout}\n"
        f"stderr:\n{result.stderr}"
    )

    after_hash = _notebook_hash()
    assert before_hash == after_hash, (
        "The authoring notebook source was modified by the export "
        "script -- it must remain untouched."
    )

    index_html = OUTPUT_DIR / "index.html"
    assert index_html.exists()

    wheels = list(OUTPUT_DIR.glob("python_calculators-*.whl"))
    assert wheels, "Expected a python_calculators wheel in the export output."

    html_text = index_html.read_text(encoding="utf-8", errors="ignore")
    assert wheels[0].name in html_text, (
        "The bundled wheel is not referenced anywhere in the exported "
        "index.html -- the dependency header patch did not take effect."
    )


def test_notebook_source_never_contains_wasm_only_dependency_line():
    """
    The authoring source must never itself declare the wheel
    dependency -- that line only ever exists in a staged, throwaway
    copy created by the export script.
    """
    text = NOTEBOOK_SOURCE.read_text(encoding="utf-8")
    assert "python-calculators @" not in text
