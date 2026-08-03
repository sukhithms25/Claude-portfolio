import React, { useRef, useEffect, useState } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

interface FloatingImage {
  id: number;
  x: number;
  y: number;
  rotation: number;
  src: string;
  opacity: number;
  scale: number;
  createdAt: number;
}

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sukhithms25@gmail.com',
    href: 'mailto:sukhithms25@gmail.com',
    color: '#38bdf8',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 74839 21441',
    href: 'tel:+917483921441',
    color: '#34d399',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/sukhithms25',
    href: 'https://github.com/sukhithms25',
    color: '#818cf8',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sukhith-m-s',
    href: 'https://linkedin.com/in/sukhith-m-s-324487382',
    color: '#fbbf24',
  },
];

// Individual card with its own inView hook
const ContactCard: React.FC<{ item: typeof contactItems[0]; index: number }> = ({ item, index }) => {
  const { ref, inView } = useInViewAnimation();
  const Icon = item.icon;
  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`glass rounded-2xl p-6 flex flex-col gap-3 card-3d group border border-white/5 hover:border-white/10 transition-all duration-300 ${inView ? 'animate-scale-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
        <Icon size={18} style={{ color: item.color }} />
      </div>
      <div>
        <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
        <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">{item.value}</div>
      </div>
      <ArrowRight size={14} className="text-slate-600 group-hover:text-sky-400 transition-colors self-end" />
    </a>
  );
};

export const ContactSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);
  const lastSpawnRef = useRef(0);
  const imageIndexRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  // Mouse trail image effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 80) return;
    lastSpawnRef.current = now;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = (Math.random() - 0.5) * 20;
    const src = marqueeImages[imageIndexRef.current % marqueeImages.length];
    imageIndexRef.current++;

    setFloatingImages((prev) => [
      ...prev.slice(-10),
      { id: now, x, y, rotation, src, opacity: 1, scale: 1, createdAt: now },
    ]);
  };

  // Fade out images via rAF loop
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setFloatingImages((prev) =>
        prev
          .map((img) => {
            const age = now - img.createdAt;
            const progress = Math.min(age / 1000, 1);
            return { ...img, opacity: 1 - progress, scale: 1 - progress * 0.2 };
          })
          .filter((img) => img.opacity > 0.01)
      );
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="section-container">
        {/* Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-xs font-mono text-sky-400 tracking-widest uppercase mb-3 block">05 / Contact</span>
          <h2 className="text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <div className="section-divider mt-6 max-w-xs" />
        </div>

        {/* Interactive mouse-trail CTA */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative glass rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center py-32 px-6 mb-12 border border-white/5"
          style={{ minHeight: '400px', cursor: 'none' }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(56,189,248,0.05) 0%, transparent 100%)' }} />

          {/* Floating images */}
          {floatingImages.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt="preview"
              className="pointer-events-none absolute rounded-xl shadow-2xl object-cover"
              style={{
                left: img.x - 80,
                top: img.y - 60,
                width: 160,
                height: 120,
                transform: `rotate(${img.rotation}deg) scale(${img.scale})`,
                opacity: img.opacity,
                zIndex: 10,
              }}
            />
          ))}

          <div className="relative z-20">
            <h3 className="font-serif-accent text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-10 tracking-tight">
              Hire Me
            </h3>
            <a
              href="mailto:sukhithms25@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full btn-primary text-white font-medium"
            >
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=40&h=40&fit=crop"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              Start chat with Sukhith
              <ArrowRight size={16} />
            </a>
            <p className="text-slate-500 text-sm mt-6 font-mono">Move your cursor over this area ✦</p>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
