from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

TEMPLATE_DIR = (
    ROOT
    / "builder"
    / "templates"
)

LESSON_LIBRARY = (
    ROOT
    / "lesson-library"
)

MANIM = (
    ROOT
    / "manim-lessons"
)

NOTEBOOKS = (
    ROOT
    / "marimo-notebooks"
)

CALCULATORS = (
    ROOT
    / "python-calculators"
)

INTERACTIVE = (
    ROOT
    / "interactive-labs"
)

WEBSITE = (
    ROOT
    / "website"
)