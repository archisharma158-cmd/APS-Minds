interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col ${alignClasses} ${className}`}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/70">
          <span className="h-px w-8 bg-cyan-400/40" />
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-cyan-400/40" />}
        </span>
      )}

<h2 className="font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

