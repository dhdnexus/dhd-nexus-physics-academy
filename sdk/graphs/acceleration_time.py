from manim import *

from framework.graphs.axes_builder import AxesBuilder


class AccelerationTimeGraph:

    @staticmethod
    def create():

        return AxesBuilder.create(

            "Time (s)",

            "Acceleration (m/s²)"

        )