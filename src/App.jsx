import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

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
          <a href="#certifications" className="hover:text-white">Certifications</a>
          <a href="#experience" className="hover:text-white">Experience</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
        >
          Hi, I'm Anand Dev 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-400 text-lg md:text-xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Machine Learning Engineer | AI Enthusiast 🚀
          </motion.span>
        </motion.p>

        <div className="flex gap-4 mt-6 flex-wrap justify-center">

            <a
              href="https://github.com/anand7771-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/40 transition duration-300"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/anand-dev-0ba936294/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-700 px-6 py-2 rounded-xl hover:bg-blue-800 text-white transition duration-300 shadow-lg hover:shadow-blue-500/40"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              className="bg-green-600 px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              Resume
              
            <p className="text-sm text-yellow-400 mt-3 font-semibold animate-pulse">
  🚀 Open to Internships & Opportunities
</p>

          </a>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >Skills</motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Python", "Machine Learning", "TensorFlow", "AWS"].map((skill) => (
            <div
              key={skill}
              className="bg-gray-800 p-4 rounded-xl text-center hover:bg-blue-600 hover:scale-105 transition duration-300 cursor-pointer"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
<section id="certifications" className="py-20">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
  >
    Certifications
  </motion.h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {[
      {
        title: "Corporate Governance",
        org: "Coursera",
        file: "/certificates/corporate_governance.pdf"
      },
      {
        title: "Business For Good",
        org: "Coursera",
        file: "/certificates/Business_for_Good.pdf"
      },
      {
        title: "Ethical Decision Making",
        org: "Coursera",
        file: "/certificates/Ethical_Decision_Making.pdf"
      },
      {
        title: "ICDCIT",
        org: "KIIT",
        file: "/certificates/ICDCIT_KIIT.pdf"
      },
      {
        title: "SIH HACKATHON",
        org: "Ministry of Education",
        file: "/certificates/SIH.pdf"
      },
      {
        title: "AI-Powered Cloud Engineer Virtual Internship",
        org: "AWS",
        file: "/certificates/AI_Powered_Cloud_Engineer.pdf"
      },
      {
        title: "GEN-AI Virtual Internship",
        org: "AWS",
        file: "/certificates/AWS_GEN_AI.pdf"
      },
      {
        title: "AWS Academy Data Engineering",
        org: "AWS",
        file: "/certificates/AWS_Academy_Data_Engineering.pdf"
      },
      {
        title: "AWS Academy Machine Learning",
        org: "AWS",
        file: "/certificates/AWS_Machine_Learning.pdf"
      },
      {
        title: "AI-ML VIRTUAL INTERNSHIP",
        org: "Google",
        file: "/certificates/GOOGLE_AI_ML.pdf"
      },
      {
        title: "Android Developer Virtual Internship",
        org: "Google",
        file: "/certificates/GOOGLE_ANDROID_DEVELOPER.pdf"
      },
    ].map((cert, index) => (

      <div
  key={cert.title}
  className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
             hover:scale-105 transition duration-300"
>
  
  {/* Overlay FIXED */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                  opacity-0 hover:opacity-100 transition pointer-events-none">
  </div>

  <h3 className="text-xl font-bold relative z-10">{cert.title}</h3>
  <p className="text-gray-400 mt-2 relative z-10">{cert.org}</p>

  <a
    href={cert.file}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 mt-4 inline-block hover:underline relative z-10 cursor-pointer"
  >
    View Certificate →
  </a>

</div>

    ))}

  </div>
</section>

      {/* EXPERIENCE */}
<section id="experience" className="py-20">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
  >Experience</motion.h2>

  <div className="space-y-6 max-w-4xl mx-auto">

    {[
      {
        role: "Machine Learning Intern",
        company: "CodeAlpha",
        duration: "Jun 2025 – Sep 2025",
        desc: "Built ML models for diabetes prediction and creditworthiness assessment using Random Forest and Logistic Regression."
      },
      
    ].map((exp) => (

      <div
        key={exp.role}
        className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
                  before:absolute before:inset-0 before:rounded-2xl 
                  before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20 
                  before:opacity-0 hover:before:opacity-100 before:transition"
      >
        <h3 className="text-xl font-bold">{exp.role}</h3>

        <p className="text-blue-400 mt-1">{exp.company}</p>

        <p className="text-gray-500 text-sm">{exp.duration}</p>

        <p className="text-gray-400 mt-3">{exp.desc}</p>
      </div>

    ))}

  </div>
</section>

      {/* PROJECTS */}
      <section id="projects" className="py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >Projects</motion.h2>

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
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >Contact</motion.h2>
        <p className="text-gray-400">ananddev7771@gmail.com</p>
        <p className="text-gray-400">+91 9162892612</p>
      </section>
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
  © {new Date().getFullYear()} Anand Dev. All rights reserved.
</footer>
    </div>
  );
}
