import { useLesson } from "../../sdk/LessonContext";

export default function MeasurementPanel() {
  const { lesson } = useLesson();

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-2 text-2xl font-bold text-cyan-400">
        Laboratory Measurements
      </h2>

      <p className="mb-8 text-slate-400">
        Measurements recorded directly from the current experiment.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MeasurementCard
          title="Initial Position"
          value={`${lesson.initialPosition.toFixed(1)} m`}
        />

        <MeasurementCard
          title="Final Position"
          value={`${lesson.finalPosition.toFixed(1)} m`}
        />

        <MeasurementCard
          title="Distance Travelled"
          value={`${lesson.distanceTravelled.toFixed(1)} m`}
          valueColor="text-amber-400"
        />

        <MeasurementCard
          title="Displacement"
          value={`${lesson.displacement.toFixed(1)} m`}
          valueColor="text-cyan-400"
        />
      </div>
    </section>
  );
}

type MeasurementCardProps = {
  title: string;
  value: string;
  valueColor?: string;
};

function MeasurementCard({
  title,
  value,
  valueColor = "text-white",
}: MeasurementCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className={`mt-3 text-3xl font-bold ${valueColor}`}>{value}</h3>
    </div>
  );
}
