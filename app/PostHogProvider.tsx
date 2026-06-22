"use client";

import { useEffect } from "react";
import { configurePostHog, loadPostHog } from "@/lib/tracking";

type PostHogProviderProps = {
  children: React.ReactNode;
  posthogKey?: string | null;
  posthogHost?: string | null;
};

export function PostHogProvider({
  children,
  posthogKey,
  posthogHost,
}: PostHogProviderProps) {
  useEffect(() => {
    configurePostHog(posthogKey, posthogHost);
    if (!posthogKey?.trim()) return;

    const timer = window.setTimeout(() => {
      const start = () => {
        void loadPostHog();
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(start, { timeout: 3000 });
      } else {
        start();
      }
    }, 4500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [posthogHost, posthogKey]);

  return <>{children}</>;
}

export default PostHogProvider;
