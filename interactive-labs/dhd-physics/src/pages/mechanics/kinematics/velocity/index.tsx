import AcademyLayout from "../../../../components/academy/AcademyLayout";
import KinematicsExplorer from "../components/KinematicsExplorer";

export default function Velocity() {
  return (
    <AcademyLayout
      title="Velocity Explorer"
      breadcrumb={[
        "Home",
        "Physics Academy",
        "Mechanics",
        "Kinematics",
        "Velocity",
      ]}
    >
      <div className="space-y-8">
        <KinematicsExplorer mode="velocity" />
        <section className="max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            Professor’s note
          </p>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Velocity includes direction.
          </h2>
          <p className="leading-7">
            A negative velocity is not an error: it tells you that the object is
            moving in the negative direction of your chosen axis. Use the
            position–time graph to see velocity as its gradient.
          </p>
        </section>
      </div>
    </AcademyLayout>
  );
}
