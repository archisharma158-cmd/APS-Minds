export default function Contact() {
  return (
    <main className="min-h-screen bg-[#030712] text-white px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          APS MINDS
        </p>

        <h1 className="text-5xl font-black">
          Contact <span className="text-cyan-400">Us</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-white/50">
          Connect with APS Minds and explore the future of autonomous
          publishing intelligence.
        </p>

        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/60">
            Ready to build the future with ARCTES?
          </p>

          <a
            href="mailto:contact@apsminds.ai"
            className="mt-6 inline-block rounded-xl bg-cyan-400 px-6 py-3 font-bold text-black"
          >
            Contact APS Minds
          </a>
        </div>
      </div>
    </main>
  );
}
