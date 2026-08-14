"""
DHD Nexus Manim SDK
Position-time graph (x vs t), plotting real motion data with an
explicit physical<->graphical correspondence via a tracked dot.

Deliberately x vs t, never x vs y: this file has no notion of a
second spatial axis, so a position-time graph cannot accidentally be
read as a spatial trajectory of the motion.
"""

from manim import VGroup, VMobject, Dot

from sdk.graphs.axes_builder import AxesBuilder
from sdk.colors.colors import VECTOR, ACCENT


class PositionTimeGraph:
    """
    Builds a position-vs-time graph for a given set of (time,
    position) samples, and provides a helper to place a tracked dot at
    any (t, x) point on that graph -- intended to be animated in sync
    with the object's on-screen motion so students see the moving
    object and its x(t) point update together.
    """

    @staticmethod
    def create(times, positions, x_range=None, y_range=None):

        if len(times) != len(positions):
            raise ValueError("times and positions must be the same length.")

        y_min, y_max = min(positions), max(positions)
        y_pad = max(1, (y_max - y_min) * 0.2)

        axes_group = AxesBuilder.create(
            x_label="Time (s)",
            y_label="Position (m)",
            x_range=x_range or [0, max(times) + 1, 1],
            y_range=y_range or [round(y_min - y_pad), round(y_max + y_pad), 1],
        )
        axes = axes_group[0]

        graph_points = [
            axes.coords_to_point(t, x) for t, x in zip(times, positions)
        ]
        curve = VMobject(color=VECTOR, stroke_width=3)
        curve.set_points_smoothly(graph_points)

        return VGroup(axes_group, curve), axes

    @staticmethod
    def tracker_dot(axes, t, x, color=ACCENT):
        """A dot at (t, x) on the given axes, for syncing to the moving object."""
        return Dot(axes.coords_to_point(t, x), color=color)
