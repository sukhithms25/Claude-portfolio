import React, { useState } from 'react';
import {
  Zap,
  Globe,
  Database,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Server,
  Workflow,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { GithubIcon } from './icons';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Button } from './Button';
import { isPostHogConfigured, posthog } from '../lib/posthog';

// ─── Data Definitions ────────────────────────────────────────────────────────

const ultronData = {
  id: 'ultron',
  badge: 'FLAGSHIP AI SYSTEM',
  name: 'ULTRON',
  tagline: 'Modular AI Operating System & Custom Local LLM Runtime',
  problem:
    'Standard LLM wrappers lack custom runtimes, dependency injection, real-time telemetry, and structured memory required for production-grade agentic reliability.',
  solution:
    'Architected an event-driven local AI operating system with decoupled dependency injection, persistent session memory, dynamic tool routing, and local-first offline LLM inference.',
  architecture: [
    {
      layer: '01 / CORE RUNTIME',
      title: 'Event-Driven Kernel',
      description: 'Custom dependency injection container and async event bus with real-time execution telemetry.',
      icon: Cpu,
    },
    {
      layer: '02 / MEMORY ENGINE',
      title: 'Hybrid Context Store',
      description: 'SQLite-backed vector & structured session memory with LRU context caching.',
      icon: Database,
    },
    {
      layer: '03 / TOOL ORCHESTRATOR',
      title: 'MCP Server Bridge',
      description: 'Protocol-level integration for dynamic tool discovery, sandbox execution, and state handoffs.',
      icon: Workflow,
    },
    {
      layer: '04 / INFERENCE LAYER',
      title: 'Local LLM Execution',
      description: 'Zero-cloud-cost inference pipeline via Ollama/vLLM with fallback error handling.',
      icon: Server,
    },
  ],
  decisions: [
    {
      title: 'Decoupled Event Telemetry Bus',
      rationale:
        'Separates LLM token streaming and agent state tracking from core execution loops, enabling zero-impact logging.',
    },
    {
      title: 'Local-First Offline Inference',
      rationale:
        'Eliminates external API token costs and third-party cloud data transmission while guaranteeing strict data privacy.',
    },
    {
      title: 'Protocol-Level MCP Tool Integration',
      rationale:
        'Standardizes tool interface contracts, allowing subagents to dynamically invoke microservices without custom SDK glue.',
    },
  ],
  outcomes: [
    { metric: 'Zero Cloud Dependency', label: '100% Local Execution' },
    { metric: '4 Modular Layers', label: 'Decoupled Architecture' },
    { metric: 'Persistent Memory', label: 'Cross-Session Context' },
  ],
  tech: ['Python', 'FastAPI', 'Local LLM', 'SQLite', 'MCP', 'Docker', 'Event-Driven'],
  github: 'https://github.com/sukhithms25/ULTRON',
};

const secondaryProjects = [
  {
    id: 'git-ai',
    badge: 'AUTONOMOUS AGENT',
    name: 'GIT_AI',
    tagline: 'Autonomous Issue-to-PR Developer Agent',
    problem:
      'Manual issue triaging, codebase context gathering, patch drafting, and PR creation consume significant developer bandwidth.',
    systemBuilt:
      'Built an autonomous developer agent that ingests GitHub issues, parses repository AST context, synthesizes targeted diff patches, and submits pull requests via REST API.',
    highlights: [
      'AST-guided code analysis to scope context windows to relevant modules.',
      'Automated verification loop validating patch syntax prior to PR creation.',
      'Multi-step GitHub API workflow orchestration with fallback handling.',
    ],
    outcomes: ['Autonomous PR Creation', 'AST Context Reduction', 'GitHub REST API Integration'],
    tech: ['Python', 'GitHub REST API', 'LLM Runtimes', 'AST Parsing', 'Git Automation'],
    icon: Zap,
    github: 'https://github.com/sukhithms25',
    accentColor: '#F05A17',
  },
  {
    id: 'capa',
    badge: 'MULTI-AGENT ARCHITECTURE',
    name: 'CAPA',
    tagline: 'Multi-Agent System with Shared MCP Context',
    problem:
      'Isolated AI productivity tools lack cross-agent context sharing, creating fragmented task execution across domain tools.',
    systemBuilt:
      'Developed a multi-agent productivity suite coordinating 3 specialized AI agents across 3 Model Context Protocol (MCP) servers with unified SQLite context memory.',
    highlights: [
      'Cross-agent state synchronization via standardized MCP transport protocol.',
      'Centralized SQLite memory engine for thread & session context retrieval.',
      'Specialized agent roles: Task Planner, Code Analyzer, Knowledge Indexer.',
    ],
    outcomes: ['3 MCP Servers Built', 'Unified SQLite Memory', 'Cross-Domain Agent Sync'],
    tech: ['Python', 'Multi-Agent Architecture', 'MCP Servers', 'SQLite', 'Context Management'],
    icon: Globe,
    github: 'https://github.com/sukhithms25',
    accentColor: '#E6E3DF',
  },
  {
    id: 'krishi-setu',
    badge: 'PRODUCTION BACKEND',
    name: 'Krishi-Setu',
    tagline: 'Geospatial Harvest Discovery & Authentication API',
    problem:
      'Agricultural producers lack direct, location-aware digital marketplaces to connect harvest yields with regional commercial buyers.',
    systemBuilt:
      'Architected a production FastAPI backend featuring PostGIS geospatial radius queries, JWT authentication, PostgreSQL data modeling, and OpenAPI docs.',
    highlights: [
      'Geospatial Haversine & PostGIS radius queries for buyer-farmer matching.',
      'Secure JWT authentication pipeline with access token rotation.',
      'Relational PostgreSQL schema with index optimization for low-latency queries.',
    ],
    outcomes: ['Geospatial Radius Queries', 'JWT Auth Pipeline', 'PostgreSQL Schema'],
    tech: ['FastAPI', 'PostgreSQL', 'JWT Auth', 'Python', 'Geospatial PostGIS', 'REST APIs'],
    icon: Database,
    github: 'https://github.com/sukhithms25',
    accentColor: '#F05A17',
  },
];

// ─── Component: Flagship Ultron Card ─────────────────────────────────────────

const UltronCard: React.FC = () => {
  const { ref, inView } = useInViewAnimation(0.1);
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative rounded-3xl glass-dark border border-[#1D2125] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 mb-16 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      {/* Top Banner & Flagship Indicator */}
      <div className="bg-[#0B0F13] px-6 py-4 border-b border-[#1D2125] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#F05A17] animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#E6E3DF]">
            {ultronData.badge}
          </span>
        </div>
        <span className="font-mono text-xs text-[#A8A29C] bg-[#101418] px-3 py-1 rounded-full border border-[#1D2125]">
          01 / FLAGSHIP ARCHITECTURE
        </span>
      </div>

      {/* Main Grid: Architecture & Summary */}
      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Info & Proofs) - 7 cols */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-bold text-[#E6E3DF] mb-2 tracking-tight">
              {ultronData.name}
            </h3>
            <p className="font-mono text-sm sm:text-base text-[#A8A29C] mb-6 font-medium">
              {ultronData.tagline}
            </p>

            {/* Problem & Solution Blocks */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl glass border border-[#1D2125]">
                <span className="text-xs font-mono text-[#A8A29C] font-semibold block mb-1 uppercase tracking-wider">
                  The Engineering Problem
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ultronData.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl glass border border-[#1D2125] bg-[#101418]">
                <span className="text-xs font-mono text-[#F05A17] font-semibold block mb-1 uppercase tracking-wider">
                  The System Solution
                </span>
                <p className="text-xs sm:text-sm text-[#E6E3DF] leading-relaxed">
                  {ultronData.solution}
                </p>
              </div>
            </div>

            {/* Scale & Outcome Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {ultronData.outcomes.map((o) => (
                <div
                  key={o.metric}
                  className="p-3 rounded-xl glass text-center border border-[#1D2125]"
                >
                  <div className="text-xs sm:text-sm font-bold text-[#E6E3DF] font-mono">
                    {o.metric}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#A8A29C] font-sans mt-0.5">
                    {o.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Tag Strip */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {ultronData.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#101418] text-[#A8A29C] border border-[#1D2125]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              href={ultronData.github}
              onClick={() => {
                if (isPostHogConfigured) {
                  posthog.capture('project_repository_opened', { project_id: ultronData.id });
                }
              }}
              icon={<GithubIcon size={14} />}
              iconPosition="left"
              className="text-xs"
            >
              View Repository Code
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                const expanded = !showArchitecture;
                if (isPostHogConfigured) {
                  posthog.capture('project_architecture_toggled', { expanded });
                }
                setShowArchitecture(expanded);
              }}
              icon={showArchitecture ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              iconPosition="right"
              className="text-xs"
            >
              {showArchitecture ? 'Hide Architecture Blueprint' : 'Inspect Architecture Blueprint'}
            </Button>
          </div>
        </div>

        {/* Right Column: Architecture Diagram — 5 cols */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative h-full min-h-[260px] lg:min-h-[360px] rounded-2xl overflow-hidden glass border border-[#1D2125]">
            {/* Inline architecture visualization */}
            <div className="w-full h-full flex flex-col justify-center gap-3 p-6">
              <p className="text-[10px] font-mono text-[#F05A17] uppercase tracking-widest mb-1">System Architecture</p>
              {[
                { layer: '01', label: 'Core Runtime', detail: 'DI Container · Event Bus · Telemetry', color: '#F05A17' },
                { layer: '02', label: 'Memory Engine', detail: 'SQLite · LRU Cache · Session Store', color: '#E6E3DF' },
                { layer: '03', label: 'Tool Orchestrator', detail: 'MCP Bridge · Tool Discovery · Sandbox', color: '#F05A17' },
                { layer: '04', label: 'API Gateway', detail: 'FastAPI · WebSocket · REST Endpoints', color: '#E6E3DF' },
              ].map((item) => (
                <div key={item.layer} className="flex items-center gap-3">
                  <span className="text-[9px] font-mono shrink-0 w-5" style={{ color: item.color }}>{item.layer}</span>
                  <div className="flex-1 rounded-lg px-3 py-2 border text-left bg-[#101418] border-[#1D2125]">
                    <div className="text-[11px] font-mono font-bold" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[10px] text-[#A8A29C] mt-0.5">{item.detail}</div>
                  </div>
                </div>
              ))}
              <p className="text-[9px] font-mono text-slate-500 mt-2">24-module kernel · Local-first inference · Zero cloud dependency</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070B]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Expandable System Architecture Drawer */}
      {showArchitecture && (
        <div className="p-6 md:p-10 bg-[#03070B] border-t border-[#1D2125] animate-fade-in">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-lg font-mono font-bold text-[#E6E3DF] flex items-center gap-2">
              <Code2 size={18} className="text-[#F05A17]" />
              ULTRON Technical System Blueprint
            </h4>
            <span className="text-xs font-mono text-[#A8A29C]">
              Architectural Rationale &amp; Layers
            </span>
          </div>

          {/* 4 Layers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {ultronData.architecture.map((arch) => {
              const IconComp = arch.icon;
              return (
                <div
                  key={arch.layer}
                  className="p-4 rounded-xl glass border border-[#1D2125] hover:border-[#F05A17]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-[#F05A17]">{arch.layer}</span>
                    <IconComp size={16} className="text-[#E6E3DF]" />
                  </div>
                  <h5 className="text-sm font-bold text-[#E6E3DF] mb-1 font-sans">{arch.title}</h5>
                  <p className="text-xs text-[#A8A29C] leading-relaxed font-sans">{arch.description}</p>
                </div>
              );
            })}
          </div>

          {/* Architectural Decisions & Tradeoffs */}
          <div className="p-5 rounded-2xl glass border border-[#1D2125]">
            <h5 className="text-xs font-mono font-bold text-[#F05A17] uppercase tracking-wider mb-3">
              Key Engineering Decisions &amp; Tradeoffs
            </h5>
            <div className="space-y-3">
              {ultronData.decisions.map((d) => (
                <div key={d.title} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={14} className="text-[#F05A17] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#E6E3DF] font-mono mr-2">{d.title}:</span>
                    <span className="text-[#A8A29C] font-sans">{d.rationale}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Component: Secondary Project Card ───────────────────────────────────────

const SecondaryCard: React.FC<{ project: typeof secondaryProjects[0]; index: number }> = ({
  project,
  index,
}) => {
  const { ref, inView } = useInViewAnimation(0.1);
  const IconComponent = project.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`rounded-2xl glass-dark border border-[#1D2125] hover:border-[#F05A17]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div>
        {/* Header Strip */}
        <div className="p-5 border-b border-[#1D2125] flex items-center justify-between bg-[#0B0F13]">
          <div className="flex items-center gap-2">
            <IconComponent size={16} style={{ color: project.accentColor }} />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#A8A29C]">
              {project.badge}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">0{index + 2} / SYSTEM</span>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <h3
            className="text-2xl font-serif-accent font-bold mb-1"
            style={{ color: project.accentColor }}
          >
            {project.name}
          </h3>
          <p className="text-xs font-mono text-[#A8A29C] mb-4">{project.tagline}</p>

          {/* Problem Block */}
          <div className="mb-4 p-3 rounded-lg glass border border-[#1D2125]">
            <span className="text-[10px] font-mono text-[#A8A29C] font-semibold block mb-1 uppercase">
              Problem
            </span>
            <p className="text-xs text-slate-300 leading-snug">{project.problem}</p>
          </div>

          {/* System Built Block */}
          <div className="mb-4 p-3 rounded-lg glass border border-[#1D2125] bg-[#101418]">
            <span className="text-[10px] font-mono text-[#F05A17] font-semibold block mb-1 uppercase">
              System Built
            </span>
            <p className="text-xs text-[#E6E3DF] leading-snug">{project.systemBuilt}</p>
          </div>

          {/* Key Technical Highlights */}
          <div className="mb-5 space-y-1.5">
            <span className="text-[10px] font-mono text-[#A8A29C] font-semibold block uppercase tracking-wider">
              Technical Highlights
            </span>
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <ShieldCheck size={12} className="text-[#F05A17] shrink-0 mt-0.5" />
                <span className="text-[#A8A29C]">{h}</span>
              </div>
            ))}
          </div>

          {/* Outcomes */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.outcomes.map((o) => (
              <span
                key={o}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#101418] text-[#E6E3DF] border border-[#1D2125]"
              >
                ✓ {o}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Tech Stack & Actions */}
      <div className="p-5 border-t border-[#1D2125] bg-[#0B0F13] flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-mono text-[#A8A29C]">
              {t} •
            </span>
          ))}
          <span className="text-[10px] font-mono text-[#F05A17]">+{project.tech.length - 3}</span>
        </div>

        <Button
          variant="secondary"
          href={project.github}
          onClick={() => {
            if (isPostHogConfigured) {
              posthog.capture('project_repository_opened', { project_id: project.id });
            }
          }}
          icon={<GithubIcon size={12} />}
          iconPosition="left"
          className="text-xs py-1 px-3"
        >
          Code
        </Button>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const ProjectsSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation(0.1);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#03070B]">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F05A17 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-12 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-2 block text-[#F05A17]"
          >
            02 / ENGINEERING SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Systems &amp; Flagship <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A29C] mt-2 max-w-xl font-sans">
            Architecture-first systems built with autonomous AI agents, local runtimes, and
            production backends.
          </p>
          <div className="section-divider mt-4 max-w-xs" />
        </div>

        {/* 1. Flagship Ultron Card */}
        <UltronCard />

        {/* 2. Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((project, i) => (
            <SecondaryCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
