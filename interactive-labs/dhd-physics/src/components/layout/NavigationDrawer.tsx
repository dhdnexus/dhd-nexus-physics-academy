import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NavigationDrawer({ open, onClose }: Props) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 transition ${
      isActive
        ? "bg-cyan-500 text-black font-semibold"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 top-0 h-screen w-80 bg-slate-900 border-r border-slate-700 z-50 overflow-y-auto"
      >
        <div className="p-6">

          <h2 className="text-xl font-bold text-cyan-400 mb-6">
            Mechanics
          </h2>

          <details open>
            <summary className="cursor-pointer font-semibold mb-3">
              Kinematics
            </summary>

            <div className="ml-3 space-y-2">

              <NavLink
                to="/mechanics/kinematics/displacement"
                onClick={onClose}
                className={linkClass}
              >
                Displacement
              </NavLink>

              <NavLink
                to="/mechanics/kinematics/velocity"
                onClick={onClose}
                className={linkClass}
              >
                Velocity
              </NavLink>

              <NavLink
                to="/mechanics/kinematics/acceleration"
                onClick={onClose}
                className={linkClass}
              >
                Acceleration
              </NavLink>

              <NavLink
                to="/mechanics/kinematics/motion-graphs"
                onClick={onClose}
                className={linkClass}
              >
                Motion Graphs
              </NavLink>

              <NavLink
                to="/mechanics/kinematics/suvat"
                onClick={onClose}
                className={linkClass}
              >
                SUVAT
              </NavLink>

              <NavLink
                to="/mechanics/kinematics/projectile-motion"
                onClick={onClose}
                className={linkClass}
              >
                Projectile Motion
              </NavLink>

            </div>
          </details>

          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">
              Dynamics
            </summary>
          </details>

          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">
              Work & Energy
            </summary>
          </details>

          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">
              Gravitation
            </summary>
          </details>

        </div>
      </motion.aside>
    </>
  );
}