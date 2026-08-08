import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

type SiteSectionStatus = "current" | "coming-soon";

type SiteSection = {
  title: string;
  href?: string;
  status: SiteSectionStatus;
};

// Top-level DHD Nexus sections. Only sections with a live route and
// status "current" get a real link — everything else renders disabled
// with a "Soon" badge, matching the lesson status pattern already used
// in AcademyNavigation.ts.
const siteSections: SiteSection[] = [
  { title: "Physics Academy", href: "/physics-academy", status: "current" },
  { title: "Research", status: "coming-soon" },
  { title: "Programming", status: "coming-soon" },
  { title: "Data Science", status: "coming-soon" },
  { title: "Data Analysis", status: "coming-soon" },
  { title: "Development", status: "coming-soon" },
  { title: "Projects", status: "coming-soon" },
  { title: "STEM", status: "coming-soon" },
];

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
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      )}

      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 top-0 h-screen w-80 bg-slate-900 border-r border-slate-700 z-50 overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-6">DHD Nexus</h2>

          <nav className="space-y-1">
            {siteSections.map((section) => {
              if (section.status === "current" && section.href) {
                return (
                  <NavLink
                    key={section.title}
                    to={section.href}
                    onClick={onClose}
                    className={linkClass}
                  >
                    {section.title}
                  </NavLink>
                );
              }

              return (
                <div
                  key={section.title}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed"
                >
                  <span>{section.title}</span>
                  <span className="text-xs uppercase tracking-wide text-slate-600">
                    Soon
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
