import { Code, Link, Mail } from "lucide-react";
import { BRAND, teamMembers } from "../config";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#030712] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
          {BRAND.name}
        </p>

        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Let's Build <span className="text-cyan-400">Intelligence</span>{" "}
          Together
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-white/50">
          Have an idea, collaboration proposal, research opportunity, or
          technical question? Connect with the {BRAND.name} team.
        </p>

        {/* Team contact section */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">
            <Mail className="h-7 w-7" />
          </div>

          <p className="mt-6 text-lg font-semibold text-white/80">
            Team Contact
          </p>

          <p className="mt-2 text-sm text-white/40">
            Reach the {BRAND.name} team directly. Each member is available at
            their official email and social profiles.
          </p>

          {/* Member contact cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-white">
                  {member.name}
                </p>
                <p className="mt-1 text-xs text-white/40">{member.course}</p>
                <p className="mt-0.5 text-xs text-cyan-400/70">
                  {member.university}
                </p>

                <a
                  href={`mailto:${member.email}`}
                  className="mt-4 flex items-center gap-2 text-xs text-white/50 transition hover:text-cyan-300"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="break-all">{member.email}</span>
                </a>

                <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <Mail className="h-4 w-4" />
                  </a>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <Link className="h-4 w-4" />
                  </a>

                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
                    >
                      <Code className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
