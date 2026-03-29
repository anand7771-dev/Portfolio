import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[70%] z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-blue-500/5 border-white/10'
          : 'bg-gray-950/40 backdrop-blur-md border-white/5'
      } border rounded-2xl px-6 py-3`}
    >
      <div className="flex justify-between items-center">
        <a
          href="#"
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Anand Dev
        </a>

        <div className="hidden md:flex gap-6">
          {navLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className={`text-sm transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col gap-3 pb-4 overflow-hidden"
          >
            {navLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-sm transition-colors pl-2 border-l-2 ${
                  activeSection === href.slice(1)
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-400 hover:text-white border-transparent'
                }`}
              >
                {name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
