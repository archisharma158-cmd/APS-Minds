import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const featureGroups = [
  {
    category: "AI & Agents",
    items: [
      {
        icon: "🤖",
        title: "ARCTES AI Persona",
        description: "A fully autonomous AI technology analyst with persistent memory, reasoning capabilities, and editorial judgment.",
        tag: "Coming Soon",
      },
      {
        icon: "🔗",
        title: "Multi-Agent Orchestration",
        description: "Specialized agents for research, writing, fact-checking, and distribution — coordinated by a central orchestrator.",
        tag: "Coming Soon",
      },
      {
        icon: "💾",
        title: "Persistent Memory",
        description: "Knowledge graph storage that persists across sessions — ARCTES remembers every interaction, decision, and learning.",
        tag: "Coming Soon",
      },
    ],
  },
  {
    category: "Publishing",
    items: [
      {
        icon: "📝",
        title: "Autonomous Content Pipeline",
        description: "End-to-end content generation from research to publication with automated quality checks and editorial review.",
        tag: "Coming Soon",
      },
      {
        icon: "📊",
        title: "Analytics Dashboard",
        description: "Real-time performance metrics, audience insights, and content effectiveness tracking.",
        tag: "Coming Soon",
      },
      {
        icon: "🌐",
        title: "Multi-Channel Distribution",
        description: "Publish content across multiple platforms simultaneously with platform-specific optimization.",
        tag: "Coming Soon",
      },
    ],
  },
  {
    category: "Platform",
    items: [
      {
        icon: "🔐",
        title: "JWT Authentication",
        description: "Secure, stateless authentication with password hashing, protected routes, and persistent sessions.",
        tag: "Active",
      },
      {
        icon: "🏗️",
        title: "Clean Architecture",
        description: "Modular, layered architecture with clear separation of concerns — ready to scale from MVP to enterprise.",
        tag: "Active",
      },
      {
        icon: "⏰",
        title: "Scheduled Jobs",
        description: "APScheduler integration ready for automated content workflows, data syncs, and agent task scheduling.",
        tag: "Configured",
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Coming Soon": "bg-brand-500/10 text-brand-400 border-brand-500/20",
  Configured: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function Features() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Features</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale an autonomous publishing engine.
          </p>
        </motion.div>

        {/* Feature Groups */}
        {featureGroups.map((group, gi) => (
          <div key={group.category} className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="text-sm font-mono uppercase tracking-widest text-brand-400 mb-6"
            >
              {group.category}
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {group.items.map((feature, fi) => (
                <GlassCard
                  key={feature.title}
                  hover
                  delay={0.05 * fi}
                  className="flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${tagColors[feature.tag] ?? ""}`}>
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed flex-1">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
