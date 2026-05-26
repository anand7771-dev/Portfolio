import { motion } from 'framer-motion';
import { certifications } from '../data/certifications';
import { FaAward } from 'react-icons/fa';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Certifications
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
      >
        {certifications.map((cert) => (
          <motion.div
            key={cert.title}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
            className="group bg-white/70 backdrop-blur-xl p-5 rounded-2xl border border-indigo-100 hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-100 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <FaAward className="text-blue-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{cert.org}</p>
              </div>
            </div>

            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-xs mt-3 inline-flex items-center gap-1 hover:text-blue-300 transition-colors"
            >
              View Certificate →
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
