"""
DHD Nexus Manim SDK
1D reference frame (number line) for kinematics scenes.

Provides the minimum reference-frame information a 1D motion scene
needs to be unambiguous: an explicit origin, a positive-direction
indicator, and unit labels -- without forcing every scene onto a full
2D coordinate grid, which is unnecessary (and visually noisier) for a
one-dimensional lesson like Displacement.
"""

from manim import DOWN, UP, NumberLine, Dot, Arrow, Text, VGroup

from sdk.colors.colors import PRIMARY, ACCENT, TEXT_LIGHT


class NumberLineFrame(VGroup):
    """
    An explicit 1D reference frame: a number line with a marked
    origin, a positive-direction arrow, and a unit label.

    Use point_at(x) to convert a physical 1D position into a scene
    coordinate, so that position markers, PositionArrow, and
    DisplacementArrow can all be placed consistently on this frame.
    """

    def __init__(
        self,
        x_range=(-6, 6, 1),
        unit_label="m",
        length=10,
        **kwargs,
    ):
        super().__init__(**kwargs)

        self.line = NumberLine(
            x_range=list(x_range),
            length=length,
            color=PRIMARY,
            include_numbers=True,
            font_size=24,
        )

        self.origin_dot = Dot(self.line.number_to_point(0), color=ACCENT)
        self.origin_label = Text(
            "origin", font_size=20, color=ACCENT
        ).next_to(self.origin_dot, DOWN, buff=0.35)

        positive_end = x_range[1]
        self.direction_arrow = Arrow(
            self.line.number_to_point(positive_end - 1),
            self.line.number_to_point(positive_end),
            color=ACCENT,
            buff=0,
            stroke_width=3,
        )
        self.direction_label = Text(
            "positive direction", font_size=18, color=TEXT_LIGHT
        ).next_to(self.direction_arrow, UP, buff=0.2)

        self.unit_label_mobj = Text(
            f"units: {unit_label}", font_size=18, color=TEXT_LIGHT
        )
        self.unit_label_mobj.next_to(self.line, DOWN, buff=0.9)

        self.add(
            self.line,
            self.origin_dot,
            self.origin_label,
            self.direction_arrow,
            self.direction_label,
            self.unit_label_mobj,
        )

    def point_at(self, x):
        """Convert a 1D physical position value into a scene coordinate."""
        return self.line.number_to_point(x)
