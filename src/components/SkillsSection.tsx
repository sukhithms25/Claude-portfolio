import React, { useRef, useEffect, useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const skillCategories = [
  {
    title: 'Languages',
    icon: '{ }',
    color: '#8EB69B',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'Java', level: 70 },
      { name: 'SQL', level: 75 },
      { name: 'C', level: 65 },
      { name: 'PHP', level: 55 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '⚡',
    color: '#DAF1DE',
    skills: [
      { name: 'FastAPI', level: 88 },
      { name: 'React.js', level: 82 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'REST APIs', level: 88 },
    ],
  },
  {
    title: 'Databases',
    icon: '🗃',
    color: '#8EB69B',
    skills: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'MySQL', level: 78 },
      { name: 'MongoDB', level: 70 },
      { name: 'SQLite', level: 85 },
    ],
  },
  {
    title: 'Tools & Concepts',
    icon: '🛠',
    color: '#DAF1DE',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Docker', level: 72 },
      { name: 'JWT Auth', level: 85 },
      { name: 'Multi-Agent AI', level: 80 },
      { name: 'MCP Protocol', level: 75 },
    ],
  },
];

const SkillBar: React.FC<{ name: string; level: number; color: string; delay: number; animate: boolean }> = ({
  name, level, color, delay, animate
}) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-slate-300 text-xs font-medium">{name}</span>
      <span className="text-slate-500 text-xs font-mono">{level}%</span>
    </div>
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: animate ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          boxShadow: animate ? `0 0 8px ${color}60` : 'none',
          transition: `width 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        }}
      />
    </div>
  </div>
);

// Individual card with its own inView hook (called at top level, not inside a loop)
const SkillCard: React.FC<{ cat: typeof skillCategories[0]; index: number }> = ({ cat, index }) => {
  const { ref, inView } = useInViewAnimation();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`glass rounded-3xl p-8 card-3d ${inView ? 'animate-scale-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{cat.icon}</span>
        <h3 className="font-semibold text-white text-base">{cat.title}</h3>
      </div>
      <div className="space-y-4">
        {cat.skills.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={cat.color}
            delay={si * 0.1}
            animate={inView}
          />
        ))}
      </div>
    </div>
  );
};

const ConceptCloud: React.FC = () => {
  const { ref, inView } = useInViewAnimation();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`glass rounded-3xl p-8 text-center mt-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <h3 className="text-sm font-mono text-slate-400 mb-6 tracking-widest uppercase">Concepts I Work With</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {[
          'Object-Oriented Programming', 'JWT Authentication', 'Dependency Injection',
          'Event-Driven Architecture', 'Multi-Agent Systems', 'Model Context Protocol (MCP)',
          'RESTful APIs', 'Database Design', 'CI/CD', 'Agile Development',
          'Authentication & Authorization', 'Microservices',
        ].map((concept) => (
          <span key={concept} className="tech-tag text-xs">{concept}</span>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #235347 0%, transparent 70%)' }} />

      <div className="section-container">
        {/* Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: '#8EB69B' }}>03 / Skills</span>
          <h2 className="text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            My Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="section-divider mt-6 max-w-xs" />
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* Concept cloud */}
        <ConceptCloud />
      </div>
    </section>
  );
};
