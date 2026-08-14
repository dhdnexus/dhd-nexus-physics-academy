// src/services/marimoSession.ts

export type MarimoStatus =
  | "checking"
  | "running"
  | "launch_required"
  | "unavailable";

export interface MarimoSession {
  status: MarimoStatus;
  url: string;
  lastChecked: number | null;
}

export const DEFAULT_MARIMO_URL = "http://localhost:2718";

export const defaultSession: MarimoSession = {
  status: "checking",
  url: DEFAULT_MARIMO_URL,
  lastChecked: null,
};