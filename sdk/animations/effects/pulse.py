from manim import *


class Pulse:

    @staticmethod
    def object(scene, mob):

        scene.play(

            ApplyWave(mob)

        )