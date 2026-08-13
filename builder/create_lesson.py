from pathlib import Path


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

# NOTE: this scaffolder previously wrote its own metadata.json (with an
# invented lesson_id like "MEC-KIN-001") into every generated lesson
# folder. That made it a second, independent lesson-identity registry,
# competing with the canonical content/lessons/<id>.yaml in the frontend
# repository. Lesson identity is now owned exclusively by that canonical
# YAML file, so this scaffolder no longer writes metadata.json at all --
# it only creates the folder skeleton and a README.

with open(lesson / "README.md", "w") as fp:
    fp.write(
        f"# {title}\n\n"
        "Lesson identity (id, title, objectives, artifacts) is defined "
        "in the canonical content specification "
        "(content/lessons/<id>.yaml) in the Physics Academy frontend "
        "repository, not in this folder.\n"
    )

print("\nDone.")