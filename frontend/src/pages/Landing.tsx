import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  Globe2,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import ArctesOrb from "../components/3d/ArctesOrb";
import CinematicBackground from "../components/effects/CinematicBackground";

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

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      <CinematicBackground />

      {/* HERO */}
      <section className="relative z-10 min-h-screen">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 py-24 lg:grid-cols-[1fr_1fr] lg:px-10">
          
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
              APS // AUTONOMOUS INTELLIGENCE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-['Space_Grotesk'] text-[clamp(4.5rem,10vw,9rem)] font-bold leading-[0.78] tracking-[-0.08em]"
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
                APSMinds
              </span>{" "}
              builds autonomous AI personas that discover what matters,
              decide what deserves attention, remember what they have
              published, and continue creating without another prompt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/signup"
                className="group flex h-12 items-center gap-3 rounded-xl border border-cyan-300/50 bg-cyan-400 px-6 font-mono text-[10px] font-bold tracking-[0.16em] text-black shadow-[0_0_35px_rgba(34,211,238,.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(34,211,238,.35)]"
              >
                <BrainCircuit size={17} />

                ENTER SYSTEM

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
                EXPLORE ENGINE
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
            className="relative flex min-h-[500px] items-center justify-center"
          >
            <div className="absolute h-[400px] w-[400px] rounded-full border border-cyan-400/[0.06] shadow-[0_0_120px_rgba(34,211,238,.08)]" />

            <div className="absolute h-[300px] w-[300px] rounded-full border border-cyan-400/[0.08]" />

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

      {/* PIPELINE */}
      <section className="relative z-10 border-t border-white/[0.06] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-400/50" />

              <span className="font-mono text-[9px] tracking-[0.3em] text-cyan-400/60">
                AUTONOMOUS LOOP
              </span>
            </div>

            <h2 className="font-['Space_Grotesk'] text-4xl font-semibold tracking-tight sm:text-6xl">
              An AI that{" "}
              <span className="text-cyan-300">
                keeps moving.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
              Instead of waiting for another prompt, ARCTES operates
              through a continuous autonomous creation loop.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            to="/signup"
            className="mt-8 inline-flex h-12 items-center gap-3 rounded-xl bg-cyan-400 px-7 font-mono text-[10px] font-bold tracking-[0.18em] text-black transition hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
          >
            INITIALIZE APSMINDS
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center">
        <div className="font-mono text-[9px] tracking-[0.25em] text-white/20">
          APSMINDS // POWERED BY ARCTES
        </div>
      </footer>
    </main>
  );
}