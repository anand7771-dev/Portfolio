import { motion } from 'framer-motion';
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Skills
      </motion.h2>

      <div className="max-w-5xl mx-auto space-y-12">
        {skills.map((category, catIdx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-400 mb-5 text-center tracking-wide uppercase">
              {category.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {category.items.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm px-5 py-3 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-default"
                >
                  <skill.icon className="text-xl text-blue-400" />
                  <span className="text-gray-300 text-sm font-medium">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
