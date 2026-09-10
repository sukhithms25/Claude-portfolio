import React from 'react';
import { Mail, ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { focusConversationSection } from './ContactSection';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConversationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    focusConversationSection();
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
              Computer Science Engineer · MIT Mysore · Graduating 2027.
            </p>
            <button
              type="button"
              onClick={handleConversationClick}
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full btn-primary text-white text-sm font-medium cursor-pointer"
            >
              <Mail size={14} />
              Start a conversation
            </button>
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
                  className="nav-link text-slate-400 hover:text-white transition-colors text-sm text-left cursor-pointer"
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
                { label: 'Email', isConversation: true },
              ].map((item) => {
                if ('isConversation' in item && item.isConversation) {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={handleConversationClick}
                      className="nav-link text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 text-left cursor-pointer"
                    >
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-50" />
                    </button>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="nav-link text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                  >
                    {item.label}
                    <ArrowUpRight size={12} className="opacity-50" />
                  </a>
                );
              })}
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
            <a
              href="https://github.com/sukhithms25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-[#A8A29C] hover:text-[#F05A17] transition-colors"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/sukhith-m-s-324487382"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-[#A8A29C] hover:text-[#F05A17] transition-colors"
            >
              <LinkedinIcon size={16} />
            </a>
            <button
              type="button"
              onClick={handleConversationClick}
              aria-label="Start direct conversation"
              className="text-[#A8A29C] hover:text-[#F05A17] transition-colors cursor-pointer"
            >
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
