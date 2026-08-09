import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Subtle floating "Back to Top" button.
 * Only appears after scrolling down; smooth-scrolls to the top on click.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-[9990] flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-[#02040a]/90 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_45px_rgba(34,211,238,.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <ArrowUp size={18} />
    </button>
  );
}

