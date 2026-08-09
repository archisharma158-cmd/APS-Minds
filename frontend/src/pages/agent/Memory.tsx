import { Link } from "react-router-dom";
import { Database, BrainCircuit, Layers, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: BrainCircuit,
    title: "Knowledge Graph",
    desc: "ARCTES maintains a connected graph of topics, sources and decisions.",
  },
  {
    icon: Database,
    title: "Context Persistence",
    desc: "Important context is remembered across sessions to keep responses intelligent.",
  },
  {
    icon: Layers,
    title: "Vector Memory",
    desc: "Semantic embeddings store knowledge so ARCTES can recall relevant insight.",
  },
];

export default function Memory() {
  return (
    <main className="min-h-screen bg-[#030509] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] tracking-[.3em] text-cyan-300/60">
            <BrainCircuit size={14} /> PERSISTENT MEMORY ENGINE
          </div>

          <h1 className="text-4xl font-black sm:text-5xl">
            AI <span className="text-cyan-300">MEMORY</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35">
            Maintain useful context and knowledge so ARCTES can deliver more
            intelligent responses. The memory layer stores what ARCTES has
            learned, researched and published.
          </p>

          <Link
            to="/agent/chat"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.16em] text-black shadow-[0_0_30px_rgba(34,211,238,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
          >
            <Sparkles size={14} />
            TALK TO ARCTES
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

        {/* Memory status */}
        <section className="mt-12 rounded-3xl border border-white/[.07] bg-white/[.02] p-8">
          <div className="mb-6 font-mono text-[9px] tracking-[.25em] text-cyan-300/60">
            MEMORY STATUS
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Stored Memories", "0"],
              ["Knowledge Nodes", "0"],
              ["Last Sync", "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[.07] bg-black/30 p-5"
              >
                <div className="text-xs uppercase tracking-wider text-white/35">
                  {label}
                </div>
                <div className="mt-2 font-mono text-2xl text-cyan-300">{value}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
