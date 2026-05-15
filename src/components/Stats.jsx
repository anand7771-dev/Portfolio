import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Counter({ target, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const steps = 40;
          const increment = target / steps;
          const interval = 1200 / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, interval);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <p className="text-gray-400 mt-2 text-lg">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
        <Counter target={7} label="Projects" suffix="+" />
        <Counter target={13} label="Certifications" />
        <Counter target={2} label="Internship" />
        <Counter target={4} label="AWS Certs" />
      </div>
    </motion.section>
  );
}
