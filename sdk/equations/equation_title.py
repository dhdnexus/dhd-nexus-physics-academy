from manim import *

from framework.colors.colors import *


class EquationTitle(Text):

    def __init__(self, title):

        super().__init__(

            title,

            color=ACCENT,

            font_size=34

        )