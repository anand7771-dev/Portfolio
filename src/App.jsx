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
import ParticleField from './components/ParticleField';
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
    <div className="text-white min-h-screen font-sans relative overflow-hidden" style={{background: 'linear-gradient(135deg, #080e20 0%, #0b1230 40%, #0d1040 70%, #080e20 100%)'}}>
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Animated particle field */}
      <ParticleField />

      {/* Cursor trail */}
      <CursorTrail />

      {/* Mouse-follow gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.13), transparent 80%)`,
        }}
      />

      {/* Background blobs with aurora animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="aurora-blob absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/[0.15] rounded-full blur-[120px]" />
        <div className="aurora-blob absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/[0.13] rounded-full blur-[120px]" style={{animationDelay:'-6s'}} />
        <div className="aurora-blob absolute top-[35%] left-[45%] w-[500px] h-[500px] bg-indigo-500/[0.10] rounded-full blur-[120px]" style={{animationDelay:'-12s'}} />
        <div className="aurora-blob absolute top-[60%] right-[20%] w-[350px] h-[350px] bg-cyan-500/[0.07] rounded-full blur-[100px]" style={{animationDelay:'-4s'}} />
      </div>

      {/* Grid pattern - slightly more visible */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:48px_48px]" />
      {/* Diagonal accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #818cf8 0px, #818cf8 1px, transparent 1px, transparent 60px)'}} />

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
