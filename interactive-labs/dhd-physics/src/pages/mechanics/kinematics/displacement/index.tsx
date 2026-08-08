import AcademyLayout from "../../../../components/academy/AcademyLayout";

import AnimationPanel from "./components/AnimationPanel";
import ExplanationPanel from "./components/ExplanationPanel";
import InteractiveLab from "./components/InteractiveLab";

import { LessonProvider } from "./sdk/LessonContext";

export default function Displacement() {
  return (
    <LessonProvider>
      <AcademyLayout
        title="Displacement Explorer"
        breadcrumb={[
          "Home",
          "Physics Academy",
          "Mechanics",
          "Kinematics",
          "Displacement",
        ]}
      >
        <div className="space-y-10">
          <AnimationPanel />

          <InteractiveLab />

          <ExplanationPanel />
        </div>
      </AcademyLayout>
    </LessonProvider>
  );
}
