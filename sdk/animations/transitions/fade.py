from manim import *


class FadeTransition:

    @staticmethod
    def fade_in(scene, *mobjects):

        scene.play(
            *[FadeIn(obj) for obj in mobjects]
        )

    @staticmethod
    def fade_out(scene, *mobjects):

        scene.play(
            *[FadeOut(obj) for obj in mobjects]
        )