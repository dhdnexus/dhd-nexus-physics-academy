from framework.vectors.vector_arrow import VectorArrow

from framework.colors.colors import SUCCESS


class VelocityArrow(VectorArrow):

    def __init__(

        self,

        start,

        end,

        **kwargs

    ):

        super().__init__(

            start,

            end,

            color=SUCCESS,

            **kwargs

        )