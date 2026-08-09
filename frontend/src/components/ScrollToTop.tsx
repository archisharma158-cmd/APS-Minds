import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global Scroll-to-Top.
 *
 * Whenever the route changes, instantly reset the browser window scroll to
 * (0, 0) so every new page starts from the top.
 *
 * This ONLY controls the main page/window scroll. It does NOT touch the
 * ARCTES chat message container, the AI auto-scroll behaviour, the history
 * drawer, or any other independently-scrolling element (those are separate
 * fixed-height containers with their own scroll offsets).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Also reset the document scroll as a fallback for older browsers.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
