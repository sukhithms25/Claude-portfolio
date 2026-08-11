import React from 'react';
import { Cpu, Server, Database, Globe, GitBranch, Code2 } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// ─── Data Definitions ────────────────────────────────────────────────────────
//
// AUDIT NOTE: Every technology listed here is verified against the following
// project implementations:
//   • ULTRON       — specter-core (Python, FastAPI, Pydantic, SQLite, Docker, MCP,
//                    Event-Driven Kernel, DI Container, Local LLMs)
//   • GIT_AI       — Autonomous agent (Python, GitHub REST API, AST Parsing, Git)
//   • CAPA         — Multi-agent system (Python, MCP, SQLite, Multi-Agent Arch.)
//   • Krishi-Setu  — Production API (FastAPI, PostgreSQL, PostGIS, JWT, Pydantic)
//   • Portfolio    — This site (TypeScript, React, Vite, CSS)
//
// Removed: PHP, C, Java, MySQL, MongoDB (no evidence in verified project set)
// Removed: Agile/CI-CD/Microservices buzzwords (no source proof)
// Removed: Fake proficiency percentages (subjective, undefendable)
// ─────────────────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    id: 'ai-agents',
    label: '01 / AI & AGENT SYSTEMS',
    icon: Cpu,
    accentColor: '#8EB69B',
    description: 'Applied in ULTRON (local LLM kernel), GIT_AI (agent pipeline), and CAPA (multi-agent MCP system).',
    skills: [
      'Python',
      'Local LLMs (Ollama / vLLM)',
      'Multi-Agent Architecture',
      'Model Context Protocol (MCP)',
      'Event-Driven Kernel',
      'Dependency Injection',
      'Pydantic',
      'AST Parsing',
    ],
  },
  {
    id: 'backend-apis',
    label: '02 / BACKEND & APIs',
    icon: Server,
    accentColor: '#DAF1DE',
    description: 'Applied in Krishi-Setu (FastAPI production backend) and ULTRON (specter-core FastAPI kernel).',
    skills: [
      'FastAPI',
      'REST API Design',
      'JWT Authentication',
      'Async Programming',
      'OpenAPI / Swagger Docs',
      'GitHub REST API',
      'Uvicorn',
    ],
  },
  {
    id: 'databases',
    label: '03 / DATABASES & STORAGE',
    icon: Database,
    accentColor: '#8EB69B',
    description: 'Applied in Krishi-Setu (PostgreSQL + PostGIS), ULTRON memory engine (SQLite), and CAPA (SQLite context store).',
    skills: [
      'PostgreSQL',
      'SQLite',
      'PostGIS (Geospatial)',
      'SQL Schema Design',
      'Index Optimization',
      'Session Context Store',
    ],
  },
  {
    id: 'frontend',
    label: '04 / FRONTEND',
    icon: Globe,
    accentColor: '#DAF1DE',
    description: 'Applied in this portfolio (TypeScript + React + Vite) and specter-dashboard (ULTRON workspace UI).',
    skills: [
      'TypeScript',
      'React',
      'Vite',
      'JavaScript',
      'HTML5 / CSS3',
    ],
  },
  {
    id: 'devops-infra',
    label: '05 / DEVOPS & INFRASTRUCTURE',
    icon: GitBranch,
    accentColor: '#8EB69B',
    description: 'Applied in ULTRON (Docker containerization, specter-core/docker directory) and GIT_AI (Git automation pipeline).',
    skills: [
      'Docker',
      'Git',
      'GitHub',
      'pnpm Workspaces',
      'Environment Configuration',
    ],
  },
  {
    id: 'engineering-concepts',
    label: '06 / ENGINEERING CONCEPTS',
    icon: Code2,
    accentColor: '#DAF1DE',
    description: 'Architectural patterns and protocols implemented directly in the verified project set.',
    skills: [
      'Event-Driven Architecture',
      'Pub-Sub Pattern',
      'Dependency Injection',
      'Geospatial Radius Queries',
      'Local-First Inference',
      'Autonomous Agent Pipelines',
      'Context Window Management',
      'Patch Verification Loops',
    ],
  },
];

// ─── Individual Group Card ────────────────────────────────────────────────────

const SkillGroupCard: React.FC<{ group: typeof skillGroups[0]; index: number }> = ({
  group,
  index,
}) => {
  const { ref, inView } = useInViewAnimation(0.1);
  const IconComp = group.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`rounded-2xl glass-dark border border-[rgba(142,182,155,0.18)] hover:border-[rgba(142,182,155,0.35)] transition-all duration-300 p-6 flex flex-col gap-4 ${
        inView ? 'animate-scale-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-mono font-bold tracking-widest uppercase"
          style={{ color: group.accentColor }}
        >
          {group.label}
        </span>
        <IconComp size={16} style={{ color: group.accentColor }} className="shrink-0 opacity-70" />
      </div>

      {/* Evidence Footnote */}
      <p className="text-[11px] text-slate-500 leading-snug font-mono border-l-2 border-[rgba(142,182,155,0.2)] pl-3">
        {group.description}
      </p>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-[#163832]/70 text-[#DAF1DE] border border-[rgba(142,182,155,0.2)] hover:border-[rgba(142,182,155,0.5)] transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const SkillsSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation(0.1);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#051F20]">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #235347 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-2 block"
            style={{ color: '#8EB69B' }}
          >
            03 / ENGINEERING STACK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Technology Used to <span className="gradient-text">Build Systems</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl font-sans">
            Every technology below is verified against a specific implementation in the{' '}
            <a href="#projects" className="underline decoration-[#8EB69B]/50 hover:text-[#DAF1DE] transition-colors">
              projects section
            </a>
            . No skill dumping.
          </p>
          <div className="section-divider mt-4 max-w-xs" />
        </div>

        {/* Skills Grid — 2 columns on md+, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Bottom disclaimer */}
        <p className="text-center text-[11px] font-mono text-slate-600 mt-10">
          Proficiency percentages removed — evidence is in the{' '}
          <a href="#projects" className="text-[#8EB69B] hover:text-[#DAF1DE] transition-colors underline decoration-[#8EB69B]/40">
            Engineering Showcase
          </a>
          .
        </p>
      </div>
    </section>
  );
};
