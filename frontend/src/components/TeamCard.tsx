import { Code, Link, Mail } from "lucide-react";
import { useRef } from "react";
import type { TeamMember } from "../config";

const ACCENTS: { ring: string; border: string; text: string; shadow: string } = {
  ring: "border-cyan-400/30 bg-cyan-400/10 text-cyan-400 shadow-cyan-500/10",
  border: "hover:border-cyan-400/50 hover:bg-cyan-400/[0.04]",
  text: "text-cyan-400",
  shadow: "shadow-cyan-500/20",
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamCard({ member }: { member: TeamMember }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Lightweight 3D tilt/parallax driven by the mouse position.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(
      2
    )}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-300 will-change-transform hover:-translate-y-2 ${ACCENTS.border} hover:shadow-2xl ${ACCENTS.shadow}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Avatar / initials */}
      <div
        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border text-3xl font-black shadow-lg ${ACCENTS.ring}`}
      >
        {initials(member.name)}
      </div>

      {/* Name */}
      <h2 className="mt-6 text-xl font-bold uppercase tracking-wide text-white">
        {member.name}
      </h2>

      {/* Role */}
      <p className={`mt-2 text-sm font-semibold ${ACCENTS.text}`}>
        {member.role}
      </p>

      {/* Course */}
      <p className="mt-4 text-sm leading-6 text-white/50">{member.course}</p>

      {/* University */}
      <p className="mt-1 text-xs text-white/35">{member.university}</p>

      {/* Email */}
      <a
        href={`mailto:${member.email}`}
        className="mt-4 text-xs text-white/40 transition hover:text-cyan-300"
      >
        {member.email}
      </a>

      {/* Social / contact buttons */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          <Mail className="h-4 w-4" />
        </a>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          <Link className="h-4 w-4" />
        </a>

        {/* GitHub button only when a GitHub link is available (none for Sonu). */}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <Code className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

