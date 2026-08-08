# DHD Nexus Physics Academy
# Development Architecture v2.0 (Working Draft)

> **Status:** Active Working Document  
> **Version:** 2.0 (Working Draft)  
> **Project:** DHD Nexus Physics Academy

---

# Vision

DHD Nexus Physics Academy is the undergraduate physics education platform developed under the DHD Nexus ecosystem.

It combines:

- Scientific visualization
- Interactive laboratories
- Manim animations
- Python computation
- Marimo notebooks
- Live graphs
- Modern educational technology

to create immersive undergraduate physics learning experiences.

---

# Core Development Philosophy

Everything is designed using one simple principle:

```
Lesson
    ↓
Components
    ↓
Functionality
```

Students interact with **Lessons**, not isolated software features.

Every lesson should be complete enough to teach its topic independently.

---

# Version 2.0 Architecture

```text
DHD-Nexus-Physics-Academy
│
├── website
├── docs
├── builder
├── sdk
├── shared-assets
│
└── lessons
     │
     ├── mechanics
     │
     │     ├── kinematics
     │     │
     │     │     ├── displacement
     │     │     ├── velocity
     │     │     ├── acceleration
     │     │     └── ...
     │     │
     │     ├── dynamics
     │     └── ...
     │
     ├── electricity
     ├── optics
     ├── waves
     └── thermodynamics
```

---

# Lesson Architecture

Every lesson is self-contained.

Example:

```text
displacement/
│
├── components/
│      ├── InteractiveLab.tsx
│      ├── AnimationPanel.tsx
│      ├── PhysicsPanel.tsx
│      ├── GraphPanel.tsx
│      └── ExplanationPanel.tsx
│
├── notebook/
├── sdk/
├── assets/
│
└── index.tsx
```

Every lesson owns everything required to teach that topic.

---

# Educational Principle

Everything about a lesson stays together.

This makes lessons:

- reusable
- maintainable
- easy to extend
- easy to test

Future lessons follow exactly the same template.

---

# Navigation Vision

```text
☰

🏠 Home

────────────────────────

Mechanics
    ▼

      Kinematics
          • Displacement
          • Velocity
          • Acceleration
          • Motion Graphs
          • SUVAT
          • Projectile Motion

      Dynamics
          • Newton's Laws
          • Friction
          • Momentum
          • Circular Motion

────────────────────────

Electricity

Optics

Waves

Thermodynamics

────────────────────────

About

Documentation

Settings
```

This navigation reflects how students naturally explore a physics curriculum.

---

# Current Development Milestone

## Lesson 01 — Displacement

Current Sprint:

### Sprint A

Build the complete **Interactive Laboratory**.

```
Displacement

├── InteractiveLab.tsx   ✅ Current Sprint
├── AnimationPanel.tsx
├── PhysicsPanel.tsx
├── GraphPanel.tsx
└── ExplanationPanel.tsx
```

---

# Development Roadmap

Current order of implementation:

1. InteractiveLab
2. AnimationPanel
3. PhysicsPanel
4. GraphPanel
5. ExplanationPanel
6. SDK Integration
7. Manim Integration

Each component must be completed before moving to the next.

---

# Long-Term Goal

Every lesson in DHD Nexus Physics Academy will become a complete digital learning package consisting of:

- Theory
- Interactive Laboratory
- Manim Animation
- Live Physics Panel
- Graph Panel
- Python SDK
- Marimo Notebook
- Practice Questions
- Examination Questions

The lesson—not the software component—is the fundamental unit of the platform.