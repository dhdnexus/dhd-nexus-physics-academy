from manim import *


class VariableTable(Table):

    def __init__(self, rows):

        super().__init__(

            rows,

            include_outer_lines=True

        )

        self.scale(0.55)