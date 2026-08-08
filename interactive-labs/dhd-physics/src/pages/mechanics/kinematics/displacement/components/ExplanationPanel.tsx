import { useLesson } from "../sdk/LessonContext";

export default function ExplanationPanel() {
  const { lesson } = useLesson();

  const displacement = lesson.displacement.toFixed(1);
  const distance = lesson.distanceTravelled.toFixed(1);
  const current = lesson.currentPosition.toFixed(1);

  let observation = "";
  let concept = "";

  switch (lesson.route) {
    case "direct":
      observation = `The particle is currently located at ${current} m. It is travelling directly from its initial position to its final position without taking any detours.`;

      concept = `Because the motion follows the shortest possible path, the distance travelled is equal to the magnitude of the displacement. At this stage of the experiment, the displacement is ${displacement} m and the total distance travelled is ${distance} m.`;
      break;

    case "detour":
      observation = `The particle is following an indirect route before reaching its destination. Although the motion covers a longer path, the starting and ending positions remain the same.`;

      concept = `Distance measures the total length of the path travelled, whereas displacement depends only on the initial and final positions. Consequently, the distance travelled (${distance} m) is greater than the displacement (${displacement} m).`;
      break;

    case "return":
      observation = `The particle has travelled beyond its destination before returning toward the final position. This produces additional motion without changing the final location.`;

      concept = `Returning along the path increases the total distance travelled, but displacement is determined solely by the change in position from the starting point to the ending point. Even after reversing direction, the displacement remains ${displacement} m while the total distance travelled is ${distance} m.`;
      break;
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-cyan-400">
        Lesson Interpretation
      </h2>

      <p className="mt-2 text-slate-400">
        Interpret the experiment by connecting your observations to the
        underlying principles of displacement.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Observation */}

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-6">
          <h3 className="text-lg font-semibold text-cyan-300">
            Current Observation
          </h3>

          <p className="mt-4 leading-8 text-slate-300">{observation}</p>
        </div>

        {/* Interpretation */}

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-6">
          <h3 className="text-lg font-semibold text-cyan-300">
            Physics Interpretation
          </h3>

          <p className="mt-4 leading-8 text-slate-300">{concept}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-cyan-700/40 bg-cyan-950/10 p-6">
        <h3 className="text-lg font-semibold text-cyan-300">
          Key Learning Point
        </h3>

        <p className="mt-4 leading-8 text-slate-300">
          <strong className="text-cyan-300">Displacement</strong> is the
          straight-line change in position between the initial and final
          locations. It is a vector quantity because it has both magnitude and
          direction. In contrast,
          <strong className="text-amber-300"> distance travelled</strong> is the
          total length of the path followed by the particle. The two quantities
          are equal only when the motion occurs along the shortest possible path
          without any change in direction.
        </p>
      </div>
    </section>
  );
}
