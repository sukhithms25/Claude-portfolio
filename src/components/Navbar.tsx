import React, { useState, useEffect } from 'react';
import { Mail, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section based on scroll
      const sections = navLinks.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop floating pill nav */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'glass'
        }`}
      >
        {/* Logo */}
        <span className="font-serif-accent text-xl font-semibold text-white mr-4 px-2">
          S
        </span>

        {/* Links */}
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === id
                ? 'shadow-[0_0_12px_rgba(142,182,155,0.2)]'
                : 'hover:bg-white/5'
            }`}
            style={{
              background: activeSection === id ? 'rgba(35,83,71,0.5)' : undefined,
              color: activeSection === id ? '#DAF1DE' : '#8EB69B',
            }}
          >
            {label}
          </button>
        ))}

        {/* CTA */}
        <a
          href="mailto:sukhithms25@gmail.com"
          className="ml-3 flex items-center gap-2 px-5 py-2 rounded-full btn-primary text-white text-sm font-medium"
        >
          <Mail size={13} />
          Hire Me
        </a>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <div className={`fixed top-4 left-0 right-0 mx-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass-dark shadow-lg' : 'glass'
        }`}>
          <span className="font-serif-accent text-lg font-semibold text-white">Sukhith M S</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark/95 backdrop-blur-xl gap-6">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-2xl font-medium text-slate-300 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
            <a
              href="mailto:sukhithms25@gmail.com"
              className="mt-4 flex items-center gap-2 px-8 py-4 rounded-full btn-primary text-white font-medium"
            >
              <Mail size={16} />
              Hire Me
            </a>
          </div>
        )}
      </div>
    </>
  );
};
