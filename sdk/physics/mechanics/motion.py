"""
=========================================
DHD Nexus Physics Engine

Mechanics -> Kinematics -> Motion

Single authoritative model for position, displacement, and distance
travelled in one dimension. This is the one place in the Physics Core
where these quantities are computed; every other consumer (Manim SDK,
future Marimo notebooks, calculators) must derive them from a Motion
instance rather than recomputing the arithmetic independently.
=========================================
"""

from dataclasses import dataclass
from typing import Sequence

from sdk.physics.core.validator import Validator, ValidationError


@dataclass(frozen=True)
class Motion:
    """
    An ordered sequence of one-dimensional positions ("waypoints")
    describing how an object moved along a single axis.

    A Motion may have exactly two waypoints (direct motion from an
    initial position to a final position) or more than two waypoints
    (a detour, or a return-to-origin, or any other non-monotonic
    path). All physics below is defined purely in terms of this
    waypoint sequence, so non-monotonic motion is not a special case
    -- it falls directly out of the general definition.

    Position vector r:
        the position of a waypoint relative to the chosen origin.

    Displacement vector:
        Δr = r_f - r_i
        depends only on the first and last waypoint. It does not
        depend on the path taken between them.

    Distance travelled:
        total path length = Σ|Δx_i|
        the sum of the absolute value of every step along the path.
        Unlike displacement, this depends on the full path, not just
        the endpoints.
    """

    waypoints: Sequence[float]
    unit: str = "m"

    def __post_init__(self):
        Validator.not_none(waypoints=self.waypoints)

        if len(self.waypoints) < 2:
            raise ValidationError(
                "Motion requires at least two waypoints "
                "(an initial position and a final position)."
            )

        for index, value in enumerate(self.waypoints):
            if value is None:
                raise ValidationError(
                    f"waypoint[{index}] is required."
                )

    # -- Position -----------------------------------------------------

    @property
    def initial_position(self) -> float:
        """r_i — the first waypoint."""
        return self.waypoints[0]

    @property
    def final_position(self) -> float:
        """r_f — the last waypoint."""
        return self.waypoints[-1]

    # -- Displacement ---------------------------------------------------

    @property
    def displacement(self) -> float:
        """
        Signed displacement: Δr = r_f - r_i.

        Depends only on the initial and final position, never on the
        path taken between them.
        """
        return self.final_position - self.initial_position

    @property
    def displacement_magnitude(self) -> float:
        """|Δr| — the magnitude of the displacement, always >= 0."""
        return abs(self.displacement)

    @property
    def direction(self) -> str:
        """
        The sign/direction of the displacement relative to the chosen
        positive direction: "positive", "negative", or "zero".
        """
        if self.displacement > 0:
            return "positive"
        if self.displacement < 0:
            return "negative"
        return "zero"

    # -- Distance -------------------------------------------------------

    @property
    def distance_travelled(self) -> float:
        """
        Total path length: Σ|Δx_i| across every waypoint-to-waypoint
        step. Always >= |displacement|, and strictly greater whenever
        the path is non-monotonic (a detour, or a return-to-origin).
        """
        return sum(
            abs(self.waypoints[i + 1] - self.waypoints[i])
            for i in range(len(self.waypoints) - 1)
        )

    # -- Misconception-facing helpers ------------------------------------

    @property
    def is_non_monotonic(self) -> bool:
        """True if the object ever reverses direction along the path."""
        steps = [
            self.waypoints[i + 1] - self.waypoints[i]
            for i in range(len(self.waypoints) - 1)
        ]
        signs = {1 if step > 0 else (-1 if step < 0 else 0) for step in steps if step != 0}
        return len(signs) > 1

    @property
    def is_return_to_origin(self) -> bool:
        """
        True if the object ends up back where it started after
        travelling a non-zero distance -- the canonical
        distance-vs-displacement counterexample.
        """
        return self.displacement == 0 and self.distance_travelled > 0

    @property
    def distance_equals_displacement_magnitude(self) -> bool:
        """
        True only for direct, monotonic motion in one direction, where
        distance travelled and displacement magnitude coincide. False
        for any detour or return-to-origin case.
        """
        return self.distance_travelled == self.displacement_magnitude
