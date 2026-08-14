# Storyboard — Displacement

Segment-by-segment map of what appears on screen in
`manim/main.py`, for use alongside `narration.md` when delivering the
lecture.

| # | Section title (on screen) | What's shown | What to point out |
|---|---|---|---|
| 1 | Reference Frame | `NumberLineFrame`: number line, origin marked, positive-direction arrow, unit label (m) | The origin and positive direction are a *choice* — nothing moves yet |
| 2 | Position | `PositionArrow` from origin to a marked point | Position vector r is always anchored at the origin |
| 3 | Displacement | `PositionArrow` at r_i and r_f, then `DisplacementArrow` from r_i to r_f | Displacement is drawn separately from either position vector — it connects the two positions, not the origin |
| 4 | Distance vs Displacement (detour) | Object moves r_i → waypoint → r_f; distance total accumulates on screen while displacement stays fixed | Distance keeps growing during the detour; displacement only reflects start and end |
| 5 | Return to Origin | Object moves r_i → r_f → back to r_i | Distance travelled is large and positive; displacement is exactly zero |
| 6 | Position–Time Correspondence | Position-time graph with a tracked dot moving in sync with the object on the number line | The graph is x vs t, not a picture of the path — pause here if students look confused about the axes |
| 7 | Equation Recap | `Δr = r_f − r_i` in an `EquationBox`, alongside the distance formula | Emphasize: displacement depends only on the endpoints; distance depends on the whole path |
