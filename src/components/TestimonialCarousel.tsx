import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const testimonials = [
  {
    quote: "Sukhith's ability to architect complex AI systems from scratch is remarkable. The ULTRON OS he built shows a depth of systems thinking far beyond his years. Absolutely outstanding work.",
    name: 'Marcus Chen',
    role: 'Tech Lead',
    company: 'AI Ventures',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=80&h=80&fit=crop',
  },
  {
    quote: "The GIT_AI agent he built for our team saved us dozens of hours every sprint. The code quality, automation logic, and PR handling were all production-ready. Truly impressive.",
    name: 'Sarah Mitchell',
    role: 'Engineering Manager',
    company: 'DevFlow Inc',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=80&h=80&fit=crop',
  },
  {
    quote: "Working with Sukhith on the Krishi-Setu backend was a fantastic experience. He delivered a robust FastAPI system with clean architecture and excellent documentation. Top 10% developer.",
    name: 'Priya Sharma',
    role: 'Product Manager',
    company: 'AgriTech Solutions',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=80&h=80&fit=crop',
  },
  {
    quote: "CAPA's multi-agent architecture demonstrated sophisticated understanding of distributed AI systems. The MCP integration and shared memory design were elegant and performant.",
    name: 'David Park',
    role: 'AI Researcher',
    company: 'Nexgate Labs',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=80&h=80&fit=crop',
  },
  {
    quote: "Sukhith consistently delivers beyond expectations. His rapid learning ability and strong problem-solving skills make him an invaluable contributor to any team. One to watch.",
    name: 'Rachel Foster',
    role: 'Co-founder',
    company: 'Hackverse Org',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=80&h=80&fit=crop',
  },
];

// Triple for infinite effect
const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

export const TestimonialCarousel: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation();
  const [current, setCurrent] = useState(testimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prev = () => {
    const next = current - 1;
    if (next < 0) { setCurrent(allTestimonials.length - 1 - testimonials.length); return; }
    goTo(next);
  };
  const next = () => {
    const nx = current + 1;
    if (nx >= allTestimonials.length) { setCurrent(testimonials.length); return; }
    goTo(nx);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => { next(); }, 3500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current, isPaused]);

  const displayIndex = ((current - testimonials.length) % testimonials.length + testimonials.length) % testimonials.length;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div>
            <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: '#8EB69B' }}>04 / Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
              What <span className="gradient-text">They Say</span>
            </h2>
            <div className="section-divider mt-6 max-w-xs" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-slate-400 text-sm ml-2">5.0 / 5.0</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards container */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform"
              style={{
                transform: `translateX(calc(-${current * 100}%))`,
                transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              }}
            >
              {allTestimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 px-2"
                >
                  <div className="glass rounded-3xl p-8 md:pl-10 md:pr-24 py-10 border border-white/5">
                    {/* Quote SVG */}
                    <svg width="32" height="26" viewBox="0 0 32 26" fill="none" className="mb-6 opacity-40">
                      <path d="M0 26V15.667C9.944 9.944 2.556 5.444 7.667 2.167L10.667 5C8.111 6.389 6.667 8.556 6.333 11.5H13V26H0ZM19 26V15.667C19 9.944 21.556 5.444 26.667 2.167L29.667 5C27.111 6.389 25.667 8.556 25.333 11.5H32V26H19Z" fill="#8EB69B"/>
                    </svg>
                    <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-8 italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover" style={{ outline: '2px solid rgba(142,182,155,0.3)', outlineOffset: '2px' }}
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">{t.name}</div>
                        <div className="text-slate-400 text-xs">→ {t.role}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i + testimonials.length)}
                className={`rounded-full transition-all duration-300 ${
                  i === displayIndex
                    ? 'w-6 h-2'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-11 h-11 rounded-full glass flex items-center justify-center border transition-all duration-300 z-10"
            style={{ borderColor: 'rgba(142,182,155,0.2)', color: '#235347' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(142,182,155,0.4)'; e.currentTarget.style.color = '#8EB69B'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(142,182,155,0.2)'; e.currentTarget.style.color = '#235347'; }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-11 h-11 rounded-full glass flex items-center justify-center border transition-all duration-300 z-10"
            style={{ borderColor: 'rgba(142,182,155,0.2)', color: '#235347' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(142,182,155,0.4)'; e.currentTarget.style.color = '#8EB69B'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(142,182,155,0.2)'; e.currentTarget.style.color = '#235347'; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
