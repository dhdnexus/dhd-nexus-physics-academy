# DHD Nexus Lesson Specification v1.0

---

# Philosophy

A lesson is the fundamental educational unit of DHD Nexus.

A lesson is **not** a video.

A lesson is **not** a Manim animation.

A lesson is a complete educational package capable of producing multiple learning experiences.

Every lesson exists only once.

Every output is generated from the lesson.

---

# Standard Lesson Structure

lesson-XX-topic/

    metadata.json

    lesson.json

    README.md

    manim/

    script/

    interactive/

    notebook/

    calculator/

    quiz/

    assignment/

    references/

---

# Required Metadata

Every lesson must define:

Lesson ID

Title

Course

Module

Learning Outcomes

Prerequisites

Difficulty

Estimated Duration

Version

Status

Author

---

# Lesson Outputs

Every lesson may generate:

✓ Manim Animation

✓ Interactive Widget

✓ Marimo Notebook

✓ Python Calculator

✓ Quiz

✓ Assignment

✓ Website Page

✓ YouTube Assets

---

# Lesson Lifecycle

Draft

↓

Review

↓

Production

↓

Published

↓

Maintained

---

# Naming Convention

MEC-KIN-001

Mechanics

Kinematics

Lesson 001

Examples

MEC-KIN-001

MEC-KIN-002

MEC-DYN-001

ELE-EST-003

WAV-SHM-001

---

# Directory Rules

Lesson folders never contain reusable framework code.

Reusable code belongs inside the SDK.

Lessons contain only educational content.

---

# Single Source of Truth

Every generated asset must originate from:

lesson.json

metadata.json

No duplicated lesson information is permitted.

---

# Future Outputs

Future versions of Builder may automatically generate:

Website

Slides

Interactive Labs

Mobile Lessons

Exam Revision Packs

AI Tutors

without changing the lesson itself.