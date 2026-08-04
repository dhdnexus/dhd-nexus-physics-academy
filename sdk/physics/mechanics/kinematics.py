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
    """

    @staticmethod
    def displacement(s):

        Validator.not_none(displacement=s)

        result = PhysicsResult(
            topic="Displacement",
            equation="s"
        )

        result.add(
            "displacement",
            Quantity(
                value=s,
                unit="m",
                symbol="s",
                name="Displacement"
            )
        )

        return result

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