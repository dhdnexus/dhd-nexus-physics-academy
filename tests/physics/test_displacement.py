import pytest

from sdk.physics.mechanics.displacement import Displacement
from sdk.physics.core.validator import ValidationError


def test_calculate_direct_motion():
    result = Displacement.calculate(initial_position=5, final_position=18)
    assert result["displacement"].value == 13
    assert result["distance_travelled"].value == 13
    assert result.direction == "positive"
    assert result.is_return_to_origin is False


def test_calculate_with_explicit_detour_waypoints():
    result = Displacement.calculate(
        initial_position=-4,
        final_position=1,
        waypoints=[-4, 6, 1],
    )
    assert result["displacement"].value == 5
    assert result["distance_travelled"].value == 15


def test_calculate_return_to_origin_waypoints():
    result = Displacement.calculate(
        initial_position=-4,
        final_position=-4,
        waypoints=[-4, 6, -4],
    )
    assert result["displacement"].value == 0
    assert result["distance_travelled"].value == 20
    assert result.is_return_to_origin is True


def test_calculate_rejects_missing_arguments():
    with pytest.raises(ValidationError):
        Displacement.calculate(initial_position=None, final_position=10)


def test_calculate_rejects_waypoints_not_matching_endpoints():
    with pytest.raises(ValidationError):
        Displacement.calculate(
            initial_position=0,
            final_position=10,
            waypoints=[0, 5, 12],  # doesn't end at final_position
        )
