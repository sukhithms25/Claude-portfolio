import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="relative min-h-screen bg-dark text-slate-200 overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Marquee strip */}
        <div className="py-8">
          <MarqueeSection />
        </div>

        {/* 3. About */}
        <AboutSection />

        {/* 4. Projects */}
        <ProjectsSection />

        {/* 5. Skills */}
        <SkillsSection />

        {/* 6. Testimonials */}
        <TestimonialCarousel />

        {/* 7. Contact / Partner */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
