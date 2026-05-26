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
        className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent glow-heading"
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
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          I'm a passionate Machine Learning Engineer and AI enthusiast currently
          pursuing my studies at{' '}
          <span className="text-blue-600 font-semibold">KIIT University</span>. I
          love building intelligent systems that solve real-world problems — from
          agricultural advisory platforms to health prediction models. When I'm
          not training neural networks, you'll find me exploring cloud
          technologies and participating in hackathons like{' '}
          <span className="text-blue-600 font-semibold">
            Smart India Hackathon
          </span>
          .
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { icon: FaGraduationCap, label: 'KIIT University' },
            { icon: FaMapMarkerAlt, label: 'Bhubaneswar, India' },
            { icon: FaCode, label: 'ML / AI / Cloud' },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 justify-center text-gray-600 bg-white/70 border border-indigo-100 rounded-xl py-3 px-4 hover:border-blue-400/50 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <item.icon className="text-blue-500 text-xl" />
              <span className="font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
