import { Routes, Route } from "react-router-dom";

import AppShell from "../components/layout/AppShell";

import Home from "../pages/Home";

import Displacement from "../pages/mechanics/kinematics/displacement";
import Velocity from "../pages/mechanics/kinematics/velocity";
import Acceleration from "../pages/mechanics/kinematics/acceleration";
import MotionGraphs from "../pages/mechanics/kinematics/motion-graphs";
import Suvat from "../pages/mechanics/kinematics/suvat";
import ProjectileMotion from "../pages/mechanics/kinematics/projectile-motion";

export default function AppRouter() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/mechanics/kinematics/displacement"
          element={<Displacement />}
        />

        <Route path="/mechanics/kinematics/velocity" element={<Velocity />} />

        <Route
          path="/mechanics/kinematics/acceleration"
          element={<Acceleration />}
        />

        <Route
          path="/mechanics/kinematics/motion-graphs"
          element={<MotionGraphs />}
        />

        <Route path="/mechanics/kinematics/suvat" element={<Suvat />} />

        <Route
          path="/mechanics/kinematics/projectile-motion"
          element={<ProjectileMotion />}
        />
      </Routes>
    </AppShell>
  );
}
