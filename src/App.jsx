import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import CursorTrail from './components/CursorTrail';
import BackToTop from './components/BackToTop';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="text-white min-h-screen font-sans relative overflow-hidden">
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Galaxy + Jupiter canvas background */}
      <SpaceBackground />

      {/* Cursor trail */}
      <CursorTrail />

      {/* Mouse-follow soft glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.08), transparent 80%)`,
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-20">
        <Navbar />
        <Hero />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <About />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <Stats />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <Skills />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <Experience />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <Projects />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <Certifications />
        <div className="section-divider max-w-4xl mx-auto my-2" />
        <Contact />
        <Footer />
      </div>

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}
