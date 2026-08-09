import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🤖",
      title: "ARCTES AI Persona",
      description:
        "Your intelligent AI technology analyst for research, reasoning, content generation and autonomous publishing.",
      status: "LIVE",
      action: () => navigate("/agent/chat"),
      live: true,
    },
    {
      icon: "🔎",
      title: "AI Research",
      description:
        "Research topics, analyze information and transform complex knowledge into useful insights.",
      status: "ACTIVE",
      action: () => navigate("/agent/discovery"),
      live: true,
    },
    {
      icon: "✍️",
      title: "AI Editorial",
      description:
        "Generate, refine and structure high-quality content with intelligent AI assistance.",
      status: "ACTIVE",
      action: () => navigate("/agent/editorial"),
      live: true,
    },
    {
      icon: "🧠",
      title: "AI Memory",
      description:
        "Maintain useful context and knowledge so ARCTES can deliver more intelligent responses.",
      status: "ACTIVE",
      action: () => navigate("/agent/memory"),
      live: true,
    },
    {
      icon: "📡",
      title: "Intelligence Feed",
      description:
        "Monitor information streams and surface important insights through an intelligent feed.",
      status: "ACTIVE",
      action: () => navigate("/agent/feed"),
      live: true,
    },
    {
      icon: "🚀",
      title: "Autonomous Publishing",
      description:
        "Turn ideas and research into structured publishing workflows with AI-powered assistance.",
      status: "ACTIVE",
      action: () => navigate("/agent/publishing"),
      live: true,
    },
  ];

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10">
        {/* Header */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            APS Minds Intelligence
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Powerful{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Features
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
            Explore the intelligence layer behind APS Minds. Research,
            reasoning, memory, content creation and autonomous publishing —
            powered by ARCTES AI.
          </p>
        </section>

        {/* ARCTES Hero */}
        <section
          onClick={() => navigate("/agent/chat")}
          className="group mt-16 cursor-pointer overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.03] to-purple-500/[0.06] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_80px_rgba(34,211,238,0.12)] md:p-12"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-3xl">
                  🤖
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Core Intelligence
                    </span>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-400">
                      LIVE
                    </span>
                  </div>

                  <h2 className="mt-1 text-3xl font-black md:text-4xl">
                    ARCTES AI
                  </h2>
                </div>
              </div>

              <p className="text-base leading-7 text-white/50 md:text-lg">
                Meet ARCTES — the autonomous intelligence engine of APS Minds.
                Chat with your AI analyst, ask questions, generate ideas,
                analyze information and build intelligent publishing workflows.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60">
                  AI Conversation
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60">
                  Research
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60">
                  Reasoning
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60">
                  Content Generation
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-4xl transition-transform duration-500 group-hover:scale-110">
                →
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.slice(1).map((feature) => (
            <div
              key={feature.title}
              onClick={feature.action}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.045]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {feature.status}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold">{feature.title}</h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400 opacity-70 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                Explore feature
                <span>→</span>
              </div>
            </div>
          ))}
        </section>

        {/* Technology Section */}
        <section className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Built for Intelligence
              </span>

              <h2 className="mt-4 text-3xl font-black md:text-4xl">
                One ecosystem.
                <br />
                <span className="text-white/40">
                  Multiple intelligence layers.
                </span>
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-white/40">
                APS Minds combines an intelligent frontend experience with
                backend AI services to create a unified autonomous publishing
                ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["AI", "Intelligence"],
                ["API", "Backend"],
                ["RAG", "Knowledge"],
                ["AUTO", "Publishing"],
              ].map(([title, subtitle]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="text-2xl font-black text-cyan-400">
                    {title}
                  </div>

                  <div className="mt-2 text-xs uppercase tracking-wider text-white/30">
                    {subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-20 text-center">
          <p className="text-sm text-white/30">
            Ready to experience the intelligence?
          </p>

          <button
            onClick={() => navigate("/agent/chat")}
            className="mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-8 py-4 text-sm font-bold text-cyan-400 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          >
            Launch ARCTES AI →
          </button>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/20">
            APS • Research • AI
          </p>
        </footer>
      </div>
    </main>
  );
}