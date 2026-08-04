from pathlib import Path

from config.builder_config import (
    MANIM,
    TEMPLATE_DIR,
)

from utils.file_utils import (
    create_folder,
    create_file,
)

from utils.template_engine import TemplateEngine


class LessonGenerator:

    def __init__(self):

        self.engine = TemplateEngine(TEMPLATE_DIR)

        self.courses = {
            "1": ("Mechanics", "mechanics", "MEC"),
            "2": ("Electricity", "electricity", "ELE"),
            "3": ("Waves", "waves", "WAV"),
            "4": ("Thermodynamics", "thermodynamics", "THM"),
            "5": ("Modern Physics", "modern-physics", "MOD"),
        }

        self.modules = {

            "mechanics": [

                ("Kinematics", "kinematics", "KIN"),

                ("Dynamics", "dynamics", "DYN"),

                ("Work-Energy", "work-energy", "ENG"),

                ("Gravitation", "gravitation", "GRA"),

            ]

        }

    # ------------------------------------

    def get_user_input(self):

        print()

        for key, value in self.courses.items():

            print(f"{key}. {value[0]}")

        course_choice = input("\nCourse: ")

        self.course_name, self.course_folder, self.course_code = \
            self.courses[course_choice]

        print()

        modules = self.modules[self.course_folder]

        for index, module in enumerate(modules, start=1):

            print(index, module[0])

        module_choice = int(input("\nModule: ")) - 1

        (
            self.module_name,
            self.module_folder,
            self.module_code,
        ) = modules[module_choice]

        self.lesson_number = int(
            input("\nLesson Number: ")
        )

        self.title = input(
            "Lesson Title: "
        ).strip()

    # ------------------------------------

    def build_metadata(self):

        slug = (
            self.title
            .lower()
            .replace(" ", "-")
        )

        self.lesson_folder = (
            f"lesson-{self.lesson_number:02d}-{slug}"
        )

        self.lesson_path = (
            MANIM
            / self.course_folder
            / self.module_folder
            / self.lesson_folder
        )

        self.context = {

            "lesson_id":
            f"{self.course_code}-{self.module_code}-{self.lesson_number:03d}",

            "title":
            self.title,

            "course":
            self.course_name,

            "module":
            self.module_name,

        }

    # ------------------------------------

    def create_folders(self):

        folders = [

            "manim",

            "manim/scenes",

            "manim/assets",

            "script",

            "media",

            "interactive",

            "notebook",

            "calculator",

            "quiz",

            "assignment",

            "references",

        ]

        create_folder(self.lesson_path)

        for folder in folders:

            create_folder(
                self.lesson_path / folder
            )

    # ------------------------------------

    def generate_files(self):

        create_file(

            self.lesson_path / "README.md",

            self.engine.render(
                "README.md.tpl",
                self.context,
            )

        )

        create_file(

            self.lesson_path / "metadata.json",

            self.engine.render(
                "metadata.json.tpl",
                self.context,
            )

        )

        create_file(

            self.lesson_path
            / "manim"
            / "main.py",

            self.engine.render(
                "main.py.tpl",
                self.context,
            )

        )

        create_file(

            self.lesson_path
            / "script"
            / "lecture.md",

            self.engine.render(
                "lecture.md.tpl",
                self.context,
            )

        )

        create_file(

            self.lesson_path
            / "script"
            / "narration.md",

            self.engine.render(
                "narration.md.tpl",
                self.context,
            )

        )

        create_file(

            self.lesson_path
            / "script"
            / "storyboard.md",

            self.engine.render(
                "storyboard.md.tpl",
                self.context,
            )

        )

    # ------------------------------------

    def run(self):

        self.get_user_input()

        self.build_metadata()

        self.create_folders()

        self.generate_files()

        print("\n✓ Lesson generated successfully.\n")


def create_lesson():

    LessonGenerator().run()