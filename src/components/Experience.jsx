import { motion } from 'framer-motion';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Experience
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-8">
        {experience.map((exp, idx) => (
          <div key={exp.role} className="flex gap-4">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300 shadow-lg shadow-blue-500/50 shrink-0 mt-7"
              />
              {idx < experience.length - 1 && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500/60 to-purple-500/60 mt-1" />
              )}
            </div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex-1 pb-2"
            >
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-gray-500 text-sm">{exp.duration}</span>
                </div>
                <p className="text-blue-400 mt-1 font-medium">{exp.company}</p>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  {exp.desc}
                </p>
                {exp.tech && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
