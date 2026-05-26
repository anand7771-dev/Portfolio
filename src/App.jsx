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
    <div className="bg-gray-950 text-white min-h-screen font-sans relative overflow-hidden">
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Animated particle field */}
      <ParticleField />

      {/* Mouse-follow gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.09), transparent 80%)`,
        }}
      />

      {/* Background blobs with aurora animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="aurora-blob absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/[0.08] rounded-full blur-[150px]" />
        <div className="aurora-blob absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/[0.08] rounded-full blur-[150px]" style={{animationDelay:'-6s'}} />
        <div className="aurora-blob absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-pink-500/[0.05] rounded-full blur-[150px]" style={{animationDelay:'-12s'}} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:50px_50px]" />

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
    </div>
  );
}
