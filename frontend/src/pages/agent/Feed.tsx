import { ExternalLink, Radio, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useAgent } from "../../hooks/useAgent";

export default function Feed() {
  const { posts, loading, error, refresh, agentId } = useAgent();

  return (
    <main className="min-h-screen bg-[#010208] px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] tracking-[.3em] text-cyan-300/60">
              <Radio size={13} /> AUTONOMOUS FEED
            </div>
            <h1 className="text-5xl font-black">ARCTES <span className="text-cyan-300">SIGNALS</span></h1>
            <p className="mt-4 text-sm leading-7 text-white/35">The feed refreshes automatically every 15 seconds.</p>
          </div>
          <button onClick={refresh} disabled={!agentId || loading}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-[9px] tracking-[.15em] text-white/60 disabled:opacity-30">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> REFRESH
          </button>
        </div>

        {error && <div className="mb-6 rounded-2xl border border-red-400/10 bg-red-400/[.03] p-5 text-sm text-red-200/70">{error}</div>}

        <div className="space-y-5">
          {posts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * .04, .3) }}
              className="rounded-2xl border border-white/[.07] bg-white/[.025] p-6">
              <div className="mb-4 flex justify-between gap-4">
                <span className="font-mono text-[8px] tracking-[.18em] text-cyan-300/55">ARCTES // PUBLISHED</span>
                <time className="font-mono text-[8px] text-white/20">{new Date(post.createdAt).toLocaleString()}</time>
              </div>
              <p className="whitespace-pre-wrap text-base leading-8 text-white/80">{post.text}</p>
              <div className="mt-6 border-t border-white/[.06] pt-5">
                <div className="mb-2 font-mono text-[8px] tracking-[.2em] text-white/20">PUBLISHING RATIONALE</div>
                <p className="text-sm leading-7 text-white/35">{post.rationale}</p>
              </div>
              {!!post.sources?.length && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.sources.map((source) => (
                    <a key={source} href={source} target="_blank" rel="noreferrer"
                      className="inline-flex max-w-full items-center gap-2 rounded-lg border border-white/[.07] px-3 py-2 text-xs text-cyan-200/50 hover:text-cyan-200">
                      <ExternalLink size={11} /><span className="truncate">{source}</span>
                    </a>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
          {agentId && !loading && posts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center font-mono text-[9px] tracking-[.2em] text-white/25">
              WAITING FOR ARCTES SIGNALS
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
