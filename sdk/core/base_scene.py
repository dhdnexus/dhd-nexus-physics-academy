from manim import *

from framework.utils.logo import Logo
from framework.utils.footer import Footer
from framework.animations.transitions.section import SectionTransition


class BaseLessonScene(Scene):

    def setup(self):
        """Runs automatically before construct()."""
        self.logo = Logo()
        self.footer = Footer()

        self.add(self.logo)
        self.add(self.footer)

    def show_section(self, title):
        SectionTransition.play(self, title)

    def show_title(self, title):
        text = Text(title, font_size=48)
        self.play(Write(text))
        self.wait(1)
        self.play(FadeOut(text))

    def pause(self, seconds=1):
        self.wait(seconds)

    def clear_screen(self):
        self.play(
            *[
                FadeOut(mob)
                for mob in self.mobjects
                if mob not in [self.logo, self.footer]
            ]
        )