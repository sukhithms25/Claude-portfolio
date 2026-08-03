import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const element = ref.current;
          if (!element) { ticking = false; return; }
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const offset = (viewportHeight / 2 - elementCenter) * speed;
          element.style.transform = `translateY(${Math.max(-100, Math.min(100, offset))}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
