"""
=========================================
DHD Nexus Physics Engine

Mechanics → Kinematics
=========================================
"""

from sdk.physics.core.quantity import Quantity
from sdk.physics.core.result import PhysicsResult
from sdk.physics.core.validator import Validator


class Kinematics:

    """
    Collection of reusable kinematics functions.

    Note: displacement/distance calculations live in
    sdk.physics.mechanics.motion.Motion (and the
    sdk.physics.mechanics.displacement.Displacement facade over it).
    This class intentionally does not duplicate that calculation --
    there is exactly one authoritative displacement path in the
    Physics Core.
    """

    @staticmethod
    def velocity(v):

        Validator.not_none(velocity=v)

        result = PhysicsResult(
            topic="Velocity",
            equation="v"
        )

        result.add(
            "velocity",
            Quantity(
                value=v,
                unit="m/s",
                symbol="v",
                name="Velocity"
            )
        )

        return result

    @staticmethod
    def acceleration(a):

        Validator.not_none(acceleration=a)

        result = PhysicsResult(
            topic="Acceleration",
            equation="a"
        )

        result.add(
            "acceleration",
            Quantity(
                value=a,
                unit="m/s²",
                symbol="a",
                name="Acceleration"
            )
        )

        return result