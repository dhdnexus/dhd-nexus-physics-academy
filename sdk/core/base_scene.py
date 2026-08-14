from manim import *

from sdk.utils.logo import Logo
from sdk.utils.footer import Footer
from sdk.animations.transitions.section import SectionTransition


class BaseLessonScene(Scene):

    def setup(self):
        """Runs automatically before construct()."""
        self.logo = self._safe_logo()
        self.footer = Footer()

        if self.logo is not None:
            self.add(self.logo)
        self.add(self.footer)

    @staticmethod
    def _safe_logo():
        """
        Logo() reads shared-assets/logos/logo.png, which lives outside
        this package and is not guaranteed to be present in every
        environment. Degrade gracefully (no logo mobject) rather than
        crashing every scene when the asset is missing.
        """
        try:
            return Logo()
        except Exception:
            return None

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