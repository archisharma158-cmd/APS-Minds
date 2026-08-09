import type { ReactNode } from "react";

interface LoadingIndicatorProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

export default function LoadingIndicator({
  label,
  size = "md",
}: LoadingIndicatorProps) {
  const dot = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span
          className={`${dot} animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]`}
        />
        <span
          className={`${dot} animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]`}
        />
        <span
          className={`${dot} animate-bounce rounded-full bg-cyan-400`}
        />
      </div>

      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {label}
        </span>
      )}
    </div>
  );
}

export type LoadingIndicatorChildren = ReactNode;

