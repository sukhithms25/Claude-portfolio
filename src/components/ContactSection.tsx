import React from 'react';
import { Mail, ArrowRight, MapPin, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// ─── Data ─────────────────────────────────────────────────────────────────────
// All links verified against existing profiles / project repositories.
// Phone number intentionally omitted (removed from all rebuilt sections).
// Resume link omitted — no PDF asset exists in /public. Replace this
// placeholder text with a real href once the asset is uploaded.
// ─────────────────────────────────────────────────────────────────────────────

const RESUME_EXISTS = false; // set to true and update RESUME_HREF once PDF is uploaded
const RESUME_HREF = '/resume.pdf'; // update path when asset is available

const contactLinks = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    display: 'sukhithms25@gmail.com',
    href: 'mailto:sukhithms25@gmail.com',
    accent: '#8EB69B',
    primary: true,
    description: 'Fastest response',
  },
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    label: 'LinkedIn',
    display: 'linkedin.com/in/sukhith-m-s',
    href: 'https://linkedin.com/in/sukhith-m-s-324487382',
    accent: '#DAF1DE',
    primary: false,
    description: 'Professional profile',
  },
  {
    id: 'github',
    icon: GithubIcon,
    label: 'GitHub',
    display: 'github.com/sukhithms25',
    href: 'https://github.com/sukhithms25',
    accent: '#8EB69B',
    primary: false,
    description: 'Source & repositories',
  },
];

const roles = [
  'AI Systems Engineering',
  'Full-Stack Development',
  'Developer Automation',
  'Backend / API Engineering',
];

// ─── Components ───────────────────────────────────────────────────────────────

const ContactLinkCard: React.FC<{
  item: typeof contactLinks[0];
  index: number;
}> = ({ item, index }) => {
  const { ref, inView } = useInViewAnimation(0.1);
  const Icon = item.icon;

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={item.href}
      target={item.id !== 'email' ? '_blank' : undefined}
      rel={item.id !== 'email' ? 'noopener noreferrer' : undefined}
      aria-label={`${item.label}: ${item.display}`}
      className={`group flex items-center gap-4 rounded-2xl glass-dark border transition-all duration-300 p-5
        ${item.primary
          ? 'border-[rgba(142,182,155,0.4)] hover:border-[#8EB69B]'
          : 'border-[rgba(142,182,155,0.18)] hover:border-[rgba(142,182,155,0.4)]'
        }
        ${inView ? 'animate-fade-in-up' : 'opacity-0'}
      `}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: `${item.accent}12`,
          border: `1px solid ${item.accent}30`,
        }}
      >
        <Icon size={18} style={{ color: item.accent }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
          style={{ color: item.accent }}
        >
          {item.label}
        </div>
        <div className="text-sm font-medium text-[#DAF1DE] truncate group-hover:text-white transition-colors">
          {item.display}
        </div>
        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.description}</div>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={14}
        className="shrink-0 text-slate-600 group-hover:text-[#8EB69B] group-hover:translate-x-0.5 transition-all duration-200"
      />
    </a>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const ContactSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInViewAnimation(0.1);
  const { ref: linksRef, inView: linksInView } = useInViewAnimation(0.1);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#051F20]">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse at center, #8EB69B 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-2 block"
            style={{ color: '#8EB69B' }}
          >
            05 / CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Let's build something{' '}
            <span className="gradient-text">worth engineering.</span>
          </h2>
          <div className="section-divider mt-4 max-w-xs" />
        </div>

        {/* Two-column layout: CTA left, links right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Positioning + Primary CTA */}
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-5 ${ctaInView ? 'animate-fade-in-left' : 'opacity-0'}`}
          >
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-8 max-w-md">
              Computer Science Engineer at MIT Mysore, graduating 2027. Available for internships
              and roles in AI systems, full-stack development, and developer automation.
            </p>

            {/* Roles */}
            <div className="space-y-2 mb-10">
              {roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-2.5 text-xs font-mono text-slate-400"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8EB69B] shrink-0" />
                  {role}
                </div>
              ))}
            </div>

            {/* Primary Email CTA */}
            <a
              href="mailto:sukhithms25@gmail.com"
              aria-label="Send email to sukhithms25@gmail.com"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm text-[#051F20] bg-[#8EB69B] hover:bg-[#DAF1DE] transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#8EB69B] focus:ring-offset-2 focus:ring-offset-[#051F20]"
            >
              <Mail size={15} />
              Email Me
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </a>

            {/* Resume */}
            <div className="mt-5">
              {RESUME_EXISTS ? (
                <a
                  href={RESUME_HREF}
                  download
                  aria-label="Download technical resume PDF"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-mono font-medium border border-[rgba(142,182,155,0.3)] text-[#8EB69B] hover:border-[#8EB69B] hover:text-[#DAF1DE] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8EB69B] focus:ring-offset-2 focus:ring-offset-[#051F20]"
                >
                  <Download size={13} />
                  Download Resume
                </a>
              ) : (
                <p className="text-[11px] font-mono text-slate-600">
                  Resume available on request via email.
                </p>
              )}
            </div>

            {/* Location */}
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-500">
              <MapPin size={12} className="text-[#8EB69B]" />
              Mysore, India · IST (UTC +5:30)
            </div>
          </div>

          {/* Right: Contact links */}
          <div
            ref={linksRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-7 space-y-4 ${linksInView ? 'animate-fade-in-right' : 'opacity-0'}`}
          >
            {contactLinks.map((item, i) => (
              <ContactLinkCard key={item.id} item={item} index={i} />
            ))}

            {/* Engineering evidence footer */}
            <div className="mt-6 rounded-2xl glass-dark border border-[rgba(142,182,155,0.15)] p-5">
              <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
                <span className="text-[#8EB69B] font-bold">SYSTEMS ON RECORD —</span>{' '}
                ULTRON (Local AI OS) · GIT_AI (Autonomous Dev Agent) · CAPA (Multi-Agent MCP System) ·
                Krishi-Setu (Production FastAPI Backend).{' '}
                <a
                  href="#projects"
                  className="text-[#8EB69B] hover:text-[#DAF1DE] transition-colors underline decoration-[#8EB69B]/40 focus:outline-none focus:ring-1 focus:ring-[#8EB69B] rounded"
                >
                  View Engineering Showcase →
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer rule */}
        <div className="mt-20 pt-8 border-t border-[rgba(142,182,155,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-slate-600">
            © 2026 Sukhith M S. Built with React + Vite + TypeScript.
          </span>
          <span className="text-[11px] font-mono text-slate-600">
            B.E. Computer Science &amp; Engineering · MIT Mysore · 2027
          </span>
        </div>
      </div>
    </section>
  );
};
