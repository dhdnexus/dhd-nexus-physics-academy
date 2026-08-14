from sdk.vectors.vector_arrow import VectorArrow

from sdk.colors.colors import ERROR


class ForceArrow(VectorArrow):

    def __init__(

        self,

        start,

        end,

        **kwargs

    ):

        super().__init__(

            start,

            end,

            color=ERROR,

            **kwargs

        )