import AcademyLayout from "../../../../components/academy/AcademyLayout";
import KinematicsExplorer from "../components/KinematicsExplorer";
import MarimoLabLaunch from "./components/MarimoLabLaunch";

export default function Displacement() {
  return (
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
      <KinematicsExplorer mode="displacement" />
      <MarimoLabLaunch />
    </AcademyLayout>
  );
}
