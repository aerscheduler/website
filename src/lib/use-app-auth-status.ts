"use client";

import { useEffect, useState } from "react";
import { APP_URL } from "@/lib/site";

const MESSAGE_TYPE = "aerscheduler:auth-status";
/** Give the app iframe time to load; on timeout keep signed-out CTAs. */
const TIMEOUT_MS = 2500;

/**
 * Whether the visitor appears signed in to the console (app.aerscheduler.com).
 *
 * Defaults to false so SSR and crawlers always see Login / Get started: the
 * iframe probe only runs in the browser after hydration and never changes the
 * HTML Google indexes.
 */
export function useAppAuthStatus(): boolean {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let settled = false;
    let appOrigin: string;
    try {
      appOrigin = new URL(APP_URL).origin;
    } catch {
      return;
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== appOrigin) return;
      const data = event.data;
      if (
        !data ||
        typeof data !== "object" ||
        (data as { type?: unknown }).type !== MESSAGE_TYPE ||
        typeof (data as { authenticated?: unknown }).authenticated !== "boolean"
      ) {
        return;
      }
      settled = true;
      setAuthenticated((data as { authenticated: boolean }).authenticated);
    }

    window.addEventListener("message", onMessage);

    const iframe = document.createElement("iframe");
    iframe.src = `${appOrigin}/auth-status.html?origin=${encodeURIComponent(
      window.location.origin
    )}`;
    iframe.title = "";
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.cssText =
      "position:absolute;width:0;height:0;border:0;visibility:hidden;pointer-events:none";
    document.body.appendChild(iframe);

    const timer = window.setTimeout(() => {
      if (!settled) setAuthenticated(false);
    }, TIMEOUT_MS);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
      iframe.remove();
    };
  }, []);

  return authenticated;
}
