import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaFileDownload,
  FaReact, FaPython, FaAws, FaFire,
} from 'react-icons/fa';
import { SiTypescript, SiTensorflow } from 'react-icons/si';
import { HiArrowRight } from 'react-icons/hi';

const titles = [
  'Machine Learning Engineer',
  'React Native Developer',
  'AI & Cloud Enthusiast',
  'Full-Stack Problem Solver',
];

// Orbiting icons for the right visual card only
const orbitIcons = [
  { Icon: FaReact,      color: '#0ea5e9', angle:   0, radius: 110 },
  { Icon: SiTypescript, color: '#3b82f6', angle:  60, radius: 120 },
  { Icon: FaAws,        color: '#f97316', angle: 120, radius: 110 },
  { Icon: FaPython,     color: '#6366f1', angle: 180, radius: 120 },
  { Icon: SiTensorflow, color: '#10b981', angle: 240, radius: 110 },
  { Icon: FaFire,       color: '#f59e0b', angle: 300, radius: 120 },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    let charIdx = 0;
    let idx = 0;
    let isDeleting = false;

    const tick = () => {
      const current = titles[idx];
      if (!isDeleting) {
        charIdx++;
        setDisplayText(current.substring(0, charIdx));
        if (charIdx === current.length) {
          isDeleting = true;
          animRef.current = setTimeout(tick, 2000);
          return;
        }
        animRef.current = setTimeout(tick, 75);
      } else {
        charIdx--;
        setDisplayText(current.substring(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          idx = (idx + 1) % titles.length;
          setTitleIdx(idx);
          animRef.current = setTimeout(tick, 300);
          return;
        }
        animRef.current = setTimeout(tick, 38);
      }
    };
    animRef.current = setTimeout(tick, 600);
    return () => clearTimeout(animRef.current);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden">

      {/* ── Left Column ── */}
      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 px-4">
        <div className="flex-1 text-center lg:text-left z-10">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-green-200 bg-green-50 text-green-700 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for Internships & Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-4"
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Anand Dev
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 origin-left"
              />
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-10 mt-4 flex items-center lg:justify-start justify-center"
          >
            <span className="text-xl md:text-2xl font-semibold text-violet-300">
              {displayText}
            </span>
            <span className="text-2xl text-violet-400 animate-pulse ml-0.5">|</span>
          </motion.div>

          {/* Short bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-5 text-gray-400 text-base leading-relaxed max-w-lg lg:mx-0 mx-auto"
          >
            Building intelligent systems at{' '}
            <span className="text-blue-400 font-semibold">KIIT University</span> — from
            AI-powered apps to real-world construction management software.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-7 py-3 rounded-2xl font-semibold hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              View Projects
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="https://github.com/anand7771-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaGithub className="text-lg" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/anand-dev-0ba936294/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaLinkedin className="text-lg" /> LinkedIn
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaFileDownload /> Resume
            </a>
          </motion.div>


        </div>

        {/* ── Right Column: Visual Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
          className="hidden lg:flex relative items-center justify-center w-[340px] h-[340px] shrink-0"
        >
          {/* Orbiting tech icons — contained entirely in right column */}
          {orbitIcons.map((item, i) => {
            const rad = (item.angle * Math.PI) / 180;
            const x = Math.cos(rad) * item.radius;
            const y = Math.sin(rad) * item.radius;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                animate={{ x, y }}
                transition={{ duration: 0 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md border border-white"
                  style={{ background: item.color + '18', borderColor: item.color + '40' }}
                >
                  <item.Icon style={{ color: item.color }} className="text-xl" />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center glass card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-48 h-48 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/10 flex flex-col items-center justify-center gap-2 p-4"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/30">
              AD
            </div>
            <div className="text-center mt-1">
              <div className="font-bold text-gray-400 text-xs tracking-widest uppercase">ML Engineer</div>
              <div className="text-xs text-gray-500 mt-0.5">KIIT University</div>
            </div>
            <div className="flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Open to work</span>
            </div>
          </motion.div>

          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-100 animate-spin" style={{animationDuration: '30s'}} />
          <div className="absolute inset-4 rounded-full border border-violet-100/60" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-indigo-200 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
