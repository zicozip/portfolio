import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Target, Zap, X } from 'lucide-react'
import { projects, categories, Project } from '../data/projects'

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-400/10'
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10'
      case 'advanced': return 'text-orange-400 bg-orange-400/10'
      case 'expert': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <section id="portfolio" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900/50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Real automation workflows that have transformed businesses and delivered measurable results
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-dark-950'
                    : 'glass text-gray-400 hover:text-white hover:border-primary/30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Bento Grid Projects */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glass rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-dark-800 to-dark-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent z-10" />
                  {project.images[0] && (
                    <img
                      src={project.images[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(project.metrics.workflowComplexity)}`}>
                      {project.metrics.workflowComplexity}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="text-xs text-primary uppercase tracking-wider mb-2">
                    {getCategoryName(project.category)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} className="text-primary" />
                      <span>{project.metrics.automationSavings}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Target size={14} className="text-blue-400" />
                      <span>{project.metrics.accuracyImprovement}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Zap size={14} className="text-purple-400" />
                      <span>{project.metrics.integrations} apps</span>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-dark-800/50 text-gray-400 rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-dark-800/50 text-gray-400 rounded-md text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 glass flex items-center justify-between p-6 border-b border-white/5">
                <div>
                  <span className="text-xs text-primary uppercase tracking-wider">
                    {getCategoryName(selectedProject.category)}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Overview</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedProject.metrics.automationSavings}</div>
                    <div className="text-xs text-gray-500">Time Saved</div>
                  </div>
                  <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{selectedProject.metrics.accuracyImprovement}</div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedProject.metrics.integrations}</div>
                    <div className="text-xs text-gray-500">Integrations</div>
                  </div>
                  <div className="bg-dark-800/50 rounded-xl p-4 text-center">
                    <div className="text-lg font-bold text-orange-400">{selectedProject.metrics.workflowComplexity}</div>
                    <div className="text-xs text-gray-500">Complexity</div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Highlights</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Workflow Steps */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">How It Works</h4>
                  <ol className="space-y-2">
                    {selectedProject.workflowSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-400">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Portfolio
