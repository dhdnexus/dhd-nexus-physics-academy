from python_calculators.mechanics.kinematics.displacement_calculator import (
    calculate_displacement,
    calculate_distance,
    direction,
    vector_notation,
)


def test_calculate_displacement_positive():
    assert calculate_displacement(-4, 6) == 10


def test_calculate_displacement_negative():
    assert calculate_displacement(6, -4) == -10


def test_calculate_displacement_zero():
    assert calculate_displacement(5, 5) == 0


def test_calculate_distance_matches_magnitude_for_direct_motion():
    assert calculate_distance(-4, 6) == 10
    assert calculate_distance(6, -4) == 10
    assert calculate_distance(5, 5) == 0


def test_direction_positive_negative_zero():
    assert direction(-4, 6) == "positive"
    assert direction(6, -4) == "negative"
    assert direction(5, 5) == "zero"


def test_vector_notation_contains_key_values():
    notation = vector_notation(-4, 6)
    assert "6" in notation
    assert "-4" in notation
    assert "+10" in notation
