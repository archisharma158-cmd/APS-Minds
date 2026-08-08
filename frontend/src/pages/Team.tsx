export default function Team() {
  return (
    <main className="min-h-screen bg-[#030712] text-white px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          APS MINDS
        </p>

        <h1 className="text-5xl font-black">
          Meet the <span className="text-cyan-400">Team</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-white/50">
          The team building ARCTES and the next generation of autonomous
          publishing intelligence.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 text-2xl font-black text-cyan-400">
              P
            </div>

            <h2 className="mt-6 text-2xl font-bold">Parth</h2>
            <p className="mt-2 text-cyan-400">Frontend & AI Systems</p>
            <p className="mt-4 text-sm text-white/40">
              Building the ARCTES interface and intelligent user experience.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-400/10 text-2xl font-black text-purple-400">
              A
            </div>

            <h2 className="mt-6 text-2xl font-bold">Archi</h2>
            <p className="mt-2 text-purple-400">Backend & AI Systems</p>
            <p className="mt-4 text-sm text-white/40">
              Building backend services and autonomous intelligence systems.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
