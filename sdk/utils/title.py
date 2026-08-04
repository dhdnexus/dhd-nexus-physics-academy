from manim import *

from framework.colors.colors import *


class TitleScreen(VGroup):

    def __init__(self, title):

        super().__init__()

        heading = Text(
            title,
            color=PRIMARY,
            font_size=54
        )

        line = Line(
            LEFT * 3,
            RIGHT * 3,
            color=ACCENT
        )

        self.add(
            heading,
            line.next_to(
                heading,
                DOWN
            )
        )