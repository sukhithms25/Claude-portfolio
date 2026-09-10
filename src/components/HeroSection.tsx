import React from 'react';

export const HeroSection: React.FC = () => {


  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '600px',
        maxHeight: '1000px',
        overflow: 'hidden',
        backgroundColor: '#EFEDEA',
      }}
    >

      {/* ── LAYER 1: hero-bg.png — the full background composition ── */}
      <img
        aria-hidden="true"
        src="/hero-bg.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* ── LAYER 2: Transparent Portrait Cutout ── */}
      <img
        src="/portrait-transparent.png"
        alt="Sukhith M S"
        style={{
          position: 'absolute',
          right: 'clamp(0px, 1.5vw, 24px)',
          bottom: 0,
          height: '98%',
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          objectPosition: 'bottom right',
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* ── SCROLL INDICATOR — sits above bg, below nav ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '28px',
          left: 'clamp(24px, 5vw, 72px)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          opacity: 0.45,
        }}
      >
        <span style={{
          fontFamily: 'monospace',
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#111214',
        }}>
          SCROLL
        </span>
        <span style={{ color: '#111214', fontSize: '14px', lineHeight: 1 }}>↓</span>
      </div>

      {/* ── NAV is in App.tsx at z-index 999 — always above everything ── */}

    </section>
  );
};