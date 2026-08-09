import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  Boxes,
  Braces,
  BrainCircuit,
  Cloud,
  Cog,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  Layers,
  Network,
  Palette,
  Radio,
  Route,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import ArctesOrb from "../components/3d/ArctesOrb";
import CinematicBackground from "../components/effects/CinematicBackground";
import FeatureCard from "../components/ui/FeatureCard";
import SectionHeading from "../components/ui/SectionHeading";
import { BRAND } from "../config";

const capabilities = [
  {
    icon: Search,
    title: "AI Research",
    description:
      "Discover and synthesize what matters from live information streams.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Analysis",
    description:
      "Evaluate relevance, originality and timing with editorial judgment.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Assistance",
    description:
      "Apply security-aware reasoning to technology and cyber topics.",
  },
  {
    icon: Sparkles,
    title: "Content Intelligence",
    description:
      "Shape raw signals into structured, high-quality technology content.",
  },
  {
    icon: Database,
    title: "Data Analysis",
    description:
      "Turn complex data into clear, actionable intelligence.",
  },
  {
    icon: Workflow,
    title: "Autonomous Workflows",
    description:
      "Continuously research, decide, remember and publish without prompts.",
  },
];

const pipeline = [
  {
    icon: Globe2,
    title: "DISCOVER",
    label: "LIVE INTELLIGENCE",
    text: "ARCTES discovers emerging AI and technology signals from live information sources.",
  },
  {
    icon: ShieldCheck,
    title: "DECIDE",
    label: "EDITORIAL JUDGMENT",
    text: "Topics are evaluated for relevance, originality, timing and editorial quality.",
  },
  {
    icon: Database,
    title: "REMEMBER",
    label: "PERSISTENT MEMORY",
    text: "Previous publications are remembered to maintain continuity and avoid repetition.",
  },
  {
    icon: Zap,
    title: "PUBLISH",
    label: "AUTONOMOUS OUTPUT",
    text: "Qualified ideas become consistent persona-driven technology content.",
  },
];

type Technology = {
  icon: LucideIcon;
  name: string;
  category: string;
  description: string;
};

// Only technologies actually used in the project (frontend/package.json +
// backend/requirements.txt). No fake or aspirational stacks.
const technologies: Technology[] = [
  {
    icon: Atom,
    name: "React",
    category: "Frontend",
    description:
      "Component-driven UI powering the ARCTES interface and APS MINDS pages.",
  },
  {
    icon: Braces,
    name: "TypeScript",
    category: "Frontend",
    description:
      "Strictly typed JavaScript for reliable, maintainable frontend code.",
  },
  {
    icon: Zap,
    name: "Vite",
    category: "Frontend",
    description:
      "Blazing-fast dev server and production build for the frontend.",
  },
  {
    icon: Palette,
    name: "Tailwind CSS",
    category: "Styling",
    description:
      "Utility-first styling for the premium dark/cyan glassmorphism design.",
  },
  {
    icon: Route,
    name: "React Router",
    category: "Frontend",
    description:
      "Client-side routing for the dashboard, ARCTES and auth pages.",
  },
  {
    icon: Boxes,
    name: "Lucide React",
    category: "Frontend",
    description:
      "Consistent, lightweight iconography used across the ARCTES UI.",
  },
  {
    icon: Terminal,
    name: "Python",
    category: "Backend",
    description:
      "The core language behind the ARCTES AI service and data pipeline.",
  },
  {
    icon: Server,
    name: "FastAPI",
    category: "Backend",
    description:
      "High-performance async API framework serving the ARCTES chat endpoint.",
  },
  {
    icon: Cog,
    name: "Uvicorn",
    category: "Backend",
    description:
      "ASGI server that runs and streams the FastAPI ARCTES service.",
  },
  {
    icon: Database,
    name: "SQLAlchemy",
    category: "Database",
    description:
      "ORM and migrations for persistent APS MINDS data via Alembic.",
  },
  {
    icon: Cloud,
    name: "OpenRouter",
    category: "AI Infrastructure",
    description:
      "Unified gateway to frontier models powering the ARCTES intelligence core.",
  },
  {
    icon: Cpu,
    name: "gpt-5 nano",
    category: "AI Model",
    description:
      "The OpenRouter model used by ARCTES for fast, intelligent responses.",
  },
  {
    icon: Layers,
    name: "localStorage",
    category: "Storage",
    description:
      "Persistent local chat history for seamless ARCTES conversations.",
  },
  {
    icon: GitBranch,
    name: "Git & GitHub",
    category: "Version Control",
    description:
      "Version control and collaboration for the APS MINDS codebase.",
  },
];

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      <CinematicBackground />

      {/* HERO */}
      <section className="relative z-10 min-h-screen">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 py-28 lg:grid-cols-[1fr_1fr] lg:px-10">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]" />

              <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-200/70">
                ARCTES AUTONOMOUS ENGINE // ONLINE
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-3 font-mono text-[10px] tracking-[0.5em] text-white/25"
            >
              {BRAND.name} // AUTONOMOUS INTELLIGENCE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-['Space_Grotesk'] text-[clamp(4rem,9vw,8rem)] font-bold leading-[0.78] tracking-[-0.08em]"
            >
              THINK.
              <br />

              <span className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                DECIDE.
              </span>

              <br />

              <span className="text-white/90">
                PUBLISH.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-9 max-w-xl text-sm leading-7 text-white/40 sm:text-base"
            >
              <span className="font-semibold text-white/70">
                {BRAND.name}
              </span>{" "}
              — {BRAND.tagline} Powered by {BRAND.aiSystem},{" "}
              {BRAND.arctesFullForm}, an autonomous intelligence that
              discovers what matters, decides what deserves attention,
              remembers what it has published, and continues creating without
              another prompt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/agent/chat"
                className="group flex h-12 items-center gap-3 rounded-xl border border-cyan-300/50 bg-cyan-400 px-6 font-mono text-[10px] font-bold tracking-[0.16em] text-black shadow-[0_0_35px_rgba(34,211,238,.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(34,211,238,.35)]"
              >
                <BrainCircuit size={17} />

                INITIALIZE ARCTES

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/features"
                className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-6 font-mono text-[10px] tracking-[0.16em] text-white/60 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/30 hover:text-white"
              >
                <Sparkles size={16} />
                EXPLORE FEATURES
              </Link>
            </motion.div>

            <div className="mt-12 grid max-w-xl grid-cols-2 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-4">
              {[
                "LIVE DISCOVERY",
                "EDITORIAL AI",
                "MEMORY ENGINE",
                "AUTO PUBLISH",
              ].map((item, index) => (
                <div
                  key={item}
                  className="border-r border-white/[0.05] bg-black/30 px-3 py-4 last:border-0"
                >
                  <div className="font-mono text-[8px] text-cyan-400/60">
                    0{index + 1}
                  </div>

                  <div className="mt-1 text-[8px] tracking-[0.1em] text-white/30">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

{/* ARCTES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25 }}
            className="relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[500px]"
          >
            <div className="absolute h-[min(400px,80vw)] w-[min(400px,80vw)] rounded-full border border-cyan-400/[0.06] shadow-[0_0_120px_rgba(34,211,238,.08)]" />

            <div className="absolute h-[min(300px,62vw)] w-[min(300px,62vw)] rounded-full border border-cyan-400/[0.08]" />

            <ArctesOrb />

            <div className="absolute left-0 top-20 hidden rounded-lg border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2">
                <Radio size={12} className="text-emerald-400" />

                <span className="font-mono text-[8px] tracking-widest text-white/35">
                  LIVE SIGNAL
                </span>
              </div>

              <div className="mt-1 font-mono text-[10px] text-white/70">
                SCANNING WEB
              </div>
            </div>

            <div className="absolute bottom-16 right-0 hidden rounded-lg border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2">
                <Network size={12} className="text-cyan-400" />

                <span className="font-mono text-[8px] tracking-widest text-white/35">
                  NEURAL STATE
                </span>
              </div>

              <div className="mt-1 font-mono text-[10px] text-cyan-200/70">
                AUTONOMOUS
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="relative z-10 border-t border-white/[0.06] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="CORE CAPABILITIES"
            title={
              <>
                Intelligence,{" "}
                <span className="text-cyan-300">engineered.</span>
              </>
            }
            subtitle="APS MINDS is an autonomous intelligence platform powered by ARCTES for research, analysis, cybersecurity and intelligent workflows."
            align="center"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, index) => (
              <FeatureCard
                key={cap.title}
                icon={cap.icon}
                title={cap.title}
                description={cap.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE / AUTONOMOUS LOOP */}
      <section className="relative z-10 border-t border-white/[0.06] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="AUTONOMOUS LOOP"
            title={
              <>
                An AI that{" "}
                <span className="text-cyan-300">keeps moving.</span>
              </>
            }
            subtitle="Instead of waiting for another prompt, ARCTES operates through a continuous autonomous creation loop."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-400/20"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] text-cyan-300">
                      <Icon size={19} />
                    </div>

                    <span className="font-mono text-[9px] text-white/20">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="font-mono text-[9px] tracking-[0.2em] text-cyan-400/60">
                    {item.label}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-white/35">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
</section>

      {/* TECHNOLOGY USED */}
      <section className="relative z-10 border-t border-white/[0.06] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="TECHNOLOGY STACK"
            title={
              <>
                Technology behind{" "}
                <span className="text-cyan-300">APS MINDS.</span>
              </>
            }
            subtitle="Built with a modern, production-grade stack — from the frontend interface to the AI intelligence core."
            align="center"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {technologies.map((tech) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] text-cyan-300 transition duration-500 group-hover:bg-cyan-400/15 group-hover:shadow-[0_0_20px_rgba(34,211,238,.25)]">
                      <Icon size={19} />
                    </div>

                    <span className="rounded-full border border-white/[0.08] bg-black/30 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {tech.name}
                  </h3>

                  <p className="mt-2.5 text-xs leading-6 text-white/35">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.025] p-10 text-center shadow-[0_0_100px_rgba(34,211,238,.04)] sm:p-16"
        >
          <Sparkles
            className="mx-auto text-cyan-300"
            size={22}
          />

          <p className="mt-5 font-mono text-[9px] tracking-[0.3em] text-cyan-400/60">
            INITIALIZE YOUR PERSONA
          </p>

          <h2 className="mt-4 font-['Space_Grotesk'] text-4xl font-semibold sm:text-6xl">
            Don't prompt the future.
            <br />

            <span className="text-cyan-300">
              Let it create.
            </span>
          </h2>

          <Link
            to="/agent/chat"
            className="mt-8 inline-flex h-12 items-center gap-3 rounded-xl bg-cyan-400 px-7 font-mono text-[10px] font-bold tracking-[0.18em] text-black transition hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
          >
            INITIALIZE ARCTES
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center">
        <div className="font-mono text-[9px] tracking-[0.25em] text-white/20">
          {BRAND.name} // POWERED BY {BRAND.aiSystem}
        </div>
      </footer>
    </main>
  );
}

