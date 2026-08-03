import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

// Marquee images from motionsites.ai
const marqueeImages = [
  { src: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif', alt: 'Space Voyage' },
  { src: 'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif', alt: 'Cosmic Portfolio' },
  { src: 'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif', alt: 'Velorah' },
  { src: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif', alt: 'ASME' },
  { src: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif', alt: 'Transform Data' },
  { src: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif', alt: 'Aethera' },
  { src: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif', alt: 'Orbit Web3' },
  { src: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif', alt: 'Nexora' },
];

// Duplicate for seamless loop
const allImages = [...marqueeImages, ...marqueeImages];

export const MarqueeSection: React.FC = () => {
  return (
    <section className="py-0 overflow-hidden relative" aria-label="Project showcase">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #020b10, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #020b10, transparent)' }} />

      {/* Marquee strip */}
      <div className="flex animate-marquee">
        {allImages.map((img, i) => (
          <div key={i} className="shrink-0 mx-3">
            <img
              src={img.src}
              alt={img.alt}
              className="h-[220px] md:h-[400px] w-auto object-cover rounded-2xl shadow-2xl opacity-70 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
