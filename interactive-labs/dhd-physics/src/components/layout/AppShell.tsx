import { useState } from "react";
import { Menu } from "lucide-react";

import logo from "../../assets/logo.png";

import NavigationDrawer from "./NavigationDrawer";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <button
            onClick={() => setDrawerOpen(true)}
            className="hover:text-cyan-400"
          >
            <Menu size={24} />
          </button>

          <img
            src={logo}
            alt="DHD Nexus"
            className="h-9 w-9 rounded-full object-cover"
          />

          <span className="font-bold text-xl">
            DHD Nexus
          </span>

        </div>

      </header>

      <main>

        {children}

      </main>

    </div>
  );
}