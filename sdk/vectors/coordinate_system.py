from manim import *

from sdk.colors.colors import *


class CoordinateSystem(NumberPlane):

    def __init__(self):

        super().__init__(

            background_line_style={

                "stroke_color": GRID,

                "stroke_opacity": 0.4,

                "stroke_width": 1

            }

        )