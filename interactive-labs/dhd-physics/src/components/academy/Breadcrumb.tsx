import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  items: string[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-slate-400"
    >
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          {index > 0 && <ChevronRight size={16} className="text-slate-600" />}

          <span
            className={
              index === items.length - 1
                ? "font-semibold text-cyan-400"
                : "hover:text-white"
            }
          >
            {item}
          </span>
        </div>
      ))}
    </nav>
  );
}
