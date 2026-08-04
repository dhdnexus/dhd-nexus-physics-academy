# DHD Nexus Architecture v1.0

## Vision

DHD Nexus is an integrated undergraduate STEM education platform.

Every lesson is created once and delivered through multiple learning experiences:

- Manim animation
- Interactive web widgets
- Marimo notebooks
- Python calculators
- Website
- Quizzes
- Assignments
- YouTube videos

The lesson—not the video—is the fundamental unit of the platform.

---

# Core Principles

## 1. Single Source of Truth

Every lesson exists once.

Everything else is generated from it.

---

## 2. Shared SDK

Reusable code never belongs inside a lesson.

Reusable code belongs inside the SDK.

---

## 3. Modular Design

Builder

SDK

Lessons

Website

Interactive

Calculators

Research

remain independent modules.

---

## 4. Reusability

Every component should be reusable across:

- Website
- YouTube
- Manim
- Interactive Widgets
- Marimo
- Mobile Apps

---

## 5. Automation

Anything repeated more than twice should eventually be automated.

---

## 6. Professional Standards

Every lesson follows the same structure.

Every animation follows the same branding.

Every widget follows the same interface.

Every calculator uses the same physics engine.

---

## Architecture

                    DHD Nexus

                         │

        ┌────────────────┼─────────────────┐

        │                │                 │

    Website          YouTube         Mobile Apps

        │                │                 │

        └────────────────┼─────────────────┘

                         │

                  Shared Content

                         │

        ┌────────────────┼────────────────┐

        │                │                │

      Builder           SDK         Shared Assets

                         │

                    Lesson Package

        ┌──────────┬─────────┬──────────┬──────────┐

        │          │         │          │

      Manim    Interactive  Marimo  Calculator

        │

        ├── Quiz

        ├── Assignment

        └── Website
