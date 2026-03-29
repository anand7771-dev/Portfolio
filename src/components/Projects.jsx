import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Projects
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {projects.map((proj) => (
          <motion.div
            key={proj.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8 }}
            className="group bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
          >
            {/* Gradient bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="p-6">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                {proj.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-5 pt-4 border-t border-white/5">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                  >
                    <FaExternalLinkAlt className="text-xs" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
