import AcademyLayout from "../../../../components/academy/AcademyLayout";
import KinematicsExplorer from "../components/KinematicsExplorer";

export default function Suvat() {
  return (
    <AcademyLayout
      title="SUVAT Equation Lab"
      breadcrumb={[
        "Home",
        "Physics Academy",
        "Mechanics",
        "Kinematics",
        "SUVAT",
      ]}
    >
      <div className="space-y-8">
        <KinematicsExplorer mode="suvat" />
        <section className="max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            Professor’s note
          </p>
          <h2 className="mb-3 text-xl font-semibold text-white">
            SUVAT is a model, not a memorisation trick.
          </h2>
          <p className="leading-7">
            These equations connect displacement, initial velocity, final
            velocity, acceleration, and time when acceleration is constant.
            Change one input and check how the other representations respond.
          </p>
        </section>
      </div>
    </AcademyLayout>
  );
}
