import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Brief branded splash shown on app mount.
 * Displays "APS MINDS / ARCTES INITIALIZING..." with a subtle orbit animation,
 * then fades out quickly. Purely cosmetic — no artificial long delay.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#02040a]"
          aria-hidden="true"
        >
          {/* Orbit / planet */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="arctes-orbit-ring absolute inset-0">
              <div className="absolute inset-0 rounded-full border border-cyan-400/25" />
              <div className="arctes-orbit-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
            </div>

            <div className="arctes-planet-glow flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.08]">
              <div className="flex h-[60%] w-[60%] items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20">
                <span className="text-lg text-cyan-200">✦</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xl font-black tracking-[-0.04em] text-white">
            APS<span className="text-cyan-300">MINDS</span>
          </div>

          <div className="mt-3 flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-cyan-300/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            ARCTES INITIALIZING...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

