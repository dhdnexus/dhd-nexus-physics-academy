import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import NavigationDrawer from "../layout/NavigationDrawer";

type AcademyLayoutProps = {
  title: string;
  breadcrumb: string[];
  children: ReactNode;
};

export default function AcademyLayout({
  title,
  breadcrumb,
  children,
}: AcademyLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top-level DHD Nexus nav, reachable from every Academy page.
          AppShell does NOT wrap this layout — see AppRouter.tsx — so
          this is the only header rendered on lesson pages. */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* ================================================== */}
      {/* PHYSICS ACADEMY HEADER                            */}
      {/* ================================================== */}

      <header className="flex h-16 items-center gap-4 border-b border-slate-800 bg-slate-900 px-6">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="text-slate-300 transition hover:text-cyan-400"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-xl text-cyan-400">
            ⚛
          </div>

          <div>
            <a
              href="/"
              className="block text-base font-bold text-white transition hover:text-cyan-400"
            >
              DHD Nexus Physics Academy
            </a>

            <p className="text-xs text-slate-400">
              Interactive Undergraduate Physics
            </p>
          </div>
        </div>
      </header>

      {/* ================================================== */}
      {/* ACADEMY WORKSPACE                                 */}
      {/* ================================================== */}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Knowledge Tree */}

        <Sidebar />

        {/* Learning Interface */}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-8 py-8">
            {/* Breadcrumb */}

            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm"
            >
              {breadcrumb.map((item, index) => {
                const isLast = index === breadcrumb.length - 1;

                return (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && <span className="text-slate-600">›</span>}

                    <span
                      className={
                        isLast ? "font-medium text-cyan-400" : "text-slate-400"
                      }
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </nav>

            {/* Lesson Header */}

            <section className="mb-8">
              <h1 className="text-5xl font-bold tracking-tight text-cyan-400">
                {title}
              </h1>
            </section>

            {/* Lesson Content */}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
