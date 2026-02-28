import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Target, Layers } from 'lucide-react'

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    'AI Automation Specialist',
    'n8n Workflow Expert',
    'Integration Architect'
  ]

  useEffect(() => {
    const type = () => {
      const fullText = texts[currentIndex]

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentCharIndex + 1))
        setCurrentCharIndex(prev => prev + 1)

        if (currentCharIndex + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2500)
        }
      } else {
        setCurrentText(fullText.substring(0, currentCharIndex - 1))
        setCurrentCharIndex(prev => prev - 1)

        if (currentCharIndex === 0) {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }

    const timer = setTimeout(type, isDeleting ? 40 : 80)
    return () => clearTimeout(timer)
  }, [currentCharIndex, isDeleting, currentIndex, texts])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stats = [
    { icon: <Zap size={20} />, value: '50+', label: 'Workflows Built' },
    { icon: <Target size={20} />, value: '95%', label: 'Accuracy Rate' },
    { icon: <Layers size={20} />, value: '30+', label: 'Integrations' }
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Available for Projects
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-white">Hi, I'm </span>
                <span className="gradient-text">Kim Joshua</span>
              </motion.h1>

              <motion.div variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-6 h-10 flex items-center justify-center lg:justify-start">
                <span className="border-r-2 border-primary pr-2 animate-pulse">
                  {currentText}
                </span>
              </motion.div>

              <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transforming businesses through intelligent automation. I build powerful workflows
                that eliminate manual tasks and deliver measurable ROI.
              </motion.p>

              {/* Stats */}
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:border-primary/30 transition-colors"
                  >
                    <div className="text-primary">{stat.icon}</div>
                    <div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button
                  onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-primary hover:bg-primary-600 text-dark-950 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  View Projects
                </button>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 glass border border-white/10 hover:border-primary/30 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Get In Touch
                </button>
              </motion.div>
            </div>

            {/* Profile Card - Right Side (Bento Style) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
              <div className="relative">
                {/* Bento Card */}
                <div className="glass rounded-3xl p-2 relative">
                  <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900">
                    <img
                      src="/images/dp.jpg"
                      alt="Kim Joshua Gudez"
                      className="w-full h-full object-cover"
                      style={{ transform: 'scale(1.15) translateY(5%)' }}
                    />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="text-primary" size={16} />
                      <span className="text-sm font-medium text-white">n8n Expert</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-3 -left-4 glass rounded-xl px-4 py-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">DMD → AI</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ChevronDown className="text-primary" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
