"""
=========================================
DHD Nexus Physics Engine

Lesson 01
Displacement
=========================================
"""

from sdk.physics.core.quantity import Quantity
from sdk.physics.core.result import PhysicsResult
from sdk.physics.core.validator import Validator


class Displacement:

    """
    Lesson 01 Physics Module
    """

    @staticmethod
    def calculate(initial_position, final_position):

        Validator.not_none(
            initial_position=initial_position,
            final_position=final_position,
        )

        displacement = final_position - initial_position

        result = PhysicsResult(
            topic="Displacement",
            equation="s = x₂ - x₁",
            explanation="Displacement is the change in position."
        )

        result.add(
            "initial_position",
            Quantity(
                initial_position,
                "m",
                "x₁",
                "Initial Position"
            )
        )

        result.add(
            "final_position",
            Quantity(
                final_position,
                "m",
                "x₂",
                "Final Position"
            )
        )

        result.add(
            "displacement",
            Quantity(
                displacement,
                "m",
                "s",
                "Displacement"
            )
        )

        return result