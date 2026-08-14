import pytest

from sdk.physics.mechanics.motion import Motion
from sdk.physics.core.validator import ValidationError


def test_direct_positive_displacement():
    motion = Motion(waypoints=[0, 10])
    assert motion.displacement == 10
    assert motion.distance_travelled == 10
    assert motion.direction == "positive"


def test_direct_negative_displacement():
    motion = Motion(waypoints=[0, -10])
    assert motion.displacement == -10
    assert motion.distance_travelled == 10
    assert motion.direction == "negative"


def test_zero_displacement_same_point():
    motion = Motion(waypoints=[5, 5])
    assert motion.displacement == 0
    assert motion.distance_travelled == 0
    assert motion.direction == "zero"
    # Not "return to origin" -- no distance was actually travelled.
    assert motion.is_return_to_origin is False


def test_distance_for_direct_motion_equals_displacement_magnitude():
    motion = Motion(waypoints=[-4, 6])
    assert motion.distance_travelled == motion.displacement_magnitude == 10
    assert motion.distance_equals_displacement_magnitude is True


def test_a_to_b_to_c_detour():
    # A -> B -> C: displacement = C - A, distance = |B-A| + |C-B|
    motion = Motion(waypoints=[-4, 6, 1])
    assert motion.displacement == 1 - (-4) == 5
    assert motion.distance_travelled == abs(6 - (-4)) + abs(1 - 6) == 15
    assert motion.distance_travelled > motion.displacement_magnitude
    assert motion.is_non_monotonic is True


def test_return_to_origin():
    # A -> B -> A: displacement == 0, distance > 0.
    motion = Motion(waypoints=[-4, 6, -4])
    assert motion.displacement == 0
    assert motion.distance_travelled == 20
    assert motion.is_return_to_origin is True
    assert motion.distance_equals_displacement_magnitude is False


def test_multiple_waypoint_motion():
    motion = Motion(waypoints=[0, 5, -3, 8, 2])
    expected_distance = abs(5 - 0) + abs(-3 - 5) + abs(8 - (-3)) + abs(2 - 8)
    assert motion.distance_travelled == expected_distance
    assert motion.displacement == 2 - 0


def test_rejects_single_waypoint():
    with pytest.raises(ValidationError):
        Motion(waypoints=[5])


def test_rejects_empty_waypoints():
    with pytest.raises(ValidationError):
        Motion(waypoints=[])


def test_rejects_none_waypoint():
    with pytest.raises(ValidationError):
        Motion(waypoints=[0, None, 10])
