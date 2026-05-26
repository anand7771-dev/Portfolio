import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';

const titles = [
  'Machine Learning Engineer',
  'React Native Developer',
  'AI Enthusiast',
  'Cloud Practitioner',
  'Problem Solver',
];

const floatingTech = [
  { label: 'React Native', color: '#61DAFB', angle: 0 },
  { label: 'Firebase', color: '#FFA000', angle: 72 },
  { label: 'Python', color: '#3776AB', angle: 144 },
  { label: 'TypeScript', color: '#3178C6', angle: 216 },
  { label: 'AWS', color: '#FF9900', angle: 288 },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const animRef = useRef(null);

  useEffect(() => {
    let charIdx = 0;
    let titleIdx = 0;
    let isDeleting = false;

    const tick = () => {
      const current = titles[titleIdx];

      if (!isDeleting) {
        charIdx++;
        setDisplayText(current.substring(0, charIdx));
        if (charIdx === current.length) {
          isDeleting = true;
          animRef.current = setTimeout(tick, 2000);
          return;
        }
        animRef.current = setTimeout(tick, 80);
      } else {
        charIdx--;
        setDisplayText(current.substring(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          titleIdx = (titleIdx + 1) % titles.length;
          animRef.current = setTimeout(tick, 300);
          return;
        }
        animRef.current = setTimeout(tick, 40);
      }
    };

    animRef.current = setTimeout(tick, 600);
    return () => clearTimeout(animRef.current);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center pt-20 relative">
      {/* Floating tech bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingTech.map((tech, i) => (
          <motion.div
            key={tech.label}
            className="absolute left-1/2 top-1/2"
            animate={{
              x: Math.cos((tech.angle * Math.PI) / 180) * 260,
              y: Math.sin((tech.angle * Math.PI) / 180) * 160,
              rotate: [0, 360],
            }}
            transition={{
              rotate: { duration: 20 + i * 4, repeat: Infinity, ease: 'linear' },
              x: { duration: 0 },
              y: { duration: 0 },
            }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap"
              style={{
                color: tech.color,
                borderColor: tech.color + '40',
                backgroundColor: tech.color + '12',
                boxShadow: `0 0 12px ${tech.color}20`,
              }}
            >
              {tech.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2 leading-tight">
          Anand Dev
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-xl md:text-2xl text-gray-300 h-8"
      >
        <span>{displayText}</span>
        <span className="animate-pulse text-blue-400 ml-0.5 font-light">|</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-6"
      >
        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium animate-pulse">
          🚀 Open to Internships &amp; Opportunities
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="flex gap-4 mt-8 flex-wrap justify-center"
      >
        <a
          href="https://github.com/anand7771-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-2.5 rounded-xl hover:bg-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
        >
          <FaGithub className="text-lg" /> GitHub
        </a>
        <a
          href="https://linkedin.com/in/anand-dev-0ba936294/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-6 py-2.5 rounded-xl hover:bg-blue-600/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
        >
          <FaLinkedin className="text-lg" /> LinkedIn
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 font-medium"
        >
          <FaFileDownload /> Resume
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
