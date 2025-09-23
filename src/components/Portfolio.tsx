import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Clock, Target, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import ProjectModal from './ProjectModal';
import { usePortfolio } from '../hooks/usePortfolio';

const Portfolio: React.FC = () => {
  const { categories, loading, error, getProjectsByCategory } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredProjects = getProjectsByCategory(activeCategory);
  
  // Reset mobile index when category changes
  React.useEffect(() => {
    setMobileCurrentIndex(0);
  }, [activeCategory]);
  
  
  const handleMobilePrevious = () => {
    setMobileCurrentIndex(prev => 
      prev > 0 ? prev - 1 : filteredProjects.length - 1
    );
  };
  
  const handleMobileNext = () => {
    setMobileCurrentIndex(prev => 
      prev < filteredProjects.length - 1 ? prev + 1 : 0
    );
  };

  const getCategoryName = (categoryId: string) => {
    const categoryNames: { [key: string]: string } = {
      'all': 'All Projects',
      'ai_automation': 'AI Automation',
      'data_sync': 'Data Sync',
      'data_transformation': 'Data Transformation',
      'database_operations': 'Database Ops',
      'api_integration': 'API Integration'
    };
    return categoryNames[categoryId] || categoryId;
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="text-white">Loading portfolio...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="py-20 bg-gray-800" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">My Portfolio</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real automation workflows that have transformed businesses and delivered measurable results.
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getCategoryName(category)}
                </motion.button>
              ))}
            </motion.div>

            {/* Desktop Projects Grid */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
                      whileHover={{ y: -5 }}
                      layout
                    >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                        {project.images && project.images.length > 0 && project.images.find(img => img.isMain) ? (
                          <img 
                            src={project.images.find(img => img.isMain)?.url || project.images[0]?.url} 
                            alt={project.images.find(img => img.isMain)?.altText || project.images[0]?.altText || `${project.title} preview`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="text-6xl text-green-400">⚡</div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getComplexityColor(project.metrics.workflowComplexity)} bg-gray-800`}>
                          {project.metrics.workflowComplexity}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-3 flex-1">{project.description}</p>

                      {/* Metrics */}
                      <div className="flex items-center gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-green-400">
                          <Clock size={16} />
                          <span>{project.metrics.automationSavings}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-400">
                          <Target size={16} />
                          <span>{project.metrics.accuracyImprovement}</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple-400">
                          <Zap size={16} />
                          <span>{project.metrics.integrations} integrations</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ExternalLink size={16} />
                      </button>
                    </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Mobile Projects Pagination */}
            <div className="md:hidden" style={{ transform: 'translateZ(0)' }}>
              {filteredProjects.length > 0 && (
                <>
                  {/* Fixed height container to prevent size jumping */}
                  <div className="relative min-h-[600px] sm:min-h-[650px]" style={{ willChange: 'auto' }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`${activeCategory}-${mobileCurrentIndex}`}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ 
                          duration: 0.2, 
                          ease: [0.4, 0, 0.2, 1], // Custom cubic bezier for smoother animation
                          opacity: { duration: 0.15 } // Faster opacity transition
                        }}
                        className="absolute inset-0 bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
                        style={{ 
                          willChange: 'transform, opacity',
                          transform: 'translate3d(0,0,0)', // Force 3D acceleration
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          isolation: 'isolate' // Prevent layout thrashing
                        }}
                      >
                        {(() => {
                          const project = filteredProjects[mobileCurrentIndex];
                          return (
                            <>
                              <div className="relative">
                                <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                                  {project.images && project.images.length > 0 && project.images.find(img => img.isMain) ? (
                                    <img 
                                      src={project.images.find(img => img.isMain)?.url || project.images[0]?.url} 
                                      alt={project.images.find(img => img.isMain)?.altText || project.images[0]?.altText || `${project.title} preview`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-6xl text-green-400">⚡</div>
                                  )}
                                </div>
                                <div className="absolute top-4 right-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getComplexityColor(project.metrics.workflowComplexity)} bg-gray-800`}>
                                    {project.metrics.workflowComplexity}
                                  </span>
                                </div>
                              </div>
              
                              <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4 text-sm leading-relaxed" style={{ 
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 4,
                                  overflow: 'hidden',
                                  minHeight: '4.5rem'
                                }}>{project.description}</p>
              
                                {/* Metrics */}
                                <div className="flex items-center gap-3 mb-4 text-sm">
                                  <div className="flex items-center gap-1 text-green-400">
                                    <Clock size={16} />
                                    <span>{project.metrics.automationSavings}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-blue-400">
                                    <Target size={16} />
                                    <span>{project.metrics.accuracyImprovement}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-purple-400">
                                    <Zap size={16} />
                                    <span>{project.metrics.integrations} integrations</span>
                                  </div>
                                </div>
              
                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4" style={{ minHeight: '2rem' }}>
                                  {project.technologies.slice(0, 3).map((tech, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs h-6 flex items-center"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs h-6 flex items-center">
                                      +{project.technologies.length - 3} more
                                    </span>
                                  )}
                                </div>
              
                                <button
                                  onClick={() => setSelectedProject(project)}
                                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                  View Details
                                  <ExternalLink size={16} />
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Mobile Navigation Controls */}
                  <div className="flex items-center justify-between mt-6 h-12">
                    <button
                      onClick={handleMobilePrevious}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                      disabled={filteredProjects.length <= 1}
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {mobileCurrentIndex + 1} of {filteredProjects.length}
                      </span>
                      
                      {/* Dots indicator */}
                      <div className="flex gap-1 ml-2">
                        {filteredProjects.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setMobileCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              index === mobileCurrentIndex 
                                ? 'bg-green-400' 
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={handleMobileNext}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                      disabled={filteredProjects.length <= 1}
                    >
                      Next
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {filteredProjects.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <p className="text-gray-400 text-lg">No projects found in this category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Portfolio;