import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const AboutSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation();
  const { ref: contentRef, inView: contentInView } = useInViewAnimation();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8EB69B 0%, transparent 70%)' }} />

      <div className="section-container">
        {/* Section title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: '#8EB69B' }}>01 / About</span>
          <h2 className="text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            The Developer <span className="gradient-text">Behind the Code</span>
          </h2>
          <div className="section-divider mt-6 max-w-xs" />
        </div>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Bio */}
          <div className={`space-y-6 ${contentInView ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="glass rounded-3xl p-8 card-3d">
              <p className="text-slate-300 leading-relaxed text-base mb-4">
                I'm a Computer Science undergraduate at{' '}
                <span className="font-medium" style={{ color: '#8EB69B' }}>MIT Mysore</span>, passionate about
                building impactful software. I specialize in full-stack development using Python,
                FastAPI, React, and PostgreSQL, with deep experience in AI-assisted development
                and multi-agent systems.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                Whether it's architecting a modular AI OS, building autonomous developer agents,
                or shipping production-grade APIs — I bring strong problem-solving skills and a
                relentless drive to ship great software.
              </p>
            </div>

            {/* Contact info */}
            <div className="glass rounded-3xl p-6 space-y-3">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <MapPin size={14} style={{ color: '#8EB69B' }} />
                Contact & Links
              </h3>
              {[
                { label: 'Email', value: 'sukhithms25@gmail.com', href: 'mailto:sukhithms25@gmail.com' },
                { label: 'Phone', value: '+91 74839 21441', href: 'tel:+917483921441' },
                { label: 'GitHub', value: 'github.com/sukhithms25', href: 'https://github.com/sukhithms25' },
                { label: 'LinkedIn', value: 'linkedin.com/in/sukhith-m-s', href: 'https://linkedin.com/in/sukhith-m-s-324487382' },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 w-16 shrink-0">{label}</span>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors truncate ml-2" style={{ color: '#8EB69B' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#DAF1DE')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8EB69B')}>
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education + Achievements */}
          <div className={`space-y-6 ${contentInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {/* Education */}
            <div className="glass rounded-3xl p-8 card-3d">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <GraduationCap size={18} style={{ color: '#8EB69B' }} />
                Education
              </h3>
              <div className="space-y-6">
                  <div className="relative pl-6" style={{ borderLeft: '1px solid rgba(142,182,155,0.3)' }}>
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: '#8EB69B', boxShadow: '0 0 8px rgba(142,182,155,0.6)' }} />
                    <div className="text-white font-medium text-sm">B.E Computer Science & Engineering</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: '#8EB69B' }}>MIT Mysore</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar size={10} /> Expected 2027
                    </span>
                    <span className="text-emerald-400 text-xs font-bold">CGPA: 7.75</span>
                  </div>
                </div>
                  <div className="relative pl-6" style={{ borderLeft: '1px solid rgba(142,182,155,0.15)' }}>
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: '#235347', boxShadow: '0 0 8px rgba(35,83,71,0.6)' }} />
                    <div className="text-white font-medium text-sm">Pre-University College (PCMB)</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: '#235347' }}>STG PU College</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar size={10} /> 2023
                    </span>
                    <span className="text-emerald-400 text-xs font-bold">93.16%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-3xl p-8 card-3d">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Award size={18} style={{ color: '#DAF1DE' }} />
                Achievements
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Top 10 Finalist', event: 'Protothon 2026', highlight: true },
                  { title: 'Coordinator', event: 'Hackverse Hackathon', highlight: false },
                  { title: 'Participant', event: 'National Hackathon 5.0', highlight: false },
                  { title: 'Participant', event: 'Solaris X Grand Hackathon', highlight: false },
                ].map(({ title, event, highlight }) => (
                  <div key={event} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: highlight ? '#DAF1DE' : '#8EB69B', boxShadow: highlight ? '0 0 6px rgba(218,241,222,0.8)' : 'none' }} />
                    <div>
                      <span className={`text-sm font-medium ${highlight ? 'text-yellow-300' : 'text-white'}`}>{title}</span>
                      <span className="text-slate-400 text-xs ml-2">— {event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
