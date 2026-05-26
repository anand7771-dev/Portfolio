import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { FaExternalLinkAlt, FaGithub, FaAndroid } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';

const featured = projects[0];
const rest = projects.slice(1);

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent glow-heading"
      >
        Projects
      </motion.h2>

      {/* ── Featured Project Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="group relative rounded-2xl border border-indigo-200 bg-white/70 backdrop-blur-xl overflow-hidden hover:border-blue-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100">
          {/* Top animated gradient bar */}
          <div className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <div className="p-8 md:flex gap-10 items-start">
            {/* Left: Info */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center gap-1 text-xs px-3 py-1 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-full font-semibold">
                  <MdStar className="text-sm" /> Featured
                </span>
                <span className="flex items-center gap-1 text-xs px-3 py-1 bg-green-500/15 text-green-400 border border-green-500/30 rounded-full font-semibold">
                  ● Live App
                </span>
                <span className="text-xs px-3 py-1 bg-purple-500/15 text-purple-400 border border-purple-500/30 rounded-full font-semibold">
                  Client Project
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {featured.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {featured.desc}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {featured.github && (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    <FaGithub /> View Code
                  </a>
                )}
                {featured.live && (
                  <a
                    href={featured.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-sm text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200"
                  >
                    <FaAndroid /> Download APK
                  </a>
                )}
              </div>
            </div>

            {/* Right: Stats card */}
            <div className="mt-8 md:mt-0 md:w-56 shrink-0 bg-indigo-50/80 border border-indigo-100 rounded-xl p-5 space-y-4">
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">App Info</div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform</span>
                <span className="text-gray-900 font-medium">Android</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Version</span>
                <span className="text-gray-900 font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Build</span>
                <span className="text-green-400 font-medium">✓ Shipped</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Backend</span>
                <span className="text-orange-500 font-medium">Firebase</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Language</span>
                <span className="text-blue-600 font-medium">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Other Projects Grid ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {rest.map((proj) => (
          <motion.div
            key={proj.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8 }}
            className="group bg-white/70 backdrop-blur-xl rounded-2xl border border-indigo-100 hover:border-blue-400/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-100"
          >
            {/* Gradient bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {proj.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
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
