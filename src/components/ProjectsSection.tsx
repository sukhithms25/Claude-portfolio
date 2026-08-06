import React from 'react';
import { ExternalLink, Zap, Bot, Database, Globe } from 'lucide-react';
import { GithubIcon } from './icons';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Button } from './Button';

const projects = [
  {
    id: 'ultron',
    name: 'ULTRON',
    tagline: 'From architecture to execution — an AI OS',
    description: 'Architected a modular AI operating system with custom runtime, memory management, telemetry, dependency injection, and local LLM integration. Built for extensibility and production-grade reliability.',
    tech: ['Python', 'FastAPI', 'Local LLM', 'SQLite', 'Docker', 'Event-Driven'],
    icon: Bot,
    gradient: 'from-[#163832]/40 to-[#235347]/40',
    accentColor: '#8EB69B',
    gif: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    github: 'https://github.com/sukhithms25',
    highlight: '🏆 Flagship Project',
  },
  {
    id: 'git-ai',
    name: 'GIT_AI',
    tagline: 'Your autonomous dev team of one',
    description: 'Built an autonomous AI developer agent that analyzes GitHub issues, generates code fixes, and automates pull request creation. End-to-end workflow automation from issue to merged PR.',
    tech: ['Python', 'GitHub API', 'LLM', 'Automation', 'REST APIs'],
    icon: Zap,
    gradient: 'from-[#0B2B26]/60 to-[#163832]/60',
    accentColor: '#DAF1DE',
    gif: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    github: 'https://github.com/sukhithms25',
    highlight: '🤖 AI Agent',
  },
  {
    id: 'capa',
    name: 'CAPA',
    tagline: 'Context-aware productivity, amplified',
    description: 'Developed a context-aware personal productivity platform using 3 specialized AI agents, 3 MCP servers, and shared SQLite memory. Enables seamless cross-agent context sharing and persistent memory.',
    tech: ['Python', 'Multi-Agent', 'MCP', 'SQLite', 'Context Management'],
    icon: Globe,
    gradient: 'from-[#163832]/50 to-[#235347]/50',
    accentColor: '#8EB69B',
    gif: 'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
    github: 'https://github.com/sukhithms25',
    highlight: '🧠 Multi-Agent',
  },
  {
    id: 'krishi-setu',
    name: 'Krishi-Setu',
    tagline: 'Connecting farmers to markets, seamlessly',
    description: 'Built a production-grade FastAPI backend with JWT authentication, PostgreSQL database, and location-based harvest discovery for farmers. Includes secure RESTful endpoints and geospatial queries.',
    tech: ['FastAPI', 'PostgreSQL', 'JWT', 'Python', 'REST APIs', 'Location-Based'],
    icon: Database,
    gradient: 'from-[#235347]/40 to-[#163832]/40',
    accentColor: '#DAF1DE',
    gif: 'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
    github: 'https://github.com/sukhithms25',
    highlight: '🌾 Full-Stack',
  },
];

const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  const { ref, inView } = useInViewAnimation();
  const Icon = project.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Project number offset text */}
      <div className="ml-20 md:ml-28 mb-4">
        <span className="font-mono text-xs text-slate-600 tracking-widest">0{index + 1}</span>
        <div className="flex items-start gap-3 mt-1">
          <h3
            className="font-serif-accent text-2xl md:text-3xl font-semibold"
            style={{ color: project.accentColor }}
          >
            {project.name}
          </h3>
          <span className="mt-1 text-xs px-2 py-1 rounded-full glass text-slate-400 whitespace-nowrap">{project.highlight}</span>
        </div>
        <p className="text-slate-400 text-sm md:text-base mt-1">{project.tagline}</p>
      </div>

      {/* Full-width card with image */}
      <div className="relative rounded-3xl overflow-hidden glass card-3d border border-white/5 hover:border-white/10 transition-all duration-500">
        {/* GIF preview */}
        <div className="relative h-[280px] md:h-[420px] overflow-hidden">
          <img
            src={project.gif}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} via-transparent to-transparent opacity-60`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark" />

          {/* Floating icon badge */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl glass flex items-center justify-center"
            style={{ border: `1px solid ${project.accentColor}30` }}>
            <Icon size={22} style={{ color: project.accentColor }} />
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 md:p-8">
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              href={project.github}
              icon={<GithubIcon size={14} />}
              iconPosition="left"
            >
              View Code
            </Button>
            <Button
              variant="ghost"
              href={project.github}
              icon={<ExternalLink size={14} />}
              iconPosition="right"
            >
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8EB69B 0%, transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-20 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: '#8EB69B' }}>02 / Projects</span>
          <h2 className="text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <div className="section-divider mt-6 max-w-xs" />
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-20 md:gap-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
