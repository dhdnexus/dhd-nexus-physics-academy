from manim import *

from framework.utils.title import TitleScreen


class SectionTransition:

    @staticmethod
    def play(scene, title):

        heading = TitleScreen(title)

        scene.play(FadeIn(heading))

        scene.wait(1)

        scene.play(FadeOut(heading))