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
  const [desktopCurrentIndex, setDesktopCurrentIndex] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredProjects = getProjectsByCategory(activeCategory);
  
  // Sort projects to show Advanced ones first
  const sortedProjects = React.useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      const complexityOrder = { 'Advanced': 0, 'Expert': 1, 'Intermediate': 2, 'Beginner': 3 };
      const aOrder = complexityOrder[a.metrics.workflowComplexity as keyof typeof complexityOrder] ?? 4;
      const bOrder = complexityOrder[b.metrics.workflowComplexity as keyof typeof complexityOrder] ?? 4;
      return aOrder - bOrder;
    });
  }, [filteredProjects]);
  
  // Desktop carousel constants
  const PROJECTS_PER_PAGE = 3;
  const totalPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE);
  
  // Reset indexes when category changes
  React.useEffect(() => {
    setMobileCurrentIndex(0);
    setDesktopCurrentIndex(0);
  }, [activeCategory]);
  
  
  // Desktop carousel navigation
  const handleDesktopPrevious = () => {
    setDesktopCurrentIndex(prev => prev > 0 ? prev - 1 : totalPages - 1);
  };
  
  const handleDesktopNext = () => {
    setDesktopCurrentIndex(prev => prev < totalPages - 1 ? prev + 1 : 0);
  };
  
  const handleMobilePrevious = () => {
    setMobileCurrentIndex(prev => 
      prev > 0 ? prev - 1 : sortedProjects.length - 1
    );
  };
  
  const handleMobileNext = () => {
    setMobileCurrentIndex(prev => 
      prev < sortedProjects.length - 1 ? prev + 1 : 0
    );
  };

  const getCategoryName = (categoryId: string) => {
    const categoryNames: { [key: string]: string } = {
      'all': 'All Projects',
      'ai_automation': 'AI Automation',
      'data_sync': 'Data Sync',
      'data_transformation': 'Data Transformation',
      'database_operations': 'Database Ops',
      'api_integration': 'API Integration',
      'healthcare_automation': 'Healthcare Automation'
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

            {/* Desktop Projects Carousel */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Navigation Arrows */}
                {totalPages > 1 && (
                  <>
                    <motion.button
                      onClick={handleDesktopPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-green-500/90 hover:bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleDesktopNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-green-500/90 hover:bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
                
                {/* Carousel Container */}
                <div className="overflow-hidden mx-16"> {/* Add margin for arrows */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCategory}-${desktopCurrentIndex}`}
                      className="grid grid-cols-3 gap-8"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {sortedProjects
                        .slice(desktopCurrentIndex * PROJECTS_PER_PAGE, (desktopCurrentIndex + 1) * PROJECTS_PER_PAGE)
                        .map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
                          whileHover={{ y: -5 }}
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
                
                {/* Page Indicators */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setDesktopCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i === desktopCurrentIndex 
                            ? 'bg-green-500 scale-125 shadow-lg' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile Projects Pagination */}
            <div className="md:hidden" style={{ transform: 'translateZ(0)' }}>
              {sortedProjects.length > 0 && (
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
                          const project = sortedProjects[mobileCurrentIndex];
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
                      disabled={sortedProjects.length <= 1}
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {mobileCurrentIndex + 1} of {sortedProjects.length}
                      </span>
                      
                      {/* Dots indicator */}
                      <div className="flex gap-1 ml-2">
                        {sortedProjects.map((_, index) => (
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
                      disabled={sortedProjects.length <= 1}
                    >
                      Next
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {sortedProjects.length === 0 && (
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