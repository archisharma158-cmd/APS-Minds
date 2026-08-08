import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/apsminds-logo.jpg";

const navItems = [
  { label: "Features", to: "/features" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

const productItems = [
  { label: "ARCTES AI", href: "#arctes" },
  { label: "AUTONOMOUS ENGINE", href: "#engine" },
  { label: "AI DISCOVERY", href: "#discovery" },
  { label: "LIVE FEED", href: "#feed" },
];

export default function Navbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#02040a]/80 shadow-[0_15px_70px_rgba(0,0,0,.45)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="group relative flex items-center gap-3"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-cyan-300/20 bg-black shadow-[0_0_30px_rgba(0,170,255,.12)]">
              <img
                src={logo}
                alt="APSMinds"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-blue-600/10" />

              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>

            <div className="hidden sm:block">
              <div className="text-[18px] font-black tracking-[-0.04em] text-white">
                APS<span className="text-cyan-300">MINDS</span>
              </div>

              <div className="mt-0.5 font-mono text-[7px] tracking-[0.28em] text-white/30">
                AUTONOMOUS INTELLIGENCE
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-1 lg:flex">

            {/* PRODUCT */}
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProductOpen((v) => !v)}
                className="group flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] text-white/45 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
              >
                PRODUCT

                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${
                    productOpen ? "rotate-180 text-cyan-300" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-[52px] w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#03070e]/95 p-2 shadow-[0_30px_100px_rgba(0,0,0,.65)] backdrop-blur-2xl"
                  >
                    <div className="mb-1 px-3 py-2 font-mono text-[7px] tracking-[0.3em] text-cyan-300/40">
                      APSMINDS SYSTEM
                    </div>

                    {productItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-cyan-300/[0.05]"
                      >
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          <span className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
                          <span className="absolute h-4 w-4 rounded-full border border-cyan-300/10 group-hover:animate-ping" />
                        </span>

                        <span className="font-mono text-[9px] tracking-[0.12em] text-white/45 transition group-hover:text-white/90">
                          {item.label}
                        </span>

                        <ArrowRight
                          size={12}
                          className="ml-auto text-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                        />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OTHER LINKS */}
            {navItems.map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`group relative rounded-xl px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] transition-all duration-300 ${
                    active
                      ? "text-white"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label.toUpperCase()}

                  <span
                    className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-cyan-300 shadow-[0_0_10px_#22d3ee] transition-all duration-300 ${
                      active
                        ? "w-6"
                        : "w-0 group-hover:w-5"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="hidden items-center gap-2 lg:flex">

            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-white/45 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
            >
              LOGIN
            </Link>

            <Link
              to="/signup"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-cyan-200/30 bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.16em] text-black shadow-[0_0_30px_rgba(34,211,238,.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/50 transition-transform duration-500 group-hover:translate-x-full" />

              <Sparkles size={13} />

              <span className="relative">
                INITIALIZE
              </span>

              <ArrowRight
                size={13}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-cyan-300/20 hover:text-cyan-300 lg:hidden"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={19} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={19} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[9990] bg-black/75 backdrop-blur-md lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed bottom-0 right-0 top-0 z-[9995] w-[88%] max-w-sm border-l border-white/[0.08] bg-[#02050b]/98 px-6 pt-7 shadow-[-30px_0_100px_rgba(0,0,0,.7)] backdrop-blur-2xl lg:hidden"
            >
              {/* MOBILE HEADER */}
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/20">
                    <img
                      src={logo}
                      alt="APSMinds"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-black text-white">
                      APS<span className="text-cyan-300">MINDS</span>
                    </div>

                    <div className="font-mono text-[6px] tracking-[0.2em] text-white/25">
                      AUTONOMOUS INTELLIGENCE
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-white/10 p-2 text-white/50 transition hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* STATUS */}
              <div className="mt-12 flex items-center gap-2 font-mono text-[8px] tracking-[0.22em] text-emerald-300/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                ARCTES ENGINE ONLINE
              </div>

              {/* NAVIGATION */}
              <div className="mt-6">
                <div className="mb-3 font-mono text-[8px] tracking-[0.3em] text-white/20">
                  NAVIGATION
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 font-mono text-[10px] tracking-[0.15em] text-white/55 transition-all hover:border-cyan-300/15 hover:bg-cyan-300/[0.04] hover:text-white"
                    >
                      {item.label.toUpperCase()}

                      <ArrowRight
                        size={14}
                        className="text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* PRODUCT */}
              <div className="mt-8 border-t border-white/[0.06] pt-7">
                <div className="mb-3 font-mono text-[8px] tracking-[0.3em] text-white/20">
                  SYSTEM
                </div>

                <a
                  href="#arctes"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[9px] tracking-[0.14em] text-white/40 transition hover:bg-white/[0.03] hover:text-white"
                >
                  ARCTES AI
                  <ArrowRight size={13} />
                </a>

                <a
                  href="#discovery"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[9px] tracking-[0.14em] text-white/40 transition hover:bg-white/[0.03] hover:text-white"
                >
                  DISCOVERY
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* ACTIONS */}
              <div className="mt-7 border-t border-white/[0.06] pt-7">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mb-3 block rounded-xl border border-white/10 px-5 py-4 text-center font-mono text-[10px] tracking-[0.15em] text-white/60 transition hover:bg-white/[0.03] hover:text-white"
                >
                  LOGIN
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-4 font-mono text-[10px] font-black tracking-[0.15em] text-black shadow-[0_0_30px_rgba(34,211,238,.15)]"
                >
                  <Sparkles size={15} />
                  INITIALIZE ARCTES
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* FOOTER STATUS */}
              <div className="absolute bottom-7 left-6 right-6 border-t border-white/[0.06] pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[7px] tracking-[0.2em] text-white/20">
                    APSMINDS v1.0
                  </span>

                  <span className="font-mono text-[7px] tracking-[0.2em] text-cyan-300/30">
                    SYSTEM READY
                  </span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}