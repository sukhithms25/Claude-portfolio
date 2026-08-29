import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Cpu,
  Server,
  Workflow,
  CheckCircle2,
  ExternalLink,
  Mail,
  Download,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Button } from './Button';

// ─── Data Definitions ────────────────────────────────────────────────────────

const engineeringFocusPillars = [
  {
    number: '01',
    title: 'AI Systems & Runtimes',
    icon: Cpu,
    description:
      'Architecting event-driven execution kernels, local LLM inference pipelines, and persistent hybrid context stores.',
    keyTechnologies: ['Python', 'Local LLMs (Ollama/vLLM)', 'Event Bus', 'SQLite Context Store'],
  },
  {
    number: '02',
    title: 'Full-Stack & Production APIs',
    icon: Server,
    description:
      'Building asynchronous FastAPI backends, relational PostgreSQL schemas, JWT authentication middleware, and geospatial PostGIS queries.',
    keyTechnologies: ['FastAPI', 'PostgreSQL', 'PostGIS', 'JWT Auth', 'Docker'],
  },
  {
    number: '03',
    title: 'Developer Automation & Agents',
    icon: Workflow,
    description:
      'Developing AST-guided code parsers, autonomous GitHub issue-to-PR workflow engines, and Model Context Protocol (MCP) server integrations.',
    keyTechnologies: ['Multi-Agent Systems', 'MCP Protocol', 'AST Parsing', 'GitHub REST API'],
  },
];

const evidenceMapping = [
  {
    project: 'ULTRON',
    badge: 'FLAGSHIP AI OS',
    proof: 'Modular execution kernel, dependency injection, event telemetry bus, and local LLM runtime.',
    link: '#projects',
  },
  {
    project: 'GIT_AI',
    badge: 'AUTONOMOUS AGENT',
    proof: 'AST-guided codebase analysis, automated patch verification loop, and GitHub PR creation.',
    link: '#projects',
  },
  {
    project: 'CAPA',
    badge: 'MULTI-AGENT MCP',
    proof: '3 specialized AI agents synchronized across 3 MCP servers with shared SQLite memory.',
    link: '#projects',
  },
  {
    project: 'Krishi-Setu',
    badge: 'PRODUCTION BACKEND',
    proof: 'FastAPI geospatial radius queries, JWT authentication pipeline, and indexed PostgreSQL schema.',
    link: '#projects',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const AboutSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation(0.1);
  const { ref: bioRef, inView: bioInView } = useInViewAnimation(0.1);
  const { ref: focusRef, inView: focusInView } = useInViewAnimation(0.1);
  const { ref: evidenceRef, inView: evidenceInView } = useInViewAnimation(0.1);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#03070B]">
      {/* Background Glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F05A17 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-2 block text-[#F05A17]"
          >
            01 / ABOUT &amp; IDENTITY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Engineering Systems &amp; <span className="gradient-text">Architectural Focus</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A29C] mt-2 max-w-xl font-sans">
            Computer Science Engineer specializing in local AI runtimes, autonomous developer
            agents, and production backends.
          </p>
          <div className="section-divider mt-4 max-w-xs" />
        </div>

        {/* 1. Identity & Education Grid */}
        <div
          ref={bioRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 ${
            bioInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {/* Left: Engineering Identity (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl glass-dark border border-[#1D2125] p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#A8A29C] uppercase tracking-wider">
                  Engineering Positioning
                </span>
                <span className="text-[10px] font-mono text-[#A8A29C] flex items-center gap-1">
                  <MapPin size={12} className="text-[#F05A17]" /> Mysore, India
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#1D2125] shrink-0 shadow-lg shadow-black/50">
                  <img
                    src="/profile.png"
                    alt="Sukhith M S"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-accent font-bold text-[#E6E3DF]">
                    Sukhith M S
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#A8A29C] mt-0.5">
                    AI Systems &amp; Full-Stack Engineer
                  </p>
                  <a
                    href="/Sukhith_MS_Resume_Klanvision.pdf"
                    download
                    className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#101418] text-[#E6E3DF] border border-[#1D2125] hover:border-[#F05A17] hover:text-[#FFFFFF] transition-all duration-200"
                  >
                    <Download size={12} className="text-[#F05A17]" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans">
                Computer Science undergraduate at{' '}
                <strong className="text-[#E6E3DF] font-semibold">MIT Mysore</strong>, focused on
                systems engineering, artificial intelligence runtimes, and developer tooling.
              </p>

              <p className="text-xs sm:text-sm text-[#A8A29C] leading-relaxed mb-6 font-sans">
                Rather than building simple wrappers, I architect decoupled local AI systems with
                event-driven kernels, protocol-level Model Context Protocol (MCP) bridges, and
                production FastAPI backends optimized for reliability and data privacy.
              </p>
            </div>

            {/* Core Specs Strip */}
            <div className="pt-6 border-t border-[#1D2125] grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Degree</span>
                <span className="text-xs font-bold text-[#E6E3DF] font-mono">B.E. CSE</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Institution</span>
                <span className="text-xs font-bold text-[#E6E3DF] font-mono">MIT Mysore</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Graduation</span>
                <span className="text-xs font-bold text-[#E6E3DF] font-mono">2027 (Expected)</span>
              </div>
            </div>
          </div>

          {/* Right: Education & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <div className="rounded-2xl glass-dark border border-[#1D2125] p-6">
              <h4 className="text-sm font-mono font-bold text-[#E6E3DF] mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-[#F05A17]" />
                Academic Background
              </h4>

              <div className="space-y-4">
                {/* Degree 1 */}
                <div className="pl-4 border-l-2 border-[#F05A17] relative">
                  <div className="text-sm font-bold text-[#E6E3DF]">
                    B.E. Computer Science &amp; Engineering
                  </div>
                  <div className="text-xs font-mono text-[#A8A29C]">MIT Mysore</div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} /> 2023 – 2027
                    </span>
                    <span className="text-[#E6E3DF] font-semibold">CGPA: 7.75</span>
                  </div>
                </div>

                {/* Pre-University */}
                <div className="pl-4 border-l-2 border-[#1D2125] relative">
                  <div className="text-sm font-bold text-[#E6E3DF]">
                    Pre-University College (PCMB)
                  </div>
                  <div className="text-xs font-mono text-[#A8A29C]">STG PU College</div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} /> 2023
                    </span>
                    <span className="text-[#E6E3DF] font-semibold">93.16%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Engineering Focus Pillars (3 Cards) */}
        <div
          ref={focusRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${focusInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h3 className="text-xl sm:text-2xl font-serif-accent font-bold text-[#E6E3DF] mb-6">
            Core Engineering Pillars
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineeringFocusPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="rounded-2xl glass-dark border border-[#1D2125] hover:border-[#F05A17]/40 transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#F05A17]">
                        {pillar.number} / FOCUS
                      </span>
                      <IconComp size={18} className="text-[#E6E3DF]" />
                    </div>

                    <h4 className="text-lg font-serif-accent font-bold text-[#E6E3DF] mb-2">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-[#A8A29C] leading-relaxed font-sans mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Tech Tag Strip */}
                  <div className="pt-4 border-t border-[#1D2125] flex flex-wrap gap-1.5">
                    {pillar.keyTechnologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#101418] text-[#A8A29C] border border-[#1D2125]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Engineering Evidence Section */}
        <div
          ref={evidenceRef as React.RefObject<HTMLDivElement>}
          className={`rounded-2xl glass-dark border border-[#1D2125] p-6 sm:p-8 mb-16 ${
            evidenceInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif-accent font-bold text-[#E6E3DF]">
                Engineering Evidence &amp; Verification
              </h3>
              <p className="text-xs font-mono text-[#A8A29C] mt-1">
                Concrete source proof supporting technical positioning
              </p>
            </div>
            <Button
              variant="secondary"
              href="#projects"
              icon={<ExternalLink size={12} />}
              iconPosition="right"
              className="text-xs py-1.5 px-4"
            >
              Inspect Systems Showcase
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {evidenceMapping.map((item) => (
              <a
                key={item.project}
                href={item.link}
                className="group p-4 rounded-xl glass border border-[#1D2125] hover:border-[#F05A17]/50 transition-all duration-300 block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#E6E3DF] font-serif-accent group-hover:text-[#F05A17] transition-colors">
                    {item.project}
                  </span>
                  <span className="text-[9px] font-mono text-[#A8A29C] bg-[#101418] px-2 py-0.5 rounded border border-[#1D2125]">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-[#A8A29C] leading-snug font-sans">{item.proof}</p>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-[#F05A17] group-hover:underline">
                  <CheckCircle2 size={11} /> Verified Implementation
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 4. Supporting Links & Contact Path */}
        <div className="rounded-2xl glass-dark border border-[#1D2125] p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:sukhithms25@gmail.com"
              className="flex items-center gap-2 text-xs font-mono text-[#A8A29C] hover:text-[#E6E3DF] transition-colors"
            >
              <Mail size={14} className="text-[#F05A17]" />
              sukhithms25@gmail.com
            </a>
            <a
              href="https://github.com/sukhithms25"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#A8A29C] hover:text-[#E6E3DF] transition-colors"
            >
              <GithubIcon size={14} className="text-[#F05A17]" />
              github.com/sukhithms25
            </a>
            <a
              href="https://linkedin.com/in/sukhith-m-s-324487382"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#A8A29C] hover:text-[#E6E3DF] transition-colors"
            >
              <LinkedinIcon size={14} className="text-[#F05A17]" />
              linkedin.com/in/sukhith-m-s
            </a>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            Available for AI &amp; Software Engineering Roles
          </span>
        </div>
      </div>
    </section>
  );
};
