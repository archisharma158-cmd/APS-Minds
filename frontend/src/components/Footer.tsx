import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/apsminds-logo.jpg";
import { BRAND, teamMembers } from "../config";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#02040a]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/20">
                <img
                  src={logo}
                  alt={BRAND.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="text-base font-black tracking-[-0.02em] text-white">
                  APS<span className="text-cyan-300">MINDS</span>
                </div>

                <div className="font-mono text-[7px] tracking-[0.24em] text-white/30">
                  AUTONOMOUS INTELLIGENCE PLATFORM
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/40">
              {BRAND.aiSystem} — {BRAND.arctesFullForm}.
            </p>

            <p className="mt-3 text-sm text-white/40">{BRAND.tagline}</p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              POWERED BY {BRAND.aiSystem}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-cyan-400/60">
              QUICK LINKS
            </div>

            <div className="mt-4 grid gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "Product", to: "/agent" },
                { label: "Features", to: "/features" },
                { label: "About", to: "/about" },
                { label: "Team", to: "/team" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm text-white/45 transition hover:text-cyan-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-cyan-400/60">
              TEAM
            </div>

            <div className="mt-4 grid gap-2">
              {teamMembers.map((member) => (
                <span
                  key={member.name}
                  className="text-sm text-white/45"
                >
                  {member.name}
                </span>
              ))}
            </div>

            <div className="mt-5 font-mono text-[9px] tracking-[0.25em] text-cyan-400/60">
              UNIVERSITY
            </div>

            <p className="mt-2 text-sm text-white/45">
              {teamMembers[0]?.university}
            </p>
          </div>

{/* Team Contact */}
          <div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-cyan-400/60">
              {BRAND.aiSystem}
            </div>

            <p className="mt-4 text-sm leading-6 text-white/45">
              {BRAND.arctesFullForm}.
            </p>

            <div className="mt-5 font-mono text-[9px] tracking-[0.25em] text-cyan-400/60">
              TEAM CONTACT
            </div>

            <div className="mt-3 grid gap-2">
              {teamMembers.map((member) => (
                <a
                  key={member.name}
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-cyan-300"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="break-all">{member.email}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center">
          <div className="font-mono text-[9px] tracking-[0.2em] text-white/25">
            {BRAND.name} — Powered by {BRAND.aiSystem}
          </div>

          <p className="mt-2 text-sm text-white/40">
            {teamMembers[0]?.university}
          </p>

          <p className="mt-1 text-xs text-white/30">
            B.Tech Cyber Security • B.Tech AI/ML
          </p>

          <div className="mt-3 font-mono text-[9px] tracking-[0.2em] text-white/25">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
