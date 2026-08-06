import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, ChevronDown, Code2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const HeroSection: React.FC = () => {
  const { ref, inView } = useInViewAnimation(0.1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Animated particle canvas
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

    const colors = ['#8EB69B', '#DAF1DE', '#235347', '#163832', '#8EB69B'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
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
      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(142, 182, 155, ${0.08 * (1 - dist / 100)})`;
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

  // Cursor glow follow
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Cursor glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(142,182,155,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Orbit rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="orbit-ring w-[500px] h-[500px] md:w-[800px] md:h-[800px] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 opacity-30" />
        <div className="orbit-ring w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 opacity-15" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
      </div>

      {/* Main content */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 pb-16"
      >
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-8 text-xs font-medium ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s', color: '#8EB69B' }}
        >
          <Sparkles size={12} className="animate-pulse" />
          Open to Software Developer Roles
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAF1DE' }} />
        </div>

        {/* Name */}
        <h1
          className={`font-serif-accent text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-4 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <span className="gradient-text">Sukhith M S</span>
        </h1>

        {/* Role */}
        <p
          className={`text-xl md:text-2xl text-slate-300 mb-3 font-mono ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          Full-Stack Developer &amp; AI Systems Builder
        </p>

        {/* Tagline */}
        <p
          className={`text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          Computer Science undergraduate at{' '}
          <span className="font-medium" style={{ color: '#8EB69B' }}>MIT Mysore</span> building
          full-stack applications, AI agents, and multi-agent systems that solve real problems.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <Button
            variant="primary"
            onClick={() => scrollToSection('projects')}
            icon={<Code2 size={16} />}
          >
            View My Projects
          </Button>
          <Button
            variant="secondary"
            href="mailto:sukhithms25@gmail.com"
            icon={<Mail size={16} />}
          >
            Get In Touch
          </Button>
        </div>

        {/* Social links */}
        <div
          className={`flex items-center justify-center gap-6 mb-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.6s' }}
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
              className="flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1"
              style={{ color: '#235347' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#8EB69B')}
              onMouseLeave={e => (e.currentTarget.style.color = '#235347')}
              title={label}
            >
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center border border-transparent transition-all" style={{ borderColor: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(142,182,155,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </a>
          ))}
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-3 gap-4 max-w-sm mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.7s' }}
        >
          {[
            { value: '4+', label: 'Projects Built' },
            { value: '7.75', label: 'CGPA at MIT' },
            { value: 'Top 10', label: 'Protothon 2026' },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-4 text-center card-3d">
              <div className="text-2xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors z-10 animate-float"
        style={{ color: '#235347' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#8EB69B')}
        onMouseLeave={e => (e.currentTarget.style.color = '#235347')}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
};
