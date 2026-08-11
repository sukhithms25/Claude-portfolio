import React from 'react';

// ─── Tech Stack Marquee ───────────────────────────────────────────────────────
//
// REPLACED: The previous version showed GIFs from motionsites.ai (a third-party
// design portfolio site) with zero relation to Sukhith's work. Removed.
//
// This strip shows the verified technology ecosystem used across ULTRON, GIT_AI,
// CAPA, and Krishi-Setu. Every entry is evidence-backed (Task 009.1 audit).
// ─────────────────────────────────────────────────────────────────────────────

const techItems = [
  { label: 'Python', tag: 'ULTRON · GIT_AI · CAPA · Krishi-Setu' },
  { label: 'FastAPI', tag: 'ULTRON · Krishi-Setu' },
  { label: 'Model Context Protocol', tag: 'CAPA · ULTRON' },
  { label: 'Multi-Agent Systems', tag: 'CAPA · ULTRON' },
  { label: 'Local LLMs', tag: 'ULTRON' },
  { label: 'PostgreSQL + PostGIS', tag: 'Krishi-Setu' },
  { label: 'SQLite', tag: 'ULTRON · CAPA' },
  { label: 'Docker', tag: 'ULTRON' },
  { label: 'GitHub REST API', tag: 'GIT_AI' },
  { label: 'AST Parsing', tag: 'GIT_AI' },
  { label: 'JWT Auth', tag: 'Krishi-Setu' },
  { label: 'Event-Driven Kernel', tag: 'ULTRON' },
  { label: 'Dependency Injection', tag: 'ULTRON' },
  { label: 'TypeScript + React', tag: 'Portfolio' },
  { label: 'Pydantic', tag: 'ULTRON · Krishi-Setu' },
];

// Duplicate for seamless loop
const allItems = [...techItems, ...techItems];

const Dot: React.FC = () => (
  <span
    className="inline-block w-1 h-1 rounded-full mx-6 shrink-0"
    style={{ background: 'rgba(142,182,155,0.4)' }}
  />
);

export const MarqueeSection: React.FC = () => {
  return (
    <section
      className="py-0 overflow-hidden relative"
      aria-label="Verified technology stack"
    >
      {/* Edge fade masks — using correct bg colour */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #051F20, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #051F20, transparent)' }}
      />

      {/* Marquee strip */}
      <div
        className="flex animate-marquee whitespace-nowrap py-5"
        style={{ willChange: 'transform' }}
      >
        {allItems.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center shrink-0">
              <span className="text-[13px] font-mono font-medium text-[#DAF1DE]">
                {item.label}
              </span>
              <span
                className="ml-2 text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
                style={{ color: '#8EB69B', background: 'rgba(142,182,155,0.1)' }}
              >
                {item.tag}
              </span>
            </div>
            <Dot />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
