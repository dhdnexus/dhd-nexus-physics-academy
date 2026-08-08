import {
  Menu,
  GraduationCap,
  Search,
  Bell,
} from "lucide-react";

export default function AcademyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            className="rounded-lg p-2 transition hover:bg-slate-800"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3">

            <GraduationCap
              size={30}
              className="text-cyan-400"
            />

            <div>

              <h1 className="text-lg font-bold">
                DHD Nexus Physics Academy
              </h1>

              <p className="text-xs text-slate-400">
                Interactive Undergraduate Physics
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2">

          <button className="rounded-lg p-2 transition hover:bg-slate-800">
            <Search size={20} />
          </button>

          <button className="rounded-lg p-2 transition hover:bg-slate-800">
            <Bell size={20} />
          </button>

        </div>

      </div>

    </header>
  );
}