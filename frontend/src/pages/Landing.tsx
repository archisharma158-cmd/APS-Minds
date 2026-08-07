import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const features = [
  {
    icon: "🤖",
    title: "Autonomous Publishing",
    description:
      "AI-driven content pipelines that research, draft, edit, and publish — end to end — without manual intervention.",
  },
  {
    icon: "🧠",
    title: "Editorial Intelligence",
    description:
      "ARCTES analyzes trends, audience signals, and editorial patterns to produce contextually relevant, high-quality content.",
  },
  {
    icon: "💾",
    title: "Persistent Memory",
    description:
      "Every interaction, decision, and learning is stored in a persistent memory graph — ARCTES never forgets context.",
  },
  {
    icon: "⚡",
    title: "Autonomous Agents",
    description:
      "Modular agent architecture where specialized agents handle research, writing, fact-checking, and distribution.",
  },
  {
    icon: "🏗️",
    title: "Future-ready Architecture",
    description:
      "Built with clean, extensible architecture — ready to scale from SQLite to distributed systems with zero rewrites.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-8">
              <span className="status-online" />
              <span className="text-sm text-white/70">Powered by ARCTES AI</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-white">The Future of</span>
              <br />
              <span className="gradient-text">Autonomous Publishing</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              APS Minds is an AI-native publishing intelligence platform.
              ARCTES — our flagship AI persona — researches, writes, edits,
              and publishes content autonomously with persistent memory
              and editorial intelligence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-base px-8 py-3.5">
                Start Building
              </Link>
              <Link to="/about" className="btn-secondary text-base px-8 py-3.5">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Floating ARCTES Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16"
          >
            <div className="inline-flex items-center gap-4 glass-strong px-8 py-4 animate-float">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
                <span className="text-2xl">🧠</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">ARCTES</p>
                <p className="text-white/40 text-sm">Autonomous Research & Content Technology Engine System</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for the <span className="gradient-text">Autonomous Era</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Every component is designed to support fully autonomous content operations — from research to publication.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlassCard hover delay={0} className="h-full">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="py-16 px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to build the future?
              </h2>
              <p className="text-white/40 text-lg mb-8 max-w-xl mx-auto">
                Join APS Minds and be part of the autonomous publishing revolution.
              </p>
              <Link to="/signup" className="btn-primary text-base px-10 py-4">
                Create Your Account
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-sm text-white/40">APS Minds © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-sm text-white/30 hover:text-white/60 transition-colors">About</Link>
            <Link to="/features" className="text-sm text-white/30 hover:text-white/60 transition-colors">Features</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
