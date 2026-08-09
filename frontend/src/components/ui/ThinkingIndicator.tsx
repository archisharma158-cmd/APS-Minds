import { useEffect, useState } from "react";

interface ThinkingIndicatorProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { planet: "h-12 w-12", ring: "h-16 w-16", dot: "h-2 w-2", icon: "text-sm" },
  md: { planet: "h-16 w-16", ring: "h-24 w-24", dot: "h-2.5 w-2.5", icon: "text-lg" },
  lg: { planet: "h-20 w-20", ring: "h-28 w-28", dot: "h-3 w-3", icon: "text-xl" },
};

const DOTS = ["", ".", "..", "..."];

export default function ThinkingIndicator({
  label = "ANALYZING",
  size = "md",
}: ThinkingIndicatorProps) {
  const s = sizes[size];
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDotIndex((i) => (i + 1) % DOTS.length);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-2">
      {/* Planet / orbit */}
      <div className="relative flex items-center justify-center">
        {/* Outer orbit ring */}
        <div className={`${s.ring} arctes-orbit-ring absolute`}>
          <div className="absolute inset-0 rounded-full border border-cyan-400/25" />
          {/* Orbiting dot */}
          <div
            className={`arctes-orbit-dot absolute left-1/2 top-0 ${s.dot} -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]`}
          />
        </div>

        {/* Planet core */}
        <div
          className={`${s.planet} arctes-planet-glow flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/[0.08]`}
        >
          <div className="flex h-[60%] w-[60%] items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20">
            <span className={`text-cyan-200 ${s.icon}`}>✦</span>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="text-center">
        <div className="font-mono text-[10px] tracking-[0.3em] text-cyan-300">
          ARCTES
        </div>
        <div className="mt-1.5 flex items-center justify-center gap-1 font-mono text-[9px] tracking-[0.22em] text-white/40">
          <span>{label}</span>
          <span className="inline-block w-4 text-left text-cyan-300">
            {DOTS[dotIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
