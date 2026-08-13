"""
Visualization API smoke tests: confirm the new/refactored SDK
primitives can actually be instantiated and produce the expected
Manim mobject shapes. These are not physics-correctness tests (that's
tests/physics/) -- just "does the API work" checks.
"""

from sdk.vectors.position_arrow import PositionArrow
from sdk.vectors.displacement_arrow import DisplacementArrow
from sdk.vectors.number_line_frame import NumberLineFrame
from sdk.graphs.position_time import PositionTimeGraph


def test_position_arrow_instantiates_anchored_at_origin():
    from manim import ORIGIN

    arrow = PositionArrow(end=[3, 0, 0])
    assert (arrow.get_start() == ORIGIN).all()


def test_displacement_arrow_instantiates_between_two_points():
    arrow = DisplacementArrow(start=[-4, 0, 0], end=[6, 0, 0])
    assert not (arrow.get_start() == arrow.get_end()).all()


def test_position_and_displacement_arrows_have_distinct_colors():
    position = PositionArrow(end=[3, 0, 0])
    displacement = DisplacementArrow(start=[-4, 0, 0], end=[6, 0, 0])
    assert position.color != displacement.color


def test_number_line_frame_instantiates_and_maps_points():
    frame = NumberLineFrame(x_range=(-6, 6, 1), unit_label="m")
    origin_point = frame.point_at(0)
    other_point = frame.point_at(5)
    assert list(origin_point) != list(other_point)


def test_position_time_graph_builds_from_real_motion_data():
    times = [0, 1, 2]
    positions = [-4, 6, 1]
    graph, axes = PositionTimeGraph.create(times, positions)
    assert graph is not None
    assert axes is not None
    # Sanity check the axes actually map through the supplied data range.
    point_at_start = axes.coords_to_point(times[0], positions[0])
    point_at_end = axes.coords_to_point(times[-1], positions[-1])
    assert list(point_at_start) != list(point_at_end)
