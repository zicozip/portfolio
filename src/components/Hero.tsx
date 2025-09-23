import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);

  const texts = React.useMemo(() => [
    'Hi, Im Kim Joshua!',
    'AI Automation Specialist',
    'Workflow Optimization Expert', 
    'Business Process Automator',
    'Integration Solutions Architect'
  ], []);

  useEffect(() => {
    const type = () => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
        
        if (currentCharIndex + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
        
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentCharIndex, isDeleting, currentIndex, texts]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Picture */}
          <motion.div
            className="mt-12 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div 
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 p-1 shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300"
              onClick={() => setShowImagePopup(true)}
            >
              <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden relative hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/dp.jpg" 
                  alt="Dr. Kim Joshua Gudez - Doctor of Dental Medicine" 
                  className="absolute inset-0 w-auto h-auto min-w-full min-h-full object-contain" 
                  style={{ 
                    transform: 'scale(1.8) translateX(5%) translateY(10%)',
                    transformOrigin: 'center center'
                  }} 
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-2xl md:text-4xl text-green-400 font-semibold mb-6 h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="border-r-2 border-green-400 pr-1 animate-pulse">
              {currentText}
            </span>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transforming businesses through intelligent automation. I create powerful workflows 
            that eliminate manual tasks, integrate systems seamlessly, and deliver measurable ROI.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-300">Hours Saved Weekly</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-gray-300">Average Accuracy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-gray-300">Integrations Mastered</div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-green-400 cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {showImagePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowImagePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-sm md:max-w-md lg:max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowImagePopup(false)}
                className="absolute -top-2 -right-2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
              
              {/* Image */}
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-1 rounded-2xl">
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="w-full h-96 md:h-[28rem] overflow-hidden relative">
                    <img 
                      src="/images/dp.jpg" 
                      alt="Dr. Kim Joshua Gudez - Doctor of Dental Medicine" 
                      className="absolute inset-0 w-auto h-auto min-w-full min-h-full object-contain"
                      style={{ 
                        transform: 'scale(1.7) translateX(4%) translateY(8%)',
                        transformOrigin: 'center center'
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
