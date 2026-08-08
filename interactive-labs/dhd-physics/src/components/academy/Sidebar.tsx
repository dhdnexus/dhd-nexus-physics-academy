import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  Compass,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { academyNavigation } from "./AcademyNavigation";

export default function Sidebar() {
  const academy = academyNavigation[0];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      academy.modules.map((module) => [module.title, module.expanded]),
    ),
  );

  const [openSubmodules, setOpenSubmodules] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        academy.modules.flatMap((module) =>
          (module.submodules ?? []).map((submodule) => [
            `${module.title}:${submodule.title}`,
            submodule.expanded,
          ]),
        ),
      ),
  );

  function toggleModule(title: string) {
    setOpenModules((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  }

  function toggleSubmodule(moduleTitle: string, submoduleTitle: string) {
    const key = `${moduleTitle}:${submoduleTitle}`;

    setOpenSubmodules((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  return (
    <aside
      className={`shrink-0 border-r border-slate-800 bg-slate-900 transition-all duration-300 ${
        sidebarOpen ? "w-72" : "w-16"
      }`}
    >
      {/* Academy Header */}

      <div
        className={`flex items-center border-b border-slate-800 ${
          sidebarOpen ? "justify-between px-4 py-4" : "justify-center p-3"
        }`}
      >
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <Compass size={22} className="text-cyan-400" />

            <h2 className="text-lg font-bold whitespace-nowrap">
              {academy.title}
            </h2>
          </div>
        )}

        <button
          type="button"
          onClick={() => setSidebarOpen((previous) => !previous)}
          aria-label={
            sidebarOpen
              ? "Collapse Academy navigation"
              : "Expand Academy navigation"
          }
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          {sidebarOpen ? (
            <PanelLeftClose size={20} />
          ) : (
            <PanelLeftOpen size={20} />
          )}
        </button>
      </div>

      {/* Academy Knowledge Tree */}

      {sidebarOpen && (
        <nav className="px-4 py-5">
          {academy.modules.map((module) => {
            const moduleOpen = openModules[module.title] ?? module.expanded;

            const hasSubmodules = Boolean(module.submodules?.length);

            const hasDirectLessons = Boolean(module.lessons?.length);

            return (
              <div key={module.title} className="mb-2">
                {/* ====================================== */}
                {/* LEVEL 1 — ACADEMY MODULE              */}
                {/* ====================================== */}

                <button
                  type="button"
                  onClick={() => toggleModule(module.title)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-semibold transition hover:bg-slate-800"
                >
                  {hasSubmodules || hasDirectLessons ? (
                    moduleOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )
                  ) : (
                    <span className="w-[18px]" />
                  )}

                  <span>{module.title}</span>
                </button>

                {/* ====================================== */}
                {/* LEVEL 2 — MECHANICS SUBMODULES        */}
                {/* ====================================== */}

                {moduleOpen && module.submodules && (
                  <div className="ml-5 mt-1">
                    {module.submodules.map((submodule) => {
                      const key = `${module.title}:${submodule.title}`;

                      const submoduleOpen =
                        openSubmodules[key] ?? submodule.expanded;

                      const hasLessons = submodule.lessons.length > 0;

                      return (
                        <div key={key} className="mt-1">
                          <button
                            type="button"
                            onClick={() =>
                              toggleSubmodule(module.title, submodule.title)
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition hover:bg-slate-800"
                          >
                            {hasLessons ? (
                              submoduleOpen ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )
                            ) : (
                              <span className="w-4" />
                            )}

                            <span>{submodule.title}</span>
                          </button>

                          {/* ================================= */}
                          {/* LEVEL 3 — LESSONS                 */}
                          {/* ================================= */}

                          {hasLessons && submoduleOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                              {submodule.lessons.map((lesson) => {
                                const isCurrent = lesson.status === "current";

                                const lessonClass = isCurrent
                                  ? "flex w-full items-center rounded-lg bg-cyan-900/40 px-3 py-2 text-left text-sm font-medium text-cyan-300 transition"
                                  : "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-200";

                                const content = (
                                  <>
                                    <span
                                      className={`mr-2 ${
                                        isCurrent
                                          ? "text-cyan-400"
                                          : "text-slate-500"
                                      }`}
                                    >
                                      {isCurrent ? "●" : "○"}
                                    </span>

                                    <span>{lesson.title}</span>
                                  </>
                                );

                                if (lesson.href) {
                                  return (
                                    <a
                                      key={lesson.id}
                                      href={lesson.href}
                                      className={lessonClass}
                                    >
                                      {content}
                                    </a>
                                  );
                                }

                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    disabled
                                    className={`${lessonClass} cursor-not-allowed`}
                                  >
                                    {content}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ====================================== */}
                {/* DIRECT MODULE LESSONS                 */}
                {/* ====================================== */}

                {moduleOpen && module.lessons && module.lessons.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {module.lessons.map((lesson) => {
                      const isCurrent = lesson.status === "current";

                      const content = (
                        <>
                          <span
                            className={`mr-2 ${
                              isCurrent ? "text-cyan-400" : "text-slate-500"
                            }`}
                          >
                            {isCurrent ? "●" : "○"}
                          </span>

                          <span>{lesson.title}</span>
                        </>
                      );

                      const lessonClass = isCurrent
                        ? "flex w-full items-center rounded-lg bg-cyan-900/40 px-3 py-2 text-left text-sm font-medium text-cyan-300"
                        : "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200";

                      if (lesson.href) {
                        return (
                          <a
                            key={lesson.id}
                            href={lesson.href}
                            className={lessonClass}
                          >
                            {content}
                          </a>
                        );
                      }

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          disabled
                          className={`${lessonClass} cursor-not-allowed`}
                        >
                          {content}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </aside>
  );
}
