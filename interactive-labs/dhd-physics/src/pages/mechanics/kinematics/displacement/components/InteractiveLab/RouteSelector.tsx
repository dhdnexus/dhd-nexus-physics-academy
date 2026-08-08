import { useLesson } from "../../sdk/LessonContext";
import type { RouteType } from "../../sdk/lessonState";

export default function RouteSelector() {
  const { lesson, setRoute } = useLesson();

  const routes: {
    value: RouteType;
    label: string;
    description: string;
  }[] = [
    {
      value: "direct",
      label: "Direct Route",
      description: "Shortest path between the start and finish.",
    },
    {
      value: "detour",
      label: "Detour Route",
      description: "A longer route with the same final destination.",
    },
    {
      value: "return",
      label: "Return Journey",
      description: "Travel beyond the destination before returning.",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-2 text-2xl font-bold text-cyan-400">Route Selection</h2>

      <p className="mb-8 text-slate-400">
        Select how the particle reaches its destination.
      </p>

      <div className="space-y-5">
        {routes.map((route) => (
          <label
            key={route.value}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700 p-4 hover:border-cyan-400"
          >
            <input
              type="radio"
              checked={lesson.route === route.value}
              onChange={() => setRoute(route.value)}
              className="mt-1"
            />

            <div>
              <p className="font-semibold">{route.label}</p>

              <p className="mt-1 text-sm text-slate-400">{route.description}</p>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
