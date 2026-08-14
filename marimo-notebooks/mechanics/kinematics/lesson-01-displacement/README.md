# Displacement — Interactive Marimo Notebook

**Milestone:** B9.1 — Marimo Interactive Learning Layer
**Lesson:** Mechanics → Kinematics → Lesson 01, Displacement
**Companion to:** the Lesson 01 Manim scene and the Physics Academy Web Lab

## Purpose

This notebook is the **computational exploration** layer for
Displacement, sitting alongside (not replacing) the existing Manim
conceptual animation and the React Web Lab's guided interaction. Where
the Manim scene shows a fixed, polished sequence and the Web Lab
provides structured guided interaction, this notebook lets a student
freely manipulate the initial position, final position, and an
optional detour waypoint, and see position, displacement, and distance
travelled recompute live.

All displacement/distance arithmetic in this notebook is delegated to
the shared, importable calculator package:

```
python_calculators/mechanics/kinematics/displacement_calculator.py
```

exposing `calculate_displacement`, `calculate_distance`, `direction`,
and `vector_notation`. The notebook itself contains no independent
displacement mathematics — only sliders, layout, and SVG rendering.

## Launch

From the engineering repository root:

```bash
marimo run marimo-notebooks/mechanics/kinematics/lesson-01-displacement/displacement_lab.py
```

For interactive editing:

```bash
marimo edit marimo-notebooks/mechanics/kinematics/lesson-01-displacement/displacement_lab.py
```

## Educational Objectives

By the end of this notebook, a student should be able to:

- Define position, r, relative to a chosen origin.
- Define displacement, Δx = x_f − x_i.
- Explain what a reference frame (origin + positive direction + units)
  is, and why it must be fixed before position or displacement means
  anything.
- Calculate Δx for a direct motion between two positions.
- Distinguish distance travelled (path length) from displacement
  (depends only on the endpoints) — including the case where they
  differ, via the detour slider.
- Interpret the sign of a displacement (positive/negative/zero) as a
  direction relative to the reference frame.

## Notebook Sections

1. **Welcome** — DHD Nexus branding, lesson title, brief instructions
2. **Position Explorer** — sliders for initial and final position
3. **Interactive SVG Number Line** — live number line with start/end
   markers and a displacement arrow
4. **Displacement Calculation** — Δx, distance travelled, direction,
   and vector notation, computed via `python_calculators`
5. **Distance vs Displacement** — a detour slider showing distance
   travelled diverging from displacement magnitude
6. **Concept Check** — three conceptual questions (native Marimo radio
   widgets)
7. **Immediate Feedback** — live-updating feedback for each answer in
   Section 6

## Dependencies

- Python (standard library only, beyond marimo and the local
  `python_calculators` package)
- `marimo`

No `sdk/` imports, no external JavaScript, no external CSS framework.
SVG graphics are generated inline as plain strings.
