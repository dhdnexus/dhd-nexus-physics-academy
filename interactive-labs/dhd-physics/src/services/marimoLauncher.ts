// src/services/marimoLauncher.ts

import { DEFAULT_MARIMO_URL } from "./marimoSession";

export interface LaunchResult {
  success: boolean;
  message: string;
}

/**
 * Opens the local Marimo notebook in a new browser tab.
 * Future desktop editions (Electron/Tauri) can replace this
 * implementation without changing the React lesson.
 */
export async function launchMarimo(
  url: string = DEFAULT_MARIMO_URL
): Promise<LaunchResult> {
  try {
    window.open(url, "_blank", "noopener,noreferrer");

    return {
      success: true,
      message: "Marimo launch requested.",
    };
  } catch {
    return {
      success: false,
      message: "Unable to open the Marimo notebook.",
    };
  }
}