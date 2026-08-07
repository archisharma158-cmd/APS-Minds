import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const timeline = [
  {
    phase: "Phase 1",
    title: "Foundation",
    description: "Authentication, database, clean architecture, and connected frontend/backend.",
    status: "complete" as const,
  },
  {
    phase: "Phase 2",
    title: "ARCTES Core",
    description: "Agent framework, persistent memory graph, and autonomous reasoning engine.",
    status: "upcoming" as const,
  },
  {
    phase: "Phase 3",
    title: "Publishing Pipeline",
    description: "End-to-end content generation, editing, fact-checking, and multi-channel distribution.",
    status: "upcoming" as const,
  },
  {
    phase: "Phase 4",
    title: "Multi-Agent Orchestration",
    description: "Specialized agents for research, writing, analytics, and audience engagement.",
    status: "upcoming" as const,
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">APS Minds</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            An AI-native platform designed to autonomously produce, manage, and
            distribute content at scale — with intelligence, memory, and intent.
          </p>
        </motion.div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <GlassCard delay={0.1}>
            <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
            <p className="text-white/40 leading-relaxed">
              To build the world's first truly autonomous publishing system — where AI
              agents don't just assist, they independently research, create, refine,
              and publish content with the quality and judgment of a seasoned editorial team.
            </p>
          </GlassCard>

          <GlassCard delay={0.2}>
            <h2 className="text-xl font-semibold text-white mb-3">Meet ARCTES</h2>
            <p className="text-white/40 leading-relaxed">
              ARCTES (Autonomous Research & Content Technology Engine System) is our flagship
              AI persona. It combines persistent memory, multi-agent orchestration, and
              editorial intelligence to act as a fully autonomous technology analyst
              and content producer.
            </p>
          </GlassCard>
        </div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Development Roadmap</h2>
        </motion.div>

        <div className="space-y-4">
          {timeline.map((item, i) => (
            <GlassCard key={item.phase} delay={0.1 * (i + 1)} hover className="flex items-start gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold ${
                item.status === "complete"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-white/30 border border-white/10"
              }`}>
                {item.status === "complete" ? "✓" : i + 1}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-brand-400 uppercase tracking-wider">{item.phase}</span>
                  {item.status === "complete" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Complete
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
