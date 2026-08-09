import { GraduationCap } from "lucide-react";
import TeamCard from "../components/TeamCard";
import { BRAND, teamMembers } from "../config";

export default function Team() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-cyan-400">
            {BRAND.name}
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Meet the <span className="text-cyan-400">APS Team</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-white/50">
            The minds behind {BRAND.aiSystem} — {BRAND.arctesFullForm}.
          </p>
        </div>

        {/* Team cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* University / Education section */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">
              <GraduationCap className="h-7 w-7" />
            </div>

<h2 className="mt-4 text-2xl font-black tracking-tight">
              Built at <span className="text-cyan-400">Quantum University</span>
            </h2>

            <p className="text-sm text-white/40">
              {teamMembers[0]?.university}
            </p>

            <p className="mt-1 text-xs text-white/30">
              B.Tech Cyber Security • B.Tech AI/ML
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-center transition-colors hover:border-cyan-400/30"
              >
                <div className="text-sm font-bold text-white">{member.name}</div>
                <div className="mt-1 text-xs text-white/45">{member.course}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
