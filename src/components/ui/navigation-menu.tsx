"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { Navigation, Menu, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav Items ────────────────────────────────────────────────────────────────
const navItems = [
  { name: "Home",     id: "home"     },
  { name: "About",    id: "about"    },
  { name: "Projects", id: "projects" },
  { name: "Skills",   id: "skills"   },
  { name: "Contact",  id: "contact"  },
];

// Pixel offset so smooth-scroll lands below the fixed nav bar (nav h-12 + top-6 + buffer)
const NAV_SCROLL_OFFSET = 88;

// How far user must scroll UP before pill re-expands
const EXPAND_THRESHOLD = 80;

// ─── Desktop pill variants ────────────────────────────────────────────────────
const pillVariants: Variants = {
  expanded: {
    width: "auto",
    transition: {
      type: "spring", damping: 20, stiffness: 300,
      staggerChildren: 0.07, delayChildren: 0.15,
    },
  },
  collapsed: {
    width: "3rem",
    transition: {
      type: "spring", damping: 20, stiffness: 300,
      when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded:  { opacity: 1, x: 0,   rotate: 0,    transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, rotate: -180, transition: { duration: 0.25 } },
};

const linkVariants: Variants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -16, scale: 0.95, transition: { duration: 0.18 } },
};

const menuIconVariants: Variants = {
  expanded:  { opacity: 0, scale: 0.7, transition: { duration: 0.18 } },
  collapsed: { opacity: 1, scale: 1,   transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.12 } },
};

// ─── Mobile overlay variants ──────────────────────────────────────────────────
const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.2, delay: 0.08 } },
};

const mobileItemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", damping: 16, stiffness: 220, delay: i * 0.06 },
  }),
  exit: (i: number) => ({
    opacity: 0, y: -12,
    transition: { duration: 0.14, delay: (navItems.length - i) * 0.04 },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────
export function AnimatedNavFramer() {
  const [isExpanded,    setExpanded]    = React.useState(true);
  const [activeSection, setActive]      = React.useState("home");
  const [mobileOpen,    setMobileOpen]  = React.useState(false);

  const { scrollY }              = useScroll();
  const lastScrollY              = React.useRef(0);
  const collapseScrollPos        = React.useRef(0);

  // ── Scroll spy + pill collapse ──────────────────────────────────────────────
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;

    // Collapse when scrolling down past 150px
    if (isExpanded && latest > prev && latest > 150) {
      setExpanded(false);
      collapseScrollPos.current = latest;
    }
    // Expand when user scrolls up > threshold
    else if (!isExpanded && latest < prev && collapseScrollPos.current - latest > EXPAND_THRESHOLD) {
      setExpanded(true);
    }

    lastScrollY.current = latest;

    // Active section detection — offset matches NAV_SCROLL_OFFSET so highlight
    // fires exactly when the section header clears the navbar
    const scrollMid = latest + NAV_SCROLL_OFFSET + 32;
    for (let i = navItems.length - 1; i >= 0; i--) {
      const el = document.getElementById(navItems[i].id);
      if (el && el.offsetTop <= scrollMid) {
        setActive(navItems[i].id);
        break;
      }
    }
  });

  // ── Smooth scroll with navbar clearance ─────────────────────────────────────
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setMobileOpen(false);
  };

  // ── Keyboard: Escape closes mobile menu ─────────────────────────────────────
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // ── Body scroll lock when mobile menu is open ────────────────────────────────
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Clicking collapsed pill re-expands it
  const handlePillClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <nav role="navigation" aria-label="Site navigation">
      {/* ── Desktop / Tablet ───────────────────────────────────────────────── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={["expanded", isExpanded ? "expanded" : "collapsed"]}
          variants={pillVariants}
          whileHover={!isExpanded ? { scale: 1.08 } : {}}
          whileTap={!isExpanded  ? { scale: 0.95 } : {}}
          onClick={handlePillClick}
          aria-expanded={isExpanded}
          aria-label={!isExpanded ? "Expand navigation" : undefined}
          role={!isExpanded ? "button" : undefined}
          className={cn(
            "relative flex items-center overflow-hidden rounded-full h-12",
            "border border-[#1D2125] bg-[#0B0F13]/90",
            "backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.7)]",
            !isExpanded && "cursor-pointer justify-center w-12"
          )}
        >
          {/* Brand mark */}
          <motion.div
            variants={logoVariants}
            className="flex-shrink-0 flex items-center font-serif-accent text-xl font-bold pl-4 pr-2 text-[#E6E3DF] select-none"
          >
            <Navigation className="h-5 w-5 mr-1 text-[#F05A17]" aria-hidden="true" />
            <span>S</span>
          </motion.div>

          {/* Links */}
          <motion.div
            className={cn(
              "flex items-center gap-1 pr-2",
              !isExpanded && "pointer-events-none select-none"
            )}
          >
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  variants={linkVariants}
                  tabIndex={isExpanded ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollTo(item.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollTo(item.id);
                    }
                  }}
                  className={cn(
                    "text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer",
                    "transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A17]",
                    "focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0F13]",
                    active
                      ? "bg-[#F05A17]/15 text-[#E6E3DF] border border-[#F05A17]/30 shadow-[0_0_10px_rgba(240,90,23,0.15)]"
                      : "text-[#A8A29C] hover:text-[#E6E3DF] hover:bg-white/5"
                  )}
                >
                  {item.name}
                </motion.a>
              );
            })}

            {/* Hire Me */}
            <motion.a
              variants={linkVariants}
              href="mailto:sukhithms25@gmail.com"
              tabIndex={isExpanded ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full",
                "btn-primary text-white text-xs font-medium shrink-0",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A17]"
              )}
            >
              <Mail size={12} aria-hidden="true" />
              <span>Hire Me</span>
            </motion.a>
          </motion.div>

          {/* Collapsed hamburger icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              variants={menuIconVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <Menu className="h-5 w-5 text-[#E6E3DF]" aria-hidden="true" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile ─────────────────────────────────────────────────────────── */}
      <div className="md:hidden">
        {/* Top bar */}
        <div
          className={cn(
            "fixed top-4 left-0 right-0 mx-4 z-50",
            "flex items-center justify-between px-5 py-3 rounded-2xl",
            "glass-dark border border-[#1D2125] shadow-lg"
          )}
        >
          <button
            onClick={() => scrollTo("home")}
            className="font-serif-accent text-lg font-semibold text-[#E6E3DF] flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A17] rounded"
            aria-label="Go to top"
          >
            <Navigation className="h-4 w-4 text-[#F05A17]" aria-hidden="true" />
            Sukhith M S
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-overlay"
            className={cn(
              "p-2 rounded-lg transition-colors",
              "text-[#A8A29C] hover:text-[#E6E3DF]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A17]"
            )}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {/* Full-screen animated overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#03070B]/98 backdrop-blur-xl"
            >
              {/* Tap-outside-to-close backdrop */}
              <div
                className="absolute inset-0"
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />

              {/* Menu items */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Active section indicator */}
                <p className="text-[10px] font-mono tracking-widest text-[#A8A29C]/50 uppercase mb-2">
                  Navigate
                </p>

                {navItems.map(({ name, id }, i) => {
                  const active = activeSection === id;
                  return (
                    <motion.button
                      key={id}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => scrollTo(id)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-3xl font-serif-accent font-medium transition-colors px-6 py-1.5 rounded-xl",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A17]",
                        active
                          ? "text-[#F05A17]"
                          : "text-[#A8A29C] hover:text-[#E6E3DF]"
                      )}
                    >
                      {/* Active dot indicator */}
                      <span className="flex items-center gap-3">
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F05A17] inline-block" aria-hidden="true" />
                        )}
                        {name}
                      </span>
                    </motion.button>
                  );
                })}

                {/* Hire Me */}
                <motion.a
                  href="mailto:sukhithms25@gmail.com"
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "mt-6 flex items-center gap-2.5 px-8 py-3 rounded-full",
                    "btn-primary text-white text-base font-medium",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A17]"
                  )}
                >
                  <Mail size={16} aria-hidden="true" />
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
