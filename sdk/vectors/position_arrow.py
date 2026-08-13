from manim import ORIGIN

from sdk.vectors.vector_arrow import VectorArrow
from sdk.colors.colors import ACCENT


class PositionArrow(VectorArrow):
    """
    Position vector r: always anchored to the coordinate/reference-frame
    origin, pointing to the object's current position.

    Deliberately visually distinct from DisplacementArrow -- different
    color (ACCENT, the DHD Nexus gold, vs. VECTOR cyan) and always
    anchored at the origin rather than at an arbitrary initial position
    -- so students cannot confuse "where the object is" (position) with
    "how far and which way it moved" (displacement).
    """

    def __init__(self, end, start=ORIGIN, **kwargs):
        super().__init__(start=start, end=end, color=ACCENT, **kwargs)
