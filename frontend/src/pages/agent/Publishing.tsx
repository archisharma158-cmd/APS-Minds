import { Link } from "react-router-dom";
import { Rocket, CalendarClock, Share2, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Rocket,
    title: "Autonomous Execution",
    desc: "Turn ideas and research into structured, ready-to-publish workflows.",
  },
  {
    icon: CalendarClock,
    title: "Scheduling",
    desc: "Plan and schedule content delivery across your publishing channels.",
  },
  {
    icon: Share2,
    title: "Multi-Channel Output",
    desc: "Prepare content for distribution across the channels you manage.",
  },
];

export default function Publishing() {
  return (
    <main className="min-h-screen bg-[#030509] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] tracking-[.3em] text-cyan-300/60">
            <Rocket size={14} /> AUTONOMOUS PUBLISHING
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            AUTONOMOUS <span className="text-cyan-300">PUBLISHING</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35">
            Turn ideas and research into structured publishing workflows with
            AI-powered assistance. ARCTES productionizes content so you can
            ship consistently.
          </p>

          <Link
            to="/agent/chat"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.16em] text-black shadow-[0_0_30px_rgba(34,211,238,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
          >
            <Sparkles size={14} />
            BUILD A WORKFLOW
          </Link>
        </div>

        {/* Capabilities */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="rounded-2xl border border-white/[.07] bg-white/[.025] p-6 transition hover:border-cyan-300/20 hover:bg-cyan-300/[.03]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[.06] text-cyan-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold">{cap.title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/40">{cap.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Pipeline */}
        <section className="mt-12 rounded-3xl border border-white/[.07] bg-white/[.02] p-8">
          <div className="mb-6 font-mono text-[9px] tracking-[.25em] text-cyan-300/60">
            PUBLISHING PIPELINE
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["STRUCTURE", "Organize ideas into a clear content structure."],
              ["GENERATE", "Produce drafts with AI-powered assistance."],
              ["REVIEW", "Edge, verify and polish before release."],
              ["PUBLISH", "Ship content to your scheduled channels."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[.07] bg-black/30 p-5"
              >
                <div className="font-mono text-[9px] tracking-wider text-cyan-400/70">
                  {title}
                </div>
                <p className="mt-2 text-xs leading-6 text-white/35">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
