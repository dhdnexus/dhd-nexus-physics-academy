import AcademyLayout from "../../components/academy/AcademyLayout";

export default function PhysicsAcademy() {
  return (
    <AcademyLayout
      title="Physics Academy"
      breadcrumb={["Home", "Physics Academy"]}
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Pick a topic to get started
        </h2>

        <p className="max-w-2xl text-slate-400">
          Use the knowledge tree on the left to jump into a lesson. Mechanics is
          the most complete module so far — start with Kinematics → Displacement
          if you're not sure where to begin.
        </p>
      </div>
    </AcademyLayout>
  );
}
