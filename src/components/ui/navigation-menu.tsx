"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import type { Variants } from "framer-motion";
import { Navigation, Menu, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    },
  },
};

export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("home");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;

    // Section scroll spy
    const sections = navItems.map((item) => document.getElementById(item.id));
    const scrollPos = latest + 150;
    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i];
      if (s && s.offsetTop <= scrollPos) {
        setActiveSection(navItems[i].id);
        break;
      }
    }
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <>
      {/* Desktop & Tablet Animated Framer Nav */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.1 } : {}}
          whileTap={!isExpanded ? { scale: 0.95 } : {}}
          onClick={handleNavClick}
          className={cn(
            "flex items-center overflow-hidden rounded-full border border-[rgba(142,182,155,0.2)] bg-[#0B2B26]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] h-12",
            !isExpanded && "cursor-pointer justify-center"
          )}
        >
          {/* Logo / Brand Icon */}
          <motion.div
            variants={logoVariants}
            className="flex-shrink-0 flex items-center font-serif-accent text-xl font-bold pl-4 pr-2 text-[#DAF1DE]"
          >
            <Navigation className="h-5 w-5 mr-1 text-[#8EB69B]" />
            <span>S</span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className={cn(
              "flex items-center gap-1 sm:gap-2 pr-2",
              !isExpanded && "pointer-events-none"
            )}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  variants={itemVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollTo(item.id);
                  }}
                  className={cn(
                    "text-xs font-medium transition-all duration-300 px-3 py-1.5 rounded-full cursor-pointer",
                    isActive
                      ? "bg-[#235347]/60 text-[#DAF1DE] shadow-[0_0_12px_rgba(142,182,155,0.25)]"
                      : "text-[#8EB69B] hover:text-[#DAF1DE] hover:bg-white/5"
                  )}
                >
                  {item.name}
                </motion.a>
              );
            })}

            {/* Hire Me CTA Button */}
            <motion.a
              variants={itemVariants}
              href="mailto:sukhithms25@gmail.com"
              onClick={(e) => e.stopPropagation()}
              className="ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full btn-primary text-white text-xs font-medium shrink-0"
            >
              <Mail size={12} />
              <span>Hire Me</span>
            </motion.a>
          </motion.div>

          {/* Collapsed Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              variants={collapsedIconVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <Menu className="h-5 w-5 text-[#DAF1DE]" />
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="fixed top-4 left-0 right-0 mx-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl glass-dark border border-[rgba(142,182,155,0.15)] shadow-lg">
          <span className="font-serif-accent text-lg font-semibold text-[#DAF1DE] flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#8EB69B]" />
            Sukhith M S
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#8EB69B] hover:text-[#DAF1DE] transition-colors p-1"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Overlay Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#051F20]/95 backdrop-blur-xl gap-6">
            {navItems.map(({ name, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "text-2xl font-serif-accent font-medium transition-colors",
                  activeSection === id ? "text-[#DAF1DE] font-semibold" : "text-[#8EB69B]"
                )}
              >
                {name}
              </button>
            ))}
            <a
              href="mailto:sukhithms25@gmail.com"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full btn-primary text-white text-base font-medium"
            >
              <Mail size={16} />
              Hire Me
            </a>
          </div>
        )}
      </div>
    </>
  );
}
