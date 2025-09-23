import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="mb-8 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>

          {/* Logo/Name */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-white">KJ</span>
              <span className="text-green-400">Gudez</span>
            </h3>
            <p className="text-gray-400">AI Automation Specialist</p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap justify-center gap-6">
              {['About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400 mb-4">Specialized in:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['n8n', 'Automation', 'API Integration', 'Workflow Optimization', 'Business Process'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-8 border-t border-gray-800 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Kim Joshua Gudez. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Built with React, TypeScript, and Framer Motion
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;