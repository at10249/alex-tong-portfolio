"use client";

import { useEffect, useState } from "react";
import { SITE_HOST } from "@/lib/siteConfig";

// The site is reachable on several domains at once (the canonical one,
// vercel.app, apex/www variants). Displaying SITE_HOST unconditionally would
// show a domain the visitor didn't actually type in. Defaults to SITE_HOST
// for SSR/first paint, then swaps to the real host once mounted.
export function useCurrentHost(): string {
  const [host, setHost] = useState(SITE_HOST);

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  return host;
}
