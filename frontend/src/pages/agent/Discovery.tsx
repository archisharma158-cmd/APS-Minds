import { Atom, Compass, Globe, Radar, Satellite, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Radar,
    title: "Live Signal Scanning",
    desc: "ARCTES continuously scans research, tech, AI and cybersecurity sources for emerging signals.",
  },
  {
    icon: Globe,
    title: "Global Intelligence",
    desc: "Aggregates and cross-references intelligence from across the web in real time.",
  },
  {
    icon: Compass,
    title: "Trend Navigation",
    desc: "Maps emerging trends and routes them into your autonomous publishing pipeline.",
  },
  {
    icon: Satellite,
    title: "Source Triangulation",
    desc: "Correlates multiple sources to surface high-confidence, verifiable discoveries.",
  },
];

const sampleSignals = [
  { tag: "AI", title: "Autonomous publishing engines are converging with multimodal agents", confidence: 94 },
  { tag: "SEC", title: "Agentic security frameworks are reshaping cloud threat models", confidence: 89 },
  { tag: "AI", title: "Open-weight reasoning models are closing the gap in agent workflows", confidence: 91 },
  { tag: "TECH", title: "Edge intelligence is moving toward on-device publishing pipelines", confidence: 86 },
];

export default function Discovery() {
  return (
    <main className="min-h-screen bg-[#030509] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] tracking-[.3em] text-cyan-300/60">
            <Satellite size={14} /> AI DISCOVERY ENGINE
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            DISCOVERY <span className="text-cyan-300">SIGNALS</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35">
            The ARCTES discovery engine continuously scans the frontiers of
            research, technology, and AI to surface the signals that shape
            tomorrow.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.16em] text-black shadow-[0_0_30px_rgba(34,211,238,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
          >
            <Sparkles size={14} />
            INITIATE DISCOVERY SCAN
          </button>
        </div>

        {/* Capabilities */}
        <section className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/[.07] bg-white/[.025] p-6 transition hover:border-cyan-300/20 hover:bg-cyan-300/[.03]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[.06] text-cyan-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold">{cap.title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/40">{cap.desc}</p>
              </motion.div>
            );
          })}
        </section>

        {/* Sample signals */}
        <section>
          <div className="mb-4 flex items-center gap-2 font-mono text-[9px] tracking-[.25em] text-white/30">
            <Atom size={12} className="text-cyan-300/60" /> RECENT SIGNALS
          </div>

          <div className="space-y-3">
            {sampleSignals.map((signal) => (
              <div
                key={signal.title}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] bg-white/[.02] px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-md border border-cyan-300/20 bg-cyan-300/[.06] px-2 py-1 font-mono text-[8px] tracking-[.15em] text-cyan-300">
                    {signal.tag}
                  </span>
                  <p className="text-sm text-white/70">{signal.title}</p>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[.06]">
                    <div
                      className="h-full rounded-full bg-cyan-300"
                      style={{ width: `${signal.confidence}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-cyan-300/70">
                    {signal.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
