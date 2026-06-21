"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

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
    const apiKey = posthogKey?.trim();
    if (!apiKey) return;

    const apiHost = posthogHost?.trim() || "https://us.i.posthog.com";

    if (typeof window !== "undefined" && !posthog.__loaded) {
      posthog.init(apiKey, {
        api_host: apiHost,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        persistence: "localStorage+cookie",
      });
    }
  }, [posthogHost, posthogKey]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export default PostHogProvider;
