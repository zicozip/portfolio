import React, { useEffect, useState } from 'react';
import { X, Clock, Target, Zap, CheckCircle } from 'lucide-react';
import { Project } from '../types/portfolio';
import ImageGallery from './ImageGallery';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = React.useRef<number | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      // Cleanup timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Simple scroll optimization
  const handleScroll = React.useCallback(() => {
    // Simple scroll optimization without complex state changes
    if (!isScrolling) {
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    }
  }, [isScrolling]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className="relative bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          transform: 'translateZ(0)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden'
        }}
      >
        {/* Scrollable Content Container */}
        <div 
          className="overflow-y-auto ultra-smooth-scroll" 
          onScroll={handleScroll}
          style={{ 
            maxHeight: '90vh',
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {/* Header */}
          <div 
            className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between z-10"
            style={{ willChange: 'transform' }}
          >
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Project Images Gallery */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Workflow Screenshots</h3>
                <ImageGallery 
                  images={project.images || []} 
                  className="" 
                  showThumbnails={(project.images && project.images.length > 1) || false}
                />
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-700 rounded-xl p-4 text-center">
                  <Clock className="text-green-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-semibold">{project.metrics.automationSavings}</div>
                  <div className="text-gray-400 text-sm">Time Saved</div>
                </div>
                <div className="bg-gray-700 rounded-xl p-4 text-center">
                  <Target className="text-blue-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-semibold">{project.metrics.accuracyImprovement}</div>
                  <div className="text-gray-400 text-sm">Accuracy</div>
                </div>
                <div className="bg-gray-700 rounded-xl p-4 text-center">
                  <Zap className="text-purple-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-semibold">{project.metrics.integrations}</div>
                  <div className="text-gray-400 text-sm">Integrations</div>
                </div>
                <div className="bg-gray-700 rounded-xl p-4 text-center">
                  <div className="text-yellow-400 text-2xl mb-2">🎯</div>
                  <div className="text-white font-semibold">{project.metrics.workflowComplexity}</div>
                  <div className="text-gray-400 text-sm">Complexity</div>
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Workflow Process</h3>
                <div className="space-y-3">
                  {project.workflowSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Key Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-700 rounded-lg">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <p className="text-gray-300">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">System Integrations</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {project.integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-700 rounded-lg text-center text-gray-300"
                    >
                      {integration}
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Information */}
              <div className="bg-gray-700 rounded-xl p-6 text-center">
                <h4 className="text-lg font-semibold text-white mb-2">Workflow Source</h4>
                <p className="text-gray-300 mb-4">
                  This project is based on a real n8n workflow implementation
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                  <span className="font-mono text-sm">{project.sourceFile}</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
