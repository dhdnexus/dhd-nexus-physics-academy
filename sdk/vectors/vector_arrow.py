from manim import *

from framework.colors.colors import *


class VectorArrow(Arrow):

    def __init__(

        self,

        start=ORIGIN,

        end=RIGHT,

        color=VECTOR,

        **kwargs

    ):

        super().__init__(

            start,

            end,

            buff=0,

            color=color,

            **kwargs

        )