import { Link } from "react-router-dom";
import { PenTool, CheckCircle2, Wand2, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Wand2,
    title: "AI Drafting",
    desc: "Generate structured, high-quality drafts from research signals and rough ideas.",
  },
  {
    icon: CheckCircle2,
    title: "Editorial Review",
    desc: "Refine tone, clarity, structure and factual grounding with intelligent review passes.",
  },
  {
    icon: PenTool,
    title: "Persona Consistency",
    desc: "Maintain a consistent ARCTES voice across every piece of published content.",
  },
];

export default function Editorial() {
  return (
    <main className="min-h-screen bg-[#030509] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] tracking-[.3em] text-cyan-300/60">
            <PenTool size={14} /> EDITORIAL INTELLIGENCE
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            AI <span className="text-cyan-300">EDITORIAL</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35">
            Generate, refine and structure high-quality content with intelligent
            AI assistance. ARCTES drafts, reviews and perfects editorial output
            so every piece is ready to publish.
          </p>

          <Link
            to="/agent/chat"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.16em] text-black shadow-[0_0_30px_rgba(34,211,238,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
          >
            <Sparkles size={14} />
            START DRAFTING
          </Link>
        </div>

        {/* Capabilities */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="group rounded-2xl border border-white/[.07] bg-white/[.025] p-6 transition hover:border-cyan-300/20 hover:bg-cyan-300/[.03]"
                style={{ transitionDelay: `${i * 20}ms` }}
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

        {/* Editorial pipeline */}
        <section className="mt-12 rounded-3xl border border-white/[.07] bg-white/[.02] p-8">
          <div className="mb-6 font-mono text-[9px] tracking-[.25em] text-cyan-300/60">
            EDITORIAL PIPELINE
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["01", "DRAFT", "Turn ideas and research into a first-pass draft."],
              ["02", "REFINE", "Improve structure, flow, tone and clarity."],
              ["03", "REVIEW", "Fact-check and verify against source signals."],
              ["04", "READY", "Deliver polished content for publishing."],
            ].map(([step, title, desc]) => (
              <div
                key={step}
                className="rounded-2xl border border-white/[.07] bg-black/30 p-5"
              >
                <div className="font-mono text-[10px] text-cyan-400/70">{step}</div>
                <div className="mt-2 font-bold tracking-wide">{title}</div>
                <p className="mt-2 text-xs leading-6 text-white/35">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
