# DHD Nexus SDK Specification v1.0

---

# Purpose

The DHD Nexus SDK provides reusable software components shared across the entire DHD Nexus platform.

The SDK is the only location where reusable code may exist.

Lessons must never duplicate SDK functionality.

---

# Responsibilities

The SDK is responsible for:

- Visual identity
- Physics calculations
- Animation helpers
- Graph generation
- Equation rendering
- Vector rendering
- UI components
- Widgets
- Shared utilities
- Configuration
- Templates

---

# SDK Structure

sdk/

    animations/

    assets/

    branding/

    colors/

    config/

    constants/

    core/

    equations/

    graphs/

    objects/

    physics/

    themes/

    ui/

    utils/

    vectors/

    widgets/

---

# Module Responsibilities

## animations/

Scene transitions

Highlight effects

Fade effects

Motion helpers

---

## assets/

Icons

SVG

Shared images

Audio

Video overlays

---

## branding/

Logo

Typography

Watermarks

Brand identity

---

## colors/

Official DHD Nexus colour palette.

---

## config/

Global configuration.

Resolution

Frame rate

Fonts

Timing

---

## constants/

Universal constants.

π

g

Speed of light

Planck constant

Electron charge

etc.

---

## core/

Base lesson classes.

Common scene behaviour.

---

## equations/

Equation rendering.

Equation boxes.

Variable tables.

Derivation layouts.

---

## graphs/

Reusable graph builders.

Axes

Labels

Position-Time

Velocity-Time

Acceleration-Time

Scatter plots

Function plots

---

## objects/

Reusable Manim objects.

Cars

Blocks

Springs

Pulley systems

Inclined planes

Planets

---

## physics/

Pure physics engine.

No graphics.

No Manim.

Only calculations.

Example:

solve_suvat()

projectile_motion()

newton_second_law()

ideal_gas()

---

## themes/

Colour themes.

Dark mode.

Light mode.

Presentation mode.

---

## ui/

Common interface elements.

Titles

Headers

Footers

Panels

Information cards

---

## utils/

Shared helper functions.

Formatting

Validation

Math helpers

File helpers

---

## vectors/

Reusable vectors.

Displacement

Velocity

Acceleration

Force

Electric field

Magnetic field

---

## widgets/

Future React components.

Interactive physics.

Shared UI.

---

# SDK Rules

SDK modules must never depend on lesson content.

SDK modules must never contain hardcoded lesson names.

SDK modules should be reusable across all undergraduate physics topics.

---

# Dependency Rule

Allowed

Lesson

↓

SDK

Not Allowed

SDK

↓

Lesson

---

# Future

The SDK will eventually power:

Website

Builder

Manim

Interactive Widgets

Marimo

Calculators

Mobile Applications

AI Tutors

Future APIs
