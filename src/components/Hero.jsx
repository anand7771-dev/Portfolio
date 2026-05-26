import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const titles = [
  'Machine Learning Engineer',
  'React Native Developer',
  'AI Enthusiast',
  'Cloud Practitioner',
  'Problem Solver',
];

// Fixed corner positions — never overlap center content
const techBubbles = [
  { label: 'React Native', color: '#0ea5e9', x: '-38%', y: '-55%', delay: 0 },
  { label: 'Firebase',     color: '#f59e0b', x:  '42%', y: '-48%', delay: 0.6 },
  { label: 'Python',       color: '#6366f1', x: '-44%', y:  '40%', delay: 1.2 },
  { label: 'TypeScript',   color: '#3b82f6', x:  '40%', y:  '50%', delay: 1.8 },
  { label: 'AWS',          color: '#f97316', x:   '0%', y: '-70%', delay: 0.9 },
  { label: 'TensorFlow',   color: '#10b981', x: '-20%', y:  '68%', delay: 1.5 },
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
    <section className="min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-10 relative overflow-hidden">

      {/* Fixed-position tech bubbles — well away from center */}
      {techBubbles.map((b, i) => (
        <motion.div
          key={b.label}
          className="absolute left-1/2 top-1/2 pointer-events-none select-none"
          style={{ translateX: '-50%', translateY: '-50%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: b.x, y: b.y }}
          transition={{ duration: 0.8, delay: b.delay }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap shadow-sm"
            style={{
              color: b.color,
              borderColor: b.color + '50',
              backgroundColor: b.color + '15',
              boxShadow: `0 2px 16px ${b.color}25`,
            }}
          >
            {b.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-green-700 text-sm font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to Internships & Opportunities
            <HiSparkles className="text-green-500" />
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight pb-2">
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Anand
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Dev
            </span>
          </h1>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-xl md:text-2xl text-gray-500 h-9 flex items-center justify-center gap-1"
        >
          <span className="font-medium text-gray-700">{displayText}</span>
          <span className="animate-pulse text-violet-500 font-light text-2xl">|</span>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center justify-center gap-1.5 mt-3 text-gray-400 text-sm"
        >
          <FaMapMarkerAlt className="text-violet-400 text-xs" />
          <span>Bhubaneswar, India · KIIT University</span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-24 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-6"
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex gap-3 mt-8 flex-wrap justify-center"
        >
          <a
            href="https://github.com/anand7771-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <FaGithub className="text-lg" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/anand-dev-0ba936294/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-6 py-2.5 rounded-xl text-blue-700 font-medium hover:bg-blue-100 hover:shadow-md transition-all duration-300"
          >
            <FaLinkedin className="text-lg" /> LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-200 hover:scale-105 transition-all duration-300"
          >
            <FaFileDownload /> Resume
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex justify-center gap-10 mt-10 pt-8 border-t border-indigo-100"
        >
          {[
            { value: '8+', label: 'Projects' },
            { value: '12', label: 'Certifications' },
            { value: '2', label: 'Internships' },
            { value: '4', label: 'AWS Certs' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10"
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
