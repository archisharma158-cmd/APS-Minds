import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  BrainCircuit,
  ChevronDown,
  Globe,
  Menu,
  Radio,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/apsminds-logo.jpg";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
];

const productItems = [
  {
    label: "ARCTES AI",
    to: "/agent/chat",
    icon: BrainCircuit,
    desc: "Chat with your autonomous intelligence",
  },
  {
    label: "AUTONOMOUS ENGINE",
    to: "/agent",
    icon: Atom,
    desc: "Command center for the autonomous loop",
  },
  {
    label: "AI DISCOVERY",
    to: "/agent/discovery",
    icon: Globe,
    desc: "Uncover live AI & technology signals",
  },
  {
    label: "LIVE FEED",
    to: "/agent/feed",
    icon: Radio,
    desc: "Monitor the real-time intelligence feed",
  },
];

export default function Navbar() {
  const location = useLocation();

const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const productRef = useRef<HTMLDivElement>(null);

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
    setMobileProductOpen(false);
  }, [location.pathname]);

  // Close the mobile drawer with the Escape key.
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKey);

    // Prevent the page behind from scrolling while the drawer is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  // Close dropdown when clicking outside.
  useEffect(() => {
    if (!productOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        productRef.current &&
        !productRef.current.contains(event.target as Node)
      ) {
        setProductOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProductOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [productOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setProductOpen(false);
  };

  // If already on the homepage, smooth-scroll to top instead of reloading.
  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeAll();
    } else {
      closeAll();
    }
  };

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

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
          <Link to="/" onClick={handleHomeClick} className="group relative flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-cyan-300/20 bg-black shadow-[0_0_30px_rgba(0,170,255,.12)]">
              <img
                src={logo}
                alt="APS Minds"
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

            {/* HOME */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className={`group relative rounded-xl px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] transition-all duration-300 ${
                isActive("/")
                  ? "text-white"
                  : "text-white/45 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              HOME
              <span
                className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-cyan-300 shadow-[0_0_10px_#22d3ee] transition-all duration-300 ${
                  isActive("/") ? "w-6" : "w-0 group-hover:w-5"
                }`}
              />
            </Link>

            {/* PRODUCT */}
            <div
              className="relative"
              ref={productRef}
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProductOpen((v) => !v)}
                aria-expanded={productOpen}
                aria-haspopup="menu"
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
                    role="menu"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-[52px] w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#03070e]/95 p-2 shadow-[0_30px_100px_rgba(0,0,0,.65)] backdrop-blur-2xl"
                  >
                    <div className="mb-1 px-3 py-2 font-mono text-[7px] tracking-[0.3em] text-cyan-300/40">
                      APSMINDS SYSTEM
                    </div>

                    {productItems.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.to;

                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          role="menuitem"
                          onClick={closeAll}
                          className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-cyan-300/[0.05] ${
                            active ? "bg-cyan-300/[0.04]" : ""
                          }`}
                        >
                          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-cyan-300/50 transition group-hover:text-cyan-300">
                            <Icon size={15} />
                            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-cyan-300/20 transition group-hover:bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                          </span>

                          <span className="flex-1">
                            <span className="block font-mono text-[9px] tracking-[0.12em] text-white/45 transition group-hover:text-white/90">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-[10px] text-white/25">
                              {item.desc}
                            </span>
                          </span>

                          <ArrowRight
                            size={12}
                            className="text-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                          />
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OTHER LINKS */}
            {navItems.slice(1).map((item) => {
              const active = isActive(item.to);

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={closeAll}
                  className={`group relative rounded-xl px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] transition-all duration-300 ${
                    active
                      ? "text-white"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label.toUpperCase()}

                  <span
                    className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-cyan-300 shadow-[0_0_10px_#22d3ee] transition-all duration-300 ${
                      active ? "w-6" : "w-0 group-hover:w-5"
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
              to="/agent/chat"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-cyan-200/30 bg-cyan-300 px-5 py-3 font-mono text-[9px] font-black tracking-[0.16em] text-black shadow-[0_0_30px_rgba(34,211,238,.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/50 transition-transform duration-500 group-hover:translate-x-full" />
              <Sparkles size={13} />
              <span className="relative">INITIALIZE ARCTES</span>
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
            className="touch-target flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-cyan-300/20 hover:text-cyan-300 lg:hidden"
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
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-0 z-[9995] w-[88%] max-w-sm overflow-y-auto border-l border-white/[0.08] bg-[#02050b]/98 px-6 pt-7 shadow-[-30px_0_100px_rgba(0,0,0,.7)] backdrop-blur-2xl lg:hidden"
            >
              {/* MOBILE HEADER */}
              <div className="flex items-center justify-between">
                <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/20">
                    <img src={logo} alt="APS Minds" className="h-full w-full object-cover" />
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
                  aria-label="Close menu"
                  className="touch-target flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 p-2 text-white/50 transition hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* STATUS */}
              <div className="mt-10 flex items-center gap-2 font-mono text-[8px] tracking-[0.22em] text-emerald-300/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                ARCTES ENGINE ONLINE
              </div>

{/* PRODUCT — tap-based accordion */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setMobileProductOpen((v) => !v)}
                  aria-expanded={mobileProductOpen}
                  className="touch-target flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 font-mono text-[10px] tracking-[0.15em] text-white/55 transition-all hover:border-cyan-300/15 hover:bg-cyan-300/[0.04] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <BrainCircuit size={14} className="text-cyan-300/60" />
                    PRODUCT
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-white/30 transition-transform duration-300 ${
                      mobileProductOpen ? "rotate-180 text-cyan-300" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileProductOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 space-y-2 pl-3">
                        {productItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              to={item.to}
                              onClick={closeAll}
                              className="touch-target group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 font-mono text-[10px] tracking-[0.15em] text-white/55 transition-all hover:border-cyan-300/15 hover:bg-cyan-300/[0.04] hover:text-white"
                            >
                              <span className="flex items-center gap-3">
                                <Icon size={14} className="text-cyan-300/60" />
                                {item.label}
                              </span>
                              <ArrowRight
                                size={14}
                                className="text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* NAVIGATION */}
              <div className="mt-8 border-t border-white/[0.06] pt-7">
                <div className="mb-3 font-mono text-[8px] tracking-[0.3em] text-white/20">
                  NAVIGATION
                </div>

<div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={item.to === "/" ? handleHomeClick : closeAll}
                      className="touch-target group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 font-mono text-[10px] tracking-[0.15em] text-white/55 transition-all hover:border-cyan-300/15 hover:bg-cyan-300/[0.04] hover:text-white"
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

              {/* ACTIONS */}
              <div className="mt-7 border-t border-white/[0.06] pt-7">
                <Link
                  to="/login"
                  onClick={closeAll}
                  className="mb-3 block rounded-xl border border-white/10 px-5 py-4 text-center font-mono text-[10px] tracking-[0.15em] text-white/60 transition hover:bg-white/[0.03] hover:text-white"
                >
                  LOGIN
                </Link>

                <Link
                  to="/agent/chat"
                  onClick={closeAll}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-4 font-mono text-[10px] font-black tracking-[0.15em] text-black shadow-[0_0_30px_rgba(34,211,238,.15)]"
                >
                  <Sparkles size={15} />
                  INITIALIZE ARCTES
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* FOOTER STATUS */}
              <div className="mt-7 border-t border-white/[0.06] pt-5">
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
