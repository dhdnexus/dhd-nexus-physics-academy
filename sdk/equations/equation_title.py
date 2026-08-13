from manim import *

from sdk.colors.colors import *


class EquationTitle(Text):

    def __init__(self, title):

        super().__init__(

            title,

            color=ACCENT,

            font_size=34

        )