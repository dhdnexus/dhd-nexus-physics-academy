from pathlib import Path
import json


ROOT = Path(__file__).resolve().parents[1]


COURSES = {
    "1": "mechanics",
    "2": "electricity",
    "3": "waves",
    "4": "thermodynamics",
    "5": "modern-physics",
}


MODULES = {
    "mechanics": [
        "kinematics",
        "dynamics",
        "work-energy",
        "gravitation",
    ]
}


def create(path):
    path.mkdir(parents=True, exist_ok=True)
    print(f"Created: {path}")


print("\n===== DHD NEXUS BUILDER =====\n")

print("Courses")
for k, v in COURSES.items():
    print(f"{k}. {v.title()}")

course = COURSES[input("\nSelect Course: ")]

print("\nModules")

mods = MODULES[course]

for i, m in enumerate(mods, start=1):
    print(f"{i}. {m.title()}")

module = mods[int(input("\nSelect Module: ")) - 1]

number = int(input("\nLesson Number: "))

title = input("Lesson Title: ").strip()

folder = f"lesson-{number:02d}-{title.lower().replace(' ','-')}"

lesson = (
    ROOT
    / "manim-lessons"
    / course
    / module
    / folder
)

folders = [
    "manim",
    "script",
    "media",
    "interactive",
    "notebook",
    "calculator",
    "quiz",
    "assignment",
    "references",
]

create(lesson)

for f in folders:
    create(lesson / f)

metadata = {
    "lesson_id": f"MEC-KIN-{number:03d}",
    "title": title,
    "course": course,
    "module": module,
    "lesson_number": number,
    "status": "draft",
    "version": "1.0.0",
}

with open(lesson / "metadata.json", "w") as fp:
    json.dump(metadata, fp, indent=4)

with open(lesson / "README.md", "w") as fp:
    fp.write(f"# {title}\n")

print("\nDone.")