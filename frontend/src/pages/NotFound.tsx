import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "../config";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02040a] px-6 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 text-center">
        <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/60">
          {BRAND.name} // SIGNAL LOST
        </div>

        <h1 className="mt-6 bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 bg-clip-text font-['Space_Grotesk'] text-[clamp(6rem,20vw,12rem)] font-black leading-none tracking-tight text-transparent">
          404
        </h1>

        <p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Signal Not Found
        </p>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/40">
          The page you're looking for has drifted out of ARCTES's intelligence
          range. Let's guide you back to known coordinates.
        </p>

        <Link
          to="/"
          className="group mt-8 inline-flex h-12 items-center gap-3 rounded-xl border border-cyan-300/50 bg-cyan-400 px-7 font-mono text-[10px] font-bold tracking-[0.16em] text-black shadow-[0_0_35px_rgba(34,211,238,.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(34,211,238,.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          RETURN HOME
        </Link>
      </div>
    </main>
  );
}

