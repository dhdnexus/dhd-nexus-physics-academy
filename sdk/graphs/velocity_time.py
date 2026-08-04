from manim import *

from framework.graphs.axes_builder import AxesBuilder


class VelocityTimeGraph:

    @staticmethod
    def create():

        return AxesBuilder.create(

            "Time (s)",

            "Velocity (m/s)"

        )