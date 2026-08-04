"""
Common validation routines for the Physics Engine.
"""


class ValidationError(Exception):
    """Raised when supplied physics values are invalid."""
    pass


class Validator:

    @staticmethod
    def positive(name, value):

        if value <= 0:
            raise ValidationError(
                f"{name} must be greater than zero."
            )

    @staticmethod
    def non_negative(name, value):

        if value < 0:
            raise ValidationError(
                f"{name} cannot be negative."
            )

    @staticmethod
    def not_none(**kwargs):

        for key, value in kwargs.items():

            if value is None:
                raise ValidationError(
                    f"{key} is required."
                )