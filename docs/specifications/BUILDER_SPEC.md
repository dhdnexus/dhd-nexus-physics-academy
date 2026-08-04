# DHD Nexus Builder Specification v1.0

---

# Purpose

The Builder is the automation engine of DHD Nexus.

Its responsibility is to generate standardized educational projects.

The Builder never contains lesson content.

The Builder never performs physics calculations.

The Builder never duplicates SDK functionality.

---

# Responsibilities

The Builder shall:

✓ Create new lessons

✓ Generate folder structures

✓ Generate lesson metadata

✓ Generate starter files

✓ Generate Manim projects

✓ Generate notebooks

✓ Generate calculators

✓ Generate quizzes

✓ Generate assignments

✓ Generate website pages

✓ Generate documentation

---

# Builder Workflow

User Input

↓

Lesson Manifest

↓

Validation

↓

Generators

↓

Lesson Package

---

# Builder Modules

builder/

    config/

    generators/

    templates/

    utils/

    builder.py

---

# Generators

Each output is produced by an independent generator.

Examples

Lesson Generator

Manim Generator

Notebook Generator

Calculator Generator

Widget Generator

Quiz Generator

Assignment Generator

Website Generator

Documentation Generator

---

# Builder Rules

The Builder never writes reusable code.

Reusable code belongs inside the SDK.

The Builder only creates project-specific content.

---

# Lesson Manifest

Every lesson begins with:

lesson.json

Example

{

    "lesson_id":"MEC-KIN-001",

    "title":"Displacement",

    "outputs":{

        "manim":true,

        "interactive":true,

        "calculator":true,

        "marimo":true,

        "quiz":true,

        "assignment":true,

        "website":true

    }

}

---

# Future

Future Builder versions will support:

AI-assisted lesson generation

Automatic thumbnail generation

Automatic YouTube metadata

Interactive widget scaffolding

Research project scaffolding

Course generation

Website deployment

Publishing automation
