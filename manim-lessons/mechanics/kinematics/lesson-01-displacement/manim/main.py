"""
DHD Nexus Physics Academy
Lesson 01 -- Displacement

Conceptual visualization for the canonical lesson
content/lessons/mechanics.kinematics.displacement.yaml.

This scene contains NO physics calculations of its own. Every number
displayed (position, displacement, distance travelled) is derived from
sdk.physics.mechanics.motion.Motion, the single authoritative source
for that arithmetic in the Physics Core. The scene's job is purely to
visualize those already-computed values using the SDK's vector,
reference-frame, and graph primitives.
"""

from manim import (
    Text,
    Dot,
    VGroup,
    FadeIn,
    Write,
    Transform,
    UP,
    DOWN,
    LEFT,
)

from sdk.core.base_scene import BaseLessonScene
from sdk.colors.colors import PRIMARY, ACCENT, VECTOR
from sdk.equations.equation_title import EquationTitle
from sdk.equations.equation_box import EquationBox
from sdk.vectors.number_line_frame import NumberLineFrame
from sdk.vectors.position_arrow import PositionArrow
from sdk.vectors.displacement_arrow import DisplacementArrow
from sdk.graphs.position_time import PositionTimeGraph
from sdk.physics.mechanics.motion import Motion


def _readout(motion: Motion) -> VGroup:
    """A small on-screen numeric readout derived from a Motion instance."""
    return VGroup(
        Text(f"displacement = {motion.displacement:+.0f} m", font_size=24, color=VECTOR),
        Text(f"distance travelled = {motion.distance_travelled:.0f} m", font_size=24, color=ACCENT),
    ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)


class Lesson(BaseLessonScene):

    def construct(self):

        # ------------------------------------------------------------
        # Section 1 -- Reference Frame
        # ------------------------------------------------------------
        self.show_section("Reference Frame")

        frame = NumberLineFrame(x_range=(-6, 6, 1), unit_label="m")
        frame.shift(UP * 0.5)
        self.play(FadeIn(frame))
        self.pause()

        # ------------------------------------------------------------
        # Section 2 -- Position
        # ------------------------------------------------------------
        self.show_section("Position")

        x_here = -3
        position_dot = Dot(frame.point_at(x_here), color=PRIMARY)
        r_vector = PositionArrow(end=frame.point_at(x_here))
        r_label = Text("r", font_size=30, color=ACCENT).next_to(r_vector, UP, buff=0.15)

        self.play(FadeIn(position_dot), FadeIn(r_vector))
        self.play(Write(r_label))
        self.pause()
        self.clear_screen()
        self.add(frame)

        # ------------------------------------------------------------
        # Section 3 -- Displacement (direct motion)
        # ------------------------------------------------------------
        self.show_section("Displacement")

        motion_direct = Motion(waypoints=[-4, 6])

        r_i_dot = Dot(frame.point_at(motion_direct.initial_position), color=PRIMARY)
        r_f_dot = Dot(frame.point_at(motion_direct.final_position), color=PRIMARY)
        displacement_vec = DisplacementArrow(
            start=frame.point_at(motion_direct.initial_position),
            end=frame.point_at(motion_direct.final_position),
        )
        direct_readout = _readout(motion_direct).next_to(frame, DOWN, buff=1.4)

        self.play(FadeIn(r_i_dot), FadeIn(r_f_dot))
        self.play(FadeIn(displacement_vec))
        self.play(FadeIn(direct_readout))
        self.pause(2)
        self.clear_screen()
        self.add(frame)

        # ------------------------------------------------------------
        # Section 4 -- Detour (distance != displacement)
        # ------------------------------------------------------------
        self.show_section("Distance vs Displacement")

        motion_detour = Motion(waypoints=[-4, 6, 1])

        detour_dots = VGroup(*[
            Dot(frame.point_at(x), color=PRIMARY) for x in motion_detour.waypoints
        ])
        detour_displacement = DisplacementArrow(
            start=frame.point_at(motion_detour.initial_position),
            end=frame.point_at(motion_detour.final_position),
        )
        detour_readout = _readout(motion_detour).next_to(frame, DOWN, buff=1.4)

        self.play(FadeIn(detour_dots))
        self.play(FadeIn(detour_displacement))
        self.play(FadeIn(detour_readout))
        self.pause(2)
        self.clear_screen()
        self.add(frame)

        # ------------------------------------------------------------
        # Section 5 -- Return to Origin
        # ------------------------------------------------------------
        self.show_section("Return to Origin")

        motion_return = Motion(waypoints=[-4, 6, -4])
        assert motion_return.is_return_to_origin

        return_dots = VGroup(*[
            Dot(frame.point_at(x), color=PRIMARY) for x in motion_return.waypoints
        ])
        return_readout = _readout(motion_return).next_to(frame, DOWN, buff=1.4)

        self.play(FadeIn(return_dots))
        self.play(FadeIn(return_readout))
        self.pause(2)
        self.clear_screen()
        self.add(frame)

        # ------------------------------------------------------------
        # Section 6 -- Position-Time Correspondence
        # ------------------------------------------------------------
        self.show_section("Position-Time Correspondence")

        times = [0, 1, 2]
        positions = list(motion_detour.waypoints)  # [-4, 6, 1]

        graph, axes = PositionTimeGraph.create(times, positions)
        graph.scale(0.7).shift(DOWN * 0.5)

        self.play(FadeIn(graph))
        tracker = PositionTimeGraph.tracker_dot(axes, times[0], positions[0])
        self.play(FadeIn(tracker))
        for t, x in zip(times[1:], positions[1:]):
            self.play(Transform(tracker, PositionTimeGraph.tracker_dot(axes, t, x)))
            self.pause(0.5)
        self.pause()
        self.clear_screen()

        # ------------------------------------------------------------
        # Section 7 -- Equation Recap
        # ------------------------------------------------------------
        self.show_section("Equation Recap")

        title = EquationTitle("Displacement")
        displacement_eq = EquationBox(r"\Delta r = r_f - r_i")
        distance_eq = EquationBox(r"\text{distance} = \sum |\Delta x_i|")

        equations = VGroup(displacement_eq, distance_eq).arrange(DOWN, buff=0.6)
        title.next_to(equations, UP, buff=0.6)

        self.play(FadeIn(title))
        self.play(FadeIn(displacement_eq))
        self.pause()
        self.play(FadeIn(distance_eq))
        self.pause(2)
