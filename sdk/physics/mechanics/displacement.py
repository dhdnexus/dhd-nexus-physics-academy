"""
=========================================
DHD Nexus Physics Engine

Lesson 01
Displacement

This module is the single authoritative entry point for the
Displacement lesson's physics. All displacement/distance arithmetic
lives in sdk.physics.mechanics.motion.Motion; this module builds a
Motion from lesson-facing arguments and packages the result as a
PhysicsResult for display (Manim, calculators, etc).
=========================================
"""

from sdk.physics.core.quantity import Quantity
from sdk.physics.core.result import PhysicsResult
from sdk.physics.core.validator import Validator, ValidationError
from sdk.physics.mechanics.motion import Motion


class Displacement:
    """
    Lesson 01 Physics Module.

    calculate() accepts either a simple (initial_position,
    final_position) pair for direct motion, or an explicit list of
    waypoints for non-monotonic motion (a detour, or a return to the
    starting position). Either way, the underlying calculation is
    delegated to Motion -- there is exactly one place this arithmetic
    is performed.
    """

    @staticmethod
    def calculate(initial_position, final_position, waypoints=None, unit="m"):

        Validator.not_none(
            initial_position=initial_position,
            final_position=final_position,
        )

        path = list(waypoints) if waypoints else [initial_position, final_position]

        if path[0] != initial_position or path[-1] != final_position:
            raise ValidationError(
                "waypoints, if supplied, must start at initial_position "
                "and end at final_position."
            )

        motion = Motion(waypoints=path, unit=unit)

        result = PhysicsResult(
            topic="Displacement",
            equation="\u0394r = r_f - r_i",
            explanation=(
                "Displacement is the change in position between the initial "
                "and final position. Distance travelled is the total path "
                "length, and can be greater than the magnitude of the "
                "displacement whenever the motion is non-monotonic."
            ),
        )

        result.add(
            "initial_position",
            Quantity(motion.initial_position, unit, "r_i", "Initial Position"),
        )

        result.add(
            "final_position",
            Quantity(motion.final_position, unit, "r_f", "Final Position"),
        )

        result.add(
            "displacement",
            Quantity(motion.displacement, unit, "\u0394r", "Displacement"),
        )

        result.add(
            "displacement_magnitude",
            Quantity(motion.displacement_magnitude, unit, "|\u0394r|", "Displacement Magnitude"),
        )

        result.add(
            "distance_travelled",
            Quantity(motion.distance_travelled, unit, "d", "Distance Travelled"),
        )

        result.direction = motion.direction
        result.is_return_to_origin = motion.is_return_to_origin

        return result
