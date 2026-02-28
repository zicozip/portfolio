import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Zap, Target, Users, Heart, Sparkles } from 'lucide-react'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const features = [
    {
      icon: <Code size={24} />,
      title: "Technical Excellence",
      description: "Expert in n8n, JavaScript, and API integrations with a year of automation experience."
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      description: "Rapid deployment of automation solutions that deliver immediate results and measurable ROI."
    },
    {
      icon: <Target size={24} />,
      title: "Goal-Oriented",
      description: "Focus on solving real business problems with practical, scalable automation workflows."
    },
    {
      icon: <Users size={24} />,
      title: "Collaborative",
      description: "Work closely with teams to understand processes and deliver solutions that everyone can use."
    }
  ]

  const journeyHighlights = [
    { label: "Background", value: "Doctor of Dental Medicine" },
    { label: "Transition", value: "Healthcare → Tech" },
    { label: "Focus", value: "AI Automation" },
    { label: "Experience", value: "1+ Year" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="about" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900/50" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              The Story Behind <span className="gradient-text">the Automation</span>
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Story Card - Spans 2 columns */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 glass rounded-3xl p-8 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Heart className="text-primary" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I'm a graduate of <span className="text-white font-medium">Doctor of Dental Medicine</span>,
                  but my passion for technology began in high school when I was drawn to IT courses.
                  Due to financial constraints, my aunt sponsored my dental education, leading me down the healthcare path.
                </p>
                <p>
                  However, I discovered automation when I deep dived into learning <span className="text-primary font-medium">AI</span>,
                  where I found the perfect balance of power and simplicity. The ability to create workflows that
                  save businesses thousands of hours fascinated me.
                </p>
                <p>
                  Today, I specialize in creating sophisticated automation workflows that integrate multiple systems,
                  process complex data, and deliver actionable insights. My unique background in healthcare
                  gives me a different perspective on problem-solving – I approach challenges with precision,
                  attention to detail, and a focus on outcomes.
                </p>
              </div>

              {/* Journey Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {journeyHighlights.map((item, index) => (
                  <div key={index} className="bg-dark-800/50 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Unique Background Card */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-3xl p-8 hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center">
                  <Sparkles className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">What Makes Me Different</h3>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="bg-dark-800/50 rounded-xl p-4">
                  <div className="text-primary font-semibold mb-1">DMD → AI Specialist</div>
                  <div className="text-sm text-gray-400">Uncommon path to automation expertise</div>
                </div>
                <div className="bg-dark-800/50 rounded-xl p-4">
                  <div className="text-primary font-semibold mb-1">Healthcare Precision</div>
                  <div className="text-sm text-gray-400">Attention to detail in every workflow</div>
                </div>
                <div className="bg-dark-800/50 rounded-xl p-4">
                  <div className="text-primary font-semibold mb-1">Continuous Learner</div>
                  <div className="text-sm text-gray-400">Always exploring new AI tools</div>
                </div>
              </div>
            </motion.div>

            {/* Feature Cards - 4 cards in a row */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-3xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-primary hover:bg-primary-600 text-dark-950 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Let's Work Together
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
