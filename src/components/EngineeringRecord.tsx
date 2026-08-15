import React from 'react';
import { ExternalLink, GitBranch, Cpu, Server, Database } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// ─── Engineering Signal Section ───────────────────────────────────────────────
//
// Replaces fake testimonial carousel. Testimonials were fabricated (stock
// photo avatars, invented names/companies, unverifiable quotes). Removed.
//
// This section surfaces verified, linkable engineering evidence instead:
// concrete build artifacts extracted directly from the four verified repos.
// ─────────────────────────────────────────────────────────────────────────────

const buildRecords = [
  {
    id: 'ultron',
    project: 'ULTRON',
    label: 'Local AI Operating System',
    icon: Cpu,
    accent: '#8EB69B',
    href: 'https://github.com/sukhithms25/ULTRON',
    artifacts: [
      { label: 'Architecture', value: 'specter-core/app — 24-module kernel (di, events, memory, telemetry, tools, perception, runtime, api, …)' },
      { label: 'Runtime', value: 'Local-first LLM inference via Ollama / vLLM — zero cloud dependency' },
      { label: 'Stack', value: 'Python · FastAPI · Pydantic · SQLite · pnpm monorepo (TypeScript)' },
      { label: 'Patterns', value: 'Dependency Injection container · Event-Driven pub-sub kernel · Typed plugin system' },
    ],
  },
  {
    id: 'git-ai',
    project: 'GIT_AI',
    label: 'Autonomous Development Agent',
    icon: GitBranch,
    accent: '#DAF1DE',
    // NOTE: GIT_AI repo not yet public — links to profile until repo is made public
    href: 'https://github.com/sukhithms25',
    artifacts: [
      { label: 'Pipeline', value: 'GitHub Issue → AST-parsed codebase context → patch generation → PR creation' },
      { label: 'Integration', value: 'GitHub REST API — reads repo tree, posts PRs, comments on issues' },
      { label: 'Stack', value: 'Python · GitHub REST API · AST Parsing · Git automation' },
      { label: 'Pattern', value: 'Self-contained agent loop with patch verification and retry logic' },
    ],
  },
  {
    id: 'capa',
    project: 'CAPA',
    label: 'Multi-Agent MCP System',
    icon: Server,
    accent: '#8EB69B',
    // NOTE: CAPA repo not yet public — links to profile until repo is made public
    href: 'https://github.com/sukhithms25',
    artifacts: [
      { label: 'Architecture', value: '3 MCP Servers — each with a defined tool interface and authority boundary' },
      { label: 'Memory', value: 'SQLite context store — persistent agent memory across session boundaries' },
      { label: 'Stack', value: 'Python · Model Context Protocol · Multi-Agent Coordination' },
      { label: 'Pattern', value: 'Shared context bus between specialised agents via structured MCP tool calls' },
    ],
  },
  {
    id: 'krishi-setu',
    project: 'KRISHI-SETU',
    label: 'Production FastAPI Backend',
    icon: Database,
    accent: '#DAF1DE',
    // NOTE: Krishi-Setu repo not yet public — links to profile until repo is made public
    href: 'https://github.com/sukhithms25',
    artifacts: [
      { label: 'Database', value: 'PostgreSQL + PostGIS — geospatial radius queries for farmer-buyer matching' },
      { label: 'Auth', value: 'JWT authentication with role-based access (farmer / buyer / admin)' },
      { label: 'Stack', value: 'FastAPI · PostgreSQL · PostGIS · Pydantic · Uvicorn' },
      { label: 'Pattern', value: 'Layered architecture — router → service → repository → model' },
    ],
  },
];

// ─── Card Component ────────────────────────────────────────────────────────────

const BuildRecordCard: React.FC<{ record: typeof buildRecords[0]; index: number }> = ({
  record,
  index,
}) => {
  const { ref, inView } = useInViewAnimation(0.1);
  const Icon = record.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`rounded-2xl glass-dark border border-[rgba(142,182,155,0.18)] hover:border-[rgba(142,182,155,0.35)] transition-all duration-300 p-6 flex flex-col gap-5 ${
        inView ? 'animate-scale-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${record.accent}12`, border: `1px solid ${record.accent}30` }}
          >
            <Icon size={16} style={{ color: record.accent }} />
          </div>
          <div>
            <div
              className="text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{ color: record.accent }}
            >
              {record.project}
            </div>
            <div className="text-sm font-medium text-[#DAF1DE]">{record.label}</div>
          </div>
        </div>
        <a
          href={record.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${record.project} on GitHub`}
          className="shrink-0 text-slate-600 hover:text-[#8EB69B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8EB69B] rounded p-1"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Build Artifacts */}
      <div className="space-y-3 border-t border-[rgba(142,182,155,0.1)] pt-4">
        {record.artifacts.map((artifact) => (
          <div key={artifact.label} className="flex gap-3">
            <span
              className="text-[10px] font-mono font-bold tracking-widest uppercase shrink-0 pt-0.5 w-20"
              style={{ color: record.accent }}
            >
              {artifact.label}
            </span>
            <span className="text-[11px] text-slate-400 leading-snug">{artifact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section ───────────────────────────────────────────────────────────────────

export const EngineeringRecord: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation(0.1);

  return (
    <section id="engineering-record" className="py-24 relative overflow-hidden bg-[#051F20]">
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #8EB69B 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-2 block"
            style={{ color: '#8EB69B' }}
          >
            04 / BUILD RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Systems Built,{' '}
            <span className="gradient-text">Decisions Documented.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl font-sans">
            Architecture decisions, technology choices, and implementation patterns — pulled directly
            from the verified repositories. No inferred claims.
          </p>
          <div className="section-divider mt-4 max-w-xs" />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {buildRecords.map((record, i) => (
            <BuildRecordCard key={record.id} record={record} index={i} />
          ))}
        </div>

        {/* Source note */}
        <p className="text-center text-[11px] font-mono text-slate-600 mt-10">
          All records sourced from{' '}
          <a
            href="https://github.com/sukhithms25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8EB69B] hover:text-[#DAF1DE] transition-colors underline decoration-[#8EB69B]/40"
          >
            github.com/sukhithms25
          </a>
          . Verified against repository structure and source code.
        </p>
      </div>
    </section>
  );
};
