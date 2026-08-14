// src/services/marimoHealth.ts

import { DEFAULT_MARIMO_URL, defaultSession } from "./marimoSession";
import type { MarimoSession } from "./marimoSession";

const HEALTH_TIMEOUT_MS = 1200;

/**
 * Performs a lightweight health check against a local Marimo server.
 * No physics or notebook logic lives here—only connectivity detection.
 */
export async function checkMarimoHealth(
  url: string = DEFAULT_MARIMO_URL
): Promise<MarimoSession> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, HEALTH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      mode: "no-cors",
    });

    clearTimeout(timeout);

    // If fetch succeeds, the localhost server is considered reachable.
    if (response.type === "opaque" || response.ok) {
      return {
        status: "running",
        url,
        lastChecked: Date.now(),
      };
    }

    return {
      status: "launch_required",
      url,
      lastChecked: Date.now(),
    };
  } catch {
    clearTimeout(timeout);

    return {
      status: "launch_required",
      url,
      lastChecked: Date.now(),
    };
  }
}

/**
 * Initial state while the first health check is running.
 */
export function createCheckingState(): MarimoSession {
  return {
    ...defaultSession,
    status: "checking",
    lastChecked: Date.now(),
  };
}