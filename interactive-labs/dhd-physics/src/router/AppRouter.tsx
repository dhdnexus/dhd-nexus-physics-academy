import { Routes, Route } from "react-router-dom";

import AppShell from "../components/layout/AppShell";

import Home from "../pages/Home";
import PhysicsAcademy from "../pages/physics-academy";

import Displacement from "../pages/mechanics/kinematics/displacement";
import Velocity from "../pages/mechanics/kinematics/velocity";
import Acceleration from "../pages/mechanics/kinematics/acceleration";
import MotionGraphs from "../pages/mechanics/kinematics/motion-graphs";
import Suvat from "../pages/mechanics/kinematics/suvat";
import ProjectileMotion from "../pages/mechanics/kinematics/projectile-motion";
import NewtonsFirstLaw from "../pages/mechanics/dynamics/newtons-first-law";
import NewtonsSecondLaw from "../pages/mechanics/dynamics/newtons-second-law";
import NewtonsThirdLaw from "../pages/mechanics/dynamics/newtons-third-law";
import Friction from "../pages/mechanics/dynamics/friction";
import CircularMotion from "../pages/mechanics/dynamics/circular-motion";
import MomentumImpulse from "../pages/mechanics/dynamics/momentum-impulse";


export default function AppRouter() {
  return (
    <Routes>
      {/* Site root: AppShell renders the "DHD Nexus" header + top-level
          hamburger nav. Only used here, not on Academy/lesson pages —
          those get their own "DHD Nexus Physics Academy" header from
          AcademyLayout, which has its own hamburger wired to the same
          NavigationDrawer. Wrapping both here duplicated the header. */}
      <Route
        path="/"
        element={
          <AppShell>
            <Home />
          </AppShell>
        }
      />

      <Route path="/physics-academy" element={<PhysicsAcademy />} />

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
      <Route path="/mechanics/dynamics/newtons-first-law" element={<NewtonsFirstLaw />} />
      <Route path="/mechanics/dynamics/newtons-second-law" element={<NewtonsSecondLaw />} />
      <Route path="/mechanics/dynamics/newtons-third-law" element={<NewtonsThirdLaw />} />
      <Route path="/mechanics/dynamics/friction" element={<Friction />} />
      <Route path="/mechanics/dynamics/circular-motion" element={<CircularMotion />} />
      <Route path="/mechanics/dynamics/momentum-impulse" element={<MomentumImpulse />} />

    </Routes>
  );
}
