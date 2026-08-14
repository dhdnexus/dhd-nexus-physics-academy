from sdk.vectors.vector_arrow import VectorArrow
from sdk.colors.colors import VECTOR


class DisplacementArrow(VectorArrow):
    """
    Displacement vector Delta r = r_f - r_i: connects the initial
    position directly to the final position, regardless of the actual
    path travelled (a straight line even for a detour or a
    return-to-origin motion).

    Uses the base VECTOR color and is never anchored at the origin,
    which -- together with PositionArrow always being origin-anchored
    and a different color -- is the visual encoding that keeps
    position and displacement distinguishable on screen.
    """

    def __init__(self, start, end, **kwargs):
        super().__init__(start=start, end=end, color=VECTOR, **kwargs)
