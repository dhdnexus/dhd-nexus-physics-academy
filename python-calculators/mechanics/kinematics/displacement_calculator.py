"""Reusable calculations for the DHD Nexus Lesson 01 displacement lab.

The functions in this module intentionally operate on one-dimensional positions,
which keeps the lesson focused on the distinction between displacement and
distance while remaining easy to reuse in later lessons.
"""

from __future__ import annotations

from numbers import Real


def _validate_positions(initial_position: Real, final_position: Real) -> None:
    """Raise a helpful error when a position is not a real scalar."""
    if not isinstance(initial_position, Real) or isinstance(initial_position, bool):
        raise TypeError("initial_position must be a real number")
    if not isinstance(final_position, Real) or isinstance(final_position, bool):
        raise TypeError("final_position must be a real number")


def calculate_displacement(initial_position: Real, final_position: Real) -> float:
    """Return signed one-dimensional displacement, ``final - initial``."""
    _validate_positions(initial_position, final_position)
    return float(final_position - initial_position)


def calculate_distance(initial_position: Real, final_position: Real) -> float:
    """Return the magnitude of travel between two one-dimensional positions."""
    return abs(calculate_displacement(initial_position, final_position))


def direction(initial_position: Real, final_position: Real) -> str:
    """Describe the direction of motion as positive, negative, or zero."""
    displacement = calculate_displacement(initial_position, final_position)
    if displacement > 0:
        return "positive"
    if displacement < 0:
        return "negative"
    return "zero"


def vector_notation(initial_position: Real, final_position: Real, unit: str = "m") -> str:
    """Format the signed displacement using one-dimensional vector notation."""
    if not isinstance(unit, str) or not unit.strip():
        raise ValueError("unit must be a non-empty string")
    displacement = calculate_displacement(initial_position, final_position)
    return f"Δx = {displacement:g} {unit.strip()}"


__all__ = [
    "calculate_displacement",
    "calculate_distance",
    "direction",
    "vector_notation",
]
