'use client';

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  User, 
  FolderKanban, 
  Terminal, 
  Layers, 
  FileText, 
  Mail 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { isPostHogConfigured, posthog } from "@/lib/posthog";

// Standard horizontal navigation items for top-of-page navbar
const navItems = [
  { name: "About",      id: "about"              },
  { name: "Projects",   id: "projects"           },
  { name: "Experience", id: "engineering-record" },
  { name: "Skills",     id: "skills"             },
  { name: "Resume",     id: "resume", href: "/Sukhith_MS_Resume_Klanvision.pdf", download: true },
  { name: "Contact",    id: "contact"            },
];

// 90° Arc Radial items — Exactly the 6 sections of your portfolio
const radialItems = [
  { name: "About",      id: "about",              icon: <User size={18} /> },
  { name: "Projects",   id: "projects",           icon: <FolderKanban size={18} /> },
  { name: "Experience", id: "engineering-record",  icon: <Terminal size={18} /> },
  { name: "Skills",     id: "skills",             icon: <Layers size={18} /> },
  { name: "Resume",     id: "resume",             icon: <FileText size={18} />, href: "/Sukhith_MS_Resume_Klanvision.pdf", download: true },
  { name: "Contact",    id: "contact",            icon: <Mail size={18} /> },
];

// Spacious arc radius for 6 items to prevent congestion
const ARC_RADIUS = 180;
const START_ANGLE_DEG = 4;
const END_ANGLE_DEG = 86;

const getArcCoordinate = (index: number, total: number) => {
  const angleDeg = START_ANGLE_DEG + (index * (END_ANGLE_DEG - START_ANGLE_DEG)) / (total - 1);
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(ARC_RADIUS * Math.cos(angleRad)),
    y: Math.round(ARC_RADIUS * Math.sin(angleRad)),
  };
};

const wrapperVariants = {
  expanded: {
    left: "50%",
    x: "-50%",
    transition: {
      type: "spring" as const,
      damping: 24,
      stiffness: 240,
    },
  },
  collapsed: {
    left: "clamp(16px, 2.5vw, 28px)",
    x: "0%",
    transition: {
      delay: 0.7, // As requested, delay until pill collapse finishes in center
      type: "spring" as const,
      damping: 24,
      stiffness: 220,
    },
  },
};

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    rotate: 0,
    transition: {
      y: { type: "spring" as const, damping: 18, stiffness: 250 },
      opacity: { duration: 0.25 },
      width: { delay: 0.32, duration: 0.3, type: "spring" as const, damping: 22, stiffness: 260 },
      rotate: { duration: 0.32, ease: "easeInOut" as const },
      staggerChildren: 0.05,
      delayChildren: 0.42,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    rotate: -360,
    transition: {
      width: { duration: 0.26, type: "spring" as const, damping: 20, stiffness: 280 },
      rotate: { delay: 0.7, duration: 0.45, ease: "easeInOut" as const },
      when: "afterChildren" as const,
      staggerChildren: 0.03,
      staggerDirection: -1 as const,
    },
  },
};

const itemVariants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -12, scale: 0.92, transition: { duration: 0.12 } },
};

const collapsedIconVariants = {
  expanded:  { opacity: 0, scale: 0.7, rotate: 0, transition: { duration: 0.15 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      opacity: { delay: 0.15, duration: 0.15 },
      scale: { delay: 0.15, type: "spring" as const, damping: 15 },
      rotate: { delay: 0.7, duration: 0.45, ease: "easeInOut" as const },
    },
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [isRadialOpen, setRadialOpen] = React.useState(false);
  const [activeSection, setActive] = React.useState("home");
  const [hoveredRadial, setHoveredRadial] = React.useState<number | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // As soon as user scrolls down past 40px, collapse into pill and move to top-left
    if (latest > 40) {
      setExpanded(false);
    } else {
      setExpanded(true);
      setRadialOpen(false); // Close radial menu when back at top
    }

    const mid = latest + 120;
    for (let i = navItems.length - 1; i >= 0; i--) {
      const el = document.getElementById(navItems[i].id);
      if (el && el.offsetTop <= mid) {
        setActive(navItems[i].id);
        break;
      }
    }
  });

  const scrollTo = (id: string) => {
    setRadialOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded) {
      setRadialOpen((prev) => !prev);
    }
  };

  return (
    <>
      {/* ── BACKDROP TO CLOSE RADIAL ON CLICK OUTSIDE ── */}
      <AnimatePresence>
        {isRadialOpen && !isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setRadialOpen(false)}
            className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={wrapperVariants}
        initial="expanded"
        animate={isExpanded ? "expanded" : "collapsed"}
        className="fixed top-6 z-[999]"
      >
        <div className="relative">
          {/* ── 90° RADIAL SATELLITE ITEMS (Fan out downward and to the right) ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40">
            {radialItems.map((item, idx) => {
              const { x, y } = getArcCoordinate(idx, radialItems.length);
              const isHovered = hoveredRadial === idx;

              return (
                <div
                  key={item.name}
                  className="absolute top-0 left-0"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: isRadialOpen && !isExpanded ? x : 0,
                      y: isRadialOpen && !isExpanded ? y : 0,
                      scale: isRadialOpen && !isExpanded ? 1 : 0,
                      opacity: isRadialOpen && !isExpanded ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 24,
                      delay: isRadialOpen ? idx * 0.025 : (radialItems.length - 1 - idx) * 0.02,
                    }}
                    style={{
                      pointerEvents: isRadialOpen && !isExpanded ? "auto" : "none",
                    }}
                    className="relative -top-5 -left-5"
                  >
                    {item.download ? (
                      <a
                        href={item.href}
                        download
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPostHogConfigured) {
                            posthog.capture('resume_downloaded', { navigation_variant: 'radial' });
                          }
                          setRadialOpen(false);
                        }}
                        onMouseEnter={() => setHoveredRadial(idx)}
                        onMouseLeave={() => setHoveredRadial(null)}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md transition-all duration-150",
                          // White background aesthetic
                          "bg-white/95 border border-black/10 text-black shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
                          "hover:bg-[#E03D16] hover:text-white hover:border-[#E03D16] hover:scale-110"
                        )}
                        aria-label={item.name}
                      >
                        {item.icon}
                        {isHovered && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.85, x: 4 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className="absolute left-full ml-2.5 px-2.5 py-1 rounded-md bg-white/95 text-black text-[10px] font-bold tracking-wider uppercase border border-black/10 shadow-xl whitespace-nowrap pointer-events-none"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollTo(item.id);
                        }}
                        onMouseEnter={() => setHoveredRadial(idx)}
                        onMouseLeave={() => setHoveredRadial(null)}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md transition-all duration-150",
                          // White background aesthetic
                          "bg-white/95 border border-black/10 text-black shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
                          "hover:bg-[#E03D16] hover:text-white hover:border-[#E03D16] hover:scale-110"
                        )}
                        aria-label={item.name}
                      >
                        {item.icon}
                        {isHovered && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.85, x: 4 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className="absolute left-full ml-2.5 px-2.5 py-1 rounded-md bg-white/95 text-black text-[10px] font-bold tracking-wider uppercase border border-black/10 shadow-xl whitespace-nowrap pointer-events-none"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </button>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ── MAIN NAV / PILL TRIGGER (STAYS WHITE THROUGHOUT) ── */}
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            whileHover={!isExpanded ? { scale: 1.08 } : {}}
            whileTap={!isExpanded ? { scale: 0.95 } : {}}
            onClick={handleTriggerClick}
            className={cn(
              "relative flex items-center overflow-hidden rounded-full shadow-lg backdrop-blur-md h-12 transition-colors duration-200 z-50",
              // Keep clean white styling in all states
              isExpanded
                ? "border border-black/10 bg-white/90 text-black"
                : isRadialOpen
                ? "cursor-pointer justify-center border border-black/15 bg-white text-black shadow-xl ring-2 ring-[#E03D16]/30"
                : "cursor-pointer justify-center border border-black/10 bg-white/90 text-black hover:bg-white"
            )}
          >
            {/* Expanded items */}
            <motion.div
              className={cn(
                "flex items-center gap-0.5 sm:gap-1 px-4",
                !isExpanded && "pointer-events-none"
              )}
            >
              {navItems.map((item) => {
                if (item.download) {
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      download
                      variants={itemVariants}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isPostHogConfigured) {
                          posthog.capture('resume_downloaded', { navigation_variant: 'horizontal' });
                        }
                      }}
                      className="text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] text-black/70 hover:text-black transition-colors px-2 sm:px-3 py-1 uppercase whitespace-nowrap"
                    >
                      {item.name}
                    </motion.a>
                  );
                }

                const active = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollTo(item.id);
                    }}
                    className={cn(
                      "text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] px-2 sm:px-3 py-1 uppercase whitespace-nowrap transition-colors",
                      active ? "text-black" : "text-black/60 hover:text-black"
                    )}
                  >
                    {item.name}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Collapsed Trigger Icons (Cross-fade Menu <-> X in Black on White) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
                <AnimatePresence mode="wait" initial={false}>
                  {isRadialOpen ? (
                    <motion.div
                      key="close-icon"
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-5 w-5 text-black" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu-icon"
                      initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="h-5 w-5 text-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.nav>
        </div>
      </motion.div>
    </>
  );
}

export { AnimatedNavFramer as Navbar };
