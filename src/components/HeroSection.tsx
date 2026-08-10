import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, ChevronDown, Cpu, ArrowRight, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const HeroSection: React.FC = () => {
  const { ref, inView } = useInViewAnimation(0.1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Ultra-subtle background particle canvas (reduced particle count & opacity so typography dominates)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
    }> = [];

    const colors = ['#8EB69B', '#235347'];

    // Reduced density by additional 20%+ for zero typography competition
    const particleCount = window.innerWidth < 640 ? 20 : 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.2 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      // Minimal translucent node connection lines
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(142, 182, 155, ${0.03 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Subtle cursor glow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg bg-[#051F20]"
    >
      {/* Low-opacity background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Subtle cursor glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Radial ambient glow (non-competing) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 45% at 50% 40%, rgba(142,182,155,0.04) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Main Content — Engineering Product Landing Page Style */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 pb-16 flex flex-col items-center"
      >
        {/* Level 1: Position Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass neon-border mb-6 text-xs font-mono tracking-wider ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s', color: '#8EB69B' }}
        >
          <Cpu size={13} className="animate-pulse text-[#8EB69B]" />
          <span>ENGINEERING SYSTEMS &amp; AI ARCHITECTURE</span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#DAF1DE]" />
        </div>

        {/* Level 2: Primary Headline */}
        <h1
          className={`font-serif-accent text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-3 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <span className="gradient-text">Sukhith M S</span>
        </h1>

        {/* Level 3: Defined Engineering Title */}
        <p
          className={`text-lg sm:text-2xl text-[#DAF1DE] mb-5 font-mono font-medium ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          AI Systems &amp; Full-Stack Engineer
        </p>

        {/* Level 4: Concise Engineering Evidence Statement (Reduced copy by 35%) */}
        <div
          className={`text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto font-sans ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        >
          <p className="mb-3">
            Architecting <span className="text-[#DAF1DE] font-semibold">AI operating systems</span>,{' '}
            <span className="text-[#DAF1DE] font-semibold">autonomous developer agents</span>, and{' '}
            <span className="text-[#DAF1DE] font-semibold">production APIs</span>.
          </p>

          {/* Evidence pill strip */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-mono text-[#8EB69B] mt-2">
            <span className="px-2.5 py-1 rounded-md glass border border-[rgba(142,182,155,0.15)]">Multi-Agent Systems</span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md glass border border-[rgba(142,182,155,0.15)]">Local LLM Runtimes</span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md glass border border-[rgba(142,182,155,0.15)]">FastAPI</span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md glass border border-[rgba(142,182,155,0.15)]">PostgreSQL</span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md glass border border-[rgba(142,182,155,0.15)]">MCP</span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md glass border border-[rgba(142,182,155,0.15)]">Docker</span>
          </div>
        </div>

        {/* Level 5: Direct Engineering CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-10 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.5s' }}
        >
          {/* Primary CTA: Flagship Entry Point */}
          <Button
            variant="primary"
            onClick={() => scrollToSection('projects')}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="w-full sm:w-auto text-sm font-semibold"
          >
            Explore Flagship Project (ULTRON)
          </Button>

          {/* Secondary CTA: Technical Architecture Exploration */}
          <Button
            variant="secondary"
            onClick={() => scrollToSection('projects')}
            icon={<Layers size={15} />}
            iconPosition="left"
            className="w-full sm:w-auto text-sm"
          >
            Explore System Architecture
          </Button>
        </div>

        {/* Level 6: Technical Capability Cards (Replaced isolated stats with capability proof) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl mx-auto mb-10 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          {[
            { title: 'Autonomous Agents', detail: 'GitHub Issue-to-PR Workflow' },
            { title: 'Local LLM Runtimes', detail: 'Custom Telemetry & Memory' },
            { title: 'Multi-Agent MCP', detail: 'Shared SQLite Context' },
            { title: 'Production Backends', detail: 'FastAPI & Geospatial Queries' },
          ].map(({ title, detail }) => (
            <div
              key={title}
              className="glass rounded-xl p-3.5 text-left border border-[rgba(142,182,155,0.15)] hover:border-[rgba(142,182,155,0.3)] transition-all duration-300"
            >
              <div className="text-xs sm:text-sm font-bold text-[#DAF1DE] font-mono mb-1">
                {title}
              </div>
              <div className="text-[11px] text-slate-400 font-sans leading-tight">{detail}</div>
            </div>
          ))}
        </div>

        {/* Level 7: Social & Contact Links */}
        <div
          className={`flex items-center justify-center gap-6 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.7s' }}
        >
          {[
            { icon: GithubIcon, href: 'https://github.com/sukhithms25', label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://linkedin.com/in/sukhith-m-s-324487382', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:sukhithms25@gmail.com', label: 'Email' },
            { icon: Phone, href: 'tel:+917483921441', label: 'Phone' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1 group"
              title={label}
            >
              <div
                className="w-9 h-9 rounded-full glass flex items-center justify-center border transition-all duration-300"
                style={{ borderColor: 'rgba(142,182,155,0.2)', color: '#8EB69B' }}
              >
                <Icon size={16} className="group-hover:text-[#DAF1DE] transition-colors" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#8EB69B] transition-colors">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Scroll Chevron */}
      <button
        onClick={() => scrollToSection('projects')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors z-10 animate-float"
        style={{ color: '#8EB69B' }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
          Scroll
        </span>
        <ChevronDown size={16} className="animate-bounce text-[#8EB69B]" />
      </button>
    </section>
  );
};
