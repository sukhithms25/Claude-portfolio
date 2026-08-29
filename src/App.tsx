import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EngineeringRecord } from './components/EngineeringRecord';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#03070B] text-[#E6E3DF] overflow-x-hidden">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Verified tech-stack marquee */}
        <div className="py-8">
          <MarqueeSection />
        </div>

        {/* 3. About */}
        <AboutSection />

        {/* 4. Projects */}
        <ProjectsSection />

        {/* 5. Skills */}
        <SkillsSection />

        {/* 6. Engineering Build Record (replaces fake testimonials) */}
        <EngineeringRecord />

        {/* 7. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
