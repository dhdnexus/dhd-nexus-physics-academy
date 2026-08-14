from manim import *

from sdk.colors.colors import *


class AxesBuilder:

    @staticmethod
    def create(

        x_label="Time (s)",
        y_label="Quantity",

        x_range=[0,10,1],
        y_range=[0,10,1]

    ):

        axes = Axes(

            x_range=x_range,

            y_range=y_range,

            axis_config={

                "color":PRIMARY

            }

        )

        labels = axes.get_axis_labels(

            Text(x_label,font_size=26),

            Text(y_label,font_size=26)

        )

        return VGroup(

            axes,

            labels

        )