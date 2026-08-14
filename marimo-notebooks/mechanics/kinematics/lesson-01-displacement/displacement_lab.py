import marimo

__generated_with = "0.23.16"
app = marimo.App(width="medium", app_title="Displacement — DHD Nexus Physics Academy")


with app.setup:
    # -----------------------------------------------------------------
    # Repository bootstrap
    #
    # This notebook lives four directories below the engineering repo
    # root (marimo-notebooks/mechanics/kinematics/lesson-01-displacement/).
    # python_calculators/ lives at the repo root, so it needs to be on
    # sys.path before it can be imported -- both when this file is run
    # via `marimo run` / `marimo edit` and when it's imported directly
    # by pytest.
    # -----------------------------------------------------------------
    import sys
    from pathlib import Path

    _repo_root = Path(__file__).resolve().parents[4]
    if str(_repo_root) not in sys.path:
        sys.path.insert(0, str(_repo_root))

    import marimo as mo

    # -----------------------------------------------------------------
    # Brand / accent constants (DHD Nexus navy/gold palette)
    # -----------------------------------------------------------------
    NAVY = "#0B1F3A"
    GOLD = "#D4AF37"
    CYAN = "#00E5FF"
    SLATE = "#4A5A72"

    # -----------------------------------------------------------------
    # Calculator imports -- the single authoritative source for
    # displacement mathematics. This notebook does not recompute or
    # duplicate any of this arithmetic itself.
    # -----------------------------------------------------------------
    from python_calculators.mechanics.kinematics.displacement_calculator import (
        calculate_displacement,
        calculate_distance,
        direction,
        vector_notation,
    )

    # -----------------------------------------------------------------
    # SVG helper functions
    # -----------------------------------------------------------------
    def render_number_line_svg(
        x1: float,
        x2: float,
        x_min: float = -10,
        x_max: float = 10,
        waypoint: float | None = None,
        width: int = 640,
        height: int = 160,
    ) -> str:
        """
        A small, dependency-free SVG number line showing the initial
        and final position (and, optionally, a detour waypoint) with a
        displacement arrow drawn directly from x1 to x2.
        """
        margin = 40
        usable_width = width - 2 * margin

        def to_px(x: float) -> float:
            fraction = (x - x_min) / (x_max - x_min)
            return margin + fraction * usable_width

        axis_y = height * 0.55
        origin_px = to_px(0)
        x1_px = to_px(x1)
        x2_px = to_px(x2)

        ticks = []
        for tick in range(int(x_min), int(x_max) + 1):
            tx = to_px(tick)
            ticks.append(
                f'<line x1="{tx}" y1="{axis_y - 6}" x2="{tx}" y2="{axis_y + 6}" '
                f'stroke="{SLATE}" stroke-width="1" />'
            )
            if tick % 2 == 0:
                ticks.append(
                    f'<text x="{tx}" y="{axis_y + 24}" font-size="11" fill="{SLATE}" '
                    f'text-anchor="middle">{tick}</text>'
                )
        ticks_svg = "".join(ticks)

        waypoint_svg = ""
        if waypoint is not None:
            wp_px = to_px(waypoint)
            waypoint_svg = (
                f'<circle cx="{wp_px}" cy="{axis_y}" r="6" fill="none" '
                f'stroke="{GOLD}" stroke-width="2" />'
                f'<text x="{wp_px}" y="{axis_y - 16}" font-size="12" fill="{GOLD}" '
                f'text-anchor="middle">detour</text>'
            )

        arrow_id = "displacement-arrowhead"

        svg = f"""
<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg"
     style="background:{NAVY}; border-radius:8px;">
  <defs>
    <marker id="{arrow_id}" markerWidth="10" markerHeight="10" refX="8" refY="3"
            orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="{CYAN}" />
    </marker>
  </defs>

  <line x1="{margin}" y1="{axis_y}" x2="{width - margin}" y2="{axis_y}"
        stroke="{SLATE}" stroke-width="2" />
  {ticks_svg}

  <circle cx="{origin_px}" cy="{axis_y}" r="4" fill="{GOLD}" />
  <text x="{origin_px}" y="{axis_y + 24}" font-size="11" fill="{GOLD}"
        text-anchor="middle">0</text>

  {waypoint_svg}

  <line x1="{x1_px}" y1="{axis_y - 28}" x2="{x2_px}" y2="{axis_y - 28}"
        stroke="{CYAN}" stroke-width="2.5" marker-end="url(#{arrow_id})" />
  <text x="{(x1_px + x2_px) / 2}" y="{axis_y - 36}" font-size="13" fill="{CYAN}"
        text-anchor="middle">&#916;x</text>

  <circle cx="{x1_px}" cy="{axis_y}" r="6" fill="{NAVY}" stroke="#FFFFFF" stroke-width="2" />
  <text x="{x1_px}" y="{axis_y - 44}" font-size="12" fill="#FFFFFF"
        text-anchor="middle">x&#8321; = {x1:g}</text>

  <circle cx="{x2_px}" cy="{axis_y}" r="6" fill="{CYAN}" stroke="#FFFFFF" stroke-width="2" />
  <text x="{x2_px}" y="{axis_y - 44}" font-size="12" fill="#FFFFFF"
        text-anchor="middle">x&#8322; = {x2:g}</text>
</svg>
""".strip()

        return svg


# =============================================================================
# Section 1 — Welcome
# =============================================================================


@app.cell
def _():
    mo.md(
        f"""
        <div style="background:{NAVY}; color:#FFFFFF; padding:1.5rem 2rem;
                    border-radius:8px; border-left:6px solid {GOLD};">
        <h1 style="margin:0; color:{GOLD};">DHD Nexus Physics Academy</h1>
        <h2 style="margin:0.25rem 0 0 0; font-weight:400;">Lesson 01 — Displacement</h2>
        <p style="margin-top:1rem; color:#C9D3E0;">
        This notebook is the computational companion to the Displacement
        lecture and Web Lab. Use the sliders below to move an object along
        a number line and watch <b>position</b>, <b>displacement</b>, and
        <b>distance travelled</b> update live.
        </p>
        </div>
        """
    )
    return


# =============================================================================
# Section 2 — Position Explorer
# =============================================================================


@app.cell
def _():
    mo.md("## Position Explorer")
    return


@app.cell
def _():
    x1_slider = mo.ui.slider(
        start=-10, stop=10, step=1, value=-4, label="Initial position x₁ (m)"
    )
    x2_slider = mo.ui.slider(
        start=-10, stop=10, step=1, value=6, label="Final position x₂ (m)"
    )
    mo.hstack([x1_slider, x2_slider])
    return x1_slider, x2_slider


# =============================================================================
# Section 3 — Interactive SVG Number Line
# =============================================================================


@app.cell
def _(x1_slider, x2_slider):
    mo.Html(render_number_line_svg(x1_slider.value, x2_slider.value))
    return


# =============================================================================
# Section 4 — Displacement Calculation
# =============================================================================


@app.cell
def _():
    mo.md("## Displacement Calculation")
    return


@app.cell
def _(x1_slider, x2_slider):
    displacement = calculate_displacement(x1_slider.value, x2_slider.value)
    distance = calculate_distance(x1_slider.value, x2_slider.value)
    motion_direction = direction(x1_slider.value, x2_slider.value)
    notation = vector_notation(x1_slider.value, x2_slider.value)
    return displacement, distance, motion_direction, notation


@app.cell
def _(displacement, distance, motion_direction, notation, x1_slider, x2_slider):
    mo.md(
        f"""
        | Quantity | Value |
        |---|---|
        | Initial position, x₁ | {x1_slider.value:g} m |
        | Final position, x₂ | {x2_slider.value:g} m |
        | Displacement, Δx | {displacement:+g} m |
        | Distance travelled | {distance:g} m |
        | Direction | {motion_direction} |

        {notation}
        """
    )
    return


# =============================================================================
# Section 5 — Distance vs Displacement
# =============================================================================


@app.cell
def _():
    mo.md(
        """
        ## Distance vs Displacement

        Displacement depends only on where you start and where you end
        up. Distance travelled depends on the whole path. Drag the
        **detour** slider below to send the object via an intermediate
        point between x₁ and x₂, and watch the displacement stay fixed
        while the distance travelled changes.

        The detour distance is computed by calling `calculate_distance()`
        once for each leg of the path (x₁ → detour, detour → x₂) and
        summing the two legs — no new displacement/distance arithmetic is
        introduced here.
        """
    )
    return


@app.cell
def _(x1_slider, x2_slider):
    detour_default = round((x1_slider.value + x2_slider.value) / 2)
    detour_slider = mo.ui.slider(
        start=-10, stop=10, step=1, value=detour_default, label="Detour waypoint (m)"
    )
    detour_slider
    return (detour_slider,)


@app.cell
def _(detour_slider, x1_slider, x2_slider):
    detour_displacement = calculate_displacement(x1_slider.value, x2_slider.value)
    detour_distance = calculate_distance(x1_slider.value, detour_slider.value) + calculate_distance(
        detour_slider.value, x2_slider.value
    )
    return detour_displacement, detour_distance


@app.cell
def _(detour_slider, x1_slider, x2_slider):
    mo.Html(
        render_number_line_svg(
            x1_slider.value, x2_slider.value, waypoint=detour_slider.value
        )
    )
    return


@app.cell
def _(detour_displacement, detour_distance):
    is_direct = detour_distance == abs(detour_displacement)
    comparison_note = (
        "Direct path: distance travelled equals the magnitude of the displacement."
        if is_direct
        else "Detour: distance travelled is **greater** than the magnitude of the displacement."
    )
    mo.md(
        f"""
        | Quantity | Value |
        |---|---|
        | Displacement, Δx | {detour_displacement:+g} m |
        | Distance travelled (via detour) | {detour_distance:g} m |

        {comparison_note}
        """
    )
    return


# =============================================================================
# Section 6 — Concept Check
# =============================================================================


@app.cell
def _():
    mo.md("## Concept Check")
    return


@app.cell
def _():
    q1 = mo.ui.radio(
        options=["Yes", "No"],
        label="If an object ends up back where it started, is its displacement zero?",
    )
    q2 = mo.ui.radio(
        options=[
            "Distance and displacement are always equal",
            "Distance and displacement are equal only for direct, one-way motion",
            "Distance is always smaller than displacement",
        ],
        label="Which statement is correct?",
    )
    q3 = mo.ui.radio(
        options=["Position", "Displacement", "Distance travelled"],
        label="Which quantity is always anchored to the origin?",
    )
    mo.vstack([q1, q2, q3])
    return q1, q2, q3


# =============================================================================
# Section 7 — Immediate Feedback
# =============================================================================


@app.cell
def _():
    mo.md("## Immediate Feedback")
    return


@app.cell
def _(q1, q2, q3):
    def _feedback(question, correct_answer, correct_message, incorrect_message):
        if question.value is None:
            return ""
        if question.value == correct_answer:
            return f"✅ {correct_message}"
        return f"❌ {incorrect_message}"

    feedback_1 = _feedback(
        q1,
        "Yes",
        "Correct — displacement depends only on start and end position.",
        "Not quite — displacement only depends on the initial and final position, "
        "so a return to the start gives Δx = 0, even though distance travelled is not zero.",
    )
    feedback_2 = _feedback(
        q2,
        "Distance and displacement are equal only for direct, one-way motion",
        "Correct.",
        "Not quite — try the detour slider above and compare the two values again.",
    )
    feedback_3 = _feedback(
        q3,
        "Position",
        "Correct — position is always measured from the origin. "
        "Displacement connects two positions, not the origin.",
        "Not quite — think about which point the displacement arrow is drawn between "
        "in the Position Explorer above.",
    )

    mo.md(
        f"""
        1. {feedback_1}
        2. {feedback_2}
        3. {feedback_3}
        """
    )
    return


if __name__ == "__main__":
    app.run()
