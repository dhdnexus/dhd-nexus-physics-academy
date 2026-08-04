from manim import *


class Highlight:

    @staticmethod
    def object(scene, mob):

        scene.play(

            Indicate(

                mob,

                scale_factor=1.1

            )

        )