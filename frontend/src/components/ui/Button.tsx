import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-cyan-400 text-black font-bold shadow-[0_0_30px_rgba(34,211,238,.15)] hover:bg-cyan-300 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]",
  secondary:
    "border border-white/10 bg-white/[0.04] text-white/70 hover:border-cyan-400/30 hover:text-white",
  ghost: "text-white/50 hover:bg-white/[0.04] hover:text-white",
};

const sizes = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-6 text-[11px]",
  lg: "h-12 px-7 text-[11px]",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-mono uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 ${variants[variant]} ${sizes[size]}`;

  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className}`}
    >
      {children}
    </button>
  );
}
