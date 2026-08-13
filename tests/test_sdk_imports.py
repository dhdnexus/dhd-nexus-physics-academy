"""
SDK integrity smoke tests:
  1. Every sdk.* module imports cleanly.
  2. No module anywhere in the repository still imports from the old,
     nonexistent `framework` package.
"""

import importlib
from pathlib import Path

import sdk

REPO_ROOT = Path(sdk.__file__).resolve().parents[1]
SDK_ROOT = Path(sdk.__file__).resolve().parent


def _iter_sdk_module_names():
    for path in sorted(SDK_ROOT.rglob("*.py")):
        if path.name == "__init__.py":
            relative = path.parent.relative_to(SDK_ROOT)
            parts = ["sdk"] + ([p for p in relative.parts] if str(relative) != "." else [])
        else:
            relative = path.relative_to(SDK_ROOT).with_suffix("")
            parts = ["sdk"] + list(relative.parts)
        yield ".".join(parts)


def test_all_sdk_modules_import_successfully():
    failures = []
    for name in _iter_sdk_module_names():
        try:
            importlib.import_module(name)
        except Exception as exc:  # noqa: BLE001 -- collect every failure, don't stop at the first
            failures.append(f"{name}: {exc!r}")

    assert not failures, "The following sdk modules failed to import:\n" + "\n".join(failures)


def test_no_framework_imports_remain_in_sdk_or_tests():
    offending = []
    this_file = Path(__file__).resolve()
    for base in ("sdk", "tests", "python-calculators", "manim-lessons", "builder"):
        base_path = REPO_ROOT / base
        if not base_path.exists():
            continue
        for path in base_path.rglob("*.py"):
            if path.resolve() == this_file:
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            if "from framework." in text or "import framework" in text:
                offending.append(str(path.relative_to(REPO_ROOT)))

    assert not offending, "Found lingering `framework.*` imports in:\n" + "\n".join(offending)
