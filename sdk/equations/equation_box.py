from manim import *

from sdk.colors.colors import *


class EquationBox(VGroup):

    def __init__(self, equation):

        super().__init__()

        formula = MathTex(
            equation,
            color=PRIMARY
        )

        box = SurroundingRectangle(
            formula,
            color=ACCENT,
            buff=0.35
        )

        self.add(box, formula)