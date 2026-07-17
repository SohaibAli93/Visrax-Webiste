"use client";

import { useEffect, useState } from "react";

/* SSR-safe media query hook. Defaults to `false` on the server, then updates
   after mount — callers should treat `false` as the mobile/static case so the
   first paint is the simpler layout. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}
