import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Code className="text-green-400" size={32} />,
      title: "Technical Excellence",
      description: "Expert in n8n, JavaScript, and API integrations with a year of automation experience."
    },
    {
      icon: <Zap className="text-green-400" size={32} />,
      title: "Lightning Fast",
      description: "Rapid deployment of automation solutions that deliver immediate results and measurable ROI."
    },
    {
      icon: <Target className="text-green-400" size={32} />,
      title: "Goal-Oriented",
      description: "Focus on solving real business problems with practical, scalable automation workflows."
    },
    {
      icon: <Users className="text-green-400" size={32} />,
      title: "Collaborative",
      description: "Work closely with teams to understand processes and deliver solutions that everyone can use."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a Doctor of Dental Medicine turned automation specialist who believes in the power of technology to transform businesses. 
              With my background in healthcare and passion for AI, I help companies eliminate repetitive tasks through 
              intelligent workflows and focus on what matters most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  I'm a graduate of Doctor of Dental Medicine, but my passion for technology began in high school when I was 
                  drawn to IT courses here in the Philippines. Due to financial constraints, my aunt sponsored my dental 
                  education, leading me down the healthcare path. However, I discovered automation when I deep dived into 
                  learning AI, where I found the perfect balance of power and simplicity in it.
                </p>
                <p>
                  Today, I specialize in creating sophisticated automation workflows that integrate multiple systems, 
                  process complex data, and deliver actionable insights. My solutions have helped businesses save 
                  thousands of hours and significantly improve their operational efficiency.
                </p>
                <p>
                  I'm constantly learning and adapting to new technologies, ensuring that my clients always get 
                  cutting-edge solutions that scale with their business needs.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's discuss how automation can revolutionize your workflows and drive unprecedented efficiency gains.
              </p>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk Automation
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;