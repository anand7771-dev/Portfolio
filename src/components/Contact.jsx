import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:ananddev7771@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Get In Touch
      </motion.h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm always interested in hearing about new opportunities,
            collaborations, or just having a chat about AI and technology.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                icon: FaEnvelope,
                label: 'ananddev7771@gmail.com',
                href: 'mailto:ananddev7771@gmail.com',
              },
              {
                icon: FaPhone,
                label: '+91 9162892612',
                href: 'tel:+919162892612',
              },
              { icon: FaMapMarkerAlt, label: 'India', href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <item.icon className="text-blue-400" />
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-300">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 w-full justify-center"
          >
            <FaPaperPlane /> Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
