from manim import *

from framework.graphs.axes_builder import AxesBuilder


class PositionTimeGraph:

    @staticmethod
    def create():

        return AxesBuilder.create(

            "Time (s)",

            "Position (m)"

        )