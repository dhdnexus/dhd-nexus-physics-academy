from manim import *


class Derivation(VGroup):

    def __init__(self, *equations):

        super().__init__()

        maths = VGroup(

            *[

                MathTex(eq)

                for eq in equations

            ]

        )

        maths.arrange(

            DOWN,

            aligned_edge=LEFT,

            buff=0.5

        )

        self.add(maths)