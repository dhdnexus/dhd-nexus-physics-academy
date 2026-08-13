from manim import *

from sdk.colors.colors import *


class Footer(Text):

    def __init__(self):

        super().__init__(

            "DHD Nexus",

            color=TEXT_LIGHT,

            font_size=22

        )

        self.to_edge(DOWN)