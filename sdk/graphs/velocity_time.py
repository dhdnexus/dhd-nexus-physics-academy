from manim import *

from sdk.graphs.axes_builder import AxesBuilder


class VelocityTimeGraph:

    @staticmethod
    def create():

        return AxesBuilder.create(

            "Time (s)",

            "Velocity (m/s)"

        )