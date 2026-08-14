import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { checkMarimoHealth, createCheckingState } from "../services/marimoHealth";
import type { MarimoSession } from "../services/marimoSession";

interface MarimoContextValue {
  session: MarimoSession;
  refresh: () => Promise<void>;
}

const MarimoSessionContext = createContext<MarimoContextValue | undefined>(
  undefined
);

export function MarimoSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<MarimoSession>(
    createCheckingState()
  );

  const refresh = async () => {
    const next = await checkMarimoHealth();
    setSession(next);
  };

  useEffect(() => {
    refresh();

    const interval = setInterval(refresh, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MarimoSessionContext.Provider value={{ session, refresh }}>
      {children}
    </MarimoSessionContext.Provider>
  );
}

export function useMarimoSession() {
  const context = useContext(MarimoSessionContext);

  if (!context) {
    throw new Error(
      "useMarimoSession must be used inside MarimoSessionProvider"
    );
  }

  return context;
}