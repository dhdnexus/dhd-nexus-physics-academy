from manim import *

from pathlib import Path


LOGO = (
    Path(__file__)
    .parents[2]
    / "shared-assets"
    / "logos"
    / "logo.png"
)


class Logo(ImageMobject):

    def __init__(self):

        super().__init__(LOGO)

        self.scale(0.30)

        self.to_corner(UR)