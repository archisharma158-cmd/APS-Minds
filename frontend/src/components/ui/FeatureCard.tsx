import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  href?: string;
  onClick?: () => void;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
  href,
  onClick,
}: FeatureCardProps) {
  const isLink = Boolean(href);

  const inner = (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] text-cyan-300">
          <Icon size={19} />
        </div>

        {typeof index === "number" && (
          <span className="font-mono text-[9px] text-white/20">
            0{index + 1}
          </span>
        )}
      </div>

      <div className="font-mono text-[9px] tracking-[0.2em] text-cyan-400/60">
        ARCTES MODULE
      </div>

      <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 text-xs leading-6 text-white/35">{description}</p>
    </>
  );

  const className =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-400/20 hover:bg-white/[0.045]";

  if (isLink) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${className} w-full text-left`}>
        {inner}
      </button>
    );
  }

  return <div className={className}>{inner}</div>;
}

