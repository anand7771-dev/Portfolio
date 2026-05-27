import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-4">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          © {new Date().getFullYear()} Anand Dev. Built with React &{' '}
          <FaHeart className="text-red-500 text-xs" />
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/anand7771-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://linkedin.com/in/anand-dev-0ba936294/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="mailto:ananddev7771@gmail.com"
            className="text-gray-500 hover:text-red-400 transition-colors duration-200"
            aria-label="Email"
          >
            <FaEnvelope className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
