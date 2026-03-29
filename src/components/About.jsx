import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        About Me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-gray-300 text-lg leading-relaxed text-center">
          I'm a passionate Machine Learning Engineer and AI enthusiast currently
          pursuing my studies at{' '}
          <span className="text-blue-400 font-medium">KIIT University</span>. I
          love building intelligent systems that solve real-world problems — from
          agricultural advisory platforms to health prediction models. When I'm
          not training neural networks, you'll find me exploring cloud
          technologies and participating in hackathons like{' '}
          <span className="text-blue-400 font-medium">
            Smart India Hackathon
          </span>
          .
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: FaGraduationCap,
              label: 'KIIT University',
            },
            {
              icon: FaMapMarkerAlt,
              label: 'Bihar,India',
            },
            {
              icon: FaCode,
              label: 'ML / AI / Cloud',
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 justify-center text-gray-400 bg-white/5 border border-white/10 rounded-xl py-3 px-4 hover:border-blue-500/30 transition-all duration-300"
            >
              <item.icon className="text-blue-400 text-xl" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
