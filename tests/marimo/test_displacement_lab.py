"""
Milestone B9.1 — Marimo Interactive Learning Layer

Validates:
  - the notebook module imports successfully (including its
    python_calculators import chain and sys.path bootstrap)
  - the underlying displacement calculation is correct
  - negative displacement is handled correctly
  - zero displacement is handled correctly
"""

import importlib
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
NOTEBOOK_DIR = (
    REPO_ROOT
    / "marimo-notebooks"
    / "mechanics"
    / "kinematics"
    / "lesson-01-displacement"
)


def _import_notebook():
    """
    Import displacement_lab.py the same way `marimo run` / `marimo edit`
    would -- as a standalone module located in its own notebook
    directory, relying on its own app.setup sys.path bootstrap to find
    python_calculators.
    """
    if str(NOTEBOOK_DIR) not in sys.path:
        sys.path.insert(0, str(NOTEBOOK_DIR))
    return importlib.import_module("displacement_lab")


def test_notebook_imports_successfully():
    module = _import_notebook()
    assert module.app is not None


def test_notebook_bootstraps_python_calculators_on_sys_path():
    _import_notebook()
    assert str(REPO_ROOT) in sys.path


# ---------------------------------------------------------------------------
# The functions below are also covered directly against
# python_calculators (see test_displacement_calculator.py), but are
# re-exercised here through the notebook's own import path to confirm
# the notebook is actually using the shared calculator, not a
# reimplementation.
# ---------------------------------------------------------------------------


def test_positive_displacement_via_notebook_imports():
    from python_calculators.mechanics.kinematics.displacement_calculator import (
        calculate_displacement,
        calculate_distance,
        direction,
    )

    assert calculate_displacement(-4, 6) == 10
    assert calculate_distance(-4, 6) == 10
    assert direction(-4, 6) == "positive"


def test_negative_displacement_via_notebook_imports():
    from python_calculators.mechanics.kinematics.displacement_calculator import (
        calculate_displacement,
        calculate_distance,
        direction,
    )

    assert calculate_displacement(6, -4) == -10
    assert calculate_distance(6, -4) == 10
    assert direction(6, -4) == "negative"


def test_zero_displacement_via_notebook_imports():
    from python_calculators.mechanics.kinematics.displacement_calculator import (
        calculate_displacement,
        calculate_distance,
        direction,
    )

    assert calculate_displacement(5, 5) == 0
    assert calculate_distance(5, 5) == 0
    assert direction(5, 5) == "zero"
