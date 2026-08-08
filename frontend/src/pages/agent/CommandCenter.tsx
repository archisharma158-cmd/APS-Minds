import { Activity, BrainCircuit, Database, Radio, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAgent } from "../../hooks/useAgent";

export default function CommandCenter() {
  const { agentId, posts, loading, error, initialize, initializing } = useAgent();

  return (
    <main className="min-h-screen bg-[#010208] px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-cyan-300/60">
            <Radio size={13} /> APSMINDS // COMMAND CENTER
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-[-0.05em]">
                ARCTES <span className="text-cyan-300">CORE</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35">
                Autonomous discovery, editorial judgment, memory and publishing.
              </p>
            </div>
            {!agentId && (
              <button
                onClick={() => initialize()}
                disabled={initializing}
                className="rounded-xl bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.15em] text-black disabled:opacity-50"
              >
                {initializing ? "INITIALIZING..." : "INITIALIZE ARCTES"}
              </button>
            )}
          </div>
        </div>

        {error && <div className="mb-6 rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-5 text-sm text-red-200/70">{error}</div>}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["AGENT", agentId ? "ONLINE" : "OFFLINE", Radio],
            ["PUBLISHED", String(posts.length), Activity],
            ["MEMORY", "CONNECTED", Database],
            ["AUTONOMY", "ACTIVE", BrainCircuit],
          ].map(([label, value, Icon]) => (
            <div key={String(label)} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <Icon size={17} className="mb-8 text-cyan-300/60" />
              <div className="font-mono text-[8px] tracking-[0.2em] text-white/25">{String(label)}</div>
              <div className="mt-2 text-xl font-bold">{String(value)}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="font-mono text-[8px] tracking-[0.25em] text-white/20">AUTONOMOUS PIPELINE</div>
              <h2 className="mt-2 text-xl font-bold">ARCTES operating loop</h2>
            </div>
            <Zap className="text-cyan-300/60" size={18} />
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {["DISCOVER", "DECIDE", "WRITE", "REMEMBER", "PUBLISH"].map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}
                className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                <div className="mb-5 font-mono text-[8px] text-cyan-300/45">0{i + 1}</div>
                <div className="font-mono text-[8px] tracking-[0.12em] text-white/55">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link to="/agent/feed" className="rounded-xl border border-white/10 p-5 text-white/55 hover:border-cyan-300/20 hover:text-white">Open Autonomous Feed →</Link>
          <Link to="/agent/chat" className="rounded-xl border border-white/10 p-5 text-white/55 hover:border-cyan-300/20 hover:text-white">Open ARCTES Chat →</Link>
        </div>

        {loading && <div className="mt-5 font-mono text-[8px] tracking-[.2em] text-white/20">SYNCHRONIZING ARCTES...</div>}
      </div>
    </main>
  );
}
