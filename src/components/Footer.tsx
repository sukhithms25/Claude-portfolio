import React from 'react';
import { Mail, ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Divider line */}
      <div className="section-divider mb-16" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Left: CTA */}
          <div>
            <div className="font-serif-accent text-3xl md:text-4xl font-semibold text-white mb-3 tracking-tight">
              <span className="gradient-text">Sukhith M S</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Full-Stack Developer & AI Systems Builder based in India.
              Open to exciting opportunities.
            </p>
            <a
              href="mailto:sukhithms25@gmail.com"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full btn-primary text-white text-sm font-medium"
            >
              <Mail size={14} />
              Start a conversation
            </a>
          </div>

          {/* Right: Links */}
          <div className="flex items-start gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-1">Navigate</span>
              {[
                { label: 'About', id: 'about' },
                { label: 'Projects', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="nav-link text-slate-400 hover:text-white transition-colors text-sm text-left"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-1">Connect</span>
              {[
                { label: 'GitHub', href: 'https://github.com/sukhithms25' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/sukhith-m-s-324487382' },
                { label: 'Email', href: 'mailto:sukhithms25@gmail.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  {label}
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-sm text-slate-500 flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> by Sukhith M S
          </span>
          <span className="text-sm text-slate-600">Mysore, India · 2026</span>
          <div className="flex items-center gap-4">
            {[
              { Icon: GithubIcon, href: 'https://github.com/sukhithms25' },
              { Icon: LinkedinIcon, href: 'https://linkedin.com/in/sukhith-m-s-324487382' },
              { Icon: Mail, href: 'mailto:sukhithms25@gmail.com' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-sky-400 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
