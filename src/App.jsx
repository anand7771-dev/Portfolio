import { motion } from "framer-motion";
import React from "react";

export default function App() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

React.useEffect(() => {
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
  return (
    <div className="bg-black text-white min-h-screen font-sans relative overflow-hidden px-6 md:px-20">
     <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.15), transparent 80%)`,
        }}
      /> 

      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-black/70 backdrop-blur-lg border border-gray-800 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg z-50">
        <h1 className="text-xl font-bold text-blue-500">Anand Dev</h1>

        <div className="flex gap-6 text-gray-300">
          <a href="#skills" className="hover:text-white">Skills</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Hi, I'm Anand Dev 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-400 text-lg md:text-xl"
        >
          Machine Learning Engineer | AI Enthusiast
        </motion.p>

        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <a
            href="https://github.com/anand7771-dev" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/40 transition duration-300"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/anand-dev-0ba936294/" 
            target="_blank"
            rel="noopener noreferrer"
            className="border px-6 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >

            LinkedIn
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Resume
          </a>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Skills</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Python", "Machine Learning", "TensorFlow", "AWS"].map((skill) => (
            <div
              key={skill}
              className="bg-gray-800 p-4 rounded-xl text-center hover:bg-blue-600 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Krishi-AI",
              desc: "AI agriculture advisory system",
              link: "https://krishi-ai-sigma.vercel.app",
            },
            {
              title: "PURE_PATH",
              desc: "Route planning + AQI system",
              link: "https://github.com/anand7771-dev/CodeAlpha_diabetes-prediction",
            },
            {
              title: "Diabetes Prediction",
              desc: "ML-based health model",
              link: "https://github.com/anand7771-dev/CodeAlpha_diabetes-prediction",
            },
            {
              title: "Credit Prediction",
              desc: "Credit risk prediction model",
              link: "https://github.com/anand7771-dev/CodeAlpha_credit-scoring-ml",
            },
            {
              title: "Automated Essay Scoring",
              desc: "ML-based essay evaluation",
              link: "https://github.com/anand7771-dev/CodeAlpha_automated-essay-scoring",
            },
          ].map((proj) => (
            <motion.div
              key={proj.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold">{proj.title}</h3>
              <p className="text-gray-400 mt-2">{proj.desc}</p>

              <a
                href={proj.link}
                target="_blank"
                className="text-blue-400 mt-4 inline-block"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="text-gray-400">ananddev7771@gmail.com</p>
        <p className="text-gray-400">+91 9162892612</p>
      </section>
    </div>
  );
}