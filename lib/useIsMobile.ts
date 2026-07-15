"use client";

import { useEffect, useState } from "react";

// Used ONLY for the `inert` accessibility attribute on the off-canvas
// sidebar drawer — never for structural layout decisions (that's handled
// entirely by the CSS media query in globals.css so it can't cause an
// SSR/hydration mismatch). Defaulting to `false` here just means the
// drawer briefly isn't inert on a mobile first paint before this effect
// runs, which is harmless.
export function useIsMobile(breakpointPx = 767): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpointPx]);

  return isMobile;
}
