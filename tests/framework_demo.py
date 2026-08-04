from manim import *

from framework.core.base_scene import BaseLessonScene
from framework.equations.equation_box import EquationBox
from framework.graphs.position_time import PositionTimeGraph
from framework.vectors.displacement_arrow import DisplacementArrow


class FrameworkDemo(BaseLessonScene):

    def construct(self):

        # Section title
        self.show_section("DHD Nexus Framework")

        # Equation
        equation = EquationBox(
            r"s = ut + \frac{1}{2}at^2"
        )

        equation.to_edge(UP)

        self.play(FadeIn(equation))

        # Graph
        graph = PositionTimeGraph.create()

        graph.scale(0.55)

        graph.to_edge(LEFT)

        self.play(Create(graph))

        # Vector
        vector = DisplacementArrow(
            ORIGIN,
            RIGHT * 3
        )

        vector.shift(RIGHT * 3)

        self.play(GrowArrow(vector))

        self.pause(2)

        self.clear_screen()