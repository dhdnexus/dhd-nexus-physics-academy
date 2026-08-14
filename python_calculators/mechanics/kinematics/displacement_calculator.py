"""
DHD Nexus — python_calculators
Mechanics -> Kinematics -> Displacement Calculator

Milestone B9.1 establishes this as the reusable, importable calculator
package intended to be shared by Marimo notebooks, Manim lessons, and
future Physics Academy modules -- as distinct from the legacy
python-calculators/ script directory (kept in place, unmodified; it is
not a package and does not expose importable functions).

All four functions here operate on a direct, two-point motion (an
initial position xi and a final position xf). There is no waypoint /
detour concept in this module -- callers who need distance travelled
along a path with an intermediate waypoint should call
calculate_distance() twice (xi -> waypoint, waypoint -> xf) and sum the
results, rather than this module growing a second calculation shape.
"""

from __future__ import annotations


def calculate_displacement(xi: float, xf: float) -> float:
    """
    Signed displacement: Δx = xf - xi.

    Depends only on the initial and final position, not on any path
    taken between them.
    """
    return xf - xi


def calculate_distance(xi: float, xf: float) -> float:
    """
    Distance travelled for direct motion from xi to xf: |xf - xi|.

    For direct (non-detour) motion this equals the magnitude of the
    displacement. Callers building a multi-waypoint path should sum
    calculate_distance() over each leg of the path.
    """
    return abs(xf - xi)


def direction(xi: float, xf: float) -> str:
    """
    The sign of the displacement relative to the chosen positive
    direction: "positive", "negative", or "zero".
    """
    delta = calculate_displacement(xi, xf)
    if delta > 0:
        return "positive"
    if delta < 0:
        return "negative"
    return "zero"


def vector_notation(xi: float, xf: float) -> str:
    """
    A human-readable vector-notation string for the displacement,
    e.g. "Δx = xf - xi = 6 - (-4) = +10 m".
    """
    delta = calculate_displacement(xi, xf)
    return f"\u0394x = xf - xi = {xf:g} - ({xi:g}) = {delta:+g} m"
