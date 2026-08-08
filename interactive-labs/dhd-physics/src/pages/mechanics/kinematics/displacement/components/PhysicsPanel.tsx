import { useLesson } from "../sdk/LessonContext";

export default function PhysicsPanel() {
  const { lesson } = useLesson();

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-cyan-400">
        Live Physics
      </h2>

      <p className="mt-2 text-slate-400">
        Physical quantities calculated directly from the current experiment.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-4">

        <Metric
          title="Initial Position"
          value={`${lesson.initialPosition.toFixed(1)} m`}
        />

        <Metric
          title="Final Position"
          value={`${lesson.finalPosition.toFixed(1)} m`}
        />

        <Metric
          title="Distance Travelled"
          value={`${lesson.distanceTravelled.toFixed(1)} m`}
          accent="text-amber-400"
        />

        <Metric
          title="Displacement"
          value={`${lesson.displacement.toFixed(1)} m`}
          accent="text-cyan-400"
        />

      </div>

    </section>
  );
}

type MetricProps = {
  title: string;
  value: string;
  accent?: string;
};

function Metric({
  title,
  value,
  accent = "text-white",
}: MetricProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className={`mt-3 text-3xl font-bold ${accent}`}>
        {value}
      </h3>

    </div>
  );
}